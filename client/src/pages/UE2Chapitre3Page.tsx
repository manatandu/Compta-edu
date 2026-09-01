import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Users, AlertTriangle, Scale,
  ChevronRight, Gavel
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

const LECONS: Lecon[] = [
  {
    id: 'l1',
    icone: <Users className="h-5 w-5" />,
    titre: "La SNC : Définition, responsabilité et intuitu personae (Art. 270-273)",
    badge: 'Art. 270-273 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'article 270 AUSCGIE définit la Société en Nom Collectif (SNC) comme celle dans laquelle <strong>tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales</strong>.<InfoTooltip texte="La SNC est quasi inexistante en pratique dans l'espace OHADA. La responsabilité illimitée sur le patrimoine personnel est incompatible avec les réalités économiques. La SARL et la SAS ont largement supplanté la SNC." loi="Art. 270 AUSCGIE" />
        </p>

        <p className="font-semibold">1.1 Les trois piliers de la SNC</p>
        <div className="space-y-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">1. Tous les associés ont la qualité de commerçant</p>
            <p className="text-xs text-muted-foreground">Conséquence : un mineur non émancipé ne peut pas être associé. Des époux ne peuvent pas s'associer (Art. 9). Les personnes frappées d'incompatibilité professionnelle avec le commerce non plus.</p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-3">
            <p className="text-xs font-semibold text-orange-700 mb-1">2. Responsabilité indéfinie</p>
            <p className="text-xs text-muted-foreground">Chaque associé répond des dettes sociales sur la totalité de son patrimoine personnel, sans aucune limite. Les créanciers peuvent saisir immeubles, véhicules, comptes bancaires, salaires, etc. Aucun bouclier patrimonial.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">3. Responsabilité solidaire</p>
            <p className="text-xs text-muted-foreground">Le créancier peut choisir librement contre quel associé agir et lui réclamer la totalité de la dette. Il poursuivra naturellement l'associé le plus solvable. L'associé qui a trop payé dispose ensuite d'un recours en contribution contre ses co-associés.</p>
          </div>
        </div>

        <p className="font-semibold">1.2 La procédure préalable aux poursuites (Art. 271)</p>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-1">Art. 271 AUSCGIE - Condition préalable impérative</p>
          <p className="text-xs text-muted-foreground">Avant de poursuivre un associé personnellement, le créancier doit : (1) mettre en demeure la société par acte d'huissier ou moyen traçable, et (2) attendre 60 jours sans paiement. Le juge peut proroger jusqu'à 30 jours supplémentaires. Sans cette mise en demeure, les poursuites contre les associés sont <strong>irrecevables</strong>.</p>
        </div>

        <p className="font-semibold">1.3 L'intuitu personae - principe cardinal</p>
        <p>
          Le principe d'intuitu personae (en considération de la personne) est le fondement philosophique de la SNC. Il explique les règles strictes en matière de cession (unanimité requise), de décès (dissolution en principe), et d'information (tout associé peut contrôler la gestion).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Caractéristique</th>
                <th className="text-left p-2 border border-border">Règle SNC</th>
                <th className="text-left p-2 border border-border">Référence</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Qualité des associés", "Tous commerçants", "Art. 270"],
                ["Responsabilité", "Indéfinie et solidaire sur patrimoine personnel", "Art. 270"],
                ["Poursuite d'un associé", "Mise en demeure préalable société + 60 jours min.", "Art. 271"],
                ["Capital minimum", "Aucun (libre)", "Art. 273"],
                ["Cession des parts", "Unanimité de tous les associés", "Art. 274"],
                ["CAC obligatoire", "Si 2/3 seuils : bilan > 250M, CA > 500M, effectif > 50", "Art. 289-1"],
              ].map(([car, regle, ref], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{car}</td>
                  <td className="p-2 border border-border text-muted-foreground">{regle}</td>
                  <td className="p-2 border border-border text-slate-600">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l1q1',
        question: "Selon l'Art. 270 AUSCGIE, quelle est la définition légale exacte de la SNC ?",
        options: [
          { id: 'a', texte: "Société dont les associés répondent dans la limite de leurs apports" },
          { id: 'b', texte: "Société dans laquelle tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales" },
          { id: 'c', texte: "Société dont le capital est divisé en actions librement négociables" },
          { id: 'd', texte: "Société dans laquelle coexistent des associés à responsabilité limitée et illimitée" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 270 AUSCGIE définit la SNC comme celle dans laquelle tous les associés sont commerçants et répondent indéfiniment (sur tout leur patrimoine personnel) et solidairement (chacun peut être poursuivi pour la totalité) des dettes sociales.",
        articleRef: 'Art. 270 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l1q2',
        question: "Avant de poursuivre un associé de SNC, que doit obligatoirement faire le créancier ?",
        options: [
          { id: 'a', texte: "Saisir directement les biens personnels de l'associé le plus solvable" },
          { id: 'b', texte: "Obtenir un jugement favorable contre la société" },
          { id: 'c', texte: "Mettre la société en demeure et attendre 60 jours sans paiement (Art. 271 AUSCGIE)" },
          { id: 'd', texte: "Notifier tous les associés individuellement" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 271 AUSCGIE impose une condition préalable impérative : le créancier doit mettre en demeure la société (par acte d'huissier ou tout moyen traçable) et attendre au minimum 60 jours. Sans cette mise en demeure, les poursuites contre les associés sont irrecevables.",
        articleRef: 'Art. 271 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l1q3',
        question: "Des époux peuvent-ils être associés ensemble dans une SNC ?",
        options: [
          { id: 'a', texte: "Oui, sans restriction aucune" },
          { id: 'b', texte: "Oui, si leur régime matrimonial est la séparation de biens" },
          { id: 'c', texte: "Non, l'Art. 9 AUSCGIE l'interdit expressément" },
          { id: 'd', texte: "Oui, mais uniquement si l'un d'eux n'est pas gérant" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 9 AUSCGIE interdit aux époux d'être associés dans une société où ils seraient tenus indéfiniment et solidairement des dettes. La SNC entre exactement dans cette catégorie.",
        articleRef: 'Art. 9 AUSCGIE',
      },
    ],
  },

  {
    id: 'l2',
    icone: <Gavel className="h-5 w-5" />,
    titre: "La SNC : Cession des parts et gérance (Art. 274-282)",
    badge: 'Art. 274-282 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p className="font-semibold">2.1 La cession des parts sociales (Art. 274-275)</p>
        <p>
          La cession des parts d'une SNC est l'une des opérations les plus encadrées du droit OHADA. L'article 274 AUSCGIE pose le principe de <strong>l'unanimité</strong> : les parts ne peuvent être cédées qu'avec le consentement unanime de tous les associés. Toute cession intervenue sans ce consentement est nulle de plein droit.
        </p>

        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-xs font-semibold mb-2">Formalités de cession (Art. 275) - trois voies possibles</p>
          <div className="space-y-2">
            {[
              { num: "1", title: "Signification par acte d'huissier", desc: "Notification formelle à la société par acte extrajudiciaire. Voie la plus sécurisante juridiquement." },
              { num: "2", title: "Acceptation dans un acte authentique", desc: "La société accepte formellement la cession dans un acte notarié. La date d'acceptation marque l'opposabilité à la société." },
              { num: "3", title: "Dépôt d'un original au siège social", desc: "Remise d'un original de l'acte de cession contre attestation de dépôt. Voie la plus simple en pratique." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex gap-2 items-start">
                <div className="bg-slate-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">{num}</div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2"><strong>Opposabilité aux tiers :</strong> après l'une de ces formalités, la cession doit être publiée par dépôt en annexe au RCCM (Art. 275 al. 3).</p>
        </div>

        <p className="font-semibold">2.2 L'organisation de la gérance (Art. 276-282)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Situation</th>
                <th className="text-left p-2 border border-border">Règle applicable</th>
                <th className="text-left p-2 border border-border">Article</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Aucune clause statutaire", "Tous les associés sont gérants de droit", "Art. 276 al. 3"],
                ["Pouvoirs externes (vis-à-vis des tiers)", "Engage la société pour tout acte dans l'objet social", "Art. 277-1"],
                ["Clauses limitant les pouvoirs du gérant", "Inopposables aux tiers de bonne foi", "Art. 277-1"],
                ["Révocation gérant statutaire (associé)", "Unanimité des autres associés - peut entraîner dissolution", "Art. 279"],
                ["Révocation gérant non statutaire", "Majorité en nombre et capital", "Art. 280"],
                ["Révocation sans justes motifs", "Droit à dommages et intérêts pour le gérant", "Art. 281"],
              ].map(([sit, regle, art], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{sit}</td>
                  <td className="p-2 border border-border text-muted-foreground">{regle}</td>
                  <td className="p-2 border border-border text-slate-600 font-medium">{art}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">2.3 Rémunération du gérant (Art. 278)</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Gérant non-associé :</strong> rémunération fixée par les associés à la majorité en nombre et en capital (Art. 278 al. 1).</span></li>
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Gérant associé :</strong> rémunération fixée par la majorité des AUTRES associés - le gérant ne vote pas sur sa propre rémunération (Art. 278 al. 2). Délibération contraire = nulle (Art. 278 al. 3).</span></li>
        </ul>

        <p className="font-semibold">2.4 Droit de retrait du gérant révoqué (Art. 280)</p>
        <p>
          Le gérant-associé révoqué peut se retirer et demander le remboursement de ses parts. Valeur fixée par accord ou, à défaut, par un expert désigné par le juge à bref délai. Si la révocation est sans juste motif, le gérant a en plus droit à des dommages et intérêts (Art. 281) - ces droits sont cumulables.
        </p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l2q1',
        question: "Dans une SNC sans clause statutaire de gérance, qui assure la gestion ?",
        options: [
          { id: 'a', texte: "L'associé détenant le plus de parts sociales" },
          { id: 'b', texte: "Un gérant désigné par le RCCM" },
          { id: 'c', texte: "Tous les associés sont réputés être gérants (Art. 276 al. 3 AUSCGIE)" },
          { id: 'd', texte: "La société ne peut pas fonctionner" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 276 al. 3 AUSCGIE dispose qu'à défaut d'organisation statutaire de la gérance, tous les associés sont réputés être gérants. Chacun peut accomplir seul tous les actes de gestion dans l'intérêt de la société.",
        articleRef: 'Art. 276 al. 3 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q2',
        question: "La cession de parts sociales dans une SNC requiert :",
        options: [
          { id: 'a', texte: "L'accord d'une majorité de 2/3 des associés" },
          { id: 'b', texte: "Le consentement unanime de tous les associés (Art. 274 AUSCGIE)" },
          { id: 'c', texte: "Uniquement l'accord du gérant" },
          { id: 'd', texte: "L'autorisation du RCCM" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 274 AUSCGIE impose l'unanimité de tous les associés pour toute cession de parts sociales dans une SNC. Toute cession intervenue sans cet accord unanime est nulle de plein droit.",
        articleRef: 'Art. 274 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q3',
        question: "Que se passe-t-il si un gérant statutaire de SNC est révoqué ?",
        options: [
          { id: 'a', texte: "Il continue à gérer jusqu'à la prochaine AG" },
          { id: 'b', texte: "La révocation peut entraîner la dissolution de la société, sauf clause contraire (Art. 279)" },
          { id: 'c', texte: "Le RCCM nomme un gérant provisoire" },
          { id: 'd', texte: "La révocation n'est pas possible pour un gérant statutaire" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 279 AUSCGIE prévoit que la révocation d'un gérant désigné dans les statuts peut entraîner la dissolution de la société, sauf si les statuts prévoient la continuation ou si les autres associés décident à l'unanimité de poursuivre l'activité.",
        articleRef: 'Art. 279 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q4',
        question: "Comment est fixée la rémunération d'un gérant qui est lui-même associé de SNC ?",
        options: [
          { id: 'a', texte: "Par le gérant lui-même" },
          { id: 'b', texte: "Par l'unanimité de tous les associés y compris le gérant" },
          { id: 'c', texte: "Par la majorité en nombre et capital des AUTRES associés, le gérant exclu (Art. 278 al. 2)" },
          { id: 'd', texte: "Par le conseil de surveillance" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 278 al. 2 AUSCGIE interdit au gérant-associé de voter sur sa propre rémunération. Celle-ci est fixée par la majorité en nombre et capital des autres associés. Toute délibération contraire est nulle (Art. 278 al. 3).",
        articleRef: 'Art. 278 al. 2 AUSCGIE',
      },
    ],
  },

  {
    id: 'l3',
    icone: <BookOpen className="h-5 w-5" />,
    titre: "La SNC : Décisions collectives et dissolution (Art. 283-292)",
    badge: 'Art. 283-292 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p className="font-semibold">3.1 Décisions collectives (Art. 283-284)</p>
        <p>
          L'article 283 AUSCGIE pose le principe de l'<strong>unanimité</strong> pour toutes les décisions dépassant les pouvoirs des gérants, sauf si les statuts prévoient expressément une majorité différente. Les décisions peuvent être prises en assemblée générale ou par consultation écrite.
        </p>

        <p className="font-semibold">3.2 L'Assemblée générale annuelle (Art. 288)</p>
        <p>
          Elle doit se tenir dans les <strong>6 mois</strong> suivant la clôture de l'exercice social. Sa mission : approuver les comptes annuels et affecter le résultat. Quorum requis : associés représentant au moins la moitié du capital. Convocation au moins 15 jours avant.
        </p>

        <p className="font-semibold">3.3 Droit de consultation des non-gérants (Art. 289)</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Fréquence :</strong> deux fois par an</span></li>
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Documents accessibles :</strong> tous les livres comptables, procès-verbaux des délibérations</span></li>
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Préavis obligatoire :</strong> 15 jours à l'avance par lettre recommandée ou moyen traçable</span></li>
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Assistance :</strong> expert-comptable ou commissaire aux comptes agréé, à leurs frais</span></li>
          <li className="flex items-start gap-2"><span className="text-slate-500 shrink-0">•</span><span><strong>Caractère d'ordre public :</strong> ce droit ne peut pas être supprimé ni restreint par les statuts</span></li>
        </ul>

        <p className="font-semibold">3.4 La dissolution de la SNC (Art. 290-292)</p>
        <div className="space-y-2">
          {[
            { cause: "Décès d'un associé (Art. 290 al. 1)", content: "Principe : le décès entraîne la dissolution. Exception : les statuts peuvent prévoir la continuation avec les associés survivants, avec les héritiers (avec ou sans agrément), ou selon toute autre modalité.", color: "border-red-200 bg-red-50/50" },
            { cause: "Héritiers mineurs non émancipés (Art. 290 al. 4)", content: "Si les héritiers sont des mineurs non émancipés, la société doit être transformée en SCS dans 1 an. Les mineurs deviennent commanditaires (responsabilité limitée). À défaut, dissolution de plein droit.", color: "border-orange-200 bg-orange-50/50" },
            { cause: "Incapacité, faillite, retrait (Art. 291)", content: "Le prononcé de l'incapacité, la faillite personnelle ou le retrait d'un associé entraînent en principe la dissolution, sauf clause statutaire contraire ou décision unanime des autres associés de continuer.", color: "border-amber-200 bg-amber-50/50" },
          ].map(({ cause, content, color }) => (
            <div key={cause} className={cn('rounded-xl border p-3', color)}>
              <p className="text-xs font-semibold text-foreground mb-1">{cause}</p>
              <p className="text-xs text-muted-foreground">{content}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
          <p className="text-xs font-semibold text-slate-700 mb-1">Remboursement des parts (Art. 292)</p>
          <p className="text-xs text-muted-foreground">En cas de refus d'agrément des héritiers ou de retrait d'un associé, les associés restants doivent racheter ses parts. Ils sont tenus <strong>indéfiniment et solidairement</strong> du paiement du prix de remboursement. Valeur fixée selon l'Art. 59 (accord amiable ou expert judiciaire).</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l3q1',
        question: "Combien de fois par an les associés non gérants peuvent-ils consulter les livres comptables ?",
        options: [
          { id: 'a', texte: "Une fois" },
          { id: 'b', texte: "Deux fois (Art. 289 AUSCGIE)" },
          { id: 'c', texte: "Trois fois" },
          { id: 'd', texte: "À tout moment sans restriction" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 289 AUSCGIE accorde aux associés non gérants un droit de consultation des livres et documents sociaux deux fois par an, avec un préavis de 15 jours aux gérants. Ce droit est d'ordre public et ne peut pas être supprimé par les statuts.",
        articleRef: 'Art. 289 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l3q2',
        question: "Un associé de SNC décède. Ses héritiers sont mineurs non émancipés et les statuts prévoient la continuation. Quelle transformation s'impose ?",
        options: [
          { id: 'a', texte: "Transformation en SA dans 6 mois" },
          { id: 'b', texte: "Dissolution immédiate" },
          { id: 'c', texte: "Transformation en SCS dans 1 an, les mineurs devenant commanditaires (Art. 290 al. 4)" },
          { id: 'd', texte: "Les mineurs reprennent les parts avec responsabilité illimitée" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 290 al. 4 AUSCGIE impose la transformation en SCS dans 1 an si des mineurs non émancipés héritent de parts de SNC (car les mineurs ne peuvent être commerçants). Les mineurs deviennent commanditaires (responsabilité limitée).",
        articleRef: 'Art. 290 al. 4 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l3q3',
        question: "Dans une SNC, l'AG annuelle doit se tenir dans quel délai ?",
        options: [
          { id: 'a', texte: "3 mois après la clôture" },
          { id: 'b', texte: "6 mois après la clôture (Art. 288 AUSCGIE)" },
          { id: 'c', texte: "9 mois après la clôture" },
          { id: 'd', texte: "12 mois après la clôture" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 288 AUSCGIE fixe à 6 mois après la clôture de l'exercice le délai pour tenir l'assemblée générale annuelle de la SNC. Ce délai est identique pour la SCS (Art. 306).",
        articleRef: 'Art. 288 AUSCGIE',
      },
    ],
  },

  {
    id: 'l4',
    icone: <Scale className="h-5 w-5" />,
    titre: "La SCS : Dualité commandités / commanditaires (Art. 293-301)",
    badge: 'Art. 293-301 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La Société en Commandite Simple (SCS) est une forme hybride qui combine deux catégories d'associés aux statuts radicalement différents.<InfoTooltip texte="L'Art. 293-1 AUSCGIE (révision 2014) prévoit que les règles de la SNC s'appliquent à la SCS sous réserve des règles spécifiques des Art. 293 à 308. La SCS est techniquement une SNC à deux vitesses." loi="Art. 293-1 AUSCGIE" />
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
            <p className="text-xs font-semibold text-red-700 mb-2">Commandités - Associés actifs</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {[
                "Statut identique aux associés SNC (commerçants)",
                "Responsabilité indéfinie et solidaire sur tout leur patrimoine",
                "Seuls habilités à gérer la société (Art. 298)",
                "Nom peut figurer dans la dénomination",
                "Mineurs non émancipés et époux ensemble : interdits",
              ].map((p, i) => <li key={i} className="flex items-start gap-1"><span className="text-red-500 shrink-0">•</span><span>{p}</span></li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
            <p className="text-xs font-semibold text-emerald-700 mb-2">Commanditaires - Investisseurs passifs</p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {[
                "Responsabilité limitée strictement à leurs apports",
                "Aucun acte de gestion externe - même par procuration (Art. 299)",
                "Avis, conseils, contrôle de surveillance : autorisés (Art. 301)",
                "Nom JAMAIS dans la dénomination sociale (Art. 294)",
                "Droit de communication 2 fois/an (Art. 307)",
              ].map((p, i) => <li key={i} className="flex items-start gap-1"><span className="text-emerald-500 shrink-0">•</span><span>{p}</span></li>)}
            </ul>
          </div>
        </div>

        <p className="font-semibold">4.1 Sanctions graves pour le commanditaire (Art. 294 et 300)</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">Nom dans la dénomination (Art. 294)</p>
            <p className="text-xs text-muted-foreground">Le commanditaire perd la protection de la responsabilité limitée et répond indéfiniment et solidairement des dettes sociales envers les tiers de bonne foi.</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">Acte de gestion externe (Art. 300)</p>
            <p className="text-xs text-muted-foreground">Il devient obligé indéfiniment et solidairement pour les engagements découlant de ses actes. Si la gravité est suffisante, le juge peut l'obliger pour TOUS les engagements de la société.</p>
          </div>
        </div>

        <p className="font-semibold">4.2 Mentions statutaires supplémentaires (Art. 295)</p>
        <p>En plus des 13 mentions communes, les statuts de la SCS doivent contenir :</p>
        <div className="space-y-1.5">
          {[
            "Le montant ou la valeur des apports de TOUS les associés (commandités et commanditaires)",
            "La part de chaque commandité ET de chaque commanditaire dans ce montant total d'apport",
            "La part globale des commandités et la part de chaque commanditaire dans les bénéfices et dans le boni de liquidation",
          ].map((mention, i) => (
            <div key={i} className="flex gap-2 items-start rounded-lg border border-border bg-muted/20 p-2">
              <div className="bg-slate-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <p className="text-xs text-muted-foreground">{mention}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l4q1',
        question: "Quelle est la définition légale de la SCS selon l'Art. 293 AUSCGIE ?",
        options: [
          { id: 'a', texte: "Société dans laquelle tous les associés ont une responsabilité limitée à leurs apports" },
          { id: 'b', texte: "Société dans laquelle coexistent des commandités (responsabilité illimitée) et des commanditaires (responsabilité limitée aux apports)" },
          { id: 'c', texte: "Société anonyme par actions simplifiée" },
          { id: 'd', texte: "Société dont le capital est divisé en actions cotées en bourse" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 293 AUSCGIE définit la SCS comme celle dans laquelle coexistent des commandités (commerçants, responsabilité indéfinie et solidaire) et des commanditaires (responsabilité limitée à leurs apports), le capital étant divisé en parts sociales.",
        articleRef: 'Art. 293 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l4q2',
        question: "Un commanditaire peut-il accomplir des actes de gestion externe même avec une procuration ?",
        options: [
          { id: 'a', texte: "Oui, avec une procuration validée par les commandités" },
          { id: 'b', texte: "Oui, pour les actes n'excédant pas 5 000 000 FCFA" },
          { id: 'c', texte: "Non, l'Art. 299 AUSCGIE interdit tout acte de gestion externe au commanditaire, même par procuration" },
          { id: 'd', texte: "Oui, si la procuration est notariée" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 299 AUSCGIE est catégorique : les commanditaires ne peuvent faire aucun acte de gestion externe, même en vertu d'une procuration. Cette interdiction est d'ordre public. Une procuration ne peut pas légaliser ce que la loi interdit.",
        articleRef: 'Art. 299 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l4q3',
        question: "Que risque un commanditaire dont le nom figure dans la dénomination sociale de la SCS ?",
        options: [
          { id: 'a', texte: "Une amende administrative" },
          { id: 'b', texte: "Il devient automatiquement commandité" },
          { id: 'c', texte: "Il répond indéfiniment et solidairement des dettes sociales (Art. 294 AUSCGIE)" },
          { id: 'd', texte: "La dénomination est nulle mais sans autre conséquence" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 294 al. 2 AUSCGIE prévoit que si le nom d'un commanditaire est incorporé dans la dénomination sociale, il perd la protection de la responsabilité limitée et répond indéfiniment et solidairement des dettes sociales envers les tiers de bonne foi.",
        articleRef: 'Art. 294 al. 2 AUSCGIE',
      },
    ],
  },

  {
    id: 'l5',
    icone: <AlertTriangle className="h-5 w-5" />,
    titre: "La SCS : Décisions, cession de parts et dissolution (Art. 302-308)",
    badge: 'Art. 302-308 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p className="font-semibold">5.1 Cession des parts (Art. 296-297)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Type de cession</th>
                <th className="text-left p-2 border border-border text-red-600">Principe</th>
                <th className="text-left p-2 border border-border text-emerald-600">Assouplissement possible</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Parts commanditaires entre commanditaires", "Unanimité tous associés", "Libre cession sans accord (clause statutaire)"],
                ["Parts commanditaires à un tiers", "Unanimité tous associés", "Accord commandités unanimes + majorité commanditaires"],
                ["Parts commanditées à un tiers", "Unanimité tous associés", "Accord commandités unanimes + majorité commanditaires"],
              ].map(([type, principe, assouplissement], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{type}</td>
                  <td className="p-2 border border-border text-red-600">{principe}</td>
                  <td className="p-2 border border-border text-emerald-600">{assouplissement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">5.2 Décisions collectives (Art. 302-307)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Type de décision</th>
                <th className="text-left p-2 border border-border">Règle applicable</th>
                <th className="text-left p-2 border border-border">Article</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["AG de droit peut être demandée par", "Un commandité OU 1/4 en nb et capital des commanditaires", "Art. 302 al. 3"],
                ["Modifications des statuts", "Unanimité des commandités + majorité en nb et capital des commanditaires", "Art. 305"],
                ["AG annuelle (comptes)", "Dans 6 mois clôture - quorum : 1/2 du capital", "Art. 306"],
                ["Droit de communication annuel", "2 fois/an pour commanditaires ET commandités non gérants", "Art. 307"],
              ].map(([dec, regle, art], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{dec}</td>
                  <td className="p-2 border border-border text-muted-foreground">{regle}</td>
                  <td className="p-2 border border-border text-slate-600 font-medium">{art}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">5.3 Dissolution de la SCS (Art. 308) et comparatif SNC / SCS</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Décès d'un commanditaire</p>
            <p className="text-xs text-muted-foreground">La SCS continue de plein droit. Le décès d'un commanditaire ne provoque pas de dissolution. Différence fondamentale avec la SNC.</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">Décès de l'unique commandité</p>
            <p className="text-xs text-muted-foreground">Situation critique. Si ses héritiers sont mineurs, ils deviennent commanditaires. La société doit être transformée ou un nouveau commandité nommé dans 1 an. À défaut, dissolution.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <p className="text-xs font-semibold mb-2">Comparatif SNC / SCS</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Critère</th>
                <th className="text-center p-2 border border-border">SNC</th>
                <th className="text-center p-2 border border-border">SCS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Associés", "Tous homogènes", "2 catégories (commandités/commanditaires)"],
                ["Responsabilité", "Illimitée pour tous", "Illimitée cmd. / Limitée cmt."],
                ["Gérance", "Tous associés (par défaut)", "Commandités seulement"],
                ["Cession parts (principe)", "Unanimité (Art. 274)", "Unanimité, assouplissements (Art. 296)"],
                ["Décès associé", "Dissolution en principe (Art. 290)", "Continue si commanditaire décède (Art. 308)"],
              ].map(([crit, snc, scs], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold">{crit}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{snc}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{scs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l5q1',
        question: "Quelle majorité est requise pour modifier les statuts d'une SCS ?",
        options: [
          { id: 'a', texte: "Majorité simple de tous les associés" },
          { id: 'b', texte: "Unanimité de tous les associés (commandités + commanditaires)" },
          { id: 'c', texte: "Unanimité des commandités + majorité des commanditaires (Art. 305)" },
          { id: 'd', texte: "Majorité des commandités uniquement" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 305 AUSCGIE requiert l'unanimité de tous les associés commandités ET la majorité en nombre et en capital des commanditaires pour toute modification des statuts de la SCS.",
        articleRef: 'Art. 305 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l5q2',
        question: "Que se passe-t-il lors du décès d'un associé commanditaire dans une SCS ?",
        options: [
          { id: 'a', texte: "La SCS est dissoute de plein droit" },
          { id: 'b', texte: "La SCS continue - le décès d'un commanditaire ne met pas fin à la société (Art. 308)" },
          { id: 'c', texte: "Les héritiers doivent obligatoirement être agréés par les commandités" },
          { id: 'd', texte: "La SCS doit être transformée en SNC dans 1 an" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 308 AUSCGIE dispose expressément que la SCS continue malgré le décès d'un associé commanditaire. C'est une différence fondamentale avec la SNC où le décès d'un associé entraîne en principe la dissolution.",
        articleRef: 'Art. 308 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l5q3',
        question: "Un commanditaire peut-il exercer un contrôle sur la gestion de la SCS sans perdre sa responsabilité limitée ?",
        options: [
          { id: 'a', texte: "Non, tout contrôle lui est interdit" },
          { id: 'b', texte: "Oui, il peut donner des avis, des conseils et exercer un contrôle de surveillance sans engager sa responsabilité (Art. 301)" },
          { id: 'c', texte: "Oui, mais uniquement pour les actes inférieurs à 1 000 000 FCFA" },
          { id: 'd', texte: "Non, sauf autorisation expresse des commandités" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 301 AUSCGIE autorise expressément les actes de surveillance et de contrôle (avis, conseils, vérification des livres via l'Art. 307). Ces actes ne constituent pas une gestion externe et ne font pas perdre la responsabilité limitée au commanditaire.",
        articleRef: 'Art. 301 AUSCGIE',
      },
    ],
  },
]

const QCM_GLOBAL: QCMQuestion[] = LECONS.flatMap(l =>
  l.questions.filter((q): q is QCMQuestion => q.type === 'qcm')
)

interface CasPratiqueEtude {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
  articleRef: string
}

const ETUDES_DE_CAS: CasPratiqueEtude[] = [
  {
    id: 'ec1',
    titre: 'SNC MUANDA TRADING : décès d\'un associé',
    contexte: "La SNC MUANDA TRADING comprend 3 associés : BONDO (35 parts), KALO (40 parts) et MWILA (25 parts). Les statuts prévoient la continuation avec les associés survivants et les héritiers agréés. BONDO décède. Ses héritiers sont : sa femme NGOZI (adulte) et ses enfants JULES (17 ans) et MARIE (14 ans), tous deux mineurs non émancipés. Aucun des héritiers n'est agréé unanimement par les associés survivants.",
    questions: [
      { num: 1, enonce: "Sans clause de continuation, que se serait-il passé au décès de BONDO ?", correction: "En l'absence de clause statutaire de continuation, le décès de BONDO aurait entraîné la dissolution de plein droit de la SNC (Art. 290 al. 1 AUSCGIE). La clause prévoyant la continuation écarte cette dissolution automatique." },
      { num: 2, enonce: "JULES et MARIE peuvent-ils devenir associés de la SNC ?", correction: "Non. Les mineurs non émancipés ne peuvent pas être associés d'une SNC car la qualité de commerçant leur est interdite (Art. 8 et 270 AUSCGIE). La société devrait être transformée en SCS dans 1 an (Art. 290 al. 4), les mineurs devenant commanditaires." },
      { num: 3, enonce: "Les héritiers n'étant pas agréés, quelles obligations s'imposent à KALO et MWILA ?", correction: "KALO et MWILA doivent racheter les parts de BONDO (Art. 290 al. 2). La valeur est fixée selon l'Art. 59 AUSCGIE (accord ou expert judiciaire). Ils sont tenus indéfiniment et solidairement du paiement du prix de ces parts (Art. 292 al. 2)." },
    ],
    articleRef: 'Art. 270, 290, 292 AUSCGIE',
  },
  {
    id: 'ec2',
    titre: 'SCS KIVU INVEST : immixtion du commanditaire',
    contexte: "La SCS KIVU INVEST a un commandité (MUTOMBO) et deux commanditaires (TSHIMANGA - 80% du capital, KAYEMBE - 20%). Mécontent de la gestion de MUTOMBO, TSHIMANGA prend trois initiatives : (A) il envoie une note de conseils stratégiques, (B) il signe seul un contrat d'approvisionnement de 5 000 USD, (C) il consulte les livres de comptes deux fois dans l'année avec préavis de 15 jours.",
    questions: [
      { num: 1, enonce: "Analyser chacune des trois actions de TSHIMANGA", correction: "(A) Autorisé - L'Art. 301 AUSCGIE autorise les avis et conseils, qui ne constituent pas une gestion externe. (B) INTERDIT - L'Art. 299 interdit tout acte de gestion externe même par procuration. TSHIMANGA devient responsable indéfiniment et solidairement des engagements de cet acte (Art. 300). (C) Autorisé - Le droit de communication de l'Art. 307 permet aux commanditaires de contrôler la gestion sans gérer eux-mêmes. Avec le préavis de 15 jours, la procédure est parfaitement régulière." },
    ],
    articleRef: 'Art. 299, 300, 301, 307 AUSCGIE',
  },
  {
    id: 'ec3',
    titre: 'SNC BUKAVU NEGOCE : créancier et délai de 60 jours',
    contexte: "La SNC BUKAVU NEGOCE doit 10 000 USD à RAWINDO. Sans paiement depuis 3 mois, RAWINDO veut poursuivre KEZA, l'une des trois associées. RAWINDO n'a pas encore formellement mis en demeure la société. Il envisage : (1) d'agir directement contre KEZA aujourd'hui, (2) d'agir dans 45 jours après une mise en demeure par téléphone.",
    questions: [
      { num: 1, enonce: "RAWINDO peut-il agir immédiatement contre KEZA ?", correction: "Non. L'Art. 271 AUSCGIE impose une mise en demeure de la société par acte d'huissier ou moyen traçable, suivie d'un délai de 60 jours sans paiement. Sans cela, les poursuites sont irrecevables, c'est-à-dire rejetées par le juge sans examen au fond." },
      { num: 2, enonce: "Une mise en demeure par téléphone suffit-elle ? Et après 45 jours ?", correction: "Non - un appel téléphonique ne laisse pas de trace écrite opposable. Il faut un acte d'huissier, lettre recommandée avec AR, télécopie avec accusé, email avec confirmation de lecture. Et même avec une mise en demeure régulière, 45 jours sont insuffisants : le délai minimum légal est de 60 jours." },
    ],
    articleRef: 'Art. 271 AUSCGIE',
  },
]

function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-slate-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-slate-500 bg-slate-100 text-slate-800' : 'border-border hover:border-slate-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-slate-700 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-slate-800 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-lg p-2.5 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

function CasPratiqueBlock({ cp }: { cp: CasPratiqueEtude }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="h-7 w-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">C{cp.id.replace('ec', '')}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
            <p className="text-xs text-muted-foreground">{cp.articleRef}</p>
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
                {corrVisible.has(q.num) ? (
                  <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">Correction</p>
                    <p className="text-xs text-emerald-900 leading-relaxed">{q.correction}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrVisible(s => new Set([...s, q.num]))} className="text-xs text-slate-600 hover:underline font-medium">Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function UE2Chapitre3Page() {
  const goBack = useGoBack('/ue2-droit-societes')
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
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 3' },
          ]}
          color="indigo"
        />
        <BackButton />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">SNC et SCS : Sociétés de Personnes</h1>
          <InfoTooltip texte="SNC et SCS : sociétés de personnes à responsabilité illimitée" loi="Art. 270-308 AUSCGIE" />
        </div>
        <p className="text-xs text-muted-foreground">Art. 270-292 AUSCGIE (SNC) : Art. 293-308 AUSCGIE (SCS)</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '3h30' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-semibold text-slate-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-slate-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" /><span>Maîtriser la définition et les trois piliers de la SNC : commerçants, responsabilité indéfinie et solidaire (Art. 270)</span></li>
          <li className="flex items-start gap-2 text-xs text-slate-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" /><span>Appliquer la procédure préalable de mise en demeure avant poursuite d'un associé (Art. 271)</span></li>
          <li className="flex items-start gap-2 text-xs text-slate-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" /><span>Comprendre les règles de cession des parts (unanimité, Art. 274) et de gérance (Art. 276-282)</span></li>
          <li className="flex items-start gap-2 text-xs text-slate-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" /><span>Distinguer commandités et commanditaires dans la SCS et leurs droits/interdictions (Art. 293-301)</span></li>
          <li className="flex items-start gap-2 text-xs text-slate-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-500" /><span>Analyser les causes de dissolution et leurs spécificités SNC/SCS (Art. 290-292, 308)</span></li>
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-slate-700 text-white border-slate-700' : 'border-border hover:border-slate-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-slate-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600">Leçon {leconIdx + 1} / {LECONS.length}</span>
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
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-slate-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-slate-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-slate-700 text-white hover:bg-slate-800 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="slate" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-display font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} exercices</h2>
          {ETUDES_DE_CAS.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre-3"
              chapitreNom="Chapitre 3 : SNC et SCS - Sociétés de Personnes"
              questions={QCM_GLOBAL}
              coursId="ue2-droit-societes"
              casPratiquesExistants={ETUDES_DE_CAS.map(ec => ({
                id: ec.id,
                titre: ec.titre,
                enonce: ec.contexte + '\n' + ec.questions.map(q => q.num + '. ' + q.enonce).join('\n'),
                corrigeType: ec.questions.map(q => q.num + '. ' + q.correction).join('\n'),
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

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 3
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : AUSCGIE révisé 30/01/2014 à Ouagadougou · Art. 270-292 (SNC) · Art. 293-308 (SCS) · Art. 9 AUSCGIE
      </p>
    </div>
  )
}
