import { useState } from 'react'
import { Percent, ArrowLeftRight, ShieldCheck, FileWarning } from 'lucide-react'
import { Section, Depliant, Exemple, ARetenir, Ref, PageDeCours } from './coursHelpers'

const SOUS = [
  { id: 'mecanisme', label: 'Mécanisme général' },
  { id: 'taux', label: 'Taux & exonérations' },
  { id: 'obligations', label: 'Facture & déduction' },
  { id: 'remboursement', label: 'Crédit & remboursement' },
] as const

export default function NotesCoursTVA() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('mecanisme')

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-rose-600 text-white border-rose-600' : 'bg-background text-muted-foreground border-border/60 hover:border-rose-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <PageDeCours aRetenir={[
        "La TVA est collectée à chaque stade, mais l'assujetti ne reverse que la valeur ajoutée qu'il a lui-même créée (TVA collectée − TVA déductible).",
        'Taux normal de 16%, taux réduits de 5% et 1% selon la liste réglementaire des biens et services concernés (LF 2026).',
        'Le droit à déduction dépend de la facture normalisée et du circuit DEF — une facture non conforme n\'ouvre pas droit à déduction.',
        'Un crédit de TVA structurel (exportateur, investissement lourd) peut faire l\'objet d\'un remboursement plutôt que d\'un simple report.',
      ]}>
      {actif === 'mecanisme' && (
        <Section titre="Un impôt sur la dépense, à paiements fractionnés" icon={ArrowLeftRight}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            La TVA n'est pas supportée par l'entreprise assujettie : elle est collectée sur chaque vente auprès du client, et son poids économique final retombe sur le consommateur. L'entreprise n'est qu'un collecteur intermédiaire pour le Trésor, mais chaque maillon de la chaîne ne reverse que la <strong>valeur ajoutée</strong> qu'il a lui-même créée, grâce au mécanisme de déduction.
          </p>
          <Exemple>
            <p>Un grossiste achète des marchandises 1 000 000 FC HT (TVA déductible 160 000 FC au taux de 16%) et les revend 1 500 000 FC HT (TVA collectée 240 000 FC).</p>
            <p><strong>TVA nette due = 240 000 − 160 000 = 80 000 FC</strong>, soit 16% de la valeur ajoutée (500 000 FC) qu'il a effectivement créée sur cette opération.</p>
          </Exemple>
          <ARetenir>
            <p>Si la TVA déductible excède la TVA collectée sur une période, l'assujetti dispose d'un <strong>crédit de TVA</strong> : il ne paie rien ce mois-là, et le crédit est reporté (ou, sous conditions, remboursé — voir plus bas).</p>
          </ARetenir>
        </Section>
      )}

      {actif === 'taux' && (
        <Section titre="Taux applicables et champ des exonérations" icon={Percent}>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-center">
              <p className="text-lg font-bold text-rose-700">16%</p>
              <p className="text-[10px] text-rose-600">Taux normal</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-center">
              <p className="text-lg font-bold text-amber-700">5%</p>
              <p className="text-[10px] text-amber-600">Taux réduit</p>
            </div>
            <div className="rounded-lg border border-sky-200 bg-sky-50 p-2.5 text-center">
              <p className="text-lg font-bold text-sky-700">1%</p>
              <p className="text-[10px] text-sky-600">Taux super-réduit</p>
            </div>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Taux réduits fixés par la Loi de Finances 2026, en baisse par rapport au taux réduit unique de 8% appliqué antérieurement — vérifier la liste précise des biens et services concernés avant d'appliquer un taux réduit à un cas donné.</Ref>
          </p>
          <Depliant titre="Exonérations : par position tarifaire, pas par catégorie générale">
            <p>Une exonération de TVA ne se décrète jamais « au doigt mouillé » à partir du nom générique d'un produit : elle est toujours rattachée à une position tarifaire précise dans une liste réglementaire (par exemple certains équipements agricoles ou certains intrants pharmaceutiques). Deux produits d'apparence similaire peuvent avoir un traitement différent selon leur classification tarifaire exacte.</p>
          </Depliant>
          <Depliant titre="Suspensions sectorielles temporaires">
            <p>Au-delà des exonérations permanentes, certains secteurs (aviation, produits de première nécessité, ciment/immobilier, secteur pétrolier/minier) ont bénéficié de suspensions temporaires de TVA à l'importation ou à la vente. Chaque dispositif a sa propre échéance : ne jamais présumer qu'une suspension observée une année reste valable l'année suivante sans vérification.</p>
          </Depliant>
        </Section>
      )}

      {actif === 'obligations' && (
        <Section titre="Facture normalisée et droit à déduction" icon={ShieldCheck}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le droit à déduction de la TVA payée en amont n'est pas automatique : il est conditionné par la possession d'une <strong>facture normalisée</strong>, conforme au modèle et aux mentions obligatoires fixés par l'Administration, et transmise selon le circuit de la Déclaration Électronique de la Facture (DEF).
          </p>
          <ARetenir>
            <p>Une TVA figurant sur une facture non conforme (mentions manquantes, hors circuit DEF) n'ouvre pas droit à déduction, même si la dépense elle-même est par ailleurs justifiée et engagée dans l'intérêt de l'entreprise.</p>
          </ARetenir>
        </Section>
      )}

      {actif === 'remboursement' && (
        <Section titre="Crédit de TVA : report ou remboursement" icon={FileWarning}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Un crédit de TVA structurel (entreprise exportatrice, activité fortement capitalistique en phase d'investissement) peut, sous conditions, faire l'objet d'une demande de <strong>remboursement</strong> plutôt que d'un simple report indéfini sur les déclarations suivantes.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Cette procédure de remboursement est distincte de la réclamation contentieuse de droit commun (voir le chapitre Procédures fiscales) : elle suit ses propres délais et justificatifs, propres au régime de la TVA.
          </p>
          <Exemple>
            <p><strong>Cas d'un exportateur.</strong> Une entreprise achète 8 000 000 FC HT de matières premières (TVA déductible 1 280 000 FC au taux de 16%) qu'elle transforme puis exporte intégralement. Les exportations sont taxées au taux de 0% (le client étranger ne supporte aucune TVA congolaise) : la TVA collectée du mois est donc nulle.</p>
            <p><strong>Crédit du mois = 1 280 000 FC.</strong> Comme cette entreprise n'aura structurellement jamais de TVA collectée suffisante pour absorber ce crédit (son activité principale est exportée), elle a intérêt à demander le remboursement plutôt que d'accumuler un report qui ne s'épongera jamais.</p>
          </Exemple>
          <Depliant titre="Pourquoi le report ne suffit pas toujours">
            <p>Le report du crédit sur les déclarations suivantes n'est une solution satisfaisante que pour une entreprise dont l'activité alterne des mois de crédit et des mois de TVA nette à payer (saisonnalité des ventes, gros investissement ponctuel). Pour une entreprise structurellement exportatrice ou fortement capitalistique sur une longue période, le crédit s'accumulerait indéfiniment sans jamais être absorbé — d'où l'existence d'une procédure de remboursement dédiée, avec ses propres pièces justificatives (factures d'achat, preuves d'exportation) et son propre délai d'instruction par l'Administration.</p>
          </Depliant>
        </Section>
      )}
      </PageDeCours>
    </div>
  )
}
