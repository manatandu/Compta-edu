import { useState, useEffect } from 'react'
import {
  collection, query, where, onSnapshot, orderBy,
  addDoc, deleteDoc, doc, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notifyFirestoreError } from '@/lib/firestoreErrorHandler'

// ─────────────────────────────────────────────────────────────────────────────
// Module 5 — Enregistrement des Factures en devises (SYSCOHADA révisé)
// Couvre les créances et dettes COMMERCIALES libellées en monnaie étrangère
// (Titre VIII ch. 22 ; Art. 51 à 58 AUDCIF) — distinct du module 7 (Emprunts),
// qui traite les opérations FINANCIÈRES en devises. Deux régimes de comptes
// différents en résultent : 656/756 (commercial) contre 676/776 (financier) ;
// 4781/4783/4791/4793 (dettes/créances d'exploitation) contre 4784/4794
// (dettes financières) ; provision court terme 6591/4991 (sans étalement,
// créances/dettes commerciales étant par nature à moins d'un an) contre
// provision financière étalée 6971/194 (Art. 56, opération multi-exercices).
// Comptes mobilisés : 401 (Fournisseurs), 411 (Clients), 601 (Achats), 701
// (Ventes), 445 (TVA récupérable), 443 (TVA facturée), 478/479 (Écarts de
// conversion Actif/Passif), 656/756 (Pertes/Gains de change commerciaux),
// 6591/4991 (Charges/Provisions pour risques à court terme d'exploitation),
// 571/776/676 (disponibilités en devises, Art. 58 : écart direct en résultat).
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type Devise = 'CDF' | 'USD' | 'EUR'
export type TypeFacture = 'achat' | 'vente'

export interface FactureDevise {
  id: string
  userId: string
  type: TypeFacture
  tiers: string             // nom du fournisseur (achat) ou client (vente)
  reference: string
  devise: Devise
  coursEngagement: number   // CDF pour 1 unité de devise ; cours au comptant à la date de facture (Art. 52)
  montantHT: number         // en devise
  tauxTVA: number           // ex : 0.16
  dateFacture: string       // ISO
  createdAt?: Timestamp
}

export interface LigneEcritureFacture {
  compte: string
  intitule: string
  debit: number   // CDF
  credit: number  // CDF
}

export interface EcritureFactureGeneree {
  libelle: string
  date: string
  lignes: LigneEcritureFacture[]
}

export interface EcartConversionCommercial {
  coursCloture: number
  soldeRestant: number     // devise, à la date de clôture
  valeurOrigine: number    // CDF
  valeurCloture: number    // CDF
  ecart: number             // toujours positif
  sens: 'perte' | 'gain' | 'nul'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

function arrondi(n: number): number {
  return Math.round(n * 100) / 100
}

export function montantTTC(f: Pick<FactureDevise, 'montantHT' | 'tauxTVA'>): number {
  return f.montantHT * (1 + f.tauxTVA)
}

// ─── Comptes ──────────────────────────────────────────────────────────────────

const COMPTE_FOURNISSEURS = { num: '401', lib: 'Fournisseurs' }
const COMPTE_CLIENTS = { num: '411', lib: 'Clients' }
const COMPTE_ACHATS = { num: '601', lib: 'Achats' }
const COMPTE_VENTES = { num: '701', lib: 'Ventes' }
const COMPTE_TVA_RECUP = { num: '445', lib: 'TVA récupérable' }
const COMPTE_TVA_FACTUREE = { num: '443', lib: 'TVA facturée' }
const COMPTE_TRESORERIE = { num: '521', lib: 'Banques locales' }
const COMPTE_PERTE_CHANGE_COM = { num: '656', lib: 'Pertes de change sur créances et dettes commerciales' }
const COMPTE_GAIN_CHANGE_COM = { num: '756', lib: 'Gains de change sur créances et dettes commerciales' }
const COMPTE_CHARGE_PROV_CT = { num: '6591', lib: 'Charges pour provisions pour risques à court terme' }
const COMPTE_PROV_CT_EXPLOIT = { num: '4991', lib: 'Provisions pour risques à court terme sur opérations d\'exploitation' }
const COMPTE_PERTE_CHANGE_FIN = { num: '676', lib: 'Pertes de change financières' }
const COMPTE_GAIN_CHANGE_FIN = { num: '776', lib: 'Gains de change financiers' }

// Subdivisions du 478/479 propres aux créances/dettes D'EXPLOITATION (compte
// 401/411), à distinguer des subdivisions financières (4784/4794, cf. module
// Emprunts) — cf. classe 4 SYSCOHADA.
function compteEcart(type: TypeFacture, sens: 'perte' | 'gain'): { num: string; lib: string } {
  if (type === 'achat') {
    return sens === 'perte'
      ? { num: '4783', lib: 'Écarts de conversion – Actif (augmentation dettes d\'exploitation)' }
      : { num: '4793', lib: 'Écarts de conversion – Passif (diminution dettes d\'exploitation)' }
  }
  return sens === 'perte'
    ? { num: '4781', lib: 'Écarts de conversion – Actif (diminution créances d\'exploitation)' }
    : { num: '4791', lib: 'Écarts de conversion – Passif (augmentation créances d\'exploitation)' }
}

// ─── Écriture 1 : engagement (Art. 52, cours au comptant du jour) ───────────
export function genererEcritureEngagement(f: FactureDevise): EcritureFactureGeneree {
  const ht = arrondi(f.montantHT * f.coursEngagement)
  const tva = arrondi(ht * f.tauxTVA)
  const ttc = ht + tva

  if (f.type === 'achat') {
    return {
      libelle: `Achat : ${f.tiers} : ${f.reference}`,
      date: f.dateFacture,
      lignes: [
        { compte: COMPTE_ACHATS.num, intitule: COMPTE_ACHATS.lib, debit: ht, credit: 0 },
        { compte: COMPTE_TVA_RECUP.num, intitule: COMPTE_TVA_RECUP.lib, debit: tva, credit: 0 },
        { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: 0, credit: ttc },
      ],
    }
  }
  return {
    libelle: `Vente : ${f.tiers} : ${f.reference}`,
    date: f.dateFacture,
    lignes: [
      { compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: ttc, credit: 0 },
      { compte: COMPTE_TVA_FACTUREE.num, intitule: COMPTE_TVA_FACTUREE.lib, debit: 0, credit: tva },
      { compte: COMPTE_VENTES.num, intitule: COMPTE_VENTES.lib, debit: 0, credit: ht },
    ],
  }
}

// ─── Écriture 2 : dénouement avant clôture (Art. 53-55, écart RÉALISÉ) ──────
// montantRegleDevise : la part du TTC réglée/encaissée (peut être partielle).
export function genererEcritureReglement(
  f: FactureDevise, montantRegleDevise: number, coursReglement: number
): EcritureFactureGeneree {
  const montantHistoriqueCDF = arrondi(montantRegleDevise * f.coursEngagement)
  const montantReglementCDF = arrondi(montantRegleDevise * coursReglement)
  const ecart = arrondi(montantReglementCDF - montantHistoriqueCDF)  // > 0 : le cours a monté

  if (f.type === 'achat') {
    // Perte si le cours a monté (on paie plus cher en CDF) ; gain si baissé.
    const lignes: LigneEcritureFacture[] = [
      { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: montantHistoriqueCDF, credit: 0 },
    ]
    if (ecart > 0) lignes.push({ compte: COMPTE_PERTE_CHANGE_COM.num, intitule: COMPTE_PERTE_CHANGE_COM.lib, debit: ecart, credit: 0 })
    lignes.push({ compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: 0, credit: montantReglementCDF })
    if (ecart < 0) lignes.push({ compte: COMPTE_GAIN_CHANGE_COM.num, intitule: COMPTE_GAIN_CHANGE_COM.lib, debit: 0, credit: -ecart })
    return { libelle: `Règlement : ${f.tiers} : ${f.reference}`, date: f.dateFacture, lignes }
  }

  // Vente : perte si le cours a baissé (on encaisse moins en CDF) ; gain si monté.
  const lignes: LigneEcritureFacture[] = [
    { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: montantReglementCDF, credit: 0 },
  ]
  if (ecart < 0) lignes.push({ compte: COMPTE_PERTE_CHANGE_COM.num, intitule: COMPTE_PERTE_CHANGE_COM.lib, debit: -ecart, credit: 0 })
  lignes.push({ compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: 0, credit: montantHistoriqueCDF })
  if (ecart > 0) lignes.push({ compte: COMPTE_GAIN_CHANGE_COM.num, intitule: COMPTE_GAIN_CHANGE_COM.lib, debit: 0, credit: ecart })
  return { libelle: `Encaissement : ${f.tiers} : ${f.reference}`, date: f.dateFacture, lignes }
}

// ─── Écarts de conversion à la clôture (Art. 54) ─────────────────────────────
// Calculé, comme pour les emprunts, TOUJOURS par rapport au cours d'engagement
// (valeur d'origine) — jamais par rapport au cours de clôture précédent.
// Le sens dépend du TYPE, pas seulement du signe de la variation : une dette
// (401, achat) qui augmente en CDF est une perte pour l'entreprise, mais une
// créance (411, vente) qui augmente en CDF est un GAIN — même hausse de cours,
// interprétation opposée. Vérifié contre MBIKAYI (achat, cours en hausse →
// perte) et NZUZI (vente, même hausse de cours → gain) du séminaire CPCC.
export function calculerEcartConversionCommercial(
  f: Pick<FactureDevise, 'coursEngagement'> & { type: TypeFacture }, soldeRestant: number, coursCloture: number
): EcartConversionCommercial {
  const valeurOrigine = arrondi(soldeRestant * f.coursEngagement)
  const valeurCloture = arrondi(soldeRestant * coursCloture)
  const diff = valeurCloture - valeurOrigine
  // Achat (dette) : hausse de valeur = perte. Vente (créance) : hausse de valeur = gain.
  const diffSigneAchat = f.type === 'achat' ? diff : -diff
  return {
    coursCloture, soldeRestant, valeurOrigine, valeurCloture,
    ecart: Math.abs(diff),
    sens: diffSigneAchat > 0 ? 'perte' : diffSigneAchat < 0 ? 'gain' : 'nul',
  }
}

// Écriture 3 : constatation de l'écart, directement sur le compte 401/411.
// La direction ne dépend QUE du sens perte/gain, jamais du type achat/vente :
// le 478 (Écarts-Actif) est TOUJOURS débité en cas de perte probable, le 479
// (Écarts-Passif) TOUJOURS crédité en cas de gain latent (c'est leur définition
// même, Art. 54) — seule la subdivision 4781/4783 ou 4791/4793 varie selon
// qu'il s'agit d'une créance (411) ou d'une dette (401). Vérifié contre
// l'exemple MBIKAYI (achat, dette augmentée, perte : D/478 C/401) et NZUZI
// (vente, créance augmentée, gain : D/411 C/479) du séminaire CPCC (III.3-4).
export function genererEcritureEcartConversion(f: FactureDevise, ecart: EcartConversionCommercial, dateCloture: string): EcritureFactureGeneree | null {
  if (ecart.sens === 'nul') return null
  const compteTiers = f.type === 'achat' ? COMPTE_FOURNISSEURS : COMPTE_CLIENTS
  const compteEc = compteEcart(f.type, ecart.sens)

  const lignes: LigneEcritureFacture[] = ecart.sens === 'perte'
    ? [
        { compte: compteEc.num, intitule: compteEc.lib, debit: ecart.ecart, credit: 0 },
        { compte: compteTiers.num, intitule: compteTiers.lib, debit: 0, credit: ecart.ecart },
      ]
    : [
        { compte: compteTiers.num, intitule: compteTiers.lib, debit: ecart.ecart, credit: 0 },
        { compte: compteEc.num, intitule: compteEc.lib, debit: 0, credit: ecart.ecart },
      ]
  return { libelle: `Écart de conversion : ${f.tiers} : ${f.reference}`, date: dateCloture, lignes }
}

// Écriture 4 : provision pour risques à court terme — uniquement en cas de
// perte latente, JAMAIS étalée (Art. 56 ne vise que les emprunts/prêts
// multi-exercices ; une créance/dette commerciale est par nature à court
// terme). Cf. exemple III.3-III.4 : provision = écart intégral, sans prorata.
export function genererEcritureProvisionCommercial(f: FactureDevise, ecart: EcartConversionCommercial, dateCloture: string): EcritureFactureGeneree | null {
  if (ecart.sens !== 'perte') return null
  return {
    libelle: `Provision pour perte de change : ${f.tiers} : ${f.reference}`,
    date: dateCloture,
    lignes: [
      { compte: COMPTE_CHARGE_PROV_CT.num, intitule: COMPTE_CHARGE_PROV_CT.lib, debit: ecart.ecart, credit: 0 },
      { compte: COMPTE_PROV_CT_EXPLOIT.num, intitule: COMPTE_PROV_CT_EXPLOIT.lib, debit: 0, credit: ecart.ecart },
    ],
  }
}

// ─── Disponibilités en devises (Art. 58) ─────────────────────────────────────
// Règle propre : écart constaté DIRECTEMENT en résultat (676/776), jamais via
// 478/479 — la disponibilité est immédiatement mobilisable au cours du jour,
// il n'y a pas d'attente de réalisation.
export function genererEcritureDisponibilites(
  designation: string, montantDevise: number, coursEntree: number, coursCloture: number, dateCloture: string
): EcritureFactureGeneree | null {
  const ecart = arrondi(montantDevise * (coursCloture - coursEntree))
  if (ecart === 0) return null
  const lignes: LigneEcritureFacture[] = ecart > 0
    ? [
        { compte: COMPTE_TRESORERIE.num, intitule: `${COMPTE_TRESORERIE.lib} (${designation})`, debit: ecart, credit: 0 },
        { compte: COMPTE_GAIN_CHANGE_FIN.num, intitule: COMPTE_GAIN_CHANGE_FIN.lib, debit: 0, credit: ecart },
      ]
    : [
        { compte: COMPTE_PERTE_CHANGE_FIN.num, intitule: COMPTE_PERTE_CHANGE_FIN.lib, debit: -ecart, credit: 0 },
        { compte: COMPTE_TRESORERIE.num, intitule: `${COMPTE_TRESORERIE.lib} (${designation})`, debit: 0, credit: -ecart },
      ]
  return { libelle: `Redressement disponibilités en devises : ${designation}`, date: dateCloture, lignes }
}

// ─── Hooks Firebase ───────────────────────────────────────────────────────────

export function useFacturesDevises(userId: string | undefined) {
  const [factures, setFactures] = useState<FactureDevise[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const q = query(
      collection(db, 'factures_devises'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, snap => {
      setFactures(snap.docs.map(d => ({ id: d.id, ...d.data() } as FactureDevise)))
      setLoading(false)
    }, err => { notifyFirestoreError('useFacturesDevises', err); setLoading(false) })
    return () => unsub()
  }, [userId])

  return { factures, loading }
}

export async function creerFacture(data: Omit<FactureDevise, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'factures_devises'), cleanUndefined({
    ...data,
    createdAt: serverTimestamp(),
  }))
  return ref.id
}

export async function supprimerFacture(id: string) {
  await deleteDoc(doc(db, 'factures_devises', id))
}
