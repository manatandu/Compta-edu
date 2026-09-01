import type { Chapitre } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// UE 13 — CHAPITRE 3 : IAS 36 ET IAS 40
// Dépréciation d'actifs et immeubles de placement.
// Contenu vérifié sur le texte officiel des deux normes (traduction française,
// IFRS Foundation). Corrections apportées lors de la migration : la hiérarchie
// de détermination de la juste valeur diminuée des coûts de sortie (anciens
// §25 à 27 d'IAS 36) est supprimée depuis IFRS 13 ; le début d'occupation par
// le propriétaire est le §57(a) d'IAS 40 (non le §57(b)) ; l'obligation
// d'indiquer la juste valeur en annexe sous le modèle du coût relève du
// §79(e) d'IAS 40 (non du §56).
// ─────────────────────────────────────────────────────────────────────────────

const QCM: Chapitre['qcm'] = [
  {
    id: 'q1',
    question: "Selon IAS 36 §18, la valeur recouvrable d'un actif est définie comme :",
    options: [
      { id: 'a', texte: "La valeur comptable nette à la date de clôture" },
      { id: 'b', texte: "Le montant le plus élevé entre la juste valeur diminuée des coûts de sortie et la valeur d'utilité" },
      { id: 'c', texte: "Le montant le plus bas entre la juste valeur et la valeur d'utilité" },
      { id: 'd', texte: "Le coût historique diminué du cumul des amortissements" },
      { id: 'e', texte: "La valeur liquidative de l'actif à la date de clôture" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §18 définit la valeur recouvrable comme le montant le plus élevé entre la juste valeur diminuée des coûts de sortie (JVN) et la valeur d'utilité (VU). On retient le maximum car l'entité choisira l'option la plus avantageuse entre vendre l'actif et continuer à l'utiliser.",
    articleRef: "IAS 36 §18 — IFRS Foundation",
  },
  {
    id: 'q2',
    question: "Pour quels actifs IAS 36 impose-t-elle un test de dépréciation annuel obligatoire, indépendamment de tout indice ?",
    options: [
      { id: 'a', texte: "Toutes les immobilisations corporelles amorties" },
      { id: 'b', texte: "Les stocks et les actifs financiers" },
      { id: 'c', texte: "Le goodwill, les immobilisations incorporelles à durée d'utilité indéterminée et celles qui ne sont pas encore prêtes à être mises en service" },
      { id: 'd', texte: "Uniquement le goodwill issu de regroupements d'entreprises" },
      { id: 'e', texte: "Les immeubles de placement évalués au modèle du coût" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36 §10 impose un test annuel obligatoire pour : (a) les immobilisations incorporelles à durée d'utilité indéterminée et celles qui ne sont pas encore prêtes à être mises en service — le test pouvant être effectué à tout moment de l'exercice, mais au même moment chaque année — et (b) le goodwill acquis dans un regroupement d'entreprises. Pour tous les autres actifs, le test n'est déclenché qu'en présence d'un indice (§9).",
    articleRef: "IAS 36 §9-10 — IFRS Foundation",
  },
  {
    id: 'q3',
    question: "Selon IAS 40 §5, un immeuble de placement est un bien immobilier détenu :",
    options: [
      { id: 'a', texte: "Pour être utilisé dans la production ou la fourniture de biens ou de services" },
      { id: 'b', texte: "Pour être vendu dans le cadre de l'activité ordinaire de l'entité" },
      { id: 'c', texte: "Pour en retirer des loyers ou pour réaliser une plus-value en capital, ou les deux" },
      { id: 'd', texte: "Exclusivement pour être loué à des filiales du groupe" },
      { id: 'e', texte: "Pour être utilisé à des fins administratives par la direction" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 40 §5 définit l'immeuble de placement comme un bien immobilier (terrain ou bâtiment, ou partie, ou les deux) détenu — par le propriétaire ou, en tant qu'actif au titre du droit d'utilisation, par le preneur — pour en retirer des loyers ou valoriser le capital, plutôt que pour l'utiliser dans la production, la fourniture de biens ou services ou à des fins administratives, ou le vendre dans le cadre de l'activité ordinaire.",
    articleRef: "IAS 40 §5 — IFRS Foundation",
  },
  {
    id: 'q4',
    question: "En cas de dépréciation d'un actif évalué au coût historique, où est comptabilisée la perte de valeur selon IAS 36 §60 ?",
    options: [
      { id: 'a', texte: "En autres éléments du résultat global, sans jamais toucher le résultat net" },
      { id: 'b', texte: "Directement en résultat net de la période" },
      { id: 'c', texte: "En réserves dans les capitaux propres" },
      { id: 'd', texte: "En déduction de la valeur brute de l'actif, sans écriture de charge" },
      { id: 'e', texte: "En report à nouveau déficitaire" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §60 est explicite : la perte de valeur est immédiatement comptabilisée en résultat net, sauf si l'actif est comptabilisé à son montant réévalué selon une autre norme — auquel cas elle est traitée comme une réévaluation négative (§61 : imputation d'abord sur l'écart de réévaluation en autres éléments du résultat global, puis en résultat net).",
    articleRef: "IAS 36 §60 — IFRS Foundation",
  },
  {
    id: 'q5',
    question: "Avec le modèle de la juste valeur d'IAS 40, comment sont traitées les variations de juste valeur d'un immeuble de placement ?",
    options: [
      { id: 'a', texte: "Elles sont comptabilisées en autres éléments du résultat global" },
      { id: 'b', texte: "Elles sont portées en écart de réévaluation dans les capitaux propres" },
      { id: 'c', texte: "Elles sont comptabilisées en résultat net de la période où elles se produisent" },
      { id: 'd', texte: "Seuls les gains sont comptabilisés ; les pertes restent en capitaux propres" },
      { id: 'e', texte: "Elles sont différées et amorties sur la durée résiduelle de l'actif" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 40 §35 dispose que le profit ou la perte résultant d'une variation de la juste valeur d'un immeuble de placement est comptabilisé en résultat net de la période où il se produit. Contrairement au modèle de la réévaluation d'IAS 16, il n'y a pas de passage par les autres éléments du résultat global.",
    articleRef: "IAS 40 §35 — IFRS Foundation",
  },
  {
    id: 'q6',
    question: "Selon IAS 36 §6, une unité génératrice de trésorerie (UGT) est définie comme :",
    options: [
      { id: 'a', texte: "L'ensemble des actifs d'une entité générant collectivement des flux" },
      { id: 'b', texte: "Le plus petit groupe identifiable d'actifs générant des entrées de trésorerie largement indépendantes de celles d'autres actifs" },
      { id: 'c', texte: "Un secteur opérationnel au sens d'IFRS 8" },
      { id: 'd', texte: "Un groupe d'actifs dont les flux sont liés à ceux d'autres groupes" },
      { id: 'e', texte: "Tout actif individuel pouvant faire l'objet d'un test de dépréciation" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §6 définit l'UGT comme le plus petit groupe identifiable d'actifs qui génère des entrées de trésorerie provenant d'une utilisation continue, largement indépendantes des entrées générées par d'autres actifs ou groupes d'actifs. Le critère d'indépendance des flux est fondamental — un secteur IFRS 8 n'est qu'un plafond pour l'affectation du goodwill (§80(b)), pas la définition de l'UGT.",
    articleRef: "IAS 36 §6 — IFRS Foundation",
  },
  {
    id: 'q7',
    question: "IAS 36 §117 plafonne la reprise d'une perte de valeur sur un actif isolé. Ce plafond est :",
    options: [
      { id: 'a', texte: "Le montant exact de la perte initialement comptabilisée" },
      { id: 'b', texte: "La valeur comptable qui aurait été déterminée, nette des amortissements, si aucune perte de valeur n'avait été comptabilisée" },
      { id: 'c', texte: "La valeur de marché de l'actif à la date de reprise" },
      { id: 'd', texte: "Le coût historique de l'actif, sans déduction d'amortissement" },
      { id: 'e', texte: "La valeur recouvrable calculée à la date de reprise, majorée de 10 %" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §117 : la valeur comptable après reprise ne peut pas excéder la valeur comptable qui aurait été déterminée — nette des amortissements — si aucune perte de valeur n'avait été comptabilisée au cours des exercices antérieurs. Tout excédent au-delà de ce plafond serait une réévaluation, relevant de la norme applicable à l'actif (§118).",
    articleRef: "IAS 36 §117 — IFRS Foundation",
  },
  {
    id: 'q8',
    question: "Selon IAS 36 §104, dans quel ordre une perte de valeur identifiée au niveau d'une UGT avec goodwill est-elle imputée ?",
    options: [
      { id: 'a', texte: "D'abord sur les actifs identifiables au prorata, puis sur le goodwill" },
      { id: 'b', texte: "D'abord sur le goodwill, puis sur les autres actifs au prorata de leur valeur comptable" },
      { id: 'c', texte: "Uniquement sur le goodwill, les autres actifs ne pouvant jamais être dépréciés" },
      { id: 'd', texte: "Sur l'actif ayant la valeur comptable la plus élevée en premier" },
      { id: 'e', texte: "Uniformément sur tous les actifs sans distinction, y compris le goodwill" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §104 prescrit une cascade : la perte réduit d'abord le goodwill affecté à l'UGT, puis le solde est réparti entre les autres actifs de l'unité au prorata de leur valeur comptable. Le §105 pose un plancher : aucun actif ne peut être ramené en dessous du plus élevé de sa juste valeur diminuée des coûts de sortie, de sa valeur d'utilité et de zéro — le reliquat étant réalloué au prorata aux autres actifs.",
    articleRef: "IAS 36 §104-105 — IFRS Foundation",
  },
  {
    id: 'q9',
    question: "Dans la détermination de la valeur d'utilité, quels flux sont expressément exclus par IAS 36 ?",
    options: [
      { id: 'a', texte: "Les flux d'entretien courant nécessaires au maintien de l'actif en état" },
      { id: 'b', texte: "Les flux nets de la sortie de l'actif à la fin de sa durée d'utilité" },
      { id: 'c', texte: "Les flux liés aux restructurations futures non engagées ou aux améliorations de performance (§44-48), ainsi que les flux de financement et d'impôt sur le résultat (§50)" },
      { id: 'd', texte: "Les flux provenant de l'utilisation continue de l'actif dans son état actuel" },
      { id: 'e', texte: "Les flux en monnaie étrangère, qui ne peuvent jamais entrer dans le calcul" },
    ],
    reponseCorrecte: 'c',
    explication: "Les flux de trésorerie sont estimés pour l'actif dans son état actuel : IAS 36 §44 à 48 excluent les entrées et sorties attendues d'une restructuration future dans laquelle l'entité ne s'est pas encore engagée, et celles d'une amélioration ou d'un accroissement de la performance de l'actif. Le §50 exclut par ailleurs les flux provenant d'activités de financement et ceux liés à l'impôt sur le résultat. En revanche, les sorties de maintien du niveau d'avantages (§49) et les flux nets de la sortie in fine (§39(c)) sont inclus.",
    articleRef: "IAS 36 §44-50 — IFRS Foundation",
  },
  {
    id: 'q10',
    question: "Quelle obligation d'information s'applique aux entités ayant choisi le modèle du coût pour leurs immeubles de placement ?",
    options: [
      { id: 'a', texte: "Réévaluer annuellement leurs immeubles à la juste valeur et comptabiliser la variation" },
      { id: 'b', texte: "Indiquer la juste valeur de leurs immeubles de placement en annexe (IAS 40 §79(e))" },
      { id: 'c', texte: "Soumettre leurs immeubles à un test IAS 36 tous les cinq ans au minimum" },
      { id: 'd', texte: "Être dispensées de tout test de dépréciation IAS 36" },
      { id: 'e', texte: "Transférer leurs immeubles en stocks dès qu'une baisse de juste valeur est identifiée" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40 §32 impose à toutes les entités d'évaluer la juste valeur de leurs immeubles de placement — soit pour l'évaluation (modèle de la juste valeur), soit pour l'information à fournir (modèle du coût). Sous le modèle du coût, c'est le §79(e) qui exige d'indiquer cette juste valeur en annexe. Le §56 se borne à renvoyer, pour l'évaluation, à IFRS 5, IFRS 16 ou au modèle du coût d'IAS 16 selon le cas.",
    articleRef: "IAS 40 §32 et §79(e) — IFRS Foundation",
  },
  {
    id: 'q11',
    question: "Une entité détient une machine de valeur comptable 700 000, de juste valeur de marché 690 000 (coûts de sortie 10 000) et de valeur d'utilité 760 000. Selon IAS 36, quelle conclusion s'impose ?",
    options: [
      { id: 'a', texte: "Dépréciation de 10 000 car la juste valeur est inférieure à la valeur comptable" },
      { id: 'b', texte: "Dépréciation de 20 000 car la valeur comptable dépasse la juste valeur nette" },
      { id: 'c', texte: "Aucune dépréciation : la valeur recouvrable est de 760 000, supérieure à la valeur comptable de 700 000" },
      { id: 'd', texte: "Dépréciation de 700 000 car l'actif vaut moins que sa juste valeur" },
      { id: 'e', texte: "Le test IAS 36 ne s'applique pas lorsqu'il existe un marché actif" },
    ],
    reponseCorrecte: 'c',
    explication: "C'est le piège classique d'IAS 36. Valeur recouvrable = max(JVN ; VU) = max(680 000 ; 760 000) = 760 000. Puisque la valeur comptable (700 000) est inférieure à la valeur recouvrable (760 000), aucune dépréciation n'est requise : une juste valeur inférieure à la valeur comptable ne suffit pas à déclencher une perte si la valeur d'utilité reste supérieure.",
    articleRef: "IAS 36 §18-19 — IFRS Foundation",
  },
  {
    id: 'q12',
    question: "Une perte de valeur de 45 000 est constatée sur un actif réévalué dont l'écart de réévaluation en capitaux propres s'élève à 30 000. Comment est traitée la perte selon IAS 36 §60-61 ?",
    options: [
      { id: 'a', texte: "45 000 en résultat net : l'écart de réévaluation ne peut jamais absorber une dépréciation" },
      { id: 'b', texte: "30 000 en autres éléments du résultat global (imputation sur l'écart) et 15 000 en résultat net" },
      { id: 'c', texte: "45 000 en autres éléments du résultat global, l'écart étant toujours suffisant" },
      { id: 'd', texte: "15 000 en résultat net et 30 000 reportés à la clôture suivante" },
      { id: 'e', texte: "30 000 en résultat net et 15 000 en autres éléments du résultat global" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §60-61 : pour un actif réévalué, la perte de valeur est traitée comme une réévaluation négative — elle est comptabilisée en autres éléments du résultat global à hauteur de l'écart de réévaluation existant pour ce même actif (30 000), puis le solde (15 000) est comptabilisé en résultat net.",
    articleRef: "IAS 36 §60-61 — IFRS Foundation",
  },
  {
    id: 'q13',
    question: "En N+3, la valeur recouvrable d'une UGT dont le goodwill avait été intégralement déprécié en N augmente fortement. Quelle est la règle applicable ?",
    options: [
      { id: 'a', texte: "La reprise est obligatoire et comptabilisée intégralement en résultat" },
      { id: 'b', texte: "La reprise est possible, mais plafonnée à la valeur comptable sans dépréciation" },
      { id: 'c', texte: "La reprise de la perte de valeur du goodwill est interdite, quelle que soit la hausse de la valeur recouvrable" },
      { id: 'd', texte: "La reprise du goodwill est possible si un expert indépendant l'atteste" },
      { id: 'e', texte: "La reprise est différée de cinq ans par prudence" },
    ],
    reponseCorrecte: 'c',
    explication: "IAS 36 §124 édicte une interdiction absolue : une perte de valeur comptabilisée pour un goodwill ne doit pas être reprise lors d'une période ultérieure. Le §125 en donne la raison : toute augmentation ultérieure de la valeur recouvrable correspondrait vraisemblablement à un goodwill généré en interne — dont IAS 38 §48 interdit la comptabilisation en tant qu'actif.",
    articleRef: "IAS 36 §124-125 ; IAS 38 §48 — IFRS Foundation",
  },
  {
    id: 'q14',
    question: "Une entité applique le modèle de la juste valeur d'IAS 40. Au 31/12/N, la juste valeur de son immeuble est de 4 300 000 (coût d'acquisition en N−1 : 5 000 000). Quelle est l'écriture correcte ?",
    options: [
      { id: 'a', texte: "Débit Dotation aux amortissements 125 000 / Crédit Amortissements cumulés 125 000" },
      { id: 'b', texte: "Débit Pertes sur variation de juste valeur 700 000 / Crédit Immeuble de placement 700 000" },
      { id: 'c', texte: "Débit Immeuble de placement 700 000 / Crédit Gains sur variation de juste valeur 700 000" },
      { id: 'd', texte: "Débit Écart de réévaluation 700 000 / Crédit Immeuble de placement 700 000" },
      { id: 'e', texte: "Aucune écriture : le modèle de la juste valeur interdit de constater les pertes" },
    ],
    reponseCorrecte: 'b',
    explication: "Sous le modèle de la juste valeur : aucun amortissement, et toute variation passe en résultat net (IAS 40 §35). La baisse est de 5 000 000 − 4 300 000 = 700 000 : débit Pertes sur variation de juste valeur 700 000, crédit Immeuble de placement 700 000. Ce n'est pas un écart de réévaluation en capitaux propres, mais bien une charge du résultat net.",
    articleRef: "IAS 40 §33 et §35 — IFRS Foundation",
  },
  {
    id: 'q15',
    question: "Selon IAS 36 §55, le taux d'actualisation utilisé pour calculer la valeur d'utilité doit être :",
    options: [
      { id: 'a', texte: "Le taux d'endettement moyen de l'entité après impôt" },
      { id: 'b', texte: "Un taux avant impôt reflétant les appréciations actuelles du marché de la valeur temps de l'argent et des risques spécifiques à l'actif" },
      { id: 'c', texte: "Le taux directeur de la banque centrale du pays de l'entité" },
      { id: 'd', texte: "Le taux de rendement de l'actif calculé sur les flux historiques réalisés" },
      { id: 'e', texte: "Le coût moyen pondéré du capital après impôt de l'entité, sans ajustement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §55 : le taux d'actualisation est un taux avant impôt reflétant (a) la valeur temps de l'argent et (b) les risques spécifiques à l'actif pour lesquels les flux n'ont pas déjà été ajustés — sans refléter deux fois les mêmes risques (§56). À défaut de taux directement observable, le §56 renvoie au taux implicite de transactions actuelles sur des actifs similaires ou au coût moyen pondéré du capital d'une entité cotée comparable ; l'annexe A cite le MEDAF et le taux d'emprunt marginal comme points de départ, à ajuster.",
    articleRef: "IAS 36 §55-57 et annexe A — IFRS Foundation",
  },
  {
    id: 'q16',
    question: "La juste valeur diminuée des coûts de sortie d'un actif excède déjà sa valeur comptable. Faut-il encore calculer la valeur d'utilité ?",
    options: [
      { id: 'a', texte: "Oui, les deux montants doivent toujours être déterminés" },
      { id: 'b', texte: "Non : si l'un des deux montants excède la valeur comptable, l'actif n'est pas déprécié et il est inutile d'estimer l'autre" },
      { id: 'c', texte: "Oui, mais uniquement pour les actifs incorporels" },
      { id: 'd', texte: "Non, car la valeur d'utilité est toujours inférieure à la juste valeur" },
      { id: 'e', texte: "Oui, car la valeur recouvrable est la moyenne des deux montants" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §19 : il n'est pas toujours nécessaire de déterminer à la fois la juste valeur diminuée des coûts de sortie et la valeur d'utilité — si l'un de ces montants est supérieur à la valeur comptable, l'actif ne s'est pas déprécié et il est inutile d'estimer l'autre. C'est une simplification pratique importante du test.",
    articleRef: "IAS 36 §19 — IFRS Foundation",
  },
  {
    id: 'q17',
    question: "Sur quelle période maximale les projections de flux de trésorerie fondées sur les budgets de la direction doivent-elles porter pour le calcul de la valeur d'utilité ?",
    options: [
      { id: 'a', texte: "Trois ans, sans exception possible" },
      { id: 'b', texte: "Cinq ans au maximum, sauf si une période plus longue peut être justifiée ; au-delà, extrapolation par un taux stable ou décroissant" },
      { id: 'c', texte: "Dix ans dans tous les cas" },
      { id: 'd', texte: "La durée d'utilité totale de l'actif, obligatoirement budgétée année par année" },
      { id: 'e', texte: "Aucune limite : la direction projette librement" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §33(b) : les projections reposent sur les budgets et prévisions financières les plus récents approuvés par la direction, couvrant une période d'une durée maximale de cinq ans, sauf si une période plus longue peut être justifiée. Au-delà, le §33(c) impose une extrapolation par un taux de croissance stable ou décroissant, n'excédant pas le taux de croissance moyen à long terme des produits, secteurs, pays ou marchés concernés, sauf justification.",
    articleRef: "IAS 36 §33 et §35-37 — IFRS Foundation",
  },
  {
    id: 'q18',
    question: "Une entité décide de vendre un immeuble de placement sans réaliser d'aménagement préalable. Selon IAS 40, ce bien :",
    options: [
      { id: 'a', texte: "Est immédiatement reclassé en stocks du fait de l'intention de vente" },
      { id: 'b', texte: "Reste un immeuble de placement jusqu'à sa décomptabilisation : un changement d'intention ne constitue pas un changement d'utilisation" },
      { id: 'c', texte: "Est reclassé en immobilisation corporelle selon IAS 16" },
      { id: 'd', texte: "Doit être ramené à sa valeur d'utilité" },
      { id: 'e', texte: "Est sorti du bilan dès la décision de vente" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40 §57 : un transfert vers ou depuis la catégorie immeubles de placement n'est effectué que s'il y a changement d'utilisation ; un changement d'intention de la direction ne suffit pas. Le §58 précise que l'immeuble qu'une entité décide de vendre sans aménagement reste un immeuble de placement jusqu'à sa décomptabilisation — il n'est pas reclassé en stocks. Le reclassement en stocks suppose un début d'aménagement en vue de la vente (§57(b)).",
    articleRef: "IAS 40 §57-58 — IFRS Foundation",
  },
  {
    id: 'q19',
    question: "Un hôtel détenu et géré par son propriétaire, qui fournit aux clients des services significatifs, est classé selon IAS 40 :",
    options: [
      { id: 'a', texte: "En immeuble de placement, car il génère des revenus locatifs" },
      { id: 'b', texte: "En bien immobilier occupé par son propriétaire (IAS 16), car les services fournis sont une composante significative du contrat" },
      { id: 'c', texte: "En stocks selon IAS 2" },
      { id: 'd', texte: "En actif financier selon IFRS 9" },
      { id: 'e', texte: "Pour moitié en immeuble de placement, pour moitié en IAS 16" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 40 §11-12 : lorsque les services accessoires fournis sont une composante non significative du contrat (par exemple maintenance et sécurité d'un immeuble de bureaux loué), le bien est un immeuble de placement. Mais lorsque les services sont significatifs — le cas type étant l'hôtel géré par son propriétaire — le bien est un bien immobilier occupé par son propriétaire, relevant d'IAS 16. Le §13 rappelle qu'entre ces deux extrêmes, le classement exige du jugement.",
    articleRef: "IAS 40 §11-13 — IFRS Foundation",
  },
  {
    id: 'q20',
    question: "La valeur d'utilité d'un actif déprécié augmente uniquement parce que les flux futurs se rapprochent dans le temps (effet de désactualisation). Faut-il reprendre la perte de valeur ?",
    options: [
      { id: 'a', texte: "Oui, toute hausse de la valeur d'utilité déclenche une reprise" },
      { id: 'b', texte: "Non : une reprise n'est comptabilisée que s'il y a eu changement dans les estimations servant à déterminer la valeur recouvrable ; le seul passage du temps ne suffit pas" },
      { id: 'c', texte: "Oui, mais uniquement à hauteur de la moitié de la hausse" },
      { id: 'd', texte: "Non, car les reprises de pertes de valeur sont interdites pour tous les actifs" },
      { id: 'e', texte: "Oui, si un commissaire aux comptes l'exige" },
    ],
    reponseCorrecte: 'b',
    explication: "IAS 36 §114 : la perte de valeur n'est reprise que si, et seulement si, il y a eu changement dans les estimations utilisées pour déterminer la valeur recouvrable depuis la comptabilisation de la dernière perte. Le §116 exclut expressément la reprise du seul fait du passage du temps (désactualisation), même si la valeur recouvrable devient supérieure à la valeur comptable. Seul le goodwill est exclu de toute reprise (§124).",
    articleRef: "IAS 36 §114-116 — IFRS Foundation",
  },
]

const SECTIONS: Chapitre['sections'] = [
  {
    numero: '3.1',
    titre: "IAS 36 — Objectif, champ d'application et indices de perte de valeur",
    navLabel: "Champ et indices",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La norme IAS 36 *Dépréciation d'actifs* poursuit un objectif simple à énoncer et exigeant à mettre en œuvre : s'assurer que les actifs ne sont pas comptabilisés pour une valeur excédant leur **valeur recouvrable** (§1). Un actif est comptabilisé pour un montant excessif lorsque sa valeur comptable est supérieure au montant qui sera recouvré par son utilisation ou par sa vente ; la norme impose alors la comptabilisation d'une perte de valeur, encadre les conditions de sa reprise et prescrit les informations à fournir.",
      },
      {
        type: 'carte',
        titre: "Champ d'application (§2) : une norme quasi universelle, définie par ses exclusions",
        texte: "IAS 36 s'applique à tous les actifs, à l'exception de ceux dont la dépréciation est réglée par une norme dédiée :",
        tableau: {
          entetes: ["Actif exclu", "Norme applicable"],
          lignes: [
            ["Stocks", "IAS 2"],
            ["Actifs sur contrat et coûts d'obtention ou d'exécution d'un contrat", "IFRS 15"],
            ["Actifs d'impôt différé", "IAS 12"],
            ["Actifs liés aux avantages du personnel", "IAS 19"],
            ["Actifs financiers", "IFRS 9"],
            ["Immeubles de placement évalués à la juste valeur", "IAS 40"],
            ["Actifs biologiques agricoles à la juste valeur diminuée des coûts de vente", "IAS 41"],
            ["Actifs de contrats d'assurance", "IFRS 17"],
            ["Actifs non courants détenus en vue de la vente", "IFRS 5"],
          ],
        },
        note: "Restent donc dans le champ : les immobilisations corporelles (IAS 16), les immobilisations incorporelles et le goodwill (IAS 38, IFRS 3), les actifs au titre du droit d'utilisation (IFRS 16), ainsi que les participations dans des filiales, entreprises associées et coentreprises (§4). La norme s'applique aussi aux actifs comptabilisés à un montant réévalué (§5).",
      },
      {
        type: 'filet',
        titre: "Le principe cardinal (§9)",
        texte: "À la fin de chaque période de reporting, l'entité doit apprécier s'il existe un quelconque **indice** qu'un actif a pu se déprécier. S'il existe un tel indice, elle doit estimer la valeur recouvrable de l'actif. La logique est en deux temps : l'indice déclenche le test ; seul le test — comparaison entre valeur comptable et valeur recouvrable — établit ou écarte la perte.",
      },
      {
        type: 'carte',
        titre: "Trois actifs testés chaque année, indice ou non (§10-11)",
        liste: [
          "**Immobilisations incorporelles à durée d'utilité indéterminée** — par exemple une marque non amortie : test annuel, effectué à tout moment de l'exercice mais *au même moment chaque année* (§10(a)).",
          "**Immobilisations incorporelles non encore prêtes à être mises en service** — un développement en cours : la capacité de l'actif à recouvrer sa valeur est plus incertaine avant sa mise en service (§11), d'où le test annuel (§10(a)).",
          "**Goodwill acquis dans un regroupement d'entreprises** : jamais amorti, testé chaque année selon les §80 à 99 (§10(b)).",
        ],
        note: "Le §24 (et le §99 pour les UGT) autorise une simplification : le calcul détaillé le plus récent de la valeur recouvrable peut être réutilisé pour le test de la période courante si la composition de l'unité n'a pas changé, si ce calcul aboutissait à un montant très supérieur à la valeur comptable et s'il est très peu probable qu'un nouveau calcul aboutisse à un montant inférieur.",
      },
      { type: 'controle', question: QCM[1] },
      {
        type: 'carte',
        titre: "Les indices de dépréciation (§12) — liste minimale, non exhaustive (§13)",
        tableau: {
          entetes: ["Catégorie", "Indices"],
          lignes: [
            ["Sources externes", "(a) diminution de la valeur de l'actif sensiblement plus importante que l'effet attendu du temps ou de l'usage ; (b) changements négatifs importants — environnement technologique, économique, juridique ou de marché ; (c) hausse des taux d'intérêt ou de rendement du marché susceptible d'affecter le taux d'actualisation et de diminuer la valeur recouvrable ; (d) valeur comptable de l'actif net de l'entité supérieure à sa capitalisation boursière"],
            ["Sources internes", "(e) obsolescence ou dégradation physique ; (f) changements négatifs importants du degré ou du mode d'utilisation — mise hors service, plan d'abandon ou de restructuration, sortie anticipée, durée d'utilité devenue déterminée ; (g) performance économique de l'actif inférieure à celle attendue"],
            ["Dividende reçu d'une filiale, coentreprise ou entreprise associée", "(h) la valeur comptable de la participation dans les états individuels excède l'actif net consolidé (goodwill compris) de l'entité détenue, ou le dividende excède le résultat global total de celle-ci"],
          ],
        },
        note: "Le §14 ajoute des éléments probants internes : flux d'acquisition ou de maintenance sensiblement supérieurs au budget, flux nets actualisés ou résultat d'exploitation sensiblement inférieurs, dégradation des montants budgétés, pertes ou sorties nettes cumulées supérieures aux prévisions. Le §17 rappelle qu'un indice peut aussi conduire, même sans perte, à revoir la durée d'utilité, le mode d'amortissement ou la valeur résiduelle de l'actif.",
      },
      {
        type: 'paragraphe',
        texte: "Le concept d'**importance relative** s'applique à l'identification des indices (§15) : si un calcul antérieur montrait une valeur recouvrable sensiblement supérieure à la valeur comptable et qu'aucun événement n'a éliminé cet écart, il n'est pas nécessaire de réestimer la valeur recouvrable (§16). En revanche, cette souplesse ne vaut pas pour les trois tests annuels obligatoires du §10.",
      },
    ],
  },
  {
    numero: '3.2',
    titre: "La valeur recouvrable : juste valeur diminuée des coûts de sortie et valeur d'utilité",
    navLabel: "Valeur recouvrable",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La **valeur recouvrable** est le montant le plus élevé entre la *juste valeur diminuée des coûts de sortie* et la *valeur d'utilité* (§18). L'idée économique est limpide : l'entité récupérera la valeur de l'actif soit en le vendant, soit en continuant à l'utiliser — un gestionnaire rationnel choisit la meilleure des deux voies, donc c'est le maximum qui borne la valeur comptable. Le §19 en tire une simplification pratique : il n'est pas toujours nécessaire de déterminer les deux montants — si l'un excède la valeur comptable, l'actif n'est pas déprécié et l'autre n'a pas à être estimé. Et le §22 précise que la valeur recouvrable est déterminée pour l'actif pris individuellement, sauf s'il ne génère pas d'entrées de trésorerie largement indépendantes — auquel cas elle est déterminée au niveau de l'unité génératrice de trésorerie (section 3.4).",
      },
      { type: 'controle', question: QCM[0] },
      {
        type: 'filet',
        titre: "Correction importante : la hiérarchie des anciens §25 à 27 n'existe plus",
        texte: "Les manuels antérieurs présentaient une hiérarchie en trois niveaux pour déterminer la juste valeur nette — accord de vente ferme, puis prix sur un marché actif, puis meilleure information disponible. Ces paragraphes (§25 à 27 d'IAS 36) ont été **supprimés** lors de l'adoption d'IFRS 13 *Évaluation de la juste valeur* (mai 2011) : la juste valeur se mesure désormais selon le cadre unique d'IFRS 13 (définition reprise au §6 d'IAS 36 : le prix qui serait reçu pour la vente d'un actif lors d'une transaction normale entre des intervenants du marché). Seul subsiste le §28 pour les **coûts de sortie** : frais d'actes, droits de timbre et taxes similaires, coûts d'enlèvement de l'actif, coûts marginaux directs de mise en état de vente. En sont exclus les indemnités de fin de contrat de travail (IAS 19) et les coûts de restructuration liés à la sortie.",
      },
      {
        type: 'paragraphe',
        texte: "Le §20 précise que la juste valeur diminuée des coûts de sortie peut être évaluée même en l'absence de transactions observables sur un marché actif ; lorsqu'elle ne peut être estimée de façon fiable, l'entité utilise la valeur d'utilité comme valeur recouvrable (§20). Inversement, s'il n'y a aucune raison de penser que la valeur d'utilité excède de façon significative la juste valeur diminuée des coûts de sortie — cas typique d'un actif détenu en vue d'être sorti — cette dernière peut être utilisée directement (§21). Le §53A souligne enfin que juste valeur et valeur d'utilité ne sont pas interchangeables : la juste valeur reflète les hypothèses des intervenants du marché, tandis que la valeur d'utilité intègre des facteurs **spécifiques à l'entité** — synergies avec d'autres actifs, droits ou restrictions juridiques propres, avantages ou charges fiscaux propres — non disponibles pour le marché.",
      },
      {
        type: 'carte',
        titre: "La valeur d'utilité (§30-32) : une actualisation de flux propres à l'entité",
        texte: "La valeur d'utilité est la valeur actualisée des flux de trésorerie futurs attendus de l'utilisation continue de l'actif et de sa sortie in fine. Son calcul reflète cinq éléments (§30) : l'estimation des flux futurs, les attentes de variations possibles de leur montant ou de leur échéancier, la valeur temps de l'argent (taux d'intérêt sans risque du marché), le prix de l'incertitude inhérente à l'actif, et d'autres facteurs comme l'illiquidité. Deux étapes (§31) : estimer les entrées et sorties de trésorerie, puis leur appliquer le taux d'actualisation approprié. Les ajustements pour risque peuvent être portés soit dans les flux, soit dans le taux — jamais dans les deux (§32 ; annexe A).",
        note: "Formule générale : VU = somme des flux nets de chaque période actualisés au taux r, plus la valeur actualisée du flux net de sortie à la fin de la durée d'utilité.",
      },
      {
        type: 'carte',
        titre: "Estimation des flux (§33-38) : budgets de cinq ans au maximum",
        liste: [
          "**Hypothèses raisonnables et justifiables** représentant la meilleure estimation de la direction, avec un poids plus important accordé aux éléments probants externes (§33(a)).",
          "**Budgets et prévisions les plus récents approuvés par la direction**, à l'exclusion des flux liés à des restructurations futures ou à l'amélioration de la performance, sur une période **maximale de cinq ans** sauf justification (§33(b)) : au-delà de cinq ans, les budgets détaillés fiables sont rares (§35).",
          "**Extrapolation au-delà des budgets** par un taux de croissance stable ou décroissant, sauf justification d'un taux croissant, sans excéder le taux de croissance moyen à long terme des produits, secteurs, pays ou marchés concernés (§33(c), §36-37).",
        ],
      },
      {
        type: 'carte',
        titre: "Composition des flux : ce qui entre, ce qui n'entre pas",
        tableau: {
          entetes: ["Inclus", "Exclus"],
          lignes: [
            ["Entrées de trésorerie de l'utilisation continue (§39(a))", "Entrées d'actifs générant des flux largement indépendants, comme les créances (§43(a))"],
            ["Sorties nécessairement engagées pour générer ces entrées, y compris entretien courant et frais généraux directement attribuables ou affectables (§39(b), §41)", "Sorties liées à des passifs déjà comptabilisés : fournisseurs, retraites, provisions (§43(b))"],
            ["Sorties de préparation d'un actif non encore prêt (immeuble en construction, projet en développement) (§42)", "Entrées et sorties attendues d'une **restructuration future non engagée** ou d'une amélioration de la performance : l'actif est évalué *dans son état actuel* (§44-48)"],
            ["Sorties de maintien du niveau d'avantages économiques, y compris le remplacement de composants à durée plus courte (§49)", "Flux liés au **financement** et à l'**impôt sur le résultat** (§50)"],
            ["Flux nets de la sortie de l'actif à la fin de sa durée d'utilité, estimés comme le prix d'une transaction normale après coûts de sortie (§39(c), §52-53)", "Tout double compte entre flux et taux d'actualisation (§32, §56)"],
          ],
        },
        note: "Dès que l'entité s'engage dans une restructuration, ses budgets en reflètent les économies de coûts et l'estimation des flux les intègre (§47). Les flux en monnaie étrangère sont estimés dans la monnaie où ils seront générés, actualisés à un taux approprié à cette monnaie, puis convertis au cours au comptant à la date du calcul (§54).",
      },
      { type: 'controle', question: QCM[8] },
      {
        type: 'filet',
        titre: "Le taux d'actualisation : avant impôt, cohérent, sans double compte (§55-57)",
        texte: "Le taux d'actualisation est un taux **avant impôt** qui reflète l'appréciation actuelle du marché de la valeur temps de l'argent et des risques spécifiques à l'actif pour lesquels les flux futurs n'ont pas déjà été ajustés (§55). Lorsqu'un taux propre à l'actif n'est pas directement observable sur le marché, le §56 recommande de partir du taux implicite dans des transactions actuelles sur des actifs similaires, ou du coût moyen pondéré du capital d'une entité cotée comparable — en veillant à ne pas refléter deux fois les mêmes risques. L'annexe A détaille les substituts possibles : coût moyen pondéré du capital déterminé par le modèle d'évaluation des actifs financiers (MEDAF), taux d'emprunt marginal, autres taux de marché, à ajuster des risques spécifiques (risque-pays, risque de change, risque de prix).",
      },
      { type: 'controle', question: QCM[14] },
      {
        type: 'carte',
        titre: "Illustration — INDUSTRIA SA : la règle du maximum",
        texte: "Une machine a une valeur comptable de **700 000**. Sa juste valeur de marché est de 690 000, les coûts de sortie estimés de 10 000, et la valeur d'utilité calculée par actualisation de 760 000.",
        liste: [
          "JVN = 690 000 − 10 000 = **680 000**.",
          "Valeur recouvrable = max(680 000 ; 760 000) = **760 000**.",
          "Comparaison : valeur comptable 700 000 < valeur recouvrable 760 000 → **aucune dépréciation**.",
        ],
        note: "Bien que la juste valeur nette (680 000) soit inférieure à la valeur comptable, la valeur d'utilité maintient la valeur recouvrable au-dessus : c'est la règle du maximum du §18 qui s'applique. En pratique, le §19 aurait même permis de s'arrêter dès le calcul de la valeur d'utilité.",
      },
    ],
  },
  {
    numero: '3.3',
    titre: "Comptabilisation de la perte de valeur et conditions de sa reprise",
    navLabel: "Perte et reprise",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Si, et seulement si, la valeur recouvrable d'un actif est inférieure à sa valeur comptable, celle-ci est ramenée à la valeur recouvrable : cette réduction est une **perte de valeur** (§59). Elle est comptabilisée immédiatement en **résultat net**, sauf si l'actif est comptabilisé à son montant réévalué selon une autre norme — auquel cas elle est traitée comme une réévaluation négative selon cette norme (§60).",
      },
      { type: 'controle', question: QCM[3] },
      {
        type: 'carte',
        titre: "Actif réévalué : l'imputation en cascade (§61)",
        texte: "Pour un actif réévalué, la perte de valeur est comptabilisée en autres éléments du résultat global **à hauteur de l'écart de réévaluation existant pour ce même actif** ; elle réduit d'autant cet écart en capitaux propres. Le solde éventuel est comptabilisé en résultat net.",
        tableau: {
          entetes: ["Étape", "Écriture (illustration : perte 20 000, écart de réévaluation 12 000)"],
          lignes: [
            ["1. Imputation sur l'écart de réévaluation (autres éléments du résultat global)", "Débit Écart de réévaluation 12 000 / Crédit Cumul des dépréciations 12 000"],
            ["2. Solde en résultat net", "Débit Charges de dépréciation 8 000 / Crédit Cumul des dépréciations 8 000"],
          ],
        },
        note: "Perte totale : 12 000 (capitaux propres) + 8 000 (résultat net) = 20 000. Après toute perte, la dotation aux amortissements des périodes futures est ajustée pour répartir la valeur comptable révisée, diminuée de la valeur résiduelle, sur la durée d'utilité restante (§63). Les impôts différés éventuels sont déterminés selon IAS 12 (§64), et un passif n'est comptabilisé que si une autre norme l'impose (§62).",
      },
      { type: 'controle', question: QCM[11] },
      {
        type: 'paragraphe',
        texte: "La reprise obéit à une discipline symétrique mais plus stricte. À chaque clôture, l'entité apprécie s'il existe un indice qu'une perte de valeur comptabilisée au cours de périodes antérieures — pour un actif autre que le goodwill — n'existe plus ou a diminué ; si oui, elle estime la valeur recouvrable (§110). Les indices du §111 sont le miroir de ceux du §12 : hausse importante de la valeur de l'actif, changements favorables de l'environnement, baisse des taux d'intérêt, changements favorables du mode d'utilisation, performance meilleure qu'attendue.",
      },
      {
        type: 'filet',
        titre: "Deux verrous sur la reprise (§114 et §116)",
        texte: "La perte n'est reprise **que s'il y a eu changement dans les estimations** utilisées pour déterminer la valeur recouvrable depuis la comptabilisation de la dernière perte de valeur (§114) : changement de base d'évaluation, changement du montant ou de l'échéancier des flux ou du taux d'actualisation, changement des composantes de la juste valeur (§115). En revanche, la valeur d'utilité qui augmente du seul fait que les flux se rapprochent dans le temps — la *désactualisation* — ne justifie **aucune** reprise, même si la valeur recouvrable devient supérieure à la valeur comptable (§116).",
      },
      { type: 'controle', question: QCM[19] },
      {
        type: 'carte',
        titre: "Le plafond de la reprise (§117-121)",
        texte: "La valeur comptable augmentée par la reprise ne doit pas excéder la valeur comptable qui aurait été déterminée — nette des amortissements — si aucune perte de valeur n'avait été comptabilisée au cours des périodes antérieures (§117). Toute augmentation au-delà de ce plafond serait une réévaluation, régie par la norme applicable à l'actif (§118). La reprise est comptabilisée en résultat net, sauf pour un actif réévalué où elle est traitée comme une réévaluation positive : en autres éléments du résultat global, ou en résultat net à hauteur d'une perte antérieurement passée en résultat net (§119-120). L'amortissement futur est ensuite ajusté (§121).",
      },
      { type: 'controle', question: QCM[6] },
      {
        type: 'filet',
        titre: "Le goodwill : interdiction absolue de reprise (§124-125)",
        texte: "Une perte de valeur comptabilisée pour un goodwill **ne doit pas être reprise** lors d'une période ultérieure (§124). La raison est donnée au §125 : toute augmentation ultérieure de la valeur recouvrable correspondrait vraisemblablement à un accroissement du goodwill *généré en interne*, et non à une reprise du goodwill acquis — or IAS 38 §48 interdit de comptabiliser le goodwill généré en interne en tant qu'actif.",
      },
    ],
  },
  {
    numero: '3.4',
    titre: "Unités génératrices de trésorerie, goodwill et cascade d'imputation",
    navLabel: "UGT et goodwill",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La plupart des actifs ne génèrent pas de flux de trésorerie isolément. Lorsqu'il est impossible d'estimer la valeur recouvrable d'un actif individuel — parce que sa valeur d'utilité ne peut être considérée comme proche de sa juste valeur diminuée des coûts de sortie et qu'il ne génère pas d'entrées largement indépendantes (§67) — l'entité détermine la valeur recouvrable de l'**unité génératrice de trésorerie** à laquelle il appartient (§66). L'UGT est le plus petit groupe identifiable d'actifs générant des entrées de trésorerie largement indépendantes de celles d'autres actifs ou groupes d'actifs (§6, §68) ; son identification relève du jugement, en considérant la façon dont la direction gère les activités et prend ses décisions de poursuite ou d'abandon (§69).",
      },
      { type: 'controle', question: QCM[5] },
      {
        type: 'carte',
        titre: "Identifier l'UGT : deux exemples de la norme et une règle de cohérence",
        liste: [
          "**La desserte ferroviaire privée d'une mine** (§67) : elle ne peut être vendue que pour sa valeur de mise au rebut et ne génère pas d'entrées indépendantes — sa valeur recouvrable ne peut être estimée qu'au niveau de l'UGT « mine » dans son ensemble.",
          "**La société d'autocars sous contrat municipal exploitant cinq itinéraires** (§68) : si l'entité n'a pas la faculté de réduire son activité itinéraire par itinéraire, l'UGT est la société entière, car les flux de chaque itinéraire ne sont pas largement indépendants.",
          "**Marché actif pour la production interne** (§70-71) : si la production d'un actif ou d'un groupe d'actifs fait l'objet d'un marché actif, cet ensemble est une UGT même si la production est utilisée en interne — les flux sont alors estimés sur la base de la meilleure estimation des prix dans des conditions de concurrence normale.",
          "**Cohérence** (§72-73) : les UGT sont identifiées de façon constante d'une période à l'autre, sauf changement justifié — que le §130 impose alors de documenter.",
        ],
      },
      {
        type: 'paragraphe',
        texte: "La valeur comptable de l'UGT est déterminée de façon cohérente avec sa valeur recouvrable (§74-75) : elle inclut les seuls actifs directement attribuables ou affectables sur une base raisonnable et cohérente qui génèrent les entrées de trésorerie considérées, et exclut les passifs comptabilisés — sauf lorsque la valeur recouvrable ne peut être déterminée sans eux (§76). Le cas d'école du §78 : si l'acquéreur d'une mine devait reprendre la provision de remise en état du site (500), la juste valeur nette de l'UGT serait de 800 − 500 et sa valeur d'utilité de 1 200 − 500 ; le passif est alors déduit *des deux côtés* de la comparaison.",
      },
      {
        type: 'carte',
        titre: "Le goodwill : affectation, cession, réorganisation (§80-87)",
        liste: [
          "**Affectation** : dès la date d'acquisition, le goodwill acquis dans un regroupement est affecté à chacune des UGT — ou groupes d'UGT — de l'acquéreur susceptibles de bénéficier des synergies du regroupement (§80). Chaque unité ou groupe retenu représente le **niveau le plus bas** auquel le goodwill est suivi pour la gestion interne, et n'est **pas plus grand qu'un secteur opérationnel** au sens d'IFRS 8 (§80(a)-(b)).",
          "**Délai** : l'affectation initiale doit être achevée avant la fin du premier exercice ouvert après la date d'acquisition (§84-85).",
          "**Cession d'une activité au sein d'une UGT** : le goodwill lié est inclus dans la valeur comptable de l'activité cédée, évalué sur la base des valeurs relatives de l'activité cédée et de la part conservée, sauf meilleure méthode — cession de 100 pour une part conservée de 300 : 25 % du goodwill suit l'activité cédée (§86).",
          "**Réorganisation** modifiant la composition des UGT : le goodwill est réaffecté aux unités concernées sur la base de leurs valeurs relatives (§87).",
        ],
      },
      {
        type: 'carte',
        titre: "Le test et son échéancier (§88-99)",
        texte: "Une UGT à laquelle un goodwill a été affecté est testée **chaque année**, et de surcroît chaque fois qu'il existe un indice de dépréciation, en comparant sa valeur comptable — goodwill compris — à sa valeur recouvrable (§90). Le test annuel peut être effectué à tout moment de l'exercice, à condition de l'être au même moment chaque année ; un goodwill acquis en cours d'exercice est testé avant la clôture de cet exercice (§96). L'ordre des tests est réglé par les §97-98 : les actifs de l'UGT sont testés avant l'UGT qui contient le goodwill, et les UGT individuelles avant le groupe d'UGT ; si un actif de l'unité présente lui-même un indice, il est testé en premier.",
        note: "Les **actifs communs** — siège social, informatique centrale, centre de recherche — ne génèrent pas d'entrées indépendantes (§100). Si leur valeur comptable peut être affectée sur une base raisonnable et cohérente, chaque UGT est testée en incluant sa quote-part ; sinon, l'UGT est d'abord testée hors actif commun, puis le plus petit groupe d'UGT permettant l'affectation est testé en incluant la quote-part de l'actif commun (§102).",
      },
      {
        type: 'carte',
        titre: "La cascade d'imputation (§104-105)",
        tableau: {
          entetes: ["Étape", "Règle"],
          lignes: [
            ["1. Goodwill d'abord", "La perte de valeur de l'UGT réduit d'abord la valeur comptable du goodwill affecté à l'unité (§104(a)) — cette fraction ne sera jamais reprise (§124)."],
            ["2. Prorata sur les autres actifs", "Le solde est réparti entre les autres actifs de l'unité au prorata de leur valeur comptable (§104(b)) ; chaque réduction est traitée comme une perte de valeur d'actif isolé (§60)."],
            ["3. Plancher individuel", "Aucun actif n'est ramené en dessous du plus élevé de : sa juste valeur diminuée des coûts de sortie (si déterminable), sa valeur d'utilité (si déterminable) et zéro (§105)."],
            ["4. Réallocation du reliquat", "Le montant qui n'a pu être imputé à un actif du fait de ce plancher est réparti au prorata entre les autres actifs de l'unité (§105)."],
          ],
        },
        note: "Si la valeur recouvrable de chaque actif ne peut être estimée sans coût excessif, la norme admet une répartition arbitraire entre les actifs de l'unité autres que le goodwill (§106). La reprise ultérieure d'une perte d'UGT est répartie au prorata entre les actifs *hors goodwill* (§122), avec un double plafond par actif : valeur recouvrable si déterminable, et valeur comptable qui aurait existé sans perte antérieure (§123).",
      },
      { type: 'controle', question: QCM[7] },
      {
        type: 'carte',
        titre: "Illustration — UGT Alpha : cascade complète",
        texte: "L'UGT Alpha comprend des actifs identifiables d'une valeur comptable de 900 000 et un goodwill affecté de 150 000, soit une valeur comptable totale de **1 050 000**. Sa valeur recouvrable est estimée à **850 000**.",
        liste: [
          "Perte totale = 1 050 000 − 850 000 = **200 000**.",
          "Étape 1 : imputation sur le goodwill → 150 000 (goodwill ramené à zéro, sans reprise possible).",
          "Étape 2 : solde de 50 000 réparti entre les actifs identifiables au prorata de leur valeur comptable, sous réserve du plancher du §105.",
        ],
      },
      { type: 'controle', question: QCM[12] },
      {
        type: 'filet',
        titre: "Participations ne donnant pas le contrôle (annexe C)",
        texte: "Lorsque la participation ne donnant pas le contrôle est évaluée comme quote-part de l'actif net identifiable — et non à la juste valeur — le goodwill qui lui est attribuable est compris dans la valeur recouvrable de l'UGT mais n'est pas comptabilisé au bilan. Pour le test, la valeur comptable du goodwill de l'unité est alors **majorée** afin d'inclure ce goodwill non comptabilisé ; la fraction de perte correspondante n'est pas comptabilisée en perte de valeur du goodwill (annexe C, §C4 et C8).",
      },
    ],
  },
  {
    numero: '3.5',
    titre: "IAS 40 — Immeubles de placement : définition, classement et évaluation initiale",
    navLabel: "IAS 40 : définition",
    blocs: [
      {
        type: 'paragraphe',
        texte: "La norme IAS 40 prescrit le traitement comptable des **immeubles de placement** et les informations à fournir les concernant (§1). Un immeuble de placement est un bien immobilier — terrain ou bâtiment, ou partie d'un bâtiment, ou les deux — détenu, par le propriétaire ou en tant qu'actif au titre du droit d'utilisation par le preneur, **pour en retirer des loyers ou pour réaliser une plus-value en capital, ou les deux**, plutôt que pour l'utiliser dans la production ou la fourniture de biens ou de services ou à des fins administratives, ou le vendre dans le cadre de l'activité ordinaire (§5). Ce qui le distingue du bien occupé par son propriétaire, c'est qu'il génère des flux de trésorerie **largement indépendants** des autres actifs de l'entité (§7).",
      },
      { type: 'controle', question: QCM[2] },
      {
        type: 'carte',
        titre: "Classement : exemples et exclusions (§8-9)",
        tableau: {
          entetes: ["Immeubles de placement (§8)", "Hors champ (§9)"],
          lignes: [
            ["Terrain détenu pour une plus-value en capital à long terme", "Bien détenu en vue de la vente dans le cadre de l'activité ordinaire, ou en construction ou aménagement en vue d'une telle vente (IAS 2)"],
            ["Terrain à utilisation future encore indéterminée", "Bien occupé par son propriétaire (IAS 16 ou IFRS 16), y compris détenu en vue d'un usage futur comme bien occupé, occupé par le personnel, ou occupé en attendant d'être vendu"],
            ["Bâtiment — ou droit d'utilisation d'un bâtiment — donné en location dans le cadre d'une location simple", "Bien donné en location-financement à une autre entité"],
            ["Bâtiment vacant détenu pour être loué en location simple", ""],
            ["Bien en construction ou en aménagement en vue d'une utilisation future comme immeuble de placement", ""],
          ],
        },
        note: "Le classement des biens en construction pour le compte de tiers ne figure plus au §9 : l'ancien alinéa (b) a été supprimé lors des révisions successives de la norme.",
      },
      {
        type: 'carte',
        titre: "Les cas de frontière : jugement requis (§10-15)",
        liste: [
          "**Bien à usage mixte** (§10) : si la partie louée et la partie occupée peuvent être vendues ou louées séparément, elles sont comptabilisées séparément ; sinon, le bien n'est un immeuble de placement que si la partie occupée par le propriétaire est *non significative*.",
          "**Services accessoires** (§11-13) : lorsqu'ils sont une composante non significative du contrat — maintenance et sécurité d'un immeuble de bureaux — le bien reste un immeuble de placement ; lorsqu'ils sont significatifs — l'**hôtel géré par son propriétaire** — le bien est occupé par son propriétaire (IAS 16). Entre ces extrêmes, le jugement s'exerce, et l'entité élabore des critères cohérents qu'elle doit indiquer en cas de classement difficile (§14, §75(c)).",
          "**Acquisition : actif isolé ou regroupement d'entreprises ?** Le §14A rappelle que ce jugement relève d'IFRS 3, appliqué distinctement d'IAS 40.",
          "**Locations intragroupe** (§15) : un bien loué à la société mère ou à une autre filiale n'est *pas* un immeuble de placement dans les états consolidés — le groupe l'occupe — mais peut l'être dans les états individuels du bailleur s'il répond à la définition du §5.",
        ],
      },
      { type: 'controle', question: QCM[18] },
      {
        type: 'paragraphe',
        texte: "La comptabilisation obéit aux critères généraux : un immeuble de placement détenu en propre est comptabilisé en tant qu'actif si, et seulement si, il est probable que les avantages économiques futurs iront à l'entité et que son coût peut être évalué de façon fiable (§16). Tous les coûts sont évalués au moment où ils sont engagés — coûts initiaux comme dépenses ultérieures (§17) — mais les coûts d'entretien courant (réparation et maintenance) sont des charges de la période (§18) ; le coût de remplacement d'une partie est comptabilisé et la partie remplacée décomptabilisée (§19). Un immeuble de placement détenu par un preneur au titre du droit d'utilisation est comptabilisé et évalué initialement selon IFRS 16 (§19A, §29A).",
      },
      {
        type: 'carte',
        titre: "Évaluation initiale au coût (§20-29)",
        liste: [
          "Le coût comprend le prix d'achat et toute dépense directement attribuable : honoraires juridiques, droits de mutation et autres **coûts de transaction** (§20-21).",
          "N'augmentent pas le coût : les coûts de démarrage — sauf s'ils sont nécessaires pour mettre le bien en état de fonctionner —, les pertes d'exploitation encourues avant que l'immeuble n'atteigne le niveau d'occupation prévu, et les montants anormaux de ressources gaspillées (§23).",
          "Paiement différé : le coût est le **prix comptant équivalent**, la différence étant comptabilisée en charges financières sur la durée du crédit (§24).",
          "Échange d'actifs : coût évalué à la juste valeur, sauf absence de substance commerciale ou impossibilité d'évaluer de façon fiable la juste valeur des actifs échangés — auquel cas le coût est la valeur comptable de l'actif cédé (§27-29).",
        ],
      },
    ],
  },
  {
    numero: '3.6',
    titre: "IAS 40 — Modèles d'évaluation, transferts, sorties et informations",
    navLabel: "IAS 40 : modèles",
    blocs: [
      {
        type: 'paragraphe',
        texte: "Après la comptabilisation initiale, l'entité choisit comme méthode comptable soit le **modèle de la juste valeur**, soit le **modèle du coût**, et applique ce choix à *tous* ses immeubles de placement (§30) — sous la seule réserve du §32A, qui permet un choix distinct pour les immeubles adossés à des passifs dont le rendement est lié à la juste valeur d'actifs spécifiés. IAS 8 gouverne tout changement de méthode : il n'est permis que s'il aboutit à une information plus fiable et plus pertinente, et la norme juge *hautement improbable* que l'abandon du modèle de la juste valeur pour le modèle du coût le permette (§31). Point souvent mal compris : **toutes** les entités doivent évaluer la juste valeur de leurs immeubles de placement — pour l'évaluation au bilan sous le premier modèle, pour l'information en annexe sous le second (§32) ; le recours à un évaluateur indépendant qualifié est *encouragé mais non obligatoire* (§32).",
      },
      {
        type: 'carte',
        titre: "Les deux modèles face à face",
        tableau: {
          entetes: ["", "Modèle de la juste valeur (§33-55)", "Modèle du coût (§56)"],
          lignes: [
            ["Évaluation au bilan", "Juste valeur à chaque clôture (IFRS 13), sauf cas exceptionnel du §53", "IFRS 5 si détenu en vue de la vente ; IFRS 16 si droit d'utilisation ; sinon modèle du coût d'IAS 16"],
            ["Amortissement", "Aucun", "Oui, selon IAS 16"],
            ["Variations de valeur", "Profit ou perte en **résultat net** de la période (§35)", "Non comptabilisées ; dépréciation éventuelle selon IAS 36"],
            ["Test IAS 36", "Non applicable (exclusion du champ, IAS 36 §2(f))", "Applicable en présence d'indices"],
            ["Juste valeur en annexe", "Base même de l'évaluation", "Obligatoire (§79(e))"],
          ],
        },
        note: "Sous le modèle de la juste valeur, le §50 met en garde contre le double comptage : les équipements intégrés (ascenseurs, climatisation) et le mobilier d'un immeuble loué meublé sont compris dans la juste valeur de l'immeuble, non comptabilisés séparément ; les loyers payés d'avance ou à payer déjà comptabilisés sont neutralisés.",
      },
      { type: 'controle', question: QCM[4] },
      {
        type: 'filet',
        titre: "La présomption de fiabilité (§53-53B)",
        texte: "Il existe une **présomption réfutable** que l'entité peut évaluer la juste valeur d'un immeuble de placement de façon fiable et continue. Elle ne peut être réfutée **qu'à la comptabilisation initiale**, dans des cas exceptionnels où le marché est inactif et où aucune autre évaluation fiable n'est disponible. Un immeuble *en construction* dans ce cas est évalué au coût jusqu'à ce que sa juste valeur devienne évaluable de façon fiable ou jusqu'à l'achèvement (premier des deux) ; un autre immeuble est évalué au modèle du coût avec valeur résiduelle présumée nulle, jusqu'à sa sortie. Les autres immeubles de l'entité restent à la juste valeur (§54), et un immeuble déjà évalué à la juste valeur y demeure jusqu'à sa sortie, même si les transactions comparables se raréfient (§55).",
      },
      {
        type: 'carte',
        titre: "Transferts : le changement d'utilisation, rien que le changement d'utilisation (§57-65)",
        texte: "Un transfert vers ou depuis la catégorie immeubles de placement est effectué si, et seulement si, il y a **changement d'utilisation** — un changement d'intention de la direction ne suffit pas (§57). L'entité qui décide de vendre un immeuble de placement sans aménagement le conserve en immeuble de placement jusqu'à sa décomptabilisation (§58).",
        tableau: {
          entetes: ["Événement", "Transfert", "Traitement sous le modèle de la juste valeur"],
          lignes: [
            ["Début d'occupation par le propriétaire (§57(a))", "Immeuble de placement → IAS 16", "Coût présumé = juste valeur à la date du changement d'utilisation (§60)"],
            ["Début d'aménagement en vue de la vente (§57(b))", "Immeuble de placement → stocks", "Coût présumé = juste valeur à la date du changement d'utilisation (§60)"],
            ["Fin d'occupation par le propriétaire (§57(c))", "IAS 16 → immeuble de placement", "IAS 16 appliquée jusqu'à la date du changement ; la différence entre juste valeur et valeur comptable est traitée comme une **réévaluation IAS 16** (§61-62)"],
            ["Location simple consentie à un tiers (§57(d))", "Stocks → immeuble de placement", "Différence entre juste valeur et valeur comptable en **résultat net** (§63)"],
            ["Achèvement d'un immeuble de placement construit pour soi-même", "—", "Différence entre juste valeur à l'achèvement et valeur comptable antérieure en **résultat net** (§65)"],
          ],
        },
        note: "Sous le modèle du coût, les transferts ne modifient ni la valeur comptable ni le coût du bien (§59).",
      },
      { type: 'controle', question: QCM[17] },
      {
        type: 'carte',
        titre: "Illustration — IMMO PLUS SA : les deux modèles comparés",
        texte: "Un immeuble de bureaux loué à des tiers a été acquis en N−1 pour **5 000 000**. Au 31/12/N, sa juste valeur est de **4 300 000**. Sous le modèle du coût, il s'amortirait sur 40 ans, soit 125 000 par an.",
        liste: [
          "**Modèle de la juste valeur** : variation = 4 300 000 − 5 000 000 = −700 000, comptabilisée intégralement en résultat net (débit Pertes sur variation de juste valeur / crédit Immeuble de placement) ; aucun amortissement.",
          "**Modèle du coût** : dotation aux amortissements de 125 000 ; valeur comptable 4 875 000 au 31/12/N. La juste valeur (4 300 000) inférieure à la valeur comptable constitue un indice de dépréciation : un test IAS 36 s'impose, et une dépréciation complémentaire sera constatée si la valeur recouvrable — max(JVN ; VU) — est inférieure à 4 875 000.",
        ],
        note: "Le modèle de la juste valeur traduit immédiatement la perte économique en résultat ; le modèle du coût l'étale via l'amortissement et ne constate la perte qu'à travers le test IAS 36. Le choix du §30 engage l'entité pour l'ensemble de son portefeuille.",
      },
      {
        type: 'paragraphe',
        texte: "La **sortie** intervient lors de la cession — vente ou location-financement — ou lors de la mise hors service définitive sans avantage économique attendu (§66-67) ; la date de sortie d'une vente est celle où l'acquéreur obtient le contrôle du bien selon IFRS 15. Le profit ou la perte de sortie — différence entre le produit net de la sortie et la valeur comptable — est comptabilisé en résultat net de la période (§69). Les indemnisations reçues de tiers pour des immeubles dépréciés, perdus ou abandonnés sont comptabilisées en résultat net quand elles deviennent exigibles (§72) : dépréciation, sortie et indemnisation sont trois événements économiques distincts, comptabilisés séparément (§73).",
      },
      {
        type: 'carte',
        titre: "Informations à fournir (§75-79)",
        liste: [
          "Pour tous : le modèle appliqué ; les critères de classement en cas de difficulté ; la mesure du recours à un évaluateur indépendant — ou le fait qu'il n'y en a pas eu ; les produits locatifs et charges d'exploitation directes (en distinguant les immeubles ayant ou non généré des loyers) ; les restrictions et obligations contractuelles (§75).",
          "Modèle de la juste valeur : rapprochement des valeurs comptables d'ouverture et de clôture — acquisitions, regroupements, sorties, ajustements de juste valeur, écarts de change, transferts (§76) ; informations spécifiques dans les cas exceptionnels du §53 (§78).",
          "Modèle du coût : modes et durées d'amortissement, valeurs brutes et cumuls, rapprochement — et la **juste valeur** des immeubles de placement, ou, dans les cas exceptionnels, une description avec l'intervalle d'estimation probable (§79(e)).",
        ],
      },
      { type: 'controle', question: QCM[9] },
    ],
  },
]

const CAS: Chapitre['casPratiques'] = [
  {
    id: 'cas-1',
    titre: "Cas 1 — PHARMA CENTRAL SA : test de dépréciation et valeur recouvrable",
    contexte: "PHARMA CENTRAL SA exploite une ligne de production de médicaments génériques. Au 31/12/N, une modification réglementaire interdisant la commercialisation d'un principe actif clé constitue un indice externe de perte de valeur (IAS 36 §12(b)). Valeur comptable nette de la ligne : 2 800 000. Offre ferme de rachat reçue d'un concurrent : 2 600 000 (coûts de sortie estimés : 40 000). Valeur d'utilité calculée par actualisation de flux sur la durée d'utilité restante : 2 900 000.",
    questions: [
      {
        num: 1,
        enonce: "En application d'IAS 36 §18, calculez la valeur recouvrable de la ligne de production. Justifiez le raisonnement en distinguant la juste valeur diminuée des coûts de sortie et la valeur d'utilité.",
        correction: "JVN = 2 600 000 − 40 000 = 2 560 000 (le prix offert est un élément d'évaluation de la juste valeur au sens d'IFRS 13 ; les coûts de sortie sont déduits conformément au §28). VU = 2 900 000. Valeur recouvrable = max(2 560 000 ; 2 900 000) = 2 900 000. La valeur recouvrable (2 900 000) étant supérieure à la valeur comptable (2 800 000), aucune perte de valeur n'est comptabilisée (§59 a contrario). Le fait que la JVN (2 560 000) soit inférieure à la valeur comptable ne déclenche pas de dépréciation tant que la valeur d'utilité reste supérieure — et le §19 aurait même permis de conclure dès le calcul de la seule valeur d'utilité.",
      },
      {
        num: 2,
        enonce: "Supposons que la valeur d'utilité recalculée soit de 2 500 000 (et non 2 900 000). Quelle est la perte de valeur à comptabiliser ? Présentez l'écriture comptable.",
        correction: "VR = max(2 560 000 ; 2 500 000) = 2 560 000. Perte de valeur = 2 800 000 − 2 560 000 = 240 000. Écriture : débit Charges de dépréciation 240 000 / crédit Cumul des dépréciations — ligne de production 240 000 (comptabilisation immédiate en résultat net, §59-60). La dotation aux amortissements des exercices futurs est ensuite ajustée pour répartir la nouvelle valeur comptable de 2 560 000, diminuée de la valeur résiduelle éventuelle, sur la durée d'utilité restante (§63).",
      },
      {
        num: 3,
        enonce: "En N+2, la réglementation est assouplie et la valeur recouvrable de la ligne remonte à 2 650 000. La valeur comptable qui aurait existé sans la dépréciation passée est de 2 400 000 (après amortissements normaux sur deux ans). Expliquez le traitement de la reprise en application d'IAS 36 §114 et §117.",
        correction: "L'assouplissement réglementaire est un changement dans les estimations servant à déterminer la valeur recouvrable : la condition du §114 est remplie (une simple désactualisation n'aurait pas suffi, §116). La reprise est toutefois plafonnée par le §117 : la valeur comptable après reprise ne peut excéder la valeur comptable qui aurait été déterminée, nette d'amortissements, sans la perte initiale, soit 2 400 000. Si la valeur comptable actuelle est inférieure à 2 400 000, la reprise est égale à la différence entre 2 400 000 et cette valeur comptable actuelle — jamais jusqu'à 2 650 000. Écriture : débit Cumul des dépréciations / crédit Reprises de dépréciation (produit en résultat net, §119), puis ajustement de l'amortissement futur (§121).",
      },
      {
        num: 4,
        enonce: "Quelle est la règle applicable si la ligne de production avait fait l'objet d'une réévaluation en N−1 avec constitution d'un écart de réévaluation de 180 000, et que la perte de valeur à comptabiliser en N est de 240 000 ?",
        correction: "Pour un actif réévalué, la perte est traitée comme une réévaluation négative (§60) : elle est comptabilisée en autres éléments du résultat global à hauteur de l'écart de réévaluation existant pour ce même actif, soit 180 000, puis le solde de 60 000 est comptabilisé en résultat net (§61). Écritures : (1) débit Écart de réévaluation 180 000 / crédit Cumul des dépréciations 180 000 ; (2) débit Charges de dépréciation 60 000 / crédit Cumul des dépréciations 60 000.",
      },
      {
        num: 5,
        enonce: "Après la dépréciation, la valeur comptable nette est de 2 560 000 et la durée d'utilité résiduelle de 5 ans (valeur résiduelle : 60 000). Calculez le nouvel amortissement annuel à comptabiliser à partir de N+1.",
        correction: "Selon le §63, l'amortissement futur répartit la valeur comptable révisée, diminuée de la valeur résiduelle, sur la durée d'utilité restante : (2 560 000 − 60 000) / 5 = 2 500 000 / 5 = 500 000 par an.",
      },
    ],
  },
  {
    id: 'cas-2',
    titre: "Cas 2 — METALCO SA : UGT avec goodwill et cascade de dépréciation",
    contexte: "METALCO SA a acquis en N−2 une division de métallurgie ; l'acquisition a généré un goodwill de 320 000, entièrement affecté à l'UGT Division Métal. Au 31/12/N, la chute durable des prix du métal constitue un indice de dépréciation. Composition de l'UGT : machines (valeur comptable 500 000), brevets (200 000), stocks (80 000), créances commerciales (120 000), goodwill affecté 320 000, soit une valeur comptable totale de 1 220 000. Valeur recouvrable de l'UGT : 850 000.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la perte de valeur totale à affecter à l'UGT Division Métal.",
        correction: "Perte totale = valeur comptable de l'UGT − valeur recouvrable = 1 220 000 − 850 000 = 370 000. Cette perte est répartie selon la cascade du §104. Notons que l'UGT ayant un goodwill affecté, elle devait de toute façon être testée chaque année, indice ou non (§90).",
      },
      {
        num: 2,
        enonce: "Appliquez la cascade d'imputation d'IAS 36 §104. Combien imputez-vous sur le goodwill ? Quel solde reste à répartir ?",
        correction: "Étape 1 : la perte réduit d'abord le goodwill affecté à l'UGT, qui est intégralement épuisé : 320 000. Étape 2 : le solde de 370 000 − 320 000 = 50 000 est réparti entre les autres actifs de l'unité au prorata de leur valeur comptable (§104(b)), sous réserve du plancher du §105.",
      },
      {
        num: 3,
        enonce: "Répartissez le solde de 50 000 entre les machines (500 000), les brevets (200 000), les stocks (80 000) et les créances commerciales (120 000).",
        correction: "Les stocks relèvent d'IAS 2 et les créances commerciales d'IFRS 9 : ces actifs sont exclus du champ d'IAS 36 (§2(a) et (e)) et leur dépréciation obéit à leurs normes propres — ils n'absorbent pas la perte IAS 36. Le solde est réparti entre les actifs dans le champ : machines + brevets = 700 000. Machines : 50 000 × 500 000 / 700 000 = 35 714. Brevets : 50 000 × 200 000 / 700 000 = 14 286. Chaque réduction est plafonnée par le §105 (aucun actif sous le plus élevé de sa JVN, de sa VU et de zéro — hypothèse non contraignante ici). Écritures : débit Charges de dépréciation — goodwill 320 000, machines 35 714, brevets 14 286 / crédit Cumul des dépréciations correspondants.",
      },
      {
        num: 4,
        enonce: "En N+4, la Division Métal retrouve une forte rentabilité et la valeur recouvrable de l'UGT remonte à 1 300 000. Peut-on reprendre la dépréciation du goodwill ? Justifiez.",
        correction: "Non. IAS 36 §124 interdit toute reprise d'une perte de valeur comptabilisée pour un goodwill, quelle que soit la hausse de la valeur recouvrable : selon le §125, l'augmentation ultérieure correspondrait vraisemblablement à un goodwill généré en interne, dont IAS 38 §48 interdit la comptabilisation en tant qu'actif. La reprise n'est possible que sur les actifs identifiables dépréciés (machines et brevets), répartie au prorata de leurs valeurs comptables (§122) et doublement plafonnée par actif : valeur recouvrable si déterminable, et valeur comptable qui aurait existé sans perte antérieure (§123).",
      },
      {
        num: 5,
        enonce: "Analysez l'impact de la dépréciation sur les états financiers de METALCO SA et sur la lecture qu'en font les utilisateurs.",
        correction: "Au bilan, le goodwill est ramené de 320 000 à zéro et les actifs identifiables diminuent de 50 000. Au résultat, une charge de dépréciation de 370 000 pèse sur l'exercice. Les capitaux propres diminuent du montant de la charge, nette d'un éventuel effet d'impôt différé (§64, IAS 12). Les informations du §130 doivent être fournies : événements et circonstances, montant, base de la valeur recouvrable et taux d'actualisation le cas échéant. Pour les utilisateurs, la dépréciation intégrale du goodwill est un signal fort : elle indique que les synergies attendues du regroupement de N−2 ne se matérialisent pas, et affecte les ratios de solvabilité et la confiance des créanciers.",
      },
    ],
  },
  {
    id: 'cas-3',
    titre: "Cas 3 — IMMO INVEST SA : choix du modèle IAS 40 et impact sur les états financiers",
    contexte: "IMMO INVEST SA a acquis un immeuble de bureaux le 01/01/N pour 8 000 000. L'immeuble est loué à des tiers dans le cadre de baux commerciaux. La société hésite entre le modèle de la juste valeur et le modèle du coût (durée d'utilité : 40 ans, valeur résiduelle : 400 000). Au 31/12/N, un évaluateur indépendant estime la juste valeur de l'immeuble à 8 500 000.",
    questions: [
      {
        num: 1,
        enonce: "Cet immeuble est-il qualifiable d'immeuble de placement selon IAS 40 §5 ? Justifiez en articulant les critères normatifs.",
        correction: "Oui. L'immeuble est détenu pour en retirer des loyers (baux commerciaux consentis à des tiers) ; il n'est ni utilisé dans la production, la fourniture de biens ou services ou à des fins administratives, ni détenu pour être vendu dans le cadre de l'activité ordinaire (§5). Ses flux locatifs sont largement indépendants des autres actifs de l'entité (§7). Il relève donc d'IAS 40. On notera que le recours à un évaluateur indépendant est encouragé mais non obligatoire (§32).",
      },
      {
        num: 2,
        enonce: "Présentez l'écriture comptable au 31/12/N si IMMO INVEST SA applique le modèle de la juste valeur.",
        correction: "Variation de juste valeur = 8 500 000 − 8 000 000 = 500 000 (gain). Écriture : débit Immeuble de placement 500 000 / crédit Gains sur variation de juste valeur 500 000, en résultat net de la période (§35). Aucun amortissement n'est comptabilisé sous ce modèle.",
      },
      {
        num: 3,
        enonce: "Présentez les écritures au 31/12/N si IMMO INVEST SA applique le modèle du coût, et effectuez le test de dépréciation.",
        correction: "Amortissement = (8 000 000 − 400 000) / 40 = 190 000. Écriture : débit Dotation aux amortissements 190 000 / crédit Amortissements cumulés 190 000. Valeur comptable au 31/12/N : 7 810 000. La juste valeur (8 500 000) étant supérieure, aucun indice de dépréciation IAS 36 n'apparaît de ce chef : aucune perte. En annexe, la juste valeur de 8 500 000 doit être indiquée (§79(e)), le §32 imposant à toutes les entités de l'évaluer.",
      },
      {
        num: 4,
        enonce: "Comparez l'impact des deux modèles sur le résultat net de N et sur le bilan. Quel modèle donne l'image la plus fidèle de la réalité économique dans ce cas ?",
        correction: "Modèle de la juste valeur : résultat net +500 000 ; immeuble au bilan pour 8 500 000. Modèle du coût : résultat net −190 000 ; immeuble au bilan pour 7 810 000. Écart de résultat : 690 000. Le modèle de la juste valeur restitue immédiatement la valorisation du bien, au prix d'une volatilité du résultat ; le modèle du coût est plus prudent mais relègue la valeur réelle en annexe. Le §30 laisse le choix à l'entité, mais ce choix vaut pour tous ses immeubles de placement, et le §31 rend pratiquement irréversible le passage de la juste valeur au coût.",
      },
      {
        num: 5,
        enonce: "En N+1, IMMO INVEST SA (modèle de la juste valeur) commence à occuper elle-même une partie de l'immeuble pour ses bureaux. Quel traitement s'applique selon IAS 40 §57 à §60 ?",
        correction: "Le début d'occupation par le propriétaire est un changement d'utilisation visé par le §57(a) — et non le §57(b), qui concerne le début d'aménagement en vue de la vente. La partie occupée est transférée d'immeuble de placement vers immobilisation corporelle (IAS 16) ; selon le §60, son coût présumé pour l'application ultérieure d'IAS 16 est sa juste valeur à la date du changement d'utilisation. Comme l'immeuble était évalué à la juste valeur jusqu'à cette date, aucun profit ni perte additionnel ne naît du transfert lui-même. Si les parties occupée et louée peuvent être vendues ou louées séparément, elles sont comptabilisées séparément (§10) ; sinon, le bien entier ne reste immeuble de placement que si la partie occupée est non significative.",
      },
    ],
  },
  {
    id: 'cas-4',
    titre: "Cas 4 — TRANSLOG AFRICA SA : dépréciation d'un actif réévalué",
    contexte: "TRANSLOG AFRICA SA exploite une flotte de camions lourds. En N−2, la flotte a été réévaluée selon IAS 16, générant un écart de réévaluation de 95 000 en capitaux propres. Au 31/12/N, la dégradation des routes et la chute du trafic de marchandises conduisent la direction à identifier des indices de perte de valeur. Valeur comptable nette de la flotte : 850 000. Juste valeur diminuée des coûts de sortie : 760 000. Valeur d'utilité : 720 000.",
    questions: [
      {
        num: 1,
        enonce: "Calculez la valeur recouvrable de la flotte selon IAS 36 §18 et déterminez le montant de la perte de valeur.",
        correction: "VR = max(JVN ; VU) = max(760 000 ; 720 000) = 760 000. Perte de valeur = 850 000 − 760 000 = 90 000. Fait notable : ici la juste valeur nette excède la valeur d'utilité — le §53A rappelle que les deux mesures reflètent des perspectives différentes (marché contre facteurs propres à l'entité) et peuvent diverger dans les deux sens.",
      },
      {
        num: 2,
        enonce: "Appliquez la règle d'IAS 36 §60-61 pour un actif réévalué (écart de réévaluation de 95 000). Comment la perte de 90 000 est-elle imputée ?",
        correction: "La perte (90 000) est inférieure à l'écart de réévaluation disponible pour cet actif (95 000) : elle est entièrement comptabilisée en autres éléments du résultat global, en réduction de l'écart (§61). Écriture : débit Écart de réévaluation 90 000 / crédit Cumul des dépréciations 90 000. L'écart résiduel est de 5 000 et le résultat net n'est pas affecté.",
      },
      {
        num: 3,
        enonce: "Supposez une perte de valeur de 130 000 (au lieu de 90 000), avec le même écart de réévaluation de 95 000. Comment l'excédent est-il traité ?",
        correction: "L'écart de réévaluation est d'abord intégralement consommé : débit Écart de réévaluation 95 000 / crédit Cumul des dépréciations 95 000 (autres éléments du résultat global). Le solde de 130 000 − 95 000 = 35 000 est comptabilisé en résultat net : débit Charges de dépréciation 35 000 / crédit Cumul des dépréciations 35 000 (§61). Total des dépréciations : 130 000.",
      },
      {
        num: 4,
        enonce: "Analysez les indices retenus par la direction (dégradation des routes, chute du trafic) à la lumière d'IAS 36 §12. Constituent-ils des indices valides ?",
        correction: "Oui, mais leur classement mérite précision. La dégradation des routes est un changement défavorable important de l'environnement dans lequel l'actif est utilisé : c'est une source **externe** d'information (§12(b)) — à distinguer de la dégradation physique de l'actif lui-même, qui relèverait du §12(e). La chute du trafic de marchandises se traduit par une performance économique de la flotte inférieure à celle attendue : source **interne** (§12(g)), corroborée le cas échéant par les éléments probants du §14 (flux réels inférieurs aux budgets). L'un ou l'autre de ces indices suffit à déclencher l'obligation d'estimer la valeur recouvrable (§9).",
      },
      {
        num: 5,
        enonce: "Discutez des implications de ce traitement sur la présentation des états financiers, notamment sur les autres éléments du résultat global et le résultat net.",
        correction: "Avec la perte de 90 000 entièrement absorbée par l'écart de réévaluation, le résultat net n'est pas affecté : la perte transite par les autres éléments du résultat global et réduit les capitaux propres de 90 000. Cette présentation peut masquer la dégradation économique à qui ne lit que le compte de résultat ; c'est précisément pourquoi IAS 1 impose un état du résultat global présentant à la fois le résultat net et les autres éléments du résultat global. L'analyste doit examiner le résultat global — et les informations du §126(c)-(d) d'IAS 36 sur les pertes passées en autres éléments du résultat global — pour apprécier la performance réelle. Une reprise ultérieure suivrait le chemin inverse (§119) : d'abord en résultat net à hauteur d'une perte antérieurement passée en résultat net, le solde recréant l'écart de réévaluation.",
      },
    ],
  },
  {
    id: 'cas-5',
    titre: "Cas 5 — TECHNO INNOVATE SA : tests annuels obligatoires sur goodwill et incorporelles",
    contexte: "TECHNO INNOVATE SA a acquis en N−3 la société DIGITAL HUB pour 12 000 000, générant un goodwill de 2 500 000 affecté à l'UGT Solutions Numériques. La société détient également une marque commerciale à durée d'utilité indéterminée (valeur comptable 800 000) et un brevet en cours de développement, non encore en service (350 000). Au 31/12/N, la direction réalise son test annuel : l'UGT Solutions Numériques a une valeur comptable totale de 9 800 000 (goodwill inclus) et une valeur recouvrable estimée de 10 200 000.",
    questions: [
      {
        num: 1,
        enonce: "Justifiez pourquoi TECHNO INNOVATE SA est tenue de tester chaque année le goodwill, la marque et le brevet, même en l'absence de tout indice. Citez les dispositions précises.",
        correction: "IAS 36 §10 impose un test annuel indépendant de tout indice pour : (a) les immobilisations incorporelles à durée d'utilité indéterminée — la marque de 800 000 — et celles qui ne sont pas encore prêtes à être mises en service — le brevet en développement de 350 000, dont la capacité à recouvrer sa valeur est plus incertaine avant la mise en service (§11) ; (b) le goodwill acquis dans un regroupement d'entreprises — les 2 500 000 issus de l'acquisition de DIGITAL HUB, testés selon les §80 à 99. Le test peut être réalisé à tout moment de l'exercice, mais au même moment chaque année (§10(a), §96).",
      },
      {
        num: 2,
        enonce: "Pour l'UGT Solutions Numériques, la valeur comptable est de 9 800 000 et la valeur recouvrable de 10 200 000. Y a-t-il dépréciation du goodwill ?",
        correction: "Non. La valeur recouvrable (10 200 000) excède la valeur comptable goodwill compris (9 800 000) : le test du §90 ne révèle aucune perte, et aucune écriture n'est requise. L'excédent de 400 000 constitue la marge de couverture ; si le goodwill affecté à l'UGT est important, le §134 impose de publier les hypothèses clés du calcul et une analyse de sensibilité — notamment si un changement raisonnablement possible d'une hypothèse clé ferait passer la valeur comptable au-dessus de la valeur recouvrable.",
      },
      {
        num: 3,
        enonce: "Supposez que la valeur recouvrable de l'UGT soit de 8 900 000. Calculez et imputez la perte selon IAS 36 §104.",
        correction: "Perte = 9 800 000 − 8 900 000 = 900 000. Cascade du §104 : la perte réduit d'abord le goodwill, ramené de 2 500 000 à 1 600 000. La perte étant intégralement absorbée par le goodwill, aucun autre actif n'est déprécié. Écriture : débit Charges de dépréciation — goodwill 900 000 / crédit Cumul des dépréciations — goodwill 900 000. Cette perte ne pourra jamais être reprise (§124).",
      },
      {
        num: 4,
        enonce: "Comment la marque à durée d'utilité indéterminée (800 000) est-elle testée ? À quel niveau ?",
        correction: "Le test annuel de la marque est exigé par le §10(a). Son niveau dépend de l'autonomie de ses flux (§22) : si la marque génère des entrées de trésorerie largement indépendantes, sa valeur recouvrable individuelle est comparée à sa valeur comptable de 800 000 ; sinon, elle est testée au niveau de l'UGT à laquelle elle appartient (§66). L'ordre des tests est fixé par les §97-98 : les actifs de l'UGT — dont la marque — sont testés avant l'UGT contenant le goodwill. Le §24 autorise la réutilisation du calcul détaillé le plus récent si la composition de l'unité est inchangée, si la valeur recouvrable excédait très largement la valeur comptable et si un résultat inférieur est très improbable.",
      },
      {
        num: 5,
        enonce: "Réfléchissez à la cohérence entre le test annuel obligatoire du goodwill et l'absence d'amortissement de celui-ci. En quoi ce dispositif équilibre-t-il prudence et image fidèle ?",
        correction: "Depuis IFRS 3, le goodwill n'est plus amorti : son évaluation ultérieure relève exclusivement du test de dépréciation d'IAS 36 (IFRS 3, dispositions sur l'évaluation ultérieure, §B63 ; les dispositions transitoires d'IFRS 3 ont d'ailleurs organisé la cessation de l'amortissement du goodwill antérieur). La logique : le goodwill représente des avantages économiques sans profil de consommation déterminable — un amortissement linéaire serait une convention arbitraire. En contrepartie, IAS 36 §10(b) et §90 imposent un test annuel systématique, complété à chaque indice, et le §124 interdit toute reprise. L'équilibre est donc : pas de charge conventionnelle étalée, mais une détection immédiate et définitive des pertes réelles — au prix d'un exercice d'estimation exigeant (flux, taux, hypothèses du §134) que le SYSCOHADA, qui amortit le goodwill, ne demande pas.",
      },
    ],
  },
]

const chapitre: Chapitre = {
  ue: 'ue13',
  numero: 3,
  id: 'ue13-chapitre-3',
  titre: "IAS 36 et IAS 40 : dépréciation d'actifs et immeubles de placement",
  sousTitre: "IAS 36 (dépréciation d'actifs) · IAS 40 (immeubles de placement) — IFRS Foundation",
  infoBulle: "IAS 36 prescrit le test de dépréciation : valeur recouvrable, unités génératrices de trésorerie, goodwill, pertes et reprises. IAS 40 régit les immeubles de placement : modèle de la juste valeur ou modèle du coût, transferts et sorties.",
  loiRef: "IAS 36 §1-141 · IAS 40 §1-86 — IFRS Foundation",
  moduleLabel: 'UE 13 · IFRS / IAS',
  retourRoute: '/ue13-ifrs-ias',
  coursId: 'ue13-ifrs-ias',
  objectifs: [
    "Identifier les actifs soumis au test de dépréciation d'IAS 36 et distinguer le test annuel obligatoire (§10) du test sur indices (§9, §12)",
    "Déterminer la valeur recouvrable : juste valeur diminuée des coûts de sortie (IFRS 13, §28) et valeur d'utilité par actualisation (§30-57, budgets de cinq ans au maximum, taux avant impôt)",
    "Comptabiliser la perte de valeur et sa reprise, en distinguant actif au coût et actif réévalué (§59-64, §109-125)",
    "Appliquer la cascade d'imputation au niveau de l'UGT avec goodwill : goodwill d'abord, prorata ensuite, plancher du §105",
    "Classer un bien en immeuble de placement (IAS 40 §5-15) et maîtriser les deux modèles d'évaluation, les transferts (§57-65) et les informations à fournir",
  ],
  sections: SECTIONS,
  aRetenir: [
    "Valeur recouvrable = le plus élevé de la juste valeur diminuée des coûts de sortie et de la valeur d'utilité (IAS 36 §18) ; si l'un des deux excède la valeur comptable, inutile de calculer l'autre (§19).",
    "Test annuel obligatoire, indice ou non : goodwill, incorporelles à durée d'utilité indéterminée, incorporelles non encore prêtes à être mises en service (§10) — au même moment chaque année (§96).",
    "La hiérarchie des anciens §25-27 pour la juste valeur nette est supprimée : la juste valeur se mesure selon IFRS 13 ; seuls les coûts de sortie du §28 subsistent.",
    "Valeur d'utilité : budgets approuvés de cinq ans au maximum sauf justification, extrapolation à taux stable ou décroissant, actif évalué dans son état actuel (hors restructurations non engagées et améliorations), flux de financement et d'impôt exclus, taux d'actualisation avant impôt (§33, §44-50, §55).",
    "Perte de valeur en résultat net ; pour un actif réévalué, imputation d'abord sur l'écart de réévaluation en autres éléments du résultat global, puis en résultat net (§60-61).",
    "Cascade d'UGT : goodwill d'abord, puis prorata des valeurs comptables, avec plancher individuel — max(JVN, VU, zéro) — et réallocation du reliquat (§104-105).",
    "Reprise seulement en cas de changement d'estimations (§114), jamais par simple désactualisation (§116), plafonnée à la valeur comptable qui aurait existé sans perte (§117) ; le goodwill n'est jamais repris (§124-125, IAS 38 §48).",
    "IAS 40 : choix d'un modèle pour tous les immeubles de placement (§30) ; sous le modèle de la juste valeur, variations en résultat net (§35) et pas de test IAS 36 ; sous le modèle du coût, juste valeur à indiquer en annexe (§79(e)).",
    "Transferts IAS 40 uniquement en cas de changement d'utilisation — l'intention ne suffit pas (§57) ; la décision de vendre sans aménagement laisse le bien en immeuble de placement (§58).",
  ],
  references: [
    { genre: 'texte', intitule: "IAS 36 — Dépréciation d'actifs", precision: "IFRS Foundation, traduction française — champ (§2), indices (§9-14), valeur recouvrable (§18-57), pertes (§58-64), UGT et goodwill (§65-108), reprises (§109-125), informations (§126-137), annexes A et C" },
    { genre: 'texte', intitule: "IAS 40 — Immeubles de placement", precision: "IFRS Foundation, traduction française — définition et classement (§5-15), évaluation initiale (§16-29A), modèles (§30-56), transferts (§57-65), sorties (§66-73), informations (§74-79)" },
    { genre: 'texte', intitule: "IFRS 13 — Évaluation de la juste valeur", precision: "cadre unique de mesure de la juste valeur ; a entraîné la suppression des §25-27 d'IAS 36" },
    { genre: 'texte', intitule: "IFRS 3 — Regroupements d'entreprises", precision: "comptabilisation du goodwill ; évaluation ultérieure renvoyée à IAS 36 (§B63)" },
    { genre: 'texte', intitule: "IAS 38 — Immobilisations incorporelles", precision: "§48 : interdiction de comptabiliser le goodwill généré en interne" },
    { genre: 'texte', intitule: "IAS 16 — Immobilisations corporelles", precision: "modèle de la réévaluation (articulation avec IAS 36 §60-61) et modèle du coût (renvoi d'IAS 40 §56 et §61-62)" },
  ],
  qcm: QCM,
  casPratiques: CAS,
  sources: "Sources : IAS 36 Dépréciation d'actifs · IAS 40 Immeubles de placement · IFRS 13 · IFRS 3 · IAS 38 — IFRS Foundation (traduction française)",
}

export default chapitre
