import { useState, useEffect } from 'react'
import {
  collection, query, where, onSnapshot, orderBy,
  addDoc, deleteDoc, doc, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notifyFirestoreError } from '@/lib/firestoreErrorHandler'

// ─────────────────────────────────────────────────────────────────────────────
// Module 7 — Gestion des Emprunts (SYSCOHADA révisé)
// Comptes mobilisés : 162 (Emprunts et dettes / établissements de crédit),
// 1662 (Intérêts courus / établissements de crédit), 6712 (Intérêts / emprunts
// établissements de crédit), 478/479 (Écarts de conversion Actif/Passif),
// 194 (Provisions pour pertes de change), 6971/7971 (Dotations/Reprises
// provisions financières), 676/776 (Pertes/Gains de change financiers).
// Limité aux emprunts bancaires classiques (compte 162) : l'emprunt obligataire
// (compte 161, chapitre 20 AUDCIF) relève d'un régime distinct (prime de
// remboursement, souscripteurs multiples) non couvert ici.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type Devise = 'CDF' | 'USD' | 'EUR'
export type MethodeAmortEmprunt = 'constant' | 'annuites_constantes' | 'in_fine'

export interface Emprunt {
  id: string
  userId: string
  reference: string          // ex : « Équipement industriel »
  preteur: string            // ex : « BCDC »
  devise: Devise
  coursEntree: number        // CDF pour 1 unité de devise ; 1 si devise === 'CDF' (Art. 52 : cours au comptant à la mise à disposition)
  capital: number            // en devise
  tauxAnnuel: number         // ex : 0.08 pour 8 %/an
  dureeAnnees: number
  dateMiseADisposition: string  // ISO
  methode: MethodeAmortEmprunt
  createdAt?: Timestamp
}

export interface LigneAmortEmprunt {
  periode: number
  dateEcheance: string       // ISO
  capitalDebut: number       // devise
  interets: number           // devise
  amortCapital: number       // devise
  annuite: number            // devise
  capitalFin: number         // devise
}

export interface LigneEcritureEmprunt {
  compte: string
  intitule: string
  debit: number   // CDF
  credit: number  // CDF
}

export interface EcritureEmpruntGeneree {
  libelle: string
  date: string
  lignes: LigneEcritureEmprunt[]
}

export interface EcartConversion {
  coursCloture: number
  capitalRestant: number   // devise, à la date de clôture
  valeurOrigine: number    // CDF : capitalRestant × coursEntree
  valeurCloture: number    // CDF : capitalRestant × coursCloture
  ecart: number             // |valeurCloture − valeurOrigine|, toujours positif
  sens: 'perte' | 'gain' | 'nul'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

function dateEcheance(dateBase: string, offsetAnnees: number): string {
  const d = new Date(dateBase)
  d.setFullYear(d.getFullYear() + offsetAnnees)
  return d.toISOString().split('T')[0]
}

export function libelleMethode(m: MethodeAmortEmprunt): string {
  return m === 'constant' ? 'Amortissement constant'
    : m === 'annuites_constantes' ? 'Annuités constantes'
    : 'In fine'
}

// ─── Tableau d'amortissement ──────────────────────────────────────────────────
// Trois méthodes usuelles, aucune n'est propre à un article du droit comptable
// OHADA (mécanique financière universelle) : seul le compte d'imputation (162)
// et le traitement des intérêts courus / écarts de conversion relèvent de
// l'AUDCIF.

export function calculerAmortissement(emprunt: Pick<Emprunt, 'capital' | 'tauxAnnuel' | 'dureeAnnees' | 'methode' | 'dateMiseADisposition'>): LigneAmortEmprunt[] {
  const { capital, tauxAnnuel, dureeAnnees, methode, dateMiseADisposition } = emprunt
  const lignes: LigneAmortEmprunt[] = []
  let capitalDebut = capital

  if (methode === 'constant') {
    const amortCapital = capital / dureeAnnees
    for (let p = 1; p <= dureeAnnees; p++) {
      const interets = capitalDebut * tauxAnnuel
      const capitalFin = p === dureeAnnees ? 0 : capitalDebut - amortCapital
      lignes.push({
        periode: p, dateEcheance: dateEcheance(dateMiseADisposition, p),
        capitalDebut, interets, amortCapital, annuite: interets + amortCapital, capitalFin,
      })
      capitalDebut = capitalFin
    }
  } else if (methode === 'annuites_constantes') {
    const i = tauxAnnuel
    const n = dureeAnnees
    const annuite = i === 0 ? capital / n : capital * i / (1 - Math.pow(1 + i, -n))
    for (let p = 1; p <= n; p++) {
      const interets = capitalDebut * tauxAnnuel
      // Dernière échéance : solde le capital restant pour éviter un résidu d'arrondi.
      const amortCapital = p === n ? capitalDebut : annuite - interets
      const capitalFin = p === n ? 0 : capitalDebut - amortCapital
      lignes.push({
        periode: p, dateEcheance: dateEcheance(dateMiseADisposition, p),
        capitalDebut, interets, amortCapital, annuite: interets + amortCapital, capitalFin,
      })
      capitalDebut = capitalFin
    }
  } else {
    // In fine : intérêts seuls chaque échéance, capital remboursé en une fois au terme.
    for (let p = 1; p <= dureeAnnees; p++) {
      const interets = capital * tauxAnnuel
      const amortCapital = p === dureeAnnees ? capital : 0
      const capitalFin = p === dureeAnnees ? 0 : capital
      lignes.push({
        periode: p, dateEcheance: dateEcheance(dateMiseADisposition, p),
        capitalDebut: capital,
        interets, amortCapital, annuite: interets + amortCapital, capitalFin,
      })
    }
  }
  return lignes
}

// ─── Écritures ────────────────────────────────────────────────────────────────

const COMPTE_TRESORERIE = { num: '521', lib: 'Banques locales' }
const COMPTE_EMPRUNT = { num: '162', lib: 'Emprunts et dettes / établissements de crédit' }
const COMPTE_INTERETS = { num: '6712', lib: 'Intérêts / emprunts établissements de crédit' }
const COMPTE_INTERETS_COURUS = { num: '1662', lib: 'Intérêts courus / établissements de crédit' }
// Subdivisions du 478/479 propres aux dettes FINANCIÈRES (un emprunt en est
// une) : 4784 « augmentation des dettes financières » et 4794 « diminution
// des dettes financières » (classe 4 SYSCOHADA), à distinguer des
// subdivisions d'exploitation (4783/4793) et des subdivisions génériques
// 478/479 utilisées pour les créances/dettes commerciales. Cf. séminaire
// CPCC « Traitements comptables liés aux redressements des comptes du
// patrimoine », exemple III.6 (emprunt SNEL en devises).
const COMPTE_ECART_ACTIF = { num: '4784', lib: 'Écarts de conversion – Actif (augmentation dettes financières)' }
const COMPTE_ECART_PASSIF = { num: '4794', lib: 'Écarts de conversion – Passif (diminution dettes financières)' }
const COMPTE_DOTATION_PROV_FIN = { num: '6971', lib: 'Dotations provisions pour risques et charges financières' }
const COMPTE_PROV_PERTE_CHANGE = { num: '194', lib: 'Provisions pour pertes de change' }
const COMPTE_REPRISE_PROV_FIN = { num: '7971', lib: 'Reprises de provisions pour risques et charges financières' }
const COMPTE_PERTE_CHANGE = { num: '676', lib: 'Pertes de change financières' }
const COMPTE_GAIN_CHANGE = { num: '776', lib: 'Gains de change financiers' }

// Écriture 1 : réception du capital (Art. 52 : conversion au cours au comptant
// du jour de mise à disposition). Compte 16 « fonctionnement » : crédité du
// montant net reçu par le débit de la trésorerie.
export function genererEcritureReception(emprunt: Emprunt): EcritureEmpruntGeneree {
  const montant = arrondi(emprunt.capital * emprunt.coursEntree)
  return {
    libelle: `Réception emprunt : ${emprunt.preteur} : ${emprunt.reference}`,
    date: emprunt.dateMiseADisposition,
    lignes: [
      { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: montant, credit: 0 },
      { compte: COMPTE_EMPRUNT.num, intitule: COMPTE_EMPRUNT.lib, debit: 0, credit: montant },
    ],
  }
}

// Écriture 2 : échéance (capital + intérêts). coursReglement : cours du jour
// de paiement effectif — s'il diffère du cours d'entrée, la portion capital
// remboursée dégage un écart RÉALISÉ (Art. 53-55 : compte 676/776), distinct
// des écarts de conversion latents (478/479) qui ne concernent que la clôture.
export function genererEcritureEcheance(
  emprunt: Emprunt, ligne: LigneAmortEmprunt, coursReglement: number = emprunt.coursEntree
): EcritureEmpruntGeneree {
  const capitalCDF = arrondi(ligne.amortCapital * emprunt.coursEntree)     // valeur d'origine du capital remboursé
  const capitalReglementCDF = arrondi(ligne.amortCapital * coursReglement) // montant réellement décaissé
  const interetsCDF = arrondi(ligne.interets * coursReglement)             // intérêts : charge de la période, au cours du jour
  const ecartRealise = arrondi(capitalReglementCDF - capitalCDF)
  const totalDecaisse = capitalReglementCDF + interetsCDF

  const lignes: LigneEcritureEmprunt[] = [
    { compte: COMPTE_EMPRUNT.num, intitule: `${COMPTE_EMPRUNT.lib} (capital)`, debit: capitalCDF, credit: 0 },
    { compte: COMPTE_INTERETS.num, intitule: COMPTE_INTERETS.lib, debit: interetsCDF, credit: 0 },
  ]
  if (ecartRealise > 0) {
    lignes.push({ compte: COMPTE_PERTE_CHANGE.num, intitule: COMPTE_PERTE_CHANGE.lib, debit: ecartRealise, credit: 0 })
  } else if (ecartRealise < 0) {
    lignes.push({ compte: COMPTE_GAIN_CHANGE.num, intitule: COMPTE_GAIN_CHANGE.lib, debit: 0, credit: -ecartRealise })
  }
  lignes.push({ compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: 0, credit: totalDecaisse })

  return {
    libelle: `Échéance n°${ligne.periode} : ${emprunt.preteur} : ${emprunt.reference}`,
    date: ligne.dateEcheance,
    lignes,
  }
}

// Écriture 3 : intérêts courus non échus à la clôture (l'échéance ne coïncide
// pas avec la date de clôture). Contrepassée à l'ouverture de l'exercice suivant.
export function genererEcritureInteretsCourus(
  emprunt: Emprunt, montantInteretsDevise: number, coursCloture: number, dateCloture: string
): EcritureEmpruntGeneree {
  const montant = arrondi(montantInteretsDevise * coursCloture)
  return {
    libelle: `Intérêts courus non échus : ${emprunt.preteur} : ${emprunt.reference}`,
    date: dateCloture,
    lignes: [
      { compte: COMPTE_INTERETS.num, intitule: COMPTE_INTERETS.lib, debit: montant, credit: 0 },
      { compte: COMPTE_INTERETS_COURUS.num, intitule: COMPTE_INTERETS_COURUS.lib, debit: 0, credit: montant },
    ],
  }
}

// ─── Écarts de conversion (Art. 54, 56 AUDCIF) ───────────────────────────────
// L'écart se calcule TOUJOURS par rapport à la valeur d'origine (cours
// d'entrée), jamais par rapport au cours de clôture de l'exercice précédent :
// chaque clôture contre-passe intégralement l'écart antérieur avant de
// recalculer le nouvel écart sur la même base historique.

export function calculerEcartConversion(emprunt: Pick<Emprunt, 'coursEntree'>, capitalRestant: number, coursCloture: number): EcartConversion {
  const valeurOrigine = arrondi(capitalRestant * emprunt.coursEntree)
  const valeurCloture = arrondi(capitalRestant * coursCloture)
  const diff = valeurCloture - valeurOrigine
  return {
    coursCloture, capitalRestant, valeurOrigine, valeurCloture,
    ecart: Math.abs(diff),
    sens: diff > 0 ? 'perte' : diff < 0 ? 'gain' : 'nul',
  }
}

// Écriture 4 : constatation de l'écart de conversion sur le compte de dette (162).
export function genererEcritureEcartConversion(emprunt: Emprunt, ecart: EcartConversion, dateCloture: string): EcritureEmpruntGeneree | null {
  if (ecart.sens === 'nul') return null
  const lignes: LigneEcritureEmprunt[] = ecart.sens === 'perte'
    ? [
        { compte: COMPTE_ECART_ACTIF.num, intitule: COMPTE_ECART_ACTIF.lib, debit: ecart.ecart, credit: 0 },
        { compte: COMPTE_EMPRUNT.num, intitule: `${COMPTE_EMPRUNT.lib} (réévaluation)`, debit: 0, credit: ecart.ecart },
      ]
    : [
        { compte: COMPTE_EMPRUNT.num, intitule: `${COMPTE_EMPRUNT.lib} (réévaluation)`, debit: ecart.ecart, credit: 0 },
        { compte: COMPTE_ECART_PASSIF.num, intitule: COMPTE_ECART_PASSIF.lib, debit: 0, credit: ecart.ecart },
      ]
  return {
    libelle: `Écart de conversion : ${emprunt.preteur} : ${emprunt.reference}`,
    date: dateCloture,
    lignes,
  }
}

// ─── Provision pour perte de change — étalement Art. 56 AUDCIF ──────────────
// Un emprunt affecte, par nature, deux exercices ou plus : l'Art. 56 impose
// d'ÉTALER la perte probable sur la durée du contrat plutôt que de la
// provisionner intégralement dès le premier écart constaté. Pratique reprise
// telle quelle du séminaire CPCC (exemple III.6, emprunt SNEL) : la provision
// est limitée à la fraction de mois déjà couverte par le contrat depuis la
// mise à disposition (mois écoulés ÷ durée totale en mois), et non à la
// fraction de mois restant à courir jusqu'au terme — malgré l'intitulé
// « mois restant à courir » employé dans ce même support, qui ne correspond
// pas à son propre calcul (5/24 = mois ÉCOULÉS d'août à décembre, pas
// restants). Le montant potentiel de la perte totale est recalculé à chaque
// clôture (Art. 56 in fine).

export interface ProvisionPerteChange {
  moisEcoules: number
  dureeTotaleMois: number
  fraction: number     // moisEcoules / dureeTotaleMois, plafonnée à 1
  montant: number      // ecart.ecart × fraction
}

function moisEntre(dateDebut: string, dateFin: string): number {
  const d = new Date(dateDebut)
  const f = new Date(dateFin)
  const mois = (f.getFullYear() - d.getFullYear()) * 12 + (f.getMonth() - d.getMonth())
  return Math.max(0, Math.round(mois + (f.getDate() - d.getDate()) / 30))
}

export function calculerProvisionPerteChange(emprunt: Pick<Emprunt, 'dateMiseADisposition' | 'dureeAnnees'>, ecart: EcartConversion, dateCloture: string): ProvisionPerteChange {
  const dureeTotaleMois = emprunt.dureeAnnees * 12
  const moisEcoules = Math.min(dureeTotaleMois, moisEntre(emprunt.dateMiseADisposition, dateCloture))
  const fraction = dureeTotaleMois > 0 ? moisEcoules / dureeTotaleMois : 1
  return { moisEcoules, dureeTotaleMois, fraction, montant: arrondi(ecart.ecart * fraction) }
}

// Écriture 5 : provision pour perte de change — UNIQUEMENT en cas de perte
// latente (prudence, Art. 54), et limitée à la fraction étalée (Art. 56, voir
// calculerProvisionPerteChange). Aucune écriture symétrique pour un gain
// latent : il n'entre jamais dans le résultat tant qu'il n'est pas réalisé.
export function genererEcritureProvisionPerteChange(emprunt: Emprunt, provision: ProvisionPerteChange, dateCloture: string): EcritureEmpruntGeneree | null {
  if (provision.montant <= 0) return null
  return {
    libelle: `Provision pour perte de change : ${emprunt.preteur} : ${emprunt.reference}`,
    date: dateCloture,
    lignes: [
      { compte: COMPTE_DOTATION_PROV_FIN.num, intitule: COMPTE_DOTATION_PROV_FIN.lib, debit: provision.montant, credit: 0 },
      { compte: COMPTE_PROV_PERTE_CHANGE.num, intitule: COMPTE_PROV_PERTE_CHANGE.lib, debit: 0, credit: provision.montant },
    ],
  }
}

function arrondi(n: number): number {
  return Math.round(n * 100) / 100
}

// ─── Hooks Firebase ───────────────────────────────────────────────────────────

export function useEmprunts(userId: string | undefined) {
  const [emprunts, setEmprunts] = useState<Emprunt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const q = query(
      collection(db, 'emprunts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, snap => {
      setEmprunts(snap.docs.map(d => ({ id: d.id, ...d.data() } as Emprunt)))
      setLoading(false)
    }, err => { notifyFirestoreError('useEmprunts', err); setLoading(false) })
    return () => unsub()
  }, [userId])

  return { emprunts, loading }
}

// ─── Actions Firebase ─────────────────────────────────────────────────────────

export async function creerEmprunt(data: Omit<Emprunt, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'emprunts'), cleanUndefined({
    ...data,
    createdAt: serverTimestamp(),
  }))
  return ref.id
}

export async function supprimerEmprunt(id: string) {
  await deleteDoc(doc(db, 'emprunts', id))
}
