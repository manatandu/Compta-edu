import React, { useState, useRef, useEffect } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, FileText, Scale, Flag, MapPin, Users, AlertTriangle,
  ChevronDown, ChevronUp, ChevronRight, RotateCcw, Briefcase, PlusCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import SimulateurConstitution from '@/components/SimulateurConstitution'
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
type CourteQuestion = {
  type: 'courte'
  id: string
  question: string
  reponsesAcceptees: string[]
  correction: string
  articleRef: string
}
type Question = QCMQuestion | CourteQuestion

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
    titre: "L'OHADA et son champ d'application",
    badge: 'Art. 1 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'<strong>Organisation pour l'Harmonisation en Afrique du Droit des Affaires (OHADA)</strong> est une organisation internationale créée par le <strong>Traité de Port-Louis du 17 octobre 1993</strong>. Elle regroupe <strong>17 États membres</strong>, dont la <strong>République Démocratique du Congo</strong> (membre depuis le <strong>12 septembre 2012</strong>).
        </p>
        <p>
          L'objectif fondamental de l'OHADA est d'harmoniser le droit des affaires dans les États membres afin de garantir la sécurité juridique des investissements, de favoriser le développement économique et de créer un espace juridique commun attractif pour les entreprises locales et étrangères. L'instrument central de cette harmonisation est l'<strong>Acte Uniforme</strong>, qui s'applique directement dans tous les États membres sans nécessiter de transposition législative nationale.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 1 al. 1 AUSCGIE (révisé le 30 janvier 2014 à Ouagadougou)</p>
          <p className="italic text-foreground/80">
            « Toute société commerciale, y compris celle dans laquelle un État ou une personne morale de droit public est associé, dont le <strong>siège social</strong><InfoTooltip texte="Le siège social est l'adresse officielle de la société. C'est le critère unique d'application de l'AUSCGIE : si le siège est dans un État OHADA, la société est soumise à l'AUSCGIE, quelle que soit la nationalité des associés." loi="Art. 1 AUSCGIE" /> est situé sur le territoire de l'un des États parties, est soumise aux dispositions du présent Acte uniforme. »
          </p>
        </div>
        <p>
          Le critère d'application retenu par l'AUSCGIE est exclusivement le <strong>siège social</strong>. Ce choix est fondamental : il signifie que la nationalité des associés, la nationalité du gérant, le lieu d'activité principale ou le lieu d'enregistrement fiscal sont sans incidence sur l'applicabilité de l'AUSCGIE. Une société dont le siège est à Kinshasa, même si tous ses associés sont étrangers, est soumise à l'AUSCGIE. À l'inverse, une société dont le siège est à Paris échappe à l'AUSCGIE, même si ses associés sont tous congolais.
        </p>
        <p>
          L'AUSCGIE révisé en 2014 introduit également des règles modernisées adaptées aux réalités du monde des affaires africain : consécration de la société unipersonnelle, introduction des apports en industrie, création de la Société par Actions Simplifiée (SAS), et clarification des pactes d'associés.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Règle fondamentale</th>
                <th className="text-left p-2 border border-border font-semibold">Signification pratique</th>
                <th className="text-left p-2 border border-border font-semibold">Exemple concret</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Critère exclusif : le siège social', 'Seul le lieu du siège détermine l\'application de l\'AUSCGIE, pas la nationalité des associés', 'SARL dont le siège est à Kinshasa : soumise à l\'AUSCGIE même si tous ses associés sont français'],
                ['Sociétés d\'État incluses', 'Les sociétés où l\'État ou une personne morale de droit public est associé sont soumises à l\'AUSCGIE', 'SNEL, REGIDESO, MIBA sont toutes soumises à l\'AUSCGIE'],
                ['Primauté absolue de l\'AUSCGIE', 'L\'AUSCGIE prime sur les lois nationales contraires (Art. 10 Traité OHADA)', 'Une loi congolaise contraire à l\'AUSCGIE est inapplicable dans ce domaine'],
                ['Rôle du droit national', 'Le droit national comble les silences de l\'AUSCGIE mais ne le contredit pas', 'Le droit congolais fixe les détails fiscaux (TVA, IRPP) non traités par l\'AUSCGIE'],
                ['Date d\'application en RDC', 'L\'AUSCGIE s\'applique en RDC depuis le 12 septembre 2012, date d\'adhésion', 'Les sociétés créées avant 2012 ont eu un délai de mise en conformité'],
              ].map(([r, s, e], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{r}</td>
                  <td className="p-2 border border-border">{s}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-900/20 p-3">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">Point clé — L'AUSCGIE est un droit autonome</p>
          <p className="text-xs text-indigo-800 dark:text-indigo-200">
            L'AUSCGIE n'est pas une adaptation du droit français. C'est un droit <strong>autonome et supranational</strong>. En cas de conflit avec une loi congolaise, c'est l'AUSCGIE qui prime. La loi nationale comble les silences : elle ne le contredit pas. La CCJA (Cour Commune de Justice et d'Arbitrage) est la juridiction suprême chargée d'interpréter les Actes Uniformes, avec primauté sur les cours nationales.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-2">La RDC avant et après l'adhésion à l'OHADA</p>
          <p className="text-xs text-muted-foreground mb-2">
            Avant 2012, la RDC appliquait le Décret du Roi des Belges du 27 février 1887 sur les sociétés commerciales, hérité de la période coloniale. Ce texte vieux de plus d'un siècle avait été partiellement modernisé mais restait inadapté aux réalités modernes. L'adhésion à l'OHADA a opéré une rupture fondamentale en substituant un droit des affaires moderne, cohérent et partagé avec 16 autres États africains.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 border border-border">Ancienne forme congolaise (avant 2012)</th>
                  <th className="text-left p-2 border border-border">Équivalent OHADA actuel</th>
                  <th className="text-left p-2 border border-border">Différence principale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SPRL (Société Privée à Responsabilité Limitée)', 'SARL (Société à Responsabilité Limitée)', 'Capital libre en RDC depuis 2014 (arrêté intermin.)'],
                  ['SARL congolaise (Société par Actions à Responsabilité Limitée)', 'SA (Société Anonyme)', 'Capital minimum SA : 10 000 000 FCFA (OHADA)'],
                  ['Société en Nom Collectif (droit belge)', 'SNC OHADA', 'Règles de responsabilité précisées, époux exclus'],
                  ['Pas de SAS en droit congolais', 'SAS (Société par Actions Simplifiée)', 'Innovation de la révision AUSCGIE du 30/01/2014'],
                ].map(([a, b, d], i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="p-2 border border-border">{a}</td>
                    <td className="p-2 border border-border font-medium text-primary">{b}</td>
                    <td className="p-2 border border-border text-muted-foreground">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Les 17 États membres de l'OHADA</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Bénin, Burkina Faso, Cameroun, Centrafrique, Comores, Congo-Brazzaville, Côte d'Ivoire, Gabon, Guinée, Guinée-Bissau, Guinée Équatoriale, Mali, Niger, Sénégal, Tchad, Togo, et <strong>République Démocratique du Congo</strong> (depuis le 12 septembre 2012, 17e État membre).
          </p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l1q1',
        question: 'Quel critère détermine l\'application de l\'AUSCGIE à une société ?',
        options: [
          { id: 'a', texte: 'La nationalité des associés' },
          { id: 'b', texte: 'Le siège social situé dans un État partie' },
          { id: 'c', texte: 'La nationalité du gérant' },
          { id: 'd', texte: 'Le lieu d\'immatriculation des associés' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 1 al. 1 AUSCGIE pose le critère du siège social : toute société dont le siège est dans un État partie est soumise à l\'AUSCGIE, peu importe la nationalité des associés.',
        articleRef: 'Art. 1 al. 1 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l1q2',
        question: 'Depuis quelle date la RDC est-elle membre de l\'OHADA ?',
        options: [
          { id: 'a', texte: '17 octobre 1993' },
          { id: 'b', texte: '30 janvier 2014' },
          { id: 'c', texte: '12 septembre 2012' },
          { id: 'd', texte: '5 mai 2014' },
        ],
        reponseCorrecte: 'c',
        explication: 'La RDC a adhéré à l\'OHADA le 12 septembre 2012. Le 30 janvier 2014 est la date de révision de l\'AUSCGIE à Ouagadougou.',
        articleRef: 'Traité OHADA : Adhésion RDC',
      },
    ],
  },

  {
    id: 'l2',
    icone: <Scale className="h-5 w-5" />,
    titre: 'Définition et éléments constitutifs',
    badge: 'Art. 4–6 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 4 al. 1 AUSCGIE : Définition légale de la société commerciale</p>
          <p className="italic text-foreground/80">
            « La société commerciale est créée par deux (2) ou plusieurs personnes qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter. Les associés s'engagent à contribuer aux pertes. »
          </p>
        </div>
        <p>
          Cette définition légale de l'Art. 4 révèle la nature <strong>contractuelle</strong> de la société commerciale : la société naît d'un accord de volontés entre au moins deux personnes. Mais ce contrat présente des particularités qui le distinguent des contrats ordinaires : il crée une <strong>personne morale nouvelle</strong>, distincte des associés, avec son propre patrimoine, sa propre identité juridique et sa propre capacité d'agir. La société est donc à la fois un <strong>contrat</strong> (accord de volontés) et une <strong>institution</strong> (entité juridique autonome).
        </p>
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 p-4 space-y-3">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase mb-1">Art. 5 AUSCGIE : La société unipersonnelle — exception fondamentale</p>
          <p className="italic text-foreground/80 text-xs">
            « La société peut être constituée par une seule personne dénommée « associé unique », dans les formes prévues par le présent Acte uniforme pour la <strong>SARL, la SA et la SAS</strong>. »
          </p>
          <p className="text-xs text-muted-foreground">
            L'Art. 5 introduit une exception majeure à la définition de l'Art. 4 qui évoque « deux ou plusieurs personnes ». La révision de 2014 a consolidé la société unipersonnelle comme une forme normale et pleinement légale en droit OHADA. Cette évolution reflète la réalité économique : un entrepreneur individuel peut vouloir exercer sous une forme sociale pour bénéficier de la limitation de responsabilité, sans devoir trouver un associé.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-100 dark:bg-indigo-900/30">
                  <th className="p-2 border border-indigo-200 dark:border-indigo-700 text-left text-indigo-800 dark:text-indigo-200">Forme unipersonnelle</th>
                  <th className="p-2 border border-indigo-200 dark:border-indigo-700 text-left text-indigo-800 dark:text-indigo-200">Sigle</th>
                  <th className="p-2 border border-indigo-200 dark:border-indigo-700 text-left text-indigo-800 dark:text-indigo-200">Base légale</th>
                  <th className="p-2 border border-indigo-200 dark:border-indigo-700 text-left text-indigo-800 dark:text-indigo-200">Particularités</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700 font-semibold text-foreground">SARL unipersonnelle</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">SARL-U</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Art. 309 al. 2</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Décisions écrites dans un registre spécial. Conventions sans AGO. Capital libre en RDC.</td>
                </tr>
                <tr className="bg-indigo-50/40 dark:bg-indigo-900/10">
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700 font-semibold text-foreground">SA unipersonnelle</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">SA-U</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Art. 385 al. 2</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Capital minimum 10 000 000 FCFA. L'actionnaire unique tient lieu d'assemblée générale.</td>
                </tr>
                <tr>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700 font-semibold text-foreground">SAS unipersonnelle</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">SASU</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Art. 853-2</td>
                  <td className="p-2 border border-indigo-200 dark:border-indigo-700">Très flexible. Statuts entièrement libres. L'associé unique décide seul de tout.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {([
              { titre: 'Décisions de l\'associé unique', texte: 'Les décisions relevant normalement de l\'assemblée générale sont prises par l\'associé unique seul et consignées par écrit dans un registre spécial (Art. 5 al. 2). Aucune convocation, aucun quorum n\'est requis.' },
              { titre: 'Séparation des patrimoines', texte: 'La personnalité morale est pleinement maintenue dans la société unipersonnelle. Le patrimoine de la société reste distinct de celui de l\'associé unique, sauf abus de la personnalité morale prouvé en justice.' },
              { titre: 'SNC et SCS exclues', texte: 'La SNC et la SCS exigent au moins 2 associés. Leur caractère intuitu personae et la responsabilité solidaire et indéfinie s\'opposent à l\'unipersonnalité.' },
              { titre: 'Réduction à 1 associé en cours de vie', texte: 'Si le nombre d\'associés tombe à 1 (rachat, héritage, exclusion...), la SARL ou SA peut continuer sous forme unipersonnelle sans dissolution automatique (Art. 5 al. 3). Ce délai de régularisation est de 1 an.' },
            ] as { titre: string; texte: string }[]).map((r, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-card border border-border">
                <span className="font-semibold text-xs text-foreground block mb-0.5">{r.titre}</span>
                <span className="text-xs text-muted-foreground">{r.texte}</span>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2.5 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800 dark:text-amber-200"><strong>Formes exclues :</strong> La SNC et la SCS ne peuvent jamais être unipersonnelles. Seules SARL, SA et SAS sont autorisées par l'Art. 5 AUSCGIE.</p>
          </div>
        </div>
        <p className="font-semibold">Les 3 éléments constitutifs cumulatifs de la société :</p>
        <p className="text-xs text-muted-foreground">
          Pour qu'une société existe valablement, trois éléments doivent être réunis simultanément. L'absence de l'un de ces éléments entraîne la nullité de la société ou son requalification en une autre figure juridique (société de fait, société en participation, prêt, association...).
        </p>
        <div className="space-y-3">
          {[
            {
              num: '1°', titre: 'Les apports (Art. 37–50-4)',
              texte: 'Chaque associé doit apporter quelque chose à la société. L\'apport peut prendre trois formes : l\'apport en numéraire (argent), l\'apport en nature (bien meuble ou immeuble, corporel ou incorporel), et l\'apport en industrie (savoir-faire, compétences, travail). L\'apport crée une obligation ferme : le promettant doit effectivement réaliser l\'apport. L\'apport en numéraire s\'effectue par virement sur un compte ouvert au nom de la société en formation. L\'apport en nature exige une évaluation par un commissaire aux apports (Art. 312 pour SARL, Art. 399 pour SA). La libération du capital peut être partielle à la constitution (50% minimum pour la SARL selon Art. 312), le solde devant être libéré dans les 2 ans.',
              alerte: 'L\'apport en industrie n\'entre PAS dans le capital social (Art. 50-2). Les droits de vote et la part aux bénéfices des apporteurs en industrie sont plafonnés à 25%.',
            },
            {
              num: '2°', titre: 'La vocation aux bénéfices ET aux pertes (Art. 4 & 54)',
              texte: 'Tout associé doit avoir vocation à participer aux bénéfices réalisés par la société ET à contribuer aux pertes qu\'elle subit. Cette double participation est indissociable. Une clause qui octroie la totalité des bénéfices à un seul associé, ou qui exonère un associé de toute contribution aux pertes, constitue une clause léonine. La clause léonine est réputée non écrite (Art. 54 al. 2 AUSCGIE), c\'est-à-dire que la société reste valable mais la clause elle-même disparaît du contrat. La répartition peut être inégale (70/30 par exemple) mais jamais totalement unilatérale.',
              alerte: 'Clause léonine = réputée non écrite (Art. 54 al. 2). Elle frappe aussi les pactes d\'associés, pas seulement les statuts.',
            },
            {
              num: '3°', titre: "L'affectio societatis (Art. 4 AUSCGIE)",
              texte: 'L\'affectio societatis est la volonté de chaque associé de collaborer ensemble à une oeuvre commune, dans un intérêt partagé et sur un pied d\'égalité relative. C\'est ce qui distingue l\'associé du salarié (qui travaille sous subordination), du prêteur (qui veut récupérer son argent avec intérêt) et du client. L\'affectio societatis suppose une participation active à la vie sociale, même si elle peut varier en intensité selon la forme sociale. Son absence peut conduire les tribunaux à requalifier le contrat en autre chose (contrat de travail, prêt, association...).',
              alerte: null,
            },
          ].map(el => (
            <div key={el.num} className="rounded-xl border border-border bg-card p-3">
              <p className="font-semibold text-sm text-primary mb-1">{el.num} {el.titre}</p>
              <p className="text-xs text-muted-foreground mb-1">{el.texte}</p>
              {el.alerte && (
                <div className="flex items-start gap-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-2.5 py-1.5 mt-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">{el.alerte}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <p className="font-semibold text-sm mb-2">Clauses relatives aux bénéfices et aux pertes : ce qui est licite ou non</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Type de clause</th>
                <th className="text-left p-2 border border-border">Valide ?</th>
                <th className="text-left p-2 border border-border">Fondement légal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['100% des bénéfices attribués à un seul associé', 'NON : clause léonine', 'Art. 54 al. 2 AUSCGIE'],
                ['100% des pertes supportées par un seul associé', 'NON : clause léonine', 'Art. 54 al. 2 AUSCGIE'],
                ['Associé A = 70%, Associé B = 30% (bénéfices ET pertes)', 'OUI : inégal mais licite', 'Art. 4 & 54 AUSCGIE'],
                ['Premier dividende prioritaire à un apporteur en nature', 'OUI : avantage particulier légalement autorisé', 'Art. 55 AUSCGIE'],
                ['Exonération temporaire d\'un associé novice pendant 2 ans', 'OUI : si elle ne s\'applique pas aux pertes', 'Art. 54 AUSCGIE (interprétation)'],
                ['Clause garantissant à un associé un intérêt fixe quelle que soit la situation', 'NON : assimilée à une clause léonine (intérêt fixe indépendant du résultat)', 'Art. 54 al. 2 AUSCGIE'],
              ].map(([cl, v, f], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border">{cl}</td>
                  <td className={cn('p-2 border border-border font-medium', v.startsWith('OUI') ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>{v}</td>
                  <td className="p-2 border border-border text-muted-foreground">{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Distinction société — autres figures juridiques</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 border border-border">Figure</th>
                  <th className="text-left p-2 border border-border">Apport ?</th>
                  <th className="text-left p-2 border border-border">Partage bénéfices ?</th>
                  <th className="text-left p-2 border border-border">Affectio societatis ?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Société commerciale', 'Oui', 'Oui', 'Oui'],
                  ['Association (loi 1901)', 'Oui (cotisations)', 'NON : but non lucratif', 'Oui'],
                  ['Contrat de travail', 'Non (prestation de service)', 'NON : salaire fixe', 'NON : subordination'],
                  ['Prêt (contrat de crédit)', 'Oui (capital prêté)', 'NON : intérêt fixe', 'NON'],
                  ['Indivision', 'Oui (bien commun)', 'Oui (fruits)', 'Non nécessairement'],
                ].map(([f, a, p, af], i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="p-2 border border-border font-medium">{f}</td>
                    <td className="p-2 border border-border">{a}</td>
                    <td className="p-2 border border-border">{p}</td>
                    <td className="p-2 border border-border">{af}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l2q1',
        question: 'L\'apport en industrie d\'un associé entre-t-il dans le capital social de la société ?',
        options: [
          { id: 'a', texte: 'Oui, au même titre que les apports en numéraire' },
          { id: 'b', texte: 'Non, il n\'entre pas dans le capital social' },
          { id: 'c', texte: 'Oui, mais seulement dans les SARL' },
          { id: 'd', texte: 'Cela dépend des statuts' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 50-2 AUSCGIE est explicite : l\'apport en industrie ne contribue pas à la formation du capital social. L\'associé qui apporte en industrie reçoit des parts sociales, mais celles-ci ne forment pas le capital.',
        articleRef: 'Art. 50-2 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q2',
        question: 'Les statuts de la SARL KINSHASA TRADE prévoient que l\'associé LUMU recevra 100% des bénéfices. Cette clause est :',
        options: [
          { id: 'a', texte: 'Valide si les autres associés l\'acceptent' },
          { id: 'b', texte: 'Valide uniquement pour les SARL' },
          { id: 'c', texte: 'Nulle : clause léonine, réputée non écrite' },
          { id: 'd', texte: 'Valide si elle figure dans un pacte d\'associés' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 54 al. 2 AUSCGIE répute non écrite toute clause attribuant à un associé la totalité du profit. C\'est une clause léonine, nulle que ce soit dans les statuts ou dans un pacte d\'associés.',
        articleRef: 'Art. 54 al. 2 AUSCGIE',
      },
    ],
  },

  {
    id: 'l3',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Les formes sociales reconnues par l\'AUSCGIE',
    badge: 'Art. 270–853 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>L'AUSCGIE reconnaît <strong>5 formes de sociétés commerciales</strong> ainsi que le <strong>Groupement d'Intérêt Économique (GIE)</strong>. En RDC, toutes ces formes sont applicables depuis l'adhésion à l'OHADA le 12 septembre 2012. Le choix de la forme sociale est une décision stratégique fondamentale pour les associés, car elle détermine le régime de responsabilité, les conditions de gouvernance, les formalités constitutives, la fiscalité et la capacité à attirer des capitaux.</p>
        <p>
          L'AUSCGIE classe les sociétés en deux grandes catégories selon la nature des liens entre associés : les <strong>sociétés de personnes</strong>, où l'identité et la qualité personnelle des associés priment, et les <strong>sociétés de capitaux</strong>, où le capital investi est l'élément central et où la personnalité des associés est secondaire.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-2 border border-border text-left">Forme sociale</th>
                <th className="p-2 border border-border text-left">Sigle</th>
                <th className="p-2 border border-border text-left">Catégorie</th>
                <th className="p-2 border border-border text-left">Responsabilité</th>
                <th className="p-2 border border-border text-left">Capital OHADA</th>
                <th className="p-2 border border-border text-left">Capital RDC</th>
                <th className="p-2 border border-border text-left">Associés min.</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Société en Nom Collectif', 'SNC', 'Personnes', 'Indéfinie et solidaire pour tous', 'Libre', 'Libre', '2'],
                ['Société en Commandite Simple', 'SCS', 'Personnes (mixte)', 'Commandités : illimitée / Commanditaires : limitée aux apports', 'Libre', 'Libre', '2 (1 cmd + 1 cmdt)'],
                ['Société à Responsabilité Limitée', 'SARL', 'Capitaux', 'Limitée aux apports', '1 000 000 FCFA (supplétif)', 'Librement fixé', '1 (SARL-U) ou +'],
                ['Société Anonyme', 'SA', 'Capitaux', 'Limitée aux apports', '10 000 000 FCFA (impératif)', '10 000 000 FCFA', '1 (SA-U) ou +'],
                ['Société par Actions Simplifiée', 'SAS', 'Capitaux', 'Limitée aux apports', 'Libre', 'Libre', '1 (SASU) ou +'],
              ].map(([f, s, cat, r, co, cr, am], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{f}</td>
                  <td className="p-2 border border-border font-bold text-primary">{s}</td>
                  <td className="p-2 border border-border text-xs">{cat}</td>
                  <td className="p-2 border border-border text-xs">{r}</td>
                  <td className="p-2 border border-border text-xs">{co}</td>
                  <td className={cn('p-2 border border-border text-xs font-medium', cr.includes('Librement') ? 'text-emerald-700 dark:text-emerald-400' : '')}>{cr}</td>
                  <td className="p-2 border border-border text-xs text-center">{am}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10 p-3">
            <p className="font-semibold text-xs text-rose-700 dark:text-rose-300 mb-1">Sociétés de personnes (intuitu personae)</p>
            <p className="text-xs text-muted-foreground">SNC et SCS : l'identité des associés prime sur le capital. La cession de parts exige l'agrément unanime de tous les associés. Le décès, la faillite ou l'incapacité d'un associé peut entraîner la dissolution. La responsabilité des commandités de la SCS et de tous les associés de la SNC est indéfinie et solidaire : les créanciers peuvent saisir le patrimoine personnel des associés.</p>
          </div>
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 p-3">
            <p className="font-semibold text-xs text-blue-700 dark:text-blue-300 mb-1">Sociétés de capitaux</p>
            <p className="text-xs text-muted-foreground">SARL, SA et SAS : le capital investi prime. La responsabilité est limitée aux apports de chaque associé. Les créanciers ne peuvent pas saisir le patrimoine personnel des associés au-delà de leur apport. La cession de parts (SARL) ou d'actions (SA, SAS) est plus libre. Ces formes conviennent aux projets nécessitant des capitaux importants et à la protection du patrimoine personnel.</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Art. 6 AUSCGIE : Caractère commercial déterminé par la forme ou l'objet</p>
          <p className="text-xs text-muted-foreground mb-2">L'Art. 6 AUSCGIE établit deux voies pour qu'une société soit commerciale :</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="bg-card rounded-lg border border-border p-2.5">
              <p className="text-xs font-semibold mb-1">1. Commercialité par la forme</p>
              <p className="text-xs text-muted-foreground">SNC, SCS, SARL, SA et SAS sont <strong>toujours commerciales</strong>, quelle que soit leur activité. Même un cabinet d'avocats constitué en SARL est une société commerciale. La forme l'emporte sur la nature de l'activité.</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-2.5">
              <p className="text-xs font-semibold mb-1">2. Commercialité par l'objet</p>
              <p className="text-xs text-muted-foreground">Une société civile peut devenir commerciale si son objet est commercial (achat-revente, prestation de services commerciaux...). Exemple : une société civile immobilière (SCI) n'est pas commerciale par sa forme, mais le devient si elle fait du commerce de biens.</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10 p-3">
          <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 mb-2">Le GIE (Groupement d'Intérêt Économique) : forme particulière</p>
          <p className="text-xs text-muted-foreground">Le GIE n'est pas une société commerciale au sens strict. C'est un groupement créé entre personnes physiques ou morales pour mettre en commun des moyens en vue de faciliter leur activité respective. Le GIE ne vise pas la réalisation de bénéfices pour lui-même mais la réduction des coûts ou l'amélioration des résultats de ses membres. Il est traité en détail au Chapitre 6.</p>
        </div>
        <div className="overflow-x-auto">
          <p className="font-semibold text-xs mb-2">Comparatif des formes sociales : critères de choix pratiques</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Critère de choix</th>
                <th className="text-left p-2 border border-border">Forme recommandée</th>
                <th className="text-left p-2 border border-border">Raison</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Protection du patrimoine personnel', 'SARL, SA ou SAS', 'Responsabilité limitée aux apports'],
                ['Simplicité et faible capital', 'SARL (capital libre en RDC)', 'Peu de formalités, pas de minimum légal en RDC'],
                ['Accès aux marchés boursiers', 'SA', 'Seule forme pouvant faire appel public à l\'épargne'],
                ['Grande flexibilité statutaire', 'SAS', 'Statuts entièrement libres, gouvernance personnalisable'],
                ['Relations de confiance entre partenaires', 'SNC', 'Adaptation aux petites structures familiales ou entre amis'],
                ['Projet associant investisseurs et gestionnaires', 'SCS', 'Commandités gèrent, commanditaires financent'],
              ].map(([crit, f, r], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{crit}</td>
                  <td className="p-2 border border-border text-primary font-semibold">{f}</td>
                  <td className="p-2 border border-border text-muted-foreground">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10 p-3">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">Approfondissement par forme</p>
          <p className="text-xs text-muted-foreground">Ce tableau est un aperçu introductif. Chaque forme est étudiée en profondeur dans les chapitres dédiés : <strong>Ch. 3</strong> (SNC et SCS), <strong>Ch. 4</strong> (SA et SAS), <strong>Ch. 5</strong> (SARL), <strong>Ch. 6</strong> (GIE).</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l3q1',
        question: 'Parmi les formes suivantes, laquelle peut avoir un associé unique en droit OHADA ?',
        options: [
          { id: 'a', texte: 'La SNC' },
          { id: 'b', texte: 'La SCS' },
          { id: 'c', texte: 'La SARL' },
          { id: 'd', texte: 'Toutes les formes' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 5 AUSCGIE autorise la société unipersonnelle uniquement dans 3 formes : SARL (SARL-U), SA (SA-U) et SAS (SAS-U ou SASU). La SNC et la SCS exigent au moins 2 associés.',
        articleRef: 'Art. 5 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l3q2',
        question: 'Une SARL qui exerce une activité civile (ex. cabinet d\'avocats) est-elle commerciale ?',
        options: [
          { id: 'a', texte: 'Non, car son activité est civile' },
          { id: 'b', texte: 'Oui, car la SARL est commerciale par sa forme' },
          { id: 'c', texte: 'Cela dépend du montant de son capital' },
          { id: 'd', texte: 'Oui, seulement si elle le déclare au RCCM' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 6 AUSCGIE dispose que le caractère commercial est déterminé par la forme ou par l\'objet. Une SARL est TOUJOURS commerciale par sa forme, même si elle exerce une activité civile.',
        articleRef: 'Art. 6 AUSCGIE',
      },
    ],
  },

  {
    id: 'l4',
    icone: <Flag className="h-5 w-5" />,
    titre: 'Réformes RDC : capital libre et statuts simplifiés',
    badge: 'Arrêté 30/12/2014',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La révision de l'AUSCGIE du 30 janvier 2014 à Ouagadougou a introduit une règle fondamentale à l'Art. 311 : le capital minimum d'un million FCFA pour la SARL est désormais <strong>supplétif</strong> (applicable par défaut) et non plus impératif. Cela signifie que les États membres peuvent s'en écarter par une disposition nationale. La RDC a saisi cette opportunité pour moderniser radicalement son droit de la création d'entreprise.
        </p>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10 p-4">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase mb-2">Art. 311 AUSCGIE révisé 2014 : Capital SARL supplétif</p>
          <p className="italic text-foreground/80 text-xs">
            « <strong>Sauf dispositions nationales contraires</strong>, le capital social doit être d'un million (1 000 000) de francs CFA au moins. »
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-2 font-medium">
            Le million FCFA n'est plus impératif depuis 2014 : les États peuvent s'en écarter par une loi ou un décret national.
          </p>
        </div>
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20 p-4">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase mb-2">
            Arrêté interministériel RDC n° 002 et n° 243 du 30 décembre 2014
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Pris conjointement par le Ministère de la Justice et le Ministère des PME, cet arrêté a libéralisé la création de SARL en RDC avec <strong>3 innovations majeures</strong> qui facilitent l'accès à l'entrepreneuriat formel :
          </p>
          <div className="space-y-2">
            {[
              {
                n: '1',
                t: 'Capital librement fixé par les associés',
                d: 'Art. 2 de l\'Arrêté : « Le capital social de la SARL unipersonnelle ou pluripersonnelle est librement fixé par les associés en tenant compte de l\'objet social. » La RDC n\'a fixé aucun minimum légal. Les associés fixent le capital qu\'ils jugent approprié à leur activité, même symbolique. Cette réforme vise à encourager l\'entrepreneuriat formel et à sortir les PME du secteur informel.',
              },
              {
                n: '2',
                t: 'Statuts sous seing privé expressément admis',
                d: 'Les statuts d\'une SARL en RDC peuvent être rédigés et signés directement par les associés, sans intervention d\'un notaire. L\'acte sous seing privé est pleinement légal et opposable. Le recours au notaire reste possible mais est entièrement facultatif. Cette réforme réduit le coût de création d\'entreprise (les honoraires notariaux pouvaient représenter plusieurs centaines de dollars).',
              },
              {
                n: '3',
                t: 'Preuve de libération du capital simplifiée',
                d: 'Un simple bordereau de versement bancaire acquitté suffit désormais comme preuve de la libération du capital social. L\'attestation notariale de dépôt des fonds, auparavant requise, n\'est plus obligatoire. Cette simplification supprime une étape coûteuse et bureaucratique tout en maintenant la traçabilité bancaire.',
              },
            ].map(item => (
              <div key={item.n} className="flex items-start gap-2.5 bg-white dark:bg-muted/20 rounded-lg p-2.5 border border-border">
                <span className="h-5 w-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0">{item.n}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{item.t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <p className="font-semibold text-sm mb-2">Comparatif du capital minimum SARL dans l'espace OHADA</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-2 border border-border text-left">Pays</th>
                <th className="p-2 border border-border text-left">Capital minimum SARL</th>
                <th className="p-2 border border-border text-left">Base légale</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['OHADA (règle supplétive)', '1 000 000 FCFA', 'Art. 311 AUSCGIE révisé 2014'],
                ['RDC', 'Librement fixé : AUCUN minimum légal', 'Arrêté intermin. n° 002 & 243 du 30/12/2014'],
                ['Cameroun', '100 000 FCFA', 'Loi camerounaise'],
                ['Côte d\'Ivoire', 'Aucun minimum', 'Loi ivoirienne post-2014'],
                ['Gabon', '100 000 FCFA', 'Loi gabonaise'],
                ['Sénégal', 'Aucun minimum', 'Réforme sénégalaise post-2014'],
                ['Togo', 'Aucun minimum', 'Réforme togolaise'],
              ].map(([pays, cap, base], i) => (
                <tr key={i} className={cn('even:bg-muted/20', pays === 'RDC' ? 'bg-emerald-50/70 dark:bg-emerald-900/20 font-bold' : '')}>
                  <td className="p-2 border border-border">{pays}</td>
                  <td className={cn('p-2 border border-border', pays === 'RDC' ? 'text-emerald-700 dark:text-emerald-400' : '')}>{cap}</td>
                  <td className="p-2 border border-border text-muted-foreground">{base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Important : capital libre ne signifie pas capital nul</p>
          <p className="text-xs text-muted-foreground">
            Même si la loi congolaise ne fixe pas de minimum, les associés doivent fixer un capital <strong>adapté à l'objet social</strong>. Un capital symbolique (ex. 1 CDF) pour une société qui emprunte plusieurs millions peut engager la responsabilité des fondateurs pour insuffisance de capital (abus de personnalité morale). Dans la pratique, les banques, les fournisseurs et les partenaires examinent le capital comme indicateur de solvabilité.
          </p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l4q1',
        question: 'Quel est le capital minimum légal d\'une SARL en RDC depuis l\'arrêté du 30 décembre 2014 ?',
        options: [
          { id: 'a', texte: '1 000 000 FCFA comme dans tout l\'espace OHADA' },
          { id: 'b', texte: '500 000 FCFA' },
          { id: 'c', texte: 'Librement fixé par les associés : aucun minimum légal' },
          { id: 'd', texte: '100 000 FCFA' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 2 de l\'Arrêté interministériel n° 002 & n° 243 du 30/12/2014 dispose que le capital social de la SARL est « librement fixé par les associés en tenant compte de l\'objet social ». La RDC n\'a fixé aucun minimum légal.',
        articleRef: 'Arrêté intermin. RDC n° 002 & n° 243 du 30/12/2014',
      },
      {
        type: 'qcm',
        id: 'l4q2',
        question: 'En RDC, les statuts d\'une SARL doivent-ils obligatoirement être authentifiés par un notaire ?',
        options: [
          { id: 'a', texte: 'Oui, toujours' },
          { id: 'b', texte: 'Non, le recours au notaire est facultatif depuis 2014' },
          { id: 'c', texte: 'Oui, sauf pour les SARL unipersonnelles' },
          { id: 'd', texte: 'Non, jamais : les statuts notariés sont interdits en RDC' },
        ],
        reponseCorrecte: 'b',
        explication: 'Depuis l\'Arrêté interministériel du 30/12/2014, les statuts d\'une SARL en RDC peuvent être établis par acte sous seing privé (sans notaire) ou par acte notarié. Le choix appartient aux associés.',
        articleRef: 'Arrêté intermin. RDC : Art. 1',
      },
    ],
  },

  {
    id: 'l5',
    icone: <MapPin className="h-5 w-5" />,
    titre: 'Créer une société en RDC : les 9 étapes officielles',
    badge: 'GUCE · Décret n° 14/014',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La création d'une société en République Démocratique du Congo est centralisée au travers du <strong>Guichet Unique de Création d'Entreprise (GUCE)</strong>, instauré par le <strong>Décret n° 14/014 du 8 mai 2014</strong>. Le GUCE est un service public autonome placé sous la tutelle du Ministère de la Justice. Sa mission est de regrouper en un seul lieu toutes les formalités administratives liées à la création d'entreprise, permettant ainsi au créateur d'obtenir en un seul dépôt tous les documents requis (RCCM, NIF, identité nationale, numéros INSS, INPP, ONEM et autorisation environnementale).
        </p>
        <p>
          Avant la création du GUCE, la création d'entreprise en RDC nécessitait des démarches auprès de multiples administrations (tribunal de commerce, administration fiscale, ministère du travail, ministère de l'environnement...), ce qui prenait plusieurs semaines voire plusieurs mois. Le GUCE a réduit ce délai à <strong>3 jours ouvrables maximum</strong>.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-1">Le GUCE en pratique</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 border border-border">Type d'entreprise</th>
                  <th className="text-left p-2 border border-border">Coût officiel</th>
                  <th className="text-left p-2 border border-border">Délai légal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SARL/SAS/SA (statuts notariés)', '80 USD', '3 jours ouvrables'],
                  ['SARL/SAS (statuts sous seing privé)', '70 USD', '3 jours ouvrables'],
                  ['Établissement (entreprise individuelle)', '30 USD', '3 jours ouvrables'],
                ].map(([t, c, d], i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="p-2 border border-border">{t}</td>
                    <td className="p-2 border border-border font-semibold text-primary">{c}</td>
                    <td className="p-2 border border-border font-semibold text-emerald-700 dark:text-emerald-400">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Siège principal :</strong> Avenue de la Science, Gombe, Kinshasa<br />
            <strong>Antennes provinciales :</strong> Lubumbashi, Goma, Bukavu, Matadi, Mbuji-Mayi
          </p>
        </div>
        <div className="space-y-2">
          {[
            {
              n: 1, t: 'Choix de la forme juridique et vérification du nom',
              d: 'Choisir la forme sociale adaptée (SARL, SAS, SA...) et vérifier la disponibilité de la dénomination sociale au RCCM. Le nom doit être unique, non déjà utilisé par une autre société immatriculée. Il est possible d\'effectuer cette vérification directement au GUCE ou en ligne sur les plateformes du Ministère de la Justice.'
            },
            {
              n: 2, t: 'Rédaction des statuts',
              d: 'Les statuts doivent obligatoirement contenir (Art. 13 AUSCGIE) : la forme sociale, la dénomination sociale, la nature et le domaine de l\'activité (objet social), le siège social, la durée (maximum 99 ans), l\'identité des associés, le montant du capital, les apports de chaque associé, les droits de vote, les règles de répartition des bénéfices et des pertes, les organes de direction et d\'administration. En RDC, les statuts peuvent être rédigés sous seing privé (sans notaire) ou par acte notarié.'
            },
            {
              n: 3, t: 'Ouverture d\'un compte bancaire et dépôt du capital',
              d: 'Ouvrir un compte en banque au nom de la société en formation dans un établissement agréé par la BCC (Rawbank, Equity Bank, TMB, BCDC, UBA, Ecobank...). Déposer le capital souscrit et libéré. Pour les SARL, la loi autorise la libération partielle (50% minimum à la souscription selon Art. 312 AUSCGIE). Le bordereau de versement bancaire acquitté sert de preuve de libération (réforme 2014 : plus besoin d\'attestation notariale).'
            },
            {
              n: 4, t: 'Constitution du dossier administratif',
              d: 'Constituer un dossier complet comprenant : lettre de demande d\'immatriculation, statuts (4 exemplaires), bordereau bancaire de dépôt des fonds, procès-verbal de l\'assemblée constitutive, formulaire unique GUCE dûment rempli, pièces d\'identité des associés et gérants, 2 photos d\'identité récentes du gérant, justificatif de domiciliation du siège social (titre de propriété ou contrat de bail).'
            },
            {
              n: 5, t: 'Dépôt du dossier au GUCE et paiement',
              d: 'Dépôt physique du dossier au guichet. L\'agent GUCE vérifie immédiatement la complétude du dossier et la disponibilité du nom au RCCM. Paiement des frais (70 ou 80 USD selon la nature des statuts). Un reçu de dépôt est délivré, indiquant la date de retrait des documents (3 jours ouvrables maximum).'
            },
            {
              n: 6, t: 'Délivrance des documents officiels (dans 3 jours ouvrables)',
              d: 'Le GUCE délivre en une seule fois tous les documents constitutifs : le RCCM (qui confère la personnalité juridique, Art. 98 AUSCGIE), le NIF (Numéro d\'Identification Fiscale, délivré par la DGI), l\'identité nationale économique, le numéro INSS, le numéro INPP, le numéro ONEM, et l\'autorisation environnementale de base. C\'est le principe du guichet unique : un seul dépôt, tous les documents en un seul retrait.'
            },
            {
              n: 7, t: 'Publication au Journal Officiel',
              d: 'Dans les 30 jours suivant l\'immatriculation (Art. 262 AUSCGIE), les sociétés doivent publier un avis au Journal Officiel de la RDC. Cette publication assure l\'opposabilité aux tiers des mentions essentielles (dénomination, objet, siège, capital, identité des dirigeants). Sans cette publication, la société ne peut pas opposer son existence aux tiers.'
            },
            {
              n: 8, t: 'Inscription CNSS (si la société emploie des salariés)',
              d: 'L\'inscription à la Caisse Nationale de Sécurité Sociale (CNSS) est une démarche distincte, effectuée hors GUCE, dans les 15 jours suivant l\'embauche du premier salarié. Le taux de cotisation employeur est d\'environ 13% du salaire brut (cotisation accidents du travail, retraite, allocations familiales). Les cotisations salariales sont d\'environ 5% du salaire brut.'
            },
            {
              n: 9, t: 'Agréments sectoriels spécifiques (si nécessaire)',
              d: 'Certains secteurs d\'activité réglementés nécessitent des autorisations ou agréments spécifiques obtenus auprès d\'autorités de régulation sectorielles, indépendamment du GUCE : secteur bancaire (BCC), mines et carrières (CAMI), douane (DGDA), médias (CSAC), pharmacie (Ministère de la Santé), transports (OCC, RVA...). Ces agréments doivent être obtenus avant le démarrage de l\'activité.'
            },
          ].map(etape => (
            <div key={etape.n} className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-2.5">
              <span className="h-6 w-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{etape.n}</span>
              <div>
                <p className="text-xs font-semibold text-foreground">{etape.t}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{etape.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Documents délivrés par le GUCE (tout en un seul retrait)</p>
          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            {[
              'RCCM (personnalité juridique, Art. 98 AUSCGIE)',
              'NIF (Numéro d\'Identification Fiscale — DGI)',
              'ID Nat (identité nationale économique)',
              'Numéro INSS (Sécurité Sociale)',
              'Numéro INPP (Institut Nat. de Préparation Prof.)',
              'Numéro ONEM (Office Nat. de l\'Emploi)',
              'Autorisation environnementale de base',
            ].map(d => (
              <div key={d} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l5q1',
        question: 'Quel est le délai légal maximum pour créer une entreprise au GUCE en RDC ?',
        options: [
          { id: 'a', texte: '7 jours ouvrables' },
          { id: 'b', texte: '30 jours calendaires' },
          { id: 'c', texte: '3 jours ouvrables' },
          { id: 'd', texte: '24 heures' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 18 al. 3 de la loi GUCE fixe un délai maximum de 3 jours ouvrables à compter du dépôt du dossier complet. Ce délai est obligatoire pour le GUCE.',
        articleRef: 'Art. 18 al. 3 : Loi GUCE / Décret n° 14/014 du 08/05/2014',
      },
      {
        type: 'qcm',
        id: 'l5q2',
        question: 'Quel document officiel confère à une société sa personnalité juridique en RDC ?',
        options: [
          { id: 'a', texte: 'Les statuts notariés' },
          { id: 'b', texte: 'Le NIF délivré par la DGI' },
          { id: 'c', texte: 'Le RCCM : immatriculation au Registre du Commerce' },
          { id: 'd', texte: 'L\'autorisation du Ministère du Commerce' },
        ],
        reponseCorrecte: 'c',
        explication: 'L\'Art. 98 AUSCGIE dispose que la société acquiert la personnalité juridique à compter de son immatriculation au RCCM. Les statuts peuvent exister avant, mais la société n\'existe légalement qu\'à partir du RCCM.',
        articleRef: 'Art. 98 AUSCGIE',
      },
    ],
  },

  {
    id: 'l6',
    icone: <Users className="h-5 w-5" />,
    titre: 'Pactes d\'associés et conventions extra-statutaires',
    badge: 'Art. 2-1 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          Les pactes d'associés, également appelés <strong>conventions extra-statutaires</strong> ou <strong>shareholders' agreements</strong>, sont des accords conclus entre tout ou partie des associés d'une société, en dehors des statuts et sans que leur contenu soit nécessairement rendu public. L'Art. 2-1 AUSCGIE, introduit par la révision de 2014, consacre expressément leur existence et leur licéité en droit OHADA, ce qui représente une avancée importante par rapport à l'ancienne version de l'AUSCGIE qui ne les mentionnait pas.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 2-1 AUSCGIE (introduit par la révision du 30/01/2014)</p>
          <p className="italic text-foreground/80 text-xs">
            « Les associés peuvent conclure des conventions extra-statutaires en vue d'organiser : les relations entre associés ; la composition des organes sociaux ; la conduite des affaires de la société ; l'accès au capital ; la transmission des titres sociaux. »
          </p>
        </div>
        <p>
          Le pacte d'associés est un outil de gouvernance privée. Il permet aux associés de définir des règles de fonctionnement interne plus détaillées ou plus flexibles que ce que les statuts permettent, tout en préservant la confidentialité de ces arrangements. Il est particulièrement utile dans les sociétés fermées (SARL, SAS) où les relations entre associés sont étroites et où des enjeux spécifiques de contrôle, de sortie ou de protection des minoritaires doivent être encadrés.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Caractéristique</th>
                <th className="text-left p-2 border border-border">Règle applicable</th>
                <th className="text-left p-2 border border-border">Implication pratique</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Forme', 'Libre : aucune formalité imposée par l\'AUSCGIE', 'Peut être rédigé par les associés eux-mêmes, sans notaire ni avocat obligatoire'],
                ['Confidentialité', 'Non publié au RCCM ni au Journal Officiel', 'Le contenu reste secret, opposable uniquement entre les signataires'],
                ['Durée', 'Librement fixée par les parties', 'Peut être à durée déterminée (ex. 5 ans) ou indéterminée avec clause de résiliation'],
                ['Objets courants', 'Droit de préemption, tag-along, drag-along, lock-up, ratchet, non-concurrence, gouvernance', 'Permet d\'organiser les sorties, les droits des minoritaires, les conditions d\'entrée de nouveaux investisseurs'],
                ['Limite impérative', 'Ne peut pas déroger aux règles IMPÉRATIVES de l\'AUSCGIE', 'Une clause léonine dans un pacte est nulle (Art. 54), comme dans les statuts'],
                ['Opposabilité à la société', 'Inopposable à la société et aux tiers si non intégré aux statuts', 'En cas de violation, seule la responsabilité civile des signataires est engagée (pas de nullité de l\'acte)'],
              ].map(([c, r, i], idx) => (
                <tr key={idx} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{c}</td>
                  <td className="p-2 border border-border">{r}</td>
                  <td className="p-2 border border-border text-muted-foreground">{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Principales clauses des pactes d'associés</p>
          <div className="space-y-2">
            {[
              { nom: 'Droit de préemption', def: 'Un associé qui souhaite céder ses parts doit d\'abord les proposer aux autres signataires du pacte, qui peuvent les acquérir en priorité aux mêmes conditions.' },
              { nom: 'Tag-along (droit de suite)', def: 'Si un associé majoritaire cède ses parts à un tiers, les associés minoritaires ont le droit de vendre leurs parts aux mêmes conditions (protection des minoritaires).' },
              { nom: 'Drag-along (clause de sortie forcée)', def: 'L\'associé majoritaire peut obliger les minoritaires à céder leurs parts lors d\'une cession de la majorité à un tiers investisseur (facilite les opérations de M&A).' },
              { nom: 'Lock-up (clause d\'inaliénabilité)', def: 'Engagement d\'un associé de ne pas céder ses parts pendant une période déterminée (ex. 3 ans), pour stabiliser l\'actionnariat.' },
              { nom: 'Non-concurrence', def: 'Un associé fondateur ou sortant s\'engage à ne pas exercer une activité concurrente pendant une durée et dans un périmètre géographique définis.' },
              { nom: 'Gouvernance', def: 'Organisation de la représentation au conseil d\'administration ou de surveillance, droit de nommer certains directeurs, droit de veto sur des décisions stratégiques.' },
            ].map((clause, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-card border border-border">
                <p className="text-xs font-semibold text-foreground">{clause.nom}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{clause.def}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold mb-2">Pacte d'associés vs Statuts</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Statuts :</strong> publics (RCCM), opposables à tous, règles fondamentales de la société</span></div>
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Pacte :</strong> confidentiel, opposable seulement entre signataires, règles de gouvernance privée</span></div>
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>En cas de conflit :</strong> les statuts prévalent sur le pacte vis-à-vis des tiers</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 p-3">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Limite : les règles impératives de l'AUSCGIE</p>
            <p className="text-xs text-muted-foreground">
              Un pacte ne peut pas déroger aux règles impératives de l'AUSCGIE. Par exemple : un pacte qui attribue 100% des bénéfices à un seul associé est nul (clause léonine, Art. 54). Un pacte qui interdit à un associé de participer aux décisions collectives viole le droit de vote (Art. 125). Ces clauses sont réputées non écrites.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-900/20 p-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            Un pacte d'associés qui attribue la totalité des bénéfices à un seul associé est <strong>nul</strong> même s'il est dans un document externe aux statuts : l'Art. 54 al. 2 s'applique à tout acte relatif à la société, pas seulement aux statuts. La violation d'un pacte ne rend pas nul l'acte accompli (ex. la cession de parts réalisée en violation du droit de préemption reste valable), mais engage la responsabilité civile du violateur envers les autres signataires.
          </p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l6q1',
        question: 'Un pacte d\'associés est-il opposable à la société elle-même ?',
        options: [
          { id: 'a', texte: 'Oui, toujours' },
          { id: 'b', texte: 'Oui, s\'il est signé par le gérant' },
          { id: 'c', texte: 'Non, sauf s\'il est intégré aux statuts' },
          { id: 'd', texte: 'Non, jamais' },
        ],
        reponseCorrecte: 'c',
        explication: 'Les pactes d\'associés sont des conventions extra-statutaires : ils lient les signataires entre eux mais ne sont pas opposables à la société ni aux tiers, sauf si leurs clauses sont reprises dans les statuts.',
        articleRef: 'Art. 2-1 AUSCGIE',
      },
    ],
  },

  {
    id: 'l7',
    icone: <AlertTriangle className="h-5 w-5" />,
    titre: 'Nullité des sociétés',
    badge: 'Art. 74-1 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La nullité d'une société est une sanction juridique grave qui entraîne la dissolution et la liquidation de la société. Conscient de l'impact économique et social d'une telle sanction, l'AUSCGIE a adopté une position restrictive : <strong>la nullité est d'interprétation stricte</strong>. Elle ne peut être prononcée que dans les cas expressément prévus par l'AUSCGIE lui-même ou par les textes régissant la nullité des contrats en général.
        </p>
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Art. 74-1 AUSCGIE : Principe de légalité de la nullité</p>
          <p className="italic text-foreground/80 text-xs">
            « La nullité d'une société ne peut résulter que d'une disposition expresse du présent Acte uniforme ou des textes régissant la nullité des contrats en général. »
          </p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-2">
            Principe de faveur pour la validité : la nullité est d'interprétation STRICTE. Les juges ne peuvent pas inventer de nouvelles causes de nullité.
          </p>
        </div>
        <p>
          Ce principe de légalité signifie que le juge ne peut prononcer la nullité d'une société que si une disposition expresse de l'AUSCGIE ou du droit commun des contrats le prévoit. Les simples irrégularités de forme ne suffisent pas à entraîner la nullité. L'AUSCGIE préfère la régularisation à l'annulation. Cette approche favorise la sécurité juridique des transactions commerciales.
        </p>
        <div className="overflow-x-auto">
          <p className="font-semibold text-xs mb-2">Causes de nullité expressément prévues par l'AUSCGIE :</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Article AUSCGIE</th>
                <th className="text-left p-2 border border-border">Cause de nullité</th>
                <th className="text-left p-2 border border-border">Explication</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Art. 7 & 8', 'Incapacité d\'un associé', 'Mineur non émancipé, majeur sous tutelle ou curatelle, interdit judiciaire associé dans une forme à responsabilité illimitée'],
                ['Art. 9', 'Époux dans une société à responsabilité indéfinie et solidaire', 'Les époux ne peuvent être associés dans une SNC ou comme commandités dans une SCS (voir tableau ci-dessous)'],
                ['Art. 20', 'Objet social illicite', 'L\'objet social est contraire à l\'ordre public, aux bonnes moeurs ou à une prohibition légale (ex. commerce de drogues, société de blanchiment)'],
                ['Art. 37 al. 1', 'Absence totale d\'apport d\'un associé', 'Un associé n\'a fait aucun apport (ni numéraire, ni nature, ni industrie) : l\'élément fondamental fait défaut'],
                ['Art. 40', 'Apport d\'un bien hors commerce', 'Apport d\'un bien qui ne peut pas faire l\'objet d\'une transaction commerciale (bien du domaine public, chose future incertaine...)'],
                ['Art. 54 al. 2', 'Clause léonine (nullité de la clause, pas de la société)', 'La clause est nulle mais la société reste valide. Exception : si la clause est l\'essence même du contrat'],
              ].map(([a, c, e], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-red-600 dark:text-red-400">{a}</td>
                  <td className="p-2 border border-border font-medium">{c}</td>
                  <td className="p-2 border border-border text-muted-foreground">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p className="font-semibold text-xs mb-2">Règles sur les époux associés (Art. 9 AUSCGIE) :</p>
          <p className="text-xs text-muted-foreground mb-2">
            L'Art. 9 AUSCGIE interdit aux époux d'être associés dans une même société lorsque la responsabilité est indéfinie et solidaire, pour protéger l'ensemble du patrimoine familial. Cependant, cette interdiction est limitée aux formes à responsabilité illimitée pour les deux conjoints.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 border border-border">Forme sociale</th>
                  <th className="text-left p-2 border border-border">Époux admis ?</th>
                  <th className="text-left p-2 border border-border">Raison</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SNC', 'NON : Art. 9 interdit expressément', 'Tous les associés de la SNC sont indéfiniment et solidairement responsables (Art. 270)'],
                  ['SCS : les deux époux comme commandités', 'NON', 'Les commandités ont une responsabilité indéfinie et solidaire'],
                  ['SCS : un époux commandité, l\'autre commanditaire', 'OUI', 'Le commanditaire n\'est responsable qu\'à hauteur de ses apports (responsabilité limitée)'],
                  ['SCS : les deux époux comme commanditaires', 'OUI', 'Les commanditaires ont une responsabilité limitée aux apports'],
                  ['SARL, SA, SAS', 'OUI dans toutes ces formes', 'La responsabilité est limitée aux apports dans ces trois formes'],
                ].map(([f, e, r], i) => (
                  <tr key={i} className="even:bg-muted/20">
                    <td className="p-2 border border-border font-medium">{f}</td>
                    <td className={cn('p-2 border border-border font-medium', e.startsWith('OUI') ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>{e}</td>
                    <td className="p-2 border border-border text-muted-foreground">{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Conséquences de la nullité d'une société</p>
          <p className="text-xs text-muted-foreground mb-2">
            La nullité d'une société est une nullité particulière : elle ne produit pas d'effet rétroactif absolu comme la nullité d'un contrat ordinaire. L'AUSCGIE a prévu des règles spéciales pour protéger les tiers de bonne foi et assurer la continuité des affaires :
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>La société est <strong>dissoute</strong> à compter de la décision judiciaire et entre en <strong>liquidation</strong></li>
            <li>La nullité <strong>n'est pas rétroactive</strong> : les actes accomplis avant la décision de nullité restent valables</li>
            <li>Les actes antérieurs restent <strong>opposables aux tiers de bonne foi</strong> qui ignoraient le vice<InfoTooltip texte="Un tiers de bonne foi est celui qui ignorait la nullité de la société et ne pouvait pas raisonnablement le savoir. La nullité ne lui est pas opposable : les actes accomplis avant la dissolution restent valables à son égard." loi="Art. 74-1 AUSCGIE" /></li>
            <li>La nullité <strong>ne peut pas être invoquée</strong> par les associés qui en connaissaient la cause au moment de la constitution</li>
            <li>L'action en nullité se prescrit par <strong>3 ans</strong> à compter de l'immatriculation (Art. 77)</li>
            <li>Avant que la nullité soit définitive, toute irrégularité peut être couverte par <strong>régularisation</strong> (Art. 75)</li>
          </ul>
        </div>
        <div className="overflow-x-auto">
          <p className="font-semibold text-xs mb-2">Distinction nullité de la société / nullité d'une délibération</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Type de nullité</th>
                <th className="text-left p-2 border border-border">Cause</th>
                <th className="text-left p-2 border border-border">Conséquence</th>
                <th className="text-left p-2 border border-border">Prescription</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Nullité de la société', 'Vice à la constitution (Art. 74-1)', 'Dissolution et liquidation', '3 ans (Art. 77)'],
                ['Nullité d\'une délibération d\'assemblée', 'Violation de l\'AUSCGIE ou des statuts', 'Annulation de la décision seulement', '2 mois en général'],
                ['Nullité d\'un acte de gestion', 'Excès de pouvoir du dirigeant', 'Inopposabilité aux tiers de bonne foi', 'Droit commun'],
              ].map(([t, c, con, p], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{t}</td>
                  <td className="p-2 border border-border">{c}</td>
                  <td className="p-2 border border-border">{con}</td>
                  <td className="p-2 border border-border text-muted-foreground">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm' as const,
        id: 'l7q1',
        question: 'Les époux MUTOMBO veulent créer une SNC à Kinshasa. Cette association est-elle possible ?',
        options: [
          { id: 'a', texte: 'Oui, les époux peuvent s\'associer dans toutes les formes' },
          { id: 'b', texte: 'Non : la SNC expose les associés à une responsabilité indéfinie et solidaire, interdite entre époux' },
          { id: 'c', texte: 'Oui, si leur capital est supérieur à 1 000 000 FCFA' },
          { id: 'd', texte: 'Oui, uniquement si un seul époux est gérant' },
        ],
        reponseCorrecte: 'b',
        explication: 'L\'Art. 9 AUSCGIE interdit aux époux d\'être associés dans une société où ils seraient tenus des dettes indéfiniment et solidairement. Or la SNC rend tous les associés indéfiniment et solidairement responsables (Art. 270). La SNC entre époux est nulle (Art. 74-1).',
        articleRef: 'Art. 9 & 270 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l7q2',
        question: 'Lorsqu\'une société est déclarée nulle, quelles sont les conséquences sur les actes accomplis avant la nullité ?',
        options: [
          { id: 'a', texte: 'Tous les actes sont annulés rétroactivement' },
          { id: 'b', texte: 'Les actes restent opposables aux tiers de bonne foi' },
          { id: 'c', texte: 'Les actes sont suspendus jusqu\'à liquidation' },
          { id: 'd', texte: 'Les dirigeants remboursent toutes les dettes' },
        ],
        reponseCorrecte: 'b',
        explication: 'La nullité d\'une société ne rétroagit pas comme une nullité contractuelle ordinaire. Les actes antérieurs à la nullité restent opposables aux tiers de bonne foi : cela protège les partenaires commerciaux qui ignoraient le vice.',
        articleRef: 'Art. 74-1 & suivants AUSCGIE',
      },
    ],
  },

  {
    id: 'l9',
    icone: <BookOpen className="h-5 w-5" />,
    titre: 'Durée, apports en industrie et responsabilité des fondateurs',
    badge: 'Art. 28-36, 50-1 à 50-4, 73-80 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 p-4">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase mb-1">Objectif de cette leçon</p>
          <p className="text-xs text-muted-foreground">Comprendre les règles AUSCGIE sur la durée des sociétés (Art. 28 à 36), les apports en industrie introduits par la révision 2014 (Art. 50-1 à 50-4), et la responsabilité des fondateurs (Art. 73 à 80).</p>
        </div>

        <p className="font-semibold text-sm">A. Durée de la société (Art. 28 à 36 AUSCGIE)</p>

        <p className="text-xs text-muted-foreground">
          La durée de la société est une mention obligatoire des statuts (Art. 13 AUSCGIE). Elle représente la période pendant laquelle la société est destinée à exister. L'AUSCGIE encadre cette durée pour éviter les sociétés perpétuelles ou sans terme défini, tout en permettant des prorogations successives.
        </p>

        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Durée maximale et point de départ : Art. 28-29</p>
          <p className="text-xs text-muted-foreground">L'Art. 28 AUSCGIE dispose : <em>« La durée de la société ne peut excéder <strong>quatre-vingt-dix-neuf (99) ans</strong>. »</em></p>
          <p className="text-xs text-muted-foreground mt-1.5">Cette limite de 99 ans est absolue : aucune dérogation statutaire n'est possible. Le point de départ de la durée est la <strong>date d'immatriculation au RCCM</strong> (Art. 29), sauf disposition contraire expresse de l'AUSCGIE. Une société dont les statuts prévoient 99 ans est donc valable jusqu'à la date correspondante calculée à partir de son immatriculation, et non à partir de la signature des statuts.</p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-2">Arrivée du terme, prorogation et protection des associés : Art. 30-36</p>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Art. 30</strong> : L'arrivée du terme entraîne la dissolution de plein droit, sauf prorogation préalablement décidée avant l'expiration. Si les associés oublient de proroger, la société est dissoute automatiquement à la date prévue.</span></div>
            <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Art. 32-33</strong> : La durée peut être prorogée une ou plusieurs fois, chaque prorogation étant décidée dans les conditions prévues pour la modification des statuts (majorité requise selon la forme sociale).</span></div>
            <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Art. 34</strong> : La prorogation <strong>n'entraîne pas création d'une nouvelle personne morale</strong>. La société prorogée conserve sa personnalité juridique, ses actifs, ses dettes, ses contrats et ses sûretés. Pas besoin de refaire une immatriculation.</span></div>
            <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Art. 35</strong> : Les organes compétents doivent être consultés <strong>un an au moins avant la date d'expiration</strong> pour se prononcer sur la prorogation. Ce délai permet d'éviter les oublis et les dissolutions imprévues.</span></div>
            <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0 font-bold">•</span><span><strong>Art. 36</strong> : Si les organes n'ont pas été consultés dans ce délai d'un an, tout associé peut saisir le tribunal pour demander la désignation d'un mandataire ad hoc chargé de provoquer cette consultation. Ce droit protège les associés minoritaires contre l'inaction des dirigeants.</span></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <p className="font-semibold text-xs mb-2">Tableau récapitulatif : durée et prorogation</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Article</th>
                <th className="text-left p-2 border border-border">Règle</th>
                <th className="text-left p-2 border border-border">Sanction si non respectée</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Art. 28', 'Durée maximale : 99 ans', 'Disposition nulle si durée supérieure (ramènement à 99 ans)'],
                ['Art. 29', 'Point de départ : date d\'immatriculation RCCM', 'Calcul incorrect de la durée'],
                ['Art. 30', 'Expiration = dissolution de plein droit', 'La société n\'existe plus légalement : tous les actes postérieurs sont inopposables'],
                ['Art. 35', 'Consultation 1 an avant expiration obligatoire', 'Tout associé peut saisir le juge pour désigner un mandataire ad hoc (Art. 36)'],
                ['Art. 34', 'Prorogation sans nouvelle personnalité morale', 'Pas de re-immatriculation nécessaire'],
              ].map(([a, r, s], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-blue-600 dark:text-blue-400">{a}</td>
                  <td className="p-2 border border-border">{r}</td>
                  <td className="p-2 border border-border text-muted-foreground">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold text-sm">B. Apports en industrie : innovation de la révision 2014 (Art. 50-1 à 50-4)</p>

        <p className="text-xs text-muted-foreground">
          La révision de l'AUSCGIE du 30 janvier 2014 a introduit pour la première fois un régime légal complet des apports en industrie. Avant 2014, l'apport en industrie existait dans la pratique mais sans cadre juridique précis dans l'AUSCGIE. Désormais, les Art. 50-1 à 50-4 fixent clairement les droits et obligations des apporteurs en industrie.
        </p>

        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">Définition de l'apport en industrie (Art. 50-1)</p>
          <p className="text-xs text-muted-foreground">Les apports en industrie sont constitués par la <strong>mise à disposition effective de connaissances techniques, de compétences professionnelles ou de services</strong> au profit de la société. Exemples : un expert-comptable qui apporte son savoir-faire en comptabilité, un ingénieur qui apporte son expertise technique, un commercial qui apporte son réseau de clients. L'apport en industrie est interdit dans les SA (Art. 50-1 al. 2).</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold mb-2">Obligations de l'apporteur en industrie (Art. 50-2)</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0">•</span><span>Il doit fournir effectivement à la société la <strong>prestation promise</strong> (compétence, savoir-faire, service)</span></div>
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0">•</span><span>Il doit <strong>rendre compte de tous les gains réalisés</strong> dans l'exercice de l'activité objet de son apport pendant la durée de la société</span></div>
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0">•</span><span>Les statuts doivent préciser : la durée de l'apport, le nombre de titres attribués, les droits attachés et les modalités en cas de cessation</span></div>
              <div className="flex items-start gap-2"><span className="text-blue-500 shrink-0">•</span><span>En cas d'inexécution, la société peut exclure l'apporteur selon les modalités statutaires</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold mb-2">Caractéristiques des titres issus d'apport en industrie (Art. 50-3 et 50-4)</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2"><span className="text-rose-500 shrink-0">•</span><span><strong>Ne concourent PAS</strong> à la formation du capital social (Art. 50-3)</span></div>
              <div className="flex items-start gap-2"><span className="text-rose-500 shrink-0">•</span><span>Droits de vote <strong>limités à 25%</strong> de l'ensemble des droits de vote (Art. 50-3)</span></div>
              <div className="flex items-start gap-2"><span className="text-rose-500 shrink-0">•</span><span>Part dans bénéfices, actif net et pertes <strong>plafonnée à 25%</strong> (Art. 50-3)</span></div>
              <div className="flex items-start gap-2"><span className="text-rose-500 shrink-0">•</span><span><strong>Non cessibles ni transmissibles</strong> : ils s'éteignent si l'apporteur cesse son activité (Art. 50-4)</span></div>
              <div className="flex items-start gap-2"><span className="text-rose-500 shrink-0">•</span><span><strong>Pas de valeur nominale</strong> : ils ne représentent pas une quote-part du capital (Art. 50-4)</span></div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <p className="font-semibold text-xs mb-2">Comparatif des trois types d'apports</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Critère</th>
                <th className="text-left p-2 border border-border">Apport en numéraire</th>
                <th className="text-left p-2 border border-border">Apport en nature</th>
                <th className="text-left p-2 border border-border">Apport en industrie</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Objet', 'Argent (espèces ou virement)', 'Bien meuble ou immeuble', 'Travail, compétences, savoir-faire'],
                ['Entre dans le capital ?', 'OUI', 'OUI (après évaluation)', 'NON (Art. 50-3)'],
                ['Évaluation requise ?', 'Non (valeur nominale)', 'Oui : commissaire aux apports (SARL/SA)', 'Non (valeur non monétaire)'],
                ['Cessible ?', 'Oui (parts sociales ordinaires)', 'Oui (parts sociales ordinaires)', 'NON (Art. 50-4)'],
                ['Droits de vote', 'Proportionnels aux parts', 'Proportionnels aux parts', 'Max 25% des droits de vote'],
                ['Formes admises', 'Toutes formes', 'Toutes formes', 'Toutes sauf SA (Art. 50-1)'],
              ].map(([c, n, na, i], idx) => (
                <tr key={idx} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{c}</td>
                  <td className="p-2 border border-border">{n}</td>
                  <td className="p-2 border border-border">{na}</td>
                  <td className={cn('p-2 border border-border', i.startsWith('NON') ? 'text-red-600 dark:text-red-400 font-medium' : i.startsWith('OUI') ? 'text-emerald-700 dark:text-emerald-400 font-medium' : '')}>{i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold text-sm">C. Responsabilité des fondateurs (Art. 73 à 80 AUSCGIE)</p>

        <p className="text-xs text-muted-foreground">
          Les fondateurs et les premiers membres des organes de gestion portent une responsabilité particulière dans la constitution de la société. L'AUSCGIE leur impose des obligations spécifiques et les soumet à des régimes de responsabilité rigoureux pour garantir que la société est constituée conformément à la loi.
        </p>

        <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10 p-3">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 mb-2">Déclaration de régularité et de conformité (Art. 73)</p>
          <p className="text-xs text-muted-foreground">Les fondateurs et les premiers membres des organes de gestion, d'administration et de direction doivent déposer au RCCM une <strong>déclaration de régularité et de conformité</strong> attestant que la constitution a été réalisée conformément aux dispositions de l'AUSCGIE. Cette déclaration est exigée <strong>à peine de rejet de la demande d'immatriculation</strong>. Elle engage personnellement ses signataires qui certifient la régularité de la constitution.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Article</th>
                <th className="text-left p-2 border border-border">Règle</th>
                <th className="text-left p-2 border border-border">Sanction / Portée</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Art. 73', 'Déclaration de régularité déposée au RCCM à la constitution', 'Rejet de l\'immatriculation si absente. Responsabilité personnelle des signataires.'],
                ['Art. 73-1', 'Même obligation en cas de modification des statuts (augmentation de capital, changement de forme...)', 'Identique à Art. 73 : déclaration obligatoire à chaque modification.'],
                ['Art. 75', 'Action en régularisation possible par tout intéressé ou le ministère public', 'Priorité à la régularisation sur la nullité : le tribunal peut accorder un délai.'],
                ['Art. 77', 'Prescription de l\'action en nullité : 3 ans', 'Délai calculé à compter de l\'immatriculation ou de la publication de la modification irrégulière.'],
                ['Art. 78', 'Fondateurs solidairement responsables du préjudice causé par un défaut de mention obligatoire ou une irrégularité de constitution', 'Responsabilité civile personnelle et solidaire. Peut concerner tous les fondateurs.'],
                ['Art. 79', 'Dirigeants en fonction lors d\'une modification irrégulière des statuts : même responsabilité que les fondateurs', 'Extension aux dirigeants : pas seulement les fondateurs initiaux.'],
                ['Art. 80', 'Prescription de l\'action en responsabilité contre les fondateurs et dirigeants : 3 ans', 'Délai calculé à compter de l\'immatriculation ou de la publication de la modification.'],
              ].map(([a, r, s], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold text-blue-600 dark:text-blue-400">{a}</td>
                  <td className="p-2 border border-border text-muted-foreground">{r}</td>
                  <td className="p-2 border border-border text-muted-foreground">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-1">Art. 72 AUSCGIE : Protection absolue des associés contre l'augmentation de leurs engagements</p>
          <p className="text-xs text-muted-foreground">L'Art. 72 al. 2 dispose : <em>« En aucun cas, les engagements d'un associé ne peuvent être augmentés sans le consentement de celui-ci. »</em></p>
          <p className="text-xs text-muted-foreground mt-1.5">Cette règle fondamentale signifie qu'une décision collective ne peut jamais imposer à un associé des charges supplémentaires sans son accord personnel exprès, quelle que soit la majorité réunie. Exemple : une AGE ne peut pas décider d'imposer des appels de fonds supplémentaires aux associés sans l'accord unanime. Toute clause contraire dans les statuts est nulle.</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l9q1',
        question: 'Quelle est la durée maximale d\'une société commerciale selon l\'AUSCGIE ?',
        options: [
          { id: 'a', texte: '50 ans' },
          { id: 'b', texte: '75 ans' },
          { id: 'c', texte: '99 ans (Art. 28 AUSCGIE)' },
          { id: 'd', texte: 'Illimitée si les statuts ne fixent pas de terme' },
        ],
        reponseCorrecte: 'c',
        explication: 'Art. 28 AUSCGIE : la durée de la société ne peut excéder 99 ans. Elle doit être mentionnée dans les statuts. Son point de départ est la date d\'immatriculation au RCCM (Art. 29). Elle peut être prorogée une ou plusieurs fois (Art. 32).',
        articleRef: 'Art. 28 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l9q2',
        question: 'Les apports en industrie dans une SARL peuvent-ils être cédés ?',
        options: [
          { id: 'a', texte: 'Oui, librement, comme toute part sociale' },
          { id: 'b', texte: 'Oui, avec accord unanime des associés' },
          { id: 'c', texte: 'Non : les titres issus d\'un apport en industrie ne sont ni cessibles ni transmissibles (Art. 50-4)' },
          { id: 'd', texte: 'Oui, à condition que le cessionnaire assume aussi l\'obligation de service' },
        ],
        reponseCorrecte: 'c',
        explication: 'Art. 50-4 AUSCGIE : les titres sociaux résultant d\'apports en industrie ne sont ni cessibles ni transmissibles. Ils n\'ont pas de valeur nominale. Ils s\'éteignent si l\'apporteur cesse son activité.',
        articleRef: 'Art. 50-4 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l9q3',
        question: 'Les droits de vote attachés aux titres issus d\'apports en industrie ne peuvent pas dépasser :',
        options: [
          { id: 'a', texte: '10% de l\'ensemble des droits de vote' },
          { id: 'b', texte: '25% de l\'ensemble des droits de vote (Art. 50-3)' },
          { id: 'c', texte: '50% de l\'ensemble des droits de vote' },
          { id: 'd', texte: 'Aucune limite : les statuts fixent librement' },
        ],
        reponseCorrecte: 'b',
        explication: 'Art. 50-3 AUSCGIE : les droits de vote attachés aux titres issus d\'apports en industrie ne peuvent être supérieurs à 25% de l\'ensemble des droits de vote. La part dans les bénéfices, l\'actif net et les pertes est aussi plafonnée à 25%.',
        articleRef: 'Art. 50-3 AUSCGIE',
      },
    ],
  },

  {
    id: 'l8',
    icone: <Briefcase className="h-5 w-5" />,
    titre: 'Simulateur : Constituer votre société',
    badge: 'Outil pratique interactif',
    contenu: (
      <div className="space-y-3">
        <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-3">
          <p className="text-xs text-indigo-800 dark:text-indigo-200 font-semibold mb-1">Comment utiliser ce simulateur ?</p>
          <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1 list-disc list-inside">
            <li>Choisissez votre forme sociale et votre pays de constitution</li>
            <li>Renseignez les mentions obligatoires des statuts (Art. 1 à 5 AUSCGIE)</li>
            <li>Ajoutez vos associés et leurs apports (numéraire, nature, industrie)</li>
            <li>Obtenez un récapitulatif complet avec vérification de conformité légale</li>
          </ul>
        </div>
        <SimulateurConstitution />
      </div>
    ),
    questions: [],
  },
]

const QCM_GLOBAL: QCMQuestion[] = LECONS.flatMap(l =>
  l.questions.filter((q): q is QCMQuestion => q.type === 'qcm')
)

const ETUDES_DE_CAS: CasPratiqueEtude[] = [
  {
    id: 'ec1',
    titre: 'La société KINSHASA TRADING',
    contexte: 'Trois personnes d\'affaires souhaitent créer une société commerciale à Kinshasa pour l\'importation de marchandises. Elles se demandent quelle forme sociale choisir et quelles sont les obligations légales.',
    questions: [
      { num: 1, enonce: 'Quelles sont les formes de sociétés commerciales reconnues par l\'AUSCGIE ?', correction: 'Art. 6 AUSCGIE : SNC, SCS, SARL, SA et SAS. La SARL peut être unipersonnelle.' },
      { num: 2, enonce: 'Quels sont les trois éléments constitutifs d\'une société ?', correction: 'Art. 4 AUSCGIE : (1) apports, (2) vocation aux bénéfices et pertes, (3) affectio societatis.' },
      { num: 3, enonce: 'La personnalité morale naît-elle dès la signature des statuts ?', correction: 'Non. Art. 98 : elle naît à l\'immatriculation au RCCM.' },
    ],
    articleRef: 'Art. 1 à 6, 98 AUSCGIE',
  },
  {
    id: 'ec2',
    titre: 'L\'affectio societatis en question',
    contexte: 'Deux entreprises partagent à égalité les bénéfices d\'une opération commune sans avoir signé de statuts. L\'une conteste l\'existence d\'une société.',
    questions: [
      { num: 1, enonce: 'Une société peut-elle exister sans statuts écrits ?', correction: 'Oui. Art. 4 : la société de fait existe dès que les trois éléments constitutifs sont réunis.' },
      { num: 2, enonce: 'L\'affectio societatis est-il présent dans ce cas ?', correction: 'Oui. L\'apport paritaire et le partage égal témoignent de l\'intention de collaborer sur un pied d\'égalité.' },
    ],
    articleRef: 'Art. 4 AUSCGIE',
  },
]

interface CasPratiqueEtude {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
  articleRef: string
}

function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/10 p-4 space-y-3">
      <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' : 'border-border hover:border-indigo-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-indigo-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-indigo-700 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-lg p-2.5 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300')}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
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
          <span className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">C{cp.id.replace('ec','')}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
            <p className="text-xs text-muted-foreground">{cp.articleRef}</p>
          </div>
        </div>
        <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-90')} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">Contexte</p>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Question {q.num} : {q.enonce}</p>
                {corrVisible.has(q.num) ? (
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Correction</p>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">{q.correction}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrVisible(s => new Set([...s, q.num]))} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function UE2Chapitre1Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
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
            { label: 'UE 2 — Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 1' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">La société commerciale</h1>
          <InfoTooltip texte="La société commerciale en droit OHADA" loi="Art. 1 à 6 AUSCGIE" />
        </div>
        <p className="text-xs text-muted-foreground">Art. 1 à 107 AUSCGIE : Traité OHADA 1993 : Droit RDC</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '4h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Maîtriser le champ d'application de l'AUSCGIE et le critère du siège social (Art. 1)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Identifier les 3 éléments constitutifs d'une société : apports, vocation aux résultats, affectio societatis (Art. 4)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Distinguer les 5 formes sociales OHADA et leurs caractéristiques comparatives (Art. 270 à 853)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Appliquer les réformes RDC sur le capital libre de la SARL (Arrêté 30/12/2014)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Maîtriser les 9 étapes de création d'une société au GUCE en RDC (Décret 14/014)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700 dark:text-indigo-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Comprendre les pactes d'associés, la nullité des sociétés et la responsabilité des fondateurs</span></li>
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-indigo-600 text-white border-indigo-600' : 'border-border hover:border-indigo-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-indigo-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Leçon {leconIdx + 1} / {LECONS.length}</span>
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
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-indigo-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-indigo-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="indigo" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} exercices</h2>
          {ETUDES_DE_CAS.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre-1"
              chapitreNom="Chapitre 1 : La société commerciale"
              questions={QCM_GLOBAL}
              coursId="ue2-droit-societes"
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

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 1
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : AUSCGIE révisé 30/01/2014 à Ouagadougou · Traité OHADA du 17/10/1993 · Arrêté intermin. RDC n° 002 et n° 243 du 30/12/2014 · Décret n° 14/014 du 08/05/2014
      </p>
    </div>
  )
}
