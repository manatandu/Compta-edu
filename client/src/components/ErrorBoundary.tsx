import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// GARDE-FOU CONTRE UN ÉCRAN BLANC (point 5 de l'audit)
//
// Avant ce composant, aucun endroit de l'application ne capturait les erreurs
// de rendu React (componentDidCatch/getDerivedStateFromError) : un document
// Firestore malformé, un `undefined.map()`, une division par zéro dans un des
// nombreux calculs SYSCOHADA/fiscaux faisait planter React entièrement — écran
// blanc sans message ni bouton de récupération, sur n'importe quelle page.
//
// Placé dans App.tsx autour du SEUL contenu de page (voir le wrapper `W`),
// pas autour de tout App : la sidebar/Layout reste montée et utilisable même
// si le contenu d'une page plante, l'utilisateur peut naviguer ailleurs sans
// recharger. Keyé par route côté appelant pour que changer de page réarme
// automatiquement la limite (sinon l'état d'erreur resterait affiché même
// après avoir cliqué vers une autre page).
// ─────────────────────────────────────────────────────────────────────────────

// Décalage de déploiement : un onglet resté ouvert pendant qu'un nouveau build est
// publié demande, en changeant de page, un chunk JS dont le nom (haché) a changé ou
// disparu — Vite/le navigateur lève une de ces erreurs, pas une vraie erreur de rendu.
// Un simple rechargement complet règle ça (nouveau index.html → nouveaux chunks).
const MOTIF_ERREUR_CHUNK = /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|loading chunk .* failed/i
// Exporté pour que main.tsx efface ce verrou une fois l'appli stable (voir main.tsx) —
// sinon un déploiement suivant, plus tard dans la même session d'onglet, ne
// bénéficierait plus jamais du rechargement automatique.
export const CLE_RECHARGEMENT_UNIQUE = 'orbit-chunk-reload'

interface Props {
  children: React.ReactNode
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Erreur de rendu interceptée :', error, info.componentStack)
    if (MOTIF_ERREUR_CHUNK.test(error.message)) {
      // Un seul rechargement automatique par onglet : si le problème persiste après
      // (vrai souci réseau, pas juste un déploiement en cours), on n'entre pas en
      // boucle — l'écran d'erreur classique s'affiche normalement au second essai.
      try {
        if (!sessionStorage.getItem(CLE_RECHARGEMENT_UNIQUE)) {
          sessionStorage.setItem(CLE_RECHARGEMENT_UNIQUE, '1')
          window.location.reload()
        }
      } catch {
        // sessionStorage indisponible (navigation privée stricte, etc.) : tant pis,
        // l'écran d'erreur habituel avec bouton « Réessayer » prend le relais.
      }
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh] p-10 text-center animate-fadeIn">
          <div className="text-4xl">⚠️</div>
          <div>
            <p className="font-display font-semibold text-foreground">Une erreur inattendue est survenue</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Cette page a rencontré un problème et n&apos;a pas pu s&apos;afficher correctement.
              Vos données ne sont pas perdues.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => this.setState({ error: null })}
              className="h-9 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Réessayer
            </button>
            <button
              onClick={() => { window.location.hash = '#/'; this.setState({ error: null }) }}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Retour à l&apos;accueil
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
