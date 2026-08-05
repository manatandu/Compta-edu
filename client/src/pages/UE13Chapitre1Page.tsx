import React, { useState } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Globe, Building2, Scale, History, TrendingUp,
  ChevronDown, ChevronUp, ChevronRight, RotateCcw, Landmark
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { EtudeDeCasRaw, versCasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
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
  // ─────────────────────────────────────────────────────────────────
  // LECON 1 — Pourquoi les IFRS ?
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l1',
    icone: <Globe className="h-5 w-5" />,
    titre: "Pourquoi les IFRS ? Origines et nécessité de la normalisation internationale",
    badge: "Cadre conceptuel IASB · Préambule IFRS Foundation",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La <strong>comptabilité</strong>
          <InfoTooltip texte="La comptabilité est définie par l'IASB comme un système d'information financière dont l'objectif fondamental est de fournir une information utile à la prise de décisions économiques par les investisseurs actuels et potentiels, les prêteurs et autres créanciers." loi="Cadre conceptuel IASB §OB2" />
          {' '}constitue un <strong>langage de communication financière</strong> destiné à traduire la réalité économique des entreprises en une information utile pour la prise de décision. Toutefois, la diversité des référentiels comptables nationaux, souvent influencés par des logiques fiscales et juridiques, a longtemps limité la comparabilité des états financiers à l'échelle internationale.
        </p>
        <p>
          La mondialisation des activités économiques, la mobilité des capitaux et le développement des marchés financiers ont rendu nécessaire l'émergence d'une <strong>normalisation comptable internationale</strong>, visant à harmoniser les pratiques sans nier les spécificités locales. Les normes IAS/IFRS répondent à cet objectif en proposant un cadre conceptuel commun, fondé sur la <strong>transparence, la comparabilité et la prééminence de la réalité économique sur la forme juridique</strong>.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les limites des référentiels comptables nationaux</h3>
        <p>
          Avant l'émergence des normes internationales, les référentiels comptables nationaux présentaient plusieurs limites structurelles majeures :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Des <strong>règles différentes d'un pays à l'autre</strong>, rendant les états financiers incomparables au-delà des frontières ;</li>
          <li>Une <strong>forte influence fiscale</strong> : la comptabilité servait d'abord à calculer l'impôt, pas à informer les investisseurs ;</li>
          <li>Une <strong>faible comparabilité internationale</strong> : un investisseur étranger ne pouvait pas analyser les comptes d'une entreprise africaine avec les mêmes critères qu'une entreprise européenne ;</li>
          <li>Une <strong>information financière orientée vers l'administration</strong> plutôt que vers les marchés financiers.</li>
        </ul>

        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-1">Constat fondateur</p>
          <p className="text-xs text-sky-800">
            La normalisation internationale apparait donc comme une <strong>réponse institutionnelle à la mondialisation des marchés financiers</strong>. Elle transforme la comptabilité d'un outil de contrôle fiscal en un véritable outil d'information économique au service des investisseurs.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">La philosophie nouvelle des IFRS</h3>
        <p>
          L'objectif central des IFRS est de fournir une information financière <strong>fiable et pertinente</strong>, principalement au service des investisseurs et des prêteurs. Cette philosophie marque une évolution majeure par rapport aux référentiels de tradition continentale, tels que le <strong>SYSCOHADA</strong>
          <InfoTooltip texte="Le SYSCOHADA (Système Comptable OHADA) est le référentiel comptable applicable dans les 17 États membres de l'OHADA. Il est de tradition continentale : proche de la fiscalité, fondé sur le coût historique, orienté vers la protection des créanciers et de l'État fiscal." loi="Acte Uniforme OHADA relatif au droit comptable et à l'information financière" />.
        </p>
        <p>
          Au-delà de l'harmonisation technique, les IFRS traduisent trois principes philosophiques fondamentaux :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Privilégier la <strong>réalité économique des transactions</strong> sur leur forme juridique ;</li>
          <li>Fournir une <strong>information utile à la prise de décision</strong> économique ;</li>
          <li>Responsabiliser davantage le professionnel comptable par le recours au <strong>jugement professionnel</strong>.</li>
        </ul>

        <div className="rounded-xl border border-border bg-muted/30 p-4 mt-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Cadre conceptuel IASB — Objectif fondamental</p>
          <p className="italic text-foreground/80 text-xs">
            "L'objectif de l'information financière à usage général est de fournir, au sujet de l'entité présentant l'information financière, des informations utiles aux investisseurs actuels et potentiels, aux prêteurs et aux autres créanciers, pour les aider à prendre des décisions concernant la fourniture de ressources à l'entité."
          </p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 2 — De la crise de 1929 à l'IASC : naissance du modèle anglo-saxon
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l2',
    icone: <History className="h-5 w-5" />,
    titre: "De la crise de 1929 à la naissance du modèle anglo-saxon",
    badge: "Histoire · Securities Act 1933-1934 · IASC 1973",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">La comptabilité avant le XXe siècle</h3>
        <p>
          La normalisation comptable internationale est née d'un besoin de <strong>confiance, de comparabilité et de transparence</strong> dans l'information financière, à mesure que les économies nationales se sont ouvertes et que les capitaux ont commencé à circuler au-delà des frontières.
        </p>
        <p>
          Avant le XX<sup>e</sup> siècle, la comptabilité était essentiellement :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Nationale</strong> : chaque pays avait ses propres règles ;</li>
          <li><strong>Hétérogène</strong> : aucun langage commun entre pays ;</li>
          <li>Orientée vers la <strong>protection du créancier et de l'État fiscal</strong> ;</li>
          <li>Fortement influencée par les traditions juridiques (<strong>droit civil vs common law</strong>).</li>
        </ul>
        <p>
          Avec l'essor du capitalisme financier, des sociétés par actions et des marchés boursiers internationaux, les investisseurs ont exigé une information financière compréhensible au-delà des frontières, comparable entre entreprises et fiable pour la prise de décision économique.
        </p>

        <h3 className="font-bold text-foreground mt-4">La crise de 1929 : une crise de l'information financière</h3>
        <p>
          La crise financière de 1929 n'est pas seulement une crise boursière : c'est aussi et surtout une <strong>crise de la crédibilité de l'information comptable</strong>
          <InfoTooltip texte="La crise de 1929 a révélé que de nombreuses entreprises cotées publiaient des états financiers non audités, manipulés ou incomplets. Les investisseurs ne disposaient d'aucun référentiel commun pour évaluer la réalité financière des sociétés. Cette opacité a amplifié la panique boursière." loi="Contexte historique de la normalisation comptable internationale" />.
          Elle se manifestait par :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Des <strong>états financiers non audités</strong> publiés par les entreprises cotées ;</li>
          <li>Des <strong>manipulations des résultats</strong> pour attirer les investisseurs ;</li>
          <li>L'<strong>absence de règles communes</strong> encadrant la présentation des comptes ;</li>
          <li>Une <strong>opacité totale</strong> des comptes des entreprises cotées.</li>
        </ul>
        <p>
          Les investisseurs perdaient confiance car ils <em>"ne savaient pas ce qu'ils achetaient"</em>. Cette crise systémique va provoquer une réforme institutionnelle majeure, d'abord aux États-Unis, puis progressivement à l'échelle internationale.
        </p>

        <h3 className="font-bold text-foreground mt-4">La réponse américaine : fondation du modèle anglo-saxon</h3>
        <p>
          En réaction à la crise, les États-Unis mettent en place un système fondé sur trois piliers :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>La <strong>protection de l'investisseur</strong> comme objectif premier de l'information financière ;</li>
          <li>La <strong>transparence financière</strong> obligatoire pour les sociétés cotées ;</li>
          <li>L'<strong>indépendance des normes comptables vis-à-vis de l'État fiscal</strong>.</li>
        </ul>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100">
                <th className="text-left p-2 border border-border font-semibold">Année</th>
                <th className="text-left p-2 border border-border font-semibold">Evénement</th>
                <th className="text-left p-2 border border-border font-semibold">Portée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-border font-mono">1933</td>
                <td className="p-2 border border-border">Securities Act</td>
                <td className="p-2 border border-border">Transparence obligatoire pour les offres publiques de valeurs mobilières</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-2 border border-border font-mono">1934</td>
                <td className="p-2 border border-border">Securities Exchange Act + création de la SEC</td>
                <td className="p-2 border border-border">Régulation continue des marchés et des entreprises cotées</td>
              </tr>
              <tr>
                <td className="p-2 border border-border font-mono">1934-2001</td>
                <td className="p-2 border border-border">Délégation progressive à des organismes privés (APB, FASB)</td>
                <td className="p-2 border border-border">Naissance d'une normalisation comptable indépendante de l'État</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="p-2 border border-border font-mono">1973</td>
                <td className="p-2 border border-border">Création de l'IASC</td>
                <td className="p-2 border border-border">Première tentative d'harmonisation comptable internationale</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-1">Logique fondatrice</p>
          <p className="text-xs text-sky-800">
            Le modèle anglo-saxon donne naissance à une logique fondée sur la <strong>prééminence des marchés financiers</strong>, la comptabilité comme <strong>outil d'information économique</strong> et des normes <strong>évolutives basées sur des principes</strong>. C'est ce modèle qui influencera directement les IAS/IFRS.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">De l'harmonisation à la normalisation (1970-2001)</h3>
        <p>
          L'<strong>harmonisation</strong>
          <InfoTooltip texte="L'harmonisation vise à réduire les différences entre systèmes comptables nationaux sans imposer une règle unique. Elle autorise plusieurs méthodes alternatives. La 4e directive européenne (1978) et la 7e directive (1983) en sont des exemples typiques." loi="Contexte : directives comptables européennes 4e et 7e" />
          {' '}(années 1970-1990) visait à réduire les différences entre systèmes comptables, sans imposer une règle unique. Résultat : une comparabilité limitée, car trop de choix alternatifs coexistaient.
        </p>
        <p>
          La <strong>normalisation</strong> (logique IAS/IFRS) va beaucoup plus loin : elle impose des normes uniques, fondées sur un cadre conceptuel commun, applicables indépendamment des législations nationales. Le moment clé est l'année <strong>2001</strong> : transformation de l'IASC en IASB, avec une gouvernance renforcée et des normes beaucoup plus rigoureuses.
        </p>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 3 — Logique investisseurs vs logique fiscale : IFRS vs SYSCOHADA
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l3',
    icone: <Scale className="h-5 w-5" />,
    titre: "Logique investisseurs vs logique fiscale : IFRS vs SYSCOHADA",
    badge: "Cadre conceptuel IASB · Acte Uniforme OHADA",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <h3 className="font-bold text-foreground">La logique investisseurs (modèle IFRS)</h3>
        <p>
          Le modèle IFRS repose sur une logique dite <strong>"investisseurs"</strong>
          <InfoTooltip texte="La logique investisseurs signifie que l'information financière est conçue principalement pour aider les apporteurs de capitaux à prendre des décisions d'investissement, de financement ou de désinvestissement. L'État fiscal n'est pas l'utilisateur prioritaire." loi="Cadre conceptuel IASB §OB5" />. Ses caractéristiques fondamentales sont :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Objectif principal :</strong> aider à la décision économique des investisseurs, analystes et marchés financiers ;</li>
          <li><strong>Approche :</strong> image fidèle, juste valeur, primauté de la substance économique sur la forme juridique ;</li>
          <li><strong>Comptabilité indépendante de la fiscalité :</strong> les règles comptables sont déterminées sans égard pour l'optimisation fiscale ;</li>
          <li><strong>Vision prospective :</strong> orientation vers l'avenir et la capacité de l'entité à générer des flux de trésorerie futurs.</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">La logique fiscale (modèle continental / SYSCOHADA)</h3>
        <p>
          Le modèle continental, dont le SYSCOHADA est un représentant, repose sur une logique fondamentalement différente :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>Objectif principal :</strong> sécuriser l'assiette fiscale de l'État ;</li>
          <li><strong>Utilisateurs dominants :</strong> État, administration fiscale, créanciers ;</li>
          <li><strong>Approche :</strong> prudence, coût historique, primauté de la forme juridique ;</li>
          <li><strong>Forte dépendance entre comptabilité et fiscalité :</strong> la comptabilité devient un outil de contrôle plus que d'information économique ;</li>
          <li><strong>Vision rétrospective :</strong> les comptes décrivent le passé sans nécessairement éclairer l'avenir.</li>
        </ul>

        <h3 className="font-bold text-foreground mt-4">Tableau comparatif des deux logiques</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100">
                <th className="text-left p-2 border border-border font-semibold">Critère</th>
                <th className="text-left p-2 border border-border font-semibold text-sky-700">Logique IFRS (investisseurs)</th>
                <th className="text-left p-2 border border-border font-semibold text-amber-700">Logique SYSCOHADA (fiscale)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Objectif", "Information économique", "Calcul de l'impôt"],
                ["Utilisateur central", "Marchés financiers / Investisseurs", "État / Administration fiscale"],
                ["Méthode d'évaluation", "Juste valeur", "Coût historique"],
                ["Principe directeur", "Image fidèle", "Prudence fiscale"],
                ["Vision temporelle", "Prospective (flux futurs)", "Rétrospective (faits passés)"],
                ["Relation compta/fisc", "Indépendante", "Forte dépendance"],
                ["Primauté", "Substance économique", "Forme juridique"],
              ].map(([critere, ifrs, sysco], i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                  <td className="p-2 border border-border font-medium">{critere}</td>
                  <td className="p-2 border border-border text-sky-700">{ifrs}</td>
                  <td className="p-2 border border-border text-amber-700">{sysco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-foreground mt-4">La tension structurelle et sa résolution</h3>
        <p>
          Les IFRS ne suppriment pas la fiscalité. Elles séparent clairement la <strong>comptabilité financière</strong> (soumise aux IFRS) de la <strong>comptabilité fiscale</strong> (soumise aux règles nationales). C'est cette séparation qui génère le mécanisme des <strong>impôts différés</strong> (traité par IAS 12) : les différences temporelles entre le résultat comptable IFRS et le résultat fiscal doivent être comptabilisées.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Idée centrale du projet IASB</p>
          <p className="italic text-foreground/80 text-xs">
            "Une entreprise doit être jugée sur sa capacité à créer de la valeur économique réelle, et non sur sa capacité à optimiser sa charge fiscale."
          </p>
          
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          La normalisation comptable internationale n'est ni neutre ni purement technique : elle est le produit d'une histoire économique, d'une crise de confiance, et d'un choix en faveur des marchés financiers et de l'investisseur.
        </p>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 4 — Architecture institutionnelle : IFRS Foundation, IASB, ISSB
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l4',
    icone: <Building2 className="h-5 w-5" />,
    titre: "Architecture institutionnelle : IFRS Foundation, IASB, IFRIC et ISSB",
    badge: "Gouvernance IFRS Foundation · ISSB créé 2021 · 140+ juridictions",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La normalisation comptable internationale repose sur une <strong>architecture institutionnelle indépendante</strong>
          <InfoTooltip texte="L'indépendance de l'IASB est une condition essentielle de la légitimité des normes IFRS. Aucun gouvernement, aucune administration fiscale nationale ne peut imposer le contenu d'une norme IFRS. L'IASB est financé par contributions volontaires des grandes entreprises et des régulateurs, non par des États." loi="Statuts IFRS Foundation" />
          {' '}conçue pour garantir la qualité technique des normes, leur neutralité politique et leur crédibilité auprès des marchés financiers. Cette organisation est structurée autour de la <strong>IFRS Foundation</strong>.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les quatre organes principaux</h3>

        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="font-semibold text-foreground text-xs uppercase mb-1">1. Le Conseil de surveillance (Monitoring Board) — créé en 2009</p>
            <p className="text-xs text-foreground/80">
              Organe de <strong>supervision de la gouvernance</strong> de l'IASB, créé après la crise financière mondiale de 2008 pour renforcer la légitimité et la crédibilité des normes IFRS. Il <strong>ne rédige pas les normes</strong> et n'intervient pas dans les décisions techniques. Ses missions : superviser la gouvernance de la Fondation IFRS, nommer et approuver les administrateurs, veiller à l'indépendance de l'IASB, renforcer la confiance des autorités publiques dans les IFRS.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="font-semibold text-foreground text-xs uppercase mb-1">2. La IFRS Foundation</p>
            <p className="text-xs text-foreground/80">
              Organisation faîtière à but non lucratif. Elle <strong>nomme, surveille et finance</strong> l'IASB et l'ISSB. Elle supervise également le processus de publication des normes et veille à la cohérence de l'ensemble du système.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="font-semibold text-foreground text-xs uppercase mb-1">3. L'IASB (International Accounting Standards Board) — créé en 2001</p>
            <p className="text-xs text-foreground/80">
              Organe technique chargé de <strong>dresser l'ordre du jour technique, d'approuver les normes (IFRS), les exposés-sondages et les interprétations</strong>. Composé de 14 membres indépendants représentant la diversité géographique mondiale. C'est l'organe qui rédige et publie les normes IAS/IFRS.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="font-semibold text-foreground text-xs uppercase mb-1">4. L'IFRIC (IFRS Interpretations Committee)</p>
            <p className="text-xs text-foreground/80">
              Comité d'interprétation qui <strong>publie des interprétations officielles</strong> (IFRIC) lorsqu'une norme IFRS est ambiguë ou que des pratiques divergentes se développent. Les interprétations IFRIC ont <strong>la même force juridique que les normes</strong> elles-mêmes et s'imposent à toutes les entités appliquant les IFRS.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-foreground mt-4">L'ISSB : l'extension vers la durabilité (2021-2026)</h3>
        <p>
          En 2021, la IFRS Foundation a créé l'<strong>ISSB (International Sustainability Standards Board)</strong>
          <InfoTooltip texte="L'ISSB a été créé lors de la COP26 (Glasgow, novembre 2021) pour répondre à la demande croissante des marchés financiers en matière d'informations sur les risques climatiques et de durabilité. Il opère en parallèle de l'IASB, avec la même structure de gouvernance." loi="Annonce IFRS Foundation, COP26, novembre 2021" />
          {' '}pour développer des normes mondiales d'information en matière de durabilité. Ses premières normes — <strong>IFRS S1</strong> (informations générales sur la durabilité) et <strong>IFRS S2</strong> (informations sur les risques climatiques) — ont été publiées en juin 2023 et sont en cours d'adoption dans plus de 36 juridictions en 2025-2026.
        </p>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-1">Actualité 2025-2026</p>
          <p className="text-xs text-sky-800">
            Selon les données de la IFRS Foundation (juin 2025), <strong>36 juridictions</strong> ont déjà adopté ou s'engagent à adopter les normes ISSB S1 et S2. L'adoption des IFRS comptables (financières) concerne plus de <strong>140 pays</strong>, dont l'Union européenne (obligation depuis 2005 pour les sociétés cotées). En Afrique, le Rwanda a adopté les normes ISSB au 1er janvier 2025 pour les entités cotées sur la Rwanda Stock Exchange.
          </p>
        </div>

        <h3 className="font-bold text-foreground mt-4">Historique chronologique de l'IASB</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100">
                <th className="text-left p-2 border border-border font-semibold">Date</th>
                <th className="text-left p-2 border border-border font-semibold">Etape</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1973", "Création de l'IASC — publication des premières normes IAS"],
                ["1980-1990", "Limites des IAS : trop flexibles, pas contraignantes, trop de choix alternatifs"],
                ["2001", "Transformation en IASB — gouvernance renforcée, normes plus rigoureuses"],
                ["2001+", "Naissance des IFRS : les nouvelles normes s'appellent IFRS ; les IAS restent valables tant qu'elles ne sont pas remplacées"],
                ["2005", "Adoption obligatoire des IFRS pour les sociétés cotées en Union européenne"],
                ["2009", "Création du Conseil de surveillance (Monitoring Board) après la crise de 2008"],
                ["2021", "Création de l'ISSB lors de la COP26"],
                ["2023", "Publication des normes IFRS S1 et IFRS S2 (durabilité)"],
                ["2025-2026", "36 juridictions en cours d'adoption des normes ISSB ; 140+ pour les IFRS financières"],
              ].map(([date, etape], i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                  <td className="p-2 border border-border font-mono font-semibold text-sky-700 whitespace-nowrap">{date}</td>
                  <td className="p-2 border border-border">{etape}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 5 — Le processus d'élaboration d'une norme IFRS (Due Process)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l5',
    icone: <TrendingUp className="h-5 w-5" />,
    titre: "Le processus d'élaboration des normes IFRS : le Due Process en 6 étapes",
    badge: "Due Process IASB · Procédure participative et transparente",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Le <strong>Due Process</strong>
          <InfoTooltip texte="Le Due Process (procédure régulière) est le mécanisme par lequel l'IASB développe ses normes de manière transparente, participative et rigoureuse. Il garantit que toutes les parties prenantes — entreprises, auditeurs, régulateurs, investisseurs — peuvent commenter et influencer les normes avant leur adoption finale." loi="IFRS Foundation Due Process Handbook" />
          {' '}est le processus officiel par lequel l'IASB élabore ou révise ses normes IFRS. Il garantit la légitimité et la qualité des normes par une procédure <strong>transparente, ouverte et participative</strong>. Ce processus comporte <strong>6 étapes obligatoires</strong>.
        </p>
        <p>
          Un point essentiel : les IFRS ne sont pas des règles imposées par un État, mais le <strong>produit d'un processus international, indépendant et participatif</strong>, adopté juridiquement par les États selon leurs propres mécanismes.
        </p>

        <div className="space-y-3 mt-2">
          {[
            {
              num: "01",
              titre: "Identification du sujet et inscription à l'agenda",
              detail: "L'IASB identifie un problème comptable ou une lacune normative signalée par les parties prenantes, les régulateurs ou les comités d'interprétation. Il décide de l'inscrire à son programme de travail en fonction des priorités et de l'urgence."
            },
            {
              num: "02",
              titre: "Recherche et consultation préliminaire",
              detail: "L'IASB publie généralement un Document de Discussion (Discussion Paper) exposant le problème, les approches possibles et les questions ouvertes. Les parties prenantes disposent d'un délai (généralement 120 jours) pour soumettre leurs commentaires."
            },
            {
              num: "03",
              titre: "Publication de l'exposé-sondage (Exposure Draft)",
              detail: "L'IASB publie un projet de norme — l'Exposé-Sondage (ED) — qui présente les dispositions proposées. Toute personne ou organisation peut soumettre des commentaires écrits. Ce processus de consultation publique est ouvert à tous : entreprises, cabinets d'audit, gouvernements, universités."
            },
            {
              num: "04",
              titre: "Analyse des commentaires reçus",
              detail: "Les commentaires reçus sont analysés en détail par le staff technique de l'IASB. Les membres du Conseil étudient les positions des répondants et identifient les points de consensus et de divergence."
            },
            {
              num: "05",
              titre: "Délibérations et vote",
              detail: "L'IASB procède aux délibérations et arbitrages techniques en séance publique. Un vote formel des membres du Conseil est requis pour approuver la norme finale. La majorité simple des membres présents est généralement suffisante."
            },
            {
              num: "06",
              titre: "Publication de la norme IFRS définitive",
              detail: "La norme définitive est publiée avec sa date d'entrée en vigueur et ses dispositions transitoires. Elle est ensuite soumise aux processus nationaux d'adoption (ex. : homologation par la Commission européenne pour l'UE, transposition législative dans d'autres pays)."
            },
          ].map((etape) => (
            <div key={etape.num} className="flex gap-3 rounded-xl border border-border bg-muted/20 p-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">{etape.num}</div>
              <div>
                <p className="font-semibold text-foreground text-xs mb-1">{etape.titre}</p>
                <p className="text-xs text-foreground/80">{etape.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 mt-2">
          <p className="text-xs font-semibold text-sky-700 mb-1">Point fondamental</p>
          <p className="text-xs text-sky-800">
            Ce processus garantit la légitimité et la qualité des normes. Les IFRS ne sont pas des règles imposées par un État, mais le produit d'un processus international indépendant et participatif, adopté juridiquement par les États selon leurs propres mécanismes. En Zone OHADA, aucune norme IFRS n'a force obligatoire à moins d'être explicitement adoptée par l'OHADA ou par un État membre.
          </p>
        </div>
      </div>
    ),
    questions: []
  },

  // ─────────────────────────────────────────────────────────────────
  // LECON 6 — Le cadre conceptuel de l'IASB
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'l6',
    icone: <Landmark className="h-5 w-5" />,
    titre: "Le cadre conceptuel de l'IASB : socle théorique des normes IFRS",
    badge: "Cadre conceptuel IASB 2018 · Caractéristiques qualitatives · Eléments des états financiers",
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Le <strong>Cadre conceptuel</strong>
          <InfoTooltip texte="Le cadre conceptuel de l'IASB (révisé en 2018) n'est pas une norme IFRS. Il ne prime pas sur les normes spécifiques. Toutefois, en l'absence de norme applicable à une situation donnée, le cadre conceptuel constitue le premier guide d'interprétation et de raisonnement comptable." loi="Cadre conceptuel IASB — Introduction" />
          {' '}constitue le <strong>socle théorique des normes IFRS</strong>. Il ne s'agit pas d'une norme, mais d'un référentiel intellectuel qui guide l'IASB dans l'élaboration et la révision des normes, aide les préparateurs à résoudre les situations non couvertes par une norme spécifique, et favorise la cohérence et la logique d'ensemble des IFRS.
        </p>
        <p>
          En cas de silence d'une norme IFRS, le Cadre conceptuel devient un <strong>outil d'arbitrage comptable</strong>. Il permet d'éviter une lecture mécanique des textes et de former un raisonnement comptable professionnel.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les objectifs de l'information financière</h3>
        <p>
          L'objectif principal de l'information financière selon l'IASB est de <strong>fournir une information utile à la prise de décisions économiques</strong>
          <InfoTooltip texte="Cet objectif est exprimé au paragraphe OB2 du Cadre conceptuel : 'L'objectif de l'information financière à usage général est de fournir, au sujet de l'entité présentant l'information financière, des informations utiles aux investisseurs actuels et potentiels, aux prêteurs et aux autres créanciers.'" loi="Cadre conceptuel IASB §OB2" />.
          Cette information doit permettre aux utilisateurs d'évaluer :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>La <strong>situation financière</strong> de l'entité (bilan) ;</li>
          <li>La <strong>performance financière</strong> (compte de résultat et résultat global) ;</li>
          <li>La <strong>capacité de l'entité à générer des flux de trésorerie futurs</strong> (tableau des flux de trésorerie).</li>
        </ul>
        <p>
          L'information financière IFRS est donc <strong>orientée vers l'avenir</strong>, et non uniquement vers le passé. C'est une rupture majeure avec les référentiels de tradition fiscale.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les caractéristiques qualitatives fondamentales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { titre: "Pertinence", desc: "L'information est pertinente si elle est susceptible de faire une différence dans les décisions des utilisateurs. Elle possède une valeur prédictive ou confirmatoire (§QC6-10)." },
            { titre: "Fidélité", desc: "L'information représente fidèlement les phénomènes économiques qu'elle prétend représenter. Elle doit être exhaustive, neutre et exempte d'erreurs (§QC12-16)." },
          ].map((c) => (
            <div key={c.titre} className="rounded-xl border border-sky-200 bg-sky-50/40 p-3">
              <p className="font-semibold text-sky-700 text-xs mb-1">{c.titre}</p>
              <p className="text-xs text-foreground/80">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Les caractéristiques qualitatives d'amplification (comparabilité, vérifiabilité, célérité, intelligibilité) renforcent la pertinence et la fidélité mais ne peuvent pas rendre utile une information qui n'est pas pertinente ou fidèle.
        </p>

        <h3 className="font-bold text-foreground mt-4">Les éléments des états financiers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100">
                <th className="text-left p-2 border border-border font-semibold">Elément</th>
                <th className="text-left p-2 border border-border font-semibold">Définition (Cadre conceptuel IASB)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Actif", "Ressource économique actuelle contrôlée par l'entité du fait d'événements passés (§4.3)."],
                ["Passif", "Obligation actuelle de l'entité de transférer une ressource économique du fait d'événements passés (§4.26)."],
                ["Capitaux propres", "Intérêt résiduel dans les actifs de l'entité après déduction de tous ses passifs (§4.63)."],
                ["Produits", "Augmentations des actifs ou diminutions des passifs qui se traduisent par une augmentation des capitaux propres autre que les apports des détenteurs de droits sur les capitaux propres (§4.68)."],
                ["Charges", "Diminutions des actifs ou augmentations des passifs qui se traduisent par une diminution des capitaux propres autre que les distributions aux détenteurs de droits sur les capitaux propres (§4.69)."],
              ].map(([elem, def], i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                  <td className="p-2 border border-border font-semibold whitespace-nowrap">{elem}</td>
                  <td className="p-2 border border-border">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold text-foreground mt-4">La substance prime sur la forme juridique</h3>
        <p>
          Ce principe est l'un des plus importants du cadre conceptuel. Il signifie que la comptabilité IFRS enregistre la <strong>réalité économique</strong> d'une transaction, et non sa forme juridique apparente.
        </p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-sky-100">
                <th className="text-left p-2 border border-border font-semibold">Logique IFRS</th>
                <th className="text-left p-2 border border-border font-semibold">Logique juridique/fiscale</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Substance économique", "Forme juridique"],
                ["Contrôle", "Propriété"],
                ["Réalité économique", "Document juridique"],
                ["Image fidèle", "Sécurité fiscale"],
              ].map(([ifrs, fisc], i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                  <td className="p-2 border border-border text-sky-700">{ifrs}</td>
                  <td className="p-2 border border-border text-amber-700">{fisc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2">
          Ce principe explique de nombreuses divergences entre IFRS et référentiels nationaux dont SYSCOHADA. Par exemple, un contrat de location-financement (crédit-bail) donne lieu à l'activation d'un actif et d'un passif chez le preneur selon IFRS 16, même si juridiquement l'actif appartient au bailleur.
        </p>

        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 mt-3">
          <p className="text-xs font-semibold text-sky-700 mb-2">Synthèse : ce que permet le cadre conceptuel</p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-sky-800">
            <li>Comprendre la <strong>philosophie globale</strong> des IFRS</li>
            <li>Interpreter correctement les normes</li>
            <li>Eviter une lecture mécanique des textes</li>
            <li>Former un <strong>raisonnement comptable professionnel</strong></li>
            <li>Résoudre les situations non couvertes par une norme spécifique</li>
          </ul>
        </div>
      </div>
    ),
    questions: []
  },
]

// ─────────────────────────────────────────────────────────────────
// QCMs
// ─────────────────────────────────────────────────────────────────
const QUESTIONS_QCM: QCMQuestion[] = [
  {
    type: 'qcm', id: 'q1',
    question: "Selon le Cadre conceptuel de l'IASB, quel est l'objectif principal de l'information financière à usage général ?",
    options: [
      { id: 'a', texte: "Calculer l'assiette fiscale de l'État" },
      { id: 'b', texte: "Fournir une information utile aux investisseurs actuels et potentiels, aux prêteurs et aux autres créanciers pour la prise de décisions" },
      { id: 'c', texte: "Protéger les créanciers en appliquant le principe de prudence" },
      { id: 'd', texte: "Harmoniser les plans comptables nationaux de chaque pays membre de l'ONU" },
      { id: 'e', texte: "Garantir la conformité des états financiers aux règles fiscales nationales" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Cadre conceptuel §OB2 précise que l'objectif de l'information financière à usage général est de fournir des informations utiles aux investisseurs actuels et potentiels, aux prêteurs et autres créanciers pour les aider à prendre des décisions concernant la fourniture de ressources à l'entité.",
    articleRef: "Cadre conceptuel IASB §OB2"
  },
  {
    type: 'qcm', id: 'q2',
    question: "En quelle année l'IASC a-t-il été créé, marquant ainsi le début officiel de la normalisation comptable internationale ?",
    options: [
      { id: 'a', texte: "1929" },
      { id: 'b', texte: "1945" },
      { id: 'c', texte: "1973" },
      { id: 'd', texte: "2001" },
      { id: 'e', texte: "2005" },
    ],
    reponseCorrecte: 'c',
    explication: "L'IASC (International Accounting Standards Committee) a été créé en 1973 par plusieurs organisations professionnelles comptables de pays comme les États-Unis, le Royaume-Uni, la France, l'Allemagne et le Japon. Il a publié les premières normes IAS.",
    articleRef: "Cadre conceptuel IASB 2018 §1.1"
  },
  {
    type: 'qcm', id: 'q3',
    question: "Quelle est la différence fondamentale entre l'IASC et l'IASB ?",
    options: [
      { id: 'a', texte: "L'IASB est un organe gouvernemental tandis que l'IASC était privé" },
      { id: 'b', texte: "L'IASB publie des normes appelées IAS alors que l'IASC publiait des IFRS" },
      { id: 'c', texte: "L'IASB dispose d'une gouvernance renforcée, d'une indépendance accrue et publie des normes plus rigoureuses orientées investisseurs" },
      { id: 'd', texte: "L'IASC n'avait aucun pouvoir de publication de normes" },
      { id: 'e', texte: "L'IASB est placé sous l'autorité de la Banque mondiale" },
    ],
    reponseCorrecte: 'c',
    explication: "En 2001, l'IASC a été réformé en IASB avec une gouvernance renforcée, une indépendance accrue et la publication de normes plus rigoureuses orientées investisseurs. Les nouvelles normes publiées depuis 2001 sont appelées IFRS, tandis que les anciennes IAS restent valables tant qu'elles ne sont pas remplacées.",
    articleRef: "Cadre conceptuel IASB 2018 §1.3"
  },
  {
    type: 'qcm', id: 'q4',
    question: "Quel organe de l'IFRS Foundation publie des interprétations officielles des normes IFRS lorsqu'elles sont ambiguës ?",
    options: [
      { id: 'a', texte: "Le Monitoring Board" },
      { id: 'b', texte: "L'ISSB" },
      { id: 'c', texte: "L'IFRS Advisory Council" },
      { id: 'd', texte: "L'IFRIC (IFRS Interpretations Committee)" },
      { id: 'e', texte: "La SEC américaine" },
    ],
    reponseCorrecte: 'd',
    explication: "L'IFRIC (IFRS Interpretations Committee) publie des interprétations officielles des normes IFRS lorsqu'elles sont ambiguës ou que des pratiques divergentes se développent. Ces interprétations ont la même force juridique que les normes elles-mêmes.",
    articleRef: "Cadre conceptuel IASB 2018 §1.5"
  },
  {
    type: 'qcm', id: 'q5',
    question: "Parmi les affirmations suivantes, laquelle caractérise correctement la logique IFRS par opposition à la logique fiscale du SYSCOHADA ?",
    options: [
      { id: 'a', texte: "Les IFRS privilégient le coût historique et la prudence, le SYSCOHADA la juste valeur" },
      { id: 'b', texte: "Les IFRS sont orientées vers les investisseurs et privilégient la substance économique sur la forme juridique" },
      { id: 'c', texte: "Les IFRS sont une norme de l'Union Africaine imposée aux 17 pays OHADA" },
      { id: 'd', texte: "Les IFRS suppriment totalement la comptabilité fiscale dans les pays qui les adoptent" },
      { id: 'e', texte: "Les IFRS et le SYSCOHADA ont exactement les mêmes principes de reconnaissance des actifs" },
    ],
    reponseCorrecte: 'b',
    explication: "La logique IFRS est fondamentalement orientée vers les investisseurs : elle privilégient la substance économique sur la forme juridique, l'image fidèle, la juste valeur et la vision prospective. Le SYSCOHADA, de tradition continentale, privilégient le coût historique, la prudence et répond d'abord aux besoins de l'État fiscal.",
    articleRef: "Cadre conceptuel IASB 2018 §4"
  },
  {
    type: 'qcm', id: 'q6',
    question: "Combien d'étapes comporte le Due Process officiel de l'IASB pour élaborer une norme IFRS ?",
    options: [
      { id: 'a', texte: "3 étapes" },
      { id: 'b', texte: "4 étapes" },
      { id: 'c', texte: "5 étapes" },
      { id: 'd', texte: "6 étapes" },
      { id: 'e', texte: "8 étapes" },
    ],
    reponseCorrecte: 'd',
    explication: "Le Due Process de l'IASB comporte 6 étapes : (1) Identification du sujet et inscription à l'agenda, (2) Recherche et consultation préliminaire (Discussion Paper), (3) Publication de l'Exposé-Sondage, (4) Analyse des commentaires, (5) Délibérations et vote, (6) Publication de la norme définitive.",
    articleRef: "IFRS Foundation Due Process Handbook"
  },
  {
    type: 'qcm', id: 'q7',
    question: "Selon le Cadre conceptuel de l'IASB, quelle est la définition d'un actif ?",
    options: [
      { id: 'a', texte: "Un bien dont l'entité est propriétaire juridique selon le droit civil applicable" },
      { id: 'b', texte: "Une ressource économique actuelle contrôlée par l'entité du fait d'événements passés" },
      { id: 'c', texte: "Tout bien inscrit à l'actif du bilan selon le plan comptable national" },
      { id: 'd', texte: "Une ressource dont la valeur est supérieure à un seuil de signification fixé par l'IASB" },
      { id: 'e', texte: "Un bien corporel ayant une durée d'utilité supérieure à 12 mois" },
    ],
    reponseCorrecte: 'b',
    explication: "Selon le Cadre conceptuel §4.3 : un actif est 'une ressource économique actuelle contrôlée par l'entité du fait d'événements passés'. Le critère déterminant est le CONTRÔLE, et non la propriété juridique. C'est l'application du principe substance over form.",
    articleRef: "Cadre conceptuel IASB §4.3"
  },
  {
    type: 'qcm', id: 'q8',
    question: "La crise financière de 1929 est souvent qualifiée de crise de l'information comptable. Quelle caractéristique des états financiers de l'époque explique cette qualification ?",
    options: [
      { id: 'a', texte: "Les entreprises appliquaient les IFRS de manière incorrecte" },
      { id: 'b', texte: "Les états financiers étaient non audités, les résultats manipulés et aucune règle commune n'encadrait leur présentation" },
      { id: 'c', texte: "Les gouvernements imposaient des normes comptables trop strictes aux entreprises cotées" },
      { id: 'd', texte: "La SEC refusait de publier les états financiers des entreprises cotées" },
      { id: 'e', texte: "Les entreprises utilisaient exclusivement la méthode LIFO pour valoriser leurs stocks" },
    ],
    reponseCorrecte: 'b',
    explication: "La crise de 1929 était aussi une crise de l'information comptable car les états financiers n'étaient pas audités, les résultats étaient manipulés, il n'existait aucune règle commune et les comptes des entreprises cotées étaient totalement opaques. Les investisseurs ne savaient pas ce qu'ils achetaient.",
    articleRef: "Cadre conceptuel IASB 2018 §2.1"
  },
  {
    type: 'qcm', id: 'q9',
    question: "Qu'est-ce que l'ISSB et quand a-t-il été créé ?",
    options: [
      { id: 'a', texte: "L'International Securities Supervision Board, créé en 1934 pour réguler les marchés après la crise de 1929" },
      { id: 'b', texte: "L'International Sustainability Standards Board, créé en 2021 lors de la COP26 pour développer des normes d'information sur la durabilité" },
      { id: 'c', texte: "Un comité d'experts africains chargé d'adapter les IFRS aux spécificités de l'Afrique subsaharienne" },
      { id: 'd', texte: "L'organe technique chargé de publier les interprétations des normes IFRS (anciennement SIC)" },
      { id: 'e', texte: "L'International Social Standards Board, créé en 2015 dans le cadre des Accords de Paris" },
    ],
    reponseCorrecte: 'b',
    explication: "L'ISSB (International Sustainability Standards Board) a été créé lors de la COP26 à Glasgow en novembre 2021 par la IFRS Foundation. Il a publié ses premières normes IFRS S1 (informations générales sur la durabilité) et IFRS S2 (risques climatiques) en juin 2023. En 2025-2026, plus de 36 juridictions les adoptent.",
    articleRef: "Annonce IFRS Foundation, COP26, novembre 2021"
  },
  {
    type: 'qcm', id: 'q10',
    question: "Selon le Cadre conceptuel de l'IASB, quelle est la caractéristique qualitative FONDAMENTALE de l'information financière (par opposition aux caractéristiques d'amplification) ?",
    options: [
      { id: 'a', texte: "La comparabilité et la vérifiabilité" },
      { id: 'b', texte: "La célérité et l'intelligibilité" },
      { id: 'c', texte: "La pertinence et la représentation fidèle" },
      { id: 'd', texte: "La prudence et le coût historique" },
      { id: 'e', texte: "La conformité fiscale et la légalité" },
    ],
    reponseCorrecte: 'c',
    explication: "Selon le Cadre conceptuel §QC5, les deux caractéristiques qualitatives FONDAMENTALES sont la pertinence (§QC6-10) et la représentation fidèle (§QC12-16). La comparabilité, la vérifiabilité, la célérité et l'intelligibilité sont des caractéristiques d'amplification : elles augmentent l'utilité de l'information mais ne peuvent rendre utile une information qui n'est pas pertinente ou fidèle.",
    articleRef: "Cadre conceptuel IASB §QC5"
  },
  {
    type: 'qcm', id: 'q11',
    question: "En quelle année les IFRS sont-elles devenues obligatoires pour les sociétés cotées en Union européenne ?",
    options: [
      { id: 'a', texte: "2001" },
      { id: 'b', texte: "2003" },
      { id: 'c', texte: "2005" },
      { id: 'd', texte: "2008" },
      { id: 'e', texte: "2010" },
    ],
    reponseCorrecte: 'c',
    explication: "L'Union européenne a rendu l'application des IFRS obligatoire pour les comptes consolidés des sociétés cotées sur un marché réglementé européen à compter des exercices ouverts à partir du 1er janvier 2005. C'est un moment charnière de l'histoire de la normalisation comptable internationale.",
    articleRef: "Règlement CE n° 1606/2002 — Cadre IASB §3.2"
  },
  {
    type: 'qcm', id: 'q12',
    question: "Quel est le rôle exact du Monitoring Board (Conseil de surveillance) dans la gouvernance de l'IASB ?",
    options: [
      { id: 'a', texte: "Rédiger et approuver les normes IFRS en cas de désaccord entre les membres de l'IASB" },
      { id: 'b', texte: "Superviser la gouvernance de la Fondation IFRS, nommer les administrateurs, veiller à l'indépendance de l'IASB — sans intervenir dans le contenu technique des normes" },
      { id: 'c', texte: "Publier les interprétations officielles des normes IFRS (rôle de l'IFRIC)" },
      { id: 'd', texte: "Imposer aux entreprises des sanctions financières en cas de non-respect des IFRS" },
      { id: 'e', texte: "Réviser les exposés-sondages avant leur publication officielle" },
    ],
    reponseCorrecte: 'b',
    explication: "Le Monitoring Board, créé en 2009 après la crise financière, supervise la gouvernance de la Fondation IFRS, nomme et approuve les administrateurs, et veille à l'indépendance de l'IASB. Il NE rédige pas les normes et n'intervient PAS dans les décisions techniques. Sa mission est la légitimité institutionnelle, pas la technicité comptable.",
    articleRef: "Cadre conceptuel IASB 2018 §6.2.5"
  },
]

// ─────────────────────────────────────────────────────────────────
// ETUDES DE CAS
// ─────────────────────────────────────────────────────────────────
const ETUDES_DE_CAS: EtudeDeCasRaw[] = [
  {
    titre: "Cas 1 — La crise informationnelle de 1929 et ses enseignements pour aujourd'hui",
    contexte: "En 1929, les bourses mondiales s'effondrent. L'analyse historique révèle que de nombreuses entreprises cotées aux États-Unis publiaient des états financiers non audités, avec des résultats manipulés et aucune règle commune encadrant leur présentation. Les investisseurs ne pouvaient pas distinguer les entreprises solvables des entreprises en faillite imminente.",
    questions: [
      { num: 1, enonce: "Expliquez en quoi la crise de 1929 était aussi une crise de l'information comptable et non pas uniquement une crise boursière. Quels mécanismes spécifiques liés à l'absence de normalisation comptable ont amplifié la panique financière ?", correction: "La crise de 1929 était aussi une crise de l'information comptable car les entreprises cotées publiaient des états non audités, manipulaient leurs résultats et aucune règle commune n'encadrait la présentation des comptes. Sans information fiable et comparable, les investisseurs ne pouvaient évaluer la solidité réelle des entreprises, ce qui a amplifié la panique lorsque les premières faillites sont survenues. L'absence de normalisation supprimait tout mécanisme d'alerte précoce." },
      { num: 2, enonce: "Quelles réformes institutionnelles américaines ont été adoptées entre 1933 et 1934 en réponse à cette crise ? En quoi ces réformes constituent-elles le fondement de la logique IFRS actuelle ?", correction: "Le Securities Act (1933) a imposé la transparence pour les offres publiques de valeurs mobilières. Le Securities Exchange Act (1934) a créé la SEC (Securities and Exchange Commission) pour réguler les marchés. Ces lois ont fondé trois principes qui sont au cœur de la logique IFRS : protection de l'investisseur comme objectif premier, transparence financière obligatoire, et indépendance des normes comptables vis-à-vis de l'État fiscal." },
      { num: 3, enonce: "Un pays africain membre de l'OHADA connaît aujourd'hui une situation similaire : ses entreprises cotées publient des comptes peu fiables qui découragent l'investissement étranger. Sur la base des enseignements de 1929 et de la logique IFRS, quelles mesures institutionnelles recommanderiez-vous ?", correction: "Sur la base des enseignements de 1929 : (1) Rendre l'audit légal obligatoire pour toutes les sociétés cotées ; (2) Créer un régulateur boursier indépendant (à l'image de la SEC) chargé d'exiger la publication d'états financiers conformes à un référentiel normalisé ; (3) Adopter les IFRS ou un référentiel équivalent pour les sociétés cotées, garantissant la comparabilité internationale ; (4) Former les professionnels comptables et les auditeurs aux nouvelles normes." },
      { num: 4, enonce: "Le Cadre conceptuel de l'IASB affirme que la normalisation comptable internationale n'est 'ni neutre ni purement technique'. Analysez cette affirmation à la lumière de l'histoire de la normalisation et du choix en faveur des marchés financiers et de l'investisseur.", correction: "La normalisation IFRS est le produit d'une histoire économique (essor du capitalisme financier, crise de 1929), d'une crise de confiance (opacité des comptes d'entreprises) et d'un choix idéologique en faveur des marchés financiers. En privilégiant l'investisseur comme utilisateur central, l'IASB a fait un choix politique : la comptabilité au service du marché plutôt qu'au service de l'État fiscal. Ce choix n'est pas neutre — il peut désavantager les pays dont les systèmes financiers sont moins développés et dont les investisseurs domestiques sont moins sophistiqués." },
      { num: 5, enonce: "Le principe 'substance over form' (substance prime sur la forme juridique) est au cœur de la philosophie IFRS. À partir d'exemples concrets tirés de la réalité africaine, montrez comment ce principe peut créer des tensions avec le droit OHADA fondé sur la primauté de la forme juridique.", correction: "Exemples de tensions : (1) Crédit-bail — en OHADA, l'actif appartient juridiquement au bailleur. En IFRS 16, le preneur comptabilise un actif et un passif car il contrôle économiquement l'actif. Tension : l'OHADA ne reconnaît pas cet actif chez le preneur. (2) Cession de créances avec recours — en IFRS 9, si l'entité conserve les risques et avantages, la cession n'est pas reconnue. En droit OHADA, la cession juridique est effective dès la signature. Ces tensions obligent les entreprises à tenir deux jeux de comptes différents selon le référentiel utilisé." }
    ]
  }
]

// ─────────────────────────────────────────────────────────────────
// COMPOSANT QCMBlock (design UE5)
// ─────────────────────────────────────────────────────────────────
function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/30 p-4 space-y-3">
      <p className="text-xs font-semibold text-sky-700">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-sky-500 bg-sky-100 text-sky-800' : 'border-border hover:border-sky-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 text-green-700'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-sky-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-sky-700 transition-colors font-semibold">Vérifier</button>}
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

// ─────────────────────────────────────────────────────────────────
// COMPOSANT CasPratiqueBlock (design UE5)
// ─────────────────────────────────────────────────────────────────
function CasPratiqueBlock({ cp }: { cp: EtudeDeCasRaw }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number | string>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="h-7 w-7 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center shrink-0">C</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
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
                <button
                  onClick={() => setCorrVisible(s => {
                    const n = new Set(s)
                    if (n.has(q.num)) { n.delete(q.num) } else { n.add(q.num) }
                    return n
                  })}
                  className="text-xs text-sky-600 hover:underline font-medium"
                >
                  {corrVisible.has(q.num) ? 'Masquer la correction' : 'Voir la correction'}
                </button>
                {corrVisible.has(q.num) && (
                  <div className="rounded-lg bg-sky-50 border border-sky-200 p-3">
                    <p className="text-xs font-semibold text-sky-700 mb-1">Correction</p>
                    <p className="text-xs text-sky-900 leading-relaxed">{q.correction}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────
export default function UE13Chapitre1Page() {
  const goBack = useGoBack('/ue13-ifrs-ias')
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
            { label: 'UE 13 IFRS / IAS', route: '/ue13-ifrs-ias' },
            { label: 'Chapitre 1' },
          ]}
          color="sky"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Fondements conceptuels, normalisation et architecture IFRS</h1>
          <InfoTooltip texte="Introduction aux normes IFRS/IAS : fondements conceptuels, histoire de la normalisation internationale, architecture institutionnelle de l'IASB et cadre conceptuel." loi="Cadre conceptuel IASB · IFRS Foundation" />
        </div>
        <p className="text-xs text-muted-foreground">Cadre conceptuel IASB · Due Process · IFRS Foundation · ISSB</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QUESTIONS_QCM.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '3h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-sky-600" />
          <span className="text-sm font-semibold text-sky-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Comprendre la nécessité de la normalisation comptable internationale et les limites des référentiels nationaux</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Retracer l'histoire de la normalisation : crise de 1929, création IASC (1973), transformation en IASB (2001)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Distinguer la logique investisseurs (IFRS) de la logique fiscale (SYSCOHADA)</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Identifier les 4 organes de la IFRS Foundation (Monitoring Board, Foundation, IASB, IFRIC) et le role de l'ISSB</span></li>
          <li className="flex items-start gap-2 text-xs text-sky-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-sky-500" /><span>Maitriser le Cadre conceptuel IASB : objectifs, caractéristiques qualitatives, éléments des états financiers, substance over form</span></li>
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-sky-600 text-white border-sky-600' : 'border-border hover:border-sky-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-sky-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-sky-600">Leçon {leconIdx + 1} / {LECONS.length}</span>
              <span className="text-xs text-muted-foreground">{lecon.badge ?? ''}</span>
            </div>
            <h2 className="text-base font-bold text-foreground">{lecon.titre}</h2>
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
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-sky-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-sky-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QUESTIONS_QCM as unknown as QCMChapitre[]} couleurAccent="sky" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} études de cas</h2>
          {ETUDES_DE_CAS.map((cp, i) => <CasPratiqueBlock key={i} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue13-chapitre-1"
              chapitreNom="Chapitre 1 : Fondements conceptuels IFRS"
              questions={QUESTIONS_QCM as unknown as QCMChapitre[]}
              coursId="ue13-ifrs-ias"
              casPratiquesExistants={ETUDES_DE_CAS.map(versCasPratiqueExistant)}
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

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 1
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : Cadre conceptuel IASB 2018 · IFRS Foundation
      </p>
    </div>
  )
}

