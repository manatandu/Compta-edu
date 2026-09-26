import { Lock } from 'lucide-react'
import { useHashLocation } from 'wouter/use-hash-location'
import PageLoader from '@/components/PageLoader'
import type { AccesCours } from '@/lib/accesCours'

// Garde commune au sommaire et aux chapitres d'un module : rend le contenu si
// l'accès est autorisé, un indicateur pendant la lecture des inscriptions,
// sinon le même message que le cadenas de la page Mes cours.
export default function CoursVerrouille({ acces, children }: { acces: AccesCours; children: React.ReactNode }) {
  const [, navigate] = useHashLocation()
  if (acces === 'autorise') return <>{children}</>
  if (acces === 'chargement') return <PageLoader />
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 min-h-[50vh] px-6">
      <Lock className="h-8 w-8 text-muted-foreground/60" />
      <p className="font-semibold text-foreground">Tu n&apos;es pas inscrit(e) à ce cours</p>
      <p className="text-sm text-muted-foreground max-w-sm">Contacte ton professeur pour être inscrit(e). Tes cours sont listés dans Mes cours.</p>
      <button onClick={() => navigate('/mes-cours')} className="mt-2 min-h-10 px-4 rounded-lg border border-border text-sm font-medium hover:bg-muted/40">
        Aller à Mes cours
      </button>
    </div>
  )
}
