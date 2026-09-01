import { useHashLocation } from 'wouter/use-hash-location'
import { Compass } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// PAGE INTROUVABLE
//
// Avant cette page, toute adresse inconnue du routeur était renvoyée en
// silence vers le tableau de bord (<Route><Redirect to="/" /></Route>). Un
// lien cassé, une ancre mal formée ou une faute de frappe dans l'adresse
// donnaient donc l'impression que « le chemin ramène à l'accueil », sans
// aucun moyen de savoir quel chemin avait échoué. On affiche désormais
// l'adresse demandée telle quelle, et l'on propose les deux points d'entrée
// utiles : le tableau de bord et la liste des cours.
// ─────────────────────────────────────────────────────────────────────────────
export default function PageIntrouvable() {
  const [location, navigate] = useHashLocation()

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh] p-10 text-center animate-fadeIn">
      <Compass className="h-10 w-10 text-muted-foreground/60" />
      <div>
        <p className="font-display font-semibold text-foreground">Page introuvable</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          Aucune page ne correspond à l&apos;adresse demandée. Si vous avez suivi un lien
          depuis le logiciel, signalez l&apos;adresse ci-dessous : elle permet de retrouver le lien fautif.
        </p>
        <code className="inline-block mt-3 px-2 py-1 rounded bg-muted text-xs font-mono text-foreground break-all">
          #{location}
        </code>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => navigate('/mes-cours')}
          className="h-9 px-4 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          Mes cours
        </button>
        <button
          onClick={() => navigate('/')}
          className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Tableau de bord
        </button>
      </div>
    </div>
  )
}
