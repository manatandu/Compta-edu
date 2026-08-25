import { useState, useEffect } from 'react'
import {
  collection, query, where, onSnapshot, orderBy,
  addDoc, deleteDoc, doc, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notifyFirestoreError } from '@/lib/firestoreErrorHandler'

// ─────────────────────────────────────────────────────────────────────────────
// Module 5 — Facturation (SYSCOHADA révisé)
// Deux couches empilées :
//  1. Le chapitre socle « Achats et ventes de biens et de services » (Partie 1
//     ch. 2, skill syscohada/ecritures ; et chapitre de notes de cours
//     « Clients/Fournisseurs/Emballages ») : lignes d'articles, réductions
//     commerciales en cascade (RRR), réduction financière (escompte, 673/773),
//     emballages consignés (4194/4094), avances et acomptes (4191/4091), TVA.
//  2. Le régime des créances/dettes COMMERCIALES en devises (Titre VIII ch. 22 ;
//     Art. 51 à 58 AUDCIF) — écarts de conversion à la clôture, disponibilités
//     en devises — repris tel quel du module d'origine, distinct du module 7
//     (Emprunts) qui traite les opérations FINANCIÈRES en devises. Comptes :
//     656/756 (change commercial) contre 676/776 (financier) ; 4781/4783/
//     4791/4793 (créances/dettes d'exploitation) ; provision court terme
//     6591/4991, sans étalement (Art. 56 ne vise que les emprunts).
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

export type Devise = 'CDF' | 'USD' | 'EUR'
export type TypeFacture = 'achat' | 'vente'

export interface LigneArticle {
  designation: string
  quantite: number
  prixUnitaire: number   // en devise de la facture
}

export interface ReductionCommerciale {
  libelle: string   // « Rabais », « Remise », « Ristourne », ou libre
  pct: number        // s'applique au solde laissé par la réduction précédente, jamais au brut
}

export interface EmballageConsigne {
  designation: string
  quantite: number
  prixUnitaireConsigne: number   // en devise
  identifiable: boolean           // matériel identifiable unité par unité → compte 24 ; sinon commercial → 6082/4194-4094
}

export interface FactureDevise {
  id: string
  userId: string
  type: TypeFacture
  tiers: string             // nom du fournisseur (achat) ou client (vente)
  reference: string
  devise: Devise
  coursEngagement: number   // CDF pour 1 unité de devise ; cours au comptant à la date de facture (Art. 52)
  lignes: LigneArticle[]
  reductionsCommerciales: ReductionCommerciale[]
  escomptePct: number
  escompteConditionnel: boolean   // true : rien à la facturation, tout au règlement anticipé. false : déduit d'office, TVA sur le net financier dès l'engagement.
  emballages: EmballageConsigne[]
  avanceRecue: number       // en devise ; 0 si aucune avance/acompte
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

// ─── Décompte de la facture (cascade RRR → net commercial → escompte → net
// financier → TVA → net à payer) ────────────────────────────────────────────
// Architecture de la cascade des réductions commerciales, telle que voulue :
//   Montant brut − Réduction 1 = Solde 1 − Réduction 2 = Solde 2 ... le
//   dernier solde devient le net commercial. Chaque réduction s'applique au
//   solde précédent, jamais au brut.
export interface EtapeCascadeReduction {
  libelle: string
  soldeAvant: number
  pct: number
  montantReduit: number
  solde: number
}

export interface DecompteFacture {
  brut: number
  etapesReductions: EtapeCascadeReduction[]
  netCommercial: number
  escompte: number            // toujours calculé (indicatif si conditionnel), sur le net commercial
  netFinancier: number
  baseTVA: number              // = netFinancier si escompte inconditionnel, = netCommercial si conditionnel
  tva: number
  netAPayer: number            // baseTVA + tva — hors emballages et avance
  totalEmballages: number
  avanceRecue: number
  netAEncaisser: number        // netAPayer + totalEmballages − avanceRecue : somme réellement mouvementée
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

function arrondi(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Décompte complet d'une facture, en boucle sur `reductionsCommerciales`
 * (liste libre, pas figée à rabais/remise/ristourne) — chaque réduction
 * s'applique au solde laissé par la précédente.
 * `coursConversion` = 1 pour le décompte tel qu'il apparaît sur la facture
 * (dans sa devise propre) ; = f.coursEngagement pour reconstruire le même
 * décompte directement en CDF (comptabilisation), en une seule cascade, sans
 * dérive d'arrondi entre deux conversions successives.
 */
export function calculerDecompte(
  f: Pick<FactureDevise, 'lignes' | 'reductionsCommerciales' | 'escomptePct' | 'escompteConditionnel' | 'tauxTVA' | 'emballages' | 'avanceRecue'>,
  coursConversion = 1
): DecompteFacture {
  const brut = arrondi(f.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0) * coursConversion)

  let solde = brut
  const etapesReductions: EtapeCascadeReduction[] = f.reductionsCommerciales.map(r => {
    const soldeAvant = solde
    const montantReduit = arrondi(soldeAvant * r.pct / 100)
    solde = arrondi(soldeAvant - montantReduit)
    return { libelle: r.libelle, soldeAvant, pct: r.pct, montantReduit, solde }
  })
  const netCommercial = solde

  const escompte = arrondi(netCommercial * f.escomptePct / 100)
  const netFinancier = arrondi(netCommercial - escompte)
  const baseTVA = f.escompteConditionnel ? netCommercial : netFinancier
  const tva = arrondi(baseTVA * f.tauxTVA)
  const netAPayer = arrondi(baseTVA + tva)

  const totalEmballages = arrondi(f.emballages.reduce((s, e) => s + e.quantite * e.prixUnitaireConsigne, 0) * coursConversion)
  const avanceRecue = arrondi(f.avanceRecue * coursConversion)
  const netAEncaisser = arrondi(netAPayer + totalEmballages - avanceRecue)

  return { brut, etapesReductions, netCommercial, escompte, netFinancier, baseTVA, tva, netAPayer, totalEmballages, avanceRecue, netAEncaisser }
}

/** Net à payer, dans la devise propre de la facture — pour l'affichage liste. */
export function netAPayerDevise(f: FactureDevise): number {
  return calculerDecompte(f, 1).netAEncaisser
}

// ─── Comptes ──────────────────────────────────────────────────────────────────

const COMPTE_FOURNISSEURS = { num: '401', lib: 'Fournisseurs' }
const COMPTE_CLIENTS = { num: '411', lib: 'Clients' }
const COMPTE_ACHATS = { num: '601', lib: 'Achats de marchandises' }
const COMPTE_VENTES = { num: '701', lib: 'Ventes de marchandises' }
const COMPTE_TVA_RECUP = { num: '445', lib: 'État, TVA récupérable' }
const COMPTE_TVA_FACTUREE = { num: '443', lib: 'État, TVA facturée' }
const COMPTE_TRESORERIE = { num: '521', lib: 'Banques locales' }
const COMPTE_ESCOMPTE_ACCORDE = { num: '673', lib: 'Escomptes accordés' }
const COMPTE_ESCOMPTE_OBTENU = { num: '773', lib: 'Escomptes obtenus' }
const COMPTE_EMB_CONSIGNES_FRS = { num: '4194', lib: 'Clients, dettes pour emballages et matériels consignés' }
const COMPTE_EMB_A_RENDRE_CLI = { num: '4094', lib: 'Fournisseurs, créances pour emballages et matériels à rendre' }
const COMPTE_BONI_EMBALLAGES = { num: '7074', lib: 'Bonis sur reprises et cessions d\'emballages' }
const COMPTE_MALI_EMBALLAGES = { num: '6224', lib: 'Malis sur emballages' }
const COMPTE_ACHAT_EMB_RECUP = { num: '6082', lib: 'Achats d\'emballages récupérables non identifiables' }
const COMPTE_MATERIEL_EMB = { num: '24', lib: 'Matériel d\'emballage récupérable et identifiable' }
const COMPTE_LOCATION_EMB = { num: '6225', lib: 'Locations d\'emballages' }
const COMPTE_AVANCE_RECUE = { num: '4191', lib: 'Clients créditeurs, avances et acomptes reçus' }
const COMPTE_AVANCE_VERSEE = { num: '4091', lib: 'Fournisseurs débiteurs, avances et acomptes versés' }
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

// ─── Écriture d'engagement — chez le fournisseur (vendeur) et chez le client
// (acheteur), en miroir ────────────────────────────────────────────────────
// 701/601 restent toujours au NET COMMERCIAL — les RRR n'y apparaissent
// jamais (absorbées dans le net), l'escompte n'y est jamais absorbé non plus,
// il sort par 673/773. Si l'escompte est CONDITIONNEL, rien n'est déduit ici :
// la TVA porte sur le net commercial complet, et 673/773 n'apparaît qu'à la
// réalisation (voir genererEcritureEscompteRealise ci-dessous).
export function genererEcritureEngagementFournisseur(f: FactureDevise): EcritureFactureGeneree {
  const d = calculerDecompte(f, f.coursEngagement)
  const lignes: LigneEcritureFacture[] = []
  const resteDu = arrondi(d.netAEncaisser)
  if (resteDu > 0) lignes.push({ compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: resteDu, credit: 0 })
  if (d.avanceRecue > 0) lignes.push({ compte: COMPTE_AVANCE_RECUE.num, intitule: COMPTE_AVANCE_RECUE.lib, debit: d.avanceRecue, credit: 0 })
  if (!f.escompteConditionnel && d.escompte > 0) lignes.push({ compte: COMPTE_ESCOMPTE_ACCORDE.num, intitule: COMPTE_ESCOMPTE_ACCORDE.lib, debit: d.escompte, credit: 0 })
  lignes.push({ compte: COMPTE_VENTES.num, intitule: COMPTE_VENTES.lib, debit: 0, credit: d.netCommercial })
  lignes.push({ compte: COMPTE_TVA_FACTUREE.num, intitule: COMPTE_TVA_FACTUREE.lib, debit: 0, credit: d.tva })
  if (d.totalEmballages > 0) lignes.push({ compte: COMPTE_EMB_CONSIGNES_FRS.num, intitule: COMPTE_EMB_CONSIGNES_FRS.lib, debit: 0, credit: d.totalEmballages })
  return { libelle: `Vente : ${f.tiers} : ${f.reference}`, date: f.dateFacture, lignes }
}

export function genererEcritureEngagementClient(f: FactureDevise): EcritureFactureGeneree {
  const d = calculerDecompte(f, f.coursEngagement)
  const lignes: LigneEcritureFacture[] = [
    { compte: COMPTE_ACHATS.num, intitule: COMPTE_ACHATS.lib, debit: d.netCommercial, credit: 0 },
    { compte: COMPTE_TVA_RECUP.num, intitule: COMPTE_TVA_RECUP.lib, debit: d.tva, credit: 0 },
  ]
  if (d.totalEmballages > 0) lignes.push({ compte: COMPTE_EMB_A_RENDRE_CLI.num, intitule: COMPTE_EMB_A_RENDRE_CLI.lib, debit: d.totalEmballages, credit: 0 })
  const resteDu = arrondi(d.netAEncaisser)
  if (resteDu > 0) lignes.push({ compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: 0, credit: resteDu })
  if (d.avanceRecue > 0) lignes.push({ compte: COMPTE_AVANCE_VERSEE.num, intitule: COMPTE_AVANCE_VERSEE.lib, debit: 0, credit: d.avanceRecue })
  if (!f.escompteConditionnel && d.escompte > 0) lignes.push({ compte: COMPTE_ESCOMPTE_OBTENU.num, intitule: COMPTE_ESCOMPTE_OBTENU.lib, debit: 0, credit: d.escompte })
  return { libelle: `Achat : ${f.tiers} : ${f.reference}`, date: f.dateFacture, lignes }
}

// ─── Escompte conditionnel réalisé au règlement anticipé ────────────────────
// Rien n'a été comptabilisé à la facturation (voir ci-dessus) : au règlement,
// si la condition (paiement sous le délai annoncé) est remplie, l'escompte et
// sa correction de TVA sortent, toujours via 673/774 — jamais une simple
// diminution de 701/601. Simplification assumée : le règlement est supposé
// se faire au même cours que l'engagement (le risque de change proprement dit
// est traité séparément, onglet Écarts).
export function genererEcritureEscompteRealiseFournisseur(f: FactureDevise, dateReglement: string): EcritureFactureGeneree {
  const d = calculerDecompte(f, f.coursEngagement)
  const correctionTVA = arrondi(d.escompte * f.tauxTVA)
  const montantRegle = arrondi(d.netAPayer - d.escompte - correctionTVA)
  return {
    libelle: `Règlement anticipé (escompte) : ${f.tiers} : ${f.reference}`,
    date: dateReglement,
    lignes: [
      { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: montantRegle, credit: 0 },
      { compte: COMPTE_ESCOMPTE_ACCORDE.num, intitule: COMPTE_ESCOMPTE_ACCORDE.lib, debit: d.escompte, credit: 0 },
      { compte: COMPTE_TVA_FACTUREE.num, intitule: `${COMPTE_TVA_FACTUREE.lib} (correction)`, debit: correctionTVA, credit: 0 },
      { compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: 0, credit: d.netAPayer },
    ],
  }
}

export function genererEcritureEscompteRealiseClient(f: FactureDevise, dateReglement: string): EcritureFactureGeneree {
  const d = calculerDecompte(f, f.coursEngagement)
  const correctionTVA = arrondi(d.escompte * f.tauxTVA)
  const montantRegle = arrondi(d.netAPayer - d.escompte - correctionTVA)
  return {
    libelle: `Règlement anticipé (escompte) : ${f.tiers} : ${f.reference}`,
    date: dateReglement,
    lignes: [
      { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: d.netAPayer, credit: 0 },
      { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: 0, credit: montantRegle },
      { compte: COMPTE_ESCOMPTE_OBTENU.num, intitule: COMPTE_ESCOMPTE_OBTENU.lib, debit: 0, credit: d.escompte },
      { compte: COMPTE_TVA_RECUP.num, intitule: `${COMPTE_TVA_RECUP.lib} (correction)`, debit: 0, credit: correctionTVA },
    ],
  }
}

// ─── Avances et acomptes sur commande ────────────────────────────────────────
// Acompte : versé avant tout commencement d'exécution. Avance : versée sur
// justification d'une exécution partielle. Même logique miroir que les
// emballages consignés, mais sur une dette/créance CONDITIONNELLE (à
// rembourser si la commande n'est pas exécutée) plutôt qu'un dépôt de
// garantie — comptes 4191 (fournisseur) / 4091 (client), ouverts à la
// réception, soldés par imputation sur la facture définitive (déjà pris en
// compte dans genererEcritureEngagementFournisseur/Client ci-dessus).
export function genererEcritureAvanceRecueFournisseur(tiers: string, montantCDF: number, date: string): EcritureFactureGeneree {
  return {
    libelle: `Avance reçue : ${tiers}`,
    date,
    lignes: [
      { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: montantCDF, credit: 0 },
      { compte: COMPTE_AVANCE_RECUE.num, intitule: COMPTE_AVANCE_RECUE.lib, debit: 0, credit: montantCDF },
    ],
  }
}

export function genererEcritureAvanceVerseeClient(tiers: string, montantCDF: number, date: string): EcritureFactureGeneree {
  return {
    libelle: `Avance versée : ${tiers}`,
    date,
    lignes: [
      { compte: COMPTE_AVANCE_VERSEE.num, intitule: COMPTE_AVANCE_VERSEE.lib, debit: montantCDF, credit: 0 },
      { compte: COMPTE_TRESORERIE.num, intitule: COMPTE_TRESORERIE.lib, debit: 0, credit: montantCDF },
    ],
  }
}

// ─── Emballages consignés — dénouement (3 issues, cf. Notions sur les
// emballages) ─────────────────────────────────────────────────────────────
// 1. Retour au prix de consigne exact : extourne pure.
// 2. Retour à un prix inférieur : la différence rémunère un service rendu
//    (usure, dommage) et est SOUMISE À TVA (source IGC/BGF) — 7074 chez le
//    fournisseur, 6224 chez le client, tous deux accompagnés de la TVA.
// 3. Non-retour : la consignation devient une vente, soumise à TVA sur la
//    totalité — mécanisme identique au cas 2 sur le prix de consigne entier.
//    La source ne donne pas de corrigé chiffré pour ce cas précis : traité
//    ici par symétrie avec le cas 2, à vérifier avec prudence en pratique.
export function genererEcritureRetourEmballageFournisseur(
  designation: string, montantConsigneCDF: number, montantRepriseCDF: number, tauxTVA: number, date: string
): EcritureFactureGeneree {
  if (montantRepriseCDF >= montantConsigneCDF) {
    return {
      libelle: `Retour emballages (identique) : ${designation}`,
      date,
      lignes: [
        { compte: COMPTE_EMB_CONSIGNES_FRS.num, intitule: COMPTE_EMB_CONSIGNES_FRS.lib, debit: montantConsigneCDF, credit: 0 },
        { compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: 0, credit: montantConsigneCDF },
      ],
    }
  }
  const boniHT = arrondi(montantConsigneCDF - montantRepriseCDF)
  const tvaBoni = arrondi(boniHT * tauxTVA)
  const netRembourse = arrondi(montantConsigneCDF - boniHT - tvaBoni)
  return {
    libelle: `Retour emballages (écart) : ${designation}`,
    date,
    lignes: [
      { compte: COMPTE_EMB_CONSIGNES_FRS.num, intitule: COMPTE_EMB_CONSIGNES_FRS.lib, debit: montantConsigneCDF, credit: 0 },
      { compte: COMPTE_BONI_EMBALLAGES.num, intitule: COMPTE_BONI_EMBALLAGES.lib, debit: 0, credit: boniHT },
      { compte: '443', intitule: 'État, TVA facturée', debit: 0, credit: tvaBoni },
      { compte: COMPTE_CLIENTS.num, intitule: COMPTE_CLIENTS.lib, debit: 0, credit: netRembourse },
    ],
  }
}

export function genererEcritureRetourEmballageClient(
  designation: string, montantConsigneCDF: number, montantRepriseCDF: number, tauxTVA: number, date: string
): EcritureFactureGeneree {
  if (montantRepriseCDF >= montantConsigneCDF) {
    return {
      libelle: `Retour emballages (identique) : ${designation}`,
      date,
      lignes: [
        { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: montantConsigneCDF, credit: 0 },
        { compte: COMPTE_EMB_A_RENDRE_CLI.num, intitule: COMPTE_EMB_A_RENDRE_CLI.lib, debit: 0, credit: montantConsigneCDF },
      ],
    }
  }
  const maliHT = arrondi(montantConsigneCDF - montantRepriseCDF)
  const tvaMali = arrondi(maliHT * tauxTVA)
  const netRecupere = arrondi(montantConsigneCDF - maliHT - tvaMali)
  return {
    libelle: `Retour emballages (écart) : ${designation}`,
    date,
    lignes: [
      { compte: COMPTE_MALI_EMBALLAGES.num, intitule: COMPTE_MALI_EMBALLAGES.lib, debit: maliHT, credit: 0 },
      { compte: '445', intitule: 'État, TVA récupérable', debit: tvaMali, credit: 0 },
      { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: netRecupere, credit: 0 },
      { compte: COMPTE_EMB_A_RENDRE_CLI.num, intitule: COMPTE_EMB_A_RENDRE_CLI.lib, debit: 0, credit: montantConsigneCDF },
    ],
  }
}

export function genererEcritureNonRetourEmballageFournisseur(
  designation: string, montantConsigneCDF: number, tauxTVA: number, identifiable: boolean, date: string
): EcritureFactureGeneree {
  const compteProduit = identifiable ? { num: '82', lib: 'Produits des cessions d\'immobilisations' } : COMPTE_BONI_EMBALLAGES
  const ht = arrondi(montantConsigneCDF / (1 + tauxTVA))
  const tva = arrondi(montantConsigneCDF - ht)
  return {
    libelle: `Non-retour emballages (cession) : ${designation}`,
    date,
    lignes: [
      { compte: COMPTE_EMB_CONSIGNES_FRS.num, intitule: COMPTE_EMB_CONSIGNES_FRS.lib, debit: montantConsigneCDF, credit: 0 },
      { compte: compteProduit.num, intitule: compteProduit.lib, debit: 0, credit: ht },
      { compte: '443', intitule: 'État, TVA facturée', debit: 0, credit: tva },
    ],
  }
}

export function genererEcritureNonRetourEmballageClient(
  designation: string, montantConsigneCDF: number, tauxTVA: number, identifiable: boolean, date: string
): EcritureFactureGeneree {
  const compteCharge = identifiable ? COMPTE_MATERIEL_EMB : COMPTE_ACHAT_EMB_RECUP
  const ht = arrondi(montantConsigneCDF / (1 + tauxTVA))
  const tva = arrondi(montantConsigneCDF - ht)
  return {
    libelle: `Non-retour emballages (achat) : ${designation}`,
    date,
    lignes: [
      { compte: compteCharge.num, intitule: compteCharge.lib, debit: ht, credit: 0 },
      { compte: '445', intitule: 'État, TVA récupérable', debit: tva, credit: 0 },
      { compte: COMPTE_EMB_A_RENDRE_CLI.num, intitule: COMPTE_EMB_A_RENDRE_CLI.lib, debit: 0, credit: montantConsigneCDF },
    ],
  }
}

// ─── Emballages loués (distinct de la consignation, pas de 4194/4094) ───────
export function genererEcritureLocationEmballageClient(designation: string, montantCDF: number, date: string): EcritureFactureGeneree {
  return {
    libelle: `Location d'emballages : ${designation}`,
    date,
    lignes: [
      { compte: COMPTE_LOCATION_EMB.num, intitule: COMPTE_LOCATION_EMB.lib, debit: montantCDF, credit: 0 },
      { compte: COMPTE_FOURNISSEURS.num, intitule: COMPTE_FOURNISSEURS.lib, debit: 0, credit: montantCDF },
    ],
  }
}

// ─── Écarts de conversion à la clôture (Art. 54) ─────────────────────────────
// Inchangé : décorrélé du décompte de la facture (le solde restant, au cours
// de clôture, est saisi manuellement — il ne dérive pas de lignes/RRR).
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

// Écriture : constatation de l'écart, directement sur le compte 401/411.
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

// Provision pour risques à court terme — uniquement en cas de perte latente,
// JAMAIS étalée (Art. 56 ne vise que les emprunts/prêts multi-exercices ;
// une créance/dette commerciale est par nature à court terme). Cf. exemple
// III.3-III.4 : provision = écart intégral, sans prorata.
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

// ─── Règlement avant clôture (Art. 53-55, écart RÉALISÉ) — inchangé ─────────
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

// ─── Disponibilités en devises (Art. 58) — inchangé ──────────────────────────
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
