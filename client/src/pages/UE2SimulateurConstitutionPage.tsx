import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import SimulateurConstitution from '@/components/SimulateurConstitution'

// ─────────────────────────────────────────────────────────────────────────────
// Outil pratique du chapitre 1 d'UE2 : le simulateur de constitution de
// société. Le chapitre lui-même est passé dans le moteur de contenu commun
// (content/ue2/chapitre-1.ts) qui ne rend que des données ; le simulateur,
// composant interactif à état, vit donc sur sa propre page, appelée depuis
// la carte « Outil pratique » du chapitre.
// ─────────────────────────────────────────────────────────────────────────────
export default function UE2SimulateurConstitutionPage() {
  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 - Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Simulateur de constitution' },
          ]}
          color="indigo"
        />
        <BackButton />
        <h1 className="font-display text-lg font-bold text-foreground leading-tight">Simulateur : constituer votre société</h1>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Outil pratique du chapitre 1 · AUSCGIE et droit congolais</p>
      </div>

      <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
        <p className="text-xs text-indigo-800 font-semibold mb-1">Comment utiliser ce simulateur ?</p>
        <ul className="text-xs text-indigo-700 space-y-1 list-disc list-inside">
          <li>Choisissez votre forme sociale et votre pays de constitution</li>
          <li>Renseignez les mentions obligatoires des statuts (Art. 13 AUSCGIE)</li>
          <li>Ajoutez vos associés et leurs apports (numéraire, nature, industrie)</li>
          <li>Obtenez un récapitulatif complet avec vérification de conformité légale</li>
        </ul>
      </div>

      <SimulateurConstitution />
    </div>
  )
}
