/**
 * CHAPITRE 1 : Notions générales de fiscalité et d'impôt
 * Contenu théorique, adapté et actualisé à partir du module « Fiscalité des
 * Entreprises » (Prof. Trésor-Gauthier M. KALONJI, avril 2023, Master Audit
 * et Contrôle de Gestion, Société 4METX). Les définitions et principes
 * théoriques (non chiffrés) sont repris fidèlement ; toute référence à un
 * régime, un taux ou un texte devenu obsolète (IS/IRPP pré-réforme 2023,
 * TVA 8%, IBP) a été retirée ou actualisée avec renvoi au chapitre concerné.
 *
 * Les articles constitutionnels cités (Art. 11, 12, 13, 65, 122, 172, 174)
 * sont ceux de la Constitution du 18 février 2006, telle que modifiée par
 * la Loi n°11/002 du 20 janvier 2011.
 */
import React, { useState } from 'react'
import {
  BookOpen, Landmark, Scale, ChevronRight, ChevronDown, Info, Coins,
  TrendingUp, ShieldCheck, Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono text-muted-foreground bg-muted/50 rounded px-1 py-0.5 ml-1">
      {children}
    </span>
  )
}

function Section({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg mb-3', color)}>
      <Icon className="h-4 w-4" />
      <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
    </div>
  )
}

function Depliant({ titre, children }: { titre: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/60 rounded-lg mb-2 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-2 px-3 py-2.5 bg-muted/30 hover:bg-muted/60 transition-colors text-left"
      >
        {open
          ? <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          : <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
        }
        <span className="text-sm font-semibold text-foreground">{titre}</span>
      </button>
      {open && (
        <div className="px-4 py-3 text-sm text-foreground leading-relaxed space-y-1.5 bg-background">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── SOUS-CHAPITRE 1.1 : NOTIONS DE FISCALITÉ ───────────────────────────────
function SousChapitreFiscalite() {
  return (
    <div>
      <Section icon={BookOpen} label="1.1 — Notion et fonctions de la fiscalité" color="bg-blue-50 text-blue-800" />

      <Depliant titre="Notion : de fiscus au droit fiscal moderne">
        <p>Le concept de « fiscalité » tire son origine du latin <em>fiscus</em>, qui désignait à Rome le panier servant à recevoir l'argent, puis le Trésor du prince. De nos jours, la fiscalité désigne l'ensemble des impositions, contributions et taxes prélevées par les collectivités publiques, ainsi que les règles et mécanismes qui régissent leur fonctionnement — à l'exclusion des prélèvements sociaux et des redevances perçues en contrepartie d'un service.</p>
        <p className="mt-1">Elle se rattache logiquement au <strong>droit fiscal</strong> : la branche du droit régissant les impôts quant à leur assiette, leur liquidation et leur recouvrement, et déterminant tant l'étendue des pouvoirs d'imposition des autorités publiques que les obligations des contribuables.</p>
      </Depliant>

      <Depliant titre="Les quatre fonctions de la fiscalité">
        <ul className="list-disc pl-4 space-y-1.5">
          <li><strong>Fonction financière</strong> : le financement des dépenses publiques (enseignement, justice, sécurité, santé, protection sociale) — fonction historiquement première de l'impôt.</li>
          <li><strong>Fonction sociale</strong> : la redistribution des revenus et des richesses, horizontale (transferts non liés à la hiérarchie des revenus, ex. protection sociale) ou verticale (resserrement de l'éventail des revenus par un impôt progressif).</li>
          <li><strong>Fonction économique</strong> : la régulation et la stabilisation de l'activité économique — un impôt progressif agit comme stabilisateur automatique, amplifié en période d'expansion et atténué en récession.</li>
          <li><strong>Fonction d'interventionnisme</strong> : l'incitation ou la dissuasion de comportements économiques par l'octroi de facilités fiscales (incitation positive) ou l'instauration de contributions ciblées (incitation négative) — c'est le ressort des zones économiques spéciales et des régimes d'exonération sectoriels.</li>
        </ul>
      </Depliant>
    </div>
  )
}

// ─── SOUS-CHAPITRE 1.2 : NOTIONS D'IMPÔT ET AUTRES PRÉLÈVEMENTS ─────────────
function SousChapitreImpot() {
  return (
    <div>
      <Section icon={Coins} label="1.2 — L'impôt et les prélèvements voisins" color="bg-emerald-50 text-emerald-800" />

      <Depliant titre="Définition et traits caractéristiques de l'impôt">
        <p>Selon DUVERGER, l'impôt est « une prestation pécuniaire requise des personnes physiques ou morales par voie d'autorité, à titre définitif et sans contrepartie, en vue de la couverture des charges publiques ». Il présente sept traits caractéristiques :</p>
        <ul className="list-disc pl-4 space-y-1 mt-1.5">
          <li>C'est une <strong>prestation</strong> : un transfert de moyens de paiement à l'État ou aux collectivités publiques</li>
          <li>C'est une prestation <strong>pécuniaire</strong> : exclusivement en argent, jamais en nature</li>
          <li>Il a une <strong>destination d'utilité publique</strong> : couverture des charges publiques</li>
          <li>Il a un <strong>caractère forcé</strong> : levé par la puissance publique, non consenti volontairement acte par acte</li>
          <li>Il est <strong>sans contrepartie directe</strong> : aucune corrélation entre l'impôt payé et un service déterminé dont bénéficierait le contribuable</li>
          <li>Il est perçu <strong>à titre définitif</strong> : pas de remboursement, sauf erreur matérielle ou double emploi</li>
          <li>Il est <strong>sans affectation préalable</strong> : on ne sait pas à l'avance à quoi servira précisément l'impôt payé</li>
        </ul>
      </Depliant>

      <Depliant titre="Impôt, taxe, droit, redevance, parafiscalité : cinq notions à distinguer">
        <ul className="list-disc pl-4 space-y-1.5">
          <li><strong>Taxe</strong> (ou contribution causale) : perçue en contrepartie d'un service ou d'un avantage particulier — à la différence de l'impôt, elle suppose une contre-prestation. Certains impôts portent le nom de « taxe » à titre purement historique (TVA, taxe spéciale de circulation routière).</li>
          <li><strong>Droit</strong> : prélèvement exigible dans une situation prédéterminée, notamment pour contrôler ou limiter des opérations (droits de douane, droits de consommation) — facturation d'un acte que l'État pose dans son pouvoir de commandement, non rémunération d'un service.</li>
          <li><strong>Redevance</strong> : rémunération pour service rendu, s'apparentant à un prix, avec un caractère indemnitaire (rapport raisonnable entre le montant payé et la valeur du service presté) et destinée à l'usager direct du service, non à la collectivité dans son ensemble.</li>
          <li><strong>Parafiscalité</strong> (taxe parafiscale) : prélèvement obligatoire à affectation déterminée, versé non au Trésor public mais à des caisses particulières servant des dépenses spécifiques (ex. cotisations CNSS, INPP).</li>
        </ul>
      </Depliant>
    </div>
  )
}

// ─── SOUS-CHAPITRE 1.3 : PRINCIPES CONSTITUTIONNELS ─────────────────────────
function SousChapitrePrincipes() {
  return (
    <div>
      <Section icon={Scale} label="1.3 — Les principes constitutionnels du droit fiscal congolais" color="bg-violet-50 text-violet-800" />

      <div className="p-3 bg-violet-50/50 border border-violet-200 rounded-lg mb-3">
        <p className="text-sm text-violet-700">Cinq principes fondent la légitimité de tout prélèvement fiscal en RDC, tous ancrés dans la Constitution du 18 février 2006 (telle que modifiée par la Loi n°11/002 du 20 janvier 2011).</p>
      </div>

      <Depliant titre="Légalité fiscale">
        <p>« Il ne peut être établi d'impôts que par la loi. La contribution aux charges publiques constitue un devoir pour toute personne vivant en République Démocratique du Congo. Il ne peut être établi d'exemption ou d'allègement fiscal qu'en vertu de la loi » <Ref>Art. 174, Constitution</Ref>.</p>
        <p className="mt-1">Complété par l'Art. 122 : la loi fixe les règles concernant les finances publiques, ainsi que l'assiette, le taux et les modalités de recouvrement des impositions de toute nature. Ce principe justifie la vigilance constante sur la hiérarchie des textes (loi de base, lois de finances annuelles, arrêtés d'exécution) que ce module applique systématiquement.</p>
      </Depliant>

      <Depliant titre="Égalité fiscale">
        <p>Fondée sur les Art. 11 (égalité en dignité et en droits), Art. 12 (« tous les Congolais sont égaux devant la loi ») et Art. 13 (interdiction des discriminations) de la Constitution. En matière fiscale, ce principe n'impose pas un traitement identique en toute circonstance, mais une imposition selon la <strong>capacité contributive</strong> de chacun — ce qui justifie, par exemple, les réductions pour charges de famille et la progressivité du barème de l'IRPP.</p>
      </Depliant>

      <Depliant titre="Nécessité fiscale">
        <p>L'impôt est un « mal nécessaire » à la vie en collectivité, qui légitime à la fois la levée de l'impôt et les prérogatives exceptionnelles reconnues à l'administration fiscale pour lutter contre l'évasion et la fraude. Fondé sur la combinaison des Art. 65 et 174 al. 2 de la Constitution (devoir de tout Congolais de s'acquitter de ses impôts et taxes).</p>
      </Depliant>

      <Depliant titre="Annualité fiscale">
        <p>Le contribuable acquitte un impôt déterminé une fois par année — le paiement fractionné en plusieurs versements ou acomptes provisionnels au cours de l'année ne contredit pas ce principe. Il découle de l'annualité budgétaire : « l'exercice budgétaire commence le premier janvier et se termine le 31 décembre » <Ref>Art. 172, Constitution</Ref>, et de l'autorisation annuelle de perception par la loi de finances.</p>
      </Depliant>

      <Depliant titre="Universalité (ou généralité) fiscale">
        <p>Toutes les personnes sont soumises à l'impôt selon les mêmes règles juridiques : « la contribution aux charges publiques constitue un devoir pour toute personne vivant en République Démocratique du Congo » <Ref>Art. 174 al. 2, Constitution</Ref>. Ce principe prohibe les privilèges fiscaux non objectivement justifiés et les discriminations créant des impôts spéciaux visant un groupe restreint de personnes.</p>
      </Depliant>
    </div>
  )
}

// ─── SOUS-CHAPITRE 1.4 : ARCHITECTURE DU SYSTÈME FISCAL CONGOLAIS ───────────
function SousChapitreArchitecture() {
  return (
    <div>
      <Section icon={Landmark} label="1.4 — Architecture du système fiscal congolais" color="bg-amber-50 text-amber-800" />

      <Depliant titre="Deux régimes : droit commun et impositions exceptionnelles">
        <p>Le système fiscal congolais, héritier de la tradition romano-germanique (influences belge et française), se compose de deux régimes :</p>
        <ul className="list-disc pl-4 space-y-1 mt-1.5">
          <li><strong>Régime de droit commun</strong> : impôts réels, impôts cédulaires sur les revenus (IS, IRPP), impôts indirects (TVA, accises), droits de douane, et une multiplicité de droits, taxes et redevances au profit du Pouvoir central, des provinces, des ETD et de certains organismes publics.</li>
          <li><strong>Régimes fiscaux exceptionnels</strong> : prélèvements applicables à des secteurs particuliers — fiscalité minière, pétrolière, forestière, des investissements, etc. Ce module couvre la fiscalité minière (chapitre dédié) au titre de ces régimes exceptionnels.</li>
        </ul>
      </Depliant>

      <div className="mt-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Plan du présent module</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { n: 2, t: 'Impôt sur les Sociétés (IS)', d: '30% du bénéfice net, Loi 23/053' },
            { n: 3, t: 'Impôt sur le Revenu des Personnes Physiques (IRPP)', d: '6 catégories de revenus' },
            { n: 4, t: 'Taxe sur la Valeur Ajoutée (TVA)', d: 'Taux 16%, réduits 1%/5%, zéro' },
            { n: 5, t: 'Autres impôts réels et provinciaux', d: 'IRL, IF, IV, TSCR, TSMC' },
            { n: 6, t: 'Procédures fiscales', d: 'Déclarations, contrôle, recouvrement, contentieux' },
            { n: 7, t: 'Douane', d: 'Valeur en douane, régimes douaniers, contentieux' },
            { n: 8, t: 'Fiscalité minière', d: 'Régime fiscal, douanier et redevance minière' },
          ].map(c => (
            <div key={c.n} className="flex items-start gap-2 rounded-lg border border-border/60 p-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white text-xs font-bold">{c.n}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{c.t}</p>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 p-3">
        <div className="flex gap-2">
          <Info className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-sm text-sky-700">Hors périmètre de ce module : l'impôt personnel minimum des résidents (impôt local sur les personnes physiques), la fiscalité pétrolière, forestière et des investissements, ainsi que les régimes de parafiscalité sociale (CNSS, INPP) — développés dans d'autres modules du parcours.</p>
        </div>
      </div>
    </div>
  )
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
const SOUS_CHAPITRES = [
  { id: 'fiscalite',    label: 'Notion & fonctions',  icon: BookOpen,     component: SousChapitreFiscalite },
  { id: 'impot',        label: 'Impôt & prélèvements', icon: Coins,       component: SousChapitreImpot },
  { id: 'principes',    label: 'Principes constit.',   icon: Scale,       component: SousChapitrePrincipes },
  { id: 'architecture', label: 'Plan du module',       icon: Landmark,    component: SousChapitreArchitecture },
]

export default function ChapitreIntroductionFiscalite() {
  const [actif, setActif] = useState('fiscalite')
  const Composant = SOUS_CHAPITRES.find(s => s.id === actif)!.component

  return (
    <div className="space-y-4">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 mt-0.5 text-slate-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground">
              Chapitre 1 — Notions générales de fiscalité et d'impôt
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Théorie générale du droit fiscal, adaptée et actualisée à partir des principes fondamentaux du droit fiscal congolais et de la Constitution du 18 février 2006
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SOUS_CHAPITRES.map(s => {
          const Icon = s.icon
          const isActif = actif === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActif(s.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                isActif
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-slate-400 hover:text-foreground'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{s.label}</span>
            </button>
          )
        })}
      </div>

      <div><Composant /></div>

      <div className="p-2 border-t border-border/40">
        <p className="text-sm text-muted-foreground text-center italic">
          Contenu théorique de portée générale, actualisé selon la législation en vigueur. Les développements chiffrés (taux, barèmes, seuils) sont traités dans les chapitres 2 à 8.
        </p>
      </div>
    </div>
  )
}
