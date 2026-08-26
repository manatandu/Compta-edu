import React, { useState } from 'react'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Layers, Scale, TrendingDown, ChevronRight,
  AlertTriangle, BarChart2, Building2, PenLine
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'
  id: string
  question: string
  options: QCMOption[]
  reponseCorrecte: string
  explication: string
  articleRef: string
}
type Question = QCMQuestion

type Lecon = {
  id: string
  icone: React.ReactNode
  titre: string
  badge?: string
  contenu: React.ReactNode
  questions: Question[]
}

// ─────────────────────────────────────────────────────────────────
// COMPOSANT JournalTable
// ─────────────────────────────────────────────────────────────────
function JournalTable({ rows }: { rows: { libelle: string; debit?: string; credit?: string; isHeader?: boolean }[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border my-2">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-sky-100">
            <th className="text-left px-3 py-2 font-semibold text-sky-800 w-1/2">Libellé</th>
            <th className="text-right px-3 py-2 font-semibold text-sky-800 w-1/4">Débit</th>
            <th className="text-right px-3 py-2 font-semibold text-sky-800 w-1/4">Crédit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={cn('border-t border-border', r.isHeader ? 'bg-muted/40 font-semibold italic text-muted-foreground' : 'hover:bg-muted/20')}>
              <td className="px-3 py-1.5 text-foreground">{r.libelle}</td>
              <td className="px-3 py-1.5 text-right font-mono text-foreground">{r.debit ?? ''}</td>
              <td className="px-3 py-1.5 text-right font-mono text-foreground">{r.credit ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// LECONS
// ─────────────────────────────────────────────────────────────────
const LECONS: Lecon[] = [

  // ─────────────────────────────────────────────────────────────────
  // LECON 1 - IAS 36 : Champ d'application, principe fondamental, indices
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l1',
    icone: <AlertTriangle className="h-5 w-5" />,
    titre: "IAS 36 - Champ d'application, principe fondamental et indices de perte de valeur",
    badge: 'IAS 36 §1 à §14 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La <strong>Norme IAS 36</strong>
          <InfoTooltip texte="IAS 36 (Dépréciation d'actifs) a pour objectif de prescrire les procédures qu'une entité applique pour s'assurer que la valeur comptable de ses actifs n'est pas supérieure à leur valeur recouvrable. Elle s'applique à pratiquement tous les actifs non financiers et constitue le pilier normatif du test de dépréciation." loi="IAS 36 §1 - IFRS Foundation" />
          {' '}a pour objectif de prescrire les procédures qu'une entité applique pour s'assurer que ses actifs sont comptabilisés pour une valeur n'excédant pas leur valeur recouvrable. Un actif est comptabilisé pour une valeur excédant sa valeur recouvrable si sa valeur comptable est supérieure au montant qui sera recouvré par son utilisation ou par sa vente.
        </p>

        <h3 className="font-bold text-foreground mt-4">1. Champ d'application (§2 et §3)</h3>
        <p>
          IAS 36 s'applique à la comptabilisation des pertes de valeur de tous les actifs, à l'exception des suivants qui font l'objet d'autres normes :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Les stocks (IAS 2) ;</li>
          <li>Les actifs issus de contrats de construction (IFRS 15) ;</li>
          <li>Les actifs d'impôts différés (IAS 12) ;</li>
          <li>Les actifs découlant d'avantages du personnel (IAS 19) ;</li>
          <li>Les actifs financiers relevant d'IFRS 9 ;</li>
          <li>Les immeubles de placement évalués à la juste valeur (IAS 40) ;</li>
          <li>Les actifs biologiques liés à une activité agricole évalués à la juste valeur (IAS 41) ;</li>
          <li>Les actifs découlant de contrats d'assurance relevant d'IFRS 17 ;</li>
          <li>Les actifs non courants détenus en vue de la vente (IFRS 5).</li>
        </ul>
        <p>
          En revanche, IAS 36 <strong>s'applique expressément</strong> aux immobilisations corporelles (IAS 16), aux immobilisations incorporelles (IAS 38), aux participations dans des filiales, co-entreprises et entités associées, aux droits d'utilisation d'actifs (IFRS 16), ainsi qu'aux <strong>goodwill issus de regroupements d'entreprises</strong> (IFRS 3).
        </p>

        <h3 className="font-bold text-foreground mt-4">2. Principe fondamental (§6)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
          <p className="font-semibold text-sky-700 text-sm">Règle cardinale d'IAS 36</p>
          <p className="text-sm text-foreground/90 italic">"Une entité doit apprécier, à chaque date de clôture, s'il existe un quelconque indice qu'un actif peut avoir subi une perte de valeur. Si un tel indice existe, l'entité doit estimer la valeur recouvrable de l'actif."</p>
          <p className="text-xs text-muted-foreground">IAS 36 §9</p>
          <p className="text-sm mt-2 text-foreground">
            La valeur comptable d'un actif ne doit <strong>en aucun cas</strong> dépasser sa <strong>valeur recouvrable</strong>. Lorsque c'est le cas, une perte de valeur doit être comptabilisée immédiatement en résultat (ou, pour un actif réévalué, imputée d'abord sur l'écart de réévaluation).
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">3. Test annuel obligatoire (§10)</h3>
        <p>
          La norme impose un <strong>test de dépréciation annuel obligatoire</strong>, indépendamment de tout indice, pour trois catégories d'actifs :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-center">
            <p className="font-semibold text-amber-800 text-xs mb-1">Goodwill</p>
            <p className="text-xs text-foreground/80">Issu d'un regroupement d'entreprises - jamais amorti, toujours testé</p>
            <p className="text-xs text-muted-foreground mt-1">IFRS 3 + IAS 36 §96</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-center">
            <p className="font-semibold text-amber-800 text-xs mb-1">Immob. incorporelle à durée indéterminée</p>
            <p className="text-xs text-foreground/80">Ex. marque non amortie, droit d'exploitation perpétuel</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 38 §108 + IAS 36 §10</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-center">
            <p className="font-semibold text-amber-800 text-xs mb-1">Immob. incorporelle non encore disponible</p>
            <p className="text-xs text-foreground/80">En cours de développement, pas encore en service</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 36 §10(b)</p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">4. Indices de perte de valeur (§12)</h3>
        <p>
          Pour tous les autres actifs, le test n'est déclenché que lorsqu'il existe un <strong>indice</strong> de perte de valeur. IAS 36 §12 distingue deux catégories d'indices :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-1.5">
            <p className="font-semibold text-foreground text-xs mb-1">Sources externes d'information (§12a)</p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/80">
              <li>La valeur de marché de l'actif a diminué plus que l'utilisation ou l'écoulement du temps ne l'auraient prévu</li>
              <li>Des changements importants défavorables sont intervenus dans l'environnement technologique, économique, juridique ou du marché</li>
              <li>Les taux d'intérêt du marché ou d'autres taux de rendement du marché ont augmenté, affectant le taux d'actualisation</li>
              <li>La valeur comptable des actifs nets de l'entité est supérieure à sa capitalisation boursière</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-1.5">
            <p className="font-semibold text-foreground text-xs mb-1">Sources internes d'information (§12b)</p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/80">
              <li>Obsolescence ou dégradation physique de l'actif</li>
              <li>Changements importants défavorables dans l'utilisation prévue de l'actif (mise hors service, restructuration)</li>
              <li>Les performances économiques de l'actif sont ou seront inférieures aux prévisions</li>
              <li>Flux de trésorerie réels inférieurs aux flux prévus lors de l'acquisition</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 mt-3">
          <p className="text-xs font-semibold text-sky-700 mb-1">Point pédagogique - Cadre du raisonnement</p>
          <p className="text-xs text-sky-900">L'existence d'un indice interne ou externe ne conduit pas automatiquement à une perte de valeur. Elle oblige seulement l'entité à estimer la valeur recouvrable et à la comparer à la valeur comptable. C'est cette comparaison qui détermine l'existence - ou non - d'une perte.</p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 2 - IAS 36 : Valeur recouvrable : VNC vs valeur d'utilité, DCF
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l2',
    icone: <Scale className="h-5 w-5" />,
    titre: "IAS 36 - Valeur recouvrable : juste valeur nette et valeur d'utilité",
    badge: 'IAS 36 §18 à §57 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">1. Définition de la valeur recouvrable (§18)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
          <p className="font-semibold text-sky-700 text-sm mb-2">Formule centrale</p>
          <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
            <BlockMath math={String.raw`\text{Valeur recouvrable} = \max\!\left(\text{JVN},\; \text{VU}\right)`} />
          </div>
          <p className="text-xs text-foreground/80">
            JVN = Juste valeur nette des coûts de sortie · VU = Valeur d'utilité
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 36 §18</p>
        </div>
        <p>
          La <strong>valeur recouvrable</strong>
          <InfoTooltip texte="La valeur recouvrable est le montant le plus élevé entre la juste valeur nette des coûts de sortie et la valeur d'utilité. L'idée est que l'entité peut récupérer la valeur de l'actif soit en le vendant (JVN), soit en continuant à l'utiliser (VU). On retient le maximum car c'est la décision rationnelle que prendrait un gestionnaire." loi="IAS 36 §18 - IFRS Foundation" />
          {' '}est le montant le plus élevé entre la <strong>juste valeur diminuée des coûts de sortie</strong> et la <strong>valeur d'utilité</strong>. Si l'un ou l'autre de ces montants est supérieur à la valeur comptable, il n'y a pas lieu de déprécier.
        </p>

        <h3 className="font-bold text-foreground mt-4">2. Juste valeur nette des coûts de sortie (§25 à §29)</h3>
        <p>
          Selon IAS 36 §25, la <strong>juste valeur nette des coûts de sortie</strong> est le prix qui serait reçu pour vendre l'actif dans le cadre d'une transaction normale entre des intervenants du marché à la date d'évaluation, diminué des coûts de sortie.
        </p>
        <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2 mt-2">
          <p className="text-xs font-semibold text-foreground">Hiérarchie pour déterminer la JVN (§25 à §27)</p>
          <div className="space-y-1 text-xs">
            <div className="flex gap-2"><span className="font-bold text-sky-600 w-5 shrink-0">1.</span><span>Prix dans un accord de vente ferme (<em>binding sale agreement</em>), net des coûts directement attribuables à la sortie</span></div>
            <div className="flex gap-2"><span className="font-bold text-sky-600 w-5 shrink-0">2.</span><span>Prix du marché actif (cours boursier, cotation), diminué des coûts de sortie</span></div>
            <div className="flex gap-2"><span className="font-bold text-sky-600 w-5 shrink-0">3.</span><span>Meilleure information disponible reflétant le montant qu'une entité pourrait obtenir de la sortie de l'actif dans une transaction dans des conditions de concurrence normale entre parties bien informées et consentantes</span></div>
          </div>
          <p className="text-xs text-muted-foreground">Les coûts de sortie incluent : honoraires juridiques, taxes de transfert, coûts d'enlèvement et de remise en état - mais excluent les avantages du personnel et les charges d'exploitation futures.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">3. Valeur d'utilité (§30 à §57)</h3>
        <p>
          La <strong>valeur d'utilité</strong>
          <InfoTooltip texte="La valeur d'utilité est la valeur actualisée des flux de trésorerie futurs attendus de l'utilisation continue d'un actif jusqu'à sa sortie. Elle repose sur un modèle DCF (Discounted Cash Flow) propre à l'entité, et non sur les conditions du marché. Elle intègre les projections de flux de trésorerie, les variations futures probables, la valeur temps de l'argent et les risques spécifiques à l'actif." loi="IAS 36 §30 - IFRS Foundation" />
          {' '}est la valeur actualisée des flux de trésorerie futurs susceptibles de découler d'un actif ou d'une unité génératrice de trésorerie. Elle est déterminée selon un modèle d'actualisation (DCF) :
        </p>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`VU = \sum_{t=1}^{n} \dfrac{CF_t}{\left(1 + r\right)^t} + \dfrac{VR_n}{\left(1 + r\right)^n}`} />
        </div>
        <p className="text-xs text-muted-foreground">VU = Valeur d'utilité · CF = Flux de trésorerie de la période t · r = Taux d'actualisation · VR = Valeur résiduelle à la fin de la période n</p>

        <h3 className="font-bold text-foreground mt-4 text-sm">3.1 Estimations des flux de trésorerie (§33 à §38)</h3>
        <p>
          IAS 36 §33 impose que les estimations de flux de trésorerie reflètent :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Les <strong>meilleures estimations</strong> faites par la direction des conditions économiques qui existeront sur la durée d'utilité restante ;</li>
          <li>Les flux entrants générés par l'utilisation continue de l'actif dans son état actuel ;</li>
          <li>Les flux sortants nécessairement engagés pour générer les flux entrants, incluant les coûts d'entretien ;</li>
          <li>Les flux nets de la sortie finale de l'actif (valeur résiduelle nette).</li>
        </ul>
        <p>
          Les flux <strong>exclus</strong> de la valeur d'utilité (§50) : flux liés aux restructurations futures non engagées, flux d'investissements futurs améliorant les performances, effets fiscaux et flux provenant d'activités de financement.
        </p>

        <h3 className="font-bold text-foreground mt-4 text-sm">3.2 Taux d'actualisation (§55 à §57)</h3>
        <p>
          Selon IAS 36 §55, le taux d'actualisation doit être un <strong>taux avant impôt</strong> qui reflète les appréciations actuelles du marché pour la valeur temps de l'argent et les risques spécifiques à l'actif. C'est généralement :
        </p>
        <div className="rounded-xl border border-border bg-muted/20 p-3 mt-2 space-y-1 text-xs">
          <p><strong>Point de départ :</strong> Coût Moyen Pondéré du Capital (CMPC / WACC) de l'entité, ajusté pour refléter le risque spécifique de l'actif</p>
          <p><strong>Alternative :</strong> Taux de rendement implicite dans des transactions comparables sur le marché</p>
          <p><strong>Principe :</strong> Le taux ne doit pas tenir compte des risques déjà reflétés dans les flux de trésorerie (pour éviter le double comptage)</p>
          <p className="text-muted-foreground">IAS 36 §56 : le taux doit être estimé à partir du coût du capital spécifique à l'actif, déterminé à l'aide du modèle CAPM ou d'équivalents sectoriels observables.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - INDUSTRIA SA (IAS 36 §18)</h3>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">Données</p>
          <p className="text-xs text-amber-900">Valeur comptable nette (VNC) d'une machine : 700 000 · Juste valeur de marché : 690 000 · Coûts de sortie estimés : 10 000 · Valeur d'utilité (DCF) : 760 000</p>
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`JVN = 690\,000 - 10\,000 = 680\,000`} />
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Valeur recouvrable} = \max(680\,000 ;\; 760\,000) = 760\,000`} />
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Comparaison} : VNC\; 700\,000 < VR\; 760\,000 \Rightarrow \text{Aucune dépréciation}`} />
        </div>
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-xs text-green-800"><strong>Conclusion :</strong> Bien que la juste valeur (690 000) soit inférieure à la valeur comptable (700 000), la valeur recouvrable est 760 000 car la valeur d'utilité est plus élevée. Aucune dépréciation n'est comptabilisée. C'est la règle du maximum qui s'applique.</p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 3 - IAS 36 : Constatation, comptabilisation et reprise
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l3',
    icone: <TrendingDown className="h-5 w-5" />,
    titre: "IAS 36 - Constatation, comptabilisation et reprise de la perte de valeur",
    badge: 'IAS 36 §59 à §117 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">1. Constatation d'une perte de valeur (§59 à §64)</h3>
        <p>
          Selon IAS 36 §59, si la valeur recouvrable d'un actif est inférieure à sa valeur comptable, celle-ci doit être ramenée à sa valeur recouvrable. La réduction est une <strong>perte de valeur</strong> et doit être comptabilisée immédiatement en résultat, <strong>sauf</strong> lorsque l'actif est comptabilisé à son montant réévalué selon IAS 16 ou IAS 38.
        </p>

        <h3 className="font-bold text-foreground mt-4 text-sm">1.1 Actif au coût historique (§60)</h3>
        <p>La perte de valeur est comptabilisée directement en <strong>résultat net</strong> :</p>
        <JournalTable rows={[
          { libelle: '31/12/N - Constatation de la perte de valeur', isHeader: true },
          { libelle: 'Charges de dépréciation (6816 ou équivalent)', debit: 'Montant', credit: '' },
          { libelle: 'Cumul des dépréciations - actif concerné', debit: '', credit: 'Montant' },
          { libelle: "Dépréciation de l'actif (VNC - Valeur recouvrable)", isHeader: true },
        ]} />

        <h3 className="font-bold text-foreground mt-4 text-sm">1.2 Actif réévalué antérieurement - Imputation en cascade (§60)</h3>
        <p>
          Lorsque l'actif a fait l'objet d'une réévaluation antérieure avec constitution d'un écart de réévaluation (AERG - Autres Éléments du Résultat Global) en capitaux propres, la perte de valeur doit être imputée <strong>en priorité sur l'AERG</strong>, et seulement le solde éventuel est porté en résultat net.
        </p>
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-1">Illustration - TRANSLOG SA</p>
          <p className="text-xs text-foreground/80 mb-2">Perte de valeur totale : 20 000 · AERG disponible : 12 000 · Solde en résultat : 8 000</p>
        </div>
        <JournalTable rows={[
          { libelle: "Étape 1 - Imputation sur l'AERG (capitaux propres)", isHeader: true },
          { libelle: 'Autres éléments du résultat global - AERG', debit: '12 000', credit: '' },
          { libelle: 'Cumul des dépréciations - actif', debit: '', credit: '12 000' },
          { libelle: 'Étape 2 - Solde en résultat net', isHeader: true },
          { libelle: 'Charges de dépréciation (résultat net)', debit: '8 000', credit: '' },
          { libelle: 'Cumul des dépréciations - actif (solde)', debit: '', credit: '8 000' },
        ]} />
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Perte totale} = \underbrace{12\,000}_{\text{AERG}} + \underbrace{8\,000}_{\text{Résultat net}} = 20\,000`} />
        </div>

        <h3 className="font-bold text-foreground mt-4">2. Reprise de perte de valeur (§109 à §117)</h3>
        <p>
          Une entité doit apprécier, à chaque date de clôture, s'il existe un indice qu'une perte de valeur comptabilisée lors d'exercices antérieurs n'existe plus ou a diminué. Si tel est le cas, l'entité doit estimer la valeur recouvrable de l'actif.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-3">
            <p className="font-semibold text-green-700 text-xs mb-1">Indices de reprise (§111)</p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/80">
              <li>Hausse de la valeur de marché de l'actif</li>
              <li>Changements favorables dans l'environnement technologique, économique ou du marché</li>
              <li>Baisse des taux d'intérêt du marché</li>
              <li>Performances supérieures aux prévisions initiales</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="font-semibold text-foreground text-xs mb-1">Plafond de la reprise (§117)</p>
            <p className="text-xs text-foreground/80">La valeur comptable après reprise ne peut pas dépasser la valeur comptable qui aurait été déterminée (nette d'amortissement) si aucune perte de valeur n'avait été comptabilisée lors des exercices antérieurs.</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 36 §117</p>
          </div>
        </div>
        <JournalTable rows={[
          { libelle: '31/12/N+k - Reprise de la perte de valeur', isHeader: true },
          { libelle: 'Cumul des dépréciations - actif', debit: 'Montant repris', credit: '' },
          { libelle: 'Reprises de dépréciation (produit)', debit: '', credit: 'Montant repris' },
          { libelle: 'Reprise plafonnée à la VNC sans dépréciation passée', isHeader: true },
        ]} />

        <h3 className="font-bold text-foreground mt-4">3. Règle absolue sur le goodwill (§124)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="font-semibold text-red-700 text-sm mb-1">Interdiction formelle de reprise sur le goodwill</p>
          <p className="text-sm text-foreground/90 italic">"Une perte de valeur comptabilisée pour un goodwill ne doit pas être reprise lors d'une période ultérieure."</p>
          <p className="text-xs text-muted-foreground mt-1">IAS 36 §124 - IFRS Foundation</p>
          <p className="text-sm mt-2 text-foreground">Cette règle est absolue. Elle repose sur le principe qu'une augmentation de la valeur recouvrable de l'UGT après la perte ne correspond probablement pas à une reprise du goodwill acquis, mais plutôt à la génération d'un goodwill interne - non comptabilisable selon IAS 38 §48.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">4. Impact sur l'amortissement futur (§63)</h3>
        <p>
          Après la comptabilisation d'une perte de valeur, la <strong>dotation aux amortissements</strong> doit être ajustée pour les périodes futures afin de répartir la nouvelle valeur comptable (après dépréciation) sur la durée d'utilité restante de l'actif.
        </p>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Nouvel amortissement annuel} = \dfrac{\text{Nouvelle VC après dépréciation} - \text{VR}}{\text{Durée d'utilité restante}}`} />
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 4 - IAS 36 : UGT + Goodwill
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l4',
    icone: <Layers className="h-5 w-5" />,
    titre: "IAS 36 - Unités Génératrices de Trésorerie (UGT) et Goodwill",
    badge: 'IAS 36 §65 à §108 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">1. Notion d'UGT (§65 à §67)</h3>
        <p>
          Dans la majorité des cas, les actifs ne génèrent pas de flux de trésorerie indépendamment d'autres actifs. IAS 36 §65 prévoit que lorsqu'il n'est pas possible d'estimer la valeur recouvrable d'un actif individuel, l'entité doit identifier l'<strong>Unité Génératrice de Trésorerie</strong> à laquelle appartient l'actif.
        </p>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
          <p className="font-semibold text-sky-700 text-sm">Définition légale - IAS 36 §6</p>
          <p className="text-sm text-foreground/90 italic">"Une unité génératrice de trésorerie est le plus petit groupe identifiable d'actifs qui génère des entrées de trésorerie provenant d'une utilisation continue et qui sont largement indépendantes des entrées de trésorerie générées par d'autres actifs ou groupes d'actifs."</p>
          <p className="text-xs text-muted-foreground">IAS 36 §6</p>
        </div>
        <p>
          L'identification d'une UGT requiert un jugement. Les facteurs à considérer incluent : comment la direction contrôle les activités (par site, par ligne de produits, par segment), comment les décisions de poursuite ou d'abandon sont prises.
        </p>

        <h3 className="font-bold text-foreground mt-4">2. Allocation du goodwill aux UGT (§80 à §87)</h3>
        <p>
          IAS 36 §80 impose que le goodwill acquis lors d'un regroupement d'entreprises soit, à compter de la date d'acquisition, affecté à chacune des UGT ou des groupes d'UGT de l'acquéreur susceptibles de bénéficier des synergies du regroupement.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
          <li>Cette affectation est effectuée <strong>au plus tard avant la fin de l'exercice</strong> suivant l'exercice au cours duquel le regroupement a eu lieu</li>
          <li>Si le goodwill initial ne peut être affecté à une UGT individuelle, il est affecté au plus petit groupe d'UGT auquel il peut être rattaché de manière raisonnable et cohérente</li>
          <li>Chaque UGT ou groupe d'UGT à laquelle le goodwill est affecté ne doit pas être plus grande qu'un segment opérationnel au sens d'IFRS 8</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">3. Test de dépréciation d'une UGT avec goodwill (§90 à §99)</h3>
        <p>
          Le test consiste à comparer la <strong>valeur comptable de l'UGT</strong> (actifs nets + goodwill affecté) à sa <strong>valeur recouvrable</strong> (max JVN ; VU calculée au niveau de l'UGT).
        </p>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{VC UGT} = \sum \text{Actifs identifiables nets} + \text{Goodwill affecté}`} />
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Si VC UGT} > \text{VR UGT} \Rightarrow \text{Perte} = \text{VC UGT} - \text{VR UGT}`} />
        </div>

        <h3 className="font-bold text-foreground mt-4 text-sm">3.1 Répartition de la perte de valeur sur l'UGT (§104 à §107)</h3>
        <p>
          IAS 36 §104 prescrit la <strong>cascade d'imputation</strong> de la perte de valeur identifiée au niveau de l'UGT :
        </p>
        <div className="space-y-2 mt-2">
          <div className="flex gap-3 items-start rounded-lg border border-border p-3 bg-muted/10">
            <span className="font-bold text-sky-600 text-sm w-5 shrink-0">1.</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Imputer sur le goodwill</p>
              <p className="text-xs text-foreground/80">La perte est d'abord imputée sur le goodwill affecté à l'UGT, jusqu'à son épuisement. Cette perte sur goodwill n'est jamais reprise (§124).</p>
            </div>
          </div>
          <div className="flex gap-3 items-start rounded-lg border border-border p-3 bg-muted/10">
            <span className="font-bold text-sky-600 text-sm w-5 shrink-0">2.</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Répartir sur les autres actifs au prorata</p>
              <p className="text-xs text-foreground/80">Le solde est réparti pro rata de la valeur comptable de chaque actif de l'UGT. Aucun actif ne peut être ramené en dessous du plus élevé entre : sa JVN, sa VU individuelle, zéro.</p>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration numérique - UGT avec goodwill</h3>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">Données</p>
          <p className="text-xs text-amber-900">UGT Alpha : Actifs nets (machines + stocks + créances) VC = 900 000 · Goodwill affecté = 150 000 · VC UGT totale = 1 050 000 · Valeur recouvrable UGT = 850 000</p>
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Perte totale} = 1\,050\,000 - 850\,000 = 200\,000`} />
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Étape 1} : \text{Goodwill} \Rightarrow 150\,000 \text{ (épuisé)}`} />
        </div>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
          <BlockMath math={String.raw`\text{Étape 2} : \text{Solde sur actifs} = 200\,000 - 150\,000 = 50\,000`} />
        </div>
        <JournalTable rows={[
          { libelle: 'Dépréciation du goodwill UGT Alpha', isHeader: true },
          { libelle: 'Charges de dépréciation - goodwill', debit: '150 000', credit: '' },
          { libelle: 'Cumul dépréciations goodwill', debit: '', credit: '150 000' },
          { libelle: 'Dépréciation actifs résiduels (prorata VC)', isHeader: true },
          { libelle: 'Charges de dépréciation - actifs UGT', debit: '50 000', credit: '' },
          { libelle: 'Cumul dépréciations - actifs identifiables', debit: '', credit: '50 000' },
        ]} />
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 5 - IAS 40 : Immeubles de placement
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l5',
    icone: <Building2 className="h-5 w-5" />,
    titre: "IAS 40 - Immeubles de placement : modèle juste valeur vs modèle du coût",
    badge: 'IAS 40 §1 à §86 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">1. Champ d'application et définition (§2 à §15)</h3>
        <p>
          IAS 40 prescrit le traitement comptable des <strong>immeubles de placement</strong> et les informations à fournir les concernant. Un immeuble de placement est distinct des immobilisations corporelles utilisées dans le cadre de la production (IAS 16) et des stocks (IAS 2).
        </p>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
          <p className="font-semibold text-sky-700 text-sm">Définition légale - IAS 40 §5</p>
          <p className="text-sm text-foreground/90 italic">"Un immeuble de placement est un bien immobilier (terrain ou bâtiment - ou partie d'un bâtiment - ou les deux) détenu (par le propriétaire ou par le preneur dans le cadre d'un contrat de location) pour en retirer des loyers ou pour valoriser le capital ou les deux, plutôt que pour : (a) l'utiliser dans la production ou la fourniture de biens ou de services ou à des fins administratives ; ou (b) le vendre dans le cadre de l'activité ordinaire."</p>
          <p className="text-xs text-muted-foreground">IAS 40 §5 - IFRS Foundation</p>
        </div>

        <h3 className="font-bold text-foreground mt-4 text-sm">Exemples d'immeubles de placement (§8)</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Un terrain détenu pour une valorisation en capital à long terme</li>
          <li>Un terrain dont l'utilisation future n'est pas encore déterminée</li>
          <li>Un bâtiment appartenant à l'entité et donné en location dans le cadre d'un contrat de location simple</li>
          <li>Un bâtiment vacant détenu pour être loué dans le cadre d'un contrat de location simple</li>
          <li>Un bien immobilier en cours de construction ou d'aménagement en vue d'une utilisation ultérieure comme immeuble de placement</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4 text-sm">Exclusions (§9 et §10)</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Les biens immobiliers détenus en vue de la vente dans le cadre de l'activité ordinaire (stocks - IAS 2)</li>
          <li>Les biens immobiliers en cours de construction pour le compte de tiers (IFRS 15)</li>
          <li>Les biens immobiliers utilisés par le propriétaire pour sa propre production ou ses propres services administratifs (IAS 16)</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">2. Évaluation initiale (§20 à §29)</h3>
        <p>
          Un immeuble de placement doit initialement être évalué à son <strong>coût</strong> (§20). Les coûts de transaction sont inclus dans l'évaluation initiale. Le coût comprend le prix d'achat, les droits de mutation, les honoraires juridiques, les coûts directement attribuables.
        </p>
        <p>
          Les coûts qui ne doivent <strong>pas</strong> être inclus dans le coût initial : frais de démarrage (sauf s'ils sont nécessaires pour amener l'actif à la condition permettant son exploitation), pertes d'exploitation initiales, montants anormaux de déchets.
        </p>

        <h3 className="font-bold text-foreground mt-4">3. Deux modèles d'évaluation postérieure (§30)</h3>
        <p>
          IAS 40 §30 exige qu'une entité choisisse, comme <strong>méthode comptable</strong>, soit le <strong>modèle de la juste valeur</strong>, soit le <strong>modèle du coût</strong>. Ce choix doit être appliqué à <strong>tous</strong> ses immeubles de placement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 space-y-2">
            <p className="font-bold text-sky-700 text-sm">Modèle de la juste valeur (§33 à §55)</p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/80">
              <li><strong>Aucun amortissement</strong> - l'immeuble n'est pas amorti</li>
              <li>Réévaluation à chaque clôture à la juste valeur</li>
              <li>Toute variation de juste valeur (gain ou perte) est comptabilisée en <strong>résultat net</strong> de la période</li>
              <li>Aucun test IAS 36 n'est nécessaire</li>
              <li>La juste valeur doit refléter le prix de marché à la date de clôture</li>
            </ul>
            <p className="text-xs text-muted-foreground">IAS 40 §35 - juste valeur reflète les conditions du marché à la date de clôture</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
            <p className="font-bold text-foreground text-sm">Modèle du coût (§56)</p>
            <ul className="list-disc pl-4 space-y-1 text-xs text-foreground/80">
              <li>Amortissement normal selon IAS 16</li>
              <li>Test de dépréciation IAS 36 obligatoire si indices</li>
              <li>La juste valeur doit être indiquée en <strong>annexe</strong> (information à fournir)</li>
              <li>Variation de juste valeur non comptabilisée au bilan ni au résultat</li>
            </ul>
            <p className="text-xs text-muted-foreground">IAS 40 §56 - même traitement qu'IAS 16 modèle du coût</p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4 text-sm">3.1 Écriture comptable - Modèle juste valeur (gain)</h3>
        <JournalTable rows={[
          { libelle: '31/12/N - Hausse de juste valeur', isHeader: true },
          { libelle: 'Immeuble de placement (hausse JV)', debit: 'Variation +', credit: '' },
          { libelle: 'Gains sur variation de juste valeur (résultat)', debit: '', credit: 'Variation +' },
          { libelle: 'Comptabilisation du gain en résultat net (IAS 40 §35)', isHeader: true },
        ]} />

        <h3 className="font-bold text-foreground mt-4 text-sm">3.2 Écriture comptable - Modèle juste valeur (perte)</h3>
        <JournalTable rows={[
          { libelle: '31/12/N - Baisse de juste valeur', isHeader: true },
          { libelle: 'Pertes sur variation de juste valeur (résultat)', debit: 'Variation -', credit: '' },
          { libelle: 'Immeuble de placement (baisse JV)', debit: '', credit: 'Variation -' },
          { libelle: 'Comptabilisation de la perte en résultat net (IAS 40 §35)', isHeader: true },
        ]} />

        <h3 className="font-bold text-foreground mt-4">Illustration - IMMO PLUS SA</h3>
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">Données</p>
          <p className="text-xs text-amber-900">Coût d'acquisition N-1 : 5 000 000 · Juste valeur N : 4 300 000 · Durée d'amortissement (si modèle coût) : 40 ans · Amortissement annuel : 125 000</p>
        </div>

        <p className="text-xs font-semibold text-foreground mt-2">Modèle juste valeur :</p>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-1">
          <BlockMath math={String.raw`\text{Variation JV} = 4\,300\,000 - 5\,000\,000 = (700\,000)`} />
        </div>
        <JournalTable rows={[
          { libelle: '31/12/N - Modèle juste valeur', isHeader: true },
          { libelle: 'Pertes sur variation de juste valeur', debit: '700 000', credit: '' },
          { libelle: 'Immeuble de placement', debit: '', credit: '700 000' },
        ]} />

        <p className="text-xs font-semibold text-foreground mt-2">Modèle du coût - Amortissement :</p>
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-1">
          <BlockMath math={String.raw`\text{Amortissement annuel} = \dfrac{5\,000\,000}{40} = 125\,000`} />
        </div>
        <JournalTable rows={[
          { libelle: '31/12/N - Modèle du coût', isHeader: true },
          { libelle: "Dotation aux amortissements - Immeuble", debit: '125 000', credit: '' },
          { libelle: "Amortissements cumulés - Immeuble", debit: '', credit: '125 000' },
          { libelle: 'Test IAS 36 : VNC = 4 875 000 < VR = 4 300 000 (JV) : à vérifier', isHeader: true },
        ]} />
        <div className="rounded-lg bg-white border border-sky-100 p-3 my-1">
          <BlockMath math={String.raw`VNC = 5\,000\,000 - 125\,000 = 4\,875\,000`} />
        </div>
        <div className="rounded-lg bg-sky-50 border border-sky-200 p-3">
          <p className="text-xs text-sky-800"><strong>Analyse comparée :</strong> Avec le modèle juste valeur, la perte de 700 000 est comptabilisée immédiatement en résultat. Avec le modèle du coût, seul l'amortissement de 125 000 est comptabilisé. Un test IAS 36 est requis car la VNC (4 875 000) est supérieure à la JV (4 300 000) - une dépréciation supplémentaire de 575 000 pourrait être nécessaire si la valeur recouvrable confirme cette infériorité.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">4. Transferts (§57 à §65)</h3>
        <p>
          Des transferts entre immeuble de placement, immobilisation occupée par le propriétaire et stock sont possibles uniquement lorsqu'il y a un changement d'utilisation :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Début d'occupation par le propriétaire : transfert d'IP vers IAS 16</li>
          <li>Début de travaux en vue de la vente : transfert d'IP vers stocks</li>
          <li>Fin d'occupation par le propriétaire : transfert d'IAS 16 vers IP</li>
          <li>Début de la location à des tiers : transfert de stocks ou IAS 16 vers IP</li>
        </ul>
      </div>
    ),
    questions: []
  }
]

// ─────────────────────────────────────────────────────────────────
// QCM - 15 questions (5 faciles, 5 moyens, 5 difficiles/pièges)
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_QCM: QCMQuestion[] = [
  // ─── FACILES ───
  {
    type: 'qcm', id: 'q1',
    question: "Selon IAS 36 §18, la valeur recouvrable d'un actif est définie comme :",
    options: [
      { id: 'a', texte: 'La valeur comptable nette (VNC) à la date de clôture' },
      { id: 'b', texte: 'Le montant le plus élevé entre la juste valeur nette des coûts de sortie et la valeur d\'utilité' },
      { id: 'c', texte: 'Le montant le plus bas entre la juste valeur et la valeur d\'utilité' },
      { id: 'd', texte: 'Le coût historique diminué du cumul des amortissements' },
      { id: 'e', texte: 'La valeur liquidative de l\'actif à la date de clôture' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §18 définit la valeur recouvrable comme le montant le plus élevé entre la juste valeur nette des coûts de sortie (JVN) et la valeur d'utilité (VU). On retient le maximum car l'entité choisira l'option la plus avantageuse entre vendre et continuer à utiliser l'actif.",
    articleRef: 'IAS 36 §18 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q2',
    question: "Pour quels actifs IAS 36 impose-t-elle un test de dépréciation annuel obligatoire, indépendamment de tout indice ?",
    options: [
      { id: 'a', texte: 'Toutes les immobilisations corporelles amorties' },
      { id: 'b', texte: 'Les stocks et les actifs financiers' },
      { id: 'c', texte: 'Le goodwill, les immobilisations incorporelles à durée indéterminée et les immobilisations incorporelles non encore disponibles à l\'utilisation' },
      { id: 'd', texte: 'Uniquement le goodwill issu de regroupements d\'entreprises' },
      { id: 'e', texte: 'Les immeubles de placement évalués au modèle du coût' },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36 §10 impose un test annuel obligatoire pour trois catégories : (1) le goodwill issu de regroupements d'entreprises, (2) les immobilisations incorporelles à durée d'utilité indéterminée, et (3) les immobilisations incorporelles non encore disponibles à l'utilisation. Pour tous les autres actifs, le test n'est déclenché qu'en présence d'indices.",
    articleRef: 'IAS 36 §10 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q3',
    question: "Selon IAS 40 §5, un immeuble de placement est un bien immobilier détenu :",
    options: [
      { id: 'a', texte: 'Pour être utilisé dans la production de biens ou de services' },
      { id: 'b', texte: 'Pour être vendu dans le cadre de l\'activité ordinaire de l\'entité' },
      { id: 'c', texte: 'Pour en retirer des loyers ou pour valoriser le capital, ou les deux' },
      { id: 'd', texte: 'Exclusivement pour être loué à des filiales du groupe' },
      { id: 'e', texte: 'Pour être utilisé à des fins administratives par la direction' },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 40 §5 définit un immeuble de placement comme un bien immobilier détenu pour en retirer des loyers, ou pour valoriser le capital, ou les deux. L'élément distinctif est l'absence d'utilisation pour la production propre ou la vente dans le cours normal des affaires.",
    articleRef: 'IAS 40 §5 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q4',
    question: "En cas de dépréciation d'un actif évalué au coût historique, où est comptabilisée la perte de valeur selon IAS 36 §60 ?",
    options: [
      { id: 'a', texte: 'En autres éléments du résultat global (OCI), sans jamais toucher le résultat net' },
      { id: 'b', texte: 'Directement en résultat net de la période' },
      { id: 'c', texte: 'En réserves dans les capitaux propres' },
      { id: 'd', texte: 'En déduction de la valeur brute de l\'actif, sans écriture de charge' },
      { id: 'e', texte: 'En report à nouveau déficitaire' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §60 est explicite : pour un actif évalué selon le modèle du coût, la perte de valeur est immédiatement comptabilisée en résultat net de la période. Elle constitue une charge qui réduit le résultat de l'exercice.",
    articleRef: 'IAS 36 §60 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q5',
    question: "Avec le modèle de la juste valeur d'IAS 40, comment sont traitées les variations de juste valeur d'un immeuble de placement ?",
    options: [
      { id: 'a', texte: 'Elles sont comptabilisées en autres éléments du résultat global (OCI)' },
      { id: 'b', texte: 'Elles sont portées en réserves de réévaluation dans les capitaux propres' },
      { id: 'c', texte: 'Elles sont comptabilisées en résultat net de la période où elles surviennent' },
      { id: 'd', texte: 'Seuls les gains sont comptabilisés ; les pertes restent en OCI' },
      { id: 'e', texte: 'Elles sont différées et amorties sur la durée résiduelle de l\'actif' },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 40 §35 dispose que le gain ou la perte résultant d'une variation de la juste valeur d'un immeuble de placement est comptabilisé en résultat net de la période. Contrairement au modèle de réévaluation d'IAS 16, il n'y a pas d'OCI pour les immeubles de placement.",
    articleRef: 'IAS 40 §35 - IFRS Foundation'
  },

  // ─── MOYENS ───
  {
    type: 'qcm', id: 'q6',
    question: "Selon IAS 36 §6, une Unité Génératrice de Trésorerie (UGT) est définie comme :",
    options: [
      { id: 'a', texte: 'L\'ensemble des actifs d\'une entité générant collectivement des flux' },
      { id: 'b', texte: 'Le plus petit groupe identifiable d\'actifs générant des entrées de trésorerie largement indépendantes de celles d\'autres actifs' },
      { id: 'c', texte: 'Un segment opérationnel au sens d\'IFRS 8' },
      { id: 'd', texte: 'Un groupe d\'actifs dont les flux sont liés à ceux d\'autres groupes' },
      { id: 'e', texte: 'Tout actif individuel pouvant faire l\'objet d\'un test de dépréciation' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §6 définit l'UGT comme le plus petit groupe identifiable d'actifs qui génère des entrées de trésorerie provenant d'une utilisation continue et qui sont largement indépendantes des entrées générées par d'autres actifs ou groupes. Le critère d'indépendance des flux est fondamental.",
    articleRef: 'IAS 36 §6 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q7',
    question: "IAS 36 §117 plafonne la reprise d'une perte de valeur. Ce plafond est :",
    options: [
      { id: 'a', texte: 'Le montant exact de la perte initialement comptabilisée' },
      { id: 'b', texte: 'La valeur comptable qui aurait été déterminée (nette d\'amortissement) si aucune perte de valeur n\'avait été comptabilisée' },
      { id: 'c', texte: 'La valeur de marché de l\'actif à la date de reprise' },
      { id: 'd', texte: 'Le coût historique de l\'actif, sans déduction d\'amortissement' },
      { id: 'e', texte: 'La valeur recouvrable calculée à la date de reprise, majorée de 10 %' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §117 est précis : la valeur comptable après reprise ne peut pas dépasser la valeur comptable qui aurait été déterminée - nette des amortissements calculés normalement - si aucune perte de valeur n'avait été comptabilisée. Ce plafond empêche que la reprise crée artificiellement une valeur supérieure à celle sans dépréciation.",
    articleRef: 'IAS 36 §117 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q8',
    question: "Selon IAS 36 §104, dans quelle ordre une perte de valeur identifiée au niveau d'une UGT avec goodwill est-elle imputée ?",
    options: [
      { id: 'a', texte: 'D\'abord sur les actifs identifiables au prorata, puis sur le goodwill' },
      { id: 'b', texte: 'D\'abord sur le goodwill, puis sur les actifs identifiables au prorata de leur valeur comptable' },
      { id: 'c', texte: 'Uniquement sur le goodwill, les actifs identifiables ne pouvant jamais être dépréciés' },
      { id: 'd', texte: "Sur l'actif ayant la valeur comptable la plus élevée en premier" },
      { id: 'e', texte: "Uniformément sur tous les actifs sans distinction, y compris le goodwill" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §104 prescrit une cascade précise : la perte est d'abord imputée sur le goodwill affecté à l'UGT (jusqu'à son épuisement), puis le solde est réparti pro rata de la valeur comptable de chaque actif identifiable - sans que cela n'entraîne un actif sous son maximum entre JVN, VU individuelle et zéro.",
    articleRef: 'IAS 36 §104 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q9',
    question: "Dans la détermination de la valeur d'utilité, quels flux sont expressément exclus selon IAS 36 §50 ?",
    options: [
      { id: 'a', texte: 'Les flux d\'entretien ordinaire nécessaires au maintien de l\'actif en état' },
      { id: 'b', texte: 'Les flux de la valeur résiduelle à la fin de la durée d\'utilité' },
      { id: 'c', texte: 'Les flux liés aux restructurations futures non engagées et les flux liés aux investissements futurs améliorant l\'actif' },
      { id: 'd', texte: 'Les flux provenant de l\'utilisation continue de l\'actif dans son état actuel' },
      { id: 'e', texte: 'Les flux de sortie en devise étrangère, qui doivent être convertis séparément' },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36 §50 exclut de la valeur d'utilité les flux liés aux restructurations futures pour lesquelles l'entité n'est pas encore engagée, et les flux liés aux investissements futurs qui amélioreraient ou accroîtraient la performance de l'actif au-delà de son niveau de performance initialement prévu. La VU est basée sur l'actif dans son état actuel.",
    articleRef: 'IAS 36 §50 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q10',
    question: "Selon IAS 40 §56, quelle obligation particulière s'applique aux entités ayant choisi le modèle du coût pour leurs immeubles de placement ?",
    options: [
      { id: 'a', texte: 'Elles doivent réévaluer annuellement leurs immeubles à la juste valeur et comptabiliser la variation' },
      { id: 'b', texte: 'Elles doivent indiquer la juste valeur de leurs immeubles de placement en annexe (informations à fournir)' },
      { id: 'c', texte: 'Elles doivent soumettre leurs immeubles à un test IAS 36 tous les 5 ans au minimum' },
      { id: 'd', texte: 'Elles sont dispensées de tout test de dépréciation IAS 36' },
      { id: 'e', texte: 'Elles doivent transférer leurs immeubles en stocks dès qu\'une baisse de juste valeur est identifiée' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40 §56 dispose que les entités appliquant le modèle du coût doivent néanmoins indiquer la juste valeur de leurs immeubles de placement en annexe. La juste valeur, bien que non comptabilisée au bilan, reste une information obligatoire pour les utilisateurs des états financiers.",
    articleRef: 'IAS 40 §56 - IFRS Foundation'
  },

  // ─── DIFFICILES / PIÈGES ───
  {
    type: 'qcm', id: 'q11',
    question: "Une entité détient un immeuble évalué à 690 000 (JV marché) avec VNC de 700 000. La valeur d'utilité calculée en DCF est de 760 000. Selon IAS 36, quelle conclusion s'impose ?",
    options: [
      { id: 'a', texte: 'Il y a dépréciation de 10 000 car la JV est inférieure à la VNC' },
      { id: 'b', texte: 'Il y a dépréciation de 70 000 car la VNC dépasse la JV nette' },
      { id: 'c', texte: 'Aucune dépréciation : la valeur recouvrable est 760 000, supérieure à la VNC de 700 000' },
      { id: 'd', texte: 'Il y a dépréciation de 700 000 car l\'actif est inférieur à la JV' },
      { id: 'e', texte: 'Le test IAS 36 ne s\'applique pas lorsqu\'il existe un marché actif' },
    ],
    reponseCorrecte: 'c',
    explication: "C'est le piège classique d'IAS 36. La valeur recouvrable est le MAX(JVN ; VU) = MAX(680 000 ; 760 000) = 760 000. Puisque VNC (700 000) < VR (760 000), aucune dépréciation n'est requise. La juste valeur seule ne suffit pas à déclencher une dépréciation si la valeur d'utilité est plus élevée.",
    articleRef: 'IAS 36 §18 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q12',
    question: "Une perte de valeur de 45 000 a été comptabilisée en N sur un actif réévalué dont l'AERG en capitaux propres s'élevait à 30 000. Comment est traitée la perte selon IAS 36 §60 ?",
    options: [
      { id: 'a', texte: '45 000 en résultat net (l\'AERG ne peut jamais absorber une dépréciation)' },
      { id: 'b', texte: '30 000 en OCI (débit AERG) et 15 000 en résultat net' },
      { id: 'c', texte: '45 000 en OCI, l\'AERG est toujours suffisant dans ce cas' },
      { id: 'd', texte: '15 000 en résultat net et 30 000 reportés à la prochaine clôture' },
      { id: 'e', texte: '30 000 en résultat net et 15 000 en OCI - ordre inverse de la règle' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §60 impose une cascade : la perte est imputée en priorité sur l'AERG existant (30 000), puis le solde (45 000 - 30 000 = 15 000) est comptabilisé en résultat net. L'AERG est entièrement consommé et il ne reste aucun solde reportable.",
    articleRef: 'IAS 36 §60 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q13',
    question: "En N+3, la valeur recouvrable d'un actif dont le goodwill avait été intégralement déprécié en N augmente significativement. Selon IAS 36 §124, quelle est la règle applicable ?",
    options: [
      { id: 'a', texte: 'La reprise est obligatoire et doit être comptabilisée intégralement en résultat' },
      { id: 'b', texte: 'La reprise est possible, mais plafonnée à la valeur comptable sans dépréciation' },
      { id: 'c', texte: 'La reprise du goodwill est formellement interdite, quelle que soit la hausse de valeur recouvrable' },
      { id: 'd', texte: 'La reprise du goodwill est possible si un expert indépendant l\'atteste' },
      { id: 'e', texte: 'La reprise est différée de 5 ans conformément aux règles de prudence d\'IFRS 3' },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36 §124 édicte une interdiction absolue et sans exception : une perte de valeur comptabilisée pour un goodwill ne doit pas être reprise lors d'une période ultérieure. Le fondement est qu'une hausse de la VR de l'UGT reflète probablement la génération d'un goodwill interne, non comptabilisable selon IAS 38 §48.",
    articleRef: 'IAS 36 §124 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q14',
    question: "Une entité applique IAS 40 modèle juste valeur. Au 31/12/N, la juste valeur de son immeuble est de 4 300 000 (coût d'acquisition en N-1 : 5 000 000). Quelle est l'écriture correcte ?",
    options: [
      { id: 'a', texte: 'Débit Amortissements 125 000 / Crédit Amortissements cumulés 125 000' },
      { id: 'b', texte: 'Débit Pertes sur variation de JV 700 000 / Crédit Immeuble de placement 700 000' },
      { id: 'c', texte: 'Débit Immeuble de placement 700 000 / Crédit Gains sur variation de JV 700 000' },
      { id: 'd', texte: 'Débit AERG 700 000 / Crédit Immeuble de placement 700 000' },
      { id: 'e', texte: 'Aucune écriture : le modèle juste valeur interdit de constater les pertes' },
    ],
    reponseCorrecte: 'b',
    explication: "Avec le modèle juste valeur d'IAS 40 : aucun amortissement, et toute variation est en résultat. La baisse est de 5 000 000 - 4 300 000 = 700 000. L'écriture est : Débit Pertes sur variation de JV 700 000 / Crédit Immeuble de placement 700 000. Ce n'est pas de l'OCI (AERG), mais bien du résultat net.",
    articleRef: 'IAS 40 §35 - IFRS Foundation'
  },
  {
    type: 'qcm', id: 'q15',
    question: "Selon IAS 36 §55, le taux d'actualisation utilisé pour calculer la valeur d'utilité doit être :",
    options: [
      { id: 'a', texte: 'Le taux d\'endettement moyen de l\'entité après impôt' },
      { id: 'b', texte: 'Un taux avant impôt reflétant les appréciations actuelles du marché pour la valeur temps de l\'argent et les risques spécifiques à l\'actif' },
      { id: 'c', texte: 'Le taux directeur de la banque centrale du pays de l\'entité' },
      { id: 'd', texte: 'Le taux de rendement de l\'actif calculé sur la base des flux historiques réalisés' },
      { id: 'e', texte: 'Le CMPC après impôt de l\'entité, sans ajustement de risque spécifique à l\'actif' },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §55 est précis : le taux d'actualisation est un taux avant impôt qui reflète (i) les appréciations actuelles du marché pour la valeur temps de l'argent, et (ii) les risques spécifiques à l'actif non reflétés dans les flux de trésorerie. Le point piège est 'avant impôt' - de nombreux praticiens utilisent un CMPC après impôt, ce qui n'est pas conforme.",
    articleRef: 'IAS 36 §55 - IFRS Foundation'
  },
]

// ─────────────────────────────────────────────────────────────────
// ETUDES DE CAS (CasPratiqueExistant compatible)
// ─────────────────────────────────────────────────────────────────
interface EtudeDeCasIAS {
  titre: string
  contexte: string
  questions: { num: number; énoncé: string; correction: string }[]
}

const ETUDES_DE_CAS: EtudeDeCasIAS[] = [
  {
    titre: 'Cas 1 - PHARMA CENTRAL SA : Test de dépréciation et valeur recouvrable',
    contexte: "PHARMA CENTRAL SA est une société pharmaceutique qui exploite une ligne de production de médicaments génériques. Au 31/12/N, en raison d'une modification réglementaire interdisant la commercialisation d'un principe actif clé, la direction identifie un indice externe de perte de valeur sur cette ligne. Valeur comptable nette de la ligne : 2 800 000. Offre ferme de rachat reçue d'un concurrent : 2 600 000 (coûts de cession estimés : 40 000). Valeur d'utilité calculée par la direction sur la base de flux actualisés sur 6 ans : 2 900 000.",
    questions: [
      {
        num: 1,
        énoncé: "En application d'IAS 36 §18, calculez la valeur recouvrable de la ligne de production. Justifiez le raisonnement en distinguant la JVN et la VU.",
        correction: "JVN = 2 600 000 - 40 000 = 2 560 000. VU = 2 900 000 (calculée par DCF). Valeur recouvrable = MAX(2 560 000 ; 2 900 000) = 2 900 000. La valeur d'utilité (2 900 000) est supérieure à la valeur comptable (2 800 000). En conséquence, aucune perte de valeur ne doit être comptabilisée selon IAS 36 §59. Le fait que la JVN (2 560 000) soit inférieure à la VNC (2 800 000) ne suffit pas à déclencher une dépréciation tant que la valeur d'utilité reste supérieure."
      },
      {
        num: 2,
        énoncé: "Supposons que la valeur d'utilité recalculée soit de 2 500 000 (et non 2 900 000). Quelle est la perte de valeur à comptabiliser ? Présentez l'écriture comptable.",
        correction: "VR = MAX(2 560 000 ; 2 500 000) = 2 560 000. Perte de valeur = VNC (2 800 000) - VR (2 560 000) = 240 000. Écriture : Débit Charges de dépréciation 240 000 / Crédit Cumul des dépréciations - ligne de production 240 000. La dotation aux amortissements des exercices futurs sera recalculée sur la nouvelle VNC de 2 560 000, répartie sur la durée d'utilité restante (IAS 36 §63)."
      },
      {
        num: 3,
        énoncé: "En N+2, la réglementation est assouplie et la valeur recouvrable de la ligne remonte à 2 650 000. La VNC sans la dépréciation passée aurait été de 2 400 000 (après amortissements normaux sur 2 ans). Expliquez le traitement de la reprise en application d'IAS 36 §117.",
        correction: "La reprise est plafonnée par IAS 36 §117 à la VNC qui aurait existé sans la perte initiale, soit 2 400 000. La VNC actuelle après amortissement post-dépréciation doit être calculée et comparée à ce plafond. La reprise maximale autorisée est limitée à ce plafond - il est impossible de remonter au-delà. Si la VNC actuelle est inférieure à 2 400 000, la reprise est la différence entre 2 400 000 et la VNC actuelle. Écriture de reprise : Débit Cumul des dépréciations / Crédit Reprises de dépréciation (produit en résultat net)."
      },
      {
        num: 4,
        énoncé: "Quelle est la règle applicable si la ligne de production avait fait l'objet d'une réévaluation en N-1 avec constitution d'un AERG de 180 000, et que la perte de valeur à comptabiliser en N est de 240 000 ?",
        correction: "En application d'IAS 36 §60, la perte de 240 000 doit être imputée en priorité sur l'AERG existant (180 000). Le solde (240 000 - 180 000 = 60 000) est comptabilisé en résultat net. Écritures : (1) Débit AERG 180 000 / Crédit Cumul des dépréciations 180 000 - imputation sur OCI ; (2) Débit Charges de dépréciation 60 000 / Crédit Cumul des dépréciations 60 000 - solde en résultat net."
      },
      {
        num: 5,
        énoncé: "Après la dépréciation, la valeur comptable nette est de 2 560 000 et la durée d'utilité résiduelle est de 5 ans (valeur résiduelle : 60 000). Calculez le nouvel amortissement annuel à comptabiliser en N+1.",
        correction: "Selon IAS 36 §63, l'amortissement futur doit être ajusté pour répartir la nouvelle VNC sur la durée restante. Formule : Amortissement annuel = (VNC après dépréciation - Valeur résiduelle) / Durée restante = (2 560 000 - 60 000) / 5 = 2 500 000 / 5 = 500 000 par an. Ce montant est supérieur à l'amortissement précédent car la base amortissable reste élevée mais la durée s'est raccourcie."
      }
    ]
  },
  {
    titre: 'Cas 2 - METALCO SA : UGT avec goodwill et cascade de dépréciation',
    contexte: "METALCO SA a acquis en N-2 une division de métallurgie. Cette acquisition a généré un goodwill de 320 000, entièrement affecté à l'UGT Division Métal. Au 31/12/N, en raison d'une chute durable des prix du métal, la direction constate des indices de dépréciation. Composition de l'UGT : Machines (VC = 500 000), Brevets (VC = 200 000), Stocks (VC = 80 000), Créances commerciales (VC = 120 000). Goodwill affecté : 320 000. Total VC UGT : 1 220 000. Valeur recouvrable de l'UGT estimée : 850 000.",
    questions: [
      {
        num: 1,
        énoncé: "Calculez la perte de valeur totale à affecter à l'UGT Division Métal.",
        correction: "Perte totale = VC UGT - VR UGT = 1 220 000 - 850 000 = 370 000. Cette perte doit être répartie entre les actifs de l'UGT selon la cascade prescrite par IAS 36 §104."
      },
      {
        num: 2,
        énoncé: "Appliquez la cascade d'imputation d'IAS 36 §104. Combien imputez-vous sur le goodwill ? Quel solde reste à répartir sur les actifs identifiables ?",
        correction: "Étape 1 : Imputation sur le goodwill. Le goodwill est d'abord totalement épuisé : 320 000 sur 370 000. Solde restant après goodwill : 370 000 - 320 000 = 50 000 à répartir sur les actifs identifiables au prorata de leur VC."
      },
      {
        num: 3,
        énoncé: "Répartissez le solde de 50 000 entre les Machines (VC 500 000), Brevets (VC 200 000), Stocks (VC 80 000) et Créances commerciales (VC 120 000). Notez que les stocks et créances sont exclus du champ d'IAS 36.",
        correction: "Les stocks et créances commerciales sont exclus du champ d'IAS 36 (§2) - ils ne peuvent pas absorber la perte IAS 36. Seuls les actifs dans le champ d'IAS 36 absorbent : Machines (500 000) + Brevets (200 000) = 700 000. Répartition prorata : Machines = 50 000 × (500 000 / 700 000) = 35 714. Brevets = 50 000 × (200 000 / 700 000) = 14 286. Écriture : Débit Charges dépréciations goodwill 320 000 / Crédit Cumul dépréciations goodwill 320 000 ; Débit Charges dépréciations machines 35 714 / Crédit Cumul dépréciations machines 35 714 ; Débit Charges dépréciations brevets 14 286 / Crédit Cumul dépréciations brevets 14 286."
      },
      {
        num: 4,
        énoncé: "En N+4, la Division Métal retrouve une forte rentabilité. La valeur recouvrable de l'UGT remonte à 1 300 000 (supérieure à la VC actuelle). Peut-on reprendre la dépréciation du goodwill ? Justifiez sur la base d'IAS 36 §124.",
        correction: "Non. IAS 36 §124 interdit formellement la reprise d'une perte de valeur sur le goodwill, quelle que soit la hausse de la valeur recouvrable. La reprise n'est possible que sur les actifs identifiables dépréciés (Machines et Brevets), plafonnée à leur VNC sans dépréciation. La doctrine IASB justifie cette interdiction par le fait que la hausse reflète probablement la génération d'un goodwill interne, non comptabilisable selon IAS 38 §48."
      },
      {
        num: 5,
        énoncé: "Réfléchissez à l'impact de la dépréciation du goodwill sur les états financiers (bilan, résultat, capitaux propres) et sur la lecture que peuvent en faire les utilisateurs d'états financiers.",
        correction: "Impact bilan : le goodwill est ramené à zéro (de 320 000 à 0), réduisant les actifs non courants. Impact résultat : une charge de dépréciation de 370 000 (320 000 goodwill + 50 000 actifs) est comptabilisée en résultat net, ce qui réduit le bénéfice ou aggrave la perte de l'exercice. Impact capitaux propres : les capitaux propres diminuent du montant de la charge nette d'impôt différé éventuel. Pour les utilisateurs, cette dépréciation constitue un signal d'alarme fort sur la rentabilité de la Division Métal et peut affecter les ratios de solvabilité, le cours boursier (pour les sociétés cotées) et la confiance des créanciers."
      }
    ]
  },
  {
    titre: 'Cas 3 - IMMO INVEST SA : Choix du modèle IAS 40 et impact sur les états financiers',
    contexte: "IMMO INVEST SA a acquis un immeuble de bureaux le 01/01/N pour 8 000 000. L'immeuble est loué à des tiers dans le cadre de baux commerciaux. La société hésite entre le modèle de la juste valeur et le modèle du coût (durée d'utilité : 40 ans, valeur résiduelle : 400 000). Au 31/12/N, un expert indépendant évalue la juste valeur de l'immeuble à 8 500 000.",
    questions: [
      {
        num: 1,
        énoncé: "Cet immeuble est-il qualifiable d'immeuble de placement selon IAS 40 §5 ? Justifiez en articulant les critères normatifs.",
        correction: "Oui. L'immeuble remplit les conditions d'IAS 40 §5 : (1) il est détenu pour en retirer des loyers (baux commerciaux à des tiers) ; (2) il n'est pas utilisé dans la production ou les activités administratives de l'entité elle-même ; (3) il n'est pas détenu pour être vendu dans le cours ordinaire des affaires. L'immeuble est donc un immeuble de placement relevant d'IAS 40."
      },
      {
        num: 2,
        énoncé: "Présentez l'écriture comptable au 31/12/N si IMMO INVEST SA applique le modèle de la juste valeur (IAS 40 §35).",
        correction: "Variation JV = 8 500 000 - 8 000 000 = 500 000 (gain). Écriture : Débit Immeuble de placement 500 000 / Crédit Gains sur variation de juste valeur 500 000. Ce gain est comptabilisé en résultat net de N. Aucun amortissement n'est comptabilisé avec le modèle juste valeur."
      },
      {
        num: 3,
        énoncé: "Présentez les écritures comptables au 31/12/N si IMMO INVEST SA applique le modèle du coût (IAS 40 §56 + IAS 16). Effectuez également le test IAS 36.",
        correction: "Amortissement = (8 000 000 - 400 000) / 40 = 190 000. Écriture amortissement : Débit Dotation aux amortissements 190 000 / Crédit Amortissements cumulés 190 000. VNC au 31/12/N = 8 000 000 - 190 000 = 7 810 000. Test IAS 36 : VNC (7 810 000) vs VR. La JV est 8 500 000 > VNC : aucun indice de dépréciation, aucune perte. Information à fournir en annexe : JV = 8 500 000 (IAS 40 §56)."
      },
      {
        num: 4,
        énoncé: "Comparez l'impact des deux modèles sur le résultat net de N et sur la valeur du bilan. Quel modèle donne une image plus fidèle de la réalité économique dans ce cas ?",
        correction: "Modèle JV : résultat net augmente de 500 000 (gain de JV) ; bilan = 8 500 000. Modèle coût : résultat net diminue de 190 000 (amortissement) ; bilan = 7 810 000. Écart de résultat : 690 000 en faveur du modèle JV. Le modèle juste valeur donne une image plus fidèle de la réalité économique dans ce cas car l'immeuble a pris de la valeur. Cependant, le modèle coût est plus prudent et moins volatil. IAS 40 §30 laisse ce choix à l'entité, mais le choix doit être cohérent et appliqué à tous les immeubles de placement."
      },
      {
        num: 5,
        énoncé: "En N+1, IMMO INVEST SA (modèle juste valeur) décide d'occuper elle-même une partie de l'immeuble pour ses bureaux. Quel traitement normatif s'applique selon IAS 40 §57 à §65 ?",
        correction: "Un changement d'utilisation est intervenu : une partie de l'immeuble de placement est désormais occupée par le propriétaire. Selon IAS 40 §57(b), ce transfert déclenche un reclassement de l'immeuble de placement (IAS 40) vers une immobilisation corporelle (IAS 16). Le transfert s'effectue à la juste valeur à la date du changement d'utilisation, qui devient le nouveau coût présumé pour l'application d'IAS 16. Aucun gain ou perte additionnel n'est comptabilisé sur le transfert lui-même si l'entité appliquait le modèle juste valeur."
      }
    ]
  },
  {
    titre: 'Cas 4 - TRANSLOG AFRICA SA : Dépréciation d\'un actif réévalué et imputation en cascade',
    contexte: "TRANSLOG AFRICA SA exploite une flotte de camions lourds. En N-2, la flotte a été réévaluée selon IAS 16, générant un AERG de 95 000 en capitaux propres. Au 31/12/N, en raison d'une dégradation des routes et d'une chute du trafic de marchandises, la direction identifie des indices internes et externes de perte de valeur. Valeur comptable nette de la flotte : 850 000. Juste valeur nette des coûts de sortie : 760 000. Valeur d'utilité calculée : 720 000.",
    questions: [
      {
        num: 1,
        énoncé: "Calculez la valeur recouvrable de la flotte selon IAS 36 §18 et déterminez le montant de la perte de valeur.",
        correction: "VR = MAX(JVN ; VU) = MAX(760 000 ; 720 000) = 760 000. Perte de valeur = VNC (850 000) - VR (760 000) = 90 000."
      },
      {
        num: 2,
        énoncé: "Appliquez la règle d'IAS 36 §60 pour un actif réévalué antérieurement (AERG = 95 000). Comment est imputée la perte de 90 000 ?",
        correction: "La perte de 90 000 est inférieure à l'AERG disponible (95 000). Elle est donc entièrement imputée sur l'AERG en OCI : Débit AERG 90 000 / Crédit Cumul des dépréciations 90 000. Le solde d'AERG résiduel est 95 000 - 90 000 = 5 000. Aucune charge n'est comptabilisée en résultat net car l'AERG suffit à absorber la totalité de la perte."
      },
      {
        num: 3,
        énoncé: "Supposez que la perte de valeur soit de 130 000 (et non 90 000), avec le même AERG de 95 000. Comment est traitée l'excédent ?",
        correction: "L'AERG de 95 000 est entièrement consommé en OCI : Débit AERG 95 000 / Crédit Cumul des dépréciations 95 000. Le solde (130 000 - 95 000 = 35 000) est comptabilisé en résultat net : Débit Charges de dépréciation 35 000 / Crédit Cumul des dépréciations 35 000. Total dépréciations cumulées : 130 000 (95 000 OCI + 35 000 résultat)."
      },
      {
        num: 4,
        énoncé: "Analysez le critère 'indice interne' retenu par la direction (dégradation des routes, chute du trafic) à la lumière d'IAS 36 §12. Ces éléments constituent-ils des indices valides ?",
        correction: "Oui, ces éléments constituent des indices valides selon IAS 36 §12. La 'dégradation des routes' relève d'un changement important dans l'environnement d'utilisation de l'actif (§12b - dégradation physique de l'actif ou de son environnement). La 'chute du trafic de marchandises' correspond à des performances économiques inférieures aux prévisions initiales (§12b). Ces deux indices internes suffisent à obliger l'entité à estimer la valeur recouvrable."
      },
      {
        num: 5,
        énoncé: "Discutez des implications de ce traitement sur la présentation des états financiers de TRANSLOG AFRICA SA, notamment sur les autres éléments du résultat global (OCI) et le résultat net.",
        correction: "Avec la perte de 90 000 entièrement absorbée par l'AERG (OCI) : le résultat net n'est pas affecté - la perte n'apparaît pas en compte de résultat mais dans les 'autres éléments du résultat global'. Les capitaux propres diminuent de 90 000 (réduction de l'AERG). Pour les utilisateurs, cette présentation peut masquer la réalité économique de la perte si l'on ne consulte pas le résultat global complet. IAS 1 §81A impose la présentation d'un état du résultat global comprenant à la fois le résultat net et les OCI, ce qui assure la transparence. Les analystes financiers doivent donc examiner le résultat global (et non uniquement le résultat net) pour évaluer la performance réelle."
      }
    ]
  },
  {
    titre: 'Cas 5 - TECHNO INNOVATE SA : Test annuel obligatoire sur goodwill et immobilisations incorporelles à durée indéterminée',
    contexte: "TECHNO INNOVATE SA a réalisé en N-3 l'acquisition de la société DIGITAL HUB pour 12 000 000. Cette acquisition a généré un goodwill de 2 500 000, affecté à l'UGT 'Solutions Numériques'. La société détient également une marque commerciale de durée indéterminée (VC = 800 000) et un brevet en cours de développement non encore en service (VC = 350 000). Au 31/12/N, la direction réalise son test annuel. L'UGT 'Solutions Numériques' a une VC totale de 9 800 000 (goodwill inclus) et une VR estimée de 10 200 000.",
    questions: [
      {
        num: 1,
        énoncé: "Justifiez pourquoi TECHNO INNOVATE SA est obligée de réaliser un test annuel sur le goodwill, la marque et le brevet, même en l'absence de tout indice de perte de valeur. Citez les dispositions normatives précises.",
        correction: "IAS 36 §10 impose un test annuel obligatoire, indépendamment de tout indice, pour trois catégories : (a) le goodwill issu d'un regroupement d'entreprises (TECHNO a acquis DIGITAL HUB - le goodwill de 2 500 000 est concerné) ; (b) les immobilisations incorporelles à durée d'utilité indéterminée (la marque commerciale de durée indéterminée - VC 800 000 - est visée) ; (c) les immobilisations incorporelles pas encore disponibles à l'utilisation (le brevet en cours de développement - VC 350 000). Les trois actifs déclenchent donc le test annuel obligatoire."
      },
      {
        num: 2,
        énoncé: "Pour l'UGT 'Solutions Numériques' : la VC est 9 800 000 et la VR est 10 200 000. Y a-t-il dépréciation du goodwill ? Justifiez.",
        correction: "Non. La valeur recouvrable (10 200 000) est supérieure à la valeur comptable (9 800 000). Aucune perte de valeur n'est identifiée pour l'UGT. Le goodwill n'est pas déprécié. L'excédent de VR sur VC est de 400 000, constituant un coussin de sécurité. Aucune écriture n'est requise."
      },
      {
        num: 3,
        énoncé: "Supposez que la VR de l'UGT soit de 8 900 000 (au lieu de 10 200 000). Calculez et imputez la perte selon IAS 36 §104.",
        correction: "Perte = 9 800 000 - 8 900 000 = 900 000. Cascade IAS 36 §104 : Étape 1 - Goodwill : 900 000 imputés sur le goodwill de 2 500 000, ramené à 1 600 000. La perte est entièrement absorbée par le goodwill. Aucune perte sur les actifs identifiables. Écriture : Débit Charges dépréciations goodwill 900 000 / Crédit Cumul dépréciations goodwill 900 000."
      },
      {
        num: 4,
        énoncé: "Comment la marque à durée indéterminée (VC 800 000) doit-elle être testée séparément ? Quelle est la procédure selon IAS 36 §10 et §80 ?",
        correction: "La marque à durée indéterminée doit faire l'objet d'un test individuel ou au niveau du groupe d'actifs auquel elle appartient, selon IAS 36 §10(b). Si la marque peut être testée individuellement (elle génère des flux identifiables), sa VR individuelle est comparée à sa VC (800 000). Si la marque ne génère pas de flux indépendants, elle est affectée à une UGT ou groupe d'UGT, et le test se fait à ce niveau. Dans tous les cas, le test est annuel, qu'il y ait ou non un indice, conformément à IAS 36 §10."
      },
      {
        num: 5,
        énoncé: "Réfléchissez à la cohérence entre l'obligation de test annuel du goodwill (IAS 36 §10) et l'interdiction d'amortissement du goodwill (IFRS 3 §B63). En quoi ce dispositif normatif constitue-t-il un équilibre entre prudence et fidélité ?",
        correction: "IFRS 3 §B63 interdit l'amortissement systématique du goodwill, contrairement à l'ancienne pratique SYSCOHADA. Cette interdiction repose sur l'idée que le goodwill représente des avantages économiques indéfinis, non consommés linéairement. En contrepartie, IAS 36 §10 impose un test annuel obligatoire pour vérifier que la valeur comptable du goodwill ne dépasse pas sa valeur recouvrable. L'équilibre est le suivant : pas d'amortissement automatique (prudence évitée - pas de charge arbitraire), mais test rigoureux annuel (fidélité - détection immédiate de la perte réelle). Ce système est plus contraignant opérationnellement mais plus fidèle à la réalité économique : une dépréciation constatée reflète une perte réelle d'avantages économiques, non une simple convention comptable."
      }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────
// COMPOSANT QCMBlock
// ─────────────────────────────────────────────────────────────────
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-sky-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-sky-500 bg-sky-100 text-sky-800' : 'border-border hover:border-sky-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-sky-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-sky-700 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-lg p-2.5 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
          <p className="text-xs opacity-70 mt-0.5">Ref. : {q.articleRef}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPOSANT CasPratiqueBlock
// ─────────────────────────────────────────────────────────────────
function CasPratiqueBlock({ cp }: { cp: EtudeDeCasIAS }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="h-7 w-7 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center shrink-0">C</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
          </div>
        </div>
        <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-90')} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">Contexte</p>
            <p className="text-xs text-amber-900 leading-relaxed">{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Question {q.num} : {q.énoncé}</p>
                <button
                  onClick={() => setCorrVisible(s => {
                    const n = new Set(s)
                    if (n.has(q.num)) { n.delete(q.num) } else { n.add(q.num) }
                    return n
                  })}
                  className="text-xs text-sky-600 hover:underline font-medium"
                >
                  {corrVisible.has(q.num) ? 'Masquer la correction' : 'Voir la correction'}
                </button>
                {corrVisible.has(q.num) && (
                  <div className="rounded-lg bg-sky-50 border border-sky-200 p-3">
                    <p className="text-xs font-semibold text-sky-700 mb-1">Correction</p>
                    <p className="text-xs text-sky-900 leading-relaxed">{q.correction}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────
export default function UE13Chapitre3Page() {
  const goBack = useGoBack('/ue13-ifrs-ias')
  const currentUser = useUser()
  const isStudent = isStudentRole(currentUser)

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]
  const isFirst = leconIdx === 0
  const isLast = leconIdx === LECONS.length - 1

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 13 IFRS / IAS', route: '/ue13-ifrs-ias' },
            { label: 'Chapitre 3' },
          ]}
          color="sky"
        />
        <BackButton />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">IAS 36 Dépréciation d'actifs et IAS 40 Immeubles de placement</h1>
          <InfoTooltip texte="IAS 36 : dépréciation d'actifs - test de valeur recouvrable, UGT, goodwill. IAS 40 : immeubles de placement - modèle juste valeur vs modèle du coût. Normes IFRS Foundation." loi="IAS 36 §1 · IAS 40 §1 - IFRS Foundation" />
        </div>
        <p className="text-xs text-muted-foreground">IAS 36 · IAS 40 · Valeur recouvrable · UGT · Goodwill · Juste valeur</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QUESTIONS_QCM.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '4h30' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-sky-600" />
          <span className="text-sm font-semibold text-sky-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Identifier les actifs soumis au test de dépréciation IAS 36 et distinguer test obligatoire et test conditionnel (§10)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Calculer la valeur recouvrable : juste valeur nette des coûts de sortie et valeur d'utilité par DCF (§18-§57)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Comptabiliser la perte de valeur et sa reprise, en distinguant actif au coût et actif réévalué (§59-§117)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Appliquer la cascade d'imputation au niveau de l'UGT avec goodwill selon IAS 36 §104</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Distinguer les deux modèles IAS 40 (juste valeur vs coût) et comptabiliser leurs effets sur les états financiers</span></li>
        </ul>
      </div>

      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(isStudent
          ? [['lecons', 'Leçons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lecons', 'Leçons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
        ).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors', activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'lecons' && (
        <div className="space-y-4">
          <div className="flex gap-1 flex-wrap">
            {LECONS.map((l, i) => (
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-sky-600 text-white border-sky-600' : 'border-border hover:border-sky-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-sky-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-sky-600">Leçon {leconIdx + 1} / {LECONS.length}</span>
              <span className="text-xs text-muted-foreground">{lecon.badge ?? ''}</span>
            </div>
            <h2 className="text-base font-display font-bold text-foreground">{lecon.titre}</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              {lecon.contenu}
            </div>
            {lecon.questions.filter(q => q.type === 'qcm').map((q, idx) => (
              <QCMBlock key={idx} q={q as QCMQuestion} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-sky-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-sky-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QUESTIONS_QCM as unknown as QCMChapitre[]} couleurAccent="sky" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-display font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} études de cas</h2>
          {ETUDES_DE_CAS.map((cp, i) => <CasPratiqueBlock key={i} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue13-chapitre-3"
              chapitreNom="Chapitre 3 : IAS 36 et IAS 40 Dépréciation et Immeubles de placement"
              questions={QUESTIONS_QCM as unknown as QCMChapitre[]}
              coursId="ue13-ifrs-ias"
              casPratiquesExistants={ETUDES_DE_CAS.map((c, i) => ({
                id: `cas-${i + 1}`,
                titre: c.titre,
                enonce: [c.contexte, ...c.questions.map(q => `Question ${q.num} : ${q.énoncé}`)].join('\n\n'),
                corrigeType: c.questions.map(q => `Question ${q.num} : ${q.correction}`).join('\n\n'),
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center space-y-2">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium text-foreground">Devoir en attente</p>
              <p className="text-sm text-muted-foreground">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 3
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : IAS 36 Dépréciation d'actifs · IAS 40 Immeubles de placement · IFRS Foundation
      </p>
    </div>
  )
}
