import { useState } from 'react'
import { Building2, Calculator, ListChecks, AlertTriangle } from 'lucide-react'
import { Section, Depliant, Exemple, ARetenir, Ref } from './coursHelpers'

const SOUS = [
  { id: 'assiette', label: 'Assiette & taux' },
  { id: 'retraitements', label: 'Réintégrations & déductions' },
  { id: 'regimes', label: 'Régimes selon la taille' },
  { id: 'obligations', label: 'Acomptes & obligations' },
] as const

export default function NotesCoursIS() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('assiette')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background text-muted-foreground border-border/60 hover:border-emerald-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {actif === 'assiette' && (
        <Section titre="Champ d'application et assiette" icon={Building2}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'Impôt sur les Sociétés (IS) frappe le résultat réalisé par les personnes morales : sociétés commerciales de toute forme, établissements publics à caractère industriel et commercial, et plus généralement toute entité dotée de la personnalité morale exerçant une activité lucrative en RDC. Il se substitue, depuis le 1er janvier 2026, à l'ancien impôt professionnel qui frappait indistinctement personnes physiques et morales.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'assiette n'est pas le chiffre d'affaires mais le <strong>résultat</strong> : produits diminués des charges déductibles, sur une période imposable qui correspond en principe à l'exercice comptable (12 mois, sauf exercice de création ou de cessation).
          </p>
          <ARetenir>
            <p>Taux de droit commun : <strong>30%</strong> du résultat fiscal. Base légale : Loi n°23/052 du 30 novembre 2023, entrée en vigueur le 1er janvier 2026.</p>
          </ARetenir>
          <Depliant titre="IS et IRPP : deux impôts mutuellement exclusifs">
            <p>Une même activité économique ne peut relever à la fois de l'IS et de l'IRPP. Le critère de bascule est la forme juridique : dès qu'un entrepreneur individuel constitue une société dotée de la personnalité morale, l'activité sort du champ de l'IRPP (catégorie 2, bénéfices industriels et commerciaux) pour entrer dans celui de l'IS.</p>
          </Depliant>
        </Section>
      )}

      {actif === 'retraitements' && (
        <Section titre="Du résultat comptable au résultat fiscal" icon={Calculator}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le résultat fiscal ne se confond pas avec le résultat comptable : la comptabilité obéit à des règles de présentation et de prudence (SYSCOHADA), tandis que la loi fiscale fixe ses propres critères de déductibilité et d'imposabilité. Le passage de l'un à l'autre se fait par un tableau de retraitements extracomptables, en deux mouvements :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <p className="text-[11px] font-bold text-rose-700 mb-1">Réintégrations (+)</p>
              <p className="text-xs text-rose-700 leading-relaxed">Charges comptabilisées mais non déductibles fiscalement : amendes et pénalités, charges somptuaires, fraction excédentaire de certains amortissements, charges non justifiées, libéralités hors plafond, etc.</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-[11px] font-bold text-emerald-700 mb-1">Déductions (−)</p>
              <p className="text-xs text-emerald-700 leading-relaxed">Produits comptabilisés mais non imposables ou déjà imposés à un autre titre : plus-values bénéficiant d'un régime de report, produits exonérés, quote-part de résultat déjà soumise à l'IS chez une filiale, etc.</p>
            </div>
          </div>
          <Exemple>
            <p>Résultat comptable avant impôt : 100 000 000 FC. Réintégration d'une amende fiscale de 2 000 000 FC et d'une charge somptuaire de 1 500 000 FC ; déduction d'une plus-value de cession bénéficiant d'un report de 3 000 000 FC.</p>
            <p><strong>Résultat fiscal = 100 000 000 + 2 000 000 + 1 500 000 − 3 000 000 = 100 500 000 FC.</strong> IS dû (30%) = 30 150 000 FC.</p>
          </Exemple>
        </Section>
      )}

      {actif === 'regimes' && (
        <Section titre="Des régimes différenciés selon la taille" icon={ListChecks}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Toutes les sociétés ne relèvent pas du même régime déclaratif. La loi distingue des catégories selon le chiffre d'affaires, reprenant et actualisant la logique de seuils qui existait déjà sous l'ancien régime de l'Impôt sur les Bénéfices et Profits (IBP — Micro-Entreprise / Petite Entreprise / régime réel, O.-L. n°13/006 du 23 février 2013), avec des obligations comptables et déclaratives allégées pour les plus petites structures.
          </p>
          <ARetenir>
            <p>Le régime réel (comptabilité complète, tableau de retraitements) demeure la norme pour les entreprises structurées. Les seuils précis de chiffre d'affaires séparant les régimes sont fixés par les textes d'application de la loi 23/052 — à vérifier avant toute catégorisation d'un cas concret.</p>
          </ARetenir>
        </Section>
      )}

      {actif === 'obligations' && (
        <Section titre="Acomptes provisionnels et déclaration" icon={AlertTriangle}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'IS n'est pas payé en une seule fois à la clôture de l'exercice : la loi impose trois acomptes provisionnels calculés sur la base de l'impôt dû au titre de l'exercice précédent, avant que la déclaration définitive de l'exercice ne vienne solder (ou faire apparaître un excédent de versement).
          </p>
          <div className="rounded-lg border border-border/60 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-2.5 py-1.5 font-semibold">Échéance</th>
                  <th className="text-left px-2.5 py-1.5 font-semibold">Quotité</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border/40"><td className="px-2.5 py-1.5">Au plus tard le 25 juillet</td><td className="px-2.5 py-1.5">30%</td></tr>
                <tr className="border-t border-border/40"><td className="px-2.5 py-1.5">Au plus tard le 25 septembre</td><td className="px-2.5 py-1.5">30%</td></tr>
                <tr className="border-t border-border/40"><td className="px-2.5 py-1.5">Au plus tard le 25 novembre</td><td className="px-2.5 py-1.5">20%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Échéances fixées par la Loi de Finances 2026 (Loi n°25/060 du 29 décembre 2025), qui a modifié l'Art. 57 bis LPF issu de la loi 23/052 (la rédaction 2023 — « avant le 1er août/octobre/décembre » — est périmée).</Ref>
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le défaut ou l'insuffisance de versement d'un acompte est sanctionné par une amende propre (voir le chapitre Procédures fiscales), distincte de la majoration applicable en cas de retard de la déclaration définitive.
          </p>
        </Section>
      )}
    </div>
  )
}
