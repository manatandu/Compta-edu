import BackButton from '@/components/BackButton'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen } from 'lucide-react'

interface ComingSoonPageProps {
  titre: string
  description?: string
  fonctionnalites?: string[]
}

export default function ComingSoonPage({ titre, description, fonctionnalites = [] }: ComingSoonPageProps) {
  return (
    <div className="space-y-5 animate-fadeIn max-w-2xl mx-auto">
      <BackButton />

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-6 py-8 text-center">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/20 shadow-sm">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{titre}</h1>
            <Badge variant="outline" className="mt-2 text-xs border-amber-400 text-amber-600">Bientôt disponible</Badge>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
          )}
        </div>
      </div>

      {fonctionnalites.length > 0 && (
        <Card className="border-border">
          <CardContent className="pt-5 pb-5">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Fonctionnalités prévues
            </p>
            <ul className="space-y-2">
              {fonctionnalites.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold shrink-0">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
