import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, FileText, Scale, Flag, TrendingUp,
  ChevronDown, ChevronUp, ChevronRight, RotateCcw, Briefcase, Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
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
    icone: <BookOpen className="h-5 w-5" />,
    titre: 'Définition et notion de finances publiques',
    badge: 'LOFIP Art. 1 et 3 pt. 22 · Constitution Art. 122 pt. 3',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Les <strong>finances publiques</strong>
          <InfoTooltip texte="Les finances publiques désignent l'ensemble des recettes et des dépenses des entités composant l'État : le Pouvoir central, les Provinces et les ETD. Elles sont régies par la LOFIP (Loi n° 11/011 du 13 juillet 2011)." loi="Art. 3 pt. 22 LOFIP" />
          {' '}désignent l'ensemble des règles applicables aux recettes et aux dépenses des entités qui composent l'État. En République Démocratique du Congo, leur cadre fondateur est la <strong>Loi n° 11/011 du 13 juillet 2011 relative aux Finances Publiques</strong>, communément appelée <strong>LOFIP</strong>
          <InfoTooltip texte="LOFIP : Loi relative aux Finances Publiques, loi organique qui fixe les règles d'organisation et de fonctionnement des finances de l'Etat congolais. Elle a force supérieure aux lois ordinaires en matière budgétaire." loi="Art. 1 LOFIP" />.
        </p>
        <p>
          L'article 1er de la LOFIP précise que cette loi fixe, conformément à <strong>l'article 122 point 3 de la Constitution</strong>, les règles relatives à l'assiette, au taux et aux modalités de recouvrement des impositions, ainsi que les règles concernant les finances publiques. C'est donc la Constitution elle-même qui habilite le législateur à encadrer les finances publiques par une loi organique.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 1 LOFIP (Loi n° 11/011 du 13 juillet 2011)</p>
          <p className="italic text-foreground/80 text-xs">
            « La présente loi fixe, conformément à l'article 122 point 3 de la Constitution, les règles relatives aux finances publiques. »
          </p>
        </div>
        <p>
          L'article 3 point 22 de la LOFIP donne la définition officielle des <strong>Finances de l'État</strong> : il s'agit de <em>«l'ensemble de recettes et de dépenses des entités composant l'État, à savoir le Pouvoir central
          <InfoTooltip texte="Le Pouvoir central désigne le niveau fédéral de l'Etat congolais : Présidence, Gouvernement national, Parlement national et leurs services. Il est distinct des Provinces qui ont leur propre pouvoir législatif (Assemblée provinciale)." loi="Art. 3 pt. 23 LOFIP" />, les Provinces et les Entités Territoriales Décentralisées (ETD)
          <InfoTooltip texte="Les ETD (Entités Territoriales Décentralisées) sont les communes, les secteurs et les chefferies. Elles ont la personnalité juridique et disposent de leurs propres finances, distinctes de celles des provinces." loi="Art. 3 pt. 25 LOFIP" />»</em>. Cette définition positionne les finances publiques à trois niveaux distincts mais articulés.
        </p>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Point fondamental</p>
          <p className="text-xs text-emerald-800">Les finances publiques en RDC sont organisées selon un modèle décentralisé à trois niveaux : Pouvoir central, Provinces et ETD. Chaque niveau dispose de ses propres recettes et dépenses, tout en étant soumis aux règles communes fixées par la LOFIP.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Distinction finances publiques / finances privées</h3>
        <p>
          La distinction entre finances publiques et finances privées est fondamentale. Elle ne tient pas à la nature de l'argent, mais à la finalité poursuivie, au régime juridique applicable et aux modes d'acquisition des ressources. Alors que les finances privées obéissent à la liberté contractuelle et visent le profit, les finances publiques sont soumises au principe de légalité et poursuivent l'intérêt général.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Critère</th>
                <th className="text-left p-2 border border-border font-semibold">Finances publiques</th>
                <th className="text-left p-2 border border-border font-semibold">Finances privées</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Objet', 'Intérêt général — service public', 'Intérêt particulier — profit'],
                ['Contrainte juridique', 'Principe de légalité obligatoire (LOFIP)', 'Liberté contractuelle'],
                ['Ressources', 'Impôts, taxes, contributions (contrainte)', 'Ventes, emprunts volontaires, bénéfices'],
                ['Finalité', 'Satisfaction des besoins collectifs', 'Maximisation du profit'],
                ['Contrôle', 'Parlement, Cour des comptes, IGF', 'Actionnaires, commissaires aux comptes'],
                ['Comptabilité', 'Comptabilité publique (RGCP)', 'Comptabilité SYSCOHADA'],
              ].map(([c, fp, fpr], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{c}</td>
                  <td className="p-2 border border-border text-emerald-700">{fp}</td>
                  <td className="p-2 border border-border text-muted-foreground">{fpr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground italic mt-1">Source : LOFIP Art. 1 et 3, Constitution Art. 122 pt. 3</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l1q1',
        question: 'Quel article de la Constitution RDC habilite le Parlement à légiférer sur les finances publiques ?',
        options: [
          { id: 'a', texte: 'Art. 120' },
          { id: 'b', texte: 'Art. 122 point 3' },
          { id: 'c', texte: 'Art. 174' },
          { id: 'd', texte: 'Art. 175' },
          { id: 'e', texte: 'Art. 181' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 122 point 3 de la Constitution habilite le Parlement à légiférer sur les finances publiques. C\'est sur ce fondement que la LOFIP a été adoptée (Art. 1 LOFIP).',
        articleRef: 'Art. 1 LOFIP · Art. 122 Constitution',
      },
      {
        type: 'qcm',
        id: 'l1q2',
        question: 'Quelle est la principale différence entre les finances publiques et les finances privées ?',
        options: [
          { id: 'a', texte: 'Les finances privées utilisent des impôts' },
          { id: 'b', texte: 'Les finances publiques visent l\'intérêt général et sont soumises au principe de légalité' },
          { id: 'c', texte: 'Les finances publiques n\'ont pas de comptabilité' },
          { id: 'd', texte: 'Les finances privées dépendent de la loi' },
          { id: 'e', texte: 'Il n\'y a aucune différence, les deux gèrent de l\'argent de la même façon' },
        ],
        reponseCorrecte: 'b',
        explication: 'Les finances publiques se distinguent par leur finalité (intérêt général), leur régime juridique (légalité obligatoire — LOFIP) et leurs ressources (impôts contraints). Les finances privées visent le profit et obéissent à la liberté contractuelle.',
        articleRef: 'Art. 1 et 3 LOFIP · Art. 122 Constitution',
      },
    ],
  },
  {
    id: 'l2',
    icone: <Building2 className="h-5 w-5" />,
    titre: 'Les composantes des finances de l\'Etat en RDC',
    badge: 'LOFIP Art. 2 et Art. 3 pt. 22-25',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La <strong>LOFIP</strong> s'applique à l'ensemble des finances de l'État congolais, organisées selon trois niveaux distincts prévus à l'<strong>article 2</strong> de la loi. Cette architecture reflète la structure décentralisée et fédérale de l'État congolais telle qu'elle résulte de la Constitution du 18 février 2006.
        </p>

        <h3 className="font-bold text-foreground">1. Les finances du Pouvoir central (Art. 3 pt. 23)</h3>
        <p>
          Selon l'article 3 point 23 de la LOFIP, les <strong>finances du Pouvoir central</strong>
          <InfoTooltip texte="Finances du Pouvoir central : ensemble des recettes et dépenses du niveau fédéral de l'Etat congolais. Elles englobent toutes les opérations des ministères, institutions publiques et services de l'Etat placés sous l'autorité du Gouvernement national." loi="Art. 3 pt. 23 LOFIP" />
          {' '}désignent «l'ensemble des recettes et dépenses du Pouvoir central». Elles constituent la composante principale du budget de l'État et sont retracées dans la <strong>loi de finances annuelle</strong> votée par l'Assemblée nationale et le Sénat.
        </p>
        <p>
          Le Pouvoir central perçoit notamment les recettes courantes (recettes fiscales, douanières, non fiscales), les recettes provenant des cessions d'actifs et les ressources extérieures (dons, emprunts). Il supporte les dépenses des services publics nationaux : personnel de l'État, fonctionnement des ministères, investissements publics d'envergure nationale et service de la dette publique.
        </p>

        <h3 className="font-bold text-foreground">2. Les finances des Provinces (Art. 3 pt. 24)</h3>
        <p>
          L'article 3 point 24 de la LOFIP définit les <strong>finances des Provinces</strong>
          <InfoTooltip texte="Les finances des Provinces comprennent : (1) les ressources propres de la province, (2) les recettes nationales retenues à la source (40% selon Art. 175 Constitution), (3) les dotations de la Caisse nationale de péréquation, et (4) les transferts du Pouvoir central." loi="Art. 3 pt. 24 LOFIP · Art. 175 Constitution" />
          {' '}comme l'ensemble composé de :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Ressources propres</strong> : impôts et taxes d'intérêt local créés par l'Assemblée provinciale dans les limites fixées par la loi nationale</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Recettes nationales retenues à la source</strong>
              <InfoTooltip texte="Retenue à la source : mécanisme par lequel 40% des recettes à caractère national sont prélevés directement dans la province où elles sont collectées et reversés à la province, avant tout transfert au Pouvoir central. C'est un droit constitutionnel des provinces (Art. 175 Constitution)." loi="Art. 175 Constitution · Art. 3 pt. 24 LOFIP" />
              {' '}: 40% des recettes à caractère national selon l'article 175 de la Constitution
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Dotations de la Caisse nationale de péréquation</strong>
              <InfoTooltip texte="La Caisse nationale de péréquation est un fonds constitutionnel (Art. 181 Constitution) destiné à assurer la solidarité nationale entre les provinces. Elle finance les projets et programmes d'intérêt commun dans les provinces les moins développées." loi="Art. 181 Constitution" />
              {' '}: pour corriger les déséquilibres de développement entre provinces
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Transferts et subventions</strong> : crédits alloués par le Pouvoir central pour des services déconcentrés et des missions spécifiques</span>
          </li>
        </ul>

        <h3 className="font-bold text-foreground">3. Les finances des ETD (Art. 3 pt. 25)</h3>
        <p>
          L'article 3 point 25 de la LOFIP traite des <strong>finances des Entités Territoriales Décentralisées (ETD)</strong>
          <InfoTooltip texte="Les ETD comprennent : les communes (en milieu urbain), les secteurs (regroupements de villages en milieu rural) et les chefferies (dirigées par un chef coutumier reconnu). Chaque ETD a la personnalité juridique et ses propres organes délibérant et exécutif." loi="Art. 3 pt. 25 LOFIP · Art. 3 Loi sur ETD" />
          {' '}(communes, secteurs, chefferies). Leurs finances comprennent :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Ressources propres</strong> : taxes locales, droits et redevances levés par l'ETD dans le respect du droit national</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Quote-part des impôts provinciaux d'intérêt commun</strong> : part revenant à l'ETD sur les impôts levés au niveau provincial</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Transferts de la Province</strong> : crédits alloués par le budget provincial pour les services décentralisés</span>
          </li>
        </ul>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-2">Schéma de consolidation budgétaire</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Budget ETD</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">intégré dans</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="font-semibold text-foreground">Budget provincial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Budgets provinciaux</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">consolidés avec</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="font-semibold text-foreground">Budget Pouvoir central</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="font-bold text-emerald-700">Budget de l'Etat</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 2, Art. 3 pt. 22-25 · Constitution Art. 174, 175</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l2q1',
        question: 'Selon la LOFIP (Art. 3), les finances de l\'Etat comprennent les recettes et dépenses de :',
        options: [
          { id: 'a', texte: 'Pouvoir central uniquement' },
          { id: 'b', texte: 'Pouvoir central + Provinces uniquement' },
          { id: 'c', texte: 'Pouvoir central + Provinces + ETD' },
          { id: 'd', texte: 'Gouvernement central et ministères' },
          { id: 'e', texte: 'Provinces et ETD uniquement, le Pouvoir central étant géré séparément' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 3 pt. 22 de la LOFIP définit les Finances de l\'Etat comme l\'ensemble des recettes et dépenses des trois entités composant l\'Etat : le Pouvoir central, les Provinces et les ETD.',
        articleRef: 'Art. 3 pt. 22 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l2q2',
        question: 'Les finances des ETD comprennent, entre autres, la quote-part sur les impôts et taxes :',
        options: [
          { id: 'a', texte: 'Nationaux uniquement' },
          { id: 'b', texte: 'Provinciaux d\'intérêt commun' },
          { id: 'c', texte: 'Municipaux uniquement' },
          { id: 'd', texte: 'Fonciers uniquement' },
          { id: 'e', texte: 'Douaniers perçus dans l\'ETD' },
        ],
        reponseCorrecte: 'b',
        explication: 'Selon l\'Art. 3 pt. 25 de la LOFIP, les finances des ETD comprennent notamment la quote-part des impôts provinciaux d\'intérêt commun, en plus de leurs ressources propres et des transferts de la Province.',
        articleRef: 'Art. 3 pt. 25 LOFIP',
      },
    ],
  },
  {
    id: 'l3',
    icone: <Scale className="h-5 w-5" />,
    titre: 'Cadre constitutionnel et institutionnel',
    badge: 'Constitution Art. 122, 174, 175, 176',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Les finances publiques en RDC reposent sur un <strong>fondement constitutionnel solide</strong>. La Constitution du 18 février 2006 consacre plusieurs articles essentiels qui organisent et encadrent les finances de l'État, en répartissant les compétences entre le niveau national et les niveaux décentralisés.
        </p>

        <h3 className="font-bold text-foreground">Art. 122 pt. 3 et 10 — Compétence législative du Parlement</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 122 Constitution RDC (2006)</p>
          <p className="italic text-foreground/80 text-xs">
            « Sans préjudice des autres dispositions de la présente Constitution, la loi fixe les règles concernant : [...]
            3° les finances publiques ; [...] 10° les règles d'assiette, taux et modalités de recouvrement des impositions de toute nature. »
          </p>
        </div>
        <p>
          L'article 122 point 3 réserve au <strong>Parlement national</strong> la compétence exclusive pour fixer les règles des finances publiques. C'est sur ce fondement que la LOFIP (Loi n° 11/011) a été adoptée comme loi organique. L'article 122 point 10 précise que les règles d'assiette, de taux et de recouvrement des impositions relèvent également du domaine de la loi nationale — excluant toute création d'impôt par les provinces ou les ETD.
        </p>

        <h3 className="font-bold text-foreground">Art. 174 — Définition constitutionnelle des finances publiques</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 174 Constitution RDC (2006)</p>
          <p className="italic text-foreground/80 text-xs">
            « Les finances publiques comprennent le budget de l'État, le budget des provinces et les budgets des entités territoriales décentralisées. »
          </p>
        </div>
        <p>
          Cet article constitutionnalise l'architecture tripartite des finances publiques. Il pose que les <strong>finances publiques ne se limitent pas au budget du Gouvernement central</strong> : elles englobent également les budgets des 26 provinces
          <InfoTooltip texte="La RDC compte 26 provinces depuis la mise en oeuvre de la décentralisation en 2015 (passage de 11 à 26 provinces). Chaque province a son propre budget voté par l'Assemblée provinciale." loi="Art. 2 Constitution · Loi n° 15/004 du 28 février 2015" />
          {' '}et des ETD. Cette disposition fonde directement les articles 2 et 3 de la LOFIP.
        </p>

        <h3 className="font-bold text-foreground">Art. 175 — La règle des 40% : clé constitutionnelle de la décentralisation financière</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 175 Constitution RDC (2006)</p>
          <p className="italic text-foreground/80 text-xs">
            « Le budget de l'État comprend le budget du Pouvoir central et les budgets des provinces. La part des recettes à caractère national allouées aux provinces est établie à 40 pour cent. Cette part leur est rétrocédée directement sur le lieu de leur perception. »
          </p>
        </div>
        <p>
          L'article 175 consacre la <strong>règle des 40%</strong>
          <InfoTooltip texte="La règle des 40% signifie que 40% des recettes à caractère national (impôts DGI, droits douaniers DGDA, etc.) perçues dans une province doivent être rétrocédés directement à cette province, avant tout transfert au Pouvoir central. Ce mécanisme est appelé 'retenue à la source'." loi="Art. 175 Constitution · Art. 3 pt. 24 LOFIP" />
          , qui est l'une des mesures phares de la décentralisation fiscale en RDC. La répartition est donc :
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-center">
            <p className="text-2xl font-bold text-emerald-700">40%</p>
            <p className="text-xs font-semibold text-emerald-700">Provinces</p>
            <p className="text-xs text-muted-foreground mt-1">Retenue directement à la source, dans la province de perception</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-2xl font-bold text-foreground">60%</p>
            <p className="text-xs font-semibold text-foreground">Pouvoir central</p>
            <p className="text-xs text-muted-foreground mt-1">Transféré au Trésor national</p>
          </div>
        </div>
        <p>
          Cette règle est <strong>d'application directe</strong> : la retenue se fait sur le lieu de perception, sans passage par le Trésor central. Elle est destinée à garantir l'autonomie financière des provinces et à corriger les déséquilibres historiques de développement.
        </p>

        <h3 className="font-bold text-foreground">Art. 176 — Autonomie de gestion des provinces</h3>
        <p>
          L'article 176 de la Constitution garantit que <strong>chaque province dispose de la libre administration de ses ressources</strong>. Les recettes propres des provinces et leur quote-part des recettes nationales sont gérées de façon autonome, sous le contrôle de l'Assemblée provinciale et, pour les finances, sous le contrôle de la Cour des comptes.
        </p>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-2">Synthèse du cadre constitutionnel</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-100/50">
                  <th className="text-left p-2 border border-emerald-200 font-semibold">Article Constitution</th>
                  <th className="text-left p-2 border border-emerald-200 font-semibold">Contenu</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Art. 122 pt. 3', 'Le Parlement légifère sur les finances publiques (fondement de la LOFIP)'],
                  ['Art. 122 pt. 10', 'Seul le Parlement fixe les règles d\'assiette, taux et recouvrement des impôts'],
                  ['Art. 174', 'Les finances publiques = budget Etat + budgets provinces + budgets ETD'],
                  ['Art. 175', '40% des recettes nationales rétrocédées aux provinces à la source'],
                  ['Art. 176', 'Libre administration des ressources provinciales'],
                  ['Art. 181', 'Caisse nationale de péréquation pour corriger les déséquilibres entre provinces'],
                ].map(([art, cont], i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="p-2 border border-border font-semibold text-emerald-700">{art}</td>
                    <td className="p-2 border border-border">{cont}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : Constitution RDC du 18 février 2006, telle que modifiée par la Loi n° 11/002 du 20 janvier 2011</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l3q1',
        question: 'Quel pourcentage des recettes à caractère national est alloué directement aux Provinces selon l\'Art. 175 de la Constitution ?',
        options: [
          { id: 'a', texte: '25%' },
          { id: 'b', texte: '30%' },
          { id: 'c', texte: '40%' },
          { id: 'd', texte: '50%' },
          { id: 'e', texte: '60%' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 175 de la Constitution fixe à 40% la part des recettes à caractère national allouées aux provinces. Ces 40% sont rétrocédés directement sur le lieu de leur perception (retenue à la source), les 60% restants reviennent au Pouvoir central.',
        articleRef: 'Art. 175 Constitution',
      },
      {
        type: 'qcm',
        id: 'l3q2',
        question: 'Selon l\'Art. 175 de la Constitution, la clé de répartition des recettes à caractère national entre Pouvoir central et Provinces est :',
        options: [
          { id: 'a', texte: '50% Pouvoir central / 50% Provinces' },
          { id: 'b', texte: '60% Pouvoir central / 40% Provinces' },
          { id: 'c', texte: '70% Pouvoir central / 30% Provinces' },
          { id: 'd', texte: '40% Pouvoir central / 60% Provinces' },
          { id: 'e', texte: '75% Pouvoir central / 25% Provinces' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 175 de la Constitution établit la clé de répartition : 60% pour le Pouvoir central et 40% pour les Provinces, ces dernières étant rétrocédées directement à la source.',
        articleRef: 'Art. 175 Constitution',
      },
    ],
  },
  {
    id: 'l4',
    icone: <Briefcase className="h-5 w-5" />,
    titre: 'Les deux ministères clés des finances publiques',
    badge: 'LOFIP Exposé des motifs · Art. 88-115',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La gestion des finances publiques en RDC repose sur une architecture institutionnelle particulière : <strong>deux ministères distincts</strong> se partagent les responsabilités financières de l'État. Cette répartition est consacrée par la LOFIP et ses textes d'application. Comprendre leurs rôles respectifs est essentiel pour saisir le fonctionnement de la chaîne budgétaire congolaise.
        </p>

        <h3 className="font-bold text-foreground">1. Le Ministre du Budget</h3>
        <p>
          Le <strong>Ministre du Budget</strong>
          <InfoTooltip texte="Le Ministre du Budget est responsable de la programmation des dépenses publiques et du contrôle de leur exécution. Il pilote la préparation du projet de loi de finances annuelle et pluriannuelle (CBMT). Il est l'ordonnateur principal des dépenses du budget du Pouvoir central." loi="LOFIP Exposé des motifs · Art. 75-87" />
          {' '}est le principal responsable de la <strong>planification et du contrôle budgétaire</strong>. Ses attributions comprennent :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Elaboration du budget</strong> : il prépare le projet de loi de finances annuelle et les Cadres Budgétaires à Moyen Terme (CBMT
              <InfoTooltip texte="Le CBMT (Cadre Budgétaire à Moyen Terme) est un instrument de programmation budgétaire sur 3 ans glissants. Il projette les ressources et les dépenses sur 3 exercices pour donner de la visibilité pluriannuelle aux programmes publics." loi="Art. 43 LOFIP" />
              ) sur 3 années glissantes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Engagement des dépenses</strong> : il autorise les engagements de dépenses par les ministères sectoriels dans la limite des crédits ouverts</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Contrôle budgétaire a priori</strong> : par l'intermédiaire des Contrôleurs Budgétaires placés dans chaque ministère dépensier</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Suivi de l'exécution budgétaire</strong> : il produit les rapports périodiques d'exécution du budget (trimestriels et annuels)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Pilotage du CBMT</strong> : coordination de la budgétisation pluriannuelle avec le Ministère du Plan</span>
          </li>
        </ul>

        <h3 className="font-bold text-foreground">2. Le Ministre des Finances</h3>
        <p>
          Le <strong>Ministre des Finances</strong>
          <InfoTooltip texte="Le Ministre des Finances est responsable de la gestion de la trésorerie de l'Etat, de l'ordonnancement des recettes et de la désignation des comptables publics. Il veille à la mobilisation des ressources financières (impôts, emprunts) et à leur bonne gestion par le Trésor public." loi="LOFIP Exposé des motifs · Art. 88-115" />
          {' '}est le principal responsable de la <strong>gestion de la trésorerie et du recouvrement des recettes</strong>. Ses attributions comprennent :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Gestion de la trésorerie de l'Etat</strong> : il veille à la disponibilité des fonds pour honorer les dépenses de l'Etat en temps opportun</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Ordonnancement des recettes</strong>
              <InfoTooltip texte="L'ordonnancement est l'acte par lequel le Ministre des Finances constate le droit de l'Etat à percevoir une recette (impôt, taxe, redevance) et prescrit son recouvrement. C'est une étape préalable au recouvrement effectif par le comptable public." loi="LOFIP Art. 88-94" />
              {' '}: il émet les titres de recettes et prescrit leur recouvrement
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Désignation des comptables publics</strong>
              <InfoTooltip texte="Les comptables publics sont des fonctionnaires spécialisés, personnellement et pécuniairement responsables des opérations de caisse. Ils sont nommés par le Ministre des Finances et sont les seuls habilités à manier les fonds publics." loi="LOFIP Art. 3 pt. 9" />
              {' '}: il nomme et révoque les agents habilités à manier les fonds publics
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Gestion de la dette publique</strong> : il négocie et suit l'exécution des emprunts et des obligations de l'Etat</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Surveillance du système bancaire</strong> : en liaison avec la Banque Centrale du Congo (BCC), il suit la politique monétaire et ses incidences sur le budget</span>
          </li>
        </ul>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Ministère</th>
                <th className="text-left p-2 border border-border font-semibold">Mission principale</th>
                <th className="text-left p-2 border border-border font-semibold">Phase budgétaire</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Ministre du Budget', 'Planification, engagement et contrôle des dépenses', 'Phase d\'élaboration et d\'engagement'],
                ['Ministre des Finances', 'Trésorerie, ordonnancement des recettes, comptables publics', 'Phase d\'exécution et de recouvrement'],
              ].map(([m, role, phase], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-emerald-700">{m}</td>
                  <td className="p-2 border border-border">{role}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{phase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Point clé — Séparation ordonnateur / comptable</p>
          <p className="text-xs text-emerald-800">La LOFIP consacre le principe fondamental de séparation entre l'<strong>ordonnateur</strong> (qui décide de la dépense : les ministres sectoriels et le Ministre du Budget) et le <strong>comptable public</strong> (qui exécute le paiement : nommé par le Ministre des Finances). Cette séparation est un gage de contrôle et d'intégrité dans la gestion des fonds publics.</p>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Exposé des motifs · Art. 88-115 LOFIP · Décret portant organisation du Gouvernement</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l4q1',
        question: 'Quel ministre est responsable de la gestion de la trésorerie de l\'Etat selon la LOFIP ?',
        options: [
          { id: 'a', texte: 'Ministre du Budget' },
          { id: 'b', texte: 'Ministre des Finances' },
          { id: 'c', texte: 'Ministre du Plan' },
          { id: 'd', texte: 'Premier Ministre' },
          { id: 'e', texte: 'Gouverneur de la Banque Centrale du Congo' },
        ],
        reponseCorrecte: 'b',
        explication: 'Le Ministre des Finances est responsable de la gestion de la trésorerie de l\'Etat, de l\'ordonnancement des recettes et de la désignation des comptables publics. Le Ministre du Budget, lui, s\'occupe de la planification et du contrôle des dépenses.',
        articleRef: 'LOFIP Exposé des motifs',
      },
      {
        type: 'qcm',
        id: 'l4q2',
        question: 'Selon la LOFIP, quelle institution désigne les comptables publics ?',
        options: [
          { id: 'a', texte: 'Le Parlement' },
          { id: 'b', texte: 'Le Président de la République' },
          { id: 'c', texte: 'Le Ministre des Finances' },
          { id: 'd', texte: 'Le Ministre du Budget' },
          { id: 'e', texte: 'La Cour des comptes' },
        ],
        reponseCorrecte: 'c',
        explication: 'Selon la LOFIP, les comptables publics sont désignés par le Ministre des Finances. Ils sont personnellement et pécuniairement responsables des opérations de caisse et sont les seuls habilités à manier les fonds publics.',
        articleRef: 'Art. 3 pt. 9 LOFIP',
      },
    ],
  },
  {
    id: 'l5',
    icone: <TrendingUp className="h-5 w-5" />,
    titre: 'Actualité 2025 - La loi de finances rectificative n° 25/044',
    badge: 'LFR n° 25/044 du 28 juin 2025',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          En 2025, la RDC a procédé à une révision de son budget en cours d'exercice, conformément à la procédure prévue par la LOFIP. Cette révision constitue un cas pratique réel et actuel des mécanismes des finances publiques étudiés dans les leçons précédentes.
        </p>

        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Loi n° 25/044 du 28 juin 2025 — Budget rectifié de la RDC</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {[
              { label: 'Budget rectifié', value: '50 691,8 Mds FC', detail: 'environ 17,2 milliards USD' },
              { label: 'Budget initial', value: '51 553,5 Mds FC', detail: 'Loi de finances initiale 2025' },
              { label: 'Variation', value: '-1,7%', detail: 'Légère baisse par rapport au budget initial' },
              { label: 'Taux de croissance PIB', value: '5,3%', detail: 'Projection révisée du PIB 2025' },
              { label: 'Taux d\'inflation', value: '8,8%', detail: 'Objectif d\'inflation révisé' },
              { label: 'Taux de change moyen', value: '2 859,2 FC/USD', detail: 'Taux moyen annuel projeté' },
            ].map((item, i) => (
              <div key={i} className="rounded-lg bg-card border border-border p-2.5">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-bold text-foreground text-sm mt-0.5">{item.value}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-foreground">Signification juridique d'une loi de finances rectificative</h3>
        <p>
          Une <strong>loi de finances rectificative (LFR)</strong>
          <InfoTooltip texte="La loi de finances rectificative (LFR) est une loi qui modifie en cours d'exercice les autorisations budgétaires données par la loi de finances initiale. Elle est permise par le principe d'annualité (Art. 5 LOFIP) qui prévoit des aménagements en cours d'exercice." loi="Art. 5 LOFIP · Art. 76-87 LOFIP" />
          {' '}intervient lorsque les conditions économiques évoluent suffisamment pour justifier une révision du budget initial. La LOFIP prévoit cette possibilité au titre du principe d'annualité (Art. 5) et du processus budgétaire (Art. 76-87). Elle suit la même procédure que le budget initial : préparation par le Gouvernement, examen et vote par le Parlement.
        </p>
        <p>
          La LFR n° 25/044 du 28 juin 2025 illustre plusieurs notions fondamentales étudiées :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Principe d'annualité (Art. 5 LOFIP)</strong> : le budget couvre l'exercice 2025 (1er janvier au 31 décembre) mais peut être révisé en cours d'année</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Principe de sincérité (Art. 11 LOFIP)</strong> : la révision à la baisse (de 51 553,5 à 50 691,8 Mds FC) traduit l'obligation d'inscrire des montants réalistes</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Cadre macroéconomique</strong> : les hypothèses budgétaires (PIB 5,3%, inflation 8,8%, change 2 859,2 FC/USD) illustrent l'articulation entre politique économique et budget</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Compétence exclusive du Parlement</strong> : la révision nécessite une loi, conformément à l'Art. 122 pt. 3 de la Constitution — le Gouvernement seul ne peut pas modifier le budget</span>
          </li>
        </ul>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Contexte économique RDC 2025</p>
          <p className="text-xs text-emerald-800">Le budget 2025 de la RDC reflète les défis d'un pays en forte croissance mais confronté à des pressions inflationnistes persistantes et à la volatilité du taux de change. La révision à la baisse du budget (- 861,7 Mds FC) traduit une prudence budgétaire face à des recettes en deçà des prévisions initiales, notamment dans les secteurs minier et pétrolier. Le maintien d'un taux de croissance de 5,3% témoigne de la résilience de l'économie congolaise portée par les industries extractives et les télécommunications.</p>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : Loi n° 25/044 du 28 juin 2025 portant budget rectifié de l'Etat pour l'exercice 2025 · LOFIP Art. 5, 11, 76-87</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l5q1',
        question: 'La loi de finances rectificative de juin 2025 (n° 25/044) a fixé le budget de la RDC à :',
        options: [
          { id: 'a', texte: '49 846 milliards FC' },
          { id: 'b', texte: '50 691,8 milliards FC' },
          { id: 'c', texte: '45 376 milliards FC' },
          { id: 'd', texte: '51 553,5 milliards FC' },
          { id: 'e', texte: '53 000 milliards FC' },
        ],
        reponseCorrecte: 'b',
        explication: 'La LFR n° 25/044 du 28 juin 2025 a fixé le budget rectifié à 50 691,8 milliards FC (environ 17,2 milliards USD), en baisse de 1,7% par rapport au budget initial de 51 553,5 milliards FC.',
        articleRef: 'LFR n° 25/044 du 28 juin 2025',
      },
      {
        type: 'qcm',
        id: 'l5q2',
        question: 'Une province souhaite créer un nouvel impôt pour financer ses écoles. Selon la Constitution et la LOFIP, cette décision est :',
        options: [
          { id: 'a', texte: 'Possible car la province gère ses propres ressources' },
          { id: 'b', texte: 'Impossible — seul le Parlement national peut créer des impôts' },
          { id: 'c', texte: 'Possible sur autorisation du Gouverneur' },
          { id: 'd', texte: 'Possible si approuvée par l\'Assemblée provinciale' },
          { id: 'e', texte: 'Possible uniquement si l\'impôt ne dépasse pas 2% du revenu imposable' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 122 pt. 10 de la Constitution et l\'Art. 9 de la LOFIP réservent exclusivement au Parlement national le pouvoir de créer des impôts et de fixer leurs règles d\'assiette, taux et recouvrement. Ni les Assemblées provinciales, ni les ETD ne peuvent créer d\'impôts.',
        articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 Constitution',
      },
    ],
  },
]

// ============================================================
// QCM GLOBAL (15 questions pour l'onglet QCM admin/prof)
// ============================================================
const QCM_GLOBAL = [
  {
    type: 'qcm',
    id: 'q1',
    question: 'Quel article de la Constitution RDC habilite le Parlement à légiférer sur les finances publiques ?',
    options: [
      { id: 'a', texte: 'Art. 120' },
      { id: 'b', texte: 'Art. 122 point 3' },
      { id: 'c', texte: 'Art. 174' },
      { id: 'd', texte: 'Art. 175' },
      { id: 'e', texte: 'Art. 130' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 122 point 3 de la Constitution habilite le Parlement à légiférer sur les finances publiques. C\'est sur ce fondement que la LOFIP (Loi n° 11/011) a été adoptée comme loi organique.',
    articleRef: 'Art. 1 LOFIP · Art. 122 pt. 3 Constitution',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q2',
    question: 'Selon la LOFIP (Art. 3 pt. 22), les finances de l\'Etat comprennent les recettes et dépenses de :',
    options: [
      { id: 'a', texte: 'Pouvoir central uniquement' },
      { id: 'b', texte: 'Pouvoir central + Provinces uniquement' },
      { id: 'c', texte: 'Pouvoir central + Provinces + ETD' },
      { id: 'd', texte: 'Gouvernement central et ministères seulement' },
      { id: 'e', texte: 'Provinces et ETD uniquement' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 3 pt. 22 de la LOFIP définit les Finances de l\'Etat comme l\'ensemble des recettes et dépenses des trois entités : Pouvoir central, Provinces et ETD (Entités Territoriales Décentralisées).',
    articleRef: 'Art. 3 pt. 22 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q3',
    question: 'Quel pourcentage des recettes à caractère national est alloué aux Provinces selon l\'Art. 175 de la Constitution ?',
    options: [
      { id: 'a', texte: '25%' },
      { id: 'b', texte: '30%' },
      { id: 'c', texte: '40%' },
      { id: 'd', texte: '50%' },
      { id: 'e', texte: '35%' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 175 de la Constitution fixe à 40% la part des recettes à caractère national allouées aux provinces, rétrocédée directement à la source. Les 60% restants reviennent au Pouvoir central.',
    articleRef: 'Art. 175 Constitution',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q4',
    question: 'Quelle est la différence principale entre les finances publiques et les finances privées ?',
    options: [
      { id: 'a', texte: 'Les finances privées utilisent des impôts' },
      { id: 'b', texte: 'Les finances publiques visent l\'intérêt général et sont soumises au principe de légalité' },
      { id: 'c', texte: 'Les finances publiques n\'ont pas de comptabilité' },
      { id: 'd', texte: 'Les finances privées dépendent de la loi nationale' },
      { id: 'e', texte: 'Les deux types de finances sont soumises au contrôle de la Cour des comptes' },
    ],
    reponseCorrecte: 'b',
    explication: 'Les finances publiques se distinguent par leur finalité (intérêt général), leur régime juridique (légalité obligatoire) et leurs ressources (impôts contraints). Les finances privées visent le profit et obéissent à la liberté contractuelle.',
    articleRef: 'Art. 1 et 3 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q5',
    question: 'La LOFIP est la Loi n° :',
    options: [
      { id: 'a', texte: '11/011 du 13 juillet 2011' },
      { id: 'b', texte: '11/022 du 24 décembre 2011' },
      { id: 'c', texte: '13/050 du 6 novembre 2013' },
      { id: 'd', texte: '10/010 du 27 avril 2010' },
      { id: 'e', texte: '15/005 du 1er mars 2015' },
    ],
    reponseCorrecte: 'a',
    explication: 'La LOFIP est la Loi n° 11/011 du 13 juillet 2011 relative aux Finances Publiques. La Loi n° 13/050 est le RGCP (Règlement Général sur la Comptabilité Publique).',
    articleRef: 'Art. 1 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q6',
    question: 'Quel ministre est responsable de la gestion de la trésorerie de l\'Etat selon la LOFIP ?',
    options: [
      { id: 'a', texte: 'Ministre du Budget' },
      { id: 'b', texte: 'Ministre des Finances' },
      { id: 'c', texte: 'Ministre du Plan' },
      { id: 'd', texte: 'Premier Ministre' },
      { id: 'e', texte: 'Gouverneur de la Banque centrale' },
    ],
    reponseCorrecte: 'b',
    explication: 'Le Ministre des Finances est responsable de la trésorerie de l\'Etat, de l\'ordonnancement des recettes et de la désignation des comptables publics. Le Ministre du Budget s\'occupe de la planification et du contrôle des dépenses.',
    articleRef: 'LOFIP Exposé des motifs',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q7',
    question: 'Parmi les sources de financement des provinces, laquelle est retenue directement à la source sur les recettes nationales ?',
    options: [
      { id: 'a', texte: 'Fonds de concours' },
      { id: 'b', texte: 'Rétrocession 40% (retenue à la source)' },
      { id: 'c', texte: 'Subvention de l\'Etat' },
      { id: 'd', texte: 'Péréquation de la Caisse nationale' },
      { id: 'e', texte: 'Dons et legs étrangers' },
    ],
    reponseCorrecte: 'b',
    explication: 'La rétrocession des 40% est la part des recettes nationales retenue directement à la source (dans la province de perception) avant tout transfert au Pouvoir central. C\'est un droit constitutionnel des provinces (Art. 175 Constitution).',
    articleRef: 'Art. 175 Constitution · Art. 3 pt. 24 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q8',
    question: 'Quel est l\'objet principal de l\'article 1er de la LOFIP ?',
    options: [
      { id: 'a', texte: 'Définir les principes budgétaires' },
      { id: 'b', texte: 'Fixer les règles des finances publiques conformément à l\'art. 122 Constitution' },
      { id: 'c', texte: 'Créer la Cour des comptes' },
      { id: 'd', texte: 'Etablir le plan comptable de l\'Etat' },
      { id: 'e', texte: 'Organiser le contrôle parlementaire des dépenses' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 1 de la LOFIP fixe son objet : « la présente loi fixe, conformément à l\'article 122 point 3 de la Constitution, les règles relatives aux finances publiques. » Les principes budgétaires sont traités aux Art. 4-11, et la Cour des comptes relève de la Constitution.',
    articleRef: 'Art. 1 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q9',
    question: 'Un candidat déclare : « Les finances publiques et les finances privées obéissent aux mêmes règles car toutes deux gèrent de l\'argent. » Cette affirmation est :',
    options: [
      { id: 'a', texte: 'Vraie, car l\'argent a les mêmes règles partout' },
      { id: 'b', texte: 'Fausse, car les finances publiques sont soumises à la légalité et visent l\'intérêt général' },
      { id: 'c', texte: 'Vraie, car la comptabilité est identique dans les deux cas' },
      { id: 'd', texte: 'Vraie dans le cas des entreprises publiques' },
      { id: 'e', texte: 'Fausse, car les finances privées sont aussi régies par la LOFIP' },
    ],
    reponseCorrecte: 'b',
    explication: 'Cette affirmation est fausse. Les finances publiques obéissent au principe de légalité (LOFIP), visent l\'intérêt général, sont financées par la contrainte fiscale et contrôlées par la Cour des comptes. Les finances privées obéissent à la liberté contractuelle et visent le profit.',
    articleRef: 'Art. 1, 3 et 9 LOFIP · Art. 122 Constitution',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q10',
    question: 'Selon l\'article 175 de la Constitution, la clé de répartition des recettes à caractère national entre Pouvoir central et Provinces est :',
    options: [
      { id: 'a', texte: '50% Pouvoir central / 50% Provinces' },
      { id: 'b', texte: '60% Pouvoir central / 40% Provinces' },
      { id: 'c', texte: '70% Pouvoir central / 30% Provinces' },
      { id: 'd', texte: '40% Pouvoir central / 60% Provinces' },
      { id: 'e', texte: '65% Pouvoir central / 35% Provinces' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 175 de la Constitution : 40% des recettes à caractère national sont alloués aux provinces (rétrocession directe à la source), les 60% restants reviennent au Pouvoir central.',
    articleRef: 'Art. 175 Constitution',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q11',
    question: 'Les finances des ETD comprennent, entre autres, la quote-part sur les impôts et taxes :',
    options: [
      { id: 'a', texte: 'Nationaux uniquement' },
      { id: 'b', texte: 'Provinciaux d\'intérêt commun' },
      { id: 'c', texte: 'Municipaux uniquement' },
      { id: 'd', texte: 'Fonciers uniquement' },
      { id: 'e', texte: 'Douaniers et accises' },
    ],
    reponseCorrecte: 'b',
    explication: 'Selon l\'Art. 3 pt. 25 de la LOFIP, les finances des ETD comprennent notamment leur quote-part des impôts provinciaux d\'intérêt commun, en plus de leurs ressources propres et des transferts provinciaux.',
    articleRef: 'Art. 3 pt. 25 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q12',
    question: 'Selon la LOFIP, quelle institution désigne les comptables publics ?',
    options: [
      { id: 'a', texte: 'Le Parlement' },
      { id: 'b', texte: 'Le Président de la République' },
      { id: 'c', texte: 'Le Ministre des Finances' },
      { id: 'd', texte: 'Le Ministre du Budget' },
      { id: 'e', texte: 'Le Premier Ministre' },
    ],
    reponseCorrecte: 'c',
    explication: 'Les comptables publics sont désignés par le Ministre des Finances selon la LOFIP. Ils sont personnellement et pécuniairement responsables des opérations de caisse et sont les seuls habilités à manier les fonds publics.',
    articleRef: 'Art. 3 pt. 9 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q13',
    question: 'Un étudiant affirme que « le budget de la Province » et « le budget provincial » sont des notions identiques. Est-ce correct ?',
    options: [
      { id: 'a', texte: 'Oui, les deux termes sont identiques' },
      { id: 'b', texte: 'Non — le budget provincial intègre les budgets des ETD en son sein' },
      { id: 'c', texte: 'Oui, sauf pour les ETD rurales' },
      { id: 'd', texte: 'Non, le budget provincial est voté par l\'Assemblée nationale' },
      { id: 'e', texte: 'Oui, car les ETD sont des entités autonomes sans lien avec le budget provincial' },
    ],
    reponseCorrecte: 'b',
    explication: 'La LOFIP distingue : les finances des ETD (Art. 3 pt. 25) sont intégrées dans le budget provincial, qui forme lui-même une composante du Budget de l\'Etat. Le budget provincial est voté par l\'Assemblée provinciale, pas par l\'Assemblée nationale.',
    articleRef: 'Art. 3 pt. 24-25 LOFIP · Art. 174 Constitution',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q14',
    question: 'La Loi de Finances 2026 (Loi n° 25/060 du 29 décembre 2025) a fixé le budget en équilibre à :',
    options: [
      { id: 'a', texte: '49 846 milliards FC' },
      { id: 'b', texte: '50 691,8 milliards FC' },
      { id: 'c', texte: '54.335,8 milliards FC' },
      { id: 'd', texte: '51 553,5 milliards FC' },
      { id: 'e', texte: '48.969,3 milliards FC' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 6 de la Loi n° 25/060 du 29 décembre 2025 (LF 2026) fixe le budget en équilibre à 54.335,8 milliards FC (54.335.751.192.461 FC), en progression de +7,2% par rapport au budget rectifié 2025. Les recettes du Budget général s\'élèvent à 48.969,3 milliards FC (Art. 7 LF 2026).',
    articleRef: 'Art. 6 et 7 de la Loi n° 25/060 du 29 décembre 2025 (LF 2026)',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q15',
    question: 'Une province souhaite créer un nouvel impôt pour financer ses écoles. Selon la LOFIP (Art. 9) et la Constitution (Art. 122 pt. 10), cette décision est :',
    options: [
      { id: 'a', texte: 'Possible car la province gère ses propres ressources' },
      { id: 'b', texte: 'Impossible — seul le Parlement national peut créer des impôts' },
      { id: 'c', texte: 'Possible sur autorisation du Gouverneur' },
      { id: 'd', texte: 'Possible si approuvée par l\'Assemblée provinciale' },
      { id: 'e', texte: 'Possible avec l\'accord du Ministre des Finances' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 9 al. 1 de la LOFIP dispose : « il ne peut être établi d\'impôts qu\'en vertu de la loi ». L\'Art. 122 pt. 10 de la Constitution réserve au Parlement national le pouvoir de fixer les règles d\'assiette, taux et recouvrement des impositions. Ni les Assemblées provinciales, ni les ETD ne peuvent créer d\'impôts.',
    articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 Constitution',
    difficulte: 'difficile',
  },
]

// ============================================================
// CAS PRATIQUES
// ============================================================
interface CasPratiqueEtude {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
  articleRef: string
}

const ETUDES_DE_CAS: CasPratiqueEtude[] = [
  {
    id: 'cp1',
    titre: 'La taxe sur les marchés publics de la Province du Kwilu',
    contexte: 'L\'Assemblée provinciale du Kwilu vote une délibération instituant une « taxe spéciale sur les marchés publics » de 5% sur tous les contrats passés par les services de l\'Etat dans la province. Le Gouverneur promulgue la délibération. Le ministre provincial du Budget commence à émettre des avis de paiement aux entreprises attributaires de marchés.',
    questions: [
      { num: 1, enonce: 'Quelle est la nature juridique de cette décision de l\'Assemblée provinciale ? Comparez avec l\'Art. 122 pt. 10 de la Constitution et l\'Art. 9 de la LOFIP.', correction: 'Cette décision est illégale et inconstitutionnelle. L\'Art. 122 pt. 10 de la Constitution réserve au Parlement national le pouvoir de fixer les règles d\'assiette, taux et recouvrement des impositions de toute nature. L\'Art. 9 al. 1 de la LOFIP dispose qu\'« il ne peut être établi d\'impôts qu\'en vertu de la loi ». La délibération provinciale, acte d\'une Assemblée provinciale, ne peut pas créer un impôt. Elle est nule et de nul effet.' },
      { num: 2, enonce: 'Quelles sont les voies de recours disponibles pour contester cette décision ? Qui peut les exercer ?', correction: 'Les entreprises attributaires de marchés peuvent : (1) saisir le Tribunal administratif pour excès de pouvoir ; (2) déférer la délibération devant la Cour constitutionnelle pour inconstitutionnalité (Art. 162 Constitution) ; (3) adresser un recours gracieux au Gouverneur pour retrait de la promulgation. Le Procureur Général près la Cour d\'appel peut également agir d\'office. Le Parlement national peut en outre annuler la délibération via la procédure de tutelle sur les actes des provinces.' },
      { num: 3, enonce: 'Quelles ressources propres la Province du Kwilu peut-elle légalement lever pour financer ses dépenses, sans avoir recours à la création d\'impôts ?', correction: 'Selon l\'Art. 3 pt. 24 de la LOFIP et l\'Art. 175 de la Constitution, la Province du Kwilu peut légalement compter sur : (1) les 40% des recettes nationales rétrocédés à la source ; (2) les taxes d\'intérêt local créées dans le cadre de la liste des taxes provinciales établie par la loi nationale ; (3) les dotations de la Caisse nationale de péréquation ; (4) les transferts du Pouvoir central pour les services décentralisés. La province ne peut pas créer des impôts, mais peut percevoir des taxes dans la liste fixée par la loi.' },
    ],
    articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 · Art. 175 Constitution',
  },
  {
    id: 'cp2',
    titre: 'Le budget de la commune de Ngaliema et ses sources de financement',
    contexte: 'La commune de Ngaliema (ETD de la ville de Kinshasa) prépare son budget pour l\'exercice prochain. Le Bourgmestre présente au Conseil communal un projet de budget comprenant : (1) des recettes propres de taxes locales pour 450 millions FC ; (2) une quote-part attendue des impôts provinciaux pour 380 millions FC ; (3) des transferts de la Province de Kinshasa pour 200 millions FC. Un conseiller communal propose d\'ajouter une ligne de « subvention nationale directe » de 100 millions FC, en arguant que la commune est en droit de recevoir des fonds directement de l\'Etat central.',
    questions: [
      { num: 1, enonce: 'Analysez la structure de financement proposée à la lumière de l\'Art. 3 pt. 25 de la LOFIP. Est-elle conforme ?', correction: 'La structure de base est conforme à l\'Art. 3 pt. 25 de la LOFIP qui prévoit trois sources de financement des ETD : (1) les ressources propres (taxes locales : 450 M FC — conforme) ; (2) la quote-part des impôts provinciaux d\'intérêt commun (380 M FC — conforme) ; (3) les transferts de la Province (200 M FC — conforme). Les trois composantes légales sont présentes et régulières.' },
      { num: 2, enonce: 'La proposition du conseiller d\'ajouter une « subvention nationale directe » est-elle juridiquement fondée selon la LOFIP et la Constitution ?', correction: 'La proposition est juridiquement discutable. L\'Art. 3 pt. 25 de la LOFIP liste les ressources des ETD : elles proviennent du niveau provincial, pas directement du Pouvoir central. Les transferts du Pouvoir central transitent normalement par le budget provincial (Art. 174 Constitution : le budget de l\'Etat comprend les budgets des provinces qui intègrent les budgets ETD). Toutefois, la Caisse nationale de péréquation (Art. 181 Constitution) peut financer directement des projets dans les ETD. Le conseiller devrait préciser le fondement de cette subvention.' },
      { num: 3, enonce: 'Comment les budgets des ETD s\'articulent-ils avec le budget de l\'Etat ? Décrivez le schéma de consolidation.', correction: 'Selon la LOFIP et l\'Art. 174 de la Constitution, la consolidation se fait en deux étapes : (1) les budgets des ETD (communes, secteurs, chefferies) sont intégrés dans le budget provincial de leur Province de rattachement, formant le « budget provincial » au sens de l\'Art. 175 Constitution ; (2) les budgets de toutes les provinces sont consolidés avec le budget du Pouvoir central pour former le « Budget de l\'Etat » soumis au Parlement national. Ainsi, le budget de la commune de Ngaliema fait partie du budget provincial de Kinshasa, lui-même composante du Budget de l\'Etat.' },
    ],
    articleRef: 'Art. 3 pt. 25 · Art. 2 LOFIP · Art. 174, 175, 181 Constitution',
  },
  {
    id: 'cp3',
    titre: 'Le principe de l\'annualité face à une dépense engagée hors exercice',
    contexte: 'Le ministère des Travaux Publics a engagé en novembre 2024 un marché de construction d\'un pont pour 8 milliards FC, avec livraison prévue en mars 2026. Les crédits ont été ouverts sur l\'exercice 2024. Au 31 décembre 2024, les travaux ne sont qu\'à 40% et le solde de 4,8 milliards FC n\'a pas été payé. Le Directeur des finances du ministère affirme que les crédits non consommés de 2024 sont automatiquement reportés sur 2025 pour couvrir la suite des travaux.',
    questions: [
      { num: 1, enonce: 'L\'affirmation du Directeur des finances est-elle conforme au principe de l\'annualité budgétaire énoncé à l\'Art. 5 de la LOFIP ? Expliquez précisément ce que dit cet article.', correction: 'L\'affirmation est contraire au principe de l\'annualité posé par l\'Art. 5 LOFIP : « Le budget est annuel. L\'année budgétaire commence le 1er janvier et se termine le 31 décembre. » Les crédits ouverts sur un exercice ne sont valables que pour cet exercice et ne peuvent pas être automatiquement reportés. À la clôture du 31 décembre 2024, les crédits non consommés sont annulés de plein droit. Pour financer la suite du marché en 2025, de nouveaux crédits doivent être inscrits dans la loi de finances 2025.' },
      { num: 2, enonce: 'L\'Art. 6 de la LOFIP prévoit-il des exceptions au principe d\'annualité pour les opérations pluriannuelles ? Si oui, dans quelles conditions ?', correction: 'L\'Art. 6 de la LOFIP prévoit les autorisations d\'engagement (AE) pour les dépenses pluriannuelles. Une autorisation d\'engagement est la limite supérieure des dépenses pouvant être engagées au titre d\'une opération. Les crédits de paiement (CP) correspondants doivent être inscrits dans chaque loi de finances annuelle couvrant l\'exercice concerné. Dans le cas du marché de travaux publics, le Gouvernement aurait dû solliciter une autorisation d\'engagement pluriannuelle lors de l\'inscription budgétaire, assortie des crédits de paiement pour chaque année.' },
      { num: 3, enonce: 'Quelle procédure prévoit la LOFIP pour les dépenses qui ne peuvent pas être réglées avant la clôture de l\'exercice ? Quels articles s\'appliquent ?', correction: 'La LOFIP prévoit à l\'Art. 68 la procédure des restes à payer : les dépenses engagées et liquidées mais non encore ordonnancées ou payées au 31 décembre sont prises en charge dans les écritures de l\'exercice suivant après inscription de crédits correspondants. L\'Art. 69 prévoit par ailleurs la période complémentaire (janvier de l\'exercice suivant) pour certaines opérations de régularisation. Ces mécanismes ne constituent pas un report automatique des crédits, mais nécessitent une inscription express dans le budget de l\'exercice suivant.' },
    ],
    articleRef: 'Art. 5, 6, 68, 69 LOFIP',
  },
  {
    id: 'cp4',
    titre: 'Principe de la séparation ordonnateur / comptable public dans un service de l\'Etat',
    contexte: 'Le Gouverneur de la Province du Haut-Katanga, également ordonnateur principal du budget provincial, décide, pour accélérer les paiements, de demander au receveur provincial (comptable public) de lui remettre chaque semaine une avance de fonds de 500 millions FC à sa disposition personnelle pour régler directement les fournisseurs. Il invoque l\'urgence des travaux de réhabilitation des routes provinciales. Le receveur hésite à exécuter cet ordre.',
    questions: [
      { num: 1, enonce: 'Quel principe fondamental des finances publiques est violé par la demande du Gouverneur ? Identifiez les articles précis de la LOFIP qui le consacrent.', correction: 'La demande du Gouverneur viole le principe de séparation de l\'ordonnateur et du comptable public, consacré par les Art. 109 et 110 de la LOFIP. L\'Art. 109 définit le comptable public comme l\'agent ayant qualité pour exécuter les opérations de recettes et de dépenses. L\'Art. 110 pose que les fonctions d\'ordonnateur et de comptable public sont incompatibles et ne peuvent être exercées par la même personne ni déléguées l\'une à l\'autre. En remettant des fonds à l\'ordonnateur, le receveur lui conférerait de facto le maniement des fonds publics, ce qui est interdit.' },
      { num: 2, enonce: 'Quelles sont les conséquences juridiques pour le receveur provincial s\'il obéit à l\'ordre du Gouverneur ? Quels articles de la LOFIP s\'appliquent ?', correction: 'Si le receveur obéit, il engage sa responsabilité personnelle et pécuniaire au sens de l\'Art. 109 al. 2 de la LOFIP : « les comptables publics sont personnellement et pécuniairement responsables des opérations dont ils ont la charge. » Il s\'expose à : (1) une mise en débet par la Cour des comptes pour les fonds remis sans titre régulier ; (2) des sanctions disciplinaires pouvant aller jusqu\'au licenciement ; (3) des poursuites pénales pour détournement de deniers publics (Art. 133 LOFIP sur le régime des sanctions). Le receveur a le droit et le devoir de refuser tout ordre contraire aux lois et règlements.' },
      { num: 3, enonce: 'Quelle procédure légale la LOFIP prévoit-elle pour régler les fournisseurs en urgence, dans le respect de la séparation ordonnateur / comptable ?', correction: 'La LOFIP prévoit deux mécanismes légaux pour les urgences : (1) la procédure de dépenses par régies d\'avances (Art. 95 LOFIP) : le Ministre des Finances peut autoriser des régies d\'avances confiées à des agents spécialement habilités (régisseurs), qui demeurent des comptables de fait soumis à contrôle ; (2) la procédure de dépenses sans ordonnancement préalable (Art. 96 LOFIP) pour certaines catégories de dépenses urgentes listées par décret. Dans les deux cas, la séparation ordonnateur / comptable est maintenue : ce n\'est jamais l\'ordonnateur lui-même qui touche les fonds.' },
    ],
    articleRef: 'Art. 109, 110, 95, 96, 133 LOFIP',
  },
  {
    id: 'cp5',
    titre: 'La Caisse nationale de péréquation et l\'article 181 de la Constitution',
    contexte: 'La Province du Mai-Ndombe, l\'une des moins dotées en recettes fiscales propres, reçoit peu de rétrocessions (40%) faute d\'activité économique significative. Son Gouverneur estime que sa province est lésée par le mécanisme de rétrocession à la source de l\'Art. 175 de la Constitution car « plus une province est riche, plus elle reçoit. » Il réclame la création d\'un système de transferts directs de l\'Etat vers les provinces pauvres, hors mécanisme de rétrocession. Son conseiller juridique lui indique qu\'un tel mécanisme existe déjà dans la Constitution.',
    questions: [
      { num: 1, enonce: 'Le Gouverneur a-t-il raison de critiquer le mécanisme de l\'Art. 175 de la Constitution comme étant inéquitable pour les provinces à faible activité économique ? Analysez sur la base du texte constitutionnel.', correction: 'L\'analyse du Gouverneur est juridiquement fondée sur un point : l\'Art. 175 al. 2 dispose que la part de 40% est « rétro cédée directement sur le lieu de leur perception. » Par définition, une province qui génère peu de recettes fiscales (peu d\'industries, peu de commerce) reçoit peu de rétrocessions. Ce mécanisme est donc structurellement favorable aux provinces riches (ex. Lualaba, Haut-Katanga avec les mines). La critique économique est légitime même si la règle est constitutionnelle et s\'applique de manière uniforme à toutes les provinces.' },
      { num: 2, enonce: 'Quel mécanisme constitutionnel le conseiller juridique a-t-il identifié ? Citez l\'article exact et expliquez son fonctionnement selon la Constitution.', correction: 'Le conseiller fait référence à la Caisse nationale de péréquation prévue à l\'Art. 181 de la Constitution : « Il est créé une Caisse nationale de péréquation. Elle a pour mission de financer des projets et des programmes d\'investissement en vue d\'assurer la solidarité nationale et de corriger le déséquilibre de développement entre les provinces et entre les territoires. » Cette caisse est alimentée par une dotation inscrite dans la loi de finances (en 2025 : 2 282 975 221 956 FC selon la LF 2025) et redistribuée selon des critères d\'équité territoriale, indépendamment du niveau de recettes de chaque province.' },
      { num: 3, enonce: 'La Province du Mai-Ndombe peut-elle exiger juridiquement une dotation de la Caisse nationale de péréquation ? Quelles conditions la loi impose-t-elle pour en bénéficier ?', correction: 'La Province du Mai-Ndombe ne peut pas exiger une dotation comme un droit automatique. L\'Art. 181 de la Constitution crée la Caisse mais renvoie à la loi le soin d\'en fixer les modalités de fonctionnement. La dotation est inscrite chaque année dans la loi de finances par le Parlement national. La répartition entre provinces est déterminée par décret, selon des critères objectifs (niveau de développement, population, superficie, indice de pauvreté). La province peut légitimement plaider sa cause au Parlement lors de l\'examen du PLF, mais ne dispose pas d\'un droit subjectif à une dotation prédéterminée.' },
    ],
    articleRef: 'Art. 175, 181 Constitution · Art. 3 pt. 24 LOFIP · LF 2025',
  },
]

// ============================================================
// COMPOSANTS
// ============================================================
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-emerald-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-border hover:border-emerald-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-emerald-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-emerald-700 transition-colors font-semibold">Vérifier</button>}
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

function CasPratiqueBlock({ cp }: { cp: CasPratiqueEtude }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">C{cp.id.replace('cp', '')}</span>
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
                  <button onClick={() => setCorrVisible(s => new Set([...s, q.num]))} className="text-xs text-emerald-600 hover:underline font-medium">Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// PAGE PRINCIPALE
// ============================================================
export default function UE5Chapitre1Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue5-finances-publiques')
  const currentUser = useUser()
  const isStudent = currentUser?.role === 'etudiant'

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
            { label: 'UE 5 — Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 1' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">Introduction aux finances publiques</h1>
          <InfoTooltip texte="Introduction aux finances publiques : définition LOFIP, composantes, cadre constitutionnel et actualité 2025." loi="Art. 1-3 LOFIP · Art. 122, 174, 175 Constitution" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 1-3 · Constitution Art. 122, 174, 175 · LFR n° 25/044 du 28 juin 2025</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '3h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Définir les finances publiques selon la LOFIP (Art. 1 et Art. 3 pt. 22) et les distinguer des finances privées</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Identifier les 3 composantes des finances de l'Etat : Pouvoir central, Provinces et ETD (Art. 2 et 3 LOFIP)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Situer le cadre constitutionnel : Art. 122 pt. 3 et 10, Art. 174, Art. 175 (règle des 40%), Art. 176</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Distinguer les rôles du Ministre du Budget (planification/contrôle) et du Ministre des Finances (trésorerie/recouvrement)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Analyser l'actualité budgétaire 2025 : LFR n° 25/044 du 28 juin 2025, budget 50 691,8 Mds FC</span></li>
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:border-emerald-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-emerald-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-emerald-600">Leçon {leconIdx + 1} / {LECONS.length}</span>
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
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-emerald-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-emerald-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
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
          <h2 className="text-sm font-display font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} exercices</h2>
          {ETUDES_DE_CAS.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue5-chapitre-1"
              chapitreNom="Chapitre 1 : Introduction aux finances publiques"
              questions={QCM_GLOBAL}
              coursId="ue5-finances-publiques"
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

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 1
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : LOFIP n° 11/011 du 13 juillet 2011 · Constitution RDC du 18 février 2006 · RGCP n° 13/050 du 06 novembre 2013 · LFR n° 25/044 du 28 juin 2025
      </p>
    </div>
  )
}
