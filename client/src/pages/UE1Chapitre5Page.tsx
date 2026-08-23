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
// IDENTITÉ VISUELLE — reprise à l'identique des chapitres 1-4.
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
// BANQUE DE QUESTIONS — 20 questions, 5 propositions, distracteurs pièges.
// ─────────────────────────────────────────────────────────────────────────────
const QCM_CHAPITRE: QCMChapitre[] = [
  {
    id: 'q1', question: "Sur quels critères l'article 86 fonde-t-il le principe d'égalité de rémunération entre travailleurs ?",
    options: [
      { id: 'a', texte: "L'ancienneté, le sexe et l'âge, à l'exclusion de la qualification" },
      { id: 'b', texte: "Les conditions de travail, la qualification professionnelle et le rendement, quels que soient l'origine, le sexe et l'âge" },
      { id: 'c', texte: "Uniquement le diplôme détenu par le travailleur" },
      { id: 'd', texte: "La nationalité du travailleur et son lieu de résidence" },
      { id: 'e', texte: "Le seul critère du poste occupé, indépendamment du rendement individuel" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 86',
    explication: "L'article 86 pose l'égalité de salaire à conditions égales de travail, de qualification professionnelle et de rendement, précisément quels que soient l'origine, le sexe et l'âge du travailleur : ces derniers ne sont donc pas des critères de différenciation légitimes, mais les motifs que le texte neutralise.",
  },
  {
    id: 'q2', question: "Un travailleur s'absente de son poste sans que son cas relève d'un texte particulier ni d'un accord avec l'employeur. Un salaire lui est-il dû pour cette période ?",
    options: [
      { id: 'a', texte: "Oui, systématiquement, le salaire restant dû quelle que soit la cause de l'absence" },
      { id: 'b', texte: "Non, sauf les cas prévus par la législation ou la réglementation, ou accord entre les parties" },
      { id: 'c', texte: "Oui, mais réduit de moitié" },
      { id: 'd', texte: "Non, jamais, même en cas d'accord contraire des parties" },
      { id: 'e', texte: "Cette question relève exclusivement de la convention collective, le Code restant muet" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 86, al. 3',
    explication: "L'article 86 pose le principe inverse de celui souvent supposé : aucun salaire n'est dû en cas d'absence, en dehors des cas prévus par la législation ou la réglementation et sauf accord entre parties intéressées, qui peuvent donc déroger à ce principe dans un sens plus favorable au travailleur.",
  },
  {
    id: 'q3', question: "Par quel acte les salaires minima interprofessionnels garantis sont-ils fixés en droit congolais ?",
    options: [
      { id: 'a', texte: "Par une simple circulaire du Ministre du Travail, sans autre formalité" },
      { id: 'b', texte: "Par un décret du Président de la République, sur proposition du Ministre du Travail, après avis du Conseil National du Travail" },
      { id: 'c', texte: "Par une loi votée chaque année par le Parlement" },
      { id: 'd', texte: "Par chaque convention collective sectorielle, de manière autonome" },
      { id: 'e', texte: "Par l'Inspecteur du Travail du ressort, au cas par cas" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 87',
    explication: "L'article 87 réserve la fixation des salaires minima interprofessionnels garantis à un décret présidentiel, pris sur proposition du Ministre ayant le Travail dans ses attributions et après avis du Conseil National du Travail, une procédure à trois étages qui exclut la simple circulaire, la loi annuelle ou l'autonomie sectorielle totale.",
  },
  {
    id: 'q4', question: "Une convention collective fixe, pour une catégorie professionnelle, une rémunération inférieure au salaire minimum interprofessionnel garanti. Quelle est la sanction de cette clause ?",
    options: [
      { id: 'a', texte: "Elle est valable si la convention a été signée par les syndicats représentatifs" },
      { id: 'b', texte: "Elle est nulle de plein droit" },
      { id: 'c', texte: "Elle est simplement inopposable au travailleur qui ne l'a pas signée personnellement" },
      { id: 'd', texte: "Elle reste valable pendant la durée de la convention, puis devient caduque" },
      { id: 'e', texte: "Elle est réductible par le juge à un montant équitable, sans être nulle" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 88, al. 2',
    explication: "L'article 88 frappe de nullité de plein droit toute clause de contrat individuel ou de convention collective fixant des rémunérations inférieures aux salaires minima interprofessionnels garantis, sans que la représentativité des signataires, une durée de validité temporaire ou une simple réduction judiciaire ne puisse faire échec à cette nullité automatique.",
  },
  {
    id: 'q5', question: "Dans quelle monnaie la rémunération doit-elle être stipulée, selon l'article 89 ?",
    options: [
      { id: 'a', texte: "Au libre choix des parties, y compris en devise étrangère uniquement" },
      { id: 'b', texte: "En monnaie ayant cours légal en République Démocratique du Congo" },
      { id: 'c', texte: "En dollars américains pour les entreprises à capitaux étrangers" },
      { id: 'd', texte: "Dans la monnaie du pays d'origine de l'employeur, si celui-ci est étranger" },
      { id: 'e', texte: "En unités de compte fixées par l'Inspecteur du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 89',
    explication: "L'article 89 impose la stipulation en monnaie ayant cours légal en République Démocratique du Congo, sans réserver de régime particulier aux entreprises à capitaux étrangers ni renvoyer à la monnaie du pays d'origine de l'employeur ou à une unité de compte administrative.",
  },
  {
    id: 'q6', question: "Combien de zones distinctes de salaire minimum interprofessionnel garanti l'article 91 institue-t-il en République Démocratique du Congo ?",
    options: [
      { id: 'a', texte: "Une zone par province, soit vingt-six zones" },
      { id: 'b', texte: "Une zone unique, sur l'ensemble du territoire" },
      { id: 'c', texte: "Deux zones, urbaine et rurale" },
      { id: 'd', texte: "Trois zones, selon le coût de la vie constaté" },
      { id: 'e', texte: "Aucune zone n'est instituée, chaque entreprise fixant son propre plancher" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 91',
    explication: "L'article 91 institue une zone unique du salaire minimum interprofessionnel garanti pour tout le pays, sous réserve de dispositions spécifiques que le Président de la République peut prendre par décret pour alléger les difficultés propres aux secteurs agro-industriel et pastoral, ce qui ne constitue pas un zonage général mais une exception sectorielle limitée.",
  },
  {
    id: 'q7', question: "Sur quel indice les salaires minima interprofessionnels sont-ils ajustés selon l'article 97 ?",
    options: [
      { id: 'a', texte: "Le taux de change officiel du franc congolais" },
      { id: 'b', texte: "L'indice des prix à la consommation" },
      { id: 'c', texte: "Le taux de croissance du produit intérieur brut" },
      { id: 'd', texte: "Le taux directeur de la Banque Centrale du Congo" },
      { id: 'e', texte: "Aucun indice, l'ajustement restant à la libre appréciation ministérielle" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 97',
    explication: "L'article 97 fait dépendre l'ajustement des salaires minima interprofessionnels de l'évolution de l'indice des prix à la consommation, un mécanisme d'indexation distinct du taux de change, de la croissance économique ou du taux directeur de la banque centrale.",
  },
  {
    id: 'q8', question: "Le paiement du salaire peut-il avoir lieu dans un débit de boissons ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction particulière" },
      { id: 'b', texte: "Non, sauf pour les travailleurs employés dans cet établissement" },
      { id: 'c', texte: "Oui, à condition que le travailleur y consente par écrit" },
      { id: 'd', texte: "Non, jamais, même pour les travailleurs qui y sont employés" },
      { id: 'e', texte: "Cette interdiction ne vise que les magasins de vente, non les débits de boissons" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 98',
    explication: "L'article 98 interdit le paiement de la rémunération dans un débit de boissons ou un magasin de vente, sauf précisément pour les travailleurs qui y sont employés, une exception qui neutralise à la fois l'absence totale de restriction et l'interdiction absolue sans exception.",
  },
  {
    id: 'q9', question: "Quelle est la périodicité maximale légale du paiement de la rémunération ?",
    options: [
      { id: 'a', texte: "Une semaine" },
      { id: 'b', texte: "Quinze jours" },
      { id: 'c', texte: "Un mois" },
      { id: 'd', texte: "Un trimestre" },
      { id: 'e', texte: "Aucune périodicité maximale n'est fixée, seul le délai de versement comptant" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 99, al. 1',
    explication: "L'article 99 impose des intervalles réguliers n'excédant pas un mois pour le paiement de la rémunération, ce plafond mensuel étant distinct du délai de six jours, également fixé par le même article, dans lequel le paiement doit intervenir après la période à laquelle il se rapporte.",
  },
  {
    id: 'q10', question: "Dans quel délai les participations aux bénéfices réalisés durant un exercice doivent-elles être payées, selon l'article 99 ?",
    options: [
      { id: 'a', texte: "Dans les six jours suivant la clôture de l'exercice, comme le salaire ordinaire" },
      { id: 'b', texte: "Dans les trois mois suivant la fin de l'exercice, comme les commissions trimestrielles" },
      { id: 'c', texte: "Dans les neuf mois qui suivent cet exercice" },
      { id: 'd', texte: "Dans les douze mois qui suivent cet exercice" },
      { id: 'e', texte: "Aucun délai n'est fixé par le Code pour les participations aux bénéfices" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 99, al. 4',
    explication: "L'article 99 distingue trois délais différents selon la nature de la somme due : six jours pour la rémunération ordinaire après la période concernée, trois mois pour les commissions acquises au cours d'un trimestre, et neuf mois pour les participations aux bénéfices d'un exercice, ce dernier délai, le plus long, tenant compte du temps nécessaire à l'arrêté des comptes annuels.",
  },
  {
    id: 'q11', question: "Dans quel délai toute somme restant due doit-elle être payée au travailleur lors de la cessation définitive des services ?",
    options: [
      { id: 'a', texte: "Au plus tard dans les deux jours ouvrables suivant la cessation des services" },
      { id: 'b', texte: "Au plus tard dans les six jours ouvrables, comme le salaire ordinaire" },
      { id: 'c', texte: "Au plus tard dans le mois suivant la cessation des services" },
      { id: 'd', texte: "Immédiatement, le jour même de la cessation, sans délai possible" },
      { id: 'e', texte: "Aucun délai spécifique n'est fixé pour ce décompte final" },
    ],
    reponseCorrecte: 'a', articleRef: 'Art. 100',
    explication: "L'article 100 fixe un délai spécifique et bref, deux jours ouvrables, pour le paiement du décompte final lors de la cessation définitive des services, distinct du délai de six jours applicable au paiement périodique ordinaire de l'article 99.",
  },
  {
    id: 'q12', question: "Le paiement de tout ou partie de la rémunération en nature est-il autorisé en droit congolais ?",
    options: [
      { id: 'a', texte: "Oui, sans restriction, dès lors que l'employeur et le travailleur s'accordent" },
      { id: 'b', texte: "Non, en principe, sauf dans les cas prévus par les articles 138 et 139 du Code" },
      { id: 'c', texte: "Oui, mais uniquement pour la moitié de la rémunération au maximum" },
      { id: 'd', texte: "Non, en aucun cas, y compris dans les hypothèses des articles 138 et 139" },
      { id: 'e', texte: "Cette question est laissée à la seule appréciation de l'Inspecteur du Travail" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 101',
    explication: "L'article 101 pose une interdiction de principe du paiement en nature, sous la seule réserve des dispositions des articles 138 et 139 du Code, qui organisent notamment les avantages en nature comme le logement, sans que cette interdiction ne soit ni générale sans exception ni laissée à la discrétion administrative.",
  },
  {
    id: 'q13', question: "L'employeur qui ne remet pas au travailleur le décompte écrit de la rémunération payée, prévu à l'article 103, en subit quelle conséquence en cas de litige ?",
    options: [
      { id: 'a', texte: "Aucune, cette obligation étant purement formelle" },
      { id: 'b', texte: "Ses allégations concernant le décompte des paiements effectués sont rejetées, sauf preuve contraire à sa charge" },
      { id: 'c', texte: "Le contrat de travail est résilié de plein droit" },
      { id: 'd', texte: "Le travailleur est présumé n'avoir jamais été payé, de manière irréfragable" },
      { id: 'e', texte: "Seule une amende administrative est encourue, sans effet sur la preuve du litige" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 103, al. 2',
    explication: "L'article 103 sanctionne le manquement à l'obligation de décompte écrit par un renversement pratique de la charge de la preuve : les allégations de l'employeur sur les paiements effectués sont rejetées, à moins qu'il ne prouve l'impossibilité de remettre le décompte par la faute du travailleur, ou qu'il n'existe une preuve écrite, un commencement de preuve par écrit ou un aveu du travailleur.",
  },
  {
    id: 'q14', question: "Un travailleur signe, sans réserve, le décompte de sa rémunération avec la mention « pour solde de tout compte ». Quel effet l'article 104 attache-t-il à cette signature ?",
    options: [
      { id: 'a', texte: "Elle emporte renonciation à tout ou partie des droits légaux, réglementaires ou contractuels du travailleur" },
      { id: 'b', texte: "Elle n'emporte aucune renonciation à ces droits, ni ne vaut compte arrêté et réglé au sens de l'article 317" },
      { id: 'c', texte: "Elle vaut compte arrêté et réglé, mais n'emporte pas renonciation aux droits" },
      { id: 'd', texte: "Elle emporte renonciation uniquement pour les sommes explicitement mentionnées sur le décompte" },
      { id: 'e', texte: "Son effet dépend exclusivement de la convention collective applicable" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 104',
    explication: "L'article 104 neutralise doublement cette acceptation sans réserve : elle ne peut valoir renonciation, même partielle, aux droits légaux, réglementaires ou contractuels du travailleur, et elle ne peut pas non plus valoir compte arrêté et réglé au sens de l'article 317, deux effets que l'on pourrait pourtant spontanément déduire d'une signature sans protestation.",
  },
  {
    id: 'q15', question: "Pendant la suspension du contrat pour maladie ou accident non professionnel, quelle part de la rémunération en espèces le travailleur conserve-t-il ?",
    options: [
      { id: 'a', texte: "La totalité de sa rémunération habituelle" },
      { id: 'b', texte: "Les deux tiers de la rémunération en espèces, et la totalité des allocations familiales" },
      { id: 'c', texte: "La moitié de la rémunération en espèces, sans les allocations familiales" },
      { id: 'd', texte: "Aucune rémunération, seules les allocations familiales étant maintenues" },
      { id: 'e', texte: "Un tiers de la rémunération en espèces et la moitié des allocations familiales" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 105',
    explication: "L'article 105 maintient, pendant toute la durée de la suspension pour maladie ou accident, les deux tiers de la rémunération en espèces et la totalité des allocations familiales, un régime distinct de celui, plus favorable sur la durée initiale, applicable à la maladie professionnelle ou à l'accident du travail à l'article 106.",
  },
  {
    id: 'q16', question: "Lorsque la maladie ou l'accident est réputé maladie professionnelle ou accident du travail, l'employeur peut-il déduire de la rémunération due au travailleur les sommes que celui-ci reçoit de l'Institut National de Sécurité Sociale ?",
    options: [
      { id: 'a', texte: "Non, ces deux sources d'indemnisation se cumulent intégralement" },
      { id: 'b', texte: "Oui, l'employeur est autorisé à déduire mensuellement ces sommes, sur pièces justificatives vérifiées par l'Institut" },
      { id: 'c', texte: "Oui, mais uniquement après une décision du Tribunal du travail" },
      { id: 'd', texte: "Non, sauf accord exprès et renouvelé du travailleur chaque mois" },
      { id: 'e', texte: "Oui, mais seulement à concurrence de la moitié des sommes versées par l'Institut" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 106, al. 2',
    explication: "L'article 106 autorise expressément l'employeur à déduire mensuellement les sommes versées au travailleur par l'Institut National de Sécurité Sociale, à charge pour lui d'introduire les pièces justificatives, qui doivent être acceptées après vérification par cet Institut, sans qu'un accord répété du travailleur ni une décision judiciaire préalable ne soient requis.",
  },
  {
    id: 'q17', question: "Un travailleur est victime d'un accident survenu à la suite d'un excès de boisson. Quelle qualification cette situation reçoit-elle au regard des articles 107 et 108 ?",
    options: [
      { id: 'a', texte: "Un accident du travail ordinaire, intégralement indemnisé" },
      { id: 'b', texte: "Un risque spécial, excluant toute somme ou avantage lié à cet accident" },
      { id: 'c', texte: "Une maladie professionnelle, avec le régime de l'article 106" },
      { id: 'd', texte: "Une simple faute légère, réduisant l'indemnisation de moitié" },
      { id: 'e', texte: "Une hypothèse non prévue par le Code, laissée à l'appréciation du juge" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 108, 4°',
    explication: "L'article 108 range expressément la maladie ou l'accident survenu à la suite d'excès de boisson ou de drogue parmi les hypothèses de risque spécial au sens de l'article 107, ce qui exclut, selon ce dernier article, toute somme ou avantage lié à cet événement, à la différence d'un accident du travail ordinaire pleinement couvert.",
  },
  {
    id: 'q18', question: "En cas de faillite ou de liquidation judiciaire de l'entreprise, quel rang les travailleurs occupent-ils pour les salaires qui leur sont dus au titre de services antérieurs ?",
    options: [
      { id: 'a', texte: "Ils viennent après le Trésor Public, mais avant les autres créanciers" },
      { id: 'b', texte: "Ils ont rang de créanciers privilégiés sur tous les autres créanciers, y compris le Trésor Public" },
      { id: 'c', texte: "Ils sont traités comme des créanciers chirographaires ordinaires" },
      { id: 'd', texte: "Ils ne peuvent réclamer leurs salaires qu'après la clôture complète de la liquidation" },
      { id: 'e', texte: "Leur privilège ne porte que sur les biens meubles de l'employeur, jamais sur les immeubles" },
    ],
    reponseCorrecte: 'b', articleRef: 'Art. 110',
    explication: "L'article 110 confère aux travailleurs un rang de créanciers privilégiés sur tous les autres créanciers, y compris le Trésor Public, nonobstant toute disposition contraire, et précise que ce privilège s'exerce sur les biens meubles et immeubles de l'employeur, une protection nettement plus étendue qu'un simple rang chirographaire ou qu'un privilège limité aux meubles.",
  },
  {
    id: 'q19', question: "Parmi les retenues suivantes, laquelle l'article 112 n'autorise-t-il pas sur la rémunération du travailleur ?",
    options: [
      { id: 'a', texte: "La cotisation due à l'Institut National de Sécurité Sociale" },
      { id: 'b', texte: "Les retenues à titre d'avances" },
      { id: 'c', texte: "Une réduction de rémunération à titre de dommages-intérêts décidée unilatéralement par l'employeur" },
      { id: 'd', texte: "Les retenues fiscales au titre de la taxe professionnelle" },
      { id: 'e', texte: "Les retenues en vue de constituer le cautionnement de l'article 52" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 111 et 112',
    explication: "L'article 111 frappe de nullité toute stipulation attribuant à l'employeur le droit d'infliger des amendes, et l'article 112 fait de même pour toute réduction de rémunération à titre de dommages-intérêts, tout en énumérant limitativement les retenues autorisées, dont les quatre autres propositions font partie.",
  },
  {
    id: 'q20', question: "Quelle est la quotité maximale de la rémunération cessible et saisissable lorsque la créance est fondée sur une obligation alimentaire légale ?",
    options: [
      { id: 'a', texte: "Un cinquième, comme pour toute créance ordinaire" },
      { id: 'b', texte: "Un tiers, quel que soit le montant de la rémunération" },
      { id: 'c', texte: "Deux cinquièmes" },
      { id: 'd', texte: "La moitié de la rémunération, sans autre limite" },
      { id: 'e', texte: "Aucune quotité maximale n'est fixée pour ce type de créance" },
    ],
    reponseCorrecte: 'c', articleRef: 'Art. 114, al. 2',
    explication: "L'article 114 fixe la quotité cessible et saisissable à un cinquième sur la partie n'excédant pas cinq fois le salaire mensuel minimum et à un tiers sur le surplus pour une créance ordinaire, mais porte cette quotité à deux cinquièmes lorsque la créance est fondée sur une obligation alimentaire légale, ces deux saisies pouvant en outre s'opérer cumulativement.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// CAS PRATIQUES — 5 situations à plusieurs strates, art. 86 à 118 uniquement.
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
    titre: "Les commissions retardées de M. Nsimba, vendeur itinérant",
    contexte: "M. Nsimba, vendeur itinérant pour une entreprise de distribution de Kinshasa, perçoit un salaire de base mensuel payé régulièrement dans les délais, ainsi que des commissions sur ses ventes, calculées trimestriellement. Le premier trimestre de l'année s'achève le 31 mars ; l'entreprise ne lui verse les commissions correspondantes que le 15 septembre, soit plus de cinq mois après la clôture du trimestre. Interrogée, la direction financière explique ce retard par des difficultés de trésorerie passagères, et ajoute que, de toute façon, une commande importante conclue en février n'a été livrée et facturée qu'en avril, ce qui justifierait, selon elle, de reporter le droit à la commission correspondante au trimestre suivant.",
    questions: [
      { num: 1, enonce: "Le délai de versement des commissions du premier trimestre, effectué le 15 septembre, respecte-t-il l'article 99 ?", correction: "Non. L'article 99 impose que les commissions acquises au cours d'un trimestre soient payées dans les trois mois suivant la fin de ce trimestre, soit ici au plus tard le 30 juin pour les commissions du trimestre clos le 31 mars. Un versement intervenu le 15 septembre, soit plus de deux mois et demi après cette échéance, méconnaît directement ce délai, quelles que soient les difficultés de trésorerie invoquées, qui ne figurent pas parmi les causes d'exonération prévues par le texte." },
      { num: 2, enonce: "Le report du droit à la commission sur la commande de février au trimestre suivant, au motif que la livraison et la facturation ne sont intervenues qu'en avril, est-il conforme à l'article 93 ?", correction: "Non. L'article 93 précise que le droit aux commissions sur ventes est acquis dès l'instant où les commandes sont exécutées par l'employeur, non à la date de la commande elle-même ni à celle, plus tardive, de la facturation administrative. Si l'exécution de la commande, entendue comme la livraison effective au client, est bien intervenue en avril, c'est cette date d'exécution, et non celle de la commande de février, qui détermine le trimestre de rattachement : le raisonnement de la direction financière confond, à tort, la date de la commande avec celle de son exécution, ce qui pourrait à l'inverse jouer en sa faveur si l'exécution est effectivement postérieure à la commande, mais ne justifie en rien le retard global déjà constaté sur les commissions dues." },
      { num: 3, enonce: "M. Nsimba peut-il utilement se prévaloir de l'absence de décompte écrit s'il découvre que l'entreprise ne lui a jamais remis un tel document lors des précédents paiements ?", correction: "Oui, potentiellement, en cas de contestation ultérieure sur le montant exact des commissions déjà versées. L'article 103 impose à l'employeur de remettre au travailleur, au moment du paiement, un décompte écrit de la rémunération payée ; à défaut, ses allégations concernant les paiements effectués sont rejetées, sauf s'il prouve l'impossibilité de remettre ce décompte par la faute du travailleur, ou s'il existe une preuve écrite, un commencement de preuve par écrit ou un aveu de M. Nsimba. L'absence répétée de décompte fragilise donc la position probatoire de l'entreprise sur l'historique des sommes déjà réglées." },
      { num: 4, enonce: "Si M. Nsimba, recevant enfin ses commissions en septembre, en accuse réception par une signature sans réserve particulière, perd-il le droit de réclamer ultérieurement un complément s'il découvre une erreur de calcul ?", correction: "Non. L'article 104 est explicite : l'acceptation sans protestation ni réserve d'un décompte de la rémunération payée, y compris avec l'apposition d'une signature, ne peut valoir renonciation de la part du travailleur à tout ou partie des droits qu'il tient des dispositions légales, réglementaires ou contractuelles, ni valoir compte arrêté et réglé au sens de l'article 317. M. Nsimba conserve donc la possibilité de réclamer un complément s'il établit ultérieurement une erreur de calcul, quand bien même il aurait signé sans réserve apparente au moment du paiement." },
    ],
  },
  {
    id: 'cp2',
    titre: "L'accident de Mme Kalonji, requalifié en simple maladie",
    contexte: "Mme Kalonji, ouvrière dans une usine textile de Lubumbashi, se blesse gravement à la main en manipulant une machine de découpe, pendant ses heures de travail. L'employeur, souhaitant éviter la procédure de déclaration à l'Institut National de Sécurité Sociale et la déduction correspondante, présente l'incident dans ses registres internes comme une « indisposition passagère » sans lien avec le travail, et applique à Mme Kalonji le régime ordinaire de l'article 105 dès le premier jour de son incapacité, sans jamais introduire de pièces justificatives auprès de l'Institut.",
    questions: [
      { num: 1, enonce: "La blessure de Mme Kalonji, survenue pendant ses heures de travail en manipulant une machine, relève-t-elle du régime de l'article 105 ou de celui de l'article 106 ?", correction: "Elle relève, en principe, du régime de l'article 106, applicable lorsque la maladie ou l'accident est réputé maladie professionnelle ou accident du travail aux termes de la réglementation de la sécurité sociale. Une blessure survenue pendant les heures de travail, en manipulant une machine dans le cadre des fonctions de Mme Kalonji, présente les caractéristiques typiques d'un accident du travail, sans qu'aucun des éléments du contexte n'évoque une cause étrangère à l'exécution du contrat susceptible de faire basculer la qualification vers un événement purement personnel relevant de l'article 105." },
      { num: 2, enonce: "La qualification retenue par l'employeur, « indisposition passagère » relevant du régime ordinaire, modifie-t-elle le montant de l'indemnisation due à Mme Kalonji pendant les six premiers mois ?", correction: "Non, s'agissant du pourcentage de rémunération en espèces lui-même, puisque les articles 105 et 106 prévoient tous deux, à ce stade, le maintien des deux tiers de la rémunération en espèces et de la totalité des allocations familiales. La différence essentielle ne tient donc pas ici au taux d'indemnisation immédiat, mais au mécanisme de financement et de déduction organisé par l'article 106 pour l'accident du travail, ainsi qu'à d'autres conséquences propres à la reconnaissance d'un accident du travail relevant de la sécurité sociale, extérieures au seul Titre V du Code du travail." },
      { num: 3, enonce: "En s'abstenant d'introduire les pièces justificatives auprès de l'Institut National de Sécurité Sociale, l'employeur peut-il librement continuer à verser l'intégralité de l'indemnisation sans jamais solliciter la déduction de l'article 106 ?", correction: "L'article 106 autorise l'employeur à déduire mensuellement les sommes versées au travailleur par l'Institut, en introduisant les pièces justificatives qui doivent être acceptées après vérification par cet Institut : c'est une faculté offerte à l'employeur pour se faire rembourser, non une obligation de la retenir contre le travailleur. L'employeur qui s'abstient de solliciter cette déduction ne commet donc pas, sur ce point précis, une irrégularité à l'égard de Mme Kalonji ; en revanche, en dissimulant la nature réelle de l'accident, il prive celle-ci de la reconnaissance et des prestations propres au régime de sécurité sociale de l'accident du travail, questions qui dépassent le strict cadre du Titre V mais dont l'origine se trouve précisément dans la requalification contestable opérée ici." },
      { num: 4, enonce: "Mme Kalonji peut-elle utilement contester la qualification retenue par l'employeur, et sur quel fondement au sein du Titre V ?", correction: "Oui, elle peut la contester, notamment en s'appuyant sur les critères mêmes de l'article 106, qui renvoie à la réglementation de la sécurité sociale pour la qualification d'accident du travail, et sur les faits établissant le lien entre la blessure et l'exécution de ses fonctions au moment de l'incident. La désignation interne retenue par l'employeur dans ses propres registres, « indisposition passagère », ne lie ni l'Institut National de Sécurité Sociale ni le Tribunal du travail, qui apprécient la qualification réelle de l'événement au regard des critères légaux et réglementaires, indépendamment de la présentation choisie unilatéralement par l'employeur pour s'exonérer de ses obligations déclaratives." },
    ],
  },
  {
    id: 'cp3',
    titre: "Le cautionnement du chauffeur de fonds et sa libération contestée",
    contexte: "Une société de transport de fonds de Kinshasa engage M. Bofenda comme chauffeur convoyeur, poste exposant l'entreprise à des risques particuliers de détournement de valeurs. Le contrat prévoit une retenue mensuelle sur salaire destinée à constituer un cautionnement garantissant l'exécution de l'obligation de fidélité de M. Bofenda. Les sommes retenues sont déposées, avec mention de leur affectation, dans une banque agréée, quarante jours après la première retenue. Le contrat de M. Bofenda prend fin d'un commun accord. Trente-cinq jours après cette fin de contrat, sans qu'aucune demande en justice n'ait été introduite par l'employeur ni qu'aucune autorisation judiciaire de maintien n'ait été sollicitée, M. Bofenda réclame la libération de son cautionnement, que l'entreprise continue de refuser en invoquant de vagues « vérifications internes en cours ».",
    questions: [
      { num: 1, enonce: "La retenue mensuelle destinée à constituer le cautionnement de M. Bofenda est-elle autorisée par le Code du travail ?", correction: "Oui. L'article 112, litera e), autorise expressément les retenues en vue de constituer un cautionnement garantissant l'exécution par le travailleur de l'obligation prévue à l'article 52, laquelle vise notamment le respect des instructions de l'employeur et la préservation des intérêts de l'entreprise, une exigence particulièrement pertinente pour un chauffeur convoyeur de fonds exposé à des risques de détournement." },
      { num: 2, enonce: "Le dépôt des sommes retenues, intervenu quarante jours après la première retenue, respecte-t-il le délai fixé par l'article 112 ?", correction: "Non. L'article 112 impose que le dépôt soit fait dans le délai d'un mois à dater de la retenue, dans une banque ou un établissement agréé par arrêté ministériel. Un dépôt intervenu quarante jours après la première retenue, soit au-delà du délai d'un mois, méconnaît cette exigence, quand bien même le dépôt aurait finalement eu lieu dans un établissement agréé et avec mention de son affectation." },
      { num: 3, enonce: "Trente-cinq jours s'étant écoulés depuis la fin du contrat sans introduction d'une demande en justice ni autorisation judiciaire de maintien, l'entreprise peut-elle encore légitimement différer la libération du cautionnement en invoquant de simples vérifications internes ?", correction: "Non. L'article 113 impose à l'employeur de donner son accord à la libération du cautionnement dans les trente jours qui suivent la fin du contrat, à moins d'avoir, avant l'expiration de ce délai, introduit une demande en justice pour exercer un privilège sur ce cautionnement, ou d'avoir obtenu du Président du tribunal compétent, sur requête motivée, une autorisation de maintien au-delà de ce délai. En l'absence de toute démarche judiciaire dans le délai de trente jours, de simples vérifications internes non formalisées ne peuvent légalement justifier le refus persistant de l'entreprise, trente-cinq jours après la fin du contrat." },
      { num: 4, enonce: "Si l'entreprise avait, dans le délai de trente jours, obtenu du Président du tribunal une autorisation de maintien du cautionnement au-delà de ce délai, cette autorisation suffirait-elle à elle seule à légitimer indéfiniment le maintien des sommes retenues ?", correction: "Non. L'article 113 précise que cette autorisation ne produit ses effets qu'à la condition d'être suivie d'une demande en justice dans le délai fixé par l'ordonnance qui l'accorde : l'autorisation de maintien n'est donc qu'une mesure provisoire et conditionnelle, destinée à préserver la situation le temps d'introduire l'action au fond, non un blanc-seing permettant à l'employeur de retenir indéfiniment le cautionnement sans jamais saisir le juge sur le fond du litige qui l'oppose au travailleur." },
    ],
  },
  {
    id: 'cp4',
    titre: "La saisie cumulée de la rémunération de M. Ekofo",
    contexte: "M. Ekofo, employé d'une entreprise de Kisangani, perçoit un salaire mensuel net après retenues fiscales et sociales largement supérieur à cinq fois le salaire mensuel minimum interprofessionnel de sa catégorie. Un créancier ordinaire, auquel M. Ekofo doit une somme empruntée pour l'achat d'un véhicule, obtient une saisie-arrêt sur sa rémunération. Simultanément, son ex-épouse obtient une saisie distincte, fondée sur une pension alimentaire due pour leurs deux enfants communs, conformément à une décision judiciaire. L'employeur, chargé d'opérer les retenues correspondantes, s'interroge sur la manière de cumuler ces deux saisies sans excéder les plafonds légaux, et sur la base de calcul à retenir.",
    questions: [
      { num: 1, enonce: "Sur quelle base de calcul l'employeur doit-il déterminer les quotités cessibles et saisissables de la rémunération de M. Ekofo ?", correction: "L'article 114, dernier alinéa, précise que le calcul des quotités cessibles et saisissables se fait après déduction des retenues fiscales et sociales et de l'évaluation forfaitaire du logement telle que définie à l'article 139 du Code. L'employeur ne doit donc pas raisonner sur le salaire brut de M. Ekofo, mais sur le montant obtenu après ces déductions préalables, ce qui réduit d'autant l'assiette sur laquelle s'appliquent ensuite les fractions saisissables." },
      { num: 2, enonce: "Le salaire de M. Ekofo étant largement supérieur à cinq fois le salaire mensuel minimum de sa catégorie, quelles fractions distinctes l'article 114 applique-t-il pour la créance ordinaire du premier créancier ?", correction: "L'article 114 distingue deux tranches pour une créance ordinaire : un cinquième sur la partie de la rémunération n'excédant pas cinq fois le salaire mensuel minimum interprofessionnel de la catégorie de M. Ekofo, et un tiers sur le surplus, c'est-à-dire sur la partie de la rémunération qui dépasse ce seuil. La rémunération de M. Ekofo, supérieure à ce seuil, se voit donc appliquer les deux taux successivement, selon la tranche concernée, et non un taux unique sur l'ensemble de la somme." },
      { num: 3, enonce: "La créance de pension alimentaire de l'ex-épouse obéit-elle au même régime de quotité que la créance ordinaire du premier créancier ?", correction: "Non. L'article 114, deuxième alinéa, prévoit un régime plus favorable au créancier alimentaire : la rémunération est cessible et saisissable à concurrence de deux cinquièmes lorsque la créance est fondée sur une obligation alimentaire légale, un taux qui ne se décompose pas selon les mêmes tranches que la créance ordinaire, mais qui s'applique globalement à ce titre spécifique, reflétant l'importance particulière que le droit accorde à l'obligation alimentaire envers les enfants." },
      { num: 4, enonce: "Les deux saisies, celle du créancier ordinaire et celle fondée sur l'obligation alimentaire, peuvent-elles s'opérer simultanément sur la rémunération de M. Ekofo ?", correction: "Oui. L'article 114, troisième alinéa, prévoit explicitement que la saisie et la cession autorisées pour toute créance et celles autorisées pour cause d'obligation alimentaire légale peuvent s'opérer cumulativement. L'employeur doit donc procéder aux deux retenues en parallèle, chacune calculée selon son propre régime de quotité déjà identifié, sur l'assiette nette de retenues fiscales, sociales et de l'évaluation forfaitaire du logement, sans que l'une des deux saisies n'exclue par principe l'autre." },
    ],
  },
  {
    id: 'cp5',
    titre: "L'économat contesté d'une entreprise minière du Lualaba",
    contexte: "Une entreprise minière du Lualaba, dont le site est éloigné de tout centre commercial, ouvre un économat pour la vente de denrées alimentaires à ses travailleurs, après avoir obtenu l'autorisation requise. Les prix pratiqués sont initialement raisonnables, mais l'entreprise, constatant des difficultés de trésorerie de sa filiale commerciale chargée de gérer l'économat, décide d'y intégrer une marge bénéficiaire significative, sans consulter au préalable la délégation syndicale sur cette évolution des prix. Par ailleurs, la direction du site, pour simplifier la logistique, retient sur le bulletin de paie de chaque travailleur un montant fixe correspondant à des achats obligatoires à l'économat, présentés comme un « forfait de subsistance », que les travailleurs ne peuvent refuser. La comptabilité de l'économat, enfin, est intégrée à celle de la filiale commerciale, sans compte distinct.",
    questions: [
      { num: 1, enonce: "L'obligation faite aux travailleurs de procéder à des achats forfaitaires à l'économat est-elle conforme à l'article 116 ?", correction: "Non. L'article 116 pose comme première condition d'admission de l'économat que les travailleurs ne soient pas obligés de s'y fournir. Le « forfait de subsistance » imposé par prélèvement sur le bulletin de paie, sans possibilité de refus, viole directement cette condition : loin d'être une simple faculté offerte aux travailleurs dans un contexte d'éloignement géographique, il s'agit d'une obligation d'achat déguisée en modalité de paie, précisément ce que le texte entend proscrire." },
      { num: 2, enonce: "L'introduction d'une marge bénéficiaire significative dans les prix de l'économat, sans consultation de la délégation syndicale, respecte-t-elle la deuxième condition de l'article 116 ?", correction: "Non, sur les deux volets de cette condition. L'article 116 exige que la vente des marchandises soit faite à des prix raisonnables établis par l'employeur après avis de la délégation syndicale, en fonction de l'intérêt des travailleurs et à l'exclusion de toute recherche de bénéfice. L'absence de consultation préalable de la délégation syndicale méconnaît la procédure requise, et l'introduction d'une marge bénéficiaire destinée à compenser les difficultés de trésorerie de la filiale commerciale contredit frontalement l'exclusion de toute recherche de bénéfice que le texte impose comme condition de fond." },
      { num: 3, enonce: "L'intégration de la comptabilité de l'économat à celle de la filiale commerciale, sans compte distinct, est-elle conforme au Code ?", correction: "Non. L'article 116, dernière condition, exige que la comptabilité de l'économat soit entièrement autonome, précisément pour permettre de vérifier que l'exploitation ne poursuit aucune recherche de bénéfice et que les prix pratiqués restent raisonnables. Une comptabilité fondue dans celle de la filiale commerciale, sans séparation, rend cette vérification impossible et méconnaît cette troisième condition cumulative, aux côtés des deux premières déjà identifiées comme non respectées." },
      { num: 4, enonce: "Face à ce cumul d'irrégularités, quelle mesure l'article 118 permet-il aux autorités compétentes de prendre à l'égard de cet économat ?", correction: "L'article 118 confie au Ministre ayant le Travail dans ses attributions, ou à son représentant local, le pouvoir d'ordonner, en cas d'abus constaté et sur la base d'un avis de l'Inspecteur du Travail du ressort, la fermeture provisoire ou définitive de l'économat, dans les mêmes conditions procédurales que celles qui ont présidé à son ouverture. Le cumul des trois manquements aux conditions de l'article 116, l'obligation d'achat, la recherche de bénéfice non consultée et l'absence d'autonomie comptable, constitue précisément le type d'abus que cette disposition entend sanctionner, indépendamment du fait que l'économat ait initialement été ouvert avec l'autorisation requise." },
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

export default function UE1Chapitre5Page() {
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
            { label: 'Chapitre 5' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={cn('font-display text-lg font-bold leading-tight', ENCRE)}>La rémunération : salaire, SMIG et sa protection</h1>
          <InfoTooltip texte="Détermination et paiement du salaire, salaire minimum interprofessionnel garanti, paiement en cas de maladie, garanties et retenues, économats." loi="Titre V, art. 86 à 118" />
        </div>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Titre V du Code du travail · Loi n°015/2002, art. 86 à 118 · Décret n°25/22 du 30 mai 2025</p>
      </div>

      {vue === 'lecture' && (
        <div className={cn('rounded-sm border p-4 space-y-1', PAPIER_CARD, LIGNE)}>
          {[
            "Maîtriser le principe d'égalité de rémunération et les modalités de détermination du salaire",
            "Connaître le mécanisme de fixation du salaire minimum interprofessionnel garanti et ses montants actuels",
            "Maîtriser les règles de paiement du salaire : forme, périodicité, décompte",
            "Connaître le régime du salaire en cas de maladie ou d'accident, professionnel ou non",
            "Maîtriser les garanties de la créance de salaire, les retenues autorisées et le régime des économats",
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
                ['s1', '5.1 La détermination du salaire'],
                ['s2', '5.2 Le salaire minimum interprofessionnel'],
                ['s3', '5.3 Le mode de paiement'],
                ['s4', '5.4 Maladie et accident'],
                ['s5', '5.5 Garanties et retenues'],
                ['s6', '5.6 Les économats'],
              ].map(([id, label]) => (
                <a key={id} href={`#${id}`} className={cn('block text-xs leading-snug py-1.5 pl-3 border-l-2', LIGNE, ENCRE_FAIBLE, 'hover:text-[#1E4A3D] hover:border-[#1E4A3D] transition-colors')}>{label}</a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-14">
            {/* 5.1 */}
            <section id="s1" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.1</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>La détermination du salaire</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le Titre V ouvre le régime de la rémunération sur un principe d'égalité : l'article 86 impose un salaire égal pour tous les travailleurs, à conditions égales de travail, de qualification professionnelle et de rendement, quels que soient leur origine, leur sexe et leur âge. Ce principe, prolongement direct des garanties anti-discriminatoires déjà rencontrées au chapitre 4 à propos du licenciement, s'étend au travail à la tâche ou aux pièces, dont la rémunération doit procurer au travailleur de capacité moyenne un salaire au moins égal à celui du travailleur rémunéré au temps pour un travail analogue. Le même article pose cependant un principe inverse de celui souvent supposé : aucun salaire n'est dû en cas d'absence, sauf les cas prévus par la législation ou la réglementation et sauf accord entre les parties, qui restent libres de convenir d'un régime plus favorable.</p>
                <p>La rémunération elle-même est fixée par des contrats individuels librement conclus ou par voie de conventions collectives, mais cette liberté rencontre une limite impérative à l'article 88 : est nulle de plein droit toute clause fixant une rémunération inférieure aux salaires minima interprofessionnels garantis. L'article 89 impose en outre que la rémunération soit stipulée en monnaie ayant cours légal en République Démocratique du Congo, déterminée à l'heure, à la journée, à la semaine, au mois, à la pièce ou à la tâche selon le choix des parties, tandis que l'article 90 impose à l'employeur d'appliquer une classification couvrant tous les emplois, de l'exécution jusqu'au cadre de collaboration.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>À défaut de rémunération convenue</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>L'article 92 comble le silence des parties : à défaut de preuve d'une rémunération convenue, l'employeur doit la rémunération déterminée par la convention collective applicable ou, à défaut, par le décret fixant les salaires minima, ou par les usages du lieu d'exécution, compte tenu de la nature du travail, de la qualification et de l'ancienneté du travailleur.</p>
                </div>
              </div>
            </section>

            {/* 5.2 */}
            <section id="s2" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.2</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Le salaire minimum interprofessionnel garanti</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le mécanisme de fixation du salaire minimum interprofessionnel garanti, ou SMIG, repose sur une procédure à trois étages : un décret du Président de la République, pris sur proposition du Ministre ayant le Travail dans ses attributions, après avis du Conseil National du Travail (articles 87 et 96). L'article 91 institue une zone unique du SMIG sur l'ensemble du territoire, sous la seule réserve de dispositions spécifiques pouvant alléger les difficultés des secteurs agro-industriel et pastoral. Le salaire de la première catégorie professionnelle, base de l'échelle barémique évoquée à l'article 94, est fixé en fonction des besoins essentiels d'une famille du travailleur comprenant le père, la mère et les enfants à charge, déterminés après enquêtes périodiques menées dans chaque province et à Kinshasa (article 95). Kabamba souligne, à propos de cette procédure, que le SMIG congolais occupe une fonction double, à la fois norme juridique impérative et instrument de politique économique, dont l'ajustement périodique reste néanmoins tributaire de la volonté gouvernementale de mettre en œuvre l'indexation prévue à l'article 97.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Le SMIG en vigueur : Décret n°25/22 du 30 mai 2025</p>
                  <table className="w-full text-xs border-collapse mt-2">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Période</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>SMIG journalier (manœuvre)</th></tr></thead>
                    <tbody>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>2018 à mai 2025 (montant historique)</td><td className={cn('p-2 border', LIGNE)}>7 075 FC</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Dès la paie de mai 2025 (palier transitoire)</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>14 500 FC</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Dès la paie de janvier 2026 (montant plein, en vigueur)</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>21 500 FC</td></tr>
                    </tbody>
                  </table>
                  <p className={cn('text-xs mt-2', ENCRE_DOUX)}>Le décret organise également le montant des allocations familiales minima, fixées à un vingt-septième du SMIG par enfant à charge, et de la contre-valeur du logement, fixée à un cinquième des allocations familiales. Une entrée en application progressive de cette nature, par paliers successifs, doit être distinguée d'une simple annonce : seul le texte réglementaire publié fait foi de la date exacte et du montant applicable à un exercice de paie donné.</p>
                </div>
                <p>L'article 97 organise l'indexation des salaires minima sur l'évolution de l'indice des prix à la consommation, dans les modalités que détermine le décret de l'article 96. Cette mécanique d'ajustement périodique, qui explique l'écart considérable entre le montant de 7 075 FC fixé en 2018 et celui de 21 500 FC applicable depuis janvier 2026, soit une hausse de plus de 200 % en sept ans, illustre concrètement la fonction protectrice du salaire minimum face à l'érosion monétaire, sans que cette indexation ne soit pour autant automatique ou continue : chaque ajustement requiert un nouveau décret présidentiel.</p>
              </div>
            </section>

            {/* 5.3 */}
            <section id="s3" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.3</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Le mode de paiement du salaire</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>L'article 98 impose que la rémunération soit payée en espèces, pendant les heures de travail, au temps et au lieu convenus, et interdit le paiement dans un débit de boissons ou un magasin de vente, sauf pour les travailleurs qui y sont employés. Ce même article interdit à l'employeur de restreindre de quelque manière que ce soit la liberté du travailleur de disposer de sa rémunération à son gré, une garantie de libre disposition qui prolonge la protection du salaire au-delà du seul montant versé.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Les délais de paiement de l'article 99, à ne pas confondre</p>
                  <table className="w-full text-xs border-collapse mt-2">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Nature de la somme</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Délai de paiement</th></tr></thead>
                    <tbody>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Rémunération périodique ordinaire</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>6 jours après la période concernée</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Commissions trimestrielles</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>3 mois après la fin du trimestre</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Participations aux bénéfices</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>9 mois après l'exercice</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Décompte final (fin du contrat)</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>2 jours ouvrables (art. 100)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>Le paiement en nature reste, par principe, interdit (article 101), sauf les hypothèses des articles 138 et 139 relatives aux avantages en nature. L'employeur doit remettre au travailleur, au moment du paiement, un décompte écrit de la rémunération payée (article 103) ; à défaut, ses allégations sur les paiements effectués sont rejetées, sauf preuve contraire à sa charge. L'article 104 protège enfin le travailleur d'une pratique répandue, déjà rencontrée au chapitre 4 à propos de la quittance pour solde de tout compte : l'acceptation sans réserve d'un décompte, même signée, n'emporte aucune renonciation à ses droits, ni ne vaut compte arrêté et réglé.</p>
              </div>
            </section>

            {/* 5.4 */}
            <section id="s4" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.4</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Le paiement en cas de maladie ou d'accident</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Lorsque le travailleur est dans l'incapacité de fournir ses services par suite de maladie ou d'accident ordinaire, l'article 105 lui maintient, pendant toute la durée de la suspension du contrat déjà étudiée au chapitre 3, les deux tiers de la rémunération en espèces et la totalité des allocations familiales, ainsi que le droit aux avantages contractuels en nature, sauf demande de contre-valeur en espèces, le logement ne pouvant toutefois jamais être ainsi remplacé. Lorsque la maladie ou l'accident est réputé maladie professionnelle ou accident du travail au sens de la réglementation de la sécurité sociale, l'article 106 maintient le même taux des deux tiers pendant les six premiers mois de la suspension, mais autorise l'employeur à déduire mensuellement les sommes versées au travailleur par l'Institut National de Sécurité Sociale, sur pièces justificatives vérifiées par cet Institut.</p>
                <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>Le risque spécial, une exclusion totale d'indemnisation</p>
                  <p className={cn('text-xs italic', ENCRE_DOUX)}>Aucune somme ni avantage n'est dû lorsque la maladie ou l'accident résulte d'un risque spécial auquel le travailleur s'est volontairement exposé en connaissance du danger, ou d'une négligence à utiliser les services médicaux disponibles. L'article 108 énumère limitativement ces risques spéciaux : infraction ayant entraîné une condamnation définitive, sport dangereux hors compétitions organisées par l'employeur, excès de boisson ou de drogue, faute intentionnelle, travaux pour compte d'un tiers, ou faits de guerre et de troubles, sauf lorsque l'accident survient par le fait ou à l'occasion du travail lui-même.</p>
                </div>
              </div>
            </section>

            {/* 5.5 */}
            <section id="s5" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.5</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Garanties de la créance de salaire, retenues et saisies</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>Le Code protège la créance de salaire du travailleur par un double dispositif de garantie. D'une part, l'article 109 interdit que les sommes dues aux employeurs soient frappées de saisie-arrêt ou d'opposition au préjudice des travailleurs auxquels des salaires sont dus, une protection qui vise les créanciers de l'employeur lui-même. D'autre part, l'article 110 confère aux travailleurs, en cas de faillite ou de liquidation judiciaire, un rang de créanciers privilégiés sur tous les autres créanciers, y compris le Trésor Public, ce privilège s'exerçant sur l'ensemble des biens meubles et immeubles de l'employeur, pour les salaires dus au titre de services antérieurs à la procédure.</p>
                <p>Le pouvoir de l'employeur d'opérer des retenues sur salaire reste, à l'inverse, strictement encadré. L'article 111 frappe de nullité toute clause attribuant à l'employeur le droit d'infliger des amendes, et l'article 112 fait de même pour toute réduction de rémunération à titre de dommages-intérêts, tout en énumérant limitativement les retenues autorisées : retenues fiscales, cotisation à l'Institut National de Sécurité Sociale, avances, indemnités compensatoires ou cautionnement liés à l'obligation de l'article 52, prêts, et saisie-arrêt. Le cautionnement fait l'objet d'un régime de protection propre à l'article 113 : l'employeur doit accepter sa libération dans les trente jours suivant la fin du contrat, sauf demande en justice introduite dans ce délai ou autorisation judiciaire de maintien.</p>
                <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
                  <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Les quotités saisissables et cessibles de l'article 114</p>
                  <table className="w-full text-xs border-collapse mt-2">
                    <thead><tr className={VERT_SOFT}><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Nature de la créance</th><th className={cn('text-left p-2 border font-semibold', LIGNE)}>Quotité maximale</th></tr></thead>
                    <tbody>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Créance ordinaire, jusqu'à 5 fois le SMIG mensuel</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>Un cinquième</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Créance ordinaire, au-delà de ce seuil</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>Un tiers</td></tr>
                      <tr className="even:bg-black/[.02]"><td className={cn('p-2 border', LIGNE)}>Obligation alimentaire légale</td><td className={cn('p-2 border font-semibold', LIGNE, VERT)}>Deux cinquièmes</td></tr>
                    </tbody>
                  </table>
                  <p className={cn('text-xs mt-2', ENCRE_DOUX)}>Ces deux catégories de saisie peuvent s'opérer cumulativement, le calcul se faisant après déduction des retenues fiscales, sociales et de l'évaluation forfaitaire du logement.</p>
                </div>
              </div>
            </section>

            {/* 5.6 */}
            <section id="s6" className="scroll-mt-16">
              <div className="flex items-baseline gap-3 mb-4">
                <span className={cn('font-serif font-bold text-sm', VERT)}>5.6</span>
                <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Les économats</h2>
              </div>
              <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                <p className={LETTRINE}>L'économat, défini à l'article 115 comme toute organisation où l'employeur pratique la vente ou la cession de denrées alimentaires et de marchandises de première nécessité aux travailleurs exclusivement, répond à un besoin fréquent dans les sites industriels ou miniers éloignés de tout centre commercial. Le Code l'admet, mais sous une triple condition cumulative posée à l'article 116 : les travailleurs ne doivent pas être obligés de s'y fournir, la vente doit se faire à des prix raisonnables établis après avis de la délégation syndicale et à l'exclusion de toute recherche de bénéfice, et la comptabilité de l'économat doit rester entièrement autonome.</p>
                <p>Ces conditions de fond s'accompagnent d'exigences de transparence et de contrôle : les prix doivent être affichés lisiblement et communiqués à l'Inspecteur du Travail du ressort, et la vente comme la consommation d'alcools, de spiritueux, de tabacs ou de toute forme de drogue y sont interdites, ainsi que sur les lieux d'emploi en général (article 117). L'ouverture d'un économat est soumise à autorisation ministérielle préalable, après avis de l'Inspecteur du Travail, cette ouverture pouvant même être imposée à une entreprise sur proposition de cet inspecteur ; en cas d'abus constaté, l'article 118 permet d'en ordonner la fermeture provisoire ou définitive, dans les mêmes conditions procédurales que celles requises pour l'ouverture.</p>
              </div>
            </section>

            {/* à retenir */}
            <div className={cn('pt-8 border-t-2', 'border-[#262019]')}>
              <p className={cn('font-serif font-bold text-base mb-4', ENCRE)}>À retenir</p>
              <ul className="space-y-0">
                {[
                  "Le salaire est égal pour tous à conditions égales de travail, de qualification et de rendement ; toute clause fixant une rémunération inférieure au SMIG est nulle de plein droit.",
                  "Le SMIG, fixé par décret présidentiel après avis du Conseil National du Travail, s'établit en zone unique et est actuellement de 21 500 FC par jour depuis la paie de janvier 2026 (Décret n°25/22 du 30 mai 2025), contre 7 075 FC entre 2018 et 2025.",
                  "Le paiement du salaire obéit à des délais stricts et différenciés : six jours pour la rémunération ordinaire, trois mois pour les commissions trimestrielles, neuf mois pour les participations aux bénéfices, deux jours ouvrables pour le décompte final.",
                  "En cas de maladie ou d'accident, le travailleur conserve les deux tiers de sa rémunération en espèces et la totalité des allocations familiales ; le risque spécial, limitativement énuméré, exclut toute indemnisation.",
                  "Les travailleurs bénéficient d'un privilège de premier rang sur les biens de l'employeur en cas de faillite ; les retenues sur salaire sont limitativement énumérées, et la rémunération n'est saisissable qu'à hauteur d'un cinquième à un tiers selon la tranche, deux cinquièmes pour une créance alimentaire.",
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
                  <>Kabamba G., « Le Salaire Minimum Interprofessionnel Garanti (SMIG) : entre norme juridique et instrument économique », <i>Village Justice</i>, note professionnelle en ligne.</>,
                  <>Décret n°25/22 du 30 mai 2025 portant fixation du salaire minimum interprofessionnel garanti, des allocations familiales minima et de la contre-valeur du logement, Journal officiel de la République Démocratique du Congo.</>,
                  <>Loko Mantuono G., <i>Droit social, droit du travail et de la sécurité sociale en RDC</i>, L'Harmattan, Paris, 2022.</>,
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
              <GraduationCap className="h-4 w-4" /> Terminer le chapitre 5
            </button>

            <p className="text-xs text-center text-muted-foreground/60 pb-2">
              Sources : Loi n°015/2002 du 16 octobre 2002 portant Code du travail, art. 86 à 118 · Décret n°25/22 du 30 mai 2025
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
            chapitreId="ue1-chapitre-5"
            chapitreNom="Chapitre 5 : La rémunération (salaire, SMIG et sa protection)"
            questions={QCM_CHAPITRE}
            coursId="ue1-droit-travail"
            casPratiquesExistants={casPratiquesExistants}
          />
        </div>
      )}
    </div>
  )
}
