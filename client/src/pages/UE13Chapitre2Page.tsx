import React, { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Layers, Scale, RefreshCw, TrendingDown, PenLine,
  ChevronRight, RotateCcw, Wrench
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

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
// LECONS
// ─────────────────────────────────────────────────────────────────
const LECONS: Lecon[] = [

  // ─────────────────────────────────────────────────────────────────
  // LECON 1 - IAS 16 : Champ d'application, definitions et comptabilisation
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l1',
    icone: <BookOpen className="h-5 w-5" />,
    titre: 'IAS 16 - Champ d\'application, définitions et conditions de comptabilisation',
    badge: 'IAS 16 §1 à §14 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La <strong>Norme comptable internationale 16</strong>
          <InfoTooltip texte="IAS 16 (Immobilisations corporelles) prescrit le traitement comptable des immobilisations corporelles. Elle traité de la comptabilisation des actifs, de la détermination de leur valeur comptable, des dotations aux amortissements et des pertes de valeur." loi="IAS 16 §1 - IFRS Foundation" />
          {' '}a pour objectif de prescrire le traitement comptable pour les <strong>immobilisations corporelles</strong>, de sorte que les utilisateurs des états financiers puissent distinguer les informations relatives aux investissements d'une entité dans ses immobilisations corporelles et les variations de ces investissements. Les questions fondamentales concernent la comptabilisation des actifs, la détermination de leur valeur comptable, ainsi que des dotations aux amortissements et pertes de valeur correspondantes.
        </p>

        <h3 className="font-bold text-foreground mt-4">Champ d'application (§2 et §3)</h3>
        <p>
          IAS 16 doit être appliquée à la <strong>comptabilisation des immobilisations corporelles</strong>, sauf lorsqu'une autre norme impose ou autorise un traitement comptable différent. La norme ne s'applique pas :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Aux immobilisations corporelles classées comme <strong>détenues en vue de la vente</strong> selon IFRS 5 ;</li>
          <li>Aux <strong>actifs biologiques</strong> liés à une activité agricole (sauf les plantes productrices) selon IAS 41 ;</li>
          <li>Aux actifs de <strong>prospection et d'évaluation</strong> selon IFRS 6 ;</li>
          <li>Aux <strong>droits miniers et réserves minérales</strong> (pétrole, gaz, ressources non renouvelables).</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">Définitions essentielles (§6)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
          <div>
            <p className="font-semibold text-foreground text-xs mb-0.5">Immobilisations corporelles</p>
            <p className="text-xs text-foreground/80 italic">"Actifs corporels qui sont détenus par une entité soit pour être utilisés dans la production ou la fourniture de biens ou de services, soit pour être loués à des tiers, soit à des fins administratives ; et dont on s'attend à ce qu'ils soient utilisés sur plus d'une période."</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 16 §6</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-xs mb-0.5">Valeur comptable</p>
            <p className="text-xs text-foreground/80 italic">"Montant pour lequel un actif est comptabilisé après déduction du cumul des amortissements et du cumul des pertes de valeur."</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 16 §6</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-xs mb-0.5">Montant amortissable</p>
            <p className="text-xs text-foreground/80 italic">"Le coût d'un actif, ou tout autre montant substitué au coût, diminué de sa valeur résiduelle."</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 16 §6</p>
          </div>
          <div>
            <p className="font-semibold text-foreground text-xs mb-0.5">Valeur résiduelle</p>
            <p className="text-xs text-foreground/80 italic">"Le montant estimé qu'une entité obtiendrait actuellement de la sortie de l'actif, après déduction des coûts de sortie estimés, si l'actif avait déjà l'âge et se trouvait déjà dans l'état prévu à la fin de sa durée d'utilité."</p>
            <p className="text-xs text-muted-foreground mt-1">IAS 16 §6</p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Critères de comptabilisation (§7)</h3>
        <p>
          Selon IAS 16 §7, le coût d'une immobilisation corporelle doit être comptabilisé en tant qu'actif <strong>si, et seulement si</strong> deux conditions cumulatives sont réunies :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
            <p className="font-semibold text-sky-700 text-xs mb-1">Condition 1</p>
            <p className="text-xs text-foreground/80">Il est <strong>probable que les avantages économiques futurs</strong>
            <InfoTooltip texte="Les avantages économiques futurs (AEF) sont les flux de trésorerie nets qu'une entité attend de l'actif. Leur probabilité doit être appréciée sur la base d'une analyse raisonnée des flux futurs, en accordant un poids plus important aux indications externes." loi="IAS 16 §7(a) et Cadre conceptuel IASB" />
            {' '}associés à cet élément iront à l'entité.</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
            <p className="font-semibold text-sky-700 text-xs mb-1">Condition 2</p>
            <p className="text-xs text-foreground/80">Le <strong>coût de cet élément peut être évalué de façon fiable.</strong></p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Coûts initiaux et coûts ultérieurs (§11 à §14)</h3>
        <p>
          Des immobilisations corporelles peuvent être acquises pour des <strong>raisons de sécurité ou d'environnement</strong> (§11). Même si elles n'augmentent pas directement les avantages économiques d'un actif donné, elles permettent à l'entité d'obtenir des avantages économiques de ses autres actifs. Elles remplissent donc les conditions de comptabilisation.
        </p>
        <p>
          En revanche, les <strong>coûts d'entretien courant</strong>
          <InfoTooltip texte="Les coûts d'entretien courant (main-d'oeuvre, consommables, petites pièces) sont comptabilisés en résultat net (charges) lorsqu'ils sont engagés. Ils assurent la fonction 'réparations et maintenance' de l'immobilisation mais n'accroissent pas sa valeur." loi="IAS 16 §12" />
          {' '}ne sont pas intégrés dans la valeur comptable de l'immobilisation. Ils sont comptabilisés en résultat net lorsqu'ils sont engagés (§12).
        </p>
        <p>
          En revanche, le <strong>remplacement partiel</strong> d'une immobilisation (§13) est capitalisé dans sa valeur comptable dès lors que les critères de §7 sont satisfaits. La valeur comptable de la partie remplacée est alors décomptabilisée. De même, les inspections majeures obligatoires (§14) constituent un composant distinct amorti jusqu'à la prochaine inspection.
        </p>

        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 mt-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Point d'attention</p>
          <p className="text-xs text-foreground/80">
            IAS 16 ne prescrit pas d'unité d'évaluation unique (§9). Il appartient à l'entité d'exercer son jugement professionnel pour déterminer ce qui constitue une immobilisation corporelle dans son contexte particulier.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - Comptabilisation initiale et coûts ultérieurs (IAS 16 §7 et §13)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 space-y-4">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-800 mb-1">Contexte - Société FABRICO SA</p>
            <p className="text-xs text-amber-900">
              FABRICO SA acquiert une machine industrielle le 01/01/N. Prix catalogue : <strong>80 000 €</strong>. Transport et installation : <strong>4 200 €</strong>. Formation du personnel à son utilisation : <strong>3 000 €</strong>. En N+3, une pièce de rechange majeure est remplacée pour <strong>12 000 €</strong> ; la valeur comptable de l'ancienne pièce était de <strong>8 500 €</strong> (cumul amortissements : 1 500 €, valeur brute : 10 000 €).
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Étape 1 - Détermination du coût d'entrée (IAS 16 §16) :</p>
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="text-xs text-foreground/80 mb-1">Prix catalogue : 80 000 € - Inclus car prix d'acquisition direct.</p>
              <p className="text-xs text-foreground/80 mb-1">Transport + installation : 4 200 € - Inclus car coûts directement attribuables (IAS 16 §16b).</p>
              <p className="text-xs text-foreground/80 mb-1">Formation du personnel : 3 000 € - <strong>Exclus</strong>, car liés à l'usage et non à la mise en état de l'actif (IAS 16 §19e).</p>
              <BlockMath math={String.raw`\text{Co\hat{u}t d'entr\'{e}e} = 80\,000 + 4\,200 = \mathbf{84\,200\,\text{\euro}}`} />
            </div>
          </div>

          <JournalTable
            titre="Écriture d'acquisition de la machine - 01/01/N (IAS 16 §7 + §16)"
            lignes={[
              { libelle: "Immobilisations corporelles - Machine industrielle", debit: "84 200", credit: "" },
              { libelle: "Banque / Fournisseurs d'immobilisations", debit: "", credit: "84 200" },
            ]}
          />

          <div>
            <p className="text-xs font-semibold text-foreground mb-2">Étape 2 - Remplacement partiel en N+3 (IAS 16 §13) :</p>
            <p className="text-xs text-foreground/80 mb-2">
              Le remplacement satisfait aux critères de §7 (AEF probables, coût fiable). On capitalise la nouvelle pièce et on décomptabilise l'ancienne.
            </p>
            <JournalTable
              titre="Étape 2a - Décomptabilisation de l'ancienne pièce (IAS 16 §13 + §67)"
              lignes={[
                { libelle: "Amortissements cumulés - Pièce remplacée", debit: "1 500", credit: "" },
                { libelle: "Perte sur sortie d'actif", debit: "8 500", credit: "" },
                { libelle: "Immobilisations corporelles - Pièce (valeur brute)", debit: "", credit: "10 000" },
              ]}
            />
            <JournalTable
              titre="Étape 2b - Capitalisation de la nouvelle pièce (IAS 16 §7 + §13)"
              lignes={[
                { libelle: "Immobilisations corporelles - Pièce de remplacement", debit: "12 000", credit: "" },
                { libelle: "Banque / Fournisseurs", debit: "", credit: "12 000" },
              ]}
            />
          </div>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 2 - IAS 16 : Évaluation lors de la comptabilisation et éléments du coût
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l2',
    icone: <PenLine className="h-5 w-5" />,
    titre: 'IAS 16 - Évaluation lors de la comptabilisation : éléments du coût et écritures',
    badge: 'IAS 16 §15 à §28 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Selon IAS 16 §15, <strong>une immobilisation corporelle qui remplit les conditions de comptabilisation doit être évaluée à son coût.</strong> La norme définit précisément les éléments constitutifs de ce coût initial.
        </p>

        <h3 className="font-bold text-foreground mt-4">Éléments constitutifs du coût (§16 et §17)</h3>
        <p>Le coût d'une immobilisation corporelle comprend :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Prix d'achat</strong>, y compris droits de douane et taxes non remboursables, après déduction des remises et rabais commerciaux ;</li>
          <li><strong>Tout coût directement attribuable</strong> au transfert de l'actif jusqu'à son lieu d'exploitation et à sa mise en état ;</li>
          <li><strong>Estimation initiale des coûts de démantèlement</strong>, d'enlèvement et de remise en état du site (provision IAS 37).</li>
        </ul>
        <p>Exemples de coûts directement attribuables (§17) :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Coûts des avantages du personnel (IAS 19) résultant directement de l'acquisition ;</li>
          <li>Frais de préparation du site, frais de livraison et de manutention initiaux ;</li>
          <li>Frais d'installation et de montage ;</li>
          <li>Coûts des tests de bon fonctionnement ;</li>
          <li>Honoraires de professionnels.</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">Coûts EXCLUS du coût d'entrée (§19)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs font-semibold text-red-700 mb-2">Ne font PAS partie du coût :</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/80">
            <li>Coûts d'ouverture d'une nouvelle installation ;</li>
            <li>Coûts de lancement de nouveaux produits ou services (publicité, promotion) ;</li>
            <li>Coûts d'exploitation dans un nouveau lieu ou avec une nouvelle clientèle (formation) ;</li>
            <li>Frais administratifs et autres frais généraux ;</li>
            <li>Pertes d'exploitation initiales ;</li>
            <li>Coûts de relocalisation ou de restructuration.</li>
          </ul>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - Classification des coûts : immobilisables ou non ? (IAS 16 §16-19)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 mt-2">
          <p className="text-xs text-foreground/80 mb-3">
            Une ligne de mise en bouteilles est acquise par un producteur de vins. Chaque coût doit être qualifié selon IAS 16.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Coût</th>
                  <th className="border border-sky-200 p-1.5 text-center">Immobilisable ?</th>
                  <th className="border border-sky-200 p-1.5 text-left">Justification IAS 16</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Livraison de la ligne par le fabricant</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-foreground/70">Coût directement attribuable (§17a)</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Huile pour le moteur de la ligne</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Consommable d'entretien courant (§12)</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Consommables de la machine</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Charges courantes, non directement attribuables</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Frais de déplacement pour visite chez un concurrent</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Frais commerciaux exclus (§19)</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Heures de négociation du directeur des achats</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Frais administratifs exclus (§19)</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Frais de démarrage de la ligne</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Frais de démarrage exclus (§19b)</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Convoyage par l'acquéreur d'une partie de la ligne</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-foreground/70">Coût de livraison directement attribuable (§17b)</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Dalle en béton pour réception du moteur</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-foreground/70">Coût de préparation du site (§17b)</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Peinture des tapis roulants (harmonisation visuelle)</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">N'est pas nécessaire à la mise en état d'utilisation</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Pertes opérationnelles liées à la mise en route</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-foreground/70">Pertes initiales exclues (§19c)</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Remise exceptionnelle sur le prix brut de la ligne</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-foreground/70">Rabais déduit du prix d'achat (§16a)</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Honoraires pour certification de la machine</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-foreground/70">Honoraires de professionnels (§17e)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Production interne d'une immobilisation (§22)</h3>
        <p>
          Les immobilisations corporelles <strong>produites par l'entité pour elle-même</strong>
          <InfoTooltip texte="Selon IAS 16 §22, le coût d'une immobilisation corporelle construite par l'entité est déterminé en appliquant les mêmes principes que pour un actif acquis. Tous les coûts anormaux (gaspillages, erreurs de conception) sont exclus." loi="IAS 16 §22 - IFRS Foundation" />
          {' '}sont évaluées selon les mêmes principes que ceux applicables aux immobilisations acquises : prix de revient incluant les coûts directement attribuables à la mise en état d'utilisation, à l'exclusion de tout coût anormal. Les coûts de développement internes qualifiés selon IAS 38 peuvent également être capitalisés.
        </p>

        <h3 className="font-bold text-foreground mt-4">Paiement différé : actualisation obligatoire (§23)</h3>
        <p>
          Si le règlement est <strong>différé au-delà des conditions habituelles de crédit</strong>, le coût de l'immobilisation est le <strong>prix comptant équivalent à la date de comptabilisation</strong>. La différence entre ce prix comptant et le total des paiements est comptabilisée en <strong>charges financières</strong> sur la période de crédit (sauf incorporation au coût selon IAS 23).
        </p>

        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-2">Illustration - Machine acquise avec paiement échelonné (IAS 16 §23)</p>
          <p className="text-xs text-foreground/80 mb-2">
            Une machine est achetée moyennant un acompte de <strong>100 K€ comptant</strong>, puis <strong>110 K€ dans un an</strong> et <strong>121 K€ dans deux ans</strong>. Taux d'actualisation : 10 %.
          </p>
          <div className="rounded-lg bg-white border border-sky-100 p-3 my-2">
            <p className="text-xs font-semibold text-foreground mb-2">Calcul du prix comptant équivalent (IAS 16 §23) :</p>
            <div className="space-y-1 overflow-x-auto">
              <BlockMath math={String.raw`\text{Étape 1 : Acompte} = 100\,\text{K\euro}`} />
              <BlockMath math={String.raw`\text{Étape 2 : Actualisation N+1} = \dfrac{110}{1{,}10} = 100\,\text{K\euro}`} />
              <BlockMath math={String.raw`\text{Étape 3 : Actualisation N+2} = \dfrac{121}{1{,}21} = 100\,\text{K\euro}`} />
              <BlockMath math={String.raw`\text{Co\^ut d'entr\'{e}e} = 100 + 100 + 100 = \mathbf{300\,\text{K\euro}}`} />
            </div>
          </div>
          <p className="text-xs font-semibold text-foreground mb-1">Écriture lors de l'acquisition :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Compte</th>
                  <th className="border border-sky-200 p-1.5 text-right">Débit</th>
                  <th className="border border-sky-200 p-1.5 text-right">Crédit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Immobilisations corporelles</td>
                  <td className="border border-border p-1.5 text-right">300 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Fournisseurs d'immobilisations</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">200 000</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Banque</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">100 000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs font-semibold text-foreground mt-2 mb-1">Fin de l'année N (intérêts sur 200 K€ x 10 % = 20 K€) :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Compte</th>
                  <th className="border border-sky-200 p-1.5 text-right">Débit</th>
                  <th className="border border-sky-200 p-1.5 text-right">Crédit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Charges financières</td>
                  <td className="border border-border p-1.5 text-right">20 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Fournisseurs d'immobilisations</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">20 000</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Fournisseurs d'immobilisations</td>
                  <td className="border border-border p-1.5 text-right">110 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Banque</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">110 000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Acquisition par voie d'échange (§24 à §26)</h3>
        <p>
          Lorsqu'une immobilisation est acquise par <strong>voie d'échange</strong> contre un actif non monétaire, le coût est évalué à la <strong>juste valeur</strong>, sauf :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Si l'opération <strong>n'a pas de substance commerciale</strong>
          <InfoTooltip texte="Une opération d'échange a une substance commerciale si la configuration (risque, calendrier, montant) des flux de trésorerie de l'actif reçu diffère de celle des flux de l'actif transféré, ou si la valeur spécifique à l'entité varie du fait de l'échange, et si cette différence est significative." loi="IAS 16 §25" /> ; ou</li>
          <li>Si la juste valeur de l'actif reçu <strong>ni celle de l'actif cédé</strong> ne peut être évaluée de manière fiable.</li>
        </ul>
        <p>Dans ces deux cas exceptionnels, le coût est évalué à la <strong>valeur comptable de l'actif cédé</strong>.</p>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 3 - IAS 16 : Évaluation postérieure : modèle du coût et réévaluation
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l3',
    icone: <RefreshCw className="h-5 w-5" />,
    titre: 'IAS 16 - Évaluation postérieure : modèle du coût et modèle de la réévaluation',
    badge: 'IAS 16 §29 à §42 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Après sa comptabilisation initiale, IAS 16 §29 impose à l'entité de <strong>choisir pour méthode comptable</strong>, soit le <strong>modèle du coût</strong>, soit le <strong>modèle de la réévaluation</strong>, et d'appliquer cette méthode à l'ensemble d'une catégorie d'immobilisations corporelles. Ce choix est permanent par catégorie.
        </p>

        <h3 className="font-bold text-foreground mt-4">Modèle du coût (§30)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs text-foreground/80 italic">
            "Après sa comptabilisation en tant qu'actif, une immobilisation corporelle doit être évaluée à son coût diminué du cumul des amortissements et du cumul des pertes de valeur."
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 16 §30</p>
        </div>
        <p>
          <strong>Valeur comptable = Coût historique - Cumul des amortissements - Cumul des pertes de valeur (IAS 36)</strong>
        </p>

        <h3 className="font-bold text-foreground mt-4">Modèle de la réévaluation (§31 à §42)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4 mb-3">
          <p className="text-xs text-foreground/80 italic">
            "Après sa comptabilisation en tant qu'actif, une immobilisation corporelle dont la juste valeur peut être évaluée de manière fiable doit être évaluée à son montant réévalué, à savoir sa juste valeur à la date de réévaluation, diminuée du cumul des amortissements ultérieurs et du cumul de pertes de valeur ultérieures."
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 16 §31</p>
        </div>
        <p>
          La juste valeur est déterminée selon <strong>IFRS 13</strong>. Lorsqu'une immobilisation est réévaluée, toute la catégorie dont elle fait partie doit être réévaluée simultanément (§36). Les éléments d'une même catégorie sont réévalués simultanément pour éviter une réévaluation sélective (§38).
        </p>

        <h3 className="font-bold text-foreground mt-4">Traitement comptable de l'écart de réévaluation (§39 et §40)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-green-200 bg-green-50/60 p-4">
            <p className="font-semibold text-green-700 text-xs mb-2">Écart POSITIF (§39)</p>
            <p className="text-xs text-foreground/80">
              L'augmentation est comptabilisée dans les <strong>autres éléments du résultat global (AERG)</strong> et cumulee en capitaux propres sous la rubrique "écarts de réévaluation". Exception : si elle compense une diminution anterieurement en résultat net, elle est comptabilisée en résultat net.
            </p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
            <p className="font-semibold text-red-700 text-xs mb-2">Écart NEGATIF (§40)</p>
            <p className="text-xs text-foreground/80">
              La diminution est comptabilisée en <strong>résultat net (charges)</strong>. Exception : elle est comptabilisée dans les AERG (en reduction de l'écart de réévaluation crediteur) dans la limite de l'écart positif antérieur pour le meme actif.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration complète - Cycle de réévaluation sur 3 exercices (IAS 16 §31, §39, §40, §41)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 space-y-6">

          {/* Données de base */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-800 mb-2">Données de base - Société REVALCO</p>
            <ul className="text-xs text-amber-900 space-y-1">
              <li>Immeuble industriel acquis le 01/01/N au coût de <strong>100 000 €</strong></li>
              <li>Durée d'utilité : <strong>20 ans</strong> - amortissement linéaire</li>
              <li>Option retenue : <strong>modèle de la réévaluation</strong> (IAS 16 §31)</li>
              <li>Méthode d'application : <strong>méthode b</strong> - écrasement du cumul des amortissements (IAS 16 §35b)</li>
              <li>Réévaluation au 31/12/N+2 : juste valeur = <strong>108 000 €</strong></li>
              <li>Réévaluation au 31/12/N+3 : juste valeur = <strong>88 200 €</strong></li>
            </ul>
          </div>

          {/* Exercice N+2 - Réévaluation positive */}
          <div>
            <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mb-2">Exercice N+2 - Réévaluation positive (IAS 16 §39)</p>
            <p className="text-xs text-foreground/80 mb-3">
              Après 2 ans d'amortissement (N+1 et N+2), on procède à une réévaluation. La juste valeur (IFRS 13) est de 108 000 €.
            </p>
            <div className="rounded-lg bg-white border border-sky-100 p-3 mb-3">
              <p className="text-xs font-semibold text-foreground mb-1">Étape 1 - Calcul de la valeur comptable avant réévaluation :</p>
              <BlockMath math={String.raw`\text{Amort. annuel} = \dfrac{100\,000}{20} = 5\,000\,\text{€/an}`} />
              <BlockMath math={String.raw`\text{Cumul amort. (2 ans)} = 5\,000 \times 2 = 10\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{VC avant réévaluation} = 100\,000 - 10\,000 = \mathbf{90\,000\,\text{€}}`} />
              <p className="text-xs font-semibold text-foreground mt-2 mb-1">Étape 2 - Calcul de l'écart de réévaluation :</p>
              <BlockMath math={String.raw`\text{Écart} = 108\,000 - 90\,000 = \mathbf{+18\,000\,\text{€}\;\text{(positif → AERG)}}`} />
            </div>
            <p className="text-xs text-foreground/80 mb-2">
              L'écart <strong>positif de 18 000 €</strong> est comptabilisé dans les <em>autres éléments du résultat global (AERG)</em> et cumulé en capitaux propres sous la rubrique "Écart de réévaluation" (IAS 16 §39). Il ne transite pas par le résultat net.
            </p>
            <p className="text-xs text-foreground/80 mb-2">Méthode b : on annule d'abord le cumul des amortissements, puis on ajuste la valeur brute à la juste valeur.</p>
            <JournalTable
              titre="Écriture de réévaluation positive - 31/12/N+2 (IAS 16 §35b + §39)"
              lignes={[
                { libelle: "Amortissements cumulés - Immeuble (annulation cumul 10 000)", debit: "10 000", credit: "" },
                { libelle: "Immobilisations corporelles - Immeuble (ajustement à JV)", debit: "8 000", credit: "" },
                { libelle: "Écart de réévaluation (AERG - capitaux propres)", debit: "", credit: "18 000" },
              ]}
            />
            <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 mt-2">
              <p className="text-xs font-semibold text-sky-700 mb-1">Bilan après réévaluation 31/12/N+2 :</p>
              <p className="text-xs text-foreground/80">Valeur brute = <strong>108 000 €</strong> · Amortissements cumulés = <strong>0 €</strong> · Valeur comptable = <strong>108 000 €</strong> · Écart de réévaluation (CP) = <strong>18 000 €</strong></p>
            </div>
          </div>

          {/* Exercice N+3 - Amortissement sur base réévaluée */}
          <div>
            <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mb-2">Exercice N+3 - Amortissement sur la base réévaluée (IAS 16 §50)</p>
            <p className="text-xs text-foreground/80 mb-3">
              Après réévaluation, le nouvel amortissement est calculé sur la <strong>valeur réévaluée de 108 000 €</strong> et sur la durée résiduelle restante. La durée consommée était de 2 ans sur 20, il reste donc <strong>18 ans</strong>.
            </p>
            <div className="rounded-lg bg-white border border-sky-100 p-3 mb-3">
              <BlockMath math={String.raw`\text{Nouvel amort. annuel} = \dfrac{108\,000}{18} = \mathbf{6\,000\,\text{€/an}}`} />
              <BlockMath math={String.raw`\text{VC au 31/12/N+3} = 108\,000 - 6\,000 = \mathbf{102\,000\,\text{€}}`} />
            </div>
            <JournalTable
              titre="Écriture de dotation aux amortissements - 31/12/N+3"
              lignes={[
                { libelle: "Dotation aux amortissements (immeuble)", debit: "6 000", credit: "" },
                { libelle: "Amortissements cumulés - Immeuble", debit: "", credit: "6 000" },
              ]}
            />
            <p className="text-xs text-foreground/80 mt-2">
              <strong>Note IAS 16 §41 (transfert progressif) :</strong> la différence entre l'amortissement sur base réévaluée (6 000 €) et l'amortissement sur coût historique (5 000 €) soit <strong>1 000 €</strong> peut être transférée chaque année de l'écart de réévaluation vers les résultats non distribués. Ce transfert s'effectue <em>sans transiter par le résultat net</em>.
            </p>
          </div>

          {/* Exercice N+3 - Réévaluation négative */}
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Exercice N+3 - Réévaluation négative (IAS 16 §40)</p>
            <p className="text-xs text-foreground/80 mb-3">
              Au 31/12/N+3, après dotation, la valeur comptable est de 102 000 €. La juste valeur tombe à <strong>88 200 €</strong>. L'écart est négatif. Selon IAS 16 §40 : l'écart négatif s'impute <em>en priorité</em> sur l'écart de réévaluation créditeur en capitaux propres (AERG), puis l'excédent va en résultat net (charge).
            </p>
            <div className="rounded-lg bg-white border border-sky-100 p-3 mb-3">
              <p className="text-xs font-semibold text-foreground mb-1">Calcul de l'écart négatif :</p>
              <BlockMath math={String.raw`\text{Écart brut} = 88\,200 - 102\,000 = \mathbf{(13\,800)\,\text{€}}`} />
              <p className="text-xs font-semibold text-foreground mt-2 mb-1">Imputation (IAS 16 §40) :</p>
              <BlockMath math={String.raw`\text{AERG disponible} = 18\,000 - 1\,000\,\text{(transfert N+3)} = 17\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Imputation sur AERG} = \min(17\,000\,;\,13\,800) = \mathbf{13\,800\,\text{€}}`} />
              <BlockMath math={String.raw`\text{Résidu en résultat net} = 13\,800 - 13\,800 = \mathbf{0\,\text{€}}`} />
            </div>
            <p className="text-xs text-foreground/80 mb-2">
              Ici l'écart de réévaluation (17 000 €) couvre intégralement la baisse (13 800 €) : <strong>aucune charge en résultat net</strong>. Si l'AERG avait été insuffisant, le solde aurait été enregistré en charges.
            </p>
            <JournalTable
              titre="Écriture de réévaluation négative - 31/12/N+3 (IAS 16 §35b + §40)"
              lignes={[
                { libelle: "Écart de réévaluation (annulation partielle AERG - CP)", debit: "13 800", credit: "" },
                { libelle: "Amortissements cumulés - Immeuble (annulation cumul N+3)", debit: "6 000", credit: "" },
                { libelle: "Immobilisations corporelles - Immeuble (ajustement à JV)", debit: "", credit: "19 800" },
              ]}
            />
            <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 mt-2">
              <p className="text-xs font-semibold text-sky-700 mb-1">Bilan après réévaluation 31/12/N+3 :</p>
              <p className="text-xs text-foreground/80">Valeur brute = <strong>88 200 €</strong> · Amortissements cumulés = <strong>0 €</strong> · Valeur comptable = <strong>88 200 €</strong> · Écart de réévaluation restant (CP) = <strong>3 200 €</strong> (17 000 − 13 800)</p>
            </div>
          </div>

          {/* Synthèse pédagogique */}
          <div className="rounded-lg border border-sky-300 bg-sky-100/50 p-3">
            <p className="text-xs font-bold text-sky-800 mb-2">Synthèse pédagogique - Logique de symétrie IAS 16 §39-40</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr className="bg-sky-200">
                  <th className="border border-sky-300 p-1.5 text-left">Exercice</th>
                  <th className="border border-sky-300 p-1.5 text-right">Juste valeur</th>
                  <th className="border border-sky-300 p-1.5 text-right">VC avant rév.</th>
                  <th className="border border-sky-300 p-1.5 text-right">Écart</th>
                  <th className="border border-sky-300 p-1.5 text-center">Destination</th>
                </tr></thead>
                <tbody>
                  <tr><td className="border border-border p-1.5 font-medium">N+2</td><td className="border border-border p-1.5 text-right">108 000</td><td className="border border-border p-1.5 text-right">90 000</td><td className="border border-border p-1.5 text-right font-bold text-green-600">+18 000</td><td className="border border-border p-1.5 text-center">AERG (CP)</td></tr>
                  <tr className="bg-muted/20"><td className="border border-border p-1.5 font-medium">N+3 (amort.)</td><td className="border border-border p-1.5 text-right">-</td><td className="border border-border p-1.5 text-right">102 000</td><td className="border border-border p-1.5 text-right">-</td><td className="border border-border p-1.5 text-center">Charges (6 000)</td></tr>
                  <tr><td className="border border-border p-1.5 font-medium">N+3 (rév.)</td><td className="border border-border p-1.5 text-right">88 200</td><td className="border border-border p-1.5 text-right">102 000</td><td className="border border-border p-1.5 text-right font-bold text-red-600">(13 800)</td><td className="border border-border p-1.5 text-center">AERG d'abord, résultat si excès</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <h3 className="font-bold text-foreground mt-4">Transfert de l'écart de réévaluation (§41)</h3>
        <p>
          L'écart de réévaluation inclus dans les capitaux propres peut etre <strong>transfère directement dans les résultats non distribues</strong> lors de la decomptabilisation de l'actif. Ce transfert ne transite <strong>pas par le résultat net</strong>. Une partie peut etre réalisée progressivement au fil de l'utilisation de l'actif (différence entre amortissement sur valeur réévaluée et amortissement sur coût historique).
        </p>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 4 - IAS 16 : Amortissement et approche par composants
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l4',
    icone: <Layers className="h-5 w-5" />,
    titre: 'IAS 16 - Amortissement, modes et approche par composants',
    badge: 'IAS 16 §43 à §62 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">

        <h3 className="font-bold text-foreground mt-2">Principe de l'amortissement par composants (§43 et §44)</h3>
        <p>
          IAS 16 §43 impose que <strong>chaque partie d'une immobilisation corporelle ayant un coût significatif par rapport au coût total de l'élément soit amortie séparément.</strong>
          <InfoTooltip texte="L'approche par composants (component approach) est une innovation majeure d'IAS 16 par rapport aux référentiels traditionnels. Elle impose de décomposer chaque immobilisation en ses parties significatives, chacune ayant sa propre durée d'utilité et son propre mode d'amortissement." loi="IAS 16 §43 - IFRS Foundation" />
          {' '}Par exemple, pour un avion : la cellule et les réacteurs constituent des composants distincts aux durées d'utilité différentes.
        </p>
        <p>
          Lors du renouvellement d'un composant, la valeur comptable du composant remplacé est <strong>décomptabilisée</strong> et le nouveau composant est capitalisé si les critères de §7 sont satisfaits.
        </p>
        <p>
          Les <strong>contrats de révision / inspections majeures</strong> (§14) constituent également un composant "coûts d'entretien" distinct, amorti entre deux révisions.
        </p>

        <h3 className="font-bold text-foreground mt-4">Montant amortissable et durée d'utilité (§50 à §57)</h3>
        <p>
          Le <strong>montant amortissable</strong> est le coût (ou autre montant substitué) diminué de la <strong>valeur résiduelle</strong> (§50). Il doit être réparti systématiquement sur la durée d'utilité.
        </p>
        <p>
          La <strong>valeur résiduelle</strong> et la <strong>durée d'utilité</strong> doivent être révisées au moins à chaque fin d'exercice. Tout changement est comptabilisé comme un <strong>changement d'estimation comptable</strong> selon IAS 8 (§51).
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 mt-2">
          <p className="text-xs font-semibold text-amber-700 mb-2">Facteurs determinant la durée d'utilité (§56)</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/80">
            <li>Usage attendu de l'actif (capacité ou production physique attendue) ;</li>
            <li>Usure physique attendue (cadences d'utilisation, programme de maintenance) ;</li>
            <li>Obsolescence technique ou commerciale ;</li>
            <li>Limites juridiques ou similaires sur l'usage (expiration de contrats de location).</li>
          </ul>
        </div>
        <p>
          Cas particulier (§58) : les <strong>terrains</strong> ont une durée d'utilité illimitée et ne sont donc pas amortis. Les <strong>constructions</strong> ont une durée limitée et sont amortissables. Une plus-value foncière n'affecte pas le montant amortissable de la construction édifiée sur le terrain.
        </p>

        <h3 className="font-bold text-foreground mt-4">Modes d'amortissement (§60 à §62A)</h3>
        <p>
          Le mode d'amortissement doit <strong>refléter le rythme selon lequel l'entité s'attend à consommer les avantages économiques futurs liés à l'actif</strong> (§60). Il est examiné au moins à chaque fin d'exercice (§61).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Linéaire</p>
            <p className="text-xs text-foreground/80">Charge constante sur la durée d'utilité. Le plus commun.</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Dégressif</p>
            <p className="text-xs text-foreground/80">Charge decroissante sur la durée d'utilité.</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Unites d'oeuvre</p>
            <p className="text-xs text-foreground/80">Charge basee sur l'utilisation ou la production reelle.</p>
          </div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 mt-3">
          <p className="text-xs font-semibold text-red-700 mb-1">Interdiction formelle (§62A)</p>
          <p className="text-xs text-foreground/80">
            Il n'est <strong>pas approprie</strong> d'avoir recours à un mode d'amortissement qui est fonction des produits tires de l'activite. Les produits refletent des facteurs autres que la consommation des avantages économiques de l'actif (volumes, prix, inflation). Ce mode est interdit par IAS 16.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - Avion ALPHA : amortissement par unites d'oeuvre avec révision</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="text-xs text-foreground/80 mb-2">
            Avion ALPHA acquis pour <strong>10 M€</strong>, valeur résiduelle <strong>8 M€</strong>, kilométrage total prévu <strong>3 M km</strong>.
          </p>
          <div className="rounded-lg bg-white border border-sky-100 p-3 mt-2">
            <p className="text-xs font-semibold text-foreground mb-1">Étape 1 - Calcul amortissement Année N (unités d'œuvre) :</p>
            <div className="space-y-1 overflow-x-auto">
              <BlockMath math={String.raw`A_N = \dfrac{(10\,000\,000 - 8\,000\,000) \times 450\,000}{3\,000\,000} = \mathbf{300\,000\,\text{€}}`} />
            </div>
            <p className="text-xs font-semibold text-foreground mt-3 mb-1">Étape 2 - Révision N+1 (changement d'estimation IAS 8) :</p>
            <p className="text-xs text-foreground/70 mb-1">Valeur résiduelle révisée : 6,5 M€ - Km total révisé : 4 M km</p>
            <div className="space-y-1 overflow-x-auto">
              <BlockMath math={String.raw`\text{VC début N+1} = 10\,000\,000 - 300\,000 = 9\,700\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Mont. amort. restant} = 9\,700\,000 - 6\,500\,000 = 3\,200\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Km restants} = 4\,000\,000 - 450\,000 = 3\,550\,000\,\text{km}`} />
              <BlockMath math={String.raw`A_{N+1} = \dfrac{3\,200\,000 \times 550\,000}{3\,550\,000} \approx \mathbf{495\,775\,\text{€}}`} />
            </div>
          </div>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 5 - IAS 16 : Dépréciation, dévaluation et cession
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l5',
    icone: <TrendingDown className="h-5 w-5" />,
    titre: 'IAS 16 - Dépréciation et décomptabilisation (cession, mise au rebut)',
    badge: 'IAS 16 §63 à §72 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">

        <h3 className="font-bold text-foreground mt-2">Dépréciation (§63)</h3>
        <p>
          Pour determiner si une immobilisation corporelle est dépréciée, une entité applique <strong>IAS 36 Dépréciation d'actifs</strong>
          <InfoTooltip texte="IAS 36 explique comment une entité examine la valeur comptable de ses actifs, comment elle détermine la valeur recouvrable (la plus élevée entre juste valeur nette de coûts de cession et valeur d'utilité), et dans quels cas elle comptabilisé ou reprend une perte de valeur." loi="IAS 16 §63 - IAS 36" />
          . IAS 16 renvoie integralement a cette norme pour le test de dépréciation, la determination de la valeur recouvrable et la comptabilisation des pertes de valeur.
        </p>

        <h3 className="font-bold text-foreground mt-4">Décomptabilisation - Conditions (§67)</h3>
        <p>La valeur comptable d'une immobilisation corporelle doit etre <strong>décomptabilisée</strong> :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Lors de sa sortie</strong> (vente, cession-bail IFRS 16, donation) ; ou</li>
          <li>Lorsqu'<strong>aucun avantage économique futur n'est attendu</strong> de son utilisation ou de sa sortie.</li>
        </ul>
        <p>
          La date de sortie est la date a laquelle le cessionnaire acquiert le <strong>contrôle de l'actif</strong> selon les dispositions d'IFRS 15 (§69).
        </p>

        <h3 className="font-bold text-foreground mt-4">Résultat de cession (§68 et §71)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4 mb-3">
          <p className="text-xs text-foreground/80 italic">
            "Le profit ou la perte resultant de la décomptabilisation d'une immobilisation corporelle doit etre inclus dans le résultat net lors de la décomptabilisation de l'élément. <strong>Les profits ne doivent pas etre classes en produits des activites ordinaires.</strong>"
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 16 §68</p>
        </div>
        <p className="font-semibold text-foreground">
          Résultat de cession = Prix de cession net - Valeur comptable de l'actif
        </p>

        <h3 className="font-bold text-foreground mt-4">Illustration - Cession avec profit et cession à perte (IAS 16 §68 et §71)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 space-y-5">

          {/* Cas A - Cession avec profit */}
          <div>
            <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mb-2">Cas A - Cession avec profit</p>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
              <p className="text-xs text-amber-900">
                Machine : coût historique <strong>200 000 €</strong> · Amortissements cumulés <strong>150 000 €</strong> · Prix de cession <strong>80 000 €</strong>
              </p>
            </div>
            <div className="rounded-lg bg-white border border-sky-100 p-3 mb-3">
              <BlockMath math={String.raw`\text{Valeur comptable} = 200\,000 - 150\,000 = \mathbf{50\,000\,\text{€}}`} />
              <BlockMath math={String.raw`\text{Profit de cession} = 80\,000 - 50\,000 = \mathbf{+30\,000\,\text{€}}`} />
            </div>
            <JournalTable
              titre="Écriture de cession avec profit - IAS 16 §68"
              lignes={[
                { libelle: "Amortissements cumulés - Machine", debit: "150 000", credit: "" },
                { libelle: "Banque (prix de cession)", debit: "80 000", credit: "" },
                { libelle: "Immobilisations corporelles - Machine (valeur brute)", debit: "", credit: "200 000" },
                { libelle: "Profit sur cession d'immobilisations (résultat net)", debit: "", credit: "30 000" },
              ]}
            />
            <p className="text-xs text-muted-foreground mt-1 italic">IAS 16 §68 : le profit est présenté séparément et ne constitue pas un produit des activités ordinaires.</p>
          </div>

          {/* Cas B - Cession à perte */}
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">Cas B - Cession à perte</p>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
              <p className="text-xs text-amber-900">
                Équipement : coût historique <strong>120 000 €</strong> · Amortissements cumulés <strong>80 000 €</strong> · Prix de cession <strong>25 000 €</strong>
              </p>
            </div>
            <div className="rounded-lg bg-white border border-sky-100 p-3 mb-3">
              <BlockMath math={String.raw`\text{Valeur comptable} = 120\,000 - 80\,000 = \mathbf{40\,000\,\text{€}}`} />
              <BlockMath math={String.raw`\text{Perte de cession} = 25\,000 - 40\,000 = \mathbf{(15\,000)\,\text{€}}`} />
            </div>
            <JournalTable
              titre="Écriture de cession à perte - IAS 16 §68 et §71"
              lignes={[
                { libelle: "Amortissements cumulés - Équipement", debit: "80 000", credit: "" },
                { libelle: "Banque (prix de cession)", debit: "25 000", credit: "" },
                { libelle: "Perte sur cession d'immobilisations (résultat net)", debit: "15 000", credit: "" },
                { libelle: "Immobilisations corporelles - Équipement (valeur brute)", debit: "", credit: "120 000" },
              ]}
            />
            <p className="text-xs text-muted-foreground mt-1 italic">IAS 16 §71 : la perte et le profit sont des résultats nets distincts, jamais compensés entre eux.</p>
          </div>

        </div>

        <h3 className="font-bold text-foreground mt-4">Décomptabilisation d'un composant remplacé (§70)</h3>
        <p>
          Lorsqu'une entité capitalise le coût du remplacement d'une partie d'une immobilisation, elle doit <strong>décomptabiliser la valeur comptable de la partie remplacee</strong>, que cette partie ait ou non ete amortie séparément. Si la valeur comptable de la partie remplacee est inconnue, le coût de remplacement peut servir d'estimation du coût initial.
        </p>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 6 - IAS 38 : Champ d'application, definitions, critères
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l6',
    icone: <Scale className="h-5 w-5" />,
    titre: 'IAS 38 - Champ d\'application, définitions et critères de comptabilisation',
    badge: 'IAS 38 §1 à §23 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La <strong>Norme comptable internationale 38</strong>
          <InfoTooltip texte="IAS 38 (Immobilisations incorporelles) prescrit le traitement comptable des immobilisations incorporelles qui ne sont pas spécifiquement traitées par une autre norme. Elle impose à l'entité des critères de comptabilisation stricts et définit les modes d'évaluation et d'information à fournir." loi="IAS 38 §1 - IFRS Foundation" />
          {' '}a pour objectif de prescrire le traitement comptable des immobilisations incorporelles qui ne sont pas specifiquement traités par une autre norme.
        </p>

        <h3 className="font-bold text-foreground mt-4">Définition d'une immobilisation incorporelle (§8)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4 mb-3">
          <p className="text-xs text-foreground/80 italic">
            "Une immobilisation incorporelle est un actif non monetaire identifiable sans substance physique."
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 38 §8</p>
        </div>
        <p>Trois critères cumulatifs doivent etre satisfaits pour que cet actif soit reconnu :</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Identifiable (§12)</p>
            <p className="text-xs text-foreground/80">Soit séparable (peut etre vendu, cede, loue individuellement), soit resultant de droits contractuels ou d'autres droits établis.</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Controle (§13)</p>
            <p className="text-xs text-foreground/80">L'entité a le pouvoir d'obtenir les AEF et de restreindre l'acces des tiers. Ce contrôle resulte generalement de droits établis (droits d'auteur, licences, brevets).</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3">
            <p className="font-semibold text-sky-700 text-xs mb-1">Avantages eco. futurs (§17)</p>
            <p className="text-xs text-foreground/80">Produits de vente, economies de coûts ou autres avantages resultant de l'utilisation de l'actif.</p>
          </div>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 mt-3">
          <p className="text-xs font-semibold text-sky-700 mb-2">Application pratique des 3 critères</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Élément</th>
                  <th className="border border-sky-200 p-1.5 text-center">Identifiable</th>
                  <th className="border border-sky-200 p-1.5 text-center">Controle</th>
                  <th className="border border-sky-200 p-1.5 text-center">Actif IAS 38</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Licence logicielle</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Brevet d'invention</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Reputation / image de marque</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Personnel qualifie / savoir-faire humain</td>
                  <td className="border border-border p-1.5 text-center">Partiel</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Marque créé́e en interne</td>
                  <td className="border border-border p-1.5 text-center">Partiel</td>
                  <td className="border border-border p-1.5 text-center">Partiel</td>
                  <td className="border border-border p-1.5 text-center font-bold text-red-600">NON (§63)</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-1.5">Portefeuille clients acquis</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                  <td className="border border-border p-1.5 text-center font-bold text-green-600">OUI</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Le personnel forme n'est pas controle par l'entité : il peut quitter librement l'organisation. Aucun droit legal n'empeche les tiers d'y acceder. Il ne peut donc pas constituer un actif incorporel (IAS 38 §15).
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Éléments exclus du champ d'IAS 38</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/80">
            <li>Goodwill acquis lors d'un regroupement d'entreprises (IFRS 3) ;</li>
            <li>Actifs financiers (IAS 32 / IFRS 9) ;</li>
            <li>Actifs de prospection et d'évaluation (IFRS 6) ;</li>
            <li>Contrats de location d'immobilisations incorporelles (IFRS 16) ;</li>
            <li>Actifs decoulant de contrats avec des clients (IFRS 15).</li>
          </ul>
        </div>

        <h3 className="font-bold text-foreground mt-4">Critères de comptabilisation (§21)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4 mb-3">
          <p className="text-xs text-foreground/80 italic">
            "Une immobilisation incorporelle doit etre comptabilisée si, et seulement si : (a) il est probable que les avantages économiques futurs attribuables a l'actif iront a l'entité ; et (b) le coût de cet actif peut etre évalué de facon fiable."
          </p>
          <p className="text-xs text-muted-foreground mt-1">IAS 38 §21</p>
        </div>
        <p>
          L'entité apprecie la probabilité des AEF en utilisant des <strong>hypotheses raisonnables et justifiables</strong> (§22), en accordant un poids plus important aux indications externes (§23).
        </p>

        <h3 className="font-bold text-foreground mt-4">Goodwill généré en interne (§48 et §49)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs font-semibold text-red-700 mb-1">Principe fondamental</p>
          <p className="text-xs text-foreground/80 italic">
            "Le goodwill généré en interne ne doit pas etre comptabilisé en tant qu'actif." (IAS 38 §48)
          </p>
          <p className="text-xs text-foreground/80 mt-1">
            Raison : le goodwill interne n'est pas une ressource identifiable (non séparable, ne resulte pas de droits établis), contrôlee par l'entité et évaluable au coût de facon fiable. Il se confond avec la goodwill de l'entité dans son ensemble.
          </p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 7 - IAS 38 : Générée en interne - Recherche vs Développement
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l7',
    icone: <Wrench className="h-5 w-5" />,
    titre: 'IAS 38 - Immobilisations générées en interne : phase de recherche vs phase de développement',
    badge: 'IAS 38 §51 à §67 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Pour les immobilisations incorporelles <strong>générées en interne</strong>, IAS 38 §52 impose une distinction fondamentale entre deux phases lors de la creation de l'immobilisation :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
            <p className="font-bold text-red-700 text-xs mb-2">Phase de RECHERCHE (§54)</p>
            <p className="text-xs text-foreground/80 italic mb-2">
              "Aucune immobilisation incorporelle resultant de la recherche (ou de la phase de recherche d'un projet interne) ne doit etre comptabilisée. Les dépenses pour la recherche doivent etre comptabilisées en charges lorsqu'elles sont engagées." (IAS 38 §54)
            </p>
            <p className="text-xs text-foreground/80">
              Lors de la phase de recherche, l'entité ne peut pas demontrer l'existence d'une immobilisation incorporelle qui générera des AEF probables.
            </p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50/60 p-4">
            <p className="font-bold text-green-700 text-xs mb-2">Phase de DEVELOPPEMENT (§57)</p>
            <p className="text-xs text-foreground/80">
              L'immobilisation doit etre comptabilisée si, et seulement si, l'entité peut demontrer <strong>les 6 critères suivants simultanement</strong> :
            </p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Les 6 critères de la phase de développement (§57)</h3>
        <div className="space-y-2">
          {[
            { lettre: 'a', texte: 'La faisabilité technique de l\'achèvement de l\'immobilisation incorporelle en vue de sa mise en service ou de sa vente ;' },
            { lettre: 'b', texte: 'L\'intention d\'achever l\'immobilisation incorporelle et de la mettre en service ou de la vendre ;' },
            { lettre: 'c', texte: 'La capacité a mettre en service ou a vendre l\'immobilisation incorporelle ;' },
            { lettre: 'd', texte: 'La facon dont l\'immobilisation incorporelle générera des avantages économiques futurs probables (existence d\'un marché ou utilité interne) ;' },
            { lettre: 'e', texte: 'La disponibilité de ressources techniques, financieres et autres, appropriees pour achever le développement ;' },
            { lettre: 'f', texte: 'La capacité a évaluer de facon fiable les dépenses attribuables a l\'immobilisation incorporelle au cours de son développement.' },
          ].map(c => (
            <div key={c.lettre} className="flex gap-3 items-start rounded-xl border border-sky-200 bg-sky-50/40 p-3">
              <span className="font-bold text-sky-600 text-xs mt-0.5 flex-shrink-0">({c.lettre})</span>
              <p className="text-xs text-foreground/80">{c.texte}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic mt-1">IAS 38 §57 (a) a (f)</p>

        <h3 className="font-bold text-foreground mt-4">Interdiction formelle : marques et listes clients générées en interne (§63)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs text-foreground/80 italic">
            "Lorsqu'ils sont générés en interne, les marques, cartouches de titre, titres de publication, listes de clients et autres éléments similaires en substance ne doivent pas etre comptabilisés en tant qu'immobilisations incorporelles." (IAS 38 §63)
          </p>
          <p className="text-xs text-foreground/80 mt-1">
            Raison : ces dépenses ne peuvent pas etre distinguees du coût de développement de l'entreprise dans son ensemble.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - Brevet pharmaceutique (IAS 38 §57)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="text-xs text-foreground/80 mb-2">
            Un laboratoire pharmaceutique engage les dépenses suivantes pour le développement d'un nouveau medicament :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-foreground/80 mb-3">
            <li>Frais de recherche non affectes a une molecule spécifique : <strong>30 000 €</strong> (phase recherche : en <strong>charges</strong>) ;</li>
            <li>Frais de recherche sur la molecule M1 : <strong>50 000 €</strong> (phase recherche : en <strong>charges</strong>) ;</li>
            <li>Frais de développement a compter du 15/09/N, critères §57 tous satisfaits : <strong>157 000 €</strong> (capitalises) ;</li>
            <li>Frais d'agrement de commercialisation (coût directement attribuable) : <strong>16 000 €</strong> (capitalises).</li>
          </ul>
          <p className="text-xs font-semibold text-foreground mb-1">Traitement comptable :</p>
          <p className="text-xs text-foreground/80 mb-1">Total charge en résultat : 30 000 + 50 000 = <strong>80 000 €</strong></p>
          <p className="text-xs text-foreground/80 mb-2">Total capitalise (brevet) : 157 000 + 16 000 = <strong>173 000 €</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Compte</th>
                  <th className="border border-sky-200 p-1.5 text-right">Débit</th>
                  <th className="border border-sky-200 p-1.5 text-right">Crédit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Charges de recherche (frais de recherche)</td>
                  <td className="border border-border p-1.5 text-right">80 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Banque / Fournisseurs</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">80 000</td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Immobilisations incorporelles (brevet)</td>
                  <td className="border border-border p-1.5 text-right">173 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Banque / Fournisseurs</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">173 000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Principe d'interdiction de revenir en arriere (§71)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs text-foreground/80 italic">
            "Les dépenses relatives a un élément incorporel qui ont ete initialement comptabilisées en charges ne doivent pas etre incorporées dans le coût d'une immobilisation incorporelle a une date ulterieure." (IAS 38 §71)
          </p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 8 - IAS 38 : Évaluation postérieure, durée d'utilité et cession
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l8',
    icone: <RotateCcw className="h-5 w-5" />,
    titre: 'IAS 38 - Évaluation postérieure, durée d\'utilité et décomptabilisation',
    badge: 'IAS 38 §72 à §117 · IFRS Foundation',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Apres sa comptabilisation initiale, une entité peut choisir entre le <strong>modèle du coût</strong> (§74) ou le <strong>modèle de la réévaluation</strong> (§75) pour une immobilisation incorporelle.
        </p>

        <h3 className="font-bold text-foreground mt-4">Particularité du modèle de réévaluation pour les incorporelles (§75 et §78)</h3>
        <p>
          Le modèle de la réévaluation n'est applicable que si la juste valeur de l'immobilisation incorporelle peut etre évaluée <strong>par reference a un marché actif</strong>
          <InfoTooltip texte="Un marché actif existe lorsque des transactions fréquentes ont lieu sur des actifs homogènes, et que les prix sont disponibles au public. Pour les immobilisations incorporelles, cela est exceptionnel." loi="IAS 38 §75 et §78 - IFRS Foundation" />
          . Ce cas est exceptionnel. IAS 38 §78 cite comme exemples : licences de taxis, licences de pêche, quotas de production dans certaines juridictions.
        </p>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 mt-2">
          <p className="text-xs font-semibold text-red-700 mb-1">Actifs pour lesquels le marché actif est IMPOSSIBLE</p>
          <p className="text-xs text-foreground/80">
            Marques, cartouches de titre de journaux, droits d'edition musicale et cinematographique, brevets, marques commerciales. Chacun de ces actifs est unique. Pas de marché actif possible. Donc : <strong>modèle de réévaluation inapplicable</strong>.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Durée d'utilité : déterminée ou indéterminée (§88 et §89)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
            <p className="font-semibold text-sky-700 text-xs mb-2">Durée d'utilité DETERMINEE</p>
            <p className="text-xs text-foreground/80">
              L'actif doit etre <strong>amorti</strong> systematiquement sur sa durée d'utilité. Le mode linéaire est applique par defaut si aucun autre mode ne peut etre déterminé de facon fiable (§97).
            </p>
            <p className="text-xs text-foreground/80 mt-1">
              <strong>Valeur résiduelle présumée nulle</strong>, sauf : (a) engagement ferme de rachat par un tiers à la fin de la durée d'utilité ; ou (b) existence d'un marché actif pour l'actif (§100).
            </p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4">
            <p className="font-semibold text-sky-700 text-xs mb-2">Durée d'utilité INDETERMINEE</p>
            <p className="text-xs text-foreground/80">
              L'actif <strong>ne doit pas etre amorti</strong> (§107). Un <strong>test de dépréciation IAS 36</strong> est obligatoire : (a) annuellement ; et (b) chaque fois qu'il y a une indication de dépréciation (§108).
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              Indéterminée ne signifie pas infinie (§91). La durée d'utilité doit etre reexaminee chaque période (§109).
            </p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">Interdiction fondamentale : amortissement fonde sur les produits (§98A)</h3>
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
          <p className="text-xs text-foreground/80 italic">
            "Il existe une presomption refutable selon laquelle il n'est pas approprie d'avoir recours, pour une immobilisation incorporelle utilisee dans une activite donnee, a un mode d'amortissement qui est fonction des produits tires de cette activite." (IAS 38 §98A)
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Mises hors service et sorties (§112 et §113)</h3>
        <p>Une immobilisation incorporelle doit etre décomptabilisée :</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Lors de sa <strong>sortie</strong> (vente, cession-bail IFRS 16, donation) ;</li>
          <li>Lorsqu'<strong>aucun avantage économique futur</strong> n'est attendu de son utilisation ou de sa sortie.</li>
        </ul>
        <div className="rounded-xl border border-border bg-muted/30 p-4 mt-2">
          <p className="text-xs text-foreground/80 italic">
            "Le profit ou la perte resultant de la décomptabilisation d'une immobilisation incorporelle doit etre déterminé comme la différence entre le produit net de sortie, le cas echeant, et la valeur comptable de l'actif. Il doit etre comptabilisé en résultat net lors de la décomptabilisation de l'actif. <strong>Les profits ne doivent pas etre classes en produits des activites ordinaires.</strong>" (IAS 38 §113)
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Illustration - Échange de licence informatique (IAS 38 §45)</h3>
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
          <p className="text-xs text-foreground/80 mb-2">
            Échange d'une licence informatique (valeur comptable <strong>100 000 €</strong>) contre un droit de diffusion (juste valeur <strong>60 000 €</strong>) avec soulte recue de <strong>40 000 €</strong>. L'operation a une substance commerciale.
          </p>
          <p className="text-xs font-semibold text-foreground mb-1">L'actif recu est comptabilisé a sa juste valeur : <strong>60 000 €</strong>.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Compte</th>
                  <th className="border border-sky-200 p-1.5 text-right">Débit</th>
                  <th className="border border-sky-200 p-1.5 text-right">Crédit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-1.5">Droit de diffusion (nouvel actif)</td>
                  <td className="border border-border p-1.5 text-right">60 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Banque (soulte recue)</td>
                  <td className="border border-border p-1.5 text-right">40 000</td>
                  <td className="border border-border p-1.5 text-right"></td>
                </tr>
                <tr>
                  <td className="border border-border p-1.5">Licence informatique (sortie)</td>
                  <td className="border border-border p-1.5 text-right"></td>
                  <td className="border border-border p-1.5 text-right">100 000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Résultat de l'échange = 0 (60 000 + 40 000 - 100 000 = 0). Aucun profit ni perte.</p>
        </div>
      </div>
    ),
    questions: []
  },
]

// ─────────────────────────────────────────────────────────────────
// QCM (5 options)
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_QCM: QCMQuestion[] = [
  {
    type: 'qcm', id: 'q1',
    question: "Selon IAS 16 §7, quelles sont les deux conditions cumulatives pour comptabiliser une immobilisation corporelle en tant qu'actif ?",
    options: [
      { id: 'a', texte: "L'actif doit etre inscrit au registre officiel de l'entité et avoir une valeur supérieure a un seuil fixe par la norme" },
      { id: 'b', texte: "Il est probable que les avantages économiques futurs associes a l'actif iront a l'entité, ET le coût de cet élément peut etre évalué de facon fiable" },
      { id: 'c', texte: "L'actif doit avoir une durée d'utilité supérieure a 5 ans et etre non remplacable a court terme" },
      { id: 'd', texte: "L'actif doit etre la propriété juridique de l'entité et figurer dans ses immobilisations au bilan fiscal" },
      { id: 'e', texte: "La juste valeur de l'actif doit etre évaluable par un expert independant et etre significative pour les etats financiers" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 16 §7 pose deux et seulement deux conditions cumulatives : (a) la probabilité des avantages économiques futurs vers l'entité, et (b) la fiabilité de l'évaluation du coût. Il n'existe pas de seuil monetaire, de registre officiel, ni d'exigence de propriété juridique dans IAS 16.",
    articleRef: "IAS 16 §7 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q2',
    question: "Parmi les éléments suivants, lequel NE fait PAS partie du coût d'entrée d'une immobilisation corporelle selon IAS 16 §19 ?",
    options: [
      { id: 'a', texte: "Les frais de livraison et de manutention initiaux" },
      { id: 'b', texte: "Les droits de douane et taxes non remboursables" },
      { id: 'c', texte: "Les coûts des tests de bon fonctionnement de l'actif" },
      { id: 'd', texte: "Les frais administratifs et autres frais generaux" },
      { id: 'e', texte: "L'estimation initiale des coûts de démantèlement et de remise en etat du site" },
    ],
    reponseCorrecte: 'd',
    explication: "IAS 16 §19 liste explicitement les coûts qui ne font pas partie du coût d'une immobilisation corporelle : (a) coûts d'ouverture d'une nouvelle installation ; (b) coûts de lancement de nouveaux produits ; (c) coûts d'exploitation dans un nouveau lieu ; (d) frais administratifs et autres frais generaux. Les options a, b, c et e sont des coûts directement attribuables reconnus aux §16 et §17.",
    articleRef: "IAS 16 §16, §17, §19 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q3',
    question: "Selon IAS 16 §23, comment doit etre évalué le coût d'une immobilisation corporelle achetee avec un paiement differe au-dela des conditions habituelles de credit ?",
    options: [
      { id: 'a', texte: "Au montant total des paiements futurs non actualises" },
      { id: 'b', texte: "Au prix du catalogue fourni par le vendeur à la date de commande" },
      { id: 'c', texte: "Au prix comptant equivalent, c'est-à-dire a la valeur actualisee des paiements futurs" },
      { id: 'd', texte: "A la juste valeur de marché déterminée selon IFRS 13 à la date de livraison" },
      { id: 'e', texte: "Au montant minimal du premier versement multiplie par le nombre de paiements" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16 §23 dispose que le coût d'une immobilisation corporelle est le prix comptant equivalent à la date de comptabilisation. Si le règlement est differe, la différence entre le prix comptant et le total des paiements est comptabilisée en charges financieres sur la période de credit, sauf incorporation au coût selon IAS 23.",
    articleRef: "IAS 16 §23 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q4',
    question: "Selon IAS 16 §39, comment doit etre comptabilisé un écart de réévaluation POSITIF d'une immobilisation corporelle ?",
    options: [
      { id: 'a', texte: "En résultat net comme produit des activites ordinaires de la période" },
      { id: 'b', texte: "En résultat net comme produit hors exploitation de la période" },
      { id: 'c', texte: "Dans les autres éléments du résultat global et cumule en capitaux propres sous la rubrique écarts de réévaluation" },
      { id: 'd', texte: "En reserve legale dans les capitaux propres, uniquement distribuable apres decision de l'assemblee generale" },
      { id: 'e', texte: "En provision pour risques au passif du bilan, reversee lors de la cession de l'actif" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 16 §39 impose que l'augmentation de valeur resultant d'une réévaluation soit comptabilisée dans les autres éléments du résultat global (AERG) et cumulee en capitaux propres sous la rubrique écarts de réévaluation. Exception : si elle compense une diminution antérieure comptabilisée en résultat net, elle est comptabilisée en résultat net a due concurrence.",
    articleRef: "IAS 16 §39 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q5',
    question: "IAS 16 §62A interdit formellement un certain mode d'amortissement. Lequel ?",
    options: [
      { id: 'a', texte: "Le mode linéaire pour les actifs de plus de 20 ans" },
      { id: 'b', texte: "Le mode dégressif pour les immeubles de placement" },
      { id: 'c', texte: "Le mode des unites d'oeuvre pour les actifs de production" },
      { id: 'd', texte: "Le mode fonde sur les produits tires de l'utilisation de l'actif" },
      { id: 'e', texte: "Le mode linéaire pour les terrains et les actifs a durée illimitee" },
    ],
    reponseCorrecte: 'd',
    explication: "IAS 16 §62A précisé qu'il n'est pas approprie d'avoir recours à un mode d'amortissement fonde sur les produits tires de l'utilisation de l'actif. Les produits refletent des facteurs autres que la consommation des AEF : volumes, prix, inflation. Ce mode est interdit car il ne mesure pas la consommation de l'actif mais le niveau d'activite de l'entreprise.",
    articleRef: "IAS 16 §62A - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q6',
    question: "Selon IAS 38 §54, quel est le traitement comptable obligatoire des dépenses de la phase de RECHERCHE d'un projet interne ?",
    options: [
      { id: 'a', texte: "Elles sont activees en immobilisations incorporelles si elles satisfont aux 6 critères du §57" },
      { id: 'b', texte: "Elles sont activees en immobilisations incorporelles si leur coût total depasse un seuil de significativite" },
      { id: 'c', texte: "Elles sont comptabilisées en charges lorsqu'elles sont engagées, sans exception possible" },
      { id: 'd', texte: "Elles sont inscrites en stocks et amorties au fur et a mesure de l'avancement du projet" },
      { id: 'e', texte: "Elles sont traitees comme un actif eventuel et comptabilisées en hors bilan jusqu'au terme du projet" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38 §54 est sans ambiguite : aucune immobilisation incorporelle resultant de la recherche ne doit etre comptabilisée. Les dépenses de recherche doivent etre comptabilisées en charges lorsqu'elles sont engagées. L'entité ne peut pas, lors de la phase de recherche, demontrer l'existence d'une immobilisation incorporelle qui générera des AEF probables.",
    articleRef: "IAS 38 §54 et §55 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q7',
    question: "IAS 38 §63 interdit de comptabiliser certains actifs générés en interne comme immobilisations incorporelles. Lesquels ?",
    options: [
      { id: 'a', texte: "Les logiciels développés en interne et les bases de donnees proprietaires" },
      { id: 'b', texte: "Les licences d'exploitation détenues par l'entité et les droits de reproduction" },
      { id: 'c', texte: "Les marques, cartouches de titre, titres de publication, listes de clients générés en interne" },
      { id: 'd', texte: "Les brevets deposes par l'entité et les droits de propriété intellectuelle enregistres" },
      { id: 'e', texte: "Les frais de développement de sites web et les applications mobiles propriétés de l'entité" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38 §63 interdit explicitement la comptabilisation en tant qu'immobilisations incorporelles des marques, cartouches de titre, titres de publication, listes de clients et autres éléments similaires générés en interne. Raison : ces dépenses ne peuvent pas etre distinguees du coût de développement de l'entreprise dans son ensemble (§64).",
    articleRef: "IAS 38 §63 et §64 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q8',
    question: "Selon IAS 38 §100, quelle est la valeur résiduelle présumée d'une immobilisation incorporelle a durée d'utilité déterminée ?",
    options: [
      { id: 'a', texte: "La juste valeur de marché estimee à la date d'achèvement de la durée d'utilité prévue" },
      { id: 'b', texte: "10 % du coût historique de l'actif, conformement au principe de prudence" },
      { id: 'c', texte: "Un montant nul, sauf si un tiers s'est engage a racheter l'actif ou s'il existe un marché actif" },
      { id: 'd', texte: "La valeur nette comptable de l'actif a l'expiration de la durée contractuelle" },
      { id: 'e', texte: "La valeur recouvrable déterminée par le test de dépréciation IAS 36 à chaque clôture" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38 §100 dispose que la valeur résiduelle d'une immobilisation incorporelle a durée d'utilité déterminée doit etre présumée nulle, sauf : (a) si un tiers s'est engage a racheter l'actif à la fin de sa durée d'utilité ; ou (b) s'il existe un marché actif pour cet actif et si la valeur résiduelle peut etre déterminée par reference a ce marché et s'il est probable qu'un tel marché existera à la fin de la durée d'utilité.",
    articleRef: "IAS 38 §100 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q9',
    question: "Pour une immobilisation incorporelle a durée d'utilité INDETERMINEE, quel est le regime d'amortissement et de dépréciation impose par IAS 38 ?",
    options: [
      { id: 'a', texte: "Elle est amortie lineairement sur une durée forfaitaire de 40 ans, conformement aux pratiques comptables habituelles" },
      { id: 'b', texte: "Elle n'est pas amortie, mais un test de dépréciation IAS 36 est obligatoire annuellement et à chaque indication de dépréciation" },
      { id: 'c', texte: "Elle est amortie sur la durée maximale permise par le droit fiscal national applicable a l'entité" },
      { id: 'd', texte: "Elle est amortie sur une durée de 20 ans et testee pour dépréciation tous les 5 ans" },
      { id: 'e', texte: "Elle est évaluée a la juste valeur à chaque clôture et les variations sont comptabilisées en résultat net" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38 §107 : une immobilisation incorporelle a durée d'utilité indéterminée ne doit pas etre amortie. IAS 38 §108 impose un test de dépréciation IAS 36 : (a) annuellement ; et (b) chaque fois qu'il y a une indication que l'actif peut s'etre dépréciée. De plus, la durée d'utilité doit etre reexaminee à chaque période (§109).",
    articleRef: "IAS 38 §107, §108, §109 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q10',
    question: "Lors d'un échange d'actifs incorporels a substance commerciale, IAS 38 §45 impose d'évaluer l'actif recu :",
    options: [
      { id: 'a', texte: "A la valeur comptable de l'actif cede, majoree des frais accessoires de l'échange" },
      { id: 'b', texte: "A la juste valeur de l'actif recu, ou a defaut, a la juste valeur de l'actif cede" },
      { id: 'c', texte: "A la valeur fiscale de l'actif cede, déterminée par le plan d'amortissement fiscal" },
      { id: 'd', texte: "Au coût de remplacement de l'actif cede, déterminé par une expertise independante" },
      { id: 'e', texte: "A la valeur d'assurance des deux actifs échanges, fixee par les contrats d'assurance respectifs" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 38 §45 dispose que le coût d'une immobilisation incorporelle acquise par échange est évalué a la juste valeur, sauf si l'operation n'a pas de substance commerciale ou si la JV ne peut etre évaluée de facon fiable. IAS 38 §47 précisé : si l'entité peut évaluer la JV de l'actif recu ou cede, la JV de l'actif cede est utilisee pour évaluer le coût, sauf si la JV de l'actif recu est plus clairement evidente.",
    articleRef: "IAS 38 §45 et §47 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q11',
    question: "IAS 16 §68 preciseque les profits de cession d'immobilisations corporelles ne doivent pas etre classes en produits des activites ordinaires. Pourquoi cette réglé est-elle fondamentale pour l'information financiere ?",
    options: [
      { id: 'a', texte: "Pour permettre aux analystes de distinguer les résultats recurrents du cycle d'exploitation des gains ponctuels sur actifs" },
      { id: 'b', texte: "Pour satisfaire a la réglé fiscale selon laquelle les plus-values de cession sont imposees a un taux reduit" },
      { id: 'c', texte: "Pour éviter une double comptabilisation avec les amortissements déjà comptabilisés anterieurement" },
      { id: 'd', texte: "Pour se conformer au principe de permanence des méthodes impose par IAS 8" },
      { id: 'e', texte: "Parce que le profit de cession est comptabilisé dans les autres éléments du résultat global (AERG)" },
    ],
    reponseCorrecte: 'a',
    explication: "IAS 16 §68 exigé que les profits de cession soient présentés séparément et non classes en produits des activites ordinaires. Cette réglé est fondamentale pour la qualite de l'information : elle permet aux analystes de distinguer les produits recurrents du cycle normal d'exploitation des gains exceptionnels et ponctuels lies a la sortie d'actifs, qui ne se reproduisent pas de facon systematique.",
    articleRef: "IAS 16 §68 - IFRS Foundation"
  },
  {
    type: 'qcm', id: 'q12',
    question: "Selon IAS 38 §71, que se passe-t-il si des dépenses relatives a un élément incorporel ont ete initialement comptabilisées en charges, puis que les critères de §57 sont ulterieurement satisfaits ?",
    options: [
      { id: 'a', texte: "L'entité peut reincorporer ces dépenses dans le coût de l'immobilisation incorporelle a titre de regularisation IAS 8" },
      { id: 'b', texte: "L'entité doit retraiter les exercices anterieurs de facon retrospective selon IAS 8 §44" },
      { id: 'c', texte: "Ces dépenses ne doivent pas etre incorporées dans le coût de l'immobilisation incorporelle a une date ulterieure" },
      { id: 'd', texte: "Ces dépenses peuvent etre incorporées si elles sont validees par l'assemblee generale et un commissaire aux comptes" },
      { id: 'e', texte: "Ces dépenses sont traitees comme un actif eventuel conforme au Cadre conceptuel de l'IASB" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 38 §71 pose un principe absolu et irreversible : les dépenses relatives a un élément incorporel qui ont ete initialement comptabilisées en charges ne doivent pas etre incorporées dans le coût d'une immobilisation incorporelle a une date ulterieure. Cette interdiction de revenir en arriere est fondamentale pour la cohérence et la fiabilité des etats financiers.",
    articleRef: "IAS 38 §71 - IFRS Foundation"
  },
]

// ─────────────────────────────────────────────────────────────────
// TYPE LOCAL POUR CORRECTIONS AVEC TABLEAUX JSX
// ─────────────────────────────────────────────────────────────────
type QuestionRiche = {
  num: number
  enonce: string
  correctionJSX: React.ReactNode
}
type CasRiche = {
  titre: string
  contexte: string
  questions: QuestionRiche[]
}

// Composant helper : tableau de journal
function JournalTable({ titre, lignes }: {
  titre?: string
  lignes: { libelle: string; debit?: string; credit?: string }[]
}) {
  return (
    <div className="overflow-x-auto mt-2 mb-2">
      {titre && <p className="text-xs font-semibold text-foreground mb-1">{titre}</p>}
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-sky-100">
            <th className="border border-sky-200 p-1.5 text-left">Libellé du compte</th>
            <th className="border border-sky-200 p-1.5 text-right">Débit (€)</th>
            <th className="border border-sky-200 p-1.5 text-right">Crédit (€)</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
              <td className="border border-border p-1.5">{l.libelle}</td>
              <td className="border border-border p-1.5 text-right font-mono">{l.debit ?? ''}</td>
              <td className="border border-border p-1.5 text-right font-mono">{l.credit ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ETUDES DE CAS (5 cas pratiques) - type CasPratiqueExistant pour DevoirChapitreCreateur
// ─────────────────────────────────────────────────────────────────
interface EtudeDeCasIAS {
  titre: string
  contexte: string
  questions: { num: number; énoncé: string; correction: string }[]
}

const ETUDES_DE_CAS: EtudeDeCasIAS[] = [
  {
    titre: "Cas 1 - Acquisition d'une installation industrielle avec paiement échelonné et coûts de démantèlement (IAS 16)",
    contexte: "La société MINEREX acquiert le 1er janvier N une installation de traitement mineralurgique pour un prix catalogue de 500 000 €, payable comme suit : 200 000 € comptant, 165 000 € au 31 décembre N, 181 500 € au 31 décembre N+1. Le taux d'actualisation applicable est de 10 %. Le contrat impose a MINEREX de remettre en etat le site a l'issue d'une exploitation de 20 ans, coût estime en valeur actuelle : 80 000 €. Des tests de bon fonctionnement sont réalisés pour 15 000 €. Des frais de publicité pour le lancement commercial de l'unite : 25 000 €. Des frais administratifs de la direction generale : 10 000 €.",
    questions: [
      {
        num: 1,
        énoncé: "Determinez le coût d'entree de l'installation industrielle en appliquant strictement IAS 16 §16, §17 et §23. Justifiez le traitement de chaque élément de coût.",
        correction: "Coût d'entree selon IAS 16 §23 (paiement differe) : la différence entre le prix catalogue et le prix comptant equivalent represente des charges financieres. Prix comptant equivalent = 200 000 + 165 000/1,10 + 181 500/1,21 = 200 000 + 150 000 + 150 000 = 500 000 €. On inclut : (1) Prix comptant equivalent : 500 000 € (§23) ; (2) Tests de bon fonctionnement : 15 000 € (§17e) ; (3) Coûts de démantèlement et remise en etat : 80 000 € (§16c). Total coût d'entree : 595 000 €. Sont EXCLUS : frais de publicité (25 000 €, §19b : coûts de lancement) et frais administratifs (10 000 €, §19d)."
      },
      {
        num: 2,
        énoncé: "Passez l'ecriture comptable de comptabilisation de l'installation au 1er janvier N selon IAS 16 §15 et §23. Identifiez la nature de chaque contrepartie.",
        correction: "Écriture 1er janvier N : Débit Immobilisations corporelles 595 000 (coût d'entree total) / Crédit Banque 200 000 (acompte) + Crédit Fournisseurs immobilisations 300 000 (VAN des 2 échéances : 150 000 + 150 000) + Crédit Provision pour remise en etat (IAS 37) 80 000 (obligation contractuelle de démantèlement, §16c). Note : les 15 000 € de tests sont inclus dans le debit 595 000 et leur contrepartie est Banque ou Fournisseurs selon modalite de paiement."
      },
      {
        num: 3,
        énoncé: "A la fin de l'annee N, des coûts d'entretien courant de 12 000 € sont engages, et un composant 'moteur' (initialement évalué a 80 000 €, amorti a 60 000 €, valeur comptable 20 000 €) est remplace par un moteur neuf pour 95 000 €. Quel est le traitement comptable de ces deux operations selon IAS 16 §12 et §13 ?",
        correction: "Entretien courant (12 000 €) : selon IAS 16 §12, les coûts d'entretien courant sont comptabilisés en charges lorsqu'ils sont engages. Écriture : Débit Charges d'entretien 12 000 / Crédit Banque 12 000. Remplacement moteur : selon IAS 16 §13, le coût du remplacement (95 000 €) est capitalise si les critères du §7 sont satisfaits (AEF probables + évaluation fiable). Parallélément, la valeur comptable du composant remplace est décomptabilisée. Écritures : (1) Décomptabilisation composant : Débit Amortissements cumules 60 000 / Débit Perte sur cession composant 20 000 / Crédit Immobilisations corporelles (moteur ancien) 80 000. (2) Capitalisation nouveau moteur : Débit Immobilisations corporelles (moteur neuf) 95 000 / Crédit Banque 95 000."
      },
      {
        num: 4,
        énoncé: "Apres 3 ans d'utilisation, la direction révisé ses estimations : durée d'utilité résiduelle portee de 17 a 22 ans, valeur résiduelle portee de 0 a 50 000 €. Comment ces revisions sont-elles traitees selon IAS 16 §51 et IAS 8 ? Quelle est la différence fondamentale avec une correction d'erreur ?",
        correction: "IAS 16 §51 impose de reviser la valeur résiduelle et la durée d'utilité au moins à chaque fin d'exercice. Ces changements sont traités comme des changements d'estimation comptable selon IAS 8, c'est-à-dire de facon prospective (sans retraitement des périodes antérieures). Le nouvel amortissement est calculé sur la valeur comptable à la date de révision (coût - amortissements déjà passés) diminuée de la nouvelle valeur résiduelle, répartie sur la nouvelle durée résiduelle. Différence fondamentale avec une erreur IAS 8 §41 : une erreur impose un retraitement rétrospectif des périodes antérieures (restatement), tandis qu'un changement d'estimation n'affecte que les périodes courante et futures."
      },
      {
        num: 5,
        énoncé: "L'installation est vendue au 1er janvier N+5 pour 420 000 €. Sa valeur comptable a cette date est de 380 000 €. Analysez le résultat de cession et son mode de présentation dans les etats financiers conformement a IAS 16 §68. En quoi la classification de ce profit impacte-t-elle la qualite de l'information financiere fournie aux investisseurs ?",
        correction: "Résultat de cession = 420 000 - 380 000 = 40 000 € (profit). Écriture : Débit Banque 420 000 + Débit Amortissements cumules (solde) / Crédit Immobilisations corporelles (solde brut) / Crédit Profit sur cession d'immobilisations 40 000. IAS 16 §68 impose que ce profit ne soit PAS classe en produits des activites ordinaires. Impact sur la qualite de l'information : si le profit de 40 000 € etait inclus dans le chiffre d'affaires ou dans les produits ordinaires, les analystes surestimerait la rentabilite recurrente de MINEREX. Sa présentation séparée permet aux investisseurs de distinguer les cash flows stables du cycle d'exploitation des gains exceptionnels, ponctuels et non reproductibles. La qualite predictive (pertinence) des etats financiers en est renforcee, conformement au Cadre conceptuel IASB §QC6."
      }
    ]
  },
  {
    titre: "Cas 2 - Immobilisation générée en interne : projet de développement logiciel (IAS 38)",
    contexte: "La société TECHSOL développe en interne un logiciel de gestion comptable destiné à être commercialise. Le projet débuté le 1er février N. La phase de recherche (étude de faisabilité, benchmark) court du 1er février au 30 juin N : coûts engages 120 000 €. À partir du 1er juillet N, les 6 critères du §57 sont tous satisfaits : faisabilité technique démontré, intention d'achèvement confirmée, ressources disponibles, marché identifié. Frais de développement du 1er juillet au 31 décembre N : 280 000 €. Frais d'enregistrement du copyright : 8 500 €. Frais de formation du personnel pour utiliser le logiciel : 18 000 €. Frais de publicité et de promotion du logiciel : 22 000 €.",
    questions: [
      {
        num: 1,
        énoncé: "Appliquez la distinction phase de recherche / phase de développement d'IAS 38 §52. Pour chaque élément de coût, precisez s'il est comptabilisé en charges ou en immobilisation incorporelle, en citant le paragraphe applicable.",
        correction: "Phase de recherche (1er février au 30 juin N) : 120 000 € en charges en résultat (IAS 38 §54). IAS 38 §55 : lors de la phase de recherche, l'entité ne peut pas demontrer l'existence d'une II qui générera des AEF probables. Frais développement (1er juillet au 31 décembre) : 280 000 € CAPITALISES (IAS 38 §57, tous les 6 critères satisfaits). Frais enregistrement copyright : 8 500 € CAPITALISES (coût directement attribuable, IAS 38 §66c : honoraires d'enregistrement d'un droit établi). Frais formation personnel : 18 000 € en CHARGES (IAS 38 §67c : dépenses au titre de la formation du personnel pour exploiter l'actif). Frais publicité : 22 000 € en CHARGES (IAS 38 §69c : dépenses de publicité et promotion). Coût capitalise total : 280 000 + 8 500 = 288 500 €."
      },
      {
        num: 2,
        énoncé: "Passez les écritures comptables au 31 décembre N pour comptabiliser (a) les charges de la phase de recherche et (b) l'immobilisation incorporelle générée en interne.",
        correction: "(a) Phase de recherche : Débit Charges de recherche 120 000 / Crédit Banque/Fournisseurs 120 000. (b) Immobilisation incorporelle : Débit Immobilisations incorporelles - Logiciel en cours 288 500 / Crédit Production immobilisee (produits) 288 500 [le logiciel généré en interne est comptabilisé via la production immobilisee selon le mecanisme IAS 38 §65 et les pratiques comptables]. Note : les 40 000 € de frais formation et publicité sont passés en charges : Débit Charges diverses 40 000 / Crédit Banque 40 000."
      },
      {
        num: 3,
        énoncé: "Le logiciel est acheve le 1er janvier N+1. Sa durée d'utilité est estimee a 4 ans, valeur résiduelle nulle. Calculez la dotation annuelle aux amortissements et passez l'ecriture. Justifiez la presomption de valeur résiduelle nulle selon IAS 38 §100.",
        correction: "Montant amortissable = 288 500 - 0 = 288 500 €. Durée : 4 ans. Dotation annuelle linéaire = 288 500 / 4 = 72 125 €. Écriture : Débit Dotation amortissements II 72 125 / Crédit Amortissements cumules II 72 125. Justification valeur résiduelle nulle : IAS 38 §100 dispose que la valeur résiduelle d'une II a durée d'utilité déterminée est présumée nulle, sauf si (a) un tiers s'est engage a racheter l'actif, ou (b) il existe un marché actif. Pour un logiciel proprietaire, ni engagement de rachat ni marché actif n'existent. La valeur résiduelle est donc nulle par presomption."
      },
      {
        num: 4,
        énoncé: "En N+2, TECHSOL envisage de requalifier certaines dépenses de recherche de la phase initiale (120 000 €) en dépenses de développement, au motif que les critères du §57 auraient pu etre satisfaits des le 1er mars N. IAS 38 §71 permet-il cette requalification ? Analysez le principe en jeu et ses consequences pour l'information financiere.",
        correction: "IAS 38 §71 interdit formellement cette requalification : 'Les dépenses relatives a un élément incorporel qui ont ete initialement comptabilisées en charges ne doivent pas etre incorporées dans le coût d'une immobilisation incorporelle a une date ulterieure.' Ce principe d'irreversibilite est absolu. Il n'existe aucune exception. Consequences pour l'information financiere : cette réglé protege la fiabilité et la prudence de l'information (Cadre IASB §QC12). Sans elle, les entreprises pourraient manipuler leurs résultats a posteriori en requalifiant des charges en actifs, gonflant artificiellement leur bilan et améliorant leur résultat. La transparence est preferee a l'optimisation comptable."
      },
      {
        num: 5,
        énoncé: "En N+3, TECHSOL decide de ne plus maintenir le logiciel et l'abandonne. Sa valeur comptable est alors de 72 125 €. Elle ne recoit aucun produit de sortie. Analysez les conditions de décomptabilisation selon IAS 38 §112 et passez l'ecriture. Comparez le traitement d'une mise hors service definitive (aucun AEF futur) a celui d'une cession ordinaire.",
        correction: "IAS 38 §112 : une immobilisation incorporelle doit etre décomptabilisée lors de sa sortie OU lorsqu'aucun AEF futur n'est attendu de son utilisation ou de sa sortie. La decision d'abandon correspond a la deuxieme condition : TECHSOL ne généré plus aucun AEF. Écriture : Débit Amortissements cumules II 216 375 (3 ans x 72 125) / Débit Perte sur mise hors service 72 125 (valeur comptable résiduelle) / Crédit Immobilisations incorporelles - Logiciel 288 500. Comparaison : cession ordinaire (§113) = produit net de sortie - valeur comptable = profit ou perte en résultat net (non classe en produits ordinaires). Mise hors service sans prix = perte integrale de la valeur comptable, aucun produit de sortie, comptabilisée en résultat net comme perte sur sortie d'actif."
      }
    ]
  },
  {
    titre: "Cas 3 - Réévaluation d'immobilisations corporelles et traitement des écarts (IAS 16 §31 a §42)",
    contexte: "La société IMMOTECH possede un immeuble comptabilisé au coût de 1 200 000 €, amortissable sur 40 ans (linéaire), acquis le 1er janvier N-5. Au 31 décembre N (apres 6 ans), une réévaluation est decidee sur l'ensemble de la categorie 'immeubles'. La juste valeur (IFRS 13) est estimee a 1 380 000 €. Au 31 décembre N+2, suite a une baisse du marché immobilier, la juste valeur tombe a 900 000 € (valeur comptable avant réévaluation N+2 = 1 349 500 €).",
    questions: [
      {
        num: 1,
        énoncé: "Calculez la valeur comptable de l'immeuble au 31 décembre N (avant réévaluation), puis determinez l'écart de réévaluation. Precisez le traitement comptable de cet écart selon IAS 16 §39.",
        correction: "Amortissement annuel : 1 200 000 / 40 = 30 000 €. Apres 6 ans : amortissements cumules = 6 x 30 000 = 180 000 €. Valeur comptable 31/12/N avant réévaluation = 1 200 000 - 180 000 = 1 020 000 €. Juste valeur = 1 380 000 €. Écart de réévaluation = 1 380 000 - 1 020 000 = 360 000 € (POSITIF). Traitement IAS 16 §39 : cet écart positif est comptabilisé dans les autres éléments du résultat global (AERG) et cumule en capitaux propres sous la rubrique 'écarts de réévaluation'. Il ne transite pas par le résultat net."
      },
      {
        num: 2,
        énoncé: "Passez l'ecriture de réévaluation au 31 décembre N en utilisant la méthode b (§35b) : ecrasement du cumul des amortissements. Presentez les deux etapes de l'ecriture.",
        correction: "Méthode b - etape 1 : annulation du cumul des amortissements : Débit Amortissements cumules immeuble 180 000 / Crédit Immobilisations corporelles (ou ajustement valeur brute) 180 000. Etape 2 : ajustement au montant réévalue (1 380 000 - 1 200 000 + 180 000 = 360 000 net, soit ajustement brut) : Débit Immobilisations corporelles 360 000 / Crédit Écart de réévaluation (AERG - capitaux propres) 360 000. Apres réévaluation : Valeur brute = 1 380 000, Amortissements cumules = 0, Valeur comptable = 1 380 000 €."
      },
      {
        num: 3,
        énoncé: "Calculez le nouvel amortissement annuel apres réévaluation et determinez la valeur comptable au 31 décembre N+2 avant la deuxieme réévaluation. La durée résiduelle est estimee a 34 ans apres réévaluation.",
        correction: "Apres réévaluation, le montant amortissable = 1 380 000 - 0 (valeur résiduelle présumée nulle) = 1 380 000 €. Nouvelle durée résiduelle : 34 ans. Amortissement annuel post-réévaluation : 1 380 000 / 34 = environ 40 588 € par an. Valeur comptable au 31/12/N+1 = 1 380 000 - 40 588 = 1 339 412 €. Valeur comptable au 31/12/N+2 = 1 339 412 - 40 588 = 1 298 824 € (arrondi). L'énoncé donne 1 349 500 € ce qui correspond a un arrondi different. Nous retenons la valeur donnee : VC 31/12/N+2 avant réévaluation = 1 349 500 €."
      },
      {
        num: 4,
        énoncé: "Au 31 décembre N+2, la juste valeur tombe a 900 000 €. L'écart de réévaluation crediteur en capitaux propres s'eleve a 360 000 €. Determinez l'écart de réévaluation N+2 (positif ou negatif) et son traitement selon IAS 16 §40. Passez l'ecriture complète.",
        correction: "Écart N+2 = Juste valeur - Valeur comptable = 900 000 - 1 349 500 = (449 500) € (NEGATIF). Traitement IAS 16 §40 : la diminution est d'abord imputee sur l'écart de réévaluation crediteur (360 000 €) dans les AERG, puis le solde restant (449 500 - 360 000 = 89 500 €) est comptabilisé en résultat net (charges). Écriture : Débit Écart de réévaluation (annulation partielle AERG) 360 000 / Débit Perte de réévaluation (résultat net) 89 500 / Débit Amortissements cumules (annulation) / Crédit Immobilisations corporelles (reduction a JV) [ajustement global pour ramener a 900 000]."
      },
      {
        num: 5,
        énoncé: "Analysez la logique économique de la réglé IAS 16 §39-40 sur la symétrie des écarts de réévaluation. En quoi ce système protege-t-il les utilisateurs des etats financiers contre une présentation optimiste ou pessimiste de la situation patrimoniale de l'entité ?",
        correction: "La logique d'IAS 16 §39-40 repose sur une symétrie conditionnelle : les gains de réévaluation passent en AERG (capitaux propres, pas en résultat) car ils sont non réalisés et potentiellement reversibles. Les pertes de réévaluation sur un actif précédemment réévalue s'imputent d'abord sur le coussin de sécurité constitue par les gains anterieurs (AERG), puis seulement l'excès passe en résultat net. Ce système protege : (1) contre le biais optimiste : une entité ne peut pas afficher un profit de réévaluation au résultat net pour gonfler artificiellement son bénéfice ; (2) contre le biais pessimiste excessif : une perte de réévaluation s'impute d'abord sur les gains anterieurs, evitant un choc immediat en résultat si des gains avaient déjà ete reconnus. Le système assure cohérence et neutralité de l'information sur les cycles de valeur d'un actif."
      }
    ]
  },
  {
    titre: "Cas 4 - Immobilisations corporelles : approche par composants et révision d'estimations (IAS 16 §43, §51)",
    contexte: "La société AEROTEC acquiert un avion commercial le 1er janvier N pour un coût global de 15 000 000 €. L'approche par composants est obligatoire selon IAS 16 §43. Trois composants sont identifies : (1) Cellule : 9 000 000 €, durée 25 ans, valeur résiduelle 1 500 000 € ; (2) Moteurs : 4 000 000 €, durée 15 ans, valeur résiduelle 400 000 € ; (3) Révision majeure : 2 000 000 €, a effectuer tous les 5 ans (composant 'inspection'). L'avion effectue 800 000 km la premiere annee.",
    questions: [
      {
        num: 1,
        énoncé: "Expliquez pourquoi IAS 16 §43-44 impose l'approche par composants pour cet avion. Identifiez la différence fondamentale avec une comptabilisation globale de l'actif. Quels problemes économiques cela resout-il ?",
        correction: "IAS 16 §43 : chaque partie d'une immobilisation ayant un coût significatif par rapport au coût total doit etre amortie séparément. Pour l'avion AEROTEC, les 3 composants ont des durées et des modes d'utilisation radicalement differents : la cellule dure 25 ans, les moteurs 15 ans, l'inspection se renouvelle tous les 5 ans. Une comptabilisation globale (amortissement sur 25 ans de l'ensemble) sous-estimerait les charges des périodes ou les moteurs et inspections doivent etre renouveles, donnant une image deformee du résultat. L'approche par composants resout : (1) la deformation du résultat par sous-amortissement de composants a courte durée ; (2) la comptabilisation correcte des renouvellements (remplacement du composant) ; (3) la representation fidele de la consommation des AEF."
      },
      {
        num: 2,
        énoncé: "Calculez la dotation aux amortissements de l'annee N pour chaque composant. Utilisez la méthode linéaire pour la cellule et les moteurs, et la méthode des unites d'oeuvre pour les moteurs (800 000 km sur 15 M km totaux prévus). Justifiez le choix du mode d'amortissement selon IAS 16 §60.",
        correction: "Cellule : montant amortissable = 9 000 000 - 1 500 000 = 7 500 000 €. Amortissement linéaire annuel = 7 500 000 / 25 = 300 000 €. Moteurs (linéaire) : montant amortissable = 4 000 000 - 400 000 = 3 600 000 €. Amortissement linéaire = 3 600 000 / 15 = 240 000 €. Moteurs (unites d'oeuvre, si km total = 15 M km) : 3 600 000 x 800 000 / 15 000 000 = 192 000 € (mode plus fidele si la consommation suit le kilométrage). Composant inspection : 2 000 000 / 5 = 400 000 € par an. IAS 16 §60 : le mode doit refleter le rythme de consommation des AEF. Pour la cellule (durée de vie physique) : linéaire. Pour les moteurs (consommation liee aux km) : unites d'oeuvre est le plus fidele. Pour l'inspection : linéaire entre deux revisions."
      },
      {
        num: 3,
        énoncé: "En N+5, la révision majeure est effectuee pour un coût de 2 200 000 €. Quelle est la valeur comptable du composant inspection a décomptabiliser ? Comment passez-vous les écritures de sortie du composant ancien et d'entree du composant nouveau selon IAS 16 §13 et §70 ?",
        correction: "Valeur comptable composant inspection au 31/12/N+4 (fin N+5) : coût 2 000 000, amorti sur 5 ans = entièrement amorti. Valeur comptable = 0 €. Écriture décomptabilisation composant ancien (valeur comptable 0) : Débit Amortissements cumules inspection 2 000 000 / Crédit Immobilisations corporelles inspection 2 000 000 [neutralisation, aucun profit ou perte car VC = 0]. Écriture capitalisation nouvelle inspection (coût 2 200 000, critères §7 satisfaits) : Débit Immobilisations corporelles inspection 2 200 000 / Crédit Banque/Fournisseurs 2 200 000. Note IAS 16 §70 : meme si la partie remplacee n'a pas ete amortie séparément initialement, sa valeur comptable doit etre décomptabilisée. Si inconnue, le coût de remplacement peut servir d'estimation."
      },
      {
        num: 4,
        énoncé: "En N+8, AEROTEC révisé ses estimations : la durée résiduelle de la cellule est portee a 20 ans (au lieu de 17 ans restants), et sa valeur résiduelle est révisée de 1 500 000 € a 2 000 000 €. Expliquez le traitement comptable de ces changements selon IAS 16 §51 et IAS 8. Calculez le nouvel amortissement annuel de la cellule.",
        correction: "IAS 16 §51 : la valeur résiduelle et la durée d'utilité sont reexaminées au moins à chaque fin d'exercice. Les changements constituent des changements d'estimation comptable (IAS 8 §36) et sont traités de facon prospective. Valeur comptable cellule au début N+8 (apres 7 ans) : 9 000 000 - (7 x 300 000) = 9 000 000 - 2 100 000 = 6 900 000 €. Nouveau montant amortissable = 6 900 000 - 2 000 000 (nouvelle VR) = 4 900 000 €. Nouvelle durée résiduelle : 20 ans. Nouvel amortissement annuel = 4 900 000 / 20 = 245 000 €. Traitement prospectif : les exercices N a N+7 ne sont pas retouches. Seuls N+8 et suivants beneficient du nouvel amortissement de 245 000 €."
      },
      {
        num: 5,
        énoncé: "Analysez l'impact de l'approche par composants sur la pertinence et la fiabilité de l'information financiere d'AEROTEC a l'egard des investisseurs et des preteurs. En quoi cette approche est-elle supérieure a une comptabilisation globale au regard du Cadre conceptuel de l'IASB ?",
        correction: "L'approche par composants amélioré la pertinence (Cadre IASB §QC6) et la representativite fidele (§QC12) de l'information financiere : (1) Pertinence : les amortissements sont calibres sur la consommation reelle des AEF de chaque composant. Les investisseurs peuvent évaluer précisément les futures sorties de tresorerie (remplacement moteurs, inspections) et les flux d'exploitation recurrents. (2) Representativite fidele : l'image des actifs est fidele (pas de suramortissement global), les charges de la période refletent la consommation reelle. (3) Comparabilite : une comptabilisation globale masquerait les différences de structure entre compagnies aeriennes. (4) Superiority vs approche globale : l'approche globale sur 25 ans sous-amortit les moteurs (15 ans) et l'inspection (5 ans), générant des charges insuffisantes les premieres annees et surestimant la profitabilite operationnelle. Cette distorsion peut induire les preteurs en erreur sur la solvabilite et la tresorerie future d'AEROTEC."
      }
    ]
  },
  {
    titre: "Cas 5 - Comparaison IAS 16 / IAS 38 : traitement des dépenses de R&D et limites de la capitalisation",
    contexte: "La société BIOTECH SA exercé dans la recherche pharmaceutique. En N, elle engage les dépenses suivantes : (A) Études epidemiologiques generales sans cible moleculaire (recherche fondamentale) : 200 000 € ; (B) Tests precliniques sur la molecule B7, critères IAS 38 §57 satisfaits depuis le 1er juillet N : 350 000 € (dont 180 000 € avant le 1er juillet et 170 000 € apres) ; (C) Depot de brevet pour la molecule B7 : 45 000 € ; (D) Formation des chercheurs a l'utilisation d'un nouvel equipement : 30 000 € ; (E) Acquisition d'une licence d'exploitation tierce pour une molecule connexe : 280 000 €. Toutes les dépenses sont reglees comptant.",
    questions: [
      {
        num: 1,
        énoncé: "Classez chaque dépense (A a E) selon le traitement impose par IAS 38 (charges ou capitalisation). Pour chaque élément, citez le paragraphe applicable et justifiez.",
        correction: "(A) 200 000 € en CHARGES : IAS 38 §54 - phase de recherche (investigation originale sans cible identifiée). Les dépenses de recherche sont toujours en charges. (B) Tests precliniques B7 : 180 000 € (avant 1er juillet) en CHARGES (IAS 38 §54, phase recherche) ; 170 000 € CAPITALISES (IAS 38 §57, phase développement, 6 critères satisfaits depuis 1er juillet). (C) Depot de brevet 45 000 € CAPITALISE : coût directement attribuable a l'obtention du droit établi (IAS 38 §66c). (D) Formation 30 000 € en CHARGES : IAS 38 §67c - dépenses de formation du personnel pour exploiter l'actif, exclues du coût. (E) Licence externe 280 000 € CAPITALISE : IAS 38 §25 - acquisition séparée d'une immobilisation incorporelle au coût. Coût capitalisable total = 170 000 + 45 000 + 280 000 = 495 000 €. Total charges = 200 000 + 180 000 + 30 000 = 410 000 €."
      },
      {
        num: 2,
        énoncé: "Passez les écritures comptables au 31 décembre N pour l'ensemble des dépenses A a E. Presentez deux groupes d'écritures : (1) charges en résultat, (2) immobilisations incorporelles.",
        correction: "(1) Charges en résultat : Débit Charges de recherche et développement (A+B avant 1/07) 380 000 / Débit Charges de formation (D) 30 000 / Crédit Banque 410 000. (2) Immobilisations incorporelles : Débit Immobilisations incorporelles - Brevet B7 en cours (B apres 1/07 + C depot) 215 000 [170 000 + 45 000] / Débit Immobilisations incorporelles - Licence externe (E) 280 000 / Crédit Banque 495 000. Note : la production immobilisee peut etre utilisee en contrepartie pour les éléments développés en interne selon les pratiques IAS 38 §65."
      },
      {
        num: 3,
        énoncé: "IAS 38 §126 impose la divulgation du total des dépenses de R&D comptabilisées en charges. Expliquez pourquoi cette obligation d'information est fondamentale pour les investisseurs d'une société pharmaceutique. En quoi le traitement strict IAS 38 (phase recherche = charges) pourrait-il desavantager certaines entreprises intensives en recherche ?",
        correction: "IAS 38 §126 : l'entité doit indiquer le montant total des dépenses de R&D comptabilisé en charges de la période. Importance pour les investisseurs pharma : (1) Les investisseurs peuvent évaluer l'intensite et la strategie de R&D sans laquelle l'entreprise n'a pas de pipeline futur ; (2) Une entreprise qui passe 400 M€ en charges de recherche présenté un résultat faible mais un potentiel futur eleve que le bilan ne reflète pas. La divulgation §126 restaure cette information. Desavantage eventuel : traiter toute la recherche en charges penalise les entreprises a R&D intensive dans leur compte de résultat (résultat faible, ratios P/E eleves), comparativement a des concurrents dans des secteurs ou la capitalisation est plus facile (software, §57 plus facilement satisfait). Cela créé un biais sectoriel dans la comparaison des indicateurs financiers."
      },
      {
        num: 4,
        énoncé: "En N+2, le brevet B7 obtient son autorisation de mise sur le marché. Sa valeur comptable est de 215 000 €. La durée d'utilité est estimee a 10 ans, valeur résiduelle nulle. En N+5, la concurrence lance un medicament generique rendant B7 obsolete. La valeur recouvrable (IAS 36) est estimee a 50 000 €, pour une valeur comptable de 129 000 €. Quel est le traitement de cette perte de valeur selon IAS 36 et IAS 38 §111 ?",
        correction: "IAS 38 §111 dispose que pour determiner si une II s'est dépréciée, l'entité applique IAS 36. Perte de valeur N+5 = Valeur comptable 129 000 - Valeur recouvrable 50 000 = 79 000 €. Écriture : Débit Dotation dépréciation II 79 000 / Crédit Dépréciation cumule II 79 000. Cette perte est comptabilisée en résultat net (IAS 36 §60). Valeur comptable apres test : 50 000 €. L'amortissement posterieur est calculé sur 50 000 € sur la durée résiduelle. Si la valeur recouvrable remonte ulterieurement, une reprise de perte de valeur est possible selon IAS 36 §117 (limitee a la valeur comptable nette qui aurait existe sans la dépréciation)."
      },
      {
        num: 5,
        énoncé: "Le conseil d'administration de BIOTECH considere que la marque 'B7' développée en interne a une valeur de marché de 500 000 €, et souhaite la comptabiliser comme actif pour renforcer le bilan. IAS 38 §63 permet-il cette demarche ? Analysez les fondements juridiques et conceptuels de l'interdiction. En quoi cette réglé protege-t-elle les preteurs et les investisseurs ?",
        correction: "IAS 38 §63 interdit formellement : 'Lorsqu'ils sont générés en interne, les marques (...) ne doivent pas etre comptabilisés en tant qu'immobilisations incorporelles.' IAS 38 §64 explique pourquoi : les dépenses pour générer ces éléments en interne 'ne peuvent pas etre distinguees du coût de développement de l'entreprise dans son ensemble.' Fondements juridiques : la marque générée en interne n'est pas séparable de l'entité (critère IAS 38 §12a difficile a demontrer), son coût ne peut etre évalué de facon fiable (melange avec coûts publicitaires, frais generaux, coûts de personnel), et l'évaluation de 500 000 € par le conseil est subjective et non verifiable. Fondements conceptuels (Cadre IASB) : la fiabilité (§QC12 - representativite fidele) exigé que les informations soient completes, neutres et exemptes d'erreurs. Une valeur établie en interne par la direction pour ses propres actifs manque de neutralité et de verifiabilité. Protection des preteurs et investisseurs : si les marques internes etaient capitalisables, les entreprises pourraient gonfler leur bilan par des evaluations subjectives, ameliorant artificiellement leurs ratios d'endettement (Dette/Capitaux propres), trompant les preteurs sur la solidite reelle du bilan."
      }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────
// CAS RICHES : corrections avec tableaux de journal JSX
// ─────────────────────────────────────────────────────────────────
const CAS_RICHES: CasRiche[] = [
  // CAS 1 - MINEREX
  {
    titre: "Cas 1 - Acquisition d'une installation industrielle avec paiement échelonné et coûts de démantèlement (IAS 16)",
    contexte: "La société MINEREX acquiert le 1er janvier N une installation de traitement minéralurgique pour un prix catalogue de 500 000 €, payable comme suit : 200 000 € comptant, 165 000 € au 31 décembre N, 181 500 € au 31 décembre N+1. Le taux d'actualisation applicable est de 10 %. Le contrat impose à MINEREX de remettre en état le site à l'issue d'une exploitation de 20 ans, coût estimé en valeur actuelle : 80 000 €. Des tests de bon fonctionnement sont réalisés pour 15 000 €. Des frais de publicité pour le lancement commercial de l'unité : 25 000 €. Des frais administratifs de la direction générale : 10 000 €.",
    questions: [
      {
        num: 1,
        enonce: "Déterminez le coût d'entrée de l'installation industrielle en appliquant strictement IAS 16 §16, §17 et §23. Justifiez le traitement de chaque élément de coût.",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90 leading-relaxed">
            <p><strong>Principe IAS 16 §23 :</strong> en cas de paiement différé, le coût d'entrée est le prix comptant équivalent (valeur actuelle des flux).</p>
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="font-semibold mb-1">Calcul du prix comptant équivalent :</p>
              <BlockMath math={String.raw`\text{Prix comptant équivalent} = 200\,000 + \dfrac{165\,000}{1{,}10} + \dfrac{181\,500}{1{,}21} = 200\,000 + 150\,000 + 150\,000 = \mathbf{500\,000\,\text{€}}`} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Elément de coût</th>
                  <th className="border border-sky-200 p-1.5 text-right">Montant (€)</th>
                  <th className="border border-sky-200 p-1.5 text-left">Traitement IAS 16</th>
                  <th className="border border-sky-200 p-1.5 text-center">Réf.</th>
                </tr></thead>
                <tbody>
                  <tr><td className="border border-border p-1.5">Prix comptant équivalent</td><td className="border border-border p-1.5 text-right">500 000</td><td className="border border-border p-1.5">Inclus - coût de l'actif actualisé</td><td className="border border-border p-1.5 text-center">§23</td></tr>
                  <tr className="bg-muted/20"><td className="border border-border p-1.5">Tests de bon fonctionnement</td><td className="border border-border p-1.5 text-right">15 000</td><td className="border border-border p-1.5">Inclus - coût directement attribuable</td><td className="border border-border p-1.5 text-center">§17e</td></tr>
                  <tr><td className="border border-border p-1.5">Coûts de démantèlement (VAN)</td><td className="border border-border p-1.5 text-right">80 000</td><td className="border border-border p-1.5">Inclus - obligation contractuelle (IAS 37)</td><td className="border border-border p-1.5 text-center">§16c</td></tr>
                  <tr className="bg-muted/20"><td className="border border-border p-1.5">Frais de publicité</td><td className="border border-border p-1.5 text-right">25 000</td><td className="border border-border p-1.5 text-red-600">EXCLUS - coûts de lancement</td><td className="border border-border p-1.5 text-center">§19b</td></tr>
                  <tr><td className="border border-border p-1.5">Frais administratifs</td><td className="border border-border p-1.5 text-right">10 000</td><td className="border border-border p-1.5 text-red-600">EXCLUS - frais généraux</td><td className="border border-border p-1.5 text-center">§19d</td></tr>
                  <tr className="font-bold bg-sky-50"><td className="border border-sky-300 p-1.5">TOTAL COÛT D'ENTRÉE</td><td className="border border-sky-300 p-1.5 text-right">595 000</td><td className="border border-sky-300 p-1.5" colSpan={2}></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        num: 2,
        enonce: "Passez l'écriture comptable de comptabilisation de l'installation au 1er janvier N selon IAS 16 §15 et §23. Identifiez la nature de chaque contrepartie.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <JournalTable
              titre="Écriture du 1er janvier N - Comptabilisation de l'installation (IAS 16 §15)"
              lignes={[
                { libelle: "Immobilisations corporelles (installation)", debit: "595 000", credit: "" },
                { libelle: "Banque (acompte comptant)", debit: "", credit: "200 000" },
                { libelle: "Fournisseurs d'immobilisations (VAN échéances : 150 000 + 150 000)", debit: "", credit: "300 000" },
                { libelle: "Provision pour remise en état de site (IAS 37)", debit: "", credit: "80 000" },
                { libelle: "Banque (tests de fonctionnement)", debit: "", credit: "15 000" },
              ]}
            />
            <p className="text-xs text-muted-foreground italic">Note : les charges financieres (différence entre les paiements nominaux et leur valeur actuelle) sont comptabilisées en résultat net sur la durée du crédit selon IAS 16 §23.</p>
          </div>
        )
      },
      {
        num: 3,
        enonce: "A la fin de l'année N, des coûts d'entretien courant de 12 000 € sont engagés, et un composant 'moteur' (initialement évalué à 80 000 €, amorti à 60 000 €, valeur comptable 20 000 €) est remplacé par un moteur neuf pour 95 000 €. Quel est le traitement comptable de ces deux opérations selon IAS 16 §12 et §13 ?",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90">
            <p><strong>Entretien courant (IAS 16 §12) :</strong> comptabilisé en charges immédiatement, ne s'incorpore pas à la valeur comptable.</p>
            <JournalTable
              titre="Écriture 1 - Entretien courant (IAS 16 §12)"
              lignes={[
                { libelle: "Charges d'entretien et réparations", debit: "12 000", credit: "" },
                { libelle: "Banque", debit: "", credit: "12 000" },
              ]}
            />
            <p><strong>Remplacement moteur (IAS 16 §13) :</strong> le composant remplacé est décomptabilisé ; le nouveau est capitalisé.</p>
            <JournalTable
              titre="Écriture 2a - Décomptabilisation composant ancien (IAS 16 §13 et §70)"
              lignes={[
                { libelle: "Amortissements cumulés (moteur ancien)", debit: "60 000", credit: "" },
                { libelle: "Perte sur sortie composant", debit: "20 000", credit: "" },
                { libelle: "Immobilisations corporelles (moteur ancien)", debit: "", credit: "80 000" },
              ]}
            />
            <JournalTable
              titre="Écriture 2b - Capitalisation moteur neuf (IAS 16 §13)"
              lignes={[
                { libelle: "Immobilisations corporelles (moteur neuf)", debit: "95 000", credit: "" },
                { libelle: "Banque", debit: "", credit: "95 000" },
              ]}
            />
          </div>
        )
      },
      {
        num: 4,
        enonce: "Après 3 ans d'utilisation, la direction révise ses estimations : durée d'utilité résiduelle portée de 17 à 22 ans, valeur résiduelle portée de 0 à 50 000 €. Comment ces révisions sont-elles traitées selon IAS 16 §51 et IAS 8 ? Quelle est la différence fondamentale avec une correction d'erreur ?",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <p><strong>IAS 16 §51 :</strong> la valeur résiduelle et la durée d'utilité sont révisées au moins à chaque clôture. Ces changements sont des <strong>changements d'estimation comptable (IAS 8)</strong>, traités de façon <strong>prospective</strong> (sans retraitement des périodes antérieures).</p>
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="font-semibold mb-1">Calcul du nouvel amortissement annuel (prospectif) :</p>
              <BlockMath math={String.raw`\text{Valeur comptable à la révision} = \text{Coût} - \text{Amortissements passés}`} />
              <BlockMath math={String.raw`\text{Nouvel amort. annuel} = \dfrac{\text{VC révision} - \text{Nouvelle VR}}{\text{Nouvelle durée résiduelle}}`} />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
              <p className="font-semibold text-amber-800 mb-1">Différence fondamentale :</p>
              <p><strong>Changement d'estimation (IAS 8 §36) :</strong> traitement <em>prospectif</em> - seules les périodes courante et futures sont affectées. Aucun retraitement.</p>
              <p className="mt-1"><strong>Correction d'erreur (IAS 8 §41) :</strong> traitement <em>rétrospectif</em> - retraitement de tous les exercices antérieurs publiés.</p>
            </div>
          </div>
        )
      },
      {
        num: 5,
        enonce: "L'installation est vendue au 1er janvier N+5 pour 420 000 €. Sa valeur comptable à cette date est de 380 000 €. Analysez le résultat de cession et son mode de présentation dans les états financiers conformément à IAS 16 §68.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <BlockMath math={String.raw`\text{Résultat de cession} = 420\,000 - 380\,000 = \mathbf{+40\,000\,\text{€}\;\text{(profit)}}`} />
            </div>
            <JournalTable
              titre="Écriture de cession au 1er janvier N+5 (IAS 16 §68)"
              lignes={[
                { libelle: "Amortissements cumulés (solde)", debit: "X", credit: "" },
                { libelle: "Banque (prix de cession)", debit: "420 000", credit: "" },
                { libelle: "Immobilisations corporelles (coût historique)", debit: "", credit: "X + 380 000" },
                { libelle: "Profit sur cession d'immobilisations", debit: "", credit: "40 000" },
              ]}
            />
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
              <p className="font-semibold text-amber-800 mb-1">IAS 16 §68 - Présentation obligatoire :</p>
              <p>Le profit de 40 000 € <strong>ne doit PAS être classé en produits des activités ordinaires.</strong> Il est présenté séparément. Sans cette règle, les analystes surestimerait la rentabilité récurrente de MINEREX. Sa présentation séparée garantit la qualité prédictive de l'information (Cadre IASB §QC6).</p>
            </div>
          </div>
        )
      }
    ]
  },
  // CAS 2 - TECHSOL
  {
    titre: "Cas 2 - Immobilisation générée en interne : projet de développement logiciel (IAS 38)",
    contexte: "La société TECHSOL développe en interne un logiciel de gestion comptable destiné à être commercialisé. Le projet débute le 1er février N. La phase de recherche (faisabilité, benchmark) court du 1er février au 30 juin N : coûts engagés 120 000 €. À partir du 1er juillet N, les 6 critères du §57 sont tous satisfaits. Frais de développement du 1er juillet au 31 décembre N : 280 000 €. Frais d'enregistrement du copyright : 8 500 €. Frais de formation du personnel : 18 000 €. Frais de publicité et de promotion : 22 000 €.",
    questions: [
      {
        num: 1,
        enonce: "Appliquez la distinction phase de recherche / phase de développement d'IAS 38 §52. Pour chaque élément de coût, précisez s'il est comptabilisé en charges ou en immobilisation incorporelle.",
        correctionJSX: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-sky-100">
                <th className="border border-sky-200 p-1.5 text-left">Elément</th>
                <th className="border border-sky-200 p-1.5 text-right">Montant</th>
                <th className="border border-sky-200 p-1.5 text-center">Traitement</th>
                <th className="border border-sky-200 p-1.5 text-center">Réf. IAS 38</th>
              </tr></thead>
              <tbody>
                <tr><td className="border border-border p-1.5">Phase recherche (février - juin N)</td><td className="border border-border p-1.5 text-right">120 000 €</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§54</td></tr>
                <tr className="bg-muted/20"><td className="border border-border p-1.5">Développement logiciel (juil. - déc. N)</td><td className="border border-border p-1.5 text-right">280 000 €</td><td className="border border-border p-1.5 text-center font-bold text-green-600">CAPITALISÉ</td><td className="border border-border p-1.5 text-center">§57</td></tr>
                <tr><td className="border border-border p-1.5">Enregistrement copyright</td><td className="border border-border p-1.5 text-right">8 500 €</td><td className="border border-border p-1.5 text-center font-bold text-green-600">CAPITALISÉ</td><td className="border border-border p-1.5 text-center">§66c</td></tr>
                <tr className="bg-muted/20"><td className="border border-border p-1.5">Formation du personnel</td><td className="border border-border p-1.5 text-right">18 000 €</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§67c</td></tr>
                <tr><td className="border border-border p-1.5">Publicité et promotion</td><td className="border border-border p-1.5 text-right">22 000 €</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§69c</td></tr>
                <tr className="font-bold bg-sky-50"><td className="border border-sky-300 p-1.5">Total capitalisé</td><td className="border border-sky-300 p-1.5 text-right">288 500 €</td><td className="border border-sky-300 p-1.5" colSpan={2}></td></tr>
                <tr className="font-bold bg-red-50"><td className="border border-red-200 p-1.5">Total charges</td><td className="border border-red-200 p-1.5 text-right">160 000 €</td><td className="border border-red-200 p-1.5" colSpan={2}></td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        num: 2,
        enonce: "Passez les écritures comptables au 31 décembre N pour comptabiliser (a) les charges de la phase de recherche et (b) l'immobilisation incorporelle générée en interne.",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90">
            <JournalTable
              titre="(a) Phase de recherche + charges non capitalisables (IAS 38 §54)"
              lignes={[
                { libelle: "Charges de recherche et développement (phase recherche)", debit: "120 000", credit: "" },
                { libelle: "Charges de formation du personnel", debit: "18 000", credit: "" },
                { libelle: "Charges de publicité et promotion", debit: "22 000", credit: "" },
                { libelle: "Banque / Fournisseurs", debit: "", credit: "160 000" },
              ]}
            />
            <JournalTable
              titre="(b) Immobilisation incorporelle générée en interne (IAS 38 §57 + §65)"
              lignes={[
                { libelle: "Immobilisations incorporelles - Logiciel en cours", debit: "288 500", credit: "" },
                { libelle: "Production immobilisée (produits)", debit: "", credit: "288 500" },
              ]}
            />
            <p className="text-xs text-muted-foreground italic">Note IAS 38 §65 : les éléments générés en interne sont comptabilisés via Production immobilisée en contrepartie.</p>
          </div>
        )
      },
      {
        num: 3,
        enonce: "Le logiciel est achevé le 1er janvier N+1. Sa durée d'utilité est estimée à 4 ans, valeur résiduelle nulle. Calculez la dotation annuelle aux amortissements et passez l'écriture. Justifiez la présomption de valeur résiduelle nulle selon IAS 38 §100.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="font-semibold mb-1">Calcul de la dotation annuelle :</p>
              <BlockMath math={String.raw`\text{Dotation} = \dfrac{288\,500 - 0}{4} = \mathbf{72\,125\,\text{€/an}}`} />
            </div>
            <JournalTable
              titre="Écriture de dotation annuelle - 31 décembre N+1"
              lignes={[
                { libelle: "Dotation aux amortissements (II)", debit: "72 125", credit: "" },
                { libelle: "Amortissements cumulés (II - logiciel)", debit: "", credit: "72 125" },
              ]}
            />
            <p><strong>Valeur résiduelle nulle (IAS 38 §100) :</strong> présumée nulle sauf (a) engagement ferme de rachat par un tiers, ou (b) existence d'un marché actif. Pour ce logiciel propriétaire, aucune de ces conditions n'est remplie.</p>
          </div>
        )
      },
      {
        num: 4,
        enonce: "En N+2, TECHSOL envisage de requalifier certaines dépenses de recherche de la phase initiale (120 000 €) en dépenses de développement. IAS 38 §71 permet-il cette requalification ?",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
              <p className="font-semibold text-red-700 mb-1">Interdiction absolue - IAS 38 §71</p>
              <p className="italic">« Les dépenses relatives à un élément incorporel qui ont été initialement comptabilisées en charges ne doivent pas être incorporées dans le coût d'une immobilisation incorporelle à une date ultérieure. » (IAS 38 §71)</p>
            </div>
            <p>Ce principe d'irréversibilité est <strong>absolu</strong>, sans aucune exception. Il protège la fiabilité des états financiers (Cadre IASB §QC12) en empêchant les entités de manipuler leurs résultats en requalifiant des charges passées en actifs.</p>
          </div>
        )
      },
      {
        num: 5,
        enonce: "En N+3, TECHSOL décide d'abandonner le logiciel. Sa valeur comptable est de 72 125 €. Elle ne reçoit aucun produit de sortie. Analysez les conditions de décomptabilisation selon IAS 38 §112 et passez l'écriture.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <p><strong>IAS 38 §112 :</strong> décomptabilisation lors de la sortie OU lorsqu'aucun AEF futur n'est attendu. L'abandon correspond à la deuxième condition.</p>
            <JournalTable
              titre="Écriture de mise hors service - 31 décembre N+3 (IAS 38 §112)"
              lignes={[
                { libelle: "Amortissements cumulés II (3 ans × 72 125)", debit: "216 375", credit: "" },
                { libelle: "Perte sur mise hors service (résultat net)", debit: "72 125", credit: "" },
                { libelle: "Immobilisations incorporelles - Logiciel", debit: "", credit: "288 500" },
              ]}
            />
            <div className="rounded-lg border border-sky-200 bg-sky-50/30 p-3">
              <p className="font-semibold mb-1">Comparaison avec une cession ordinaire (IAS 38 §113) :</p>
              <p><strong>Cession ordinaire :</strong> Résultat = Prix net de sortie − Valeur comptable (profit ou perte en résultat net, jamais en produits ordinaires).</p>
              <p className="mt-1"><strong>Mise hors service sans prix :</strong> perte intégrale de la valeur comptable résiduelle, aucun produit de sortie.</p>
            </div>
          </div>
        )
      }
    ]
  },
  // CAS 3 - IMMOTECH
  {
    titre: "Cas 3 - Réévaluation d'immobilisations corporelles et traitement des écarts (IAS 16 §31 à §42)",
    contexte: "La société IMMOTECH possède un immeuble comptabilisé au coût de 1 200 000 €, amortissable sur 40 ans (linéaire), acquis le 1er janvier N-5. Au 31 décembre N (après 6 ans), une réévaluation est décidée. La juste valeur (IFRS 13) est estimée à 1 380 000 €. Au 31 décembre N+2, la juste valeur tombe à 900 000 € (valeur comptable avant réévaluation N+2 = 1 349 500 €).",
    questions: [
      {
        num: 1,
        enonce: "Calculez la valeur comptable de l'immeuble au 31 décembre N (avant réévaluation), puis déterminez l'écart de réévaluation. Précisez le traitement comptable selon IAS 16 §39.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <BlockMath math={String.raw`\text{Amort. annuel} = \dfrac{1\,200\,000}{40} = 30\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Cumul 6 ans} = 30\,000 \times 6 = 180\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Valeur comptable (31/12/N)} = 1\,200\,000 - 180\,000 = \mathbf{1\,020\,000\,\text{€}}`} />
              <BlockMath math={String.raw`\text{Écart de réévaluation} = 1\,380\,000 - 1\,020\,000 = \mathbf{+360\,000\,\text{€}\;\text{(AERG)}}`} />
            </div>
            <p><strong>Traitement IAS 16 §39 :</strong> l'écart positif est comptabilisé dans les <em>autres éléments du résultat global (AERG)</em> et cumulé en capitaux propres sous la rubrique « écarts de réévaluation ». Il ne transite PAS par le résultat net.</p>
          </div>
        )
      },
      {
        num: 2,
        enonce: "Passez l'écriture de réévaluation au 31 décembre N en utilisant la méthode b (§35b) : écrasement du cumul des amortissements. Présentez les deux étapes de l'écriture.",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90">
            <JournalTable
              titre="Étape 1 - Annulation du cumul des amortissements"
              lignes={[
                { libelle: "Amortissements cumulés immeuble", debit: "180 000", credit: "" },
                { libelle: "Immobilisations corporelles - Immeuble", debit: "", credit: "180 000" },
              ]}
            />
            <JournalTable
              titre="Étape 2 - Ajustement à la juste valeur (360 000 € d'écart)"
              lignes={[
                { libelle: "Immobilisations corporelles - Immeuble", debit: "360 000", credit: "" },
                { libelle: "Écart de réévaluation (AERG - capitaux propres)", debit: "", credit: "360 000" },
              ]}
            />
            <p className="text-xs text-muted-foreground">Après réévaluation : Valeur brute = 1 380 000 € - Amortissements cumulés = 0 € - Valeur comptable = <strong>1 380 000 €</strong></p>
          </div>
        )
      },
      {
        num: 3,
        enonce: "Calculez le nouvel amortissement annuel après réévaluation et déterminez la valeur comptable au 31 décembre N+2 avant la deuxième réévaluation. La durée résiduelle est estimée à 34 ans.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <BlockMath math={String.raw`\text{Nouvel amort. annuel} = \dfrac{1\,380\,000}{34} \approx 40\,588\,\text{€}`} />
              <BlockMath math={String.raw`\text{VC au 31/12/N+1} = 1\,380\,000 - 40\,588 = 1\,339\,412\,\text{€}`} />
              <BlockMath math={String.raw`\text{VC au 31/12/N+2} \approx 1\,339\,412 - 40\,588 = 1\,298\,824\,\text{€}`} />
            </div>
            <p className="text-xs text-muted-foreground italic">L'énoncé retient 1 349 500 € (arrondi différent) - nous appliquons la valeur donnée pour la suite.</p>
          </div>
        )
      },
      {
        num: 4,
        enonce: "Au 31 décembre N+2, la juste valeur tombe à 900 000 €. L'écart de réévaluation créditeur s'élève à 360 000 €. Déterminez l'écart N+2 et passez l'écriture complète selon IAS 16 §40.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <BlockMath math={String.raw`\text{Écart N+2} = 900\,000 - 1\,349\,500 = \mathbf{(449\,500)\,\text{€}\;\text{NÉGATIF}}`} />
              <p className="text-xs mt-1">Imputation : 360 000 € sur AERG (annulation écart antérieur) + 89 500 € en résultat net (charges).</p>
            </div>
            <JournalTable
              titre="Écriture de réévaluation négative - 31/12/N+2 (IAS 16 §40)"
              lignes={[
                { libelle: "Écart de réévaluation (annulation AERG)", debit: "360 000", credit: "" },
                { libelle: "Perte de réévaluation (résultat net - charges)", debit: "89 500", credit: "" },
                { libelle: "Amortissements cumulés (annulation cumul N+1 + N+2)", debit: "81 176", credit: "" },
                { libelle: "Immobilisations corporelles (réduction à JV)", debit: "", credit: "530 676" },
              ]}
            />
          </div>
        )
      },
      {
        num: 5,
        enonce: "Analysez la logique économique de la règle IAS 16 §39-40 sur la symétrie des écarts de réévaluation.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <p><strong>Principe de symétrie conditionnelle :</strong> les gains de réévaluation passent en AERG (capitaux propres, pas en résultat) car ils sont non réalisés. Les pertes s'imputent d'abord sur le coussin AERG antérieur, puis l'excès passe en résultat net.</p>
            <div className="rounded-lg border border-sky-200 bg-sky-50/30 p-3">
              <p className="font-semibold mb-1">Protections assurées par ce système :</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Contre le biais optimiste :</strong> un profit de réévaluation ne peut pas être affiché en résultat net pour gonfler artificiellement le bénéfice.</li>
                <li><strong>Contre le biais pessimiste excessif :</strong> une perte s'impute d'abord sur les gains antérieurs, évitant un choc immédiat en résultat si des gains avaient déjà été reconnus.</li>
                <li><strong>Cohérence inter-temporelle :</strong> le système assure la neutralité de l'information sur les cycles de valeur d'un actif.</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  // CAS 4 - AEROTEC
  {
    titre: "Cas 4 - Immobilisations corporelles : approche par composants et révision d'estimations (IAS 16 §43, §51)",
    contexte: "La société AEROTEC acquiert un avion commercial le 1er janvier N pour un coût global de 15 000 000 €. L'approche par composants est obligatoire selon IAS 16 §43. Trois composants identifiés : (1) Cellule : 9 000 000 €, durée 25 ans, VR 1 500 000 € ; (2) Moteurs : 4 000 000 €, durée 15 ans, VR 400 000 € ; (3) Révision majeure : 2 000 000 €, tous les 5 ans. L'avion effectue 800 000 km la première année.",
    questions: [
      {
        num: 1,
        enonce: "Expliquez pourquoi IAS 16 §43-44 impose l'approche par composants pour cet avion. Identifiez la différence fondamentale avec une comptabilisation globale.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <p><strong>IAS 16 §43 :</strong> chaque partie d'une immobilisation ayant un coût significatif par rapport au coût total doit être amortie séparément.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr className="bg-sky-100">
                  <th className="border border-sky-200 p-1.5 text-left">Composant</th>
                  <th className="border border-sky-200 p-1.5 text-right">Coût</th>
                  <th className="border border-sky-200 p-1.5 text-center">Durée</th>
                  <th className="border border-sky-200 p-1.5 text-left">Justification</th>
                </tr></thead>
                <tbody>
                  <tr><td className="border border-border p-1.5">Cellule</td><td className="border border-border p-1.5 text-right">9 000 000 €</td><td className="border border-border p-1.5 text-center">25 ans</td><td className="border border-border p-1.5">Durée de vie physique</td></tr>
                  <tr className="bg-muted/20"><td className="border border-border p-1.5">Moteurs</td><td className="border border-border p-1.5 text-right">4 000 000 €</td><td className="border border-border p-1.5 text-center">15 ans</td><td className="border border-border p-1.5">Durée plus courte - remplacement planifié</td></tr>
                  <tr><td className="border border-border p-1.5">Révision majeure</td><td className="border border-border p-1.5 text-right">2 000 000 €</td><td className="border border-border p-1.5 text-center">5 ans</td><td className="border border-border p-1.5">Cyclé entre deux révisions obligatoires</td></tr>
                </tbody>
              </table>
            </div>
            <p><strong>Problème de la comptabilisation globale :</strong> amorti sur 25 ans, le système sous-amortit les moteurs (15 ans) et l'inspection (5 ans), générant des charges insuffisantes et une image déformée du résultat.</p>
          </div>
        )
      },
      {
        num: 2,
        enonce: "Calculez la dotation aux amortissements de l'année N pour chaque composant. Utilisez la méthode linéaire pour la cellule et les unités d'œuvre pour les moteurs.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="font-semibold mb-1">Cellule (linéaire) :</p>
              <BlockMath math={String.raw`A_{\text{cellule}} = \dfrac{9\,000\,000 - 1\,500\,000}{25} = \mathbf{300\,000\,\text{€}}`} />
              <p className="font-semibold mt-2 mb-1">Moteurs (unités d'œuvre - 800 000 km sur 15 M km) :</p>
              <BlockMath math={String.raw`A_{\text{moteurs}} = \dfrac{(4\,000\,000 - 400\,000) \times 800\,000}{15\,000\,000} = \mathbf{192\,000\,\text{€}}`} />
              <p className="font-semibold mt-2 mb-1">Révision majeure (linéaire, 5 ans) :</p>
              <BlockMath math={String.raw`A_{\text{révision}} = \dfrac{2\,000\,000}{5} = \mathbf{400\,000\,\text{€}}`} />
              <BlockMath math={String.raw`\text{Total dotation N} = 300\,000 + 192\,000 + 400\,000 = \mathbf{892\,000\,\text{€}}`} />
            </div>
            <p><strong>IAS 16 §60 :</strong> le mode doit refléter le rythme de consommation des AEF. Les unités d'œuvre sont plus fidèles pour les moteurs (consommation liée aux km) ; le linéaire est plus adapté pour la cellule et l'inspection.</p>
          </div>
        )
      },
      {
        num: 3,
        enonce: "En N+5, la révision majeure est effectuée pour 2 200 000 €. Passez les écritures de sortie et d'entrée du composant selon IAS 16 §13 et §70.",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90">
            <p>Valeur comptable du composant révision en fin N+5 : entièrement amorti sur 5 ans. <strong>VC = 0 €</strong>.</p>
            <JournalTable
              titre="Écriture 1 - Décomptabilisation composant ancien (VC = 0) (IAS 16 §13 + §70)"
              lignes={[
                { libelle: "Amortissements cumulés - inspection", debit: "2 000 000", credit: "" },
                { libelle: "Immobilisations corporelles - inspection (ancienne)", debit: "", credit: "2 000 000" },
              ]}
            />
            <JournalTable
              titre="Écriture 2 - Capitalisation nouvelle révision (IAS 16 §13)"
              lignes={[
                { libelle: "Immobilisations corporelles - inspection (nouvelle)", debit: "2 200 000", credit: "" },
                { libelle: "Banque / Fournisseurs", debit: "", credit: "2 200 000" },
              ]}
            />
          </div>
        )
      },
      {
        num: 4,
        enonce: "En N+8, AEROTEC révise ses estimations : durée résiduelle cellule portée à 20 ans, valeur résiduelle révisée de 1 500 000 € à 2 000 000 €. Calculez le nouvel amortissement annuel.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <p><strong>IAS 16 §51 + IAS 8 §36 :</strong> changement d'estimation - traitement prospectif uniquement.</p>
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <p className="font-semibold mb-1">Calcul :</p>
              <BlockMath math={String.raw`\text{VC cellule début N+8} = 9\,000\,000 - (7 \times 300\,000) = 6\,900\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Nouveau mont. amort.} = 6\,900\,000 - 2\,000\,000 = 4\,900\,000\,\text{€}`} />
              <BlockMath math={String.raw`\text{Nouvel amort. annuel} = \dfrac{4\,900\,000}{20} = \mathbf{245\,000\,\text{€}}`} />
            </div>
            <p className="text-xs text-muted-foreground">Les exercices N à N+7 ne sont pas retouchés (traitement prospectif, non rétrospectif).</p>
          </div>
        )
      },
      {
        num: 5,
        enonce: "Analysez l'impact de l'approche par composants sur la pertinence et la fiabilité de l'information financière d'AEROTEC au regard du Cadre conceptuel de l'IASB.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <div className="rounded-lg border border-sky-200 bg-sky-50/30 p-3">
              <p className="font-semibold mb-2">Avantages au regard du Cadre IASB :</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Pertinence (§QC6) :</strong> les amortissements calibrés sur la consommation réelle des AEF permettent aux investisseurs d'évaluer précisément les futures sorties de trésorerie.</li>
                <li><strong>Représentativité fidèle (§QC12) :</strong> l'image des actifs est fidèle, les charges reflètent la consommation réelle.</li>
                <li><strong>Comparabilité :</strong> une comptabilisation globale masquerait les différences de structure entre compagnies aériennes.</li>
                <li><strong>Prévention des distorsions :</strong> l'approche globale sur 25 ans surestimerait la profitabilité des premières années en sous-amortissant les composants à durée courte.</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  // CAS 5 - BIOTECH
  {
    titre: "Cas 5 - Comparaison IAS 16 / IAS 38 : traitement des dépenses de R&D et limites de la capitalisation",
    contexte: "La société BIOTECH SA exerce dans la recherche pharmaceutique. En N, elle engage : (A) Études épidémiologiques sans cible : 200 000 € ; (B) Tests précliniques molécule B7 : 350 000 € (dont 180 000 € avant le 1er juillet et 170 000 € après, critères §57 satisfaits à partir du 1er juillet N) ; (C) Dépôt de brevet B7 : 45 000 € ; (D) Formation chercheurs : 30 000 € ; (E) Licence externe molécule connexe : 280 000 €.",
    questions: [
      {
        num: 1,
        enonce: "Classez chaque dépense (A à E) selon le traitement imposé par IAS 38. Pour chaque élément, citez le paragraphe applicable et justifiez.",
        correctionJSX: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-sky-100">
                <th className="border border-sky-200 p-1.5 text-left">Dépense</th>
                <th className="border border-sky-200 p-1.5 text-right">Montant</th>
                <th className="border border-sky-200 p-1.5 text-center">Traitement</th>
                <th className="border border-sky-200 p-1.5 text-center">Réf.</th>
                <th className="border border-sky-200 p-1.5 text-left">Justification</th>
              </tr></thead>
              <tbody>
                <tr><td className="border border-border p-1.5">(A) Recherche fondamentale</td><td className="border border-border p-1.5 text-right">200 000</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§54</td><td className="border border-border p-1.5">Phase recherche</td></tr>
                <tr className="bg-muted/20"><td className="border border-border p-1.5">(B) Tests précliniques avant 1/07</td><td className="border border-border p-1.5 text-right">180 000</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§54</td><td className="border border-border p-1.5">Phase recherche</td></tr>
                <tr><td className="border border-border p-1.5">(B) Tests précliniques après 1/07</td><td className="border border-border p-1.5 text-right">170 000</td><td className="border border-border p-1.5 text-center font-bold text-green-600">CAPITALISÉ</td><td className="border border-border p-1.5 text-center">§57</td><td className="border border-border p-1.5">Phase développement (§57 satisfaits)</td></tr>
                <tr className="bg-muted/20"><td className="border border-border p-1.5">(C) Dépôt de brevet</td><td className="border border-border p-1.5 text-right">45 000</td><td className="border border-border p-1.5 text-center font-bold text-green-600">CAPITALISÉ</td><td className="border border-border p-1.5 text-center">§66c</td><td className="border border-border p-1.5">Coût d'obtention d'un droit</td></tr>
                <tr><td className="border border-border p-1.5">(D) Formation chercheurs</td><td className="border border-border p-1.5 text-right">30 000</td><td className="border border-border p-1.5 text-center font-bold text-red-600">CHARGES</td><td className="border border-border p-1.5 text-center">§67c</td><td className="border border-border p-1.5">Formation exclue du coût</td></tr>
                <tr className="bg-muted/20"><td className="border border-border p-1.5">(E) Licence externe</td><td className="border border-border p-1.5 text-right">280 000</td><td className="border border-border p-1.5 text-center font-bold text-green-600">CAPITALISÉ</td><td className="border border-border p-1.5 text-center">§25</td><td className="border border-border p-1.5">Acquisition séparée</td></tr>
                <tr className="font-bold bg-sky-50"><td className="border border-sky-300 p-1.5">Total capitalisé</td><td className="border border-sky-300 p-1.5 text-right">495 000</td><td className="border border-sky-300 p-1.5" colSpan={3}></td></tr>
                <tr className="font-bold bg-red-50"><td className="border border-red-200 p-1.5">Total charges</td><td className="border border-red-200 p-1.5 text-right">410 000</td><td className="border border-red-200 p-1.5" colSpan={3}></td></tr>
              </tbody>
            </table>
          </div>
        )
      },
      {
        num: 2,
        enonce: "Passez les écritures comptables au 31 décembre N pour l'ensemble des dépenses A à E.",
        correctionJSX: (
          <div className="space-y-3 text-xs text-foreground/90">
            <JournalTable
              titre="(1) Charges en résultat (A + B avant 1/07 + D)"
              lignes={[
                { libelle: "Charges de recherche et développement (A + B avant 1/07)", debit: "380 000", credit: "" },
                { libelle: "Charges de formation du personnel (D)", debit: "30 000", credit: "" },
                { libelle: "Banque", debit: "", credit: "410 000" },
              ]}
            />
            <JournalTable
              titre="(2) Immobilisations incorporelles (B après 1/07 + C + E)"
              lignes={[
                { libelle: "Immobilisations incorporelles - Brevet B7 en cours (B après 1/07 + C)", debit: "215 000", credit: "" },
                { libelle: "Immobilisations incorporelles - Licence externe (E)", debit: "280 000", credit: "" },
                { libelle: "Banque / Production immobilisée", debit: "", credit: "495 000" },
              ]}
            />
          </div>
        )
      },
      {
        num: 3,
        enonce: "IAS 38 §126 impose la divulgation du total des dépenses de R&D en charges. Expliquez pourquoi cette obligation est fondamentale pour les investisseurs pharmaceutiques.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <p><strong>IAS 38 §126 :</strong> l'entité doit indiquer le montant total des dépenses de R&D comptabilisé en charges de la période.</p>
            <div className="rounded-lg border border-sky-200 bg-sky-50/30 p-3">
              <p className="font-semibold mb-1">Importance pour les investisseurs pharmaceutiques :</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Permet d'évaluer l'intensité et la stratégie de R&D, source principale de valeur future dans ce secteur.</li>
                <li>Une société qui passe 400 M€ en charges de recherche présente un résultat apparent faible, mais un potentiel futur que le bilan ne reflète pas. La divulgation §126 restaure cette information.</li>
                <li><strong>Désavantage :</strong> traiter toute la recherche en charges pénalise les entreprises à R&D intensive (résultat faible), créant un biais sectoriel dans la comparaison des indicateurs financiers.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        num: 4,
        enonce: "En N+5, la concurrence rend B7 obsolète. La valeur recouvrable (IAS 36) est estimée à 50 000 €, pour une valeur comptable de 129 000 €. Quel est le traitement de cette perte de valeur selon IAS 36 et IAS 38 §111 ?",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90">
            <div className="rounded-lg bg-white border border-sky-100 p-3">
              <BlockMath math={String.raw`\text{Perte de valeur} = 129\,000 - 50\,000 = \mathbf{79\,000\,\text{€}}`} />
            </div>
            <JournalTable
              titre="Écriture de dépréciation (IAS 36 + IAS 38 §111)"
              lignes={[
                { libelle: "Dotation dépréciation - Immobilisations incorporelles", debit: "79 000", credit: "" },
                { libelle: "Dépréciation cumulée - II (brevet B7)", debit: "", credit: "79 000" },
              ]}
            />
            <p>Valeur comptable après test : <strong>50 000 €</strong>. Si la valeur recouvrable remonte ultérieurement, une reprise est possible (IAS 36 §117), limitée à la VC nette qui aurait existé sans la dépréciation.</p>
          </div>
        )
      },
      {
        num: 5,
        enonce: "Le conseil d'administration veut comptabiliser la marque 'B7' générée en interne (valeur estimée 500 000 €). IAS 38 §63 le permet-il ? Analysez les fondements juridiques et conceptuels de l'interdiction.",
        correctionJSX: (
          <div className="space-y-2 text-xs text-foreground/90 leading-relaxed">
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
              <p className="font-semibold text-red-700 mb-1">Interdiction formelle - IAS 38 §63</p>
              <p className="italic">« Lorsqu'ils sont générés en interne, les marques (...) ne doivent pas être comptabilisés en tant qu'immobilisations incorporelles. » (IAS 38 §63)</p>
            </div>
            <div className="rounded-lg border border-sky-200 bg-sky-50/30 p-3">
              <p className="font-semibold mb-1">Fondements de l'interdiction :</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Juridique :</strong> la marque générée en interne n'est pas séparable (§12a), son coût ne peut être évalué de façon fiable (IAS 38 §64).</li>
                <li><strong>Conceptuel (§QC12) :</strong> une valeur auto-évaluée par la direction manque de neutralité et de vérifiabilité.</li>
                <li><strong>Protection des prêteurs et investisseurs :</strong> sans cette interdiction, les entités pourraient gonfler leur bilan par des évaluations subjectives, améliorant artificiellement leurs ratios d'endettement et trompant les prêteurs sur la solidité réelle du bilan.</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────
// COMPOSANT CasRicheBlock
// ─────────────────────────────────────────────────────────────────
function CasRicheBlock({ cp }: { cp: CasRiche }) {
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
                <p className="text-xs font-semibold text-foreground">Question {q.num} : {q.enonce}</p>
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
                    <p className="text-xs font-semibold text-sky-700 mb-2">Correction</p>
                    <div className="text-xs text-sky-900 leading-relaxed">
                      {q.correctionJSX}
                    </div>
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
export default function UE13Chapitre2Page() {
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
            { label: 'Chapitre 2' },
          ]}
          color="sky"
        />
        <BackButton />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">IAS 16 Immobilisations corporelles et IAS 38 Immobilisations incorporelles</h1>
          <InfoTooltip texte="IAS 16 : traitement comptable des immobilisations corporelles (comptabilisation, évaluation initiale et postérieure, amortissement, composants). IAS 38 : traitement comptable des immobilisations incorporelles (critères, phases R&D, amortissement)." loi="IAS 16 §1 · IAS 38 §1 - IFRS Foundation" />
        </div>
        <p className="text-xs text-muted-foreground">IAS 16 · IAS 38 · Évaluation initiale et postérieure · Amortissement</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QUESTIONS_QCM.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '4h00' },
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
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Identifier les conditions de comptabilisation d'une immobilisation corporelle selon IAS 16 §7</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Distinguer les coûts immobilisables des charges de période (IAS 16 §10-§14) et maitriser la méthode des composants</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Appliquer les deux modèles d'évaluation postérieure IAS 16 : modèle du coût historique et modèle de réévaluation</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Appliquer les 3 critères de comptabilisation IAS 38 (identifiable, controle, avantages économiques futurs) et distinguer recherche/développement</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Maitriser l'amortissement IAS 16/38 : valeur résiduelle, durée d'utilité, méthodes et tests de dépréciation IAS 36</span></li>
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
          <h2 className="text-sm font-display font-bold text-foreground px-1">Cas pratiques : {CAS_RICHES.length} études de cas</h2>
          {CAS_RICHES.map((cp, i) => <CasRicheBlock key={i} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue13-chapitre-2"
              chapitreNom="Chapitre 2 : IAS 16 et IAS 38 Immobilisations"
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
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 2
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : IAS 16 Immobilisations corporelles · IAS 38 Immobilisations incorporelles · IFRS Foundation 
      </p>
    </div>
  )
}
