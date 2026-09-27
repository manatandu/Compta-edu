// ─────────────────────────────────────────────────────────────────────────────
// ÉTATS FINANCIERS DU SYSTÈME NORMAL : BILAN ET COMPTE DE RÉSULTAT
//
// Source unique des rubriques et du calcul, partagée par la page Bilan /
// Compte de résultat et par l'aperçu d'un devoir. Ces deux écrans portaient
// chacun leur copie, qui avaient divergé : l'aperçu ignorait les
// amortissements (comptes 28) et surévaluait l'actif net.
//
// Affectation des comptes : tableau de correspondance Postes/Comptes du
// Système normal (AUDCIF, Titre IX, chapitre 7). Corrections apportées lors de
// la vérification du 27/09/2026 :
//   - CA ne prend que 101 à 104 : le préfixe « 10 » y ajoutait 105 (primes)
//     et 106 (écarts de réévaluation), comptés une seconde fois en CD et CE ;
//   - CB (109, solde débiteur) est retenu en négatif : il valait toujours 0 ;
//   - AG reçoit 2815 et 2816 (amortissements du fonds commercial et du droit
//     au bail), absents ;
//   - les comptes que le tableau marque « p » (2818, 2918, 2919, 2939, 2949)
//     n'étaient comptés en entier dans deux postes à la fois ; faute de
//     ventilation dans les écritures, chacun est rattaché à un seul poste
//     (AH, AK, AM) ;
//   - AM exclut 2945 (et non 2948) ; BI prend 41 sauf 419 ; BJ prend 47 sauf
//     478 ; AH prend 217, 218 sauf 2181, et 2198 ;
//   - au compte de résultat, les montants gardent leur signe : la valeur
//     absolue transformait une variation de stock créditrice (stock en
//     hausse) en charge, et faussait marge, valeur ajoutée et résultat.
// ─────────────────────────────────────────────────────────────────────────────

export interface RubriqueActif {
  ref: string; label: string; note: string
  comptesBrut?: string[]; comptesCorr?: string[]
  comptesExcluBrut?: string[]; comptesExcluCorr?: string[]
  isSection?: boolean; isTotal?: boolean; isGrandTotal?: boolean
  totalRefs?: string[]
}
export interface RubriquePassif {
  ref: string; label: string; note: string
  comptes?: string[]
  comptesExclu?: string[]
  isTotal?: boolean; isGrandTotal?: boolean
  isResultat?: boolean; isSigne?: boolean
  totalRefs?: string[]
}
export interface RubriqueCR {
  ref: string; label: string; note: string; sens: string
  comptes?: string[]
  isTotal?: boolean; isGrandTotal?: boolean
}

/** Comptes correctifs (amortissements, dépréciations) : nature créditrice. */
export function estCorrectif(num: string): boolean {
  return (
    num.startsWith("28") ||
    num.startsWith("29") ||
    num.startsWith("39") ||
    (num.startsWith("49") && !num.startsWith("499")) ||
    (num.startsWith("59") && !num.startsWith("599"))
  )
}

// ─── ACTIF : Modèle officiel p.981 SYSCOHADA ─────────────────────────────────
// Colonnes : REF | ACTIF | Note | BRUT | AMORT et DÉPREC. | NET (N) | NET (N-1)
export const ACTIF_RUBRIQUES: RubriqueActif[] = [
  // Immobilisations incorporelles
  { ref: "AD", label: "IMMOBILISATIONS INCORPORELLES",               note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AE", label: "Frais de développement et de prospection",    note: "",   comptesBrut: ["211","2181","2191"],                         comptesCorr: ["2811","2911"] },
  { ref: "AF", label: "Brevets, licences, logiciels et droits similaires", note: "", comptesBrut: ["212","213","214","2193"],               comptesCorr: ["2812","2813","2814","2912","2913","2914"] },
  { ref: "AG", label: "Fonds commercial et droit au bail",           note: "",   comptesBrut: ["215","216"],                                 comptesCorr: ["2815","2816","2915","2916"] },
  { ref: "AH", label: "Autres immobilisations incorporelles",        note: "",   comptesBrut: ["217","218","2198"], comptesCorr: ["2817","2818","2917","2918","2919"], comptesExcluBrut: ["2181"] },
  // Immobilisations corporelles
  { ref: "AI", label: "IMMOBILISATIONS CORPORELLES",                 note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AJ", label: "Terrains",                                    note: "",   comptesBrut: ["22"],                                        comptesCorr: ["282","292"] },
  { ref: "AK", label: "Bâtiments",                                   note: "",   comptesBrut: ["231","232","233","237","2391"],               comptesCorr: ["2831","2832","2833","2837","2931","2932","2933","2937","2939"] },
  { ref: "AL", label: "Aménagements, agencements et installations",  note: "",   comptesBrut: ["234","235","238","2392","2393"],              comptesCorr: ["2834","2835","2838","2934","2935","2938"] },
  { ref: "AM", label: "Matériel, mobilier et actifs biologiques",    note: "",   comptesBrut: ["24"], comptesCorr: ["284","294"], comptesExcluBrut: ["245","2495"], comptesExcluCorr: ["2845","2945"] },
  { ref: "AN", label: "Matériel de transport",                       note: "",   comptesBrut: ["245","2495"],                                comptesCorr: ["2845","2945"] },
  { ref: "AP", label: "Avances et acomptes versés sur immobilisations", note: "3", comptesBrut: ["251","252"],                              comptesCorr: ["2951","2952"] },
  // Immobilisations financières
  { ref: "AQ", label: "IMMOBILISATIONS FINANCIÈRES",                 note: "4",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AR", label: "Titres de participation",                     note: "",   comptesBrut: ["26"],                                        comptesCorr: ["296"] },
  { ref: "AS", label: "Autres immobilisations financières",          note: "",   comptesBrut: ["27"],                                        comptesCorr: ["297"] },
  { ref: "AZ", label: "TOTAL ACTIF IMMOBILISÉ",                      note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["AD","AI","AQ"] },
  // Actif circulant
  { ref: "BA", label: "ACTIF CIRCULANT HAO",                         note: "5",  comptesBrut: ["485","488"],                                 comptesCorr: ["498"] },
  { ref: "BB", label: "STOCKS ET ENCOURS",                           note: "6",  comptesBrut: ["31","32","33","34","35","36","37","38"],      comptesCorr: ["39"] },
  { ref: "BG", label: "CRÉANCES ET EMPLOIS ASSIMILÉS",               note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "BH", label: "Fournisseurs, avances versées",               note: "17", comptesBrut: ["409"],                                       comptesCorr: ["490"] },
  { ref: "BI", label: "Clients",                                     note: "7",  comptesBrut: ["41"], comptesCorr: ["491"], comptesExcluBrut: ["419"] },
  { ref: "BJ", label: "Autres créances",                             note: "8",  comptesBrut: ["185","42","43","44","45","46","47"], comptesCorr: ["492","493","494","495","496","497"], comptesExcluBrut: ["478"] },
  { ref: "BK", label: "TOTAL ACTIF CIRCULANT",                       note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BA","BB","BG"] },
  // Trésorerie
  { ref: "BQ", label: "Titres de placement",                         note: "9",  comptesBrut: ["50"],                                        comptesCorr: ["590"] },
  { ref: "BR", label: "Valeurs à encaisser",                         note: "10", comptesBrut: ["51"],                                        comptesCorr: ["591"] },
  { ref: "BS", label: "Banques, chèques postaux, caisse et assimilés", note: "11", comptesBrut: ["52","53","54","55","57","581","582"], comptesCorr: ["592","593","594"] },
  { ref: "BT", label: "TOTAL TRÉSORERIE-ACTIF",                      note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BQ","BR","BS"] },
  { ref: "BU", label: "Écart de conversion-Actif",                   note: "12", comptesBrut: ["478"],                                       comptesCorr: [] },
  { ref: "BZ", label: "TOTAL GÉNÉRAL",                               note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isGrandTotal: true },
];

// ─── PASSIF : Modèle officiel p.982 SYSCOHADA ────────────────────────────────
// Colonnes : REF | PASSIF | Note | NET (N) | NET (N-1)
// NB : CJ (pas CI) = Résultat net de l'exercice (source p.982 officielle)
export const PASSIF_RUBRIQUES: RubriquePassif[] = [
  { ref: "CA", label: "Capital",                                                note: "13", comptes: ["101","102","103","104"] },
  { ref: "CB", label: "Apporteurs capital non appelé (-)",                      note: "13", comptes: ["109"], isSigne: true },
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
];

// ─── COMPTE DE RÉSULTAT : Modèle officiel p.986 SYSCOHADA ────────────────────
// Colonnes : REF | LIBELLÉS | signe | NOTE | NET (N) | NET (N-1)
// Soldes intermédiaires de gestion : XA→XB→XC→XD→XE→XF→XG→XH→XI
export const CR_RUBRIQUES: RubriqueCR[] = [
  { ref: "TA", label: "Ventes de marchandises",                               sens: "+",  note: "21",     comptes: ["701"] },
  { ref: "RA", label: "Achats de marchandises",                               sens: "-",  note: "22",     comptes: ["601"] },
  { ref: "RB", label: "Variation de stocks de marchandises",                  sens: "-/+",note: "6",      comptes: ["6031"] },
  { ref: "XA", label: "MARGE COMMERCIALE (Somme TA à RB)",                   sens: "",   note: "",       comptes: ["13"], isTotal: true },
  { ref: "TB", label: "Ventes de produits fabriqués",                         sens: "+",  note: "21",     comptes: ["702","703","704"] },
  { ref: "TC", label: "Travaux, services vendus",                             sens: "+",  note: "21",     comptes: ["705","706"] },
  { ref: "TD", label: "Produits accessoires",                                 sens: "+",  note: "21",     comptes: ["707"] },
  { ref: "XB", label: "CHIFFRE D'AFFAIRES (A+B+C+D)",                        sens: "",   note: "",       comptes: [], isTotal: true },
  { ref: "TE", label: "Production stockée (ou déstockage)",                   sens: "-/+",note: "6",      comptes: ["73"] },
  { ref: "TF", label: "Production immobilisée",                               sens: "",   note: "21",     comptes: ["72"] },
  { ref: "TG", label: "Subventions d'exploitation",                           sens: "",   note: "21",     comptes: ["71"] },
  { ref: "TH", label: "Autres produits",                                      sens: "+",  note: "21",     comptes: ["75"] },
  { ref: "TI", label: "Transferts de charges d'exploitation",                 sens: "+",  note: "12",     comptes: ["781"] },
  { ref: "RC", label: "Achats de matières premières et fournitures liées",    sens: "-",  note: "22",     comptes: ["602"] },
  { ref: "RD", label: "Variation de stocks de matières premières et fournitures liées", sens: "-/+", note: "6", comptes: ["6032"] },
  { ref: "RE", label: "Autres achats",                                        sens: "-",  note: "22",     comptes: ["604","605","608"] },
  { ref: "RF", label: "Variation de stocks d'autres approvisionnements",      sens: "-/+",note: "6",      comptes: ["6033"] },
  { ref: "RG", label: "Transports",                                           sens: "-",  note: "23",     comptes: ["61"] },
  { ref: "RH", label: "Services extérieurs",                                  sens: "-",  note: "24",     comptes: ["62","63"] },
  { ref: "RI", label: "Impôts et taxes",                                      sens: "-",  note: "25",     comptes: ["64"] },
  { ref: "RJ", label: "Autres charges",                                       sens: "-",  note: "26",     comptes: ["65"] },
  { ref: "XC", label: "VALEUR AJOUTÉE (XB+RA+RB)+(Somme TE à RJ)",           sens: "",   note: "",       comptes: ["132"], isTotal: true },
  { ref: "RK", label: "Charges de personnel",                                 sens: "-",  note: "27",     comptes: ["66"] },
  { ref: "XD", label: "EXCÉDENT BRUT D'EXPLOITATION (XC+RK)",                 sens: "",   note: "28",     comptes: ["133"], isTotal: true },
  { ref: "TJ", label: "Reprises d'amortissements, provisions et dépréciations", sens: "+", note: "28",   comptes: ["791","798","799"] },
  { ref: "RL", label: "Dotations aux amortissements, provisions et dépréciations", sens: "-", note: "3C&28", comptes: ["681","691"] },
  { ref: "XE", label: "RÉSULTAT D'EXPLOITATION (XD+TJ+RL)",                  sens: "",   note: "",       comptes: ["134"], isTotal: true },
  { ref: "TK", label: "Revenus financiers et assimilés",                      sens: "+",  note: "29",     comptes: ["77"] },
  { ref: "TL", label: "Reprises de provisions et dépréciations financières",  sens: "+",  note: "28",     comptes: ["797"] },
  { ref: "TM", label: "Transferts de charges financières",                    sens: "+",  note: "12",     comptes: ["787"] },
  { ref: "RM", label: "Frais financiers et charges assimilées",               sens: "-",  note: "29",     comptes: ["67"] },
  { ref: "RN", label: "Dotations aux provisions et aux dépréciations financières", sens: "-", note: "3C&28", comptes: ["697"] },
  { ref: "XF", label: "RÉSULTAT FINANCIER (somme TK à RN)",                   sens: "",   note: "",       comptes: ["135"], isTotal: true },
  { ref: "XG", label: "RÉSULTAT DES ACTIVITÉS ORDINAIRES (XE+XF)",            sens: "",   note: "",       comptes: ["136"], isTotal: true },
  { ref: "TN", label: "Produits des cessions d'immobilisations",              sens: "+",  note: "3D",     comptes: ["82"] },
  { ref: "TO", label: "Autres Produits HAO",                                  sens: "+",  note: "30",     comptes: ["84","86","88"] },
  { ref: "RO", label: "Valeurs comptables des cessions d'immobilisations",    sens: "-",  note: "3D",     comptes: ["81"] },
  { ref: "RP", label: "Autres Charges HAO",                                   sens: "-",  note: "30",     comptes: ["83","85"] },
  { ref: "XH", label: "RÉSULTAT HORS ACTIVITÉS ORDINAIRES (somme TN à RP)",   sens: "",   note: "",       comptes: ["137"], isTotal: true },
  { ref: "RQ", label: "Participation des travailleurs",                       sens: "-",  note: "30",     comptes: ["87"] },
  { ref: "RS", label: "Impôts sur le résultat",                               sens: "-",  note: "",       comptes: ["89"] },
  { ref: "XI", label: "RÉSULTAT NET (XG+XH+RQ+RS)",                           sens: "",   note: "",       comptes: ["13","131","139"], isGrandTotal: true },
];


export type Soldes = Map<string, { debit: number; credit: number }>
export type LigneActif = { brut: number; corr: number; net: number }
export type LigneCR = { montant: number; compteUtilises: string[] }

const commence = (num: string, prefixes: readonly string[]) => prefixes.some(p => num.startsWith(p))

/** Cumul des débits et crédits par compte. */
export function calculerSoldes(ecritures: readonly { numeroCompte: string; debit: number; credit: number }[]): Soldes {
  const map: Soldes = new Map()
  for (const e of ecritures) {
    const s = map.get(e.numeroCompte) ?? { debit: 0, credit: 0 }
    s.debit += e.debit || 0
    s.credit += e.credit || 0
    map.set(e.numeroCompte, s)
  }
  return map
}

export function calculerEtatsFinanciers(soldes: Soldes) {
  const brut = (prefixes: readonly string[], exclu: readonly string[] = []) => {
    let total = 0
    soldes.forEach((s, num) => {
      if (!estCorrectif(num) && commence(num, prefixes) && !commence(num, exclu)) {
        const net = s.debit - s.credit
        if (net > 0) total += net
      }
    })
    return total
  }
  const correctif = (prefixes: readonly string[], exclu: readonly string[] = []) => {
    let total = 0
    soldes.forEach((s, num) => {
      if (estCorrectif(num) && commence(num, prefixes) && !commence(num, exclu)) {
        const net = s.credit - s.debit
        if (net > 0) total += net
      }
    })
    return total
  }
  // isSigne : solde algébrique (109, 129, 139 peuvent être débiteurs) ; sinon
  // seuls les soldes créditeurs sont retenus (comptes bilatéraux 42 à 47, 52, 53).
  const passif = (prefixes: readonly string[], exclu: readonly string[] = [], isSigne = false) => {
    let total = 0
    soldes.forEach((s, num) => {
      if (commence(num, prefixes) && !commence(num, exclu)) {
        const net = s.credit - s.debit
        total += isSigne ? net : Math.max(0, net)
      }
    })
    return total
  }
  // Rubriques T : produits (crédit - débit) ; rubriques R : charges (débit -
  // crédit). Le signe est conservé.
  const resultatRubrique = (r: RubriqueCR) => {
    let total = 0
    soldes.forEach((s, num) => {
      if (commence(num, r.comptes ?? [])) total += r.ref.startsWith('T') ? s.credit - s.debit : s.debit - s.credit
    })
    return total
  }

  // Résultat tiré de la balance (produits - charges des classes 6, 7, 8).
  let produits = 0, charges = 0
  soldes.forEach((s, num) => {
    if (num.startsWith("7")) produits += s.credit - s.debit
    if (num.startsWith("6")) charges += s.debit - s.credit
    if (num.startsWith("8")) charges += s.debit - s.credit
  })
  const resultatNet = produits - charges

  // Actif
  const actif = new Map<string, LigneActif>()
  for (const r of ACTIF_RUBRIQUES) {
    if (r.isSection || r.isTotal || r.isGrandTotal) { actif.set(r.ref, { brut: 0, corr: 0, net: 0 }); continue }
    const b = brut(r.comptesBrut ?? [], r.comptesExcluBrut ?? [])
    const c = correctif(r.comptesCorr ?? [], r.comptesExcluCorr ?? [])
    actif.set(r.ref, { brut: b, corr: c, net: b - c })
  }
  const sommeActif = (refs: string[]) => {
    const b = refs.reduce((s, x) => s + (actif.get(x)?.brut ?? 0), 0)
    const c = refs.reduce((s, x) => s + (actif.get(x)?.corr ?? 0), 0)
    return { brut: b, corr: c, net: b - c }
  }
  actif.set("AD", sommeActif(["AE","AF","AG","AH"]))
  actif.set("AI", sommeActif(["AJ","AK","AL","AM","AN","AP"]))
  actif.set("AQ", sommeActif(["AR","AS"]))
  actif.set("BG", sommeActif(["BH","BI","BJ"]))
  actif.set("AZ", sommeActif(["AD","AI","AQ"]))
  actif.set("BK", sommeActif(["BA","BB","BG"]))
  actif.set("BT", sommeActif(["BQ","BR","BS"]))
  actif.set("BZ", sommeActif(["AZ","BK","BT","BU"]))

  // Passif
  const passifVals = new Map<string, number>()
  for (const r of PASSIF_RUBRIQUES) {
    if (r.isTotal || r.isGrandTotal) continue
    passifVals.set(r.ref, r.isResultat ? resultatNet : passif(r.comptes ?? [], r.comptesExclu ?? [], r.isSigne ?? false))
  }
  const sommePassif = (refs: string[]) => refs.reduce((s, x) => s + (passifVals.get(x) ?? 0), 0)
  passifVals.set("CP", sommePassif(["CA","CB","CD","CE","CF","CG","CH","CJ","CL","CM"]))
  passifVals.set("DD", sommePassif(["DA","DB","DC"]))
  passifVals.set("DF", sommePassif(["CP","DD"]))
  passifVals.set("DP", sommePassif(["DH","DI","DJ","DK","DM","DN"]))
  passifVals.set("DT", sommePassif(["DQ","DR"]))
  passifVals.set("DZ", sommePassif(["DF","DP","DT","DV"]))

  // Compte de résultat
  const cr = new Map<string, LigneCR>()
  for (const r of CR_RUBRIQUES) {
    if (r.isTotal || r.isGrandTotal) continue
    const utilises: string[] = []
    soldes.forEach((_, num) => { if (commence(num, r.comptes ?? [])) utilises.push(num) })
    cr.set(r.ref, { montant: resultatRubrique(r), compteUtilises: utilises.length ? utilises.sort() : [...(r.comptes ?? [])] })
  }
  const g = (k: string) => cr.get(k)?.montant ?? 0
  const xa = g("TA") - g("RA") - g("RB")
  const xb = g("TA") + g("TB") + g("TC") + g("TD")
  const xc = xb - g("RA") - g("RB") + g("TE") + g("TF") + g("TG") + g("TH") + g("TI")
    - g("RC") - g("RD") - g("RE") - g("RF") - g("RG") - g("RH") - g("RI") - g("RJ")
  const xd = xc - g("RK")
  const xe = xd + g("TJ") - g("RL")
  const xf = g("TK") + g("TL") + g("TM") - g("RM") - g("RN")
  const xg = xe + xf
  const xh = g("TN") + g("TO") - g("RO") - g("RP")
  const xi = xg + xh - g("RQ") - g("RS")
  const sig: [string, number, string[]][] = [
    ["XA", xa, []], ["XB", xb, []], ["XC", xc, ["132"]], ["XD", xd, ["133"]], ["XE", xe, ["134"]],
    ["XF", xf, ["135"]], ["XG", xg, ["136"]], ["XH", xh, ["137"]], ["XI", xi, ["131","139"]],
  ]
  for (const [ref, montant, comptes] of sig) cr.set(ref, { montant, compteUtilises: comptes })

  return { actif, passif: passifVals, cr, resultatNet }
}
