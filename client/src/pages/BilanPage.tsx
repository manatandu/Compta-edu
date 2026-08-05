import { useUser } from '@/lib/userContext'
import React, { useMemo, useState, useEffect } from "react";
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useModule } from "@/lib/moduleContext";
import { formatMontant } from "@/lib/utils";
import { exportBilanPDF, exportResultatPDF } from "@/lib/exportPDF";
import { useSessions, useEcritures } from '@/lib/useFirestore'

// ─── Types pour les rubriques du bilan ─────────────────────────────────────────
interface RubriqueActif {
  ref: string; label: string; note: string
  comptesBrut?: string[]; comptesCorr?: string[]
  comptesExcluBrut?: string[]; comptesExcluCorr?: string[]
  isSection?: boolean; isTotal?: boolean; isGrandTotal?: boolean
  totalRefs?: string[]
}
interface RubriquePassif {
  ref: string; label: string; note: string
  comptes?: string[]; comptesBrut?: string[]; comptesCorr?: string[]
  comptesExclu?: string[]
  isSection?: boolean; isTotal?: boolean; isGrandTotal?: boolean
  isResultat?: boolean; isSigne?: boolean
  totalRefs?: string[]
}
interface RubriqueCR {
  ref: string; label: string; note: string; sens: string
  comptes?: string[]
  isTotal?: boolean; isGrandTotal?: boolean
}

// ─── DOCTRINE OHADA (Acte Uniforme SYSCOHADA révisé) ─────────────────────────
// Conformité : modèles officiels p.981 (actif), p.982 (passif), p.986 (CR)
// Principes : régularité, sincérité, transparence, prudence (Art.3, 6, 96)
// Balance : 6 colonnes (ouverture débit/crédit, mouvement débit/crédit, clôture débit/crédit)
// Partie double obligatoire (Art.17 §2) : total débit = total crédit
// Spécialisation des exercices (Art.59 / postulat 4.1.1.3)
// Coût historique (Art.35-36 / convention 4.1.2.1)
// Prudence : actifs et produits ne doivent pas être surévalués (convention 4.1.2.2)
// Correspondance bilan clôture = bilan ouverture (Art.34 / convention 4.1.2.4)

// Comptes correctifs (amortissements/dépréciations) : nature créditrice
function estCorrectif(num: string): boolean {
  return (
    num.startsWith("28") ||
    num.startsWith("29") ||
    num.startsWith("39") ||
    (num.startsWith("49") && !num.startsWith("499")) ||
    (num.startsWith("59") && !num.startsWith("599"))
  );
}

// ─── ACTIF : Modèle officiel p.981 SYSCOHADA ─────────────────────────────────
// Colonnes : REF | ACTIF | Note | BRUT | AMORT et DÉPREC. | NET (N) | NET (N-1)
const ACTIF_RUBRIQUES: RubriqueActif[] = [
  // Immobilisations incorporelles
  { ref: "AD", label: "IMMOBILISATIONS INCORPORELLES",               note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AE", label: "Frais de développement et de prospection",    note: "",   comptesBrut: ["211","2181","2191"],                         comptesCorr: ["2811","2818","2911","2918","2919"] },
  { ref: "AF", label: "Brevets, licences, logiciels et droits similaires", note: "", comptesBrut: ["212","213","214","2193"],               comptesCorr: ["2812","2813","2814","2912","2913","2914","2929"] },
  { ref: "AG", label: "Fonds commercial et droit au bail",           note: "",   comptesBrut: ["215","216"],                                 comptesCorr: ["2915","2916"] },
  { ref: "AH", label: "Autres immobilisations incorporelles",        note: "",   comptesBrut: ["2171","2172","2173","2174","2175","2176","2177","2178","2179","2182","2183","2184","2185","2186","2187","2189"], comptesCorr: ["2817","2818","2917","2918","2919"] },
  // Immobilisations corporelles
  { ref: "AI", label: "IMMOBILISATIONS CORPORELLES",                 note: "3",  comptesBrut: [],                                            comptesCorr: [],                                                              isSection: true },
  { ref: "AJ", label: "Terrains",                                    note: "",   comptesBrut: ["22"],                                        comptesCorr: ["282","292"] },
  { ref: "AK", label: "Bâtiments",                                   note: "",   comptesBrut: ["231","232","233","237","2391"],               comptesCorr: ["2831","2832","2833","2837","2931","2932","2933","2937","2939"] },
  { ref: "AL", label: "Aménagements, agencements et installations",  note: "",   comptesBrut: ["234","235","238","2392","2393"],              comptesCorr: ["2834","2835","2838","2934","2935","2938","2939"] },
  { ref: "AM", label: "Matériel, mobilier et actifs biologiques",    note: "",   comptesBrut: ["24"], comptesCorr: ["284","294","2949"], comptesExcluBrut: ["245","2495"], comptesExcluCorr: ["2845","2948"] },
  { ref: "AN", label: "Matériel de transport",                       note: "",   comptesBrut: ["245","2495"],                                comptesCorr: ["2845","2945","2949"] },
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
  { ref: "BI", label: "Clients",                                     note: "7",  comptesBrut: ["411","412","413","414","415","416","417","418"], comptesCorr: ["491"] },
  { ref: "BJ", label: "Autres créances",                             note: "8",  comptesBrut: ["185","42","43","44","45","46","471","472","473","474","475","476","477","479"], comptesCorr: ["492","493","494","495","496","497"] },
  { ref: "BK", label: "TOTAL ACTIF CIRCULANT",                       note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BA","BB","BG"] },
  // Trésorerie
  { ref: "BQ", label: "Titres de placement",                         note: "9",  comptesBrut: ["50"],                                        comptesCorr: ["590"] },
  { ref: "BR", label: "Valeurs à encaisser",                         note: "10", comptesBrut: ["51"],                                        comptesCorr: ["591"] },
  { ref: "BS", label: "Banques, chèques postaux, caisse et assimilés", note: "11", comptesBrut: ["52","53","54","55","57","581","582","592","593","595"], comptesCorr: ["592","593","594"] },
  { ref: "BT", label: "TOTAL TRÉSORERIE-ACTIF",                      note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isTotal: true, totalRefs: ["BQ","BR","BS"] },
  { ref: "BU", label: "Écart de conversion-Actif",                   note: "12", comptesBrut: ["478"],                                       comptesCorr: [] },
  { ref: "BZ", label: "TOTAL GÉNÉRAL",                               note: "",   comptesBrut: [],                                            comptesCorr: [],                                                              isGrandTotal: true },
] as const;

// ─── PASSIF : Modèle officiel p.982 SYSCOHADA ────────────────────────────────
// Colonnes : REF | PASSIF | Note | NET (N) | NET (N-1)
// NB : CJ (pas CI) = Résultat net de l'exercice (source p.982 officielle)
const PASSIF_RUBRIQUES: RubriquePassif[] = [
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
] as const;

// ─── COMPTE DE RÉSULTAT : Modèle officiel p.986 SYSCOHADA ────────────────────
// Colonnes : REF | LIBELLÉS | signe | NOTE | NET (N) | NET (N-1)
// Soldes intermédiaires de gestion : XA→XB→XC→XD→XE→XF→XG→XH→XI
const CR_RUBRIQUES: RubriqueCR[] = [
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
] as const;

// ─── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────

export default function BilanPage({ mode = "bilan" }: { mode?: "bilan" | "cr" }) {
  const user = useUser()
  const module = useModule();
  const { sessions, loading: loadingSessions } = useSessions(user?.id, module);
  const [selectedSession, setSelectedSession] = useState(sessions[0]?.id || "");

  // Sync : si la session sélectionnée n'existe plus (supprimée), revenir à la première
  useEffect(() => {
    if (!sessions.find(s => s.id === selectedSession)) {
      setSelectedSession(sessions[0]?.id || '')
    }
  }, [sessions])
  // mode provient des props : pas de useState tab

  // Réactif : se re-calcule quand une écriture est ajoutée/supprimée/réinitialisée
  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures(user?.id, module)
  const ecritures = useMemo(() =>
    allEcritures.filter(e => e.sessionId === selectedSession),
    [allEcritures, selectedSession]
  );

  // Calcul des soldes par compte depuis les écritures
  const soldes = useMemo(() => {
    const map = new Map<string, { debit: number; credit: number }>();
    ecritures.forEach(e => {
      const s = map.get(e.numeroCompte) ?? { debit: 0, credit: 0 };
      s.debit += e.debit;
      s.credit += e.credit;
      map.set(e.numeroCompte, s);
    });
    return map;
  }, [ecritures]);

  function getSoldesBrut(prefixes: readonly string[], exclu: readonly string[] = []): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (!estCorrectif(num)
        && prefixes.some(p => num.startsWith(p))
        && !exclu.some(e => num.startsWith(e))) {
        const net = s.debit - s.credit;
        if (net > 0) total += net;
      }
    });
    return total;
  }

  function getSoldesCorr(prefixes: readonly string[], exclu: readonly string[] = []): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (estCorrectif(num)
        && prefixes.some(p => num.startsWith(p))
        && !exclu.some(e => num.startsWith(e))) {
        const net = s.credit - s.debit;
        if (net > 0) total += net;
      }
    });
    return total;
  }

  // isSigne=true : retourne un solde algébrique (positif ou négatif) au lieu de forcer >0
  // exclu : préfixes à exclure du calcul
  function getSoldesPassif(prefixes: readonly string[], exclu: readonly string[] = [], isSigne = false): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (prefixes.some(p => num.startsWith(p)) && !exclu.some(e => num.startsWith(e))) {
        const net = s.credit - s.debit;
        if (isSigne) {
          total += net; // solde algébrique (peut être négatif pour compte solde débiteur type 129, 139)
        } else {
          if (net > 0) total += net;
        }
      }
    });
    return total;
  }

  function getSoldesCR(prefixes: readonly string[]): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (prefixes.some(p => num.startsWith(p))) {
        total += s.debit - s.credit;
      }
    });
    return total;
  }

  // Calcul actif
  type ActifRow = { brut: number; corr: number; net: number };
  const actifVals = useMemo(() => {
    const vals = new Map<string, ActifRow>();
    for (const r of ACTIF_RUBRIQUES) {
      if (r.isSection || r.isTotal || r.isGrandTotal) {
        vals.set(r.ref, { brut: 0, corr: 0, net: 0 });
        continue;
      }
      const excluBrut = r.comptesExcluBrut ?? []
      const excluCorr = r.comptesExcluCorr ?? []
      const brut = getSoldesBrut(r.comptesBrut ?? [], excluBrut);
      const corr = getSoldesCorr(r.comptesCorr ?? [], excluCorr);
      vals.set(r.ref, { brut, corr, net: Math.max(0, brut - corr) });
    }
    // Sections = somme enfants
    const sectionMap: Record<string, string[]> = {
      "AD": ["AE","AF","AG","AH"],
      "AI": ["AJ","AK","AL","AM","AN","AP"],
      "AQ": ["AR","AS"],
      "BG": ["BH","BI","BJ"],
    };
    for (const [sec, children] of Object.entries(sectionMap)) {
      const b = children.reduce((s, c) => s + (vals.get(c)?.brut ?? 0), 0);
      const c2 = children.reduce((s, c) => s + (vals.get(c)?.corr ?? 0), 0);
      vals.set(sec, { brut: b, corr: c2, net: Math.max(0, b - c2) });
    }
    // Totaux
    const totals: Record<string, string[]> = {
      "AZ": ["AD","AI","AQ"],
      "BK": ["BA","BB","BG"],
      "BT": ["BQ","BR","BS"],
    };
    for (const [tot, refs] of Object.entries(totals)) {
      const b = refs.reduce((s, r) => s + (vals.get(r)?.brut ?? 0), 0);
      const c2 = refs.reduce((s, r) => s + (vals.get(r)?.corr ?? 0), 0);
      vals.set(tot, { brut: b, corr: c2, net: Math.max(0, b - c2) });
    }
    // BZ = AZ + BK + BT + BU (net)
    const bz = ["AZ","BK","BT","BU"].reduce((s, r) => s + (vals.get(r)?.net ?? 0), 0);
    vals.set("BZ", { brut: bz, corr: 0, net: bz });
    return vals;
  }, [soldes]);

  // Résultat net (XI) : lié à CJ du passif (Art.34 convention correspondance)
  const resultatNet = useMemo(() => {
    let produits = 0, charges = 0;
    soldes.forEach((s, num) => {
      if (num.startsWith("7")) produits += s.credit - s.debit;
      if (num.startsWith("6")) charges += s.debit - s.credit;
      if (num.startsWith("8")) {
        const net = s.debit - s.credit;
        if (net > 0) charges += net; else produits += (-net);
      }
    });
    return produits - charges;
  }, [soldes]);

  // Calcul passif
  const passifVals = useMemo(() => {
    const vals = new Map<string, number>();
    for (const r of PASSIF_RUBRIQUES) {
      if (r.isTotal || r.isGrandTotal) { vals.set(r.ref, 0); continue; }
      if (r.isResultat) { vals.set(r.ref, resultatNet); continue; }
      const exclu = r.comptesExclu ?? [];
      const isSigne = r.isSigne ?? false;
      vals.set(r.ref, getSoldesPassif(r.comptes ?? [], exclu, isSigne));
    }
    const totals: Record<string, string[]> = {
      "CP": ["CA","CB","CD","CE","CF","CG","CH","CJ","CL","CM"],
      "DD": ["DA","DB","DC"],
      "DF": ["CP","DD"],
      "DP": ["DH","DI","DJ","DK","DM","DN"],
      "DT": ["DQ","DR"],
    };
    for (const [tot, refs] of Object.entries(totals)) {
      vals.set(tot, refs.reduce((s, r) => s + (vals.get(r) ?? 0), 0));
    }
    const dv = vals.get("DV") ?? 0;
    vals.set("DZ", (vals.get("DF") ?? 0) + (vals.get("DP") ?? 0) + (vals.get("DT") ?? 0) + dv);
    return vals;
  }, [soldes, resultatNet]);

  // Calcul CR
  type CRVal = { montant: number; compteUtilises: string[] };
  const crVals = useMemo(() => {
    const vals = new Map<string, CRVal>();

    function getCompteUtilises(prefixes: readonly string[]): string[] {
      const used: string[] = [];
      soldes.forEach((_, num) => {
        if (prefixes.some(p => num.startsWith(p))) used.push(num);
      });
      return used.sort();
    }

    for (const r of CR_RUBRIQUES) {
      if (r.isTotal || r.isGrandTotal) continue;
      const montant = getSoldesCR(r.comptes ?? []);
      const used = getCompteUtilises(r.comptes ?? []);
      const displayUsed = used.length > 0 ? used : [...(r.comptes ?? [])];
      vals.set(r.ref, { montant: Math.abs(montant), compteUtilises: displayUsed });
    }

    // Soldes intermédiaires de gestion OHADA (cascade p.984-986)
    const ta = vals.get("TA")?.montant ?? 0;
    const ra = vals.get("RA")?.montant ?? 0;
    const rb = vals.get("RB")?.montant ?? 0;
    const xa = ta - ra - rb;  // Marge commerciale

    const tb = vals.get("TB")?.montant ?? 0;
    const tc = vals.get("TC")?.montant ?? 0;
    const td = vals.get("TD")?.montant ?? 0;
    const xb = ta + tb + tc + td;  // CA

    const te = vals.get("TE")?.montant ?? 0;
    const tf = vals.get("TF")?.montant ?? 0;
    const tg = vals.get("TG")?.montant ?? 0;
    const th = vals.get("TH")?.montant ?? 0;
    const ti = vals.get("TI")?.montant ?? 0;
    const rc = vals.get("RC")?.montant ?? 0;
    const rd = vals.get("RD")?.montant ?? 0;
    const re = vals.get("RE")?.montant ?? 0;
    const rf = vals.get("RF")?.montant ?? 0;
    const rg = vals.get("RG")?.montant ?? 0;
    const rh = vals.get("RH")?.montant ?? 0;
    const ri = vals.get("RI")?.montant ?? 0;
    const rj = vals.get("RJ")?.montant ?? 0;
    // Valeur ajoutée = (XB + RA + RB) + (somme TE à RJ)
    const xc = xb - ra - rb + te + tf + tg + th + ti - rc - rd - re - rf - rg - rh - ri - rj;

    const rk = vals.get("RK")?.montant ?? 0;
    const xd = xc - rk;  // EBE

    const tj = vals.get("TJ")?.montant ?? 0;
    const rl = vals.get("RL")?.montant ?? 0;
    const xe = xd + tj - rl;  // Résultat d'exploitation

    const tk = vals.get("TK")?.montant ?? 0;
    const tl = vals.get("TL")?.montant ?? 0;
    const tm = vals.get("TM")?.montant ?? 0;
    const rm = vals.get("RM")?.montant ?? 0;
    const rn = vals.get("RN")?.montant ?? 0;
    const xf = tk + tl + tm - rm - rn;  // Résultat financier

    const xg = xe + xf;  // Résultat AO

    const tn = vals.get("TN")?.montant ?? 0;
    const to = vals.get("TO")?.montant ?? 0;
    const ro = vals.get("RO")?.montant ?? 0;
    const rp = vals.get("RP")?.montant ?? 0;
    const xh = tn + to - ro - rp;  // Résultat HAO (XH = XM officiel)

    const rq = vals.get("RQ")?.montant ?? 0;
    const rs = vals.get("RS")?.montant ?? 0;
    const xi = xg + xh - rq - rs;  // Résultat net

    vals.set("XA", { montant: xa, compteUtilises: [] });
    vals.set("XB", { montant: xb, compteUtilises: [] });
    vals.set("XC", { montant: xc, compteUtilises: ["132"] });
    vals.set("XD", { montant: xd, compteUtilises: ["133"] });
    vals.set("XE", { montant: xe, compteUtilises: ["134"] });
    vals.set("XF", { montant: xf, compteUtilises: ["135"] });
    vals.set("XG", { montant: xg, compteUtilises: ["136"] });
    vals.set("XH", { montant: xh, compteUtilises: ["137"] });
    vals.set("XI", { montant: xi, compteUtilises: ["131","139"] });

    return vals;
  }, [soldes]);

  // ─── RENDER ───────────────────────────────────────────────────────────────

  const session = sessions.find(s => s.id === selectedSession);
  const exerciceLabel = session?.exercice ?? new Date().getFullYear().toString();

  // En-tête officiel SYSCOHADA
  function renderEnTete(titre: string) {
    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Désignation entité : <span className="font-medium text-foreground">{session?.nom ?? "—"}</span></span>
          <span>Exercice clos le 31/12/{exerciceLabel}</span>
        </div>
        <div className="text-center font-bold text-sm uppercase text-primary border-b border-primary pb-1">
          {titre} AU 31 DÉCEMBRE {exerciceLabel}
        </div>
      </div>
    );
  }

  function renderActif() {
    return (
      <div>
        {renderEnTete("BILAN : ACTIF")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">ACTIF</th>
                <th className="px-2 py-2 text-center w-10">Note</th>
                <th className="px-2 py-2 text-right w-24">BRUT</th>
                <th className="px-2 py-2 text-right w-28">AMORT et DÉPREC.</th>
                <th className="px-2 py-2 text-right w-24">NET</th>
              </tr>
            </thead>
            <tbody>
              {ACTIF_RUBRIQUES.map(r => {
                const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 };
                if (r.isGrandTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center"></td>
                      <td className="px-2 py-2 text-right">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-2 text-right">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-2 text-right">{formatMontant(v.net)}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-right text-primary font-bold">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-primary">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-primary font-bold">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                    </tr>
                  );
                }
                if (r.isSection) {
                  return (
                    <tr key={r.ref} className="bg-secondary/20 font-semibold text-xs">
                      <td className="px-2 py-1.5 text-secondary-foreground font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-secondary-foreground font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground font-bold">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground font-bold">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className="px-2 py-1.5 text-right">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                    <td className="px-2 py-1.5 text-right text-muted-foreground">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderPassif() {
    return (
      <div>
        {renderEnTete("BILAN : PASSIF")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">PASSIF</th>
                <th className="px-2 py-2 text-center w-10">Note</th>
                <th className="px-2 py-2 text-right w-28">NET (N)</th>
              </tr>
            </thead>
            <tbody>
              {PASSIF_RUBRIQUES.map(r => {
                const val = r.isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0);
                if (r.isGrandTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center"></td>
                      <td className="px-2 py-2 text-right">{formatMontant(val)}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${val < 0 ? "text-red-600 dark:text-red-400" : "text-primary"}`}>
                        {val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : ""}
                      </td>
                    </tr>
                  );
                }
                if (r.isResultat) {
                  return (
                    <tr key={r.ref} className="border-b border-border/40 bg-secondary/10 text-xs">
                      <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                      <td className="px-2 py-1.5 font-medium">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${resultatNet >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                        {resultatNet !== 0 ? `${formatMontant(Math.abs(resultatNet))} ${resultatNet >= 0 ? "(Bénéfice)" : "(Perte)"}` : ""}
                      </td>
                    </tr>
                  );
                }
                const isSigne = (r as any).isSigne ?? false;
                const displayVal = isSigne
                  ? (val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : "")
                  : (val !== 0 ? formatMontant(val) : "");
                const valColor = isSigne && val < 0 ? "text-red-600 dark:text-red-400" : "";
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className={`px-2 py-1.5 text-right font-medium ${valColor}`}>{displayVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderCR() {
    return (
      <div>
        {renderEnTete("COMPTE DE RÉSULTAT")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">LIBELLÉS</th>
                <th className="px-2 py-2 text-center w-10">+/-</th>
                <th className="px-2 py-2 text-center w-16">NOTE</th>
                <th className="px-2 py-2 text-left w-32">Comptes</th>
                <th className="px-2 py-2 text-right w-32">Montant (N)</th>
              </tr>
            </thead>
            <tbody>
              {CR_RUBRIQUES.map(r => {
                const v = crVals.get(r.ref) ?? { montant: 0, compteUtilises: [...(r.comptes ?? [])] };
                if (r.isGrandTotal) {
                  const xi = crVals.get("XI")?.montant ?? resultatNet;
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center">{xi >= 0 ? "+" : "-"}</td>
                      <td className="px-2 py-2 text-center">{r.note}</td>
                      <td className="px-2 py-2 text-xs">{v.compteUtilises.join(", ")}</td>
                      <td className="px-2 py-2 text-right">{formatMontant(Math.abs(xi))}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center">{v.montant >= 0 ? "+" : "-"}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-xs text-muted-foreground">{v.compteUtilises.join(", ")}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${v.montant >= 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                        {formatMontant(Math.abs(v.montant))}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.sens}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className="px-2 py-1.5 text-xs text-muted-foreground">{v.compteUtilises.join(", ")}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{v.montant !== 0 ? formatMontant(v.montant) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement du bilan..." />

  const isBilan = mode === "bilan"
  const isCR    = mode === "cr"

  return (
    <div className="space-y-5 animate-fadeIn">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
                <FileDown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  {isBilan ? "Bilan" : "Compte de Résultat"}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {""}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isBilan && (
                <Button variant="outline" size="sm" onClick={() => {
                  const actifRows = ACTIF_RUBRIQUES.map(r => {
                    const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 };
                    return { ref: r.ref, label: r.label, brut: v.brut, amort: v.corr, net: v.net };
                  });
                  const passifRows = PASSIF_RUBRIQUES.map(r => {
                    const val = r.isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0);
                    return { ref: r.ref, label: r.label, net: val };
                  });
                  exportBilanPDF(session?.nom ?? "Session", actifRows, passifRows);
                }}>
                  <FileDown className="w-4 h-4 mr-1" /> PDF Bilan
                </Button>
              )}
              {isCR && (
                <Button variant="outline" size="sm" onClick={() => {
                  const rows = CR_RUBRIQUES.map(r => {
                    const v = crVals.get(r.ref) ?? { montant: 0, compteUtilises: [...(r.comptes ?? [])] };
                    return { ref: r.ref, label: r.label, sens: r.sens, comptes: v.compteUtilises.join(", "), montant: v.montant };
                  });
                  exportResultatPDF(session?.nom ?? "Session", rows);
                }}>
                  <FileDown className="w-4 h-4 mr-1" /> PDF Résultat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sélecteur session */}
      <div className="animate-slideUp" style={{ animationDelay: '80ms' }}>
        <Select value={selectedSession} onValueChange={setSelectedSession}>
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Sélectionner une session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map(s => (
              <SelectItem key={s.id} value={s.id}>{s.nom} ({s.exercice})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contenu */}
      {isBilan ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slideUp" style={{ animationDelay: '120ms' }}>
          <div>{renderActif()}</div>
          <div>{renderPassif()}</div>
        </div>
      ) : (
        <div className="animate-slideUp" style={{ animationDelay: '120ms' }}>{renderCR()}</div>
      )}
    </div>
  );
}
