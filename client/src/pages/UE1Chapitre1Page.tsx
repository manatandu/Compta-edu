import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CheckCircle2, XCircle, ChevronRight, ArrowLeft, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE — reprise à l'identique de UE1DroitTravailPage.tsx, plus
// les tokens propres au registre « manuscrit » : encre, papier, filet, vert
// faculté, ambre pour la marginalia. Aucune classe Tailwind dynamique : tout
// est posé en valeurs arbitraires littérales.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const PAPIER = 'bg-[#EDE6D3]'
const PAPIER_CARD = 'bg-[#F8F4E8]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const VERT = 'text-[#1E4A3D]'
const VERT_BG = 'bg-[#1E4A3D]'
const VERT_BORDER = 'border-[#1E4A3D]'
const VERT_SOFT = 'bg-[#1E4A3D]/8'
const AMBRE = 'text-[#8A6416]'
const LETTRINE = "first-letter:font-serif first-letter:font-bold first-letter:text-5xl first-letter:float-left first-letter:leading-[0.8] first-letter:pr-2 first-letter:pt-1 first-letter:text-[#1E4A3D]"

// ─────────────────────────────────────────────────────────────────────────────
// BANQUE DE QUESTIONS — 20 questions, difficulté progressive (rappel de cours
// jusqu'à l'articulation de plusieurs notions du chapitre).
// ─────────────────────────────────────────────────────────────────────────────
const QCM_CHAPITRE: QCMChapitre[] = [
  {
    id: 'q1', question: 'Quelle loi constitue actuellement le Code du travail congolais ?',
    options: [
      { id: 'a', texte: 'La loi n°015/2002 du 16 octobre 2002, modifiée par la loi n°16/010 du 15 juillet 2016' },
      { id: 'b', texte: 'La loi n°16/010 du 15 juillet 2016, seule' },
      { id: 'c', texte: 'Le décret du 27 février 1887 sur le travail' },
    ],
    reponseCorrecte: 'a', articleRef: 'Introduction',
    explication: "Le Code du travail actuellement en vigueur est la loi n°015/2002 du 16 octobre 2002, telle que modifiée et complétée par la loi n°16/010 du 15 juillet 2016.",
  },
  {
    id: 'q2', question: 'Combien de titres et d\'articles compte le Code du travail ?',
    options: [
      { id: 'a', texte: 'Dix titres, deux cents articles' },
      { id: 'b', texte: 'Seize titres, trois cent trente-quatre articles' },
      { id: 'c', texte: 'Vingt titres, quatre cents articles' },
    ],
    reponseCorrecte: 'b', articleRef: '1.1',
    explication: 'Le Code compte seize titres et trois cent trente-quatre articles.',
  },
  {
    id: 'q3', question: 'Comment se nomme le principe selon lequel une norme inférieure ne peut prévoir une protection moindre que la loi ?',
    options: [
      { id: 'a', texte: 'Le principe de faveur' },
      { id: 'b', texte: 'Le principe de proportionnalité' },
      { id: 'c', texte: 'Le principe de spécialité' },
    ],
    reponseCorrecte: 'a', articleRef: '1.1',
    explication: 'Le principe de faveur signifie que la loi fixe un plancher de protection : le contrat, le règlement intérieur ou la convention collective ne peuvent y déroger que favorablement au travailleur.',
  },
  {
    id: 'q4', question: 'Quel âge le Code fixe-t-il, en principe, pour la capacité de contracter un contrat de travail ?',
    options: [
      { id: 'a', texte: 'Seize ans révolus' },
      { id: 'b', texte: 'Dix-huit ans révolus' },
      { id: 'c', texte: 'Vingt et un ans révolus' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "L'article 6 fixe l'âge minimum de capacité à contracter à dix-huit ans révolus, avec une dérogation strictement encadrée dès quinze ans.",
  },
  {
    id: 'q5', question: 'Lequel de ces travailleurs relève du Code du travail ?',
    options: [
      { id: 'a', texte: "Un agent de carrière de la fonction publique" },
      { id: 'b', texte: 'Un magistrat' },
      { id: 'c', texte: 'Un salarié de droit privé, quelle que soit sa fonction' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 1er',
    explication: "L'article 1er exclut les magistrats, juges consulaires et assesseurs, agents de carrière de la fonction publique et membres des FARDC/PNC. Tout autre salarié de droit privé relève du Code.",
  },
  {
    id: 'q6', question: 'Qui doit autoriser l\'engagement d\'un mineur de quinze ans ?',
    options: [
      { id: 'a', texte: 'Le maire de la commune, sur simple demande des parents' },
      { id: 'b', texte: 'Le Président du Tribunal de paix du ressort, sur avis conforme d\'un examen psycho-médical et après avis de l\'inspecteur du travail' },
      { id: 'c', texte: "L'inspecteur du travail seul, sans autre formalité" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "L'autorisation relève du Président du Tribunal de paix du ressort, délivrée sur avis conforme d'un examen psycho-médical et après avis de l'inspecteur du travail.",
  },
  {
    id: 'q7', question: 'Quels sont les trois éléments mis en avant par la définition légale du contrat de travail ?',
    options: [
      { id: 'a', texte: 'La rémunération, la durée, le lieu de travail' },
      { id: 'b', texte: 'La prestation, la subordination, la rémunération' },
      { id: 'c', texte: "L'ancienneté, la qualification, le grade" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 3',
    explication: 'Le contrat de travail se définit par une prestation fournie sous la subordination de l\'employeur, moyennant rémunération.',
  },
  {
    id: 'q8', question: "L'indemnité de logement entre-t-elle dans la rémunération au sens de l'article 7 ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement" },
      { id: 'b', texte: 'Non, elle en est expressément exclue' },
      { id: 'c', texte: "Oui, mais seulement pour les cadres" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 8',
    explication: "L'indemnité de logement est expressément exclue de la rémunération, au même titre que les soins de santé, les allocations familiales légales, l'indemnité de transport et les frais de voyage.",
  },
  {
    id: 'q9', question: "Quelle convention de l'OIT porte sur l'âge minimum d'admission à l'emploi, et quand la RDC l'a-t-elle ratifiée ?",
    options: [
      { id: 'a', texte: 'La convention n°182, ratifiée en 1999' },
      { id: 'b', texte: 'La convention n°138, ratifiée en 2001' },
      { id: 'c', texte: 'La convention n°190, ratifiée en 2020' },
    ],
    reponseCorrecte: 'b', articleRef: '1.2 / 1.6',
    explication: "La convention n°138 de l'OIT porte sur l'âge minimum d'admission à l'emploi ; la RDC l'a ratifiée en 2001, en même temps que la convention n°182 sur les pires formes de travail des enfants.",
  },
  {
    id: 'q10', question: "Qu'est-ce qui distingue fondamentalement un contrat de travail d'un contrat d'entreprise ?",
    options: [
      { id: 'a', texte: "Le montant de la rémunération versée" },
      { id: 'b', texte: 'Le lien de subordination à l\'employeur' },
      { id: 'c', texte: 'La durée de la relation contractuelle' },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "C'est le lien de subordination, et non le montant ou la durée, qui distingue le contrat de travail du contrat d'entreprise, dans lequel le prestataire choisit librement ses moyens.",
  },
  {
    id: 'q11', question: 'Comment l\'article 7 définit-il le "temps de services" ?',
    options: [
      { id: 'a', texte: "La durée totale de la carrière professionnelle du travailleur, tous employeurs confondus" },
      { id: 'b', texte: "La durée pendant laquelle le travailleur a été occupé de manière effective ou assimilée au service d'un même employeur" },
      { id: 'c', texte: "Le nombre d'heures travaillées sur une semaine donnée" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 7, point 10',
    explication: "Le temps de services correspond à la durée d'occupation effective ou assimilée au service d'un même employeur, quelles qu'aient été les interruptions dues au fait de cet employeur.",
  },
  {
    id: 'q12', question: 'Une gratification versée chaque année avec une régularité constante peut-elle être requalifiée en élément de rémunération soumis à cotisation ?',
    options: [
      { id: 'a', texte: 'Non, une gratification reste toujours un acte libéral, quelle que soit sa régularité' },
      { id: 'b', texte: "Oui : une régularité prévisible tend à faire perdre son caractère libéral à la gratification" },
      { id: 'c', texte: 'Non, sauf disposition contraire du contrat' },
    ],
    reponseCorrecte: 'b', articleRef: '1.4',
    explication: "Une gratification versée avec une régularité telle qu'elle en devient prévisible tend, en pratique, à être requalifiée en élément de rémunération soumis aux cotisations sociales.",
  },
  {
    id: 'q13', question: "Un juge consulaire d'un tribunal de commerce est-il un travailleur au sens du Code du travail ?",
    options: [
      { id: 'a', texte: "Oui, dès lors qu'il perçoit une indemnité" },
      { id: 'b', texte: "Non, il exerce une fonction juridictionnelle, étrangère par nature au salariat" },
      { id: 'c', texte: 'Oui, s\'il siège plus de trois fois par an' },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 1er / 1.3',
    explication: "Le juge consulaire, comme l'assesseur des tribunaux du travail, n'est pas salarié de la juridiction auprès de laquelle il siège : il exerce une fonction juridictionnelle bénévole ou indemnisée, exclue du champ du Code par l'article 1er.",
  },
  {
    id: 'q14', question: 'Une société qualifie un livreur de « prestataire indépendant » mais lui impose ses horaires et ses méthodes de travail. Cette qualification contractuelle empêche-t-elle une requalification en contrat de travail ?',
    options: [
      { id: 'a', texte: "Oui, la qualification donnée par les parties au contrat lie le juge" },
      { id: 'b', texte: "Non : si les faits révèlent une subordination réelle, la relation est requalifiée quelle que soit l'étiquette contractuelle" },
      { id: 'c', texte: "Cela dépend uniquement du montant facturé chaque mois" },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "La qualification donnée par les parties ne lie pas le juge : c'est le faisceau d'indices concrets, direction, surveillance, organisation imposée, exclusivité, sanction, qui détermine la nature réelle de la relation.",
  },
  {
    id: 'q15', question: "Entre seize et dix-huit ans, quels travaux un mineur peut-il légalement exercer ?",
    options: [
      { id: 'a', texte: "Tout travail, dès lors que ses parents y consentent par écrit" },
      { id: 'b', texte: "Uniquement des travaux légers déterminés par arrêté ministériel, à l'exclusion de tout travail dangereux ou de nuit" },
      { id: 'c', texte: "Tout travail rémunéré au moins au SMIG" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 6',
    explication: "Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté du ministre ayant le Travail dans ses attributions sont autorisés. Le travail dangereux ou de nuit demeure exclu, quel que soit le consentement parental.",
  },
  {
    id: 'q16', question: "Les travailleurs domestiques, chauffeurs et femmes de ménage employés par des particuliers sont-ils actuellement exclus du champ d'application du Code ?",
    options: [
      { id: 'a', texte: "Oui, ils relèvent d'un statut spécifique depuis 2020" },
      { id: 'b', texte: "Non, ils ne figurent pas parmi les catégories exclues par l'article 1er et relèvent donc, en droit positif, du Code commun" },
      { id: 'c', texte: "Oui, depuis l'adoption de la proposition de loi de mai 2026" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "Les travailleurs domestiques relèvent en droit positif du Code du travail commun, faute d'exclusion expresse. La proposition de loi de mai 2026 n'est, à ce stade, qu'une initiative législative, non un texte en vigueur.",
  },
  {
    id: 'q17', question: "Quelle est la portée juridique actuelle de la proposition de loi Kangila Kawele sur les travailleurs domestiques ?",
    options: [
      { id: 'a', texte: "Elle est en vigueur depuis son dépôt le 15 mai 2026" },
      { id: 'b', texte: "Elle n'a aucune portée normative tant qu'elle n'a pas été adoptée : c'est une initiative législative, à distinguer du droit positif" },
      { id: 'c', texte: "Elle modifie immédiatement l'article 1er du Code" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "Une proposition de loi déposée ne produit aucun effet de droit tant qu'elle n'a pas été adoptée selon la procédure législative. Elle doit être présentée comme une actualité, non comme une règle applicable.",
  },
  {
    id: 'q18', question: "Un cadre supérieur négocie individuellement chaque clause de son contrat avec son employeur. Cela suffit-il à réfuter la thèse du contrat de travail comme contrat d'adhésion telle que la présente Kapuku ?",
    options: [
      { id: 'a', texte: "Oui, un contrat négocié individuellement échappe par définition à la logique d'adhésion" },
      { id: 'b', texte: "Non : la thèse porte sur la généralité des relations de travail, dont la majorité échappe à toute négociation réelle ; l'existence de situations minoritaires de négociation effective ne l'invalide pas" },
      { id: 'c', texte: "Cela dépend uniquement du niveau de rémunération du cadre" },
    ],
    reponseCorrecte: 'b', articleRef: '1.1',
    explication: "La thèse de Kapuku décrit une tendance générale, non une règle sans exception. Certains profils à fort pouvoir de négociation, cadres dirigeants, experts recherchés, échappent partiellement à la logique d'adhésion, sans que cela remette en cause le constat statistique dominant qui justifie le caractère protecteur du Code.",
  },
  {
    id: 'q19', question: "Une personne travaille trois jours par semaine pour une société, facture un prix forfaitaire par mission, choisit librement son lieu de travail, mais reçoit des instructions précises sur la méthode à suivre. Quel indice pèse le plus lourd dans l'appréciation du lien de subordination ?",
    options: [
      { id: 'a', texte: "Le mode de facturation au forfait, qui exclut par nature la subordination" },
      { id: 'b', texte: "Le contrôle des méthodes de travail, qui doit être mis en balance avec le libre choix du lieu et l'absence d'exclusivité, dans un examen global du faisceau d'indices" },
      { id: 'c', texte: "Le nombre de jours travaillés par semaine, seul critère retenu par la jurisprudence" },
    ],
    reponseCorrecte: 'b', articleRef: '1.5',
    explication: "Aucun indice n'est décisif isolément. Le mode de facturation ou le nombre de jours ne suffisent pas à trancher : c'est l'appréciation globale du faisceau, direction, surveillance, organisation, exclusivité, sanction, qui permet de qualifier la relation. Ici, des indices contradictoires appellent un examen approfondi des faits, non une réponse automatique.",
  },
  {
    id: 'q20', question: "Un magistrat exerce, en parallèle de ses fonctions judiciaires, une activité d'enseignant salarié dans une université privée. Cette seconde activité relève-t-elle du Code du travail ?",
    options: [
      { id: 'a', texte: "Non, l'exclusion de l'article 1er couvre toute activité professionnelle du magistrat, y compris accessoire" },
      { id: 'b', texte: "Oui : l'exclusion de l'article 1er est attachée à la fonction de magistrat, non à la personne ; son activité d'enseignant salarié, distincte de sa fonction judiciaire, relève du droit commun du travail" },
      { id: 'c', texte: "Cela dépend uniquement du nombre d'heures d'enseignement par semaine" },
    ],
    reponseCorrecte: 'b', articleRef: '1.3',
    explication: "L'exclusion de l'article 1er est fonctionnelle : elle s'attache à la qualité de magistrat dans l'exercice de sa fonction juridictionnelle, non à toute activité que la personne pourrait exercer par ailleurs. Une activité salariée distincte, ici l'enseignement, relève du Code dans les conditions de droit commun.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CAS PRATIQUES — 5 situations à plusieurs strates, exigeant de croiser
// plusieurs notions du chapitre plutôt que d'appliquer une règle isolée.
// ─────────────────────────────────────────────────────────────────────────────
interface CasPratique {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
}

const CAS_PRATIQUES: CasPratique[] = [
  {
    id: 'cp1',
    titre: 'Le livreur à vélo',
    contexte: "Une société de restauration rapide de Kinshasa collabore avec des livreurs à vélo qu'elle qualifie de « partenaires indépendants ». Chaque livreur signe un contrat de prestation de service, choisit librement ses horaires de connexion à l'application, mais doit respecter un itinéraire imposé par le système, un délai de livraison strict sous peine de désactivation de son compte, et porter un uniforme fourni par la société.",
    questions: [
      { num: 1, enonce: "La liberté de choisir ses horaires de connexion suffit-elle à écarter la qualification de contrat de travail ?", correction: "Non. La liberté de connexion n'est qu'un indice parmi d'autres. L'itinéraire imposé, le délai strict sanctionné par une désactivation (pouvoir de sanction), et l'uniforme fourni (organisation matérielle par le donneur d'ordre) constituent des indices convergents de subordination qui l'emportent, dans un examen global du faisceau, sur la seule liberté horaire." },
      { num: 2, enonce: "La désactivation du compte en cas de retard s'analyse-t-elle juridiquement comme une sanction disciplinaire ?", correction: "Oui, fonctionnellement. Bien qu'elle ne porte pas ce nom, la désactivation prive le livreur de sa source de revenus en réaction à un manquement constaté : elle remplit la fonction d'une sanction disciplinaire, ce qui est un indice caractéristique du pouvoir de sanction de l'employeur, étranger au contrat d'entreprise." },
      { num: 3, enonce: "Si la relation est requalifiée en contrat de travail, quelles conséquences pour la société au regard du chapitre étudié ?", correction: "La société devient employeur au sens de l'article 7, avec les obligations afférentes : affiliation du livreur à la CNSS, application du régime de préavis et de licenciement, respect du principe de faveur pour toute clause du contrat de prestation initial qui serait moins protectrice que le Code." },
    ],
  },
  {
    id: 'cp2',
    titre: "La double activité de Mme Ngalula",
    contexte: "Mme Ngalula est employée en contrat à durée indéterminée par une banque de Lubumbashi, où elle travaille du lundi au vendredi. Le samedi, elle donne des cours de comptabilité dans un centre de formation privé, facturé à l'heure selon un tarif qu'elle a elle-même fixé, sans lien de subordination avec ce centre. En fin d'année, la banque lui verse une gratification équivalant à un mois de salaire, présentée par la direction comme un acte de pure libéralité, mais versée sans interruption depuis six exercices consécutifs.",
    questions: [
      { num: 1, enonce: "Mme Ngalula a-t-elle deux employeurs au sens de l'article 7 ?", correction: "Non. Elle a un employeur, la banque, avec lequel existe un lien de subordination caractérisé. Sa relation avec le centre de formation, sans direction ni contrôle de l'exécution, s'analyse en une prestation de service indépendante, non en un second contrat de travail." },
      { num: 2, enonce: "La gratification annuelle doit-elle être intégrée à l'assiette de sa rémunération au sens de l'article 7 ?", correction: "Oui, malgré sa présentation comme acte de libéralité. La régularité de son versement sur six exercices consécutifs lui fait perdre son caractère aléatoire et discrétionnaire : elle devient un élément prévisible de la rémunération, au sens de l'article 7 point 8, qui inclut expressément les gratifications." },
      { num: 3, enonce: "Cette qualification a-t-elle une incidence pratique pour la banque ?", correction: "Oui. Si la gratification entre dans l'assiette de la rémunération, elle doit être prise en compte dans le calcul de tout élément assis sur le salaire, notamment les cotisations sociales et, le cas échéant, un futur décompte final, étudié au chapitre 10." },
    ],
  },
  {
    id: 'cp3',
    titre: "L'apprenti mécanicien de quinze ans",
    contexte: "Un garage de Matadi engage un jeune de quinze ans pour l'assister dans des tâches de mécanique légère, sur simple accord verbal avec les parents de l'enfant, sans autorisation du Tribunal de paix, sans examen psycho-médical et sans avis de l'inspecteur du travail. Le mineur travaille cinq jours par semaine, y compris certaines tâches de manutention de pièces lourdes.",
    questions: [
      { num: 1, enonce: "L'accord verbal des parents suffit-il à rendre cet engagement conforme à l'article 6 ?", correction: "Non. L'accord parental n'a aucune incidence sur la capacité légale du mineur. L'article 6 exige cumulativement une autorisation du Président du Tribunal de paix, un avis conforme d'un examen psycho-médical et un avis de l'inspecteur du travail : aucune de ces trois conditions n'est ici remplie." },
      { num: 2, enonce: "La manutention de pièces lourdes serait-elle admissible même si les trois conditions de l'article 6 avaient été respectées ?", correction: "Non. Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté ministériel sont autorisés, à l'exclusion de tout travail dangereux. À quinze ans, la dérogation est plus stricte encore. La manutention de pièces lourdes relève, par nature, d'un travail que le Code entend exclure pour un mineur, indépendamment du respect de la procédure d'autorisation." },
      { num: 3, enonce: "Quelle qualification juridique cet engagement appelle-t-il au regard de la finalité protectrice étudiée en 1.1 ?", correction: "Un engagement conclu en violation des conditions impératives de l'article 6 se heurte au caractère d'ordre public social des dispositions protectrices du Code. Ce n'est pas un cas isolé de non-conformité administrative : il illustre la tension, relevée en 1.6, entre l'existence de la règle et son application effective, la sanction de la violation relevant du droit du travail et de la protection de l'enfance." },
    ],
  },
  {
    id: 'cp4',
    titre: "L'agent de sécurité mis à disposition",
    contexte: "Une société de gardiennage emploie M. Kabongo et l'affecte, dans le cadre d'un contrat commercial, à la surveillance d'un site industriel appartenant à une entreprise cliente. Sur le site, M. Kabongo reçoit ses consignes quotidiennes directement du responsable de sécurité de l'entreprise cliente, qui contrôle également ses horaires de faction. Son salaire continue cependant d'être versé par la société de gardiennage, qui reste seule signataire de son contrat de travail.",
    questions: [
      { num: 1, enonce: "Qui est l'employeur de M. Kabongo au sens de l'article 7 : la société de gardiennage ou l'entreprise cliente ?", correction: "La société de gardiennage demeure l'employeur formel : elle a conclu le contrat de travail, verse la rémunération et conserve le pouvoir de recrutement, de sanction disciplinaire et de licenciement. La subordination exercée au quotidien par le responsable de sécurité du site relève d'un encadrement opérationnel délégué contractuellement par la société de gardiennage à sa cliente, non d'un transfert de la qualité d'employeur." },
      { num: 2, enonce: "Le fait que les consignes quotidiennes proviennent de l'entreprise cliente remet-il en cause l'existence d'un contrat de travail entre M. Kabongo et la société de gardiennage ?", correction: "Non. Le lien de subordination juridique, celui qui qualifie le contrat de travail, s'apprécie à l'égard de l'employeur contractant, non de la personne qui exerce matériellement le contrôle au jour le jour dans un dispositif de mise à disposition licite. La société de gardiennage conserve les attributs déterminants de l'employeur : recrutement, rémunération, pouvoir disciplinaire ultime." },
      { num: 3, enonce: "Cette configuration présente-t-elle un risque juridique pour l'une des deux sociétés ?", correction: "Oui, si l'entreprise cliente en venait à exercer, en pratique, l'intégralité des attributs de l'employeur, recrutement, rémunération directe, pouvoir de licenciement, au point de vider de sa substance le rôle de la société de gardiennage. Le faisceau d'indices pourrait alors conduire à une requalification de fait, faisant de l'entreprise cliente un coemployeur, avec les obligations sociales que cela emporterait." },
    ],
  },
  {
    id: 'cp5',
    titre: "La femme de ménage de Mme Ilunga",
    contexte: "Mme Ilunga, particulière employeuse à Kinshasa, engage une femme de ménage qui travaille à son domicile quatre jours par semaine, sans contrat écrit, sans déclaration à la CNSS et sans bulletin de paie. Mme Ilunga a entendu parler d'une proposition de loi récente sur le statut des travailleurs domestiques et vous consulte pour savoir quelles sont ses obligations actuelles.",
    questions: [
      { num: 1, enonce: "Cette relation de travail relève-t-elle aujourd'hui du Code du travail ?", correction: "Oui. Les travailleurs domestiques ne figurent pas parmi les catégories exclues par l'article 1er. La femme de ménage de Mme Ilunga est un travailleur au sens de l'article 7, dès lors qu'elle fournit une prestation sous la subordination de Mme Ilunga, moyennant rémunération, quand bien même aucun contrat écrit n'a été formalisé." },
      { num: 2, enonce: "L'absence de contrat écrit et de déclaration à la CNSS rend-elle la relation de travail inexistante en droit ?", correction: "Non. L'existence d'un contrat de travail ne dépend pas d'un écrit : elle résulte de la réunion des éléments de l'article 7, prestation, subordination, rémunération. L'absence d'écrit et de déclaration constitue un manquement aux obligations de l'employeur, non une absence de contrat, et expose Mme Ilunga à un risque de régularisation rétroactive." },
      { num: 3, enonce: "Que répondre à Mme Ilunga sur la portée de la proposition de loi dont elle a entendu parler ?", correction: "Il convient de lui indiquer clairement que cette proposition, déposée le 15 mai 2026, n'est à ce jour qu'une initiative parlementaire sans force obligatoire. Ses obligations actuelles sont celles du Code du travail commun, applicable dès aujourd'hui à la relation qu'elle a nouée, indépendamment du sort futur de ce texte en discussion." },
    ],
  },
]

function QCMBankItem({ q }: { q: QCMChapitre }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className={cn('rounded-sm border p-4 space-y-3', LIGNE_FORTE, PAPIER_CARD)}>
      <p className={cn('text-sm', ENCRE)}>{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-sm border transition-colors '
          if (!showResult) cls += selected === opt.id ? cn(VERT_BORDER, 'bg-[#1E4A3D]/10', ENCRE) : cn(LIGNE, 'hover:bg-black/[.02]')
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-600 bg-green-50 text-green-800'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += cn(LIGNE, 'opacity-50')
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-mono font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className={cn('text-xs text-white rounded-sm px-4 py-1.5 disabled:opacity-40 transition-colors font-mono', VERT_BG)}>Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-sm p-3 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700')}>
          <div className="flex items-center gap-1 font-semibold mb-1">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct' : 'Incorrect'}<span className="ml-auto font-mono opacity-60">{q.articleRef}</span></div>
          <p>{q.explication}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

function CasPratiqueBlock({ cp, index }: { cp: CasPratique; index: number }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number>>(new Set())
  return (
    <div className={cn('rounded-sm border overflow-hidden', LIGNE_FORTE, PAPIER_CARD)}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-black/[.02] transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className={cn('font-serif font-bold text-lg shrink-0', VERT)}>{String(index + 1).padStart(2, '0')}</span>
          <p className={cn('text-sm font-semibold', ENCRE)}>{cp.titre}</p>
        </div>
        <ChevronRight className={cn('h-4 w-4 shrink-0 transition-transform', VERT, open && 'rotate-90')} />
      </button>
      {open && (
        <div className={cn('px-4 pb-4 space-y-4 border-t pt-4', LIGNE)}>
          <div className={cn('rounded-sm p-3 border', LIGNE_FORTE, PAPIER)}>
            <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', AMBRE)}>Contexte</p>
            <p className={cn('text-xs leading-relaxed', ENCRE_DOUX)}>{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className={cn('text-xs font-semibold', ENCRE)}>Question {q.num} : {q.enonce}</p>
                {corrVisible.has(q.num) ? (
                  <div className="rounded-sm bg-green-50 border border-green-200 p-3">
                    <p className="text-xs font-semibold text-green-800 mb-1">Correction</p>
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

type Vue = 'lecture' | 'qcm' | 'cas' | 'devoir'

export default function UE1Chapitre1Page() {
  const goBack = useGoBack('/ue1-droit-travail')
  const currentUser = useUser()
  const isStudent = isStudentRole(currentUser)
  const [vue, setVue] = useState<Vue>('lecture')

  const casPratiquesExistants: CasPratiqueExistant[] = CAS_PRATIQUES.map(cp => ({
    id: cp.id,
    titre: cp.titre,
    enonce: cp.contexte + '\n' + cp.questions.map(q => `Question ${q.num} : ${q.enonce}`).join('\n'),
    corrigeType: cp.questions.map(q => `Question ${q.num} : ${q.correction}`).join('\n'),
  }))

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

      {vue === 'lecture' && (
        <div className={cn('rounded-sm border p-4 space-y-1', PAPIER_CARD, LIGNE)}>
          {[
            'Situer le droit du travail congolais dans sa hiérarchie des normes et connaître ses sources',
            "Délimiter le champ d'application du Code du travail et ses catégories exclues",
            "Maîtriser les définitions légales de l'article 7, en particulier travailleur, employeur, contrat de travail et rémunération",
            'Distinguer le contrat de travail des conventions voisines par le critère du lien de subordination',
            'Connaître les règles de capacité de contracter et la protection des mineurs',
          ].map((o, i) => (
            <p key={i} className={cn('flex items-start gap-2 text-xs', ENCRE_DOUX)}>
              <span className={cn('font-mono shrink-0', VERT)}>{i + 1}.</span>
              <span>{o}</span>
            </p>
          ))}
        </div>
      )}

      {vue === 'lecture' && (
        <div className="grid gap-0 lg:grid-cols-[180px_1fr] lg:gap-10">
          <nav className="hidden lg:block">
            <div className="sticky top-4 space-y-1 pt-2">
              <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-3', ENCRE_FAIBLE)}>Dans ce chapitre</p>
              {[
                ['s1', '1.1 Objet et finalité'],
                ['s2', '1.2 Sources et hiérarchie'],
                ['s3', "1.3 Champ d'application"],
                ['s4', '1.4 Définitions fondamentales'],
                ['s5', '1.5 Lien de subordination'],
                ['s6', '1.6 Capacité de contracter'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className={cn('block text-xs leading-snug py-1.5 pl-3 border-l-2', LIGNE, ENCRE_FAIBLE, 'hover:text-[#1E4A3D] hover:border-[#1E4A3D] transition-colors')}>{label}</a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-14">
            {/* 1.1 */}
            <section id="s1" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.1</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Objet et finalité du droit du travail</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>
                  Le droit du travail est la branche du droit qui régit les rapports individuels et collectifs nés à l'occasion du travail salarié. En République Démocratique du Congo, il repose sur la loi n°015/2002 du 16 octobre 2002 portant Code du travail, modifiée et complétée par la loi n°16/010 du 15 juillet 2016. Le Code compte seize titres et trois cent trente-quatre articles ; il constitue le socle de référence de l'ensemble de ce manuel.
                </p>
                <p>Cette branche du droit poursuit une finalité qui la distingue nettement du droit commun des contrats : elle organise une relation structurellement inégale, celle du travailleur, économiquement dépendant de son emploi pour assurer sa subsistance et celle de sa famille, face à l'employeur, qui détient le pouvoir de direction, d'organisation et, en dernier ressort, de rupture du lien contractuel. Le législateur ne s'est pas contenté d'encadrer un échange de prestations ; il a construit, article après article, un dispositif de protection minimale auquel le contrat individuel ne peut déroger que dans un sens plus favorable au travailleur.</p>
                <p>Cette prémisse permet de trancher un débat récurrent dans la doctrine congolaise : le contrat de travail est-il véritablement négocié entre les parties, ou n'est-il, dans la grande majorité des cas, qu'un contrat d'adhésion que le travailleur accepte en bloc, faute de pouvoir en discuter les termes ? Kapuku (2026) observe que l'égalité juridique proclamée par le droit commun des obligations masque, dans les faits, une inégalité économique structurelle entre l'employeur qui fixe les conditions d'engagement et le travailleur qui les accepte par nécessité. C'est précisément pour corriger ce déséquilibre que le Code du travail impose des règles impératives là où le droit civil se contenterait de règles supplétives.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Principe de faveur</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>La loi fixe un plancher de protection, jamais un plafond. Toute clause du contrat, du règlement intérieur ou d'une convention collective qui abaisserait ce plancher est réputée non écrite.</p>
                </div>
                <p>Cette logique protectrice explique pourquoi le droit du travail se lit rarement comme un texte supplétif : la plupart de ses dispositions sont d'ordre public social, c'est-à-dire qu'elles s'imposent indépendamment de la volonté des parties. Elle n'est du reste pas une invention récente du législateur de 2002. Luwenyema Lulue relevait déjà, dans son Précis de droit du travail zaïrois publié à Kinshasa en 1989, que le droit du travail zaïrois s'était construit sur cette même vocation protectrice, héritée pour partie de la législation coloniale du travail et prolongée par les réformes successives de l'État congolais. Le Code de 2002 poursuit ainsi une tradition doctrinale continue, plutôt qu'il ne rompt avec elle.</p>
                <p>Comprendre cette finalité en amont conditionne la lecture de tous les chapitres qui suivent, du contrat de travail à la rémunération, en passant par la rupture et le décompte final. Chaque règle technique étudiée dans ce manuel, aussi précise soit-elle, se justifie in fine par cette recherche d'équilibre entre la protection du travailleur et les nécessités de gestion de l'employeur.</p>
              </div>
            </section>

            {/* 1.2 */}
            <section id="s2" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.2</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Sources et hiérarchie des normes</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>Le droit du travail congolais se déploie à plusieurs niveaux hiérarchisés, chacun ne pouvant que préciser ou améliorer le niveau supérieur, jamais le contredire en défaveur du travailleur.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className={VERT_SOFT}>
                        <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Niveau</th>
                        <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Source</th>
                        <th className={cn('text-left p-2 border font-semibold', LIGNE)}>Exemple</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Constitutionnel', 'Constitution du 18 février 2006 (droit et devoir au travail)', 'Art. 36'],
                        ['Législatif', 'Loi n°015/2002, mod. loi n°16/010', 'Code du travail, art. 1–334'],
                        ['Réglementaire', "Décrets et arrêtés d'exécution", 'Décret n°25/22 du 30/05/2025 (SMIG)'],
                        ['Conventionnel', 'Conventions et accords collectifs', "Convention d'entreprise ou de branche"],
                        ['Contractuel', "Le contrat individuel et le règlement d'entreprise", 'CDD, CDI'],
                      ].map(([niveau, source, ex], i) => (
                        <tr key={i} className="even:bg-black/[.02]">
                          <td className={cn('p-2 border font-medium', LIGNE)}>{niveau}</td>
                          <td className={cn('p-2 border', LIGNE)}>{source}</td>
                          <td className={cn('p-2 border italic', LIGNE, ENCRE_FAIBLE)}>{ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>À ces sources internes s'ajoutent les conventions de l'Organisation internationale du travail ratifiées par la RDC, qui s'intègrent à l'ordre juridique interne dès leur ratification et priment sur toute loi nationale contraire. La RDC figure parmi la cinquantaine d'États membres de l'OIT ayant ratifié l'ensemble des huit conventions fondamentales de l'Organisation, dont la convention n°138 sur l'âge minimum d'admission à l'emploi et la convention n°182 sur les pires formes de travail des enfants, toutes deux ratifiées en 2001. Ces deux textes irriguent directement les articles 3 à 6 du Code, étudiés à la section 1.6 du présent chapitre.</p>
                <p>La hiérarchie ainsi construite reste vivante : elle continue d'évoluer au gré des ratifications et des réformes réglementaires. La convention n°190 de l'OIT, relative à la violence et au harcèlement dans le monde du travail, n'est à ce jour pas ratifiée par la RDC ; des organisations syndicales et de la société civile en plaident la ratification, ce qui illustre qu'une source de droit peut exister sur le plan international sans encore produire d'effet en droit interne tant que l'acte de ratification n'est pas intervenu.</p>
                <p>La doctrine, enfin, n'est pas une source de droit au sens strict : elle ne crée aucune règle contraignante. Elle joue néanmoins un rôle d'interprétation et de systématisation indispensable à la pratique du droit du travail, en particulier dans un contexte où la jurisprudence publiée reste peu accessible. L'ouvrage collectif de Loko Mantuono, Droit social, droit du travail et de la sécurité sociale en RDC, publié chez L'Harmattan en 2022, en offre une synthèse récente qui reprend et actualise cette architecture des sources.</p>
              </div>
            </section>

            {/* 1.3 */}
            <section id="s3" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.3</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Champ d'application du Code du travail</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>Le champ d'application du Code est défini par son article 1er. Il régit les relations individuelles et collectives de travail entre travailleurs et employeurs sur toute l'étendue du territoire, mais un nombre limité de catégories en est expressément exclu, parce qu'elles relèvent de statuts particuliers distincts du régime contractuel de droit privé.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Article 1er, Loi n°015/2002</p>
                  <p className={cn('italic text-sm leading-relaxed', ENCRE_DOUX)}>« La présente loi est applicable aux travailleurs et aux employeurs exerçant leur activité professionnelle sur toute l'étendue de la République Démocratique du Congo. Elle ne s'applique pas : aux magistrats ; aux juges consulaires et assesseurs des tribunaux du travail ; aux agents de carrière des services publics de l'État régis par le statut général et les statuts particuliers de la fonction publique ; aux membres des Forces armées et de la Police nationale. »</p>
                </div>
                <p>Ces exclusions ne signifient pas une absence de protection : les catégories concernées relèvent d'un statut légal ou réglementaire propre plutôt que du régime organisé par le Code. Un magistrat ou un fonctionnaire de carrière ne peut donc jamais se prévaloir des règles de préavis, de licenciement ou de décompte final étudiées dans ce manuel. Il relève d'un contentieux et d'une procédure disciplinaire distincts.</p>
                <p>Chacune de ces quatre exclusions répond à une même logique : celle de statuts déjà pourvus d'un régime disciplinaire et contentieux propre, dont la superposition avec le Code créerait un conflit de compétence. Le magistrat relève du statut de la magistrature et de l'autorité du Conseil supérieur de la magistrature ; l'agent de carrière de la fonction publique relève de la loi portant statut des agents de carrière des services publics de l'État ; le militaire ou le policier relève de la justice militaire. Le juge consulaire et l'assesseur des tribunaux du travail, quant à eux, ne sont pas des salariés du tribunal auprès duquel ils siègent : ils exercent une fonction juridictionnelle bénévole ou indemnisée, étrangère par nature au salariat.</p>
                <p>Le champ d'application ainsi délimité n'est pas figé. Il fait aujourd'hui l'objet d'un débat qui dépasse le strict commentaire de l'article 1er : celui de la place des travailleurs domestiques, chauffeurs et femmes de ménage employés par des particuliers. Ces travailleurs ne figurent pas parmi les catégories exclues et relèvent donc, en droit positif, du Code du travail commun. La pratique révèle cependant une protection largement théorique, faute de contrat écrit, d'affiliation à la CNSS ou de contrôle de l'inspection du travail dans la sphère domestique. Une proposition de loi déposée le 15 mai 2026 par le député Prince Kangila Kawele entend précisément instituer un régime légal spécifique pour cette catégorie de travailleurs. Il s'agit à ce stade d'une initiative législative, non d'un texte en vigueur : elle doit être présentée comme telle, sans être confondue avec le droit positif applicable aujourd'hui.</p>
              </div>
            </section>

            {/* 1.4 */}
            <section id="s4" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.4</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Définitions fondamentales</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>L'article 7 fixe onze définitions qui conditionnent l'interprétation de l'ensemble du Code. Les plus structurantes pour la suite du manuel sont le travailleur, l'employeur, le contrat de travail et la rémunération, notion reprise telle quelle au chapitre 5 et mobilisée dans le calcul du décompte final au chapitre 10. Les définitions suivantes, moins fréquemment commentées, n'en conditionnent pas moins la lecture de plusieurs chapitres ultérieurs.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Notion</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Définition (art. 7)</th></tr></thead>
                    <tbody>
                      {[
                        ['Travailleur', "Personne physique engagée à mettre son activité professionnelle, moyennant rémunération, sous la direction et l'autorité d'autrui."],
                        ['Employeur', "Personne physique ou morale, publique ou privée, qui utilise les services d'un ou plusieurs travailleurs en vertu d'un contrat de travail."],
                        ['Contrat de travail', "Convention par laquelle le travailleur s'engage à fournir une prestation, sous la subordination de l'employeur, moyennant rémunération."],
                        ['Entreprise', "Organisation économique de production ou de distribution de biens ou de services, exploitée par une ou plusieurs personnes."],
                        ['Établissement', "Unité technique de production, distincte de l'entreprise qui peut en compter plusieurs, où s'exécute la relation de travail."],
                        ['Recrutement', "Toute activité visant à rassembler des candidats en vue de leur offrir un emploi salarié."],
                        ['Jour ouvrable', "Tout jour où il est possible de travailler, à l'exclusion du repos hebdomadaire et des jours fériés légaux."],
                        ['Temps de services', "Durée pendant laquelle le travailleur a été occupé de manière effective ou assimilée au service d'un même employeur."],
                        ['Famille du travailleur', "Conjoint et enfants à charge, ces derniers ouvrant droit jusqu'à vingt-cinq ans s'ils poursuivent des études."],
                      ].map(([n, d], i) => (
                        <tr key={i} className="even:bg-black/[.02]">
                          <td className={cn('p-2 border font-medium', LIGNE, VERT)}>{n}</td>
                          <td className={cn('p-2 border', LIGNE, ENCRE_DOUX)}>{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>La définition de la rémunération distingue explicitement ce qui entre dans son assiette de ce qui en est exclu :</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className={cn('rounded-sm border p-3', LIGNE_FORTE, PAPIER_CARD)}>
                    <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1.5', VERT)}>Compris</p>
                    <p className={cn('text-xs leading-relaxed', ENCRE_DOUX)}>Salaire, commissions, indemnité de vie chère, primes, gratifications, avantages en nature.</p>
                  </div>
                  <div className={cn('rounded-sm border p-3', LIGNE_FORTE, PAPIER_CARD)}>
                    <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1.5', AMBRE)}>Exclu</p>
                    <p className={cn('text-xs leading-relaxed', ENCRE_DOUX)}>Soins de santé, indemnité de logement, allocations familiales légales, indemnité de transport, frais de voyage.</p>
                  </div>
                </div>
                <p>Cette distinction, en apparence purement définitionnelle, alimente une part importante des litiges pratiques en matière de paie. Une gratification annuelle qualifiée de libérale par l'employeur, mais versée avec une régularité telle qu'elle en devient prévisible, tend en pratique à être requalifiée en élément de rémunération soumis aux cotisations sociales. Kiyana relève, à propos du contrat de travail en RDC, que la rédaction du contrat et des bulletins de paie gagne à anticiper cette distinction plutôt qu'à la découvrir lors d'un contentieux.</p>
              </div>
            </section>

            {/* 1.5 */}
            <section id="s5" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.5</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Le lien de subordination</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>La définition légale du contrat de travail met en avant un critère central : la subordination. C'est lui, et non la seule existence d'une rémunération, qui distingue le contrat de travail d'un contrat d'entreprise ou d'un mandat, distinction dont dépend l'accès au régime protecteur du Code. Un prestataire indépendant, aussi régulièrement rémunéré soit-il, n'est pas un travailleur au sens de l'article 7 s'il n'est pas placé sous l'autorité d'un employeur.</p>
                <p>La subordination se caractérise par l'exécution d'un travail sous l'autorité d'un employeur qui dispose du pouvoir de donner des ordres et des directives, d'en contrôler l'exécution et de sanctionner les manquements de son subordonné. La jurisprudence congolaise, comme l'observe la doctrine, ne s'arrête pas à une définition abstraite : elle apprécie un faisceau d'indices concrets, dont aucun n'est à lui seul décisif.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Indice</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Manifestation concrète</th></tr></thead>
                    <tbody>
                      {[
                        ['Pouvoir de direction', "L'employeur fixe les tâches, les méthodes et les objectifs du travailleur."],
                        ['Pouvoir de surveillance', "L'employeur vérifie l'exécution du travail, par une hiérarchie ou un contrôle direct."],
                        ['Organisation du travail', "Le lieu et l'horaire de travail sont imposés par l'employeur, non choisis librement."],
                        ['Exclusivité', "Le travailleur consacre son activité à un employeur unique, à l'exclusion d'une clientèle propre."],
                        ['Pouvoir de sanction', "L'employeur peut sanctionner disciplinairement les manquements constatés."],
                      ].map(([n, d], i) => (
                        <tr key={i} className="even:bg-black/[.02]">
                          <td className={cn('p-2 border font-medium', LIGNE)}>{n}</td>
                          <td className={cn('p-2 border', LIGNE, ENCRE_DOUX)}>{d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>Ce raisonnement par faisceau d'indices explique pourquoi la qualification donnée par les parties elles-mêmes au contrat, qu'elles l'aient appelé prestation de service ou convention de sous-traitance, ne lie pas le juge. Si les faits révèlent une subordination réelle, la relation sera requalifiée en contrat de travail, avec toutes les conséquences que cela emporte : affiliation à la CNSS, application du régime de préavis et de licenciement, droit aux congés payés.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Distinction pratique</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>Contrat de travail : l'employeur fixe les moyens et les méthodes, le travailleur exécute sous contrôle. Contrat d'entreprise : le prestataire s'engage sur un résultat, en choisissant librement ses moyens. Mandat : le mandataire représente le mandant dans un acte juridique déterminé, sans lien de subordination.</p>
                </div>
              </div>
            </section>

            {/* 1.6 */}
            <section id="s6" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>1.6</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Capacité de contracter et travail des enfants</h2>
              </div>
              <div className={cn("space-y-4 text-[15px] leading-[1.75]", ENCRE)}>
                <p className={LETTRINE}>L'article 6 fixe l'âge minimum de capacité à contracter un contrat de travail à dix-huit ans révolus. Ce principe connaît une dérogation strictement encadrée, et non un simple assouplissement laissé à l'appréciation des parties.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Article 6, Loi n°015/2002, synthèse des conditions</p>
                  <p className={cn('text-sm leading-relaxed', ENCRE_DOUX)}>Le mineur doit avoir au moins quinze ans. L'engagement requiert une autorisation du Président du Tribunal de paix du ressort, délivrée sur avis conforme d'un examen psycho-médical et après avis de l'inspecteur du travail du ressort. Entre seize et dix-huit ans, seuls des travaux légers déterminés par arrêté du ministre ayant le Travail dans ses attributions peuvent être autorisés, à l'exclusion de tout travail dangereux ou de nuit.</p>
                </div>
                <p>Cette architecture doit être lue en cohérence avec les articles 3 à 5 du même titre, consacrés aux pires formes de travail des enfants et à la mise en place d'un Comité national de lutte contre ce phénomène. Elle prolonge en droit interne deux engagements internationaux ratifiés par la RDC en 2001 : la convention n°138 de l'OIT sur l'âge minimum d'admission à l'emploi, et la convention n°182 sur l'interdiction des pires formes de travail des enfants, qui inclut notamment les travaux susceptibles de nuire à la santé, à la sécurité ou à la moralité de l'enfant.</p>
                <p>La difficulté, largement documentée par la doctrine et les organisations internationales, tient moins à l'existence de la règle qu'à son application effective dans le secteur informel, où l'essentiel du travail des enfants échappe structurellement au contrôle de l'inspection du travail. Ce constat ne retire rien à la valeur normative de l'article 6 : il invite à distinguer, dans l'analyse d'un cas, la règle de droit applicable de son effectivité pratique, deux questions qu'un juriste doit savoir traiter séparément.</p>
              </div>
            </section>

            {/* à retenir */}
            <div className={cn('pt-8 border-t-2', 'border-[#262019]')}>
              <p className={cn('font-serif font-bold text-base mb-4', ENCRE)}>À retenir</p>
              <ul className="space-y-0">
                {[
                  'Le Code du travail organise un socle impératif de protection ; le contrat ne peut y déroger que favorablement au travailleur.',
                  "Son champ d'application exclut magistrats, juges consulaires, agents de carrière et membres des FARDC/PNC ; les travailleurs domestiques n'en sont, à ce jour, pas exclus.",
                  "Le contrat de travail se distingue par le lien de subordination, apprécié à travers un faisceau d'indices, non par la seule rémunération.",
                  'La rémunération inclut salaire et primes, mais exclut soins de santé, logement, transport et allocations familiales légales.',
                  'La capacité de contracter est fixée à dix-huit ans, avec une dérogation encadrée dès quinze ans et des travaux légers seuls admis entre seize et dix-huit ans.',
                ].map((l, i) => (
                  <li key={i} className={cn('flex items-start gap-3 text-sm py-2.5 border-b', LIGNE, ENCRE_DOUX)}>
                    <span className={VERT}>▪</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* bibliographie */}
            <div className="pt-6 border-t border-[#D9CFA9]">
              <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-3', ENCRE_FAIBLE)}>Références citées</p>
              <ul className="space-y-0">
                {[
                  <>Luwenyema Lulue, <i>Précis de droit du travail zaïrois</i>, éditions Lule, Kinshasa, 1989.</>,
                  <>Loko Mantuono G., <i>Droit social, droit du travail et de la sécurité sociale en RDC</i>, L'Harmattan, Paris, 2022.</>,
                  <>Kapuku H., « Le contrat de travail dans le contexte congolais : un contrat négocié ou un contrat d'adhésion ? », <i>Village Justice</i>, janvier 2026.</>,
                  <>Kiyana M., « Le contrat de travail en République Démocratique du Congo », note professionnelle en ligne.</>,
                  <>Organisation internationale du Travail, conventions n°138 (1973) et n°182 (1999), ratifiées par la RDC en 2001.</>,
                ].map((ref, i) => (
                  <li key={i} className={cn('text-xs py-2 border-b', LIGNE, ENCRE_FAIBLE)}>{ref}</li>
                ))}
              </ul>
            </div>

            {/* s'exercer */}
            <div className={cn('pt-10 border-t-2', 'border-[#262019]')}>
              <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', AMBRE)}>Le chapitre est terminé : passez à l'épreuve</p>
              <h2 className={cn('font-serif font-bold text-2xl mb-3', ENCRE)}>S'exercer</h2>
              <p className={cn('text-sm leading-relaxed mb-6 max-w-xl', ENCRE_DOUX)}>La lecture seule ne suffit pas à maîtriser une notion de droit. Les deux parcours ci-dessous couvrent l'ensemble du chapitre, pas seulement les points soulevés en cours de lecture.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <button onClick={() => setVue('qcm')} className={cn('text-left rounded-sm border p-5 hover:border-[#1E4A3D] transition-colors', LIGNE_FORTE, PAPIER_CARD)}>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={cn('font-serif font-bold text-2xl', VERT)}>20</span>
                    <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>Questionnaire</span>
                  </div>
                  <p className={cn('font-serif font-bold text-base mb-2', ENCRE)}>QCM du chapitre</p>
                  <p className={cn('text-xs leading-relaxed mb-4', ENCRE_DOUX)}>Vingt questions couvrant les six sections, du rappel de cours à l'articulation de plusieurs notions.</p>
                  <span className={cn('text-xs font-mono font-semibold', VERT)}>Commencer le questionnaire →</span>
                </button>
                <button onClick={() => setVue('cas')} className={cn('text-left rounded-sm border p-5 hover:border-[#1E4A3D] transition-colors', LIGNE_FORTE, PAPIER_CARD)}>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={cn('font-serif font-bold text-2xl', VERT)}>05</span>
                    <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>Mise en situation</span>
                  </div>
                  <p className={cn('font-serif font-bold text-base mb-2', ENCRE)}>Cas pratiques</p>
                  <p className={cn('text-xs leading-relaxed mb-4', ENCRE_DOUX)}>Cinq situations à plusieurs strates, exigeant de croiser plusieurs notions du chapitre.</p>
                  <span className={cn('text-xs font-mono font-semibold', VERT)}>Ouvrir les cas pratiques →</span>
                </button>
              </div>
            </div>

            {!isStudent && (
              <div className={cn('rounded-sm border border-dashed p-5 flex items-center justify-between gap-4 flex-wrap', LIGNE_FORTE, PAPIER_CARD)}>
                <div>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', ENCRE_FAIBLE)}>Espace professeur</p>
                  <p className={cn('text-xs', ENCRE_DOUX)}>20 questions QCM et 5 cas pratiques disponibles pour ce chapitre.</p>
                </div>
                <button onClick={() => setVue('devoir')} className={cn('text-xs font-mono px-4 py-2.5 rounded-sm text-white', VERT_BG)}>Créer un devoir à partir de ce chapitre →</button>
              </div>
            )}

            <button onClick={goBack} className={cn('w-full flex items-center justify-center gap-2 py-3 rounded-sm text-white text-sm font-semibold transition-colors', VERT_BG)}>
              <GraduationCap className="h-4 w-4" /> Terminer le chapitre 1
            </button>

            <p className="text-xs text-center text-muted-foreground/60 pb-2">
              Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 1 à 7 · Loi n°16/010 du 15 juillet 2016
            </p>
          </div>
        </div>
      )}

      {vue === 'qcm' && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>QCM du chapitre — 20 questions</h2>
          <div className="grid gap-3">
            {QCM_CHAPITRE.map(q => <QCMBankItem key={q.id} q={q} />)}
          </div>
        </div>
      )}

      {vue === 'cas' && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Cas pratiques — 5 mises en situation</h2>
          <div className="space-y-3">
            {CAS_PRATIQUES.map((cp, i) => <CasPratiqueBlock key={cp.id} cp={cp} index={i} />)}
          </div>
        </div>
      )}

      {vue === 'devoir' && !isStudent && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <DevoirChapitreCreateur
            chapitreId="ue1-chapitre-1"
            chapitreNom="Chapitre 1 : Notions fondamentales et sources du droit du travail"
            questions={QCM_CHAPITRE}
            coursId="ue1-droit-travail"
            casPratiquesExistants={casPratiquesExistants}
          />
        </div>
      )}
    </div>
  )
}
