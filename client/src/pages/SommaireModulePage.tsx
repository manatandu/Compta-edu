import { useHashLocation } from '@/lib/hashLocation'
import { Redirect } from 'wouter'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { moduleDe } from '@/content/modules'
import { useAccesCours } from '@/lib/accesCours'
import CoursVerrouille from '@/components/CoursVerrouille'

// ─────────────────────────────────────────────────────────────────────────────
// SOMMAIRE D'UN MODULE DE COURS
//
// Une seule page pour tous les modules rédigés : elle lit le registre
// (content/modules.ts) et remplace les cinq pages de sommaire qui recopiaient
// le même gabarit. Identité « manuscrit de cours » : encre, papier, filet,
// couleur d'accent propre au module, ambre pour la marginalia.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const AMBRE = 'text-[#8A6416]'

export default function SommaireModulePage({ ue }: { ue: string }) {
  const [, navigate] = useHashLocation()
  const module = moduleDe(ue)
  const acces = useAccesCours(module ? module.route.slice(1) : '')
  if (!module) return <Redirect to="/mes-cours" />

  const totalHeures = module.chapitres.reduce((s, c) => s + parseInt(c.duree), 0)
  const route = (num: number) => `/${module.ue}/chapitre-${num}`

  return (
    <CoursVerrouille acces={acces}>
    <div className="space-y-8 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <BackButton />
        <Breadcrumb items={[{ label: 'Mes cours', route: '/mes-cours' }, { label: module.libelle }]} />
      </div>

      <div className="max-w-2xl">
        <div className={cn('flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest mb-4', AMBRE)}>
          <span className="w-5 h-px bg-current" />
          Unité d'enseignement {module.numeroUE}
        </div>

        <h1 className={cn('font-serif font-bold text-3xl sm:text-4xl leading-tight mb-1.5', ENCRE)}>{module.titre}</h1>
        <p className="text-xs font-mono text-muted-foreground mb-5">{module.textes}</p>

        <p className={cn('text-[17px] leading-relaxed max-w-md mb-6', ENCRE_DOUX)}>{module.presentation}</p>

        <div className={cn('flex gap-7 py-5 border-t border-b', LIGNE)}>
          {[
            { label: 'Volume horaire', value: `${totalHeures}h` },
            { label: 'Chapitres', value: String(module.chapitres.length) },
            { label: 'Édition', value: '2026' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <b className={cn('font-serif text-xl', ENCRE)}>{s.value}</b>
              <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>{s.label}</span>
            </div>
          ))}
        </div>

        {module.objectifs && (
          <div className={cn('pt-5 pb-5 border-b', LIGNE)}>
            <p className={cn('text-[11px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>Objectifs du cours</p>
            <ul className="space-y-1.5">
              {module.objectifs.map((o, i) => (
                <li key={i} className={cn('grid grid-cols-[20px_1fr] text-[14px] leading-snug', ENCRE_DOUX)}>
                  <span className={cn('font-mono text-xs pt-0.5', module.accent.texte)}>{i + 1}.</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-2xl">
        <p className={cn('text-[11px] font-mono uppercase tracking-wider mb-1', ENCRE_FAIBLE)}>Sommaire</p>
        <div>
          {module.chapitres.map((ch, i) => {
            const num = i + 1
            return (
              <div
                key={num}
                role="button"
                tabIndex={0}
                onClick={() => navigate(route(num))}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(route(num)) } }}
                onMouseEnter={() => prefetchRoute(route(num))}
                onTouchStart={() => prefetchRoute(route(num))}
                className={cn(
                  'relative grid grid-cols-[36px_1fr_auto] items-baseline gap-3 py-4 border-b cursor-pointer group focus:outline-none focus-visible:ring-2 rounded-sm',
                  LIGNE,
                  module.accent.anneau,
                )}
              >
                <span className={cn('font-serif font-bold text-xl tabular-nums', module.accent.texte)}>
                  {String(num).padStart(2, '0')}
                </span>
                <span className="min-w-0 relative z-10">
                  <span className={cn('block text-[15px] leading-snug pr-1 bg-background group-hover:underline', ENCRE)}>{ch.titre}</span>
                  <span className={cn('block text-[11px] font-mono pr-1 bg-background', ENCRE_FAIBLE)}>{ch.reperes}</span>
                </span>
                <span className={cn('text-xs font-mono whitespace-nowrap pl-1 bg-background', module.accent.texte)}>{ch.duree}</span>
                <span className={cn('absolute left-[54px] right-[70px] bottom-4 border-b border-dotted', LIGNE_FORTE)} />
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">Sources : {module.sources}</p>
    </div>
    </CoursVerrouille>
  )
}
