interface PageLoaderProps {
  message?: string
}

// Affiché uniquement dans la zone de contenu (la sidebar reste montée) :
// un squelette discret plutôt qu'un grand spinner qui recentre le regard -
// la transition doit se sentir comme une continuité, pas une interruption.
export default function PageLoader({ message = 'Chargement...' }: PageLoaderProps) {
  return (
    <div className="animate-fadeIn" style={{ animationDuration: '0.25s' }} aria-busy="true" aria-label={message}>
      <div className="h-6 w-48 rounded bg-muted animate-pulse mb-6" />
      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="h-16 rounded-lg border border-border bg-card animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  )
}
