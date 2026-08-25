import { useState } from 'react'
import { Users, Calculator, ListTree, PiggyBank } from 'lucide-react'
import { Section, Depliant, Exemple, ARetenir, Ref, PageDeCours } from './coursHelpers'

const SOUS = [
  { id: 'principe', label: 'Principe général' },
  { id: 'categories', label: 'Les 6 catégories' },
  { id: 'bareme', label: 'Barème progressif' },
  { id: 'charges', label: 'Réduction pour charges' },
] as const

export default function NotesCoursIRPP() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('principe')

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-background text-muted-foreground border-border/60 hover:border-blue-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <PageDeCours aRetenir={[
        "L'IRPP reste organisé en 6 catégories autonomes : un même contribuable peut relever de plusieurs à la fois.",
        'Les catégories 1 à 4 suivent un barème progressif par tranches — seule la fraction du revenu dans une tranche est taxée à son taux.',
        'La réduction pour charges de famille s\'applique après le calcul de l\'impôt par le barème, jamais avant sur le revenu imposable.',
        "L'IRPP et l'IS sont mutuellement exclusifs : la forme juridique (personne physique ou société) détermine lequel s'applique.",
      ]}>
      {actif === 'principe' && (
        <Section titre="Un impôt catégoriel, pas un impôt sur le revenu global" icon={Users}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'IRPP frappe le revenu des <strong>personnes physiques</strong>. Contrairement à un impôt sur le revenu totalement unifié, le système congolais reste organisé en <strong>catégories autonomes</strong> : chaque catégorie a ses propres règles de détermination du revenu imposable, son propre régime de retenue à la source ou de déclaration, et parfois son propre taux. Un même contribuable peut relever de plusieurs catégories en même temps (salarié le jour, propriétaire-bailleur le soir).
          </p>
          <ARetenir>
            <p>Base légale : Loi n°23/053 du 30 novembre 2023. L'IRPP est mutuellement exclusif de l'IS : dès qu'une activité est exercée par une société dotée de la personnalité morale, elle bascule vers l'IS (voir le chapitre IS).</p>
          </ARetenir>
        </Section>
      )}

      {actif === 'categories' && (
        <Section titre="Les six catégories de revenus" icon={ListTree}>
          <div className="space-y-1.5">
            <Depliant titre="Catégorie 1 — Revenus salariaux" defaultOpen>
              <p>Traitements, salaires, gratifications, indemnités, pensions et rentes viagères. Retenue à la source mensuelle par l'employeur (IPR).</p>
            </Depliant>
            <Depliant titre="Catégorie 2 — Bénéfices industriels et commerciaux">
              <p>Entrepreneurs individuels, commerçants, artisans. Trois régimes possibles selon le chiffre d'affaires : micro-entreprise, petite entreprise, régime réel.</p>
            </Depliant>
            <Depliant titre="Catégorie 3 — Bénéfices non commerciaux">
              <p>Professions libérales (médecins, avocats, notaires), artistiques ou intellectuelles, exercées à titre individuel.</p>
            </Depliant>
            <Depliant titre="Catégorie 4 — Revenus agricoles">
              <p>Exploitation de terres cultivées ou d'élevage à titre lucratif par une personne physique.</p>
            </Depliant>
            <Depliant titre="Catégorie 5 — Revenus de capitaux mobiliers">
              <p>Dividendes, intérêts, produits de titres financiers. Retenue à la source libératoire de 20%, distincte du barème progressif des autres catégories.</p>
            </Depliant>
            <Depliant titre="Catégorie 6 — Plus-values de cession">
              <p>Plus-values réalisées à la vente de biens mobiliers ou immobiliers détenus hors activité professionnelle.</p>
            </Depliant>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Chaque catégorie a son propre simulateur, accessible via la navigation « Dossier IRPP » de ce chapitre.</Ref>
          </p>
        </Section>
      )}

      {actif === 'bareme' && (
        <Section titre="Le barème progressif par tranches" icon={Calculator}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Les catégories 1 à 4 (revenus salariaux, BIC, BNC, agricoles) sont soumises à un <strong>barème progressif par tranches</strong> : le revenu imposable est découpé en tranches successives, chacune taxée à un taux qui augmente avec le niveau de revenu. Seule la fraction du revenu comprise dans une tranche est taxée au taux de cette tranche — jamais la totalité du revenu au taux de la tranche la plus haute atteinte.
          </p>
          <ARetenir>
            <p>C'est l'erreur la plus fréquente en calcul manuel : appliquer le taux marginal (le taux de la tranche la plus haute) à l'ensemble du revenu, au lieu de l'appliquer seulement à la fraction qui s'y trouve. Le taux moyen effectif est toujours inférieur au taux marginal affiché.</p>
          </ARetenir>
          <Exemple>
            <p>Barème schématique à titre pédagogique (3 tranches) : 0% jusqu'à 500 000 FC, 15% de 500 001 à 2 000 000 FC, 30% au-delà. Pour un revenu imposable de 3 000 000 FC :</p>
            <p>0 × 500 000 (tranche 1) + 15% × (2 000 000 − 500 000) + 30% × (3 000 000 − 2 000 000) = 0 + 225 000 + 300 000 = <strong>525 000 FC</strong>, soit un taux moyen effectif de 17,5% — bien inférieur au taux marginal de 30%.</p>
          </Exemple>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Le barème chiffré exact (nombre de tranches, seuils, taux) est appliqué automatiquement dans les simulateurs de chaque catégorie — ne jamais le reconstituer de mémoire, il évolue avec chaque loi de finances.</Ref>
          </p>
        </Section>
      )}

      {actif === 'charges' && (
        <Section titre="Réduction pour charges de famille" icon={PiggyBank}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Après application du barème, l'impôt brut peut être réduit d'un pourcentage forfaitaire par personne à charge (conjoint, enfants), plafonné à un nombre maximal de personnes à charge reconnues.
          </p>
          <ARetenir>
            <p>L'ordre des opérations compte : on calcule d'abord l'impôt sur la totalité du revenu imposable via le barème progressif, <strong>puis seulement ensuite</strong> on applique la réduction pour charges de famille sur ce montant — jamais l'inverse (réduire d'abord le revenu imposable des charges, puis appliquer le barème sur un revenu déjà réduit).</p>
          </ARetenir>
        </Section>
      )}
      </PageDeCours>
    </div>
  )
}
