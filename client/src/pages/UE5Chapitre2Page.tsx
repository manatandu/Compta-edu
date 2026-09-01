import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Scale, Calendar, FileText, Shield, Eye,
  ChevronRight
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
  // ─── LECON 1 : Vue d'ensemble des 6 principes ───────────────────────────────
  {
    id: 'l1',
    icone: <BookOpen className="h-5 w-5" />,
    titre: 'Les 6 principes budgétaires - vue d\'ensemble',
    badge: 'LOFIP Art. 4',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'article 4 de la LOFIP
          <InfoTooltip texte="L'article 4 de la LOFIP est l'article-clé qui énumère les 6 principes sur lesquels repose le Budget de l'Etat. Ces principes sont développés aux articles 5 à 11 de la même loi." loi="Art. 4 LOFIP" />
          {' '}pose que le Budget de l'Etat repose sur <strong>six principes fondamentaux</strong> qui encadrent l'ensemble du cycle budgétaire, de son élaboration à son exécution. Ces principes ne sont pas de simples règles techniques : ils constituent les garanties juridiques de la transparence, de la légalité et de la sincérité dans la gestion des deniers publics.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Art. 4 LOFIP - Les 6 principes</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { num: '1', principe: 'Annualité', art: 'Art. 5', resume: "L'exercice budgétaire couvre une année civile (1er jan. au 31 déc.)" },
              { num: '2', principe: 'Unité', art: 'Art. 6', resume: 'Toutes les recettes et dépenses figurent dans un document unique par entité' },
              { num: '3', principe: 'Universalité', art: 'Art. 7', resume: 'Produit brut : pas de compensation, pas d\'affectation préalable' },
              { num: '4', principe: 'Spécialité', art: 'Art. 8', resume: 'Crédits spécialisés par titre, programme et source de financement' },
              { num: '5', principe: 'Légalité', art: 'Art. 9-10', resume: 'Impôt uniquement par la loi ; dépense uniquement dans les formes légales' },
              { num: '6', principe: 'Sincérité', art: 'Art. 11', resume: 'Budget sincère, régulier, image fidèle de la situation financière' },
            ].map((p) => (
              <div key={p.num} className="flex items-start gap-3 rounded-lg bg-card border border-border p-3">
                <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">{p.num}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-xs">{p.principe}</span>
                    <span className="text-xs text-emerald-600 font-medium">{p.art}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.resume}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p>
          Ces six principes forment un système cohérent. L'<strong>annualité</strong> définit le cadre temporel ; l'<strong>unité</strong> et l'<strong>universalité</strong> imposent la globalité et la transparence ; la <strong>spécialité</strong> garantit l'affectation précise des crédits ; la <strong>légalité</strong> protège contre l'arbitraire ; la <strong>sincérité</strong> impose l'honnêteté dans les prévisions. Ensemble, ils traduisent le principe démocratique fondamental : c'est le Parlement - représentant du peuple - qui autorise les recettes et les dépenses de l'État.
        </p>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Fondement démocratique</p>
          <p className="text-xs text-emerald-800">Les principes budgétaires trouvent leur fondement ultime dans la <strong>Constitution du 18 février 2006</strong> : c'est l'Art. 122 pt. 3 qui habilite le Parlement à voter le budget, et c'est l'Art. 175 qui fixe la clé de répartition 60/40 entre Pouvoir central et Provinces. La LOFIP (Art. 4-11) traduit ces exigences constitutionnelles en règles budgétaires précises.</p>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 4 à 11 · Constitution RDC Art. 122 pt. 3</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l1q1',
        question: 'Combien de principes budgétaires la LOFIP énonce-t-elle à l\'article 4 ?',
        options: [
          { id: 'a', texte: '4' },
          { id: 'b', texte: '5' },
          { id: 'c', texte: '6' },
          { id: 'd', texte: '7' },
          { id: 'e', texte: '9' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 4 de la LOFIP énonce exactement 6 principes budgétaires : annualité (Art. 5), unité (Art. 6), universalité (Art. 7), spécialité (Art. 8), légalité (Art. 9-10) et sincérité (Art. 11).',
        articleRef: 'Art. 4 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l1q2',
        question: 'Quel est le fondement constitutionnel qui justifie l\'existence des principes budgétaires en RDC ?',
        options: [
          { id: 'a', texte: 'Art. 122 pt. 3 Constitution - le Parlement légifère sur les finances publiques' },
          { id: 'b', texte: 'Art. 175 Constitution - la règle des 40%' },
          { id: 'c', texte: 'Art. 174 Constitution - définition des finances publiques' },
          { id: 'd', texte: 'Art. 181 Constitution - la Caisse nationale de péréquation' },
          { id: 'e', texte: 'Art. 120 Constitution - les libertés fondamentales' },
        ],
        reponseCorrecte: 'a',
        explication: 'C\'est l\'Art. 122 pt. 3 de la Constitution qui habilite le Parlement à légiférer sur les finances publiques, créant ainsi le fondement démocratique de tous les principes budgétaires. C\'est sur cette base que la LOFIP a été adoptée.',
        articleRef: 'Art. 4 LOFIP · Art. 122 pt. 3 Constitution',
      },
    ],
  },

  // ─── LECON 2 : Annualité ────────────────────────────────────────────────────
  {
    id: 'l2',
    icone: <Calendar className="h-5 w-5" />,
    titre: 'Le principe d\'annualité',
    badge: 'LOFIP Art. 5',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Le <strong>principe d'annualité</strong>
          <InfoTooltip texte="Le principe d'annualité budgétaire signifie que le budget est voté pour une année et doit être exécuté dans ce délai. En RDC, l'exercice budgétaire court du 1er janvier au 31 décembre, conformément à l'Art. 5 de la LOFIP." loi="Art. 5 LOFIP" />
          {' '}est l'un des principes les plus anciens du droit budgétaire. Il impose que les autorisations budgétaires soient données pour une durée limitée à <strong>une année civile</strong>. L'article 5 de la LOFIP dispose que l'exercice budgétaire s'étend du <strong>1er janvier au 31 décembre</strong> de chaque année.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 5 LOFIP</p>
          <p className="italic text-foreground/80 text-xs">
            « L'exercice budgétaire s'étend sur une année civile allant du 1er janvier au 31 décembre. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">Signification et portée</h3>
        <p>
          L'annualité budgétaire remplit trois fonctions essentielles : (1) elle <strong>encadre le pouvoir exécutif</strong> en limitant sa liberté de dépenser à l'autorisation annuelle du Parlement ; (2) elle permet un <strong>contrôle démocratique régulier</strong> des finances de l'État par les représentants du peuple ; (3) elle garantit une <strong>adaptation annuelle</strong> du budget aux évolutions économiques et aux priorités politiques.
        </p>
        <p>
          Toutefois, la rigidité de l'annualité stricte peut entraver la bonne gestion des programmes pluriannuels (grands travaux, plans de développement). La LOFIP prévoit donc plusieurs <strong>aménagements et dérogations</strong> au principe.
        </p>

        <h3 className="font-bold text-foreground">La budgétisation pluriannuelle : le CBMT</h3>
        <p>
          L'article 5 de la LOFIP précise également que les crédits découlent d'une <strong>budgétisation pluriannuelle</strong> sur un horizon de <strong>3 années</strong> glissantes, matérialisée par le <strong>Cadre Budgétaire à Moyen Terme (CBMT)</strong>
          <InfoTooltip texte="Le CBMT (Cadre Budgétaire à Moyen Terme) est un instrument de programmation qui projette les ressources et dépenses publiques sur 3 exercices glissants. Il ne remplace pas le budget annuel mais l'encadre : le budget de l'année N s'inscrit dans les plafonds fixés par le CBMT N/N+1/N+2. Le Ministre du Budget en assure la préparation." loi="Art. 5 al. 2 LOFIP · Art. 43-45 LOFIP" />. Le CBMT constitue le cadre de référence pluriannuel dans lequel s'inscrit chaque budget annuel. Ainsi, le principe d'annualité ne supprime pas la vision à moyen terme : il la complète.
        </p>

        <h3 className="font-bold text-foreground">Dérogations légales au principe d'annualité</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Dérogation</th>
                <th className="text-left p-2 border border-border font-semibold">Mécanisme</th>
                <th className="text-left p-2 border border-border font-semibold">Base légale</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Crédits provisoires', 'Si le budget n\'est pas voté avant le 1er jan., le Gouvernement peut reconduire par douzièmes provisoires les crédits de l\'exercice précédent', 'Art. 87 al. 2 LOFIP'],
                ['Loi de finances rectificative (LFR)', 'Modification du budget initial en cours d\'exercice lorsque les hypothèses initiales changent significativement', 'Art. 76-87 LOFIP'],
                ['Reports de crédits', 'Les crédits d\'investissement non consommés peuvent être reportés sur l\'exercice suivant dans des conditions strictes', 'Art. 53 LOFIP'],
                ['Autorisations d\'engagement pluriannuelles', 'Pour les grands investissements, l\'engagement peut couvrir plusieurs exercices même si le paiement est annuel', 'Art. 43-44 LOFIP'],
              ].map(([d, m, b], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-emerald-700">{d}</td>
                  <td className="p-2 border border-border">{m}</td>
                  <td className="p-2 border border-border text-muted-foreground italic text-xs">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Actualité 2025 - LFR n° 25/044 : annualité en pratique</p>
          <p className="text-xs text-emerald-800">La <strong>Loi de finances rectificative n° 25/044 du 28 juin 2025</strong> est une illustration parfaite du principe d'annualité et de sa dérogation via la LFR. En cours d'exercice 2025, le Gouvernement a révisé les hypothèses macroéconomiques (PIB revu à 5,3%, taux de change à 2 859,2 FC/USD) et ajusté le budget de 51 553,5 à 50 691,8 milliards FC. Cette révision a nécessité une loi, votée par le Parlement, conformément au principe d'annualité qui exige que toute modification du budget soit autorisée par le législateur.</p>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 5, 43-44, 53, 76-87 · LFR n° 25/044 du 28 juin 2025</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l2q1',
        question: 'Le principe d\'annualité signifie que l\'exercice budgétaire va du :',
        options: [
          { id: 'a', texte: '1er juillet au 30 juin' },
          { id: 'b', texte: '1er janvier au 31 décembre' },
          { id: 'c', texte: '1er octobre au 30 septembre' },
          { id: 'd', texte: '1er mars au 28 février' },
          { id: 'e', texte: '1er avril au 31 mars' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 5 de la LOFIP dispose que « l\'exercice budgétaire s\'étend sur une année civile allant du 1er janvier au 31 décembre ». C\'est le principe d\'annualité budgétaire.',
        articleRef: 'Art. 5 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l2q2',
        question: 'Le Cadre Budgétaire à Moyen Terme (CBMT) est établi sur combien d\'années ?',
        options: [
          { id: 'a', texte: '1 an' },
          { id: 'b', texte: '2 ans' },
          { id: 'c', texte: '3 ans' },
          { id: 'd', texte: '5 ans' },
          { id: 'e', texte: '4 ans' },
        ],
        reponseCorrecte: 'c',
        explication: 'Le CBMT est établi sur un horizon de 3 années glissantes, conformément à l\'Art. 5 al. 2 de la LOFIP. Il encadre la budgétisation pluriannuelle sans remplacer l\'autorisation budgétaire annuelle du Parlement.',
        articleRef: 'Art. 5 al. 2 · Art. 43 LOFIP',
      },
    ],
  },

  // ─── LECON 3 : Unité et Universalité ────────────────────────────────────────
  {
    id: 'l3',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Les principes d\'unité et d\'universalité',
    badge: 'LOFIP Art. 6 et 7',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">1. Le principe d'unité (Art. 6)</h3>
        <p>
          Le <strong>principe d'unité</strong>
          <InfoTooltip texte="Le principe d'unité budgétaire impose que toutes les recettes et toutes les dépenses d'une entité soient regroupées dans un seul et même document budgétaire. L'objectif est de permettre au Parlement d'avoir une vision globale et cohérente de la situation financière de l'Etat." loi="Art. 6 LOFIP" />
          {' '}exige que toutes les ressources et toutes les charges d'une entité budgétaire soient regroupées dans <strong>un seul et même document budgétaire</strong>. Cette règle vise à donner au Parlement une vision d'ensemble des finances publiques et à éviter la dispersion des autorisations budgétaires.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 6 LOFIP - Principe d'unité</p>
          <p className="italic text-foreground/80 text-xs">
            « Le budget retrace l'ensemble des ressources et des charges budgétaires de l'État. »
          </p>
        </div>
        <p>La LOFIP traduit ce principe par une <strong>consolidation budgétaire en cascade</strong> :</p>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 space-y-2">
          {[
            { label: 'Niveau 1', contenu: 'Budget ETD (commune, secteur, chefferie) → intégré dans le budget de sa Province', couleur: 'text-emerald-600' },
            { label: 'Niveau 2', contenu: 'Budget provincial (y compris budgets ETD) → consolidé avec le budget du Pouvoir central', couleur: 'text-emerald-700' },
            { label: 'Niveau 3', contenu: 'Budget de l\'Etat = Budget Pouvoir central + Budgets provinciaux consolidés (Art. 174 Constitution)', couleur: 'text-emerald-800' },
          ].map((n, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className={cn('font-bold shrink-0', n.couleur)}>{n.label}</span>
              <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-muted-foreground" />
              <span>{n.contenu}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Dérogations au principe d'unité : <strong>budgets annexes</strong> (Art. 55-58) pour les services rendant des prestations contre redevances ; <strong>comptes spéciaux</strong> (Art. 59-73) pour des opérations à caractère particulier.</p>

        <h3 className="font-bold text-foreground mt-4">2. Le principe d'universalité (Art. 7)</h3>
        <p>
          Le <strong>principe d'universalité</strong>
          <InfoTooltip texte="Le principe d'universalité comprend deux règles : (1) la règle du produit brut - les recettes sont inscrites pour leur montant total, sans déduction des dépenses y afférentes ; (2) l'interdiction de l'affectation préalable - l'ensemble des recettes couvre l'ensemble des dépenses, sans que certaines recettes soient réservées à certaines dépenses." loi="Art. 7 LOFIP" />
          {' '}se décompose en deux règles fondamentales posées par l'Art. 7 de la LOFIP :
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Règle du produit brut</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Le montant intégral des recettes est inscrit au budget, sans déduction des dépenses y afférentes. Un service public ne peut pas déduire ses frais de fonctionnement de ses recettes avant de verser le solde au Trésor.</p>
            <div className="mt-2 rounded-lg bg-red-50 border border-red-200 p-2 text-xs text-red-700">
              Interdit : Service A perçoit 10 M FC de recettes, supporte 2 M FC de frais, verse seulement 8 M FC au Trésor.
            </div>
            <div className="mt-1 rounded-lg bg-green-50 border border-green-200 p-2 text-xs text-green-700">
              Correct : Service A verse 10 M FC au Trésor et ses 2 M FC de frais sont inscrits en dépenses budgétaires.
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Interdiction de la compensation et de l'affectation préalable</p>
            <p className="text-xs text-muted-foreground leading-relaxed">L'ensemble des recettes de l'État couvre l'ensemble des dépenses sans qu'une recette particulière soit réservée (affectée) à une dépense particulière. La <strong>compensation</strong>
              <InfoTooltip texte="La compensation consiste à opérer une soustraction entre une créance et une dette. Elle est strictement prohibée en matière de finances publiques : un contribuable ne peut pas déduire une dette de l'Etat envers lui de ses impôts à payer." loi="Art. 7 al. 2 LOFIP" />
              {' '}est strictement prohibée.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Dérogation à l'universalité</th>
                <th className="text-left p-2 border border-border font-semibold">Mécanisme</th>
                <th className="text-left p-2 border border-border font-semibold">Article LOFIP</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Budgets annexes', 'Services dotés d\'une comptabilité propre, recettes affectées aux dépenses du service', 'Art. 55-58'],
                ['Comptes spéciaux', 'Comptes d\'affectation spéciale pour opérations particulières', 'Art. 59-73'],
                ['Fonds de concours', 'Concours financiers de tiers pour une dépense déterminée de l\'Etat', 'Art. 74'],
                ['Attributions de produits', 'Recettes tirées d\'une prestation rendue affectées au service rendant la prestation', 'Art. 75'],
              ].map(([d, m, a], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-emerald-700">{d}</td>
                  <td className="p-2 border border-border">{m}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 6, 7, 55-75</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l3q1',
        question: 'Quel principe interdit la compensation entre recettes et dépenses en finances publiques ?',
        options: [
          { id: 'a', texte: 'Principe d\'unité (Art. 6)' },
          { id: 'b', texte: 'Principe d\'annualité (Art. 5)' },
          { id: 'c', texte: 'Principe d\'universalité (Art. 7)' },
          { id: 'd', texte: 'Principe de sincérité (Art. 11)' },
          { id: 'e', texte: 'Principe de spécialité (Art. 8)' },
        ],
        reponseCorrecte: 'c',
        explication: 'C\'est le principe d\'universalité (Art. 7 LOFIP) qui interdit la compensation et impose la règle du produit brut : les recettes sont inscrites pour leur montant total, et l\'ensemble des recettes couvre l\'ensemble des dépenses sans affectation préalable.',
        articleRef: 'Art. 7 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l3q2',
        question: 'Un budget annexe constitue une dérogation à quel(s) principe(s) budgétaire(s) ?',
        options: [
          { id: 'a', texte: 'Annualité uniquement' },
          { id: 'b', texte: 'Unité et Universalité' },
          { id: 'c', texte: 'Légalité uniquement' },
          { id: 'd', texte: 'Spécialité uniquement' },
          { id: 'e', texte: 'Sincérité et Annualité' },
        ],
        reponseCorrecte: 'b',
        explication: 'Le budget annexe déroge à la fois au principe d\'unité (il constitue un document budgétaire séparé du budget général) et au principe d\'universalité (il permet l\'affectation de recettes spécifiques aux dépenses du service). Base légale : Art. 55-58 LOFIP.',
        articleRef: 'Art. 6, 7, 55-58 LOFIP',
      },
    ],
  },

  // ─── LECON 4 : Spécialité ───────────────────────────────────────────────────
  {
    id: 'l4',
    icone: <Scale className="h-5 w-5" />,
    titre: 'Le principe de spécialité',
    badge: 'LOFIP Art. 8 et 43-50',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Le <strong>principe de spécialité</strong>
          <InfoTooltip texte="Le principe de spécialité impose que les crédits budgétaires soient précisément définis par destination (titre, programme) et par nature de dépense. Un crédit voté pour le personnel d'un ministère ne peut pas être utilisé pour financer des travaux d'investissement." loi="Art. 8 LOFIP" />
          {' '}est le principe qui donne aux autorisations budgétaires leur caractère précis et contraignant. L'article 8 de la LOFIP dispose que les crédits sont spécialisés par <strong>grande nature de dépenses (titres)</strong> et par <strong>source de financement</strong>, regroupés par programme au sein de chaque mission.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 8 LOFIP - Principe de spécialité</p>
          <p className="italic text-foreground/80 text-xs">
            « Les crédits sont spécialisés par grande nature de dépenses. Ils sont regroupés par programme. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">La nomenclature budgétaire : les 5 titres de dépenses</h3>
        <p>La LOFIP organise les dépenses en <strong>5 titres</strong> qui constituent la colonne vertébrale de la nomenclature budgétaire :</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left p-2 border border-emerald-200 font-semibold text-emerald-700">Titre</th>
                <th className="text-left p-2 border border-emerald-200 font-semibold text-emerald-700">Nature de la dépense</th>
                <th className="text-left p-2 border border-emerald-200 font-semibold text-emerald-700">Exemples concrets</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Titre 1', 'Dépenses de personnel', 'Salaires, primes, allocations des fonctionnaires et agents de l\'Etat'],
                ['Titre 2', 'Dépenses de fonctionnement', 'Carburant, fournitures de bureau, frais de mission, loyers des bâtiments administratifs'],
                ['Titre 3', 'Dépenses d\'intervention', 'Subventions aux entreprises publiques (SNEL, REGIDESO), transferts aux provinces, bourses d\'études'],
                ['Titre 4', 'Dépenses d\'investissement', 'Construction de routes, écoles, hôpitaux ; acquisition d\'équipements lourds'],
                ['Titre 5', 'Dépenses financières (service de la dette)', 'Remboursement du capital emprunté, paiement des intérêts de la dette intérieure et extérieure'],
              ].map(([t, n, e], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-bold text-emerald-700">{t}</td>
                  <td className="p-2 border border-border font-medium">{n}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-foreground">La fongibilité asymétrique des crédits (Art. 45)</h3>
        <p>
          La <strong>fongibilité asymétrique</strong>
          <InfoTooltip texte="La fongibilité asymétrique signifie que les gestionnaires de programme peuvent librement déplacer des crédits entre titres, SAUF vers le Titre 1 (personnel). Cette règle protège la masse salariale publique : on ne peut pas augmenter les effectifs ou les salaires en utilisant des crédits prévus pour autre chose. L'inverse (prendre sur le personnel pour financer autre chose) est en revanche possible." loi="Art. 45 LOFIP" />
          {' '}est une dérogation encadrée au principe de spécialité. Elle permet aux gestionnaires de programme une certaine souplesse dans l'utilisation des crédits, avec une restriction fondamentale :
        </p>
        <div className="grid grid-cols-1 gap-2">
          <div className="rounded-lg bg-green-50 border border-green-200 p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">Autorisé - fongibilité vers les autres titres</p>
            <p className="text-xs text-green-800">Des crédits du Titre 1 (personnel) peuvent être redéployés vers les Titres 2, 3, 4 ou 5 si le gestionnaire estime que les postes prévus n'ont pas tous été pourvus.</p>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">Interdit - fongibilité vers le Titre 1 (personnel)</p>
            <p className="text-xs text-red-800">Il est formellement interdit de prélever sur les crédits des Titres 2, 3, 4 ou 5 pour abonder le Titre 1 (personnel). Cette règle protège le budget de l'Etat contre une dérive des dépenses salariales non programmées.</p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-2">Virements et transferts de crédits (Art. 46-50)</h3>
        <p>
          En dehors de la fongibilité asymétrique, la LOFIP prévoit deux mécanismes de modification des crédits en cours d'exécution :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Virement de crédits (Art. 46-48)</strong> : déplacement de crédits au sein d'un même programme, entre titres différents ; autorisé par arrêté du Ministre du Budget dans des plafonds fixés par la loi de finances</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Transfert de crédits (Art. 49-50)</strong> : déplacement de crédits entre programmes différents pour faire face à des besoins imprévus ou à une réorganisation ; doit être autorisé par décret du Premier Ministre</span>
          </li>
        </ul>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 8, 43-50</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l4q1',
        question: 'Un ministre souhaite utiliser des crédits de fonctionnement (Titre 2) pour payer des salaires supplémentaires (Titre 1). Selon la fongibilité asymétrique (Art. 45 LOFIP), cela est :',
        options: [
          { id: 'a', texte: 'Autorisé librement par le gestionnaire' },
          { id: 'b', texte: 'Autorisé avec un arrêté du Ministre du Budget' },
          { id: 'c', texte: 'Interdit - le Titre 1 ne peut recevoir de virements depuis les autres titres' },
          { id: 'd', texte: 'Autorisé si validé par le Parlement' },
          { id: 'e', texte: 'Autorisé uniquement en cas de force majeure déclarée' },
        ],
        reponseCorrecte: 'c',
        explication: 'La fongibilité asymétrique (Art. 45 LOFIP) est dite asymétrique précisément parce que les transferts vers le Titre 1 (personnel) sont formellement interdits. L\'inverse est possible : des crédits du Titre 1 peuvent être redéployés vers d\'autres titres si les postes prévus ne sont pas pourvus.',
        articleRef: 'Art. 45 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l4q2',
        question: 'Les dépenses d\'investissement (construction de routes, acquisition d\'équipements) correspondent à quel titre de la nomenclature budgétaire ?',
        options: [
          { id: 'a', texte: 'Titre 2 - fonctionnement' },
          { id: 'b', texte: 'Titre 3 - intervention' },
          { id: 'c', texte: 'Titre 4 - investissement' },
          { id: 'd', texte: 'Titre 5 - service de la dette' },
          { id: 'e', texte: 'Titre 1 - personnel' },
        ],
        reponseCorrecte: 'c',
        explication: 'Le Titre 4 de la nomenclature budgétaire LOFIP regroupe les dépenses d\'investissement : construction d\'infrastructures (routes, écoles, hôpitaux), acquisition d\'équipements lourds, et investissements publics en général.',
        articleRef: 'Art. 8 LOFIP',
      },
    ],
  },

  // ─── LECON 5 : Légalité ─────────────────────────────────────────────────────
  {
    id: 'l5',
    icone: <Shield className="h-5 w-5" />,
    titre: 'Le principe de légalité',
    badge: 'LOFIP Art. 9 et 10',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Le <strong>principe de légalité</strong>
          <InfoTooltip texte="Le principe de légalité budgétaire est double : légalité des recettes (seul le Parlement peut créer des impôts - Art. 9) et légalité des dépenses (toute dépense doit être effectuée dans des conditions définies par la loi - Art. 10). Il protège les citoyens contre l'arbitraire fiscal et financier de l'exécutif." loi="Art. 9-10 LOFIP" />
          {' '}est la traduction budgétaire du principe constitutionnel de l'État de droit. En finances publiques, il se décline en deux volets : la légalité des recettes et la légalité des dépenses.
        </p>

        <h3 className="font-bold text-foreground">1. Légalité des recettes (Art. 9)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 9 al. 1 LOFIP</p>
          <p className="italic text-foreground/80 text-xs">
            « Il ne peut être établi d'impôts qu'en vertu de la loi. »
          </p>
        </div>
        <p>
          Ce principe, issu du droit constitutionnel (Art. 122 pt. 10 Constitution), est d'une portée considérable. Il signifie que :
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span><strong>Seul le Parlement national peut créer des impôts</strong>, fixer leurs taux et définir leurs modalités de recouvrement</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span>Les <strong>Assemblées provinciales</strong>
              <InfoTooltip texte="Les Assemblées provinciales sont les organes législatifs des provinces. Elles peuvent voter des lois provinciales mais ne peuvent PAS créer d'impôts ni de taxes. Elles peuvent uniquement percevoir des taxes dont la liste et le taux maximum sont fixés par la loi nationale." loi="Art. 9 LOFIP · Art. 122 pt. 10 Constitution" />
              {' '}et les organes des ETD <strong>ne peuvent ni créer ni supprimer des impôts</strong> - seule la loi nationale le peut
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" />
            <span>Tout prélèvement effectué sur la base d'une décision non législative est illégal et doit être restitué au contribuable</span>
          </li>
        </ul>

        <h3 className="font-bold text-foreground mt-2">2. Légalité des dépenses (Art. 10)</h3>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 10 LOFIP - Conditions de légalité des dépenses</p>
          <p className="italic text-foreground/80 text-xs">
            « Aucune dépense ne peut être engagée, liquidée et ordonnancée si elle ne remplit pas les conditions suivantes : être de la compétence de l'ordonnateur ; être fondée sur un texte régulier ; avoir des crédits disponibles ; être accompagnée de la mobilisation des fonds extérieurs le cas échéant. »
          </p>
        </div>
        <p>L'Art. 10 pose ainsi <strong>4 conditions cumulatives</strong> pour qu'une dépense publique soit légale :</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { num: '1', cond: 'Compétence de l\'ordonnateur', expl: 'Seul l\'ordonnateur habilité peut engager la dépense (principe de séparation ordonnateur/comptable)' },
            { num: '2', cond: 'Texte régulier', expl: 'La dépense doit être fondée sur un texte légal ou réglementaire valide (loi de finances, décret, arrêté)' },
            { num: '3', cond: 'Crédits disponibles', expl: 'Des crédits suffisants doivent avoir été votés et ne pas être épuisés dans le chapitre budgétaire concerné' },
            { num: '4', cond: 'Mobilisation des fonds extérieurs', expl: 'Pour les dépenses financées sur ressources extérieures, les fonds doivent avoir été mobilisés auprès des bailleurs' },
          ].map((c) => (
            <div key={c.num} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">{c.num}</span>
              <div>
                <p className="text-xs font-semibold text-foreground">{c.cond}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.expl}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Sanction de l'illégalité budgétaire</p>
          <p className="text-xs text-emerald-800">Une dépense effectuée sans respecter ces 4 conditions engage la <strong>responsabilité personnelle et pécuniaire</strong> du comptable public ou de l'ordonnateur. La Cour des comptes peut constater l'irrégularité et exiger remboursement. Les ordonnateurs peuvent être condamnés à reverser les sommes irrégulièrement engagées.</p>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 9-10 · Constitution Art. 122 pt. 10 · Art. 178-180 Constitution (Cour des comptes)</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l5q1',
        question: 'Selon le principe de légalité (Art. 9 LOFIP), qui peut créer des impôts en RDC ?',
        options: [
          { id: 'a', texte: 'Le Gouverneur de province par arrêté' },
          { id: 'b', texte: 'L\'Assemblée provinciale par délibération' },
          { id: 'c', texte: 'Le Parlement national par la loi uniquement' },
          { id: 'd', texte: 'Le Ministre des Finances par décret' },
          { id: 'e', texte: 'Le Premier Ministre par ordonnance' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 9 al. 1 de la LOFIP dispose : « il ne peut être établi d\'impôts qu\'en vertu de la loi ». Cette règle, issue de l\'Art. 122 pt. 10 de la Constitution, réserve exclusivement au Parlement national le pouvoir de créer des impôts, d\'en fixer les taux et les modalités de recouvrement.',
        articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 Constitution',
      },
      {
        type: 'qcm',
        id: 'l5q2',
        question: 'Selon le principe de légalité des dépenses (Art. 10 LOFIP), une dépense ne peut être exécutée si :',
        options: [
          { id: 'a', texte: 'Elle dépasse 1 milliard FC' },
          { id: 'b', texte: 'Elle n\'a pas été approuvée par le Parlement pour son montant exact' },
          { id: 'c', texte: 'Les crédits nécessaires ne sont pas disponibles au budget' },
          { id: 'd', texte: 'Elle concerne un investissement dans le secteur privé' },
          { id: 'e', texte: 'Elle n\'a pas fait l\'objet d\'un avis de la Cour des comptes' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 10 LOFIP exige 4 conditions cumulatives dont la disponibilité des crédits budgétaires. Une dépense sans crédits disponibles est illégale même si elle est urgente et justifiée. Le gestionnaire doit d\'abord obtenir une modification budgétaire (virement, LFR) avant d\'engager la dépense.',
        articleRef: 'Art. 10 LOFIP',
      },
    ],
  },

  // ─── LECON 6 : Sincérité + récapitulatif ────────────────────────────────────
  {
    id: 'l6',
    icone: <Eye className="h-5 w-5" />,
    titre: 'Le principe de sincérité et synthèse comparative',
    badge: 'LOFIP Art. 11',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">Le principe de sincérité (Art. 11)</h3>
        <p>
          Le <strong>principe de sincérité</strong>
          <InfoTooltip texte="Le principe de sincérité budgétaire est le plus récent des 6 principes. Il a été introduit dans les finances publiques modernes pour exiger que les prévisions budgétaires soient établies de bonne foi, sans sous-estimation des dépenses ou surestimation des recettes dans un but politique. Il est consacré à l'Art. 11 de la LOFIP." loi="Art. 11 LOFIP" />
          {' '}est le principe le plus récent, inspiré des réformes modernes de la gestion publique. L'article 11 de la LOFIP dispose que le budget doit présenter de façon <strong>sincère l'ensemble des ressources et des charges</strong> de l'État.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 11 LOFIP - Principe de sincérité</p>
          <p className="italic text-foreground/80 text-xs">
            « Le budget est présenté de façon sincère. La sincérité s'apprécie compte tenu des informations disponibles et des prévisions qui peuvent raisonnablement en découler. Les comptes doivent être réguliers, sincères et refléter une image fidèle du patrimoine et de la situation financière de l'État. »
          </p>
        </div>

        <h3 className="font-bold text-foreground">Trois dimensions de la sincérité</h3>
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              titre: 'Sincérité des prévisions',
              contenu: 'Les hypothèses macroéconomiques (croissance du PIB, taux d\'inflation, taux de change) qui fondent les prévisions de recettes et de dépenses doivent être établies de bonne foi, sans optimisme excessif ou sous-estimation délibérée.',
              color: 'border-emerald-200 bg-emerald-50/40',
            },
            {
              titre: 'Sincérité des comptes',
              contenu: 'Les comptes de l\'Etat doivent être réguliers (conformes aux règles), sincères (refléter la réalité) et offrir une image fidèle du patrimoine et de la situation financière. Cette exigence se rapproche du concept SYSCOHADA.',
              color: 'border-emerald-200 bg-emerald-50/40',
            },
            {
              titre: 'Annexe financière obligatoire',
              contenu: 'Tout projet de loi ayant une incidence financière doit être accompagné d\'une annexe précisant ses conséquences budgétaires sur l\'exercice en cours et les suivants. Cette obligation permet au Parlement d\'évaluer pleinement l\'impact de chaque loi.',
              color: 'border-emerald-200 bg-emerald-50/40',
            },
          ].map((d, i) => (
            <div key={i} className={cn('rounded-xl border p-3', d.color)}>
              <p className="text-xs font-semibold text-emerald-700 mb-1">{d.titre}</p>
              <p className="text-xs text-foreground/80">{d.contenu}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-1">Actualité 2025-2026 - La sincérité comme exigence du Ministère du Budget</p>
          <p className="text-xs text-emerald-800">Lors de l'ouverture des <strong>conférences budgétaires pour l'exercice 2026</strong> (28 juillet 2025), le Ministère du Budget a explicitement exigé une <strong>«préfiguration budgétaire 2026 réaliste et sincère»</strong>. Cette formulation reprend mot pour mot le principe de l'Art. 11 de la LOFIP, illustrant son application concrète dans le processus de préparation du budget 2026. Par ailleurs, la révision à la baisse du budget 2025 via la LFR n° 25/044 (de 51 553,5 à 50 691,8 Mds FC) démontre une correction sincère des prévisions initiales jugées trop optimistes.</p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Tableau comparatif - Les 6 principes en synthèse</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-50">
                <th className="text-left p-2 border border-emerald-200 font-semibold">Principe</th>
                <th className="text-left p-2 border border-emerald-200 font-semibold">Article</th>
                <th className="text-left p-2 border border-emerald-200 font-semibold">Règle fondamentale</th>
                <th className="text-left p-2 border border-emerald-200 font-semibold">Dérogation principale</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Annualité', 'Art. 5', '1er jan. au 31 déc.', 'LFR, reports, crédits provisoires'],
                ['Unité', 'Art. 6', 'Document unique par entité', 'Budgets annexes, comptes spéciaux'],
                ['Universalité', 'Art. 7', 'Produit brut, pas de compensation', 'Comptes spéciaux, fonds de concours'],
                ['Spécialité', 'Art. 8', 'Crédits par titre et programme', 'Fongibilité asymétrique, virements, transferts'],
                ['Légalité', 'Art. 9-10', 'Impôt par la loi ; dépense dans les formes', 'Habilitation limitée aux provinces pour certaines taxes'],
                ['Sincérité', 'Art. 11', 'Image fidèle, prévisions réalistes', 'Aucune - principe absolu'],
              ].map(([p, a, r, d], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-emerald-700">{p}</td>
                  <td className="p-2 border border-border text-xs font-medium">{a}</td>
                  <td className="p-2 border border-border">{r}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground italic">Source : LOFIP Art. 4 à 11 · Discours ouverture conférences budgétaires 2026, Ministère du Budget RDC, 28 juillet 2025</p>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l6q1',
        question: 'Selon le principe de sincérité (Art. 11 LOFIP), tout projet de loi ayant une incidence financière doit être accompagné :',
        options: [
          { id: 'a', texte: 'D\'un avis de la Cour des comptes' },
          { id: 'b', texte: 'D\'une déclaration du Ministre des Finances' },
          { id: 'c', texte: 'D\'une annexe précisant ses conséquences budgétaires sur l\'exercice en cours et les suivants' },
          { id: 'd', texte: 'D\'un rapport de la Banque centrale du Congo' },
          { id: 'e', texte: 'D\'un accord préalable du Premier Ministre' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 11 de la LOFIP impose que tout projet de loi ayant une incidence financière soit accompagné d\'une annexe précisant ses conséquences budgétaires. Cela permet au Parlement d\'évaluer le coût de chaque loi et de voter en toute connaissance de cause.',
        articleRef: 'Art. 11 LOFIP',
      },
      {
        type: 'qcm',
        id: 'l6q2',
        question: 'Un étudiant affirme que le principe d\'universalité exige que chaque service garde ses propres recettes pour financer ses propres dépenses. Cette affirmation est :',
        options: [
          { id: 'a', texte: 'Exacte' },
          { id: 'b', texte: 'Exacte uniquement pour les ETD' },
          { id: 'c', texte: 'Fausse - c\'est précisément l\'inverse que ce principe impose' },
          { id: 'd', texte: 'Exacte pour les budgets annexes seulement' },
          { id: 'e', texte: 'Exacte uniquement pour les comptes spéciaux' },
        ],
        reponseCorrecte: 'c',
        explication: 'C\'est l\'exact contraire. Le principe d\'universalité (Art. 7 LOFIP) interdit l\'affectation préalable : aucune recette ne peut être réservée à une dépense particulière. L\'ensemble des recettes de l\'Etat couvre l\'ensemble des dépenses. C\'est l\'exception (budgets annexes, comptes spéciaux) qui permet l\'affectation.',
        articleRef: 'Art. 7 LOFIP',
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
    question: 'Combien de principes budgétaires la LOFIP énonce-t-elle à l\'article 4 ?',
    options: [{ id: 'a', texte: '4' }, { id: 'b', texte: '5' }, { id: 'c', texte: '6' }, { id: 'd', texte: '7' }, { id: 'e', texte: '8' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 4 de la LOFIP énonce 6 principes : annualité (Art. 5), unité (Art. 6), universalité (Art. 7), spécialité (Art. 8), légalité (Art. 9-10) et sincérité (Art. 11).',
    articleRef: 'Art. 4 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q2',
    question: 'Le principe d\'annualité (Art. 5 LOFIP) signifie que l\'exercice budgétaire va du :',
    options: [{ id: 'a', texte: '1er juillet au 30 juin' }, { id: 'b', texte: '1er janvier au 31 décembre' }, { id: 'c', texte: '1er octobre au 30 septembre' }, { id: 'd', texte: '1er mars au 28 février' }, { id: 'e', texte: '15 janvier au 15 janvier suivant' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 5 de la LOFIP dispose que l\'exercice budgétaire s\'étend sur une année civile allant du 1er janvier au 31 décembre.',
    articleRef: 'Art. 5 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q3',
    question: 'Quel principe interdit la compensation entre recettes et dépenses ?',
    options: [{ id: 'a', texte: 'Principe d\'unité' }, { id: 'b', texte: 'Principe d\'annualité' }, { id: 'c', texte: 'Principe d\'universalité' }, { id: 'd', texte: 'Principe de sincérité' }, { id: 'e', texte: 'Principe de légalité' }],
    reponseCorrecte: 'c',
    explication: 'Le principe d\'universalité (Art. 7 LOFIP) interdit la compensation et impose la règle du produit brut : les recettes sont inscrites pour leur montant intégral, sans compensation avec les dépenses.',
    articleRef: 'Art. 7 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q4',
    question: 'Selon le principe de légalité (Art. 9 LOFIP), qui peut créer des impôts en RDC ?',
    options: [{ id: 'a', texte: 'Le Gouverneur de province' }, { id: 'b', texte: 'L\'Assemblée provinciale' }, { id: 'c', texte: 'Le Parlement national (par la loi)' }, { id: 'd', texte: 'Le Ministre des Finances' }, { id: 'e', texte: 'Le Premier Ministre par ordonnance' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 9 al. 1 LOFIP : « Il ne peut être établi d\'impôts qu\'en vertu de la loi. » Seul le Parlement national peut créer des impôts. Les Assemblées provinciales et les ETD en sont exclues.',
    articleRef: 'Art. 9 LOFIP · Art. 122 pt. 10 Constitution',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q5',
    question: 'Les crédits regroupés par programme et par titre correspondent à quel principe budgétaire ?',
    options: [{ id: 'a', texte: 'Principe d\'unité' }, { id: 'b', texte: 'Principe de spécialité' }, { id: 'c', texte: 'Principe de sincérité' }, { id: 'd', texte: 'Principe d\'universalité' }, { id: 'e', texte: 'Principe de légalité' }],
    reponseCorrecte: 'b',
    explication: 'Le principe de spécialité (Art. 8 LOFIP) impose que les crédits soient spécialisés par grande nature de dépenses (titres) et regroupés par programme. Chaque crédit a une destination précise.',
    articleRef: 'Art. 8 LOFIP',
    difficulte: 'facile',
  },
  {
    type: 'qcm',
    id: 'q6',
    question: 'La fongibilité des crédits est qualifiée d\'asymétrique car :',
    options: [
      { id: 'a', texte: 'Elle s\'applique seulement aux dépenses d\'investissement' },
      { id: 'b', texte: 'Les crédits du Titre 1 (personnel) peuvent aller vers d\'autres titres, mais l\'inverse est interdit' },
      { id: 'c', texte: 'Elle ne concerne que les budgets annexes' },
      { id: 'd', texte: 'Elle requiert l\'accord préalable du Parlement' },
      { id: 'e', texte: 'Elle permet de transférer des crédits entre deux exercices budgétaires' },
    ],
    reponseCorrecte: 'b',
    explication: 'La fongibilité asymétrique (Art. 45 LOFIP) autorise le redéploiement des crédits de personnel (Titre 1) vers les autres titres, mais interdit tout virement depuis les autres titres vers le Titre 1 (personnel). Cette asymétrie protège la masse salariale programmée.',
    articleRef: 'Art. 45 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q7',
    question: 'Un budget annexe constitue une dérogation à quel(s) principe(s) budgétaire(s) ?',
    options: [{ id: 'a', texte: 'Annualité uniquement' }, { id: 'b', texte: 'Unité et Universalité' }, { id: 'c', texte: 'Légalité uniquement' }, { id: 'd', texte: 'Spécialité uniquement' }, { id: 'e', texte: 'Sincérité uniquement' }],
    reponseCorrecte: 'b',
    explication: 'Le budget annexe déroge simultanément au principe d\'unité (document budgétaire séparé du budget général) et au principe d\'universalité (affectation de recettes spécifiques aux dépenses du service). Base légale : Art. 55-58 LOFIP.',
    articleRef: 'Art. 6, 7, 55-58 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q8',
    question: 'Quel article de la LOFIP définit le principe de sincérité ?',
    options: [{ id: 'a', texte: 'Art. 7' }, { id: 'b', texte: 'Art. 9' }, { id: 'c', texte: 'Art. 10' }, { id: 'd', texte: 'Art. 11' }, { id: 'e', texte: 'Art. 4' }],
    reponseCorrecte: 'd',
    explication: 'L\'Art. 11 de la LOFIP définit le principe de sincérité : le budget doit présenter de façon sincère l\'ensemble des ressources et des charges, les comptes doivent être réguliers, sincères et refléter une image fidèle.',
    articleRef: 'Art. 11 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q9',
    question: 'Selon le principe de légalité des dépenses (Art. 10 LOFIP), une dépense ne peut être exécutée si :',
    options: [
      { id: 'a', texte: 'Elle dépasse 1 milliard FC' },
      { id: 'b', texte: 'Elle n\'a pas été approuvée individuellement par le Parlement' },
      { id: 'c', texte: 'Les crédits nécessaires ne sont pas disponibles au budget' },
      { id: 'd', texte: 'Elle concerne un investissement privé' },
      { id: 'e', texte: 'Elle n\'a pas été validée par la Banque centrale du Congo' },
    ],
    reponseCorrecte: 'c',
    explication: 'Parmi les 4 conditions cumulatives de l\'Art. 10 LOFIP, l\'absence de crédits disponibles est la cause la plus fréquente d\'irrégularité. Le gestionnaire doit s\'assurer que les crédits sont disponibles AVANT d\'engager toute dépense.',
    articleRef: 'Art. 10 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q10',
    question: 'Un ministre souhaite utiliser des crédits de fonctionnement (Titre 2) pour payer des salaires (Titre 1). Selon la fongibilité asymétrique (Art. 45 LOFIP), cela est :',
    options: [
      { id: 'a', texte: 'Autorisé librement' },
      { id: 'b', texte: 'Autorisé avec arrêté du Ministre du Budget' },
      { id: 'c', texte: 'Interdit - le Titre 1 ne peut recevoir de virements depuis d\'autres titres' },
      { id: 'd', texte: 'Autorisé si validé par le Parlement' },
      { id: 'e', texte: 'Autorisé en cas de déficience budgétaire prouvée' },
    ],
    reponseCorrecte: 'c',
    explication: 'La fongibilité est dite asymétrique précisément parce que les transferts VERS le Titre 1 (personnel) sont interdits. L\'inverse est possible : les crédits de personnel non consommés peuvent être redéployés vers d\'autres titres. Art. 45 LOFIP.',
    articleRef: 'Art. 45 LOFIP',
    difficulte: 'moyen',
  },
  {
    type: 'qcm',
    id: 'q11',
    question: 'Le Cadre Budgétaire à Moyen Terme (CBMT) est établi sur combien d\'années ?',
    options: [{ id: 'a', texte: '1 an' }, { id: 'b', texte: '2 ans' }, { id: 'c', texte: '3 ans' }, { id: 'd', texte: '5 ans' }, { id: 'e', texte: '4 ans' }],
    reponseCorrecte: 'c',
    explication: 'Le CBMT est établi sur un horizon de 3 années glissantes, conformément à l\'Art. 5 al. 2 de la LOFIP. Il constitue le cadre de référence pluriannuel dans lequel s\'inscrit chaque budget annuel, sans remplacer l\'autorisation annuelle du Parlement.',
    articleRef: 'Art. 5 al. 2 · Art. 43 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q12',
    question: 'Quelle est la dérogation principale au principe d\'annualité prévue par la LOFIP pour les grands investissements publics ?',
    options: [
      { id: 'a', texte: 'La fongibilité des crédits (Art. 45)' },
      { id: 'b', texte: 'Les autorisations d\'engagement pluriannuelles (Art. 43-44)' },
      { id: 'c', texte: 'Les comptes spéciaux (Art. 59-73)' },
      { id: 'd', texte: 'Les fonds de concours (Art. 74)' },
      { id: 'e', texte: 'Les transferts de crédits entre ministères (Art. 49-50)' },
    ],
    reponseCorrecte: 'b',
    explication: 'Pour les grands investissements dont la réalisation s\'étend sur plusieurs exercices, la LOFIP prévoit les autorisations d\'engagement pluriannuelles (Art. 43-44) : l\'engagement couvre plusieurs exercices, mais les paiements interviennent exercice par exercice dans les crédits de paiement annuels.',
    articleRef: 'Art. 43-44 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q13',
    question: 'Un étudiant affirme que le principe d\'universalité exige que chaque service garde ses propres recettes pour financer ses propres dépenses. Cette affirmation est :',
    options: [
      { id: 'a', texte: 'Exacte' },
      { id: 'b', texte: 'Exacte uniquement pour les ETD' },
      { id: 'c', texte: 'Fausse - c\'est précisément l\'inverse que ce principe impose' },
      { id: 'd', texte: 'Exacte pour les budgets annexes seulement' },
      { id: 'e', texte: 'Exacte uniquement pour les comptes spéciaux du Trésor' },
    ],
    reponseCorrecte: 'c',
    explication: 'Le principe d\'universalité (Art. 7 LOFIP) interdit précisément l\'affectation préalable des recettes à des dépenses déterminées. L\'ensemble des recettes couvre l\'ensemble des dépenses sans réservation. Ce que décrit l\'étudiant est l\'exception (budgets annexes), pas la règle.',
    articleRef: 'Art. 7 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q14',
    question: 'Selon le principe de sincérité (Art. 11 LOFIP), tout projet de loi ayant une incidence financière doit être accompagné :',
    options: [
      { id: 'a', texte: 'D\'un avis de la Cour des comptes' },
      { id: 'b', texte: 'D\'une déclaration du Ministre des Finances' },
      { id: 'c', texte: 'D\'une annexe précisant ses conséquences budgétaires sur l\'exercice en cours et les suivants' },
      { id: 'd', texte: 'D\'un rapport de la Banque centrale du Congo' },
      { id: 'e', texte: 'D\'une autorisation du Conseil économique et social' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 11 de la LOFIP prévoit expressément que tout projet de loi ayant une incidence financière doit être accompagné d\'une annexe précisant ses conséquences budgétaires. Cette annexe permet au Parlement d\'évaluer le coût de chaque réforme législative.',
    articleRef: 'Art. 11 LOFIP',
    difficulte: 'difficile',
  },
  {
    type: 'qcm',
    id: 'q15',
    question: 'L\'engagement des dépenses autres que de personnel doit intervenir avant quelle date limite selon l\'Art. 92 LOFIP ?',
    options: [{ id: 'a', texte: '30 septembre' }, { id: 'b', texte: '31 octobre' }, { id: 'c', texte: '30 novembre' }, { id: 'd', texte: '31 décembre' }, { id: 'e', texte: '15 octobre' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 92 de la LOFIP fixe au 31 octobre la date limite pour l\'engagement des dépenses autres que de personnel. Cette règle, liée au principe d\'annualité, impose une discipline dans l\'exécution des crédits pour permettre la liquidation et le paiement avant la fin de l\'exercice.',
    articleRef: 'Art. 92 LOFIP',
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
    titre: 'Le Ministère de la Santé face à l\'épidémie de fin d\'année',
    contexte: 'En novembre 2025, une épidémie de choléra éclate dans 3 provinces. Le Ministère de la Santé a épuisé ses crédits de fonctionnement (Titre 2) alloués pour l\'exercice. Il lui reste des crédits de personnel (Titre 1) non consommés (plusieurs postes non pourvus). Le Ministre de la Santé envisage : (Option A) de prélever 500 millions FC sur le Titre 1 pour financer l\'achat de médicaments ; (Option B) de dépasser les crédits disponibles en engageant des achats d\'urgence ; (Option C) de saisir le Ministre du Budget pour un virement de crédits. Le directeur financier vous consulte.',
    questions: [
      {
        num: 1,
        enonce: 'L\'Option A (prélever sur le Titre 1 pour financer l\'achat de médicaments - Titre 2) est-elle légale selon la LOFIP ? Justifiez en citant l\'article applicable.',
        correction: 'L\'Option A est LÉGALE. La fongibilité asymétrique prévue à l\'Art. 45 de la LOFIP autorise précisément le redéploiement de crédits du Titre 1 (personnel) vers les autres titres, dont le Titre 2 (fonctionnement). Si des postes de personnel n\'ont pas été pourvus et que les crédits correspondants sont disponibles, ils peuvent être redéployés vers les achats de médicaments. La procédure requiert cependant un arrêté du Ministre du Budget dans les plafonds fixés par la loi de finances.',
      },
      {
        num: 2,
        enonce: 'L\'Option B (dépasser les crédits disponibles pour l\'achat d\'urgence) est-elle légale selon l\'Art. 10 de la LOFIP ? Quelles seraient les conséquences pour l\'ordonnateur ?',
        correction: 'L\'Option B est ILLÉGALE. L\'Art. 10 de la LOFIP pose comme condition sine qua non à l\'exécution de toute dépense la disponibilité des crédits budgétaires. Même en situation d\'urgence, l\'absence de crédits disponibles rend la dépense irrégulière. L\'ordonnateur qui engagerait une telle dépense s\'exposerait à : (1) une mise en cause de sa responsabilité personnelle et pécuniaire ; (2) un rejet du paiement par le comptable public (qui ne peut payer que dans la limite des crédits ouverts) ; (3) une sanction par la Cour des comptes. La seule voie légale est de solliciter des crédits supplémentaires (LFR) ou un virement de crédits.',
      },
      {
        num: 3,
        enonce: 'L\'Option C (saisir le Ministre du Budget pour un virement de crédits) est-elle la bonne procédure ? Distinguez virement et transfert de crédits selon les Art. 46-50 LOFIP.',
        correction: 'L\'Option C est la procédure légale correcte dans ce cas. Un virement de crédits (Art. 46-48 LOFIP) permet de déplacer des crédits au sein d\'un même programme, entre titres différents. Il est autorisé par arrêté du Ministre du Budget dans des plafonds fixés par la loi de finances. Si les crédits à déplacer proviennent d\'un autre programme (ex. : crédits de prévention non consommés vers les crédits de traitement), il s\'agit d\'un transfert de crédits (Art. 49-50 LOFIP), qui nécessite un décret du Premier Ministre. Dans les deux cas, la LOFIP interdit que le virement ou le transfert ne majore les crédits du Titre 1 (personnel).',
      },
    ],
    articleRef: 'Art. 10, 45, 46-50 LOFIP',
  },
  {
    id: 'cp2',
    titre: 'L\'Office national des routes et le principe de sincérité',
    contexte: 'Lors de la préparation du budget 2026, le Directeur général de l\'Office national des routes (ONR) soumet au Ministère du Budget des prévisions de recettes issues de droits de péage très optimistes : 8 milliards FC, alors que la moyenne des 3 dernières années est de 3,2 milliards FC. Pour justifier cette surestimation, il invoque la mise en service prévue de 3 nouveaux tronçons. Par ailleurs, il omet d\'inscrire au budget de l\'ONR les salaires de 200 agents contractuels qu\'il emploie en dehors du tableau des effectifs autorisé (Titre 1 sous-évalué). L\'Inspecteur des finances saisit le Ministre du Budget.',
    questions: [
      {
        num: 1,
        enonce: 'Analysez les deux irrégularités relevées au regard du principe de sincérité (Art. 11 LOFIP).',
        correction: 'Deux violations du principe de sincérité (Art. 11 LOFIP) sont identifiables : (1) Surestimation des recettes : L\'Art. 11 exige que les prévisions soient sincères et «appréciées compte tenu des informations disponibles». Prévoir 8 milliards FC alors que la moyenne historique est de 3,2 milliards FC (soit 2,5 fois plus) sans base crédible constitue une insincérité manifeste des prévisions de recettes. La mise en service de 3 tronçons peut justifier une augmentation modeste mais pas une multiplication par 2,5. (2) Sous-évaluation des charges de personnel : Omettre délibérément 200 agents du Titre 1 constitue une insincérité des prévisions de dépenses. Cela fausse la lecture du budget et cache un dépassement futur inévitable. L\'Art. 11 exige que les comptes «reflètent une image fidèle» - ce qui n\'est pas le cas ici.',
      },
      {
        num: 2,
        enonce: 'Quelles mesures correctrices l\'Inspecteur des finances peut-il recommander au Ministre du Budget pour rétablir la sincérité du budget de l\'ONR ?',
        correction: 'L\'Inspecteur des finances peut recommander : (1) Correction des recettes : réviser les prévisions de recettes de péage à la baisse, en les fondant sur les données historiques corrigées d\'un coefficient raisonnable pour les nouveaux tronçons. Une augmentation de 20 à 30% par rapport à la moyenne historique (soit environ 3,8 à 4,2 milliards FC) serait plus sincère. (2) Régularisation du personnel : inscrire les 200 agents contractuels au Titre 1 avec leurs rémunérations réelles. Si cela entraîne un dépassement du plafond d\'emplois autorisé, le Gouverneur du budget doit en demander la révision au Parlement via le projet de loi de finances rectificative. (3) Sanction éventuelle : le Directeur général peut être mis en cause pour avoir sciemment présenté des prévisions insincères, en violation de l\'Art. 11 LOFIP.',
      },
    ],
    articleRef: 'Art. 11 LOFIP · Art. 5, 8 LOFIP',
  },
  {
    id: 'cp3',
    titre: 'Principe d\'universalité violé : le Fonds spécial des infrastructures',
    contexte: 'Lors du débat budgétaire 2026, le Gouvernement propose de créer un "Fonds spécial pour les infrastructures" qui capterait directement 15% des recettes douanières de la DGDA (LF 2026 - Loi n° 25/060 : recettes DGDA prévues à 7.522,0 milliards FC). Ce fonds serait géré hors budget général et alimenterait directement les travaux d\'infrastructure. Aucun texte spécial de la LOFIP ne le prévoit. L\'opposition parlementaire conteste la constitutionnalité du dispositif.',
    questions: [
      {
        num: 1,
        enonce: 'Ce fonds spécial viole-t-il le principe d\'universalité (Art. 7 LOFIP) ? Analysez les deux dimensions du principe (règle du produit brut et interdiction de l\'affectation préalable) au regard de la proposition gouvernementale.',
        correction: 'Oui, le fonds spécial viole les deux dimensions du principe d\'universalité (Art. 7 LOFIP). (1) Règle du produit brut : l\'Art. 7 impose que toutes les recettes douanières soient inscrites pour leur montant intégral dans le budget général. En captant 15% des recettes DGDA hors budget, le Gouvernement ne présente pas le produit brut. (2) Interdiction de l\'affectation préalable : l\'Art. 7 interdit expressément de réserver une recette particulière à une dépense particulière. Affecter 15% des recettes DGDA aux seules infrastructures constitue une affectation préalable directement prohibée. La LF 2026 (Loi n° 25/060) rappelle le principe à l\'Art. 3 : «la compensation est strictement prohibée, conformément à l\'Art. 7 LOFIP».',
      },
      {
        num: 2,
        enonce: 'Quelles sont les dérogations légalement admises au principe d\'universalité en droit budgétaire congolais ? Le fonds proposé pourrait-il entrer dans l\'une de ces catégories selon la LOFIP ?',
        correction: 'La LOFIP prévoit 4 dérogations légales au principe d\'universalité : (1) Budgets annexes (Art. 55-58) : réservés aux services rendant des prestations contre redevances ; (2) Comptes spéciaux du Trésor (Art. 59-73) : pour des opérations à caractère particulier dûment autorisées par la loi ; (3) Fonds de concours (Art. 74) : contributions financières de tiers pour une dépense déterminée ; (4) Attributions de produits (Art. 75) : recettes de prestations. Le fonds spécial infrastructures pourrait techniquement être créé en tant que compte d\'affectation spéciale (Art. 59-73 LOFIP), mais uniquement si : une loi du Parlement l\'autorise expressément, ses opérations sont retracées dans le budget de l\'État, et il fait l\'objet d\'un contrôle parlementaire. En l\'absence de ce texte, le dispositif est illégal.',
      },
      {
        num: 3,
        enonce: 'Si le Parlement vote la LF 2026 sans supprimer ce fonds, la Cour des comptes peut-elle intervenir ? Sur quelle base légale (LOFIP et Constitution) ? Quels pouvoirs a-t-elle ?',
        correction: 'Oui, la Cour des comptes (Art. 178-180 Constitution) peut intervenir. (1) Contrôle de légalité : la Cour contrôle la conformité des opérations à la LOFIP. Une opération violant l\'Art. 7 peut être censurée même si elle figure dans la loi de finances. (2) Jugement des comptes : la Cour peut engager la responsabilité personnelle et pécuniaire des comptables ayant géré le fonds hors budget général. (3) Recommandations au Parlement : lors de l\'examen de la loi de règlement, la Cour signale l\'irrégularité pour correction dans la prochaine LF. En phase de contrôle ex ante ses pouvoirs sont limités, mais très étendus en phase de règlement (ex post).',
      },
    ],
    articleRef: 'Art. 7, 55-73, 74, 75 LOFIP · Art. 3 LF 2026 (Loi n° 25/060 du 29 déc. 2025)',
  },
  {
    id: 'cp4',
    titre: 'Virement ou transfert de crédits : le cas du Ministère de l\'Education nationale',
    contexte: 'Le Ministère de l\'Education nationale (MEN) gère deux programmes : «Programme A : enseignement primaire» et «Programme B : enseignement secondaire». En août 2026, le Directeur du budget constate que le Programme A a consommé 95% de ses crédits de fonctionnement (Titre 2), alors que le Programme B présente un excédent de 1,2 milliard FC sur ce même titre. Une pénurie inattendue de manuels exige 800 millions FC supplémentaires pour le Programme A (Titre 4). Le Directeur envisage : (Op.1) Transférer 800 millions FC du Titre 2 du Programme B vers le Titre 4 du Programme A ; (Op.2) Prendre sur les crédits de personnel (Titre 1) non utilisés du Programme A (postes vacants) pour abonder le Titre 2.',
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez juridiquement l\'Opération 1 : s\'agit-il d\'un virement (Art. 46-48 LOFIP) ou d\'un transfert de crédits (Art. 49-50 LOFIP) ? Quelle autorité doit l\'autoriser et selon quelle procédure ?',
        correction: 'L\'Opération 1 est un TRANSFERT de crédits au sens de l\'Art. 49-50 LOFIP, car les crédits se déplacent entre deux programmes différents (Programme B vers Programme A). La LOFIP distingue : virement = déplacement au sein d\'un même programme (Art. 46-48, autorisé par arrêté du Ministre du Budget) ; transfert = déplacement entre programmes différents (Art. 49-50, nécessite un décret du Premier Ministre sur proposition du Ministre du Budget). Le transfert entraîne un changement de titre (Titre 2 vers Titre 4), compatible avec la fongibilité asymétrique à condition de ne pas abonder le Titre 1.',
      },
      {
        num: 2,
        enonce: 'L\'Opération 2 (Titre 1 vers Titre 2) est-elle conforme à la fongibilité asymétrique (Art. 45 LOFIP) ? Dans quel sens la fongibilité joue-t-elle ici ?',
        correction: 'L\'Opération 2 est CONFORME à la fongibilité asymétrique (Art. 45 LOFIP). La fongibilité est dite «asymétrique» car elle n\'autorise le mouvement que dans un sens : DEPUIS le Titre 1 (personnel) vers les autres titres. L\'inverse - abonder le Titre 1 depuis un autre titre - est formellement interdit. En l\'espèce, les crédits de personnel non consommés (postes vacants) peuvent être redéployés vers le Titre 2. Cette opération nécessite un arrêté du Ministre du Budget dans les plafonds fixés par la loi de finances, sans nécessiter de décret du Premier Ministre.',
      },
      {
        num: 3,
        enonce: 'Si ni le virement ni le transfert ne suffisent à couvrir les besoins, quels mécanismes la LOFIP prévoit-elle pour ouvrir des crédits supplémentaires en cours d\'exercice ? Citez les articles applicables et le rôle du Parlement.',
        correction: 'La LOFIC prévoit plusieurs mécanismes : (1) Loi de finances rectificative - LFR (Art. 76-87 LOFIP) : le Gouvernement soumet au Parlement un projet de LFR pour ouvrir de nouveaux crédits. C\'est la voie normale pour des besoins importants imprévus. La LF 2026 (Loi n° 25/060) peut être révisée par une LFR si les hypothèses macroéconomiques changent significativement. (2) Décrets d\'avance (Art. 87 al. 1 LOFIP) : en cas d\'urgence impérative, le Gouvernement peut ouvrir des crédits par décret sous réserve de ratification par le Parlement lors de la prochaine loi de finances. (3) Douzièmes provisoires (Art. 87 al. 2 LOFIP) : si la LF n\'est pas votée au 1er janvier, les crédits de l\'exercice précédent sont reconduits mensuellement.',
      },
    ],
    articleRef: 'Art. 8, 45, 46-50, 76-87 LOFIP · LF 2026 (Loi n° 25/060 du 29 déc. 2025)',
  },
  {
    id: 'cp5',
    titre: 'Le principe de légalité face à l\'exemption fiscale non autorisée',
    contexte: 'Par arrêté interministériel n° 2026/017, les Ministères du Commerce et des Finances accordent une exonération totale de TVA (taux 16%) et de droits d\'accise à une société importatrice de matériaux de construction, pour 3 ans, au motif de favoriser les logements sociaux. Aucune loi du Parlement ni aucune disposition de la LF 2026 (Loi n° 25/060 du 29 décembre 2025) ne prévoit cette exonération. La DGDA saisie refuse d\'appliquer l\'arrêté et informe l\'Inspecteur général des finances.',
    questions: [
      {
        num: 1,
        enonce: 'L\'arrêté interministériel est-il légal au regard du principe de légalité fiscale (Art. 9 al. 2 LOFIP) et de l\'Art. 4 de la LF 2026 (Loi n° 25/060) ? Analysez en citant les textes.',
        correction: 'L\'arrêté est ILLEGAL à double titre. (1) Au regard de l\'Art. 9 al. 2 LOFIP : «Tout privilège en matière fiscale ne peut être établi qu\'en vertu d\'une loi.» Une exonération fiscale constitue un privilège fiscal qui ne peut résulter que d\'une loi du Parlement, jamais d\'un arrêté ministériel. (2) Au regard de l\'Art. 4 de la LF 2026 (Loi n° 25/060 du 29 décembre 2025) : cet article dispose expressément qu\'«aucune exemption ou allégement fiscal n\'est accordable en dehors d\'une loi, conformément à l\'Art. 9 al. 2 LOFIP». La DGDA est donc fondée à refuser d\'appliquer cet arrêté, dont l\'illégalité est manifeste.',
      },
      {
        num: 2,
        enonce: 'Quelles sanctions peuvent être encourues par les Ministres signataires ? Quelle est la procédure légale pour régulariser la situation si le Gouvernement souhaite tout de même accorder cet avantage fiscal ?',
        correction: 'Les Ministres signataires s\'exposent à : (1) Responsabilité politique : le Parlement peut mettre en cause la responsabilité du Gouvernement pour violation flagrante du principe de légalité fiscale (Art. 90-100 Constitution). (2) Responsabilité pénale : un arrêté accordant un avantage fiscal illégal peut constituer un délit de favoritisme susceptible de poursuites. (3) Sanction administrative par la Cour des comptes. Pour régulariser : le Gouvernement doit déposer un projet de loi d\'exonération devant le Parlement, ou intégrer la mesure dans la prochaine LF ou LFR, puis le soumettre au vote des deux Chambres, conformément à l\'Art. 9 al. 2 LOFIP lu avec l\'Art. 4 LF 2026.',
      },
      {
        num: 3,
        enonce: 'L\'Art. 4 de la LF 2026 (Loi n° 25/060) pose-t-il un principe général ou une règle sectorielle ? En quoi renforce-t-il le contrôle démocratique sur les privilèges fiscaux en RDC et la préservation des recettes publiques ?',
        correction: 'L\'Art. 4 de la LF 2026 pose un PRINCIPE GÉNÉRAL à portée transversale, valable pour l\'ensemble des impôts, taxes et droits fiscaux. Il n\'est pas sectoriel mais s\'applique à tout prélèvement. Il renforce le contrôle démocratique de trois manières : (1) Transparence : en exigeant que toute exonération soit votée par le Parlement, les dépenses fiscales (pertes de recettes) sont rendues publiques et débattues ; (2) Lutte contre la corruption : il empêche les exonérations discrétionnaires accordées par l\'exécutif à des intérêts privés ; (3) Préservation des recettes : dans un contexte où la LF 2026 programme des recettes DGI de 19.033,6 milliards FC et DGDA de 7.522,0 milliards FC, toute érosion non législative de la base fiscale compromet l\'équilibre budgétaire fixé à 54.335,8 milliards FC (Art. 6 LF 2026 - Loi n° 25/060).',
      },
    ],
    articleRef: 'Art. 9 al. 2 LOFIP · Art. 4 LF 2026 (Loi n° 25/060 du 29 déc. 2025)',
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
export default function UE5Chapitre2Page() {
  const goBack = useGoBack('/ue5-finances-publiques')
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
            { label: 'UE 5 - Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 2' },
          ]}
          color="emerald"
        />
        <BackButton />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">Les principes budgétaires</h1>
          <InfoTooltip texte="Les 6 principes budgétaires de la LOFIP : annualité, unité, universalité, spécialité, légalité et sincérité (Art. 4 à 11)." loi="Art. 4-11 LOFIP" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 4 à 11 · CBMT · Fongibilité asymétrique · LFR n° 25/044 · Budget 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '5h00' },
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
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Enoncer et expliquer les 6 principes budgétaires de la LOFIP (Art. 4 à 11)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Identifier les dérogations légales à chaque principe (budgets annexes, comptes spéciaux, fongibilité asymétrique)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Maîtriser la nomenclature budgétaire : les 5 titres de dépenses et la fongibilité asymétrique (Art. 45)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Appliquer les principes à des situations pratiques de gestion budgétaire</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Analyser l'actualité 2025-2026 : LFR n° 25/044, conférences budgétaires 2026 (sincérité réaffirmée)</span></li>
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
              chapitreId="ue5-chapitre-2"
              chapitreNom="Chapitre 2 : Les principes budgétaires"
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
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 2
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : LOFIP n° 11/011 du 13 juillet 2011 (Art. 4-11, 43-50, 53, 55-75, 87, 92) · LFR n° 25/044 du 28 juin 2025 · Discours conférences budgétaires 2026, Ministère du Budget RDC, 28 juillet 2025
      </p>
    </div>
  )
}
