import React from 'react'
import { Redirect } from 'wouter'
import ChapitreManuscrit from '@/components/chapitre/ChapitreManuscrit'
import PageLoader from '@/components/PageLoader'
import { chargeurDe } from '@/content/catalogue'

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DE CHAPITRE
//
// Une seule page dessert tous les chapitres de tous les modules migrés : elle
// lit le module et le numéro dans l'adresse, charge le fichier de contenu
// correspondant et le confie au moteur de rendu.
//
// Auparavant, chaque chapitre exigeait son propre fichier de page, son import
// différé et sa route dans App.tsx. Pour les treize modules prévus, cela
// représentait plus de cent trente déclarations à maintenir à la main.
// ─────────────────────────────────────────────────────────────────────────────

// Les composants différés sont mémorisés : sans ce cache, chaque rendu créerait
// un nouveau composant paresseux, ce qui forcerait React à démonter et
// remonter le chapitre, et rejouerait l'indicateur de chargement à chaque fois.
const CACHE = new Map<string, React.ComponentType>()

function composantDeChapitre(ue: string, numero: number): React.ComponentType | null {
  const cle = `${ue}/${numero}`
  const dejaConnu = CACHE.get(cle)
  if (dejaConnu) return dejaConnu

  const chargeur = chargeurDe(ue, numero)
  if (!chargeur) return null

  const differe = React.lazy(async () => {
    const module = await chargeur()
    const Rendu = () => <ChapitreManuscrit chapitre={module.default} />
    return { default: Rendu }
  })
  CACHE.set(cle, differe)
  return differe
}

export default function ChapitrePage({ ue, numero }: { ue: string; numero: string }) {
  const n = Number.parseInt(numero, 10)
  const Chapitre = Number.isFinite(n) ? composantDeChapitre(ue, n) : null

  // Module ou numéro absent du catalogue : on renvoie à la liste des cours
  // plutôt que d'afficher une page vide.
  if (!Chapitre) return <Redirect to="/mes-cours" />

  return (
    <React.Suspense fallback={<PageLoader />}>
      <Chapitre />
    </React.Suspense>
  )
}
