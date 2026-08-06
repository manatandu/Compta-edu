/**
 * ApercuDevoirPage : Récapitulatif complet d'un devoir avant soumission
 * Affiche Journal, Grand Livre, Balance, Bilan Actif, Bilan Passif, Compte de Résultat
 * Paramètres URL hash : ?devoir=DEVOIR_ID&session=SESSION_ID
 */
import BackButton from '@/components/BackButton'
import React, { useState, useEffect, useMemo } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useUser } from '@/lib/userContext'
import { getEcrituresAsync, createSoumissionAsync } from '@/lib/db-firebase'
import { formatMontant } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, BookOpen, BookMarked, Scale, BarChart2, FileText, AlertTriangle } from 'lucide-react'
import type { Ecriture } from '@/lib/db'

// ─── Helpers bilan (copiés depuis BilanPage) ─────────────────────────────────

function estCorrectif(num: string): boolean {
  return (
    num.startsWith("29") ||
    num.startsWith("39") ||
    (num.startsWith("49") && !num.startsWith("499")) ||
    (num.startsWith("59") && !num.startsWith("599"))
  )
}

const ACTIF_RUBRIQUES = [
  { ref: "AD", label: "IMMOBILISATIONS INCORPORELLES",               note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AE", label: "Frais de développement et de prospection",    note: "",   comptesBrut: ["211","2181","2191"],                         comptesCorr: ["2811","2818","2911","2918","2919"] },
  { ref: "AF", label: "Brevets, licences, logiciels et droits similaires", note: "", comptesBrut: ["212","213","214","2193"],               comptesCorr: ["2812","2813","2814","2912","2913","2914","2929"] },
  { ref: "AG", label: "Fonds commercial et droit au bail",           note: "",   comptesBrut: ["215","216"],                                 comptesCorr: ["2915","2916"] },
  { ref: "AH", label: "Autres immobilisations incorporelles",        note: "",   comptesBrut: ["2171","2172","2173","2174","2175","2176","2177","2178","2179","2182","2183","2184","2185","2186","2187","2189"], comptesCorr: ["2817","2818","2917","2918","2919"] },
  { ref: "AI", label: "IMMOBILISATIONS CORPORELLES",                 note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AJ", label: "Terrains",                                    note: "",   comptesBrut: ["22"],                                        comptesCorr: ["282","292"] },
  { ref: "AK", label: "Bâtiments",                                   note: "",   comptesBrut: ["231","232","233","237","2391"],               comptesCorr: ["2831","2832","2833","2837","2931","2932","2933","2937","2939"] },
  { ref: "AL", label: "Aménagements, agencements et installations",  note: "",   comptesBrut: ["234","235","238","2392","2393"],              comptesCorr: ["2834","2835","2838","2934","2935","2938","2939"] },
  { ref: "AM", label: "Matériel, mobilier et actifs biologiques",    note: "",   comptesBrut: ["24"],                                        comptesCorr: ["284","294","2949"], comptesExcluBrut: ["245","2495"], comptesExcluCorr: ["2845","2948"] },
  { ref: "AN", label: "Matériel de transport",                       note: "",   comptesBrut: ["245","2495"],                                comptesCorr: ["2845","2945","2949"] },
  { ref: "AP", label: "Avances et acomptes versés sur immobilisations", note: "3", comptesBrut: ["251","252"],                              comptesCorr: ["2951","2952"] },
  { ref: "AQ", label: "IMMOBILISATIONS FINANCIÈRES",                 note: "4",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AR", label: "Titres de participation",                     note: "",   comptesBrut: ["26"],                                        comptesCorr: ["296"] },
  { ref: "AS", label: "Autres immobilisations financières",          note: "",   comptesBrut: ["27"],                                        comptesCorr: ["297"] },
  { ref: "AZ", label: "TOTAL ACTIF IMMOBILISÉ",                      note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["AD","AI","AQ"] },
  { ref: "BA", label: "ACTIF CIRCULANT HAO",                         note: "5",  comptesBrut: ["485","488"],                                 comptesCorr: ["498"] },
  { ref: "BB", label: "STOCKS ET ENCOURS",                           note: "6",  comptesBrut: ["31","32","33","34","35","36","37","38"],      comptesCorr: ["39"] },
  { ref: "BG", label: "CRÉANCES ET EMPLOIS ASSIMILÉS",               note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "BH", label: "Fournisseurs, avances versées",               note: "17", comptesBrut: ["409"],                                       comptesCorr: ["490"] },
  { ref: "BI", label: "Clients",                                     note: "7",  comptesBrut: ["411","412","413","414","415","416","417","418"], comptesCorr: ["491"] },
  { ref: "BJ", label: "Autres créances",                             note: "8",  comptesBrut: ["185","42","43","44","45","46","471","472","473","474","475","476","477","479"], comptesCorr: ["492","493","494","495","496","497"] },
  { ref: "BK", label: "TOTAL ACTIF CIRCULANT",                       note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BA","BB","BG"] },
  { ref: "BQ", label: "Titres de placement",                         note: "9",  comptesBrut: ["50"],                                        comptesCorr: ["590"] },
  { ref: "BR", label: "Valeurs à encaisser",                         note: "10", comptesBrut: ["51"],                                        comptesCorr: ["591"] },
  { ref: "BS", label: "Banques, chèques postaux, caisse et assimilés", note: "11", comptesBrut: ["52","53","54","55","57","581","582","592","593","595"], comptesCorr: ["592","593","594"] },
  { ref: "BT", label: "TOTAL TRÉSORERIE-ACTIF",                      note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BQ","BR","BS"] },
  { ref: "BU", label: "Écart de conversion-Actif",                   note: "12", comptesBrut: ["478"],                                       comptesCorr: [] },
  { ref: "BZ", label: "TOTAL GÉNÉRAL",                               note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isGrandTotal: true },
] as const

const PASSIF_RUBRIQUES = [
  { ref: "CA", label: "Capital",                                                note: "13", comptes: ["10","101","102","103","104"] },
  { ref: "CB", label: "Apporteurs capital non appelé (-)",                      note: "13", comptes: ["109"] },
  { ref: "CD", label: "Primes liées au capital social",                         note: "14", comptes: ["105"] },
  { ref: "CE", label: "Écarts de réévaluation",                                note: "3e", comptes: ["106"] },
  { ref: "CF", label: "Réserves indisponibles",                                 note: "14", comptes: ["111","112","113"] },
  { ref: "CG", label: "Réserves libres",                                        note: "14", comptes: ["118"] },
  { ref: "CH", label: "Report à nouveau (+ ou -)",                              note: "14", comptes: ["12","121","129"], isSigne: true },
  { ref: "CJ", label: "Résultat net de l'exercice (bénéfice + ou perte -)",     note: "",   comptes: ["13","131","139"], isResultat: true, isSigne: true },
  { ref: "CL", label: "Subventions d'investissement",                           note: "15", comptes: ["14"] },
  { ref: "CM", label: "Provisions réglementées",                                note: "15", comptes: ["15"] },
  { ref: "CP", label: "TOTAL CAPITAUX PROPRES ET RESSOURCES ASSIMILÉES",        note: "",   comptes: [], isTotal: true, totalRefs: ["CA","CB","CD","CE","CF","CG","CH","CJ","CL","CM"] },
  { ref: "DA", label: "Emprunts et dettes financières diverses",                note: "16", comptes: ["16","181","182","183","184"] },
  { ref: "DB", label: "Dettes de location acquisition",                         note: "16", comptes: ["17"] },
  { ref: "DC", label: "Provisions pour risques et charges",                     note: "16", comptes: ["19"] },
  { ref: "DD", label: "TOTAL DETTES FINANCIÈRES ET RESSOURCES ASSIMILÉES",      note: "",   comptes: [], isTotal: true, totalRefs: ["DA","DB","DC"] },
  { ref: "DF", label: "TOTAL RESSOURCES STABLES",                               note: "",   comptes: [], isTotal: true, totalRefs: ["CP","DD"] },
  { ref: "DH", label: "Dettes circulantes HAO",                                 note: "5",  comptes: ["481","482","484","4998"] },
  { ref: "DI", label: "Clients, avances reçues",                                note: "7",  comptes: ["419"] },
  { ref: "DJ", label: "Fournisseurs d'exploitation",                            note: "17", comptes: ["40"], comptesExclu: ["409"] },
  { ref: "DK", label: "Dettes fiscales et sociales",                            note: "18", comptes: ["42","43","44"] },
  { ref: "DM", label: "Autres dettes",                                          note: "19", comptes: ["185","45","46","47"], comptesExclu: ["479"] },
  { ref: "DN", label: "Provisions pour risques à court terme",                  note: "19", comptes: ["499","599"], comptesExclu: ["4998"] },
  { ref: "DP", label: "TOTAL PASSIF CIRCULANT",                                 note: "",   comptes: [], isTotal: true, totalRefs: ["DH","DI","DJ","DK","DM","DN"] },
  { ref: "DQ", label: "Banques, crédits d'escompte",                            note: "20", comptes: ["564","565"] },
  { ref: "DR", label: "Banques, établissements financiers et crédits de trésorerie", note: "20", comptes: ["52","53","561","566"] },
  { ref: "DT", label: "TOTAL TRÉSORERIE-PASSIF",                                note: "",   comptes: [], isTotal: true, totalRefs: ["DQ","DR"] },
  { ref: "DV", label: "Écart de conversion-Passif",                             note: "12", comptes: ["479"] },
  { ref: "DZ", label: "TOTAL GÉNÉRAL",                                          note: "",   comptes: [], isGrandTotal: true },
] as const

const CR_RUBRIQUES = [
  { ref: "TA", label: "Ventes de marchandises",                               sens: "+",   note: "21", comptes: ["701"] },
  { ref: "RA", label: "Achats de marchandises",                               sens: "-",   note: "22", comptes: ["601"] },
  { ref: "RB", label: "Variation de stocks de marchandises",                  sens: "-/+", note: "6",  comptes: ["6031"] },
  { ref: "XA", label: "MARGE COMMERCIALE",                                    sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "TB", label: "Ventes de produits fabriqués",                         sens: "+",   note: "21", comptes: ["702","703","704"] },
  { ref: "TC", label: "Travaux, services vendus",                             sens: "+",   note: "21", comptes: ["705","706"] },
  { ref: "TD", label: "Produits accessoires",                                 sens: "+",   note: "21", comptes: ["707"] },
  { ref: "XB", label: "CHIFFRE D'AFFAIRES",                                   sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "TE", label: "Production stockée (ou déstockage)",                   sens: "-/+", note: "6",  comptes: ["73"] },
  { ref: "TF", label: "Production immobilisée",                               sens: "",    note: "21", comptes: ["72"] },
  { ref: "TG", label: "Subventions d'exploitation",                           sens: "",    note: "21", comptes: ["71"] },
  { ref: "TH", label: "Autres produits",                                      sens: "+",   note: "21", comptes: ["75"] },
  { ref: "TI", label: "Transferts de charges d'exploitation",                 sens: "+",   note: "12", comptes: ["781"] },
  { ref: "RC", label: "Achats de matières premières et fournitures liées",    sens: "-",   note: "22", comptes: ["602"] },
  { ref: "RD", label: "Variation de stocks de matières premières",            sens: "-/+", note: "6",  comptes: ["6032"] },
  { ref: "RE", label: "Autres achats",                                        sens: "-",   note: "22", comptes: ["604","605","608"] },
  { ref: "RF", label: "Variation de stocks d'autres approvisionnements",      sens: "-/+", note: "6",  comptes: ["6033"] },
  { ref: "RG", label: "Transports",                                           sens: "-",   note: "23", comptes: ["61"] },
  { ref: "RH", label: "Services extérieurs",                                  sens: "-",   note: "24", comptes: ["62","63"] },
  { ref: "RI", label: "Impôts et taxes",                                      sens: "-",   note: "25", comptes: ["64"] },
  { ref: "RJ", label: "Autres charges",                                       sens: "-",   note: "26", comptes: ["65"] },
  { ref: "XC", label: "VALEUR AJOUTÉE",                                       sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "RK", label: "Charges de personnel",                                 sens: "-",   note: "27", comptes: ["66"] },
  { ref: "XD", label: "EXCÉDENT BRUT D'EXPLOITATION",                         sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "TJ", label: "Reprises d'amortissements, provisions et dépréciations", sens: "+", note: "28", comptes: ["791","798","799"] },
  { ref: "RL", label: "Dotations aux amortissements, provisions",             sens: "-",   note: "28", comptes: ["681","691"] },
  { ref: "XE", label: "RÉSULTAT D'EXPLOITATION",                              sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "TK", label: "Revenus financiers et assimilés",                      sens: "+",   note: "29", comptes: ["77"] },
  { ref: "TL", label: "Reprises de provisions et dépréciations financières",  sens: "+",   note: "28", comptes: ["797"] },
  { ref: "TM", label: "Transferts de charges financières",                    sens: "+",   note: "12", comptes: ["787"] },
  { ref: "RM", label: "Frais financiers et charges assimilées",               sens: "-",   note: "29", comptes: ["67"] },
  { ref: "RN", label: "Dotations aux provisions financières",                 sens: "-",   note: "28", comptes: ["697"] },
  { ref: "XF", label: "RÉSULTAT FINANCIER",                                   sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "XG", label: "RÉSULTAT DES ACTIVITÉS ORDINAIRES",                    sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "TN", label: "Produits des cessions d'immobilisations",              sens: "+",   note: "3D", comptes: ["82"] },
  { ref: "TO", label: "Autres Produits HAO",                                  sens: "+",   note: "30", comptes: ["84","86","88"] },
  { ref: "RO", label: "Valeurs comptables des cessions d'immobilisations",    sens: "-",   note: "3D", comptes: ["81"] },
  { ref: "RP", label: "Autres Charges HAO",                                   sens: "-",   note: "30", comptes: ["83","85"] },
  { ref: "XH", label: "RÉSULTAT HORS ACTIVITÉS ORDINAIRES",                   sens: "",    note: "",   comptes: [], isTotal: true },
  { ref: "RQ", label: "Participation des travailleurs",                       sens: "-",   note: "30", comptes: ["87"] },
  { ref: "RS", label: "Impôts sur le résultat",                               sens: "-",   note: "",   comptes: ["89"] },
  { ref: "XI", label: "RÉSULTAT NET",                                          sens: "",    note: "",   comptes: [], isGrandTotal: true },
] as const

// ─── Onglets ──────────────────────────────────────────────────────────────────
const ONGLETS = [
  { id: 'journal',   label: 'Journal',          icon: BookOpen },
  { id: 'grandlivre',label: 'Grand Livre',      icon: BookMarked },
  { id: 'balance',   label: 'Balance',          icon: Scale },
  { id: 'bilan',     label: 'Bilan Actif',      icon: FileText },
  { id: 'passif',    label: 'Bilan Passif',     icon: FileText },
  { id: 'cr',        label: 'Compte de Résultat', icon: BarChart2 },
]

// ─── Composant principal ──────────────────────────────────────────────────────
export default function ApercuDevoirPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  // Lire les paramètres depuis le hash
  const { devoirId, sessionId } = useMemo(() => {
    const hash = window.location.hash
    const devoirMatch = hash.match(/[?&]devoir=([^&]+)/)
    const sessionMatch = hash.match(/[?&]session=([^&]+)/)
    return {
      devoirId: devoirMatch ? devoirMatch[1] : '',
      sessionId: sessionMatch ? sessionMatch[1] : '',
    }
  }, [])

  const [ecritures, setEcritures] = useState<Ecriture[]>([])
  const [loading, setLoading] = useState(true)
  const [onglet, setOnglet] = useState('journal')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!user?.id || !sessionId) return
    getEcrituresAsync(user.id, sessionId)
      .then(data => setEcritures(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id, sessionId])

  // ── Calcul Journal (groupé par ligneGroupe, débit avant crédit) ──────────
  const grouped = useMemo(() => {
    const map = new Map<string, Ecriture[]>()
    ecritures.forEach(e => {
      if (!map.has(e.ligneGroupe)) map.set(e.ligneGroupe, [])
      map.get(e.ligneGroupe)!.push(e)
    })
    // Trier : débit d'abord, puis crédit
    map.forEach((lines, key) => {
      map.set(key, [
        ...lines.filter(l => l.debit > 0),
        ...lines.filter(l => l.credit > 0),
      ])
    })
    return Array.from(map.entries()).sort(([, a], [, b]) =>
      (a[0]?.date ?? '').localeCompare(b[0]?.date ?? '')
    )
  }, [ecritures])

  // ── Calcul Grand Livre ───────────────────────────────────────────────────
  const comptesGL = useMemo(() => {
    const map = new Map<string, { intitule: string; lignes: Ecriture[] }>()
    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) map.set(e.numeroCompte, { intitule: e.intituleCompte, lignes: [] })
      map.get(e.numeroCompte)!.lignes.push(e)
    })
    return Array.from(map.entries())
      .map(([numero, data]) => {
        const totalDebit = data.lignes.reduce((s, l) => s + l.debit, 0)
        const totalCredit = data.lignes.reduce((s, l) => s + l.credit, 0)
        const diff = totalDebit - totalCredit
        return {
          numero,
          intitule: data.intitule,
          lignes: data.lignes.sort((a, b) => a.date.localeCompare(b.date)),
          totalDebit,
          totalCredit,
          soldeDebiteur: diff > 0 ? diff : 0,
          soldeCrediteur: diff < 0 ? -diff : 0,
        }
      })
      .sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  // ── Calcul Balance ───────────────────────────────────────────────────────
  const lignesBalance = useMemo(() => {
    const map = new Map<string, { intitule: string; mouvD: number; mouvC: number }>()
    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) map.set(e.numeroCompte, { intitule: e.intituleCompte, mouvD: 0, mouvC: 0 })
      const l = map.get(e.numeroCompte)!
      l.mouvD += e.debit
      l.mouvC += e.credit
    })
    return Array.from(map.entries())
      .map(([numero, d]) => {
        const diff = d.mouvD - d.mouvC
        return {
          numero,
          intitule: d.intitule,
          mouvD: d.mouvD,
          mouvC: d.mouvC,
          soldeD: diff > 0 ? diff : 0,
          soldeC: diff < 0 ? -diff : 0,
        }
      })
      .sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  const totalsBalance = useMemo(() => ({
    mouvD: lignesBalance.reduce((s, l) => s + l.mouvD, 0),
    mouvC: lignesBalance.reduce((s, l) => s + l.mouvC, 0),
    soldeD: lignesBalance.reduce((s, l) => s + l.soldeD, 0),
    soldeC: lignesBalance.reduce((s, l) => s + l.soldeC, 0),
  }), [lignesBalance])

  // ── Calcul Bilan / CR ────────────────────────────────────────────────────
  const soldes = useMemo(() => {
    const map = new Map<string, { debit: number; credit: number }>()
    ecritures.forEach(e => {
      const s = map.get(e.numeroCompte) ?? { debit: 0, credit: 0 }
      s.debit += e.debit; s.credit += e.credit
      map.set(e.numeroCompte, s)
    })
    return map
  }, [ecritures])

  function getSoldesBrut(prefixes: string[], exclu: string[] = []): number {
    let total = 0
    soldes.forEach((s, num) => {
      if (!estCorrectif(num) && prefixes.some(p => num.startsWith(p)) && !exclu.some(e => num.startsWith(e))) {
        const net = s.debit - s.credit
        if (net > 0) total += net
      }
    })
    return total
  }
  function getSoldesCorr(prefixes: string[], exclu: string[] = []): number {
    let total = 0
    soldes.forEach((s, num) => {
      if (estCorrectif(num) && prefixes.some(p => num.startsWith(p)) && !exclu.some(e => num.startsWith(e))) {
        const net = s.credit - s.debit
        if (net > 0) total += net
      }
    })
    return total
  }
  function getSoldesPassif(prefixes: string[], exclu: string[] = [], isSigne = false): number {
    let total = 0
    soldes.forEach((s, num) => {
      if (prefixes.some(p => num.startsWith(p)) && !exclu.some(e => num.startsWith(e))) {
        const net = s.credit - s.debit
        total += isSigne ? net : (net > 0 ? net : 0)
      }
    })
    return total
  }
  function getSoldesCR(prefixes: string[]): number {
    let total = 0
    soldes.forEach((s, num) => {
      if (prefixes.some(p => num.startsWith(p))) total += s.debit - s.credit
    })
    return total
  }

  const resultatNet = useMemo(() => {
    let produits = 0, charges = 0
    soldes.forEach((s, num) => {
      if (num.startsWith("7")) produits += s.credit - s.debit
      if (num.startsWith("6")) charges += s.debit - s.credit
      if (num.startsWith("8")) {
        const net = s.debit - s.credit
        if (net > 0) charges += net; else produits += -net
      }
    })
    return produits - charges
  }, [soldes])

  const actifVals = useMemo(() => {
    type ActifRow = { brut: number; corr: number; net: number }
    const vals = new Map<string, ActifRow>()
    for (const r of ACTIF_RUBRIQUES) {
      if ((r as any).isSection || (r as any).isTotal || (r as any).isGrandTotal) { vals.set(r.ref, { brut: 0, corr: 0, net: 0 }); continue }
      const excluBrut = (r as any).comptesExcluBrut ?? []
      const excluCorr = (r as any).comptesExcluCorr ?? []
      const brut = getSoldesBrut([...(r as any).comptesBrut], excluBrut)
      const corr = getSoldesCorr([...(r as any).comptesCorr], excluCorr)
      vals.set(r.ref, { brut, corr, net: Math.max(0, brut - corr) })
    }
    const sectionMap: Record<string, string[]> = { "AD":["AE","AF","AG","AH"], "AI":["AJ","AK","AL","AM","AN","AP"], "AQ":["AR","AS"], "BG":["BH","BI","BJ"] }
    for (const [sec, children] of Object.entries(sectionMap)) {
      const b = children.reduce((s, c) => s + (vals.get(c)?.brut ?? 0), 0)
      const c2 = children.reduce((s, c) => s + (vals.get(c)?.corr ?? 0), 0)
      vals.set(sec, { brut: b, corr: c2, net: Math.max(0, b - c2) })
    }
    const totalsM: Record<string, string[]> = { "AZ":["AD","AI","AQ"], "BK":["BA","BB","BG"], "BT":["BQ","BR","BS"] }
    for (const [tot, refs] of Object.entries(totalsM)) {
      const b = refs.reduce((s, r) => s + (vals.get(r)?.brut ?? 0), 0)
      const c2 = refs.reduce((s, r) => s + (vals.get(r)?.corr ?? 0), 0)
      vals.set(tot, { brut: b, corr: c2, net: Math.max(0, b - c2) })
    }
    const bz = ["AZ","BK","BT","BU"].reduce((s, r) => s + (vals.get(r)?.net ?? 0), 0)
    vals.set("BZ", { brut: bz, corr: 0, net: bz })
    return vals
  }, [soldes])

  const passifVals = useMemo(() => {
    const vals = new Map<string, number>()
    for (const r of PASSIF_RUBRIQUES) {
      if ((r as any).isTotal || (r as any).isGrandTotal) { vals.set(r.ref, 0); continue }
      if ((r as any).isResultat) { vals.set(r.ref, resultatNet); continue }
      const exclu = (r as any).comptesExclu ?? []
      const isSigne = (r as any).isSigne ?? false
      vals.set(r.ref, getSoldesPassif([...(r as any).comptes], exclu, isSigne))
    }
    const totalsM: Record<string, string[]> = { "CP":["CA","CB","CD","CE","CF","CG","CH","CJ","CL","CM"], "DD":["DA","DB","DC"], "DF":["CP","DD"], "DP":["DH","DI","DJ","DK","DM","DN"], "DT":["DQ","DR"] }
    for (const [tot, refs] of Object.entries(totalsM)) vals.set(tot, refs.reduce((s, r) => s + (vals.get(r) ?? 0), 0))
    const dv = vals.get("DV") ?? 0
    vals.set("DZ", (vals.get("DF") ?? 0) + (vals.get("DP") ?? 0) + (vals.get("DT") ?? 0) + dv)
    return vals
  }, [soldes, resultatNet])

  const crVals = useMemo(() => {
    type CRVal = { montant: number }
    const vals = new Map<string, CRVal>()
    for (const r of CR_RUBRIQUES) {
      if ((r as any).isTotal || (r as any).isGrandTotal) continue
      vals.set(r.ref, { montant: Math.abs(getSoldesCR([...(r as any).comptes])) })
    }
    const g = (k: string) => vals.get(k)?.montant ?? 0
    const xa = g("TA") - g("RA") - g("RB")
    const xb = g("TA") + g("TB") + g("TC") + g("TD")
    const xc = xb - g("RA") - g("RB") + g("TE") + g("TF") + g("TG") + g("TH") + g("TI") - g("RC") - g("RD") - g("RE") - g("RF") - g("RG") - g("RH") - g("RI") - g("RJ")
    const xd = xc - g("RK")
    const xe = xd + g("TJ") - g("RL")
    const xf = g("TK") + g("TL") + g("TM") - g("RM") - g("RN")
    const xg = xe + xf
    const xh = g("TN") + g("TO") - g("RO") - g("RP")
    const xi = xg + xh - g("RQ") - g("RS")
    vals.set("XA", { montant: xa }); vals.set("XB", { montant: xb })
    vals.set("XC", { montant: xc }); vals.set("XD", { montant: xd })
    vals.set("XE", { montant: xe }); vals.set("XF", { montant: xf })
    vals.set("XG", { montant: xg }); vals.set("XH", { montant: xh })
    vals.set("XI", { montant: xi })
    return vals
  }, [soldes])

  // ── Soumission ────────────────────────────────────────────────────────────
  const handleSoumettre = async () => {
    if (!user?.id || !devoirId) return
    setSubmitting(true)
    try {
      await createSoumissionAsync({ devoirId, etudiantId: user.id, sessionId } as any)
      setSubmitted(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (e) {
      console.error(e)
      setSubmitting(false)
    }
  }

  // ── Rendu onglets ─────────────────────────────────────────────────────────

  function renderJournal() {
    if (grouped.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune écriture dans ce devoir.</p>
    return (
      <div className="space-y-3">
        {grouped.map(([groupe, lines]) => {
          const isOuverture = groupe.startsWith('ouverture-')
          const totalD = lines.reduce((s, l) => s + l.debit, 0)
          const totalC = lines.reduce((s, l) => s + l.credit, 0)
          const date = lines[0]?.date ?? ''
          const libelle = lines[0]?.libelle ?? ''
          return (
            <div key={groupe} className="rounded-md border border-border bg-card overflow-hidden">
              <div className={`px-3 py-2 flex items-center gap-3 text-xs font-medium ${isOuverture ? 'bg-violet-50 text-violet-700' : 'bg-muted/40 text-foreground'}`}>
                <span className="font-mono">{date}</span>
                <span className="flex-1 truncate">{libelle}</span>
                {isOuverture && <Badge variant="outline" className="text-xs">Bilan d'ouverture</Badge>}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[500px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border bg-muted/20">
                      <th className="text-left py-1.5 px-3 w-20">N° Cpt</th>
                      <th className="text-left py-1.5 px-3">Intitulé</th>
                      <th className="text-right py-1.5 px-3 w-28">Débit</th>
                      <th className="text-right py-1.5 px-3 w-28">Crédit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(l => (
                      <tr key={l.id} className={`border-b border-border/40 last:border-0 ${l.credit > 0 ? 'pl-6' : ''}`}>
                        <td className={`py-1.5 px-3 font-mono ${l.credit > 0 ? 'pl-8' : ''}`}>{l.numeroCompte}</td>
                        <td className={`py-1.5 px-3 ${l.credit > 0 ? 'italic pl-8' : ''}`}>{l.intituleCompte}</td>
                        <td className="py-1.5 px-3 text-right text-green-700 font-mono">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                        <td className="py-1.5 px-3 text-right text-red-700 font-mono">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/30 font-semibold border-t border-border text-xs">
                      <td colSpan={2} className="py-1.5 px-3 text-right text-muted-foreground">Total</td>
                      <td className="py-1.5 px-3 text-right text-green-700 font-mono">{formatMontant(totalD)}</td>
                      <td className="py-1.5 px-3 text-right text-red-700 font-mono">{formatMontant(totalC)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderGrandLivre() {
    if (comptesGL.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune donnée.</p>
    return (
      <div className="space-y-3">
        {comptesGL.map(compte => {
          const isDebiteur = compte.soldeDebiteur > 0
          const displayTotalD = compte.totalDebit + compte.soldeCrediteur
          const displayTotalC = compte.totalCredit + compte.soldeDebiteur
          return (
            <div key={compte.numero} className="rounded-md border border-border bg-card overflow-hidden">
              <div className="px-3 py-2 flex items-center gap-2 bg-muted/30">
                <span className="font-mono font-bold text-primary text-sm">{compte.numero}</span>
                <span className="flex-1 font-medium text-sm truncate">{compte.intitule}</span>
                <Badge className={`text-xs shrink-0 ${isDebiteur ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isDebiteur ? 'SD' : 'SC'} {formatMontant(isDebiteur ? compte.soldeDebiteur : compte.soldeCrediteur)}
                </Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[400px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border bg-muted/10">
                      <th className="text-left py-1.5 px-3">Date</th>
                      <th className="text-left py-1.5 px-3">Libellé</th>
                      <th className="text-right py-1.5 px-3">Débit</th>
                      <th className="text-right py-1.5 px-3">Crédit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compte.lignes.map(l => (
                      <tr key={l.id} className="border-b border-border/30 last:border-0">
                        <td className="py-1 px-3 font-mono">{l.date}</td>
                        <td className="py-1 px-3">{l.libelle}</td>
                        <td className="py-1 px-3 text-right text-green-700 font-mono">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                        <td className="py-1 px-3 text-right text-red-700 font-mono">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                      </tr>
                    ))}
                    <tr className={`font-medium border-t border-border ${isDebiteur ? 'text-green-700' : 'text-red-700'}`}>
                      <td className="py-1.5 px-3 font-mono italic text-muted-foreground">—</td>
                      <td className="py-1.5 px-3 italic">{isDebiteur ? 'Solde débiteur' : 'Solde créditeur'}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{!isDebiteur ? formatMontant(compte.soldeCrediteur) : ''}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{isDebiteur ? formatMontant(compte.soldeDebiteur) : ''}</td>
                    </tr>
                    <tr className="font-bold bg-muted/30 border-t-2 border-border">
                      <td colSpan={2} className="py-1.5 px-3 text-right text-muted-foreground text-xs">TOTAL</td>
                      <td className="py-1.5 px-3 text-right text-green-700 font-mono">{formatMontant(displayTotalD)}</td>
                      <td className="py-1.5 px-3 text-right text-red-700 font-mono">{formatMontant(displayTotalC)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderBalance() {
    if (lignesBalance.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune donnée.</p>
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left py-2 px-3">N° Compte</th>
              <th className="text-left py-2 px-3">Intitulé</th>
              <th className="text-right py-2 px-3 border-l border-primary-foreground/20">Mouvement D</th>
              <th className="text-right py-2 px-3">Mouvement C</th>
              <th className="text-right py-2 px-3 border-l border-primary-foreground/20">Solde D</th>
              <th className="text-right py-2 px-3">Solde C</th>
            </tr>
          </thead>
          <tbody>
            {lignesBalance.map(l => (
              <tr key={l.numero} className="border-b border-border/40 hover:bg-muted/20">
                <td className="py-1.5 px-3 font-mono text-primary">{l.numero}</td>
                <td className="py-1.5 px-3">{l.intitule}</td>
                <td className="py-1.5 px-3 text-right border-l border-border/30 font-mono text-green-700">{l.mouvD > 0 ? formatMontant(l.mouvD) : ''}</td>
                <td className="py-1.5 px-3 text-right font-mono text-red-700">{l.mouvC > 0 ? formatMontant(l.mouvC) : ''}</td>
                <td className="py-1.5 px-3 text-right border-l border-border/30 font-mono text-green-700">{l.soldeD > 0 ? formatMontant(l.soldeD) : ''}</td>
                <td className="py-1.5 px-3 text-right font-mono text-red-700">{l.soldeC > 0 ? formatMontant(l.soldeC) : ''}</td>
              </tr>
            ))}
            <tr className="bg-primary text-primary-foreground font-bold border-t-2">
              <td colSpan={2} className="py-2 px-3">TOTAUX</td>
              <td className="py-2 px-3 text-right font-mono border-l border-primary-foreground/20">{formatMontant(totalsBalance.mouvD)}</td>
              <td className="py-2 px-3 text-right font-mono">{formatMontant(totalsBalance.mouvC)}</td>
              <td className="py-2 px-3 text-right font-mono border-l border-primary-foreground/20">{formatMontant(totalsBalance.soldeD)}</td>
              <td className="py-2 px-3 text-right font-mono">{formatMontant(totalsBalance.soldeC)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  function renderActif() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">ACTIF</th>
              <th className="px-2 py-2 text-center w-10">Note</th>
              <th className="px-2 py-2 text-right w-24">BRUT</th>
              <th className="px-2 py-2 text-right w-28">AMORT/DÉPREC.</th>
              <th className="px-2 py-2 text-right w-24">NET</th>
            </tr>
          </thead>
          <tbody>
            {ACTIF_RUBRIQUES.map(r => {
              const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 }
              if ((r as any).isGrandTotal) return (
                <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                  <td className="px-2 py-2">{r.ref}</td><td className="px-2 py-2">{r.label}</td>
                  <td className="px-2 py-2 text-center"></td>
                  <td className="px-2 py-2 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-2 text-right font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-2 text-right font-mono">{formatMontant(v.net)}</td>
                </tr>
              )
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-bold font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-bold font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
              if ((r as any).isSection) return (
                <tr key={r.ref} className="bg-secondary/20 font-semibold">
                  <td className="px-2 py-1.5 font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 font-semibold">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-bold font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-muted-foreground font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-medium font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  function renderPassif() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[400px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">PASSIF</th>
              <th className="px-2 py-2 text-center w-10">Note</th>
              <th className="px-2 py-2 text-right w-32">NET (N)</th>
            </tr>
          </thead>
          <tbody>
            {PASSIF_RUBRIQUES.map(r => {
              const val = (r as any).isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0)
              const isSigne = (r as any).isSigne ?? false
              const displayVal = isSigne
                ? (val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : '')
                : (val !== 0 ? formatMontant(val) : '')
              if ((r as any).isGrandTotal) return (
                <tr key={r.ref} className="bg-primary text-primary-foreground font-bold border-t-2">
                  <td className="px-2 py-2">{r.ref}</td><td className="px-2 py-2">{r.label}</td>
                  <td className="px-2 py-2"></td>
                  <td className="px-2 py-2 text-right font-mono">{formatMontant(val)}</td>
                </tr>
              )
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${val < 0 ? 'text-red-600' : 'text-primary'}`}>{val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : ''}</td>
                </tr>
              )
              if ((r as any).isResultat) return (
                <tr key={r.ref} className="border-b border-border/40 bg-secondary/10">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5 font-medium">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${resultatNet >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {resultatNet !== 0 ? `${formatMontant(Math.abs(resultatNet))} ${resultatNet >= 0 ? '(Bénéfice)' : '(Perte)'}` : ''}
                  </td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-medium font-mono ${isSigne && val < 0 ? 'text-red-600' : ''}`}>{displayVal}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  function renderCR() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[500px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">LIBELLÉS</th>
              <th className="px-2 py-2 text-center w-10">+/-</th>
              <th className="px-2 py-2 text-center w-16">NOTE</th>
              <th className="px-2 py-2 text-right w-32">Montant (N)</th>
            </tr>
          </thead>
          <tbody>
            {CR_RUBRIQUES.map(r => {
              const v = crVals.get(r.ref) ?? { montant: 0 }
              if ((r as any).isGrandTotal) {
                const xi = crVals.get("XI")?.montant ?? resultatNet
                return (
                  <tr key={r.ref} className="bg-primary text-primary-foreground font-bold border-t-2">
                    <td className="px-2 py-2">{r.ref}</td>
                    <td className="px-2 py-2">{r.label}</td>
                    <td className="px-2 py-2 text-center">{xi >= 0 ? '+' : '-'}</td>
                    <td className="px-2 py-2 text-center">{r.note}</td>
                    <td className="px-2 py-2 text-right font-mono">{formatMontant(Math.abs(xi))}</td>
                  </tr>
                )
              }
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center">{v.montant >= 0 ? '+' : '-'}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${v.montant >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatMontant(Math.abs(v.montant))}</td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.sens}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-medium font-mono">{v.montant !== 0 ? formatMontant(v.montant) : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // ── Rendu page ────────────────────────────────────────────────────────────
  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="text-xl font-display font-bold text-green-700">Devoir soumis avec succès</h2>
      <p className="text-sm text-muted-foreground">Votre devoir a été transmis au professeur. Redirection...</p>
    </div>
  )

  return (
    <div className="space-y-5 animate-fadeIn pb-32">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <BackButton />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h1 className="text-lg font-display font-bold text-foreground">Récapitulatif du devoir</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Vérifiez vos travaux dans chaque document avant de soumettre.</p>
        {loading && <p className="text-sm text-muted-foreground mt-2">Chargement des données...</p>}
        {!loading && ecritures.length === 0 && (
          <div className="mt-3 flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-sm">Aucune écriture dans cette session. Assurez-vous d'avoir bien saisi vos écritures dans le journal avant de soumettre.</p>
          </div>
        )}
        {!loading && ecritures.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">{ecritures.length} écriture(s) : {grouped.length} opération(s)</p>
        )}
      </div>

      {/* ── Onglets ─────────────────────────────────────────────────────── */}
      <div className="flex gap-1 flex-wrap">
        {ONGLETS.map(o => (
          <button
            key={o.id}
            onClick={() => setOnglet(o.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              onglet === o.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <o.icon className="h-3.5 w-3.5" />
            {o.label}
          </button>
        ))}
      </div>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      <Card className="border-border">
        <CardContent className="pt-4">
          {!loading && (
            <>
              {onglet === 'journal'    && renderJournal()}
              {onglet === 'grandlivre' && renderGrandLivre()}
              {onglet === 'balance'    && renderBalance()}
              {onglet === 'bilan'      && renderActif()}
              {onglet === 'passif'     && renderPassif()}
              {onglet === 'cr'         && renderCR()}
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Lien corriger ────────────────────────────────────────────────── */}
      <div className="text-center">
        <button
          onClick={() => navigate(`/journal?session=${sessionId}`)}
          className="text-sm text-blue-600 underline underline-offset-2"
        >
          Retourner au journal pour corriger mes écritures
        </button>
      </div>

      {/* ── Barre de soumission fixe en bas ──────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>Une fois soumis, votre devoir sera transmis au professeur et vous ne pourrez plus modifier vos réponses.</span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSoumettre}
            disabled={submitting || loading}
          >
            {submitting ? 'Soumission en cours...' : 'Soumettre définitivement'}
          </Button>
        </div>
      </div>

    </div>
  )
}
