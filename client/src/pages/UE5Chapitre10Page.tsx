import React, { useState } from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Option { id: string; texte: string }
interface QCM {
  id: string
  question: string
  options: Option[]
  reponse: string
  explication: string
}
interface Lecon {
  id: string
  titre: string
  lois: string
  contenu: React.ReactNode
  qcms: QCM[]
}
interface CasPratique {
  id: string
  titre: string
  contexte: string
  questions: { num: string; enonce: string; correction: string }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// COULEURS
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:      'bg-rose-50',
  border:  'border-rose-200',
  text:    'text-rose-700',
  badge:   'bg-rose-100 text-rose-700',
  btn:     'bg-rose-600 hover:bg-rose-700 text-white',
  active:  'bg-rose-600 text-white',
  inactive:'bg-white text-gray-600 border border-gray-200',
  correct: 'bg-green-50 border-green-400',
  wrong:   'bg-red-50 border-red-400',
  loi:     'text-rose-600 text-xs font-medium',
}

// ─────────────────────────────────────────────────────────────────────────────
// LECONS
// ─────────────────────────────────────────────────────────────────────────────

const LECONS: Lecon[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // LECON 1 - Chronologie des reformes (1982-2026)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'L1',
    titre: "Chronologie des réformes des finances publiques en RDC (1982-2026)",
    lois: "Loi financière n° 83-003 du 23 février 1983 · LOFIP Art. 233-234 · Loi n° 18/010 du 9 juillet 2018 · Loi n° 23/030 du 28 juin 2023",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            1.1 La loi financière n° 83-003 du 23 février 1983 : premier cadre post-indépendance
            <InfoTooltip texte="La loi financière de 1983 a constitué le premier cadre légal unifié des finances publiques congolaises après l'indépendance. Elle a régi les finances publiques pendant près de 30 ans avant d'être abrogée par la LOFIP." loi="LOFIP Art. 233" />
          </h4>
          <p className="text-gray-700 mb-3">
            La République Démocratique du Congo a longtemps été régie, en matière de finances publiques, par la loi financière n° 83-003 du 23 février 1983, telle que modifiée et complétée par l'ordonnance-loi n° 87-004 du 10 janvier 1987. Ce texte organisait la gestion budgétaire selon une logique de budget de moyens : les crédits étaient alloués par nature de dépenses (personnel, matériel, investissement) sans lien direct avec les résultats attendus.
          </p>
          <p className="text-gray-700 mb-3">
            L'article 233 de la LOFIP a expressément abrogé cette loi financière de 1983 : <em>"La présente loi abroge toutes les dispositions antérieures contraires, notamment celles contenues dans la loi financière n° 83-003 du 23 février 1983, telle que modifiée et complétée par l'ordonnance-loi n° 87-004 du 10 janvier 1987."</em>
          </p>
          <p className="text-gray-700">
            Cette abrogation marque une rupture historique avec la gestion axée sur les moyens pour aller vers une gestion axée sur les résultats et la performance, conformément aux standards des finances publiques modernes.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            1.2 La LOFIP n° 11/011 du 13 juillet 2011 : révolution normative
            <InfoTooltip texte="La LOFIP est la loi organique qui régit l'ensemble des finances publiques congolaises. Elle consacre le budget-programme, la décentralisation fiscale, l'unité de trésorerie, et le contrôle de la performance." loi="LOFIP Art. 1 et 234" />
          </h4>
          <p className="text-gray-700 mb-3">
            La loi n° 11/011 du 13 juillet 2011 relative aux finances publiques, communément appelée LOFIP, constitue la révolution normative majeure dans l'histoire des finances publiques congolaises. Elle a été adoptée conformément à l'article 122 point 3 de la Constitution qui réserve au législateur la compétence de fixer les règles relatives aux finances publiques.
          </p>
          <p className="text-gray-700 mb-3">
            Selon l'article 1er de la LOFIP, cette loi fixe les règles concernant : l'affectation des ressources et des charges, l'élaboration, la présentation, l'adoption et l'exécution des lois de finances, des édits budgétaires et des décisions budgétaires, le contrôle sur les finances publiques, la détermination des responsabilités et des sanctions, ainsi que les rapports entre le pouvoir central et les provinces et entre les provinces et les entités territoriales décentralisées.
          </p>
          <p className="text-gray-700 mb-3">
            Ses innovations majeures sont les suivantes :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
            <li><strong>Le budget-programme :</strong> les crédits sont regroupés par programme selon l'article 8, chaque programme associant des objectifs précis et des indicateurs de performance (Art. 43).</li>
            <li><strong>La décentralisation fiscale :</strong> les 40% des recettes nationales à caractère national sont rétrocédés aux provinces (Art. 218-222), et une caisse nationale de péréquation est instituée.</li>
            <li><strong>L'unité de trésorerie :</strong> toutes les recettes et dépenses publiques transitent par un compte unique du Trésor (Art. 110).</li>
            <li><strong>Le contrôle renforcé :</strong> contrôle administratif (contrôleur budgétaire, IGF), juridictionnel (Cour des comptes) et parlementaire (loi de reddition des comptes).</li>
            <li><strong>La séparation ordonnateur-comptable :</strong> principe cardinal consacré par les articles 88-96.</li>
          </ul>
          <div className="rounded-lg border border-rose-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Année</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Texte</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Innovation principale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {[
                  ["1983","Loi financière n° 83-003","Premier cadre légal des finances publiques - budget de moyens"],
                  ["1987","Ordonnance-loi n° 87-004","Modification de la loi financière de 1983"],
                  ["2002-2006","Réformes structurelles","Chaîne de la dépense, nomenclatures budgétaires"],
                  ["2011","LOFIP n° 11/011","Budget-programme, décentralisation, unité de trésorerie, Cour des comptes"],
                  ["2013","RGCP Décret n° 13/050","Règlement général sur la comptabilité publique"],
                  ["2015","Création 26 provinces","Multiplication des budgets provinciaux, enjeux de décentralisation"],
                  ["2018","Loi n° 18/010","1re prorogation du budget-programme (+5 ans, jusqu'en 2024)"],
                  ["2023","Loi n° 23/030","2e prorogation + enrichissement documents PLF, nouvelles définitions"],
                  ["2024","Expérimentation","Déconcentration de l'ordonnancement - 9 ministères pilotes (Art. 5 LF 2026)"],
                  ["2025","LFR n° 25/044","Ajustement macroéconomique face au conflit dans l'Est"],
                  ["2026","LF n° 25/060","Budget 59 020,5 Mds FC, poursuite des réformes structurelles"],
                ].map(([y,t,i]) => (
                  <tr key={y} className="hover:bg-rose-50/50">
                    <td className="px-4 py-2 font-medium text-gray-800">{y}</td>
                    <td className="px-4 py-2 text-gray-700">{t}</td>
                    <td className="px-4 py-2 text-gray-700">{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            1.3 Les prorogations du budget-programme (2018 et 2023)
            <InfoTooltip texte="L'article 234 de la LOFIP fixait l'entrée en vigueur intégrale au 1er janvier de la 8e année après promulgation (2019). Deux lois ont prorogé ce délai : en 2018 (Loi 18/010) et en 2023 (Loi 23/030)." loi="LOFIP Art. 234 · Loi 18/010 · Loi 23/030" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 234 de la LOFIP prévoyait que la loi entrerait en vigueur dans l'intégralité de ses dispositions au premier janvier de la huitième année suivant celle de sa promulgation, soit le 1er janvier 2019. Cette date correspondait au délai de transition accordé pour que la RDC bascule effectivement vers la gestion budgétaire en mode programmes.
          </p>
          <p className="text-gray-700 mb-3">
            Face à l'ampleur des préalables non encore accomplis (découpage ministériel en programmes, formation des responsables de programmes, mise en place des systèmes d'information), le Parlement a accordé deux prorogations successives :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Loi n° 18/010 du 9 juillet 2018 :</strong> 1re prorogation de 5 ans, reportant l'entrée en vigueur intégrale au 1er janvier 2024.</li>
            <li><strong>Loi n° 23/030 du 28 juin 2023 :</strong> 2e prorogation jusqu'en 2029, assortie d'enrichissements documentaires (débat d'orientation budgétaire, nouvelles définitions, renforcement des PAP et RAP).</li>
          </ul>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l1q1',
        question: "Quelle loi a expressément abrogé la loi financière n° 83-003 du 23 février 1983 selon l'article 233 de la LOFIP ?",
        options: [
          { id: 'a', texte: "Le Décret n° 13/050 du 13 novembre 2013 portant RGCP" },
          { id: 'b', texte: "L'ordonnance-loi n° 87-004 du 10 janvier 1987" },
          { id: 'c', texte: "La loi n° 11/011 du 13 juillet 2011 relative aux finances publiques (LOFIP)" },
          { id: 'd', texte: "La loi n° 18/010 du 9 juillet 2018" },
          { id: 'e', texte: "La loi n° 23/030 du 28 juin 2023" },
        ],
        reponse: 'c',
        explication: "L'article 233 de la LOFIP dispose expressément : 'La présente loi abroge toutes les dispositions antérieures contraires, notamment celles contenues dans la loi financière n° 83-003 du 23 février 1983, telle que modifiée et complétée par l'ordonnance-loi n° 87-004 du 10 janvier 1987.' C'est donc la LOFIP n° 11/011 de 2011 qui a abrogé le cadre antérieur.",
      },
      {
        id: 'l1q2',
        question: "Selon l'article 234 de la LOFIP, à quelle date la loi devait-elle entrer en vigueur dans l'intégralité de ses dispositions ?",
        options: [
          { id: 'a', texte: "Le 13 juillet 2011, date de sa promulgation" },
          { id: 'b', texte: "Le 1er janvier 2015, quatre ans après sa promulgation" },
          { id: 'c', texte: "Le 1er janvier 2019, huitième année suivant celle de sa promulgation" },
          { id: 'd', texte: "Le 1er janvier 2024, après la 1re prorogation" },
          { id: 'e', texte: "Le 1er janvier 2029, après la 2e prorogation" },
        ],
        reponse: 'c',
        explication: "L'article 234 de la LOFIP dispose : 'Sans préjudice des dispositions de l'article 232 ci-dessus, la présente loi entre en vigueur dans l'intégralité de ses dispositions, au premier janvier de la huitième année suivant celle de sa promulgation.' La LOFIP ayant été promulguée en 2011, la 8e année suivante est 2019. Deux prorogations successives (2018 et 2023) ont repoussé ce délai.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LECON 2 - Le budget-programme : fondements juridiques et contenu
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'L2',
    titre: "Le budget-programme : fondements juridiques et architecture",
    lois: "LOFIP Art. 8, 22, 43-44, 47-49 · Constitution Art. 122 pt. 3",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            2.1 Définition et fondement constitutionnel du budget-programme
            <InfoTooltip texte="Le budget-programme trouve son fondement dans la Constitution (Art. 122 pt. 3) et dans la LOFIP (Art. 8, 43). Il remplace le budget de moyens par une gestion axée sur les résultats et la performance." loi="LOFIP Art. 8 et 43 · Constitution Art. 122 pt. 3" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 122 point 3 de la Constitution réserve au législateur la compétence de fixer les règles relatives aux finances publiques. C'est sur cette base que la LOFIP a consacré le budget-programme comme mode de gestion des finances publiques en RDC.
          </p>
          <p className="text-gray-700 mb-3">
            L'article 8 de la LOFIP pose le principe fondateur : <em>"Les crédits sont spécialisés par grande nature de dépenses ou titres tel que précisé à l'article 37 de la présente loi et par source de financement. Ils sont regroupés par programme. Les programmes peuvent être regroupés par fonction."</em> Il précise que dans le cadre du budget-programme, la présentation des crédits par subdivision de la nomenclature budgétaire (chapitre, article, littera) est indicative et non limitative.
          </p>
          <p className="text-gray-700 mb-3">
            Le budget-programme s'oppose au budget de moyens en ce que l'allocation des crédits n'est plus opérée au profit des institutions (personnel, matériel), mais au profit d'actions à mener en vue de résultats précis. C'est une approche de gestion par laquelle l'allocation des crédits budgétaires permet d'améliorer l'efficacité de l'action de l'État.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            2.2 Définition légale du programme (Art. 43 LOFIP)
            <InfoTooltip texte="L'article 43 de la LOFIP donne la définition légale du programme, unité de base du budget-programme. Chaque programme est associé à des objectifs précis et à des indicateurs de performance." loi="LOFIP Art. 43" />
          </h4>
          <p className="text-gray-700 mb-2">
            L'article 43 de la LOFIP définit le programme de la manière suivante :
          </p>
          <blockquote className="border-l-4 border-rose-400 pl-4 italic text-gray-600 mb-3">
            "Un programme regroupe les crédits destinés à mettre en oeuvre une action ou un ensemble cohérent d'actions relevant d'un même ministère ou institution et auquel sont associés des objectifs précis, définis en fonction des finalités d'intérêt général, ainsi que des résultats attendus et faisant l'objet d'une évaluation au moyen d'indicateurs de performance."
          </blockquote>
          <p className="text-gray-700 mb-3">
            L'article 43 ajoute deux règles importantes :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Chaque ministère ou institution peut créer un programme intitulé "administration générale" pour recevoir les crédits non affectés à un programme spécifique.</li>
            <li>Seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme - la création et la suppression des programmes relèvent donc du domaine de la loi.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            2.3 Les fonctions et les documents du budget-programme (Art. 44, 47-49 LOFIP)
            <InfoTooltip texte="L'article 44 organise le regroupement des programmes en fonctions. Les articles 47 à 49 imposent des documents de performance : PAP (Projets Annuels de Performance) et RAP (Rapports Annuels de Performance)." loi="LOFIP Art. 44, 47-49" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 44 de la LOFIP dispose que les programmes peuvent être regroupés en fonctions, lesquelles peuvent être institutionnelles, ministérielles ou interministérielles. La présentation des programmes sous forme de fonction interministérielle entraîne une coordination dans l'exécution et une présentation conjointe des résultats.
          </p>
          <p className="text-gray-700 mb-3">
            Les articles 47 à 49 imposent deux documents essentiels du budget-programme :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-rose-200 p-4 bg-rose-50/50">
              <h5 className="font-semibold text-rose-700 mb-2">PAP - Projet Annuel de Performance</h5>
              <p className="text-sm text-gray-700">Produit avant le vote du budget. Il expose pour chaque programme : les objectifs poursuivis, les résultats attendus, les indicateurs et leurs cibles. Il accompagne le PLF soumis au Parlement.</p>
            </div>
            <div className="rounded-lg border border-rose-200 p-4 bg-rose-50/50">
              <h5 className="font-semibold text-rose-700 mb-2">RAP - Rapport Annuel de Performance</h5>
              <p className="text-sm text-gray-700">Produit en fin d'exercice. Il rend compte des résultats effectivement obtenus par rapport aux objectifs du PAP. Il accompagne la loi de reddition des comptes soumise au Parlement (Art. 28-31 LOFIP).</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            2.4 Le contenu de la loi de finances en mode budget-programme (Art. 22 LOFIP)
            <InfoTooltip texte="L'article 22 fixe le contenu de la loi de finances de l'année dans le cadre du budget-programme : par ministère, par programme, avec autorisation d'engagement (AE) et crédits de paiement (CP)." loi="LOFIP Art. 22" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 22 de la LOFIP dispose que la loi de finances de l'année fixe pour le budget général, par ministère ou institution et par programme, le montant des autorisations d'engagement annuelles et pluriannuelles ainsi que des crédits de paiement. Cette double présentation AE/CP est une innovation majeure qui permet de distinguer l'engagement de la dépense (AE) du décaissement effectif (CP), améliorant ainsi la gestion pluriannuelle des finances publiques.
          </p>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l2q1',
        question: "Selon l'article 43 de la LOFIP, quelle est la seule autorité compétente pour créer ou supprimer un programme budgétaire ?",
        options: [
          { id: 'a', texte: "Le ministre du Budget par arrêté ministériel" },
          { id: 'b', texte: "Le Conseil des ministres par décret délibéré" },
          { id: 'c', texte: "Le responsable de programme (RPROG) par décision administrative" },
          { id: 'd', texte: "Une disposition de loi de finances d'initiative gouvernementale" },
          { id: 'e', texte: "Le Parlement par résolution de l'Assemblée nationale" },
        ],
        reponse: 'd',
        explication: "L'article 43 alinéa 3 de la LOFIP est explicite : 'Seule une disposition de loi de finances d'initiative gouvernementale peut créer ou supprimer un programme.' La création ou suppression d'un programme relève donc du domaine législatif et doit figurer dans une loi de finances à initiative du Gouvernement.",
      },
      {
        id: 'l2q2',
        question: "Selon l'article 8 de la LOFIP, dans le cadre du budget-programme, quelle est la valeur juridique de la présentation des crédits par chapitre, article et littera ?",
        options: [
          { id: 'a', texte: "Elle est obligatoire et limitative - aucun dépassement n'est possible" },
          { id: 'b', texte: "Elle est indicative et non limitative" },
          { id: 'c', texte: "Elle est supprimée et remplacée exclusivement par les programmes" },
          { id: 'd', texte: "Elle est réservée aux dépenses de personnel uniquement" },
          { id: 'e', texte: "Elle est facultative et laissée à la discrétion du ministre du Budget" },
        ],
        reponse: 'b',
        explication: "L'article 8 de la LOFIP précise : 'Dans le cadre d'un budget programme, la présentation des crédits par subdivision de la nomenclature budgétaire, chapitre, article et littera est indicative.' Ce caractère indicatif est une innovation majeure du budget-programme par rapport au budget de moyens où cette présentation était limitative.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LECON 3 - Etat d'avancement des reformes et defis (2024-2026)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'L3',
    titre: "Etat d'avancement des réformes et défis actuels (2024-2026)",
    lois: "LOFIP Art. 234 · Loi n° 23/030 du 28 juin 2023 · LF n° 25/060 Art. 5 · LFR n° 25/044",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            3.1 La deuxième prorogation du budget-programme : Loi n° 23/030 du 28 juin 2023
            <InfoTooltip texte="La loi n° 23/030 du 28 juin 2023 constitue la 2e modification de la LOFIP. Elle proroge l'entrée en vigueur intégrale du budget-programme jusqu'en 2029 et enrichit le cadre documentaire du PLF." loi="Loi n° 23/030 du 28 juin 2023 · LOFIP Art. 234" />
          </h4>
          <p className="text-gray-700 mb-3">
            La loi n° 23/030 du 28 juin 2023 modifiant et complétant la LOFIP constitue le dernier acte législatif en date concernant la réforme budgétaire. Elle a accordé au Gouvernement une deuxième prorogation du délai de basculement effectif vers le budget-programme, repoussant l'échéance à 2029. Cette prorogation reconnaît implicitement que les préalables du budget-programme n'étaient pas encore tous réalisés.
          </p>
          <p className="text-gray-700 mb-3">
            Outre la prorogation, la loi n° 23/030 a apporté plusieurs enrichissements normatifs :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>L'ajout à l'article 3 des définitions des notions de débat d'orientation budgétaire et de dotation budgétaire.</li>
            <li>L'institutionnalisation du débat d'orientation budgétaire au Parlement (avant le dépôt du PLF).</li>
            <li>Le renforcement des exigences documentaires du PLF (PAP enrichis).</li>
            <li>La programmation du débat d'orientation budgétaire à l'Assemblée nationale en mars de chaque année.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            3.2 La déconcentration de l'ordonnancement : Art. 5 LF 2026
            <InfoTooltip texte="L'article 5 de la LF n° 25/060 du 29 décembre 2025 autorise la déconcentration de l'ordonnancement à 9 ministères pilotes, transfert progressif de la compétence d'ordonnancement du ministre du Budget vers les ministères sectoriels." loi="LF n° 25/060 Art. 5" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'une des réformes les plus significatives en cours est la déconcentration de l'ordonnancement. En vertu de l'article 5 de la Loi de finances n° 25/060 du 29 décembre 2025, 9 ministères pilotes se sont vu transférer progressivement la compétence d'ordonnanciement de leurs dépenses - une compétence qui relevait jusqu'alors exclusivement du ministre ayant le budget dans ses attributions.
          </p>
          <p className="text-gray-700 mb-3">
            Cette réforme vise à rapprocher la prise de décision budgétaire des ministères sectoriels, à renforcer leur responsabilité dans l'exécution de leurs programmes et à améliorer les taux d'exécution budgétaire. Lors du Conseil des ministres de décembre 2025, la Vice-ministre des Finances a présenté les avancées de cette réforme, soulignant qu'elle constitue une transformation majeure de la gestion publique.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            3.3 La Loi de finances rectificative n° 25/044 de 2025 : impact du conflit à l'Est
            <InfoTooltip texte="La LFR n° 25/044 a réduit le budget 2025 de 1,7%, le ramenant à 50 691,8 Mds FC, en raison du conflit dans l'Est de la RDC qui a impacté les recettes minières et augmenté les dépenses sécuritaires." loi="LFR n° 25/044 du 28 juin 2025" />
          </h4>
          <p className="text-gray-700 mb-3">
            Adoptée par le Sénat le 13 juin 2025, la Loi de finances rectificative n° 25/044 a réduit le budget de l'exercice 2025 de 1,7%, le ramenant de 51 553,5 milliards FC à 50 691,8 milliards FC (environ 17,2 milliards USD). Cette contraction résulte principalement de la persistance du conflit armé dans l'Est de la RDC qui a :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
            <li>Réduit les recettes minières provenant des zones affectées.</li>
            <li>Accru les dépenses de défense et de sécurité non prévues dans la loi de finances initiale.</li>
            <li>Perturbé les activités économiques dans plusieurs provinces.</li>
          </ul>
          <p className="text-gray-700">
            Malgré ce contexte, la LFR 2025 a pu être adoptée sans réduction plus importante grâce aux décaissements du FMI dans le cadre du programme de Facilité élargie de crédit (FEC) et de la Facilité pour la résilience et la durabilité (FRD).
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            3.4 La Loi de finances 2026 : budget en progression (LF n° 25/060)
            <InfoTooltip texte="La LF n° 25/060 du 29 décembre 2025 fixe le budget 2026 à 59 020,5 Mds FC, soit une progression de 16,4% par rapport à la LFR 2025. Elle reflète la consolidation des efforts de stabilisation macroéconomique." loi="LF n° 25/060 du 29 décembre 2025" />
          </h4>
          <p className="text-gray-700 mb-3">
            La Loi de finances pour l'exercice 2026, promulguée sous le numéro n° 25/060 le 29 décembre 2025, fixe les prévisions de recettes et de dépenses à 59 020,5 milliards de francs congolais, soit environ 20,3 milliards USD. Il s'agit d'une progression de 16,4% par rapport à la LFR 2025. Ce relèvement reflète la consolidation des efforts de stabilisation macroéconomique engagés ces dernières années.
          </p>
          <p className="text-gray-700 mb-3">
            L'Assemblée nationale a déclaré recevable le PLF 2026 le 19 novembre 2025 après des débats intenses d'environ six heures. Le budget 2026 est présenté en équilibre tant en recettes qu'en dépenses, conformément au principe d'équilibre posé par la LOFIP.
          </p>
          <div className="rounded-lg border border-rose-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Indicateur</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">LFR 2025</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">LF 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {[
                  ["Budget total","50 691,8 Mds FC","59 020,5 Mds FC"],
                  ["Equivalent USD","~17,2 Mds USD","~20,3 Mds USD"],
                  ["Rétrocession provinces","Art. 218-222 LOFIP","7 694,5 Mds FC (Art. 8 LF 2026)"],
                  ["Caisse péréquation","Art. 225-226 LOFIP","744,6 Mds FC (Art. 9 LF 2026)"],
                  ["Progression","(-1,7% vs LFI 2025)","(+16,4% vs LFR 2025)"],
                ].map(([i,v1,v2]) => (
                  <tr key={i} className="hover:bg-rose-50/50">
                    <td className="px-4 py-2 font-medium text-gray-800">{i}</td>
                    <td className="px-4 py-2 text-gray-700">{v1}</td>
                    <td className="px-4 py-2 text-gray-700">{v2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l3q1',
        question: "Selon l'article 5 de la Loi de finances n° 25/060 du 29 décembre 2025, quelle réforme est en cours d'expérimentation en RDC ?",
        options: [
          { id: 'a', texte: "La suppression du contrôle budgétaire préalable pour les ministères pilotes" },
          { id: 'b', texte: "La déconcentration de l'ordonnancement vers 9 ministères pilotes" },
          { id: 'c', texte: "Le transfert intégral des recettes fiscales aux provinces" },
          { id: 'd', texte: "La fusion de l'IGF et de la Cour des comptes" },
          { id: 'e', texte: "L'externalisation du recouvrement des recettes à des organismes privés" },
        ],
        reponse: 'b',
        explication: "L'article 5 de la LF n° 25/060 du 29 décembre 2025 autorise la déconcentration de l'ordonnancement à 9 ministères pilotes. Cette réforme vise à transférer progressivement la compétence d'ordonnancement du ministre ayant le budget dans ses attributions vers les ministères sectoriels, afin de renforcer leur responsabilité dans l'exécution de leurs programmes.",
      },
      {
        id: 'l3q2',
        question: "Quel est le montant total du budget de la RDC tel que fixé par la Loi de finances n° 25/060 du 29 décembre 2025 pour l'exercice 2026 ?",
        options: [
          { id: 'a', texte: "51 553,5 milliards de francs congolais" },
          { id: 'b', texte: "50 691,8 milliards de francs congolais" },
          { id: 'c', texte: "54 335,8 milliards de francs congolais" },
          { id: 'd', texte: "59 020,5 milliards de francs congolais" },
          { id: 'e', texte: "45 000,0 milliards de francs congolais" },
        ],
        reponse: 'd',
        explication: "La Loi de finances n° 25/060 du 29 décembre 2025 fixe le budget 2026 à 59 020,5 milliards de francs congolais (environ 20,3 milliards USD), représentant une progression de 16,4% par rapport à la LFR 2025 (50 691,8 Mds FC). Ce budget a été déclaré recevable par l'Assemblée nationale le 19 novembre 2025.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LECON 4 - Enjeux macroeconomiques et programme FMI
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'L4',
    titre: "Enjeux macroéconomiques et programme FMI (2025-2026)",
    lois: "LFR n° 25/044 · LF n° 25/060 · Constitution Art. 174-175 · LOFIP Art. 1-2",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            4.1 Le cadre macroéconomique 2025 : contexte de la réforme
            <InfoTooltip texte="Le cadre macroéconomique conditionne l'exécution des finances publiques. La LOFIP s'applique aux finances de l'État dans le cadre fixé par la Constitution (Art. 174-175) sur la souveraineté fiscale." loi="Constitution Art. 174-175 · LFR n° 25/044" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 174 de la Constitution dispose que les finances de l'État sont gérées conformément au principe de bonne gouvernance financière. L'article 175 précise que le budget de l'État prévoit et autorise, en recettes et en dépenses, les ressources et les charges de l'État. Ces dispositions constitutionnelles encadrent le contexte macroéconomique dans lequel s'inscrivent les réformes.
          </p>
          <p className="text-gray-700 mb-3">
            Le contexte macroéconomique de 2025 est marqué par plusieurs facteurs significatifs : le conflit armé persistant dans l'Est du pays, les ajustements budgétaires consécutifs, et la poursuite des réformes structurelles sous l'égide du FMI.
          </p>
          <div className="rounded-lg border border-rose-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Indicateur</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Valeur 2025</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {[
                  ["Taux de croissance du PIB","5,3%","FMI / BCC"],
                  ["Inflation moyenne","8,8%","BCC"],
                  ["Taux de change moyen","2 859,2 FC/USD","BCC"],
                  ["Budget LFR 2025","50 691,8 Mds FC (~17,2 Mds USD)","LFR n° 25/044"],
                  ["Pression fiscale","~12% du PIB","FMI / Ministère des Finances"],
                  ["Taux d'exécution T1 2025","17,1%","ODEP T1 2025"],
                ].map(([i,v,s]) => (
                  <tr key={i} className="hover:bg-rose-50/50">
                    <td className="px-4 py-2 font-medium text-gray-800">{i}</td>
                    <td className="px-4 py-2 text-gray-700">{v}</td>
                    <td className="px-4 py-2 text-gray-600 text-xs">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            4.2 Le programme FMI : Facilité élargie de crédit (FEC) et Facilité pour la résilience et la durabilité (FRD)
            <InfoTooltip texte="La RDC bénéficie d'un programme triennal avec le FMI (FEC + FRD). Le 19 décembre 2025, le FMI a approuvé un décaissement de 445 millions USD. Un 3e examen a abouti en mai 2026." loi="LOFIP Art. 1 et 2 - contexte international des finances publiques" />
          </h4>
          <p className="text-gray-700 mb-3">
            La RDC est engagée dans un programme triennal avec le Fonds monétaire international comprenant deux volets : la Facilité élargie de crédit (FEC) pour la stabilisation macroéconomique, et la Facilité pour la résilience et la durabilité (FRD) pour le financement de l'adaptation climatique.
          </p>
          <p className="text-gray-700 mb-3">
            Chronologie des revues et décaissements :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Mai 2025 :</strong> Accord au niveau des services FMI-RDC sur la 1re revue FEC et FRD - rééquilibrage du cadre macroéconomique.</li>
            <li><strong>19 décembre 2025 :</strong> Le Conseil d'administration du FMI approuve la 2e revue et un décaissement de 445 millions USD (570,9 millions DTS au titre de la FEC + 133,25 millions DTS au titre du FRD), portant le total à plus de 570,9 millions DTS décaissés.</li>
            <li><strong>6 mai 2026 :</strong> Fin de la mission FMI à Kinshasa - accord préliminaire sur la 3e revue FEC et 2e revue FRD. Ouverture de la voie à un nouveau décaissement d'environ 400 millions USD.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Ces programmes conditionnent les réformes structurelles des finances publiques, notamment la mobilisation des recettes (objectif : porter la pression fiscale de ~12% à 15-17% du PIB), la transparence budgétaire et la déconcentration de l'ordonnancement.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            4.3 Défis persistants de l'exécution budgétaire
            <InfoTooltip texte="Malgré les réformes, des défis structurels persistent : faible taux d'exécution, paiements hors système, migration des systèmes d'information (SYDONIA, ERAS), formation insuffisante des RPROG." loi="LOFIP Art. 43, 88-96 - cadre d'exécution du budget" />
          </h4>
          <p className="text-gray-700 mb-3">
            Malgré les avancées normatives, plusieurs défis structurels entravent la mise en oeuvre effective du budget-programme :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Faible taux d'exécution :</strong> seulement 17,1% au premier trimestre 2025 selon l'ODEP - le taux d'exécution des investissements ne dépasse pas 4% au T1.</li>
            <li><strong>Persistance des paiements hors système :</strong> les avances de trésorerie régularisées tardivement violent le principe de l'unité de trésorerie (Art. 110 LOFIP).</li>
            <li><strong>Migration des systèmes d'information :</strong> le basculement vers de nouveaux systèmes intégrés (SYDONIA pour les douanes, ERAS pour les recettes) est en cours mais incomplet.</li>
            <li><strong>Formation insuffisante des RPROG :</strong> les responsables de programmes (RPROG) manquent encore de formation pour piloter leurs budgets selon la logique de performance.</li>
            <li><strong>Impact du conflit à l'Est :</strong> la situation sécuritaire réduit les recettes dans les zones affectées et pèse sur les dépenses de défense.</li>
          </ul>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l4q1',
        question: "Selon les données macroéconomiques 2025, quel est le taux d'exécution budgétaire enregistré au 1er trimestre 2025 selon le rapport ODEP ?",
        options: [
          { id: 'a', texte: "4,0% - exclusivement pour les investissements" },
          { id: 'b', texte: "17,1% - taux global d'exécution T1 2025" },
          { id: 'c', texte: "50,0% - objectif mi-parcours fixé par le FMI" },
          { id: 'd', texte: "12,0% - correspondant à la pression fiscale" },
          { id: 'e', texte: "16,4% - progression du budget 2026 sur la LFR 2025" },
        ],
        reponse: 'b',
        explication: "Selon le rapport de l'ODEP (Observatoire de la Dépense Publique) du T1 2025, le taux global d'exécution budgétaire au 1er trimestre 2025 était de 17,1%. Le taux d'exécution spécifique aux investissements était encore plus faible (4%). Ces données illustrent les défis persistants de l'exécution budgétaire en RDC.",
      },
      {
        id: 'l4q2',
        question: "Quel article constitutionnel fonde le principe de bonne gouvernance des finances de l'État en RDC ?",
        options: [
          { id: 'a', texte: "Article 122 point 3 - compétence législative sur les finances publiques" },
          { id: 'b', texte: "Article 174 - gestion des finances selon le principe de bonne gouvernance financière" },
          { id: 'c', texte: "Article 180 - Cour des comptes et contrôle des finances" },
          { id: 'd', texte: "Article 178 - Parlement et loi de reddition des comptes" },
          { id: 'e', texte: "Article 126 - domaine de la loi organique" },
        ],
        reponse: 'b',
        explication: "L'article 174 de la Constitution dispose que les finances de l'État sont gérées conformément au principe de bonne gouvernance financière. L'article 175 précise que le budget de l'État prévoit et autorise, en recettes et en dépenses, les ressources et les charges de l'État. Ces articles constituent le fondement constitutionnel de la gestion des finances publiques en RDC.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LECON 5 - Perspectives et recommandations
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'L5',
    titre: "Perspectives, recommandations et enjeux de la décentralisation fiscale",
    lois: "LOFIP Art. 218-226, 232, 234 · Constitution Art. 175 · Loi n° 23/030 · LF n° 25/060",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            5.1 L'effectivité de la décentralisation fiscale : les 40% aux provinces (Art. 218-222 LOFIP)
            <InfoTooltip texte="Les articles 218 à 222 de la LOFIP organisent la rétrocession de 40% des recettes à caractère national aux provinces. L'article 232 précise que ces dispositions sont d'application immédiate depuis 2011." loi="LOFIP Art. 218-222 et 232" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 218 de la LOFIP pose le principe de la rétrocession aux provinces de 40% des recettes à caractère national. L'article 219 précise les modalités de calcul, et l'article 220 organise les transferts mensuels automatiques. Conformément à l'article 232, ces dispositions sont d'application immédiate depuis la promulgation de la LOFIP en 2011 - elles ne faisaient pas partie des dispositions soumises au moratoire.
          </p>
          <p className="text-gray-700 mb-3">
            La Loi de finances n° 25/060 du 29 décembre 2025 fixe à son article 8 la rétrocession aux provinces à 7 694,5 milliards de francs congolais pour l'exercice 2026, et l'article 9 fixe la dotation à la Caisse nationale de péréquation à 744,6 milliards FC.
          </p>
          <p className="text-gray-700 mb-3">
            Malgré le cadre légal, l'effectivité des transferts pose encore des difficultés pratiques : retards dans les virements, insuffisance des capacités de gestion provinciales, et faible taux d'utilisation des crédits provinciaux. La consolidation de la décentralisation budgétaire reste un défi majeur à l'horizon 2029.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            5.2 Cinq perspectives pour les réformes à l'horizon 2029
            <InfoTooltip texte="L'horizon 2029 correspond à la date de basculement intégral vers le budget-programme selon la 2e prorogation (Loi n° 23/030). Cinq axes de réforme doivent être conduits d'ici cette échéance." loi="Loi n° 23/030 · LOFIP Art. 234" />
          </h4>
          <p className="text-gray-700 mb-3">
            A l'horizon 2029, date limite du basculement effectif vers le budget-programme selon la loi n° 23/030, cinq perspectives de réforme s'imposent :
          </p>
          <div className="space-y-3">
            {[
              {
                num: "1",
                titre: "Accélération du basculement vers le budget-programme",
                texte: "Conformément aux articles 43-44 et 234 de la LOFIP tels que modifiés par la loi 23/030, le basculement total doit intervenir avant le 1er janvier 2029. Les préalables restants : finaliser le découpage de tous les ministères en programmes, former les RPROG, déployer les systèmes d'information intégrés.",
              },
              {
                num: "2",
                titre: "Renforcement de la mobilisation des recettes",
                texte: "La pression fiscale actuelle (~12% du PIB) reste insuffisante. L'objectif est de l'amener à 15-17% du PIB, conformément aux recommandations du FMI et aux engagements pris dans le cadre de la FEC. Cela implique l'élargissement de l'assiette fiscale et la modernisation de l'administration fiscale.",
              },
              {
                num: "3",
                titre: "Amélioration du taux d'exécution budgétaire",
                texte: "Le taux d'exécution de 17,1% au T1 2025 est insuffisant. La déconcentration de l'ordonnancement (Art. 5 LF 2026), en responsabilisant les ministères sectoriels, devrait améliorer ce taux. L'objectif est d'atteindre des taux d'exécution cohérents avec les besoins de développement.",
              },
              {
                num: "4",
                titre: "Consolidation effective de la décentralisation",
                texte: "L'effectivité des 40% des recettes nationales vers les provinces (Art. 218-222 LOFIP) doit être renforcée. Cela passe par l'automatisation des virements, le renforcement des capacités des gestionnaires provinciaux, et la mise en place d'un système de suivi-évaluation des budgets provinciaux.",
              },
              {
                num: "5",
                titre: "Transparence et reddition des comptes",
                texte: "La reddition des comptes (Art. 28-31 LOFIP) et le renforcement de la Cour des comptes (Art. 180 Constitution, Art. 123-126 LOFIP) sont essentiels. Le déploiement du SYSCOLAF (Système de comptabilité locale des finances publiques) et la publication régulière des rapports d'exécution budgétaire constituent des avancées nécessaires.",
              },
            ].map(p => (
              <div key={p.num} className="rounded-lg border border-rose-200 p-4 bg-rose-50/30">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-600 text-white text-sm font-bold flex items-center justify-center">{p.num}</span>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-1">{p.titre}</h5>
                    <p className="text-sm text-gray-700">{p.texte}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            5.3 La révision budgétaire extraordinaire de 2026
            <InfoTooltip texte="En juin 2026, l'Assemblée nationale a ouvert une session extraordinaire pour examiner un collectif budgétaire (révision à la hausse du budget 2026), en raison de la persistance des dépenses liées au conflit dans l'Est." loi="Constitution Art. 122 · LOFIP Art. 28" />
          </h4>
          <p className="text-gray-700 mb-3">
            Le 26 juin 2026, l'Assemblée nationale de la RDC a ouvert une session extraordinaire dont l'ordre du jour comprenait notamment un collectif budgétaire - une révision à la hausse du budget 2026. Cette révision est rendue nécessaire par la persistance des dépenses liées au conflit armé dans l'Est du pays, qui continue de peser sur les finances publiques malgré la progression globale du budget.
          </p>
          <p className="text-gray-700">
            Cette démarche illustre le mécanisme de la loi de finances rectificative prévu par la LOFIP, qui permet au Gouvernement d'adapter en cours d'exercice les prévisions initiales aux réalités économiques et sécuritaires. Elle rappelle l'importance du contrôle parlementaire comme mécanisme central de la gouvernance financière (Art. 127-130 LOFIP).
          </p>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l5q1',
        question: "Selon l'article 232 de la LOFIP, les dispositions relatives à la rétrocession de 40% des recettes nationales aux provinces (Art. 218-222) sont-elles soumises au moratoire de mise en oeuvre ?",
        options: [
          { id: 'a', texte: "Oui, elles font partie des dispositions soumises au moratoire jusqu'en 2029" },
          { id: 'b', texte: "Non, elles sont d'application immédiate depuis la promulgation de la LOFIP" },
          { id: 'c', texte: "Oui, mais uniquement pour les provinces à statut particulier" },
          { id: 'd', texte: "Non, elles sont abrogées par la loi n° 23/030 de 2023" },
          { id: 'e', texte: "Oui, jusqu'à ce qu'un décret d'application soit pris par le Premier ministre" },
        ],
        reponse: 'b',
        explication: "L'article 232 de la LOFIP énumère les dispositions d'application immédiate, parmi lesquelles figurent expressément 'des articles 218 à 222 et 225 à 226 relatifs à la répartition des recettes aux provinces, aux entités territoriales décentralisées, et à la caisse nationale de péréquation'. Ces dispositions ne sont donc pas soumises au moratoire et s'appliquent depuis 2011.",
      },
      {
        id: 'l5q2',
        question: "Selon la Loi de finances n° 25/060 du 29 décembre 2025, quel est le montant fixé à l'article 8 pour la rétrocession aux provinces pour l'exercice 2026 ?",
        options: [
          { id: 'a', texte: "744,6 milliards de francs congolais" },
          { id: 'b', texte: "59 020,5 milliards de francs congolais" },
          { id: 'c', texte: "7 694,5 milliards de francs congolais" },
          { id: 'd', texte: "50 691,8 milliards de francs congolais" },
          { id: 'e', texte: "5 000,0 milliards de francs congolais" },
        ],
        reponse: 'c',
        explication: "L'article 8 de la Loi de finances n° 25/060 du 29 décembre 2025 fixe la rétrocession aux provinces à 7 694,5 milliards de francs congolais pour l'exercice 2026. L'article 9 fixe quant à lui la dotation à la Caisse nationale de péréquation à 744,6 milliards FC. Ces montants sont conformes au principe de la rétrocession de 40% des recettes nationales posé par les articles 218-222 de la LOFIP.",
      },
    ],
  },
  {
    id: 'L6',
    titre: "Procedure d'elaboration du budget selon la Circulaire N° 004/ME/MIN.BUDGET/2025",
    lois: "Art. 107 LOFIP · Circulaire N° 004/ME/MIN.BUDGET/2025 §§ 34, 55, 71, 116 · Constitution Art. 126",
    contenu: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            6.1 Le calendrier legal de depot et de vote du PLF (§55 Circulaire)
            <InfoTooltip texte="Le §55 de la Circulaire N° 004/ME/MIN.BUDGET/2025 rappelle les delais constitutionnels : 60 jours pour le vote (40 AN + 20 Senat), depot PLF au 15 septembre. Ce delai est fixe par l'Art. 126 de la Constitution et l'Art. 83 al. 1 LOFIP." loi="Constitution Art. 126 · Art. 83 al. 1 LOFIP · §55 Circulaire N° 004/ME/MIN.BUDGET/2025" />
          </h4>
          <p className="text-gray-700 mb-3">
            Le §55 de la Circulaire N° 004/ME/MIN.BUDGET/2025 rappelle le cadre constitutionnel et legal du vote du PLF. L'article 126 de la Constitution dispose que le Parlement dispose au total de 60 jours pour l'adoption de la loi de finances : 40 jours pour l'Assemblee nationale et 20 jours pour le Senat. L'article 83 alinea 1 de la LOFIP fixe la date limite de depot du PLF au 15 septembre de chaque annee pour respecter ce calendrier constitutionnel.
          </p>
          <p className="text-gray-700 mb-3">
            La Circulaire precise que le respect strict de ce calendrier conditionne la regularite de l'ensemble de la procedure budgetaire. Un depot tardif du PLF comprime le delai de vote parlementaire et peut conduire a l'application de l'article 83 alinea 7 de la LOFIP (ordonnance-loi presidentielle si le PLF n'est pas vote dans les delais). La date limite pour le depot des previsions sectorielles est fixee au 22 juillet (§34 Circulaire).
          </p>
          <div className="rounded-lg border border-rose-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-rose-50">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Etape</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Date limite</th>
                  <th className="text-left px-4 py-2 font-semibold text-rose-700">Fondement legal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {[
                  ['Depot previsions sectorielles ministeres','22 juillet','§34 Circulaire N° 004/ME/MIN.BUDGET/2025'],
                  ['Conferences fiscales (mesures nouvelles)','Avant inscription PLF','§71 Circulaire N° 004/ME/MIN.BUDGET/2025'],
                  ['Depot PLF a l\'Assemblee nationale','15 septembre','Art. 83 al. 1 LOFIP'],
                  ['Vote Assemblee nationale','40 jours','Art. 126 Constitution'],
                  ['Vote Senat','20 jours','Art. 126 Constitution'],
                  ['Promulgation par President','Avant 31 decembre','Constitution Art. 100'],
                ].map(([e,d,f]) => (
                  <tr key={e} className="hover:bg-rose-50/50">
                    <td className="px-4 py-2 text-gray-700">{e}</td>
                    <td className="px-4 py-2 font-medium text-rose-700">{d}</td>
                    <td className="px-4 py-2 text-gray-500 text-xs">{f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            6.2 La conference fiscale : coordination obligatoire avant toute mesure nouvelle (§71 Circulaire)
            <InfoTooltip texte="Le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025 impose que toute mesure fiscale nouvelle soit prealablement discutee en conference fiscale, organisee sous la coordination du Ministere du Budget. Aucune mesure nouvelle ne peut etre inscrite au PLF sans ce passage obligatoire." loi="§71 Circulaire N° 004/ME/MIN.BUDGET/2025 · Art. 107 LOFIP" />
          </h4>
          <p className="text-gray-700 mb-3">
            Le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025 consacre la conference fiscale comme etape preambulaire obligatoire a l'inscription de toute mesure fiscale dans le PLF. Cette conference est organisee sous la coordination du Ministere du Budget, qui doit s'assurer de la coherence des mesures fiscales envisagees avec les orientations macroeconomiques et les objectifs de recettes.
          </p>
          <p className="text-gray-700 mb-3">
            La conference fiscale reunit les principales administrations fiscales et douanieres (DGI, DGDA, DGRAD) ainsi que le Ministere des Finances. Son role est triple : evaluer l'impact budgetaire des mesures nouvelles, verifier la conformite aux engagements FMI, et garantir la cohesion de la politique fiscale. Aucune mesure fiscale nouvelle ne peut figurer dans le PLF sans avoir ete validee lors de cette conference.
          </p>
          <p className="text-gray-700">
            Cette exigence s'articule avec l'article 107 LOFIP qui institue l'avis prealable obligatoire du Ministre du Budget pour toute decision d'exoneration ou de creation d'une nouvelle structure fiscale. Le non-respect de cette procedure rend la mesure juridiquement irreguliere.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            6.3 L'article 107 LOFIP : l'avis prealable du Ministre du Budget (§116 Circulaire)
            <InfoTooltip texte="L'article 107 de la LOFIP dispose que toute exoneration fiscale ou creation d'une nouvelle structure est subordonnee a l'avis prealable du Ministre du Budget. Le §116 de la Circulaire rappelle cette obligation et sanctionne les exonerations accordees en dehors de cette procedure." loi="Art. 107 LOFIP · §116 Circulaire N° 004/ME/MIN.BUDGET/2025" />
          </h4>
          <p className="text-gray-700 mb-3">
            L'article 107 de la LOFIP constitue une disposition cle du controle budgetaire preventif. Il dispose que toute decision accordant une exoneration fiscale ou creant une nouvelle structure administrative generant des charges budgetaires est subordonnee a l'avis prealable obligatoire du Ministre du Budget. Cet avis prealable garantit que l'impact budgetaire de la mesure envisagee a ete evalue et est compatible avec l'equilibre des finances publiques.
          </p>
          <p className="text-gray-700 mb-3">
            Le §116 de la Circulaire N° 004/ME/MIN.BUDGET/2025 rappelle cette obligation a tous les ministres sectoriels et instructeurs : aucune exoneration ne peut etre accordee et aucune structure nouvelle ne peut etre creee sans cet avis prealable. Une exoneration accordee en violation de cette procedure est entachee d'irregularite et expose son auteur a une mise en cause devant la Cour des comptes.
          </p>
          <div className="rounded-lg border border-rose-200 p-4 bg-rose-50/30">
            <p className="text-sm font-semibold text-rose-700 mb-2">Conditions requises pour une exoneration fiscale legale (Art. 107 LOFIP)</p>
            <ul className="space-y-1">
              {[
                'Avis prealable du Ministre du Budget (obligatoire)',
                'Evaluation chiffree de l\'impact budgetaire de l\'exoneration',
                'Conformite avec les orientations de la politique fiscale du PLF',
                'Inscription dans le rapport sur les depenses fiscales (Art. 79 pt. 11 LOFIP)',
                'Validation lors de la conference fiscale (§71 Circulaire)',
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i+1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
    qcms: [
      {
        id: 'l6q1',
        question: "Selon le §34 de la Circulaire N° 004/ME/MIN.BUDGET/2025, quelle est la date limite imposee aux ministeres sectoriels pour le depot de leurs previsions budgetaires ?",
        options: [
          { id: 'a', texte: "Le 15 septembre - date de depot du PLF" },
          { id: 'b', texte: "Le 31 juillet - date de cloture de la session ordinaire" },
          { id: 'c', texte: "Le 22 juillet - date limite imposee par la Circulaire" },
          { id: 'd', texte: "Le 1er juin - avant le debut des conferences budgetaires sectorielles" },
          { id: 'e', texte: "Le 30 juin - fin du premier semestre de l'exercice" },
        ],
        reponse: 'c',
        explication: "Le §34 de la Circulaire N° 004/ME/MIN.BUDGET/2025 fixe au 22 juillet la date limite pour le depot des previsions sectorielles par les ministeres. Ce delai est imperatif : il conditionne l'organisation des conferences budgetaires sectorielles et le respect du calendrier de depot du PLF au 15 septembre (Art. 83 al. 1 LOFIP et Art. 126 Constitution). Tout retard sectoriel propage un retard systemique sur l'ensemble de la procedure budgetaire.",
      },
      {
        id: 'l6q2',
        question: "Selon le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025, quelle institution coordonne la conference fiscale prealable a l'inscription de toute mesure fiscale nouvelle dans le PLF ?",
        options: [
          { id: 'a', texte: "La Direction generale des impots (DGI), en tant qu'administation fiscale centrale" },
          { id: 'b', texte: "Le Ministere des Finances, responsable de la politique fiscale" },
          { id: 'c', texte: "Le Ministere du Budget, sous la coordination duquel la conference fiscale est organisee" },
          { id: 'd', texte: "La Cour des comptes, pour garantir l'independance de la procedure fiscale" },
          { id: 'e', texte: "Le Premier ministre, en tant que chef du Gouvernement" },
        ],
        reponse: 'c',
        explication: "Le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025 dispose que la conference fiscale est organisee sous la COORDINATION DU MINISTERE DU BUDGET. Cette conference doit etre tenue avant l'inscription de toute mesure fiscale nouvelle dans le PLF. Elle reunit les principales administrations fiscales (DGI, DGDA, DGRAD) et le Ministere des Finances, mais c'est le Ministere du Budget qui la coordonne et qui valide la coherence des mesures envisagees avec les objectifs de recettes.",
      },
    ],
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// QCM GLOBAUX (g1-g15, 5 options chacun)
// ─────────────────────────────────────────────────────────────────────────────

const QCM_GLOBAUX: QCM[] = [
  {
    id: 'g1',
    question: "L'article 1er de la LOFIP dispose que cette loi a été adoptée conformément à quel article de la Constitution ?",
    options: [
      { id: 'a', texte: "Article 122 point 1 - compétence sur les libertés publiques" },
      { id: 'b', texte: "Article 122 point 3 - compétence sur les finances publiques" },
      { id: 'c', texte: "Article 180 - institution de la Cour des comptes" },
      { id: 'd', texte: "Article 174 - principe de bonne gouvernance financière" },
      { id: 'e', texte: "Article 126 - domaine de la loi organique" },
    ],
    reponse: 'b',
    explication: "L'article 1er de la LOFIP dispose : 'La présente loi fixe, conformément à l'article 122 point 3 de la Constitution, les règles concernant les finances publiques.' L'article 122 point 3 de la Constitution réserve au législateur la compétence de fixer les règles relatives aux finances publiques de l'État, des provinces et des entités territoriales décentralisées.",
  },
  {
    id: 'g2',
    question: "Selon l'article 2 de la LOFIP, à quelles finances s'applique la présente loi ?",
    options: [
      { id: 'a', texte: "Uniquement aux finances du pouvoir central" },
      { id: 'b', texte: "Uniquement aux finances des provinces et des ETD" },
      { id: 'c', texte: "Aux finances de l'État : pouvoir central, provinces, ETD et leurs organismes auxiliaires" },
      { id: 'd', texte: "Aux finances du pouvoir central et des établissements publics nationaux uniquement" },
      { id: 'e', texte: "Aux finances des entreprises publiques et des sociétés d'économie mixte" },
    ],
    reponse: 'c',
    explication: "L'article 2 de la LOFIP est explicite : 'La présente loi s'applique aux finances de l'État, à savoir les finances du pouvoir central, celles des provinces, ainsi que celles des entités territoriales décentralisées et de leurs organismes auxiliaires.' Le champ d'application est donc très large, couvrant l'ensemble des niveaux de l'administration publique.",
  },
  {
    id: 'g3',
    question: "Selon la Loi n° 23/030 du 28 juin 2023, parmi les enrichissements apportés à la LOFIP, lequel concerne les définitions de l'article 3 ?",
    options: [
      { id: 'a', texte: "L'ajout de la définition de 'contrôleur budgétaire'" },
      { id: 'b', texte: "L'ajout des définitions de 'débat d'orientation budgétaire' et de 'dotation budgétaire'" },
      { id: 'c', texte: "L'ajout de la définition de 'responsable de programme (RPROG)'" },
      { id: 'd', texte: "L'ajout de la définition de 'loi de reddition des comptes'" },
      { id: 'e', texte: "L'ajout de la définition de 'Caisse nationale de péréquation'" },
    ],
    reponse: 'b',
    explication: "La loi n° 23/030 du 28 juin 2023 a notamment apporté 'l'ajout, à l'article 3, des définitions des notions de débat d'orientation budgétaire et de dotation budgétaire'. Ces nouvelles définitions enrichissent le cadre conceptuel de la LOFIP et institutionnalisent le débat d'orientation budgétaire comme étape préalable à l'élaboration du PLF.",
  },
  {
    id: 'g4',
    question: "Selon l'article 44 de la LOFIP, quelle conséquence entraîne la présentation d'un programme sous forme de fonction interministérielle ?",
    options: [
      { id: 'a', texte: "L'automatisation du transfert des crédits entre ministères" },
      { id: 'b', texte: "La suppression du contrôle budgétaire préalable" },
      { id: 'c', texte: "Une coordination dans l'exécution des programmes et une présentation conjointe des résultats" },
      { id: 'd', texte: "Le transfert de la responsabilité financière au Premier ministre" },
      { id: 'e', texte: "La fusion des programmes concernés en un seul budget sectoriel" },
    ],
    reponse: 'c',
    explication: "L'article 44 de la LOFIP précise que 'La présentation des programmes sous forme d'une fonction interministérielle entraîne une coordination dans l'exécution des programmes et une présentation conjointe de l'exécution et des résultats.' Cela signifie que les ministères concernés doivent coordonner leur action et rendre compte conjointement des résultats atteints.",
  },
  {
    id: 'g5',
    question: "Quelle est la date à laquelle la mission du FMI a conclu un accord préliminaire sur la 3e revue FEC et 2e revue FRD à Kinshasa ?",
    options: [
      { id: 'a', texte: "19 décembre 2025" },
      { id: 'b', texte: "13 juin 2025" },
      { id: 'c', texte: "19 novembre 2025" },
      { id: 'd', texte: "6 mai 2026" },
      { id: 'e', texte: "26 juin 2026" },
    ],
    reponse: 'd',
    explication: "La mission du FMI conduite par Calixte Ahokpossi s'est achevée à Kinshasa le 6 mai 2026, après près de deux semaines d'échanges. Un accord préliminaire a été trouvé sur la 3e revue FEC et la 2e revue FRD, ouvrant la voie à un nouveau décaissement estimé à environ 400 millions USD. Le 19 décembre 2025 correspondait quant à lui à l'approbation de la 2e revue.",
  },
  {
    id: 'g6',
    question: "Selon l'article 232 de la LOFIP, les dispositions relatives à la gestion de la trésorerie (Art. 110) sont-elles soumises au moratoire ?",
    options: [
      { id: 'a', texte: "Oui, elles font partie des dispositions différées jusqu'en 2029" },
      { id: 'b', texte: "Non, elles sont d'application immédiate depuis la promulgation de la LOFIP" },
      { id: 'c', texte: "Oui, mais uniquement pour les provinces dont le budget est inférieur à 1 milliard FC" },
      { id: 'd', texte: "Non, elles ont été abrogées et remplacées par le RGCP 13/050" },
      { id: 'e', texte: "Oui, leur application est suspendue jusqu'à adoption d'un décret d'application" },
    ],
    reponse: 'b',
    explication: "L'article 232 de la LOFIP énumère les dispositions d'application immédiate, parmi lesquelles figure expressément 'des articles 110 et 209 relatifs à la gestion de la trésorerie'. L'unité de trésorerie s'applique donc depuis 2011 et n'est pas soumise au moratoire sur le budget-programme.",
  },
  {
    id: 'g7',
    question: "La loi n° 18/010 du 9 juillet 2018 constitue quelle modification de la LOFIP ?",
    options: [
      { id: 'a', texte: "La 1re modification - 1re prorogation de 5 ans du budget-programme" },
      { id: 'b', texte: "La 2e modification - institution de la Caisse nationale de péréquation" },
      { id: 'c', texte: "La 3e modification - création du RGCP" },
      { id: 'd', texte: "La 1re modification - suppression du budget de moyens" },
      { id: 'e', texte: "La 2e modification - 2e prorogation jusqu'en 2029" },
    ],
    reponse: 'a',
    explication: "La loi n° 18/010 du 9 juillet 2018 constitue la 1re modification de la LOFIP. Elle a accordé au Gouvernement une première prorogation de 5 ans du délai de basculement vers le budget-programme, repoussant l'échéance de 2019 à 2024. La 2e modification est intervenue avec la loi n° 23/030 du 28 juin 2023 qui a prorogé à nouveau jusqu'en 2029.",
  },
  {
    id: 'g8',
    question: "En vertu de quelle disposition la loi de finances de l'année fixe-t-elle les crédits par programme avec autorisation d'engagement (AE) et crédits de paiement (CP) ?",
    options: [
      { id: 'a', texte: "Article 8 de la LOFIP - spécialité des crédits" },
      { id: 'b', texte: "Article 22 de la LOFIP - contenu de la loi de finances de l'année" },
      { id: 'c', texte: "Article 43 de la LOFIP - définition du programme" },
      { id: 'd', texte: "Article 232 de la LOFIP - dispositions d'application immédiate" },
      { id: 'e', texte: "Article 175 de la Constitution - contenu du budget de l'État" },
    ],
    reponse: 'b',
    explication: "L'article 22 de la LOFIP dispose : 'La loi de finances de l'année fixe pour le budget général, par ministère ou institution et par programme, le montant des autorisations d'engagement annuelles et pluriannuelles ainsi que des crédits de paiement.' La distinction AE/CP est une innovation majeure du budget-programme qui permet de gérer les engagements pluriannuels.",
  },
  {
    id: 'g9',
    question: "Selon l'article 9 de la Loi de finances n° 25/060 du 29 décembre 2025, quel est le montant de la dotation à la Caisse nationale de péréquation pour 2026 ?",
    options: [
      { id: 'a', texte: "59 020,5 milliards de francs congolais" },
      { id: 'b', texte: "7 694,5 milliards de francs congolais" },
      { id: 'c', texte: "744,6 milliards de francs congolais" },
      { id: 'd', texte: "50 691,8 milliards de francs congolais" },
      { id: 'e', texte: "1 000,0 milliards de francs congolais" },
    ],
    reponse: 'c',
    explication: "L'article 9 de la LF n° 25/060 du 29 décembre 2025 fixe la dotation à la Caisse nationale de péréquation à 744,6 milliards de francs congolais pour l'exercice 2026. La Caisse nationale de péréquation est instituée par les articles 225-226 de la LOFIP, qui sont également d'application immédiate selon l'article 232 de la même loi.",
  },
  {
    id: 'g10',
    question: "Selon la LOFIP (Art. 234 combiné avec la Loi n° 23/030), à quelle date est désormais fixée l'entrée en vigueur intégrale du budget-programme en RDC ?",
    options: [
      { id: 'a', texte: "Le 13 juillet 2011 - date de promulgation de la LOFIP" },
      { id: 'b', texte: "Le 1er janvier 2019 - délai initial de la LOFIP" },
      { id: 'c', texte: "Le 1er janvier 2024 - après la 1re prorogation" },
      { id: 'd', texte: "Le 1er janvier 2029 - après la 2e prorogation" },
      { id: 'e', texte: "Le 1er janvier 2035 - sous réserve d'une 3e prorogation éventuelle" },
    ],
    reponse: 'd',
    explication: "Après deux prorogations successives (loi n° 18/010 de 2018 et loi n° 23/030 de 2023), l'entrée en vigueur intégrale du budget-programme est désormais fixée au 1er janvier 2029. Le délai initial de l'article 234 de la LOFIP était le 1er janvier 2019 (8e année après la promulgation en 2011). Deux prorogations ont décalé cette échéance de 10 ans.",
  },
  {
    id: 'g11',
    question: "L'Assemblée nationale a ouvert une session extraordinaire le 26 juin 2026 pour examiner quel type d'acte budgétaire ?",
    options: [
      { id: 'a', texte: "La loi de reddition des comptes de l'exercice 2024" },
      { id: 'b', texte: "La loi de finances initiale pour l'exercice 2027" },
      { id: 'c', texte: "Un collectif budgétaire - révision à la hausse du budget 2026" },
      { id: 'd', texte: "La loi portant 3e prorogation du budget-programme" },
      { id: 'e', texte: "La ratification du programme FMI-RDC (3e revue)" },
    ],
    reponse: 'c',
    explication: "Le 26 juin 2026, l'Assemblée nationale a ouvert une session extraordinaire dont l'ordre du jour comprenait un collectif budgétaire, soit une révision à la hausse du budget 2026. Cette révision est rendue nécessaire par la persistance des dépenses liées au conflit armé dans l'Est du pays. Elle illustre le mécanisme de la loi de finances rectificative prévu par la LOFIP.",
  },
  {
    id: 'g12',
    question: "Le programme FMI-RDC comprend deux facilités. Laquelle est destinée au financement de l'adaptation climatique ?",
    options: [
      { id: 'a', texte: "La Facilité élargie de crédit (FEC) - stabilisation macroéconomique" },
      { id: 'b', texte: "La Facilité pour la résilience et la durabilité (FRD) - adaptation climatique" },
      { id: 'c', texte: "La Facilité de crédit rapide (FCR) - crises d'urgence" },
      { id: 'd', texte: "La Facilité de protection de la dette (FPD) - restructuration de la dette" },
      { id: 'e', texte: "Le Fonds de Stabilisation des Cours des Matières premières (FSCMP)" },
    ],
    reponse: 'b',
    explication: "Le programme FMI-RDC comprend deux volets : la Facilité élargie de crédit (FEC) qui vise à préserver la stabilité macroéconomique, améliorer le climat des affaires et renforcer la gouvernance, et la Facilité pour la résilience et la durabilité (FRD) qui aide la RDC à renforcer ses capacités d'atténuation et d'adaptation au changement climatique, consolisant son rôle de 'pays solution' dans la transition climatique mondiale.",
  },
  {
    id: 'g13',
    question: "Selon l'article 231 de la LOFIP, que devaient faire les organismes auxiliaires précédemment intégrés dans les budgets dès la promulgation de la loi ?",
    options: [
      { id: 'a', texte: "Etre supprimés et leurs activités transférées aux ministères de tutelle" },
      { id: 'b', texte: "Etre maintenus sans modification pendant la période de moratoire" },
      { id: 'c', texte: "Etre traités et reclassés en services de dépenses, budgets annexes ou établissements publics" },
      { id: 'd', texte: "Etre fusionnés avec les services centraux de l'État" },
      { id: 'e', texte: "Etre transférés aux provinces dans le cadre de la décentralisation" },
    ],
    reponse: 'c',
    explication: "L'article 231 de la LOFIP dispose : 'Dès la promulgation de la présente loi, les organismes auxiliaires précédemment intégrés dans le budget du pouvoir central, des provinces et des entités territoriales décentralisées sont traités et reclassés suivant les critères soit de services de dépenses, soit de budgets annexes, soit enfin d'établissements publics.' Ce reclassement devait intervenir immédiatement en 2011.",
  },
  {
    id: 'g14',
    question: "Quel est le taux de pression fiscale actuel de la RDC en 2025, et quel est l'objectif visé selon les recommandations du FMI ?",
    options: [
      { id: 'a', texte: "Actuel : 20% du PIB - objectif : 25% du PIB" },
      { id: 'b', texte: "Actuel : 8,8% du PIB - objectif : 12% du PIB" },
      { id: 'c', texte: "Actuel : ~12% du PIB - objectif : 15-17% du PIB" },
      { id: 'd', texte: "Actuel : 17,1% du PIB - objectif : 20% du PIB" },
      { id: 'e', texte: "Actuel : 5,3% du PIB - objectif : 10% du PIB" },
    ],
    reponse: 'c',
    explication: "La pression fiscale actuelle de la RDC est d'environ 12% du PIB, un niveau insuffisant comparé à la moyenne africaine (15-17%). Les recommandations du FMI et les engagements dans le cadre de la FEC visent à porter ce taux à 15-17% du PIB, ce qui implique l'élargissement de l'assiette fiscale, la lutte contre la fraude et l'évasion fiscales, et la modernisation de l'administration fiscale.",
  },
  {
    id: 'g15',
    question: "Selon l'article 233 de la LOFIP, parmi les textes suivants, lequel la LOFIP de 2011 a-t-elle modifié (et non abrogé) ?",
    options: [
      { id: 'a', texte: "La loi financière n° 83-003 du 23 février 1983" },
      { id: 'b', texte: "L'ordonnance-loi n° 87-004 du 10 janvier 1987" },
      { id: 'c', texte: "L'article 16 de la Loi n° 08/012 du 31 juillet 2008 relatif au calendrier des sessions provinciales" },
      { id: 'd', texte: "Le Décret n° 13/050 portant RGCP" },
      { id: 'e', texte: "La Constitution de 2006 en son article 122" },
    ],
    reponse: 'c',
    explication: "L'article 233 de la LOFIP précise qu'en plus d'abroger la loi financière de 1983, 'la présente loi modifie les dispositions de l'article 16 relatif au calendrier des sessions ordinaires des Assemblées provinciales et abroge les dispositions des articles 54 alinéas 2 et 3 [...] 55 [...] et 58 alinéa 1er [...] de la Loi 08/012 du 31 juillet 2008 portant principes fondamentaux relatifs à la libre administration des Provinces.' L'article 16 est donc modifié, non abrogé.",
  },
  {
    id: 'g16',
    question: "Selon le §34 de la Circulaire N° 004/ME/MIN.BUDGET/2025, quelle est la date limite imposee aux ministeres sectoriels pour transmettre leurs previsions budgetaires au Ministere du Budget ?",
    options: [
      { id: 'a', texte: "Le 15 septembre, date de depot du PLF a l'Assemblee nationale" },
      { id: 'b', texte: "Le 31 juillet, fin de la session parlementaire ordinaire" },
      { id: 'c', texte: "Le 22 juillet, date limite fixee par la Circulaire N° 004/ME/MIN.BUDGET/2025" },
      { id: 'd', texte: "Le 30 juin, cloture du premier semestre de l'exercice" },
      { id: 'e', texte: "Le 1er aout, debut des conferences budgetaires sectorielles" },
    ],
    reponse: 'c',
    explication: "Le §34 de la Circulaire N° 004/ME/MIN.BUDGET/2025 fixe au 22 juillet la date limite de depot des previsions sectorielles. Ce delai conditionne les conferences budgetaires et le respect de la date de depot du PLF au 15 septembre (Art. 83 al. 1 LOFIP). Tout depassement propage un retard sur l'ensemble de la chaine budgetaire jusqu'au vote parlementaire.",
  },
  {
    id: 'g17',
    question: "Selon le §55 de la Circulaire N° 004/ME/MIN.BUDGET/2025 et l'article 126 de la Constitution, combien de jours le Parlement dispose-t-il pour voter le PLF, et comment ce delai est-il reparti entre les deux chambres ?",
    options: [
      { id: 'a', texte: "30 jours au total : 20 pour l'AN et 10 pour le Senat" },
      { id: 'b', texte: "45 jours au total : 30 pour l'AN et 15 pour le Senat" },
      { id: 'c', texte: "60 jours au total : 40 pour l'AN et 20 pour le Senat" },
      { id: 'd', texte: "60 jours au total : 30 pour l'AN et 30 pour le Senat" },
      { id: 'e', texte: "90 jours au total : 60 pour l'AN et 30 pour le Senat" },
    ],
    reponse: 'c',
    explication: "Le §55 de la Circulaire N° 004/ME/MIN.BUDGET/2025 rappelle le cadre constitutionnel : l'article 126 de la Constitution dispose que le Parlement dispose de 60 jours pour adopter la loi de finances, repartis entre 40 jours pour l'Assemblee nationale et 20 jours pour le Senat. Le depot du PLF au 15 septembre (Art. 83 al. 1 LOFIP) permet de respecter ce calendrier pour une adoption avant le 31 decembre.",
  },
  {
    id: 'g18',
    question: "Selon le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025, quelle est la condition prealable obligatoire a l'inscription de toute mesure fiscale nouvelle dans le PLF ?",
    options: [
      { id: 'a', texte: "L'approbation du Conseil des ministres par decret" },
      { id: 'b', texte: "L'avis conforme de la Cour des comptes sur l'impact budgetaire" },
      { id: 'c', texte: "La discussion en conference fiscale sous la coordination du Ministere du Budget" },
      { id: 'd', texte: "La validation par l'Assemblee nationale en commission des finances" },
      { id: 'e', texte: "Le rapport de la DGI sur le rendement previsible de la mesure" },
    ],
    reponse: 'c',
    explication: "Le §71 de la Circulaire N° 004/ME/MIN.BUDGET/2025 impose que toute mesure fiscale nouvelle soit prealablement discutee en conference fiscale, organisee sous la coordination du Ministere du Budget. Cette conference reunit les administrations fiscales (DGI, DGDA, DGRAD) et le Ministere des Finances. Aucune mesure nouvelle ne peut figurer dans le PLF sans ce passage obligatoire, garantissant la coherence de la politique fiscale.",
  },
  {
    id: 'g19',
    question: "Selon l'article 107 de la LOFIP, rappele par le §116 de la Circulaire N° 004/ME/MIN.BUDGET/2025, quel est le prerequis obligatoire pour toute decision d'exoneration fiscale ou de creation d'une nouvelle structure administrative ?",
    options: [
      { id: 'a', texte: "L'accord du President de la Republique par ordonnance" },
      { id: 'b', texte: "L'avis prealable obligatoire du Ministre du Budget" },
      { id: 'c', texte: "L'autorisation du Parlement par resolution" },
      { id: 'd', texte: "L'approbation de l'Inspecteur general des Finances" },
      { id: 'e', texte: "Le rapport favorable de la DGDSP sur la soutenabilite budgetaire" },
    ],
    reponse: 'b',
    explication: "L'article 107 de la LOFIP dispose que toute decision accordant une exoneration fiscale ou creant une nouvelle structure administrative est subordonnee a l'avis prealable obligatoire du Ministre du Budget. Le §116 de la Circulaire N° 004/ME/MIN.BUDGET/2025 rappelle cette exigence. Une exoneration accordee sans cet avis est entachee d'irregularite et expose son auteur a des poursuites devant la Cour des comptes.",
  },
  {
    id: 'g20',
    question: "Quelle est la consequence juridique prevue par l'article 83 al. 7 de la LOFIP si le projet de loi de finances n'est pas vote par le Parlement avant le 31 decembre ?",
    options: [
      { id: 'a', texte: "Les depenses de l'Etat sont suspendues jusqu'a l'adoption de la loi de finances" },
      { id: 'b', texte: "Le Gouvernement est automatiquement repute demissionnaire" },
      { id: 'c', texte: "Le budget de l'annee precedente est reconduit automatiquement par douzieme" },
      { id: 'd', texte: "Le President de la Republique met en vigueur le PLF par ordonnance-loi" },
      { id: 'e', texte: "La Cour constitutionnelle statue d'urgence sur la validite du PLF" },
    ],
    reponse: 'd',
    explication: "L'article 83 alinea 7 de la LOFIP dispose que si le PLF n'est pas vote avant le 31 decembre, le President de la Republique le met en vigueur par ordonnance-loi. Cette disposition garantit la continuite de l'Etat mais constitue un constat d'echec du processus parlementaire budgetaire. La Circulaire N° 004/ME/MIN.BUDGET/2025 (§55) rappelle l'importance du respect des delais (depot 15 septembre, vote 60 jours) pour eviter ce mecanisme exceptionnel.",
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// CAS PRATIQUES
// ─────────────────────────────────────────────────────────────────────────────

const CAS_PRATIQUES: CasPratique[] = [
  {
    id: 'cp1',
    titre: "CP1 - La prorogation du budget-programme devant le Parlement",
    contexte: "En 2023, le Gouvernement congolais dépose à l'Assemblée nationale un projet de loi modifiant la LOFIP afin de proroger pour la deuxième fois le délai de basculement vers le budget-programme. Plusieurs députés contestent cette prorogation en invoquant l'article 234 de la LOFIP et l'article 122 point 3 de la Constitution. Ils soutiennent que le Gouvernement n'a pas le droit de repousser indéfiniment une réforme consacrée par la loi. Le Gouvernement répond que la prorogation est elle-même une loi et qu'elle est donc constitutionnellement valide. Il invoque également les difficultés pratiques de mise en oeuvre.",
    questions: [
      {
        num: "1",
        enonce: "Sur le fondement de l'article 122 point 3 de la Constitution et de l'article 234 de la LOFIP, analysez la validité constitutionnelle et légale de la loi de prorogation n° 23/030 du 28 juin 2023.",
        correction: "L'article 122 point 3 de la Constitution confère au législateur la compétence exclusive de fixer les règles relatives aux finances publiques. L'article 234 de la LOFIP, qui fixe le délai de basculement, est lui-même une disposition législative. La modification d'une loi par une autre loi est constitutionnellement valide dès lors que la forme et la procédure sont respectées. La loi n° 23/030 du 28 juin 2023 est une loi ordinaire votée par le Parlement à l'initiative du Gouvernement - elle modifie donc valablement l'article 234 de la LOFIP. La critique des députés est juridiquement inopérante : il n'existe pas de hiérarchie entre deux lois ordinaires, et le Parlement peut toujours modifier ou proroger une disposition qu'il a antérieurement adoptée, sous réserve du respect de la Constitution.",
      },
      {
        num: "2",
        enonce: "Quels sont les préalables que l'article 43 de la LOFIP et les textes organiques du budget-programme imposent au Gouvernement avant le basculement effectif ? Le Gouvernement pouvait-il légalement invoquer l'absence de ces préalables pour justifier la prorogation ?",
        correction: "L'article 43 de la LOFIP impose que chaque programme soit associé à des objectifs précis et à des indicateurs de performance. Les textes organiques imposent notamment : le découpage complet des ministères en programmes (PAP), la formation des responsables de programmes (RPROG), la mise en place de systèmes d'information budgétaire intégrés, et la capacité de produire des rapports annuels de performance (RAP). Ces préalables techniques et organisationnels constituent des conditions sine qua non d'un basculement effectif. Le Gouvernement pouvait légalement les invoquer comme motif de prorogation, car la loi ne peut exiger l'impossible : forcer le basculement sans les outils nécessaires aurait conduit à une dégradation de la gestion budgétaire plutôt qu'à son amélioration. La prorogation est donc à la fois juridiquement valide et pratiquement justifiée.",
      },
      {
        num: "3",
        enonce: "La loi n° 23/030 a institutionnalisé le débat d'orientation budgétaire. Quelle est la nature juridique de ce débat selon la LOFIP modifiée, et quelles en sont les conséquences sur le processus législatif budgétaire ?",
        correction: "Le débat d'orientation budgétaire, dont la définition a été ajoutée à l'article 3 de la LOFIP par la loi n° 23/030, constitue une étape préalable obligatoire à l'élaboration du PLF. Il doit se tenir au Parlement en mars de chaque année. Sa nature juridique est celle d'une procédure parlementaire de contrôle a priori : il permet au Parlement d'orienter les priorités budgétaires avant même que le Gouvernement ne finalise son projet. Sur le plan légal, le débat d'orientation budgétaire ne lie pas formellement le Gouvernement, mais il constitue une expression de la volonté parlementaire que le Gouvernement doit prendre en compte dans l'élaboration du PLF. Il renforce le contrôle parlementaire sur les finances publiques, prévu par les articles 127-130 de la LOFIP.",
      },
    ],
  },
  {
    id: 'cp2',
    titre: "CP2 - La déconcentration de l'ordonnancement et la responsabilité des ministères sectoriels",
    contexte: "En application de l'article 5 de la Loi de finances n° 25/060 du 29 décembre 2025, le Ministère de la Santé est désigné comme l'un des 9 ministères pilotes pour la déconcentration de l'ordonnancement. Le Secrétaire général du Ministère de la Santé, nouvellement nommé ordonnateur délégué, engage des dépenses de 50 millions FC pour l'acquisition de médicaments sans avoir obtenu au préalable le visa du contrôleur budgétaire déployé auprès du ministère. Il invoque l'urgence sanitaire et la nouvelle délégation de compétence accordée par l'article 5 de la LF 2026.",
    questions: [
      {
        num: "1",
        enonce: "La déconcentration de l'ordonnancement prévue par l'article 5 de la LF n° 25/060 supprime-t-elle le contrôle budgétaire préalable prévu par les articles 112-115 de la LOFIP ?",
        correction: "Non. La déconcentration de l'ordonnancement, telle que prévue par l'article 5 de la LF n° 25/060, transfère la compétence d'ordonnancement du ministre du Budget vers les ministères sectoriels pilotes. Elle ne modifie pas et ne supprime pas le contrôle budgétaire préalable organisé par les articles 112-115 de la LOFIP. L'article 112 de la LOFIP impose que tout engagement de dépense soit précédé du visa du contrôleur budgétaire. Ce contrôle a priori est une règle organique inscrite dans la LOFIP - une loi de finances ordinaire ne peut pas le déroger implicitement. La déconcentration de l'ordonnancement modifie qui ordonnance, mais ne modifie pas le circuit de contrôle préalable. L'engagement réalisé sans visa est donc irrégulier.",
      },
      {
        num: "2",
        enonce: "Analysez la responsabilité juridique du Secrétaire général du Ministère de la Santé au regard des articles 112 et 119 de la LOFIP. Le motif d'urgence sanitaire peut-il exonérer l'ordonnateur délégué de sa responsabilité ?",
        correction: "L'article 112 de la LOFIP soumet tout engagement de dépense au visa préalable du contrôleur budgétaire. L'article 119 engage la responsabilité personnelle et pécuniaire de l'ordonnateur qui passe outre le refus de visa ou qui engage des dépenses sans visa. En l'espèce, le Secrétaire général a engagé 50 millions FC sans visa - sa responsabilité est engagée. L'urgence sanitaire n'est pas un motif légal d'exonération prévu par la LOFIP. La loi prévoit des procédures d'urgence (avances de trésorerie, régularisation a posteriori) qui doivent être suivies même en cas d'urgence. Le Secrétaire général aurait dû soit solliciter en urgence le visa du contrôleur, soit recourir à la procédure d'avance de trésorerie régularisable a posteriori. En agissant sans visa, il s'expose aux sanctions prévues par les articles 128-132 de la LOFIP.",
      },
      {
        num: "3",
        enonce: "Dans le cadre de la mise en oeuvre du budget-programme pour le Ministère de la Santé, expliquez la différence entre l'autorisation d'engagement (AE) et le crédit de paiement (CP) tels que définis par l'article 22 de la LOFIP, et leur pertinence pour l'acquisition de médicaments.",
        correction: "L'article 22 de la LOFIP distingue deux types d'autorisations budgétaires dans le cadre du budget-programme : l'autorisation d'engagement (AE), qui est la permission de signer un marché sur l'année considérée pour un montant maximum, dont l'exécution peut s'étendre sur plusieurs exercices ; et le crédit de paiement (CP), qui représente la limite supérieure des dépenses pouvant être ordonnancées et payées au cours de l'exercice. Pour l'acquisition de médicaments, si le marché est exécuté en une seule année, AE et CP coïncident. Si le marché s'étend sur plusieurs années (ex. : contrat pluriannuel de fourniture), l'AE est engagée la première année pour le montant total, tandis que les CP correspondants sont échelonnés sur les exercices d'exécution. Cette distinction est fondamentale pour éviter les restes à payer non provisionnés, qui constituent un des défis persistants de l'exécution budgétaire en RDC.",
      },
    ],
  },
  {
    id: 'cp3',
    titre: "CP3 - La loi de finances rectificative et le principe d'équilibre budgétaire",
    contexte: "En mai 2025, le Gouvernement congolais soumet à l'Assemblée nationale un projet de loi de finances rectificative (LFR) réduisant le budget de 1,7% en raison du conflit armé dans l'Est. Certains parlementaires contestent cette révision à la baisse, arguant qu'une réduction du budget sans couverture de toutes les dépenses obligatoires (salaires, service de la dette) violerait le principe d'équilibre budgétaire posé par la LOFIP. D'autres parlementaires soutiennent au contraire que la LFR est une adaptation nécessaire et légale du budget aux réalités économiques.",
    questions: [
      {
        num: "1",
        enonce: "Sur le fondement des dispositions de la LOFIP relatives au principe d'équilibre budgétaire et à la procédure de la loi de finances rectificative, analysez la légalité de la LFR n° 25/044 adoptée par le Sénat le 13 juin 2025.",
        correction: "La LOFIP consacre le principe d'équilibre budgétaire comme principe fondateur des finances publiques. Cet équilibre signifie que les recettes prévues doivent couvrir les dépenses autorisées - il n'implique pas que le budget ne peut pas être réduit. La loi de finances rectificative est un mécanisme légalement prévu qui permet au Gouvernement d'adapter le budget en cours d'exercice aux nouvelles réalités économiques, sécuritaires ou sociales. La LFR n° 25/044 a réduit le budget de 51 553,5 Mds FC à 50 691,8 Mds FC, en ajustant à la fois les recettes et les dépenses pour maintenir l'équilibre. Si les dépenses obligatoires (salaires, service de la dette) sont intégralement couvertes dans la LFR révisée, aucune violation du principe d'équilibre n'est caractérisée. La LFR est donc légale, à condition que l'équilibre recettes-dépenses soit maintenu dans le nouveau cadre budgétaire.",
      },
      {
        num: "2",
        enonce: "Quelles sont les obligations du Gouvernement en matière de présentation et de justification d'une loi de finances rectificative au Parlement, selon les articles pertinents de la LOFIP ? Comment le Parlement exerce-t-il son contrôle lors de l'examen d'une LFR ?",
        correction: "La LOFIP impose au Gouvernement de soumettre la LFR au Parlement avec un exposé des motifs détaillé justifiant les modifications proposées : circonstances nouvelles (conflit à l'Est, variations de recettes), impact sur les agrégats budgétaires, mesures d'ajustement proposées. La LFR doit respecter la même procédure que la loi de finances initiale : dépôt en Conseil des ministres, transmission à l'Assemblée nationale, débat en commission puis en séance plénière, vote, transmission au Sénat, vote, promulgation par le Président. Le Parlement exerce son contrôle en examinant la cohérence des révisions proposées, la préservation des dépenses prioritaires (santé, éducation, sécurité), la fiabilité des nouvelles projections de recettes, et la compatibilité de la LFR avec les engagements pris dans le cadre du programme FMI.",
      },
      {
        num: "3",
        enonce: "La réduction du budget liée au conflit à l'Est illustre le lien entre situation sécuritaire et finances publiques. Sur le fondement des articles 1er et 2 de la LOFIP et de l'article 174 de la Constitution, comment le principe de bonne gouvernance financière impose-t-il au Gouvernement de gérer cette crise budgétaire ?",
        correction: "L'article 174 de la Constitution impose que les finances de l'État soient gérées conformément au principe de bonne gouvernance financière. L'article 1er de la LOFIP fixe le cadre légal des finances publiques, et l'article 2 en étend l'application à l'ensemble des niveaux de l'administration. Le principe de bonne gouvernance financière implique, dans un contexte de crise : la transparence dans la présentation des révisions budgétaires (exposé des motifs complet, données fiables) ; l'allocation prioritaire des ressources aux dépenses essentielles et constitutionnellement obligatoires ; le maintien du contrôle budgétaire même en période de crise (le contrôleur budgétaire ne peut pas être court-circuité au motif de l'urgence sécuritaire) ; et la reddition des comptes a posteriori devant le Parlement (loi de reddition des comptes prévue par les articles 28-31 de la LOFIP). La LFR elle-même est une expression de la bonne gouvernance : plutôt que d'exécuter un budget irréaliste, le Gouvernement l'adapte de manière transparente aux contraintes nouvelles.",
      },
    ],
  },
  {
    id: 'cp4',
    titre: "CP4 - La rétrocession des 40% aux provinces : inexécution et recours",
    contexte: "La province du Maniema constate que depuis trois mois, le pouvoir central n'a pas effectué les virements mensuels correspondant à sa quote-part des 40% des recettes à caractère national, prévue par les articles 218-222 de la LOFIP. Le gouverneur provincial envisage plusieurs recours : saisir l'IGF, saisir la Cour des comptes, saisir l'Assemblée nationale, ou suspendre le versement des recettes provinciales au Trésor national. Ses conseillers juridiques sont divisés sur la voie à suivre.",
    questions: [
      {
        num: "1",
        enonce: "Analysez le fondement juridique de la créance de la province du Maniema sur le pouvoir central au regard des articles 218-222 et 232 de la LOFIP. Cette créance est-elle soumise au moratoire sur le budget-programme ?",
        correction: "Les articles 218 à 222 de la LOFIP organisent la rétrocession de 40% des recettes à caractère national aux provinces. L'article 232 de la LOFIP précise expressément que ces dispositions sont 'd'application immédiate' - elles ne font pas partie des dispositions soumises au moratoire sur le budget-programme. La créance de la province du Maniema sur le pouvoir central est donc une créance légale, exigible depuis 2011, et non une créance conditionnée par l'entrée en vigueur intégrale de la LOFIP. L'inexécution des virements pendant trois mois constitue une violation de la LOFIP. La province dispose d'une créance certaine, liquide (calculable selon les recettes nationales effectivement recouvrées) et exigible chaque mois.",
      },
      {
        num: "2",
        enonce: "Parmi les recours envisagés (IGF, Cour des comptes, Assemblée nationale, suspension des versements provinciaux), lesquels sont juridiquement fondés selon la LOFIP et lesquels sont illégaux ? Justifiez votre réponse au regard des textes.",
        correction: "Recours fondés : La saisine de l'IGF est fondée, car l'article 121 de la LOFIP confère à l'IGF une compétence générale de contrôle sur toutes les opérations financières du pouvoir central, y compris l'exécution des transferts aux provinces. La saisine de l'Assemblée nationale est fondée dans le cadre du contrôle parlementaire (Art. 127 LOFIP) : les parlementaires peuvent interpeller le Gouvernement et exiger des explications sur l'inexécution des virements. Recours non fondés ou illégaux : La saisine de la Cour des comptes sur ce point est limitée car la Cour des comptes contrôle les comptables publics a posteriori - elle n'est pas l'organe indiqué pour contraindre le pouvoir central à exécuter des virements en cours d'exercice. La suspension des versements provinciaux au Trésor national est illégale : la province ne peut unilatéralement refuser de verser ses recettes au Trésor central en compensation d'une créance qu'elle estime avoir sur le pouvoir central. Cela violerait le principe d'unité de trésorerie (Art. 110 LOFIP) et constituerait une inexécution budgétaire sanctionnable.",
      },
      {
        num: "3",
        enonce: "La situation de la province du Maniema illustre les difficultés d'effectivité de la décentralisation fiscale en RDC. Sur le fondement des articles 218-226 de la LOFIP et de la LF n° 25/060, analysez les mécanismes légaux visant à garantir l'effectivité de ces transferts et leurs limites.",
        correction: "Les articles 218-222 de la LOFIP prévoient un mécanisme de transfert automatique et mensuel des 40% : le ministre des Finances est tenu d'effectuer ces virements sans attendre une demande de la province. La LF n° 25/060 fixe à l'article 8 le montant annuel global de la rétrocession à 7 694,5 Mds FC pour 2026, ce qui rend la créance liquide et quantifiable. Les articles 225-226 organisent la Caisse nationale de péréquation (744,6 Mds FC en 2026) destinée à corriger les déséquilibres entre provinces. Les limites sont structurelles : l'absence d'un mécanisme de sanction automatique contre le pouvoir central en cas de retard de virement, la dépendance des montants de rétrocession au niveau réel des recettes effectivement recouvrées (une province peut voir sa quote-part diminuer si les recettes nationales chutent), et l'absence d'un tribunal administratif compétent pour contraindre l'exécution rapide. La réforme des finances publiques devrait prévoir un mécanisme d'exécution d'office des virements ou une automatisation par le système d'information budgétaire.",
      },
    ],
  },
  {
    id: 'cp5',
    titre: "CP5 - Budget-programme et reddition des comptes : la loi de reddition non déposée",
    contexte: "Après l'exercice budgétaire 2024, le Gouvernement congolais ne dépose pas la loi de reddition des comptes dans le délai imparti par les articles 28-31 de la LOFIP. Il invoque la complexité de la transition vers le budget-programme et les difficultés de l'IGF à certifier les comptes. L'Assemblée nationale, sur proposition de sa Commission économique et financière, envisage de mettre en cause la responsabilité du Gouvernement. La Cour des comptes, de son côté, réclame la transmission des comptes des comptables pour pouvoir exercer son contrôle juridictionnel.",
    questions: [
      {
        num: "1",
        enonce: "Quelles sont les obligations légales du Gouvernement en matière de dépôt de la loi de reddition des comptes selon les articles 28-31 de la LOFIP, et quelles sont les conséquences juridiques du non-respect de ce délai ?",
        correction: "Les articles 28 à 31 de la LOFIP organisent la loi de reddition des comptes. L'article 28 impose au Gouvernement de déposer, avant une date limite fixée par la loi, le projet de loi de reddition des comptes accompagné des rapports annuels de performance (RAP) de chaque programme. Ce projet rend compte de l'exécution de la loi de finances de l'exercice écoulé. Le non-respect du délai constitue une violation de la LOFIP. Les conséquences juridiques sont multiples : l'Assemblée nationale peut interpeller le Gouvernement et engager sa responsabilité politique ; la Cour des comptes ne peut exercer pleinement son contrôle juridictionnel faute de comptes transmis ; et les provinces et ETD ne peuvent pas contrôler la sincérité des montants qui leur ont été rétrocédés. Le motif invoqué par le Gouvernement (complexité de la transition) n'est pas un motif légal d'exonération - il constitue tout au plus une circonstance atténuante dans l'appréciation politique de la responsabilité.",
      },
      {
        num: "2",
        enonce: "La Cour des comptes réclame la transmission des comptes des comptables publics. Sur le fondement des articles 123-126 de la LOFIP et de l'article 180 de la Constitution, analysez la nature du contrôle juridictionnel de la Cour des comptes et les sanctions qu'elle peut prononcer.",
        correction: "L'article 180 de la Constitution institue la Cour des comptes et lui confie le contrôle des finances publiques. Les articles 123 à 126 de la LOFIP organisent ce contrôle juridictionnel. La Cour des comptes est une juridiction financière qui juge les comptes des comptables publics a posteriori. Elle peut rendre trois types de décisions : l'arrêt de quitus, accordé au comptable dont les comptes sont réguliers et sincères ; l'arrêt de débet, qui condamne personnellement et pécuniairement le comptable en cas de manquement constaté (Art. 131 LOFIP) ; et les injonctions, par lesquelles elle enjoint au comptable de produire les pièces manquantes ou de régulariser sa situation. L'article 126 précise que la Cour des comptes peut également certifier les comptes de l'État - cette certification est une prérogative clé dans la transition vers le budget-programme.",
      },
      {
        num: "3",
        enonce: "Le passage au budget-programme impose la production de Rapports annuels de performance (RAP). En quoi l'absence de RAP pour l'exercice 2024 affecte-t-elle la qualité de la loi de reddition des comptes et le contrôle parlementaire prévu par l'article 127 de la LOFIP ?",
        correction: "Les RAP (Rapports annuels de performance) sont les documents par lesquels chaque ministère ou institution rend compte des résultats effectivement obtenus par rapport aux objectifs fixés dans le PAP (Projet annuel de performance). Ils constituent la pièce maîtresse de la loi de reddition des comptes dans le cadre du budget-programme. L'absence de RAP pour 2024 prive la loi de reddition des comptes de son contenu substantiel : le Parlement ne peut pas évaluer si les programmes budgétaires ont atteint leurs objectifs, si les crédits ont été utilisés conformément aux finalités d'intérêt général définies (Art. 43 LOFIP), et si les gestionnaires publics méritent d'être confirmés dans leurs fonctions. L'article 127 de la LOFIP confère au Parlement le droit d'obtenir toute information nécessaire au contrôle de l'exécution budgétaire. L'absence de RAP constitue donc une entrave au contrôle parlementaire des finances publiques, ce qui justifie que l'Assemblée nationale mette en cause la responsabilité du Gouvernement. Cette situation illustre le défi majeur de la mise en oeuvre effective du budget-programme en RDC.",
      },
    ],
  },
  {
    id: 'cp6',
    titre: "CP6 : La procedure d'elaboration du budget 2026 et le respect de la Circulaire N° 004/ME/MIN.BUDGET/2025",
    contexte: "En juillet 2025, le Ministere de la Sante publique n'a pas transmis ses previsions budgetaires dans le delai fixe par la Circulaire N° 004/ME/MIN.BUDGET/2025. Parallelement, le Ministere de l'Economie a soumis au Ministere du Budget une proposition d'exoneration de TVA sur les equipements medicaux importes, sans passer par la conference fiscale. Le secretaire general du Budget constate egalement que le Ministere des Mines souhaite creer une nouvelle Agence de promotion miniere, sans saisir le Ministre du Budget pour avis. BASE LEGALE : Art. 83 al. 1, 107 LOFIP ; Circulaire N° 004/ME/MIN.BUDGET/2025, §§ 34, 71, 116 ; Constitution Art. 126.",
    questions: [
      {
        num: "1",
        enonce: "Le retard du Ministere de la Sante dans le depot de ses previsions budgetaires est-il une simple irregularite administrative ou une violation d'une obligation legale ? Quelles consequences peut-il engendrer sur la regularite du PLF 2026 ?",
        correction: "ANALYSE - RETARD DE DEPOT (§34 Circulaire N° 004/ME/MIN.BUDGET/2025 / Art. 83 al. 1 LOFIP) : Le depot des previsions sectorielles au 22 juillet est une obligation legale decoulant du calendrier budgetaire constitutionnel. L'article 83 al. 1 de la LOFIP fixe au 15 septembre la date limite de depot du PLF a l'Assemblee nationale, et l'article 126 de la Constitution alloue 60 jours au Parlement pour voter (40 AN + 20 Senat). Ces delais sont articules : un retard sectoriel empeche le Ministere du Budget de consolider les previsions et de deposer le PLF a temps. CONSEQUENCES JURIDIQUES : 1. Le Ministere du Budget peut inscrire les credits du Ministere de la Sante en reconduction des annees anterieures (sans actualisation), ce qui penalise les priorites sectorielles de la sante. 2. Si le retard en cascade compromet le depot du PLF au 15 septembre, le Gouvernement s'expose a une violation de l'Art. 83 al. 1 LOFIP et risque d'activer l'Art. 83 al. 7 (ordonnance-loi presidentielle). 3. Le Secretaire general de la Sante peut etre mis en cause pour manquement a ses obligations de coordination (Art. 77 LOFIP). CONCLUSION : Le retard n'est pas une simple irregularite administrative : c'est une violation d'une obligation legale procedant du calendrier constitutionnel et budgetaire.",
      },
      {
        num: "2",
        enonce: "L'exoneration de TVA sur les equipements medicaux soumise par le Ministere de l'Economie sans conference fiscale est-elle juridiquement recevable au regard du §71 de la Circulaire ? Quelles sont les obligations de procedure a respecter ?",
        correction: "ANALYSE - CONFERENCE FISCALE OBLIGATOIRE (§71 Circulaire N° 004/ME/MIN.BUDGET/2025) : Le §71 de la Circulaire dispose expressement que toute mesure fiscale nouvelle doit etre prealablement discutee en conference fiscale organisee sous la coordination du Ministere du Budget, avant toute inscription dans le PLF. Cette procedure est obligatoire et non optionnelle. IRRECEVABILITE DE LA PROPOSITION : La proposition d'exoneration soumise directement au Ministere du Budget sans conference fiscale est proceduralement irrecevable. Le Ministere du Budget doit la retourner au Ministere de l'Economie avec instruction de respecter la procedure : 1. Soumettre la mesure a la conference fiscale (DGI, DGDA, DGRAD + Ministere des Finances + Ministere du Budget). 2. Evaluer l'impact budgetaire chiffre de l'exoneration (Art. 79 pt. 11 LOFIP : rapport sur les depenses fiscales). 3. Verifier la conformite aux engagements du programme FMI-RDC. 4. Obtenir l'avis prealable du Ministre du Budget (Art. 107 LOFIP). CONSEQUENCE D'UNE INSCRIPTION IRREGULIERE : Une mesure inscrite dans le PLF sans respect de la procedure fiscale est entachee d'irregularite de procedure et pourrait etre contestee devant la Cour constitutionnelle ou signalée par la Cour des comptes dans ses observations sur l'execution du budget.",
      },
      {
        num: "3",
        enonce: "La creation par le Ministere des Mines d'une Agence de promotion miniere sans saisir le Ministre du Budget est-elle compatible avec l'article 107 de la LOFIP et le §116 de la Circulaire ? Quelles mesures le Ministre du Budget peut-il prendre ?",
        correction: "ANALYSE - AVIS PREALABLE OBLIGATOIRE (Art. 107 LOFIP · §116 Circulaire N° 004/ME/MIN.BUDGET/2025) : L'article 107 de la LOFIP dispose que toute creation d'une nouvelle structure administrative generant des charges budgetaires est subordonnee a l'avis prealable obligatoire du Ministre du Budget. Le §116 de la Circulaire rappelle et renforce cette exigence. VIOLATION CARACTERISEE : La creation de l'Agence de promotion miniere sans cet avis constitue une violation directe de l'Art. 107 LOFIP. Cette agence, une fois creee, genererait : des charges de personnel (salaires, indemnites), des charges de fonctionnement (locaux, equipements, fournitures), des charges d'investissement (infrastructures). Toutes ces charges impacteront le budget de l'Etat sans avoir ete anticipees et evaluees par le Ministere du Budget. MESURES DU MINISTRE DU BUDGET : 1. BLOCAGE PREVENTIF : Refuser d'inscrire les credits au budget de l'agence dans le PLF 2026 jusqu'a regularisation de la procedure. 2. INJONCTION DE CONFORMITE : Exiger du Ministere des Mines qu'il soumette le projet de creation avec une evaluation financiere complete (charges previsionnelles sur 3 ans, sources de financement, nombre d'emplois). 3. AVIS FORMEL : Apres instruction du dossier, emettre un avis motive (favorable, defavorable ou conditionnel). 4. SIGNALEMENT : En cas de passage en force, saisir l'Inspecteur general des Finances et informer la Cour des comptes. CONSEQUENCE DU NON-RESPECT : Une agence creee en violation de l'Art. 107 LOFIP risque de voir ses credits bloques par le Ministere du Budget et ses decisions financieres contestees devant les juridictions administratives et financieres.",
      },
      {
        num: "4",
        enonce: "En vous fondant sur les situations A, B et C, degagez les principes directeurs du controle budgetaire preventif en droit des finances publiques congolaises et leur fondement legal dans la LOFIP et la Circulaire N° 004/ME/MIN.BUDGET/2025.",
        correction: "SYNTHESE - CONTROLE BUDGETAIRE PREVENTIF EN DROIT CONGOLAIS\n\nI. DEFINITION DU CONTROLE PREVENTIF\nLe controle budgetaire preventif est l'ensemble des mecanismes qui interviennent AVANT que la depense soit effectuee ou que la mesure soit inscrite au budget. Il s'oppose au controle a posteriori (Cour des comptes, rapports de performance). En droit congolais, la LOFIP et la Circulaire N° 004/ME/MIN.BUDGET/2025 organisent un systeme de controle preventif a plusieurs niveaux.\n\nII. LES TROIS PRINCIPES DIRECTEURS\n\n1. PRINCIPE DU CALENDRIER IMPÉRATIF (Art. 83 LOFIP, §34 Circulaire) : Le respect des delais budgetaires est une obligation legale dont la violation compromet la regularite du PLF. Le 22 juillet (previsions sectorielles) et le 15 septembre (depot PLF) sont des dates imperatives articulees avec le delai constitutionnel de vote (60 jours, Art. 126 Constitution). Ce principe garantit que le Parlement dispose du temps necessaire pour examiner et amender le PLF.\n\n2. PRINCIPE DE LA CONFERENCE FISCALE OBLIGATOIRE (§71 Circulaire) : Aucune mesure fiscale nouvelle ne peut etre inscrite dans le PLF sans avoir ete validee en conference fiscale sous la coordination du Ministere du Budget. Ce principe garantit la coherence de la politique fiscale, l'evaluation prealable de l'impact budgetaire, et la conformite aux engagements macroeconomiques (programme FMI-RDC).\n\n3. PRINCIPE DE L'AVIS PRÉALABLE DU MINISTRE DU BUDGET (Art. 107 LOFIP, §116 Circulaire) : Toute exoneration fiscale ou creation de structure nouvelle est subordonnee a l'avis prealable du Ministre du Budget. Ce principe de coordination budgetaire preventive garantit l'unite de la politique budgetaire et evite que des decisions sectorielles ne creent des charges non budgetisees.\n\nIII. ARTICULATION DES PRINCIPES\nCes trois principes forment un systeme coherent : le calendrier imperieux organise le temps, la conference fiscale filtre les mesures nouvelles, l'avis prealable controle les engagements futurs. Ensemble, ils garantissent que le PLF presente au Parlement est sincere (Art. 14 LOFIP) et soutenable. Leur violation n'est pas seulement une irregularite formelle : c'est une atteinte a l'integrite du processus democratique budgetaire.\n\nFONDEMENT LEGAL : Art. 83, 107 LOFIP + §§34, 71, 116 Circulaire N° 004/ME/MIN.BUDGET/2025 + Constitution Art. 126.",
      },
      {
        num: "5",
        enonce: "Supposons que le PLF 2026 soit depose le 20 septembre 2025 (5 jours de retard). Calculez l'impact de ce retard sur le calendrier parlementaire et evaluez si le respect de l'article 126 de la Constitution reste possible. Quel mecanisme constitutionnel s'applique si le delai est depasse ?",
        correction: "ANALYSE - IMPACT DU RETARD DE DEPOT SUR LE CALENDRIER PARLEMENTAIRE\n\nI. CALCUL DU CALENDRIER SANS RETARD (reference)\n- Depot PLF : 15 septembre (Art. 83 al. 1 LOFIP)\n- Vote AN (40 jours) : du 15 sept au 24 octobre\n- Vote Senat (20 jours) : du 25 octobre au 13 novembre\n- Promulgation : avant le 31 decembre\nMarge de securite : 47 jours entre le 13 novembre et le 31 decembre.\n\nII. IMPACT D'UN DEPOT AU 20 SEPTEMBRE (5 JOURS DE RETARD)\n- Vote AN (40 jours) : du 20 sept au 29 octobre\n- Vote Senat (20 jours) : du 30 octobre au 18 novembre\n- Promulgation : avant le 31 decembre\nMarge de securite residuelle : 43 jours entre le 18 novembre et le 31 decembre.\n\nCONCLUSION CALCUL : Un retard de 5 jours reste absorbable. L'article 126 de la Constitution peut encore etre respecte. La marge de securite residuelle (43 jours) laisse suffisamment de temps pour la promulgation, la publication au Journal Officiel et l'entree en vigueur.\n\nIII. MECANISME CONSTITUTIONNEL EN CAS DE DEPASSEMENT (Art. 83 al. 7 LOFIP)\nSi le PLF n'est pas vote avant le 31 decembre malgre le respect formal des delais :\n1. Le gouvernement saisit une commission paritaire AN-Senat pour trouver un accord.\n2. Si le desaccord persiste, l'AN statue en dernier ressort.\n3. Si le 31 decembre est franchi sans vote, le President de la Republique met en vigueur le PLF par ORDONNANCE-LOI.\nCette ordonnance-loi presidentielle est un mecanisme exceptionnel qui garantit la continuite de l'Etat mais constitue un constat d'echec du processus democratique budgetaire. La Circulaire N° 004/ME/MIN.BUDGET/2025 (§55) rappelle que le respect strict du calendrier est la meilleure garantie contre l'activation de ce mecanisme d'exception.",
      },
    ],
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT QCM
// ─────────────────────────────────────────────────────────────────────────────

function QCMCard({ qcm, index }: { qcm: QCM; index: number }) {
  const [selected, setSelected] = useState<string | null>(null)
  const submitted = selected !== null
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
      <p className="font-medium text-gray-800 text-sm">
        <span className={cn('inline-block px-2 py-0.5 rounded text-xs font-bold mr-2', C.badge)}>Q{index + 1}</span>
        {qcm.question}
      </p>
      <div className="space-y-2">
        {qcm.options.map(opt => {
          const isCorrect = opt.id === qcm.reponse
          const isSelected = opt.id === selected
          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelected(opt.id)}
              className={cn(
                'w-full text-left text-sm px-3 py-2 rounded-lg border transition-all',
                !submitted && 'hover:border-rose-400 hover:bg-rose-50 border-gray-200',
                submitted && isCorrect && C.correct,
                submitted && isSelected && !isCorrect && C.wrong,
                submitted && !isCorrect && !isSelected && 'border-gray-200 opacity-60',
              )}
            >
              <span className="font-semibold mr-2 uppercase">{opt.id}.</span>{opt.texte}
              {submitted && isCorrect && <CheckCircle2 className="inline ml-1 h-4 w-4 text-green-500" />}
              {submitted && isSelected && !isCorrect && <XCircle className="inline ml-1 h-4 w-4 text-red-500" />}
            </button>
          )
        })}
      </div>
      {submitted && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
          <strong>Explication :</strong> {qcm.explication}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT CAS PRATIQUE
// ─────────────────────────────────────────────────────────────────────────────

function CasPratiqueCard({ cp }: { cp: CasPratique }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className={cn('px-5 py-4 border-b', C.bg, C.border)}>
        <h3 className={cn('font-bold text-base', C.text)}>{cp.titre}</h3>
      </div>
      <div className="p-5 space-y-4">
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Contexte</p>
          <p className="text-sm text-gray-700">{cp.contexte}</p>
        </div>
        <div className="space-y-3">
          {cp.questions.map(q => (
            <div key={q.num} className="rounded-lg border border-gray-200 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left"
                onClick={() => setOpen(open === q.num ? null : q.num)}
              >
                <span className="font-semibold text-gray-800 text-sm">
                  <span className={cn('inline-block px-2 py-0.5 rounded text-xs font-bold mr-2', C.badge)}>Q{q.num}</span>
                  {q.enonce}
                </span>
                {open === q.num ? <ChevronUp className="h-4 w-4 flex-shrink-0 text-gray-400" /> : <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400" />}
              </button>
              {open === q.num && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                  <p className="text-xs font-semibold text-rose-600 mb-2 uppercase tracking-wide">Correction</p>
                  <p className="text-sm text-gray-700">{q.correction}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────

export default function UE5Chapitre10Page() {
  const [leconActive, setLeconActive] = useState<'L1'|'L2'|'L3'|'L4'|'L5'|'L6'>('L1')
  const [onglet, setOnglet] = useState<'lecons'|'qcm'|'cas'|'devoir'>('lecons')
  const lecon = LECONS.find(l => l.id === leconActive)!
  const [devOpen, setDevOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fadeIn">
      {/* HEADER */}
      <div className={cn('border-b animate-slideDown', C.bg, C.border)}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="space-y-1 mb-3">
            <Breadcrumb
              items={[
                { label: 'Mes cours', route: '/mes-cours' },
                { label: 'UE 5 - Finances publiques', route: '/ue5-finances-publiques' },
                { label: 'Chapitre 10' },
              ]}
              color="emerald"
            />
            <BackButton />
            <h1 className="text-xl font-display font-bold text-gray-900 mt-1">
              Réformes et actualité des finances publiques en RDC
            </h1>
            <p className="text-xs text-gray-500">
              LOFIP Art. 1-3, 8, 22, 43-44, 218-226, 231-234 · Loi n° 18/010 · Loi n° 23/030 · LF n° 25/060 · Constitution Art. 122, 174-175
            </p>
          </div>
          <div className="flex gap-4 mt-3">
            {[['6','Lecons'],['30','QCMs'],['6','Cas pratiques']].map(([n,l]) => (
              <div key={l} className="text-center">
                <div className={cn('text-lg font-bold', C.text)}>{n}</div>
                <div className="text-xs text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ONGLETS */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {([['lecons','Lecons'],['qcm','QCM'],['cas','Cas pratiques'],['devoir','Devoir']] as const).map(([k,l]) => (
            <button key={k} onClick={() => setOnglet(k)}
              className={cn('flex-1 text-xs font-medium py-1.5 rounded-md transition-all', onglet === k ? `${C.active} scale-105` : 'text-gray-500 hover:text-gray-700 hover:scale-105')}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4 space-y-4 animate-fadeIn" key={onglet}>

        {/* ── LECONS ── */}
        {onglet === 'lecons' && (
          <>
            {/* Sélecteur leçons */}
            <div className="flex gap-2 flex-wrap">
              {LECONS.map(l => (
                <button key={l.id} onClick={() => setLeconActive(l.id as any)}
                  className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105', leconActive === l.id ? C.active : C.inactive)}>
                  {l.id}
                </button>
              ))}
            </div>

            {/* Carte leçon */}
            <div className={cn('rounded-xl border p-1', C.bg, C.border)}>
              <div className="bg-white rounded-lg p-5 space-y-1">
                <p className={cn('text-xs font-bold uppercase tracking-wide', C.text)}>LECON {LECONS.findIndex(l => l.id === leconActive) + 1} SUR 6</p>
                <h2 className="text-lg font-display font-bold text-gray-900">{lecon.titre}</h2>
                <p className={C.loi}>{lecon.lois}</p>
              </div>
            </div>

            {/* Contenu */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              {lecon.contenu}
            </div>

            {/* QCMs de leçon */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">QCMs de la leçon</h3>
              <div className="space-y-4">
                {lecon.qcms.map((q, i) => <QCMCard key={q.id} qcm={q} index={i} />)}
              </div>
            </div>
          </>
        )}

        {/* ── QCM GLOBAL ── */}
        {onglet === 'qcm' && (
          <div className="space-y-4">
            <div className={cn('rounded-xl border p-4', C.bg, C.border)}>
              <h2 className={cn('font-bold text-base', C.text)}>QCM globaux - Chapitre 10</h2>
              <p className="text-xs text-gray-500 mt-1">20 questions · 5 propositions chacune · LOFIP · LF n° 25/060 · Circulaire N° 004/ME/MIN.BUDGET/2025</p>
            </div>
            {QCM_GLOBAUX.map((q, i) => <QCMCard key={q.id} qcm={q} index={i} />)}
          </div>
        )}

        {/* ── CAS PRATIQUES ── */}
        {onglet === 'cas' && (
          <div className="space-y-6">
            <div className={cn('rounded-xl border p-4', C.bg, C.border)}>
              <h2 className={cn('font-bold text-base', C.text)}>Cas pratiques - Chapitre 10</h2>
              <p className="text-xs text-gray-500 mt-1">6 cas purement juridiques · Fondes exclusivement sur les textes legaux · Inclut la Circulaire N° 004/ME/MIN.BUDGET/2025</p>
            </div>
            {CAS_PRATIQUES.map(cp => <CasPratiqueCard key={cp.id} cp={cp} />)}
          </div>
        )}

        {/* ── DEVOIR ── */}
        {onglet === 'devoir' && (
          <div className="space-y-4">
            <div className={cn('rounded-xl border p-4', C.bg, C.border)}>
              <h2 className={cn('font-bold text-base', C.text)}>Devoir - Chapitre 10</h2>
              <p className="text-xs text-gray-500 mt-1">Dissertation juridique · Noté sur 20</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div>
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">Sujet</p>
                <p className="text-gray-800 font-medium">
                  "La réforme du budget-programme en RDC, deux fois prorogée depuis 2018, témoigne-t-elle d'une volonté politique insuffisante ou d'une contrainte juridique et institutionnelle incontournable ?"
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Vous répondrez en vous fondant exclusivement sur la LOFIP (Art. 8, 22, 43-44, 232, 233, 234), la Loi n° 18/010 du 9 juillet 2018, la Loi n° 23/030 du 28 juin 2023, la Constitution (Art. 122 pt. 3, 174-175), la LF n° 25/060 et la LFR n° 25/044.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[['Présences','/5'],['Devoir','/5'],['Total','/10 (ramené sur 20)']].map(([l,v]) => (
                  <div key={l} className={cn('rounded-lg border p-3', C.bg, C.border)}>
                    <p className="text-xs text-gray-500">{l}</p>
                    <p className={cn('font-bold text-lg', C.text)}>{v}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setDevOpen(!devOpen)}
                className={cn('w-full py-2 rounded-lg text-sm font-medium transition-all', C.btn)}>
                {devOpen ? 'Masquer les éléments de réponse' : 'Voir les éléments de réponse'}
              </button>
              {devOpen && (
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm space-y-3">
                  <p className="font-bold text-blue-800">Eléments de réponse attendus :</p>
                  <div className="space-y-2 text-blue-800">
                    <p><strong>Introduction :</strong> Présenter la LOFIP comme révolution normative de 2011, le délai initial de l'Art. 234 (2019), et les deux prorogations (2018 et 2023). Poser la problématique : les prorogations révèlent-elles un manque de volonté ou des contraintes objectives ?</p>
                    <p><strong>I. Les contraintes juridiques et institutionnelles objectives :</strong> (1) La LOFIP elle-même (Art. 43, 44, 47-49) impose des préalables techniques complexes (PAP, RAP, RPROG, systèmes d'information) ; (2) l'article 232 distingue les dispositions d'application immédiate des dispositions différées - montrer que le Parlement a prévu que certaines dispositions demandaient du temps ; (3) la création de 26 provinces en 2015 a complexifié la décentralisation fiscale (Art. 218-222).</p>
                    <p><strong>II. Les indices d'insuffisance de la volonté politique :</strong> (1) Taux d'exécution budgétaire de 17,1% au T1 2025 - inadmissible après 14 ans ; (2) persistance des paiements hors système violant l'Art. 110 (unité de trésorerie) ; (3) formation insuffisante des RPROG malgré le délai ; (4) déconcentration de l'ordonnancement (Art. 5 LF 2026) encore expérimentale après plus d'une décennie.</p>
                    <p><strong>Conclusion :</strong> Les deux prorogations révèlent à la fois des contraintes institutionnelles réelles et une appropriation insuffisante de la réforme. L'échéance de 2029 doit être impérative - une 3e prorogation serait constitutionnellement possible mais politiquement indéfendable.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
