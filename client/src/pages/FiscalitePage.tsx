import React, { useState } from 'react'
import {
  Calculator, Info, RotateCcw, FileText, Receipt,
  Building2, Users, AlertCircle, CheckCircle2, Percent,
  Briefcase, Wheat, TrendingUp, Coins, BarChart2, X, Plus,
  ChevronDown, ChevronUp, ChevronRight, FolderOpen, Scale, Search
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BackButton from '@/components/BackButton'
import { useHashLocation } from 'wouter/use-hash-location'
import { useNav } from '@/lib/navContext'
import { InfoTooltip } from '@/components/InfoTooltip'
import SimulateurTVA from '@/components/SimulateurTVA'
import SimulateurAutresImpots from '@/components/SimulateurAutresImpots'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatFC(n: number): string {
  if (n < 0) return `(${Math.abs(Math.round(n)).toLocaleString('fr-FR')} FC)`
  return `${Math.round(n).toLocaleString('fr-FR')} FC`
}

// ─────────────────────────────────────────────────────────────────────────────
// BARÈME IRPP mensuel (annuel ÷ 12) : Art. 118 Loi 23/053
// ─────────────────────────────────────────────────────────────────────────────
const BAREME_MENSUEL = [
  { min: 0,         max: 162_000,     taux: 0.03, label: '0 – 162 000 FC (3%)' },
  { min: 162_000,   max: 1_800_000,   taux: 0.15, label: '162 000 – 1 800 000 FC (15%)' },
  { min: 1_800_000, max: 3_600_000,   taux: 0.30, label: '1 800 000 – 3 600 000 FC (30%)' },
  { min: 3_600_000, max: Infinity,    taux: 0.40, label: '> 3 600 000 FC (40%)' },
]

// baseReelle = revenu net imposable - min de la tranche (portion réelle du salarié dans la tranche)
interface LigneBareme {
  tranche: string   // ex: "0 – 162 000 FC (3%)"
  taux: string      // ex: "3%"
  baseReelle: number // revenu_net_imposable - min_tranche (ou max_tranche - min_tranche si tranche pleine)
  impot: number     // baseReelle × taux
}

// N'applique QUE le barème progressif — ni la réduction pour charges de famille (Art. 123-125),
// ni le plafond (Art. 118 in fine). L'ordre de liquidation retenu par le texte et la pratique est :
// barème → réduction pour charges → plafond 30% → arrondi. Appliquer le plafond ici, avant la
// réduction, sous-évaluerait la réduction (assise sur un IRPP déjà plafonné) et surévaluerait
// l'impôt net final. Le plafond doit être comparé et appliqué par l'appelant, APRÈS réduction.
function calculerBareme(revenuNetImposable: number): {
  lignes: LigneBareme[]
  iprBrut: number
  iprMax: number   // plafond Art. 118 = 30% du revenu net imposable — à appliquer après réduction
} {
  const lignes: LigneBareme[] = []
  let iprBrut = 0

  for (const t of BAREME_MENSUEL) {
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
// de 30% (Art. 118 in fine) sur un IRPP brut déjà calculé par calculerBareme().
function appliquerReductionEtPlafond(iprBrut: number, iprMax: number, reduction: number): {
  iprApresReduction: number
  plafonne: boolean
  iprFinal: number
} {
  const iprApresReduction = Math.max(0, iprBrut - reduction)
  const plafonne = iprApresReduction > iprMax
  const iprFinal = plafonne ? iprMax : iprApresReduction
  return { iprApresReduction, plafonne, iprFinal }
}

// ─────────────────────────────────────────────────────────────────────────────
// CATALOGUE COMPTES OHADA
// ─────────────────────────────────────────────────────────────────────────────
const ELEMENTS_661 = [
  { code: '6611', label: 'Appointements, salaires et commissions' },
  { code: '6612', label: 'Primes et gratifications' },
  { code: '6613', label: 'Congés payés' },
  { code: '6614', label: 'Indemnités de préavis, de licenciement et de recherche d\'embauche' },
  { code: '6615', label: 'Indemnités de maladie versées aux travailleurs' },
  { code: '6616', label: 'Supplément familial' },
  { code: '6617', label: 'Avantages en nature' },
  { code: '6618', label: 'Autres rémunérations directes' },
]

const ELEMENTS_663 = [
  { code: '6631', label: 'Indemnités de logement' },
  { code: '6632', label: 'Indemnités de représentation' },
  { code: '6633', label: 'Indemnités d\'expatriation' },
  { code: '6634', label: 'Indemnités de transport' },
  { code: '6638', label: 'Autres indemnités et avantages divers' },
]

const ELEMENTS_662 = [
  { code: '6621', label: 'Appointements, salaires et commissions' },
  { code: '6622', label: 'Primes et gratifications' },
  { code: '6623', label: 'Congés payés' },
  { code: '6624', label: 'Indemnités de préavis, de licenciement et de recherche d\'embauche' },
  { code: '6625', label: 'Indemnités de maladie versées aux travailleurs' },
  { code: '6626', label: 'Supplément familial' },
  { code: '6627', label: 'Avantages en nature' },
  { code: '6628', label: 'Autres rémunérations directes' },
]

// ─────────────────────────────────────────────────────────────────────────────
// MODAL SÉLECTION ÉLÉMENTS
// ─────────────────────────────────────────────────────────────────────────────
interface ElementCatalogue { code: string; label: string }
interface LigneSaisie { code: string; label: string; montant: string }

// ModalElements supprimé — remplacé par CatalogueDropdown inline

// ─────────────────────────────────────────────────────────────────────────────
// SECTION SAISIE AVEC CATALOGUE DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────
function SectionSaisieModal({
  titre, couleur, rows, catalogue, onAdd, onAddFromCatalogue, onRemove, onUpdate, note, tooltip, catalogueOnly
}: {
  titre: string
  couleur: 'blue' | 'slate' | 'purple' | 'green' | 'orange'
  rows: LigneSaisie[]
  catalogue?: ElementCatalogue[]
  onAdd: () => void
  onAddFromCatalogue?: (e: ElementCatalogue) => void
  onRemove: (i: number) => void
  onUpdate: (i: number, f: 'label' | 'montant', v: string) => void
  note?: string
  tooltip?: { texte: string; loi?: string }
  catalogueOnly?: boolean
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [recherche, setRecherche] = useState('')
  const styles: Record<string, string> = {
    blue:   'border-blue-200 bg-blue-50 text-blue-700',
    slate:  'border-slate-200 bg-slate-50 text-slate-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
    green:  'border-green-200 bg-green-50 text-green-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
  }
  const filtres = (catalogue || []).filter(e =>
    e.label.toLowerCase().includes(recherche.toLowerCase()) || e.code.includes(recherche)
  )
  return (
    <div className={cn('rounded-xl border p-4 space-y-3', styles[couleur])}>
      <p className="text-xs font-semibold uppercase tracking-wide flex items-center">
        {titre}
        {tooltip && <InfoTooltip texte={tooltip.texte} loi={tooltip.loi} />}
      </p>
      {note && (
        <div className="flex items-start gap-2 text-xs opacity-75">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{note}</span>
        </div>
      )}
      {rows.map((r, i) => (
        <div key={i} className="flex gap-1.5 min-w-0 items-center">
          {catalogueOnly ? (
            <span className="min-w-0 flex-1 rounded-lg border border-border/40 bg-background/60 px-2 py-2 text-xs text-foreground truncate">{r.label}</span>
          ) : (
            <input placeholder="Libellé" value={r.label}
              onChange={e => onUpdate(i, 'label', e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          )}
          <input type="number" placeholder="Montant" value={r.montant}
            onChange={e => onUpdate(i, 'montant', e.target.value)}
            className="w-24 sm:w-32 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button onClick={() => onRemove(i)}
            className="shrink-0 text-red-400 hover:text-red-600 text-xs px-1.5 rounded-lg border border-border/40 bg-background transition-colors">✕</button>
        </div>
      ))}
      <div className="flex gap-3 pt-1">
        {catalogue && onAddFromCatalogue && (
          <button
            onClick={() => { setShowDropdown(v => !v); setRecherche('') }}
            className="flex items-center gap-1.5 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity border border-current/30 rounded-lg px-3 py-1.5">
            <BarChart2 className="h-3 w-3" />
            Catalogue
            {showDropdown
              ? <ChevronUp className="h-3 w-3" />
              : <ChevronDown className="h-3 w-3" />}
          </button>
        )}
        {!catalogueOnly && (
          <button onClick={onAdd}
            className="flex items-center gap-1 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity">
            <Plus className="h-3 w-3" /> Ajouter manuellement
          </button>
        )}
      </div>
      {/* Dropdown catalogue inline */}
      {showDropdown && catalogue && onAddFromCatalogue && (
        <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-border bg-muted/30">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Rechercher..."
                value={recherche}
                onChange={e => setRecherche(e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="max-h-52 overflow-y-auto divide-y divide-border/30">
            {filtres.map(e => (
              <button
                key={e.code}
                onClick={() => { onAddFromCatalogue(e); setShowDropdown(false); setRecherche('') }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary/8 text-left transition-colors group">
                <span className="text-xs font-mono text-primary/60 shrink-0 min-w-[50px]">{e.code}</span>
                <span className="text-xs text-foreground group-hover:text-primary transition-colors flex-1">{e.label}</span>
                <Plus className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 transition-colors" />
              </button>
            ))}
            {filtres.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-4">Aucun élément trouvé</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS RÉSULTAT
// ─────────────────────────────────────────────────────────────────────────────

function EtapeResultat({ numero, titre, children }: { numero: number; titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 border-b border-border/40">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{numero}</span>
        <p className="text-xs font-semibold text-foreground">{titre}</p>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">{children}</div>
    </div>
  )
}

function LigneR({ label, val, bold, neg, accent, note, indent, signe, tooltip }: {
  label: string; val: string; bold?: boolean; neg?: boolean; accent?: boolean; note?: string; indent?: boolean; signe?: '+' | '−' | '=' | '×'; tooltip?: { texte: string; loi?: string }
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-2', indent && 'ml-4')}>
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        {signe && (
          <span className={cn(
            'text-xs font-bold shrink-0 w-3 text-center',
            signe === '−' || neg ? 'text-red-500' :
            signe === '=' || accent ? 'text-primary' :
            'text-muted-foreground'
          )}>{signe}</span>
        )}
        <span className={cn('text-xs inline-flex items-center gap-0.5', bold ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
          {label}{note && <span className="ml-1 text-xs opacity-60">({note})</span>}
          {tooltip && <InfoTooltip texte={tooltip.texte} loi={tooltip.loi} />}
        </span>
      </div>
      <span className={cn('text-xs font-mono shrink-0', bold ? 'font-bold' : '',
        accent ? 'text-primary font-bold' : neg ? 'text-red-600' : 'text-foreground')}>
        {val}
      </span>
    </div>
  )
}

function Separateur() {
  return <div className="border-t border-border/40 my-1" />
}

function BoxFinal({ label, sublabel, val, credit, couleur }: { label: string; sublabel?: string; val: string; credit?: boolean; couleur?: string }) {
  const bg = credit
    ? 'bg-amber-50 border-amber-200'
    : couleur === 'red'
      ? 'bg-red-50 border-red-200'
      : 'bg-primary/8 border-primary/25'
  const textColor = credit
    ? 'text-amber-600'
    : couleur === 'red'
      ? 'text-red-600'
      : 'text-primary'
  return (
    <div className={cn('rounded-xl p-3.5 text-center border shadow-sm transition-all hover:shadow-md', bg)}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
      {sublabel && (
        <p className="text-[10px] text-muted-foreground/70 italic mb-1">{sublabel}</p>
      )}
      <p className={cn('text-lg font-bold leading-tight', textColor)}>{val}</p>
    </div>
  )
}

function BtnCalculer({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
      <Calculator className="h-4 w-4" /> Calculer
    </button>
  )
}
function BtnReset({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5">
      <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
    </button>
  )
}

function ResultatWrap({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white overflow-hidden animate-slideUp shadow-sm" style={{animationDuration:"0.4s",animationTimingFunction:"cubic-bezier(0.22,1,0.36,1)"}}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-green-500/10 border-b border-green-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shrink-0">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
        <p className="font-bold text-sm text-green-800">{titre}</p>
      </div>
      <div className="p-4 space-y-4">
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CAT. 1 : Revenus salariaux (IPR) : NATIONAL + EXPATRIÉ
// ─────────────────────────────────────────────────────────────────────────────
function Cat1Salaires() {
  type Mode = 'national' | 'expatrie'
  const [mode, setMode] = useState<Mode>('national')

  // Nationaux
  const [e661, setE661] = useState<LigneSaisie[]>([{ code: '6611', label: 'Appointements et salaires', montant: '' }])
  const [e663, setE663] = useState<LigneSaisie[]>([{ code: '6631', label: 'Indemnité de transport (légale)', montant: '' }])
  const [nbCharge, setNbCharge] = useState(0)
  const [effectif, setEffectif] = useState('')
  const [syndicat, setSyndicat] = useState('')       // optionnel
  const [avances, setAvances] = useState('')         // optionnel

  // Expatriés
  const [e662, setE662] = useState<LigneSaisie[]>([{ code: '6621', label: 'Salaires et appointements (expatriés)', montant: '' }])
  const [e663Exp, setE663Exp] = useState<LigneSaisie[]>([{ code: '6631', label: 'Indemnité de transport (légale)', montant: '' }])
  const [nbChargeExp, setNbChargeExp] = useState(0)
  const [effectifExp, setEffectifExp] = useState('')
  const [secteurMinier, setSecteurMinier] = useState(false)
  const [syndicatExp, setSyndicatExp] = useState('') // optionnel
  const [avancesExp, setAvancesExp] = useState('')   // optionnel

  const [res, setRes] = useState<any>(null)

  function addRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>) {
    set(p => [...p, { code: '', label: '', montant: '' }])
  }
  function removeRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, i: number) {
    set(p => p.filter((_, idx) => idx !== i))
  }
  function updateRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, i: number, f: 'label' | 'montant', v: string) {
    set(p => p.map((r, idx) => idx === i ? { ...r, [f]: v } : r))
  }
  function addFromCatalogue(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, e: ElementCatalogue) {
    set(p => [...p, { code: e.code, label: e.label, montant: '' }])
  }

  function calculer() {
    if (mode === 'national') {
      const brut661 = e661.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      const brut663 = e663.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      const qpo = brut661 * 0.05      // Quote-part ouvrière CNSS 5%
      const baseImposable = brut661 - qpo  // Revenu net imposable

      const { lignes, iprBrut, iprMax } = calculerBareme(baseImposable)
      const charge = Math.min(Math.max(0, nbCharge), 9)
      // Art. 125 : réduction charges de famille INAPPLICABLE si revenu imposable > 3 600 000 FC/mois (3ème tranche)
      const reductionInapplicable = baseImposable > 3_600_000
      // Réduction assise sur l'IRPP brut (barème), AVANT tout plafonnement (ordre de liquidation :
      // barème → réduction → plafond, Art. 118 + 123-125)
      const reduction = reductionInapplicable ? 0 : iprBrut * (charge * 0.02)
      const { iprApresReduction, plafonne, iprFinal } = appliquerReductionEtPlafond(iprBrut, iprMax, reduction)
      // IPR net : appliquer plancher 2 000 FC (si revenu imposable > 0)
      const iprAvantPlancher = iprFinal
      const iprNet = baseImposable > 0 ? Math.max(2000, iprAvantPlancher) : 0
      const iprPlancher = iprNet > iprAvantPlancher // true si plancher appliqué

      const syndicatVal = parseFloat(syndicat) || 0
      const avancesVal  = parseFloat(avances)  || 0

      const nbEff = parseInt(effectif) || 0
      const inppTaux = nbEff > 300 ? 0.01 : nbEff >= 51 ? 0.02 : 0.03
      const cnssPatron = brut661 * 0.13
      const inpp = brut661 * inppTaux
      const onem = brut661 * 0.005

      const totalRetenues = qpo + iprNet + syndicatVal + avancesVal
      const netAPayer = brut661 + brut663 - totalRetenues

      setRes({
        mode: 'national',
        brut661, brut663, brutTotal: brut661 + brut663,
        qpo, baseImposable, lignes, iprBrut, iprMax, plafonne,
        reduction, charge, reductionInapplicable, iprNet, iprPlancher,
        syndicatVal, avancesVal,
        cnssPatron, inpp, inppTaux, onem,
        totalRetenues,
        totalChargePatronale: cnssPatron + inpp + onem,
        netAPayer,
        chargePatronale: netAPayer + cnssPatron + inpp + onem,
      })
    } else {
      // EXPATRIÉS : Art. 118 : même barème progressif que nationaux
      const brut662 = e662.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      const brut663e = e663Exp.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)

      // IRPP expatrié sur même barème (Art. 118 + Art. 119 Loi 23/053)
      // Art. 71 : QPO s'applique aussi aux expatriés (sauf convention bilatérale)
      const qpoE = brut662 * 0.05
      const baseImposableE = brut662 - qpoE
      const { lignes, iprBrut, iprMax: iprMaxE } = calculerBareme(baseImposableE)
      const chargeE = Math.min(Math.max(0, nbChargeExp), 9)
      // Art. 125 : réduction charges de famille INAPPLICABLE si revenu imposable > 3 600 000 FC/mois
      const reductionInapplicableE = baseImposableE > 3_600_000
      // Réduction assise sur l'IRPP brut (barème), AVANT tout plafonnement
      const reductionE = reductionInapplicableE ? 0 : iprBrut * (chargeE * 0.02)
      const { plafonne, iprFinal: iprFinalE } = appliquerReductionEtPlafond(iprBrut, iprMaxE, reductionE)
      // IPR net expatrié : même plancher 2 000 FC
      const iprAvantPlancherE = iprFinalE
      const iprNetExp = baseImposableE > 0 ? Math.max(2000, iprAvantPlancherE) : 0
      const iprPlancherE = iprNetExp > iprAvantPlancherE

      const syndicatValE = parseFloat(syndicatExp) || 0
      const avancesValE  = parseFloat(avancesExp)  || 0

      // IERE : Art. 148 Loi n°23/053 du 30/11/2023 : taux unique 25% du brut 662
      // (l'Ord.-Loi n°69/007 du 10/02/1969 et son taux réduit minier sont abrogés : Art. 152 Loi 23/053)
      const tauxIere = 0.25
      const iere = brut662 * tauxIere

      // Charges patronales habituelles sur expatriés
      const nbEffE = parseInt(effectifExp) || 0
      const inppTauxE = nbEffE > 300 ? 0.01 : nbEffE >= 51 ? 0.02 : 0.03
      const cnssPatronE = brut662 * 0.13
      const inppE = brut662 * inppTauxE
      const onemE = brut662 * 0.005

      const totalRetenuesE = qpoE + iprNetExp + syndicatValE + avancesValE
      const netAPayerE = brut662 + brut663e - totalRetenuesE

      setRes({
        mode: 'expatrie',
        brut662, brut663e, brutTotal: brut662 + brut663e,
        qpoE, baseImposableE, lignes, iprBrut, iprMax: iprMaxE, plafonne,
        chargeE, reductionE, reductionInapplicableE, iprNetExp, iprPlancherE,
        syndicatValE, avancesValE,
        tauxIere, iere, secteurMinier,
        cnssPatronE, inppE, inppTauxE, onemE,
        totalRetenuesE,
        totalChargePatronale: iere + cnssPatronE + inppE + onemE,
        netAPayer: netAPayerE,
        chargePatronale: netAPayerE + iere + cnssPatronE + inppE + onemE,
      })
    }
  }

  function reset() {
    setRes(null)
    setE661([{ code: '6611', label: 'Appointements et salaires', montant: '' }])
    setE662([{ code: '6621', label: 'Salaires et appointements (expatriés)', montant: '' }])
    setE663([{ code: '6631', label: 'Indemnité de transport (légale)', montant: '' }])
    setE663Exp([{ code: '6631', label: 'Indemnité de transport (légale)', montant: '' }])
    setNbCharge(0); setEffectif(''); setNbChargeExp(0); setEffectifExp(''); setSecteurMinier(false)
  }

  return (
    <div className="space-y-4">
      {/* Bandeau légal Cat. 1 */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 space-y-2">
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Revenus salariaux et assimilés</strong> : tout revenu perçu en contrepartie d'un travail subordonné.
          Imposition mensuelle via retenue à la source par l'employeur (Art. 119, Loi 23/053).
        </p>
        <div className="rounded-lg border border-blue-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-blue-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 1 : Salariés et assimilés <span className="font-normal opacity-70">(Art. 58, Loi n°23/053)</span></p>
              <p className="text-xs text-green-700 leading-relaxed">
                Toute personne liée par un <strong>contrat de travail</strong> ou lien de subordination. Exemples : employé de bureau, ouvrier, directeur salarié, agent de l'État, personnel expatrié.
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Hors Cat. 1 : Travailleurs indépendants</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Un indépendant sans lien de subordination relève de la <strong>Cat. 2 (BIC)</strong> s'il exerce une activité commerciale, ou d'une autre catégorie selon la nature de son revenu.
              </p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-1.5 italic">L'IRPP est retenu chaque mois directement par l'employeur et versé au Trésor public (Art. 119, Loi 23/053).</p>
        </div>
      </div>

      {/* Choix national / expatrié */}
      <div className="flex gap-2">
        {(['national', 'expatrie'] as Mode[]).map(m => (
          <button key={m} onClick={() => { setMode(m); setRes(null) }}
            className={cn('flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 ease-out',
              mode === m ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30')}>
            {m === 'national' ? '🇨🇩 Nationaux' : '🌍 Expatriés'}
          </button>
        ))}
      </div>

      {mode === 'national' ? (
        <>
          <SectionSaisieModal
            titre="Revenus imposables (661)"
            couleur="blue"
            rows={e661}
            catalogue={ELEMENTS_661}
            onAdd={() => addRow(setE661)}
            onAddFromCatalogue={e => addFromCatalogue(setE661, e)}
            onRemove={i => removeRow(setE661, i)}
            onUpdate={(i, f, v) => updateRow(setE661, i, f, v)}
            note=""
            tooltip={{
              texte: "Compte 661 : toutes les rémunérations directes versées au personnel national (salaires, primes, congés payés, avantages en nature, etc.). Ces montants forment la base de calcul de l'IRPP et de la QPO.=",
              loi: "Compte 661 SYSCOHADA="
            }}
          />

          <SectionSaisieModal
            titre="Non imposables : Indemnités légales (663)"
            couleur="slate"
            rows={e663}
            catalogue={ELEMENTS_663}
            onAdd={() => addRow(setE663)}
            onAddFromCatalogue={e => addFromCatalogue(setE663, e)}
            onRemove={i => removeRow(setE663, i)}
            onUpdate={(i, f, v) => updateRow(setE663, i, f, v)}
            note=""
            tooltip={{
              texte: "Compte 663 : indemnités forfaitaires légales (logement, transport, représentation, expatriation...). Ces éléments ne sont PAS soumis à l'IRPP. Ils sont ajoutés directement au net à payer.=",
              loi: "Compte 663 SYSCOHADA : non imposable="
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Personnes à charge (max 9)
                <InfoTooltip
                  texte="Art. 123 Loi 23/053 : chaque personne à charge donne droit à une réduction de 2% sur l'IRPP brut calculé. | Art. 124 : personnes admises : (1) conjoint légal non séparé ; (2) enfants célibataires reconnus, adoptés ou sous tutelle, de moins de 18 ans ou infirmes ; (3) ascendants des deux conjoints vivant au foyer. Condition : revenu propre de la personne à charge inférieur ou égal à 162 000 FC/mois. | Art. 125 : plafond de 9 personnes maximum. ⚠ Réduction totalement inapplicable si le revenu net imposable mensuel dépasse 3 600 000 FC/mois (4e tranche du barème progressif, Art. 118)."
                  loi="Art. 123 à 125 : Loi 23/053"
                />
              </label>
              <input type="number" min={0} max={9} value={nbCharge}
                onChange={e => setNbCharge(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">Réduction 2% × nb personnes sur IRPP brut (Art. 123-125)</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Effectif total entreprise
                <InfoTooltip
                  texte="L'effectif total de l'entreprise détermine le taux INPP applicable : ≤ 50 agents → 3% | 51 à 300 → 2% | + de 300 → 1%. C'est une charge patronale reversée à l'Institut National de Préparation Professionnelle.="
                  loi="INPP : charge patronale="
                />
              </label>
              <input type="number" min={1} placeholder="Ex : 45" value={effectif}
                onChange={e => setEffectif(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">
                {(() => {
                  const n = parseInt(effectif) || 0
                  if (!n) return 'Détermine le taux INPP'
                  return n > 300 ? 'INPP : 1% (> 300 agents)' : n >= 51 ? 'INPP : 2% (51–300 agents)' : 'INPP : 3% (≤ 50 agents)'
                })()}
              </p>
            </div>
          </div>

          {/* Retenues optionnelles */}
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Retenues occasionnelles (optionnel)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Cotisation syndicale (FC)
                  <InfoTooltip
                    texte="Les travailleurs peuvent librement adhérer au syndicat de leur choix. L'employeur est tenu d'opérer la retenue à la source sur instruction de la délégation syndicale. C'est une retenue salariale facultative.="
                    loi="Code du Travail RDC="
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={syndicat}
                  onChange={e => setSyndicat(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Retenue salariale facultative</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Avances / Prêts sur salaire (FC)
                  <InfoTooltip
                    texte="Montants accordés au personnel en cours de mois et récupérés sur le salaire à la fin du mois. Inclut aussi les saisies-arrêts (2/3 max du salaire) et oppositions alimentaires.="
                    loi="Personnel, oppositions, saisies-arrêts"
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={avances}
                  onChange={e => setAvances(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Avances, prêts, saisies-arrêts</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-start gap-2 text-xs text-amber-700">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Deux calculs distincts (Art. 118 + Art. 145-148 Loi n°23/053) :</strong><br/>
                (1) L'expatrié paie son IRPP selon le même barème progressif que les nationaux.<br/>
                (2) L'entreprise paie en plus l'IERE (Impôt Exceptionnel) : 25% du brut à sa propre charge.
              </span>
            </div>
          </div>

          <SectionSaisieModal
            titre="Revenus imposables (662)"
            couleur="purple"
            rows={e662}
            catalogue={ELEMENTS_662}
            onAdd={() => addRow(setE662)}
            onAddFromCatalogue={e => addFromCatalogue(setE662, e)}
            onRemove={i => removeRow(setE662, i)}
            onUpdate={(i, f, v) => updateRow(setE662, i, f, v)}
            note=""
            tooltip={{
              texte: "Compte 662 : rémunérations du personnel non national (expatriés). Même structure que le 661. Ces montants servent de base à l'IRPP (barème progressif) et à l'IERE (charge patronale)",
              loi: "Compte 662 SYSCOHADA="
            }}
          />

          <SectionSaisieModal
            titre="Non imposables : Indemnités légales (663)"
            couleur="slate"
            rows={e663Exp}
            catalogue={ELEMENTS_663}
            onAdd={() => addRow(setE663Exp)}
            onAddFromCatalogue={e => addFromCatalogue(setE663Exp, e)}
            onRemove={i => removeRow(setE663Exp, i)}
            onUpdate={(i, f, v) => updateRow(setE663Exp, i, f, v)}
            note="Ces éléments ne sont pas soumis à l'IRPP ni à l'IERE."
            tooltip={{
              texte: "Compte 663 : indemnités forfaitaires légales. Ces éléments ne sont soumis ni à l'IRPP ni à l'IERE. Ils viennent s'ajouter au net à payer à l'expatrié.",
              loi: "Compte 663 SYSCOHADA : non imposable="
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Personnes à charge (max 9)
                <InfoTooltip
                  texte="Art. 123 Loi 23/053 : même règle que les nationaux : réduction de 2% par personne à charge sur l'IRPP brut. | Art. 124 : personnes admises : (1) conjoint légal non séparé ; (2) enfants célibataires reconnus, adoptés ou sous tutelle, de moins de 18 ans ou infirmes ; (3) ascendants des deux conjoints vivant au foyer. Condition : revenu propre inférieur ou égal à 162 000 FC/mois. | Art. 125 : maximum 9 personnes. ⚠ Inapplicable si revenu net imposable dépasse 3 600 000 FC/mois (4e tranche du barème). Applicable aux expatriés soumis à l'IRPP en RDC (Art. 84 Loi 23/053), quelle que soit leur nationalité."
                  loi="Art. 123 à 125 : Loi 23/053"
                />
              </label>
              <input type="number" min={0} max={9} value={nbChargeExp}
                onChange={e => setNbChargeExp(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">Réduction 2% × nb personnes sur IRPP brut (Art. 123-125)</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Effectif total entreprise
                <InfoTooltip
                  texte="L'effectif total détermine le taux INPP : ≤ 50 → 3% | 51–300 → 2% | + de 300 → 1%. Charge patronale reversée à l'Institut National de Préparation Professionnelle.="
                  loi="INPP : charge patronale="
                />
              </label>
              <input type="number" min={1} placeholder="Ex : 45" value={effectifExp}
                onChange={e => setEffectifExp(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">
                {(() => {
                  const n = parseInt(effectifExp) || 0
                  if (!n) return 'Détermine le taux INPP'
                  return n > 300 ? 'INPP : 1%' : n >= 51 ? 'INPP : 2%' : 'INPP : 3%'
                })()}
              </p>
            </div>
          </div>

          {/* Retenues optionnelles expatrié */}
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Retenues occasionnelles (optionnel)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Cotisation syndicale (FC)
                  <InfoTooltip
                    texte="Les travailleurs expatriés peuvent adhérer au syndicat de leur choix. L'employeur opère la retenue à la source selon les instructions de la délégation syndicale.="
                    loi="Code du Travail RDC="
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={syndicatExp}
                  onChange={e => setSyndicatExp(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Retenue salariale facultative</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Avances / Prêts sur salaire (FC)
                  <InfoTooltip
                    texte="Montants accordés à l'expatrié en cours de mois et récupérés sur sa rémunération à la fin du mois. Inclut saisies-arrêts (2/3 max) et prêts personnels.="
                    loi="Personnel, oppositions, saisies-arrêts"
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={avancesExp}
                  onChange={e => setAvancesExp(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Avances, prêts, saisies-arrêts</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-700"><span className="font-semibold">IERE : taux unique 25%</span> — Art. 148 Loi n°23/053.</p>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {res && (
        <ResultatWrap titre={res.mode === 'national' ? 'IRPP Cat. 1 : Résultat National' : 'IRPP Cat. 1 : Résultat Expatrié'}>
          {res.mode === 'national' ? (
            <>
              <EtapeResultat numero={1} titre="Revenu brut=">
                <LigneR signe="+" label="Revenus imposables (661)" val={formatFC(res.brut661)} />
                <LigneR signe="+" label="Non imposables (663)" val={formatFC(res.brut663)} />
                <Separateur />
                <LigneR signe="=" label="Total brut=" val={formatFC(res.brutTotal)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={2} titre="Base imposable nette=">
                <LigneR signe="+" label="Revenus imposables bruts=" val={formatFC(res.brut661)} />
                <LigneR signe="−" label="QPO : Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpo)} neg note="Art. 71"
                  tooltip={{ texte: "La QPO (Quote-Part Ouvrière) est la cotisation obligatoire retenue sur le salaire du travailleur au titre de la sécurité sociale (CNSS). Elle représente 5% du salaire brut imposable (661) et est déduite avant le calcul de l'IRPP.", loi: "Art. 71 : Loi IRPP 23/053" }}
                />
                <Separateur />
                <LigneR signe="=" label="Revenu net imposable=" val={formatFC(res.baseImposable)} bold accent />

              </EtapeResultat>

              <EtapeResultat numero={3} titre="Calcul IRPP (barème progressif mensuel, Art. 118)">
                <p className="text-xs text-muted-foreground mb-1">Barème annuel ÷ 12  •  Loi IRPP 23/053 du 30/11/2023</p>
                {res.lignes.map((l: LigneBareme, i: number) => (
                  <LigneR key={i} signe="+"
                    label={`${l.tranche} → base réelle : ${formatFC(l.baseReelle)} × ${l.taux}`}
                    val={formatFC(l.impot)} indent />
                ))}
                <Separateur />
                <LigneR label="IRPP brut=" val={formatFC(res.iprBrut)} />
                {res.charge > 0 && (
                  res.reductionInapplicable ? (
                    <div className="flex items-start gap-2 mt-1 rounded-lg px-3 py-1.5 text-xs bg-orange-50 border border-orange-200 text-orange-700">
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span><strong>Art. 125 :</strong> Réduction charges de famille non applicable : revenu imposable supérieur à 3 600 000 FC/mois (4ème tranche du barème)</span>
                    </div>
                  ) : (
                    <LigneR signe="−"
                      label={`Réduction charges de famille (${res.charge} pers. × 2%)`}
                      val={formatFC(res.reduction)} neg
                      tooltip={{ texte: "Chaque personne à charge donne droit à une réduction de 2% sur l'IRPP brut. Sont admis : conjoint légal, enfants célibataires reconnus/adoptés/sous tutelle, ascendants des deux conjoints vivant au foyer. Condition : revenu propre ≤ 162 000 FC/mois. Maximum 9 personnes. Inapplicable si revenu imposable > 3 600 000 FC/mois.", loi: "Art. 123-125 : Loi IRPP 23/053" }}
                    />
                  )
                )}
                <LigneR signe="=" label="IRPP net dû" val={formatFC(res.iprNet)} bold accent />
                {/* Formule textuelle IRPP */}
                <div className="mt-2 rounded-lg border border-green-300 bg-green-50 px-3 py-2">
                  <p className="text-xs font-bold text-green-800 text-center">
                    IRPP = min(IRPP max, IRPP net)
                  </p>
                  <p className="text-xs text-green-700 text-center mt-0.5">
                    IRPP max = 30% du revenu imposable (Art. 118) : IRPP net = calcul barème progressif
                  </p>
                </div>
                {/* Plafond Art. 118 : toujours visible */}
                <div className={`flex items-start gap-2 mt-2 rounded-lg px-3 py-2 text-xs ${
                  res.plafonne
                    ? 'bg-amber-50 border border-amber-300 text-amber-700'
                    : 'bg-green-50 border border-green-300 text-green-700'
                }`}>
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    IRPP max (Art. 118) : <strong>{formatFC(res.iprMax)}</strong> (30% × {formatFC(res.baseImposable)})
                    {res.plafonne
                      ? <> : <strong>Plafonné</strong> : IRPP retenu = {formatFC(res.iprNet)}</>
                      : <> : <strong>Conforme</strong> : IRPP ({formatFC(res.iprNet)}) ≤ IRPP max</>}
                  </span>
                </div>
              </EtapeResultat>

              <EtapeResultat numero={4} titre="Récapitulatif des retenues salariales=">
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpo)} neg />
                <LigneR signe="−"
                  label={`IRPP net${res.iprPlancher ? ' – plancher 2 000 FC appliqué' : ''}`}
                  val={formatFC(res.iprNet)} neg />
                {res.syndicatVal > 0 && (
                  <LigneR signe="−" label="Cotisation syndicale=" val={formatFC(res.syndicatVal)} neg />
                )}
                {res.avancesVal > 0 && (
                  <LigneR signe="−" label="Avances / Prêts" val={formatFC(res.avancesVal)} neg />
                )}
                <Separateur />
                <LigneR signe="=" label="Total retenues=" val={formatFC(res.totalRetenues)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={5} titre="Charges sociales patronales (employeur)">
                <LigneR signe="+" label={`CNSS patronal (13%)`} val={formatFC(res.cnssPatron)}
                  tooltip={{ texte: "La CNSS (Caisse Nationale de Sécurité Sociale) est une charge patronale de 13% calculée sur la rémunération imposable brute (661). | Art. 112(b) Code du Travail RDC (Loi 015-2002) : les cotisations dues à la CNSS (désignée 'Institut National de Sécurité Sociale') constituent des retenues autorisées sur le salaire. | C'est l'employeur qui verse directement la QPP à la CNSS. Elle est distincte de la QPO salariale de 5%. | Écriture : Débit 6641 / Crédit 43182 (CNSS QPP *).", loi: "Art. 71 Loi 23/053 ; Art. 112(b) Loi n°015-2002 du 16/10/2002 (CT RDC)" }}
                />
                <LigneR signe="+" label={`INPP (${(res.inppTaux * 100).toFixed(0)}%)`} val={formatFC(res.inpp)}
                  tooltip={{ texte: "L'INPP (Institut National de Préparation Professionnelle) est une charge patronale dont le taux dépend de l'effectif : ≤ 50 agents → 3% | 51–300 → 2% | + de 300 → 1%. Elle finance la formation professionnelle.=", loi: "INPP : charge patronale=" }}
                />
                <LigneR signe="+" label="ONEM (0,5%)" val={formatFC(res.onem)}
                  tooltip={{ texte: "L'ONEM (Office National de l'Emploi) perçoit une cotisation patronale de 0,5% de la rémunération brute. | Taux 0,5% fixé par l'Arrêté Ministériel N°028/CAB/MIN.ET/FMM/RK/09/2025. | Elle finance les politiques de l'emploi et est à la charge exclusive de l'employeur. | Écriture : Débit 6641 / Crédit 4332 (ONEM dette patronale *).", loi: "AM N°028/CAB/MIN.ET/FMM/RK/09/2025" }}
                />
                <Separateur />
                <LigneR signe="=" label="Total charges patronales=" val={formatFC(res.totalChargePatronale)} bold accent />
              </EtapeResultat>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <BoxFinal
                  label="Net à payer au salarié"
                  sublabel={`Brut (661+663) − Total retenues`}
                  val={formatFC(res.netAPayer)} />
                <BoxFinal
                  label="Charge patronale="
                  sublabel="Net à payer + CNSS + INPP + ONEM="
                  val={formatFC(res.chargePatronale)}
                  credit />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <BoxFinal
                  label="Total retenues salarié"
                  sublabel={`QPO + IRPP${res.syndicatVal > 0 ? ' + Syndicat' : ''}${res.avancesVal > 0 ? ' + Avances' : ''}`}
                  val={formatFC(res.totalRetenues)} />
                <BoxFinal label="IRPP net à verser au Trésor" val={formatFC(res.iprNet)} />
              </div>
            </>
          ) : (
            <>
              <EtapeResultat numero={1} titre="Rémunération brute expatrié">
                <LigneR signe="+" label="Revenus imposables (662)" val={formatFC(res.brut662)} />
                <LigneR signe="+" label="Non imposables (663)" val={formatFC(res.brut663e)} />
                <Separateur />
                <LigneR signe="=" label="Total brut=" val={formatFC(res.brutTotal)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={2} titre="Base imposable nette=">
                <LigneR signe="+" label="Revenus imposables bruts (662)" val={formatFC(res.brut662)} />
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpoE)} neg note="Art. 71"
                  tooltip={{ texte: "La QPO s'applique également aux travailleurs expatriés, sauf convention bilatérale de sécurité sociale entre le pays d'origine et la RDC. Elle représente 5% du brut imposable (662).", loi: "Art. 71 : Loi IRPP 23/053" }}
                />
                <Separateur />
                <LigneR signe="=" label="Revenu net imposable=" val={formatFC(res.baseImposableE)} bold accent />

              </EtapeResultat>

              <EtapeResultat numero={3} titre="IRPP expatrié (barème progressif, Art. 118, Loi 23/053)">
                <p className="text-xs text-muted-foreground mb-1">Barème annuel ÷ 12  •  Loi IRPP 23/053 du 30/11/2023</p>
                {res.lignes.map((l: LigneBareme, i: number) => (
                  <LigneR key={i} signe="+"
                    label={`${l.tranche} → base réelle : ${formatFC(l.baseReelle)} × ${l.taux}`}
                    val={formatFC(l.impot)} indent />
                ))}
                <Separateur />
                <LigneR label="IRPP brut=" val={formatFC(res.iprBrut)} />
                {res.chargeE > 0 && (
                  res.reductionInapplicableE ? (
                    <div className="flex items-start gap-2 mt-1 rounded-lg px-3 py-1.5 text-xs bg-orange-50 border border-orange-200 text-orange-700">
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span><strong>Art. 125 :</strong> Réduction charges de famille non applicable : revenu imposable supérieur à 3 600 000 FC/mois (4ème tranche du barème)</span>
                    </div>
                  ) : (
                    <LigneR signe="−"
                      label={`Réduction charges de famille (${res.chargeE} pers. × 2%)`}
                      val={formatFC(res.reductionE)} neg
                      tooltip={{ texte: "Même règle que les nationaux. Chaque personne à charge donne droit à une réduction de 2% sur l'IRPP brut. Maximum 9 personnes. Inapplicable si revenu imposable > 3 600 000 FC/mois.", loi: "Art. 123-125 : Loi IRPP 23/053" }}
                    />
                  )
                )}
                <LigneR signe="=" label="IRPP net retenu sur salaire=" val={formatFC(res.iprNetExp)} bold accent />
                {/* Plafond Art. 118 : toujours visible */}
                <div className={`flex items-start gap-2 mt-2 rounded-lg px-3 py-2 text-xs ${
                  res.plafonne
                    ? 'bg-amber-50 border border-amber-300 text-amber-700'
                    : 'bg-green-50 border border-green-300 text-green-700'
                }`}>
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    IRPP max (Art. 118) : <strong>{formatFC(res.iprMax)}</strong> (30% × {formatFC(res.baseImposableE)})
                    {res.plafonne
                      ? <> : <strong>Plafonné</strong> : IRPP retenu = {formatFC(res.iprNetExp)}</>
                      : <> : <strong>Conforme</strong> : IRPP ({formatFC(res.iprNetExp)}) ≤ IRPP max</>}
                  </span>
                </div>
              </EtapeResultat>

              <EtapeResultat numero={4} titre="IERE : Charge patronale (Art. 148 Loi 23/053)">
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 space-y-1">
                  <p className="text-xs font-semibold text-red-700 uppercase">Prélèvement exceptionnel à charge de l'entreprise</p>
                  <LigneR signe="+" label="Base imposable (brut 662)" val={formatFC(res.brut662)} />
                  <LigneR signe="×" label={`Taux IERE (${(res.tauxIere * 100).toFixed(1)}%)`} val="" />
                  <Separateur />
                  <LigneR signe="=" label="IERE dû par l'employeur" val={formatFC(res.iere)} bold />
                </div>
              </EtapeResultat>

              <EtapeResultat numero={5} titre="Récapitulatif des retenues salariales=">
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpoE)} neg />
                <LigneR signe="−"
                  label={`IRPP net${res.iprPlancherE ? ' – plancher 2 000 FC appliqué' : ''}`}
                  val={formatFC(res.iprNetExp)} neg />
                {res.syndicatValE > 0 && (
                  <LigneR signe="−" label="Cotisation syndicale=" val={formatFC(res.syndicatValE)} neg />
                )}
                {res.avancesValE > 0 && (
                  <LigneR signe="−" label="Avances / Prêts" val={formatFC(res.avancesValE)} neg />
                )}
                <Separateur />
                <LigneR signe="=" label="Total retenues=" val={formatFC(res.totalRetenuesE)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={6} titre="Charges patronales (IERE + cotisations)">
                <LigneR signe="+" label={`IERE (${(res.tauxIere * 100).toFixed(1)}%)`} val={formatFC(res.iere)}
                  tooltip={{ texte: "L'IERE (Impôt Exceptionnel sur les Rémunérations des Expatriés) est une charge PATRONALE à la charge exclusive de l'employeur. Taux unique : 25% du brut 662 (Art. 148 Loi n°23/053). Ce n'est PAS une retenue sur salaire de l'expatrié.", loi: "Art. 145-148 Loi n°23/053 du 30/11/2023" }}
                />
                <LigneR signe="+" label="CNSS patronal (13%)" val={formatFC(res.cnssPatronE)}
                  tooltip={{ texte: "La CNSS est une charge patronale de 13% calculée sur la rémunération imposable brute de l'expatrié (662). | Art. 1er Code du Travail RDC : applicable à tous les travailleurs en RDC, quelle que soit leur nationalité. | Art. 112(b) CT : les cotisations dues à la CNSS constituent des retenues autorisées sur le salaire. | Versée directement à la Caisse Nationale de Sécurité Sociale par l'employeur. | Écriture : Débit 6642 / Crédit 43182 (CNSS QPP *).", loi: "Art. 71 Loi 23/053 ; Art. 1er et 112(b) Loi n°015-2002 du 16/10/2002 (CT RDC)" }}
                />
                <LigneR signe="+" label={`INPP (${(res.inppTauxE * 100).toFixed(0)}%)`} val={formatFC(res.inppE)}
                  tooltip={{ texte: "L'INPP est une charge patronale dont le taux dépend de l'effectif total de l'entreprise : ≤ 50 agents → 3% | 51–300 → 2% | + de 300 → 1%.", loi: "INPP : charge patronale=" }}
                />
                <LigneR signe="+" label="ONEM (0,5%)" val={formatFC(res.onemE)}
                  tooltip={{ texte: "L'ONEM (Office National de l'Emploi) perçoit une cotisation patronale de 0,5% de la rémunération brute de l'expatrié. | Taux 0,5% fixé par l'Arrêté Ministériel N°028/CAB/MIN.ET/FMM/RK/09/2025. | Charge patronale exclusive de l'employeur ; art. 1er CT RDC : applicable à tous les travailleurs en RDC, quelle que soit leur nationalité. | Écriture : Débit 6642 / Crédit 4332 (ONEM dette patronale *).", loi: "AM N°028/CAB/MIN.ET/FMM/RK/09/2025 ; Art. 1er CT RDC" }}
                />
                <Separateur />
                <LigneR signe="=" label="Total charges patronales=" val={formatFC(res.totalChargePatronale)} bold accent />
              </EtapeResultat>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <BoxFinal
                  label="Net à payer à l'expatrié"
                  sublabel={`Brut (662+663) − Total retenues`}
                  val={formatFC(res.netAPayer)} />
                <BoxFinal label="IERE à verser au Trésor" val={formatFC(res.iere)} couleur="red" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <BoxFinal
                  label="Total retenues salarié"
                  sublabel={`QPO + IRPP${res.syndicatValE > 0 ? ' + Syndicat' : ''}${res.avancesValE > 0 ? ' + Avances' : ''}`}
                  val={formatFC(res.totalRetenuesE)} />
                <BoxFinal
                  label="Charge patronale="
                  sublabel="Net à payer + IERE + CNSS + INPP + ONEM="
                  val={formatFC(res.chargePatronale)}
                  credit />
              </div>
            </>
          )}
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CAT. 2 : BIC : Bénéfices industriels, commerciaux, immobiliers et artisanaux
// Art. 89 (régime réel), Art. 127 (petite entreprise), Art. 128 (micro-entreprise), Art. 90 (déductions spécifiques)
// ─────────────────────────────────────────────────────────────────────────────
function Cat2BIC() {
  type Regime = 'micro' | 'petit' | 'reel'
  type Activite = 'vente' | 'service'
  const [regime, setRegime] = useState<Regime>('reel')
  const [activite, setActivite] = useState<Activite>('vente')
  const [ca, setCa] = useState('')
  const [produits, setProduits] = useState<{label: string, montant: string, fromCat: boolean}[]>([])
  const [charges, setCharges] = useState<{label: string, montant: string, fromCat: boolean}[]>([])
  // Déductions spécifiques Art. 90
  const [cotisationsSociales, setCotisationsSociales] = useState('')
  const [fraisMedicaux, setFraisMedicaux] = useState('')
  const [nbPersonnesCharge, setNbPersonnesCharge] = useState('0')
  const [showDeductions, setShowDeductions] = useState(false)
  const [tauxUsd, setTauxUsd] = useState('2800')
  const [res, setRes] = useState<any>(null)

  function removeRow(set: any, i: number) { set((p: any[]) => p.filter((_: any, idx: number) => idx !== i)) }
  function updateRow(set: any, i: number, f: string, v: string) {
    set((p: any[]) => p.map((r: any, idx: number) => idx === i ? { ...r, [f]: v } : r))
  }

  function calculer() {
    const cotSoc = parseFloat(cotisationsSociales) || 0
    const fraisMed = parseFloat(fraisMedicaux) || 0

    if (regime === 'micro') {
      // Micro-entreprise : 30 USD × taux du jour (Art. 128 + Arrêté n°015 du 19/02/2025)
      const taux = parseFloat(tauxUsd) || 2800
      const impot = 30 * taux
      setRes({ regime, impot, tauxUsd: taux })

    } else if (regime === 'petit') {
      // Petite entreprise : CA × 1% (vente) ou 2% (services) (Art. 127, Loi 23/053)
      const caVal = parseFloat(ca) || 0
      const taux = activite === 'vente' ? 0.01 : 0.02
      const impot = caVal * taux
      setRes({ regime, ca: caVal, taux, impot, q1: impot * 0.6, q2: impot * 0.4 })

    } else {
      // Régime réel : produits − charges (Art. 89)
      const tp = produits.reduce((s: number, r: any) => s + (parseFloat(r.montant) || 0), 0)
      const tc = charges.reduce((s: number, r: any) => s + (parseFloat(r.montant) || 0), 0)
      const beneficeBrut = tp - tc
      const beneficeAvantDed = Math.max(0, beneficeBrut)
      // Déductions spécifiques Art. 90 : cotisations max 20% du bénéfice, frais médicaux justifiés
      const plafondCotSoc = beneficeAvantDed * 0.20
      const cotSocAdmise = Math.min(cotSoc, plafondCotSoc)
      const beneficeNet = Math.max(0, beneficeAvantDed - cotSocAdmise - fraisMed)
      // Barème progressif annuel IRPP (Art. 118 : tranches annuelles = mensuelles × 12)
      // Arrondi au millier inférieur (Art. 118)
      const beneficeNetArrondi = Math.floor(beneficeNet / 1000) * 1000
      const t1max = 162000 * 12  // 1 944 000
      const t2max = 1800000 * 12 // 21 600 000
      const t3max = 3600000 * 12 // 43 200 000
      let impotBareme = 0
      if (beneficeNetArrondi <= t1max) {
        impotBareme = beneficeNetArrondi * 0.03
      } else if (beneficeNetArrondi <= t2max) {
        impotBareme = t1max * 0.03 + (beneficeNetArrondi - t1max) * 0.15
      } else if (beneficeNetArrondi <= t3max) {
        impotBareme = t1max * 0.03 + (t2max - t1max) * 0.15 + (beneficeNetArrondi - t2max) * 0.30
      } else {
        impotBareme = t1max * 0.03 + (t2max - t1max) * 0.15 + (t3max - t2max) * 0.30 + (beneficeNetArrondi - t3max) * 0.40
      }
      // Réduction personnes à charge Art. 123 : 2% par personne, max 9, inapplicable si revenu > t3max
      // Assise sur l'IRPP brut (barème), AVANT tout plafonnement (ordre de liquidation :
      // barème → réduction → plafond, Art. 118 + 123-125)
      const nbPC = Math.min(Math.max(0, parseInt(nbPersonnesCharge) || 0), 9)
      const reductionPC = beneficeNetArrondi <= t3max ? impotBareme * 0.02 * nbPC : 0
      const impotApresReduction = Math.max(0, impotBareme - reductionPC)
      // Plafond 30% (Art. 118), appliqué APRÈS la réduction pour charges de famille
      const plafond30 = beneficeNetArrondi * 0.30
      const plafonne = impotApresReduction > plafond30
      let impotApresPC = plafonne ? plafond30 : impotApresReduction
      // Impôt minimum 1% du CA (Art. 122) : applicable régime réel seulement, hors micro
      const minimum122 = tp * 0.01
      const minimumApplique = impotApresPC < minimum122 && minimum122 > 0
      const impot = minimumApplique ? minimum122 : impotApresPC
      setRes({
        regime, produits: tp, charges: tc, beneficeBrut, beneficeAvantDed,
        cotSoc, cotSocAdmise, plafondCotSoc, fraisMed,
        beneficeNet, beneficeNetArrondi, impotBareme, plafond30, plafonne,
        nbPC, reductionPC, impotApresPC, minimum122, minimumApplique, impot,
        q1: impot * 0.6, q2: impot * 0.4
      })
    }
  }

  function reset() {
    setRes(null); setCa('')
    setProduits([])
    setCharges([])
    setCotisationsSociales(''); setFraisMedicaux(''); setNbPersonnesCharge('0')
    setTauxUsd('2800')
  }

  return (
    <div className="space-y-4">
      {/* Bandeau légal */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 space-y-2">
        <p className="text-xs text-indigo-700 leading-relaxed">
          <strong>Bénéfices industriels, commerciaux, immobiliers et artisanaux</strong> : activités exercées à titre individuel.
          Régime déterminé selon le chiffre d'affaires annuel (Art. 107-112, Loi 23/053).
        </p>
        <div className="rounded-lg border border-indigo-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-indigo-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 2 : Exploitant individuel</p>
              <p className="text-xs text-green-700 leading-relaxed">
                Commerçant, artisan, prestataire exerçant <strong>en nom propre</strong>. L'entreprise et son propriétaire sont la même personne fiscale. Exemples : Jean vend des marchandises à son propre compte, Marie est couturière indépendante.
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ IS : Personne morale (hors Cat. 2)</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Dès que Jean <strong>constitue une société</strong> (SARL, SA...), même seul, il sort de cette catégorie. L'entreprise devient une entité juridique distincte, soumise à l'Impôt sur les Sociétés (IS).
              </p>
            </div>
          </div>
          <p className="text-xs text-indigo-600 mt-1.5 italic">Une même activité ne peut être soumise à la fois à l'IRPP et à l'IS (Loi 23/053).</p>
        </div>
      </div>

      {/* Encadré : Comment savoir dans quel régime on est ? */}
      <details className="group">
        <summary className="cursor-pointer text-xs font-semibold text-primary hover:underline flex items-center gap-1 select-none list-none">
          <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span>
          Comment savoir dans quel régime je suis ?
        </summary>
        <div className="mt-2 rounded-xl border border-border bg-muted/30 p-3 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Le régime est déterminé automatiquement par le <strong>chiffre d'affaires annuel hors taxes (CA HT)</strong> réalisé au cours de l'exercice.
          </p>
          <div className="space-y-2">
            {/* Micro */}
            <div className="rounded-lg border border-border bg-background p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white bg-indigo-500 rounded-full px-2 py-0.5">MICRO</span>
                <span className="text-xs font-semibold text-foreground">CA ≤ 25 000 000 FC</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Impôt forfaitaire fixé par Arrêté Ministériel à l'équivalent de <strong>30 USD en FC</strong> (Arrêté n°015 du 19/02/2025), quel que soit le CA. Aucune comptabilité détaillée exigée.
                Exemples : petit commerçant du marché, couturier à domicile, vendeur ambulant avec patente.
              </p>
              <p className="text-xs text-primary mt-1">Art. 107, Loi 23/053</p>
            </div>
            {/* Petite */}
            <div className="rounded-lg border border-border bg-background p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white bg-blue-500 rounded-full px-2 py-0.5">PETITE</span>
                <span className="text-xs font-semibold text-foreground">CA entre 25 000 001 et 300 000 000 FC</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Impôt proportionnel : <strong>1% du CA</strong> pour les ventes de biens, <strong>2% du CA</strong> pour les prestations de services.
                En activité mixte, le taux de l'activité principale s'applique sur l'ensemble du CA.
                Option possible pour le régime réel sur notification écrite avant le 1er février (valable 3 ans, irrévocable).
              </p>
              <p className="text-xs text-primary mt-1">Art. 109-111, Loi 23/053</p>
            </div>
            {/* Réel */}
            <div className="rounded-lg border border-border bg-background p-2.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white bg-violet-600 rounded-full px-2 py-0.5">RÉEL</span>
                <span className="text-xs font-semibold text-foreground">CA &gt; 300 000 000 FC</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Impôt calculé sur le <strong>bénéfice réel</strong> (produits − charges déductibles), soumis au barème progressif IRPP.
                Comptabilité complète obligatoire conforme aux normes fiscales. Si le CA repasse sous 300 M FC pendant
                2 exercices consécutifs, passage au régime inférieur possible.
              </p>
              <p className="text-xs text-primary mt-1">Art. 112-113, Loi 23/053</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Note : si le CA dépasse le seuil supérieur d'un régime, le passage au régime supérieur est immédiat, sans période d'attente (Art. 113).
          </p>
        </div>
      </details>

      {/* Sélection du régime */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <p className="text-xs font-semibold text-foreground">Régime d'imposition</p>
          <InfoTooltip
            texte="Le régime dépend de la taille de l'entreprise. Micro-entreprise : forfait équivalent à 30 USD en FC (Art. 128). Petite entreprise : impôt proportionnel au CA, 1% ventes / 2% services (Art. 127). Régime réel : impôt sur le bénéfice réel, produits moins charges (Art. 89)."
            loi="Art. 89, 127 et 128, Loi 23/053"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {([
            {
              key: 'micro',
              label: 'Micro-entreprise',
              sub: 'CA ≤ 25 000 000 FC',
              tooltip: "Micro-entreprise (Art. 107) : CA annuel HT ≤ 25 000 000 FC. L'impôt est forfaitairement fixé à l'équivalent de 30 USD en FC par l'Arrêté Ministériel n°015 du 19/02/2025 (Art. 128). Aucune comptabilité détaillée exigée.",
              loi: 'Art. 107 (seuil) + Art. 128 (taux), Loi 23/053 : Arrêté n°015 du 19/02/2025'
            },
            {
              key: 'petit',
              label: 'Petite entreprise',
              sub: '25M : 300M FC',
              tooltip: "Petite entreprise (Art. 109-111) : CA annuel HT entre 25 000 001 FC et 300 000 000 FC. Impôt proportionnel : 1% du CA pour les ventes de biens, 2% pour les prestations de services (Art. 127, Loi 23/053). En cas d'activités mixtes (vente ET service), les chiffres d'affaires respectifs sont cumulés et imposés suivant le taux de l'activité principale (Art. 127 al. 2). Option possible pour le régime réel sur notification écrite avant le 1er février (valable 3 ans, irrévocable).",
              loi: 'Art. 109-111 (seuil) + Art. 127 (taux), Loi 23/053'
            },
            {
              key: 'reel',
              label: 'Régime réel',
              sub: 'CA > 300 000 000 FC',
              tooltip: "Régime réel : CA annuel HT supérieur à 300 000 000 FC. Impôt calculé sur le bénéfice réel (produits − charges déductibles), soumis au barème progressif IRPP. Comptabilité complète obligatoire. Passage immédiat si le CA dépasse 300M FC.=",
              loi: 'Art. 112-113, Loi 23/053'
            },
          ] as const).map(r => (
            <div key={r.key} className="relative">
              <button onClick={() => { setRegime(r.key); setRes(null) }}
                className={cn('w-full py-2.5 rounded-xl border text-xs font-semibold transition-all duration-300 ease-out pr-5',
                  regime === r.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30')}>
                <div>{r.label}</div>
                <div className="font-normal opacity-70 text-xs">{r.sub}</div>
              </button>
              <span className="absolute top-1 right-1">
                <InfoTooltip texte={r.tooltip} loi={r.loi} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Micro-entreprise ── */}
      {regime === 'micro' && (
        <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
          <div className="flex items-center gap-1">
            <p className="text-xs font-medium text-foreground">Micro-entreprise</p>
            <InfoTooltip
              texte="L'impôt est fixé par Arrêté Ministériel à l'équivalent de 30 USD en FC (Arrêté n°015 du 19/02/2025). Ce montant est indépendant du CA réalisé. Aucune comptabilité détaillée n'est exigée pour ce régime."
              loi="Art. 128, Loi 23/053 : Arrêté n°015 du 19/02/2025"
            />
          </div>
          <p className="text-xs text-muted-foreground">Impôt annuel fixe : <strong>équivalent de 30 USD en FC</strong> selon l'Arrêté n°015 du 19/02/2025, aucun calcul sur le CA requis.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">Taux BCC du jour (FC/USD) :</label>
            <input
              type="number" min={1} placeholder="Ex : 2800"
              value={tauxUsd}
              onChange={e => setTauxUsd(e.target.value)}
              className="w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span className="text-xs text-muted-foreground">= {(30 * (parseFloat(tauxUsd) || 2800)).toLocaleString('fr-FR')} FC</span>
            <a href="https://www.bcc.cd/taux-de-change" target="_blank" rel="noopener noreferrer"
              className="text-xs text-primary underline whitespace-nowrap">Taux officiel BCC ↗</a>
          </div>
        </div>
      )}

      {/* ── Petite entreprise ── */}
      {regime === 'petit' && (
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <p className="text-xs font-medium text-muted-foreground">Nature de l'activité</p>
              <InfoTooltip
                texte="Le taux proportionnel dépend de la nature de l'activité : 1% pour les activités de vente de biens, 2% pour les prestations de services. En cas d'activités mixtes, le taux de l'activité principale s'applique sur le cumul des CA.="
                loi="Art. 127, Loi 23/053"
              />
            </div>
            <div className="flex gap-2">
              {(['vente', 'service'] as const).map(a => (
                <button key={a} onClick={() => setActivite(a)}
                  className={cn('flex-1 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ease-out',
                    activite === a
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-border bg-card text-muted-foreground')}>
                  {a === 'vente' ? 'Vente de biens (1%)' : 'Prestations de services (2%)'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="text-xs font-medium text-muted-foreground">Chiffre d'affaires annuel (FC)</label>
              <InfoTooltip
                texte="Le chiffre d'affaires annuel hors taxes perçu au cours de l'exercice. C'est la base de calcul de l'impôt pour la petite entreprise.="
                loi="Art. 127, Loi 23/053"
              />
            </div>
            <input type="number" placeholder="Ex : 18 000 000" value={ca}
              onChange={e => setCa(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      )}

      {/* ── Régime réel ── */}
      {regime === 'reel' && (
        <div className="space-y-4">
          {/* Produits */}
          <div className="space-y-2">
            {/* Séparateur produits */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-px bg-indigo-200" />
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Produits imposables</span>
              <div className="flex-1 h-px bg-indigo-200" />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-foreground">Produits imposables</p>
              <InfoTooltip
                texte="Tous les revenus encaissés dans le cadre de l'activité professionnelle. Les revenus de capitaux mobiliers et les loyers de biens non inscrits à l'actif sont exclus.="
                loi="Art. 89, Loi 23/053"
              />
            </div>
            {produits.length === 0 && (
              <p className="text-xs text-muted-foreground italic">Aucun produit ajouté. Utilisez le catalogue ci-dessous.</p>
            )}
            {produits.map((r: any, i: number) => (
              <div key={i} className="flex gap-1.5 min-w-0">
                <input
                  value={r.label}
                  readOnly
                  className="min-w-0 flex-1 rounded-lg border border-border/60 bg-muted/40 px-2 py-2 text-xs text-foreground cursor-default select-none" />
                <input type="number" placeholder="Montant FC=" value={r.montant}
                  onChange={e => updateRow(setProduits, i, 'montant', e.target.value)}
                  className="w-28 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button onClick={() => removeRow(setProduits, i)}
                  className="shrink-0 text-red-400 text-xs px-1.5 rounded-lg border border-border/40 bg-background">✕</button>
              </div>
            ))}
            {/* Catalogue produits sélectionnable */}
            <details className="group">
              <summary className="cursor-pointer text-xs text-primary font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
                <span className="group-open:rotate-90 transition-transform inline-block text-xs">▶</span>
                Catalogue : cliquer pour ajouter
              </summary>
              <div className="mt-2 rounded-lg border border-border bg-muted/20 p-2.5 space-y-2">
                <p className="text-xs text-muted-foreground italic">Cliquez sur un élément pour l'ajouter à la liste ci-dessus, puis saisissez le montant.</p>
                {[
                  { cat: 'Produits imposables : Art. 14, Loi 23/053', color: 'text-indigo-600', items: [
                    "Ventes et recettes=",
                    "Produits financiers=",
                    "Revenus bruts des capitaux mobiliers inscrits à l'actif",
                    "Produits de la location des immeubles inscrits à l'actif, y compris revenus accessoires=",
                    "Bonis sur reprises et cessions d'emballages",
                    "Travaux faits par l'entreprise pour elle-même",
                    "Subventions d'exploitation et d'équilibre",
                    "Travaux en cours=",
                    "Reprises et transferts de charges=",
                    "Dégrèvements obtenus de l'Administration au titre des impôts déductibles",
                    "Produits de cession d'éléments d'actif immobilisé",
                    "Gains de change effectivement réalisés",
                  ]},
                  { cat: '✕ Exclus : Art. 89 al. 2, Loi 23/053', color: 'text-red-500', items: [
                    "Revenus de capitaux mobiliers non inscrits à l'actif du bilan=",
                    "Produits de la location d'immeubles bâtis non inscrits à l'actif du bilan=",
                    "Produits de la location d'immeubles non bâtis non inscrits à l'actif du bilan=",
                  ]},
                ].map((section, si) => (
                  <div key={si}>
                    <p className={`text-xs font-semibold mb-1 ${section.color}`}>{section.cat}</p>
                    <div className="flex flex-wrap gap-1">
                      {section.items.map((item, ii) => {
                        const excluded = section.cat.includes('Exclus')
                        return (
                          <button key={ii}
                            disabled={excluded}
                            onClick={() => {
                              if (excluded) return
                              setProduits((prev: any[]) => {
                                if (prev.some((r: any) => r.label === item)) return prev
                                return [...prev, { label: item, montant: '', fromCat: true }]
                              })
                            }}
                            className={cn(
                              'text-xs px-2 py-1 rounded-lg border transition-all duration-200 ease-out',
                              excluded
                                ? 'border-red-200 text-red-400 bg-red-50 cursor-not-allowed opacity-60'
                                : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer'
                            )}>
                            {excluded ? '✕ ' : '+ '}{item}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* Charges */}
          <div className="space-y-2">
            {/* ── Séparation charges ── */}
            <div className="flex items-center gap-2 my-3">
              <div className="flex-1 h-px bg-rose-200" />
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Charges déductibles</span>
              <div className="flex-1 h-px bg-rose-200" />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-foreground">Charges déductibles</p>
              <InfoTooltip
                texte="Charges déductibles énumérées aux Art. 21 à 49 de la Loi 23/053 : personnel (Art. 21), loyers (Art. 25), transport/assurance/courtage/entretien (Art. 26-27), amortissements (Art. 28), charges financières (Art. 41), redevances (Art. 43), dons (Art. 44), impôts (Art. 45), autres charges (Art. 49). Dépenses mixtes : 50% admis à défaut de justificatif précis (Art. 89 al. 4). Charges non déductibles à l'Art. 50."
                loi="Art. 20 à 50, Loi 23/053"
              />
            </div>
            {charges.length === 0 && (
              <p className="text-xs text-muted-foreground italic">Aucune charge ajoutée. Utilisez le catalogue ci-dessous.</p>
            )}
            {charges.map((r: any, i: number) => (
              <div key={i} className="flex gap-1.5 min-w-0">
                <input
                  value={r.label}
                  readOnly
                  className="min-w-0 flex-1 rounded-lg border border-border/60 bg-muted/40 px-2 py-2 text-xs text-foreground cursor-default select-none" />
                <input type="number" placeholder="Montant FC=" value={r.montant}
                  onChange={e => updateRow(setCharges, i, 'montant', e.target.value)}
                  className="w-28 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button onClick={() => removeRow(setCharges, i)}
                  className="shrink-0 text-red-400 text-xs px-1.5 rounded-lg border border-border/40 bg-background">✕</button>
              </div>
            ))}
            {/* Catalogue charges sélectionnable */}
            <details className="group">
              <summary className="cursor-pointer text-xs text-primary font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
                <span className="group-open:rotate-90 transition-transform inline-block text-xs">▶</span>
                Catalogue : cliquer pour ajouter
              </summary>
              <div className="mt-2 rounded-lg border border-border bg-muted/20 p-2.5 space-y-2">
                <p className="text-xs text-muted-foreground italic">Cliquez sur un élément pour l'ajouter à la liste ci-dessus, puis saisissez le montant.</p>
                {[
                  { cat: 'A. Charges de personnel et autres rémunérations : Art. 21-24', color: 'text-indigo-600', excluded: false, items: [
                    "Traitements, salaires et rémunérations du personnel=",
                    "Indemnités, allocations et avantages en nature du personnel=",
                    "Rémunérations des associés actifs pour emploi effectif dans l'entreprise",
                    "Part du bénéfice répartie entre les membres du personnel=",
                    "Rémunérations exceptionnelles des administrateurs (assemblée générale)",
                    "Salaires, commissions et honoraires déclarés aux impôts correspondants=",
                  ]},
                  { cat: 'B. Dépenses locatives : Art. 25', color: 'text-indigo-600', excluded: false, items: [
                    "Loyer réellement payé des immeubles affectés à l'activité",
                    "Charges locatives des immeubles affectés à l'activité",
                    "Frais généraux d'entretien et éclairage des locaux professionnels=",
                  ]},
                  { cat: "C. Frais de transport, d'assurance, de courtage, d'entretien et de commission : Art. 26", color: 'text-indigo-600', excluded: false, items: [
                    "Frais de transport=",
                    "Frais de courtage=",
                    "Commissions (justifiées : nom, domicile, date et montant du bénéficiaire)",
                    "Frais d'entretien et de réparation des biens immobiliers affectés à l'exploitation",
                    "Frais d'entretien et de réparation du matériel et objets mobiliers affectés à l'exploitation",
                  ]},
                  { cat: "D. Primes d'assurance : Art. 27", color: 'text-indigo-600', excluded: false, items: [
                    "Primes d'assurance couvrant un risque entraînant diminution de l'actif net de l'entreprise",
                  ]},
                  { cat: 'E. Amortissements : Art. 28-38', color: 'text-indigo-600', excluded: false, items: [
                    "Amortissement linéaire des immobilisations à l'actif soumises à dépréciation",
                    "Amortissement dégressif des biens neufs éligibles (matériels industriels, manutention, sécurité, informatique, hôteliers)",
                    "Amortissement exceptionnel (60% la 1ère année) pour entreprises exportant ≥20% du CA=",
                    "Amortissement des biens en crédit-bail (Institution agréée BCC)",
                  ]},
                  { cat: 'F. Charges financières : Art. 39-42', color: 'text-indigo-600', excluded: false, items: [
                    "Intérêts des capitaux empruntés à des tiers engagés dans l'exploitation",
                    "Charges, rentes et redevances analogues relatives à l'exploitation",
                    "Intérêts servis aux associés (dans la limite du taux BCC + 2 points)",
                  ]},
                  { cat: 'G. Redevances : Art. 43', color: 'text-indigo-600', excluded: false, items: [
                    "Redevances de concession de licences d'exploitation (limite : 3,5% du CA HT)",
                    "Redevances de brevets d'invention (limite : 3,5% du CA HT)",
                    "Redevances de marques de fabrique, procédés ou formules de fabrication (limite : 3,5% du CA HT)",
                    "Redevances pour droits analogues en cours de validité (limite : 3,5% du CA HT)",
                  ]},
                  { cat: 'H. Libéralités, dons et subventions : Art. 44', color: 'text-indigo-600', excluded: false, items: [
                    "Versements au Fonds Social de la RDC (justifiés, limite : 0,5% du CA)",
                    "Dons à des organismes de recherche en RDC (justifiés, limite : 0,5% du CA)",
                    "Dons à des œuvres d'utilité publique philanthropiques ou sociales en RDC (limite : 0,5% du CA)",
                    "Dons à des associations sportives en RDC (justifiés, limite : 0,5% du CA)",
                  ]},
                  { cat: 'I. Impôts, droits et taxes : Art. 45', color: 'text-indigo-600', excluded: false, items: [
                    "Impôts, droits et taxes à charge de l'entreprise acquittés dans le délai (sauf IRPP lui-même)",
                  ]},
                  { cat: 'J. Sommes versées à des personnes non résidentes : Art. 46-48', color: 'text-indigo-600', excluded: false, items: [
                    "Sommes versées à une entité liée non résidente (service réel démontré, non disponible en RDC, montant normal)",
                    "Sommes versées à une entité non liée en pays à régime fiscal privilégié (réalité et montant normal prouvés)",
                  ]},
                  { cat: 'K. Autres charges déductibles : Art. 49', color: 'text-indigo-600', excluded: false, items: [
                    "Cadeaux publicitaires justifiés par factures (limite : 2‰ du CA HT)",
                    "Frais de représentation justifiés par factures (limite : 60% de leur montant)",
                    "Charges professionnelles des bâtiments et terrains donnés en location par sociétés immobilières",
                    "Pertes de change effectivement réalisées",
                    "Dépenses de formation professionnelle=",
                    "Dépenses de recherche appliquée et développement sur projets individualisés (amorties sur 4 ans à 25%/an)",
                    "Frais de communication justifiés par factures (limite : 50% de leur montant)",
                    "Frais d'internet exclusivement professionnel (100% déductible)",
                  ]},
                  { cat: '⚠ Dépenses mixtes pro/perso : Art. 89 al. 4', color: 'text-amber-500', excluded: false, items: [
                    "Véhicule à usage mixte professionnel et personnel (50% admis à défaut de justificatif précis)",
                    "Logement servant partiellement de lieu d'activité (50% admis à défaut de justificatif précis)",
                  ]},
                  { cat: '✕ Charges NON déductibles : Art. 50', color: 'text-red-500', excluded: true, items: [
                    "Dépenses personnelles (ménage, instruction, congé, non nécessitées par la profession)",
                    "IRPP lui-même et impôts ne constituant pas une charge d'exploitation",
                    "Amendes, confiscations, pénalités fiscales, douanières et sociales=",
                    "Dépenses relatives aux biens donnés en location et leurs amortissements=",
                    "Provisions pour pertes, charges ou dépréciations d'actif (sauf provisions légalement autorisées)",
                    "Dépenses de chasse/pêche sportives, bateaux de plaisance, aéronefs de tourisme, résidences somptuaires=",
                    "Frais généraux du siège social ou direction générale situés à l'étranger",
                  ]},
                ].map((section, si) => (
                  <div key={si}>
                    <p className={`text-xs font-semibold mb-1 ${section.color}`}>{section.cat}</p>
                    <div className="flex flex-wrap gap-1">
                      {section.items.map((item, ii) => (
                        <button key={ii}
                          disabled={section.excluded}
                          onClick={() => {
                            if (section.excluded) return
                            setCharges((prev: any[]) => {
                              if (prev.some((r: any) => r.label === item)) return prev
                              return [...prev, { label: item, montant: '', fromCat: true }]
                            })
                          }}
                          className={cn(
                            'text-xs px-2 py-1 rounded-lg border transition-all duration-200 ease-out',
                            section.excluded
                              ? 'border-red-200 text-red-400 bg-red-50 cursor-not-allowed opacity-60'
                              : section.color.includes('amber')
                                ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 cursor-pointer'
                                : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 cursor-pointer'
                          )}>
                          {section.excluded ? '✕ ' : '+ '}{item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* Déductions spécifiques Art. 90 */}
          <div>
            <button
              onClick={() => setShowDeductions(!showDeductions)}
              className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
              <span>{showDeductions ? '▼' : '▶'}</span>
              Déductions spécifiques (Art. 90)
              <InfoTooltip
                texte="Des déductions complémentaires peuvent réduire le bénéfice imposable : (1) Cotisations à une caisse de prévoyance, assurance maladie ou retraite : dans la limite de 20% du bénéfice net. (2) Frais médicaux du contribuable, conjoint et enfants à charge : sur justificatifs.="
                loi="Art. 90, Loi 23/053"
              />
            </button>
            {showDeductions && (
              <div className="mt-3 space-y-3 pl-3 border-l-2 border-primary/20">
                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Cotisations sociales / assurance (FC)</label>
                    <InfoTooltip
                      texte="Cotisations versées pour constitution d'une rente viagère, pension, assurance maladie ou chômage. Déductibles dans la limite de 20% du bénéfice net de l'année précédente."
                      loi="Art. 90, Loi 23/053"
                    />
                  </div>
                  <input type="number" placeholder="Ex : 3 000 000" value={cotisationsSociales}
                    onChange={e => setCotisationsSociales(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Frais médicaux justifiés (FC)</label>
                    <InfoTooltip
                      texte="Frais médicaux engagés pour le contribuable, son conjoint ou ses enfants à charge. Doivent être effectivement payés et justifiés par des pièces probantes (factures, reçus, prescriptions médicales)."
                      loi="Art. 90, Loi 23/053"
                    />
                  </div>
                  <input type="number" placeholder="Ex : 1 200 000" value={fraisMedicaux}
                    onChange={e => setFraisMedicaux(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    Personnes à charge
                    <InfoTooltip
                      texte="Réduction de 2% de l'IRPP par personne à charge, dans la limite de 9 personnes (Art. 123). Sont admis : conjoint légal, enfants célibataires reconnus ou adoptés, ascendants des deux conjoints vivant au foyer. Condition : revenu propre de la personne à charge ≤ 1 944 000 FC/an. ⚠️ Inapplicable si revenu imposable > 43 200 000 FC/an. Pourquoi ? Au-delà de ce seuil (3e tranche du barème, Art. 118), le législateur considère que le contribuable dispose d'une capacité financière suffisante pour assumer ses charges de famille sans nécessiter un allègement fiscal. Cette réduction vise à protéger les foyers à revenus modestes et moyens : l'accorder aux hauts revenus irait à l'encontre du principe de justice fiscale (Art. 123 à 125, Loi 23/053)."
                      loi="Art. 123 à 125, Loi 23/053"
                    />
                  </label>
                  <input type="number" min={0} max={9} placeholder="0" value={nbPersonnesCharge}
                    onChange={e => setNbPersonnesCharge(e.target.value)}
                    disabled={!!res && res.beneficeNetArrondi > 43200000}
                    className={"w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 " + (res && res.beneficeNetArrondi > 43200000 ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed=" : "bg-background")} />
                  {res && res.beneficeNetArrondi > 43200000
                    ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : inapplicable : revenu imposable &gt; 43 200 000 FC (au-delà de la 3e tranche)</p>
                    : <p className="text-xs text-muted-foreground mt-1">Maximum 9 personnes : réduction inapplicable si revenu imposable &gt; 43 200 000 FC</p>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {res && (
        <ResultatWrap titre="IRPP : Cat. 2 : Bénéfices BIC=">

          {/* Micro-entreprise */}
          {res.regime === 'micro' && (
            <EtapeResultat numero={1} titre="Impôt forfaitaire (Art. 128)">
              <LigneR label="Base légale" val="30 USD en FC (Arrêté n°015 du 19/02/2025)" />
              <LigneR label="30 USD × ~2 800 FC/USD" val={`≈ ${formatFC(res.impot)}`} />
              <LigneR label="Impôt annuel dû" val={formatFC(res.impot)} bold accent />
              <p className="text-xs text-muted-foreground mt-1">Montant indépendant du CA. Le taux de conversion est celui du jour de l'Arrêté Ministériel.</p>
            </EtapeResultat>
          )}

          {/* Petite entreprise */}
          {res.regime === 'petit' && (
            <EtapeResultat numero={1} titre={`Impôt proportionnel (Art. 127) : Taux ${(res.taux * 100).toFixed(0)}%`}>
              <LigneR label="Chiffre d'affaires annuel=" val={formatFC(res.ca)} />
              <LigneR label={`CA × ${(res.taux * 100).toFixed(0)}%`} val={`= ${formatFC(res.impot)}`} />
              <LigneR label="Impôt total dû" val={formatFC(res.impot)} bold accent />
            </EtapeResultat>
          )}

          {/* Régime réel */}
          {res.regime === 'reel' && (
            <>
              <EtapeResultat numero={1} titre="Bénéfice brut (Art. 89)">
                <LigneR label="Total produits imposables=" val={formatFC(res.produits)} />
                <LigneR label="Total charges déductibles" val={formatFC(res.charges)} neg />
                <Separateur />
                <LigneR label="Bénéfice brut=" val={formatFC(res.beneficeBrut)} bold />
              </EtapeResultat>

              {(res.cotSoc > 0 || res.fraisMed > 0) && (
                <EtapeResultat numero={2} titre="Déductions spécifiques (Art. 90)">
                  {res.cotSoc > 0 && (
                    <>
                      <LigneR label={`Cotisations déclarées`} val={formatFC(res.cotSoc)} />
                      <LigneR label={`Plafond admis (20% du bénéfice)`} val={formatFC(res.plafondCotSoc)} />
                      <LigneR label="Cotisations admises en déduction" val={formatFC(res.cotSocAdmise)} neg />
                    </>
                  )}
                  {res.fraisMed > 0 && (
                    <LigneR label="Frais médicaux (sur justificatifs)" val={formatFC(res.fraisMed)} neg />
                  )}
                  <Separateur />
                  <LigneR label="Bénéfice net imposable=" val={formatFC(res.beneficeNet)} bold />
                </EtapeResultat>
              )}

              <EtapeResultat numero={res.cotSoc > 0 || res.fraisMed > 0 ? 3 : 2} titre="Barème progressif IRPP (Art. 118)">
                <p className="text-xs text-muted-foreground mb-1.5">Base arrondie au millier inférieur (Art. 118) : <strong>{formatFC(res.beneficeNetArrondi)} FC</strong></p>
                {res.beneficeNetArrondi <= 1944000 && (
                  <LigneR label={`${formatFC(res.beneficeNetArrondi)} × 3%`} val={formatFC(res.beneficeNetArrondi * 0.03)} />
                )}
                {res.beneficeNetArrondi > 1944000 && res.beneficeNetArrondi <= 21600000 && (
                  <>
                    <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                    <LigneR label={`${formatFC(res.beneficeNetArrondi - 1944000)} × 15%`} val={formatFC((res.beneficeNetArrondi - 1944000) * 0.15)} />
                  </>
                )}
                {res.beneficeNetArrondi > 21600000 && res.beneficeNetArrondi <= 43200000 && (
                  <>
                    <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                    <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                    <LigneR label={`${formatFC(res.beneficeNetArrondi - 21600000)} × 30%`} val={formatFC((res.beneficeNetArrondi - 21600000) * 0.30)} />
                  </>
                )}
                {res.beneficeNetArrondi > 43200000 && (
                  <>
                    <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                    <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                    <LigneR label="21 600 000 × 30%" val={formatFC(21600000 * 0.30)} />
                    <LigneR label={`${formatFC(res.beneficeNetArrondi - 43200000)} × 40%`} val={formatFC((res.beneficeNetArrondi - 43200000) * 0.40)} />
                  </>
                )}
                <Separateur />
                <LigneR signe="=" label="IRPP barème" val={formatFC(res.impotBareme)} bold />
                {res.plafonne && res.beneficeNetArrondi > 0 && (
                  <p className="text-xs text-amber-600 mt-1">Plafond appliqué : 30% du revenu imposable = {formatFC(res.plafond30)} FC (Art. 118).</p>
                )}
                {res.nbPC > 0 && (
                  <>
                    <LigneR signe="−" label={`Réduction personnes à charge : ${res.nbPC} × 2% = ${(res.nbPC * 2)}%`} val={formatFC(res.reductionPC)} neg />
                    <LigneR signe="=" label="IRPP après réduction famille=" val={formatFC(res.impotApresPC)} bold />
                  </>
                )}
                {res.minimumApplique && (
                  <p className="text-xs text-orange-600 mt-1 font-medium">Impôt minimum appliqué : 1% du CA = {formatFC(res.minimum122)} FC (Art. 122). L'impôt calculé ({formatFC(res.impotApresPC)} FC) est inférieur à ce seuil.</p>
                )}
              </EtapeResultat>
            </>
          )}

          {/* Quotités de paiement : selon régime */}
          <EtapeResultat numero={res.regime === 'reel' ? (res.cotSoc > 0 || res.fraisMed > 0 ? 4 : 3) : 2} titre="Modalités de paiement=">

            {/* MICRO */}
            {res.regime === 'micro' && (
              <>
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Paiement forfaitaire libératoire :</p>
                  <InfoTooltip
                    texte="Pour les micro-entreprises, l'impôt est fixé forfaitairement à l'équivalent de 30 USD en FC par l'Arrêté Ministériel n°015 du 19/02/2025. Ce paiement est libératoire : une fois versé, l'impôt est définitivement soldé pour l'exercice. La retenue à la source sur les rémunérations des salariés relevant des micro-entreprises est également libératoire (Art. 121 al. 2, Loi 23/053)."
                    loi="Art. 128, Loi 23/053 : Art. 121 al. 2, Loi 23/053"
                  />
                </div>
                <LigneR label={`30 USD × ${(res.tauxUsd || 2800).toLocaleString('fr-FR')} FC/USD`} val={formatFC(res.impot)} bold accent />
                <p className="text-xs text-muted-foreground mt-1">Versement unique libératoire : aucune déclaration de bénéfice exigée.</p>
              </>
            )}

            {/* PETITE ENTREPRISE */}
            {res.regime === 'petit' && (
              <>
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">L'impôt se paie en deux quotités :</p>
                  <InfoTooltip
                    texte="Conformément à l'Art. 57 quater de la Loi sur les procédures fiscales, les petites entreprises acquittent l'IRPP en deux quotités : 60% et 40% de l'impôt dû (1% ou 2% × CA). La 1ère quotité (60%) est payée à la souscription de la déclaration auto-liquidative, au plus tard le 31 janvier de l'année qui suit celle de la réalisation des revenus. La 2ème quotité (40%) est acquittée par bordereau de versement, au plus tard le 30 avril de la même année."
                    loi="Art. 57 quater, Loi procédures fiscales : Art. 127, Loi 23/053"
                  />
                </div>
                <LigneR label="1ère quotité (60%) : déclaration auto-liquidative au 31 janvier=" val={formatFC(res.q1)} />
                <LigneR label="2ème quotité (40%) : bordereau de versement au 30 avril=" val={formatFC(res.q2)} />
              </>
            )}

            {/* RÉGIME RÉEL */}
            {res.regime === 'reel' && (
              <>
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">3 acomptes provisionnels + solde :</p>
                  <InfoTooltip
                    texte="Conformément à l'Art. 57 bis de la Loi sur les procédures fiscales, les acomptes sont calculés sur la base de l'impôt déclaré de l'exercice précédent (ou reconstitué d'office). Ils représentent 30%, 30% et 20% de cette base. Le solde est versé au dépôt de la déclaration annuelle. Si les acomptes versés excèdent l'impôt dû, le crédit constaté peut servir au paiement d'autres impôts et droits dus : mais ne peut pas faire l'objet de cession (Art. 57 ter)."
                    loi="Art. 57 bis + Art. 57 ter, Loi procédures fiscales="
                  />
                </div>
                <LigneR label="1er acompte (30% de l'impôt N−1) : avant le 25 juillet" val={formatFC(res.impot * 0.30)} />
                <LigneR label="2ème acompte (30% de l'impôt N−1) : avant le 25 septembre" val={formatFC(res.impot * 0.30)} />
                <LigneR label="3ème acompte (20% de l'impôt N−1) : avant le 25 novembre" val={formatFC(res.impot * 0.20)} />
                <LigneR label="Solde (20%) : au dépôt de la déclaration annuelle" val={formatFC(res.impot * 0.20)} />
                <p className="text-xs text-muted-foreground mt-1">Dates modifiées par Art. 60 LF 2025 (n° 24/011), confirmées par Art. 31 LF 2026. Versements par bordereau d'acomptes provisionnels.</p>
              </>
            )}

          </EtapeResultat>

          <BoxFinal label="IRPP total dû" val={formatFC(res.impot)} />
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CAT. 5 : Revenus de capitaux mobiliers (contenu anciennement sous Cat. 2)
// Art. 72 + Art. 80, Loi 23/053
// ─────────────────────────────────────────────────────────────────────────────
function Cat5Mobiliers() {
  type Ligne = { label: string; montant: string; baseReduite?: number }
  const [lignes, setLignes] = useState<Ligne[]>([])
  const [res, setRes] = useState<any>(null)

  const TYPES_REVENUS = [
    {
      id: 'div_actions',
      label: 'Dividendes : actions (base réduite 50%)',
      texte: "Dividendes distribués aux actionnaires (SA, SARL unipersonnelle, etc.) en raison de leurs actions. La base imposable est réduite à 50% du montant brut mis à disposition : LF 2025 Art. 26 (modification Art. 81 Loi 23/053). La retenue de 20% est calculée sur cette base réduite. Exonérations Art. 80 : dividendes versés entre sociétés mères et filiales sous conditions.=",
      loi: 'Art. 72-73, Art. 81 §1 mod. LF 2025 Art. 26, Loi 23/053',
      baseReduite: 0.5,
    },
    {
      id: 'div_parts',
      label: 'Dividendes : parts d’associés (base réduite 60%)',
      texte: "Dividendes distribués aux associés (SNC, SARL à responsabilité limitée, sociétés civiles, etc.) en raison de leurs parts sociales. La base imposable est réduite à 60% du montant brut mis à disposition : LF 2025 Art. 27 (modification Art. 81 Loi 23/053). La retenue de 20% est calculée sur cette base réduite.",
      loi: 'Art. 72-73, Art. 81 §1 mod. LF 2025 Art. 27, Loi 23/053',
      baseReduite: 0.6,
    },
    {
      id: 'indem',
      label: 'Indemnités de fonction / jetons de présence',
      texte: "Rémunérations allouées aux membres des Conseils d'administration de sociétés anonymes, établissements publics et entreprises publiques, à l'exclusion des salaires et redevances de propriété industrielle. Imposées comme revenus de capitaux mobiliers par retenue à la source de 20% (Art. 73 §4, Loi 23/053).",
      loi: 'Art. 73 §4, Loi 23/053',
    },
    {
      id: 'oblig',
      label: 'Intérêts sur obligations et effets publics',
      texte: "Intérêts, arrérages et tous produits des obligations, effets publics et titres d'emprunt négociables émis par l'État, les ETD, les établissements publics, les associations et les sociétés privées. Comprend également les lots et primes de remboursement payés aux porteurs. Base imposable : intérêt ou revenu distribué durant l'exercice (Art. 77, Art. 81 §2, Loi 23/053). ⚠️ Exonération : titres d'emprunt émis par l'État, les Provinces et les ETD (Art. 80 §1).",
      loi: 'Art. 77, Art. 80, Art. 81 §2, Loi 23/053',
    },
    {
      id: 'creances',
      label: 'Intérêts sur créances, dépôts et comptes courants',
      texte: "Intérêts perçus sur des créances hypothécaires ou chirographaires, des dépôts bancaires à vue ou à terme, des cautionnements en numéraire et des comptes courants d'associés. Condition : ces revenus ne doivent pas figurer dans les recettes d'une activité professionnelle (auquel cas ils relèveraient de la Cat. 2 ou 3). Base imposable : montant brut des intérêts (Art. 78, Art. 81 §4, Loi 23/053). ⚠️ Exonération : intérêts des comptes d'épargne classiques (Art. 80 §2).",
      loi: 'Art. 78, Art. 80, Art. 81 §4, Loi 23/053',
    },
    {
      id: 'bons',
      label: 'Intérêts sur bons de caisse',
      texte: "Intérêts et tous produits des bons de caisse émis par les établissements de crédit ou toute entreprise en activité en RDC. Peuvent être nominatifs ou anonymes, à court ou moyen terme. Base imposable : intérêts échus ou primes versées au remboursement (Art. 79, Art. 81, Loi 23/053). ⚠️ Exonération possible sous certaines conditions (Art. 80 §3).",
      loi: 'Art. 79, Art. 80 §3, Loi 23/053',
    },
  ]

  function addLigne(type: { label: string; baseReduite?: number }) {
    if (lignes.some(l => l.label === type.label)) return
    setLignes(p => [...p, { label: type.label, montant: '', baseReduite: type.baseReduite }])
  }
  function updateMontant(i: number, v: string) {
    setLignes(p => p.map((l, idx) => idx === i ? { ...l, montant: v } : l))
  }
  function removeLigne(i: number) {
    setLignes(p => p.filter((_, idx) => idx !== i))
  }

  function calculer() {
    const details = lignes.map(l => {
      const brut = parseFloat(l.montant) || 0
      const coeff = l.baseReduite ?? 1
      const base = brut * coeff
      return { label: l.label, brut, base, coeff, retenue: base * 0.20 }
    })
    const totalBrut = details.reduce((s, d) => s + d.brut, 0)
    const totalBase = details.reduce((s, d) => s + d.base, 0)
    const totalRetenue = details.reduce((s, d) => s + d.retenue, 0)
    setRes({ details, totalBrut, totalBase, totalRetenue })
  }

  function reset() { setLignes([]); setRes(null) }

  return (
    <div className="space-y-4">

      {/* Encadré introduction */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-3 space-y-2">
        <p className="text-xs text-teal-700 leading-relaxed">
          <strong>Revenus de capitaux mobiliers</strong> : produits générés par la détention d'avoirs financiers
          (actions, obligations, dépôts, créances, bons de caisse) sans effort direct de travail.
          Base légale : Art. 72 à 81, Loi 23/053.
        </p>
        <div className="rounded-lg border border-teal-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-teal-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 5 : Revenus imposables</p>
              <p className="text-xs text-green-700 leading-relaxed">
                Toute personne physique percevant des dividendes, intérêts (hors épargne/État), indemnités d'administrateur,
                intérêts sur prêts privés, produits d'obligations ou de bons de caisse.
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Hors Cat. 5</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Redevances et droits d'auteur perçus à titre professionnel → <strong>Cat. 3 (BNC)</strong>.<br />
                Intérêts inclus dans les recettes d'une activité commerciale ou agricole → <strong>Cat. 2 ou Cat. 4</strong> (Art. 78).
              </p>
            </div>
          </div>
          <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-bold text-amber-700 mb-0.5">⚠ Exonérations (Art. 80)</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Sont exonérés d'IRPP : intérêts sur titres d'emprunt émis par l'État, les Provinces et les ETD —
              intérêts des comptes d'épargne classiques : intérêts des bons de caisse (sous conditions).
            </p>
          </div>
          <div className="mt-2 rounded-lg bg-teal-50 border border-teal-200 p-3">
            <p className="text-xs font-bold text-teal-700 mb-0.5">Mécanisme : retenue à la source imputable</p>
            <p className="text-xs text-teal-700 leading-relaxed">
              L'impôt est retenu directement par le débiteur (société distributrice, banque, emprunteur).
              Taux unique : <strong>20% sur le montant brut</strong> (Art. 120, Loi 23/053).
              Cette retenue est imputée sur l'IRPP global dû par le contribuable (Art. 121, Loi 23/053).
              Si la retenue excède l'impôt dû, l'excédent constitue un crédit d'impôt reportable.
              Versement au Trésor dans les 15 jours du mois suivant (Art. 18 bis, Loi procédures fiscales).
              Pas de barème progressif, pas de déductions, pas de personnes à charge.
            </p>
          </div>
        </div>
      </div>

      {/* Sélecteur de types de revenus */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <p className="text-xs font-semibold text-foreground">Revenus perçus</p>
          <InfoTooltip
            texte="Sélectionnez chaque type de revenu mobilier perçu. Pour chacun, saisissez le montant brut avant retenue. La retenue de 20% sera calculée par type puis totalisée."
            loi="Art. 72-81, Art. 120, Loi 23/053"
          />
        </div>
        <details className="group">
          <summary className="cursor-pointer text-xs text-teal-600 font-medium hover:underline flex items-center gap-1 select-none list-none">
            <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span> Catalogue des revenus mobiliers
          </summary>
          <div className="mt-2 space-y-1 pl-3">
            {TYPES_REVENUS.map((t, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <button onClick={() => addLigne(t)}
                  className="flex-1 text-left text-xs text-foreground hover:text-teal-700 hover:bg-teal-50 px-2 py-1.5 rounded transition-colors duration-200">
                  + {t.label}
                </button>
                <InfoTooltip texte={t.texte} loi={t.loi} />
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Lignes saisies */}
      {lignes.length > 0 && (
        <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-3 space-y-2">
          {lignes.map((l, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground/80 truncate">
                {l.label}
              </div>
              <div className="flex gap-2">
                <input value={l.montant} onChange={e => updateMontant(i, e.target.value)}
                  type="number" placeholder="Montant brut FC="
                  className="flex-1 sm:w-36 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <button onClick={() => removeLigne(i)} className="text-muted-foreground hover:text-destructive transition-colors text-xs px-1">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {/* Résultats */}
      {res && (
        <ResultatWrap titre="IRPP : Cat. 5 : Revenus de capitaux mobiliers=">
          <EtapeResultat numero={1} titre="Calcul de la retenue par nature de revenu (Art. 120)">
            {res.details.map((d: any, i: number) => (
              d.brut > 0 && (
                <div key={i} className="mb-2 last:mb-0">
                  <LigneR label={d.label} val={formatFC(d.brut)} />
                  {d.coeff < 1 && (
                    <LigneR signe="×" label={`Réduction base : ${Math.round(d.coeff * 100)}% du brut`} val={formatFC(d.base)}
                      tooltip={{ texte: d.coeff === 0.5
                        ? "Base imposable réduite à 50% pour les dividendes d'actions (LF 2025 Art. 26 mod. Art. 81 Loi 23/053)."
                        : "Base imposable réduite à 60% pour les dividendes de parts d'associés (LF 2025 Art. 27 mod. Art. 81 Loi 23/053).",
                        loi: 'LF 2025 Art. 26-27 : Loi 23/053' }}
                    />
                  )}
                  <LigneR signe="×" label={`${formatFC(d.base)} × 20%`} val={formatFC(d.retenue)} bold accent />
                </div>
              )
            ))}
            {res.details.filter((d: any) => d.brut > 0).length > 1 && (
              <>
                <Separateur />
                <LigneR signe="=" label="Total base imposable=" val={formatFC(res.totalBase)} />
              </>
            )}
          </EtapeResultat>

          <EtapeResultat numero={2} titre="Modalités de versement (Art. 18 bis)">
            <div className="flex items-center gap-1 mb-1">
              <p className="text-xs text-muted-foreground">Versement par le débiteur des revenus :</p>
              <InfoTooltip
                texte="Conformément à l'article 18 bis de la Loi n°004/2003 portant réforme des procédures fiscales (modifié par la Loi 23/053), les retenues effectuées sur les revenus de capitaux mobiliers doivent être versées au Trésor au plus tard le 15 du mois suivant celui du versement des revenus. Chaque versement est accompagné d'une déclaration auprès du service gestionnaire du débiteur."
                loi="Art. 18 bis, Loi n° 004/2003 réformée par Loi 23/053"
              />
            </div>
            <LigneR label="Délai de reversement au Trésor" val="≤ 15 du mois suivant=" />
            <LigneR label="Obligation documentaire=" val="Déclaration + bordereau de versement=" />
          </EtapeResultat>

          <BoxFinal label="Total retenu à la source (20%)" val={formatFC(res.totalRetenue)} />
        </ResultatWrap>
      )}
    </div>
  )
}

// [Cat456Benefices supprimée : contenu intégré dans Cat2BIC]
function Cat456Benefices() {
  type Regime = 'micro' | 'petit' | 'reel'
  const [regime, setRegime] = useState<Regime>('reel')
  const [ca, setCa] = useState('')
  const [produits, setProduits] = useState([{ label: 'Produits d\'exploitation', montant: '' }])
  const [charges, setCharges] = useState([{ label: 'Charges d\'exploitation', montant: '' }])
  const [res, setRes] = useState<any>(null)
  const [activite, setActivite] = useState<'vente' | 'service'>('vente')

  function addRow(set: any) { set((p: any[]) => [...p, { label: '', montant: '' }]) }
  function removeRow(set: any, i: number) { set((p: any[]) => p.filter((_: any, idx: number) => idx !== i)) }
  function updateRow(set: any, i: number, f: string, v: string) {
    set((p: any[]) => p.map((r: any, idx: number) => idx === i ? { ...r, [f]: v } : r))
  }

  function calculer() {
    const caVal = parseFloat(ca) || 0
    if (regime === 'micro') {
      const taux = activite === 'vente' ? 0.01 : 0.02
      const impot = caVal * taux
      setRes({ regime, ca: caVal, taux, impot, q1: impot * 0.6, q2: impot * 0.4 })
    } else if (regime === 'petit') {
      const taux = activite === 'vente' ? 0.01 : 0.02
      const impot = caVal * taux
      setRes({ regime, ca: caVal, taux, impot, q1: impot * 0.6, q2: impot * 0.4 })
    } else {
      const tp = produits.reduce((s: number, r: any) => s + (parseFloat(r.montant) || 0), 0)
      const tc = charges.reduce((s: number, r: any) => s + (parseFloat(r.montant) || 0), 0)
      const benefice = tp - tc
      const impot = Math.max(0, benefice) * 0.30
      setRes({ regime, produits: tp, charges: tc, benefice, impot, q1: impot * 0.6, q2: impot * 0.4 })
    }
  }

  function reset() {
    setRes(null); setCa('')
    setProduits([{ label: 'Produits d\'exploitation', montant: '' }])
    setCharges([{ label: 'Charges d\'exploitation', montant: '' }])
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {([
          { key: 'micro', label: 'Micro-entreprise', sub: 'Forfaitaire' },
          { key: 'petit', label: 'Petite entreprise', sub: 'Forfaitaire' },
          { key: 'reel', label: 'Régime réel', sub: 'Moy./Grande' },
        ] as const).map(r => (
          <button key={r.key} onClick={() => { setRegime(r.key); setRes(null) }}
            className={cn('py-2.5 rounded-xl border text-xs font-semibold transition-all',
              regime === r.key ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30')}>
            <div>{r.label}</div>
            <div className="font-normal opacity-70">{r.sub}</div>
          </button>
        ))}
      </div>

      {regime !== 'reel' ? (
        <>
          <div className="flex gap-2">
            {(['vente', 'service'] as const).map(a => (
              <button key={a} onClick={() => setActivite(a)}
                className={cn('flex-1 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ease-out',
                  activite === a ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border bg-card text-muted-foreground')}>
                {a === 'vente' ? 'Vente (1%)' : 'Services (2%)'}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Chiffre d'affaires annuel (FC)</label>
            <input type="number" placeholder="Ex : 50 000 000" value={ca}
              onChange={e => setCa(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Produits</p>
            {produits.map((r: any, i: number) => (
              <div key={i} className="flex gap-1.5 min-w-0">
                <input placeholder="Libellé" value={r.label} onChange={e => updateRow(setProduits, i, 'label', e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="number" placeholder="Montant" value={r.montant} onChange={e => updateRow(setProduits, i, 'montant', e.target.value)}
                  className="w-24 sm:w-32 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                {produits.length > 1 && <button onClick={() => removeRow(setProduits, i)} className="shrink-0 text-red-400 text-xs px-1.5 rounded-lg border border-border/40 bg-background">✕</button>}
              </div>
            ))}
            <button onClick={() => addRow(setProduits)} className="text-xs opacity-70 hover:opacity-100">+ Ajouter</button>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Charges déductibles</p>
            {charges.map((r: any, i: number) => (
              <div key={i} className="flex gap-1.5 min-w-0">
                <input placeholder="Libellé" value={r.label} onChange={e => updateRow(setCharges, i, 'label', e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="number" placeholder="Montant" value={r.montant} onChange={e => updateRow(setCharges, i, 'montant', e.target.value)}
                  className="w-24 sm:w-32 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                {charges.length > 1 && <button onClick={() => removeRow(setCharges, i)} className="shrink-0 text-red-400 text-xs px-1.5 rounded-lg border border-border/40 bg-background">✕</button>}
              </div>
            ))}
            <button onClick={() => addRow(setCharges)} className="text-xs opacity-70 hover:opacity-100">+ Ajouter</button>
          </div>
        </>
      )}

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="Bénéfices professionnels : IRPP=">
          {res.regime !== 'reel' ? (
            <EtapeResultat numero={1} titre="Calcul forfaitaire=">
              <LigneR label="Chiffre d'affaires" val={formatFC(res.ca)} />
              <LigneR label={`Taux (${(res.taux * 100).toFixed(0)}%)`} val="" />
              <LigneR label="Impôt total dû" val={formatFC(res.impot)} bold accent />
            </EtapeResultat>
          ) : (
            <EtapeResultat numero={1} titre="Bénéfice imposable (30%)">
              <LigneR label="Total produits=" val={formatFC(res.produits)} />
              <LigneR label="Total charges=" val={formatFC(res.charges)} neg />
              <Separateur />
              <LigneR label="Bénéfice net=" val={formatFC(res.benefice)} bold />
              <LigneR label="IS (30%)" val={formatFC(res.impot)} bold accent />
            </EtapeResultat>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <BoxFinal label="1ère quotité (60%) : 31 janvier=" val={formatFC(res.q1)} />
            <BoxFinal label="2ème quotité (40%) : 30 avril=" val={formatFC(res.q2)} credit />
          </div>
          <BoxFinal label="Total impôt dû" val={formatFC(res.impot)} />
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// IS : Impôt sur les Sociétés
// Logique : Résultat comptable → Résultat fiscal → IS
// Doc. Prof. MAPOTI SAYA MBONGO (FEC-UNI KIN, Mars 2025)
// ─────────────────────────────────────────────────────────────────────────────

const REINTAGRATIONS_CATALOGUE: ElementCatalogue[] = [
  { code: 'RI-01', label: "IS et impôt minimum de l'exercice (Art. 50 §2)" },
  { code: 'RI-02', label: 'Prélèvement exceptionnel expatriés : IERE (Art. 50 §2)' },
  { code: 'RI-03', label: 'Amendes, pénalités, confiscations fiscales/douanières (Art. 50 §3)' },
  { code: 'RI-04', label: 'Provisions non autorisées par la loi (Art. 50 §5)' },
  { code: 'RI-05', label: "Dépenses somptuaires : bateaux, avions de tourisme, résidences d'agrément (Art. 50 §6)" },
  { code: 'RI-06', label: 'Charges personnelles du dirigeant (Art. 50 §1)' },
  { code: 'RI-07', label: 'Rémunérations fictives ou exagérées des dirigeants (Art. 22)' },
  { code: 'RI-08', label: 'Intérêts excédentaires entités liées (> 15% résultat retraité : Art. 41)' },
  { code: 'RI-09', label: 'Redevances excédentaires entités liées (> 3,5% CA HT : Art. 43)' },
  { code: 'RI-10', label: 'Dons/libéralités excédentaires (> 0,5% CA : Art. 44)' },
  { code: 'RI-11', label: 'Cadeaux publicitaires excédentaires (> 2‰ CA HT : Art. 49 §1)' },
  { code: 'RI-12', label: 'Frais de représentation excédentaires (> 60% : Art. 49 §2)' },
  { code: 'RI-13', label: 'Frais de communication excédentaires (> 50% : Art. 49 §7)' },
  { code: 'RI-14', label: 'Augmentation annuité amort. sur valeur réévaluée (Art. 133)' },
  { code: 'RI-15', label: 'Charges établissements stables : frais siège étranger (Art. 50 §7)' },
  { code: 'RI-16', label: 'Sommes versées à États non coopératifs (Art. 48)' },
  { code: 'RI-17', label: 'Commissions/honoraires sans identification bénéficiaire (Art. 26)' },
  { code: 'RI-18', label: 'Libéralités et avantages aux associés non-actifs ou héritiers dans les sociétés autres que par actions (Art. 31 mod. LF 2025)' },
  { code: 'RI-19', label: 'Sommes affectées au remboursement d\'emprunts ou à l\'extension de l\'entreprise comptabilisées en charges au mépris des règles comptables (Art. 31 mod. LF 2025)' },
]

const DEDUCTIONS_CATALOGUE: ElementCatalogue[] = [
  { code: 'DE-01', label: 'Plus-values non réalisées comptabilisées (Art. 19)' },
  { code: 'DE-02', label: 'Plus-values de fusion exonérées (Art. 54)' },
  { code: 'DE-03', label: 'Éléments déjà imposés : éviter double imposition (Art. 55)' },
  { code: 'DE-04', label: 'Quote-part GIE distribuée à membres personnes physiques (Art. 6 §1)' },
  { code: 'DE-05', label: 'Bénéfices navires/aéronefs étrangers : réciprocité (Art. 6 §2)' },
  { code: 'DE-06', label: 'Revenus exonérés par convention fiscale internationale (Art. 7)' },
]

// ─────────────────────────────────────────────────────────────────────────────
// IS : Impôt sur les Sociétés (Loi 23/053, Titre II)
// ─────────────────────────────────────────────────────────────────────────────
function arrondiIS(val: number): number {
  // Art. 150 : arrondi à l'unité, puis tranche ≥50FC → centaine sup, <50FC → centaine inf
  const u = Math.round(val)
  const reste = u % 100
  if (reste >= 50) return u + (100 - reste)
  return u - reste
}

function SimulateurIS() {
  // Bloc 0 : infos générales
  const [caHT, setCaHT] = useState('')
  const [exercice, setExercice] = useState(new Date().getFullYear().toString())

  // Bloc 1 : résultat comptable
  const [resultatComptable, setResultatComptable] = useState('')

  // Bloc 2 : réintégrations (catalogue only : pas de row initial)
  const [reinteg, setReinteg] = useState<LigneSaisie[]>([])

  // Bloc 3 : déductions (catalogue only : pas de row initial)
  const [deductions, setDeductions] = useState<LigneSaisie[]>([])

  // Bloc 4 : déficits reportables
  const [defN1, setDefN1] = useState('')
  const [defN2, setDefN2] = useState('')
  const [defN3, setDefN3] = useState('')

  // Bloc 5 : amortissements différés
  const [amortDifferes, setAmortDifferes] = useState('')

  // Bloc 6 : réévaluation
  const [reevalMode, setReevalMode] = useState<'none' | 'libre' | 'legale'>('none')
  const [reevalPlusValue, setReevalPlusValue] = useState('')

  // Bloc 7 : acomptes (IS N-1)
  const [isNmoins1, setIsNmoins1] = useState('')

  // Bloc 8 : prélèvements spéciaux
  const [facturesNonResidents, setFacturesNonResidents] = useState('')
  const [remunsExpatries, setRemunsExpatries] = useState('')
  const [capitauxNonResidents, setCapitauxNonResidents] = useState('')
  // Bloc 9 : cas IS minimum sans CA
  type TailleEntreprise = 'grande' | 'moyenne' | 'petite'
  const [cessationActivite, setCessationActivite] = useState(false)
  const [tailleEntreprise, setTailleEntreprise] = useState<TailleEntreprise>('grande')

  const [res, setRes] = useState<any>(null)
  const [showReeval, setShowReeval] = useState(false)
  const [showAcomptes, setShowAcomptes] = useState(false)
  const [showPrelevements, setShowPrelevements] = useState(false)

  function addRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>) {
    set(p => [...p, { code: '', label: '', montant: '' }])
  }
  function removeRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, i: number) {
    set(p => p.filter((_, idx) => idx !== i))
  }
  function updateRow(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, i: number, f: 'label' | 'montant', v: string) {
    set(p => p.map((r, idx) => idx === i ? { ...r, [f]: v } : r))
  }
  function addFromCatalogue(set: React.Dispatch<React.SetStateAction<LigneSaisie[]>>, e: ElementCatalogue) {
    set(p => [...p, { code: e.code, label: e.label, montant: '' }])
  }

  function calculer() {
    const ca = parseFloat(caHT) || 0
    const rc = parseFloat(resultatComptable) || 0
    const totalReinteg = reinteg.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const totalDeduc = deductions.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const deficits = (parseFloat(defN1) || 0) + (parseFloat(defN2) || 0) + (parseFloat(defN3) || 0)
    const amortDiff = parseFloat(amortDifferes) || 0

    const rfBrut = rc + totalReinteg - totalDeduc
    const rfApresDeficits = rfBrut - Math.min(Math.max(0, rfBrut), deficits)
    const rfNet = Math.max(0, rfApresDeficits - amortDiff)
    const isDeficit = rfBrut < 0

    // IS théorique 30% (Art. 56)
    const isTheoriqueRaw = rfNet * 0.30
    // IS minimum — 3 cas (Art. 91 CGI O.-L. 69/009 repris par Loi 23/053)
    // §1 : CA > 0 ET (déficit OU IS théorique < 1% CA) → minimum = 1% du CA (grandes+moyennes, hors petites)
    // §2 : en activité mais CA = 0 → forfait fixe par taille
    // §3 : cessation d'activités sans radiation RCCM → forfait réduit par taille
    let isMinimumRaw = 0
    let casMinimum: 'ca' | 'sansCA' | 'cessation' = 'ca'
    const forfaitSansCA: Record<TailleEntreprise, number> = { grande: 2500000, moyenne: 750000, petite: 30000 }
    const forfaitCessation: Record<TailleEntreprise, number> = { grande: 500000, moyenne: 250000, petite: 30000 }

    if (cessationActivite) {
      // §3 : cessation sans radiation RCCM
      isMinimumRaw = forfaitCessation[tailleEntreprise]
      casMinimum = 'cessation'
    } else if (ca > 0) {
      // §1 : CA réalisé — minimum = MAX(1% du CA, plancher forfaitaire du régime)
      // Car 1% d'un petit CA peut être inférieur au plancher (ex. grande entreprise, CA 50M → 500K < 2,5M)
      isMinimumRaw = Math.max(ca * 0.01, forfaitSansCA[tailleEntreprise])
      casMinimum = 'ca'
    } else {
      // §2 : en activité, CA = 0 → forfait fixe selon taille (Art. 91 §2 CGI)
      isMinimumRaw = forfaitSansCA[tailleEntreprise]
      casMinimum = 'sansCA'
    }
    // IS dû = max(IS théorique, IS minimum)
    const isDuRaw = Math.max(isTheoriqueRaw, isMinimumRaw)
    // Arrondi Art. 150
    const isDu = arrondiIS(isDuRaw)
    const isTheorique = arrondiIS(isTheoriqueRaw)
    const isMinimum = arrondiIS(isMinimumRaw)

    // Réévaluation (Art. 129)
    const pvReeval = parseFloat(reevalPlusValue) || 0
    const tauxReeval = reevalMode === 'libre' ? 0.20 : reevalMode === 'legale' ? 0.05 : 0
    const prelevReeval = arrondiIS(pvReeval * tauxReeval)

    // Acomptes (Art. 57 bis)
    const isN1 = parseFloat(isNmoins1) || 0
    const acompte1 = arrondiIS(isN1 * 0.30)
    const acompte2 = arrondiIS(isN1 * 0.30)
    const acompte3 = arrondiIS(isN1 * 0.20)
    const totalAcomptes = acompte1 + acompte2 + acompte3
    const solde = isDu - totalAcomptes

    // Prélèvements spéciaux
    const factures = parseFloat(facturesNonResidents) || 0
    const remuns = parseFloat(remunsExpatries) || 0
    const capitauxNR = parseFloat(capitauxNonResidents) || 0
    const prelevNR = arrondiIS(factures * 0.14)
    const prelevExp = arrondiIS(remuns * 0.25)
    const prelevCapitauxNR = arrondiIS(capitauxNR * 0.20)

    setRes({
      ca, rc, totalReinteg, totalDeduc, deficits, amortDiff,
      rfBrut, rfApresDeficits, rfNet, isDeficit,
      isTheorique, isMinimum, isDu,
      appliqueMinimum: isMinimumRaw > isTheoriqueRaw,
      casMinimum, tailleEntreprise, cessationActivite,
      reevalMode, pvReeval, tauxReeval, prelevReeval,
      isN1, acompte1, acompte2, acompte3, totalAcomptes, solde,
      factures, remuns, capitauxNR, prelevNR, prelevExp, prelevCapitauxNR,
      defN1: parseFloat(defN1)||0, defN2: parseFloat(defN2)||0, defN3: parseFloat(defN3)||0,
    })
  }

  function reset() {
    setCaHT(''); setExercice(new Date().getFullYear().toString())
    setResultatComptable('')
    setReinteg([{ code: 'RI-01', label: "IS et impôt minimum de l'exercice (Art. 50 §2)", montant: '' }])
    setDeductions([{ code: 'DE-01', label: 'Plus-values non réalisées comptabilisées (Art. 19)', montant: '' }])
    setDefN1(''); setDefN2(''); setDefN3('')
    setAmortDifferes('')
    setReevalMode('none'); setReevalPlusValue('')
    setIsNmoins1('')
    setFacturesNonResidents(''); setRemunsExpatries('')
    setCapitauxNonResidents('')
    setCessationActivite(false); setTailleEntreprise('grande')
    setRes(null)
  }

  const inputCls = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <div className="space-y-4">

      {/* Encadré intro */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 space-y-2">
        <p className="text-xs text-emerald-700 leading-relaxed">
          <strong>Impôt sur les Sociétés (IS)</strong> : impôt sur l'ensemble des bénéfices nets réalisés en RDC
          par les sociétés et personnes morales. Base légale : Art. 1, 3, 56, 57, Loi 23/053 du 30 novembre 2023.
        </p>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <p className="text-xs font-bold text-green-700 mb-0.5">✓ Assujettis à l'IS (Art. 3)</p>
            <p className="text-xs text-green-700 leading-relaxed">
              SA, SARL, SAS (même unipersonnelles) : en raison de leur forme.<br />
              Sociétés coopératives, sociétés de fait, associations momentanées, sociétés lucratives : en raison de leur activité.<br />
              SNC, SCS, sociétés en participation : sur option irrévocable (Art. 3 al. 3).
            </p>
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
            <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Exemptés / Exonérés (Art. 5-6)</p>
            <p className="text-xs text-rose-700 leading-relaxed">
              État, Provinces, ETD, établissements publics sur subventions, ASBL, écoles techniques privées nationales, coopératives agricoles civiles.
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-3">
          <p className="text-xs font-bold text-emerald-700 mb-1">Schéma de calcul</p>
          <div className="font-mono text-xs text-emerald-800 space-y-0.5">
            <p>Résultat comptable</p>
            <p>+ Réintégrations (charges non déductibles : Art. 50)</p>
            <p>− Déductions (produits non imposables : Art. 19, 54, 55)</p>
            <p>= Résultat fiscal brut</p>
            <p>− Déficits reportables N-1/N-2/N-3 (Art. 51)</p>
            <p>− Amortissements différés en période déficitaire (Art. 51 al. 3)</p>
            <p className="border-t border-emerald-300 pt-0.5 font-bold">= Résultat fiscal net imposable</p>
            <p>× 30% = IS théorique (Art. 56)</p>
            <p>CA × 1% = IS minimum (Art. 57)</p>
            <p className="font-bold">IS dû = max(IS théorique, IS minimum)</p>
          </div>
        </div>
      </div>

      {/* Bloc 0 : Infos générales */}
      <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-3">
        <p className="text-xs font-semibold text-foreground">Informations générales</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              Chiffre d'affaires HT (FC)
              <InfoTooltip texte="Le CA HT est utilisé pour calculer l'IS minimum (Art. 57 : 1% du CA). Si CA = 0, l'IS minimum fixe s'applique selon la taille de l'entreprise (Art. 57 al. 2). Plafond de charges déductibles : dons 0,5%, cadeaux pub 2‰, redevances 3,5% du CA HT.=" loi="Art. 57, Loi 23/053" />
            </label>
            <input type="number" min={0} placeholder="0 si pas de CA=" value={caHT}
              onChange={e => { setCaHT(e.target.value); setRes(null) }}
              className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Exercice fiscal</label>
            <input type="number" min={2020} max={2030} value={exercice}
              onChange={e => { setExercice(e.target.value); setRes(null) }}
              className={inputCls} />
          </div>
        </div>
        {/* Taille d'entreprise : classement fiscal */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            Taille de l'entreprise (classement fiscal)
            <InfoTooltip
              texte="Art. 91 CGI (O.-L. 69/009) — IS minimum : §1 : si CA réalisé, minimum = 1% du CA (grandes+moyennes). §2 : si CA = 0 (en activité) → forfait fixe : Grande 2 500 000 FC / Moyenne 750 000 FC / Petite 30 000 FC. §3 : si cessation sans radiation RCCM → forfait : Grande 500 000 FC / Moyenne 250 000 FC / Petite 30 000 FC. | Art. 92bis : le Ministre peut réajuster ces montants par arrêté."
              loi="Art. 91 CGI O.-L. 69/009 ; Art. 57 Loi 23/053"
            />
          </label>
          <div className="flex gap-2">
            {(['grande', 'moyenne', 'petite'] as TailleEntreprise[]).map(t => (
              <button key={t} onClick={() => { setTailleEntreprise(t); setRes(null) }}
                className={cn(
                  'flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium capitalize transition-all',
                  tailleEntreprise === t
                    ? 'bg-emerald-600 border-transparent text-white'
                    : 'border-border bg-card hover:bg-muted/30'
                )}>
                {t === 'grande' ? 'Grande' : t === 'moyenne' ? 'Moyenne' : 'Petite'}
              </button>
            ))}
          </div>
          {/* Cessation d'activités sans radiation RCCM (Art. 91 §3 CGI) */}
          <button
            onClick={() => { setCessationActivite(v => !v); setRes(null) }}
            className={cn(
              'mt-1 w-full flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all text-left',
              cessationActivite
                ? 'bg-orange-100 border-orange-400 text-orange-800'
                : 'border-border bg-card text-muted-foreground hover:bg-muted/30'
            )}
          >
            <span className={cn('w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all',
              cessationActivite ? 'bg-orange-500 border-orange-500 text-white' : 'border-border bg-background'
            )}>{cessationActivite ? '✓' : ''}</span>
            Cessation d’activités sans radiation RCCM (Art. 91 §3 CGI)
          </button>
        </div>
      </div>

      {/* Bloc 1 : Résultat comptable */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
          Résultat comptable (bénéfice = positif / perte = négatif) : FC
          <InfoTooltip texte="Le résultat comptable est l'excédent des produits sur les charges selon les règles comptables OHADA (AUDCIF 2017). Il constitue le point de départ du calcul fiscal. Il est ensuite corrigé par les réintégrations et déductions pour obtenir le résultat fiscal (Art. 9, Loi 23/053)." loi="Art. 9, Loi 23/053" />
        </label>
        <input type="number"
          placeholder="Ex : 50 000 000 (bénéfice) ou -5 000 000 (perte)"
          value={resultatComptable}
          onChange={e => { setResultatComptable(e.target.value); setRes(null) }}
          className={inputCls} />
      </div>

      {/* Bloc 2 : Réintégrations */}
      <SectionSaisieModal
        titre="(+) Réintégrations : Charges non déductibles (Art. 50)"
        couleur="orange"
        rows={reinteg}
        catalogue={REINTAGRATIONS_CATALOGUE}
        onAdd={() => addRow(setReinteg)}
        onAddFromCatalogue={e => { addFromCatalogue(setReinteg, e); setRes(null) }}
        onRemove={i => { removeRow(setReinteg, i); setRes(null) }}
        onUpdate={(i, f, v) => { updateRow(setReinteg, i, f, v); setRes(null) }}
        note="Sélectionner les charges non déductibles depuis le catalogue (Art. 50 + LF 2025), puis saisir le montant. Rappel LF 2025 (Art. 31 mod.) : toute charge engagée uniquement pour réduire l'impôt est également non déductible."
        tooltip={{ texte: "Conditions générales de déductibilité (Art. 20-24, Loi 23/053 mod. LF 2025) : 1. Engagée dans l'intérêt de l'exploitation. 2. Correspondre à une charge effective justifiée. 3. Appuyée de factures normalisées (LF 2025). 4. Se traduire par une diminution de l'actif net. 5. Faite pendant la période imposable. 6. Ne pas avoir été engagée uniquement en vue d'une économie d'impôt (innovation LF 2025).", loi: "Art. 20-24, Loi 23/053 mod. LF 2025" }}
        catalogueOnly
      />

      {/* Bloc 3 : Déductions */}
      <SectionSaisieModal
        titre="(−) Déductions : Produits non imposables (Art. 19, 54, 55)"
        couleur="green"
        rows={deductions}
        catalogue={DEDUCTIONS_CATALOGUE}
        onAdd={() => addRow(setDeductions)}
        onAddFromCatalogue={e => { addFromCatalogue(setDeductions, e); setRes(null) }}
        onRemove={i => { removeRow(setDeductions, i); setRes(null) }}
        onUpdate={(i, f, v) => { updateRow(setDeductions, i, f, v); setRes(null) }}
        note="Sélectionner les produits non imposables depuis le catalogue (Art. 19, 54, 55), puis saisir le montant.="
        catalogueOnly
      />

      {/* Bloc 4 : Déficits reportables */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-2">
        <p className="text-xs font-semibold text-amber-800 flex items-center gap-1">
          (−) Déficits reportables
          <InfoTooltip texte="Les pertes constatées au cours d'un exercice sont déductibles du bénéfice imposable des exercices suivants, jusqu'au troisième exercice qui suit l'exercice déficitaire. Attention : un déficit non déclaré (absence de déclaration après mise en demeure) ne peut plus être déduit (Art. 51, Loi 23/053)." loi="Art. 51, Loi 23/053" />
        </p>
        <p className="text-xs text-amber-700">Pertes des 3 exercices précédents imputables sur le résultat fiscal brut (Art. 51). Saisir 0 si aucun déficit.</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: `Déficit N-1 (${parseInt(exercice)-1})`, val: defN1, set: setDefN1 },
            { label: `Déficit N-2 (${parseInt(exercice)-2})`, val: defN2, set: setDefN2 },
            { label: `Déficit N-3 (${parseInt(exercice)-3})`, val: defN3, set: setDefN3 },
          ].map(d => (
            <div key={d.label}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{d.label}</label>
              <input type="number" min={0} placeholder="0" value={d.val}
                onChange={e => { d.set(e.target.value); setRes(null) }}
                className={inputCls} />
            </div>
          ))}
        </div>
      </div>

      {/* Bloc 5 : Amortissements différés */}
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 space-y-2">
        <p className="text-xs font-semibold text-purple-800 flex items-center gap-1">
          (−) Amortissements différés
          <InfoTooltip texte="Les amortissements régulièrement comptabilisés mais non déduits pendant une période déficitaire sont réputés différés. Ils sont récupérables sur les exercices bénéficiaires suivants sans limitation de durée (à distinguer des déficits ordinaires limités à 3 ans). Condition : amortissements effectivement inscrits en comptabilité et figurant au tableau des amortissements (Art. 51 al. 3 et Art. 52 §3, Loi 23/053)." loi="Art. 51 al. 3, Loi 23/053" />
        </p>
        <p className="text-xs text-purple-700">Amortissements comptabilisés en période déficitaire non encore récupérés (Art. 51 al. 3).</p>
        <input type="number" min={0} placeholder="0" value={amortDifferes}
          onChange={e => { setAmortDifferes(e.target.value); setRes(null) }}
          className={inputCls} />
      </div>

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {res && (
        <ResultatWrap titre="IS : Impôt sur les Sociétés">

          {/* Étape 1 : Passage RC → RF */}
          <EtapeResultat numero={1} titre="Passage résultat comptable → résultat fiscal=">
            <LigneR label="Résultat comptable=" val={formatFC(res.rc)} bold />
            <LigneR signe="+" label="(+) Total réintégrations" val={formatFC(res.totalReinteg)} />
            <LigneR signe="−" label="(−) Total déductions" val={formatFC(res.totalDeduc)} neg />
            <Separateur />
            <LigneR signe="=" label="Résultat fiscal brut=" val={formatFC(res.rfBrut)} bold neg={res.rfBrut < 0} />
            {res.deficits > 0 && (
              <LigneR signe="−" label="(−) Déficits reportables (N-1/N-2/N-3 : Art. 51)" val={formatFC(Math.min(Math.max(0, res.rfBrut), res.deficits))} neg />
            )}
            {res.amortDiff > 0 && (
              <LigneR signe="−" label="(−) Amortissements différés (Art. 51 al. 3)" val={formatFC(res.amortDiff)} neg />
            )}
            {(res.deficits > 0 || res.amortDiff > 0) && <Separateur />}
            <LigneR signe="=" label="Résultat fiscal net imposable=" val={formatFC(res.rfNet)} bold accent={res.rfNet > 0} neg={res.rfNet === 0 && res.rfBrut < 0} />
          </EtapeResultat>

          {/* Étape 2 : Calcul IS */}
          <EtapeResultat numero={2} titre="Calcul de l'IS (Art. 56-57)">
            <LigneR label={`IS théorique : ${formatFC(res.rfNet)} × 30%`} val={formatFC(res.isTheorique)} />
            <div className="flex items-center gap-1">
              <LigneR
                label={
                  res.casMinimum === 'ca'
                    ? `IS minimum : MAX(1% CA = ${formatFC(Math.round(res.ca * 0.01))}, plancher ${res.tailleEntreprise === 'grande' ? '2 500 000' : res.tailleEntreprise === 'moyenne' ? '750 000' : '30 000'} FC) (Art. 91 §1 CGI)`
                    : res.casMinimum === 'sansCA'
                    ? `IS minimum forfaitaire CA=0 — ${res.tailleEntreprise === 'grande' ? 'Grande' : res.tailleEntreprise === 'moyenne' ? 'Moyenne' : 'Petite'} entreprise (Art. 91 §2 CGI)`
                    : `IS forfaitaire — cessation sans radiation RCCM — ${res.tailleEntreprise === 'grande' ? 'Grande' : res.tailleEntreprise === 'moyenne' ? 'Moyenne' : 'Petite'} entreprise (Art. 91 §3 CGI)`
                }
                val={formatFC(res.isMinimum)}
              />
              <InfoTooltip
                texte="Art. 91 CGI (O.-L. 69/009) — IS minimum : §1 : si CA > 0 → minimum = MAX(1% du CA, plancher du régime). Le plancher garantit que l'IS ne peut être inférieur au forfait du régime (ex. grande entreprise : 2 500 000 FC), même si 1% du CA est supérieur. §2 : en activité, CA = 0 → forfait fixe : Grande 2 500 000 FC / Moyenne 750 000 FC / Petite 30 000 FC. §3 : cessation sans radiation RCCM → forfait : Grande 500 000 FC / Moyenne 250 000 FC / Petite 30 000 FC. L'impôt forfaitaire ne fait pas obstacle au pouvoir de recherche de l'Administration fiscale. | Art. 92bis : le Ministre peut réajuster ces montants par arrêté."
                loi="Art. 91 CGI O.-L. 69/009"
              />
            </div>
            <Separateur />
            {res.appliqueMinimum ? (
              <div className="flex items-start gap-1.5 mt-1">
                <div className="flex-1">
                  <LigneR signe="=" label="IS dû = IS minimum (IS théorique < IS minimum)" val={formatFC(res.isDu)} bold accent />
                </div>
                <InfoTooltip texte="L'IS minimum s'applique lorsque le résultat est déficitaire ou que l'IS théorique (30% du bénéfice) est inférieur à l'IS minimum. Il garantit une contribution minimale au Trésor même en cas de perte (Art. 57, Loi 23/053)." loi="Art. 57, Loi 23/053" />
              </div>
            ) : (
              <LigneR signe="=" label="IS dû = IS théorique (30%)" val={formatFC(res.isDu)} bold accent />
            )}
            <p className="text-xs text-muted-foreground mt-1">Arrondi selon Art. 150 : tranche ≥ 50 FC → centaine supérieure, sinon centaine inférieure.</p>
          </EtapeResultat>

          {res.isDeficit && res.rfNet === 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs font-semibold text-amber-700">Résultat fiscal déficitaire</p>
              <p className="text-xs text-amber-600 mt-0.5">Le déficit ({formatFC(Math.abs(res.rfBrut))} FC) peut être reporté sur les 3 exercices suivants (Art. 51). Si le CA déclaré est positif, l'IS minimum (1% du CA) s'applique.</p>
            </div>
          )}
          {res.casMinimum === 'sansCA' && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <p className="text-xs font-semibold text-blue-700">CA = 0 : impôt forfaitaire appliqué (Art. 91 §2 CGI)</p>
              <p className="text-xs text-blue-600 mt-0.5">
                L'entreprise est en activité mais n'a réalisé aucun chiffre d'affaires. L'Art. 91 §2 CGI (O.-L. 69/009) impose un forfait fixe :
                Grande entreprise : <strong>2 500 000 FC</strong> / Moyenne : <strong>750 000 FC</strong> / Petite : <strong>30 000 FC</strong>.
                Prorata : 1/12e par mois d'activité si début après janvier. | Art. 92bis : le Ministre peut réajuster ces montants par arrêté.
              </p>
            </div>
          )}
          {res.casMinimum === 'cessation' && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
              <p className="text-xs font-semibold text-orange-700">Cessation sans radiation RCCM : forfait applicable (Art. 91 §3 CGI)</p>
              <p className="text-xs text-orange-600 mt-0.5">
                L'entreprise a cessé ses activités sans s'être fait radier du RCCM (Art. 97 OHADA). L'Art. 91 §3 CGI impose un forfait :
                Grande : <strong>500 000 FC</strong> / Moyenne : <strong>250 000 FC</strong> / Petite : <strong>30 000 FC</strong>.
                Ce forfait ne fait pas obstacle au pouvoir de recherche et de recoupement de l'Administration fiscale. | Art. 92bis : montants réajustables par arrêté ministériel.
              </p>
            </div>
          )}

          <BoxFinal label="IS dû (exercice courant)" val={formatFC(res.isDu)} />
        </ResultatWrap>
      )}

      {/* Bloc Réévaluation : pliable */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowReeval(v => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 text-xs font-semibold text-slate-700"
        >
          <span className="flex items-center gap-2">
            Réévaluation de l'actif immobilisé (Art. 129)
            <InfoTooltip texte="La réévaluation est libre (initiative de l'entreprise) ou légale (imposée par arrêté ministériel). En cas de réévaluation, la plus-value dégagée est soumise à un prélèvement libératoire : 20% pour la réévaluation libre, 5% pour la réévaluation légale. Cet impôt est libératoire : il ne s'ajoute pas à l'IS mais le remplace pour la fraction réévaluée (Art. 129, Loi 23/053)." loi="Art. 129, Loi 23/053" />
          </span>
          <span className="text-xs opacity-60">{showReeval ? '▲ Masquer' : '▼ Afficher'}</span>
        </button>
        {showReeval && (
          <div className="p-3 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              {([
                { id: 'none',   label: 'Pas de réévaluation' },
                { id: 'libre',  label: 'Réévaluation libre (20%)' },
                { id: 'legale', label: 'Réévaluation légale (5%)' },
              ] as const).map(m => (
                <button key={m.id} onClick={() => { setReevalMode(m.id); setRes(null) }}
                  className={cn(
                    'flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all',
                    reevalMode === m.id
                      ? 'bg-slate-700 border-transparent text-white'
                      : 'border-border bg-card hover:bg-muted/30'
                  )}>
                  {m.label}
                </button>
              ))}
            </div>
            {reevalMode !== 'none' && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Plus-value de réévaluation (FC)
                </label>
                <input type="number" min={0} placeholder="Montant de la plus-value réévaluée" value={reevalPlusValue}
                  onChange={e => { setReevalPlusValue(e.target.value); setRes(null) }}
                  className={inputCls} />
              </div>
            )}
            {res && reevalMode !== 'none' && res.pvReeval > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 space-y-1">
                <p className="text-xs font-semibold text-slate-700">Prélèvement libératoire réévaluation</p>
                <LigneR label={`Plus-value réévaluée × ${reevalMode === 'libre' ? '20%' : '5%'}`} val={formatFC(res.prelevReeval)} bold accent />
                <p className="text-xs text-muted-foreground">Ce prélèvement est libératoire : il ne s'ajoute pas à l'IS de l'exercice (Art. 129).</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bloc Acomptes provisionnels : pliable */}
      <div className="rounded-xl border border-blue-200 overflow-hidden">
        <button
          onClick={() => setShowAcomptes(v => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-50 text-xs font-semibold text-blue-700"
        >
          <span className="flex items-center gap-2">
            Acomptes provisionnels (Art. 57 bis)
            <InfoTooltip texte="L'IS est payé par acomptes provisionnels calculés sur la base de l'IS de l'exercice précédent (N-1). Trois acomptes : 30% avant le 25 juillet, 30% avant le 25 septembre, 20% avant le 25 novembre (dates modifiées par Art. 60 LF 2025). Le solde (IS dû − total acomptes versés) est payé lors du dépôt de la déclaration annuelle au plus tard le 30 avril (Art. 57 bis, Loi 23/053 mod. LF 2025)." loi="Art. 57 bis, Loi 23/053 mod. Art. 60 LF 2025, conf. Art. 31 LF 2026" />
          </span>
          <span className="text-xs opacity-60">{showAcomptes ? '▲ Masquer' : '▼ Afficher'}</span>
        </button>
        {showAcomptes && (
          <div className="p-3 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">IS de l'exercice précédent N-1 (FC)</label>
              <input type="number" min={0} placeholder="IS payé l'année dernière" value={isNmoins1}
                onChange={e => { setIsNmoins1(e.target.value); setRes(null) }}
                className={inputCls} />
            </div>
            {res && res.isN1 > 0 && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-2.5 space-y-1.5">
                <LigneR label={`1er acompte (avant 25 juillet ${exercice}) : IS N-1 × 30%`} val={formatFC(res.acompte1)} />
                <LigneR label={`2e acompte (avant 25 sept. ${exercice}) : IS N-1 × 30%`} val={formatFC(res.acompte2)} />
                <LigneR label={`3e acompte (avant 25 nov. ${exercice}) : IS N-1 × 20%`} val={formatFC(res.acompte3)} />
                <Separateur />
                <LigneR label="Total acomptes versés (80% IS N-1)" val={formatFC(res.totalAcomptes)} bold />
                <LigneR
                  label={`Solde à payer (30 avril ${parseInt(exercice)+1})`}
                  val={formatFC(Math.abs(res.solde))}
                  bold
                  accent={res.solde > 0}
                  neg={res.solde < 0}
                />
                {res.solde < 0 && (
                  <p className="text-xs text-emerald-600">Excédent d'acomptes : crédit imputable sur obligations fiscales futures (Art. 57 ter).</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bloc Prélèvements spéciaux : pliable */}
      <div className="rounded-xl border border-rose-200 overflow-hidden">
        <button
          onClick={() => setShowPrelevements(v => !v)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-rose-50 text-xs font-semibold text-rose-700"
        >
          <span>Autres prélèvements (Titre V)</span>
          <span className="text-xs opacity-60">{showPrelevements ? '▲ Masquer' : '▼ Afficher'}</span>
        </button>
        {showPrelevements && (
          <div className="p-3 space-y-4">
            {/* Prélèvement non-résidents */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                Prélèvement sur prestataires non-résidents (Art. 144)
                <InfoTooltip texte="Prélèvement de 14% sur le montant brut des factures de prestations de services fournies par des personnes physiques ou morales non établies en RDC. Retenu à la source par le bénéficiaire des services. Déclaration au plus tard le 15 du mois suivant le paiement (Art. 22 bis, Loi procédures fiscales)." loi="Art. 144, Loi 23/053" />
              </p>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Montant brut des factures (FC)</label>
              <input type="number" min={0} placeholder="Factures de prestataires étrangers" value={facturesNonResidents}
                onChange={e => { setFacturesNonResidents(e.target.value); setRes(null) }}
                className={inputCls} />
              {res && res.factures > 0 && (
                <LigneR label={`${formatFC(res.factures)} × 14%`} val={formatFC(res.prelevNR)} bold accent />
              )}
            </div>
            {/* Prélèvement expatriés */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                Prélèvement exceptionnel personnel expatrié (Art. 148)
                <InfoTooltip texte="Prélèvement de 25% sur le montant brut des rémunérations versées au personnel expatrié. Dû mensuellement, versé dans les 15 jours suivant le mois de paiement des rémunérations (Art. 19, Loi procédures fiscales). Ce prélèvement n'est pas déductible de l'IS (Art. 50 §2)." loi="Art. 148, Loi 23/053" />
              </p>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Rémunérations brutes expatriés (FC)</label>
              <input type="number" min={0} placeholder="Salaires bruts du personnel expatrié" value={remunsExpatries}
                onChange={e => { setRemunsExpatries(e.target.value); setRes(null) }}
                className={inputCls} />
              {res && res.remuns > 0 && (
                <LigneR label={`${formatFC(res.remuns)} × 25%`} val={formatFC(res.prelevExp)} bold accent />
              )}
            </div>
            {/* Art. 149 quater LF 2026 : Prélèvement capitaux mobiliers non-résidents */}
            <div className="space-y-1.5 rounded-lg border border-rose-200 bg-rose-50/50 p-2.5">
              <p className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                Prélèvement capitaux mobiliers non-résidents 20% (Art. 149 quater)
                <InfoTooltip
                  texte="Art. 149 quater introduit par la Loi de Finances 2026 (Loi n°25/060 du 29 déc. 2025) : prélèvement libératoire de 20% sur les revenus de capitaux mobiliers versés à des personnes physiques ou morales non résidentes en RDC (dividendes, intérêts, redevances). Retenu à la source par le débiteur résident. Versé au Trésor au plus tard le 15 du mois suivant. Ce prélèvement est libératoire et ne s'impute pas sur l'IS."
                  loi="Art. 149 quater : LF 2026 (Loi n°25/060 du 29/12/2025)"
                />
              </p>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Revenus mobiliers versés à des non-résidents (FC)</label>
              <input type="number" min={0} placeholder="Dividendes, intérêts versés à des non-résidents"
                value={capitauxNonResidents}
                onChange={e => { setCapitauxNonResidents(e.target.value); setRes(null) }}
                className={inputCls} />
              {res && res.capitauxNR > 0 && (
                <LigneR label={`${formatFC(res.capitauxNR)} × 20% (Art. 149 quater)`} val={formatFC(res.prelevCapitauxNR)} bold accent />
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

function SimulateurIRL() {
  const [loyerMensuel, setLoyerMensuel] = useState('')
  const [nbMois, setNbMois] = useState('12')
  const [res, setRes] = useState<any>(null)

  function calculer() {
    const loyer = parseFloat(loyerMensuel) || 0
    const mois = parseInt(nbMois) || 12
    const totalBrut = loyer * mois
    const irlTotal = totalBrut * 0.22
    const retenuLocataire = totalBrut * 0.20
    const soldeProprietaire = totalBrut * 0.02
    setRes({ loyer, mois, totalBrut, irlTotal, retenuLocataire, soldeProprietaire })
  }

  function reset() { setLoyerMensuel(''); setNbMois('12'); setRes(null) }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
        <p className="text-xs text-blue-700">
          Taux global 22% (province de Kinshasa) : 20% retenu par le locataire + 2% payé par le propriétaire au 1er février de l'année suivante.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Loyer mensuel (FC)</label>
          <input type="number" placeholder="Ex : 1 500 000" value={loyerMensuel}
            onChange={e => setLoyerMensuel(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nombre de mois</label>
          <input type="number" min={1} max={12} value={nbMois}
            onChange={e => setNbMois(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>
      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>
      {res && (
        <ResultatWrap titre="IRL : Revenus Locatifs (22%)">
          <EtapeResultat numero={1} titre="Base de calcul=">
            <LigneR label={`Loyer mensuel × ${res.mois} mois`} val={formatFC(res.totalBrut)} />
          </EtapeResultat>
          <EtapeResultat numero={2} titre="Répartition de l'IRL">
            <LigneR label="IRL total (22%)" val={formatFC(res.irlTotal)} bold />
            <LigneR label="Retenu par le locataire (20%) : dans les 10 jours=" val={formatFC(res.retenuLocataire)} />
            <LigneR label="Solde propriétaire (2%) : au 1er février" val={formatFC(res.soldeProprietaire)} />
          </EtapeResultat>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <BoxFinal label="Retenu locataire (20%)" val={formatFC(res.retenuLocataire)} />
            <BoxFinal label="Dû propriétaire (2%)" val={formatFC(res.soldeProprietaire)} credit />
          </div>
          <BoxFinal label="IRL total (22%)" val={formatFC(res.irlTotal)} />
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TVA → Composant importé depuis SimulateurTVA.tsx (10 onglets pédagogiques)

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

// Onglets niveau 1 (impôts principaux)
const ONGLETS_PRINCIPAUX = [
  { id: 'irpp',       label: 'IRPP',        sublabel: '6 catégories',     icon: Users,     color: 'blue' },
  { id: 'is',         label: 'IS',          sublabel: 'Impôt Sociétés',   icon: Building2, color: 'emerald' },
  { id: 'tva',        label: 'TVA',         sublabel: 'Déclaration',      icon: Percent,   color: 'rose' },
  { id: 'irl',        label: 'Autres imp.', sublabel: 'ETD',              icon: Receipt,   color: 'amber' },
  { id: 'procedures', label: 'Procédures fiscales',  sublabel: 'Loi 004/2003',     icon: Scale,     color: 'purple' },
]

// Sous-onglets IRPP (6 catégories) : Loi IRPP 23/053 du 30/11/2023
const SOUS_ONGLETS_IRPP = [
  {
    id: 'irpp_cat1',
    label: 'Cat. 1',
    sublabel: 'Revenus salariaux',
    icon: Users,
    color: 'blue',
    desc: 'Traitements, salaires, gratifications, indemnités, pensions et rentes viagères',
    definition: "Comprend les traitements, salaires, gratifications, indemnités, pensions et rentes viagères perçus par toute personne physique en rémunération d'un travail salarié.",
  },
  {
    id: 'irpp_cat2',
    label: 'Cat. 2',
    sublabel: 'Bénéf. ind. & comm.',
    icon: Coins,
    color: 'indigo',
    desc: "Bénéfices industriels, commerciaux, immobiliers et artisanaux tirés d'activités exercées à titre individuel=",
    definition: "Bénéfices industriels, commerciaux, immobiliers et artisanaux tirés d'activités exercées à titre individuel. Concerne les entrepreneurs individuels, commerçants, artisans et propriétaires d'immeubles en exploitation.=",
  },
  {
    id: 'irpp_cat3',
    label: 'Cat. 3',
    sublabel: 'Bénéf. non comm.',
    icon: Briefcase,
    color: 'violet',
    desc: 'Bénéfices des professions libérales, artistiques ou intellectuelles',
    definition: "Bénéfices non commerciaux issus des professions libérales (médecins, avocats, notaires…), artistiques (musiciens, peintres…) ou intellectuelles (consultants, formateurs…) exercées à titre individuel.=",
  },
  {
    id: 'irpp_cat4',
    label: 'Cat. 4',
    sublabel: 'Revenus agricoles',
    icon: Wheat,
    color: 'lime',
    desc: "Revenus provenant de l'exploitation de terres ou d'élevages à titre lucratif=",
    definition: "Revenus agricoles provenant de l'exploitation de terres cultivées ou d'élevages exercés à titre lucratif par une personne physique. Incluent les productions végétales, animales et les activités annexes.=",
  },
  {
    id: 'irpp_cat5',
    label: 'Cat. 5',
    sublabel: 'Capitaux mobiliers',
    icon: TrendingUp,
    color: 'teal',
    desc: "Produits d'actions, d'obligations, de dépôts, de prêts ou de titres financiers=",
    definition: "Revenus de capitaux mobiliers : produits d'actions (dividendes), d'obligations, intérêts de dépôts ou de prêts, et revenus de titres financiers. Soumis à une retenue à la source libératoire de 20%.",
  },
  {
    id: 'irpp_cat6',
    label: 'Cat. 6',
    sublabel: 'Plus-values',
    icon: BarChart2,
    color: 'orange',
    desc: 'Plus-values réalisées à la vente de biens mobiliers ou immobiliers hors activité professionnelle',
    definition: "Plus-values de cession de biens réalisées à l'occasion de la vente de biens mobiliers ou immobiliers détenus hors activité professionnelle (résidence secondaire, terrain, véhicule, titres non professionnels…).",
  },
]

// Pour compatibilité affichage description
const ONGLETS = [
  { id: 'irpp_cat1', label: 'IRPP', sublabel: 'Cat. 1 : Revenus salariaux et assimilés',             icon: Users,     color: 'blue',    desc: 'Traitements, salaires, gratifications, indemnités, pensions et rentes viagères' },
  { id: 'irpp_cat2', label: 'IRPP', sublabel: 'Cat. 2 : Bénéfices industr. & comm.',                 icon: Coins,     color: 'indigo',  desc: "Bénéfices industriels, commerciaux, immobiliers et artisanaux tirés d'activités individuelles=" },
  { id: 'irpp_cat3', label: 'IRPP', sublabel: 'Cat. 3 : Bénéfices non commerciaux',                  icon: Briefcase, color: 'violet',  desc: 'Bénéfices des professions libérales, artistiques ou intellectuelles' },
  { id: 'irpp_cat4', label: 'IRPP', sublabel: 'Cat. 4 : Revenus agricoles',                          icon: Wheat,     color: 'lime',    desc: "Revenus provenant de l'exploitation de terres ou d'élevages à titre lucratif=" },
  { id: 'irpp_cat5', label: 'IRPP', sublabel: 'Cat. 5 : Revenus de capitaux mobiliers',              icon: TrendingUp,color: 'teal',    desc: "Produits d'actions, d'obligations, de dépôts, de prêts ou de titres financiers=" },
  { id: 'irpp_cat6', label: 'IRPP', sublabel: 'Cat. 6 : Plus-values de cession de biens',            icon: BarChart2, color: 'orange',  desc: 'Plus-values réalisées à la vente de biens mobiliers ou immobiliers hors activité professionnelle' },
  { id: 'is',        label: 'IS',   sublabel: 'Impôt sur les Sociétés',                              icon: Building2, color: 'emerald', desc: 'Passage résultat comptable → fiscal (réintégrations & déductions) → IS 30%' },
  { id: 'irl',       label: 'Autres impôts',  sublabel: 'Impôts rétrocédés aux ETD',                      icon: Receipt,   color: 'amber',   desc: 'IRL (22%) · IF · IV · TSMC : impôts réels provinciaux et locaux' },
  { id: 'tva',        label: 'TVA',        sublabel: 'Taxe sur la Valeur Ajoutée',                          icon: Percent,   color: 'rose',    desc: 'TVA collectée − TVA déductible, taux normal 16%, taux réduits 1%/5% (LF 2026)' },
  { id: 'procedures', label: 'Procédures fiscales', sublabel: 'Obligations, contrôle, recouvrement',                    icon: Scale,     color: 'purple',  desc: 'Déclarations, vérification, AMR, pénalités et recours : Loi n°004/2003 du 13 mars 2003' },
]

const COLOR_MAP: Record<string, string> = {
  blue:    'border-blue-500 bg-blue-500 text-white',
  indigo:  'border-indigo-500 bg-indigo-500 text-white',
  violet:  'border-violet-500 bg-violet-500 text-white',
  fuchsia: 'border-fuchsia-500 bg-fuchsia-500 text-white',
  emerald: 'border-emerald-500 bg-emerald-500 text-white',
  amber:   'border-amber-500 bg-amber-500 text-white',
  rose:    'border-rose-500 bg-rose-500 text-white',
  lime:    'border-lime-500 bg-lime-500 text-white',
  teal:    'border-teal-500 bg-teal-500 text-white',
  orange:  'border-orange-500 bg-orange-500 text-white',
  purple:  'border-purple-500 bg-purple-500 text-white',
  slate:   'border-slate-500 bg-slate-500 text-white',
}

const COLOR_LIGHT: Record<string, string> = {
  blue:    'text-blue-600',
  indigo:  'text-indigo-600',
  violet:  'text-violet-600',
  emerald: 'text-emerald-600',
  amber:   'text-amber-600',
  rose:    'text-rose-600',
  lime:    'text-lime-600',
  teal:    'text-teal-600',
  orange:  'text-orange-600',
  purple:  'text-purple-600',
}

// Placeholder pour catégories à venir
// ───────────────────────────────────────────────────────────────────────────────
// CAT. 3 : BNC : Bénéfices des professions non commerciales et revenus assimilés
// Art. 92-101 + Art. 90, Loi 23/053
// ───────────────────────────────────────────────────────────────────────────────
function Cat3BNC() {
  const [recettes, setRecettes] = useState<{label: string; montant: string}[]>([])
  const [charges, setCharges] = useState<{label: string; montant: string}[]>([])
  const [cotisationsSociales, setCotisationsSociales] = useState('')
  const [fraisMedicaux, setFraisMedicaux] = useState('')
  const [beneficeN1, setBeneficeN1] = useState('')
  const [nbPersonnesCharge, setNbPersonnesCharge] = useState('0')
  const [showDeductions, setShowDeductions] = useState(false)
  const [res, setRes] = useState<any>(null)

  const RECETTES_CAT = [
    { label: 'Honoraires professionnels' },
    { label: 'Acomptes et provisions effectivement encaissés' },
    { label: 'Honoraires rétro-cédés par des confrères' },
    { label: 'Gains sur cession d\'actifs professionnels' },
    { label: 'Indemnités de cessation et transfert de clientèle' },
    { label: 'Remboursements de frais professionnels' },
    { label: 'Intérêts de créances professionnelles' },
    { label: 'Produits financiers (société civile et GIE)' },
    { label: 'Produits de placement de fonds reçus en dépôts' },
    { label: 'Subventions reçues liées à l\'activité' },
    { label: 'Prestations règlées sous forme de dons ou cadeaux (si rémunération)' },
    { label: 'Droits d\'auteur (artistes, écrivains, compositeurs, héritiers)' },
    { label: 'Redevances de propriété intellectuelle (brevets, marques, œuvres)' },
    { label: 'Revenus non salariaux d\'artistes et sportifs' },
    { label: 'Produits d\'opérations de bourse réalisés par des particuliers' },
    { label: 'Recettes d\'organisateurs de spectacles' },
  ]

  const CHARGES_CAT = [
    { label: 'Loyers des locaux professionnels' },
    { label: 'Frais généraux d\'exploitation' },
    { label: 'Rémunérations d\'assistance à des personnes à l\'étranger' },
    { label: 'Dépenses de formation et de recherche' },
    { label: 'Frais de stages, colloques et séminaires (avec justificatifs)' },
    { label: 'Impôts et taxes (hors IRPP)' },
    { label: 'Amortissements des équipements professionnels' },
    { label: 'Charges du personnel (collaborateurs, sous-traitants)' },
    { label: 'Frais de déplacement professionnels' },
    { label: 'Abonnements à des bases documentaires' },
    { label: 'Frais de communication (téléphone, internet : part professionnelle)' },
  ]

  const CHARGES_NON_DEDUCTIBLES = [
    'Dépenses sans lien établi avec la profession (Art. 99)',
    'Dépenses somptuaires (Art. 99)',
    'Impôt sur le Revenu des Personnes Physiques (IRPP) lui-même',
  ]

  function calculer() {
    const totalRecettes = recettes.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const totalCharges  = charges.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const beneficeBrut  = totalRecettes - totalCharges
    const beneficeAvantDed = Math.max(0, beneficeBrut)

    const cotSoc = parseFloat(cotisationsSociales) || 0
    const fraisMed = parseFloat(fraisMedicaux) || 0
    const bnN1 = parseFloat(beneficeN1) || 0
    const plafondCotSoc = bnN1 * 0.20
    const cotSocAdmise = Math.min(cotSoc, plafondCotSoc)
    const beneficeNet = Math.max(0, beneficeAvantDed - cotSocAdmise - fraisMed)

    // Arrondi au millier inférieur (Art. 118)
    const beneficeNetArrondi = Math.floor(beneficeNet / 1000) * 1000
    const t1 = 162000 * 12   // 1 944 000
    const t2 = 1800000 * 12  // 21 600 000
    const t3 = 3600000 * 12  // 43 200 000
    let impotBareme = 0
    if (beneficeNetArrondi <= t1)       impotBareme = beneficeNetArrondi * 0.03
    else if (beneficeNetArrondi <= t2)  impotBareme = t1 * 0.03 + (beneficeNetArrondi - t1) * 0.15
    else if (beneficeNetArrondi <= t3)  impotBareme = t1 * 0.03 + (t2 - t1) * 0.15 + (beneficeNetArrondi - t2) * 0.30
    else                                 impotBareme = t1 * 0.03 + (t2 - t1) * 0.15 + (t3 - t2) * 0.30 + (beneficeNetArrondi - t3) * 0.40
    // Réduction personnes à charge Art. 123 : 2% par personne, max 9, inapplicable si revenu > t3
    // Assise sur l'IRPP brut (barème), AVANT tout plafonnement (ordre : barème → réduction → plafond)
    const nbPC = Math.min(Math.max(0, parseInt(nbPersonnesCharge) || 0), 9)
    const reductionPC = beneficeNetArrondi <= t3 ? impotBareme * 0.02 * nbPC : 0
    const impotApresReduction = Math.max(0, impotBareme - reductionPC)
    // Plafond 30% (Art. 118), appliqué APRÈS la réduction pour charges de famille
    const plafond30 = beneficeNetArrondi * 0.30
    const plafonne = impotApresReduction > plafond30
    let impotApresPC = plafonne ? plafond30 : impotApresReduction
    // Impôt minimum 1% des recettes (Art. 122)
    const minimum122 = totalRecettes * 0.01
    const minimumApplique = impotApresPC < minimum122 && minimum122 > 0
    const impot = minimumApplique ? minimum122 : impotApresPC

    setRes({ totalRecettes, totalCharges, beneficeBrut, beneficeAvantDed, cotSoc, cotSocAdmise, plafondCotSoc, bnN1, fraisMed, beneficeNet, beneficeNetArrondi, impotBareme, plafond30, plafonne, nbPC, reductionPC, impotApresPC, minimum122, minimumApplique, impot })
  }

  function reset() {
    setRes(null); setRecettes([]); setCharges([])
    setCotisationsSociales(''); setFraisMedicaux(''); setBeneficeN1(''); setNbPersonnesCharge('0')
  }

  function removeRow(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, i: number) {
    set(p => p.filter((_, idx) => idx !== i))
  }
  function updateMontant(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, i: number, v: string) {
    set(p => p.map((r, idx) => idx === i ? { ...r, montant: v } : r))
  }
  function addFromList(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, label: string) {
    set(p => {
      if (p.some(r => r.label === label)) return p
      return [...p, { label, montant: '' }]
    })
  }

  return (
    <div className="space-y-4">

      {/* Bandeau encadré Cat. 3 */}
      <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 space-y-2">
        <p className="text-xs text-violet-700 leading-relaxed">
          <strong>Bénéfices des professions non commerciales et revenus assimilés</strong> : activités intellectuelles, libérales ou artistiques exercées en toute indépendance.
          Base imposable : recettes effectivement perçues − dépenses professionnelles (Art. 93, Loi 23/053).
        </p>
        <div className="rounded-lg border border-violet-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-violet-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 3 : Professions libérales indépendantes</p>
              <p className="text-xs text-green-700 leading-relaxed">
                Médecins, avocats, experts-comptables, architectes, ingénieurs, notaires, artistes, consultants, formateurs, traducteurs, chercheurs... Toute activité lucrative autonome reposant sur une compétence personnelle (Art. 92).
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Hors Cat. 3</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Si l'activité implique la vente de biens ou la production matérielle :{' '}
                <strong>Cat. 2 (BIC).</strong>
                <br />
                Si un lien de subordination existe :{' '}
                <strong>Cat. 1 (Salaires).</strong>
              </p>
            </div>
          </div>
          <p className="text-xs text-violet-600 mt-1.5 italic">Pas de seuil de CA : toute profession libérale indépendante à caractère lucratif est concernée, quel que soit le montant des recettes.</p>
        </div>
      </div>

      {/* Recettes */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <p className="text-xs font-semibold text-indigo-700">Recettes professionnelles</p>
          <InfoTooltip
            texte="Tous les produits effectivement encaissés dans le cadre de l'activité : honoraires, provisions et acomptes encaissés, gains sur cessions d'actifs professionnels, indemnités de cessation ou de transfert de clientèle, remboursements de frais, intérêts de créances, subventions liées à l'activité."
            loi="Art. 94 et 96, Loi 23/053"
          />
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-3 space-y-2">
          {recettes.map((r, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground/80 truncate">
                {r.label}
              </div>
              <div className="flex gap-2 sm:w-auto">
                <input
                  value={r.montant}
                  onChange={e => updateMontant(setRecettes, i, e.target.value)}
                  type="number"
                  placeholder="Montant FC="
                  className="flex-1 sm:w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={() => removeRow(setRecettes, i)} className="text-muted-foreground hover:text-destructive transition-colors text-xs px-1">×</button>
              </div>
            </div>
          ))}
          <details className="group">
            <summary className="cursor-pointer text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
              <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span> Catalogue des recettes (Art. 94)
            </summary>
            <div className="mt-2 space-y-1 pl-3">
              {RECETTES_CAT.map((c, i) => (
                <button key={i} onClick={() => addFromList(setRecettes, c.label)}
                  className="block w-full text-left text-xs text-foreground hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1 rounded transition-colors duration-200">
                  + {c.label}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* Séparateur */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Charges déductibles</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Charges */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <p className="text-xs font-semibold text-rose-700">Dépenses professionnelles déductibles</p>
          <InfoTooltip
            texte="Dépenses professionnelles déductibles (Art. 98) : loyers, frais généraux, rémunérations d'assistance à l'étranger, formation, stages et colloques, impôts et taxes (hors IRPP), amortissements, charges du personnel. Dépenses mixtes : 50% admis à défaut de justificatif précis (Art. 99). Non déductibles : dépenses sans lien avec la profession et dépenses somptuaires (Art. 99)."
            loi="Art. 98-99, Loi 23/053"
          />
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-3 space-y-2">
          {charges.map((r, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground/80 truncate">
                {r.label}
              </div>
              <div className="flex gap-2 sm:w-auto">
                <input
                  value={r.montant}
                  onChange={e => updateMontant(setCharges, i, e.target.value)}
                  type="number"
                  placeholder="Montant FC="
                  className="flex-1 sm:w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={() => removeRow(setCharges, i)} className="text-muted-foreground hover:text-destructive transition-colors text-xs px-1">×</button>
              </div>
            </div>
          ))}
          <details className="group">
            <summary className="cursor-pointer text-xs text-rose-600 font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
              <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span> Catalogue des charges déductibles (Art. 98)
            </summary>
            <div className="mt-2 space-y-1 pl-3">
              {CHARGES_CAT.map((c, i) => (
                <button key={i} onClick={() => addFromList(setCharges, c.label)}
                  className="block w-full text-left text-xs text-foreground hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors duration-200">
                  + {c.label}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50/60 p-2">
              <p className="text-xs font-bold text-red-600 mb-1">✕ Charges NON déductibles (Art. 99)</p>
              {CHARGES_NON_DEDUCTIBLES.map((c, i) => (
                <p key={i} className="text-xs text-red-600">• {c}</p>
              ))}
            </div>
          </details>
        </div>
      </div>

      {/* Déductions spécifiques Art. 90 */}
      <div>
        <button onClick={() => setShowDeductions(!showDeductions)}
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200">
          <span className={cn('transition-transform duration-300 ease-out inline-block', showDeductions && 'rotate-90')}>▶</span>
          Déductions spécifiques (Art. 90)
          <InfoTooltip
            texte="Déductions complémentaires (Art. 90) : (1) Cotisations à une caisse de prévoyance, assurance maladie ou retraite : dans la limite de 20% du bénéfice net. (2) Frais médicaux du contribuable, conjoint et enfants à charge : sur justificatifs.="
            loi="Art. 90, Loi 23/053"
          />
        </button>
        {showDeductions && (
          <div className="mt-2 rounded-xl border border-border bg-muted/30 p-3 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                Bénéfice net N−1 (FC) : base du plafond
                <InfoTooltip texte="Le plafond de déduction des cotisations sociales volontaires est calculé sur le bénéfice net de l'année précédente (N−1), conformément à l'Art. 90. Indiquez ici le bénéfice net de l'année dernière." loi="Art. 90, Loi 23/053" />
              </label>
              <input type="number" min={0} placeholder="Bénéfice net année précédente" value={beneficeN1}
                onChange={e => setBeneficeN1(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                Cotisations sociales volontaires (FC)
                <InfoTooltip texte="Cotisations versées pour constitution d'une rente viagère, pension, assurance maladie ou chômage. Déductibles dans la limite de 20% du bénéfice net de l'année précédente (Art. 90)." loi="Art. 90, Loi 23/053" />
              </label>
              <input type="number" min={0} placeholder="0" value={cotisationsSociales}
                onChange={e => setCotisationsSociales(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                Frais médicaux (FC)
                <InfoTooltip texte="Frais médicaux engagés pour le contribuable, son conjoint ou ses enfants à charge. Doivent être effectivement payés et justifiés par des pièces probantes (factures, reçus, prescriptions médicales)." loi="Art. 90, Loi 23/053" />
              </label>
              <input type="number" min={0} placeholder="0" value={fraisMedicaux}
                onChange={e => setFraisMedicaux(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                Personnes à charge
                <InfoTooltip
                  texte="Réduction de 2% de l'IRPP par personne à charge, dans la limite de 9 personnes (Art. 123). Sont admis : conjoint légal, enfants célibataires reconnus ou adoptés, ascendants des deux conjoints vivant au foyer. Condition : revenu propre de la personne à charge ≤ 1 944 000 FC/an. ⚠️ Inapplicable si revenu imposable > 43 200 000 FC/an. Pourquoi ? Au-delà de ce seuil (3e tranche du barème, Art. 118), le législateur considère que le contribuable dispose d'une capacité financière suffisante pour assumer ses charges de famille sans nécessiter un allègement fiscal. Cette réduction vise à protéger les foyers à revenus modestes et moyens : l'accorder aux hauts revenus irait à l'encontre du principe de justice fiscale (Art. 123 à 125, Loi 23/053)."
                  loi="Art. 123 à 125, Loi 23/053"
                />
              </label>
              <input type="number" min={0} max={9} placeholder="0" value={nbPersonnesCharge}
                onChange={e => setNbPersonnesCharge(e.target.value)}
                disabled={!!res && res.beneficeNetArrondi > 43200000}
                className={"w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 " + (res && res.beneficeNetArrondi > 43200000 ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed=" : "bg-background")} />
              {res && res.beneficeNetArrondi > 43200000
                ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : inapplicable : revenu imposable &gt; 43 200 000 FC (au-delà de la 3e tranche)</p>
                : <p className="text-xs text-muted-foreground mt-1">Maximum 9 personnes : réduction inapplicable si revenu imposable &gt; 43 200 000 FC</p>
              }
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {res && (
        <ResultatWrap titre="IRPP : Cat. 3 : Bénéfices non commerciaux=">

          <EtapeResultat numero={1} titre="Recettes professionnelles (Art. 94)">
            {recettes.map((r, i) => (
              <LigneR key={i} signe="+" label={r.label || 'Recette'} val={formatFC(parseFloat(r.montant) || 0)} />
            ))}
            <Separateur />
            <LigneR signe="=" label="Total recettes=" val={formatFC(res.totalRecettes)} bold accent />
          </EtapeResultat>

          <EtapeResultat numero={2} titre="Charges déductibles (Art. 98)">
            {charges.map((r, i) => (
              <LigneR key={i} signe="−" label={r.label || 'Charge'} val={formatFC(parseFloat(r.montant) || 0)} neg />
            ))}
            <Separateur />
            <LigneR signe="=" label="Bénéfice brut=" val={formatFC(res.beneficeBrut)} bold
              neg={res.beneficeBrut < 0} />
            {res.beneficeBrut < 0 && (
              <p className="text-xs text-amber-600 mt-1">Déficit constaté : base imposable ramenée à 0. Ce déficit peut être reporté sur les 3 exercices suivants (Art. 101, Loi 23/053).</p>
            )}
          </EtapeResultat>

          {(res.cotSoc > 0 || res.fraisMed > 0) && (
            <EtapeResultat numero={3} titre="Déductions spécifiques (Art. 90)">
              {res.cotSoc > 0 && (
                <>
                  <LigneR label="Cotisations déclarées" val={formatFC(res.cotSoc)} />
                  <LigneR label={`Plafond admis : 20% du bénéfice N−1 (${formatFC(res.bnN1)})`} val={formatFC(res.plafondCotSoc)} />
                  <LigneR signe="−" label="Cotisations admises en déduction" val={formatFC(res.cotSocAdmise)} neg />
                </>
              )}
              {res.fraisMed > 0 && (
                <LigneR signe="−" label="Frais médicaux (sur justificatifs)" val={formatFC(res.fraisMed)} neg />
              )}
              <Separateur />
              <LigneR signe="=" label="Bénéfice net imposable=" val={formatFC(res.beneficeNet)} bold />
            </EtapeResultat>
          )}

          <EtapeResultat numero={res.cotSoc > 0 || res.fraisMed > 0 ? 4 : 3} titre="Barème progressif IRPP (Art. 118)">
            <p className="text-xs text-muted-foreground mb-1.5">Base arrondie au millier inférieur (Art. 118) : <strong>{formatFC(res.beneficeNetArrondi)} FC</strong></p>
            {res.beneficeNetArrondi <= 1944000 && (
              <LigneR label={`${formatFC(res.beneficeNetArrondi)} × 3%`} val={formatFC(res.beneficeNetArrondi * 0.03)} />
            )}
            {res.beneficeNetArrondi > 1944000 && res.beneficeNetArrondi <= 21600000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 1944000)} × 15%`} val={formatFC((res.beneficeNetArrondi - 1944000) * 0.15)} />
              </>
            )}
            {res.beneficeNetArrondi > 21600000 && res.beneficeNetArrondi <= 43200000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 21600000)} × 30%`} val={formatFC((res.beneficeNetArrondi - 21600000) * 0.30)} />
              </>
            )}
            {res.beneficeNetArrondi > 43200000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                <LigneR label="21 600 000 × 30%" val={formatFC(21600000 * 0.30)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 43200000)} × 40%`} val={formatFC((res.beneficeNetArrondi - 43200000) * 0.40)} />
              </>
            )}
            <Separateur />
            <LigneR signe="=" label="IRPP barème" val={formatFC(res.impotBareme)} bold />
            {res.plafonne && res.beneficeNetArrondi > 0 && (
              <p className="text-xs text-amber-600 mt-1">Plafond appliqué : 30% du revenu imposable = {formatFC(res.plafond30)} FC (Art. 118).</p>
            )}
            {res.nbPC > 0 && (
              <>
                <LigneR signe="−" label={`Réduction personnes à charge : ${res.nbPC} × 2% = ${(res.nbPC * 2)}%`} val={formatFC(res.reductionPC)} neg />
                <LigneR signe="=" label="IRPP après réduction famille=" val={formatFC(res.impotApresPC)} bold />
              </>
            )}
            {res.minimumApplique && (
              <p className="text-xs text-orange-600 mt-1 font-medium">Impôt minimum appliqué : 1% des recettes = {formatFC(res.minimum122)} FC (Art. 122). L'impôt calculé ({formatFC(res.impotApresPC)} FC) est inférieur à ce seuil.</p>
            )}
          </EtapeResultat>

          <EtapeResultat numero={res.cotSoc > 0 || res.fraisMed > 0 ? 5 : 4} titre="Modalités de paiement=">
            <div className="flex items-center gap-1 mb-1">
              <p className="text-xs text-muted-foreground">3 acomptes provisionnels + solde :</p>
              <InfoTooltip
                texte="Conformément à l'Art. 57 bis de la Loi sur les procédures fiscales, les acomptes sont calculés sur la base de l'impôt déclaré de l'exercice précédent. Ils représentent 30%, 30% et 20% de cette base. Le solde est versé au dépôt de la déclaration annuelle. Si les acomptes versés excèdent l'impôt dû, le crédit constaté peut servir au paiement d'autres impôts et droits dus : mais ne peut pas faire l'objet de cession (Art. 57 ter)."
                loi="Art. 57 bis et Art. 57 ter, Loi procédures fiscales="
              />
            </div>
            <LigneR label="1er acompte (30% de l'impôt N−1) : avant le 25 juillet" val={formatFC(res.impot * 0.30)} />
            <LigneR label="2ème acompte (30% de l'impôt N−1) : avant le 25 septembre" val={formatFC(res.impot * 0.30)} />
            <LigneR label="3ème acompte (20% de l'impôt N−1) : avant le 25 novembre" val={formatFC(res.impot * 0.20)} />
            <LigneR label="Solde (20%) : au dépôt de la déclaration annuelle" val={formatFC(res.impot * 0.20)} />
            <p className="text-xs text-muted-foreground mt-1">Dates modifiées par Art. 60 LF 2025 (n° 24/011), confirmées par Art. 31 LF 2026. Versements par bordereau d'acomptes provisionnels.</p>
          </EtapeResultat>

          <BoxFinal label="IRPP total dû" val={formatFC(res.impot)} />

        </ResultatWrap>
      )}
    </div>
  )
}

function Cat4Agricole() {
  const [regime, setRegime] = useState<'micro' | 'petite' | 'reel'>('reel')
  const [tauxBCC, setTauxBCC] = useState('')
  const [caMicro, setCaMicro] = useState('')
  const [typeActivite, setTypeActivite] = useState<'ventes' | 'services'>('ventes')
  const [produits, setProduits] = useState<{label: string; montant: string}[]>([])
  const [charges, setCharges] = useState<{label: string; montant: string}[]>([])
  const [cotisationsSociales, setCotisationsSociales] = useState('')
  const [beneficeN1, setBeneficeN1] = useState('')
  const [fraisMedicaux, setFraisMedicaux] = useState('')
  const [nbPersonnesCharge, setNbPersonnesCharge] = useState('0')
  const [showDeductions, setShowDeductions] = useState(false)
  const [res, setRes] = useState<any>(null)

  const PRODUITS_CAT = [
    { label: 'Ventes de récoltes (cultures vivrières ou industrielles)' },
    { label: 'Ventes de produits transformés (farine, huile, conserves...)' },
    { label: 'Revenus d\'élevage (bovins, caprins, ovins, porcins...)' },
    { label: 'Revenus d\'aviculture (volailles, œufs...)' },
    { label: 'Revenus de pisciculture (poissons, alevins...)' },
    { label: 'Revenus d\'apiculture (miel, cire...)' },
    { label: 'Subventions d\'exploitation reçues' },
    { label: 'Indemnités d\'assurance agricole perçues' },
    { label: 'Ventes de sous-produits et déchets agricoles' },
    { label: 'Locations de matériel agricole' },
    { label: 'Prestations de services agricoles rendus à des tiers' },
  ]

  const CHARGES_CAT = [
    { label: 'Achats de semences et plants' },
    { label: 'Achats d\'engrais et amendements' },
    { label: 'Achats de pesticides et produits phytosanitaires' },
    { label: 'Achats d\'aliments pour animaux' },
    { label: 'Charges de main-d\'œuvre agricole (salaires et charges sociales)' },
    { label: 'Frais d\'entretien des équipements et matériels' },
    { label: 'Amortissements du matériel agricole' },
    { label: 'Frais logistiques (transport, stockage, conditionnement)' },
    { label: 'Loyers de terres et de locaux agricoles' },
    { label: 'Impôts et taxes (hors IRPP)' },
    { label: 'Frais d\'irrigation et d\'eau' },
    { label: 'Frais vétérinaires et médicaments pour animaux' },
    { label: 'Frais généraux d\'exploitation' },
  ]

  function calculer() {
    if (regime === 'micro') {
      const taux = parseFloat(tauxBCC) || 0
      const impot = 30 * taux
      setRes({ regime: 'micro', impot, taux })
      return
    }
    if (regime === 'petite') {
      const ca = parseFloat(caMicro) || 0
      const taux = typeActivite === 'ventes' ? 0.01 : 0.02
      const impot = ca * taux
      setRes({ regime: 'petite', ca, taux, impot, typeActivite })
      return
    }
    // Régime réel
    const totalProduits = produits.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const totalCharges  = charges.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
    const beneficeBrut  = totalProduits - totalCharges
    const beneficeAvantDed = Math.max(0, beneficeBrut)

    const cotSoc = parseFloat(cotisationsSociales) || 0
    const fraisMed = parseFloat(fraisMedicaux) || 0
    const bnN1 = parseFloat(beneficeN1) || 0
    const plafondCotSoc = bnN1 * 0.20
    const cotSocAdmise = Math.min(cotSoc, plafondCotSoc)
    const beneficeNet = Math.max(0, beneficeAvantDed - cotSocAdmise - fraisMed)

    // Arrondi au millier inférieur (Art. 118)
    const beneficeNetArrondi = Math.floor(beneficeNet / 1000) * 1000
    const t1 = 162000 * 12   // 1 944 000
    const t2 = 1800000 * 12  // 21 600 000
    const t3 = 3600000 * 12  // 43 200 000
    let impotBareme = 0
    if (beneficeNetArrondi <= t1)       impotBareme = beneficeNetArrondi * 0.03
    else if (beneficeNetArrondi <= t2)  impotBareme = t1 * 0.03 + (beneficeNetArrondi - t1) * 0.15
    else if (beneficeNetArrondi <= t3)  impotBareme = t1 * 0.03 + (t2 - t1) * 0.15 + (beneficeNetArrondi - t2) * 0.30
    else                                 impotBareme = t1 * 0.03 + (t2 - t1) * 0.15 + (t3 - t2) * 0.30 + (beneficeNetArrondi - t3) * 0.40
    // Réduction personnes à charge Art. 123 : 2% par personne, max 9, inapplicable si revenu > t3
    // Assise sur l'IRPP brut (barème), AVANT tout plafonnement (ordre : barème → réduction → plafond)
    const nbPC = Math.min(Math.max(0, parseInt(nbPersonnesCharge) || 0), 9)
    const reductionPC = beneficeNetArrondi <= t3 ? impotBareme * 0.02 * nbPC : 0
    const impotApresReduction = Math.max(0, impotBareme - reductionPC)
    // Plafond 30% (Art. 118), appliqué APRÈS la réduction pour charges de famille
    const plafond30 = beneficeNetArrondi * 0.30
    const plafonne = impotApresReduction > plafond30
    let impotApresPC = plafonne ? plafond30 : impotApresReduction
    // Impôt minimum 1% des produits (Art. 122)
    const minimum122 = totalProduits * 0.01
    const minimumApplique = impotApresPC < minimum122 && minimum122 > 0
    const impot = minimumApplique ? minimum122 : impotApresPC

    setRes({ regime: 'reel', totalProduits, totalCharges, beneficeBrut, beneficeAvantDed, cotSoc, cotSocAdmise, plafondCotSoc, bnN1, fraisMed, beneficeNet, beneficeNetArrondi, impotBareme, plafond30, plafonne, nbPC, reductionPC, impotApresPC, minimum122, minimumApplique, impot })
  }

  function reset() {
    setRes(null); setProduits([]); setCharges([])
    setCotisationsSociales(''); setFraisMedicaux(''); setBeneficeN1(''); setNbPersonnesCharge('0')
    setTauxBCC(''); setCaMicro('')
  }

  function removeRow(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, i: number) {
    set(p => p.filter((_, idx) => idx !== i))
  }
  function updateMontant(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, i: number, v: string) {
    set(p => p.map((r, idx) => idx === i ? { ...r, montant: v } : r))
  }
  function addFromList(set: React.Dispatch<React.SetStateAction<{label: string; montant: string}[]>>, label: string) {
    set(p => {
      if (p.some(r => r.label === label)) return p
      return [...p, { label, montant: '' }]
    })
  }

  return (
    <div className="space-y-4">

      {/* Encadré d'introduction */}
      <div className="rounded-xl border border-lime-200 bg-lime-50 p-3 space-y-2">
        <p className="text-xs text-lime-700 leading-relaxed">
          <strong>Bénéfices de l'exploitation agricole</strong> : profits tirés de l'exploitation de biens ruraux par un propriétaire exploitant, fermier ou métayer.
          Base imposable : produits encaissés − charges d'exploitation (Art. 104 renvoyant aux règles BIC, Loi 23/053).
        </p>
        <div className="rounded-lg border border-lime-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-lime-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 4 : Exploitants agricoles imposables</p>
              <p className="text-xs text-green-700 leading-relaxed">
                Propriétaires exploitants, fermiers et métayers exerçant à titre lucratif : cultures vivrières ou industrielles, élevage, aviculture, pisciculture, apiculture (Art. 102). Grandes, moyennes et fermes familiales modernisées.
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Hors Cat. 4</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Cultures vivrières sur moins de 10 ha → <strong>exonérées</strong> (Art. 103).<br />
                Si activité industrielle ou commerciale liée → <strong>Cat. 2 (BIC)</strong> (Art. 87).
              </p>
            </div>
          </div>
          <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-bold text-amber-700 mb-0.5">⚠ Exonération vivrière (Art. 103)</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Les revenus tirés de l'exploitation de terres <strong>exclusivement affectées à des cultures vivrières</strong> (manioc, maïs, haricot, riz...) dont la superficie est <strong>inférieure à 10 hectares</strong> sont totalement exonérés d'IRPP. Toute diversification vers des cultures industrielles fait perdre cette exonération.
            </p>
          </div>
          <p className="text-xs text-lime-600 mt-1.5 italic">Les exploitants relevant du régime réel doivent tenir une comptabilité conforme aux normes fiscales (Art. 104).</p>
        </div>
      </div>

      {/* Sélecteur de régime */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2">Régime d'imposition (Art. 105)</p>
        <div className="grid grid-cols-3 gap-3">
          {([
            { id: 'micro',   label: 'Micro',          sub: 'CA ≤ 25 000 000 FC',       art: 'Art. 107' },
            { id: 'petite',  label: 'Petite ent.',     sub: '25M < CA ≤ 300M FC',        art: 'Art. 109' },
            { id: 'reel',    label: 'Régime réel',     sub: 'CA > 300 000 000 FC',       art: 'Art. 112' },
          ] as const).map(r => (
            <button key={r.id} onClick={() => { setRegime(r.id); setRes(null) }}
              className={cn(
                'rounded-xl border px-2 py-2.5 text-center transition-all duration-200',
                regime === r.id
                  ? 'bg-lime-600 border-transparent text-white shadow-md scale-[1.03]'
                  : 'border-border bg-card hover:bg-muted/30 hover:border-lime-300'
              )}>
              <p className={cn('text-xs font-bold', regime === r.id ? 'text-white' : 'text-foreground')}>{r.label}</p>
              <p className={cn('text-xs leading-tight', regime === r.id ? 'text-white/80' : 'text-muted-foreground')}>{r.sub}</p>
              <p className={cn('text-xs mt-0.5', regime === r.id ? 'text-white/70' : 'text-muted-foreground/70')}>{r.art}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── MICRO ── */}
      {regime === 'micro' && (
        <div className="rounded-xl border border-lime-200 bg-lime-50/40 p-3 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Forfait annuel fixé à <strong>30 USD</strong> converti en FC au taux BCC du jour (Art. 128 + Arrêté n° 015 du 19/02/2025).
          </p>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              Taux BCC du jour (FC pour 1 USD)
              <InfoTooltip
                texte="Le montant forfaitaire est de 30 USD/an, converti au taux de change officiel de la Banque Centrale du Congo à la date de paiement (Art. 128, Loi 23/053 + Arrêté Ministériel n° 015 du 19/02/2025). Consultez le taux officiel sur bcc.cd.="
                loi="Art. 128, Loi 23/053 : Arrêté n° 015 du 19/02/2025"
              />
            </label>
            <input type="number" min={0} placeholder="Ex : 2800" value={tauxBCC}
              onChange={e => setTauxBCC(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            {tauxBCC && (
              <p className="text-xs text-lime-700 mt-1.5 font-medium">
                IRPP forfaitaire : 30 × {tauxBCC} = <strong>{formatFC(30 * (parseFloat(tauxBCC) || 0))} FC</strong>
              </p>
            )}
            <a href="https://www.bcc.cd" target="_blank" rel="noopener noreferrer="
              className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              Consulter le taux BCC →
            </a>
          </div>
        </div>
      )}

      {/* ── PETITE ENTREPRISE ── */}
      {regime === 'petite' && (
        <div className="rounded-xl border border-lime-200 bg-lime-50/40 p-3 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Impôt calculé sur le chiffre d'affaires : <strong>1%</strong> pour les ventes, <strong>2%</strong> pour les prestations de services (Art. 109).
          </p>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Type d'activité principale</label>
            <div className="flex gap-2">
              {([
                { id: 'ventes',   label: 'Ventes (1%)',    art: 'Art. 109' },
                { id: 'services', label: 'Services (2%)',  art: 'Art. 109' },
              ] as const).map(t => (
                <button key={t.id} onClick={() => setTypeActivite(t.id)}
                  className={cn(
                    'flex-1 rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all duration-200',
                    typeActivite === t.id
                      ? 'bg-lime-600 border-transparent text-white'
                      : 'border-border bg-card hover:bg-muted/30'
                  )}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Chiffre d'affaires annuel (FC)</label>
            <input type="number" min={0} placeholder="Ex : 150 000 000" value={caMicro}
              onChange={e => setCaMicro(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      )}

      {/* ── RÉGIME RÉEL ── */}
      {regime === 'reel' && (
        <>
          {/* Produits */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-xs font-semibold text-lime-700">Produits agricoles</p>
              <InfoTooltip
                texte="Tous les produits encaissés dans l'exploitation : ventes de récoltes, produits transformés, revenus d'élevage et d'activités annexes, subventions perçues, indemnités d'assurance. Base : recettes de l'année fiscale (Art. 104, Loi 23/053)."
                loi="Art. 104, Loi 23/053"
              />
            </div>
            <div className="rounded-xl border border-lime-200 bg-lime-50/40 p-3 space-y-2">
              {produits.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground/80 truncate">
                    {r.label}
                  </div>
                  <div className="flex gap-2">
                    <input value={r.montant} onChange={e => updateMontant(setProduits, i, e.target.value)}
                      type="number" placeholder="Montant FC="
                      className="flex-1 sm:w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <button onClick={() => removeRow(setProduits, i)} className="text-muted-foreground hover:text-destructive transition-colors text-xs px-1">×</button>
                  </div>
                </div>
              ))}
              <details className="group">
                <summary className="cursor-pointer text-xs text-lime-600 font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
                  <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span> Catalogue des produits (Art. 104)
                </summary>
                <div className="mt-2 space-y-1 pl-3">
                  {PRODUITS_CAT.map((c, i) => (
                    <button key={i} onClick={() => addFromList(setProduits, c.label)}
                      className="block w-full text-left text-xs text-foreground hover:text-lime-700 hover:bg-lime-50 px-2 py-1 rounded transition-colors duration-200">
                      + {c.label}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Charges déductibles</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Charges */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-xs font-semibold text-rose-700">Charges d'exploitation déductibles</p>
              <InfoTooltip
                texte="Charges directement liées à l'activité agricole : intrants (semences, engrais, pesticides), main-d'œuvre, entretien, amortissements, logistique, loyers, impôts et taxes hors IRPP. Dépenses mixtes : 50% à défaut de justificatif précis (Art. 89, Loi 23/053)."
                loi="Art. 104 renvoyant à Art. 89 et 98, Loi 23/053"
              />
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-3 space-y-2">
              {charges.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground/80 truncate">
                    {r.label}
                  </div>
                  <div className="flex gap-2">
                    <input value={r.montant} onChange={e => updateMontant(setCharges, i, e.target.value)}
                      type="number" placeholder="Montant FC="
                      className="flex-1 sm:w-32 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <button onClick={() => removeRow(setCharges, i)} className="text-muted-foreground hover:text-destructive transition-colors text-xs px-1">×</button>
                  </div>
                </div>
              ))}
              <details className="group">
                <summary className="cursor-pointer text-xs text-rose-600 font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
                  <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span> Catalogue des charges (Art. 104)
                </summary>
                <div className="mt-2 space-y-1 pl-3">
                  {CHARGES_CAT.map((c, i) => (
                    <button key={i} onClick={() => addFromList(setCharges, c.label)}
                      className="block w-full text-left text-xs text-foreground hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors duration-200">
                      + {c.label}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          </div>

          {/* Déductions Art. 90 */}
          <div>
            <button onClick={() => setShowDeductions(!showDeductions)}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200">
              <span className={cn('transition-transform duration-300 ease-out inline-block', showDeductions && 'rotate-90')}>▶</span>
              Déductions spécifiques (Art. 90)
              <InfoTooltip
                texte="Déductions complémentaires (Art. 90) : (1) Cotisations à une caisse de prévoyance, assurance maladie ou retraite : dans la limite de 20% du bénéfice net de l'année précédente (N−1). (2) Frais médicaux du contribuable, conjoint et enfants à charge : sur justificatifs.="
                loi="Art. 90, Loi 23/053"
              />
            </button>
            {showDeductions && (
              <div className="mt-2 rounded-xl border border-border bg-muted/30 p-3 space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    Bénéfice net N−1 (FC) : base du plafond
                    <InfoTooltip texte="Le plafond de déduction des cotisations sociales volontaires est calculé sur le bénéfice net de l'année précédente (N−1), conformément à l'Art. 90. Indiquez ici le bénéfice net de l'année dernière." loi="Art. 90, Loi 23/053" />
                  </label>
                  <input type="number" min={0} placeholder="Bénéfice net année précédente" value={beneficeN1}
                    onChange={e => setBeneficeN1(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 mb-2" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    Cotisations sociales volontaires (FC)
                    <InfoTooltip texte="Cotisations versées pour constitution d'une rente viagère, pension, assurance maladie ou chômage. Déductibles dans la limite de 20% du bénéfice net de l'année précédente (Art. 90)." loi="Art. 90, Loi 23/053" />
                  </label>
                  <input type="number" min={0} placeholder="0" value={cotisationsSociales}
                    onChange={e => setCotisationsSociales(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    Frais médicaux (FC)
                    <InfoTooltip texte="Frais médicaux engagés pour le contribuable, son conjoint ou ses enfants à charge. Doivent être effectivement payés et justifiés par des pièces probantes (factures, reçus, prescriptions médicales)." loi="Art. 90, Loi 23/053" />
                  </label>
                  <input type="number" min={0} placeholder="0" value={fraisMedicaux}
                    onChange={e => setFraisMedicaux(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    Personnes à charge
                    <InfoTooltip
                      texte="Réduction de 2% de l'IRPP par personne à charge, dans la limite de 9 personnes (Art. 123). Sont admis : conjoint légal, enfants célibataires reconnus ou adoptés, ascendants des deux conjoints vivant au foyer. Condition : revenu propre de la personne à charge ≤ 1 944 000 FC/an. ⚠️ Inapplicable si revenu imposable > 43 200 000 FC/an. Pourquoi ? Au-delà de ce seuil (3e tranche du barème, Art. 118), le législateur considère que le contribuable dispose d'une capacité financière suffisante pour assumer ses charges de famille sans nécessiter un allègement fiscal. Cette réduction vise à protéger les foyers à revenus modestes et moyens : l'accorder aux hauts revenus irait à l'encontre du principe de justice fiscale (Art. 123 à 125, Loi 23/053)."
                      loi="Art. 123 à 125, Loi 23/053"
                    />
                  </label>
                  <input type="number" min={0} max={9} placeholder="0" value={nbPersonnesCharge}
                    onChange={e => setNbPersonnesCharge(e.target.value)}
                    disabled={!!res && res.beneficeNetArrondi > 43200000}
                    className={"w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 " + (res && res.beneficeNetArrondi > 43200000 ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed=" : "bg-background")} />
                  {res && res.beneficeNetArrondi > 43200000
                    ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : inapplicable : revenu imposable &gt; 43 200 000 FC (au-delà de la 3e tranche)</p>
                    : <p className="text-xs text-muted-foreground mt-1">Maximum 9 personnes : réduction inapplicable si revenu imposable &gt; 43 200 000 FC</p>
                  }
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {/* ── RÉSULTATS ── */}
      {res && res.regime === 'micro' && (
        <ResultatWrap titre="IRPP : Cat. 4 : Régime micro-entreprise=">
          <EtapeResultat numero={1} titre="Calcul forfaitaire (Art. 128)">
            <LigneR label="Montant USD fixé par Arrêté n° 015 du 19/02/2025" val="30 USD=" />
            <LigneR label={`Taux BCC du jour`} val={`${res.taux} FC / USD`} />
            <Separateur />
            <LigneR signe="=" label="30 USD × taux BCC=" val={formatFC(res.impot)} bold accent />
          </EtapeResultat>
          <BoxFinal label="IRPP forfaitaire annuel dû" val={formatFC(res.impot)} />
        </ResultatWrap>
      )}

      {res && res.regime === 'petite' && (
        <ResultatWrap titre="IRPP : Cat. 4 : Régime petite entreprise=">
          <EtapeResultat numero={1} titre="Calcul proportionnel (Art. 109)">
            <LigneR label="Chiffre d'affaires annuel=" val={formatFC(res.ca)} />
            <LigneR label={`Taux applicable (${res.typeActivite === 'ventes' ? 'ventes' : 'services'})`} val={`${res.taux * 100}%`} />
            <Separateur />
            <LigneR signe="=" label={`${formatFC(res.ca)} × ${res.taux * 100}%`} val={formatFC(res.impot)} bold accent />
          </EtapeResultat>
          <BoxFinal label="IRPP annuel dû" val={formatFC(res.impot)} />
        </ResultatWrap>
      )}

      {res && res.regime === 'reel' && (
        <ResultatWrap titre="IRPP : Cat. 4 : Régime réel">

          <EtapeResultat numero={1} titre="Produits agricoles (Art. 104)">
            {produits.map((r, i) => (
              <LigneR key={i} signe="+" label={r.label || 'Produit'} val={formatFC(parseFloat(r.montant) || 0)} />
            ))}
            <Separateur />
            <LigneR signe="=" label="Total produits=" val={formatFC(res.totalProduits)} bold accent />
          </EtapeResultat>

          <EtapeResultat numero={2} titre="Charges d'exploitation (Art. 104)">
            {charges.map((r, i) => (
              <LigneR key={i} signe="−" label={r.label || 'Charge'} val={formatFC(parseFloat(r.montant) || 0)} neg />
            ))}
            <Separateur />
            <LigneR signe="=" label="Bénéfice brut=" val={formatFC(res.beneficeBrut)} bold neg={res.beneficeBrut < 0} />
            {res.beneficeBrut < 0 && (
              <p className="text-xs text-amber-600 mt-1">Déficit constaté : base imposable ramenée à 0. Ce déficit peut être reporté sur les 3 exercices suivants (Art. 101 par renvoi Art. 104, Loi 23/053).</p>
            )}
          </EtapeResultat>

          {(res.cotSoc > 0 || res.fraisMed > 0) && (
            <EtapeResultat numero={3} titre="Déductions spécifiques (Art. 90)">
              {res.cotSoc > 0 && (
                <>
                  <LigneR label="Cotisations déclarées" val={formatFC(res.cotSoc)} />
                  <LigneR label={`Plafond admis : 20% du bénéfice N−1 (${formatFC(res.bnN1)})`} val={formatFC(res.plafondCotSoc)} />
                  <LigneR signe="−" label="Cotisations admises en déduction" val={formatFC(res.cotSocAdmise)} neg />
                </>
              )}
              {res.fraisMed > 0 && (
                <LigneR signe="−" label="Frais médicaux (sur justificatifs)" val={formatFC(res.fraisMed)} neg />
              )}
              <Separateur />
              <LigneR signe="=" label="Bénéfice net imposable=" val={formatFC(res.beneficeNet)} bold />
            </EtapeResultat>
          )}

          <EtapeResultat numero={res.cotSoc > 0 || res.fraisMed > 0 ? 4 : 3} titre="Barème progressif IRPP (Art. 118)">
            <p className="text-xs text-muted-foreground mb-1.5">Base arrondie au millier inférieur (Art. 118) : <strong>{formatFC(res.beneficeNetArrondi)} FC</strong></p>
            {res.beneficeNetArrondi <= 1944000 && (
              <LigneR label={`${formatFC(res.beneficeNetArrondi)} × 3%`} val={formatFC(res.beneficeNetArrondi * 0.03)} />
            )}
            {res.beneficeNetArrondi > 1944000 && res.beneficeNetArrondi <= 21600000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 1944000)} × 15%`} val={formatFC((res.beneficeNetArrondi - 1944000) * 0.15)} />
              </>
            )}
            {res.beneficeNetArrondi > 21600000 && res.beneficeNetArrondi <= 43200000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 21600000)} × 30%`} val={formatFC((res.beneficeNetArrondi - 21600000) * 0.30)} />
              </>
            )}
            {res.beneficeNetArrondi > 43200000 && (
              <>
                <LigneR label="1 944 000 × 3%" val={formatFC(1944000 * 0.03)} />
                <LigneR label="19 656 000 × 15%" val={formatFC(19656000 * 0.15)} />
                <LigneR label="21 600 000 × 30%" val={formatFC(21600000 * 0.30)} />
                <LigneR label={`${formatFC(res.beneficeNetArrondi - 43200000)} × 40%`} val={formatFC((res.beneficeNetArrondi - 43200000) * 0.40)} />
              </>
            )}
            <Separateur />
            <LigneR signe="=" label="IRPP barème" val={formatFC(res.impotBareme)} bold />
            {res.plafonne && res.beneficeNetArrondi > 0 && (
              <p className="text-xs text-amber-600 mt-1">Plafond appliqué : 30% du revenu imposable = {formatFC(res.plafond30)} FC (Art. 118).</p>
            )}
            {res.nbPC > 0 && (
              <>
                <LigneR signe="−" label={`Réduction personnes à charge : ${res.nbPC} × 2% = ${(res.nbPC * 2)}%`} val={formatFC(res.reductionPC)} neg />
                <LigneR signe="=" label="IRPP après réduction famille=" val={formatFC(res.impotApresPC)} bold />
              </>
            )}
            {res.minimumApplique && (
              <p className="text-xs text-orange-600 mt-1 font-medium">Impôt minimum appliqué : 1% des produits = {formatFC(res.minimum122)} FC (Art. 122). L'impôt calculé ({formatFC(res.impotApresPC)} FC) est inférieur à ce seuil.</p>
            )}
          </EtapeResultat>

          <EtapeResultat numero={res.cotSoc > 0 || res.fraisMed > 0 ? 5 : 4} titre="Modalités de paiement=">
            <div className="flex items-center gap-1 mb-1">
              <p className="text-xs text-muted-foreground">3 acomptes provisionnels + solde :</p>
              <InfoTooltip
                texte="Conformément à l'Art. 57 bis de la Loi sur les procédures fiscales, les acomptes sont calculés sur la base de l'impôt déclaré de l'exercice précédent. Ils représentent 30%, 30% et 20% de cette base. Le solde est versé au dépôt de la déclaration annuelle (Art. 57 ter)."
                loi="Art. 57 bis et Art. 57 ter, Loi procédures fiscales="
              />
            </div>
            <LigneR label="1er acompte (30% de l'impôt N−1) : avant le 25 juillet" val={formatFC(res.impot * 0.30)} />
            <LigneR label="2ème acompte (30% de l'impôt N−1) : avant le 25 septembre" val={formatFC(res.impot * 0.30)} />
            <LigneR label="3ème acompte (20% de l'impôt N−1) : avant le 25 novembre" val={formatFC(res.impot * 0.20)} />
            <LigneR label="Solde (20%) : au dépôt de la déclaration annuelle" val={formatFC(res.impot * 0.20)} />
            <p className="text-xs text-muted-foreground mt-1">Dates modifiées par Art. 60 LF 2025 (n° 24/011), confirmées par Art. 31 LF 2026. Versements par bordereau d'acomptes provisionnels.</p>
          </EtapeResultat>

          <BoxFinal label="IRPP total dû" val={formatFC(res.impot)} />

        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CAT. 6 : Plus-values de cession de biens
// Art. 82-84 (base), Art. 83 (exonérations), Art. 120 (taux 20%), Loi 23/053
// ─────────────────────────────────────────────────────────────────────────────
function Cat6PlusValues() {
  const [typeBien, setTypeBien] = useState<'immo' | 'mobilier' | 'parts' | 'autres'>('immo')
  const [prixCession, setPrixCession] = useState('')
  const [fraisCession, setFraisCession] = useState('')
  const [prixAcquisition, setPrixAcquisition] = useState('')
  const [modeAcquisition, setModeAcquisition] = useState<'connu' | 'inconnu' | 'gratuit'>('connu')
  const [fraisAcqMode, setFraisAcqMode] = useState<'justifies' | 'forfait'>('forfait')
  const [fraisAcqJustifies, setFraisAcqJustifies] = useState('')
  const [travauxMode, setTravauxMode] = useState<'justifies' | 'forfait' | 'aucun'>('aucun')
  const [travauxJustifies, setTravauxJustifies] = useState('')
  const [exonere, setExonere] = useState(false)
  const [motifExoneration, setMotifExoneration] = useState('')
  const [res, setRes] = useState<any>(null)

  const TYPES_BIENS = [
    { id: 'immo',     label: 'Bien immobilier',           sub: 'Immeuble bâti, terrain, appartement...' },
    { id: 'mobilier', label: 'Bien mobilier (personnel)', sub: 'Véhicule perso, bijoux, œuvre d\'art...' },
    { id: 'parts',    label: 'Parts sociales / titres',   sub: 'Actions, parts d\'une société...' },
    { id: 'autres',   label: 'Droits et autres biens',    sub: 'Droits incorporels, créances, autres...' },
  ] as const

  const EXONERATIONS = [
    'Résidence principale (occupée ≥ 5 ans ou cession pour motif familial)',
    'Meubles meublants, appareils ménagers ou voiture personnelle',
    'Terrain à usage strictement agricole',
    'Indemnité d\'assurance (sinistre partiel ou total sur bien personnel)',
  ]

  function calculer() {
    if (exonere) {
      setRes({ exonere: true, motif: motifExoneration })
      return
    }
    const pc = parseFloat(prixCession) || 0
    const fc = parseFloat(fraisCession) || 0
    const prixCessionNet = pc - fc

    let prixAcqAjuste = 0
    if (modeAcquisition === 'inconnu') {
      // Forfait 75% prix cession
      prixAcqAjuste = pc * 0.75
    } else {
      const pa = parseFloat(prixAcquisition) || 0
      // Frais d'acquisition
      let fraisAcq = 0
      if (modeAcquisition !== 'gratuit') {
        fraisAcq = fraisAcqMode === 'justifies'
          ? (parseFloat(fraisAcqJustifies) || 0)
          : pa * 0.10
      }
      // Travaux immobiliers (seulement immo)
      let travaux = 0
      if (typeBien === 'immo') {
        if (travauxMode === 'justifies')  travaux = parseFloat(travauxJustifies) || 0
        else if (travauxMode === 'forfait') travaux = pa * 0.15
      }
      prixAcqAjuste = pa + fraisAcq + travaux
    }

    const plusValueNette = prixCessionNet - prixAcqAjuste
    const imposable = Math.max(0, plusValueNette)
    const retenue = imposable * 0.20

    setRes({
      exonere: false,
      prixCession: pc, fraisCession: fc, prixCessionNet,
      prixAcqAjuste, plusValueNette, imposable, retenue,
      modeAcquisition,
      fraisAcqMode, fraisAcq: modeAcquisition === 'inconnu' ? null
        : (fraisAcqMode === 'justifies' ? (parseFloat(fraisAcqJustifies) || 0) : (parseFloat(prixAcquisition) || 0) * 0.10),
      travaux: typeBien === 'immo'
        ? (travauxMode === 'justifies' ? (parseFloat(travauxJustifies) || 0)
          : travauxMode === 'forfait' ? (parseFloat(prixAcquisition) || 0) * 0.15 : 0)
        : null,
      travauxMode,
      prixAcquisitionSaisi: parseFloat(prixAcquisition) || 0,
    })
  }

  function reset() {
    setPrixCession(''); setFraisCession(''); setPrixAcquisition('')
    setModeAcquisition('connu'); setFraisAcqMode('forfait'); setFraisAcqJustifies('')
    setTravauxMode('aucun'); setTravauxJustifies(''); setExonere(false); setMotifExoneration('')
    setRes(null)
  }

  return (
    <div className="space-y-4">

      {/* Encadré introduction */}
      <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 space-y-2">
        <p className="text-xs text-orange-700 leading-relaxed">
          <strong>Plus-values de cession de biens</strong> : gains réalisés lors de la vente, l'échange, l'apport ou la liquidation
          d'un bien (immobilier, mobilier, parts sociales, droits) dans le cadre de la gestion du patrimoine privé.
          Base légale : Art. 82 à 84, Art. 120, Loi 23/053.
        </p>
        <div className="rounded-lg border border-orange-300 bg-white/60 p-2.5">
          <p className="text-xs font-semibold text-orange-800 mb-1.5">Qui est concerné par cette catégorie ?</p>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-bold text-green-700 mb-0.5">✓ IRPP Cat. 6 : Plus-values imposables</p>
              <p className="text-xs text-green-700 leading-relaxed">
                Toute personne physique qui cède à titre onéreux un bien immobilier, mobilier (professionnel),
                des parts sociales, des droits, dans le cadre de la gestion de son patrimoine privé.
                Opérations : vente, échange, partage, apport en société, expropriation, liquidation (Art. 82).
              </p>
            </div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
              <p className="text-xs font-bold text-rose-700 mb-0.5">✗ Hors Cat. 6</p>
              <p className="text-xs text-rose-700 leading-relaxed">
                Plus-values issues d'une activité spéculative habituelle (achat-revente régulier)
                → <strong>Cat. 2 (BIC)</strong>.<br />
                Biens exonérés (résidence principale, meubles, terrain agricole, assurance) → Art. 83.
              </p>
            </div>
          </div>
          <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-bold text-amber-700 mb-0.5">⚠ Exonérations (Art. 83)</p>
            <ul className="text-xs text-amber-700 space-y-0.5 list-disc pl-3">
              <li>Résidence principale (occupée ≥ 5 ans ou cession pour impératif familial)</li>
              <li>Meubles meublants, appareils ménagers, voiture personnelle</li>
              <li>Terrain à usage strictement agricole</li>
              <li>Indemnité d'assurance pour sinistre (partiel ou total) sur bien personnel</li>
            </ul>
          </div>
          <div className="mt-2 rounded-lg bg-orange-50 border border-orange-200 p-3">
            <p className="text-xs font-bold text-orange-700 mb-0.5">Mécanisme : retenue à la source par l'acquéreur</p>
            <p className="text-xs text-orange-700 leading-relaxed">
              Taux unique : <strong>20% sur la plus-value nette imposable</strong> (Art. 120, Loi 23/053).
              La retenue est opérée par l'acquéreur au moment de la transaction.
              Cette retenue est <strong>imputable</strong> sur l'IRPP global du vendeur (non libératoire : Art. 121, Loi 23/053).
              Versement au Trésor ≤ 15 du mois suivant la réalisation (Art. 126, Loi 23/053 et Art. 18 ter, Loi procédures fiscales).
            </p>
          </div>
        </div>
      </div>

      {/* Exonération ? */}
      <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="exonere" checked={exonere} onChange={e => { setExonere(e.target.checked); setRes(null) }}
            className="rounded border-border" />
          <label htmlFor="exonere" className="text-xs font-medium text-foreground cursor-pointer">
            La plus-value est exonérée (Art. 83)
          </label>
          <InfoTooltip
            texte="Cochez si la cession entre dans l'un des cas d'exonération prévus à l'article 83 : résidence principale (≥ 5 ans ou impératif familial), meubles/appareils ménagers/voiture personnelle, terrain agricole, indemnité d'assurance sinistre.="
            loi="Art. 83, Loi 23/053"
          />
        </div>
        {exonere && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Motif d'exonération</label>
            <div className="space-y-1">
              {EXONERATIONS.map((e, i) => (
                <button key={i} onClick={() => setMotifExoneration(e)}
                  className={cn(
                    'w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all duration-200',
                    motifExoneration === e
                      ? 'bg-orange-600 border-transparent text-white'
                      : 'border-border bg-card hover:bg-orange-50 hover:border-orange-300'
                  )}>
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {!exonere && (
        <>
          {/* Type de bien */}
          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Type de bien cédé</p>
            <div className="grid grid-cols-2 gap-3">
              {TYPES_BIENS.map(t => (
                <button key={t.id} onClick={() => { setTypeBien(t.id); setRes(null) }}
                  className={cn(
                    'rounded-xl border px-2 py-2 text-left transition-all duration-200',
                    typeBien === t.id
                      ? 'bg-orange-600 border-transparent text-white shadow-md scale-[1.02]'
                      : 'border-border bg-card hover:bg-muted/30 hover:border-orange-300'
                  )}>
                  <p className={cn('text-xs font-bold', typeBien === t.id ? 'text-white' : 'text-foreground')}>{t.label}</p>
                  <p className={cn('text-xs leading-tight', typeBien === t.id ? 'text-white/80' : 'text-muted-foreground')}>{t.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Prix de cession */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              Prix de cession (FC)
              <InfoTooltip
                texte="Montant effectivement perçu par le vendeur lors de la transaction. Ce prix sera diminué des frais supportés par le vendeur (notaire, agence, enregistrement) pour obtenir le prix de cession net (Art. 84 §2, Loi 23/053)."
                loi="Art. 84 §2, Loi 23/053"
              />
            </label>
            <input type="number" min={0} placeholder="Ex : 120 000 000" value={prixCession}
              onChange={e => { setPrixCession(e.target.value); setRes(null) }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
              Frais de cession supportés par le vendeur (FC)
              <InfoTooltip
                texte="Frais directement liés à la transaction supportés par le vendeur : honoraires de notaire, frais d'enregistrement, commissions d'agence immobilière, frais d'intermédiation. Déductibles du prix de cession brut (Art. 84 §2, Loi 23/053)."
                loi="Art. 84 §2, Loi 23/053"
              />
            </label>
            <input type="number" min={0} placeholder="0" value={fraisCession}
              onChange={e => { setFraisCession(e.target.value); setRes(null) }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          {/* Séparateur */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Prix d'acquisition</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Mode d'acquisition */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Situation du prix d'acquisition</label>
            <div className="flex flex-col sm:flex-row gap-2">
              {([
                { id: 'connu',   label: 'Prix connu',         sub: 'Achat à titre onéreux' },
                { id: 'gratuit', label: 'Bien reçu à titre gratuit', sub: 'Donation ou héritage' },
                { id: 'inconnu', label: 'Prix inconnu',        sub: 'Aucun justificatif' },
              ] as const).map(m => (
                <button key={m.id} onClick={() => { setModeAcquisition(m.id); setRes(null) }}
                  className={cn(
                    'flex-1 rounded-lg border px-2 py-2 text-center text-xs font-medium transition-all duration-200',
                    modeAcquisition === m.id
                      ? 'bg-orange-600 border-transparent text-white'
                      : 'border-border bg-card hover:bg-muted/30'
                  )}>
                  <p className={cn('font-bold', modeAcquisition === m.id ? 'text-white' : 'text-foreground')}>{m.label}</p>
                  <p className={cn('text-xs', modeAcquisition === m.id ? 'text-white/80' : 'text-muted-foreground')}>{m.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {modeAcquisition === 'inconnu' && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5">
              <p className="text-xs text-amber-700">
                Prix d'acquisition indéterminable : le prix d'acquisition est fixé forfaitairement à <strong>75% du prix de cession</strong> (Art. 84 §5, Loi 23/053).
              </p>
            </div>
          )}

          {(modeAcquisition === 'connu' || modeAcquisition === 'gratuit') && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                  {modeAcquisition === 'gratuit' ? "Valeur figurant dans l'acte (donation/succession) (FC)" : 'Prix d\'acquisition initial (FC)'}
                  <InfoTooltip
                    texte={modeAcquisition === 'gratuit'
                      ? "Pour les biens reçus par donation ou succession, le prix d'acquisition retenu est celui figurant dans l'acte de mutation ou la déclaration de succession. Le forfait de 10% pour frais d'acquisition ne s'applique pas (Art. 84 §3, Loi 23/053)."
                      : "Montant initialement payé pour l'achat du bien. Ce montant sera majoré des frais d'acquisition et, pour les immeubles, des travaux réalisés (Art. 84 §3, Loi 23/053)."}
                    loi="Art. 84 §3, Loi 23/053"
                  />
                </label>
                <input type="number" min={0} placeholder="Ex : 70 000 000" value={prixAcquisition}
                  onChange={e => { setPrixAcquisition(e.target.value); setRes(null) }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>

              {modeAcquisition === 'connu' && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                    Frais d'acquisition
                    <InfoTooltip
                      texte="Les frais d'acquisition (enregistrement, notaire, commissions) sont ajoutés au prix d'achat. S'ils sont justifiés, on retient leur montant réel. Sinon, un forfait de 10% du prix d'acquisition est appliqué. Ce forfait ne s'applique pas aux biens reçus à titre gratuit (Art. 84 §3, Loi 23/053)."
                      loi="Art. 84 §3, Loi 23/053"
                    />
                  </label>
                  <div className="flex gap-2 mb-2">
                    {([
                      { id: 'forfait',   label: 'Forfait 10%' },
                      { id: 'justifies', label: 'Justifiés' },
                    ] as const).map(f => (
                      <button key={f.id} onClick={() => { setFraisAcqMode(f.id); setRes(null) }}
                        className={cn(
                          'flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200',
                          fraisAcqMode === f.id
                            ? 'bg-orange-600 border-transparent text-white'
                            : 'border-border bg-card hover:bg-muted/30'
                        )}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                  {fraisAcqMode === 'justifies' && (
                    <input type="number" min={0} placeholder="Frais d'acquisition justifiés FC=" value={fraisAcqJustifies}
                      onChange={e => { setFraisAcqJustifies(e.target.value); setRes(null) }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  )}
                </div>
              )}

              {/* Travaux immobiliers : seulement pour immobilier */}
              {typeBien === 'immo' && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                    Travaux (construction, rénovation, amélioration)
                    <InfoTooltip
                      texte="Pour les biens immobiliers, le prix d'acquisition est majoré des travaux de construction, reconstruction, agrandissement, rénovation ou amélioration réalisés depuis l'achat, non encore déduits fiscalement. Sur justificatifs : montant réel. Sans justificatifs : forfait de 15% du prix d'acquisition. Non applicable aux dépenses locatives courantes (Art. 84 §4, Loi 23/053)."
                      loi="Art. 84 §4, Loi 23/053"
                    />
                  </label>
                  <div className="flex gap-2 mb-2">
                    {([
                      { id: 'aucun',     label: 'Aucun' },
                      { id: 'forfait',   label: 'Forfait 15%' },
                      { id: 'justifies', label: 'Justifiés' },
                    ] as const).map(t => (
                      <button key={t.id} onClick={() => { setTravauxMode(t.id); setRes(null) }}
                        className={cn(
                          'flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all duration-200',
                          travauxMode === t.id
                            ? 'bg-orange-600 border-transparent text-white'
                            : 'border-border bg-card hover:bg-muted/30'
                        )}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {travauxMode === 'justifies' && (
                    <input type="number" min={0} placeholder="Montant des travaux justifiés FC=" value={travauxJustifies}
                      onChange={e => { setTravauxJustifies(e.target.value); setRes(null) }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="flex gap-2">
        <BtnCalculer onClick={calculer} />
        <BtnReset onClick={reset} />
      </div>

      {/* Résultats */}
      {res && res.exonere && (
        <ResultatWrap titre="IRPP : Cat. 6 : Plus-value exonérée">
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">✓ Plus-value exonérée d'IRPP (Art. 83)</p>
            {res.motif && <p className="text-xs text-green-700">Motif : {res.motif}</p>}
            <p className="text-xs text-green-600 mt-1">Aucune retenue à la source ne doit être opérée par l'acquéreur.</p>
          </div>
        </ResultatWrap>
      )}

      {res && !res.exonere && (
        <ResultatWrap titre="IRPP : Cat. 6 : Plus-value de cession=">

          <EtapeResultat numero={1} titre="Prix de cession net (Art. 84 §2)">
            <LigneR label="Prix de cession brut=" val={formatFC(res.prixCession)} />
            {res.fraisCession > 0 && (
              <LigneR signe="−" label="Frais de cession (notaire, agence, enregistrement)" val={formatFC(res.fraisCession)} neg />
            )}
            <Separateur />
            <LigneR signe="=" label="Prix de cession net=" val={formatFC(res.prixCessionNet)} bold />
          </EtapeResultat>

          <EtapeResultat numero={2} titre="Prix d'acquisition ajusté (Art. 84 §3-5)">
            {res.modeAcquisition === 'inconnu' ? (
              <>
                <LigneR label="Prix d'acquisition inconnu : forfait 75% du prix de cession=" val="" />
                <LigneR signe="=" label={`${formatFC(res.prixCession)} × 75%`} val={formatFC(res.prixAcqAjuste)} bold />
              </>
            ) : (
              <>
                <LigneR label={res.modeAcquisition === 'gratuit' ? "Valeur acte de donation/succession" : 'Prix d\'acquisition initial'} val={formatFC(res.prixAcquisitionSaisi)} />
                {res.modeAcquisition === 'connu' && res.fraisAcq > 0 && (
                  <LigneR signe="+"
                    label={res.fraisAcqMode === 'forfait'
                      ? `Frais d'acquisition (forfait 10% : ${formatFC(res.prixAcquisitionSaisi)} × 10%)`
                      : "Frais d'acquisition (justifiés)"}
                    val={formatFC(res.fraisAcq)} />
                )}
                {res.travaux !== null && res.travaux > 0 && (
                  <LigneR signe="+"
                    label={res.travauxMode === 'forfait'
                      ? `Travaux (forfait 15% : ${formatFC(res.prixAcquisitionSaisi)} × 15%)`
                      : 'Travaux (justifiés)'}
                    val={formatFC(res.travaux)} />
                )}
                <Separateur />
                <LigneR signe="=" label="Prix d'acquisition ajusté" val={formatFC(res.prixAcqAjuste)} bold />
              </>
            )}
          </EtapeResultat>

          <EtapeResultat numero={3} titre="Plus-value nette imposable (Art. 84 §1)">
            <LigneR label="Prix de cession net=" val={formatFC(res.prixCessionNet)} />
            <LigneR signe="−" label="Prix d'acquisition ajusté" val={formatFC(res.prixAcqAjuste)} neg />
            <Separateur />
            <LigneR signe="=" label="Plus-value nette=" val={formatFC(res.plusValueNette)} bold neg={res.plusValueNette < 0} />
            {res.plusValueNette < 0 && (
              <p className="text-xs text-muted-foreground mt-1">Moins-value constatée : base imposable ramenée à 0. Aucun IRPP exigible.</p>
            )}
          </EtapeResultat>

          {res.imposable > 0 && (
            <EtapeResultat numero={4} titre="Calcul de la retenue à la source (Art. 120)">
              <LigneR label="Plus-value nette imposable=" val={formatFC(res.imposable)} />
              <LigneR signe="×" label={`${formatFC(res.imposable)} × 20%`} val={formatFC(res.retenue)} bold accent />
              <Separateur />
              <div className="flex items-center gap-1 mt-1">
                <p className="text-xs text-muted-foreground">Versement par l'acquéreur au Trésor ≤ 15 du mois suivant :</p>
                <InfoTooltip
                  texte="Conformément à l'article 18 ter de la Loi n°004/2003 portant réforme des procédures fiscales (modifié par Loi 23/053), les retenues à la source opérées sur les plus-values doivent être versées par le débiteur des revenus (l'acquéreur) dans les quinze jours qui suivent le mois de leur réalisation. Chaque versement est accompagné d'une déclaration souscrite auprès du service gestionnaire.="
                  loi="Art. 18 ter, Loi n° 004/2003 réformée par Loi 23/053"
                />
              </div>
            </EtapeResultat>
          )}

          <BoxFinal label={res.imposable > 0 ? "Retenue à la source (20%)" : "IRPP dû"} val={formatFC(res.retenue)} />

        </ResultatWrap>
      )}
    </div>
  )
}

function CatEnConstruction({ num, titre, definition }: { num: number; titre: string; definition?: string }) {
  return (
    <div className="space-y-4">
      {definition && (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Définition : Cat. {num} : {titre}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{definition}</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3 rounded-xl border border-dashed border-border">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-xs font-semibold text-foreground">Simulateur Cat. {num} : disponible prochainement</p>
        <p className="text-xs text-muted-foreground max-w-xs">Le calcul de l'IRPP pour cette catégorie sera ajouté dans une prochaine mise à jour.</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CALENDRIER FISCAL INTERACTIF
// ─────────────────────────────────────────────────────────────────────────────
function CalendrierFiscal() {
  const [filtreImpot, setFiltreImpot] = React.useState<string>('tous')

  // Données calendrier : source = loi 004/2003 + CGI 2023 + LF 2025/2026
  const obligations: {
    impot: string
    couleur: string
    type: string
    echeance: string
    periodicite: string
    modePaiement: string
    consequences: string
    base: string
  }[] = [
    // ─ IS ─
    {
      impot: 'IS',
      couleur: 'emerald',
      type: 'Déclaration annuelle',
      echeance: '30 avril N+1',
      periodicite: 'Annuelle',
      modePaiement: 'Déclaration auto-liquidative + solde',
      consequences: 'Amende 3 000 000 FC (déclaration créditrice après MED) — Taxation d’office + majoration 50% si défaut persistant (Art. 89)',
      base: 'Art. 12 Loi 004/2003 mod. Art. 18 LF 2026 ; Art. 93 bis mod. Art. 34 LF 2026'
    },
    {
      impot: 'IS',
      couleur: 'emerald',
      type: '1er acompte (30% IS N−1)',
      echeance: '25 juillet',
      periodicite: 'Annuelle (provisionnel)',
      modePaiement: 'Bordereau d’acomptes provisionnels',
      consequences: 'Amende 50% de l’acompte non versé (Art. 98 bis) + intérêt moratoire 2%/mois',
      base: 'Art. 60 LF 2025 (n°24/011), conf. Art. 31 LF 2026'
    },
    {
      impot: 'IS',
      couleur: 'emerald',
      type: '2e acompte (30% IS N−1)',
      echeance: '25 septembre',
      periodicite: 'Annuelle (provisionnel)',
      modePaiement: 'Bordereau d’acomptes provisionnels',
      consequences: 'Amende 50% de l’acompte non versé (Art. 98 bis) + intérêt moratoire 2%/mois',
      base: 'Art. 60 LF 2025, conf. Art. 31 LF 2026'
    },
    {
      impot: 'IS',
      couleur: 'emerald',
      type: '3e acompte (20% IS N−1)',
      echeance: '25 novembre',
      periodicite: 'Annuelle (provisionnel)',
      modePaiement: 'Bordereau d’acomptes provisionnels',
      consequences: 'Amende 50% de l’acompte non versé (Art. 98 bis) + intérêt moratoire 2%/mois',
      base: 'Art. 60 LF 2025, conf. Art. 31 LF 2026'
    },
    {
      impot: 'IS',
      couleur: 'emerald',
      type: 'Solde IS (20% restants)',
      echeance: '30 avril N+1 (avec déclaration)',
      periodicite: 'Annuelle',
      modePaiement: 'Déclaration auto-liquidative',
      consequences: 'Intérêt moratoire 2%/mois sur solde non payé (Art. 91)',
      base: 'Art. 57 bis Loi 23/053'
    },
    {
      impot: 'IS',
      couleur: 'emerald',
      type: 'Dépôt PV Assemblée Générale',
      echeance: 'Dans les 10 jours après l’AG',
      periodicite: 'Annuelle',
      modePaiement: 'Dépôt DGI (pas de paiement)',
      consequences: 'Amende administrative (Art. 94 Loi 004/2003)',
      base: 'Art. 13 bis Loi 004/2003 créé par Art. 19 LF 2026'
    },
    // ─ IRPP ─
    {
      impot: 'IRPP',
      couleur: 'blue',
      type: 'Déclaration annuelle (Cat. 2-5)',
      echeance: '30 avril N+1',
      periodicite: 'Annuelle',
      modePaiement: 'Déclaration auto-liquidative accompagnée du paiement',
      consequences: 'Amende 400 000 FC (néant/exonéré) — Taxation d’office + 50% si défaut (Art. 89)',
      base: 'Art. 17 Loi 004/2003 mod. Art. 20 LF 2026 ; Art. 93 bis mod. Art. 34 LF 2026'
    },
    {
      impot: 'IRPP',
      couleur: 'blue',
      type: 'Retenue IRPP sur salaires (Cat. 1 — ex-IPR)',
      echeance: '15 du mois suivant',
      periodicite: 'Mensuelle',
      modePaiement: 'Déclaration mensuelle + versement retenue par l\'employeur',
      consequences: 'Intérêt 2%/mois + amende 50% retenue non opérée (Art. 96 + Art. 96 bis LF 2026)',
      base: 'Art. 18 Loi 23/053 ; Art. 96 bis créé par Art. 35 LF 2026'
    },
    {
      impot: 'IRPP',
      couleur: 'blue',
      type: 'IRPP Cat. 2 : 1er acompte (40%)',
      echeance: '31 janvier',
      periodicite: 'Annuelle',
      modePaiement: 'Déclaration auto-liquidative (60%+40%)',
      consequences: 'Intérêt moratoire 2%/mois + perte d’exonération éventuelle',
      base: 'Art. 57 bis Loi 23/053 (régime Petites Entreprises)'
    },
    {
      impot: 'IRPP',
      couleur: 'blue',
      type: 'Retenue IRPP sur revenus mobiliers (Cat. 4 — ex-IM)',
      echeance: '15 du mois suivant',
      periodicite: 'Mensuelle',
      modePaiement: 'Déclaration + versement par le débiteur des revenus',
      consequences: 'Intérêt 2%/mois (Art. 91) + responsabilité personnelle débiteur (Art. 96 bis LF 2026)',
      base: 'Art. 18 bis Loi 23/053 ; Art. 96 bis créé Art. 35 LF 2026'
    },
    {
      impot: 'IRPP',
      couleur: 'blue',
      type: 'Prélèvement non-résidents (20%)',
      echeance: '15 du mois suivant le paiement',
      periodicite: 'Sur chaque versement',
      modePaiement: 'Déclaration + versement (Art. 22 quarter)',
      consequences: 'Intérêt 2%/mois + responsabilité personnelle (Art. 96 bis)',
      base: 'Art. 22 quarter Loi 004/2003 créé par Art. 39 LF 2026'
    },
    // ─ CPCC (obligations comptables SYSCOHADA / SYCEBNL) ─
    {
      impot: 'CPCC',
      couleur: 'orange',
      type: 'Dépôt états financiers SYSCOHADA / SYCEBNL (exercice N)',
      echeance: '30 juin N+1 à 16h00',
      periodicite: 'Annuelle',
      modePaiement: 'Dépôt physique sur imprimés CPCC — Division Provinciale des Finances (cachet obligatoire)',
      consequences: 'Astreinte USD 100 pour non-dépôt + USD 100/jour de retard jusqu\'au dépôt effectif. Recouvrement exercices 2020-2024 en campagne depuis le 1er juillet 2025.',
      base: 'Circulaire CPCC N° CPCC/SG/WMK/757/DASTR/JLL/118/2025 du 17 juin 2025 ; Arrêté Ministériel n°024/CAB/MIN/FINANCES/2024 du 30 juillet 2024'
    },
    // ─ TVA ─
    {
      impot: 'TVA',
      couleur: 'violet',
      type: 'Déclaration mensuelle TVA',
      echeance: '15 du mois suivant',
      periodicite: 'Mensuelle',
      modePaiement: 'Déclaration + paiement simultanés (Art. 60 CGI-TVA)',
      consequences: 'Amende 1 500 000 FC (défaut déclaration) + intérêt 2%/mois sur TVA due — Amende 500 000 FC si aucune opération (néant non déclaré)',
      base: 'Art. 60 CGI 2023 ; LF 2023 peine TVA (Art. 7 CGI-TVA patchs)'
    },
    {
      impot: 'TVA',
      couleur: 'violet',
      type: 'TVA import : avant enlèvement',
      echeance: 'Avant enlèvement marchandise',
      periodicite: 'Sur chaque opération',
      modePaiement: 'Paiement douanes avant main-levée',
      consequences: 'Blocage enlèvement + pénalités douanières',
      base: 'Art. 61 CGI-TVA'
    },
    {
      impot: 'TVA',
      couleur: 'violet',
      type: 'Prorata définitif TVA',
      echeance: '31 mars de l’année suivante',
      periodicite: 'Annuelle',
      modePaiement: 'Régularisation sur déclaration mensuelle suivante',
      consequences: 'Perte du droit à déduction sur les exercices antérieurs non régularisés',
      base: 'Art. 45 al. 2 CGI-TVA'
    },
  ]

  const impots = ['tous', 'IS', 'IRPP', 'TVA', 'CPCC']
  const couleurFiltres: Record<string, string> = {
    tous: 'bg-slate-700 text-white',
    IS: 'bg-emerald-600 text-white',
    IRPP: 'bg-blue-600 text-white',
    TVA: 'bg-violet-600 text-white',
    CPCC: 'bg-orange-600 text-white',
  }
  const couleurInactif = 'bg-card border border-border text-foreground hover:bg-muted/40'

  const BADGE: Record<string, string> = {
    IS: 'bg-emerald-100 text-emerald-800',
    IRPP: 'bg-blue-100 text-blue-800',
    TVA: 'bg-violet-100 text-violet-800',
    CPCC: 'bg-orange-100 text-orange-800',
  }

  const filtered = filtreImpot === 'tous' ? obligations : obligations.filter(o => o.impot === filtreImpot)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
        <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-0.5">Calendrier fiscal de référence</p>
        <p className="text-xs text-teal-600/80">Délais légaux de déclaration et de paiement — IS, IRPP, TVA. CGI 2023 + LF 2025 + LF 2026.</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {impots.map(i => (
          <button
            key={i}
            onClick={() => setFiltreImpot(i)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
              filtreImpot === i ? couleurFiltres[i] : couleurInactif
            )}
          >
            {i === 'tous' ? 'Tous les impôts' : i}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">{filtered.length} obligation(s)</span>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold text-foreground w-14">Impôt</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground">Obligation</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground whitespace-nowrap">Date butoir</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground">Périodicité</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground hidden sm:table-cell">Mode de paiement</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground">Conséquences du dépassement</th>
              <th className="text-left py-2 px-3 font-semibold text-foreground hidden md:table-cell">Base légale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map((o, idx) => (
              <tr key={idx} className="hover:bg-muted/20 transition-colors">
                <td className="py-2 px-3">
                  <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-bold', BADGE[o.impot])}>{o.impot}</span>
                </td>
                <td className="py-2 px-3 font-medium text-foreground">{o.type}</td>
                <td className="py-2 px-3">
                  <span className="font-semibold text-rose-600 whitespace-nowrap">{o.echeance}</span>
                </td>
                <td className="py-2 px-3 text-foreground/70">{o.periodicite}</td>
                <td className="py-2 px-3 text-foreground/70 hidden sm:table-cell">{o.modePaiement}</td>
                <td className="py-2 px-3 text-amber-700">{o.consequences}</td>
                <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{o.base}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note pédagogique */}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-3 space-y-1">
        <p className="text-xs font-semibold text-teal-700">Note pédagogique</p>
        <p className="text-xs text-teal-600 leading-relaxed">
          Les délais ci-dessus sont des <span className="font-semibold">délais de déchéance</span> : leur dépassement entraîne automatiquement des sanctions sans mise en demeure préalable pour certaines infractions (Art. 93 bis). Le point de départ de l’intérêt moratoire (Art. 91) est le premier jour du mois suivant l’échéance. Tout mois commencé est compté intégralement.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATEUR MAJORATIONS ART. 89 + AMENDES ART. 93 bis
// ─────────────────────────────────────────────────────────────────────────────
function SimulateurPenalitesAssiette() {
  const [typeInfraction, setTypeInfraction] = React.useState<string>('')
  const [montantImpot, setMontantImpot] = React.useState<string>('')
  const [moisRetard, setMoisRetard] = React.useState<string>('')
  const [recidive, setRecidive] = React.useState<boolean>(false)
  const [typeDecl, setTypeDecl] = React.useState<string>('is_crediteur')

  const impot = parseFloat(montantImpot) || 0
  const mois = parseInt(moisRetard) || 0

  // Infractions Art. 89
  const INFRACTIONS_89 = [
    {
      id: 'reg_avant_med',
      label: 'Régularisation spontanée (avant MED)',
      description: 'Le contribuable détecte lui-même l\'erreur et corrige sa déclaration AVANT toute intervention de l\'administration fiscale. C\'est la situation la moins pénalisée (25%). À distinguer du redressement où c\'est le fisc qui trouve l\'erreur.',
      taux: 0.25,
      recidiveAllowed: false,
      art: 'Art. 89 al. 1 Loi 004/2003',
      couleur: 'amber',
    },
    {
      id: 'redressement',
      label: 'Redressement (insuffisance déclaration)',
      description: 'L\'administration détecte lors d\'un contrôle fiscal que le contribuable a sous-évalué son impôt (revenus omis, charges fictives, déductions injustifiées, etc.). Elle reconstitue le vrai montant dû et applique une majoration de 20% (ou 40% en récidive).',
      taux: recidive ? 0.40 : 0.20,
      recidiveAllowed: true,
      art: recidive ? 'Art. 89 al. 3 (récidive)' : 'Art. 89 al. 2',
      couleur: 'rose',
    },
    {
      id: 'taxation_office',
      label: 'Taxation d’office (absence de déclaration)',
      description: 'Le contribuable n\'a déposé aucune déclaration malgré l\'obligation légale et une mise en demeure restée sans suite. L\'administration fixe elle-même l\'impôt à partir des éléments disponibles (relevés bancaires, comparaisons sectorielles). Pénalité la plus lourde : 50% (ou 100% en récidive).',
      taux: recidive ? 1.00 : 0.50,
      recidiveAllowed: true,
      art: recidive ? 'Art. 89 al. 5 (récidive)' : 'Art. 89 al. 4',
      couleur: 'red',
    },
  ]

  // Amendes Art. 93 bis (mod. LF 2026 Art. 34)
  const AMENDES_93BIS = [
    {
      id: 'neant',
      label: 'Déclaration exonérée / néant (non déposée)',
      montantFixe: 400000,
      description: 'Contribuable exonéré d\'impôt (association, entité publique, etc.) ou ayant eu une période sans activité imposable, mais qui n\'a pas déposé sa déclaration obligatoire mentionnant "néant". L\'obligation de dépôt existe même si aucun impôt n\'est dû.',
      art: 'Art. 93 bis al. 1 mod. Art. 34 LF 2026',
      couleur: 'orange',
    },
    {
      id: 'is_crediteur',
      label: 'Déclaration IS créditrice (après MED)',
      montantFixe: 3000000,
      description: 'L\'IS calculé est inférieur aux acomptes déjà versés : le contribuable est en situation de crédit d\'impôt. Malgré cela, l\'obligation de dépôt de la déclaration annuelle reste obligatoire. Si la déclaration n\'est pas déposée et qu\'une mise en demeure est envoyée sans réponse, cette amende forfaitaire de 3 000 000 FC s\'applique.',
      art: 'Art. 93 bis al. 2 mod. Art. 34 LF 2026',
      couleur: 'rose',
    },
  ]

  const infraction89 = INFRACTIONS_89.find(i => i.id === typeInfraction)
  const amende93 = AMENDES_93BIS.find(a => a.id === typeDecl)

  // Calculs Art. 89
  const majoration = infraction89 ? impot * infraction89.taux : 0
  const interetRetard = (infraction89 && infraction89.id !== 'reg_avant_med' && mois > 0)
    ? Math.min(impot * 0.02 * mois, impot * 0.50)
    : 0
  const totalArt89 = impot + majoration + interetRetard

  const COLOR_BORDER: Record<string, string> = {
    amber: 'border-amber-200 bg-amber-50',
    rose:  'border-rose-200 bg-rose-50',
    red:   'border-red-200 bg-red-50',
    orange:'border-orange-200 bg-orange-50',
  }
  const COLOR_TEXT: Record<string, string> = {
    amber: 'text-amber-700',
    rose:  'text-rose-700',
    red:   'text-red-700',
    orange:'text-orange-700',
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
        <p className="text-xs font-bold text-violet-700 uppercase tracking-wide mb-0.5">Simulateur de majorations d’assiette</p>
        <p className="text-xs text-violet-600/80">Art. 89 CGI 2023 (pénalités d’assiette) + Art. 93 bis mod. LF 2026 (amendes forfaitaires)</p>
      </div>

      {/* ─ SECTION 1 : Art. 89 ─ */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-rose-500" />Majorations d’assiette
          <InfoTooltip
            texte="Une majoration d’assiette est une pénalité calculée en pourcentage de l’impôt qui aurait dû être déclaré. L’assiette est la base sur laquelle l’impôt est calculé (bénéfice, salaire brut, chiffre d’affaires...). Ces majorations sanctionnent l’inexactitude ou l’absence de déclaration, en ajoutant un pourcentage supplémentaire à l’impôt principal."
            loi="Art. 89 Loi n°004/2003 portant réforme des procédures fiscales"
          />
          — Art. 89 Loi 004/2003</p>
        <p className="text-xs text-muted-foreground">Sélectionnez le type d’infraction, saisissez le montant de l’impôt éludé ou reconstitué et le nombre de mois de retard.</p>

        {/* Choix infraction */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground flex items-center gap-1">Type d’infraction
            <InfoTooltip
              texte="Le type d’infraction détermine le taux de la majoration. Plus l’infraction est grave (absence totale de déclaration) ou volontaire (manœuvres frauduleuses), plus le taux est élevé. La régularisation spontanée avant toute intervention du fisc est toujours traitée plus favorablement."
              loi="Art. 89 al. 1 à 5 Loi 004/2003"
            />
          </p>
          <div className="grid grid-cols-1 gap-2">
            {INFRACTIONS_89.map(inf => (
              <button
                key={inf.id}
                onClick={() => setTypeInfraction(inf.id)}
                className={cn(
                  'text-left rounded-lg border px-3 py-2.5 transition-all text-xs',
                  typeInfraction === inf.id
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-border bg-background hover:bg-muted/40'
                )}
              >
                <p className="font-semibold text-foreground">{inf.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{inf.description} — <span className="font-medium">{(inf.taux * 100).toFixed(0)}%</span></p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{inf.art}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Récidive */}
        {typeInfraction && typeInfraction !== 'reg_avant_med' && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="recidive"
              checked={recidive}
              onChange={e => setRecidive(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-rose-500"
            />
            <label htmlFor="recidive" className="text-xs text-foreground cursor-pointer flex items-center gap-1">
              <span className="font-semibold">Récidive</span>
              <InfoTooltip
                texte="La récidive est retenue quand le contribuable a déjà été sanctionné pour la même infraction et recommence dans un délai de 2 ans (impôts annuels : IS, IRPP) ou 6 mois (impôts mensuels : TVA, retenues). En cas de récidive, les taux sont doublés : redressement passe de 20% à 40%, taxation d’office de 50% à 100%. L’administration doit prouver la première infraction antérieure."
                loi="Art. 89 al. dernier Loi 004/2003"
              />
              — même infraction dans les 2 ans (IS/IRPP) ou 6 mois (TVA/retenues)
            </label>
          </div>
        )}

        {/* Saisie montants */}
        {typeInfraction && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Montant de l’impôt éludé / reconstitué (FC)</label>
              <input
                type="number" placeholder="Ex : 2 000 000"
                value={montantImpot}
                onChange={e => setMontantImpot(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {typeInfraction !== 'reg_avant_med' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">Mois de retard
                  <InfoTooltip
                    texte="Nombre de mois écoulés entre la date légale d’échéance et le paiement effectif. Tout mois commencé est compté en entier. L’intérêt court dès le 1er jour du mois suivant l’échéance. Exemple : échéance le 30 avril, paiement le 15 juillet = 3 mois (mai, juin, juillet). L’intérêt est plafonné à 50% de l’impôt principal, quelle que soit la durée du retard."
                    loi="Art. 91 CGI 2023"
                  />
                </label>
                <input
                  type="number" placeholder="Ex : 4"
                  value={moisRetard}
                  onChange={e => setMoisRetard(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}
          </div>
        )}

        {/* Résultat Art. 89 */}
        {infraction89 && impot > 0 && (
          <div className={cn('rounded-xl border p-4 space-y-2', COLOR_BORDER[infraction89.couleur])}>
            <p className={cn('text-xs font-bold mb-2', COLOR_TEXT[infraction89.couleur])}>Résultat — {infraction89.label}</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-foreground/80">Montant de l’impôt de base</span>
                <span className="font-mono font-semibold text-foreground">{formatFC(impot)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/80">Majoration ({(infraction89.taux * 100).toFixed(0)}%) — <span className="font-mono">{infraction89.art}</span></span>
                <span className="font-mono font-semibold text-rose-600">{formatFC(majoration)}</span>
              </div>
              {interetRetard > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-foreground/80">Intérêt de retard (2%/mois × {mois} mois, plafonné 50%) — Art. 89 al. 5</span>
                  <span className="font-mono font-semibold text-rose-600">{formatFC(interetRetard)}</span>
                </div>
              )}
              <div className="border-t border-current/20 my-1" />
              <div className="flex justify-between text-xs">
                <span className="font-bold text-foreground">Total dû (impôt + pénalités)</span>
                <span className={cn('font-mono font-bold', COLOR_TEXT[infraction89.couleur])}>{formatFC(totalArt89)}</span>
              </div>
              {interetRetard === impot * 0.50 && mois > 0 && (
                <p className="text-[10px] text-amber-600 mt-1">⚠ Plafond 50% atteint : l’intérêt de retard ne peut pas dépasser 50% de l’impôt de base (Art. 89 al. 5 in fine)</p>
              )}
              <div className="mt-2 rounded-lg bg-white/60 border border-current/10 p-2">
                <p className="text-[11px] text-foreground/70">
                  <span className="font-semibold">Référence légale :</span> {infraction89.art} — Loi n°004/2003 du 13 mars 2003 portant réforme des procédures fiscales (RDC), mod. par O.-L. n°13/005 du 23/02/2013 et L.F. n°18/025 du 13/12/2018.
                  {recidive && ' Récidive : même infraction commise dans les 2 ans (impôts annuels) ou 6 mois (autres).'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─ SECTION 2 : Art. 93 bis ─ */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-orange-500" />Amendes forfaitaires
          <InfoTooltip
            texte="Une amende forfaitaire est un montant fixe imposé indépendamment du montant de l’impôt. Elle sanctionne le seul fait de ne pas avoir déposé une déclaration, même si aucun impôt n’est dû. À distinguer des majorations Art. 89 qui sont proportionnelles à l’impôt éludé. Les deux peuvent se cumuler."
            loi="Art. 93 bis Loi 004/2003 mod. Art. 34 LF 2026"
          />
          — Art. 93 bis (mod. Art. 34 LF 2026)</p>
        <p className="text-xs text-muted-foreground">Ces amendes s’appliquent indépendamment des majorations Art. 89. Montants révisés par la Loi de Finances 2026.</p>

        {/* Choix type déclaration */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground flex items-center gap-1">Type de déclaration concernée
            <InfoTooltip
              texte="L’Art. 93 bis prévoit deux situations distinctes : (1) le contribuable exonéré ou sans opération qui oublie de déposer une déclaration « néant », et (2) la société qui ne dépose pas sa déclaration IS alors qu’elle est créditrice (l’administration lui doit un remboursement). Dans ce second cas, l’amende est plus lourde car la société prive l’État d’informations financières stratégiques."
              loi="Art. 93 bis mod. Art. 34 LF 2026"
            />
          </p>
          <div className="grid grid-cols-1 gap-2">
            {AMENDES_93BIS.map(a => (
              <button
                key={a.id}
                onClick={() => setTypeDecl(a.id)}
                className={cn(
                  'text-left rounded-lg border px-3 py-2.5 transition-all text-xs',
                  typeDecl === a.id
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-border bg-background hover:bg-muted/40'
                )}
              >
                <p className="font-semibold text-foreground">{a.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{a.description}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{a.art}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Résultat Art. 93 bis */}
        {amende93 && (
          <div className={cn('rounded-xl border p-4 space-y-2', COLOR_BORDER[amende93.couleur])}>
            <p className={cn('text-xs font-bold mb-2', COLOR_TEXT[amende93.couleur])}>Amende forfaitaire applicable</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground/80">{amende93.label}</span>
              <span className={cn('font-mono font-bold text-base', COLOR_TEXT[amende93.couleur])}>{formatFC(amende93.montantFixe)}</span>
            </div>
            <div className="mt-2 rounded-lg bg-white/60 border border-current/10 p-2">
              <p className="text-[11px] text-foreground/70">
                <span className="font-semibold">Référence légale :</span> {amende93.art} — Loi n°004/2003 du 13 mars 2003 portant réforme des procédures fiscales, tel que modifié par l’Art. 34 de la Loi de Finances n°25/060 du 29 déc. 2025 (LF 2026).
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">⚠ Ces amendes sont <span className="font-semibold">cumulables</span> avec les majorations Art. 89 si l’infraction déclenche également un contrôle d’assiette.</p>
          </div>
        )}
      </div>

      {/* Note pédagogique */}
      <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 space-y-1">
        <p className="text-xs font-semibold text-violet-700">Distinction à retenir</p>
        <p className="text-xs text-violet-600 leading-relaxed">
          <span className="font-semibold">Art. 89</span> : pénalités <span className="font-semibold">proportionnelles</span> à l’impôt (25%, 20%, 50%, etc.) — elles s’appliquent quand un montant d’impôt est en cause. |
          <span className="font-semibold"> Art. 93 bis</span> : amendes <span className="font-semibold">forfaitaires</span> (montant fixe) pour le seul fait de ne pas avoir déposé une déclaration dans les délais, indépendamment de tout impôt dû.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCÉDURES FISCALES : Loi n°004/2003 du 13 mars 2003 (RDC)
// ─────────────────────────────────────────────────────────────────────────────
function ProceduresFiscales() {
  const [titrActif, setTitreActif] = useState('titre1')
  const [montantPrincipal, setMontantPrincipal] = useState('')
  const [moisRetard, setMoisRetard] = useState('')

  const titres = [
    { id: 'titre1', label: 'Titre I',   sublabel: 'Obligations',  color: 'blue' },
    { id: 'titre2', label: 'Titre II',  sublabel: 'Contrôle',     color: 'indigo' },
    { id: 'titre3', label: 'Titre III', sublabel: 'Recouvrement', color: 'emerald' },
    { id: 'titre4', label: 'Titre IV',  sublabel: 'Pénalités',    color: 'rose' },
    { id: 'titre5', label: 'Titre V',   sublabel: 'Recours',      color: 'amber' },
    { id: 'calcul',      label: 'Calcul',    sublabel: 'Pénalités',    color: 'orange' },
    { id: 'calendrier',  label: 'Calendrier',sublabel: 'Fiscal',        color: 'teal' },
    { id: 'simulateur',  label: 'Simulateur',sublabel: 'Art. 89/93bis', color: 'violet' },
  ]

  const principal = parseFloat(montantPrincipal) || 0
  const mois = parseInt(moisRetard) || 0
  const interetTotal = Math.min(principal * 0.02 * mois, principal * 0.50)
  const totalDu = principal + interetTotal

  return (
    <div className="space-y-4">

      {/* Navigation titres */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
        {titres.map(t => {
          const isActif = titrActif === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTitreActif(t.id)}
              className={cn(
                'rounded-xl border flex flex-col items-center justify-center px-1 py-2 text-center',
                'transition-all duration-200 focus:outline-none',
                isActif
                  ? `${COLOR_MAP[t.color]} shadow-md border-transparent scale-[1.03]`
                  : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'
              )}
            >
              <p className={cn('text-xs font-bold leading-tight', isActif ? 'text-white' : 'text-foreground')}>{t.label}</p>
              <p className={cn('text-[10px] leading-tight mt-0.5', isActif ? 'text-white/80' : 'text-muted-foreground')}>{t.sublabel}</p>
            </button>
          )
        })}
      </div>

      {/* ── TITRE I : Obligations déclaratives ── */}
      {titrActif === 'titre1' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Titre I : Obligations déclaratives</p>
            <p className="text-xs text-blue-600/80">Art. 1 à 24 : Loi n°004/2003 du 13 mars 2003</p>
          </div>

          {/* Section 1 : Identification */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-blue-500" />Identification fiscale (Art. 1–5)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Toute personne physique ou morale exerçant une activité imposable est tenue de s'immatriculer auprès de la Direction Générale des Impôts (DGI) <span className="font-semibold">dans les 15 jours</span> suivant le début de l'activité (Art. 1).</p>
              <p>• L'immatriculation donne lieu à la délivrance d'un <span className="font-semibold">Numéro Impôt</span> unique et permanent, obligatoire sur toute déclaration, facture ou acte administratif (Art. 3).</p>
              <p>• Toute modification (adresse, nature d'activité, cessation) doit être notifiée à la DGI <span className="font-semibold">dans les 15 jours</span> (Art. 5).</p>
            </div>
          </div>

          {/* Section 2 : Délais de déclaration */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Calculator className="h-3.5 w-3.5 text-blue-500" />Délais de déclaration par impôt (Art. 6–24)</p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 pr-3 font-semibold text-foreground">Impôt</th>
                    <th className="text-left py-1.5 pr-3 font-semibold text-foreground">Échéance</th>
                    <th className="text-left py-1.5 font-semibold text-foreground">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Impôt foncier (IF)</td><td className="py-1.5 pr-3 font-semibold text-foreground">1er février (annuel)</td><td className="py-1.5 text-muted-foreground">Art. 6 CGI 2023</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">IRL (revenus loc. bâtis)</td><td className="py-1.5 pr-3 font-semibold text-foreground">1er février (annuel)</td><td className="py-1.5 text-muted-foreground">Art. 11 CGI 2023</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">IRPP / IS (bénéfices)</td><td className="py-1.5 pr-3 font-semibold text-foreground">30 avril de l'année N+1</td><td className="py-1.5 text-muted-foreground">Art. 12 CGI 2023</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">IRPP Cat. 1 / IPR (salaires)</td><td className="py-1.5 pr-3 font-semibold text-foreground">Dans les 15 jours du mois suivant</td><td className="py-1.5 text-muted-foreground">Art. 17 CGI 2023</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Impôt mobilier (IM)</td><td className="py-1.5 pr-3 font-semibold text-foreground">Dans les 15 jours du mois suivant</td><td className="py-1.5 text-muted-foreground">Art. 19 CGI 2023</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">TVA</td><td className="py-1.5 pr-3 font-semibold text-foreground">15 du mois suivant la période</td><td className="py-1.5 text-muted-foreground">Art. 20 CGI 2023</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2b : Obligations complémentaires LF 2026 */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-blue-500" />Obligations complémentaires (LF 2026)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• <span className="font-semibold">Procès-verbal d'Assemblée Générale (IS)</span> — Art. 13 bis (créé par Art. 19 LF 2026) : les sociétés soumises à l'IS sont tenues de déposer auprès de l'Administration des impôts, <span className="font-semibold">dans les 10 jours de la tenue de l'Assemblée générale ordinaire</span> approuvant les états financiers certifiés par les CAC, le procès-verbal de ladite Assemblée générale.</p>
              <p>• <span className="font-semibold">Déclaration du prélèvement sur revenus versés à des non-résidents</span> — Art. 22 quarter (créé par Art. 39 LF 2026) : les sociétés établies en RDC qui versent des revenus de capitaux mobiliers à des personnes non-résidentes sont tenues de souscrire une déclaration, accompagnée du paiement, <span className="font-semibold">au plus tard le 15 du mois qui suit</span> celui du paiement ou de la mise à disposition de ces revenus.</p>
            </div>
          </div>

          {/* Section 3 : Facturation */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Receipt className="h-3.5 w-3.5 text-blue-500" />Obligations de facturation (Art. 16–24)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Tout assujetti est tenu de <span className="font-semibold">délivrer une facture</span> pour toute opération commerciale (vente de bien ou prestation de service), sous peine d'amende (Art. 16).</p>
              <p>• La facture doit mentionner : numéro d'ordre, date, identité du vendeur et de l'acheteur, <span className="font-semibold">Numéro Impôt</span>, nature de l'opération, montants HT, taux et montant TVA, montant TTC (Art. 17).</p>
              <p>• Les livres de commerce et pièces justificatives doivent être conservés <span className="font-semibold">pendant 10 ans</span> (Art. 20).</p>
              <p>• Les doubles de factures et documents fiscaux doivent être gardés <span className="font-semibold">conformément à la législation commerciale</span> (OHADA : 10 ans). Par prudence fiscale, la conservation couvre au minimum le <span className="font-semibold">délai de rappel en vigueur : 4 ans</span> (Art. 24 loi 004/2003 + LF 2025 Art. 38).</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TITRE II : Contrôle fiscal ── */}
      {titrActif === 'titre2' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-1">Titre II : Contrôle fiscal</p>
            <p className="text-xs text-indigo-600/80">Art. 25 à 56 : Vérification, redressement, taxation d'office</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-indigo-500" />Vérification de comptabilité (Art. 25–35)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'administration fiscale peut procéder à la vérification des déclarations, actes et documents déposés par les contribuables (Art. 25).</p>
              <p>• Un <span className="font-semibold">avis de vérification</span> doit être remis au contribuable au moins <span className="font-semibold">8 jours avant</span> le début des opérations (Art. 28).</p>
              <p>• Le contribuable peut se faire assister par un <span className="font-semibold">conseil de son choix</span> (Art. 29).</p>
              <p>• La durée maximale de vérification sur place dépend de la taille du contribuable (Art. 30 bis, mod. LF 2022) :</p>
              <p className="pl-3">— <span className="font-semibold">Petite Entreprise (PE)</span> : 3 mois maximum</p>
              <p className="pl-3">— <span className="font-semibold">Moyenne Entreprise (ME)</span> : 6 mois maximum</p>
              <p className="pl-3">— <span className="font-semibold">Grande Entreprise (GE)</span> : 9 mois maximum</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-indigo-500" />Procédure contradictoire (Art. 36–45)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• À l'issue de la vérification, l'administration adresse une <span className="font-semibold">notification de redressement</span> motivée au contribuable (Art. 36).</p>
              <p>• Le contribuable dispose de <span className="font-semibold">20 jours</span> pour présenter ses observations (Art. 37).</p>
              <p>• L'administration dispose de <span className="font-semibold">30 jours</span> pour répondre aux observations du contribuable (Art. 38). Sans réponse dans ce délai, les observations sont réputées acceptées.</p>
              <p>• En l'absence d'observations du contribuable dans les 20 jours, le redressement est considéré <span className="font-semibold">accepté tacitement</span> (Art. 37 al. 2).</p>
              <p>• En cas d'accord, un acte de <span className="font-semibold">conciliation fiscale</span> est établi (Art. 40).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-rose-500" />Taxation d'office (Art. 46–52)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'administration peut taxer d'office un contribuable dans <span className="font-semibold">5 cas</span> (Art. 41) :</p>
              <p className="pl-3">1. N'a pas souscrit de déclaration dans les délais légaux</p>
              <p className="pl-3">2. N'a pas tenu de comptabilité régulière</p>
              <p className="pl-3">3. N'a pas remis les pièces et documents demandés par l'administration</p>
              <p className="pl-3">4. A présenté une comptabilité irrégulière rejetée par l'administration</p>
              <p className="pl-3">5. S'est opposé au contrôle fiscal</p>
              <p>• La taxation d'office est précédée d'une <span className="font-semibold">mise en demeure</span> restée sans effet (Art. 41 al. 2).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-indigo-500" />Droit de communication et prescription (Art. 53–56)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'administration a un <span className="font-semibold">droit de communication</span> auprès des banques, entreprises et organismes publics pour obtenir tout renseignement utile à l'assiette des impôts (Art. 53).</p>
              <p>• Le droit de rappel des impôts se prescrit par <span className="font-semibold">4 ans</span> à compter de l'année d'imposition (Art. 43 Loi 004/2003, mod. LF 2022). La non-revérification d'une période déjà contrôlée est protégée sauf éléments nouveaux (Art. 45).</p>
              <p>• La prescription est interrompue par tout acte de poursuite notifié au contribuable (Art. 56).</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TITRE III : Recouvrement ── */}
      {titrActif === 'titre3' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Titre III : Recouvrement</p>
            <p className="text-xs text-emerald-600/80">Art. 57 à 82 : Paiement, AMR, acomptes, étalement</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Coins className="h-3.5 w-3.5 text-emerald-500" />Paiement spontané (Art. 57–62)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'impôt est payable <span className="font-semibold">au moment du dépôt de la déclaration</span> (paiement spontané), sauf disposition contraire (Art. 57).</p>
              <p>• Tout paiement donne lieu à la délivrance d'une <span className="font-semibold">quittance</span> par le receveur des impôts (Art. 60).</p>
              <p>• Les modes de paiement admis : espèces, chèque bancaire certifié, virement bancaire ou tout autre moyen autorisé par l'administration (Art. 62).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-emerald-500" />Avis de Mise en Recouvrement (AMR) et poursuites (Art. 60–66)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'<span className="font-semibold">Avis de Mise en Recouvrement (AMR)</span> est le titre exécutoire émis lorsque le contribuable n'a pas payé spontanément. Il précise : identité, montant principal, pénalités, délai (Art. 60).</p>
              <p>• Le contribuable dispose de <span className="font-semibold">15 jours</span> à compter de la notification de l'AMR pour payer (Art. 60 Loi 004/2003).</p>
              <p>• En cas de déclaration sans paiement : <span className="font-semibold">mise en demeure sous 8 jours</span> (Art. 64), puis <span className="font-semibold">commandement sous 8 jours</span> après la MED (Art. 65).</p>
              <p>• Mesures de poursuites disponibles (Art. 66) : avis à tiers détenteurs, saisies mobilières et immobilières, fermeture provisoire d'établissement.</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Calculator className="h-3.5 w-3.5 text-emerald-500" />Acomptes provisionnels (Art. 71–76)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Les redevables de l'IRPP (Cat. 2, 3, 4) et de l'IS sont tenus de verser des <span className="font-semibold">acomptes provisionnels</span> calculés sur la base de l'impôt de l'exercice précédent (Art. 71).</p>
              <p>• Les acomptes IS sont versés en <span className="font-semibold">3 fractions</span> sur bordereau : 30% au plus tard le 25 juillet, 30% au plus tard le 25 septembre, 20% au plus tard le 25 novembre. Total : 80% de l'IS N-1 (Art. 60 LF 2025, conf. Art. 31 LF 2026).</p>
              <p>• Le solde (IS dû − acomptes versés) est acquitté lors du dépôt de la déclaration annuelle au <span className="font-semibold">30 avril N+1</span>.</p>
              <p>• L'excédent d'acomptes par rapport à l'impôt dû est <span className="font-semibold">restitué ou imputé</span> sur les prochaines obligations (Art. 57 al. 3).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-emerald-500" />Étalement de paiement (Art. 77–82)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• En cas de difficultés de trésorerie, le contribuable peut solliciter un <span className="font-semibold">délai de paiement</span> auprès du receveur des impôts compétent, dans la limite de <span className="font-semibold">6 mois maximum</span> (Art. 74).</p>
              <p>• L'étalement ne suspend pas le cours des <span className="font-semibold">intérêts moratoires</span> (Art. 79).</p>
              <p>• Le non-respect du calendrier d'étalement entraîne l'exigibilité immédiate de la totalité des sommes dues (Art. 81).</p>
              <p>• <span className="font-semibold">Prescription du recouvrement : 15 ans</span> à compter de la date d'exigibilité de l'impôt (Art. 73).</p>
              <p>• <span className="font-semibold">Quitus fiscal</span> (Art. 82 bis, créé LF 2021) : attestation de situation fiscale régulière, obligatoire pour l'accès aux marchés publics et aux contrats de concession.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TITRE IV : Pénalités ── */}
      {titrActif === 'titre4' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-1">Titre IV : Pénalités et sanctions</p>
            <p className="text-xs text-rose-600/80">Art. 83 à 103 : Majorations, intérêts, amendes, sanctions pénales</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-rose-500" />Pénalités pour défaut ou retard de déclaration (Art. 83–88)</p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 pr-2 font-semibold text-foreground">Situation</th>
                    <th className="text-left py-1.5 pr-2 font-semibold text-foreground">Majoration</th>
                    <th className="text-left py-1.5 font-semibold text-foreground">Article</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Régularisation spontanée avant MED</td><td className="py-1.5 pr-2 font-semibold text-amber-600">+25% des droits dus</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 1</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Absence déclaration — taxation d'office</td><td className="py-1.5 pr-2 font-semibold text-rose-600">+50% des droits dus</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 2</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Récidive — taxation d'office</td><td className="py-1.5 pr-2 font-semibold text-rose-700">+100% des droits dus</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 3</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Insuffisance révélée par redressement</td><td className="py-1.5 pr-2 font-semibold text-rose-600">+20% des droits redressés</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 4</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Insuffisance — redressement (récidive)</td><td className="py-1.5 pr-2 font-semibold text-rose-600">+40% des droits redressés</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 5</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Plafond pénalités d'assiette</td><td className="py-1.5 pr-2 font-semibold text-rose-500">50% de l'impôt principal</td><td className="py-1.5 text-muted-foreground">Art. 89 al. 6</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Percent className="h-3.5 w-3.5 text-rose-500" />Intérêt moratoire et frais de poursuites (Art. 89–95)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Tout impôt non payé à l'échéance est majoré d'un <span className="font-semibold">intérêt moratoire de 2% par mois</span> de retard (Art. 91 CGI 2023). Cet intérêt est plafonné à 50% de l'impôt principal (Art. 89).</p>
              <p>• <span className="font-semibold">Astreinte communication de pièces</span> (Art. 92) : 100 000 FC/jour (personne morale) — 25 000 FC/jour (personne physique).</p>
              <p>• <span className="font-semibold">Astreinte documentation prix de transfert</span> (Art. 92 bis, créé par Art. 33 LF 2026) : <span className="font-semibold text-rose-600">10 000 000 FC/jour</span> en cas de défaut de réponse à la demande d'informations ou documents sur les prix de transfert (Art. 29 bis).</p>
              <p>• <span className="font-semibold">Responsabilité personnelle du débiteur de retenue</span> (Art. 96 bis, créé par Art. 35 LF 2026) : toute personne tenue d'opérer une retenue à la source qui ne l'effectue pas — ou l'effectue insuffisamment — est <span className="font-semibold">personnellement redevable</span> du montant de la retenue non effectuée et des pénalités y afférentes.</p>
              <p>• Défaut d'acompte ou acompte insuffisant : <span className="font-semibold">amende 50%</span> de l'acompte non versé (Art. 98 bis).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-rose-500" />Amendes fiscales (Art. 96–100)</p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 pr-2 font-semibold text-foreground">Infraction</th>
                    <th className="text-left py-1.5 pr-2 font-semibold text-foreground">PM <InfoTooltip texte="Personne Morale : société, SARL, SA, établissement public, association enregistrée. Soumise à l'IS ou à l'IRPP selon le régime." loi="Art. 4 Loi 23/052 (IS)" /></th>
                    <th className="text-left py-1.5 pr-2 font-semibold text-foreground">PP <InfoTooltip texte="Personne Physique : individu agissant en son nom propre (commerçant, professionnel libéral, particulier). Soumis à l'IRPP." loi="Art. 4 Loi 23/053 (IRPP)" /></th>
                    <th className="text-left py-1.5 font-semibold text-foreground">Art.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Défaut déclaration (exonéré / néant)</td><td className="py-1.5 pr-2 font-semibold text-rose-600">400 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">—</td><td className="py-1.5 text-muted-foreground">Art. 93 bis mod. Art. 34 LF 2026</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">IBP créditeur <InfoTooltip texte="IBP créditeur = Impôt sur les Bénéfices et Profits avec solde en faveur du contribuable (IS négatif après acomptes). Après Mise en Demeure (MED) sans dépôt de déclaration." loi="Art. 93 bis mod. Art. 34 LF 2026" /> (IS) après MED <InfoTooltip texte="MED = Mise en Demeure : notification officielle envoyée par l'Administration des Impôts invitant le contribuable à régulariser sa situation dans un délai fixé. Sans réponse, l'administration procède à la taxation d'office." loi="Art. 88 CGI 2023" /></td><td className="py-1.5 pr-2 font-semibold text-rose-600">3 000 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">—</td><td className="py-1.5 text-muted-foreground">Art. 93 bis mod. Art. 34 LF 2026</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Déclaration sans calcul d'impôt</td><td className="py-1.5 pr-2 font-semibold text-rose-600">500 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">250 000 FC</td><td className="py-1.5 text-muted-foreground">Art. 94</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Omission mention obligatoire facture</td><td className="py-1.5 pr-2 font-semibold text-rose-600">750 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">250 000 FC</td><td className="py-1.5 text-muted-foreground">Art. 97 bis</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Opposition enquête / contrôle inopiné</td><td className="py-1.5 pr-2 font-semibold text-rose-700">1 000 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">1 000 000 FC</td><td className="py-1.5 text-muted-foreground">Art. 97 ter</td></tr>
                  <tr><td className="py-1.5 pr-2 text-foreground/80">Activité sans Numéro Impôt</td><td className="py-1.5 pr-2 font-semibold text-rose-700">1 000 000 FC</td><td className="py-1.5 pr-2 text-foreground/80">100 000 FC (com.) / 50 000 FC (loc.)</td><td className="py-1.5 text-muted-foreground">Art. 98</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-rose-600" />Sanctions pénales (Art. 101–103)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Les infractions fiscales graves (fraude avérée, faux documents, dissimulation organisée) peuvent entraîner des <span className="font-semibold">sanctions pénales</span> indépendantes des pénalités fiscales (Art. 101).</p>
              <p>• Amende pénale : égale au montant de l'impôt éludé en 1ère infraction, <span className="font-semibold">doublée en cas de récidive</span> (Art. 101).</p>
              <p>• Les poursuites pénales sont exercées par le Parquet sur saisine du Directeur Général des Impôts (Art. 103).</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TITRE V : Réclamations et recours ── */}
      {titrActif === 'titre5' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Titre V : Réclamations et recours</p>
            <p className="text-xs text-amber-600/80">Art. 104 à 110 : Réclamation contentieuse, recours judiciaire</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-amber-500" />Réclamation contentieuse (Art. 104–106)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• Tout contribuable qui conteste une imposition peut adresser une <span className="font-semibold">réclamation contentieuse</span> au Directeur des Impôts compétent (Art. 104).</p>
              <p>• La réclamation doit être introduite dans un délai de <span className="font-semibold">3 mois</span> à compter de la date de la notification ou de la mise en recouvrement (Art. 104).</p>
              <p>• Le Directeur des Impôts dispose de <span className="font-semibold">3 mois</span> pour statuer sur la réclamation (Art. 105).</p>
              <p>• En cas de silence de l'administration au terme des 3 mois, la décision implicite vaut <span className="font-semibold">rejet</span> (Art. 105 §2).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-amber-500" />Sursis de recouvrement (Art. 106 bis)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• L'introduction d'une réclamation ne suspend pas le recouvrement des impôts (Art. 106 bis §1).</p>
              <p>• Le contribuable peut demander un <span className="font-semibold">sursis de recouvrement</span> s'il verse au préalable <span className="font-semibold">1/10 du supplément contesté</span> (Art. 110).</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-amber-600" />Recours judiciaire (Art. 107–110)</p>
            <div className="space-y-1.5 text-xs text-foreground/80 leading-relaxed">
              <p>• En cas de rejet de la réclamation administrative, le contribuable peut former un <span className="font-semibold">recours devant la Cour Administrative d'Appel</span> compétente dans un délai de <span className="font-semibold">3 mois</span> à compter de la décision de rejet (Art. 108).</p>
              <p>• Les arrêts de la Cour d'Appel peuvent faire l'objet d'un <span className="font-semibold">pourvoi en cassation</span> devant la Cour de Cassation dans les conditions du droit commun (Art. 108).</p>
              <p>• L'Art. 110 de la loi 004/2003 précise que les réclamations ne suspendent pas l'exigibilité de l'impôt. Les délais de remboursement de l'indu sont régis par les lois spécifiques à chaque impôt (IRPP, IS) — à vérifier dans la loi applicable.</p>
            </div>
          </div>

          {/* Schéma récapitulatif des voies de recours */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
            <p className="text-xs font-bold text-amber-700">Voies de recours : Schéma récapitulatif</p>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-amber-500 text-white w-5 h-5 text-xs font-bold shrink-0">1</span>
                <span className="text-foreground/80"><span className="font-semibold">Réclamation</span> auprès du Directeur des Impôts : délai : 3 mois (Art. 104)</span>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-[1px] h-4 bg-amber-300 ml-2"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-amber-500 text-white w-5 h-5 text-xs font-bold shrink-0">2</span>
                <span className="text-foreground/80"><span className="font-semibold">Recours Cour Administrative d'Appel</span> : délai : 3 mois après rejet (Art. 108)</span>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-[1px] h-4 bg-amber-300 ml-2"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-amber-600 text-white w-5 h-5 text-xs font-bold shrink-0">3</span>
                <span className="text-foreground/80"><span className="font-semibold">Pourvoi en Cassation</span> : selon droit commun</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CALCULATEUR PÉNALITÉS ── */}
      {titrActif === 'calcul' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">Calculateur de pénalités de retard</p>
            <p className="text-xs text-orange-600/80">Intérêt moratoire : 2% par mois de retard, plafonné à 50% du principal (Art. 91 CGI 2023)</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Montant principal (FC)</label>
                <input
                  type="number"
                  placeholder="Ex : 500 000"
                  value={montantPrincipal}
                  onChange={e => setMontantPrincipal(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Nombre de mois de retard</label>
                <input
                  type="number"
                  placeholder="Ex : 3"
                  value={moisRetard}
                  onChange={e => setMoisRetard(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {principal > 0 && mois > 0 && (
              <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4 space-y-2">
                <p className="text-xs font-bold text-orange-700 mb-2">Résultat du calcul</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground/80">Montant principal</span>
                    <span className="font-mono font-semibold text-foreground">{formatFC(principal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground/80">Intérêt moratoire ({mois} mois × 2%, plafonné 50%)</span>
                    <span className="font-mono font-semibold text-rose-600">{formatFC(interetTotal)}</span>
                  </div>
                  <div className="border-t border-orange-200 my-1"></div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-foreground">Total dû (principal + pénalités)</span>
                    <span className="font-mono font-bold text-orange-600">{formatFC(totalDu)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Base légale : Art. 91 CGI 2023 (Loi n°004/2003 mod.). Taux : 2% par mois de retard, plafonné à 50% du principal (Art. 89). Sans capitalisation des pénalités.</p>
                </div>
              </div>
            )}

            {(principal === 0 || mois === 0) && (
              <div className="rounded-xl border border-dashed border-orange-300 p-4 text-center">
                <p className="text-xs text-muted-foreground">Saisissez le montant principal et le nombre de mois pour calculer les pénalités.</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-foreground">Rappel des taux et frais de poursuites</p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 pr-3 font-semibold text-foreground">Type</th>
                    <th className="text-left py-1.5 pr-3 font-semibold text-foreground">Taux / Montant</th>
                    <th className="text-left py-1.5 font-semibold text-foreground">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Intérêt moratoire <InfoTooltip texte="Intérêt moratoire : pénalité financière due pour tout impôt non payé à échéance. Court automatiquement dès le premier jour du mois suivant l'échéance. Tout mois commencé est comptabilisé en entier." loi="Art. 91 Loi n°004/2003 (mod. LF n°13/009 du 1er fév. 2013, O.-L. n°13/005 du 23 fév. 2013, LF n°18/025 du 13 déc. 2018, LF n°20/020 du 28 déc. 2020)" /></td><td className="py-1.5 pr-3 font-semibold text-rose-600">2% / mois (plafonné 50%)</td><td className="py-1.5 text-muted-foreground">Art. 91 — Loi n°004/2003</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Pénalités d'assiette <InfoTooltip texte="Pénalités d'assiette : majorations calculées sur le montant d'impôt éludé ou insuffisamment déclaré. Proportionnelles (%) contrairement aux amendes forfaitaires de l'Art. 93 bis. Plafondées à 50% de l'impôt éludé ou reconstitué (intérêt de retard)." loi="Art. 84 et Art. 89 Loi n°004/2003 du 13 mars 2003 portant réforme des procédures fiscales (mod. O.-L. n°13/005 du 23 fév. 2013 et LF n°18/025 du 13 déc. 2018)" /> (plafond intérêt retard)</td><td className="py-1.5 pr-3 text-foreground/80">50% de l'impôt éludé</td><td className="py-1.5 text-muted-foreground">Art. 89 — Loi n°004/2003</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Astreinte PM <InfoTooltip texte="Astreinte : sanction journalière pour refus de répondre à une demande de renseignements de l'Administration dans le délai légal. PM = Personne Morale (société, entreprise). En dehors de toute procédure de contrôle." loi="Art. 92 Loi n°004/2003 (mod. O.-L. n°13/005 du 23 fév. 2013) — portant réforme des procédures fiscales" /> (communication pièces)</td><td className="py-1.5 pr-3 text-foreground/80">100 000 FC / jour</td><td className="py-1.5 text-muted-foreground">Art. 92 — Loi n°004/2003</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Astreinte PP <InfoTooltip texte="Astreinte : sanction journalière pour refus de répondre à une demande de renseignements dans le délai légal. PP = Personne Physique (individu, commerçant indépendant). En dehors de toute procédure de contrôle." loi="Art. 92 Loi n°004/2003 (mod. O.-L. n°13/005 du 23 fév. 2013) — portant réforme des procédures fiscales" /> (communication pièces)</td><td className="py-1.5 pr-3 text-foreground/80">25 000 FC / jour</td><td className="py-1.5 text-muted-foreground">Art. 92 — Loi n°004/2003</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Défaut acompte <InfoTooltip texte="Défaut ou insuffisance de paiement de l'acompte provisionnel. L'acompte est un versement anticipé calculé sur la base de l'impôt de l'exercice précédent. Trois acomptes IS : avant le 1er août (30%), avant le 1er octobre (30%), avant le 1er décembre (20%) — Art. 57 bis Loi n°23/053. Sanction : amende égale à 50% du montant de l'acompte non versé." loi="Art. 98 bis Loi n°004/2003 (créé O.-L. n°13/005 du 23 fév. 2013, mod. LF n°14/027 du 31 déc. 2014) — portant réforme des procédures fiscales" /></td><td className="py-1.5 pr-3 font-semibold text-rose-600">50% de l'acompte non versé</td><td className="py-1.5 text-muted-foreground">Art. 98 bis — Loi n°004/2003</td></tr>
                  <tr><td className="py-1.5 pr-3 text-foreground/80">Opposition contrôle <InfoTooltip texte="Opposition au droit d'enquête ou au contrôle inopiné de l'Administration fiscale. Amende fixe de 1 000 000 FC. En cas de récidive, cette amende est doublée. La communication de renseignements incomplets est sanctionnée séparément : 750 000 FC (PM) / 125 000 FC (PP)." loi="Art. 97 ter Loi n°004/2003 (créé par O.-L. n°13/005 du 23 fév. 2013) — portant réforme des procédures fiscales" /></td><td className="py-1.5 pr-3 font-semibold text-rose-700">1 000 000 FC</td><td className="py-1.5 text-muted-foreground">Art. 97 ter — Loi n°004/2003</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* ── CALENDRIER FISCAL INTERACTIF ── */}
      {titrActif === 'calendrier' && (
        <CalendrierFiscal />
      )}

      {/* ── SIMULATEUR ART. 89 / 93 bis ── */}
      {titrActif === 'simulateur' && (
        <SimulateurPenalitesAssiette />
      )}

      {/* Pied de page référence légale */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Référence : Loi n°004/2003 du 13 mars 2003 portant réforme des procédures fiscales (RDC), mod. LF 2018, 2021, 2022 — CGI 2023 (Lois n°23/052 IS et n°23/053 IRPP)
      </p>
    </div>
  )
}

export default function FiscalitePage() {
  const [impotActif, setImpotActif] = useState('irpp')
  const [catIrpp, setCatIrpp]       = useState('irpp_cat1')
  const [, navigate] = useHashLocation()
  const { setNav } = useNav()

  // Pour la description : onglet courant
  const ongletDesc = impotActif === 'irpp'
    ? ONGLETS.find(o => o.id === catIrpp)!
    : ONGLETS.find(o => o.id === impotActif)!

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 overflow-x-hidden">

        {/* En-tête */}
        <div className="mb-5">
          <BackButton />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Fiscalité des entreprises</h1>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Badge variant="outline" className="text-xs">Loi n°23/053 du 26 déc. 2023 portant IS/IRPP : J.O. RDC</Badge>
              <Button
                size="sm" variant="outline"
                className="gap-1.5 text-xs h-7 border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => { setNav({ cours: 'fiscalite' }); navigate('/documents') }}
              >
                <FolderOpen className="h-3.5 w-3.5" /> Documents
              </Button>
            </div>
          </div>
        </div>

        {/* ── Niveau 1 : IRPP | IS | Autres impôts | TVA ── */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {ONGLETS_PRINCIPAUX.map(o => {
            const Icon = o.icon
            const isActif = impotActif === o.id
            return (
              <button
                key={o.id}
                onClick={() => setImpotActif(o.id)}
                className={cn(
                  'relative rounded-xl border h-[64px] flex flex-col justify-center items-center px-2 py-2 text-center',
                  'transition-all duration-200 ease-out focus:outline-none',
                  isActif
                    ? `${COLOR_MAP[o.color]} shadow-md border-transparent scale-[1.03]`
                    : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30 hover:scale-[1.01]'
                )}
              >
                <Icon className={cn('h-4 w-4 mb-1 shrink-0', isActif ? 'text-white' : COLOR_LIGHT[o.color])} />
                <p className={cn('text-[12px] font-bold leading-tight', isActif ? 'text-white' : 'text-foreground')}>{o.label}</p>
                <p className={cn('text-xs leading-tight truncate w-full text-center', isActif ? 'text-white/80' : 'text-muted-foreground')}>{o.sublabel}</p>
              </button>
            )
          })}
        </div>

        {/* ── Encadré intro IRPP ── */}
        {impotActif === 'irpp' && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
            <p className="text-sm font-bold text-blue-800">IRPP : Impôt sur le Revenu des Personnes Physiques</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              L'IRPP frappe l'ensemble des revenus des personnes physiques, quelle que soit leur nature ou leur source, dès lors qu'ils sont réalisés en RDC. Il est organisé en 6 catégories autonomes.
              Base légale : Loi n°23/053 du 30 novembre 2023.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-xs font-bold text-blue-700 mb-1.5">Cat. 1 : Revenus salariaux</p>
                <p className="text-xs text-blue-600 leading-relaxed">Traitements, salaires, indemnités, pensions. Barème progressif mensuel. Retenue à la source par l'employeur.</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-xs font-bold text-blue-700 mb-1.5">Cat. 2 : Bénéfices ind. &amp; comm.</p>
                <p className="text-xs text-blue-600 leading-relaxed">Entrepreneurs individuels, commerçants, artisans. Régimes micro (30 USD), forfait, réel. Barème progressif annuel.</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs font-bold text-slate-700 mb-1.5">Cat. 3 à 6 : Autres revenus</p>
                <p className="text-xs text-slate-600 leading-relaxed">BNC (libéraux), revenus agricoles, capitaux mobiliers (20% RAS), plus-values de cession.</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs font-bold text-slate-700 mb-1.5">Principe d'indépendance</p>
                <p className="text-xs text-slate-600 leading-relaxed">Chaque catégorie a ses propres règles de calcul. Un même contribuable peut relever de plusieurs catégories simultanément.</p>
              </div>
            </div>
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <p className="text-xs font-bold text-rose-700 mb-1">⚠ IRPP ≠ IS</p>
              <p className="text-xs text-rose-600 leading-relaxed">
                L'IRPP s'applique aux <strong>personnes physiques</strong> (individus). L'IS s'applique aux <strong>personnes morales</strong> (sociétés). Une même activité ne peut être soumise simultanément aux deux impôts.
                Dès qu'un entrepreneur constitue une société, il bascule vers l'IS (Loi 23/053).
              </p>
            </div>
          </div>
        )}

        {/* ── Niveau 2 : sous-onglets IRPP (6 catégories) ── */}
        {impotActif === 'irpp' && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-0.5">
              Dossier IRPP : Choisir une catégorie
            </p>
            <div className="grid grid-cols-3 gap-3">
              {SOUS_ONGLETS_IRPP.map(o => {
                const Icon = o.icon
                const isActif = catIrpp === o.id
                return (
                  <button
                    key={o.id}
                    onClick={() => setCatIrpp(o.id)}
                    className={cn(
                      'relative rounded-xl border min-h-[72px] flex flex-col justify-center px-3 py-3 text-left',
                      'transition-all duration-200 ease-out focus:outline-none',
                      isActif
                        ? `${COLOR_MAP[o.color]} shadow-md border-transparent scale-[1.03]`
                        : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30 hover:scale-[1.01]'
                    )}
                  >
                    <Icon className={cn('h-3.5 w-3.5 mb-1 shrink-0', isActif ? 'text-white' : COLOR_LIGHT[o.color])} />
                    <p className={cn('text-xs font-bold leading-tight', isActif ? 'text-white' : 'text-foreground')}>{o.label}</p>
                    <p className={cn('text-[10px] leading-tight', isActif ? 'text-white/80' : 'text-muted-foreground')}>{o.sublabel}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Description onglet actif */}
        <Card className="mb-4 overflow-hidden">
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center gap-2.5">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg shrink-0',
                `bg-${ongletDesc.color}-100`
              )}>
                {React.createElement(ongletDesc.icon, {
                  className: cn('h-4 w-4', COLOR_LIGHT[ongletDesc.color])
                })}
              </div>
              <div className="min-w-0">
                <CardTitle className="text-sm font-bold leading-tight">
                  {ongletDesc.label} : {ongletDesc.sublabel}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{ongletDesc.desc}</p>
                {'definition' in ongletDesc && (ongletDesc as any).definition && (
                  <p className="text-xs text-foreground/70 mt-1.5 leading-snug italic border-l-2 border-primary/30 pl-2">
                    {(ongletDesc as any).definition}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-5 pt-3">
            {impotActif === 'irpp' && catIrpp === 'irpp_cat1' && <Cat1Salaires />}
            {impotActif === 'irpp' && catIrpp === 'irpp_cat2' && <Cat2BIC />}
            {impotActif === 'irpp' && catIrpp === 'irpp_cat3' && <Cat3BNC />}
            {impotActif === 'irpp' && catIrpp === 'irpp_cat4' && <Cat4Agricole />}
            {impotActif === 'irpp' && catIrpp === 'irpp_cat5' && <Cat5Mobiliers />}
            {impotActif === 'irpp' && catIrpp === 'irpp_cat6' && <Cat6PlusValues />}
            {impotActif === 'is'         && <SimulateurIS />}
            {impotActif === 'irl'        && <SimulateurAutresImpots />}
            {impotActif === 'tva'        && <SimulateurTVA />}
            {impotActif === 'procedures' && <ProceduresFiscales />}
          </CardContent>
        </Card>

        {/* Note légale */}
        <p className="text-center text-xs text-muted-foreground mt-4 px-4">
          Simulateurs pédagogiques : ORBIT | Référence : Loi 23/052 + Loi 23/053 du 30 nov. 2023 (J.O. RDC) | Loi de Finances 2025 | Loi de Finances 2026
        </p>
      </div>
    </div>
  )
}
