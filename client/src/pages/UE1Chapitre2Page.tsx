import React, { useState, useEffect, useRef } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CheckCircle2, XCircle, ChevronRight, ArrowLeft, ArrowUp, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE — reprise à l'identique du chapitre 1 : encre, papier,
// filet, vert faculté, ambre pour la marginalia. Aucune classe dynamique.
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
// BANQUE DE QUESTIONS — 20 questions, difficulté progressive, 5 propositions
// avec distracteurs pièges.
// ─────────────────────────────────────────────────────────────────────────────
const QCM_CHAPITRE: QCMChapitre[] = [
  {
    id: 'q1', question: "Quelle est la nature de l'obligation de formation, de perfectionnement ou d'adaptation professionnelle pesant sur l'employeur au titre de l'article 8 ?",
    options: [
      { id: 'a', texte: "Une faculté que l'employeur exerce s'il le souhaite" },
      { id: 'b', texte: "Une obligation, pesant sur tout employeur public ou privé" },
      { id: 'c', texte: "Une obligation limitée aux seules entreprises publiques" },
      { id: 'd', texte: "Une obligation soumise à l'accord préalable du travailleur concerné" },
      { id: 'e', texte: "Une recommandation sans portée contraignante formulée par l'INPP" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 8',
    explication: "L'article 8 impose cette obligation à tout employeur public ou privé, sans distinction de secteur, sans condition d'accord du travailleur et sans la réduire à une simple recommandation.",
  },
  {
    id: 'q2', question: "Qui détermine la politique de la formation et du perfectionnement professionnels pour l'emploi ?",
    options: [
      { id: 'a', texte: "L'INPP seul, par décision de son Conseil d'administration" },
      { id: 'b', texte: "Un décret du Président de la République, pris sur proposition du Ministre du Travail après avis du Conseil National du Travail" },
      { id: 'c', texte: "Chaque employeur, dans son règlement intérieur" },
      { id: 'd', texte: "Un arrêté du seul Ministre du Travail, sans avis préalable" },
      { id: 'e', texte: "Le Conseil National du Travail, statuant seul et de manière définitive" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 9',
    explication: "L'article 9 confie cette détermination à un décret présidentiel, pris sur proposition ministérielle et après avis du Conseil National du Travail : un acte réglementaire de rang élevé, non une simple décision d'un organisme ou un arrêté isolé.",
  },
  {
    id: 'q3', question: "L'Institut National de Préparation Professionnelle a-t-il la personnalité juridique ?",
    options: [
      { id: 'a', texte: "Non, il est un simple service du Ministère du Travail" },
      { id: 'b', texte: "Oui, doté de la personnalité juridique, avec siège à Kinshasa" },
      { id: 'c', texte: "Oui, mais uniquement pour les actes de formation, non pour les actes patrimoniaux" },
      { id: 'd', texte: "Non, sa personnalité juridique dépend d'un agrément annuel du Conseil National du Travail" },
      { id: 'e', texte: "Oui, mais son siège n'est pas fixé par le Code et varie selon les besoins" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 11',
    explication: "L'article 11 institue l'INPP avec la personnalité juridique pleine et entière, siège à Kinshasa, capacité d'acquérir et de disposer de biens meubles et immeubles, et engagements garantis par l'État.",
  },
  {
    id: 'q4', question: "Comment est organisée la tutelle et la gouvernance de l'INPP ?",
    options: [
      { id: 'a', texte: "Tutelle exercée par le Ministère du Travail, gouvernance par un Conseil d'administration tripartite (État, employeurs, travailleurs)" },
      { id: 'b', texte: "Tutelle exercée par le Ministère des Finances, gouvernance par un directeur général nommé par décret" },
      { id: 'c', texte: "Aucune tutelle : l'INPP est un établissement totalement autonome depuis 2016" },
      { id: 'd', texte: "Tutelle exercée conjointement par les employeurs et les travailleurs, sans représentation de l'État" },
      { id: 'e', texte: "Tutelle exercée par le Conseil National du Travail lui-même" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 14',
    explication: "L'article 14 confie la tutelle technique au Ministère du Travail, et l'organisation générale, l'administration et la gestion à un Conseil d'administration de forme tripartite associant État, employeurs et travailleurs.",
  },
  {
    id: 'q5', question: "Parmi les ressources de l'INPP énumérées à l'article 15, laquelle est erronée ?",
    options: [
      { id: 'a', texte: "La subvention annuelle de l'État" },
      { id: 'b', texte: "La cotisation mensuelle des employeurs, proportionnelle aux rémunérations versées" },
      { id: 'c', texte: "Les apports, dons et legs consentis à l'Institut" },
      { id: 'd', texte: "Une taxe prélevée directement sur le salaire net de chaque travailleur" },
      { id: 'e', texte: "Les rétributions exceptionnelles pour services spéciaux, notamment le matériel didactique" },
    ],
    reponseCorrecte: 'd', articleRef: 'Art. 15',
    explication: "L'article 15 ne mentionne aucune taxe prélevée sur le salaire du travailleur : la cotisation est une charge patronale, assise sur les rémunérations versées par l'employeur, non une retenue opérée sur le salaire du travailleur.",
  },
  {
    id: 'q6', question: "Quel est le taux de la cotisation INPP applicable, depuis le 24 septembre 2025, à une entreprise privée occupant 120 travailleurs ?",
    options: [
      { id: 'a', texte: '2 %' },
      { id: 'b', texte: '3 %' },
      { id: 'c', texte: '3,5 %' },
      { id: 'd', texte: '4 %' },
      { id: 'e', texte: '2,5 %, taux moyen entre les deux tranches encadrantes' },
    ],
    reponseCorrecte: 'b', articleRef: '2.3',
    explication: "Depuis l'arrêté interministériel du 24 septembre 2025, la tranche 51 à 300 travailleurs est fixée à 3 %. Une entreprise de 120 travailleurs relève de cette tranche. Il n'existe pas de taux moyen interpolé (option e) : chaque tranche a un taux fixe et propre.",
  },
  {
    id: 'q7', question: "Quel taux s'appliquait à une entreprise privée occupant 30 travailleurs sous le régime antérieur, en vigueur du 14 février 2006 au 23 septembre 2025 ?",
    options: [
      { id: 'a', texte: '3,5 %' },
      { id: 'b', texte: '3 %' },
      { id: 'c', texte: '2 %' },
      { id: 'd', texte: '4 %' },
      { id: 'e', texte: '1 %' },
    ],
    reponseCorrecte: 'b', articleRef: '2.3',
    explication: "Sous l'arrêté du 14 février 2006, la tranche 1 à 50 travailleurs du secteur privé était fixée à 3 %, taux identique à celui des entreprises publiques de l'époque. Le taux de 3,5 % (option a) est celui de la même tranche sous le régime entré en vigueur en 2025, non celui de 2006.",
  },
  {
    id: 'q8', question: "Quel âge minimum le Code fixe-t-il pour recevoir des apprentis mineurs en qualité de maître d'apprentissage ?",
    options: [
      { id: 'a', texte: '18 ans au moins' },
      { id: 'b', texte: '21 ans au moins' },
      { id: 'c', texte: '25 ans au moins' },
      { id: 'd', texte: "Aucun âge minimum n'est fixé, seule la qualification professionnelle compte" },
      { id: 'e', texte: "18 ans, mais seulement si le maître est marié" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 18',
    explication: "L'article 18 fixe trois conditions cumulatives pour recevoir des apprentis mineurs : être âgé de 18 ans au moins, être reconnu de bonne vie et mœurs, et être suffisamment qualifié. L'âge n'est pas la seule condition (option d), et le mariage n'entre pas en ligne de compte (option e).",
  },
  {
    id: 'q9', question: "Un maître vivant seul, sans famille ni communauté, peut-il loger chez lui une apprentie mineure ?",
    options: [
      { id: 'a', texte: "Oui, dès lors que les parents y consentent par écrit" },
      { id: 'b', texte: "Non, l'article 18 le lui interdit expressément" },
      { id: 'c', texte: "Oui, à condition que l'apprentie ait plus de seize ans" },
      { id: 'd', texte: "Non, sauf autorisation de l'inspecteur du travail" },
      { id: 'e', texte: "Oui, si le contrat d'apprentissage le prévoit expressément" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 18, al. 2',
    explication: "L'article 18, second alinéa, pose une interdiction absolue, sans dérogation possible par le consentement parental, l'âge de l'apprentie, une autorisation administrative ou une clause contractuelle : un maître qui ne vit ni en famille ni en communauté ne peut loger comme apprenties des jeunes filles mineures.",
  },
  {
    id: 'q10', question: "Le contrat d'apprentissage doit-il obligatoirement être constaté par écrit ?",
    options: [
      { id: 'a', texte: "Non, un accord verbal suffit s'il est confirmé par les parents" },
      { id: 'b', texte: "Oui, et il doit contenir les mentions énumérées à l'article 20" },
      { id: 'c', texte: "Non, l'écrit n'est requis que pour les apprentis mineurs" },
      { id: 'd', texte: "Oui, mais seulement si la durée dépasse un an" },
      { id: 'e', texte: "Non, l'écrit n'est qu'une simple recommandation de bonne pratique" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 19',
    explication: "L'article 19 impose l'écrit sans distinction selon la minorité de l'apprenti, la durée du contrat ou l'accord des parents : c'est une exigence de forme générale, non une simple recommandation.",
  },
  {
    id: 'q11', question: "Quelle est la durée maximale d'un contrat d'apprentissage fixée par l'article 20 ?",
    options: [
      { id: 'a', texte: 'Deux ans' },
      { id: 'b', texte: 'Trois ans' },
      { id: 'c', texte: 'Quatre ans' },
      { id: 'd', texte: "Aucune durée maximale n'est fixée, elle dépend uniquement des usages de la profession" },
      { id: 'e', texte: 'Cinq ans, renouvelable une fois' },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 20, 4°',
    explication: "L'article 20 fixe la durée conformément aux usages de la profession, mais borne ce renvoi aux usages par un plafond impératif de quatre ans, qu'aucun usage professionnel ne peut dépasser.",
  },
  {
    id: 'q12', question: "Quelle autorité doit viser le contrat d'apprentissage pour qu'il produise ses effets propres ?",
    options: [
      { id: 'a', texte: "Le tribunal de paix du ressort" },
      { id: 'b', texte: "L'Office National de l'Emploi" },
      { id: 'c', texte: "L'INPP directement" },
      { id: 'd', texte: "Le Ministre du Travail en personne" },
      { id: 'e', texte: "Aucun visa n'est requis depuis la réforme de 2016" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 21',
    explication: "L'article 21 soumet le contrat d'apprentissage au visa de l'Office National de l'Emploi, institué au Titre IX du Code. La demande de visa incombe au maître.",
  },
  {
    id: 'q13', question: "Que présume le Code lorsque le contrat d'apprentissage n'a pas encore été visé, ou lorsque le visa a été retiré ?",
    options: [
      { id: 'a', texte: "Que l'apprenti n'a aucun droit tant que le visa n'est pas obtenu" },
      { id: 'b', texte: "Que les services de l'apprenti sont présumés être prestés en exécution d'un contrat de travail" },
      { id: 'c', texte: "Que le contrat est nul et de nul effet dans tous les cas" },
      { id: 'd', texte: "Que le maître doit rembourser les indemnités déjà versées" },
      { id: 'e', texte: "Que la relation devient un simple engagement bénévole" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 21, al. 3',
    explication: "L'article 21 protège l'apprenti par une présomption favorable : à défaut de visa ou en cas de retrait, ses services sont présumés prestés en exécution d'un contrat de travail, régime plus protecteur que celui de l'apprentissage sur certains points, plutôt que le priver de tout droit.",
  },
  {
    id: 'q14', question: "Combien d'exemplaires au moins le contrat d'apprentissage doit-il comporter, et à qui sont-ils destinés ?",
    options: [
      { id: 'a', texte: "Deux exemplaires : un pour le maître, un pour l'apprenti" },
      { id: 'b', texte: "Trois exemplaires : maître, apprenti, Office National de l'Emploi" },
      { id: 'c', texte: "Quatre exemplaires au moins : maître, apprenti (ou son représentant), Office National de l'Emploi, Inspecteur du Travail" },
      { id: 'd', texte: "Un seul exemplaire original, conservé par l'Office National de l'Emploi" },
      { id: 'e', texte: "Cinq exemplaires, le cinquième étant destiné à l'INPP" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 21-22',
    explication: "L'article 21 impose au moins quatre exemplaires. L'article 22 précise leur destination : un pour chaque partie, ou pour le représentant de l'apprenti mineur, un conservé par l'autorité qui vise le contrat, et un adressé à l'Inspecteur du Travail du ressort.",
  },
  {
    id: 'q15', question: "Quelle est la forme de la rémunération due à l'apprenti par le maître d'apprentissage ?",
    options: [
      { id: 'a', texte: "Un salaire identique à celui d'un travailleur de même qualification" },
      { id: 'b', texte: "Une indemnité, majorée au fur et à mesure des années d'apprentissage" },
      { id: 'c', texte: "Aucune rémunération n'est due pendant la durée de l'apprentissage" },
      { id: 'd', texte: "Une indemnité fixe, identique pendant toute la durée du contrat" },
      { id: 'e', texte: "Une rémunération librement fixée par le maître, sans encadrement réglementaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 25',
    explication: "L'article 25 prévoit une indemnité, dont le régime est fixé par arrêté ministériel après avis du Conseil National du Travail, et qui doit être majorée au fur et à mesure des années d'apprentissage, non rester fixe ni être laissée à la libre appréciation du maître.",
  },
  {
    id: 'q16', question: "Les garanties légales relatives au salaire, prévues ailleurs dans le Code, s'appliquent-elles à l'indemnité d'apprentissage ?",
    options: [
      { id: 'a', texte: "Non, l'indemnité d'apprentissage échappe à tout le régime protecteur du salaire" },
      { id: 'b', texte: "Oui, l'article 25 y attache toutes les obligations et garanties prévues en matière de salaire" },
      { id: 'c', texte: "Seulement pour les apprentis majeurs" },
      { id: 'd', texte: "Seulement si le contrat le prévoit expressément" },
      { id: 'e', texte: "Oui, mais uniquement les garanties relatives au paiement en espèces" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 25, al. 3',
    explication: "L'article 25 dernier alinéa étend expressément et sans condition à cette indemnité toutes les obligations et garanties du Code en matière de salaire, sans exception ni restriction au seul paiement en espèces.",
  },
  {
    id: 'q17', question: "Que peut prévoir le contrat d'apprentissage à propos de la période suivant la fin de l'apprentissage, selon l'article 27 ?",
    options: [
      { id: 'a', texte: "Une clause de non-concurrence perpétuelle interdisant à l'apprenti de travailler dans le même secteur" },
      { id: 'b', texte: "Un engagement de l'apprenti à travailler pour son ancien maître pendant une période ne pouvant excéder deux ans" },
      { id: 'c', texte: "L'obligation automatique pour le maître d'embaucher l'apprenti en contrat à durée indéterminée" },
      { id: 'd', texte: "Une interdiction pour l'apprenti de travailler dans un rayon géographique déterminé" },
      { id: 'e', texte: "Un engagement de l'apprenti pouvant excéder deux ans si le maître a financé une formation coûteuse" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 27',
    explication: "L'article 27 autorise une clause de fidélité limitée à deux ans au maximum, plafond impératif qu'aucune clause contractuelle, même justifiée par le coût de la formation (option e), ne peut dépasser. Il n'organise ni non-concurrence perpétuelle, ni embauche automatique, ni restriction géographique.",
  },
  {
    id: 'q18', question: "Le maître d'apprentissage peut-il résilier le contrat en raison d'une incapacité de travail de l'apprenti résultant d'une maladie ordinaire ?",
    options: [
      { id: 'a', texte: "Jamais, quelle que soit la durée de l'incapacité" },
      { id: 'b', texte: "Oui, dès le premier jour d'incapacité" },
      { id: 'c', texte: "Oui, mais seulement lorsque l'incapacité a duré six mois, ou fait présumer qu'elle durera six mois ininterrompus" },
      { id: 'd', texte: "Oui, après un mois d'incapacité, sans autre condition" },
      { id: 'e', texte: "Oui, dans les mêmes conditions qu'en cas d'accident du travail" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 28',
    explication: "L'article 28 suspend d'abord le contrat, puis n'ouvre la faculté de résiliation au maître qu'après six mois d'incapacité, ou lorsque la situation fait présumer une incapacité continue de six mois, à l'exclusion du cas particulier de l'accident du travail ou de la maladie professionnelle, expressément mis à part par le texte.",
  },
  {
    id: 'q19', question: "Lorsque l'apprenti est mineur, à quelle condition la résiliation du contrat à l'initiative du maître est-elle soumise ?",
    options: [
      { id: 'a', texte: "Aucune condition particulière, les règles de droit commun de la résiliation s'appliquent" },
      { id: 'b', texte: "L'accord préalable des parents ou du tuteur, à l'exclusion de toute autre formalité" },
      { id: 'c', texte: "L'approbation de l'Inspecteur du Travail du ressort, notifiée dans le mois, à défaut de quoi elle est réputée acquise" },
      { id: 'd', texte: "Une autorisation du Tribunal de paix, comme pour l'engagement initial d'un mineur de quinze ans" },
      { id: 'e', texte: "Un préavis de trois mois notifié directement à l'apprenti mineur" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 31',
    explication: "L'article 31 soumet toute résiliation à l'initiative du maître à une condition suspensive d'approbation par l'Inspecteur du Travail, qui doit statuer dans le mois, le silence valant approbation. Ni l'accord parental seul, ni une autorisation du Tribunal de paix, ni un simple préavis ne suffisent.",
  },
  {
    id: 'q20', question: "Les apprentis bénéficient-ils des autres dispositions du Code du travail applicables aux travailleurs ?",
    options: [
      { id: 'a', texte: "Non, ils relèvent d'un statut totalement autonome, étranger au reste du Code" },
      { id: 'b', texte: "Oui, ils sont assimilés aux travailleurs pour toutes les dispositions du Code non contraires au Titre III" },
      { id: 'c', texte: "Oui, mais uniquement pour les dispositions relatives à la durée du travail" },
      { id: 'd', texte: "Non, sauf disposition contraire expresse du contrat d'apprentissage" },
      { id: 'e', texte: "Oui, mais seulement à partir de leur dix-huitième anniversaire" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 34',
    explication: "L'article 34 pose un principe d'assimilation générale de l'apprenti au travailleur pour l'ensemble des dispositions du Code, sous la seule réserve de celles qui seraient contraires aux règles particulières du Titre III, sans limitation à une matière ni condition d'âge.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CAS PRATIQUES — 5 situations à plusieurs strates.
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
    titre: "L'apprenti-menuisier sans visa",
    contexte: "Un menuisier de Kananga engage Trésor, dix-sept ans, comme apprenti. Un contrat écrit est signé par le menuisier, Trésor et son père, mentionnant une durée de trois ans et une indemnité mensuelle croissante. Le menuisier, jugeant la démarche « trop administrative », ne soumet jamais le contrat au visa de l'Office National de l'Emploi. Après quatorze mois, un différend éclate : le menuisier veut mettre fin à la relation sans préavis ni indemnité, estimant qu'un simple apprenti n'a droit à rien de particulier. Trésor, de son côté, réclame le régime applicable à un travailleur licencié, y compris un préavis.",
    questions: [
      { num: 1, enonce: "Le contrat conclu entre le menuisier et Trésor est-il un contrat d'apprentissage régulier au sens du Titre III ?", correction: "Formellement, l'écrit et les mentions semblent réunis, mais une condition essentielle manque : le visa de l'Office National de l'Emploi, exigé par l'article 21, dont la demande incombe au maître. Ce contrat, régulier dans sa forme initiale, n'a jamais produit tous ses effets propres d'apprentissage faute de ce visa." },
      { num: 2, enonce: "Quelle est la conséquence juridique de cette absence de visa sur la qualification de la relation entre le menuisier et Trésor ?", correction: "L'article 21, alinéa 3, est ici décisif : tant que le contrat n'a pas été soumis au visa, les services de l'apprenti sont présumés être prestés en exécution d'un contrat de travail, depuis la date de conclusion du contrat. Après quatorze mois d'exécution sans visa jamais demandé, c'est donc un contrat de travail, et non un contrat d'apprentissage, qui doit être retenu pour l'ensemble de la relation." },
      { num: 3, enonce: "Le menuisier a-t-il raison d'affirmer qu'un apprenti n'a droit à rien de particulier en cas de rupture ?", correction: "Non, et l'erreur est double. D'abord, même dans le cadre strict de l'apprentissage, le Titre III organise des règles de résiliation encadrées, non une rupture libre. Ensuite et surtout, la requalification opérée à la question précédente change entièrement le cadre applicable : c'est le régime du contrat de travail, étudié au chapitre 4 pour la rupture, qui s'applique désormais, avec les droits qui s'y attachent, notamment un préavis ou une indemnité compensatoire." },
      { num: 4, enonce: "La bonne foi du menuisier, qui pensait le visa facultatif, peut-elle le protéger contre les conséquences de cette requalification ?", correction: "Non. Comme relevé au chapitre 1 à propos de la finalité protectrice du droit du travail, une règle destinée à protéger le travailleur ou l'apprenti ne peut être neutralisée par l'ignorance ou la bonne foi de celui qui devait l'observer, ici le maître, à qui l'article 21 impose expressément la démarche de visa. La charge de la régularité pèse sur le maître, non sur l'apprenti." },
    ],
  },
  {
    id: 'cp2',
    titre: "La cotisation INPP d'une entreprise en croissance",
    contexte: "Une entreprise de transformation agroalimentaire de Kisangani comptait 45 salariés en janvier 2025 et versait sa cotisation INPP au taux applicable à cette tranche. En juin 2025, à la suite d'un contrat d'exportation important, elle recrute massivement et atteint 180 salariés. En octobre 2025, un contrôle de l'INPP porte sur les cotisations versées entre janvier et septembre 2025 et relève ce que l'inspecteur qualifie d'insuffisance de versement.",
    questions: [
      { num: 1, enonce: "Quel taux l'entreprise devait-elle appliquer pour la période de janvier à fin septembre 2025, sachant que l'entrée en vigueur du nouvel arrêté date du 24 septembre 2025 ?", correction: "Deux régimes se sont succédé au cours de cette période. Jusqu'au 23 septembre 2025 inclus, l'arrêté du 14 février 2006 restait en vigueur : l'entreprise, alors dans la tranche 1 à 50 travailleurs en janvier, devait 3 %. Après avoir dépassé 50 travailleurs en juin 2025, elle basculait, toujours sous le même arrêté de 2006, dans la tranche 51 à 300 travailleurs, taux de 2 %. À compter du 24 septembre 2025, c'est l'arrêté de 2025 qui s'applique, portant le taux de cette même tranche à 3 %." },
      { num: 2, enonce: "L'entreprise devait-elle continuer à appliquer le taux de la tranche 1 à 50, initialement applicable en janvier, pour l'ensemble de l'année 2025, par souci de simplicité ?", correction: "Non. Le taux applicable dépend de l'effectif réellement occupé à la période considérée, non d'un taux figé au premier jour de l'exercice. Le changement de tranche d'effectif en cours d'année, ici en juin 2025, entraîne un changement de taux applicable dès ce moment, indépendamment de toute simplicité de gestion invoquée par l'entreprise." },
      { num: 3, enonce: "Le fait que le second arrêté soit entré en vigueur en cours d'année, le 24 septembre 2025, change-t-il l'analyse pour les mois antérieurs à cette date ?", correction: "Non. Chaque arrêté ne s'applique que pour l'avenir, à compter de sa signature et de son entrée en vigueur, sans effet rétroactif sur les cotisations dues avant cette date. Les mois de janvier à septembre 2025 restent régis par les taux de l'arrêté de 2006, quand bien même ce dernier a été abrogé quelques jours avant la fin du mois de septembre." },
      { num: 4, enonce: "Sur quel compte, en pratique comptable, une telle cotisation est-elle usuellement enregistrée ?", correction: "La dette envers l'INPP est usuellement enregistrée au compte SYSCOHADA 4331, dans les comptes de tiers relatifs aux organismes sociaux, distinct des comptes de cotisations CNSS étudiées au chapitre 7. La correction du taux appliqué en cours d'exercice, comme dans ce cas, se traduit par un ajustement de cette dette, à charge pour l'entreprise de régulariser le différentiel constaté par l'INPP." },
    ],
  },
  {
    id: 'cp3',
    titre: "La maîtresse-couturière et l'apprentie mineure",
    contexte: "Mme Kalonda, couturière indépendante, tient un petit atelier à Mbuji-Mayi. Divorcée et vivant seule depuis deux ans, elle accepte de former Grâce, quinze ans, comme apprentie couturière, avec l'accord des parents de celle-ci. Grâce vient chaque jour à l'atelier, mais Mme Kalonda propose également de l'héberger chez elle en semaine, l'atelier étant loin du domicile familial de Grâce, ce que les parents acceptent avec soulagement compte tenu de la distance à parcourir.",
    questions: [
      { num: 1, enonce: "Mme Kalonda remplit-elle les conditions de l'article 18 pour recevoir Grâce comme apprentie ?", correction: "Sur l'âge, la qualification professionnelle et la moralité, rien dans les faits ne permet d'écarter Mme Kalonda : elle est manifestement majeure, exerce la profession qu'elle enseigne et rien n'indique qu'elle ne soit pas de bonne vie et mœurs. La difficulty se situe ailleurs, sur l'hébergement envisagé, non sur les conditions générales de l'article 18, alinéa 1er." },
      { num: 2, enonce: "L'accord des parents de Grâce, soulagés par la solution proposée, rend-il licite l'hébergement de Grâce chez Mme Kalonda ?", correction: "Non. L'article 18, second alinéa, pose une interdiction que le consentement parental ne peut lever : aucun maître ne vivant ni en famille ni en communauté ne peut loger comme apprenties des jeunes filles mineures. Mme Kalonda, divorcée et vivant seule, se trouve précisément dans la situation que cette disposition entend prévenir, quelle que soit la bonne volonté ou le soulagement des parents." },
      { num: 3, enonce: "Cette interdiction rend-elle également irrégulier le contrat d'apprentissage lui-même, portant sur la formation de couture dispensée chaque jour à l'atelier ?", correction: "Non, il convient de distinguer deux éléments de la situation. L'apprentissage proprement dit, la formation dispensée quotidiennement à l'atelier, peut demeurer parfaitement licite si les autres conditions du Titre III sont remplies, écrit, visa, mentions obligatoires. C'est seulement l'hébergement envisagé qui se heurte à l'interdiction de l'article 18 : Grâce peut continuer de se former chez Mme Kalonda sans y être logée." },
      { num: 4, enonce: "Que devrait concrètement conseiller un juriste consulté par les parents de Grâce, compte tenu de la distance réelle entre le domicile familial et l'atelier ?", correction: "Le problème pratique de distance, réel et légitime, doit trouver une solution qui ne heurte pas l'interdiction légale : hébergement de Grâce chez un tiers de la famille de Mme Kalonda si celle-ci en a un vivant avec elle, aménagement des horaires de formation, ou recherche d'un autre maître vivant en famille ou en communauté. La règle de l'article 18 est de protection : elle ne doit pas être contournée par un hébergement de fait présenté comme une simple facilité pratique." },
    ],
  },
  {
    id: 'cp4',
    titre: "L'apprenti qui part chez le concurrent",
    contexte: "Un garagiste de Goma forme Élie pendant deux ans dans le cadre d'un contrat d'apprentissage régulier, visé par l'Office National de l'Emploi, qui comporte une clause par laquelle Élie s'engage, une fois l'apprentissage achevé, à travailler pour le garagiste pendant dix-huit mois. Le contrat précise que cette clause se justifie par le coût important supporté par le garagiste pour former Élie sur des équipements spécialisés. Trois mois après la fin de l'apprentissage, Élie, sans préavis, part travailler pour un garage concurrent qui lui propose une rémunération plus élevée.",
    questions: [
      { num: 1, enonce: "La clause par laquelle Élie s'engage à travailler dix-huit mois pour le garagiste après son apprentissage est-elle valable ?", correction: "Oui, dans son principe : l'article 27 autorise expressément ce type de clause, dite de fidélité, dans la limite de deux ans. Dix-huit mois, inférieur à ce plafond, respecte la limite légale, et la justification invoquée par le coût de la formation, bien que non exigée par le texte, renforce la cohérence économique de la clause sans être nécessaire à sa validité." },
      { num: 2, enonce: "Le départ d'Élie sans préavis, avant l'échéance des dix-huit mois, engage-t-il sa responsabilité au regard de l'article 27 ?", correction: "Oui. L'article 27, second alinéa, prévoit que l'inobservation de cet engagement par l'une des parties entraîne, sous réserve de dommages-intérêts, la prestation d'un préavis ou, à défaut, le versement d'une indemnité compensatoire de préavis, calculée conformément aux dispositions relatives à la rupture du contrat de travail. Élie, en partant sans préavis, s'expose donc à devoir cette indemnité." },
      { num: 3, enonce: "Le garage concurrent qui a recruté Élie en connaissance de cause encourt-il également une responsabilité ?", correction: "Le texte de l'article 27 organise les conséquences de l'inobservation entre les parties au contrat d'apprentissage, le garagiste et Élie ; il ne vise pas directement le tiers recruteur. Une action contre le garage concurrent relèverait plutôt du droit commun de la responsabilité civile, pour complicité dans l'inexécution d'une obligation contractuelle dont il avait connaissance, question qui dépasse le seul Titre III mais que le garagiste pourrait légitimement soulever." },
      { num: 4, enonce: "Si la clause avait prévu un engagement de trente mois au lieu de dix-huit, quelle en aurait été la conséquence ?", correction: "Une telle clause aurait dépassé le plafond impératif de deux ans fixé par l'article 27. Elle ne serait pas valable dans son excédent : le garagiste ne pourrait, au mieux, se prévaloir de l'engagement que dans la limite légale de deux ans, la fraction au-delà de ce plafond étant réputée non écrite, en cohérence avec le caractère d'ordre public social des dispositions protectrices déjà rencontré au chapitre 1." },
    ],
  },
  {
    id: 'cp5',
    titre: "La résiliation contestée d'un apprenti mineur",
    contexte: "Un atelier de soudure de Bukavu forme Patrick, seize ans, dans le cadre d'un contrat d'apprentissage régulier. Après plusieurs manquements répétés que le maître juge graves, absences non justifiées, non-respect des consignes de sécurité, celui-ci décide de résilier le contrat sur-le-champ et le notifie oralement à Patrick le jour même, sans en informer qui que ce soit d'autre. Une semaine plus tard, l'Inspecteur du Travail, alerté par les parents de Patrick, s'étonne de n'avoir jamais reçu de demande relative à cette résiliation.",
    questions: [
      { num: 1, enonce: "Les manquements invoqués par le maître, absences et non-respect des consignes de sécurité, peuvent-ils en principe justifier une résiliation du contrat d'apprentissage ?", correction: "Oui, dans leur principe. L'article 30 admet la résiliation notamment pour infraction grave ou habituelle aux prescriptions de l'article 26, qui impose à l'apprenti d'exécuter les travaux confiés et de s'abstenir de tout ce qui pourrait nuire à sa propre sécurité ou à celle de ses compagnons. Des absences répétées et des manquements à la sécurité peuvent relever de ce cas d'ouverture, sous réserve d'en établir la réalité et la gravité." },
      { num: 2, enonce: "La résiliation orale, notifiée le jour même par le maître, est-elle régulière compte tenu de la minorité de Patrick ?", correction: "Non. L'article 31 soumet toute résiliation à l'initiative du maître, lorsque l'apprenti est mineur, à la condition suspensive de son approbation par l'Inspecteur du Travail du ressort, saisi par lettre recommandée ou par cahier de transmission. Une résiliation orale et immédiate, sans cette démarche, ne respecte ni la forme ni la procédure imposées par le texte." },
      { num: 3, enonce: "Quelle est la conséquence de cette absence de saisine de l'Inspecteur du Travail sur la résiliation notifiée par le maître ?", correction: "La condition suspensive posée par l'article 31 n'ayant jamais été déclenchée, faute de demande d'approbation adressée à l'Inspecteur du Travail, la résiliation ne peut être considérée comme ayant produit ses effets réguliers. Le contrat d'apprentissage doit, en principe, être regardé comme n'ayant pas été valablement résilié tant que cette approbation, ou le silence d'un mois valant approbation selon l'article 31, n'est pas intervenu." },
      { num: 4, enonce: "Le maître pourrait-il encore régulariser la situation, ou la voie de la résiliation lui est-elle définitivement fermée ?", correction: "Rien n'interdit au maître de régulariser en saisissant a posteriori l'Inspecteur du Travail d'une demande d'approbation, conforme aux formes et délais fixés par l'article 32 pour les causes visées aux littera a, b et d de l'article 30. La gravité des manquements invoqués, si elle est établie, pourrait alors fonder une approbation rétroactive de la mesure, mais la résiliation notifiée oralement, à elle seule, ne suffit pas et doit être suivie de cette démarche pour produire un effet régulier." },
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

export default function UE1Chapitre2Page() {
  const goBack = useGoBack('/ue1-droit-travail')
  const currentUser = useUser()
  const isStudent = isStudentRole(currentUser)
  const [vue, setVue] = useState<Vue>('lecture')
  const [afficherRemonter, setAfficherRemonter] = useState(false)
  const sommetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sommetRef.current?.scrollIntoView({ block: 'start' })
    document.querySelector('main')?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }, [vue])

  useEffect(() => {
    const verifier = () => {
      const main = document.querySelector('main')
      setAfficherRemonter((main?.scrollTop ?? 0) > 400 || window.scrollY > 400)
    }
    window.addEventListener('scroll', verifier, true)
    verifier()
    return () => window.removeEventListener('scroll', verifier, true)
  }, [])

  const remonterEnHaut = () => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const casPratiquesExistants: CasPratiqueExistant[] = CAS_PRATIQUES.map(cp => ({
    id: cp.id,
    titre: cp.titre,
    enonce: cp.contexte + '\n' + cp.questions.map(q => `Question ${q.num} : ${q.enonce}`).join('\n'),
    corrigeType: cp.questions.map(q => `Question ${q.num} : ${q.correction}`).join('\n'),
  }))

  return (
    <div ref={sommetRef} className="space-y-4 pb-10 animate-fadeIn">
      {afficherRemonter && (
        <button
          onClick={remonterEnHaut}
          aria-label="Remonter en haut de la page"
          className={cn('fixed bottom-20 md:bottom-6 right-4 z-40 h-10 w-10 rounded-full text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105', VERT_BG)}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 1 · Droit du travail', route: '/ue1-droit-travail' },
            { label: 'Chapitre 2' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={cn('font-display text-lg font-bold leading-tight', ENCRE)}>Formation professionnelle, apprentissage et INPP</h1>
          <InfoTooltip texte="Obligation de formation, statut de l'INPP, contrat d'apprentissage." loi="Titres II-III, art. 8 à 35" />
        </div>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Titres II et III du Code du travail · Loi n°015/2002, art. 8 à 35</p>
      </div>

      {vue === 'lecture' && (
        <div className={cn('rounded-sm border p-4 space-y-1', PAPIER_CARD, LIGNE)}>
          {[
            "Comprendre l'obligation de formation professionnelle pesant sur tout employeur",
            "Connaître le statut, la gouvernance et le financement de l'INPP",
            "Maîtriser les conditions de forme et de preuve du contrat d'apprentissage",
            "Distinguer les obligations réciproques du maître et de l'apprenti",
            "Identifier les causes et la procédure de fin du contrat d'apprentissage, notamment pour un mineur",
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
                ['s1', "2.1 L'obligation de formation"],
                ['s2', "2.2 Statut et gouvernance de l'INPP"],
                ['s3', '2.3 Le financement : la cotisation'],
                ['s4', '2.4 Forme et preuve du contrat'],
                ['s5', 'Obligations réciproques'],
                ['s6', 'Suspension et fin du contrat'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className={cn('block text-xs leading-snug py-1.5 pl-3 border-l-2', LIGNE, ENCRE_FAIBLE, 'hover:text-[#1E4A3D] hover:border-[#1E4A3D] transition-colors')}>{label}</a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-14">
            {/* 2.1 */}
            <section id="s1" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.1</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>L'obligation de formation professionnelle</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le Titre II du Code du travail s'ouvre sur une obligation, non une simple faculté : selon l'article 8, tout employeur, public ou privé, a l'obligation d'assurer la formation, le perfectionnement ou l'adaptation professionnelle des travailleurs qu'il emploie. Le Code lui offre pour cela un instrument central, l'Institut National de Préparation Professionnelle, dont les moyens sont mis à sa disposition sur toute l'étendue du territoire.</p>
                <p>Cette obligation ne s'exécute pas dans le vide : elle s'inscrit dans une politique nationale de la formation et du perfectionnement professionnels, déterminée par décret du Président de la République, pris sur proposition du Ministre du Travail après avis du Conseil National du Travail. Le Ministre en assure ensuite l'exécution, en élaborant, avec le concours de l'INPP, des organisations professionnelles et des centres agréés, un programme de préparation professionnelle qui vise cinq objectifs énumérés à l'article 10 : la création d'emplois, l'amélioration de la productivité, la mobilité professionnelle, l'insertion des jeunes et la réinsertion des accidentés du travail.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Une obligation de moyens rattachée à une politique d'État</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>L'employeur n'a pas à organiser lui-même un dispositif de formation complet : il doit utiliser les moyens existants, au premier rang desquels l'INPP, dans le cadre d'une politique nationale qui dépasse le seul rapport contractuel employeur-travailleur.</p>
                </div>
                <p>Un partenariat conclu le 23 décembre 2025 entre l'Association nationale des entreprises du portefeuille de l'État et l'INPP illustre la vivacité actuelle de cette politique : il vise à adapter l'offre de formation aux besoins réels du marché du travail, dans le prolongement des objectifs de l'article 10, et rappelle que ce Titre II, ancien dans sa rédaction, continue de produire des effets concrets et actuels sur l'organisation de la formation professionnelle en RDC.</p>
              </div>
            </section>

            {/* 2.2 */}
            <section id="s2" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.2</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Statut et gouvernance de l'Institut National de Préparation Professionnelle</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>L'article 11 institue l'Institut National de Préparation Professionnelle, INPP en sigle, doté de la personnalité juridique, siège à Kinshasa, avec la capacité d'acquérir des biens meubles et immeubles et d'en disposer, ses engagements étant garantis par l'État. Cette personnalité juridique n'est pas une création ex nihilo du Code de 2002 : l'article 17 maintient en vigueur les dispositions de l'ordonnance-loi n°206 du 29 juin 1964, portant création de l'Institut, dans la mesure où elles ne sont pas contraires au présent Titre, ce qui rattache l'INPP à une continuité institutionnelle remontant aux premières années de l'indépendance.</p>
                <p>La mission de l'INPP, définie à l'article 12, est large : collaborer à la qualification professionnelle de la population active nationale, par le perfectionnement des travailleurs en emploi, la formation rapide de nouveaux travailleurs adultes, l'apprentissage dans l'emploi, la préparation professionnelle et la réadaptation des travailleurs frappés d'incapacité. L'article 13 y ajoute des missions plus techniques : coopération entre organismes de formation, participation à l'établissement de normes de qualification, coopération avec l'Office National de l'Emploi sur les tendances du marché du travail, et orientation professionnelle.</p>
                <table className="w-full text-xs border-collapse my-4">
                  <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Organe</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Rôle</th></tr></thead>
                  <tbody>
                    {[
                      ['Ministère du Travail', "Tutelle technique de l'État sur l'Institut"],
                      ["Conseil d'administration tripartite", "Organisation générale, administration et gestion, associant État, employeurs et travailleurs"],
                    ].map(([o, r], i) => (
                      <tr key={i} className="even:bg-black/[.02]">
                        <td className={cn('p-2 border font-medium', LIGNE)}>{o}</td>
                        <td className={cn('p-2 border', LIGNE, ENCRE_DOUX)}>{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Cette gouvernance tripartite, articulée à l'article 14, mérite d'être rapprochée de celle du Conseil National du Travail lui-même, dont l'avis conditionne plusieurs actes réglementaires étudiés dans ce chapitre : c'est une même logique de dialogue social institutionnalisé, entre l'État, les employeurs et les travailleurs, que le Titre II reproduit à l'échelle de l'INPP.</p>
              </div>
            </section>

            {/* 2.3 */}
            <section id="s3" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.3</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Le financement de l'INPP : la cotisation patronale</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>L'article 15 énumère les ressources de l'INPP : subvention annuelle de l'État, apports, dons et legs, rétributions exceptionnelles pour services spéciaux, et surtout, en pratique la plus significative pour les entreprises, la cotisation mensuelle des employeurs, proportionnelle à la somme des rémunérations versées à leur personnel au cours du trimestre précédent. Le Code renvoie la fixation du taux à un arrêté conjoint des Ministres du Travail, des Finances et du Budget, pris après avis du Conseil National du Travail.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Catégorie d'employeur</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Taux 2006-2025 (abrogé)</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Taux depuis le 24/09/2025</th></tr></thead>
                    <tbody>
                      {[
                        ['Entreprises et établissements publics', '3 %', '4 %'],
                        ['Secteur privé, 1 à 50 travailleurs', '3 %', '3,5 %'],
                        ['Secteur privé, 51 à 300 travailleurs', '2 %', '3 %'],
                        ['Secteur privé, plus de 300 travailleurs', '1 %', '2 %'],
                      ].map(([c, a, n], i) => (
                        <tr key={i} className="even:bg-black/[.02]">
                          <td className={cn('p-2 border font-medium', LIGNE)}>{c}</td>
                          <td className={cn('p-2 border', LIGNE, ENCRE_FAIBLE)}>{a}</td>
                          <td className={cn('p-2 border font-semibold', LIGNE, VERT)}>{n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>La révision opérée par l'arrêté interministériel du 24 septembre 2025, qui abroge celui du 14 février 2006, relève chaque tranche tout en resserrant l'écart entre petites et grandes structures : en 2006, le taux plein des petites entreprises privées rejoignait celui du secteur public, quand en 2025 un écart d'un demi-point subsiste entre les deux, tandis que l'écart entre la plus petite et la plus grande tranche privée se réduit à un point et demi contre deux points auparavant.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Assiette et comptabilisation</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>La cotisation INPP est assise sur les rémunérations versées, la même assiette que celle étudiée à propos de l'article 7 au chapitre 1 : les éléments qui en sont exclus, indemnité de logement, allocations familiales légales, échappent également à cette cotisation. En pratique comptable, la dette envers l'INPP est usuellement enregistrée au compte SYSCOHADA 4331.</p>
                </div>
                <p>Le taux dépend d'abord de la nature de l'employeur, public ou privé, puis, pour le secteur privé, d'un seuil d'effectif, jamais d'un seuil de chiffre d'affaires ou de rémunération globale : une entreprise qui franchit un seuil d'effectif en cours d'exercice change de tranche à compter de ce franchissement, sans attendre la clôture de l'exercice.</p>
              </div>
            </section>

            {/* 2.4 */}
            <section id="s4" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.4</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Forme et preuve du contrat d'apprentissage</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le Titre III organise un régime de formation distinct de l'emploi ordinaire, celui du contrat d'apprentissage, en commençant par les conditions requises du maître : selon l'article 18, nul ne peut recevoir des apprentis mineurs s'il n'est âgé de dix-huit ans au moins, reconnu de bonne vie et mœurs, et suffisamment qualifié pour donner ou faire donner une formation appropriée. Une protection spécifique s'y ajoute : aucun maître ne vivant ni en famille ni en communauté ne peut loger comme apprenties des jeunes filles mineures, disposition à laquelle aucun consentement, même parental, ne peut déroger.</p>
                <p>Le formalisme du contrat est strict. L'article 19 exige un écrit, rédigé dans une langue connue de l'apprenti, signé par le maître, l'apprenti et ses parents ou son représentant, exempt de tout droit de timbre et d'enregistrement. L'article 20 en fixe les mentions obligatoires : identité complète des parties et du représentant légal de l'apprenti mineur, date de début et durée, plafonnée à quatre ans quels que soient les usages de la profession, indemnités éventuellement consenties, profession enseignée et cours professionnels que le maître s'engage à faire suivre.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Article 21, alinéa 3, Loi n°015/2002</p>
                  <p className={cn('text-sm leading-relaxed', ENCRE_DOUX)}>« Tant que le contrat n'a pas été soumis au visa, ou lorsque le visa a été retiré, les services de l'apprenti sont présumés être prestés en exécution d'un contrat de travail respectivement à la date de la conclusion du contrat et du retrait du visa. »</p>
                </div>
                <p>Cette présomption est la clé de voûte du dispositif : le contrat d'apprentissage doit être établi en quatre exemplaires au moins et soumis au visa de l'Office National de l'Emploi, dont l'article 22 précise les vérifications, certificat médical d'aptitude, identité de l'apprenti, conformité du contrat, absence d'engagement antérieur ou de qualification exclusive d'apprentissage. Tant que ce visa n'a pas été accordé, ou s'il a été retiré, l'apprenti bénéficie du régime plus protecteur du contrat de travail, une articulation directe avec les notions de l'article 7 étudiées au chapitre 1.</p>
              </div>

              <div className={cn('mt-6', '')}>
                <div className="rounded-sm border p-4" style={{ borderColor: '#C6B788', background: '#F8F4E8' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn('text-[10px] font-mono uppercase tracking-wider', AMBRE)}>Vérification de lecture</span>
                  </div>
                  <QCMBankItem q={{ id: 'checkpoint-1', question: "Un contrat d'apprentissage écrit, complet et signé, mais jamais soumis au visa de l'Office National de l'Emploi, ouvre-t-il à l'apprenti le régime de l'apprentissage ou celui du contrat de travail ?", options: [{ id: 'a', texte: "Le régime de l'apprentissage, l'écrit suffisant à lui seul" }, { id: 'b', texte: "Le régime du contrat de travail, par présomption de l'article 21" }, { id: 'c', texte: "Aucun régime, le contrat étant purement et simplement inexistant" }], reponseCorrecte: 'b', articleRef: 'Art. 21, al. 3', explication: "L'écrit ne suffit pas : à défaut de visa, l'article 21 présume que les services sont prestés en exécution d'un contrat de travail, un régime distinct et en général plus protecteur, non une inexistence du contrat." }} />
                </div>
              </div>
            </section>

            {/* 2.5 */}
            <section id="s5" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.5</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Les obligations réciproques du maître et de l'apprenti</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le Titre III organise un échange d'obligations qui dépasse la seule transmission d'un savoir-faire. L'article 24 impose au maître d'enseigner méthodiquement le métier, de traiter l'apprenti avec les égards voulus, de veiller à sa sécurité et à sa santé, d'avertir sans retard les parents en cas de maladie ou de faute grave, de lui accorder un congé annuel, de lui fournir les prestations dues en cas de maladie ou d'accident, et de lui délivrer, à la fin de l'apprentissage, un certificat conforme au modèle réglementaire.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Obligations du maître (art. 24)</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Obligations de l'apprenti (art. 26)</th></tr></thead>
                    <tbody>
                      {[
                        ["Enseigner méthodiquement le métier, fournir outils et matériel", "Se conformer aux ordres du maître ou de son préposé"],
                        ["Traiter l'apprenti avec les égards voulus, veiller à sa sécurité et sa santé", "Exécuter les travaux confiés selon ses aptitudes"],
                        ["Avertir sans retard les parents en cas de maladie, absence ou faute grave", "Observer le respect des convenances et bonnes mœurs"],
                        ["Accorder un congé annuel, verser l'indemnité prévue", "Restituer en bon état outils et matériels confiés"],
                        ["Fournir les prestations dues en cas de maladie ou d'accident", "Garder les secrets de fabrication ou d'affaires"],
                        ["Délivrer un certificat de fin d'apprentissage", "Se soumettre aux examens médicaux et d'évaluation"],
                      ].map(([m, a], i) => (
                        <tr key={i} className="even:bg-black/[.02]">
                          <td className={cn('p-2 border', LIGNE, ENCRE_DOUX)}>{m}</td>
                          <td className={cn('p-2 border', LIGNE, ENCRE_DOUX)}>{a}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>La rémunération de l'apprenti, régie par l'article 25, prend la forme d'une indemnité, non d'un salaire ordinaire, mais une indemnité fortement encadrée : fixée par arrêté ministériel après avis du Conseil National du Travail, elle doit être majorée au fur et à mesure des années d'apprentissage, et toutes les obligations et garanties du Code en matière de salaire, notamment celles étudiées au chapitre 5 sur la protection du salaire, s'y attachent intégralement.</p>
                <p>L'article 27 permet enfin d'assortir le contrat d'une clause de fidélité : l'apprenti peut s'engager à travailler pour son ancien maître, après l'apprentissage, pendant une période ne pouvant excéder deux ans. L'inobservation de cet engagement, par l'une ou l'autre partie, ouvre droit à des dommages-intérêts et impose la prestation d'un préavis ou, à défaut, le versement d'une indemnité compensatoire, calculée selon les règles applicables à la rupture du contrat de travail, étudiées au chapitre 4.</p>
              </div>
            </section>

            {/* 2.6 */}
            <section id="s6" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>2.6</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Suspension, fin du contrat et mesures de contrôle</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le contrat d'apprentissage se suspend, selon l'article 28, pendant la durée de l'incapacité de travail de l'apprenti résultant de maladie ou d'accident. Le maître ne recouvre une faculté de résiliation qu'après six mois d'incapacité, ou lorsque la situation médicale fait présumer une incapacité continue de six mois, à l'exclusion du cas particulier de l'accident du travail ou de la maladie professionnelle.</p>
                <p>D'autres causes mettent fin au contrat de plein droit, sans qu'aucune partie n'ait à en décider : mort du maître ou de l'apprenti, appel ou rappel sous le drapeau, condamnation du maître à une peine de servitude pénale supérieure à trois mois sans sursis, ou, pour les apprenties mineures hébergées chez le maître, divorce de celui-ci ou décès de l'épouse ou de la femme qui dirigeait la maison. L'article 30 organise, à côté de ces causes automatiques, une résiliation à la demande des parties, pour manquement contractuel, infraction grave ou habituelle aux obligations des articles 24 ou 26, déménagement du maître hors de son entité administrative, condamnation pénale de plus de deux mois, ou mariage de l'apprenti.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Protection renforcée du mineur</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>Lorsque l'apprenti est mineur, toute résiliation à l'initiative du maître est soumise à la condition suspensive de son approbation par l'Inspecteur du Travail du ressort, qui doit statuer dans le mois, son silence valant approbation. Cette procédure prolonge, au stade de la rupture, la même logique protectrice qui encadrait déjà l'entrée en apprentissage à l'article 6, étudié au chapitre 1.</p>
                </div>
                <p>Le contrôle de l'exécution du contrat d'apprentissage relève de l'Inspecteur du Travail du ressort, qui peut se faire assister d'un technicien pour contrôler l'enseignement dispensé, toute cessation devant être portée à sa connaissance ainsi qu'à celle de l'Office National de l'Emploi. Enfin, l'article 34 clôt le Titre III par un principe d'assimilation générale : les apprentis sont assimilés aux travailleurs et bénéficient de toutes les autres dispositions du Code qui ne sont pas contraires aux règles particulières de ce Titre, ce qui rattache pleinement l'apprentissage à l'architecture protectrice étudiée depuis le chapitre 1.</p>
              </div>
            </section>

            {/* à retenir */}
            <div className={cn('pt-8 border-t-2', 'border-[#262019]')}>
              <p className={cn('font-serif font-bold text-base mb-4', ENCRE)}>À retenir</p>
              <ul className="space-y-0">
                {[
                  "Tout employeur a l'obligation, non la simple faculté, d'assurer la formation professionnelle de ses travailleurs, en s'appuyant sur les moyens de l'INPP.",
                  "L'INPP est doté de la personnalité juridique et d'une gouvernance tripartite (État, employeurs, travailleurs), financée notamment par une cotisation patronale dont le taux dépend de la nature de l'employeur et, pour le privé, de son effectif.",
                  "Le contrat d'apprentissage doit être écrit, comporter des mentions obligatoires et être visé par l'Office National de l'Emploi ; à défaut de visa, les services de l'apprenti sont présumés prestés en exécution d'un contrat de travail.",
                  "Aucun maître ne vivant ni en famille ni en communauté ne peut loger comme apprenties des jeunes filles mineures, quel que soit le consentement parental.",
                  "L'apprenti est assimilé au travailleur pour toutes les dispositions du Code non contraires au Titre III ; toute résiliation à l'initiative du maître, lorsque l'apprenti est mineur, requiert l'approbation de l'Inspecteur du Travail.",
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
                  <>Arrêté interministériel du 14 février 2006 fixant le taux de la cotisation INPP, <i>Journal officiel de la RDC</i>, 1ʳᵉ partie n°6, 15 mars 2006 (abrogé).</>,
                  <>Arrêté interministériel du 24 septembre 2025 fixant le taux de la cotisation INPP (en vigueur).</>,
                  <>Ordonnance-loi n°206 du 29 juin 1964 portant création de l'Institut National de Préparation Professionnelle.</>,
                  <>Office National de l'Emploi, communiqué relatif au partenariat ANEP-INPP du 23 décembre 2025.</>,
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
              <GraduationCap className="h-4 w-4" /> Terminer le chapitre 2
            </button>

            <p className="text-xs text-center text-muted-foreground/60 pb-2">
              Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 8 à 35 · Loi n°16/010 du 15 juillet 2016 · Arrêté interministériel du 24 septembre 2025 (cotisation INPP)
            </p>
          </div>
        </div>
      )}

      {vue === 'qcm' && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>QCM du chapitre : 20 questions</h2>
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
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Cas pratiques : 5 mises en situation</h2>
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
            chapitreId="ue1-chapitre-2"
            chapitreNom="Chapitre 2 : Formation professionnelle, apprentissage et INPP"
            questions={QCM_CHAPITRE}
            coursId="ue1-droit-travail"
            casPratiquesExistants={casPratiquesExistants}
          />
        </div>
      )}
    </div>
  )
}
