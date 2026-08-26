import React, { useState } from 'react'
import {
  Calculator, Info, RotateCcw,
  Users, AlertCircle, CheckCircle2,
  Plus, BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import BackButton from '@/components/BackButton'
import { useHashLocation } from 'wouter/use-hash-location'
import { InfoTooltip } from '@/components/InfoTooltip'
import {
  calculerBaremeIRPP as calculerBareme,
  appliquerReductionEtPlafondIRPP as appliquerReductionEtPlafond,
  qualifier663,
  arrondiCentaineFC,
  type LigneBaremeIRPP as LigneBareme,
} from '@/lib/irpp'
import { CatalogueGroupe } from '@/components/CatalogueGroupe'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatFC(n: number): string {
  if (n < 0) return `(${Math.abs(Math.round(n)).toLocaleString('fr-FR')} FC)`
  return `${Math.round(n).toLocaleString('fr-FR')} FC`
}

// Barème, qualification du 663 (Art. 69, 8°) et arrondi Art. 150 : voir '@/lib/irpp'
// (source unique, partagée avec FiscalitePage.tsx / Cat1Salaires — les deux moteurs
// avaient divergé : celui-ci gardait un plancher de 2 000 FC aboli, ignorait la part
// imposable du 663 dans l'assiette, et neutralisait à tort toute la réduction pour
// charges dès que le revenu dépassait 3,6M FC/mois au lieu de n'exclure que la portion
// afférente à la tranche à 40% - voir Art. 125).

// ─────────────────────────────────────────────────────────────────────────────
// CATALOGUES OHADA
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

// Catalogue rémunérations mandataires non salariés : Art. 68 Loi 23/053 + AUSC
// Compte 6581 : Indemnités et rémunérations d'administrateurs (SYSCOHADA)
// Éléments IMPOSABLES à l'IRPP Cat. 1 : Art. 68 Loi 23/053
const ELEMENTS_6581_IMPOSABLES = [
  { code: '6581', label: 'Indemnités de fonction (Art. 431 AUSC)' },
  { code: '6581', label: 'Indemnités de session (CA) (Art. 431 AUSC)' },
  { code: '6581', label: 'Jetons de présence (Art. 431 AUSC)' },
  { code: '6581', label: 'Rémunérations exceptionnelles pour missions/mandats (Art. 432 AUSC)' },
  { code: '6581', label: 'Avantages en nature : valeur réelle (Art. 467/482/501 AUSC)' },
  { code: '6581', label: 'Rémunération de gérance : SARL (Art. 325 AUSC)' },
  { code: '6581', label: 'Allocations de représentation' },
]

// Éléments NON IMPOSABLES : remboursements sur justificatifs (Art. 501 AUSC)
const ELEMENTS_6581_NON_IMPOSABLES = [
  { code: '6581', label: 'Remboursement frais de voyage (Art. 501 AUSC)' },
  { code: '6581', label: 'Remboursement frais de déplacement (Art. 501 AUSC)' },
  { code: '6581', label: 'Remboursement dépenses engagées dans l\'intérêt de la société (Art. 501 AUSC)' },
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
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface ElementCatalogue { code: string; label: string }
interface LigneSaisie { code: string; label: string; montant: string }

// ─────────────────────────────────────────────────────────────────────────────
// MODAL SÉLECTION ÉLÉMENTS
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// SECTION SAISIE AVEC CATALOGUE DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────
// Même composant que Cat1Salaires (FiscalitePage.tsx) : catalogue à sélection
// unique via CatalogueGroupe, plutôt qu'un dropdown avec recherche - même
// contenu (IRPP Cat. 1), même interface de saisie.
function SectionSaisieModal({ titre, couleur, rows, catalogue, onAdd, onAddFromCatalogue, onRemove, onUpdate, note, tooltip, catalogueOnly }: {
  titre: string; couleur: 'blue' | 'slate' | 'purple' | 'green' | 'orange'
  rows: LigneSaisie[]; catalogue?: ElementCatalogue[]
  onAdd: () => void; onAddFromCatalogue?: (e: ElementCatalogue) => void
  onRemove: (i: number) => void; onUpdate: (i: number, f: 'label' | 'montant', v: string) => void
  note?: string; tooltip?: { texte: string; loi: string }; catalogueOnly?: boolean
}) {
  const styles: Record<string, string> = {
    blue:   'border-blue-200 bg-blue-50 text-blue-700',
    slate:  'border-slate-200 bg-slate-50 text-slate-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
    green:  'border-green-200 bg-green-50 text-green-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700',
  }
  return (
    <div className={cn('rounded-xl border p-4 space-y-3', styles[couleur])}>
      <p className="text-xs font-semibold uppercase tracking-wide flex items-center">
        {titre}
        {tooltip && <InfoTooltip texte={tooltip.texte} loi={tooltip.loi} />}
      </p>
      {note && (
        <div className="flex items-start gap-2 text-xs opacity-75">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" /><span>{note}</span>
        </div>
      )}
      {rows.map((r, i) => (
        <div key={i} className="flex gap-1.5 min-w-0 items-center">
          {catalogueOnly ? (
            <span className="min-w-0 flex-1 rounded-lg border border-border/40 bg-background/60 px-2 py-2 text-xs text-foreground truncate">{r.label}</span>
          ) : (
            <input placeholder="Libellé" value={r.label} onChange={e => onUpdate(i, 'label', e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          )}
          <input type="number" placeholder="Montant" value={r.montant} onChange={e => onUpdate(i, 'montant', e.target.value)}
            className="w-24 sm:w-32 shrink-0 rounded-lg border border-border/60 bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <button onClick={() => onRemove(i)}
            className="shrink-0 text-red-400 hover:text-red-600 text-xs px-1.5 rounded-lg border border-border/40 bg-background transition-colors">✕</button>
        </div>
      ))}
      {!catalogueOnly && (
        <button onClick={onAdd}
          className="flex items-center gap-1 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity pt-1">
          <Plus className="h-3 w-3" /> Ajouter manuellement
        </button>
      )}
      {/* Catalogue à sélection unique, sans recherche - même composant que Cat1Salaires */}
      {catalogue && onAddFromCatalogue && (
        <CatalogueGroupe
          sections={[{ cat: '', color: styles[couleur].split(' ').pop() || 'text-primary', items: catalogue }]}
          selected={rows.map(r => r.label)}
          onSelect={item => { if (typeof item === 'object') onAddFromCatalogue(item) }}
        />
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
  label: string; val: string; bold?: boolean; neg?: boolean; accent?: boolean
  note?: string; indent?: boolean; signe?: '+' | '−' | '=' | '×'; tooltip?: { texte: string; loi: string }
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-2', indent && 'ml-4')}>
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        {signe && (
          <span className={cn('text-xs font-bold shrink-0 w-3 text-center',
            signe === '−' || neg ? 'text-red-500' :
            signe === '=' || accent ? 'text-primary' : 'text-muted-foreground')}>{signe}</span>
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

function Separateur() { return <div className="border-t border-border/40 my-1" /> }

function BoxFinal({ label, sublabel, val, credit, couleur }: {
  label: string; sublabel?: string; val: string; credit?: boolean; couleur?: string
}) {
  const bg = credit
    ? 'bg-amber-50 border-amber-200'
    : couleur === 'red'
      ? 'bg-red-50 border-red-200'
      : 'bg-primary/8 border-primary/25'
  const textColor = credit
    ? 'text-amber-600'
    : couleur === 'red' ? 'text-red-600' : 'text-primary'
  return (
    <div className={cn('rounded-xl p-3.5 text-center border shadow-sm transition-all hover:shadow-md', bg)}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground/70 italic mb-1">{sublabel}</p>}
      <p className={cn('text-lg font-bold leading-tight', textColor)}>{val}</p>
    </div>
  )
}

function ResultatWrap({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white overflow-hidden animate-slideUp shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-green-500/10 border-b border-green-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shrink-0">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
        <p className="font-bold text-sm text-green-800">{titre}</p>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export default function ChargesPersonnelIPRPage() {
  const [, navigate] = useHashLocation()
  type Mode = 'national' | 'expatrie' | 'admin'
  const [mode, setMode] = useState<Mode>('national')

  // Nationaux
  const [e661, setE661] = useState<LigneSaisie[]>([{ code: '6611', label: 'Appointements et salaires', montant: '' }])
  const [e663, setE663] = useState<LigneSaisie[]>([{ code: '6634', label: 'Indemnité de transport (légale)', montant: '' }])
  const [nbCharge, setNbCharge] = useState(0)
  const [effectif, setEffectif] = useState('')
  const [syndicat, setSyndicat] = useState('')
  const [avances, setAvances] = useState('')

  // Expatriés
  const [e662, setE662] = useState<LigneSaisie[]>([{ code: '6621', label: 'Salaires et appointements (expatriés)', montant: '' }])
  const [e663Exp, setE663Exp] = useState<LigneSaisie[]>([{ code: '6634', label: 'Indemnité de transport (légale)', montant: '' }])
  const [nbChargeExp, setNbChargeExp] = useState(0)
  const [effectifExp, setEffectifExp] = useState('')
  const [secteurMinier, setSecteurMinier] = useState(false)
  const [syndicatExp, setSyndicatExp] = useState('')
  const [avancesExp, setAvancesExp] = useState('')

  // Administrateurs
  type SousMode = 'mandataire' | 'cac_cabinet' | 'cac_physique'
  const [sousMode, setSousMode] = useState<SousMode>('mandataire')
  // Mandataire
  const [adminLignes, setAdminLignes] = useState<LigneSaisie[]>([
    { code: '6581', label: 'Indemnités de fonction (Art. 431 AUSC)', montant: '' },
  ])
  const [adminLignesNI, setAdminLignesNI] = useState<LigneSaisie[]>([])
  const [adminNbCharge, setAdminNbCharge] = useState(0)
  // CAC
  const [cacHT, setCacHT] = useState('')
  const [resAdmin, setResAdmin] = useState<any>(null)

  const [res, setRes] = useState<any>(null)
  const [ecrAnt, setEcrAnt] = useState<{ montant: number } | null>(null)

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
      // Art. 69, 8° : le 663 n'est pas exonéré en bloc - chaque ligne est qualifiée séparément
      // (logement plafonné à 30% de la rémunération, transport sous condition, le reste imposable).
      const { exempte: exempte663, imposable: imposable663 } = qualifier663(e663, brut661)
      // Assiette CNSS (loi 16/009, Art. 13, renvoi Art. 7 litera h du Code du travail) : la part
      // imposable du 663 entre dans l'assiette CNSS/INPP au même titre que le 661.
      const qpo = (brut661 + imposable663) * 0.05
      const baseImposableAvantArrondi = brut661 - qpo + imposable663
      // Art. 118 : le revenu net global s'arrondit au millier de FC INFÉRIEUR avant le barème.
      const baseImposable = Math.floor(baseImposableAvantArrondi / 1000) * 1000
      const { lignes, iprBrut, iprMax } = calculerBareme(baseImposable)
      const charge = Math.min(Math.max(0, nbCharge), 9)
      // Art. 125 : seule la portion d'IRPP correspondant à la tranche à 40% est exclue de
      // l'assiette de la réduction - la réduction n'est pas supprimée en bloc au-delà de 3,6M FC.
      const impotHorsDerniereTranche = lignes.filter(l => l.taux !== '40%').reduce((s, l) => s + l.impot, 0)
      const reductionPlafonnee = lignes.some(l => l.taux === '40%')
      // Réduction assise sur l'IRPP brut (barème), AVANT tout plafonnement
      const reduction = impotHorsDerniereTranche * (charge * 0.02)
      const { plafonne, iprFinal } = appliquerReductionEtPlafond(iprBrut, iprMax, reduction)
      // Art. 150 : arrondi à la centaine de FC la plus proche. Aucun plancher légal en Loi
      // 23/053 (l'ancien plancher de 2 000 FC relevait du régime IPR abrogé).
      const iprNet = arrondiCentaineFC(iprFinal)
      const syndicatVal = parseFloat(syndicat) || 0
      const avancesVal  = parseFloat(avances)  || 0
      const nbEff = parseInt(effectif) || 0
      const inppTaux = nbEff > 300 ? 0.02 : nbEff >= 51 ? 0.03 : 0.035
      const cnssPatron = (brut661 + imposable663) * 0.13
      const inpp = (brut661 + imposable663) * inppTaux
      const onem = brut661 * 0.005
      const totalRetenues = qpo + iprNet + syndicatVal + avancesVal
      const netAPayer = brut661 + brut663 - totalRetenues
      setRes({
        mode: 'national',
        brut661, brut663, brutTotal: brut661 + brut663,
        qpo, exempte663, imposable663, baseImposable, lignes, iprBrut, iprMax, plafonne,
        reduction, charge, reductionPlafonnee, iprNet,
        syndicatVal, avancesVal,
        cnssPatron, inpp, inppTaux, onem,
        totalRetenues,
        totalChargePatronale: cnssPatron + inpp + onem,
        netAPayer,
        chargePatronale: netAPayer + cnssPatron + inpp + onem,
      })
    } else {
      const brut662 = e662.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      const brut663e = e663Exp.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      // Art. 69, 8° : même qualification ligne par ligne que pour les nationaux.
      const { exempte: exempte663E, imposable: imposable663E } = qualifier663(e663Exp, brut662)
      // Art. 71 : QPO s'applique aussi aux expatriés (sauf convention bilatérale)
      const qpoE = (brut662 + imposable663E) * 0.05
      const baseImposableEAvantArrondi = brut662 - qpoE + imposable663E
      // Art. 118 : arrondi au millier de FC inférieur avant le barème.
      const baseImposableE = Math.floor(baseImposableEAvantArrondi / 1000) * 1000
      const { lignes, iprBrut, iprMax: iprMaxE } = calculerBareme(baseImposableE)
      const chargeE = Math.min(Math.max(0, nbChargeExp), 9)
      // Art. 125 : seule la portion d'IRPP correspondant à la 4ème tranche (40%) est exclue de
      // l'assiette de la réduction.
      const impotHorsDerniereTrancheE = lignes.filter(l => l.taux !== '40%').reduce((s, l) => s + l.impot, 0)
      const reductionPlafonneeE = lignes.some(l => l.taux === '40%')
      // Réduction assise sur l'IRPP brut (barème), AVANT tout plafonnement
      const reductionE = impotHorsDerniereTrancheE * (chargeE * 0.02)
      const { plafonne, iprFinal: iprFinalE } = appliquerReductionEtPlafond(iprBrut, iprMaxE, reductionE)
      // Art. 150 : arrondi à la centaine de FC la plus proche. Aucun plancher légal (voir national).
      const iprNetExp = arrondiCentaineFC(iprFinalE)
      const syndicatValE = parseFloat(syndicatExp) || 0
      const avancesValE  = parseFloat(avancesExp)  || 0
      // IERE : Art. 148 Loi n°23/053 : taux unique 25% du brut des rémunérations de l'Art. 68
      // (Art. 146), les immunités de l'Art. 69 s'y appliquant également (Art. 147) - donc la
      // même base que l'IRPP : 662 + la part du 663 non couverte par une immunité.
      const tauxIere = 0.25
      const iere = (brut662 + imposable663E) * tauxIere
      const nbEffE = parseInt(effectifExp) || 0
      const inppTauxE = nbEffE > 300 ? 0.02 : nbEffE >= 51 ? 0.03 : 0.035
      const cnssPatronE = (brut662 + imposable663E) * 0.13
      const inppE = (brut662 + imposable663E) * inppTauxE
      const onemE = brut662 * 0.005
      const totalRetenuesE = qpoE + iprNetExp + syndicatValE + avancesValE
      const netAPayerE = brut662 + brut663e - totalRetenuesE
      setRes({
        mode: 'expatrie',
        brut662, brut663e, brutTotal: brut662 + brut663e,
        qpoE, exempte663E, imposable663E, baseImposableE,
        lignes, iprBrut, iprMax: iprMaxE, plafonne,
        chargeE, reductionE, reductionPlafonneeE, iprNetExp,
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

  function calculerAdmin() {
    if (sousMode === 'mandataire') {
      // Seuls les imposables entrent dans la base IRPP
      const brut = adminLignes.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      const totalNI = adminLignesNI.reduce((s, r) => s + (parseFloat(r.montant) || 0), 0)
      // Art. 118 : le revenu net global s'arrondit au millier de FC inférieur avant le barème.
      const brutArrondi = Math.floor(brut / 1000) * 1000
      const { lignes, iprBrut, iprMax } = calculerBareme(brutArrondi)
      const charge = Math.min(Math.max(0, adminNbCharge), 9)
      // Art. 125 : seule la portion d'IRPP correspondant à la tranche à 40% est exclue de
      // l'assiette de la réduction.
      const impotHorsDerniereTranche = lignes.filter(l => l.taux !== '40%').reduce((s, l) => s + l.impot, 0)
      const reductionPlafonnee = lignes.some(l => l.taux === '40%')
      // Assise sur l'IRPP brut (barème), AVANT tout plafonnement
      const reduction = impotHorsDerniereTranche * (charge * 0.02)
      const { plafonne, iprFinal } = appliquerReductionEtPlafond(iprBrut, iprMax, reduction)
      // Art. 150 : arrondi à la centaine de FC la plus proche. Aucun plancher légal en Loi
      // 23/053 (l'ancien plancher de 2 000 FC relevait du régime IPR abrogé).
      const iprNet = arrondiCentaineFC(iprFinal)
      const brutTotal = brut + totalNI          // total 6581 : imposable + non imposable
      const net = brutTotal - iprNet            // net à payer : total brut minus IRPP seulement
      setResAdmin({
        sousMode: 'mandataire',
        brut, brutArrondi, totalNI, brutTotal,
        adminLignes: [...adminLignes],
        adminLignesNI: [...adminLignesNI],
        lignes, iprBrut, iprMax, plafonne,
        charge, reductionPlafonnee, reduction,
        iprNet, net,
      })
    } else {
      const ht  = parseFloat(cacHT) || 0
      const taux = 16  // TVA 16% RDC : taux légal fixe
      const tva = ht * taux / 100
      const ttc = ht + tva
      setResAdmin({ sousMode, ht, tva, ttc, taux })
    }
  }

  function reset() {
    setRes(null)
    setEcrAnt(null)
    setResAdmin(null)
    setE661([{ code: '6611', label: 'Appointements et salaires', montant: '' }])
    setE662([{ code: '6621', label: 'Salaires et appointements (expatriés)', montant: '' }])
    setE663([{ code: '6634', label: 'Indemnité de transport (légale)', montant: '' }])
    setE663Exp([{ code: '6634', label: 'Indemnité de transport (légale)', montant: '' }])
    setNbCharge(0); setEffectif(''); setNbChargeExp(0); setEffectifExp(''); setSecteurMinier(false)
    setSyndicat(''); setAvances(''); setSyndicatExp(''); setAvancesExp('')
  }

  // ─── Composants écritures journal ───────────────────────────────────────────
  function JournalEntry({ numero, libelle, lignes }: {
    numero: string
    libelle: string
    lignes: { sens: 'D' | 'C'; compte: string; intitule: string; montant: number }[]
  }) {
    return (
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 border-b border-border/40">
          <span className="flex h-5 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold shrink-0 px-2">E{numero}</span>
          <p className="text-xs font-semibold text-foreground">{libelle}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/30 bg-muted/20">
                <th className="px-3 py-1.5 text-left text-xs text-muted-foreground font-medium w-6">S</th>
                <th className="px-2 py-1.5 text-left text-xs text-muted-foreground font-medium">Compte</th>
                <th className="px-2 py-1.5 text-left text-xs text-muted-foreground font-medium">Intitulé</th>
                <th className="px-3 py-1.5 text-right text-xs text-muted-foreground font-medium">Débit</th>
                <th className="px-3 py-1.5 text-right text-xs text-muted-foreground font-medium">Crédit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {lignes.map((l, i) => (
                <tr key={i} className={l.sens === 'D' ? 'bg-blue-50/40' : 'bg-green-50/40 pl-6'}>
                  <td className="px-3 py-1.5">
                    <span className={`inline-flex h-4 w-4 items-center justify-center rounded text-xs font-bold ${
                      l.sens === 'D' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                    }`}>{l.sens}</span>
                  </td>
                  <td className={`px-2 py-1.5 font-mono font-bold text-xs ${l.sens === 'C' ? 'pl-6' : ''}`}>{l.compte}</td>
                  <td className={`px-2 py-1.5 text-muted-foreground ${l.sens === 'C' ? 'pl-6 italic' : ''}`}>{l.intitule}</td>
                  <td className="px-3 py-1.5 text-right font-mono">{l.sens === 'D' ? formatFC(l.montant).replace(' FC', '') : ''}</td>
                  <td className="px-3 py-1.5 text-right font-mono">{l.sens === 'C' ? formatFC(l.montant).replace(' FC', '') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-6 animate-fadeIn">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé (cohérent avec Journal/GrandLivre/Balance/Bilan/PlanComptable) ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-module-blue/10 via-module-blue/5 to-transparent border border-module-blue/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-module-blue/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-module-blue/6 animate-float" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-module-blue/15 border border-module-blue/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
              <Users className="h-6 w-6 text-module-blue" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Charges du personnel</p>
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">IRPP : Cat. 1 : Revenus salariaux et assimilés</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Note contextuelle comptabilité */}
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
        <div className="flex items-start gap-2 text-xs text-sky-700">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>
            <strong>Charges du personnel : SYSCOHADA :</strong> Ce simulateur calcule l'IRPP (Cat. 1), les charges patronales et le net à payer : Art. 118-125 Loi 23/053.
            Les écritures comptables au journal sont générées automatiquement après le calcul.
          </span>
        </div>
      </div>

      {/* Bandeau légal Cat. 1 : même contenu que Cat1Salaires (FiscalitePage.tsx) */}
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

      {/* Choix national / expatrié / administrateurs */}
      <div className="flex gap-2">
        {([
          { key: 'national',  label: '🇨🇩 Nationaux' },
          { key: 'expatrie',  label: '🌍 Expatriés' },
          { key: 'admin',     label: '🏛️ Administrateurs' },
        ] as { key: Mode; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => { setMode(key); setRes(null); setResAdmin(null) }}
            className={cn('flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200',
              mode === key ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'border-border bg-card text-muted-foreground hover:border-primary/30')}>
            {label}
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
            catalogueOnly
            tooltip={{
              texte: "Compte 661 : toutes les rémunérations directes versées au personnel national (salaires, primes, congés payés, avantages en nature, etc.). Ces montants forment la base de calcul de l'IRPP et de la QPO.",
              loi: "Compte 661 SYSCOHADA"
            }}
          />

          <SectionSaisieModal
            titre="Sous conditions : Indemnités et avantages (663)"
            couleur="slate"
            rows={e663}
            catalogue={ELEMENTS_663}
            onAdd={() => addRow(setE663)}
            onAddFromCatalogue={e => addFromCatalogue(setE663, e)}
            onRemove={i => removeRow(setE663, i)}
            onUpdate={(i, f, v) => updateRow(setE663, i, f, v)}
            note=""
            catalogueOnly
            tooltip={{
              texte: "Compte 663 : le 663 n'est PAS non imposable en bloc - chaque ligne est qualifiée séparément (Art. 69, 8°). Logement (6631) : exonéré dans la limite de 30% de la rémunération (661), l'excédent est imposable. Transport (6634) : exonéré sous condition de réalité et de nécessité démontrées, plafonné au coût du billet local (max 6 courses de taxi pour les cadres, de bus pour les autres) - ce plafond en FC n'est pas vérifié ici, faute de tarif local connu : exonéré par défaut sous cette réserve. Représentation (6632), expatriation (6633), autres (6638) : non listés à l'Art. 69 → imposables, ajoutés à l'assiette au même titre que le 661.",
              loi: "Art. 69, 8°, Loi 23/053"
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Personnes à charge (max 9)
                <InfoTooltip
                  texte="Art. 123 Loi 23/053 : chaque personne à charge donne droit à une réduction de 2% sur l'IRPP brut calculé. | Art. 124 : personnes admises : (1) conjoint légal non séparé ; (2) enfants célibataires reconnus, adoptés ou sous tutelle, de moins de 18 ans ou infirmes ; (3) ascendants des deux conjoints vivant au foyer. Condition : revenu propre de la personne à charge inférieur ou égal à 162 000 FC/mois. | Art. 125 : plafond de 9 personnes maximum. Aucune réduction n'est accordée sur la part d'impôt afférente à la portion du revenu qui excède la 3ème tranche du barème (donc sur la part imposée à 40%)."
                  loi="Art. 123-125 : Loi IRPP 23/053 du 30/11/2023"
                />
              </label>
              <input type="number" min={0} max={9} value={nbCharge}
                onChange={e => setNbCharge(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {res && res.mode === 'national' && res.reductionPlafonnee
                ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</p>
                : <p className="text-xs text-muted-foreground mt-1">Réduction 2% × nb personnes sur IRPP brut (Art. 123-125)</p>
              }
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Effectif total entreprise
                <InfoTooltip
                  texte="L'effectif total de l'entreprise détermine le taux INPP applicable. Taux dégressif : effectif ≤ 50 agents : 3,5% | effectif 51 à 300 agents : 3% | effectif > 300 agents : 2%. | L'INPP (Institut National de Préparation Professionnelle) finance la formation et la reconversion professionnelle des travailleurs. | Contribution patronale obligatoire, à la charge exclusive de l'employeur. | Base : salaire brut imposable (661). | Écriture : Débit 6641 / Crédit 4331 (INPP dette patronale *)."
                  loi="Arrêté interministériel du 24/09/2025 (INPP)"
                />
              </label>
              <input type="number" min={1} placeholder="Ex : 45" value={effectif}
                onChange={e => setEffectif(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">
                {(() => {
                  const n = parseInt(effectif) || 0
                  if (!n) return 'Détermine le taux INPP'
                  return n > 300 ? 'INPP : 2% (> 300 agents)' : n >= 51 ? 'INPP : 3% (51–300 agents)' : 'INPP : 3,5% (≤ 50 agents)'
                })()}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Retenues occasionnelles (optionnel)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Cotisation syndicale (FC)
                  <InfoTooltip
                    texte="La cotisation syndicale est une retenue facultative opérée sur le salaire du travailleur qui est membre d'un syndicat. | Art. 233 Code du Travail RDC : tout travailleur est libre d'adhérer au syndicat de son choix. | Art. 234 CT : l'employeur n'a aucun droit d'ingérence dans la vie syndicale. | Art. 237 CT : la retenue est opérée sur demande expresse du travailleur ou sur présentation d'un mandat de la délégation syndicale. | Elle est déduite après l'IRPP (ne réduit pas la base imposable). | Écriture : Crédit 4252 (Syndicats)."
                    loi="Art. 233, 234, 237 Code du Travail RDC"
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
                    texte="Montants accordés au personnel en cours de mois (avances) ou remboursements de prêts sur salaire. | Art. 114 Code du Travail RDC (Loi 015-2002) : la rémunération n'est cessible et saisissable qu'à concurrence d'1/5 sur la partie n'excédant pas 5 fois le SMIG de sa catégorie, et d'1/3 sur le surplus. En cas d'obligation alimentaire légale : jusqu'à 2/5. Le calcul se fait après déduction des retenues fiscales et sociales. | Art. 112(b) CT : les cotisations CNSS sont des retenues autorisées sur salaire. | Les avances (compte 4211) sont une écriture anticipative : Débit 4211 / Crédit 521 lors du versement, puis solde de 4211 en Crédit lors de la paie."
                    loi="Art. 112(b) et 114 : Loi n°015-2002 du 16/10/2002 (CT RDC, modifié Loi 16/010 du 15/07/2016)"
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={avances}
                  onChange={e => {
                    setAvances(e.target.value)
                    const v = parseFloat(e.target.value) || 0
                    setEcrAnt(v > 0 ? { montant: v } : null)
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Avances, prêts, saisies-arrêts</p>
                {ecrAnt && (
                  <div className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                    <p className="font-semibold mb-1">Écriture anticipative générée :</p>
                    <p>D / <span className="font-mono font-bold">4211</span> Personnel, avances &nbsp;→&nbsp; {formatFC(ecrAnt.montant)}</p>
                    <p>C / <span className="font-mono font-bold">521</span> Banque &nbsp;→&nbsp; {formatFC(ecrAnt.montant)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : mode === 'expatrie' ? (
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-start gap-2 text-xs text-amber-700">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Deux calculs distincts (Art. 84 + Art. 145-148, Loi 23/053) :</strong><br/>
                (1) L'expatrié paie son IRPP selon le même barème progressif que les nationaux (Art. 84 Loi 23/053).<br/>
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
            catalogueOnly
            tooltip={{
              texte: "Compte 662 : rémunérations du personnel non national (expatriés). Même structure que le 661. Ces montants servent de base à l'IRPP (barème progressif) et à l'IERE (charge patronale)",
              loi: "Compte 662 SYSCOHADA"
            }}
          />

          <SectionSaisieModal
            titre="Sous conditions : Indemnités et avantages (663)"
            couleur="slate"
            rows={e663Exp}
            catalogue={ELEMENTS_663}
            onAdd={() => addRow(setE663Exp)}
            onAddFromCatalogue={e => addFromCatalogue(setE663Exp, e)}
            onRemove={i => removeRow(setE663Exp, i)}
            onUpdate={(i, f, v) => updateRow(setE663Exp, i, f, v)}
            note=""
            catalogueOnly
            tooltip={{
              texte: "Compte 663 : le 663 n'est PAS non imposable en bloc - chaque ligne est qualifiée séparément (Art. 69, 8°), même règle que pour les nationaux. Ces éléments servent de base à l'IRPP comme à l'IERE.",
              loi: "Art. 69, 8°, Loi 23/053"
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Personnes à charge (max 9)
                <InfoTooltip
                  texte="Art. 123 Loi 23/053 : même règle que les nationaux : réduction de 2% par personne à charge sur l'IRPP brut. | Art. 124 : personnes admises : (1) conjoint légal non séparé ; (2) enfants célibataires reconnus, adoptés ou sous tutelle, de moins de 18 ans ou infirmes ; (3) ascendants des deux conjoints vivant au foyer. Condition : revenu propre inférieur ou égal à 162 000 FC/mois. | Art. 125 : maximum 9 personnes. Aucune réduction sur la portion d'impôt afférente à la tranche à 40%. | Les expatriés soumis à l'IRPP en RDC (Art. 84 Loi 23/053) bénéficient de ce même droit, sans distinction de nationalité."
                  loi="Art. 123-125 : Loi IRPP 23/053 du 30/11/2023"
                />
              </label>
              <input type="number" min={0} max={9} value={nbChargeExp}
                onChange={e => setNbChargeExp(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              {res && res.mode === 'expatrie' && res.reductionPlafonneeE
                ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</p>
                : <p className="text-xs text-muted-foreground mt-1">Réduction 2% × nb personnes sur IRPP brut (Art. 123-125)</p>
              }
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                Effectif total entreprise
                <InfoTooltip
                  texte="L'effectif total de l'entreprise détermine le taux INPP. Taux dégressif : effectif ≤ 50 agents : 3,5% | effectif 51 à 300 agents : 3% | effectif > 300 agents : 2%. | L'effectif pris en compte inclut les travailleurs nationaux ET expatriés. | Contribution patronale obligatoire : base = salaire brut (662 pour expatriés). | Écriture : Débit 6642 / Crédit 4331 (INPP dette patronale *)."
                  loi="Arrêté interministériel du 24/09/2025 (INPP)"
                />
              </label>
              <input type="number" min={1} placeholder="Ex : 45" value={effectifExp}
                onChange={e => setEffectifExp(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <p className="text-xs text-muted-foreground mt-1">
                {(() => {
                  const n = parseInt(effectifExp) || 0
                  if (!n) return 'Détermine le taux INPP'
                  return n > 300 ? 'INPP : 2%' : n >= 51 ? 'INPP : 3%' : 'INPP : 3,5%'
                })()}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-3 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Retenues occasionnelles (optionnel)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Cotisation syndicale (FC)
                  <InfoTooltip
                    texte="La cotisation syndicale est une retenue facultative opérée sur le salaire de l'expatrié membre d'un syndicat. | Art. 233 Code du Travail RDC : tout travailleur, y compris expatrié, est libre d'adhérer au syndicat de son choix. | Art. 234 CT : l'employeur n'a aucun droit d'ingérence dans la vie syndicale. | Art. 237 CT : la retenue est opérée sur mandat du travailleur ou de la délégation syndicale. | Ne réduit PAS la base imposable IRPP. | Écriture : Crédit 4252 (Syndicats)."
                    loi="Art. 233, 234, 237 Code du Travail RDC"
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
                    texte="Montants accordés à l'expatrié en cours de mois et récupérés sur sa rémunération à la fin du mois. | Art. 114 Code du Travail RDC (Loi 015-2002) : la rémunération n'est cessible et saisissable qu'à concurrence d'1/5 sur la partie n'excédant pas 5 fois le SMIG de sa catégorie, et d'1/3 sur le surplus. En cas d'obligation alimentaire légale : jusqu'à 2/5. Le calcul se fait après déduction des retenues fiscales et sociales. | Art. 1er CT : applicable à tous les travailleurs exerçant en RDC, quelle que soit leur nationalité. | Écriture anticipative : Débit 4211 / Crédit 521 lors du versement ; solde de 4211 lors de la paie."
                    loi="Art. 1er et 114 : Loi n°015-2002 du 16/10/2002 (CT RDC, modifié Loi 16/010 du 15/07/2016)"
                  />
                </label>
                <input type="number" min={0} placeholder="0" value={avancesExp}
                  onChange={e => {
                    setAvancesExp(e.target.value)
                    const v = parseFloat(e.target.value) || 0
                    setEcrAnt(v > 0 ? { montant: v } : null)
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <p className="text-xs text-muted-foreground mt-1">Avances, prêts, saisies-arrêts</p>
                {ecrAnt && (
                  <div className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                    <p className="font-semibold mb-1">Écriture anticipative générée :</p>
                    <p>D / <span className="font-mono font-bold">4211</span> Personnel, avances &nbsp;→&nbsp; {formatFC(ecrAnt.montant)}</p>
                    <p>C / <span className="font-mono font-bold">521</span> Banque &nbsp;→&nbsp; {formatFC(ecrAnt.montant)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
            <p className="text-sm font-medium flex items-center gap-1">
              IERE : taux fixe 25%
              <InfoTooltip
                texte="Art. 145 Loi 23/053 du 30/11/2023 : il est établi un prélèvement exceptionnel à charge des entreprises employant un personnel expatrié. | Art. 146 : le prélèvement est assis sur le montant brut des rémunérations payées (compte 662). | Art. 147 : les exemptions et immunités prévues en matière d'IRPP Cat. 1 s'appliquent également. | Art. 148 : le taux est fixé à 25% du montant brut des rémunérations. | Base : salaire brut imposable 662 uniquement, non les indemnités non imposables (663)."
                loi="Art. 145-148 Loi n°23/053 du 30/11/2023"
              />
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Taux IERE : 25% du brut 662 - charge exclusive de l'employeur (Art. 148 Loi 23/053)</p>
          </div>
        </>
      ) : null}

      {/* ────────────────────────── ONGLET ADMINISTRATEURS ────────────────────────── */}
      {mode === 'admin' && (
        <>
          {/* Note légale */}
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
            <div className="flex items-start gap-2 text-xs text-violet-700">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Art. 68 Loi 23/053 :</strong> "Sont également incluses, les rémunérations versées aux dirigeants sociaux des entreprises (directeurs généraux, gérants, administrateurs ou commissaires) même lorsqu'ils ne sont pas liés à l'entreprise par un contrat de travail classique." : Le terme "commissaires" désigne exclusivement les Commissaires aux Comptes (CAC), seul commissaire reconnu en droit OHADA (Art. 702-730 AUSC). Imposables IRPP Cat. 1, barème progressif. Pas de CNSS, INPP ni ONEM : aucun contrat de travail (Art. 68 in fine).
              </span>
            </div>
          </div>

          {/* Sous-onglets */}
          <div className="flex gap-2">
            {([
              { key: 'mandataire',    label: 'Mandataire non salarié' },
              { key: 'cac_cabinet',   label: 'CAC : Cabinet' },
              { key: 'cac_physique',  label: 'CAC : Pers. physique' },
            ] as { key: SousMode; label: string }[]).map(({ key, label }) => (
              <button key={key} onClick={() => { setSousMode(key); setResAdmin(null) }}
                className={cn('flex-1 py-2 rounded-xl border text-xs font-semibold transition-all duration-200',
                  sousMode === key ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:border-violet-300')}>
                {label}
              </button>
            ))}
          </div>

          {/* ─── MANDATAIRE ─── */}
          {sousMode === 'mandataire' && (
            <>
              {/* Imposables */}
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Rémunérations imposables (FC)</p>
                  <InfoTooltip texte="Ces éléments constituent la base imposable à l'IRPP Cat. 1, débités au compte 6581. | Art. 430 AUSC : 'Hors les sommes perçues dans le cadre d'un contrat de travail, les administrateurs ne peuvent recevoir, au titre de leurs fonctions, aucune autre rémunération, permanente ou non, que celles visées aux articles 431 et 432.' | Art. 431 AUSC : 'L'assemblée générale ordinaire peut allouer aux administrateurs, en rémunération de leurs activités, à titre d'indemnité de fonction une somme fixe annuelle qu'elle détermine souverainement.' | Art. 432 AUSC (1re partie) : l'AG peut allouer des rémunérations exceptionnelles pour missions spéciales confiées. | Art. 68 Loi 23/053 : imposables même sans contrat de travail." loi="Art. 68 Loi 23/053 ; Art. 430-432 AUSC révisé 2014" />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Base imposable IRPP Cat. 1 : Art. 68 Loi 23/053 + Art. 431-432 AUSC
                </p>
                <SectionSaisieModal
                  titre="Rémunérations imposables"
                  couleur="purple"
                  rows={adminLignes}
                  catalogue={ELEMENTS_6581_IMPOSABLES}
                  onAdd={() => setAdminLignes(p => [...p, { code: '6581', label: '', montant: '' }])}
                  onAddFromCatalogue={e => setAdminLignes(p => [...p, { code: e.code, label: e.label, montant: '' }])}
                  onRemove={i => setAdminLignes(p => p.filter((_, idx) => idx !== i))}
                  onUpdate={(i, f, v) => setAdminLignes(p => p.map((r, idx) => idx === i ? { ...r, [f]: v } : r))}
                  note=""
                  catalogueOnly
                />
              </div>

              {/* Non imposables */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Remboursements non imposables (FC)</p>
                  <InfoTooltip texte="Ces éléments NE font PAS partie de la base imposable IRPP. Ce sont des remboursements de frais réels engagés dans l'intérêt exclusif de la société, sur justificatifs. | Art. 432 AUSC (2e partie) : 'Le conseil d'administration peut également allouer à ses membres, des rémunérations exceptionnelles pour les missions et mandats qui leur sont confiés, ou autoriser le remboursement des frais de voyage, déplacements et dépenses engagées dans l'intérêt de la société.' | Condition : frais réels, justifiés, non excessifs. En l'absence de justificatif, requalification possible en avantage imposable." loi="Art. 432 AUSC révisé 2014" />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Hors base IRPP : remboursements sur justificatifs (Art. 432 AUSC révisé 2014)
                </p>
                <SectionSaisieModal
                  titre="Remboursements non imposables"
                  couleur="slate"
                  rows={adminLignesNI}
                  catalogue={ELEMENTS_6581_NON_IMPOSABLES}
                  onAdd={() => setAdminLignesNI(p => [...p, { code: '6581', label: '', montant: '' }])}
                  onAddFromCatalogue={e => setAdminLignesNI(p => [...p, { code: e.code, label: e.label, montant: '' }])}
                  onRemove={i => setAdminLignesNI(p => p.filter((_, idx) => idx !== i))}
                  onUpdate={(i, f, v) => setAdminLignesNI(p => p.map((r, idx) => idx === i ? { ...r, [f]: v } : r))}
                  note=""
                  catalogueOnly
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center">
                  Personnes à charge (max 9)
                  <InfoTooltip texte="Réduction applicable aux administrateurs soumis à l'IRPP Cat. 1, identique aux salariés. | Art. 123 Loi 23/053 : 2% de réduction par personne à charge sur l'IRPP brut. | Art. 124 : Personnes admises : conjoint légal non séparé, enfants célibataires (reconnus, adoptés ou sous tutelle) de moins de 18 ans ou infirmes, ascendants des deux conjoints vivant au foyer. Revenu propre de la personne à charge : inférieur ou égal à 162 000 FC/mois. | Art. 125 : maximum 9 personnes à charge. Aucune réduction sur la portion d'impôt afférente à la tranche à 40%." loi="Art. 123-125 : Loi IRPP 23/053 du 30/11/2023" />
                </label>
                <input type="number" min={0} max={9} value={adminNbCharge}
                  onChange={e => setAdminNbCharge(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                {resAdmin && resAdmin.reductionPlafonnee
                  ? <p className="text-xs text-amber-600 mt-1 font-medium">⚠ Art. 125 : la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</p>
                  : <p className="text-xs text-muted-foreground mt-1">Réduction 2% × nb personnes (Art. 123-125)</p>
                }
              </div>
            </>
          )}

          {/* ─── CAC (cabinet ou physique) ─── */}
          {(sousMode === 'cac_cabinet' || sousMode === 'cac_physique') && (
            <>
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                    {sousMode === 'cac_cabinet' ? 'Honoraires : Cabinet d\'audit' : 'Honoraires : CAC Personne physique'}
                  </p>
                  {sousMode === 'cac_cabinet' ? (
                    <InfoTooltip texte="Le cabinet d'audit est un prestataire externe. La société ne retient PAS d'IRPP : le cabinet gère lui-même ses impôts. | Art. 723 AUSC : 'Les honoraires du commissaire aux comptes sont à la charge de la société.' | Art. 724 AUSC : 'Les frais de déplacement et de séjour engagés par les commissaires aux comptes dans l'exercice de leurs fonctions sont à la charge de la société.' | Art. 50 Loi ONEC 15/002 : 'L'Expert-comptable reçoit pour les travaux qu'il réalise des honoraires qui sont exclusifs de toute autre rémunération, même indirecte.' | TVA 16% obligatoire (Code général des impôts RDC) : prestation assujettie. | Écriture : Débit 6324 (honoraires) + Débit 4454 (TVA récupérable) / Crédit 401 (fournisseur)." loi="Art. 723-724 AUSC 2014 ; Art. 50 Loi ONEC 15/002" />
                  ) : (
                    <InfoTooltip texte="Le CAC personne physique est un expert-comptable indépendant inscrit au tableau de l'ONEC (Art. 59 Loi 15/002). | Art. 723 AUSC : 'Les honoraires du commissaire aux comptes sont à la charge de la société.' | Art. 50 Loi ONEC : honoraires exclusifs, assujettis à TVA 16%. | Art. 53 Loi ONEC : 'L'Expert-comptable ne peut exercer le mandat d'administrateur dans une entreprise dans laquelle il est Expert-comptable. Il ne peut accepter le mandat de commissaire aux comptes dans les deux ans qui suivent la fin de son mandat d'administrateur.' | Incompatibilité totale CAC / administrateur dans la même société. | La société ne retient PAS d'IRPP : le CAC PP déclare ses revenus professionnels en son nom propre. | Écriture : Débit 6324 + Débit 4454 / Crédit 4715 (débité à la Banque lors du paiement)." loi="Art. 723 AUSC 2014 ; Art. 50, 53, 59 Loi ONEC 15/002" />
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Honoraires HT (FC)</label>
                  <input type="number" min={0} placeholder="0" value={cacHT}
                    onChange={e => setCacHT(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <p className="text-xs text-violet-600 font-medium">
                  TVA 16% appliquée automatiquement (taux légal RDC : Code des impôts)
                </p>
                {cacHT && (
                  <div className="rounded-lg bg-muted/40 border border-border/40 px-3 py-2 text-xs space-y-0.5">
                    <p>HT : <span className="font-mono font-semibold">{formatFC(parseFloat(cacHT) || 0)}</span></p>
                    <p>TVA (16%) : <span className="font-mono font-semibold">{formatFC((parseFloat(cacHT) || 0) * 0.16)}</span></p>
                    <p className="font-semibold">TTC : <span className="font-mono">{formatFC((parseFloat(cacHT) || 0) * 1.16)}</span></p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Bouton Calculer admin */}
          <div className="flex gap-2">
            <button onClick={calculerAdmin}
              className="flex-1 bg-violet-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4" /> Calculer
            </button>
            <button onClick={() => { setResAdmin(null); setAdminLignes([{ code: '6581', label: 'Indemnités de fonction (Art. 431 AUSC)', montant: '' }]); setAdminLignesNI([]); setAdminNbCharge(0); setCacHT('') }}
              className="px-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
            </button>
          </div>

          {/* Résultat admin */}
          {resAdmin && (
            <>
            <ResultatWrap titre={
              resAdmin.sousMode === 'mandataire' ? 'Rémunération des administrateurs : Mandataire'
              : resAdmin.sousMode === 'cac_cabinet' ? 'Commissaire aux comptes : Cabinet d\'audit'
              : 'Commissaire aux comptes : Personne physique'
            }>
              {resAdmin.sousMode === 'mandataire' ? (
                <>
                  <EtapeResultat numero={1} titre="Rémunération brute">
                    {/* Imposables */}
                    <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Rémunérations imposables</p>
                    {(resAdmin.adminLignes as LigneSaisie[]).map((l: LigneSaisie, i: number) => (
                      parseFloat(l.montant) > 0 && (
                        <LigneR key={i} signe="+" label={l.label || l.code} val={formatFC(parseFloat(l.montant) || 0)} />
                      )
                    ))}
                    <LigneR signe="=" label="Total imposable IRPP" val={formatFC(resAdmin.brut)} bold />

                    {/* Non imposables */}
                    {resAdmin.totalNI > 0 && (
                      <>
                        <Separateur />
                        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mt-2 mb-1">Remboursements non imposables (Art. 432 AUSC)</p>
                        {(resAdmin.adminLignesNI as LigneSaisie[]).map((l: LigneSaisie, i: number) => (
                          parseFloat(l.montant) > 0 && (
                            <LigneR key={i} signe="+" label={l.label || l.code} val={formatFC(parseFloat(l.montant) || 0)} />
                          )
                        ))}
                        <LigneR signe="=" label="Total non imposable" val={formatFC(resAdmin.totalNI)} />
                      </>
                    )}
                    {resAdmin.totalNI > 0 && (
                      <LigneR signe="=" label="Total brut 6581 (imposable + non imposable)" val={formatFC(resAdmin.brutTotal ?? resAdmin.brut)} bold />
                    )}
                    <Separateur />
                    <LigneR signe="=" label="Base imposable IRPP Cat. 1" val={formatFC(resAdmin.brut)} bold accent />
                  </EtapeResultat>

                  <EtapeResultat numero={2} titre="Calcul IRPP (barème progressif mensuel : Art. 118)">
                    <p className="text-xs text-muted-foreground mb-1">Aucune QPO CNSS : pas de contrat de travail (Art. 68)</p>
                    <p className="text-xs text-muted-foreground mb-1">Base arrondie au millier de FC inférieur (Art. 118) : {formatFC(resAdmin.brutArrondi ?? resAdmin.brut)}</p>
                    {resAdmin.lignes.map((l: LigneBareme, i: number) => (
                      <LigneR key={i} signe="+"
                        label={`${l.tranche} → base réelle : ${formatFC(l.baseReelle)} × ${l.taux}`}
                        val={formatFC(l.impot)} indent />
                    ))}
                    <Separateur />
                    <LigneR label="IRPP calculé (barème)" val={formatFC(resAdmin.iprBrut)} />
                    {resAdmin.charge > 0 && (
                      <>
                        <LigneR signe="−"
                          label={`Réduction charges de famille (${resAdmin.charge} pers. × 2%)`}
                          val={formatFC(resAdmin.reduction)} neg
                          tooltip={{ texte: "Art. 123 Loi 23/053 : réduction de 2% par personne à charge sur l'IRPP brut. | Art. 124 : personnes admises : conjoint légal non séparé, enfants célibataires (reconnus, adoptés ou sous tutelle) de moins de 18 ans ou infirmes, ascendants des deux conjoints vivant au foyer. Revenu propre de la personne à charge inférieur ou égal à 162 000 FC/mois. | Art. 125 : maximum 9 personnes à charge. Aucune réduction sur la portion d'impôt afférente à la tranche à 40%. Applicable aux administrateurs soumis à l'IRPP Cat. 1 (Art. 68 Loi 23/053).", loi: "Art. 123-125 : Loi IRPP 23/053" }}
                        />
                        {resAdmin.reductionPlafonnee && (
                          <div className="flex items-start gap-2 mt-1 rounded-lg px-3 py-2.5 text-xs bg-orange-50 border border-orange-200 text-orange-700">
                            <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                            <span><strong>Art. 125 :</strong> la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</span>
                          </div>
                        )}
                      </>
                    )}
                    {/* Bloc comparaison plafond : avant le résultat final */}
                    <div className={`flex items-start gap-2 mt-2 rounded-lg px-3 py-3 text-xs ${
                      resAdmin.plafonne
                        ? 'bg-amber-50 border border-amber-300 text-amber-700'
                        : 'bg-green-50 border border-green-300 text-green-700'
                    }`}>
                      <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <div className="space-y-0.5">
                        <p><strong>Comparaison Art. 118 :</strong></p>
                        <p>
                          IRPP calculé (barème) = <strong>{formatFC(resAdmin.iprBrut)}</strong>
                          {resAdmin.charge > 0 && (
                            <> − réduction ({resAdmin.charge} pers. × 2%) = {formatFC(resAdmin.reduction)} → net avant plafond = <strong>{formatFC(Math.max(0, resAdmin.iprBrut - resAdmin.reduction))}</strong></>
                          )}
                        </p>
                        <p>Plafond 30% × RNI ({formatFC(resAdmin.brutArrondi ?? resAdmin.brut)}) = <strong>{formatFC(resAdmin.iprMax)}</strong></p>
                        {resAdmin.plafonne
                          ? <p className="font-semibold">IRPP calculé &gt; plafond → on retient le plafond (Art. 118 al. 2)</p>
                          : <p>IRPP calculé ≤ plafond → on retient l'IRPP calculé</p>}
                      </div>
                    </div>

                    <LigneR signe="=" label="IRPP net retenu" val={formatFC(resAdmin.iprNet)} bold accent />
                  </EtapeResultat>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <BoxFinal label="Net à payer au mandataire" sublabel="Total brut 6581 − IRPP" val={formatFC(resAdmin.net)} />
                    <BoxFinal label="IRPP à verser au Trésor" val={formatFC(resAdmin.iprNet)} couleur="red" />
                  </div>
                </>
              ) : (
                <>
                  <EtapeResultat numero={1} titre="Détail honoraires">
                    <LigneR signe="+" label="Honoraires HT" val={formatFC(resAdmin.ht)} />
                    <LigneR signe="+" label={`TVA (${resAdmin.taux}%)`} val={formatFC(resAdmin.tva)} />
                    <Separateur />
                    <LigneR signe="=" label="Total TTC" val={formatFC(resAdmin.ttc)} bold accent />
                  </EtapeResultat>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <BoxFinal label="Honoraires HT" sublabel="Débit 6324" val={formatFC(resAdmin.ht)} />
                    <BoxFinal label={`TVA (${resAdmin.taux}%)`} sublabel="Débit 4454" val={formatFC(resAdmin.tva)} />
                    <BoxFinal label="Total TTC" sublabel={resAdmin.sousMode === 'cac_cabinet' ? 'Crédit 401' : 'Crédit 4715'} val={formatFC(resAdmin.ttc)} credit />
                  </div>
                </>
              )}
            </ResultatWrap>

            {/* ÉCRITURES ADMIN */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-500/10 border-b border-blue-200">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 shrink-0">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <p className="font-bold text-sm text-blue-800">Écritures comptables au journal : SYSCOHADA</p>
              </div>
              <div className="p-4 space-y-3">
                {resAdmin.sousMode === 'mandataire' ? (
                  <>
                    <JournalEntry
                      numero="1"
                      libelle="Constatation : Rémunération brute administrateurs (imposable + non imposable)"
                      lignes={[
                        { sens: 'D', compte: '6581', intitule: "Indemnités de fonction et rémunérations d'administrateurs", montant: resAdmin.brutTotal ?? resAdmin.brut },
                        { sens: 'C', compte: '4715', intitule: "Rémunérations d'administrateurs", montant: resAdmin.brutTotal ?? resAdmin.brut },
                      ]}
                    />
                    <JournalEntry
                      numero="2"
                      libelle="Retenue IRPP à la source : Art. 68 Loi 23/053 (base imposable uniquement)"
                      lignes={[
                        { sens: 'D', compte: '4715', intitule: "Rémunérations d'administrateurs", montant: resAdmin.iprNet },
                        { sens: 'C', compte: '44721', intitule: 'IRPP retenu à la source *', montant: resAdmin.iprNet },
                      ]}
                    />
                    <JournalEntry
                      numero="3"
                      libelle="Paiement : Règlement net administrateurs + reversement IRPP au Trésor"
                      lignes={[
                        { sens: 'D', compte: '4715',  intitule: "Rémunérations d'administrateurs (net à payer)", montant: resAdmin.net },
                        { sens: 'D', compte: '44721', intitule: 'IRPP retenu à la source *',                    montant: resAdmin.iprNet },
                        { sens: 'C', compte: '521',   intitule: 'Banque',                                       montant: resAdmin.brutTotal ?? resAdmin.brut },
                      ]}
                    />
                  </>
                ) : resAdmin.sousMode === 'cac_cabinet' ? (
                  <>
                    <JournalEntry
                      numero="1"
                      libelle="Constatation honoraires : Cabinet d'audit"
                      lignes={[
                        { sens: 'D', compte: '6324', intitule: 'Honoraires des professions réglementées', montant: resAdmin.ht },
                        { sens: 'D', compte: '4454', intitule: 'TVA récupérable sur services extérieurs', montant: resAdmin.tva },
                        { sens: 'C', compte: '401',  intitule: 'Fournisseurs',                             montant: resAdmin.ttc },
                      ]}
                    />
                    <JournalEntry
                      numero="2"
                      libelle="Paiement : Règlement cabinet d'audit"
                      lignes={[
                        { sens: 'D', compte: '401', intitule: 'Fournisseurs', montant: resAdmin.ttc },
                        { sens: 'C', compte: '521', intitule: 'Banque',       montant: resAdmin.ttc },
                      ]}
                    />
                  </>
                ) : (
                  <>
                    <JournalEntry
                      numero="1"
                      libelle="Constatation honoraires : CAC personne physique"
                      lignes={[
                        { sens: 'D', compte: '6324', intitule: 'Honoraires des professions réglementées', montant: resAdmin.ht },
                        { sens: 'D', compte: '4454', intitule: 'TVA récupérable sur services extérieurs', montant: resAdmin.tva },
                        { sens: 'C', compte: '4715', intitule: "Rémunérations d'administrateurs",          montant: resAdmin.ttc },
                      ]}
                    />
                    <JournalEntry
                      numero="2"
                      libelle="Paiement : Règlement CAC personne physique"
                      lignes={[
                        { sens: 'D', compte: '4715', intitule: "Rémunérations d'administrateurs", montant: resAdmin.ttc },
                        { sens: 'C', compte: '521',  intitule: 'Banque',                           montant: resAdmin.ttc },
                      ]}
                    />
                  </>
                )}
              </div>
            </div>
            </>
          )}
        </>
      )}

      {mode !== 'admin' && (
      <div className="flex gap-2">
        <button onClick={calculer}
          className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Calculator className="h-4 w-4" /> Calculer
        </button>
        <button onClick={reset}
          className="px-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
        </button>
      </div>
      )}

      {res && (
        <>
        <ResultatWrap titre={res.mode === 'national' ? 'IRPP Cat. 1 : Résultat National' : 'IRPP Cat. 1 : Résultat Expatrié'}>
          {res.mode === 'national' ? (
            <>
              <EtapeResultat numero={1} titre="Revenu brut">
                <LigneR signe="+" label="Revenus imposables (661)" val={formatFC(res.brut661)} />
                <LigneR signe="+" label="Non imposables (663)" val={formatFC(res.brut663)} />
                <Separateur />
                <LigneR signe="=" label="Total brut" val={formatFC(res.brutTotal)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={2} titre="Base imposable nette">
                <LigneR signe="+" label="Revenus imposables bruts (661)" val={formatFC(res.brut661)} />
                <LigneR signe="−" label="QPO : Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpo)} neg note="Art. 71"
                  tooltip={{ texte: "La QPO (Quote-Part Ouvrière) est la cotisation obligatoire retenue sur le salaire du travailleur au titre de la sécurité sociale (CNSS). | Art. 71 Loi 23/053 : 'La Quote-Part Ouvrière est fixée à 5% du salaire brut imposable du travailleur. Elle est retenue à la source par l'employeur et versée à la CNSS.' | Base de calcul : salaire brut imposable (compte 661), avant tout autre abattement. | Déduite en priorité pour obtenir le revenu net imposable sur lequel s'applique le barème IRPP (Art. 118 Loi 23/053). | Écriture : Crédit 43181 (CNSS QPO *). Ne concerne que les travailleurs nationaux sous contrat de travail.", loi: "Art. 71 : Loi IRPP 23/053 du 30/11/2023" }}
                />
                <Separateur />
                <LigneR signe="=" label="Revenu net imposable" val={formatFC(res.baseImposable)} bold accent />

              </EtapeResultat>

              <EtapeResultat numero={3} titre="Calcul IRPP (barème progressif mensuel : Art. 118)">
                <p className="text-xs text-muted-foreground mb-1">Barème annuel ÷ 12 : Loi IRPP 23/053 du 30/11/2023</p>
                {res.lignes.map((l: LigneBareme, i: number) => (
                  <LigneR key={i} signe="+"
                    label={`${l.tranche} → base réelle : ${formatFC(l.baseReelle)} × ${l.taux}`}
                    val={formatFC(l.impot)} indent />
                ))}
                <Separateur />
                <LigneR label="IRPP brut" val={formatFC(res.iprBrut)} />
                {res.charge > 0 && (
                  <>
                    <LigneR signe="−"
                      label={`Réduction charges de famille : Art. 123-125 (${res.charge} pers. × 2%)`}
                      val={formatFC(res.reduction)} neg
                      tooltip={{ texte: "Art. 123 Loi 23/053 : réduction de 2% par personne à charge sur l'IRPP brut. | Art. 124 : sont admis comme personnes à charge : (1) le conjoint légal non séparé ; (2) les enfants célibataires reconnus, adoptés ou placés sous tutelle, de moins de 18 ans, ou infirmes et incapables de subvenir à leurs besoins ; (3) les ascendants des deux conjoints vivant au foyer. Condition commune : revenu propre de la personne à charge inférieur ou égal à 162 000 FC/mois. | Art. 125 : plafond fixé à 9 personnes à charge maximum. Aucune réduction n'est accordée sur la portion d'impôt afférente à la tranche à 40%.", loi: "Art. 123-125 : Loi IRPP 23/053 du 30/11/2023" }}
                    />
                    {res.reductionPlafonnee && (
                      <div className="flex items-start gap-2 mt-1 rounded-lg px-3 py-2.5 text-xs bg-orange-50 border border-orange-200 text-orange-700">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span><strong>Art. 125 :</strong> la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</span>
                      </div>
                    )}
                  </>
                )}
                <LigneR signe="=" label="IRPP net dû" val={formatFC(res.iprNet)} bold accent />
                <div className={`flex items-start gap-2 mt-2 rounded-lg px-3 py-3 text-xs ${
                  res.plafonne
                    ? 'bg-amber-50 border border-amber-300 text-amber-700'
                    : 'bg-green-50 border border-green-300 text-green-700'
                }`}>
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    Plafond Art. 118 : IRPP max = <strong>{formatFC(res.iprMax)}</strong> (30% × {formatFC(res.baseImposable)})
                    {res.plafonne
                      ? <> : <strong>Plafonné</strong> : IRPP retenu = {formatFC(res.iprNet)}</>
                      : <> : <strong>Conforme</strong> : IRPP ({formatFC(res.iprNet)}) ≤ IRPP max</>}
                  </span>
                </div>
              </EtapeResultat>

              <EtapeResultat numero={4} titre="Récapitulatif des retenues salariales">
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpo)} neg />
                <LigneR signe="−" label="IRPP net" val={formatFC(res.iprNet)} neg />
                {res.syndicatVal > 0 && <LigneR signe="−" label="Cotisation syndicale" val={formatFC(res.syndicatVal)} neg />}
                {res.avancesVal > 0 && <LigneR signe="−" label="Avances / Prêts" val={formatFC(res.avancesVal)} neg />}
                <Separateur />
                <LigneR signe="=" label="Total retenues" val={formatFC(res.totalRetenues)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={5} titre="Charges sociales patronales">
                <LigneR signe="+" label="CNSS patronal (13%)" val={formatFC(res.cnssPatron)}
                  tooltip={{ texte: "La Quote-Part Patronale (QPP) CNSS est à la charge exclusive de l'employeur. | Taux : 13% du salaire brut imposable (661). | Elle couvre : accidents du travail, maladies professionnelles, allocations familiales, pension vieillesse (retraite). | Art. 112(b) Code du Travail RDC (Loi 015-2002) : les cotisations dues à la CNSS (désignée 'Institut National de Sécurité Sociale') constituent des retenues autorisées sur le salaire. | L'employeur est débiteur solidaire de la QPO ouvrière et de la QPP patronale vis-à-vis de la CNSS. | Écriture : Débit 6641 (Charges sociales personnel national) / Crédit 43182 (CNSS QPP *).", loi: "Art. 71 Loi 23/053 ; Art. 112(b) Loi n°015-2002 du 16/10/2002 (CT RDC)" }}
                />
                <LigneR signe="+" label={`INPP (${(res.inppTaux * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%)`} val={formatFC(res.inpp)}
                  tooltip={{ texte: "L'INPP (Institut National de Préparation Professionnelle) est financé par une contribution patronale obligatoire. | Taux dégressif selon l'effectif total : effectif ≤ 50 agents : 3,5% | effectif 51 à 300 agents : 3% | effectif > 300 agents : 2%. | Base : salaire brut imposable (661) du personnel national. | À la charge exclusive de l'employeur. | Écriture : Débit 6641 / Crédit 4331 (INPP dette patronale *).", loi: "Arrêté interministériel du 24/09/2025 (INPP)" }}
                />
                <LigneR signe="+" label="ONEM (0,5%)" val={formatFC(res.onem)}
                  tooltip={{ texte: "L'ONEM (Office National de l'Emploi) est financé par une contribution patronale obligatoire sur toutes les rémunérations versées. | Taux : 0,5% du salaire brut imposable (661). | Taux fixé par l'Arrêté Ministériel N°028/CAB/MIN.ET/FMM/RK/09/2025. | Mission : placement, insertion professionnelle, gestion du chômage. | À la charge exclusive de l'employeur. | Écriture : Débit 6641 / Crédit 4332 (ONEM dette patronale *).", loi: "AM N°028/CAB/MIN.ET/FMM/RK/09/2025" }}
                />
                <Separateur />
                <LigneR signe="=" label="Total charges patronales" val={formatFC(res.totalChargePatronale)} bold accent />
              </EtapeResultat>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <BoxFinal label="Net à payer au salarié" sublabel="Brut (661+663) − Total retenues" val={formatFC(res.netAPayer)} />
                <BoxFinal label="Charge patronale" sublabel="Net à payer + CNSS + INPP + ONEM" val={formatFC(res.chargePatronale)} credit />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <BoxFinal label="Total retenues salarié"
                  sublabel={`QPO + IPR${res.syndicatVal > 0 ? ' + Syndicat' : ''}${res.avancesVal > 0 ? ' + Avances' : ''}`}
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
                <LigneR signe="=" label="Total brut" val={formatFC(res.brutTotal)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={2} titre="Base imposable nette">
                <LigneR signe="+" label="Revenus imposables bruts (662)" val={formatFC(res.brut662)} />
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpoE)} neg note="Art. 71"
                  tooltip={{ texte: "Art. 71 Loi 23/053 : la QPO s'applique également aux travailleurs expatriés affiliés à la CNSS RDC, au taux de 5% du salaire brut imposable (662). | Exception : si une convention bilatérale de sécurité sociale est en vigueur entre la RDC et le pays d'origine de l'expatrié, et que ce dernier cotise déjà dans son pays, la QPO CNSS peut être suspendue ou réduite. | En l'absence de convention bilatérale : cotisation obligatoire identique aux nationaux. | Base : salaire brut imposable (662) avant toute déduction. | Écriture : Crédit 43181 (CNSS QPO *).", loi: "Art. 71 : Loi IRPP 23/053 du 30/11/2023" }}
                />
                <Separateur />
                <LigneR signe="=" label="Revenu net imposable" val={formatFC(res.baseImposableE)} bold accent />

              </EtapeResultat>

              <EtapeResultat numero={3} titre="IRPP expatrié (barème progressif : Art. 84 + Art. 118)">
                <p className="text-xs text-muted-foreground mb-1">Même barème progressif mensuel que les nationaux : Loi IRPP 23/053</p>

                {res.lignes.map((l: LigneBareme, i: number) => (
                  <LigneR key={i} signe="+"
                    label={`${l.tranche} → base réelle : ${formatFC(l.baseReelle)} × ${l.taux}`}
                    val={formatFC(l.impot)} indent />
                ))}
                <Separateur />
                <LigneR label="IRPP brut" val={formatFC(res.iprBrut)} />
                {res.chargeE > 0 && (
                  <>
                    <LigneR signe="−"
                      label={`Réduction charges de famille : Art. 123-125 (${res.chargeE} pers. × 2%)`}
                      val={formatFC(res.reductionE)} neg
                      tooltip={{ texte: "Art. 123 Loi 23/053 : même règle que les nationaux : réduction de 2% par personne à charge sur l'IRPP brut. | Art. 124 : personnes admises : (1) conjoint légal non séparé ; (2) enfants célibataires reconnus, adoptés ou sous tutelle, de moins de 18 ans ou infirmes ; (3) ascendants des deux conjoints vivant au foyer. Revenu propre inférieur ou égal à 162 000 FC/mois. | Art. 125 : maximum 9 personnes. Aucune réduction sur la portion d'impôt afférente à la tranche à 40%. | Applicable aux expatriés soumis à l'IRPP en RDC (Art. 84 Loi 23/053), quelle que soit leur nationalité.", loi: "Art. 123-125 : Loi IRPP 23/053 du 30/11/2023" }}
                    />
                    {res.reductionPlafonneeE && (
                      <div className="flex items-start gap-2 mt-1 rounded-lg px-3 py-2.5 text-xs bg-orange-50 border border-orange-200 text-orange-700">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span><strong>Art. 125 :</strong> la portion d'IRPP correspondant à la tranche à 40% est exclue de l'assiette de la réduction</span>
                      </div>
                    )}
                  </>
                )}
                <LigneR signe="=" label="IRPP net retenu sur salaire" val={formatFC(res.iprNetExp)} bold accent />
                <div className={`flex items-start gap-2 mt-2 rounded-lg px-3 py-3 text-xs ${
                  res.plafonne
                    ? 'bg-amber-50 border border-amber-300 text-amber-700'
                    : 'bg-green-50 border border-green-300 text-green-700'
                }`}>
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    Plafond Art. 118 : IRPP max = <strong>{formatFC(res.iprMax)}</strong> (30% × {formatFC(res.baseImposableE)})
                    {res.plafonne
                      ? <> : <strong>Plafonné</strong> : IRPP retenu = {formatFC(res.iprNetExp)}</>
                      : <> : <strong>Conforme</strong> : IRPP ({formatFC(res.iprNetExp)}) ≤ IRPP max</>}
                  </span>
                </div>
              </EtapeResultat>

              <EtapeResultat numero={4} titre="IERE : Charge patronale (Art. 145-148)">
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 space-y-1">
                  <p className="text-xs font-semibold text-red-700 uppercase">Prélèvement exceptionnel à charge de l'entreprise</p>
                  <LigneR signe="+" label="Base imposable (brut 662)" val={formatFC(res.brut662)} />
                  <LigneR signe="×" label={`Taux IERE (${(res.tauxIere * 100).toFixed(1)}%)`} val="" />
                  <Separateur />
                  <LigneR signe="=" label="IERE dû par l'employeur" val={formatFC(res.iere)} bold />
                </div>
              </EtapeResultat>

              <EtapeResultat numero={5} titre="Récapitulatif des retenues salariales">
                <LigneR signe="−" label="Quote-Part Ouvrière CNSS (5%)" val={formatFC(res.qpoE)} neg />
                <LigneR signe="−" label="IRPP net" val={formatFC(res.iprNetExp)} neg />
                {res.syndicatValE > 0 && <LigneR signe="−" label="Cotisation syndicale" val={formatFC(res.syndicatValE)} neg />}
                {res.avancesValE > 0 && <LigneR signe="−" label="Avances / Prêts" val={formatFC(res.avancesValE)} neg />}
                <Separateur />
                <LigneR signe="=" label="Total retenues" val={formatFC(res.totalRetenuesE)} bold accent />
              </EtapeResultat>

              <EtapeResultat numero={6} titre="Charges patronales (IERE + cotisations)">
                <LigneR signe="+" label={`IERE (${(res.tauxIere * 100).toFixed(1)}%)`} val={formatFC(res.iere)}
                  tooltip={{ texte: "L'IERE (Prélèvement Exceptionnel sur les Rémunérations des Expatriés) est une charge PATRONALE exclusive : ce n'est PAS une retenue sur le salaire. | Art. 145 Loi 23/053 : prélèvement à charge des entreprises employant un personnel expatrié. | Art. 146 : assis sur le montant brut des rémunérations (662). | Art. 147 : les exemptions IRPP Cat. 1 s'appliquent. | Art. 148 : taux fixé à 25% du brut. | Écriture : Débit 6413 / Crédit 44722 (IERE à verser *).", loi: "Art. 145-148 Loi n°23/053 du 30/11/2023" }}
                />
                <LigneR signe="+" label="CNSS patronal (13%)" val={formatFC(res.cnssPatronE)}
                  tooltip={{ texte: "La Quote-Part Patronale (QPP) CNSS est à la charge exclusive de l'employeur, non déductible du salaire de l'expatrié. | Taux : 13% du salaire brut imposable (662). | Applicable aux expatriés affiliés à la CNSS RDC, en l'absence de convention bilatérale de sécurité sociale. | Art. 1er Code du Travail RDC (Loi 015-2002) : le Code du Travail s'applique à tous les travailleurs exerçant en RDC, quelle que soit leur nationalité. | Art. 112(b) CT : les cotisations dues à la CNSS constituent des retenues autorisées sur le salaire. | La QPP CNSS couvre les risques : accident du travail, maladie professionnelle, allocations familiales, retraite (pension vieillesse). | Écriture : Débit 6642 (Charges sociales personnel non national) / Crédit 43182 (CNSS QPP *).", loi: "Art. 71 Loi 23/053 ; Art. 1er et 112(b) Loi n°015-2002 du 16/10/2002 (CT RDC)" }}
                />
                <LigneR signe="+" label={`INPP (${(res.inppTauxE * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%)`} val={formatFC(res.inppE)}
                  tooltip={{ texte: "L'INPP (Institut National de Préparation Professionnelle) est financé par une contribution patronale obligatoire sur toutes les rémunérations versées au personnel (national et expatrié). | Taux progressif dégressif selon l'effectif total de l'entreprise : effectif ≤ 50 agents : 3,5% | effectif 51 à 300 agents : 3% | effectif > 300 agents : 2%. | Base : salaire brut (662 pour les expatriés). | À la charge exclusive de l'employeur. | Écriture : Débit 6642 / Crédit 4331 (INPP dette patronale *).", loi: "Arrêté interministériel du 24/09/2025 (INPP) ; art. 71 Loi 23/053 (référence)" }}
                />
                <LigneR signe="+" label="ONEM (0,5%)" val={formatFC(res.onemE)}
                  tooltip={{ texte: "L'ONEM (Office National de l'Emploi) est financé par une contribution patronale sur toutes les rémunérations versées (national et expatrié). | Taux : 0,5% du salaire brut. | Taux fixé par l'Arrêté Ministériel N°028/CAB/MIN.ET/FMM/RK/09/2025. | Mission de l'ONEM : placement et insertion professionnelle des travailleurs, gestion du chômage. | À la charge exclusive de l'employeur. | Base : salaire brut (662 pour les expatriés). | Écriture : Débit 6642 / Crédit 4332 (ONEM dette patronale *).", loi: "AM N°028/CAB/MIN.ET/FMM/RK/09/2025" }}
                />
                <Separateur />
                <LigneR signe="=" label="Total charges patronales" val={formatFC(res.totalChargePatronale)} bold accent />
              </EtapeResultat>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <BoxFinal label="Net à payer à l'expatrié" sublabel="Brut (662+663) − Total retenues" val={formatFC(res.netAPayer)} />
                <BoxFinal label="IERE à verser au Trésor" val={formatFC(res.iere)} couleur="red" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <BoxFinal label="Total retenues salarié"
                  sublabel={`QPO + IRPP${res.syndicatValE > 0 ? ' + Syndicat' : ''}${res.avancesValE > 0 ? ' + Avances' : ''}`}
                  val={formatFC(res.totalRetenuesE)} />
                <BoxFinal label="Charge patronale" sublabel="Net à payer + IERE + CNSS + INPP + ONEM" val={formatFC(res.chargePatronale)} credit />
              </div>
            </>
          )}
        </ResultatWrap>

        {/* ═══════════════════════════════════════════════════════════════════
            ÉCRITURES COMPTABLES AU JOURNAL
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-500/10 border-b border-blue-200">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 shrink-0">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <p className="font-bold text-sm text-blue-800">Écritures comptables au journal : SYSCOHADA</p>
          </div>
          <div className="p-4 space-y-3">

            {/* NOTE PÉDAGOGIQUE */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              <p>Les comptes avec <span className="font-semibold">*</span> sont des sous-comptes personnalisés créés selon la nomenclature SYSCOHADA révisé 2017. Les montants sont calculés à partir des valeurs saisies.</p>
            </div>

            {/* ÉCRITURE 0 : ANTICIPATIVE (si avance saisie) */}
            {res.mode === 'national' && (parseFloat(avances) || 0) > 0 && (
              <JournalEntry
                numero="0"
                libelle={`Écriture anticipative avances : Versement avances sur salaire (${formatFC(parseFloat(avances))})`}
                lignes={[
                  { sens: 'D', compte: '4211', intitule: 'Personnel, avances *', montant: parseFloat(avances) || 0 },
                  { sens: 'C', compte: '521',  intitule: 'Banque',               montant: parseFloat(avances) || 0 },
                ]}
              />
            )}
            {res.mode === 'expatrie' && (parseFloat(avancesExp) || 0) > 0 && (
              <JournalEntry
                numero="0"
                libelle={`Écriture anticipative avances : Versement avances sur salaire expatrié (${formatFC(parseFloat(avancesExp))})`}
                lignes={[
                  { sens: 'D', compte: '4211', intitule: 'Personnel, avances *', montant: parseFloat(avancesExp) || 0 },
                  { sens: 'C', compte: '521',  intitule: 'Banque',               montant: parseFloat(avancesExp) || 0 },
                ]}
              />
            )}

            {res.mode === 'national' ? (
              <>
                {/* ÉCRITURE 1 : LISTING DE PAIE */}
                <JournalEntry
                  numero="1"
                  libelle="Listing de paie : Constatation rémunérations brutes"
                  lignes={[
                    ...e661.filter(r => parseFloat(r.montant) > 0).map(r => ({
                      sens: 'D' as const,
                      compte: r.code || '6611',
                      intitule: r.label || 'Rémunérations nationales',
                      montant: parseFloat(r.montant) || 0,
                    })),
                    ...e663.filter(r => parseFloat(r.montant) > 0).map(r => ({
                      sens: 'D' as const,
                      compte: r.code || '6631',
                      intitule: r.label || 'Indemnités légales',
                      montant: parseFloat(r.montant) || 0,
                    })),
                    { sens: 'C' as const, compte: '422', intitule: 'Personnel, rémunérations dues', montant: res.brutTotal },
                  ]}
                />

                {/* ÉCRITURE 2 : RETENUES SUR SALAIRE */}
                {(() => {
                  const totalRetenues2 = res.qpo + (res.syndicatVal || 0) + (res.avancesVal || 0) + res.iprNet
                  const lignes2: { sens: 'D' | 'C'; compte: string; intitule: string; montant: number }[] = [
                    { sens: 'D', compte: '422', intitule: 'Personnel, rémunérations dues', montant: totalRetenues2 },
                    { sens: 'C', compte: '43181', intitule: 'CNSS : Quote-Part Ouvrière (5%) *', montant: res.qpo },
                  ]
                  if (res.syndicatVal > 0) lignes2.push({ sens: 'C', compte: '4252', intitule: 'Syndicats', montant: res.syndicatVal })
                  if (res.avancesVal > 0) lignes2.push({ sens: 'C', compte: '4211', intitule: 'Personnel, avances (soldé) *', montant: res.avancesVal })
                  lignes2.push({ sens: 'C', compte: '44721', intitule: 'IRPP retenu à la source *', montant: res.iprNet })
                  return (
                    <JournalEntry
                      numero="2"
                      libelle="Retenues sur salaire : Décomposition du brut"
                      lignes={lignes2}
                    />
                  )
                })()}

                {/* ÉCRITURE 3 : CNSS PATRONALE (13%) */}
                <JournalEntry
                  numero="3"
                  libelle="Charges sociales : CNSS patronale (13%)"
                  lignes={[
                    { sens: 'D', compte: '6641', intitule: 'Charges sociales sur rémunération du personnel national', montant: res.cnssPatron },
                    { sens: 'C', compte: '43182', intitule: 'CNSS : Quote-Part Patronale (13%) *', montant: res.cnssPatron },
                  ]}
                />

                {/* ÉCRITURE 4 : INPP PATRONAL */}
                <JournalEntry
                  numero="4"
                  libelle={`Charges sociales : INPP patronal (${(res.inppTaux * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%)`}
                  lignes={[
                    { sens: 'D', compte: '6641', intitule: 'Charges sociales sur rémunération du personnel national', montant: res.inpp },
                    { sens: 'C', compte: '4331', intitule: 'INPP : dette patronale *', montant: res.inpp },
                  ]}
                />

                {/* ÉCRITURE 5 : ONEM PATRONAL */}
                <JournalEntry
                  numero="5"
                  libelle="Charges sociales : ONEM patronal (0,5%)"
                  lignes={[
                    { sens: 'D', compte: '6641', intitule: 'Charges sociales sur rémunération du personnel national', montant: res.onem },
                    { sens: 'C', compte: '4332', intitule: 'ONEM : dette patronale *', montant: res.onem },
                  ]}
                />

                {/* ÉCRITURE 7 : PAIEMENT */}
                {(() => {
                  const totalDettes = res.qpo + res.cnssPatron + res.inpp + res.onem + res.iprNet
                  const netBanque2 = res.brutTotal - res.qpo - (res.syndicatVal || 0) - (res.avancesVal || 0) - res.iprNet
                  const lignes7: { sens: 'D' | 'C'; compte: string; intitule: string; montant: number }[] = []
                  if (netBanque2 > 0) lignes7.push({ sens: 'D', compte: '422', intitule: 'Personnel, rémunérations dues (net)', montant: netBanque2 })
                  lignes7.push({ sens: 'D', compte: '43181', intitule: 'CNSS : Quote-Part Ouvrière *', montant: res.qpo })
                  lignes7.push({ sens: 'D', compte: '43182', intitule: 'CNSS : Quote-Part Patronale *', montant: res.cnssPatron })
                  lignes7.push({ sens: 'D', compte: '4331', intitule: 'INPP : dette patronale *', montant: res.inpp })
                  lignes7.push({ sens: 'D', compte: '4332', intitule: 'ONEM : dette patronale *', montant: res.onem })
                  lignes7.push({ sens: 'D', compte: '44721', intitule: 'IRPP retenu à la source *', montant: res.iprNet })
                  const totalVerse = (netBanque2 > 0 ? netBanque2 : 0) + res.qpo + res.cnssPatron + res.inpp + res.onem + res.iprNet
                  lignes7.push({ sens: 'C', compte: '521', intitule: 'Banque', montant: totalVerse })
                  return (
                    <JournalEntry
                      numero="7"
                      libelle="Paiement : Règlement charges du personnel"
                      lignes={lignes7}
                    />
                  )
                })()}
              </>
            ) : (
              <>
                {/* MODE EXPATRIÉ */}
                {/* ÉCRITURE 1 : LISTING DE PAIE EXPATRIÉ */}
                <JournalEntry
                  numero="1"
                  libelle="Listing de paie : Constatation rémunérations brutes (expatriés)"
                  lignes={[
                    ...e662.filter(r => parseFloat(r.montant) > 0).map(r => ({
                      sens: 'D' as const,
                      compte: r.code || '6621',
                      intitule: r.label || 'Rémunérations expatriés',
                      montant: parseFloat(r.montant) || 0,
                    })),
                    ...e663Exp.filter(r => parseFloat(r.montant) > 0).map(r => ({
                      sens: 'D' as const,
                      compte: r.code || '6631',
                      intitule: r.label || 'Indemnités légales',
                      montant: parseFloat(r.montant) || 0,
                    })),
                    { sens: 'C' as const, compte: '422', intitule: 'Personnel, rémunérations dues', montant: res.brutTotal },
                  ]}
                />

                {/* ÉCRITURE 2 : RETENUES SUR SALAIRE EXPATRIÉ */}
                {(() => {
                  const totalRetenues2e = res.qpoE + (res.syndicatValE || 0) + (res.avancesValE || 0) + res.iprNetExp
                  const lignes2e: { sens: 'D' | 'C'; compte: string; intitule: string; montant: number }[] = [
                    { sens: 'D', compte: '422', intitule: 'Personnel, rémunérations dues', montant: totalRetenues2e },
                    { sens: 'C', compte: '43181', intitule: 'CNSS : Quote-Part Ouvrière (5%) *', montant: res.qpoE },
                  ]
                  if (res.syndicatValE > 0) lignes2e.push({ sens: 'C', compte: '4252', intitule: 'Syndicats', montant: res.syndicatValE })
                  if (res.avancesValE > 0) lignes2e.push({ sens: 'C', compte: '4211', intitule: 'Personnel, avances (soldé) *', montant: res.avancesValE })
                  lignes2e.push({ sens: 'C', compte: '44721', intitule: 'IRPP retenu à la source *', montant: res.iprNetExp })
                  return (
                    <JournalEntry
                      numero="2"
                      libelle="Retenues sur salaire : Décomposition du brut (expatrié)"
                      lignes={lignes2e}
                    />
                  )
                })()}

                {/* ÉCRITURE 3 : CNSS PATRONALE EXPATRIÉ */}
                <JournalEntry
                  numero="3"
                  libelle="Charges sociales : CNSS patronale (13%) : expatrié"
                  lignes={[
                    { sens: 'D', compte: '6642', intitule: 'Charges sociales sur rémunération du personnel non national', montant: res.cnssPatronE },
                    { sens: 'C', compte: '43182', intitule: 'CNSS : Quote-Part Patronale (13%) *', montant: res.cnssPatronE },
                  ]}
                />

                {/* ÉCRITURE 4 : INPP PATRONAL EXPATRIÉ */}
                <JournalEntry
                  numero="4"
                  libelle={`Charges sociales : INPP patronal (${(res.inppTauxE * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%) : expatrié`}
                  lignes={[
                    { sens: 'D', compte: '6642', intitule: 'Charges sociales sur rémunération du personnel non national', montant: res.inppE },
                    { sens: 'C', compte: '4331', intitule: 'INPP : dette patronale *', montant: res.inppE },
                  ]}
                />

                {/* ÉCRITURE 5 : ONEM PATRONAL EXPATRIÉ */}
                <JournalEntry
                  numero="5"
                  libelle="Charges sociales : ONEM patronal (0,5%) : expatrié"
                  lignes={[
                    { sens: 'D', compte: '6642', intitule: 'Charges sociales sur rémunération du personnel non national', montant: res.onemE },
                    { sens: 'C', compte: '4332', intitule: 'ONEM : dette patronale *', montant: res.onemE },
                  ]}
                />

                {/* ÉCRITURE 6 : IERE */}
                <JournalEntry
                  numero="6"
                  libelle={`IERE : Impôt exceptionnel sur rémunérations expatriées (${(res.tauxIere * 100).toFixed(1)}%)`}
                  lignes={[
                    { sens: 'D', compte: '6413', intitule: 'Taxes sur appointements et salaires', montant: res.iere },
                    { sens: 'C', compte: '44722', intitule: 'IERE à verser *', montant: res.iere },
                  ]}
                />

                {/* ÉCRITURE 7 : PAIEMENT EXPATRIÉ */}
                {(() => {
                  const netBanqueE2 = res.brutTotal - res.qpoE - (res.syndicatValE || 0) - (res.avancesValE || 0) - res.iprNetExp
                  const lignes7e: { sens: 'D' | 'C'; compte: string; intitule: string; montant: number }[] = []
                  if (netBanqueE2 > 0) lignes7e.push({ sens: 'D', compte: '422', intitule: 'Personnel, rémunérations dues (net)', montant: netBanqueE2 })
                  lignes7e.push({ sens: 'D', compte: '43181', intitule: 'CNSS : Quote-Part Ouvrière *', montant: res.qpoE })
                  lignes7e.push({ sens: 'D', compte: '43182', intitule: 'CNSS : Quote-Part Patronale *', montant: res.cnssPatronE })
                  lignes7e.push({ sens: 'D', compte: '4331', intitule: 'INPP : dette patronale *', montant: res.inppE })
                  lignes7e.push({ sens: 'D', compte: '4332', intitule: 'ONEM : dette patronale *', montant: res.onemE })
                  lignes7e.push({ sens: 'D', compte: '44721', intitule: 'IRPP retenu à la source *', montant: res.iprNetExp })
                  lignes7e.push({ sens: 'D', compte: '44722', intitule: 'IERE à verser *', montant: res.iere })
                  const totalVerseE = (netBanqueE2 > 0 ? netBanqueE2 : 0) + res.qpoE + res.cnssPatronE + res.inppE + res.onemE + res.iprNetExp + res.iere
                  lignes7e.push({ sens: 'C', compte: '521', intitule: 'Banque', montant: totalVerseE })
                  return (
                    <JournalEntry
                      numero="7"
                      libelle="Paiement : Règlement charges du personnel (expatrié)"
                      lignes={lignes7e}
                    />
                  )
                })()}
              </>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  )
}
