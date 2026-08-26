import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, ChevronRight,
  Users, Building, FileText, Scale, Shield, Star, Briefcase,
  TrendingUp, Layers, Key, Lock, Info, AlertTriangle, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

/* ── TYPES QCM ── */
type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'; id: string; question: string
  options: QCMOption[]; reponseCorrecte: string
  explication: string; articleRef: string
}

/* ── DONNÉES QCM ── */
const qcmQuestions: QCMQuestion[] = [
  {
    type: 'qcm', id: 'q1',
    question: "Selon l'Art. 309 AUSCGIE, quelle est la définition exacte de la SARL ?",
    options: [
      { id: 'a', texte: "Société où les associés sont responsables indéfiniment et solidairement" },
      { id: 'b', texte: "Société dans laquelle les associés ne sont responsables qu'à concurrence de leurs apports, droits représentés par des parts sociales" },
      { id: 'c', texte: "Société où les droits sont représentés par des actions" },
      { id: 'd', texte: "Société réservée aux personnes physiques uniquement" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 309 AUSCGIE : la SARL est une société dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales.",
    articleRef: 'Art. 309 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q2',
    question: "Quel est le capital minimum légal d'une SARL en RDC ?",
    options: [
      { id: 'a', texte: "1 000 000 FCFA (règle supplétive AUSCGIE)" },
      { id: 'b', texte: "Capital librement fixé par les associés (Arrêté RDC n° 002/2014)" },
      { id: 'c', texte: "5 000 000 FCFA" },
      { id: 'd', texte: "10 000 000 FCFA" },
    ],
    reponseCorrecte: 'b',
    explication: "L'Art. 311 AUSCGIE fixe 1 000 000 FCFA SAUF dispositions nationales contraires. En RDC, l'Arrêté intermin. n° 002/243 du 30/12/2014 a rendu le capital libre (librement fixé par les associés).",
    articleRef: 'Art. 311 AUSCGIE + Arrêté RDC n° 002/243',
  },
  {
    type: 'qcm', id: 'q3',
    question: "La valeur nominale minimale d'une part sociale de SARL est de :",
    options: [
      { id: 'a', texte: "1 000 FCFA" },
      { id: 'b', texte: "5 000 FCFA" },
      { id: 'c', texte: "10 000 FCFA" },
      { id: 'd', texte: "Aucun minimum légal" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 311 AUSCGIE : le capital est divisé en parts sociales égales dont la valeur nominale ne peut être inférieure à 5 000 FCFA.",
    articleRef: 'Art. 311 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q4',
    question: "La SARL peut-elle être constituée par une seule personne ?",
    options: [
      { id: 'a', texte: "Non, minimum 2 associés" },
      { id: 'b', texte: "Oui, par une personne physique ou morale (SARL unipersonnelle)" },
      { id: 'c', texte: "Non, minimum 3 associés" },
      { id: 'd', texte: "Oui, mais seulement une personne physique" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 309 al. 2 AUSCGIE : la SARL peut être instituée par une personne physique ou morale, ou entre deux ou plusieurs personnes physiques ou morales. La SARL unipersonnelle est donc légale.",
    articleRef: 'Art. 309 al. 2 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q5',
    question: "Quelle est la durée du mandat du gérant en l'absence de disposition statutaire ?",
    options: [
      { id: 'a', texte: "2 ans" },
      { id: 'b', texte: "3 ans" },
      { id: 'c', texte: "4 ans" },
      { id: 'd', texte: "6 ans" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 324 AUSCGIE : en l'absence de dispositions statutaires, le ou les gérants sont nommés pour quatre (4) ans. Ils sont rééligibles.",
    articleRef: 'Art. 324 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q6',
    question: "Quelle fraction des parts représentant des apports en numéraire doit être libérée à la souscription dans une SARL ?",
    options: [
      { id: 'a', texte: "La totalité (100%)" },
      { id: 'b', texte: "Au moins 1/4" },
      { id: 'c', texte: "Au moins 1/2" },
      { id: 'd', texte: "Au moins 3/4" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 311-1 AUSCGIE : les parts représentant des apports en numéraire sont libérées lors de la souscription de la moitié au moins de leur valeur nominale. Le surplus intervient dans les 2 ans.",
    articleRef: 'Art. 311-1 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q7',
    question: "La cession de parts sociales à un tiers étranger à la SARL requiert le consentement de :",
    options: [
      { id: 'a', texte: "La majorité simple des associés" },
      { id: 'b', texte: "La majorité des associés représentant les 3/4 des parts (hors parts du cédant)" },
      { id: 'c', texte: "L'unanimité des associés" },
      { id: 'd', texte: "Le gérant seul" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 319 AUSCGIE : la cession à un tiers n'est possible qu'avec le consentement de la majorité des associés non cédants représentant les 3/4 des parts sociales, déduction faite des parts du cédant. Délai de réponse : 3 mois.",
    articleRef: 'Art. 319 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q8',
    question: "La révocation du gérant sans juste motif ouvre droit à :",
    options: [
      { id: 'a', texte: "Rien, la révocation est libre (ad nutum)" },
      { id: 'b', texte: "Dommages et intérêts" },
      { id: 'c', texte: "La nullité de la révocation" },
      { id: 'd', texte: "Un préavis obligatoire de 6 mois" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 326 AUSCGIE : le gérant est révocable par décision des associés représentant plus de la moitié des parts. Si la révocation est décidée sans juste motif, elle peut donner lieu à dommages et intérêts.",
    articleRef: 'Art. 326 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q9',
    question: "Pour une AGE modifiant les statuts de la SARL, quelle majorité est requise ?",
    options: [
      { id: 'a', texte: "Majorité simple (50%+1)" },
      { id: 'b', texte: "Majorité des 2/3" },
      { id: 'c', texte: "Au moins les 3/4 du capital social" },
      { id: 'd', texte: "L'unanimité" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 358 AUSCGIE : les modifications des statuts sont décidées par les associés représentant au moins les trois quarts (3/4) du capital social.",
    articleRef: 'Art. 358 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q10',
    question: "Quand les capitaux propres deviennent inférieurs à la moitié du capital social, que doit faire le gérant dans les 4 mois ?",
    options: [
      { id: 'a', texte: "Dissoudre immédiatement la société" },
      { id: 'b', texte: "Consulter les associés sur l'opportunité de la dissolution anticipée" },
      { id: 'c', texte: "Saisir le tribunal de commerce" },
      { id: 'd', texte: "Réduire le capital social" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 371 AUSCGIE : si les capitaux propres deviennent inférieurs à la moitié du capital social du fait des pertes, le gérant doit, dans les 4 mois suivant l'approbation des comptes, consulter les associés sur l'opportunité de prononcer la dissolution anticipée.",
    articleRef: 'Art. 371 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q11',
    question: "Les clauses statutaires limitant les pouvoirs du gérant sont-elles opposables aux tiers de bonne foi ?",
    options: [
      { id: 'a', texte: "Oui, elles s'imposent à tous" },
      { id: 'b', texte: "Oui, si elles ont été publiées au RCCM" },
      { id: 'c', texte: "Non, elles sont inopposables aux tiers de bonne foi" },
      { id: 'd', texte: "Oui, uniquement pour les actes hors objet social" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 329 AUSCGIE : les clauses statutaires limitant les pouvoirs des gérants sont inopposables aux tiers de bonne foi. La SARL est engagée même par les actes du gérant hors objet social, sauf preuve que le tiers savait ou ne pouvait ignorer.",
    articleRef: 'Art. 329 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q12',
    question: "L'action sociale en responsabilité contre le gérant peut être intentée par les associés représentant :",
    options: [
      { id: 'a', texte: "Plus de la moitié des parts" },
      { id: 'b', texte: "Au moins le tiers des associés et le tiers des parts" },
      { id: 'c', texte: "Le quart des associés et le quart des parts" },
      { id: 'd', texte: "L'unanimité des associés non gérants" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 331 AUSCGIE : les associés représentant le quart des associés ET le quart des parts sociales peuvent intenter l'action sociale en responsabilité contre le gérant, individuellement ou en groupe.",
    articleRef: 'Art. 331 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q13',
    question: "La SARL est-elle dissoute en cas de faillite d'un associé ?",
    options: [
      { id: 'a', texte: "Oui, comme la SNC" },
      { id: 'b', texte: "Non, la SARL n'est pas dissoute en cas de faillite, interdiction ou incapacité d'un associé" },
      { id: 'c', texte: "Oui, si l'associé est gérant" },
      { id: 'd', texte: "Oui, si l'associé détient plus de 50% des parts" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 384 AUSCGIE : la SARL n'est pas dissoute en cas d'interdiction, faillite ou incapacité d'un associé. C'est ce qui la distingue de la SNC. La SARL est une société mixte, plus proche des sociétés de capitaux.",
    articleRef: 'Art. 384 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q14',
    question: "Un gérant associé veut fixer lui-même sa rémunération en AGO. Peut-il voter ?",
    options: [
      { id: 'a', texte: "Oui, il a le droit de vote comme tout associé" },
      { id: 'b', texte: "Oui, mais avec un plafond de voix" },
      { id: 'c', texte: "Non, ses voix ne sont pas prises en compte pour le calcul de la majorité" },
      { id: 'd', texte: "Non, la délibération est automatiquement nulle" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 325 AUSCGIE : le gérant associé ne prend pas part au vote de la délibération relative à sa rémunération et ses voix ne sont pas prises en compte pour le calcul de la majorité. Toute délibération prise en violation est nulle.",
    articleRef: 'Art. 325 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q15',
    question: "La transformation de la SARL en SNC exige :",
    options: [
      { id: 'a', texte: "Les 3/4 du capital social" },
      { id: 'b', texte: "La majorité des 2/3" },
      { id: 'c', texte: "L'unanimité des associés" },
      { id: 'd', texte: "La majorité simple" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 359 AUSCGIE : l'unanimité est requise pour la transformation en SNC car elle augmente les engagements des associés (passage d'une responsabilité limitée à une responsabilité illimitée et solidaire).",
    articleRef: 'Art. 359 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q16',
    question: "La durée du mandat du commissaire aux comptes dans une SARL est de :",
    options: [
      { id: 'a', texte: "6 exercices" },
      { id: 'b', texte: "3 exercices" },
      { id: 'c', texte: "4 exercices" },
      { id: 'd', texte: "1 exercice renouvelable" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 379 AUSCGIE : le commissaire aux comptes est nommé pour trois (3) exercices par un ou plusieurs associés représentant plus de la moitié du capital social.",
    articleRef: 'Art. 379 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q17',
    question: "La décision d'augmenter le capital d'une SARL par incorporation de réserves est adoptée à :",
    options: [
      { id: 'a', texte: "L'unanimité" },
      { id: 'b', texte: "Au moins 3/4 du capital" },
      { id: 'c', texte: "Au moins 1/2 des parts sociales (dérogation Art. 360)" },
      { id: 'd', texte: "Majorité simple" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 360 AUSCGIE : par dérogation à l'article 358 (3/4), la décision d'augmenter le capital par incorporation de bénéfices, de réserves ou de primes d'apports est prise par les associés représentant au moins la moitié des parts sociales.",
    articleRef: 'Art. 360 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q18',
    question: "Le nantissement des parts sociales d'une SARL est opposable aux tiers à condition d'être :",
    options: [
      { id: 'a', texte: "Approuvé par l'AGO" },
      { id: 'b', texte: "Publié au RCCM (après acte notarié ou sous seing privé signé à la société)" },
      { id: 'c', texte: "Validé par le CAC" },
      { id: 'd', texte: "Enregistré auprès de l'administration fiscale" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 322 al. 2 AUSCGIE : pour être opposable aux tiers, le nantissement des parts est constaté par acte notarié ou par acte sous seing privé signé à la société et publié au registre du commerce et du crédit mobilier.",
    articleRef: 'Art. 322 al. 2 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q19',
    question: "Lors d'une fusion de SARL par absorption, la société absorbée est :",
    options: [
      { id: 'a', texte: "Liquidée avant la fusion" },
      { id: 'b', texte: "Transformée en filiale" },
      { id: 'c', texte: "Dissoute sans liquidation, son patrimoine transmis universellement" },
      { id: 'd', texte: "Maintenue en qualité de société en sommeil" },
    ],
    reponseCorrecte: 'c',
    explication: "Art. 382 AUSCGIE renvoyant aux Art. 672 et suivants : la fusion entraîne la dissolution sans liquidation des sociétés qui disparaissent et la transmission universelle de patrimoine (actif et passif) à la société absorbante ou nouvelle.",
    articleRef: 'Art. 382 + Art. 672 AUSCGIE',
  },
  {
    type: 'qcm', id: 'q20',
    question: "La SARL doit obligatoirement nommer un CAC si elle remplit :",
    options: [
      { id: 'a', texte: "Au moins 1 des 3 conditions légales" },
      { id: 'b', texte: "Au moins 2 des 3 conditions légales (Art. 376)" },
      { id: 'c', texte: "Les 3 conditions cumulativement" },
      { id: 'd', texte: "Dès lors que le capital dépasse 5 millions FCFA" },
    ],
    reponseCorrecte: 'b',
    explication: "Art. 376 AUSCGIE : les SARL qui remplissent, à la clôture de l'exercice, deux des conditions suivantes sont tenues de désigner au moins un CAC : bilan > 125 M FCFA, CA > 250 M FCFA, effectif > 50 personnes.",
    articleRef: 'Art. 376 AUSCGIE',
  },
]

/* ── CAS PRATIQUES ── */
const casPratiques = [
  {
    id: 'cp1',
    titre: "Cas 1 - Constitution d'une SARL en RDC",
    contexte: "M. BATAMBA et Mme LUKOMBO souhaitent créer ensemble une SARL pour exploiter un salon de coiffure à Kinshasa. Ils prévoient un capital de 500 000 CDF, divisé en 100 parts de 5 000 CDF chacune. M. BATAMBA apporte 300 000 CDF en numéraire et Mme LUKOMBO apporte son matériel de coiffure évalué à 200 000 CDF. Ils souhaitent nommer M. BATAMBA comme gérant.",
    questions: [
      { q: "1. Le capital de 500 000 CDF est-il conforme au droit OHADA applicable en RDC ?", r: "Oui. L'Art. 311 AUSCGIE fixe le minimum à 1 000 000 FCFA, mais l'Arrêté interministériel RDC n° 002/243 du 30/12/2014 a usé de la clause dérogatoire OHADA pour rendre le capital entièrement libre. En RDC, il n'y a donc aucun minimum légal. 500 000 CDF est valide." },
      { q: "2. La valeur nominale des parts (5 000 CDF) est-elle conforme ?", r: "Oui. L'Art. 311 AUSCGIE fixe la valeur nominale minimale à 5 000 FCFA. La valeur de 5 000 CDF respecte ce plancher. Les 100 parts à 5 000 CDF forment bien un capital de 500 000 CDF." },
      { q: "3. Quelles règles de libération s'appliquent aux apports de chacun ?", r: "Apport de Mme LUKOMBO (nature) : doit être intégralement libéré avant immatriculation (Art. 313). Un commissaire aux apports peut être requis pour valider l'évaluation du matériel. Apport de M. BATAMBA (numéraire) : l'Art. 311-1 exige la libération d'au moins 1/2 à la souscription, soit 150 000 CDF. Le solde (150 000 CDF) doit être versé dans les 2 ans." },
      { q: "4. M. BATAMBA peut-il être nommé gérant ? Par quelle procédure ?", r: "Oui. Tout associé ou tiers peut être gérant (Art. 323). La nomination peut se faire : (1) directement dans les statuts fondateurs, ou (2) par décision des associés représentant plus de la moitié des parts en cours de vie. Durée : 4 ans si les statuts n'en précisent pas." },
    ],
  },
  {
    id: 'cp2',
    titre: "Cas 2 - Cession de parts à un tiers",
    contexte: "La SARL PHARMA-CONGO a 5 associés dont M. MUKADI qui détient 30 parts sur 100. M. MUKADI souhaite vendre ses 30 parts à un ami, M. TSHIAMALA, qui est extérieur à la société. Le capital est de 1 000 000 FCFA. Les autres associés hésitent à accepter cette cession.",
    questions: [
      { q: "1. La cession à M. TSHIAMALA est-elle libre ou soumise à agrément ?", r: "La cession à un tiers extérieur est soumise à agrément obligatoire (Art. 319). Le gérant doit notifier le projet de cession à tous les associés (et à la société). Les associés disposent de 3 mois pour se prononcer." },
      { q: "2. Quelle majorité est requise pour agréer ou refuser la cession ?", r: "L'Art. 319 exige la majorité des associés non cédants représentant au moins les 3/4 des parts sociales, déduction faite des parts de M. MUKADI. Ici, les 4 autres associés détiennent 70 parts. Il faut l'accord d'associés représentant au moins 3/4 x 70 = 52,5 parts, soit au moins 53 parts." },
      { q: "3. Si le projet de cession est refusé, que se passe-t-il ?", r: "Les associés qui ont refusé sont tenus de racheter les 30 parts de M. MUKADI eux-mêmes, ou de trouver un acheteur agréé dans un délai de 3 mois suivant le refus (Art. 320). Si aucune solution n'intervient dans ce délai, M. MUKADI retrouve sa liberté de réaliser la cession initialement prévue avec M. TSHIAMALA." },
      { q: "4. Quelle forme doit prendre la cession ?", r: "La cession doit être constatée par écrit (acte notarié ou acte sous seing privé, Art. 317). Elle n'est opposable à la société qu'après signification officielle (Art. 317 al. 3). Elle n'est opposable aux tiers qu'après dépôt au greffe du RCCM et publication." },
    ],
  },
  {
    id: 'cp3',
    titre: "Cas 3 - Pouvoirs et révocation du gérant",
    contexte: "M. LOKWA est gérant de la SARL IMPORT-EXPORT LOMAMI. Les statuts stipulent qu'il ne peut pas contracter d'emprunt supérieur à 5 000 000 FCFA sans accord préalable des associés. Sans consulter personne, M. LOKWA signe un contrat de crédit bancaire de 8 000 000 FCFA avec une banque. Les associés, mécontents, décident de le révoquer lors d'une assemblée.",
    questions: [
      { q: "1. La banque peut-elle se prévaloir du contrat de crédit de 8 000 000 FCFA ?", r: "Oui. L'Art. 329 AUSCGIE dispose que les limitations statutaires des pouvoirs du gérant sont inopposables aux tiers de bonne foi. Si la banque ne savait pas (et ne pouvait pas savoir) que M. LOKWA dépassait sa limite interne, le contrat est valable et la SARL est engagée. La banque peut exiger le remboursement." },
      { q: "2. M. LOKWA peut-il être tenu responsable envers la société ?", r: "Oui. M. LOKWA a violé les statuts en agissant sans l'accord requis. Il engage sa responsabilité civile envers la SARL pour les conséquences préjudiciables de cet acte (Art. 330). Les associés peuvent intenter une action en responsabilité pour obtenir réparation du préjudice subi." },
      { q: "3. Comment révoque-t-on M. LOKWA ? Quelle majorité faut-il ?", r: "La révocation du gérant est décidée par les associés représentant plus de la moitié des parts sociales (Art. 326). Une décision collective est convoquée. Si M. LOKWA est lui-même associé, ses propres parts sont comptées dans le total mais la décision requiert plus de la moitié du capital total." },
      { q: "4. M. LOKWA a-t-il droit à des dommages-intérêts si la révocation est brutale ?", r: "Si la révocation est décidée sans juste motif ou dans des conditions injurieuses, M. LOKWA peut réclamer des dommages-intérêts (Art. 326 al. 2). Toutefois, en l'espèce, la violation des statuts constitue un juste motif de révocation. Les associés sont donc fondés à révoquer sans être exposés à des dommages-intérêts." },
    ],
  },
  {
    id: 'cp4',
    titre: "Cas 4 - Décisions collectives : majorités",
    contexte: "La SARL AGROBIO-CONGO a 4 associés : A (40 parts), B (30 parts), C (20 parts), D (10 parts) - total 100 parts. Ordre du jour de l'assemblée : (1) approbation des comptes N, (2) modification de l'objet social, (3) transformation de la SARL en SNC.",
    questions: [
      { q: "1. Quelle majorité faut-il pour approuver les comptes de l'exercice N ?", r: "L'approbation des comptes est une décision ordinaire (Art. 346). Elle requiert les associés représentant plus de la moitié des parts (> 50 parts). Si A (40) + B (30) votent pour : 70 parts > 50 - décision adoptée. Si seulement A (40) vote pour : 40 < 50 - décision rejetée." },
      { q: "2. Quelle majorité faut-il pour modifier l'objet social ?", r: "La modification de l'objet social est une modification des statuts, donc une décision extraordinaire (Art. 358). Elle requiert les associés représentant au moins 3/4 du capital = au moins 75 parts. Possibilités : A+B+C = 90 parts (suffisant), ou A+B+D = 80 parts (suffisant), ou A+B = 70 parts (insuffisant)." },
      { q: "3. Quelle majorité faut-il pour la transformation en SNC ?", r: "La transformation en SNC requiert l'unanimité de tous les associés (Art. 359), car elle augmente les engagements des associés (passage de responsabilité limitée à illimitée et solidaire). Il faut l'accord de A + B + C + D = 100% des parts. Un seul refus suffit à bloquer la transformation." },
    ],
  },
  {
    id: 'cp5',
    titre: "Cas 5 - CAC et capitaux propres dégradés",
    contexte: "La SARL TECHNO-CONGO clôture l'exercice N avec les données suivantes : total bilan = 150 000 000 FCFA, chiffre d'affaires = 200 000 000 FCFA, effectif = 60 salariés. Par ailleurs, lors de la clôture, les capitaux propres s'élèvent à 8 000 000 FCFA pour un capital social de 20 000 000 FCFA.",
    questions: [
      { q: "1. La SARL TECHNO-CONGO est-elle obligée de nommer un CAC ?", r: "Oui. L'Art. 376 impose la nomination d'un CAC dès que la SARL remplit au moins 2 des 3 conditions. Ici : bilan 150 M FCFA > 125 M FCFA (condition 1 remplie), CA 200 M FCFA < 250 M FCFA (condition 2 non remplie), effectif 60 > 50 (condition 3 remplie). 2 conditions sur 3 remplies : CAC obligatoire." },
      { q: "2. Les capitaux propres sont-ils dans une situation critique ?", r: "Oui. Les capitaux propres (8 000 000 FCFA) sont inférieurs à la moitié du capital social (20 000 000 / 2 = 10 000 000 FCFA). La règle de l'Art. 371 est déclenchée : les capitaux propres < 1/2 du capital." },
      { q: "3. Quelle est la procédure obligatoire pour le gérant ?", r: "Le gérant doit, dans les 4 mois suivant l'approbation des comptes de l'exercice N, consulter les associés sur l'opportunité de la dissolution anticipée (Art. 371). Les associés peuvent : (1) décider la dissolution anticipée, ou (2) décider la poursuite de l'activité en s'engageant à reconstituer les capitaux propres à au moins 50% du capital dans les 2 ans suivant la clôture de l'exercice déficitaire." },
    ],
  },
  {
    id: 'cp6',
    titre: "Cas 6 - Conventions réglementées et interdites",
    contexte: "Dans la SARL BATIMENT-KIVU, le gérant M. RWEMA est également associé (40 parts sur 100). Trois situations sont à analyser : (A) M. RWEMA loue son entrepôt personnel à la SARL pour 500 000 FCFA/mois ; (B) M. RWEMA emprunte 2 000 000 FCFA à la SARL ; (C) La SARL cautionne le prêt immobilier personnel de M. RWEMA auprès d'une banque.",
    questions: [
      { q: "1. Situation A : La location de l'entrepôt est-elle une convention réglementée ?", r: "Oui. La location d'un bien personnel du gérant à la SARL est une convention réglementée (Art. 353). M. RWEMA doit informer les associés avant la conclusion du bail. S'il existe un CAC, celui-ci établit un rapport spécial. L'AGO statue sur cette convention lors de l'assemblée annuelle. La convention est valable même si non approuvée, mais les conséquences préjudiciables sont à charge de M. RWEMA." },
      { q: "2. Situation B : L'emprunt de M. RWEMA auprès de la SARL est-il autorisé ?", r: "Non. L'Art. 367 interdit formellement aux gérants de contracter des emprunts auprès de la société qu'ils gèrent. Cette convention est nulle de plein droit. La nullité est absolue : elle ne peut pas être couverte par une approbation des associés. M. RWEMA engage également sa responsabilité pénale (abus de biens sociaux)." },
      { q: "3. Situation C : La caution bancaire est-elle autorisée ?", r: "Non. L'Art. 367 interdit également à la SARL de cautionner ou d'avaliser les engagements personnels de son gérant. La caution fournie est nulle de plein droit. La banque ne peut pas invoquer cet acte contre la SARL. M. RWEMA engage sa responsabilité civile et pénale." },
    ],
  },
  {
    id: 'cp7',
    titre: "Cas 7 - Dissolution et liquidation d'une SARL",
    contexte: "Les associés de la SARL TRANSPORT-MANIEMA décident de dissoudre la société par anticipation. Le bilan au jour de la dissolution est : actif = 50 000 000 FCFA (dont créances 20 000 000 FCFA), passif exigible = 35 000 000 FCFA, capital = 10 000 000 FCFA, réserves = 5 000 000 FCFA. Un liquidateur est nommé. Associés : X (60%), Y (40%).",
    questions: [
      { q: "1. Quelle majorité est nécessaire pour voter la dissolution anticipée ?", r: "La dissolution anticipée est une modification des statuts (décision extraordinaire). Elle requiert la majorité des associés représentant au moins 3/4 du capital (Art. 358). Avec X (60%) et Y (40%) : X seul = 60% < 75% - impossible. X+Y = 100% > 75% - suffisant. Il faut au minimum l'accord de X et d'une partie de Y." },
      { q: "2. Quelles sont les missions du liquidateur ?", r: "Le liquidateur (Art. 204-220) doit : (1) réaliser l'actif : recouvrer les créances (20 000 000), vendre les autres biens (30 000 000) ; (2) apurer le passif : payer le passif exigible (35 000 000 FCFA) ; (3) établir un bilan de liquidation ; (4) convoquer les associés pour approuver les comptes de liquidation." },
      { q: "3. Calculer le boni ou le mali de liquidation.", r: "Actif net = Actif total - Passif exigible = 50 000 000 - 35 000 000 = 15 000 000 FCFA. Remboursement du capital = 10 000 000 FCFA. Boni de liquidation = 15 000 000 - 10 000 000 = 5 000 000 FCFA. Répartition : X recoit 60% x 5 000 000 = 3 000 000 FCFA. Y recoit 40% x 5 000 000 = 2 000 000 FCFA." },
      { q: "4. Quand la personnalité morale de la SARL prend-elle fin ?", r: "La personnalité morale subsiste pendant toute la durée de la liquidation (Art. 240). Elle ne s'éteint qu'à la radiation de la société au RCCM, après clôture de la liquidation et approbation des comptes par les associés. La société continue d'exister comme 'SARL TRANSPORT-MANIEMA en liquidation' jusqu'à la radiation." },
    ],
  },
  {
    id: 'cp8',
    titre: "Cas 8 - SARL unipersonnelle",
    contexte: "Mme BIKELE crée seule une SARL-U (SARL unipersonnelle) pour exercer une activité de conseil juridique. Elle est à la fois associée unique et gérante. Elle souhaite louer un bureau appartenant à sa mère à la société. Elle veut aussi fixer sa propre rémunération de gérante.",
    questions: [
      { q: "1. Comment Mme BIKELE prend-elle les décisions normalement réservées à l'assemblée générale ?", r: "Dans la SARL-U, les décisions qui relèvent normalement de l'AGO ou de l'AGE sont prises seules par l'associée unique (Art. 334-1). Elles sont simplement constatées par écrit et consignées dans un registre spécial. Aucune formalité de convocation ou de quorum n'est requise." },
      { q: "2. La règle d'abstention du gérant sur sa rémunération s'applique-t-elle ici ?", r: "Non. L'interdiction de voter sur sa propre rémunération (Art. 325) ne s'applique pas à la SARL unipersonnelle (Art. 325 al. 2). Mme BIKELE décide librement de sa rémunération en qualité d'associée unique. Elle n'a pas à s'abstenir puisqu'il n'y a pas d'autres associés à protéger." },
      { q: "3. La location du bureau de la mère de Mme BIKELE à la SARL-U est-elle soumise à une procédure particulière ?", r: "Oui. La location d'un bien appartenant à un tiers (ici la mère) à la société est une convention réglementée (Art. 353). Dans la SARL-U, lorsque l'associée unique est également gérante, cette convention est simplement mentionnée dans un registre spécial (Art. 366). Elle doit figurer dans le rapport de gestion, mais elle n'est pas soumise à approbation puisqu'il n'y a pas d'autres associés." },
    ],
  },
]

/* ── COMPOSANT CAS PRATIQUE ── */
function CasPratiqueBlock({ cas, index }: { cas: typeof casPratiques[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const [showCorr, setShowCorr] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="bg-purple-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="font-semibold text-gray-800 text-sm">{cas.titre}</span>
        </div>
        <ChevronRight className={cn("w-5 h-5 text-gray-400 transition-transform", open && "rotate-90")} />
      </button>
      {open && (
        <div className="border-t border-gray-100 p-4 space-y-4 bg-white">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-amber-800 mb-1 uppercase tracking-wide">Contexte</p>
            <p className="text-sm text-gray-700 leading-relaxed">{cas.contexte}</p>
          </div>
          <div className="space-y-3">
            {cas.questions.map((q, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800 text-sm mb-2">{q.q}</p>
                {showCorr ? (
                  <div className="bg-emerald-50 border-l-4 border-emerald-400 rounded-r p-3">
                    <p className="text-xs text-gray-700 leading-relaxed">{q.r}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-200 rounded p-3">
                    <p className="text-xs text-gray-400 italic">Répondez à la question avant de voir la correction.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowCorr(!showCorr)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            {showCorr ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {showCorr ? 'Masquer les corrections' : 'Voir les corrections'}
          </button>
        </div>
      )}
    </div>
  )
}

/* ── COMPOSANT PRINCIPAL ── */
export default function UE2Chapitre5Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
  const user = useUser()

  const isEtudiant = isStudentRole(user)

  /* ── ONGLETS ── */
  const [activeTab, setActiveTab] = useState<'lessons' | 'qcm' | 'cas' | 'devoir'>('lessons')

  /* ── LEÇONS ── */
  const lecons = [
    "Définition, nature hybride et capital (Art. 309-314)",
    "Parts sociales et régime de cession (Art. 317-322)",
    "La gérance de la SARL (Art. 323-332)",
    "Décisions collectives - AGO et AGE (Art. 333-375)",
    "CAC, capitaux propres et procédure d'alerte (Art. 371-384)",
    "Droits des associés (Art. 338-349)",
    "Rémunération du gérant et conventions (Art. 350-372)",
    "Transformation, dissolution et liquidation (Art. 373-384)",
  ]
  const [activeLecon, setActiveLecon] = useState(0)

  /* ── QCM INLINE ── */
  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)

  const currentQ = qcmQuestions[qcmIdx]
  const handleQcmVerif = () => {
    if (!qcmSelected) return
    if (qcmSelected === currentQ.reponseCorrecte) setQcmScore(s => s + 1)
    setQcmShowResult(true)
  }
  const handleQcmNext = () => {
    if (qcmIdx + 1 >= qcmQuestions.length) { setQcmDone(true); return }
    setQcmIdx(i => i + 1)
    setQcmSelected(null)
    setQcmShowResult(false)
  }
  const resetQcm = () => { setQcmIdx(0); setQcmSelected(null); setQcmShowResult(false); setQcmScore(0); setQcmDone(false) }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      {/* ── HEADER ── */}
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 5' },
          ]}
          color="indigo"
        />
        <BackButton />
        <h1 className="text-xl font-display font-bold mt-0.5">Société à Responsabilité Limitée (SARL)</h1>
        <p className="text-sm text-muted-foreground">
          La forme hybride par excellence : responsabilité limitée et intuitu personae modéré
        </p>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Leçons', value: '8', icon: <BookOpen className="w-4 h-4 text-purple-600" /> },
          { label: 'QCM', value: '20', icon: <CheckCircle2 className="w-4 h-4 text-purple-600" /> },
          { label: 'Cas pratiques', value: '8', icon: <Briefcase className="w-4 h-4 text-purple-600" /> },
          { label: 'Durée', value: '4h', icon: <TrendingUp className="w-4 h-4 text-purple-600" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-lg font-bold text-purple-700">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── OBJECTIFS ── */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Objectifs du chapitre
        </p>
        <ul className="space-y-1">
          {[
            "Maîtriser la définition et la nature hybride de la SARL (Art. 309 AUSCGIE)",
            "Analyser les règles de libération des parts sociales (numéraire et nature)",
            "Appliquer le régime d'agrément pour la cession de parts à un tiers (3/4 du capital)",
            "Comprendre les pouvoirs, la nomination et la révocation du gérant",
            "Calculer les majorités applicables aux décisions ordinaires et extraordinaires",
            "Identifier les conventions libres, réglementées et interdites",
            "Appliquer la procédure d'alerte en cas de capitaux propres dégradés",
            "Distinguer les règles CAC SARL (2 seuils/3) vs SAS (1 seuil/3)",
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-purple-900">
              <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* ── ONGLETS ── */}
      <div className="bg-muted p-1 rounded-xl flex gap-1">
        {(isEtudiant
          ? [{ id: 'lessons' as const, label: 'Leçons' }, { id: 'devoir' as const, label: 'Devoir' }]
          : [{ id: 'lessons' as const, label: 'Leçons' }, { id: 'qcm' as const, label: 'QCM' }, { id: 'cas' as const, label: 'Cas pratiques' }, { id: 'devoir' as const, label: 'Devoir' }]
        ).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-white text-purple-700 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET LEÇONS ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'lessons' && (
        <div className="space-y-4">
          {/* Sélecteur */}
          <div className="flex flex-wrap gap-2">
            {lecons.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveLecon(i)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                  activeLecon === i
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-purple-700 border-purple-200 hover:border-purple-400"
                )}
              >
                L{i + 1}
              </button>
            ))}
          </div>

          {/* Carte leçon */}
          <div className="bg-white rounded-xl border-l-4 border-purple-500 shadow-sm p-5">
            <h2 className="text-base font-display font-bold text-purple-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Leçon {activeLecon + 1} - {lecons[activeLecon]}
            </h2>

            {/* ── L1 ── */}
            {activeLecon === 0 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  La <strong>Société à Responsabilité Limitée (SARL)</strong> est la forme sociale la plus répandue en zone OHADA pour les PME et les entreprises familiales. Elle est régie par les articles 309 à 384 de l'AUSCGIE.
                </p>
                <p>
                  Sa particularité fondamentale est son caractère <strong>hybride</strong> : elle emprunte simultanément des traits aux sociétés de personnes (SNC) et aux sociétés de capitaux (SA). D'un côté, comme la SA, la responsabilité des associés est limitée à leurs apports. De l'autre, comme la SNC, la cession des parts sociales à un tiers extérieur est encadrée par un mécanisme d'agrément qui reflète l'intuitu personae modéré de la SARL.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-900 leading-relaxed italic">
                    "La société à responsabilité limitée est une société dans laquelle les associés ne sont responsables des dettes sociales qu'à concurrence de leurs apports et dont les droits sont représentés par des parts sociales."
                  </p>
                  <p className="text-xs text-purple-600 mt-2 font-semibold">Art. 309 AUSCGIE</p>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Piège terminologique en RDC</p>
                      <p className="text-sm">L'ancienne "SARL congolaise" du droit belge de 1926 était fonctionnellement équivalente à l'actuelle <strong>SA OHADA</strong>. La SARL OHADA est une forme différente : ses droits sont des <strong>parts sociales</strong> (non des actions) et les parts ne sont pas librement cessibles.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800 flex items-center gap-2"><Key className="w-4 h-4" /> Le capital social et les parts sociales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Paramètre</th>
                      <th className="border border-purple-700 p-2 text-left">Règle AUSCGIE</th>
                      <th className="border border-purple-700 p-2 text-left">Règle RDC</th>
                      <th className="border border-purple-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Capital minimum", "1 000 000 FCFA", "Libre (aucun minimum)", "Art. 311 + Arrêté n° 002/243 RDC"],
                        ["Valeur nominale minimale d'une part", "5 000 FCFA", "5 000 CDF (même règle)", "Art. 311"],
                        ["Nombre d'associés", "Minimum 1 (SARL-U admise), pas de max", "Idem", "Art. 309 al. 2"],
                        ["Libération numéraire (souscription)", "Au moins 1/2 à la souscription", "Idem", "Art. 311-1"],
                        ["Délai libération solde numéraire", "2 ans après immatriculation", "Idem", "Art. 311-1"],
                        ["Libération apports en nature", "Intégrale avant immatriculation", "Idem", "Art. 313"],
                      ].map(([p, r, d, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{p}</td>
                          <td className="border border-purple-200 p-2">{r}</td>
                          <td className="border border-purple-200 p-2">{d}</td>
                          <td className="border border-purple-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-purple-800">Nature hybride - Comparaison SNC / SARL / SA</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Critère</th>
                      <th className="border border-purple-700 p-2 text-center">SNC</th>
                      <th className="border border-purple-700 p-2 text-center font-bold">SARL</th>
                      <th className="border border-purple-700 p-2 text-center">SA</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Responsabilité associés", "Illimitée et solidaire", "Limitée aux apports", "Limitée aux apports"],
                        ["Titres sociaux", "Parts sociales", "Parts sociales", "Actions (négociables)"],
                        ["Cession à un tiers", "Unanimité requise", "Agrément 3/4 du capital", "Libre (principe)"],
                        ["Intuitu personae", "Fort", "Modéré", "Faible"],
                        ["Capital minimum RDC", "Libre", "Libre", "10 000 000 FCFA"],
                        ["Dissolution si décès/faillite associé", "Oui (principe)", "Non (Art. 384)", "Non"],
                      ].map(([c, snc, sarl, sa], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{c}</td>
                          <td className="border border-purple-200 p-2 text-center text-red-600">{snc}</td>
                          <td className="border border-purple-200 p-2 text-center font-bold text-purple-700">{sarl}</td>
                          <td className="border border-purple-200 p-2 text-center text-green-700">{sa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-purple-800">La SARL unipersonnelle (SARL-U)</h3>
                <p>L'article 309 al. 2 AUSCGIE autorise la SARL instituée par une seule personne physique ou morale. Elle fonctionne selon les mêmes règles que la SARL pluripersonnelle, avec des aménagements liés à l'absence de pluralité d'associés :</p>
                <div className="space-y-2">
                  {[
                    { title: "Décisions de l'associé unique (Art. 334-1)", detail: "Les décisions normalement prises en assemblée sont prises seules par l'associé unique et constatées par écrit dans un registre spécial. Aucune formalité de convocation ou de quorum." },
                    { title: "Vote sur la rémunération (Art. 325 al. 2)", detail: "L'interdiction de vote sur sa propre rémunération ne s'applique pas à la SARL-U. L'associé unique décide librement." },
                    { title: "Conventions avec l'associé unique gérant (Art. 366)", detail: "Les conventions entre la SARL-U et son associé unique gérant sont simplement mentionnées dans un registre spécial. Elles doivent figurer dans le rapport de gestion." },
                  ].map((item, i) => (
                    <div key={i} className="bg-purple-50 border-l-4 border-purple-400 rounded-r-lg p-3">
                      <p className="font-semibold text-purple-900 text-sm">{item.title}</p>
                      <p className="text-gray-600 text-xs mt-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── L2 ── */}
            {activeLecon === 1 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  La <strong>part sociale</strong> est le titre représentant la quote-part de chaque associé dans le capital de la SARL. Contrairement aux actions de la SA, les parts sociales sont <strong>non négociables</strong> : elles ne peuvent pas être cotées en bourse et leur cession est strictement encadrée par la loi.
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="font-semibold text-green-800 text-sm mb-1">Droits financiers</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>- Droit aux dividendes (proportionnel aux parts)</li>
                      <li>- Droit au boni de liquidation</li>
                      <li>- Droit préférentiel de souscription (Art. 341)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Droits politiques</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>- Droit de vote : 1 part = 1 voix (Art. 342)</li>
                      <li>- Droit de participation aux assemblées</li>
                      <li>- Droit d'information (consultation documents)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Libération obligatoire et totale des parts</p>
                      <p className="text-sm">Les parts en numéraire doivent être libérées d'au moins <strong>la moitié (1/2)</strong> à la souscription (Art. 311-1), le solde dans les 2 ans. Les parts en <strong>nature</strong> doivent être intégralement libérées avant immatriculation (Art. 313).</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Régime de cession des parts - 3 cas</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="font-bold text-green-800 text-sm mb-2">1. Cession entre associés (Art. 317)</p>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      La cession entre co-associés est <strong>libre en principe</strong>, sauf clause statutaire contraire imposant une restriction. Aucun agrément des autres associés n'est requis.
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-bold text-amber-800 text-sm mb-2">2. Cession à un tiers extérieur (Art. 319-320)</p>
                    <p className="text-gray-700 text-xs leading-relaxed mb-2">
                      Toute cession à un tiers est soumise à l'<strong>agrément préalable</strong> des associés. Procédure :
                    </p>
                    <ol className="text-xs text-gray-700 space-y-1 ml-3 list-decimal">
                      <li>Le cédant notifie le projet aux autres associés et à la société</li>
                      <li>Les associés ont <strong>3 mois</strong> pour se prononcer (majorité des 3/4 des parts hors parts du cédant)</li>
                      <li>Si refus : les associés doivent racheter les parts eux-mêmes ou trouver un acheteur agréé dans les 3 mois</li>
                      <li>Si aucune solution dans ce délai : agrément réputé acquis</li>
                    </ol>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-bold text-blue-800 text-sm mb-2">3. Cession au conjoint, ascendants ou descendants (Art. 317 al. 2)</p>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      Les statuts peuvent librement organiser ces cessions familiales. En l'absence de clause, la jurisprudence OHADA applique par analogie le régime des tiers : agrément à la majorité des 3/4.
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Formalités de la cession</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Etape</th>
                      <th className="border border-purple-700 p-2 text-left">Formalité</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Entre les parties", "Acte notarié ou acte sous seing privé signé"],
                        ["Opposabilité à la société", "Signification à la société ou acceptation dans un acte authentique (Art. 317 al. 3)"],
                        ["Opposabilité aux tiers", "Dépôt au greffe du RCCM et publication"],
                      ].map(([e, f], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{e}</td>
                          <td className="border border-purple-200 p-2">{f}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── L3 ── */}
            {activeLecon === 2 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Le <strong>gérant</strong> est le mandataire social de la SARL. Il assure la gestion courante et représente la société à l'égard des tiers. Le gérant peut être associé ou tiers non associé, mais doit obligatoirement être une <strong>personne physique</strong>.
                </p>

                <h3 className="font-semibold text-purple-800">Nomination du gérant</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Paramètre</th>
                      <th className="border border-purple-700 p-2 text-left">Règle</th>
                      <th className="border border-purple-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Qualité requise", "Personne physique (associé ou tiers)", "Art. 323"],
                        ["Nomination lors constitution", "Dans les statuts ou par décision unanime des fondateurs", "Art. 323"],
                        ["Nomination en cours de vie", "Décision des associés représentant > 1/2 du capital", "Art. 323"],
                        ["Durée du mandat", "Fixée par statuts, sinon 4 ans par défaut (rééligible)", "Art. 324"],
                        ["Cumul gérance + contrat de travail", "Possible si contrat de travail préexiste à la nomination", "Art. 323"],
                      ].map(([p, r, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{p}</td>
                          <td className="border border-purple-200 p-2">{r}</td>
                          <td className="border border-purple-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-purple-800">Pouvoirs du gérant</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="font-semibold text-green-800 text-sm mb-1">Vis-à-vis des associés (Art. 328)</p>
                    <p className="text-xs text-gray-700 leading-relaxed">Le gérant peut accomplir tous les actes de gestion dans l'intérêt de la société. Les statuts peuvent restreindre ses pouvoirs. Ces restrictions sont valables entre associés.</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Vis-à-vis des tiers (Art. 329)</p>
                    <p className="text-xs text-gray-700 leading-relaxed">Le gérant est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la société. Les limitations statutaires sont <strong>inopposables aux tiers de bonne foi</strong>.</p>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Révocation du gérant</h3>
                <div className="space-y-2">
                  <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
                    <p className="font-semibold text-amber-800 text-sm">Révocation par les associés (Art. 326)</p>
                    <p className="text-xs text-gray-700 mt-1">Décision des associés représentant <strong>plus de la moitié des parts</strong>. Si révocation sans juste motif ou dans des conditions injurieuses : dommages-intérêts au gérant.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-3">
                    <p className="font-semibold text-red-800 text-sm">Révocation judiciaire (Art. 337)</p>
                    <p className="text-xs text-gray-700 mt-1">Tout associé peut saisir le tribunal pour demander la révocation pour cause légitime (fautes répétées, incapacité, conflits graves). Le juge peut révoquer même contre l'avis des associés majoritaires.</p>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Responsabilité du gérant (Art. 330)</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: 'Civile', detail: "Envers la société et les associés pour fautes de gestion. Action sociale par associés représentant 1/4 du capital et 1/4 des parts (Art. 331)." },
                    { type: 'Pénale', detail: "Abus de biens sociaux, faux bilans, distribution de faux dividendes, infractions fiscales intentionnelles." },
                    { type: 'Fiscale', detail: "Solidairement responsable des impôts non payés en cas de fraude fiscale ou d'insolvabilité organisée." },
                  ].map(item => (
                    <div key={item.type} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="font-bold text-red-800 text-xs mb-1">{item.type}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-slate-800">
                    <Scale className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Action sociale - Conditions (Art. 331)</p>
                      <p className="text-sm">Les associés représentant au moins <strong>le quart des associés ET le quart des parts sociales</strong> peuvent intenter l'action en responsabilité contre le gérant. Aucune clause des statuts ne peut subordonner cet exercice à un avis préalable de l'assemblée.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── L4 ── */}
            {activeLecon === 3 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Dans la SARL, les associés exercent collectivement la souveraineté de la société. Il n'y a pas de conseil d'administration comme dans la SA : les décisions importantes sont prises directement par les associés réunis en assemblée ou par consultation écrite.
                </p>

                <h3 className="font-semibold text-purple-800">Tableau des majorités - SARL</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Type de décision</th>
                      <th className="border border-purple-700 p-2 text-left">Exemples</th>
                      <th className="border border-purple-700 p-2 text-center">Majorité requise</th>
                      <th className="border border-purple-700 p-2 text-center">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Décision ordinaire", "Approbation des comptes, nomination/révocation gérant, distribution de dividendes", "> 1/2 du capital", "Art. 349"],
                        ["Décision extraordinaire", "Modification des statuts, changement d'objet social, augmentation/réduction de capital", ">= 3/4 du capital", "Art. 358"],
                        ["Agrément cession à tiers", "Cession de parts à un non-associé", ">= 3/4 du capital (hors parts cédant)", "Art. 319"],
                        ["Incorporation de réserves (dérogation)", "Augmentation de capital par incorporation de bénéfices ou réserves", ">= 1/2 des parts", "Art. 360"],
                        ["Transformation en SNC", "Augmentation des engagements des associés", "Unanimité", "Art. 359"],
                      ].map(([t, e, m, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{t}</td>
                          <td className="border border-purple-200 p-2">{e}</td>
                          <td className="border border-purple-200 p-2 text-center font-bold text-purple-700">{m}</td>
                          <td className="border border-purple-200 p-2 text-center">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="font-semibold text-purple-800">Modalités de consultation des associés</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 border-l-4 border-purple-400 rounded-r-lg p-3">
                    <p className="font-semibold text-gray-800 text-sm">Assemblée physique</p>
                    <p className="text-xs text-gray-600 mt-1">Convoquée par le gérant. Délai de convocation : au moins <strong>15 jours avant</strong> la réunion (lettre recommandée ou contre récépissé). Ordre du jour, texte des résolutions et documents annexes joints à la convocation.</p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-blue-400 rounded-r-lg p-3">
                    <p className="font-semibold text-gray-800 text-sm">Consultation écrite (Art. 340)</p>
                    <p className="text-xs text-gray-600 mt-1">Possible sauf si un associé exige la tenue d'une assemblée. Le gérant adresse les résolutions à chaque associé avec les pièces justificatives. Délai de réponse : <strong>15 jours minimum</strong>. L'associé qui ne répond pas est réputé abstentionniste.</p>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-green-400 rounded-r-lg p-3">
                    <p className="font-semibold text-gray-800 text-sm">Procès-verbal obligatoire (Art. 344)</p>
                    <p className="text-xs text-gray-600 mt-1">Toute décision collective doit être constatée par un PV signé par les gérants et déposé dans un registre spécial conservé au siège social. Ce registre est consultable par tout associé à tout moment.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── L5 ── */}
            {activeLecon === 4 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <h3 className="font-semibold text-purple-800">Le Commissaire aux Comptes dans la SARL (Art. 376-379)</h3>
                <p>
                  Contrairement à la SA (où le CAC est toujours obligatoire), la SARL n'est tenue de nommer un CAC que si elle dépasse <strong>au moins deux (2) des trois (3) seuils</strong> suivants à la clôture de l'exercice (Art. 376) :
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Critère</th>
                      <th className="border border-purple-700 p-2 text-center">Seuil déclencheur</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["Total bilan", "plus de 125 000 000 FCFA"],
                        ["Chiffre d'affaires annuel", "plus de 250 000 000 FCFA"],
                        ["Effectif permanent", "plus de 50 salariés"],
                      ].map(([c, s], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{c}</td>
                          <td className="border border-purple-200 p-2 text-center font-bold">{s}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-purple-800">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">CAC dans la SARL vs SAS</p>
                      <p className="text-sm">Dans la SARL, le CAC est obligatoire dès que <strong>2 seuils sur 3</strong> sont atteints (Art. 376). Dans la SAS, le CAC est obligatoire dès qu'<strong>1 seuil sur 3</strong> est atteint (Art. 853-19). La SARL est donc moins contrainte que la SAS sur ce point.</p>
                    </div>
                  </div>
                </div>

                <p>
                  Le mandat du CAC dans une SARL est de <strong>3 exercices</strong> (Art. 379), contre 6 exercices dans la SA. Il est nommé par les associés représentant plus de la moitié du capital.
                </p>

                <h3 className="font-semibold text-purple-800 mt-4">Procédure d'alerte - Capitaux propres dégradés (Art. 371)</h3>
                <p>
                  Lorsque les <strong>capitaux propres</strong> deviennent inférieurs à <strong>la moitié du capital social</strong> du fait des pertes, l'AUSCGIE impose une procédure d'alerte stricte :
                </p>
                <div className="space-y-2">
                  {[
                    { step: '1', title: 'Constat des pertes', detail: "Les capitaux propres < 1/2 du capital sont constatés lors de l'approbation des comptes annuels." },
                    { step: '2', title: 'Consultation des associés (Art. 371)', detail: "Le gérant doit consulter les associés dans les 4 mois suivant l'approbation des comptes pour décider : dissolution anticipée OU poursuite de l'activité." },
                    { step: '3', title: 'Si dissolution refusée (Art. 372)', detail: "La société doit reconstituer ses capitaux propres à au moins 50% du capital dans les 2 ans suivant la clôture de l'exercice déficitaire." },
                    { step: '4', title: 'Si pas de régularisation', detail: "Tout intéressé (associé, créancier, Ministère public) peut demander en justice la dissolution judiciaire de la SARL." },
                  ].map(item => (
                    <div key={item.step} className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3">
                      <span className="bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
                      <div>
                        <p className="font-semibold text-red-900 text-sm">{item.title}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── L6 ── */}
            {activeLecon === 5 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Tout associé de SARL dispose de droits fondamentaux que les statuts ne peuvent supprimer. Ces droits sont d'ordre public et se répartissent en trois catégories : <strong>financiers, politiques et d'information</strong>.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Catégorie</th>
                      <th className="border border-purple-700 p-2 text-left">Droit</th>
                      <th className="border border-purple-700 p-2 text-left">Modalité clé</th>
                      <th className="border border-purple-700 p-2 text-center">Article</th>
                      <th className="border border-purple-700 p-2 text-center">Supprimable ?</th>
                    </tr></thead>
                    <tbody>
                      <tr className="bg-white"><td className="border border-purple-200 p-2 font-medium" rowSpan={3}>Financiers</td><td className="border border-purple-200 p-2">Droit aux dividendes</td><td className="border border-purple-200 p-2">Proportionnel aux parts, décidé en AGO</td><td className="border border-purple-200 p-2 text-center">Art. 338</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-white"><td className="border border-purple-200 p-2">Boni de liquidation</td><td className="border border-purple-200 p-2">Après apurement du passif et remboursement des apports</td><td className="border border-purple-200 p-2 text-center">Art. 222</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-white"><td className="border border-purple-200 p-2">Droit préférentiel souscription</td><td className="border border-purple-200 p-2">Priorité aux nouvelles parts en cas d'augmentation de capital en numéraire</td><td className="border border-purple-200 p-2 text-center">Art. 341</td><td className="border border-purple-200 p-2 text-center text-amber-600 font-bold">AGE 3/4</td></tr>
                      <tr className="bg-purple-50"><td className="border border-purple-200 p-2 font-medium" rowSpan={3}>Politiques</td><td className="border border-purple-200 p-2">Droit de vote</td><td className="border border-purple-200 p-2">1 part = 1 voix (pas de vote double contrairement à la SA)</td><td className="border border-purple-200 p-2 text-center">Art. 342</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-purple-50"><td className="border border-purple-200 p-2">Participation assemblées</td><td className="border border-purple-200 p-2">Tout associé peut participer et prendre la parole</td><td className="border border-purple-200 p-2 text-center">Art. 338</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-purple-50"><td className="border border-purple-200 p-2">Droit d'agrément</td><td className="border border-purple-200 p-2">Participation au vote d'agrément des cessions à des tiers</td><td className="border border-purple-200 p-2 text-center">Art. 319</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-white"><td className="border border-purple-200 p-2 font-medium" rowSpan={3}>Information</td><td className="border border-purple-200 p-2">Documents AGO (15 jours avant)</td><td className="border border-purple-200 p-2">Inventaire, états financiers, rapport gérant, rapport CAC</td><td className="border border-purple-200 p-2 text-center">Art. 345</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-white"><td className="border border-purple-200 p-2">Questions écrites au gérant</td><td className="border border-purple-200 p-2">2 fois par an, réponse obligatoire par écrit</td><td className="border border-purple-200 p-2 text-center">Art. 347</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                      <tr className="bg-white"><td className="border border-purple-200 p-2">Expertise de gestion</td><td className="border border-purple-200 p-2">Associés représentant 1/5 du capital peuvent saisir le juge</td><td className="border border-purple-200 p-2 text-center">Art. 159</td><td className="border border-purple-200 p-2 text-center text-red-600 font-bold">Non</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── L7 ── */}
            {activeLecon === 6 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <h3 className="font-semibold text-purple-800">Rémunération du gérant (Art. 350-352)</h3>
                <p>
                  La rémunération du gérant est fixée soit par les statuts lors de la constitution, soit par une décision collective ordinaire des associés (Art. 350). Le gérant peut également exercer ses fonctions à titre gratuit.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-amber-800">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Interdiction de vote sur sa propre rémunération (Art. 325)</p>
                      <p className="text-sm">Lorsque la rémunération est fixée ou modifiée par décision collective, le gérant associé <strong>ne prend pas part au vote</strong> et ses voix ne sont pas prises en compte pour le calcul de la majorité. Toute délibération prise en violation est nulle. Exception : dans la SARL-U, l'associé unique gérant décide librement (Art. 325 al. 2).</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Les 3 types de conventions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Type</th>
                      <th className="border border-purple-700 p-2 text-left">Exemples</th>
                      <th className="border border-purple-700 p-2 text-left">Procédure</th>
                      <th className="border border-purple-700 p-2 text-left">Sanction si violée</th>
                    </tr></thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-purple-200 p-2 font-medium text-green-700">Libre</td>
                        <td className="border border-purple-200 p-2">Conventions courantes aux conditions normales du marché</td>
                        <td className="border border-purple-200 p-2">Aucune formalité</td>
                        <td className="border border-purple-200 p-2">N/A</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-200 p-2 font-medium text-amber-700">Réglementée (Art. 353-366)</td>
                        <td className="border border-purple-200 p-2">Location immeuble du gérant à la SARL, prestation de services entre sociétés liées</td>
                        <td className="border border-purple-200 p-2">Information associés + rapport CAC + approbation AGO</td>
                        <td className="border border-purple-200 p-2">Convention reste valable, mais préjudice à charge personnelle du gérant</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-purple-200 p-2 font-medium text-red-700">Interdite (Art. 367)</td>
                        <td className="border border-purple-200 p-2">Emprunt du gérant auprès de la SARL, caution personnelle du gérant par la SARL, découvert en compte</td>
                        <td className="border border-purple-200 p-2">Interdite absolument</td>
                        <td className="border border-purple-200 p-2">Nullité absolue de plein droit + responsabilité pénale (abus de biens sociaux)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-slate-800">
                    <Scale className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Distinction clé : réglementée vs interdite</p>
                      <p className="text-sm">Une convention <strong>réglementée non approuvée</strong> par l'AGO reste valable, mais le gérant supporte personnellement les conséquences préjudiciables. En revanche, une convention <strong>interdite</strong> est nulle de plein droit : même approuvée par tous les associés, elle ne peut produire aucun effet.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── L8 ── */}
            {activeLecon === 7 && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <h3 className="font-semibold text-purple-800">Transformation de la SARL</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-purple-600 text-white">
                      <th className="border border-purple-700 p-2 text-left">Transformation vers</th>
                      <th className="border border-purple-700 p-2 text-left">Conditions</th>
                      <th className="border border-purple-700 p-2 text-left">Majorité</th>
                      <th className="border border-purple-700 p-2 text-left">Article</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ["SA", "SARL existe depuis au moins 2 ans ET capital >= 10 000 000 FCFA. Rapport d'un commissaire à la transformation.", "3/4 du capital", "Art. 373"],
                        ["SNC", "Augmentation des engagements des associés (responsabilité illimitée et solidaire)", "Unanimité", "Art. 373 al. 3"],
                        ["SAS", "Conditions définies par les statuts. La SAS ne peut pas faire APE.", "Unanimité", "Art. 359"],
                      ].map(([t, c, m, art], i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                          <td className="border border-purple-200 p-2 font-medium">{t}</td>
                          <td className="border border-purple-200 p-2">{c}</td>
                          <td className="border border-purple-200 p-2 font-bold text-purple-700">{m}</td>
                          <td className="border border-purple-200 p-2">{art}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4">
                  <div className="flex gap-3 text-green-800">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">La transformation ne crée pas une nouvelle personne morale (Art. 378)</p>
                      <p className="text-sm">La transformation de la SARL en une autre forme sociale ne crée pas une personne morale nouvelle. La société conserve sa personnalité juridique, ses contrats, ses créances et ses dettes. Seule la forme juridique change.</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-purple-800">Dissolution et liquidation</h3>
                <p>
                  Les causes de dissolution : arrivée du terme statutaire (max 99 ans), réalisation ou extinction de l'objet social, décision de l'AGE (majorité 3/4), dissolution judiciaire, annulation du contrat de société, perte de la moitié du capital sans redressement.
                </p>
                <div className="space-y-2">
                  {[
                    { step: '1', label: 'Cause de dissolution', color: 'bg-amber-50 border-amber-300', detail: "Arrivée terme, pertes, décision AGE (majorité 3/4)..." },
                    { step: '2', label: 'Publication dissolution', color: 'bg-amber-50 border-amber-300', detail: 'RCCM + journal annonces légales. La société survit en "liquidation".' },
                    { step: '3', label: 'Nomination liquidateur', color: 'bg-red-50 border-red-300', detail: "Nommé par AGO ou tribunal. Pouvoirs du gérant cessent." },
                    { step: '4', label: 'Réalisation actif', color: 'bg-red-50 border-red-300', detail: "Vente des biens, recouvrement des créances." },
                    { step: '5', label: 'Apurement passif', color: 'bg-red-50 border-red-300', detail: "Paiement des dettes (salaires, fisc, créanciers)." },
                    { step: '6', label: 'Partage du boni', color: 'bg-green-50 border-green-300', detail: "Remboursement apports + répartition boni de liquidation (proportionnel aux parts)." },
                    { step: '7', label: 'Radiation RCCM', color: 'bg-green-50 border-green-300', detail: "Extinction de la personnalité morale. Fin de la société." },
                  ].map(item => (
                    <div key={item.step} className={`flex gap-3 ${item.color} border rounded-lg p-3`}>
                      <span className="bg-gray-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveLecon(l => Math.max(0, l - 1))}
                disabled={activeLecon === 0}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeLecon === 0 ? "text-gray-300 cursor-not-allowed" : "text-purple-700 hover:bg-purple-50"
                )}
              >
                <ArrowLeft className="w-4 h-4" /> Précédente
              </button>
              <button
                onClick={() => setActiveLecon(l => Math.min(lecons.length - 1, l + 1))}
                disabled={activeLecon === lecons.length - 1}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeLecon === lecons.length - 1 ? "text-gray-300 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"
                )}
              >
                Suivante <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET QCM ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'qcm' && !isEtudiant && (
        <div className="space-y-4">
          <QCMPageUnique questions={qcmQuestions as unknown as QCMChapitre[]} couleurAccent="purple" />
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET CAS PRATIQUES ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'cas' && (
        <div className="space-y-3">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <h2 className="font-display font-bold text-gray-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              Cas Pratiques - SARL (8 cas)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exercices d'application sur la constitution, la cession de parts, les pouvoirs du gérant, les décisions collectives et les conventions.
            </p>
          </div>
          {casPratiques.map((cas, i) => (
            <CasPratiqueBlock key={cas.id} cas={cas} index={i} />
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════ */}
      {/* ── ONGLET DEVOIR ── */}
      {/* ══════════════════════════════════════ */}
      {activeTab === 'devoir' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          {!isEtudiant ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-ch5"
              chapitreNom="Chapitre 5 - Societe a Responsabilite Limitee (SARL)"
              questions={qcmQuestions as unknown as import('@/lib/db').QCMChapitre[]}
              coursId="ue2-droit-societes"
              casPratiquesExistants={casPratiques.map(cp => ({
                id: cp.id,
                titre: cp.titre,
                enonce: cp.contexte + '\n' + cp.questions.map((q: { q: string; r: string }) => q.q).join('\n'),
                corrigeType: cp.questions.map((q: { q: string; r: string }) => q.r).join('\n'),
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium text-foreground">Devoir en attente</p>
              <p className="text-sm">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      {/* ── BOUTON TERMINER ── */}
      <button
        onClick={goBack}
        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        Terminer le chapitre 5
      </button>

      {/* Sources */}
      <p className="text-xs text-muted-foreground/60 text-center">
        Sources : AUSCGIE révisé 30 janvier 2014 - Art. 309-384 | Arrêté interministériel RDC n° 002/243 du 30/12/2014
      </p>
    </div>
  )
}
