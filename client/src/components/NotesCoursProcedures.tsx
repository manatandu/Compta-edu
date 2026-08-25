import { useState } from 'react'
import { FileText, Search, Gavel, Scale } from 'lucide-react'
import { Section, Depliant, ARetenir, Ref, PageDeCours } from './coursHelpers'

const SOUS = [
  { id: 'declarations', label: 'Déclarations' },
  { id: 'controle', label: 'Contrôle' },
  { id: 'penalites', label: 'Recouvrement & pénalités' },
  { id: 'recours', label: 'Réclamations & recours' },
] as const

export default function NotesCoursProcedures() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('declarations')

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-background text-muted-foreground border-border/60 hover:border-purple-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <PageDeCours aRetenir={[
        'Le Numéro Impôt est le préalable obligatoire à toute déclaration ou opération fiscale formelle.',
        "Le contrôle fiscal est gradué : communication, contrôle sur pièces, vérification de comptabilité, puis droit d'enquête et de visite/saisie.",
        "L'Avis de Mise en Recouvrement (AMR) est le titre exécutoire qui ouvre la voie au recouvrement forcé.",
        'Les pénalités (majorations, amendes fixes, astreintes) obéissent chacune à leur propre régime — elles ne se cumulent pas de façon uniforme.',
      ]}>
      {actif === 'declarations' && (
        <Section titre="Obligations déclaratives et Numéro Impôt" icon={FileText}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Qu'il s'agisse de l'IS, de l'IRPP, de la TVA ou d'un impôt réel, l'assujetti doit d'abord être identifié : le <strong>Numéro Impôt</strong> (Décret n°03/012) est le préalable obligatoire à toute déclaration ou opération fiscale formelle — sans lui, aucune déclaration n'est recevable.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Chaque impôt a son propre calendrier déclaratif (mensuel pour la TVA et les retenues à la source, annuel pour l'IS et l'IRPP, avec des acomptes intermédiaires) — voir le chapitre correspondant pour le détail des échéances.
          </p>
        </Section>
      )}

      {actif === 'controle' && (
        <Section titre="Pouvoirs de contrôle de l'Administration" icon={Search}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le contrôle fiscal est gradué, du plus léger au plus intrusif — chaque niveau est encadré par des garanties procédurales propres, et l'Administration ne peut pas passer directement au niveau le plus lourd sans respecter les étapes intermédiaires :
          </p>
          <div className="space-y-1.5">
            <Depliant titre="1. Droit de communication">
              <p>Demande de renseignements ou de documents auprès du contribuable ou de tiers (banques, fournisseurs), sans déplacement sur place.</p>
            </Depliant>
            <Depliant titre="2. Contrôle sur pièces">
              <p>Examen des déclarations déposées, depuis les bureaux de l'Administration, sans vérification approfondie de la comptabilité.</p>
            </Depliant>
            <Depliant titre="3. Vérification de comptabilité (générale ou ponctuelle)">
              <p>Examen sur place de la comptabilité de l'entreprise, avec avis préalable et débat contradictoire — le contrôle le plus complet en matière fiscale ordinaire.</p>
            </Depliant>
            <Depliant titre="4. Droit d'enquête et droit de visite / saisie">
              <p>Réservés à des situations particulières (recherche d'infractions), avec des conditions d'exercice renforcées et des sanctions propres en cas d'opposition (astreintes, amendes fixes).</p>
            </Depliant>
          </div>
        </Section>
      )}

      {actif === 'penalites' && (
        <Section titre="Recouvrement et régime des pénalités" icon={Gavel}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            À l'issue d'un contrôle ou en cas de non-paiement spontané, l'Administration émet un <strong>Avis de Mise en Recouvrement (AMR)</strong>, titre exécutoire qui ouvre la voie au recouvrement forcé en cas de non-paiement dans le délai imparti.
          </p>
          <ARetenir>
            <p>Les pénalités fiscales se répartissent en plusieurs familles distinctes : majorations proportionnelles au retard ou à l'insuffisance déclarée, amendes fixes (opposition au contrôle, défaut de communication), et astreintes journalières (défaut de réponse dans un délai fixé). Elles ne se cumulent pas de la même façon selon le manquement en cause — chaque disposition fixe son propre régime.</p>
          </ARetenir>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Le simulateur de ce chapitre reprend le barème détaillé des pénalités (Loi n°004/2003, articles cités individuellement) et un calendrier fiscal interactif.</Ref>
          </p>
        </Section>
      )}

      {actif === 'recours' && (
        <Section titre="Réclamations et voies de recours" icon={Scale}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Un contribuable qui conteste une imposition dispose d'abord d'une voie <strong>gracieuse ou contentieuse</strong> auprès de l'Administration elle-même (réclamation), avant de pouvoir saisir les juridictions compétentes en cas de rejet ou de silence prolongé de l'Administration.
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Le <strong>quitus fiscal</strong>, attestation de régularité délivrée par l'Administration, conditionne certaines opérations (marchés publics, transferts de fonds) — à ne pas confondre avec une décision statuant sur une réclamation.
          </p>
        </Section>
      )}
      </PageDeCours>
    </div>
  )
}
