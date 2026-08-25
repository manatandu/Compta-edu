import { useState } from 'react'
import { Pickaxe, Coins, Users, ShieldAlert } from 'lucide-react'
import { Section, Depliant, ARetenir, Ref } from './coursHelpers'

const SOUS = [
  { id: 'redevance', label: 'Redevance minière' },
  { id: 'is', label: "IS & phases d'exploitation" },
  { id: 'social', label: 'Responsabilité sociétale' },
] as const

export default function NotesCoursMines() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('redevance')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-stone-600 text-white border-stone-600' : 'bg-background text-muted-foreground border-border/60 hover:border-stone-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {actif === 'redevance' && (
        <Section titre="La redevance minière" icon={Coins}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Distincte de l'IS, la redevance minière est assise sur la <strong>valeur des ventes</strong> de la substance extraite, pas sur le résultat de l'entreprise : elle est due même en l'absence de bénéfice, ce qui garantit une recette à l'État dès le début de la phase d'exploitation.
          </p>
          <ARetenir>
            <p>Le taux de la redevance varie selon la substance. Il est majoré pour les substances classées « stratégiques » : le cobalt, le germanium et la colombo-tantalite (coltan) sont soumis à un taux de <strong>10%</strong> (Décret n°18/042/2018), supérieur au taux de droit commun des autres substances.</p>
          </ARetenir>
          <Depliant titre="Une redevance répartie entre plusieurs bénéficiaires">
            <p>Le produit de la redevance minière n'est pas versé en totalité au Trésor central : il est réparti par décret entre le pouvoir central, les provinces, les Entités Territoriales Décentralisées, le Fonds de réparation des victimes de violences sexuelles liées aux conflits (FONAREV) et le Fonds Minier pour les Générations Futures (FOMIN). La clé de répartition a été révisée par décret postérieurement à la création du FOMIN — vérifier la version en vigueur avant tout calcul de répartition.</p>
          </Depliant>
        </Section>
      )}

      {actif === 'is' && (
        <Section titre="IS minier et taux préférentiels par phase" icon={Pickaxe}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'Impôt sur les Sociétés s'applique également aux entreprises minières, au taux de 30% comme en droit commun, mais le régime fiscal et douanier minier prévoit des <strong>taux préférentiels</strong> selon la phase du projet (recherche, développement, exploitation), destinés à tenir compte du profil de risque et d'investissement très différent d'un projet minier par rapport à une activité commerciale ordinaire.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Un impôt spécial sur le profit excédentaire peut également s'appliquer lorsque les prix de marché de la substance extraite dépassent un seuil défini par le Code minier, mécanisme sans équivalent dans le régime fiscal de droit commun.
          </p>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Base légale : Code minier (Loi n°007/2002, modifiée par la Loi n°18/001 du 9 mars 2018), Titre IX, régime fiscal et douanier.</Ref>
          </p>
        </Section>
      )}

      {actif === 'social' && (
        <Section titre="Responsabilité sociétale et dotation communautaire" icon={Users}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Au-delà des impôts et de la redevance proprement dits, le Code minier impose au titulaire d'un droit minier une obligation distincte de <strong>responsabilité sociétale</strong> : une dotation d'au moins 0,3% du chiffre d'affaires doit être consacrée au développement communautaire des zones d'implantation du projet (Art. 258 bis et 285 octies du Code minier).
          </p>
          <ARetenir>
            <p>Cette dotation n'est pas un impôt versé au Trésor : elle finance directement des projets locaux, selon des modalités de gouvernance et de contrôle propres (comité de supervision, unité d'exécution des projets), encadrées par un manuel de procédures distinct du droit fiscal ordinaire.</p>
          </ARetenir>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
            <p className="text-[11px] font-bold text-rose-700 mb-1 flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5" /> Ne pas confondre</p>
            <p className="text-xs text-rose-700 leading-relaxed">La dotation communautaire (0,3% du CA) et le cahier des charges social ne se substituent pas à la fiscalité minière proprement dite (redevance, IS, taxe de superficie des concessions minières) : ce sont des obligations cumulatives, pas alternatives.</p>
          </div>
        </Section>
      )}
    </div>
  )
}
