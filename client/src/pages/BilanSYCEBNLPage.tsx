import BackButton from '@/components/BackButton'
import { useUser } from '@/lib/userContext'
import React, { useMemo, useState } from "react";
import PageLoader from '@/components/PageLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

import { useModule } from "@/lib/moduleContext";
import { formatMontant } from "@/lib/utils";
import { useSessions, useEcritures } from '@/lib/useFirestore'

// ─── Types pour les rubriques SYCEBNL ────────────────────────────────────────
interface RubriqueActif { ref: string; label: string; note: string; comptesBrut: string[]; comptesCorr: string[]; isSection?: boolean; isTotal?: boolean; isGrandTotal?: boolean; totalRefs?: string[] }
interface RubriquePassif { ref: string; label: string; note: string; comptes: string[]; isSection?: boolean; isTotal?: boolean; isGrandTotal?: boolean; isResultat?: boolean; isSousTotalMajeur?: boolean; totalRefs?: string[] }
interface RubriqueCR { ref: string; label: string; note: string; comptes: string[]; sens?: string; isTotal?: boolean; isGrandTotal?: boolean; isSolde?: boolean; totalRefs?: string[] }

// ─── DOCTRINE SYCEBNL (Acte Uniforme OHADA : SYCEBNL 2022) ───────────────────
// Référence : modèle officiel p.346 (Bilan), p.347 (Compte de Résultat)
// Entités concernées : associations, ONG, fondations, projets de développement
// Particularités SYCEBNL vs SYSCOHADA :
//   - Fonds propres remplacés par Ressources propres (Fonds propres + Fonds affectés)
//   - Résultat = Excédent (+) ou Déficit (-)
//   - CR structuré en Revenus – Emplois (pas en soldes intermédiaires)
//   - Pas de capital social, mais dotations (consomptibles / non consomptibles)
//   - Fonds affectés et reportés provenant de dons et legs d'immobilisations
// ─────────────────────────────────────────────────────────────────────────────

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

// ─── ACTIF SYCEBNL : Modèle officiel p.346 ───────────────────────────────────
// Colonnes : REF | ACTIF | Note | BRUT | Amort/Dépréc. | NET (N) | NET (N-1)
const ACTIF_RUBRIQUES: RubriqueActif[] = [
  // ── Immobilisations destinées à la vente ──
  { ref: "AA", label: "Immobilisations destinées à la vente provenant de dons et legs non encore reçues et usufruit temporaire",
    note: "3", comptesBrut: ["260","261","262","263","264","265"], comptesCorr: ["296","297"] },
  // ── Immobilisations incorporelles ──
  { ref: "AD", label: "IMMOBILISATIONS INCORPORELLES", note: "3", comptesBrut: [], comptesCorr: [], isSection: true },
  { ref: "AE", label: "Brevets, licences, logiciels et droits similaires",
    note: "", comptesBrut: ["211","212","213","214","2181","2191","2193"], comptesCorr: ["2811","2812","2813","2814","2818","2911","2912","2913","2914","2918","2919","2929"] },
  { ref: "AF", label: "Autres immobilisations incorporelles",
    note: "", comptesBrut: ["215","216","217","218"], comptesCorr: ["2815","2816","2817","2818","2915","2916","2917","2918"] },
  { ref: "AG", label: "Avances et acomptes versés sur immobilisations incorporelles",
    note: "", comptesBrut: ["251"], comptesCorr: ["2951"] },
  // ── Immobilisations corporelles ──
  { ref: "AH", label: "IMMOBILISATIONS CORPORELLES", note: "3", comptesBrut: [], comptesCorr: [], isSection: true },
  { ref: "AI", label: "Terrains",
    note: "", comptesBrut: ["22"], comptesCorr: ["282","292"] },
  { ref: "AJ", label: "Bâtiments",
    note: "", comptesBrut: ["231","232","233","237","2391"], comptesCorr: ["2831","2832","2833","2837","2931","2932","2933","2937","2939"] },
  { ref: "AK", label: "Aménagements, agencements et installations",
    note: "", comptesBrut: ["234","235","238","2392","2393"], comptesCorr: ["2834","2835","2838","2934","2935","2938","2939"] },
  { ref: "AL", label: "Matériel, mobilier et actifs biologiques",
    note: "", comptesBrut: ["24"], comptesCorr: ["284","294","2949"] },
  { ref: "AM", label: "Matériel de transport",
    note: "", comptesBrut: ["245","2495"], comptesCorr: ["2845","2948","2949"] },
  { ref: "AN", label: "Avances et acomptes versés sur immobilisations corporelles",
    note: "", comptesBrut: ["252"], comptesCorr: ["2952"] },
  // ── Immobilisations financières ──
  { ref: "AO", label: "IMMOBILISATIONS FINANCIÈRES", note: "4", comptesBrut: [], comptesCorr: [], isSection: true },
  { ref: "AX", label: "Titres de participation",
    note: "", comptesBrut: ["26"], comptesCorr: ["296"] },
  { ref: "AY", label: "Autres immobilisations financières",
    note: "", comptesBrut: ["27"], comptesCorr: ["297"] },
  { ref: "AZ", label: "TOTAL ACTIF IMMOBILISÉ", note: "", comptesBrut: [], comptesCorr: [], isTotal: true, totalRefs: ["AA","AD","AH","AO"] },
  // ── Actif circulant ──
  { ref: "BA", label: "Actif circulant HAO",
    note: "5", comptesBrut: ["485","488"], comptesCorr: ["498"] },
  { ref: "BB", label: "Stocks et encours",
    note: "6", comptesBrut: ["31","32","33","34","35","36","37","38"], comptesCorr: ["39"] },
  { ref: "BC", label: "Fournisseurs débiteurs",
    note: "17", comptesBrut: ["409"], comptesCorr: ["490"] },
  { ref: "BD", label: "Adhérents, Clients-usagers",
    note: "7", comptesBrut: ["41"], comptesCorr: ["491"] },
  { ref: "BE", label: "Autres créances",
    note: "8", comptesBrut: ["185","42","43","44","45","46","47"], comptesCorr: ["492","493","494","495","496","497"] },
  { ref: "BT", label: "TOTAL ACTIF CIRCULANT", note: "", comptesBrut: [], comptesCorr: [], isTotal: true, totalRefs: ["BA","BB","BC","BD","BE"] },
  // ── Trésorerie ──
  { ref: "BU", label: "Titres de placement",
    note: "9", comptesBrut: ["50"], comptesCorr: ["590"] },
  { ref: "BV", label: "Valeurs à encaisser",
    note: "10", comptesBrut: ["51"], comptesCorr: ["591"] },
  { ref: "BW", label: "Banques, établissements financiers et assimilés",
    note: "11", comptesBrut: ["52","53","54","55","57","581","582"], comptesCorr: ["592","593","594"] },
  { ref: "BX", label: "TOTAL TRÉSORERIE ACTIF", note: "", comptesBrut: [], comptesCorr: [], isTotal: true, totalRefs: ["BU","BV","BW"] },
  { ref: "BY", label: "Écart de conversion-Actif",
    note: "12", comptesBrut: ["478"], comptesCorr: [] },
  { ref: "BZ", label: "TOTAL GÉNÉRAL", note: "", comptesBrut: [], comptesCorr: [], isGrandTotal: true },
] as const;

// ─── PASSIF SYCEBNL : Modèle officiel p.346 ──────────────────────────────────
// Colonnes : REF | PASSIF | Note | NET (N) | NET (N-1)
// Structure : Fonds propres et assimilés + Fonds affectés et reportés = Ressources propres
const PASSIF_RUBRIQUES: RubriquePassif[] = [
  // ── Fonds propres et assimilés ──
  { ref: "CA", label: "Dotation non consomptible sans droit de reprise",   note: "13", comptes: ["101","102"] },
  { ref: "CB", label: "Dotation non consomptible avec droit de reprise",   note: "13", comptes: ["103","104"] },
  { ref: "CC", label: "Droit d'entrée",                                    note: "13", comptes: ["105","108"] },
  { ref: "CD", label: "Dotation consomptible",                             note: "13", comptes: ["109"] },
  { ref: "CE", label: "Écarts de réévaluation",                            note: "3e", comptes: ["106"] },
  { ref: "CF", label: "Réserves",                                          note: "14", comptes: ["111","112","113","118"] },
  { ref: "CG", label: "Report à nouveau (+/-)",                            note: "14", comptes: ["12","121","129"] },
  { ref: "CH", label: "Résultat net de l'exercice (excédent + ou déficit -)", note: "", comptes: ["13","131","139"], isResultat: true },
  { ref: "CI", label: "Subventions d'investissement",                      note: "15", comptes: ["14"] },
  { ref: "CJ", label: "Provisions réglementées",                           note: "15", comptes: ["15"] },
  { ref: "CK", label: "TOTAL FONDS PROPRES ET ASSIMILÉS",                  note: "", comptes: [], isTotal: true, totalRefs: ["CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ"] },
  // ── Fonds affectés et reportés ──
  { ref: "CW", label: "Fonds affectés et provenant de dons et legs d'immobilisations", note: "16", comptes: ["165","166"] },
  { ref: "CX", label: "Fonds reportés",                                    note: "16", comptes: ["167","168","169"] },
  { ref: "CY", label: "TOTAL FONDS AFFECTÉS ET REPORTÉS",                  note: "", comptes: [], isTotal: true, totalRefs: ["CW","CX"] },
  { ref: "CZ", label: "TOTAL RESSOURCES PROPRES ET ASSIMILÉES",            note: "", comptes: [], isTotal: true, totalRefs: ["CK","CY"], isSousTotalMajeur: true },
  // ── Dettes financières et ressources assimilées ──
  { ref: "DA", label: "Dettes financières",                                note: "17", comptes: ["16","181","182","183","184"] },
  { ref: "DB", label: "Dettes de location-acquisition",                    note: "17", comptes: ["17"] },
  { ref: "DC", label: "Provisions pour risques et charges",                note: "17", comptes: ["19"] },
  { ref: "DD", label: "TOTAL DETTES FINANCIÈRES ET RESSOURCES ASSIMILÉES", note: "", comptes: [], isTotal: true, totalRefs: ["DA","DB","DC"] },
  { ref: "DE", label: "TOTAL RESSOURCES STABLES",                          note: "", comptes: [], isTotal: true, totalRefs: ["CZ","DD"], isSousTotalMajeur: true },
  // ── Passif circulant ──
  { ref: "DF", label: "Dettes circulantes HAO",                            note: "5",  comptes: ["481","482","484","4998"] },
  { ref: "DG", label: "Adhérents, clients-usagers créditeurs",             note: "7",  comptes: ["419"] },
  { ref: "DH", label: "Fournisseurs",                                      note: "18", comptes: ["40"] },
  { ref: "DI", label: "Autres dettes",                                     note: "19", comptes: ["42","43","44","45","46","47","185"] },
  { ref: "DV", label: "TOTAL PASSIF CIRCULANT",                            note: "", comptes: [], isTotal: true, totalRefs: ["DF","DG","DH","DI"] },
  // ── Trésorerie passif ──
  { ref: "DW", label: "Banques, établissements financiers et crédits de trésorerie", note: "20", comptes: ["52","53","561","564","565","566"] },
  { ref: "DX", label: "TOTAL TRÉSORERIE PASSIF",                           note: "", comptes: [], isTotal: true, totalRefs: ["DW"] },
  { ref: "DY", label: "Écart de conversion-Passif",                        note: "12", comptes: ["479"] },
  { ref: "DZ", label: "TOTAL GÉNÉRAL",                                     note: "", comptes: [], isGrandTotal: true },
] as const;

// ─── COMPTE DE RÉSULTAT SYCEBNL : Modèle officiel p.347 ──────────────────────
// Colonnes : REF | LIBELLÉS | NOTE | NET (N) | NET (N-1)
// Structure : Revenus des AO – Charges des AO = Résultat AO + HAO = Résultat net
const CR_RUBRIQUES: RubriqueCR[] = [
  // ── Revenus des activités ordinaires ──
  { ref: "RA", label: "Cotisations",                                        note: "23", comptes: ["703","704","705"], sens: "+" },
  { ref: "RB", label: "Dotations consomptibles transférées au compte de résultat", note: "23", comptes: ["701","702"], sens: "+" },
  { ref: "RC", label: "Revenus liés à la générosité",                       note: "23", comptes: ["706","707","708"], sens: "+" },
  { ref: "RD", label: "Ventes de marchandises",                             note: "23", comptes: ["701"], sens: "+" },
  { ref: "RE", label: "Ventes de services et produits finis",               note: "23", comptes: ["702","703","704","705","706"], sens: "+" },
  { ref: "RF", label: "Subventions d'exploitation",                         note: "23", comptes: ["71"], sens: "+" },
  { ref: "RG", label: "Autres produits et transferts de charges",           note: "23", comptes: ["75","781","787"], sens: "+" },
  { ref: "RH", label: "Reprises de provisions, dépréciations, subventions et autres reprises", note: "5D&30", comptes: ["791","798","799","797"], sens: "+" },
  { ref: "XA", label: "REVENUS DES ACTIVITÉS ORDINAIRES (Somme RA à RG)",  note: "", comptes: [], isTotal: true },
  // ── Charges des activités ordinaires ──
  { ref: "TA", label: "Achats de biens et services liés à l'activité",      note: "24", comptes: ["601","602"], sens: "-" },
  { ref: "TB", label: "Variation de stocks des achats de biens et services liés à l'activité", note: "8", comptes: ["6031","6032"], sens: "-/+" },
  { ref: "TC", label: "Achats de marchandises et matières premières",       note: "24", comptes: ["601","602","604"], sens: "-" },
  { ref: "TD", label: "Autres achats",                                      note: "24", comptes: ["604","605","608"], sens: "-" },
  { ref: "TE", label: "Variation de stocks de marchandises, matières premières et autres", note: "8", comptes: ["6033","603"], sens: "-/+" },
  { ref: "TF", label: "Transports",                                         note: "25", comptes: ["61"], sens: "-" },
  { ref: "TG", label: "Services extérieurs",                                note: "26", comptes: ["62","63"], sens: "-" },
  { ref: "TH", label: "Impôts et taxes",                                    note: "27", comptes: ["64"], sens: "-" },
  { ref: "TI", label: "Autres charges",                                     note: "28", comptes: ["65"], sens: "-" },
  { ref: "TJ", label: "Charges de personnel",                               note: "29", comptes: ["66"], sens: "-" },
  { ref: "TK", label: "Frais financiers et charges assimilées",             note: "31", comptes: ["67","697"], sens: "-" },
  { ref: "TL", label: "Dotations aux amortissements, provisions, dépréciations et autres", note: "5D&30", comptes: ["681","691","697"], sens: "-" },
  { ref: "XB", label: "CHARGES DES ACTIVITÉS ORDINAIRES (Somme TA à TL)",  note: "", comptes: [], isTotal: true },
  { ref: "XC", label: "RÉSULTAT DES ACTIVITÉS ORDINAIRES (XA - XB)",       note: "", comptes: [], isTotal: true, isSolde: true },
  // ── HAO ──
  { ref: "TM", label: "Produits H.A.O.",                                    note: "32", comptes: ["82","84","86","88","77","797"], sens: "+" },
  { ref: "TN", label: "Charges H.A.O.",                                     note: "32", comptes: ["81","83","85","87","89"], sens: "-" },
  { ref: "XD", label: "RÉSULTAT H.A.O. (TM - TN)",                         note: "", comptes: [], isTotal: true, isSolde: true },
  // ── Résultat final ──
  { ref: "XE", label: "RÉSULTAT NET DE L'EXERCICE (+excédent, -déficit) (XC + XD)", note: "", comptes: ["13","131","139"], isGrandTotal: true },
] as const;

// ─── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────

export default function BilanSYCEBNLPage() {
  const user = useUser()
  const module = useModule();
  const { sessions, loading: loadingSessions } = useSessions(user?.id, module)
  const [selectedSession, setSelectedSession] = useState(sessions[0]?.id || "");
  const [tab, setTab] = useState<"bilan" | "cr">("bilan");

  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures(user?.id, module)
  const ecritures = useMemo(() => allEcritures.filter(e => e.sessionId === selectedSession),
    [allEcritures, selectedSession]
  );

  // Calcul des soldes par compte
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

  function getSoldesBrut(prefixes: readonly string[]): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (!estCorrectif(num) && prefixes.some(p => num.startsWith(p))) {
        const net = s.debit - s.credit;
        if (net > 0) total += net;
      }
    });
    return total;
  }

  function getSoldesCorr(prefixes: readonly string[]): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (estCorrectif(num) && prefixes.some(p => num.startsWith(p))) {
        const net = s.credit - s.debit;
        if (net > 0) total += net;
      }
    });
    return total;
  }

  // Passif standard : solde créditeur normal (positif = bon sens)
  // Retourne le net algébrique (crédit - débit) — peut être négatif pour déficits/reports débiteurs
  function getSoldesPassif(prefixes: readonly string[]): number {
    let total = 0;
    soldes.forEach((s, num) => {
      if (prefixes.some(p => num.startsWith(p))) {
        total += s.credit - s.debit;
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

  function getComptesUtilises(prefixes: readonly string[]): string[] {
    const used: string[] = [];
    soldes.forEach((_, num) => {
      if (prefixes.some(p => num.startsWith(p))) used.push(num);
    });
    return used.sort();
  }

  // ── Résultat SYCEBNL : Excédent (produits > charges) ou Déficit ──
  const resultatNet = useMemo(() => {
    let revenus = 0, charges = 0;
    soldes.forEach((s, num) => {
      if (num.startsWith("7")) revenus += s.credit - s.debit;
      if (num.startsWith("6")) charges += s.debit - s.credit;
      if (num.startsWith("8")) {
        const net = s.debit - s.credit;
        if (net > 0) charges += net; else revenus += (-net);
      }
    });
    return revenus - charges;  // positif = excédent, négatif = déficit
  }, [soldes]);

  // ── Calcul Actif SYCEBNL ──
  type ActifRow = { brut: number; corr: number; net: number };
  const actifVals = useMemo(() => {
    const vals = new Map<string, ActifRow>();
    for (const r of ACTIF_RUBRIQUES) {
      if (r.isSection || r.isTotal || r.isGrandTotal) {
        vals.set(r.ref, { brut: 0, corr: 0, net: 0 });
        continue;
      }
      const brut = getSoldesBrut(r.comptesBrut);
      const corr = getSoldesCorr(r.comptesCorr);
      vals.set(r.ref, { brut, corr, net: Math.max(0, brut - corr) });
    }
    // Sections = somme enfants
    const sectionMap: Record<string, string[]> = {
      "AD": ["AE","AF","AG"],
      "AH": ["AI","AJ","AK","AL","AM","AN"],
      "AO": ["AX","AY"],
    };
    for (const [sec, children] of Object.entries(sectionMap)) {
      const b = children.reduce((s, c) => s + (vals.get(c)?.brut ?? 0), 0);
      const c2 = children.reduce((s, c) => s + (vals.get(c)?.corr ?? 0), 0);
      vals.set(sec, { brut: b, corr: c2, net: Math.max(0, b - c2) });
    }
    // Totaux
    function calcTotal(refs: string[]): ActifRow {
      const b = refs.reduce((s, r) => s + (vals.get(r)?.brut ?? 0), 0);
      const c2 = refs.reduce((s, r) => s + (vals.get(r)?.corr ?? 0), 0);
      return { brut: b, corr: c2, net: Math.max(0, b - c2) };
    }
    vals.set("AZ", calcTotal(["AA","AD","AH","AO"]));
    vals.set("BT", calcTotal(["BA","BB","BC","BD","BE"]));
    vals.set("BX", calcTotal(["BU","BV","BW"]));
    // Total général = AZ + BT + BX + BY
    const bz = ["AZ","BT","BX","BY"].reduce((s, r) => s + (vals.get(r)?.net ?? 0), 0);
    vals.set("BZ", { brut: bz, corr: 0, net: bz });
    return vals;
  }, [soldes]);

  // ── Calcul Passif SYCEBNL ──
  const passifVals = useMemo(() => {
    const vals = new Map<string, number>();
    for (const r of PASSIF_RUBRIQUES) {
      if (r.isTotal || r.isGrandTotal) { vals.set(r.ref, 0); continue; }
      if (r.isResultat) { vals.set(r.ref, resultatNet); continue; }
      vals.set(r.ref, getSoldesPassif(r.comptes));
    }
    const totals: Record<string, string[]> = {
      "CK": ["CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ"],
      "CY": ["CW","CX"],
      "CZ": ["CK","CY"],
      "DD": ["DA","DB","DC"],
      "DE": ["CZ","DD"],
      "DV": ["DF","DG","DH","DI"],
      "DX": ["DW"],
    };
    for (const [tot, refs] of Object.entries(totals)) {
      vals.set(tot, refs.reduce((s, r) => s + (vals.get(r) ?? 0), 0));
    }
    const dy = vals.get("DY") ?? 0;
    vals.set("DZ", (vals.get("DE") ?? 0) + (vals.get("DV") ?? 0) + (vals.get("DX") ?? 0) + dy);
    return vals;
  }, [soldes, resultatNet]);

  // ── Calcul Compte de Résultat SYCEBNL ──
  type CRVal = { montant: number; compteUtilises: string[] };
  const crVals = useMemo(() => {
    const vals = new Map<string, CRVal>();
    for (const r of CR_RUBRIQUES) {
      if (r.isTotal || r.isGrandTotal) continue;
      const raw = getSoldesCR(r.comptes);
      const used = getComptesUtilises(r.comptes);
      const displayUsed = used.length > 0 ? used : [...r.comptes];
      vals.set(r.ref, { montant: Math.abs(raw), compteUtilises: displayUsed });
    }

    // Revenus AO = somme RA à RG (+ RH reprises)
    const ra = vals.get("RA")?.montant ?? 0;
    const rb = vals.get("RB")?.montant ?? 0;
    const rc = vals.get("RC")?.montant ?? 0;
    const rd = vals.get("RD")?.montant ?? 0;
    const re = vals.get("RE")?.montant ?? 0;
    const rf = vals.get("RF")?.montant ?? 0;
    const rg = vals.get("RG")?.montant ?? 0;
    const rh = vals.get("RH")?.montant ?? 0;
    const xaVal = ra + rb + rc + rd + re + rf + rg + rh;

    // Charges AO = somme TA à TL
    const ta = vals.get("TA")?.montant ?? 0;
    const tb = vals.get("TB")?.montant ?? 0;
    const tc = vals.get("TC")?.montant ?? 0;
    const td = vals.get("TD")?.montant ?? 0;
    const te = vals.get("TE")?.montant ?? 0;
    const tf = vals.get("TF")?.montant ?? 0;
    const tg = vals.get("TG")?.montant ?? 0;
    const th = vals.get("TH")?.montant ?? 0;
    const ti = vals.get("TI")?.montant ?? 0;
    const tj = vals.get("TJ")?.montant ?? 0;
    const tk = vals.get("TK")?.montant ?? 0;
    const tl = vals.get("TL")?.montant ?? 0;
    const xbVal = ta + tb + tc + td + te + tf + tg + th + ti + tj + tk + tl;

    // Résultat AO
    const xcVal = xaVal - xbVal;

    // HAO
    const tmVal = vals.get("TM")?.montant ?? 0;
    const tnVal = vals.get("TN")?.montant ?? 0;
    const xdVal = tmVal - tnVal;

    // Résultat net = XC + XD
    const xeVal = xcVal + xdVal;

    vals.set("XA", { montant: xaVal, compteUtilises: [] });
    vals.set("XB", { montant: xbVal, compteUtilises: [] });
    vals.set("XC", { montant: xcVal, compteUtilises: [] });
    vals.set("XD", { montant: xdVal, compteUtilises: [] });
    vals.set("XE", { montant: xeVal, compteUtilises: ["13","131","139"] });

    return vals;
  }, [soldes]);

  // ── RENDER ─────────────────────────────────────────────────────────────────

  const session = sessions.find(s => s.id === selectedSession);
  const exerciceLabel = session?.exercice ?? new Date().getFullYear().toString();

  function renderEnTete(titre: string) {
    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Entité : <span className="font-medium text-foreground">{session?.nom ?? "—"}</span></span>
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
        {renderEnTete("BILAN SYCEBNL : ACTIF")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">ACTIF</th>
                <th className="px-2 py-2 text-center w-10">Note</th>
                <th className="px-2 py-2 text-right w-24">BRUT</th>
                <th className="px-2 py-2 text-right w-28">Amort./Dépréc.</th>
                <th className="px-2 py-2 text-right w-24">NET (N)</th>
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
        {renderEnTete("BILAN SYCEBNL : PASSIF")}
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
                if (r.isSousTotalMajeur) {
                  const displayST = val < 0
                    ? `(${formatMontant(Math.abs(val))})`
                    : (val !== 0 ? formatMontant(val) : "");
                  return (
                    <tr key={r.ref} className="bg-primary/25 font-bold border-t-2 border-primary/50 text-xs">
                      <td className="px-2 py-2 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-2 text-primary font-bold">{r.label}</td>
                      <td className="px-2 py-2 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-2 text-right font-bold ${val < 0 ? "text-red-700 dark:text-red-400" : "text-primary"}`}>{displayST}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  const displayTot = val < 0
                    ? `(${formatMontant(Math.abs(val))})`
                    : (val !== 0 ? formatMontant(val) : "");
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${val < 0 ? "text-red-700 dark:text-red-400" : "text-primary"}`}>{displayTot}</td>
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
                        {resultatNet !== 0 ? `${formatMontant(Math.abs(resultatNet))} ${resultatNet >= 0 ? "(Excédent)" : "(Déficit)"}` : ""}
                      </td>
                    </tr>
                  );
                }
                // Affichage algébrique : valeur négative entre parenthèses (convention comptable)
                const displayPassif = val < 0
                  ? `(${formatMontant(Math.abs(val))})`
                  : (val !== 0 ? formatMontant(val) : "");
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className={`px-2 py-1.5 text-right font-medium ${val < 0 ? "text-red-700 dark:text-red-400" : ""}`}>{displayPassif}</td>
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
        {renderEnTete("COMPTE DE RÉSULTAT SYCEBNL")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">LIBELLÉS</th>
                <th className="px-2 py-2 text-center w-10">+/-</th>
                <th className="px-2 py-2 text-center w-16">NOTE</th>
                <th className="px-2 py-2 text-left w-28">Comptes</th>
                <th className="px-2 py-2 text-right w-32">Montant (N)</th>
              </tr>
            </thead>
            <tbody>
              {CR_RUBRIQUES.map(r => {
                const v = crVals.get(r.ref) ?? { montant: 0, compteUtilises: r.comptes ? [...r.comptes] : [] };
                if (r.isGrandTotal) {
                  const xeVal = crVals.get("XE")?.montant ?? resultatNet;
                  const isExcedent = xeVal >= 0;
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center">{isExcedent ? "+" : "-"}</td>
                      <td className="px-2 py-2 text-center">{r.note}</td>
                      <td className="px-2 py-2 text-xs">{v.compteUtilises.join(", ")}</td>
                      <td className="px-2 py-2 text-right">
                        {formatMontant(Math.abs(xeVal))}
                        <span className="ml-1 text-xs font-normal opacity-80">{isExcedent ? "(Excédent)" : "(Déficit)"}</span>
                      </td>
                    </tr>
                  );
                }
                if (r.isSolde) {
                  // Sous-total de type résultat intermédiaire
                  const isPos = v.montant >= 0;
                  return (
                    <tr key={r.ref} className="bg-primary/25 font-bold border-t-2 border-primary/50 text-xs">
                      <td className="px-2 py-2 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-2 text-primary font-bold">{r.label}</td>
                      <td className="px-2 py-2 text-center">{isPos ? "+" : "-"}</td>
                      <td className="px-2 py-2 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-2 text-xs text-muted-foreground"></td>
                      <td className={`px-2 py-2 text-right font-bold ${isPos ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
                        {formatMontant(Math.abs(v.montant))}
                      </td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center"></td>
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
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.sens ?? ""}</td>
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

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement des états financiers SYCEBNL..." />

  return (
    <div className="space-y-6 animate-fadeIn">
      <BackButton />
      {/* En-tête */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">États Financiers SYCEBNL</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Système Comptable des Entités à But Non Lucratif : Modèle officiel p.346-347
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled title="Export PDF disponible prochainement">
            <FileDown className="w-4 h-4 mr-1" /> PDF
          </Button>
        </div>
      </div>

      {/* Sélecteur session */}
      {sessions.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 px-4 py-3">
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">Aucune session comptable trouvée.</p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
            Créez une session dans le module Journal pour commencer.
          </p>
        </div>
      ) : (
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
      )}

      {/* Onglets */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setTab("bilan")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "bilan" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Bilan
        </button>
        <button
          onClick={() => setTab("cr")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "cr" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Compte de Résultat
        </button>
      </div>

      {/* Note informative SYCEBNL */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800 px-4 py-2">
        <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
          SYCEBNL : Entités à But Non Lucratif (ONG, Associations, Fondations)
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
          {tab === "bilan"
            ? "Le Passif SYCEBNL distingue : Fonds propres et assimilés + Fonds affectés et reportés = Ressources propres et assimilées. Le résultat est appelé Excédent (+) ou Déficit (-)."
            : "Le CR SYCEBNL est structuré en Revenus des AO – Charges des AO = Résultat AO, puis ± HAO = Résultat net. Il n'y a pas de Marge commerciale ni de Valeur ajoutée comme dans SYSCOHADA."}
        </p>
      </div>

      {/* Contenu */}
      {tab === "bilan" ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>{renderActif()}</div>
          <div>{renderPassif()}</div>
        </div>
      ) : (
        <div>{renderCR()}</div>
      )}
    </div>
  );
}
