import React, { useEffect, useState } from 'react'

// ─── Composant compteur animé ─────────────────────────────────────────────────
export function AnimatedCount({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const isNum = typeof target === 'number'

  useEffect(() => {
    if (!isNum) return
    if (target === 0) return
    let start = 0
    const duration = 900
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setDisplay(target); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [target, isNum])

  if (!isNum) return <span>{target}</span>
  return <span>{display}{suffix}</span>
}

export interface DashboardStat {
  label: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  color?: string
  /** Rend la tuile cliquable. Une stat sans action reste un simple affichage. */
  onClick?: () => void
}

// ─────────────────────────────────────────────────────────────────────────────
// BANDEAU HERO DU TABLEAU DE BORD
//
// Structure commune aux deux tableaux de bord (étudiant, staff) : dégradé,
// orbes décoratifs, barre de stats. Seul le contenu d'identité (à qui
// s'adresse le message d'accueil) et la liste de stats changent - ils sont
// donc reçus en props plutôt que redécidés ici par un test de rôle.
// ─────────────────────────────────────────────────────────────────────────────
export function DashboardHero({ greeting, identity, stats }: {
  greeting: string
  identity: React.ReactNode
  stats: DashboardStat[]
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#2E6FD9] via-[#1E4FAE] to-[#0F2E6E] px-6 py-6 sm:px-8 sm:py-7 animate-scaleIn"
      style={{ animationDelay: '0ms' }}
    >
      {/* 2 orbes décoratifs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full bg-secondary/15 animate-heroOrb"
        style={{ animationDelay: '0s' }} />
      <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-secondary/10 animate-heroOrb"
        style={{ animationDelay: '2s' }} />

      {/* Contenu hero */}
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
        <div
          className="flex items-center gap-4 animate-slideRight"
          style={{ animationDelay: '100ms' }}
        >
          <div className="relative h-16 w-16 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-secondary/30 animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-white/10 ring-2 ring-white/25 flex items-center justify-center backdrop-blur-sm">
              <img src="/assets/orbit-mark.svg" alt="Orbit" className="h-11 w-11 animate-float" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight leading-tight">
              {greeting}
            </h1>
            {identity}
          </div>
        </div>
      </div>

      {/* Barre de stats */}
      <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon
          const iconColor = s.color || 'text-white/80'
          // Une stat munie d'une action devient un vrai bouton - sinon elle
          // reste une simple div, pour ne pas annoncer aux lecteurs d'écran
          // (ni au curseur) une interaction qui n'existe pas.
          const Balise = s.onClick ? 'button' : 'div'
          return (
            <Balise
              key={s.label}
              {...(s.onClick ? { onClick: s.onClick, type: 'button' as const } : {})}
              className={`rounded-md bg-white/10 backdrop-blur-sm px-3 py-3 flex items-center gap-2.5 border border-white/10 hover:bg-white/15 transition-colors duration-200 animate-slideUp ${
                s.onClick ? 'text-left cursor-pointer hover:border-white/30' : ''
              }`}
              style={{ animationDelay: `${300 + i * 60}ms` }}
            >
              <div className="h-7 w-7 rounded-sm bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-xl font-semibold font-mono text-white leading-none tabular-nums">
                  {typeof s.value === 'number'
                    ? <AnimatedCount target={s.value} />
                    : s.value
                  }
                </p>
                <p className="text-xs text-white/70 mt-0.5 font-medium">{s.label}</p>
              </div>
            </Balise>
          )
        })}
      </div>
    </div>
  )
}

// Salutation selon l'heure - partagée par les deux tableaux de bord.
export function greeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12)  return 'Bonjour'
  if (h >= 12 && h < 18) return 'Bonjour'
  if (h >= 18 && h < 22) return 'Bonsoir'
  return 'Bonne nuit'
}
