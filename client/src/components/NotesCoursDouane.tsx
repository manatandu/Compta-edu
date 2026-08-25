import { useState } from 'react'
import { Ship, Calculator, Package, Gavel } from 'lucide-react'
import { Section, Depliant, Exemple, ARetenir, Ref, PageDeCours } from './coursHelpers'

const SOUS = [
  { id: 'valeur', label: 'Valeur en douane' },
  { id: 'regimes', label: 'Régimes douaniers' },
  { id: 'liquidation', label: 'Liquidation & paiement' },
  { id: 'contentieux', label: 'Contentieux' },
] as const

export default function NotesCoursDouane() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('valeur')

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-background text-muted-foreground border-border/60 hover:border-cyan-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <PageDeCours aRetenir={[
        'La valeur en douane suit une hiérarchie stricte de 6 méthodes — la valeur transactionnelle est la méthode de référence, à utiliser en priorité.',
        "L'entrepôt de douane (stockage), l'admission temporaire (usage provisoire) et la réimportation en l'état sont trois régimes suspensifs distincts, souvent confondus.",
        'Le perfectionnement actif (transformation en RDC puis export) et passif (export puis transformation à l\'étranger) sont symétriques mais inversés.',
        'Le contentieux douanier suit trois paliers : Directeur Général des douanes, puis Commission de règlement des litiges ou Ministre, puis Conseil d\'État.',
      ]}>
      {actif === 'valeur' && (
        <Section titre="Déterminer la valeur en douane" icon={Calculator}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Les droits de douane à l'importation ne se calculent pas sur un prix arbitraire : la valeur en douane suit une hiérarchie stricte de six méthodes, définie par le Code des douanes (O.-L. n°10/002 du 20 août 2010). On ne passe à une méthode suivante que si la précédente est réellement inapplicable au cas d'espèce — jamais par simple préférence.
          </p>
          <ARetenir>
            <p>La méthode de la <strong>valeur transactionnelle</strong> (prix effectivement payé ou à payer pour la marchandise, ajusté de certains éléments) est la méthode de référence, à utiliser en priorité chaque fois qu'elle est applicable.</p>
          </ARetenir>
        </Section>
      )}

      {actif === 'regimes' && (
        <Section titre="Les régimes douaniers suspensifs" icon={Package}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Une marchandise entrant sur le territoire douanier n'est pas nécessairement mise à la consommation immédiatement : plusieurs régimes suspensifs permettent de différer, réduire ou annuler le paiement des droits, selon la destination réelle de la marchandise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Entrepôt de douane</p>
              <p className="text-xs text-muted-foreground">Stockage sous douane sans paiement des droits. Public (durée 1 an) ou privé (durée 3 ans).</p>
            </div>
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Admission temporaire</p>
              <p className="text-xs text-muted-foreground">Utilisation provisoire en RDC avant réexportation, suspension totale ou partielle (taux de 3% par mois de la valeur des droits en cas de suspension partielle).</p>
            </div>
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Perfectionnement actif</p>
              <p className="text-xs text-muted-foreground">Marchandises étrangères transformées en RDC puis réexportées, avec suspension des droits ou remboursement (drawback) à l'exportation.</p>
            </div>
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Perfectionnement passif</p>
              <p className="text-xs text-muted-foreground">Marchandises nationales exportées temporairement pour transformation à l'étranger, puis réimportées en exonération totale ou partielle.</p>
            </div>
          </div>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Ne pas confondre l'admission temporaire (marchandise réexportée en l'état) avec la réimportation en l'état (marchandise nationale qui ressort après un séjour à l'étranger sans transformation).</Ref>
          </p>
        </Section>
      )}

      {actif === 'liquidation' && (
        <Section titre="Déclaration, liquidation et enlèvement" icon={Ship}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le dédouanement suit une séquence obligatoire : dépôt de la déclaration en détail (souvent anticipé), examen de la marchandise par les services douaniers, liquidation des droits et taxes dus, paiement, puis enlèvement — la mainlevée ne peut intervenir avant le paiement, sauf recours à un crédit d'enlèvement expressément accordé.
          </p>
          <Exemple>
            <p>La TVA et les droits d'accise à l'importation ne sont pas calculés indépendamment de la douane : la valeur en douane, une fois déterminée, sert souvent d'assiette de départ pour ces autres prélèvements liquidés au même moment.</p>
          </Exemple>
        </Section>
      )}

      {actif === 'contentieux' && (
        <Section titre="Le contentieux douanier" icon={Gavel}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Les irrégularités douanières vont de la simple erreur formelle à la contrebande organisée, avec un barème d'amendes gradué en conséquence. Le contentieux suit trois paliers successifs :
          </p>
          <div className="space-y-1.5">
            <Depliant titre="1. Recours devant le Directeur Général des douanes" defaultOpen>
              <p>Premier niveau de contestation, interne à l'administration douanière.</p>
            </Depliant>
            <Depliant titre="2. Commission de règlement des litiges douaniers, ou Ministre des Finances">
              <p>Selon la nature du litige : la Commission connaît spécifiquement des questions d'espèce tarifaire, d'origine et de valeur ; les autres litiges relèvent du Ministre des Finances.</p>
            </Depliant>
            <Depliant titre="3. Conseil d'État">
              <p>Voie de recours ultime, de nature juridictionnelle.</p>
            </Depliant>
          </div>
        </Section>
      )}
      </PageDeCours>
    </div>
  )
}
