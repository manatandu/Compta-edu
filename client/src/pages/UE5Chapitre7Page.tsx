import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, FileText, Users, Scale, AlertTriangle,
  ChevronRight, RotateCcw, Gavel, Shield, Banknote, ClipboardCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStaffRole } from '@/lib/permissions'
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

type Lecon = {
  id: string
  icone: React.ReactNode
  titre: string
  soustitre: string
  contenu: React.ReactNode
  qcms: QCMQuestion[]
}

// ============================================================
// LECONS
// ============================================================
const LECONS: Lecon[] = [
  // ─── LECON 1 : Les 4 phases de la chaîne de la dépense ────────────────────
  {
    id: 'l1',
    icone: <ChevronRight className="h-5 w-5 text-violet-600" />,
    titre: 'Les 4 phases de la chaîne de la dépense (Art. 90 LOFIP)',
    soustitre: 'Engagement, Liquidation, Ordonnancement, Paiement - définitions légales',
    qcms: [
      {
        type: 'qcm', id: 'l1q1',
        question: "Selon l\'Art. 90 LOFIP, qu\'est-ce que l\'engagement en matière de dépenses ?",
        options: [
          { id: 'a', texte: "L\'acte par lequel le pouvoir central se libère de sa dette" },
          { id: 'b', texte: "L\'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge" },
          { id: 'c', texte: "L\'acte administratif donnant ordre au caissier de payer" },
          { id: 'd', texte: "La vérification de la réalité de la dette et l\'arrêt du montant exact" },
          { id: 'e', texte: "L\'encaissement de la recette par le comptable public" },
        ],
        reponseCorrecte: 'b',
        explication: "L\'Art. 90 al. 1 LOFIP définit l\'engagement comme « l\'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge ». C\'est la première phase, réservée à l\'ordonnateur.",
        articleRef: 'Art. 90 al. 1 LOFIP',
      },
      {
        type: 'qcm', id: 'l1q2',
        question: 'Quelle phase de la chaîne de la dépense est réservée exclusivement au comptable public selon la LOFIP ?',
        options: [
          { id: 'a', texte: "L\'engagement" },
          { id: 'b', texte: 'La liquidation' },
          { id: 'c', texte: "L\'ordonnancement" },
          { id: 'd', texte: 'Le paiement' },
          { id: 'e', texte: 'La constatation' },
        ],
        reponseCorrecte: 'd',
        explication: "L\'Art. 90 al. 4 LOFIP dispose que « le paiement est l\'acte par lequel le pouvoir central se libère de sa dette ». C\'est la seule phase de la chaîne exécutée par le comptable public ; les trois premières (engagement, liquidation, ordonnancement) relèvent de l\'ordonnateur.",
        articleRef: 'Art. 90 al. 4 LOFIP',
      },
    ],
    contenu: (
      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Art. 90 LOFIP - Définition légale</p>
          <p className="text-xs text-foreground italic leading-relaxed">
            « En matière de dépenses, l'engagement est l'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge. La liquidation a pour objet de vérifier la réalité de la dette et d'arrêter le montant exact de la dépense. L'ordonnancement est l'acte administratif par lequel, conformément aux résultats des calculs de la liquidation, l'ordre est donné au caissier concerné de payer la dette du pouvoir central. Le paiement est l'acte par lequel le pouvoir central se libère de sa dette. »
          </p>
        </div>

        <p>
          La chaîne de la dépense publique est la séquence obligatoire et immuable que doit suivre toute dépense du pouvoir central avant d'être payée. Elle est posée à l'Art. 90 de la LOFIP et comporte <strong>quatre phases successives</strong> que nulle autorité ne peut intervertir ou supprimer.
          <InfoTooltip texte="La chaîne de la dépense est un mécanisme de protection des deniers publics. En imposant quatre phases distinctes exécutées par des acteurs différents, la LOFIP évite qu'une seule personne puisse décider, calculer, ordonner et payer une dépense sans contrôle." loi="Art. 90 LOFIP" />
        </p>

        {/* Schéma des 4 phases */}
        <div className="grid grid-cols-4 gap-1 mt-3">
          {[
            { num: '1', label: 'ENGAGEMENT', acteur: 'Ordonnateur', art: 'Art. 90 al. 1', couleur: 'bg-violet-100 border-violet-300' },
            { num: '2', label: 'LIQUIDATION', acteur: 'Ordonnateur', art: 'Art. 90 al. 2', couleur: 'bg-violet-100 border-violet-300' },
            { num: '3', label: 'ORDONNANCEMENT', acteur: 'Ordonnateur', art: 'Art. 90 al. 3', couleur: 'bg-violet-100 border-violet-300' },
            { num: '4', label: 'PAIEMENT', acteur: 'Comptable public', art: 'Art. 90 al. 4', couleur: 'bg-amber-100 border-amber-300' },
          ].map((p, i) => (
            <div key={i} className={`border rounded-lg p-2 text-center ${p.couleur}`}>
              <p className="text-xs font-bold text-foreground">{p.num}</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{p.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{p.acteur}</p>
              <p className="text-[10px] text-muted-foreground italic">{p.art}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-4">Phase 1 - L'engagement (Art. 90 al. 1)</h3>
        <p>
          L'<strong>engagement</strong> est « l'acte par lequel le pouvoir central crée ou constate à son encontre une obligation de laquelle résultera une charge » (Art. 90 al. 1 LOFIP). C'est l'acte juridique fondateur de la dépense. Il peut prendre la forme d'un contrat, d'un marché public, d'une décision de recrutement ou de toute décision créant une obligation à la charge de l'État.
          <InfoTooltip texte="L'engagement peut être un engagement juridique (contrat, marché) ou un engagement comptable (mise à disposition des crédits). La LOFIP exige que l'engagement ne dépasse pas les crédits ouverts par la loi de finances (Art. 10 LOFIP). Tout engagement au-delà des crédits disponibles est irrégulier." loi="Art. 90 al. 1, Art. 10 LOFIP" />
        </p>
        <div className="bg-muted/40 rounded p-3 text-xs">
          <p className="font-semibold text-foreground mb-1">Conditions légales de l'engagement (Art. 10 LOFIP) :</p>
          <ul className="space-y-1 list-none">
            {[
              'Crédits disponibles et régulièrement ouverts par la loi de finances',
              'Imputation budgétaire correcte (bon programme, bon titre)',
              'Visa préalable du contrôleur budgétaire (Art. 112 LOFIP)',
              'Respect des lois et règlements en vigueur',
              'Engagements hors personnel : avant le 31 octobre de chaque année (Art. 92 LOFIP)',
            ].map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-600 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="font-bold text-foreground mt-4">Phase 2 - La liquidation (Art. 90 al. 2)</h3>
        <p>
          La <strong>liquidation</strong> « a pour objet de vérifier la réalité de la dette et d'arrêter le montant exact de la dépense » (Art. 90 al. 2 LOFIP). Elle intervient après que la prestation a été exécutée. L'ordonnateur vérifie que le service a bien été fait (« service fait ») et calcule le montant exact dû par l'État.
          <InfoTooltip texte="La règle du « service fait » est fondamentale : une dépense ne peut être liquidée que si la prestation correspondante a été effectivement réalisée. Payer une facture sans service fait constitue une irrégularité grave susceptible d'engager la responsabilité personnelle de l'ordonnateur." loi="Art. 90 al. 2 LOFIP" />
        </p>

        <h3 className="font-bold text-foreground mt-4">Phase 3 - L'ordonnancement (Art. 90 al. 3)</h3>
        <p>
          L'<strong>ordonnancement</strong> est « l'acte administratif par lequel, conformément aux résultats des calculs de la liquidation, l'ordre est donné au caissier concerné de payer la dette du pouvoir central » (Art. 90 al. 3 LOFIP). C'est l'acte de transmission entre l'ordonnateur et le comptable public. Sans ordonnancement régulier, le comptable public ne peut pas effectuer le paiement (Art. 91 al. 3 LOFIP).
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
          <p className="font-semibold text-amber-800 mb-1">Art. 91 al. 3 LOFIP - Règle impérative</p>
          <p className="text-amber-700">« Toute dépense, régulièrement engagée et liquidée par l'ordonnateur fait l'objet, préalablement à son paiement, d'un ordonnancement. »</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Phase 4 - Le paiement (Art. 90 al. 4)</h3>
        <p>
          Le <strong>paiement</strong> est « l'acte par lequel le pouvoir central se libère de sa dette » (Art. 90 al. 4 LOFIP). C'est la seule phase exécutée par le <strong>comptable public</strong> et non par l'ordonnateur. Cette règle est le corollaire du principe de séparation ordonnateur/comptable (Art. 102 LOFIP). Le comptable public ne peut payer que dans la limite des crédits ouverts et sur présentation d'un ordonnancement régulier.
        </p>
        <div className="bg-violet-50 border border-violet-200 rounded p-3 text-xs mt-2">
          <p className="font-semibold text-violet-800 mb-1">Principe fondamental - Art. 92 LOFIP</p>
          <p className="text-violet-700">« Les dépenses sont prises en compte au titre du budget de l'année au cours de laquelle elles sont prises en charge par le comptable public. Elles sont imputées sur les crédits de cette même année. »</p>
        </div>
        <div className="bg-muted/40 rounded p-3 text-xs mt-2">
          <p className="font-semibold text-foreground mb-1">Date limite d'engagement (Art. 92 LOFIP)</p>
          <p>Les engagements de dépenses <em>autres que celles de personnel</em> ne peuvent intervenir après le <strong>31 octobre</strong> de chaque année. Cette règle préserve la clôture budgétaire et la comptabilité de fin d'exercice.</p>
        </div>
      </div>
    ),
  },

  // ─── LECON 2 : L'ordonnateur (Art. 102-108 LOFIP) ────────────────────────
  {
    id: 'l2',
    icone: <Users className="h-5 w-5 text-violet-600" />,
    titre: "L\'ordonnateur (Art. 102–108 LOFIP)",
    soustitre: 'Définition légale, pouvoirs, ordonnateurs spéciaux',
    qcms: [
      {
        type: 'qcm', id: 'l2q1',
        question: "Selon l\'Art. 103 LOFIP, qui est l\'ordonnateur ?",
        options: [
          { id: 'a', texte: "L\'agent du Trésor chargé du paiement" },
          { id: 'b', texte: 'Le contrôleur budgétaire affecté auprès du ministère' },
          { id: 'c', texte: "Le responsable d\'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui" },
          { id: 'd', texte: "Le Président de la République en tant que chef de l\'exécutif" },
          { id: 'e', texte: 'Le directeur général de la DGI' },
        ],
        reponseCorrecte: 'c',
        explication: "L\'Art. 103 LOFIP définit l\'ordonnateur comme « le responsable d\'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui au niveau central et au niveau déconcentré ». Il a le pouvoir d\'engager, de liquider et d\'ordonnancer les dépenses dans la limite des crédits budgétaires.",
        articleRef: 'Art. 103 LOFIP',
      },
      {
        type: 'qcm', id: 'l2q2',
        question: "Selon l\'Art. 105 LOFIP, quelle est la double qualité du Ministre du Budget ?",
        options: [
          { id: 'a', texte: 'Ordonnateur général des recettes et régulateur de la trésorerie' },
          { id: 'b', texte: 'Ordonnateur des charges communes et contrôleur général du budget du pouvoir central' },
          { id: 'c', texte: 'Comptable public et ordonnateur adjoint' },
          { id: 'd', texte: "Contrôleur budgétaire et ordonnateur des dépenses d\'investissement" },
          { id: 'e', texte: 'Ordonnateur exclusif de toutes les dépenses de personnel' },
        ],
        reponseCorrecte: 'b',
        explication: "L\'Art. 105 LOFIP dispose que le Ministre du Budget est, « en sus de sa qualité d\'ordonnateur du budget de son ministère, ordonnateur des charges communes et contrôleur général du budget du pouvoir central par le truchement des contrôleurs budgétaires qui relèvent de son autorité ».",
        articleRef: 'Art. 105 LOFIP',
      },
    ],
    contenu: (
      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Art. 103 LOFIP - Définition légale</p>
          <p className="text-xs text-foreground italic leading-relaxed">
            « Est ordonnateur, le responsable d'institution, le ministre, le responsable de budget annexe ou la personne déléguée par lui au niveau central et au niveau déconcentré. L'ordonnateur a le pouvoir, dans la limite des crédits budgétaires qui lui sont accordés par les lois de finances, d'engager, de liquider et d'ordonnancer les dépenses nécessaires au fonctionnement de son institution ou ministère, ou service déconcentré, ou budget annexe rattaché. Il le fait dans le respect des lois, règlements et instructions qui régissent la matière, et sous réserve du pouvoir de régulation des crédits budgétaires du ministre ayant le budget dans ses attributions et du pouvoir de gestion de la trésorerie du ministre ayant les finances dans ses attributions. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">Définition et pouvoirs de l'ordonnateur</h3>
        <p>
          L'<strong>ordonnateur</strong> est l'autorité compétente pour exécuter les trois premières phases de la chaîne de la dépense : engagement, liquidation et ordonnancement. Il est toujours une <em>autorité administrative</em> - jamais un comptable public.
          <InfoTooltip texte="L'ordonnateur peut être principal (ministre, responsable d'institution) ou secondaire (personne déléguée au niveau déconcentré). La délégation doit être formelle et ne peut pas transférer la responsabilité : l'ordonnateur délégataire est responsable des actes accomplis dans les limites de la délégation reçue." loi="Art. 103 LOFIP" />
        </p>
        <p>
          Ses pouvoirs s'exercent <strong>à trois conditions cumulatives</strong> posées par l'Art. 103 LOFIP : (1) dans la <em>limite des crédits budgétaires</em> votés par la loi de finances ; (2) dans le <em>respect des lois, règlements et instructions</em> ; (3) sous réserve du pouvoir de régulation du Ministre du Budget et du pouvoir de trésorerie du Ministre des Finances.
        </p>

        <h3 className="font-bold text-foreground mt-4">L'avis préalable obligatoire (Art. 107 LOFIP)</h3>
        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs">
          <p className="font-semibold text-amber-800 mb-1">Art. 107 LOFIP - Avis obligatoire du Ministre du Budget</p>
          <p className="text-amber-700">« Tout projet de loi, toute décision ou convention quelconque pouvant avoir une répercussion immédiate ou future, tant sur les recettes que sur les dépenses ainsi que tout acte d'administration portant création d'emploi, extension des cadres organiques, ou modification du statut pécuniaire des agents de carrière des services publics du pouvoir central, doivent être soumis à l'avis préalable du ministre ayant le budget dans ses attributions. »</p>
        </div>
        <p className="text-sm">
          Cette disposition étend l'autorité budgétaire du Ministre du Budget au-delà de l'exécution : toute décision ayant une incidence financière - y compris la création d'emplois et la modification des statuts pécuniaires - ne peut être prise sans son avis préalable.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les deux ordonnateurs spéciaux</h3>
        <div className="grid grid-cols-1 gap-3 mt-2">
          {[
            {
              titre: 'Ministre du Budget (Art. 105)',
              couleur: 'border-l-violet-500 bg-violet-50',
              points: [
                'Ordonnateur du budget de son ministère',
                'Ordonnateur des charges communes (dépenses communes à tous les ministères)',
                'Contrôleur général du budget du Pouvoir central via les contrôleurs budgétaires',
                'Délègue ses pouvoirs à des fonctionnaires qualifiés',
              ],
            },
            {
              titre: 'Ministre des Finances (Art. 106)',
              couleur: 'border-l-amber-500 bg-amber-50',
              points: [
                'Ordonnateur du budget de son ministère',
                'Ordonnateur général de TOUTES les recettes du Pouvoir central',
                'Constate, liquide et ordonnance les recettes',
                'Régulateur de la trésorerie',
                'Désigne les comptables publics',
              ],
            },
          ].map((bloc, i) => (
            <div key={i} className={`border-l-4 rounded-r-lg p-3 ${bloc.couleur}`}>
              <p className="text-xs font-bold text-foreground mb-2">{bloc.titre}</p>
              <ul className="space-y-1">
                {bloc.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-violet-600 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-4">Opérations financières soumises à la loi (Art. 108 LOFIP)</h3>
        <p>
          L'Art. 108 LOFIP soumet les opérations financières du Pouvoir central (emprunts, prêts, garanties, subventions, prises de participations) à une double condition : elles sont conclues par le Ministre des Finances après avis du Ministre du Budget, et <strong>« ne peuvent entrer en vigueur que si une loi les autorise »</strong>. Exception : en cas de vacances parlementaires, une ordonnance-loi du Président peut approuver les prêts/emprunts, sous réserve de ratification immédiate par le Parlement.
        </p>
      </div>
    ),
  },

  // ─── LECON 3 : Le comptable public (Art. 109, 101 LOFIP) ─────────────────
  {
    id: 'l3',
    icone: <Banknote className="h-5 w-5 text-violet-600" />,
    titre: 'Le comptable public (Art. 101, 109 LOFIP)',
    soustitre: 'Définition, rôle, responsabilité, séparation ordonnateur/comptable',
    qcms: [
      {
        type: 'qcm', id: 'l3q1',
        question: "Selon l\'Art. 109 LOFIP, de qui le comptable public relève-t-il ?",
        options: [
          { id: 'a', texte: 'Du Ministre du Budget' },
          { id: 'b', texte: 'Du Président de la République' },
          { id: 'c', texte: 'Du Ministre des Finances' },
          { id: 'd', texte: 'Du contrôleur budgétaire' },
          { id: 'e', texte: "Du responsable d\'institution (ordonnateur)" },
        ],
        reponseCorrecte: 'c',
        explication: "L\'Art. 109 al. 3 LOFIP dispose expressément que le comptable public « relève de la responsabilité du ministre ayant les finances dans ses attributions ». Cette dépendance hiérarchique du Ministre des Finances garantit l\'indépendance du comptable vis-à-vis de l\'ordonnateur.",
        articleRef: 'Art. 109 al. 3 LOFIP',
      },
      {
        type: 'qcm', id: 'l3q2',
        question: "Selon l\'Art. 101 LOFIP, quelle comptabilité est tenue par le comptable public (et non par l\'ordonnateur) ?",
        options: [
          { id: 'a', texte: 'La comptabilité administrative uniquement' },
          { id: 'b', texte: 'La comptabilité des engagements' },
          { id: 'c', texte: "La comptabilité budgétaire et la comptabilité générale de l\'ensemble des opérations, ainsi que la comptabilité des matières" },
          { id: 'd', texte: 'La comptabilité analytique du programme' },
          { id: 'e', texte: 'La comptabilité des ressources humaines' },
        ],
        reponseCorrecte: 'c',
        explication: "L\'Art. 101 LOFIP dispose que « le comptable public est habilité à tenir la comptabilité des opérations budgétaires de recouvrement de recettes et de paiement de dépenses, qui constituent la comptabilité budgétaire et à tenir la comptabilité générale de l\'ensemble des opérations. Le comptable public tient également la comptabilité des matières. »",
        articleRef: 'Art. 101 LOFIP',
      },
    ],
    contenu: (
      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Art. 109 LOFIP - Définition légale</p>
          <p className="text-xs text-foreground italic leading-relaxed">
            « Est comptable public, tout agent ayant qualité pour exécuter, au nom et pour compte du pouvoir central, des opérations de recettes et de dépenses, de maniement de fonds et de valeurs qu'il détient ainsi que les opérations se rapportant aux biens publics. Le comptable public chargé de la tenue et de l'établissement des comptes du pouvoir central veille au respect des principes et des règles de gestion des finances publiques. Il s'assure notamment de la sincérité des enregistrements et du respect des procédures. Il relève de la responsabilité du ministre ayant les finances dans ses attributions. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">Rôle et attributions du comptable public</h3>
        <p>
          Le comptable public est l'<em>agent d'État</em> habilité à exécuter les opérations de caisse : recouvrement des recettes et paiement des dépenses. Il intervient exclusivement à la <strong>quatrième phase</strong> de la chaîne de la dépense (le paiement) et à toutes les phases de la chaîne des recettes.
          <InfoTooltip texte="Le comptable public est nommé par le Ministre des Finances (Art. 106 LOFIP). Sa responsabilité est personnelle et pécuniaire : il est personnellement responsable des fonds et valeurs qu'il détient. En cas d'irrégularité, la Cour des comptes peut le condamner à rembourser les sommes sur ses deniers propres." loi="Art. 109 LOFIP" />
        </p>

        <h3 className="font-bold text-foreground mt-4">Attributions comptables (Art. 101 LOFIP)</h3>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {[
            { titre: 'Comptabilité budgétaire', desc: 'Retrace les opérations de recouvrement des recettes et de paiement des dépenses ; détermine la situation de caisse du Pouvoir central (Art. 97 LOFIP).' },
            { titre: 'Comptabilité générale', desc: "Enregistre toutes les opérations relatives aux recettes, dépenses, trésorerie, patrimoine et valeurs d\'exploitation selon les normes du Ministre des Finances (Art. 99 LOFIP)." },
            { titre: 'Comptabilité des matières', desc: "Décrit les existants et mouvements des biens meubles et immeubles, stocks et titres de l\'État (Art. 98 LOFIP)." },
          ].map((item, i) => (
            <div key={i} className="bg-muted/40 rounded p-3 text-xs">
              <p className="font-semibold text-foreground mb-1">{item.titre}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-4">La règle de séparation ordonnateur/comptable</h3>
        <p>
          L'Art. 102 LOFIP pose que seuls l'ordonnateur et le comptable public sont compétents en matière d'exécution du budget. Ces deux fonctions sont <strong>strictement incompatibles</strong> : un même agent ne peut pas cumuler les qualités d'ordonnateur et de comptable public. Cette séparation est un principe cardinal du droit financier public, visant à instaurer un contrôle mutuel entre l'autorité qui décide la dépense et l'agent qui la paie.
          <InfoTooltip texte="La séparation ordonnateur/comptable a été théorisée en France dès le XIXe siècle et reprise dans les finances publiques africaines, dont celles de la RDC via la LOFIP. Elle constitue le premier rempart contre les détournements de fonds publics : si un seul agent pouvait engager, ordonner et payer, il n'y aurait aucun contre-pouvoir interne." loi="Art. 102 LOFIP" />
        </p>
        <div className="border rounded-lg overflow-hidden mt-3">
          <table className="w-full text-xs">
            <thead className="bg-violet-50">
              <tr>
                <th className="text-left p-2 border-b border-border font-semibold">Critère</th>
                <th className="text-left p-2 border-b border-border font-semibold">Ordonnateur</th>
                <th className="text-left p-2 border-b border-border font-semibold">Comptable public</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Phases', 'Engagement, Liquidation, Ordonnancement', 'Paiement uniquement'],
                ['Autorité de tutelle', 'Ministre du Budget (Art. 105)', 'Ministre des Finances (Art. 106, 109)'],
                ['Responsabilité', 'Administrative et pénale', 'Personnelle et pécuniaire (Cour des comptes)'],
                ['Comptabilité tenue', 'Comptabilité administrative (Art. 96, 101)', 'Comptabilité budgétaire, générale, des matières (Art. 101)'],
                ['Cumul autorisé ?', 'NON - incompatibilité absolue', 'NON - incompatibilité absolue'],
              ].map(([crit, ord, cpt], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                  <td className="p-2 border-b border-border font-medium">{crit}</td>
                  <td className="p-2 border-b border-border">{ord}</td>
                  <td className="p-2 border-b border-border">{cpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-foreground mt-4">Comptabilité générale : comptabilité en droits constatés (Art. 99 LOFIP)</h3>
        <p>
          L'Art. 99 LOFIP précise que la comptabilité générale du Pouvoir central est « une comptabilité d'exercice ou comptabilité en droits constatés dans laquelle les opérations sont prises en compte au titre de l'exercice auquel elles se rattachent, indépendamment de leur date d'encaissement ou de paiement ». Ce principe distingue la comptabilité générale (droits constatés) de la comptabilité budgétaire (caisse).
        </p>
      </div>
    ),
  },

  // ─── LECON 4 : Le contrôleur budgétaire (Art. 104, 111-115 LOFIP) ─────────
  {
    id: 'l4',
    icone: <ClipboardCheck className="h-5 w-5 text-violet-600" />,
    titre: 'Le contrôleur budgétaire (Art. 104, 111–115 LOFIP)',
    soustitre: 'Visa préalable, contrôle a priori, refus de visa, désaccord persistant',
    qcms: [
      {
        type: 'qcm', id: 'l4q1',
        question: "Selon l\'Art. 112 LOFIP, quels actes sont soumis au visa préalable du contrôleur budgétaire ?",
        options: [
          { id: 'a', texte: 'Uniquement les actes de paiement du comptable public' },
          { id: 'b', texte: 'Tous les actes portant engagement, liquidation et ordonnancement' },
          { id: 'c', texte: "Uniquement les actes d\'engagement supérieurs à un seuil fixé par décret" },
          { id: 'd', texte: "Uniquement les actes d\'ordonnancement final" },
          { id: 'e', texte: 'Les actes de recettes uniquement' },
        ],
        reponseCorrecte: 'b',
        explication: "L\'Art. 112 LOFIP dispose que « tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions émanant d\'un responsable d\'institution, d\'un ministre, d\'un responsable de service déconcentré ou d\'un fonctionnaire habilité de l\'administration ».",
        articleRef: 'Art. 112 LOFIP',
      },
      {
        type: 'qcm', id: 'l4q2',
        question: "Selon l\'Art. 114 LOFIP, que se passe-t-il en cas de désaccord persistant entre le contrôleur budgétaire et l\'ordonnateur ?",
        options: [
          { id: 'a', texte: 'Le contrôleur budgétaire est automatiquement remplacé' },
          { id: 'b', texte: "L\'ordonnateur peut passer outre de plein droit sans formalité" },
          { id: 'c', texte: 'Le contrôleur en réfère au Ministre du Budget ; il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre' },
          { id: 'd', texte: 'La Cour des comptes tranche le litige en urgence' },
          { id: 'e', texte: 'Le comptable public statue à la place du contrôleur' },
        ],
        reponseCorrecte: 'c',
        explication: "L\'Art. 114 LOFIP dispose qu\'« en cas de désaccord persistant avec l\'ordonnateur auprès duquel il est rattaché, le contrôleur budgétaire en réfère, selon le cas, au ministre ayant le budget dans ses attributions au niveau central ou au représentant du pouvoir central en province. Il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ou représentant du pouvoir central. »",
        articleRef: 'Art. 114 LOFIP',
      },
    ],
    contenu: (
      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Art. 112 LOFIP - Contrôle a priori</p>
          <p className="text-xs text-foreground italic leading-relaxed">
            « Le contrôle administratif a priori des opérations budgétaires de dépenses du pouvoir central est assuré par le contrôleur budgétaire. Tous les actes portant engagement, liquidation et ordonnancement sont soumis à son visa préalable notamment, les contrats, arrêtés, mesures ou décisions émanant d'un responsable d'institution, d'un ministre, d'un responsable de service déconcentré ou d'un fonctionnaire habilité de l'administration. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">Statut et affectation du contrôleur budgétaire</h3>
        <p>
          L'Art. 104 LOFIP dispose qu'« un contrôleur budgétaire est affecté auprès de chaque ordonnateur », dans des conditions fixées par arrêté du Ministre du Budget. L'Art. 115 LOFIP précise que les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l'État. Ils relèvent de l'autorité du Ministre du Budget (Art. 105 LOFIP).
          <InfoTooltip texte="Le contrôleur budgétaire est indépendant de l'ordonnateur auprès duquel il est placé. Il ne reçoit pas d'instructions de l'ordonnateur mais du Ministre du Budget. Cette indépendance fonctionnelle est la condition de l'efficacité du contrôle a priori." loi="Art. 104, 105, 115 LOFIP" />
        </p>

        <h3 className="font-bold text-foreground mt-4">Le visa préalable : nature et portée (Art. 112-113)</h3>
        <p>
          Le visa du contrôleur budgétaire est <strong>préalable et obligatoire</strong> pour tout acte d'engagement, de liquidation et d'ordonnancement. L'Art. 113 LOFIP précise que le contrôleur obtient communication de toutes les pièces justificatives pour éclairer sa décision. Si les actes lui paraissent « entachés d'irrégularités », il refuse le visa. La loi protège expressément le contrôleur : « il ne peut en aucun cas être sanctionné » pour avoir refusé un visa irrégulier (Art. 113 al. 3 LOFIP).
        </p>
        <div className="grid grid-cols-1 gap-2 mt-3">
          {[
            { label: 'Irrégularités contrôlées', desc: "Absence de crédits, mauvaise imputation, non-respect des procédures d\'engagement, dépassement du plafond de la loi de finances, absence de service fait lors de la liquidation." },
            { label: 'Protection du contrôleur', desc: "Art. 113 al. 3 : le contrôleur ne peut en aucun cas être sanctionné pour avoir refusé son visa. Il est protégé même si son refus gêne l\'ordonnateur." },
          ].map((item, i) => (
            <div key={i} className="bg-muted/40 rounded p-3 text-xs">
              <p className="font-semibold text-foreground mb-1">{item.label}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-4">La procédure de désaccord persistant (Art. 114 LOFIP)</h3>
        <p>
          En cas de <strong>désaccord persistant</strong> entre le contrôleur et l'ordonnateur, la LOFIP prévoit une procédure en deux temps :
        </p>
        <div className="space-y-2 mt-2">
          {[
            { step: '1', label: 'Saisine du Ministre du Budget', desc: 'Le contrôleur en réfère au Ministre du Budget (niveau central) ou au représentant du Pouvoir central en province (niveau déconcentré).' },
            { step: '2', label: 'Autorisation motivée écrite', desc: 'Le Ministre du Budget peut autoriser le passage outre, mais uniquement par « autorisation motivée écrite ». Cette exigence de forme écrite et de motivation garantit la traçabilité et la responsabilité du Ministre.' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 bg-muted/40 rounded p-3 text-xs">
              <div className="shrink-0 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">{s.step}</div>
              <div>
                <p className="font-semibold text-foreground">{s.label}</p>
                <p className="text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-50 border border-red-200 rounded p-3 text-xs mt-2">
          <p className="font-semibold text-red-800 mb-1">Règle impérative</p>
          <p className="text-red-700">Sans autorisation motivée écrite du Ministre du Budget, aucun ordonnateur ne peut passer outre au refus de visa. Toute dépense engagée en violation de cette règle est irrégulière et engage la responsabilité personnelle de l'ordonnateur.</p>
        </div>
      </div>
    ),
  },

  // ─── LECON 5 : Les comptabilités publiques (Art. 95-100 LOFIP) ────────────
  {
    id: 'l5',
    icone: <BookOpen className="h-5 w-5 text-violet-600" />,
    titre: 'Les comptabilités publiques et les reports de crédits (Art. 93–00 LOFIP)',
    soustitre: 'Comptabilité administrative, budgétaire, des matières, générale ; reports',
    qcms: [
      {
        type: 'qcm', id: 'l5q1',
        question: "Selon l\'Art. 95 LOFIP, combien de types de comptabilité sont tenus au sein des administrations du Pouvoir central ?",
        options: [
          { id: 'a', texte: 'Un seul (la comptabilité générale)' },
          { id: 'b', texte: 'Deux (comptabilité administrative et budgétaire)' },
          { id: 'c', texte: 'Trois (administrative, budgétaire et générale)' },
          { id: 'd', texte: 'Quatre (administrative, budgétaire, des matières et générale)' },
          { id: 'e', texte: 'Cinq (administrative, budgétaire, des matières, générale et analytique)' },
        ],
        reponseCorrecte: 'd',
        explication: "L\'Art. 95 LOFIP dispose expressément qu\'« il est tenu, au sein des administrations, une comptabilité administrative, une comptabilité budgétaire, une comptabilité des matières et une comptabilité générale ». Soit quatre types. La comptabilité analytique n\'est pas mentionnée par la LOFIP.",
        articleRef: 'Art. 95 LOFIP',
      },
      {
        type: 'qcm', id: 'l5q2',
        question: "Selon l\'Art. 93 LOFIP, à quelle condition des crédits peuvent-ils être reportés d\'une année sur l\'autre ?",
        options: [
          { id: 'a', texte: "Seulement si le Parlement l\'autorise expressis verbis" },
          { id: 'b', texte: "Pour toute dépense non encore payée au 31 décembre, quel que soit le stade d\'exécution" },
          { id: 'c', texte: "Uniquement pour les dépenses résultant d\'obligations existant au 31 octobre et non ordonnacées et payées au 31 décembre" },
          { id: 'd', texte: 'Pour tous les crédits non consommés, quel que soit leur montant' },
          { id: 'e', texte: "Uniquement pour les dépenses d\'investissement du Titre IV" },
        ],
        reponseCorrecte: 'c',
        explication: "L\'Art. 93 LOFIP prévoit que peuvent être reportées les « parties des crédits disponibles à la fin de l\'année budgétaire, destinées à couvrir des dépenses résultant d\'obligations existant à charge du pouvoir central à la date du 31 octobre et qui n\'ont pu être ordonnacées et payées au 31 décembre ». La condition clé est l\'existence d\'une obligation au 31 octobre.",
        articleRef: 'Art. 93 LOFIP',
      },
    ],
    contenu: (
      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1">Art. 95 LOFIP</p>
          <p className="text-xs text-foreground italic">« Il est tenu, au sein des administrations, une comptabilité administrative, une comptabilité budgétaire, une comptabilité des matières et une comptabilité générale. »</p>
        </div>

        <h3 className="font-bold text-foreground">Les quatre comptabilités publiques (Art. 95-101 LOFIP)</h3>

        <div className="space-y-3 mt-2">
          {[
            {
              num: '1', titre: 'Comptabilité administrative (Art. 96)',
              tenue: 'Ordonnateur',
              objet: "Concerne l\'établissement et la mise en recouvrement des recettes ainsi que l\'engagement et l\'ordonnancement des dépenses. Permet de suivre la consommation des crédits et d\'assurer la traçabilité des recettes.",
              regle: 'Les règles de tenue sont fixées par le règlement général sur la comptabilité publique (RGCP).',
            },
            {
              num: '2', titre: 'Comptabilité budgétaire (Art. 97)',
              tenue: 'Comptable public',
              objet: 'Retrace les opérations de recouvrement des recettes et de paiement des dépenses. Détermine la situation de caisse du Pouvoir central. Tenue par année, du 1er janvier au 31 décembre.',
              regle: "Doit être rapprochée de la comptabilité administrative tenue par l\'ordonnateur (principe de rapprochement).",
            },
            {
              num: '3', titre: 'Comptabilité des matières (Art. 98)',
              tenue: 'Comptable public',
              objet: 'Décrit les existants et les mouvements concernant les biens meubles et immeubles, les stocks de toute catégorie, et les titres et valeurs.',
              regle: "Patrimoine physique de l\'État - complémentaire de la comptabilité générale.",
            },
            {
              num: '4', titre: 'Comptabilité générale (Art. 99-100)',
              tenue: 'Comptable public',
              objet: "Enregistre toutes les opérations : recettes, dépenses, trésorerie, patrimoine et valeurs d\'exploitation. Tenue en droits constatés (indépendamment des dates d\'encaissement/paiement). Règle de la partie double.",
              regle: "Plan comptable fixé par décret du Premier Ministre. S\'inspire du plan comptable national.",
            },
          ].map((item) => (
            <div key={item.num} className="bg-muted/40 rounded-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="shrink-0 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">{item.num}</span>
                <p className="font-semibold text-foreground">{item.titre}</p>
              </div>
              <p className="text-muted-foreground mb-1"><span className="font-medium text-foreground">Tenu par :</span> {item.tenue}</p>
              <p className="mb-1"><span className="font-medium text-foreground">Objet :</span> {item.objet}</p>
              <p className="text-muted-foreground italic">{item.regle}</p>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-4">Les reports de crédits (Art. 93-94 LOFIP)</h3>
        <p>
          Le principe d'annualité budgétaire (Art. 5 LOFIP) implique que les crédits non consommés à la clôture du 31 décembre sont en principe perdus. Cependant, l'Art. 93 LOFIP prévoit une dérogation strictement encadrée : les crédits peuvent être reportés si et seulement si :
          <InfoTooltip texte="Les reports de crédits constituent une dérogation au principe d'annualité. Ils sont justifiés par des considérations pratiques : certaines opérations engagées avant le 31 octobre ne peuvent pas être payées avant le 31 décembre en raison de délais techniques ou administratifs." loi="Art. 93, 94 LOFIP" />
        </p>
        <div className="space-y-2 mt-2">
          {[
            "Les dépenses résultent d\'obligations existant à la charge du Pouvoir central à la date du <strong>31 octobre</strong>",
            "Ces dépenses n\'ont pu être ordonnacées et payées au <strong>31 décembre</strong>",
            "Les crédits reportés sont ajoutés aux crédits de paiement de l\'année suivante",
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-xs bg-muted/40 rounded p-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-violet-600 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: c }} />
            </div>
          ))}
        </div>
        <p className="text-xs mt-2">
          L'Art. 94 LOFIP précise la procédure : les articles et montants des dépenses courantes concernées sont énumérés dans un état approuvé par <strong>ordonnance-loi du Président de la République</strong>, prise sur proposition conjointe des Ministres des Finances et du Budget, dans les deux mois suivant la fin de l'année budgétaire. Ils font l'objet d'un arrêté du Ministre du Budget et sont ratifiés dans la prochaine loi de finances.
        </p>
      </div>
    ),
  },
]

// ============================================================
// QCM GLOBAL (15 questions pour l'onglet QCM admin/prof)
// ============================================================
const QCM_GLOBAL: { chapitreId: string; chapitreNom: string; questions: QCMChapitre[] } = {
  chapitreId: 'ue5-chapitre-7',
  chapitreNom: 'Chapitre 7 - Exécution des dépenses - chaîne de la dépense',
  questions: [
    {
      id: 'g1',
      question: "Selon l\'Art. 90 LOFIP, quelle est la définition légale de la liquidation en matière de dépenses ?",
      options: [
        { id: 'a', texte: "L\'acte par lequel le pouvoir central crée une obligation à son encontre" },
        { id: 'b', texte: "L\'ordre donné au caissier de payer la dette de l\'État" },
        { id: 'c', texte: "La vérification de la réalité de la dette et l\'arrêt du montant exact de la dépense" },
        { id: 'd', texte: "L\'acte par lequel le pouvoir central se libère de sa dette" },
        { id: 'e', texte: "Le contrôle de l\'imputation budgétaire par le contrôleur budgétaire" },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 90 al. 2 LOFIP définit la liquidation comme l\'acte qui « a pour objet de vérifier la réalité de la dette et d\'arrêter le montant exact de la dépense ». Elle intervient après que le service a été fait.",
      articleRef: 'Art. 90 al. 2 LOFIP',
    },
    {
      id: 'g2',
      question: "Selon l\'Art. 91 LOFIP, préalablement à quoi toute dépense régulièrement engagée et liquidée fait-elle l\'objet d\'un ordonnancement ?",
      options: [
        { id: 'a', texte: "Préalablement à l\'engagement" },
        { id: 'b', texte: 'Préalablement à la liquidation' },
        { id: 'c', texte: 'Préalablement à son paiement' },
        { id: 'd', texte: 'Préalablement au visa du contrôleur budgétaire' },
        { id: 'e', texte: 'Préalablement au dépôt du rapport annuel de performance' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 91 al. 3 LOFIP dispose expressément : « Toute dépense, régulièrement engagée et liquidée par l\'ordonnateur fait l\'objet, préalablement à son paiement, d\'un ordonnancement. » Sans ordonnancement, le comptable public ne peut pas payer.",
      articleRef: 'Art. 91 al. 3 LOFIP',
    },
    {
      id: 'g3',
      question: "Après quelle date les engagements de dépenses autres que celles de personnel ne peuvent-ils plus intervenir selon l\'Art. 92 LOFIP ?",
      options: [
        { id: 'a', texte: 'Après le 30 septembre' },
        { id: 'b', texte: 'Après le 31 octobre' },
        { id: 'c', texte: 'Après le 30 novembre' },
        { id: 'd', texte: 'Après le 15 décembre' },
        { id: 'e', texte: 'Après le 31 décembre' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 92 al. 3 LOFIP dispose que « les engagements de dépenses, autres que celles de personnel, se rapportant aux autorisations d\'engagement annuelles ne peuvent intervenir après le 31 octobre de chaque année ». Cette règle ne s\'applique pas aux dépenses de personnel.",
      articleRef: 'Art. 92 al. 3 LOFIP',
    },
    {
      id: 'g4',
      question: "Selon l\'Art. 102 LOFIP, qui sont les deux autorités compétentes en matière d\'exécution du budget ?",
      options: [
        { id: 'a', texte: 'Le Ministre du Budget et le Ministre des Finances' },
        { id: 'b', texte: "L\'ordonnateur et le contrôleur budgétaire" },
        { id: 'c', texte: "L\'ordonnateur et le comptable public" },
        { id: 'd', texte: 'Le contrôleur budgétaire et le comptable public' },
        { id: 'e', texte: 'La Cour des comptes et le Ministre des Finances' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 102 LOFIP est sans ambiguïté : « Sont compétents en matière d\'exécution du budget, l\'ordonnateur et le comptable public. » Ces deux autorités se contrôlent mutuellement selon le principe de séparation.",
      articleRef: 'Art. 102 LOFIP',
    },
    {
      id: 'g5',
      question: "Selon l\'Art. 106 LOFIP, quelle est la qualité particulière du Ministre des Finances en matière de recettes ?",
      options: [
        { id: 'a', texte: 'Ordonnateur des charges communes uniquement' },
        { id: 'b', texte: 'Contrôleur général du budget du Pouvoir central' },
        { id: 'c', texte: 'Ordonnateur général de toutes les recettes du Pouvoir central' },
        { id: 'd', texte: 'Comptable public de rang supérieur' },
        { id: 'e', texte: 'Président de la commission des finances du Parlement' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 106 LOFIP dispose que le Ministre des Finances est « en sus de sa qualité d\'ordonnateur du budget de son ministère, ordonnateur général de toutes les recettes du pouvoir central. A ce titre, il constate, liquide et ordonnance lesdites recettes. Il est le régulateur de la trésorerie. Il désigne les comptables publics. »",
      articleRef: 'Art. 106 LOFIP',
    },
    {
      id: 'g6',
      question: "Selon l\'Art. 113 LOFIP, que peut faire le contrôleur budgétaire si les actes de l\'ordonnateur lui paraissent entachés d\'irrégularités ?",
      options: [
        { id: 'a', texte: 'Saisir la Cour des comptes directement' },
        { id: 'b', texte: 'Refuser le visa - sans pouvoir être sanctionné pour ce refus' },
        { id: 'c', texte: "Annuler lui-même l\'acte irrégulier de l\'ordonnateur" },
        { id: 'd', texte: 'Transmettre le dossier au comptable public pour instruction' },
        { id: 'e', texte: 'Suspendre le paiement de tous les actes du ministère concerné' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 113 LOFIP dispose que si les actes de l\'ordonnateur lui paraissent entachés d\'irrégularités, « le contrôleur refuse le visa ». La loi ajoute expressément qu\'« il ne peut en aucun cas être sanctionné » pour ce refus, ce qui garantit son indépendance.",
      articleRef: 'Art. 113 LOFIP',
    },
    {
      id: 'g7',
      question: "Selon l\'Art. 99 LOFIP, la comptabilité générale du Pouvoir central est une comptabilité :",
      options: [
        { id: 'a', texte: "De caisse (enregistrement à la date d\'encaissement ou de paiement)" },
        { id: 'b', texte: "D\'exercice ou en droits constatés (prise en compte au titre de l\'exercice indépendamment des dates d\'encaissement ou paiement)" },
        { id: 'c', texte: 'Analytique (par nature de dépense)' },
        { id: 'd', texte: 'De programme (par programme budgétaire)' },
        { id: 'e', texte: "Administrative (tenue par l\'ordonnateur)" },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 99 LOFIP précise expressément : « Il s\'agit d\'une comptabilité d\'exercice ou comptabilité en droits constatés dans laquelle les opérations sont prises en compte au titre de l\'exercice auquel elles se rattachent, indépendamment de leur date d\'encaissement ou de paiement. »",
      articleRef: 'Art. 99 LOFIP',
    },
    {
      id: 'g8',
      question: "Selon l\'Art. 107 LOFIP, quel acte d\'administration doit être soumis à l\'avis préalable du Ministre du Budget ?",
      options: [
        { id: 'a', texte: "Tout acte de procédure judiciaire impliquant l\'État" },
        { id: 'b', texte: "Tout acte d\'administration portant création d\'emploi, extension des cadres organiques ou modification du statut pécuniaire des agents" },
        { id: 'c', texte: 'Tout acte relatif à la politique étrangère de la RDC' },
        { id: 'd', texte: "Tout acte de nomination à des postes de direction de l\'État" },
        { id: 'e', texte: 'Tout acte de contrôle de la Cour des comptes' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 107 LOFIP vise notamment « tout acte d\'administration portant création d\'emploi, extension des cadres organiques, ou modification du statut pécuniaire des agents de carrière des services publics du pouvoir central » comme devant être soumis à l\'avis préalable du Ministre du Budget.",
      articleRef: 'Art. 107 LOFIP',
    },
    {
      id: 'g9',
      question: "Selon l\'Art. 88 LOFIP, par quel acte les crédits sont-ils mis à disposition des ordonnateurs ?",
      options: [
        { id: 'a', texte: 'Par ordonnance-loi du Président de la République' },
        { id: 'b', texte: 'Par décret du Premier Ministre' },
        { id: 'c', texte: 'Par arrêté du Ministre du Budget' },
        { id: 'd', texte: 'Par circulaire du Ministre des Finances' },
        { id: 'e', texte: 'Par résolution du Parlement' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 88 LOFIP dispose que « les crédits sont mis à disposition par arrêté du ministre ayant le Budget dans ses attributions ». La mise à disposition est opérée par programme et détaillée par titre et par source de financement.",
      articleRef: 'Art. 88 LOFIP',
    },
    {
      id: 'g10',
      question: "Selon l\'Art. 96 LOFIP, quel document fixe les règles de tenue de la comptabilité administrative ?",
      options: [
        { id: 'a', texte: 'La loi de finances annuelle' },
        { id: 'b', texte: 'Le règlement général sur la comptabilité publique (RGCP)' },
        { id: 'c', texte: 'Un arrêté du Ministre des Finances' },
        { id: 'd', texte: 'Une circulaire du Ministre du Budget' },
        { id: 'e', texte: 'Le plan comptable SYSCOHADA' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 96 LOFIP dispose que « les règles concernant la tenue de cette comptabilité, à savoir sa forme, la nomenclature budgétaire appliquée, le fait générateur ainsi que l\'autorité responsable sont fixés par le règlement général sur la comptabilité publique ».",
      articleRef: 'Art. 96 LOFIP',
    },
    {
      id: 'g11',
      question: "L\'Art. 108 LOFIP impose que les opérations financières du Pouvoir central (emprunts, prêts, garanties) ne peuvent entrer en vigueur que :",
      options: [
        { id: 'a', texte: 'Après simple décision du Ministre des Finances' },
        { id: 'b', texte: 'Après un avis favorable de la Cour des comptes' },
        { id: 'c', texte: 'Si une loi les autorise' },
        { id: 'd', texte: 'Après ratification par le Conseil des ministres' },
        { id: 'e', texte: 'Après accord du FMI et de la Banque mondiale' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 108 LOFIP est formel : les opérations financières du Pouvoir central (emprunts, prêts, garanties, subventions, prises de participations) « ne peuvent entrer en vigueur que si une loi les autorise ». Exception en cas de vacances parlementaires : ordonnance-loi sous réserve de ratification.",
      articleRef: 'Art. 108 LOFIP',
    },
    {
      id: 'g12',
      question: "Selon l\'Art. 115 LOFIP, auprès de qui les contrôleurs budgétaires sont-ils affectés ?",
      options: [
        { id: 'a', texte: 'Uniquement auprès du Ministre du Budget' },
        { id: 'b', texte: "Auprès de chaque institution et ministère de dépenses et des services déconcentrés de l\'État" },
        { id: 'c', texte: 'Uniquement auprès du Parlement' },
        { id: 'd', texte: 'Auprès de la Cour des comptes exclusivement' },
        { id: 'e', texte: 'Auprès des comptables publics pour contrôle croisé' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 115 LOFIP dispose que « les contrôleurs budgétaires sont affectés auprès de chaque institution et ministère de dépenses et auprès des services déconcentrés de l\'État ». Leur affectation est donc systématique, à tous les niveaux de l\'administration.",
      articleRef: 'Art. 115 LOFIP',
    },
    {
      id: 'g13',
      question: "Selon l\'Art. 100 LOFIP, suivant quelle règle comptable la comptabilité générale du Pouvoir central est-elle tenue ?",
      options: [
        { id: 'a', texte: 'La règle de la partie simple' },
        { id: 'b', texte: 'La règle de la partie double et le principe de la constatation des droits et obligations' },
        { id: 'c', texte: 'La règle du décaissement effectif (comptabilité de caisse)' },
        { id: 'd', texte: 'La règle de la comptabilité analytique par programme' },
        { id: 'e', texte: 'La règle du coût historique du SYSCOHADA' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 100 LOFIP dispose que la comptabilité générale « est tenue suivant la règle de la partie double et le principe de la constatation des droits et obligations ». Ce système permet de comparer les réalisations aux résultats antérieurs et de faire des projections.",
      articleRef: 'Art. 100 LOFIP',
    },
    {
      id: 'g14',
      question: "Selon l\'Art. 93 LOFIP, à quel document les crédits reportés sont-ils ajoutés ?",
      options: [
        { id: 'a', texte: "Au budget rectificatif de l\'année en cours" },
        { id: 'b', texte: "Aux crédits de paiement correspondant du budget de l\'année suivante" },
        { id: 'c', texte: 'Au Fonds de réserve de la Caisse générale du Trésor' },
        { id: 'd', texte: "Aux crédits du programme concerné de l\'année précédente" },
        { id: 'e', texte: 'Aux dotations provisionnelles de la loi de finances rectificative' },
      ],
      reponseCorrecte: 'b',
      explication: "L\'Art. 93 LOFIP dispose que les crédits reportés « sont ajoutés aux crédits de paiement correspondant du budget de ladite année » (l\'année suivante). Ils viennent donc en abondement des crédits initialement votés pour l\'exercice suivant.",
      articleRef: 'Art. 93 LOFIP',
    },
    {
      id: 'g15',
      question: "Selon l\'Art. 94 LOFIP, quel acte approuve l\'état énumérant les dépenses faisant l\'objet d\'un report de crédits ?",
      options: [
        { id: 'a', texte: 'Un arrêté interministériel du Ministre du Budget et du Ministre des Finances' },
        { id: 'b', texte: 'Un décret du Premier Ministre délibéré en Conseil des Ministres' },
        { id: 'c', texte: 'Une ordonnance-loi du Président de la République prise sur proposition conjointe des Ministres des Finances et du Budget' },
        { id: 'd', texte: 'Une résolution du Parlement' },
        { id: 'e', texte: 'Un avis conforme de la Cour des comptes' },
      ],
      reponseCorrecte: 'c',
      explication: "L\'Art. 94 LOFIP dispose que « les Articles et les montants des dépenses courantes auxquels la procédure de report est applicable, sont énumérés dans un état approuvé par ordonnance-loi du Président de la République, prise sur proposition conjointe des ministres ayant les finances et le budget dans leurs attributions, dans les deux mois qui suivent la fin de l\'année budgétaire ».",
      articleRef: 'Art. 94 LOFIP',
    },
  ],
}

// ============================================================
// CAS PRATIQUES (5 - purement juridiques, ancrés LOFIP)
// ============================================================
const ETUDES_DE_CAS = [
  {
    id: 'cp1',
    titre: "La dépense engagée sans visa : violation de l\'Art. 112 LOFIP",
    contexte: "En octobre 2026, le Secrétaire général du Ministère de l\'Environnement signe un contrat de prestation de services de 450 millions FC avec la société EcoPrest SARL pour une étude d\'impact environnemental. Le contrat est signé et la prestation commandée sans que le contrôleur budgétaire affecté au ministère ait apposé son visa préalable. Deux semaines plus tard, le contrôleur budgétaire découvre l\'engagement et constate que les crédits disponibles pour ce programme sont de 200 millions FC seulement (insuffisants). L\'Inspecteur général des finances, saisi, interroge l\'ordonnateur sur la légalité de l\'opération.",
    questions: [
      {
        num: '1',
        enonce: "L\'engagement de la dépense de 450 millions FC sans visa préalable du contrôleur budgétaire est-il légal au regard de l\'Art. 112 LOFIP ? Analysez la violation et ses conséquences juridiques sur l\'acte d\'engagement.",
        correction: "L\'engagement est ILLEGAL à double titre. (1) Violation de l\'Art. 112 LOFIP : cet article dispose que « tous les actes portant engagement, liquidation et ordonnancement sont soumis au visa préalable » du contrôleur budgétaire. Le visa est préalable et obligatoire : aucune dérogation n\'est prévue par la LOFIP. En l\'espèce, le Secrétaire général a engagé sans visa, en violation flagrante de cette disposition. Le contrat ainsi signé est entaché d\'irrégularité de forme. (2) Violation de l\'Art. 10 LOFIP : les crédits disponibles (200 millions FC) sont inférieurs au montant engagé (450 millions FC). Or, l\'Art. 10 LOFIP dispose qu\'aucune dépense ne peut être engagée si elle ne remplit pas la condition de disponibilité des crédits. CONSEQUENCES : l\'ordonnateur engage sa responsabilité personnelle et pécuniaire. Le contrôleur budgétaire est fondé à refuser tout visa ultérieur sur cet acte. La société EcoPrest SARL ne peut pas se prévaloir de ce contrat pour exiger paiement si elle avait connaissance de l\'irrégularité.",
      },
      {
        num: '2',
        enonce: 'Le contrôleur budgétaire peut-il refuser son visa a posteriori sur cet acte déjà signé ? Quelles mesures la LOFIP lui permet-il de prendre ? Peut-il être sanctionné pour ce refus ?',
        correction: "Oui, le contrôleur budgétaire PEUT et DOIT refuser son visa en application de l\'Art. 113 LOFIP. L\'Art. 113 al. 1 l\'autorise à obtenir communication de toutes les pièces justificatives et, si les actes lui paraissent entachés d\'irrégularités, à refuser le visa. En l\'espèce, deux irrégularités sont manifestes : absence de visa préalable et dépassement des crédits. L\'Art. 113 al. 3 LOFIP protège expressément le contrôleur : « il ne peut en aucun cas être sanctionné » pour avoir refusé son visa. Aucune autorité hiérarchique ne peut le punir pour ce refus. Si l\'ordonnateur conteste, il doit suivre la procédure de désaccord persistant de l\'Art. 114 LOFIP : saisine du Ministre du Budget et autorisation motivée écrite. Sans cette autorisation, le paiement est impossible.",
      },
      {
        num: '3',
        enonce: "L\'ordonnateur peut-il régulariser la situation en demandant un virement de crédits pour couvrir les 250 millions FC manquants ? Quelles procédures la LOFIP prévoit-elle et quelles sont leurs limites ?",
        correction: "La régularisation par virement de crédits est possible mais soumise à des conditions strictes. (1) Virement de crédits (Art. 46-48 LOFIP) : si les 250 millions FC manquants peuvent être prélevés sur un autre titre du même programme, un virement est autorisé par arrêté du Ministre du Budget. Limite : la fongibilité asymmétrique interdit d\'abonder le Titre 1 (personnel) mais permet de déplacer des crédits depuis le Titre 1 vers d\'autres titres. (2) Transfert de crédits (Art. 49-50 LOFIP) : si les crédits proviennent d\'un autre programme, un décret du Premier Ministre est nécessaire. (3) Obstacle temporel (Art. 92 LOFIP) : si l\'engagement est postérieur au 31 octobre, il est hors délai. En octobre 2026, si l\'engagement date d\'après le 31 octobre, il est automatiquement irrégulier sur ce fondement supplémentaire. En tout état de cause, la régularisation ne supprime pas la responsabilité disciplinaire et pénale de l\'ordonnateur pour avoir engagé sans visa.",
      },
    ],
    articleRef: 'Art. 10, 88, 90, 112, 113, 114 LOFIP',
  },
  {
    id: 'cp2',
    titre: 'Le paiement sans ordonnancement : violation des Art. 90-91 LOFIP',
    contexte: "Le comptable public du Ministère des Travaux publics reçoit directement d\'un sous-traitant une demande de paiement de 800 millions FC accompagnée d\'une facture et d\'un procès-verbal de réception. L\'ordonnateur n\'a pas encore émis d\'ordonnancement. Sous pression du Directeur général (ordonnateur) qui l\'appelle téléphoniquement pour lui ordonner de payer « d\'urgence », le comptable procède au paiement sans ordonnancement écrit préalable. La Cour des comptes découvre l\'opération lors de son contrôle annuel.",
    questions: [
      {
        num: '1',
        enonce: 'Le paiement effectué par le comptable public sans ordonnancement écrit préalable viole-t-il la LOFIP ? Citez les articles précis et expliquez la violation.',
        correction: "Le paiement sans ordonnancement préalable viole l\'Art. 91 al. 3 LOFIP qui dispose expressément : « Toute dépense, régulièrement engagée et liquidée par l\'ordonnateur fait l\'objet, préalablement à son paiement, d\'un ordonnancement. » Le mot « préalablement » est impératif : aucun paiement ne peut intervenir sans ordonnancement. Par ailleurs, l\'Art. 90 LOFIP pose la séquence obligatoire : engagement → liquidation → ordonnancement → paiement. Cette séquence est immuable. En sautant la phase d\'ordonnancement, le comptable a court-circuité la chaîne de la dépense, privant ainsi le contrôleur budgétaire de la possibilité d\'apposer son visa préalable sur l\'ordonnancement (Art. 112 LOFIP). De surcroît, l\'Art. 102 LOFIP pose la séparation ordonnateur/comptable : le comptable ne peut pas payer sur simple ordre téléphonique de l\'ordonnateur sans document écrit régulier.",
      },
      {
        num: '2',
        enonce: "Quelle est la responsabilité juridique du comptable public selon la LOFIP ? Le fait qu\'il ait agi sur « ordre » oral du Directeur général est-il un fait justificatif en droit des finances publiques congolais ?",
        correction: "La responsabilité du comptable public est PERSONNELLE ET PECUNIAIRE. L\'Art. 109 LOFIP dispose que le comptable public « veille au respect des principes et des règles de gestion des finances publiques. Il s\'assure notamment de la sincérité des enregistrements et du respect des procédures. » En ignorant cette obligation, le comptable a engagé sa propre responsabilité. L\'ordre oral du Directeur général N\'EST PAS un fait justificatif en droit des finances publiques congolais pour plusieurs raisons : (1) La LOFIP exige un ordonnancement ECRIT - un ordre téléphonique n\'a aucune valeur juridique à ce stade de la chaîne ; (2) Le principe de séparation ordonnateur/comptable (Art. 102) interdit précisément que le comptable obéisse à des injonctions informelles de l\'ordonnateur qui contournent la procédure ; (3) La Cour des comptes peut condamner le comptable à rembourser sur ses deniers propres toute dépense payée irrégulièrement (Constitution Art. 178-180). L\'ordre irrégulier d\'un supérieur ne l\'exonère pas.",
      },
      {
        num: '3',
        enonce: "La Cour des comptes peut-elle prononcer un débet à l\'encontre du comptable public ? Sur quelle base constitutionnelle et légale ? Quelle est la procédure applicable ?",
        correction: "Oui. La Cour des comptes dispose d\'un pouvoir juridictionnel pour prononcer un débet contre le comptable. BASE CONSTITUTIONNELLE : l\'Art. 178 de la Constitution RDC dispose que « la Cour des comptes est chargée du contrôle de la gestion des finances de l\'État, des biens et du patrimoine publics » ; l\'Art. 180 précise qu\'« elle juge les comptes des comptables publics ». BASE LEGALE (LOFIP) : l\'Art. 121 LOFIP prévoit le contrôle juridictionnel de la Cour des comptes sur les opérations des comptables publics. PROCEDURE : lors de son contrôle annuel, la Cour examine les comptes du comptable. Si elle constate un paiement irrégulier (sans ordonnancement), elle peut prononcer un « arrêt de débet » obligeant le comptable à reverser de ses propres deniers le montant payé irrégulièrement (800 millions FC). Le comptable peut se retourner contre l\'ordonnateur qui l\'a pressé d\'agir, mais ce recours ne l\'exonère pas vis-à-vis de la Cour des comptes.",
      },
    ],
    articleRef: 'Art. 90, 91 al. 3, 102, 109 LOFIP · Art. 178, 180 Constitution',
  },
  {
    id: 'cp3',
    titre: "Le contrôleur budgétaire sanctionné pour refus de visa : violation de l\'Art. 113 LOFIP",
    contexte: "Le contrôleur budgétaire du Ministère de la Santé, M. KABILA, refuse d\'apposer son visa sur un acte d\'engagement de 2,3 milliards FC pour l\'achat de médicaments, au motif que les crédits disponibles pour ce titre sont insuffisants et que le marché n\'a pas été passé selon les règles des marchés publics. En réponse, le Ministre de la Santé (ordonnateur) prend un arrêté ministériel mettant M. KABILA en disponibilité d\'office pour « obstruction au bon fonctionnement du service public ». M. KABILA saisit le Ministre du Budget.",
    questions: [
      {
        num: '1',
        enonce: "L\'arrêté de mise en disponibilité pris par le Ministre de la Santé contre M. KABILA est-il légal au regard de l\'Art. 113 LOFIP ? Analysez la situation juridique du contrôleur budgétaire.",
        correction: "L\'arrêté est ILLEGAL et nul de plein droit. L\'Art. 113 al. 3 LOFIP est catégorique : « Si les actes de l\'ordonnateur lui paraissent entachés d\'irrégularités au regard des dispositions qui précèdent, le contrôleur refuse le visa. Pour ce faire, il ne peut en aucun cas être sanctionné. » L\'expression « en aucun cas » est absolue : elle couvre toute forme de sanction, disciplinaire, pécuniaire ou administrative, y compris la mise en disponibilité. Par ailleurs, le Ministre de la Santé n\'est pas l\'autorité hiérarchique du contrôleur budgétaire : celui-ci relève de l\'autorité du Ministre du Budget (Art. 105 LOFIP). Le Ministre de la Santé n\'avait donc pas compétence pour prendre un tel arrêté à l\'encontre du contrôleur. L\'irrégularité est double : violation de fond (Art. 113 LOFIP) et incompétence de l\'auteur de l\'acte.",
      },
      {
        num: '2',
        enonce: "Quelle procédure le Ministre de la Santé aurait-il dû suivre pour contester le refus de visa de M. KABILA ? Analysez la procédure de désaccord persistant prévue à l\'Art. 114 LOFIP.",
        correction: "La SEULE procédure légale est celle de l\'Art. 114 LOFIP. En cas de désaccord persistant, la LOFIP prévoit : (1) Le contrôleur budgétaire « en réfère, selon le cas, au ministre ayant le budget dans ses attributions au niveau central ». En l\'espèce, c\'est au Ministre du Budget qu\'il appartient de trancher. (2) « Il ne peut être passé outre au refus de visa que sur autorisation motivée écrite dudit ministre ». Cela signifie que seul le Ministre du Budget peut autoriser l\'ordonnateur à passer outre, et uniquement par écrit avec motivation. L\'exigence de motivation écrite est une condition de forme substantielle : elle garantit la traçabilité et la responsabilité. En aucun cas le Ministre de la Santé ne pouvait contourner cette procédure en sanctionnant le contrôleur. Suivre la procédure de l\'Art. 114 est la seule voie légale.",
      },
      {
        num: '3',
        enonce: "Le Ministre du Budget, saisi par M. KABILA, peut-il annuler l\'arrêté ministériel du Ministre de la Santé ? Quelles actions peut-il mener en vertu des Art. 105 et 114 LOFIP, et quelle voie de recours reste ouverte pour M. KABILA ?",
        correction: "Oui, le Ministre du Budget dispose de plusieurs leviers. (1) En vertu de l\'Art. 105 LOFIP, le Ministre du Budget est le « contrôleur général du budget du pouvoir central par le truchement des contrôleurs budgétaires qui relèvent de son autorité ». Les contrôleurs sont sous son autorité - pas sous celle du Ministre de la Santé. Il peut donc : adresser un rappel à l\'ordre au Ministre de la Santé, exiger le retrait de l\'arrêté illégal, et saisir le Premier Ministre pour arbitrage interministériel. (2) En vertu de l\'Art. 114, il peut étudier le fond du refus de visa et, s\'il estime le refus infondé, émettre une autorisation motivée écrite de passage outre - mais il ne peut PAS contraindre M. KABILA à viser. (3) M. KABILA peut saisir le Tribunal administratif compétent pour obtenir l\'annulation de l\'arrêté illégal (recours en excès de pouvoir), sur le fondement de l\'Art. 113 LOFIP et de l\'incompétence du Ministre de la Santé.",
      },
    ],
    articleRef: 'Art. 104, 105, 113, 114, 115 LOFIP',
  },
  {
    id: 'cp4',
    titre: "Opérations financières sans autorisation législative : violation de l\'Art. 108 LOFIP",
    contexte: "En février 2026, le Gouvernement de la RDC, confronte à un besoin urgent de financement de 500 millions USD pour un programme d\'urgence sécuritaire, négocie et signe un emprunt obligataire avec un consortium de banques étrangères. L\'emprunt est signé par le Ministre des Finances après avis du Ministre du Budget. Cependant, le Parlement, en session ordinaire à cette date, n\'a pas été consulté ni informé. Un député saisit le Parlement et conteste la légalité de l\'emprunt. Le Ministre des Finances soutient que la LF 2026 (Loi n° 25/060) autorise généralement les emprunts de l\'État.",
    questions: [
      {
        num: '1',
        enonce: "L\'emprunt signé en février 2026 est-il conforme à l\'Art. 108 LOFIP ? L\'argument du Ministre des Finances - selon lequel la LF 2026 autorise « généralement » les emprunts - est-il juridiquement fondé ?",
        correction: "L\'emprunt pose un problème de conformité à l\'Art. 108 LOFIP. Cet article dispose que les opérations financières du Pouvoir central « ne peuvent entrer en vigueur que si une loi les autorise ». Le terme « une loi les autorise » implique une autorisation SPECIFIQUE et non une habilitation générale. La LF 2026 (Loi n° 25/060) contient une autorisation d\'emprunter, mais la question est de savoir si cet emprunt spécifique de 500 millions USD est couvert par cette autorisation et dans quelles limites. Si la LF 2026 fixe un plafond d\'emprunt et que cet emprunt reste dans ce plafond, il peut être régulier. Si le plafond est dépassé ou si l\'emprunt n\'est pas prévu par la LF 2026, il est irrégulier. Par ailleurs, l\'Art. 108 impose deux conditions cumulatives : (1) l\'emprunt est conclu par le Ministre des Finances après avis du Ministre du Budget (√ satisfait) ; (2) une loi l\'autorise (condition à vérifier).",
      },
      {
        num: '2',
        enonce: "L\'exception prévue par l\'Art. 108 al. 3 LOFIP en cas de vacances parlementaires s\'applique-t-elle en l\'espèce ? Le Gouvernement pouvait-il y recourir en février 2026 ? Analysez les conditions.",
        correction: "NON, l\'exception de l\'Art. 108 al. 3 LOFIP NE S\'APPLIQUE PAS en l\'espèce. L\'Art. 108 al. 3 dispose qu\'« en cas de vacances parlementaires, les conventions financières de prêts ou d\'emprunts peuvent être approuvées par une ordonnance-loi du Président de la République ». Or, le Parlement était en <strong>session ordinaire</strong> en février 2026 - il ne s\'agit pas de vacances parlementaires. La condition essentielle de l\'exception (« vacances parlementaires ») n\'est pas réunie. Le Gouvernement ne pouvait donc pas utiliser l\'ordonnance-loi pour se substituer au Parlement. La seule voie légale était de soumettre un projet de loi d\'autorisation au Parlement en session, qui était disponible et compétent. Passer outre constitue une violation du principe de légalité financière et porte atteinte aux prérogatives du Parlement en matière budgétaire (Art. 122 pt. 3 Constitution).",
      },
      {
        num: '3',
        enonce: "Quelles sont les voies de droit dont dispose le Parlement pour contester cet emprunt ? Analysez la sanction juridique applicable et le rôle de la Cour des comptes dans le contrôle des opérations financières de l\'État.",
        correction: "Le Parlement dispose de plusieurs voies. (1) Contrôle politique : motion de censure ou interpellation du Gouvernement devant l\'Assemblée nationale sur le fondement de l\'Art. 90 Constitution et de la violation de l\'Art. 108 LOFIP. (2) Légalisation rétroactive : le député saisissant peut exiger que le Gouvernement dépose un projet de loi de ratification de l\'emprunt, comme le prévoit l\'Art. 108 al. 3 LOFIP pour l\'ordonnance-loi (en l\'appliquant par analogie). (3) Saisine de la Cour constitutionnelle : pour excès de pouvoir du Gouvernement et violation de l\'Art. 122 pt. 3 Constitution qui réserve au Parlement la compétence sur les finances publiques. (4) Cour des comptes (Art. 178-180 Constitution) : lors de son contrôle, la Cour peut signaler l\'irrégularité de l\'emprunt au Parlement dans son rapport annuel. Elle peut également vérifier que les sommes empruntées sont dépensées conformément à leur objet déclaré (programme sécuritaire). L\'emprunt irrégulier ne peut en tout cas pas être ratifié par la LF 2026 déjà adoptée ; il faut une nouvelle loi.",
      },
    ],
    articleRef: 'Art. 108 LOFIP · Art. 122 pt. 3, Art. 178-180 Constitution · Art. 6 LF 2026 (Loi n° 25/060)',
  },
  {
    id: 'cp5',
    titre: 'Les reports de crédits et la clôture budgétaire : Art. 93-94 LOFIP',
    contexte: "Le 15 novembre 2026, le Directeur général du Ministère de l\'Infrastructure (ordonnateur secondaire) constate que son programme « Réhabilitation des routes nationales » dispose encore de 12 milliards FC de crédits de paiement non consommés. Il envisage trois actions : (Action 1) Engager 8 milliards FC pour un nouveau marché de travaux supplémentaires ; (Action 2) Demander le report des 12 milliards FC non consommés sur l\'exercice 2027 ; (Action 3) Utiliser 3 milliards FC pour financer une étude non prévue au programme initial, au motif que les fonds sont « disponibles ».",
    questions: [
      {
        num: '1',
        enonce: "L\'Action 1 - engager 8 milliards FC pour un nouveau marché de travaux le 15 novembre 2026 - est-elle légale au regard de l\'Art. 92 LOFIP ? Analysez la contrainte temporelle et ses conséquences.",
        correction: "L\'Action 1 est ILLEGALE au regard de l\'Art. 92 al. 3 LOFIP. Cet article dispose que « les engagements de dépenses, autres que celles de personnel, se rapportant aux autorisations d\'engagement annuelles ne peuvent intervenir après le 31 octobre de chaque année ». Le 15 novembre 2026 est postérieur au 31 octobre 2026. L\'engagement de 8 milliards FC pour un nouveau marché de travaux (dépense hors personnel) est donc irrecevable. CONSEQUENCES : (1) Le contrôleur budgétaire doit refuser son visa sur tout acte d\'engagement postérieur au 31 octobre (Art. 112 LOFIP) ; (2) Si l\'ordonnateur passe outre, sa responsabilité personnelle est engagée ; (3) Le comptable public ne pourra pas payer une dépense engagée irrégulièrement. Cette règle vise à préserver la clôture budgétaire et à permettre l\'établissement des comptes de fin d\'année dans un délai raisonnable.",
      },
      {
        num: '2',
        enonce: "L\'Action 2 - demander le report des 12 milliards FC non consommés sur 2027 - est-elle possible selon l\'Art. 93 LOFIP ? Quelles sont les conditions précises et la procédure fixée par l\'Art. 94 LOFIP ?",
        correction: "Le report est POSSIBLE mais soumis à des conditions strictes définies par l\'Art. 93 LOFIP. CONDITIONS : seules peuvent être reportées les « parties des crédits disponibles à la fin de l\'année budgétaire, destinées à couvrir des dépenses résultant d\'obligations existant à charge du pouvoir central à la date du 31 octobre et qui n\'ont pu être ordonnacées et payées au 31 décembre ». Donc les 12 milliards FC ne peuvent être reportés QUE si : (a) ils correspondent à des obligations juridiquement existantes au 31 octobre (contrats signés, marchés notifiés) et (b) ces dépenses n\'ont pas pu être payées avant le 31 décembre. Les crédits sans obligation sous-jacente ne peuvent pas être reportés. PROCEDURE (Art. 94) : l\'état des reports est approuvé par ordonnance-loi du Président de la République, sur proposition conjointe des Ministres des Finances et du Budget, dans les deux mois suivant la fin de l\'année budgétaire, puis ratifié dans la prochaine loi de finances.",
      },
      {
        num: '3',
        enonce: "L\'Action 3 - utiliser 3 milliards FC pour financer une étude non prévue au programme - est-elle légale ? Analysez au regard du principe de spécialité (Art. 8 LOFIP), de la fongibilité des crédits (Art. 45 LOFIP) et des règles de virement de crédits (Art. 46-50 LOFIP).",
        correction: "L\'Action 3 est potentiellement ILLEGALE en l\'état. Deux problèmes : (1) Le principe de spécialité (Art. 8 LOFIP) impose que les crédits soient utilisés conformément à leur destination. Les crédits du programme « Réhabilitation des routes nationales » ne peuvent être utilisés pour une étude « non prévue au programme initial » sans respecter une procédure de modification. (2) La fongibilité des crédits (Art. 45 LOFIP) permet au gestionnaire de redispatcher des crédits à l\'intérieur d\'un même programme entre titres, mais pas de créer de nouvelles actions sans autorisation. SOLUTION LEGALE : si l\'étude s\'inscrit dans le même programme, un virement de crédits (Art. 46-48 LOFIP) autorisé par arrêté du Ministre du Budget peut permettre ce redepéploiement. Si l\'étude relève d\'un programme différent, un transfert de crédits (Art. 49-50) par décret du Premier Ministre est nécessaire. En tout état de cause, la simple disponibilité des fonds ne suffit pas à autoriser une dépense non prévue : il faut le visa du contrôleur budgétaire (Art. 112) et le respect de la chaîne de la dépense (Art. 90-91 LOFIP).",
      },
    ],
    articleRef: 'Art. 8, 45, 46-50, 90, 91, 92, 93, 94, 112 LOFIP',
  },
]

// ============================================================
// COMPOSANTS
// ============================================================
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
      <p className="text-xs font-semibold text-foreground">{q.question}</p>
      <p className="text-[10px] text-muted-foreground italic">{q.articleRef}</p>
      <div className="space-y-1">
        {q.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={cn(
              'w-full text-left text-xs px-2 py-1.5 rounded border transition-colors',
              selected === opt.id
                ? showResult
                  ? opt.id === q.reponseCorrecte ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-100 border-red-400 text-red-800'
                  : 'bg-violet-100 border-violet-400'
                : showResult && opt.id === q.reponseCorrecte
                  ? 'bg-green-50 border-green-300'
                  : 'border-border hover:bg-muted'
            )}
          >
            <span className="font-medium">{opt.id.toUpperCase()}.</span> {opt.texte}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setShowResult(true)}
          disabled={!selected}
          className="text-xs px-3 py-1 rounded bg-violet-600 text-white disabled:opacity-40 hover:bg-violet-700"
        >
          Valider
        </button>
        <button
          onClick={() => { setSelected(null); setShowResult(false) }}
          className="text-xs px-2 py-1 rounded border border-border hover:bg-muted"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
      {showResult && (
        <div className={cn('text-xs p-2 rounded', selected === q.reponseCorrecte ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800')}>
          <span className="font-semibold">{selected === q.reponseCorrecte ? '✓ Correct' : '✗ Incorrect'}</span> - {q.explication}
        </div>
      )}
    </div>
  )
}

function CasPratiqueBlock({ cas }: { cas: typeof ETUDES_DE_CAS[0] }) {
  const [openQ, setOpenQ] = useState<string | null>(null)
  return (
    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
      <div>
        <p className="text-xs font-bold text-foreground">{cas.titre}</p>
        <p className="text-[10px] text-muted-foreground italic mt-0.5">{cas.articleRef}</p>
      </div>
      <div className="bg-background border border-border rounded p-3 text-xs text-foreground leading-relaxed">
        <p className="font-semibold mb-1">Contexte</p>
        <p>{cas.contexte}</p>
      </div>
      <div className="space-y-2">
        {cas.questions.map(q => (
          <div key={q.num} className="border border-border rounded">
            <button
              onClick={() => setOpenQ(openQ === q.num ? null : q.num)}
              className="w-full text-left p-3 text-xs font-medium flex items-center justify-between hover:bg-muted/30"
            >
              <span>Question {q.num} - {q.enonce.slice(0, 80)}{q.enonce.length > 80 ? '…' : ''}</span>
              <ChevronRight className={cn('h-3.5 w-3.5 shrink-0 transition-transform', openQ === q.num && 'rotate-90')} />
            </button>
            {openQ === q.num && (
              <div className="px-3 pb-3 space-y-2 text-xs">
                <p className="text-foreground font-medium italic">{q.enonce}</p>
                <div className="bg-violet-50 border border-violet-200 rounded p-2 text-foreground leading-relaxed">
                  <p className="font-semibold text-violet-700 mb-1">Correction</p>
                  <p>{q.correction}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function UE5Chapitre7Page() {
  const goBack = useGoBack('/ue5-finances-publiques')
  const user = useUser()
  const isAdmin = isStaffRole(user)

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]

  const casPratiquesForDevoir: CasPratiqueExistant[] = ETUDES_DE_CAS.map(ec => ({
    id: ec.id,
    titre: ec.titre,
    enonce: ec.contexte + '\n' + ec.questions.map(q => q.num + '. ' + q.enonce).join('\n'),
    corrigeType: ec.questions.map(q => 'Q' + q.num + ': ' + q.correction).join('\n\n'),
  }))

  const tabs = isAdmin
    ? [
        { id: 'lecons', label: 'Leçons' },
        { id: 'qcm', label: 'QCM' },
        { id: 'cas', label: 'Cas pratiques' },
        { id: 'devoir', label: 'Devoir' },
      ]
    : [
        { id: 'lecons', label: 'Leçons' },
        { id: 'devoir', label: 'Devoir' },
      ]

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border animate-slideDown">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="space-y-1">
            <Breadcrumb
              items={[
                { label: 'Mes cours', route: '/mes-cours' },
                { label: 'UE 5 - Finances publiques', route: '/ue5-finances-publiques' },
                { label: 'Chapitre 7' },
              ]}
              color="emerald"
            />
            <BackButton />
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-display font-bold text-foreground leading-tight">Exécution des dépenses - chaîne de la dépense</h1>
              <InfoTooltip texte="Ce chapitre analyse la chaîne de la dépense publique en RDC : les quatre phases obligatoires (Art. 90 LOFIP), les acteurs (ordonnateur, comptable public, contrôleur budgétaire) et les quatre comptabilités publiques (Art. 95-101 LOFIP). Contenu exclusivement juridique fondé sur la LOFIP et la Constitution." loi="Art. 88-115 LOFIP · RGCP" />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                  activeTab === t.id
                    ? 'bg-violet-600 text-white scale-105'
                    : 'text-muted-foreground hover:bg-muted hover:scale-105'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fadeIn" key={activeTab}>

        {/* ── LECONS ── */}
        {activeTab === 'lecons' && (
          <div className="space-y-4">
            {/* Navigation leçons */}
            <div className="flex gap-2 flex-wrap">
              {LECONS.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => setLeconIdx(i)}
                  className={cn(
                    'text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-105',
                    leconIdx === i
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'border-border hover:bg-muted text-muted-foreground'
                  )}
                >
                  L{i + 1}
                </button>
              ))}
            </div>

            {/* Carte leçon */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-violet-50 px-4 py-3 border-b border-border">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{lecon.icone}</div>
                  <div>
                    <h2 className="font-display font-bold text-foreground text-sm">{lecon.titre}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{lecon.soustitre}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {lecon.contenu}
              </div>
            </div>

            {/* QCMs de la leçon */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground">QCM de la leçon</h3>
              {lecon.qcms.map(q => <QCMBlock key={q.id} q={q} />)}
            </div>

            {/* Navigation prev/next */}
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setLeconIdx(i => Math.max(0, i - 1))}
                disabled={leconIdx === 0}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Précédente
              </button>
              <button
                onClick={() => setLeconIdx(i => Math.min(LECONS.length - 1, i + 1))}
                disabled={leconIdx === LECONS.length - 1}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40"
              >
                Suivante <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Synthèse */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-violet-800 mb-2">Synthèse juridique - Art. 88–115 LOFIP</h3>
              <ul className="space-y-1.5">
                {[
                  'Art. 88 : Mise à disposition des crédits par arrêté du Ministre du Budget',
                  'Art. 90 : 4 phases immuables - engagement, liquidation, ordonnancement (ordonnateur), paiement (comptable)',
                  "Art. 91 al. 3 : Tout paiement doit être précédé d\'un ordonnancement régulier",
                  'Art. 92 : Engagement hors personnel interdit après le 31 octobre',
                  'Art. 93-94 : Reports de crédits conditionnés - obligations au 31 octobre, ordonnance-loi Président',
                  'Art. 95-101 : 4 comptabilités publiques (administrative, budgétaire, matières, générale)',
                  "Art. 102 : Seuls l\'ordonnateur et le comptable public exécutent le budget",
                  'Art. 103-106 : Ordonnateur (103), contrôleur budgétaire (104), Ministre Budget (105), Ministre Finances (106)',
                  'Art. 107-108 : Avis préalable du Ministre du Budget obligatoire ; opérations financières soumises à loi',
                  'Art. 109 : Comptable public - responsabilité du Ministre des Finances, sincérité des enregistrements',
                  'Art. 112-115 : Contrôleur budgétaire - visa a priori obligatoire, refus protégé, désaccord référé au Ministre du Budget',
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-violet-700">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-violet-600" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── QCM ADMIN ── */}
        {activeTab === 'qcm' && isAdmin && (
          <QCMPageUnique questions={QCM_GLOBAL.questions} couleurAccent="violet" />
        )}

        {/* ── CAS PRATIQUES ADMIN ── */}
        {activeTab === 'cas' && isAdmin && (
          <div className="space-y-4">
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Scale className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
                <div className="text-xs text-violet-800">
                  <p className="font-semibold mb-0.5">5 cas pratiques de réflexion juridique</p>
                  <p>Chaque cas est ancré exclusivement dans la LOFIP (Art. 88–115) et la Constitution RDC. Tous les cas exigent une analyse juridique rigoureuse, la citation des articles et une qualification des violations.</p>
                </div>
              </div>
            </div>
            {ETUDES_DE_CAS.map(cas => <CasPratiqueBlock key={cas.id} cas={cas} />)}
          </div>
        )}

        {/* ── DEVOIR ── */}
        {activeTab === 'devoir' && (
          <DevoirChapitreCreateur
            chapitreId="ue5-chapitre-7"
            chapitreNom="Chapitre 7 - Exécution des dépenses - chaîne de la dépense"
            questions={QCM_GLOBAL.questions}
            coursId="ue5-finances-publiques"
            casPratiquesExistants={casPratiquesForDevoir}
          />
        )}
      </div>
    </div>
  )
}
