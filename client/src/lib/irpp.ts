// ─────────────────────────────────────────────────────────────────────────────
// MOTEUR DE CALCUL IRPP CAT. 1 (Salariés et assimilés) — Loi n°23/053 du 30/11/2023
// ─────────────────────────────────────────────────────────────────────────────
// Source unique de vérité pour tout calcul d'IRPP Cat. 1 dans l'application.
// Extrait de FiscalitePage.tsx (Cat1Salaires) pour être partagé avec
// ChargesPersonnelIPRPage.tsx (UE9 Module 6) : les deux pages calculaient le
// même impôt avec deux moteurs qui avaient divergé — celui de Fiscalité était
// à jour, celui de la Comptabilité générale gardait un plancher de 2 000 FC
// aboli, ignorait la part imposable du 663 dans l'assiette, et neutralisait
// à tort toute la réduction pour charges dès que le revenu dépassait 3,6M FC
// au lieu de n'en exclure que la portion afférente à la tranche à 40%.

// ─── Barème progressif mensuel (annuel ÷ 12) : Art. 118 Loi 23/053 ───────────
export const BAREME_MENSUEL_IRPP = [
  { min: 0,         max: 162_000,     taux: 0.03, label: '0 – 162 000 FC (3%)' },
  { min: 162_000,   max: 1_800_000,   taux: 0.15, label: '162 000 – 1 800 000 FC (15%)' },
  { min: 1_800_000, max: 3_600_000,   taux: 0.30, label: '1 800 000 – 3 600 000 FC (30%)' },
  { min: 3_600_000, max: Infinity,    taux: 0.40, label: '> 3 600 000 FC (40%)' },
]

// baseReelle = revenu net imposable - min de la tranche (portion réelle du salarié dans la tranche)
export interface LigneBaremeIRPP {
  tranche: string   // ex: "0 – 162 000 FC (3%)"
  taux: string      // ex: "3%"
  baseReelle: number // revenu_net_imposable - min_tranche (ou max_tranche - min_tranche si tranche pleine)
  impot: number     // baseReelle × taux
}

// N'applique QUE le barème progressif - ni la réduction pour charges de famille (Art. 123-125),
// ni le plafond (Art. 118 in fine). L'ordre de liquidation retenu par le texte et la pratique est :
// barème → réduction pour charges → plafond 30% → arrondi. Appliquer le plafond ici, avant la
// réduction, sous-évaluerait la réduction (assise sur un IRPP déjà plafonné) et surévaluerait
// l'impôt net final. Le plafond doit être comparé et appliqué par l'appelant, APRÈS réduction.
export function calculerBaremeIRPP(revenuNetImposable: number): {
  lignes: LigneBaremeIRPP[]
  iprBrut: number
  iprMax: number   // plafond Art. 118 = 30% du revenu net imposable - à appliquer après réduction
} {
  const lignes: LigneBaremeIRPP[] = []
  let iprBrut = 0

  for (const t of BAREME_MENSUEL_IRPP) {
    if (revenuNetImposable <= t.min) break
    const borneMax = t.max === Infinity ? revenuNetImposable : Math.min(revenuNetImposable, t.max)
    const baseReelle = borneMax - t.min
    if (baseReelle <= 0) continue
    const impot = baseReelle * t.taux
    lignes.push({
      tranche: t.label,
      taux: `${(t.taux * 100).toFixed(0)}%`,
      baseReelle,
      impot,
    })
    iprBrut += impot
  }

  const iprMax = revenuNetImposable * 0.30
  return { lignes, iprBrut, iprMax }
}

// Applique, dans cet ordre, la réduction pour charges de famille (Art. 123-125) puis le plafond
// de 30% (Art. 118 in fine) sur un IRPP brut déjà calculé par calculerBaremeIRPP().
export function appliquerReductionEtPlafondIRPP(iprBrut: number, iprMax: number, reduction: number): {
  iprApresReduction: number
  plafonne: boolean
  iprFinal: number
} {
  const iprApresReduction = Math.max(0, iprBrut - reduction)
  const plafonne = iprApresReduction > iprMax
  const iprFinal = plafonne ? iprMax : iprApresReduction
  return { iprApresReduction, plafonne, iprFinal }
}

// Art. 69, 8° : les indemnités et avantages du compte 663 ne sont exonérés que sous condition,
// ligne par ligne - ce n'est jamais la catégorie 663 dans son ensemble qui est immunisée :
//   a) logement (6631) : exonéré dans la limite de 30% de la rémunération (661/662) ; l'excédent
//      est imposable (il « remonte » conceptuellement en 661/662, donc traité ici comme imposable) ;
//   b) transport (6634) : exonéré sous condition de réalité et de nécessité démontrées, plafonné
//      au coût du billet local (max 6 courses de taxi pour les cadres, de bus pour les autres) -
//      ce plafond en FC dépend d'un tarif local que le simulateur ne connaît pas : exonéré par
//      défaut, avec un avertissement explicite plutôt qu'un faux calcul du plafond ;
//   c) tout le reste (6632 représentation, 6633 expatriation, 6638 autres, ou un code non reconnu) :
//      non listé à l'art. 69 → imposable, ajouté à l'assiette au même titre que le 661/662.
export function qualifier663(
  lignes: Array<{ code: string; montant: string }>,
  remuneration: number
): { exempte: number; imposable: number } {
  let exempte = 0
  let imposable = 0
  for (const l of lignes) {
    const montant = parseFloat(l.montant) || 0
    if (l.code === '6631') {
      const plafond = remuneration * 0.30
      const exo = Math.min(montant, plafond)
      exempte += exo
      imposable += montant - exo
    } else if (l.code === '6634') {
      exempte += montant
    } else {
      imposable += montant
    }
  }
  return { exempte, imposable }
}

// ─── Arrondi de l'impôt à la centaine de FC la plus proche (Art. 150) ────────
// S'applique à l'IS comme à l'IRPP (le texte vise l'impôt en général, pas une
// catégorie particulière) : arrondi à l'unité, puis tranche ≥50FC → centaine
// supérieure, <50FC → centaine inférieure.
export function arrondiCentaineFC(val: number): number {
  const u = Math.round(val)
  const reste = u % 100
  if (reste >= 50) return u + (100 - reste)
  return u - reste
}
