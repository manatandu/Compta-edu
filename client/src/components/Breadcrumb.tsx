import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
export type BreadcrumbItem = {
  label: string
  route?: string   // undefined = segment actif (non cliquable)
}

type Props = {
  items: BreadcrumbItem[]
  /** Couleur d'accentuation du segment actif — ex: 'sky' | 'green' | 'blue' */
  color?: string
}

// ─────────────────────────────────────────────────────────────────
// COMPOSANT
// ─────────────────────────────────────────────────────────────────
export function Breadcrumb({ items, color = 'sky' }: Props) {
  const [, navigate] = useHashLocation()

  return (
    <nav
      aria-label="Fil d'ariane"
      className="flex items-center flex-wrap gap-0.5 text-xs text-muted-foreground select-none"
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        const isFirst = idx === 0

        return (
          <React.Fragment key={idx}>
            {/* Séparateur chevron (sauf premier) */}
            {!isFirst && (
              <ChevronRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />
            )}

            {/* Segment cliquable ou segment actif */}
            {!isLast && item.route ? (
              <button
                onClick={() => navigate(item.route!)}
                className={cn(
                  'flex items-center gap-1 hover:underline underline-offset-2 transition-colors hover:text-foreground font-medium',
                  isFirst && 'text-muted-foreground'
                )}
              >
                {isFirst && <Home className="h-3 w-3 shrink-0" />}
                {item.label}
              </button>
            ) : (
              <span
                className={cn(
                  'font-semibold truncate max-w-[160px] sm:max-w-xs',
                  isLast
                    ? `text-${color}-600 dark:text-${color}-400`
                    : 'text-muted-foreground'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {isFirst && <Home className="h-3 w-3 shrink-0 inline mr-1" />}
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
