import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, ChevronRight, Scale, Users, Gavel,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE — reprise à l'identique de UE1DroitTravailPage.tsx
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const PAPIER_CARD = 'bg-[#F8F4E8]'
const LIGNE = 'border-[#D6CCAE]'
const VERT = 'text-[#1E4A3D]'
const VERT_BG = 'bg-[#1E4A3D]'
const VERT_BORDER = 'border-[#1E4A3D]'
const VERT_SOFT = 'bg-[#1E4A3D]/10'
const AMBRE = 'text-[#8A6416]'
const AMBRE_BORDER = 'border-[#D9B676]'
const AMBRE_SOFT = 'bg-[#B8863B]/10'
const MUTED = 'text-[#7A6E5C]'

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
  numero: string
  titre: string
  badge?: string
  contenu: React.ReactNode
  questions: QCMQuestion[]
}

const LECONS: Lecon[] = [
  {
    id: 'l1',
    numero: '1.1',
    titre: 'Objet et finalité du droit du travail',
    badge: 'Introduction',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Le droit du travail est la branche du droit qui régit les rapports individuels et collectifs nés à l'occasion du travail salarié. En République Démocratique du Congo, il est fondé sur la <strong>loi n°015/2002 du 16 octobre 2002 portant Code du travail</strong>, telle que modifiée et complétée par la <strong>loi n°16/010 du 15 juillet 2016</strong>. Le Code compte 16 titres et 334 articles ; il constitue le texte de référence de tout ce module.
        </p>
        <p>
          Cette branche du droit poursuit une finalité qui la distingue du droit commun des contrats : elle organise une relation structurellement inégale — celle du travailleur, économiquement dépendant de son emploi, et de l'employeur, qui détient le pouvoir de direction — en imposant un socle de règles impératives auxquelles le contrat individuel ne peut déroger que dans un sens plus favorable au travailleur. C'est ce que la doctrine appelle le <strong>principe de faveur</strong> : la loi fixe un plancher de protection, jamais un plafond.
        </p>
        <div className={cn('rounded-xl border p-3', LIGNE, VERT_SOFT)}>
          <p className={cn('text-xs font-semibold mb-1', VERT)}>Point de méthode</p>
          <p className={cn('text-xs', ENCRE)}>
            Tout au long de ce manuel, chaque règle est rattachée à son article. Le réflexe à acquérir dès ce premier chapitre n'est pas de mémoriser un numéro d'article isolément, mais de savoir à quel titre du Code il appartient et quelle logique d'ensemble il sert — c'est cette compréhension structurée qui est interrogée aux examens, bien plus que la récitation.
          </p>
        </div>
      </div>
    ),
    questions: [],
  },
  {
    id: 'l2',
    numero: '1.2',
    titre: 'Sources et hiérarchie des normes',
    badge: 'Méthodologie',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Le droit du travail congolais se déploie à plusieurs niveaux hiérarchisés, chacun ne pouvant que préciser ou améliorer le niveau supérieur, jamais le contredire en défaveur du travailleur :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={cn(VERT_SOFT)}>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Niveau</th>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Source</th>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Exemple</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Constitutionnel', 'Constitution du 18 février 2006, notamment le droit et le devoir au travail', 'Art. 36 de la Constitution'],
                ['Législatif', 'Loi n°015/2002 modifiée par la loi n°16/010, et lois particulières (sécurité sociale, INPP)', 'Code du travail, art. 1 à 334'],
                ['Réglementaire', 'Décrets et arrêtés d\'exécution pris par le Président de la République, le Premier ministre ou le ministre ayant le Travail dans ses attributions', 'Décret n°25/22 du 30/05/2025 fixant le SMIG'],
                ['Conventionnel collectif', 'Conventions et accords collectifs d\'entreprise ou de branche, négociés entre employeurs et syndicats', 'Convention collective d\'une entreprise'],
                ['Contractuel', 'Le contrat individuel de travail lui-même, et le règlement d\'entreprise', 'Contrat à durée déterminée ou indéterminée'],
              ].map(([niveau, source, ex], i) => (
                <tr key={i} className="even:bg-black/[.02]">
                  <td className={cn('p-2 border font-medium', LIGNE)}>{niveau}</td>
                  <td className={cn('p-2 border', LIGNE)}>{source}</td>
                  <td className={cn('p-2 border italic', LIGNE, MUTED)}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          À ces sources internes s'ajoutent les <strong>conventions de l'Organisation internationale du travail (OIT)</strong> ratifiées par la RDC, qui s'intègrent à l'ordre juridique interne dès leur ratification et priment sur la loi nationale contraire.
        </p>
      </div>
    ),
    questions: [
      {
        type: 'qcm', id: 'q1-2-1',
        question: 'Un accord collectif d\'entreprise peut-il prévoir une durée de préavis plus courte que celle fixée par le Code du travail ?',
        options: [
          { id: 'a', texte: 'Oui, librement, dans le cadre de la négociation collective' },
          { id: 'b', texte: 'Non, sauf s\'il est plus favorable au travailleur' },
          { id: 'c', texte: 'Oui, mais uniquement pour les cadres' },
        ],
        reponseCorrecte: 'b',
        explication: 'En vertu du principe de faveur, une norme de rang inférieur ne peut déroger à une norme de rang supérieur que dans un sens plus favorable au travailleur. Un préavis raccourci sans contrepartie serait moins favorable et donc inopposable.',
        articleRef: 'Principe de faveur',
      },
    ],
  },
  {
    id: 'l3',
    numero: '1.3',
    titre: "Champ d'application du Code du travail",
    badge: 'Art. 1',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Le champ d'application du Code du travail est défini par son article 1er. Il régit les relations individuelles et collectives de travail entre les <strong>travailleurs</strong> et les <strong>employeurs</strong>, ainsi que l'exercice de la profession, mais un certain nombre de catégories en sont expressément exclues parce qu'elles relèvent de statuts particuliers.
        </p>
        <div className={cn('rounded-xl border p-4', LIGNE, PAPIER_CARD)}>
          <p className={cn('text-xs font-semibold uppercase mb-2', MUTED)}>Article 1er, Loi n°015/2002</p>
          <p className={cn('italic', ENCRE)}>
            « La présente loi est applicable aux travailleurs et aux employeurs exerçant leur activité professionnelle sur toute l'étendue de la République Démocratique du Congo. Elle ne s'applique pas : aux magistrats ; aux juges consulaires et assesseurs des tribunaux du travail ; aux agents de carrière des services publics de l'État régis par le statut général et les statuts particuliers de la fonction publique ; aux membres des Forces armées et de la Police nationale. »
          </p>
        </div>
        <p>
          Ces exclusions ne signifient pas une absence de protection : les catégories exclues relèvent d'un <strong>statut légal ou réglementaire propre</strong> (statut de la fonction publique, statut militaire ou policier) plutôt que du régime contractuel de droit privé organisé par le Code du travail. La distinction est fondamentale sur le plan méthodologique : un magistrat ou un fonctionnaire de carrière ne peut jamais se prévaloir des règles de licenciement, de préavis ou de décompte final étudiées dans ce manuel.
        </p>
        <div className={cn('rounded-xl border p-3', AMBRE_BORDER, AMBRE_SOFT)}>
          <p className={cn('text-xs font-semibold mb-1', AMBRE)}>À retenir</p>
          <p className={cn('text-xs', ENCRE)}>
            Retenez les quatre catégories exclues par un moyen mnémotechnique simple : magistrature, juridictions du travail (juges consulaires et assesseurs), fonction publique de carrière, forces de défense et de sécurité (FARDC/PNC). Toute autre relation de travail salarié entre dans le champ du Code.
          </p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm', id: 'q1-3-1',
        question: 'Lequel des travailleurs suivants relève du Code du travail ?',
        options: [
          { id: 'a', texte: 'Un juge consulaire d\'un tribunal de commerce' },
          { id: 'b', texte: 'Un agent de carrière de la fonction publique régi par son statut particulier' },
          { id: 'c', texte: 'Un comptable salarié d\'une société privée' },
        ],
        reponseCorrecte: 'c',
        explication: "Les magistrats, juges consulaires et assesseurs, agents de carrière de la fonction publique et membres des FARDC/PNC sont expressément exclus par l'article 1er. Un salarié de droit privé, quelle que soit sa fonction, relève du Code du travail.",
        articleRef: 'Art. 1er',
      },
    ],
  },
  {
    id: 'l4',
    numero: '1.4',
    titre: 'Définitions fondamentales',
    badge: 'Art. 7',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          L'article 7 du Code du travail fixe onze définitions qui conditionnent l'interprétation de l'ensemble du texte. C'est un chapitre à part entière : un cours de droit s'ouvre par ses concepts, et non par ses seules obligations pratiques. Les définitions les plus structurantes pour la suite du manuel — et en particulier pour le calcul du décompte final au chapitre 10 — sont le <strong>travailleur</strong>, l'<strong>employeur</strong>, le <strong>contrat de travail</strong> et la <strong>rémunération</strong>.
        </p>
        <div className="space-y-3">
          {[
            ['1. Travailleur', 'Toute personne physique qui s\'est engagée à mettre son activité professionnelle, moyennant rémunération, sous la direction et l\'autorité d\'une autre personne, physique ou morale, publique ou privée.'],
            ['2. Employeur', 'Toute personne physique ou morale, publique ou privée, qui utilise les services d\'un ou plusieurs travailleurs en vertu d\'un contrat de travail.'],
            ['3. Contrat de travail', 'Convention par laquelle une personne, le travailleur, s\'engage à fournir à une autre personne, l\'employeur, sous la subordination et la direction de celle-ci, une prestation de travail moyennant rémunération.'],
            ['6. Recrutement', 'Toute activité ayant pour but de rassembler des candidats en vue d\'assurer le fonctionnement d\'un service ou d\'une entreprise, dans le but de leur offrir un emploi salarié.'],
            ['9. Jour ouvrable', 'Tout jour où, selon la coutume ou le règlement, il est possible de travailler, à l\'exclusion du jour de repos hebdomadaire et des jours fériés légaux.'],
            ['10. Temps de services', 'La durée pendant laquelle le travailleur a été occupé de manière effective ou assimilée au service d\'un même employeur, quelles qu\'aient été les interruptions de cette occupation dues au fait de l\'employeur.'],
          ].map(([t, d], i) => (
            <div key={i} className={cn('rounded-xl border p-3', LIGNE, PAPIER_CARD)}>
              <p className={cn('text-xs font-semibold mb-1', VERT)}>{t}</p>
              <p className={cn('text-xs', ENCRE)}>{d}</p>
            </div>
          ))}
        </div>

        <p className="pt-1">
          La définition de la <strong>rémunération</strong> (point 8 de l'article 7) mérite un traitement à part : elle distingue explicitement ce qui entre dans son assiette de ce qui en est exclu, une distinction qui sera reprise telle quelle au chapitre 5 (protection du salaire) et au chapitre 10 (décompte final).
        </p>
        <div className={cn('rounded-xl border p-4', LIGNE, PAPIER_CARD)}>
          <p className={cn('text-xs font-semibold uppercase mb-2', MUTED)}>Article 7, point 8 — Rémunération</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className={cn('text-xs font-semibold mb-1', VERT)}>Éléments compris</p>
              <ul className={cn('text-xs space-y-0.5 list-disc list-inside', ENCRE)}>
                <li>Le salaire ou traitement</li>
                <li>Les commissions</li>
                <li>L'indemnité de vie chère</li>
                <li>Les primes</li>
                <li>La participation aux bénéfices</li>
                <li>Les gratifications</li>
                <li>Les prestations supplémentaires</li>
                <li>Les avantages en nature</li>
                <li>L'allocation de congé</li>
                <li>Les sommes dues pendant les périodes d'incapacité de travail ou de maternité</li>
              </ul>
            </div>
            <div>
              <p className={cn('text-xs font-semibold mb-1', AMBRE)}>Éléments exclus</p>
              <ul className={cn('text-xs space-y-0.5 list-disc list-inside', ENCRE)}>
                <li>Les soins de santé</li>
                <li>L'indemnité de logement</li>
                <li>Les allocations familiales légales</li>
                <li>L'indemnité de transport</li>
                <li>Les frais de voyage</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Enfin, le point 11 définit la <strong>famille du travailleur</strong> aux fins d'application du Code (conjoint, enfants), en fixant notamment une limite d'âge de 25 ans pour les enfants poursuivant des études — une notion mobilisée pour les allocations familiales et certains droits à congé.
        </p>
      </div>
    ),
    questions: [
      {
        type: 'qcm', id: 'q1-4-1',
        question: "Laquelle de ces sommes n'entre PAS dans la rémunération au sens de l'article 7 du Code du travail ?",
        options: [
          { id: 'a', texte: 'La gratification annuelle' },
          { id: 'b', texte: "L'indemnité de logement" },
          { id: 'c', texte: 'La prime de rendement' },
        ],
        reponseCorrecte: 'b',
        explication: "L'indemnité de logement, tout comme les soins de santé, les allocations familiales légales, l'indemnité de transport et les frais de voyage, est expressément exclue de la rémunération par l'article 7, point 8.",
        articleRef: 'Art. 7, point 8',
      },
    ],
  },
  {
    id: 'l5',
    numero: '1.5',
    titre: 'Le lien de subordination : critère distinctif du contrat de travail',
    badge: 'Doctrine',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          La définition légale du contrat de travail (art. 7, point 3) met en avant un élément central : la <strong>subordination</strong>. C'est ce critère, et non la seule existence d'une rémunération, qui permet de distinguer le contrat de travail d'autres conventions voisines — le contrat d'entreprise (prestataire indépendant) ou le mandat (représentation).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={cn(VERT_SOFT)}>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Critère</th>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Contrat de travail</th>
                <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Contrat d'entreprise (prestataire)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Autorité', 'Le travailleur exécute sous la direction et le contrôle de l\'employeur', 'Le prestataire organise librement son travail'],
                ['Moyens', 'Souvent fournis par l\'employeur (outils, lieu, horaires)', 'Le prestataire utilise en général ses propres moyens'],
                ['Rémunération', 'Salaire périodique, indépendant du résultat', 'Prix convenu, souvent lié à un résultat ou une mission'],
                ['Sanction disciplinaire', 'Possible (le travailleur est soumis au règlement intérieur)', 'Exclue (relation entre partenaires indépendants)'],
              ].map(([c, t, p], i) => (
                <tr key={i} className="even:bg-black/[.02]">
                  <td className={cn('p-2 border font-medium', LIGNE)}>{c}</td>
                  <td className={cn('p-2 border', LIGNE)}>{t}</td>
                  <td className={cn('p-2 border', LIGNE, MUTED)}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Cette distinction n'est pas académique : elle a des conséquences pratiques majeures. Seul le travailleur lié par un contrat de travail bénéficie du régime protecteur du Code — préavis, congés, protection du salaire, couverture CNSS. Un prestataire indépendant relève du droit commun des contrats et, le cas échéant, du droit commercial.
        </p>
      </div>
    ),
    questions: [],
  },
  {
    id: 'l6',
    numero: '1.6',
    titre: 'Capacité de contracter et travail des enfants',
    badge: 'Art. 6',
    contenu: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          L'article 6 fixe l'âge minimum de capacité à contracter un contrat de travail à <strong>18 ans révolus</strong>. Ce principe connaît une dérogation strictement encadrée pour les mineurs à partir de 15 ans.
        </p>
        <div className={cn('rounded-xl border p-4', LIGNE, PAPIER_CARD)}>
          <p className={cn('text-xs font-semibold uppercase mb-2', MUTED)}>Article 6 — synthèse des conditions de la dérogation</p>
          <ul className={cn('text-xs space-y-1.5 list-disc list-inside', ENCRE)}>
            <li>Le mineur doit avoir <strong>au moins 15 ans</strong></li>
            <li>Autorisation délivrée par le <strong>Président du Tribunal de paix</strong> du ressort</li>
            <li>Sur avis conforme d'un <strong>examen psycho-médical</strong></li>
            <li>Et après avis de l'<strong>inspecteur du travail</strong> du ressort</li>
          </ul>
          <p className={cn('text-xs mt-2', ENCRE)}>
            Entre 16 et 18 ans, seuls des <strong>travaux légers</strong>, déterminés par arrêté du ministre ayant le Travail dans ses attributions, peuvent être autorisés — à l'exclusion de tout travail dangereux ou de nuit.
          </p>
        </div>
        <p>
          Cette architecture doit être lue en cohérence avec les articles 3 à 5 du même titre, consacrés aux <strong>pires formes de travail des enfants</strong> et à la mise en place d'un Comité national de lutte contre ce phénomène — un rappel que le droit du travail congolais s'inscrit dans le prolongement des conventions de l'OIT sur l'âge minimum et les pires formes de travail des enfants.
        </p>
      </div>
    ),
    questions: [
      {
        type: 'qcm', id: 'q1-6-1',
        question: "Un employeur peut-il embaucher directement un mineur de 16 ans pour un poste de manutention lourde, avec l'accord des parents ?",
        options: [
          { id: 'a', texte: 'Oui, l\'accord parental suffit dès 16 ans' },
          { id: 'b', texte: 'Non : seuls des travaux légers sont autorisés entre 16 et 18 ans, la manutention lourde en est exclue' },
          { id: 'c', texte: 'Oui, à condition de payer le SMIG' },
        ],
        reponseCorrecte: 'b',
        explication: "L'accord parental n'a pas d'incidence sur la capacité légale. Entre 16 et 18 ans, seuls les travaux légers déterminés par arrêté ministériel sont autorisés ; un poste de manutention lourde y est étranger.",
        articleRef: 'Art. 6',
      },
    ],
  },
]

const QCM_GLOBAL: QCMQuestion[] = LECONS.flatMap(l => l.questions)

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
    titre: 'Qualifier une relation de travail',
    contexte: "Mme Kalonji est engagée par une société de nettoyage industriel de Lubumbashi. Elle intervient chaque jour aux heures fixées par son responsable, avec le matériel fourni par la société, et perçoit une somme fixe chaque mois. Un cabinet comptable indépendant facture par ailleurs la même société une fois par trimestre pour la tenue de sa comptabilité, selon ses propres horaires et avec ses propres outils.",
    questions: [
      { num: 1, enonce: 'Mme Kalonji relève-t-elle du Code du travail ? Justifiez au regard de l\'article 7.', correction: "Oui. Elle est sous la direction et l'autorité de l'employeur (horaires fixés, matériel fourni, autorité hiérarchique), critère du lien de subordination retenu par l'article 7, point 3. Sa relation est un contrat de travail." },
      { num: 2, enonce: 'Le cabinet comptable est-il un travailleur au sens du Code ?', correction: "Non. Il organise librement son intervention, fixe ses propres horaires et utilise ses propres moyens : il n'existe aucun lien de subordination. Il s'agit d'un contrat d'entreprise (prestation de service), étranger au Code du travail." },
      { num: 3, enonce: 'Cette qualification a-t-elle une incidence sur les obligations sociales de l\'entreprise ?', correction: "Oui. Seule Mme Kalonji, en tant que travailleuse, ouvre droit à affiliation CNSS, à congé payé et à protection contre le licenciement. Le cabinet comptable, prestataire indépendant, en est exclu." },
    ],
    articleRef: 'Art. 7 point 3',
  },
  {
    id: 'ec2',
    titre: 'Champ d\'application et éléments de rémunération',
    contexte: "M. Bomboko, agent de carrière de la fonction publique, estime pouvoir invoquer le Code du travail pour contester une sanction disciplinaire. Par ailleurs, son cousin, employé dans une entreprise privée, perçoit chaque mois un salaire de base, une prime de rendement, une indemnité de logement et une indemnité de transport.",
    questions: [
      { num: 1, enonce: 'M. Bomboko peut-il invoquer le Code du travail ?', correction: "Non. L'article 1er exclut expressément les agents de carrière des services publics de l'État régis par le statut général et les statuts particuliers de la fonction publique. Il relève de son statut propre, non du Code du travail." },
      { num: 2, enonce: 'Parmi les sommes perçues par son cousin, lesquelles entrent dans la rémunération au sens de l\'article 7 ?', correction: "Le salaire de base et la prime de rendement entrent dans la rémunération (art. 7, point 8). L'indemnité de logement et l'indemnité de transport en sont expressément exclues." },
    ],
    articleRef: 'Art. 1er, Art. 7 point 8',
  },
]

function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className={cn('rounded-xl border p-4 space-y-3', VERT_BORDER, VERT_SOFT)}>
      <p className={cn('text-xs font-semibold', VERT)}>{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? cn(VERT_BORDER, 'bg-[#1E4A3D]/15', ENCRE) : cn(LIGNE, 'hover:bg-black/[.02]')
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += cn(LIGNE, 'opacity-50')
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className={cn('text-xs text-white rounded-lg px-4 py-1.5 disabled:opacity-40 transition-colors font-semibold', VERT_BG)}>Vérifier</button>}
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
    <div className={cn('rounded-xl border overflow-hidden', LIGNE, PAPIER_CARD)}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-black/[.02] transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className={cn('h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 text-white', VERT_BG)}>{cp.id.replace('ec', 'C')}</span>
          <div>
            <p className={cn('text-sm font-semibold', ENCRE)}>{cp.titre}</p>
            <p className={cn('text-xs', MUTED)}>{cp.articleRef}</p>
          </div>
        </div>
        <ChevronRight className={cn('h-4 w-4 shrink-0 transition-transform', VERT, open && 'rotate-90')} />
      </button>
      {open && (
        <div className={cn('px-4 pb-4 space-y-4 border-t pt-4', LIGNE)}>
          <div className={cn('rounded-lg p-3', AMBRE_BORDER, AMBRE_SOFT, 'border')}>
            <p className={cn('text-xs font-semibold mb-1', AMBRE)}>Contexte</p>
            <p className={cn('text-xs leading-relaxed', ENCRE)}>{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className={cn('text-xs font-semibold', ENCRE)}>Question {q.num} : {q.enonce}</p>
                {corrVisible.has(q.num) ? (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                    <p className="text-xs font-semibold text-green-700 mb-1">Correction</p>
                    <p className="text-xs text-green-900 leading-relaxed">{q.correction}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrVisible(s => new Set([...s, q.num]))} className={cn('text-xs hover:underline font-medium', VERT)}>Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function UE1Chapitre1Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue1-droit-travail')
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
            { label: 'UE 1 — Droit du travail', route: '/ue1-droit-travail' },
            { label: 'Chapitre 1' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={cn('font-display text-lg font-bold leading-tight', ENCRE)}>Notions fondamentales et sources du droit du travail</h1>
          <InfoTooltip texte="Champ d'application, sources et définitions légales du droit du travail congolais." loi="Titre I, art. 1 à 7" />
        </div>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Titre I du Code du travail — Loi n°015/2002, art. 1 à 7</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '4h00' },
        ].map(s => (
          <div key={s.label} className={cn('rounded-xl border p-3 text-center', LIGNE, PAPIER_CARD)}>
            <p className={cn('text-lg font-bold', ENCRE)}>{s.value}</p>
            <p className={cn('text-xs mt-0.5', MUTED)}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className={cn('rounded-xl border p-4', VERT_BORDER, VERT_SOFT)}>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className={cn('h-4 w-4', VERT)} />
          <span className={cn('text-sm font-semibold', VERT)}>Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          {[
            "Situer le droit du travail congolais dans sa hiérarchie des normes et connaître ses sources",
            "Délimiter le champ d'application du Code du travail et ses catégories exclues (art. 1)",
            "Maîtriser les définitions légales fondamentales de l'article 7, en particulier travailleur, employeur, contrat de travail et rémunération",
            "Distinguer le contrat de travail des conventions voisines par le critère du lien de subordination",
            "Connaître les règles de capacité de contracter et la protection des mineurs (art. 6)",
          ].map((o, i) => (
            <li key={i} className={cn('flex items-start gap-2 text-xs', ENCRE)}>
              <CheckCircle2 className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', VERT)} />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('flex gap-1 rounded-xl p-1', PAPIER_CARD, 'border', LIGNE)}>
        {(isStudent
          ? [['lecons', 'Leçons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lecons', 'Leçons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
        ).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors', activeTab === tab ? cn(VERT_BG, 'text-white') : cn(MUTED, 'hover:text-foreground'))}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'lecons' && (
        <div className="space-y-4">
          <div className="flex gap-1 flex-wrap">
            {LECONS.map((l, i) => (
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors font-mono', leconIdx === i ? cn(VERT_BG, 'text-white border-transparent') : cn(LIGNE, 'hover:border-[#1E4A3D]'))}>
                {l.numero}
              </button>
            ))}
          </div>
          <div className={cn('rounded-xl border-l-4 p-4', VERT_BORDER, PAPIER_CARD, 'border')}>
            <div className="flex items-center justify-between mb-1">
              <span className={cn('text-xs font-semibold', VERT)}>Section {lecon.numero}</span>
              <span className={cn('text-xs', MUTED)}>{lecon.badge ?? ''}</span>
            </div>
            <h2 className={cn('font-display text-base font-bold', ENCRE)}>{lecon.titre}</h2>
          </div>
          <div className="space-y-4">
            <div className={cn('rounded-xl border p-4 space-y-2', LIGNE, PAPIER_CARD, ENCRE)}>
              {lecon.contenu}
            </div>
            {lecon.questions.map((q, idx) => (
              <QCMBlock key={idx} q={q} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? cn('opacity-40 cursor-not-allowed', LIGNE) : cn(LIGNE, 'hover:border-[#1E4A3D]'))}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className={cn('text-xs', MUTED)}>{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', LIGNE, 'hover:border-[#1E4A3D]')}>
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl text-white transition-colors', VERT_BG)}>
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className={cn('rounded-xl border p-4', AMBRE_BORDER, AMBRE_SOFT)}>
            <div className="flex items-center gap-2 mb-2">
              <Scale className={cn('h-4 w-4', AMBRE)} />
              <span className={cn('text-sm font-semibold', AMBRE)}>À retenir — synthèse du chapitre</span>
            </div>
            <ul className={cn('text-xs space-y-1.5 list-disc list-inside', ENCRE)}>
              <li>Le Code du travail (Loi n°015/2002, mod. Loi n°16/010) organise un socle impératif de protection ; le contrat individuel et la convention collective ne peuvent y déroger que favorablement au travailleur.</li>
              <li>Son champ d'application exclut les magistrats, juges consulaires et assesseurs, agents de carrière de la fonction publique et membres des FARDC/PNC (art. 1er).</li>
              <li>Le contrat de travail se distingue par le critère du lien de subordination — direction, autorité, contrôle de l'employeur — et non par la seule existence d'une rémunération.</li>
              <li>La rémunération (art. 7, point 8) inclut salaire, primes, gratifications et avantages en nature, mais exclut soins de santé, indemnité de logement, allocations familiales légales, indemnité de transport et frais de voyage.</li>
              <li>La capacité de contracter est fixée à 18 ans, avec une dérogation encadrée dès 15 ans (autorisation du Président du Tribunal de paix, avis psycho-médical, avis de l'inspecteur du travail) et des travaux légers seuls admis entre 16 et 18 ans.</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="emerald" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className={cn('font-display text-sm font-bold px-1', ENCRE)}>Cas pratiques : {ETUDES_DE_CAS.length} exercices</h2>
          {ETUDES_DE_CAS.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue1-chapitre-1"
              chapitreNom="Chapitre 1 : Notions fondamentales et sources du droit du travail"
              questions={QCM_GLOBAL}
              coursId="ue1-droit-travail"
              casPratiquesExistants={ETUDES_DE_CAS.map(ec => ({
                id: ec.id,
                titre: ec.titre,
                enonce: ec.contexte + '\n' + ec.questions.map(q => q.num + '. ' + q.enonce).join('\n'),
                corrigeType: ec.questions.map(q => q.num + '. ' + q.correction).join('\n'),
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className={cn('rounded-xl border p-6 text-center space-y-2', LIGNE, PAPIER_CARD)}>
              <Users className={cn('h-8 w-8 mx-auto', MUTED)} />
              <p className={cn('text-sm font-medium', ENCRE)}>Devoir en attente</p>
              <p className={cn('text-sm', MUTED)}>Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      <button onClick={goBack} className={cn('w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-colors', VERT_BG)}>
        <Gavel className="h-4 w-4" /> Terminer le chapitre 1
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 1 à 7 · Loi n°16/010 du 15 juillet 2016
      </p>
    </div>
  )
}
