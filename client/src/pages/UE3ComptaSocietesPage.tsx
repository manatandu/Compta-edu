import { useHashLocation } from 'wouter/use-hash-location'
import { Lock } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE - « manuscrit de cours » : encre, papier, filet, vert
// faculté, ambre pour la marginalia. Aucune classe Tailwind dynamique : tout
// est posé en valeurs arbitraires littérales.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const VERT = 'text-[#1E4A3D]'
const AMBRE = 'text-[#8A6416]'

const CHAPITRES = [
  { num: 1, titre: 'La constitution des sociétés : apports et comptabilisation', sousTitre: 'AUSCGIE art. 37–70 · App. 58–59', duree: '6h', actif: true, route: '/ue3/chapitre-1' },
  { num: 2, titre: 'Constitution selon la forme sociale : SARL, SA, incidents de libération', sousTitre: 'AUSCGIE art. 309–316, 385–410, 774–777', duree: '5h', actif: true, route: '/ue3/chapitre-2' },
  { num: 3, titre: "L'affectation du résultat et la distribution des dividendes", sousTitre: 'AUSCGIE art. 137–146, 346, 546 · App. 65', duree: '4h', actif: true, route: '/ue3/chapitre-3' },
  { num: 4, titre: "L'augmentation de capital", sousTitre: 'AUSCGIE art. 562–615, 360–363 · App. 60–61', duree: '5h', actif: true, route: '/ue3/chapitre-4' },
  { num: 5, titre: "La réduction et l'amortissement du capital", sousTitre: 'AUSCGIE art. 627–669, 371–373 · App. 62–64', duree: '4h', actif: true, route: '/ue3/chapitre-5' },
  { num: 6, titre: "L'emprunt obligataire", sousTitre: 'AUSCGIE art. 779–794 · App. 78–80', duree: '5h', actif: true, route: '/ue3/chapitre-6' },
  { num: 7, titre: "L'évaluation des titres sociaux et le portefeuille-titres", sousTitre: 'App. 48–51 · AUSCGIE art. 59', duree: '4h', actif: true, route: '/ue3/chapitre-7' },
  { num: 8, titre: 'Les fusions et opérations assimilées', sousTitre: 'AUSCGIE art. 189–199 · App. 116–120', duree: '6h', actif: true, route: '/ue3/chapitre-8' },
  { num: 9, titre: 'La dissolution et la liquidation', sousTitre: 'AUSCGIE art. 200–241 · App. 121–122', duree: '4h', actif: false, route: '/ue3/chapitre-9' },
  { num: 10, titre: 'Sociétés particulières : participation, GIE, transformation', sousTitre: 'AUSCGIE art. 181 s., 854 s. · App. 96–98, 106–107', duree: '4h', actif: false, route: '/ue3/chapitre-10' },
]

export default function UE3ComptaSocietesPage() {
  const [, navigate] = useHashLocation()
  const totalHeures = CHAPITRES.reduce((s, c) => s + parseInt(c.duree), 0)

  return (
    <div className="space-y-8 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <BackButton />
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 3 · Comptabilité des sociétés' },
          ]}
          color="emerald"
        />
      </div>

      <div className="max-w-2xl">
        <div className={cn('flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest mb-4', AMBRE)}>
          <span className="w-5 h-px bg-current" />
          Unité d'enseignement 3
        </div>

        <h1 className={cn('font-serif font-bold text-3xl sm:text-4xl leading-tight mb-1.5', ENCRE)}>Comptabilité des sociétés</h1>
        <p className="text-xs font-mono text-muted-foreground mb-5">AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé (AUDCIF)</p>

        <p className={cn('text-[17px] leading-relaxed max-w-md mb-6', ENCRE_DOUX)}>
          Manuel de cours : la vie comptable des sociétés commerciales OHADA, de la constitution à la liquidation — apports, capital, résultat, obligations, fusions.
        </p>

        <div className={cn('flex gap-7 py-5 border-t border-b', LIGNE)}>
          {[
            { label: 'Volume horaire', value: `${totalHeures}h` },
            { label: 'Chapitres', value: String(CHAPITRES.length) },
            { label: 'Édition', value: '2026' },
          ].map(s => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <b className={cn('font-serif text-xl', ENCRE)}>{s.value}</b>
              <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl">
        <p className={cn('text-[11px] font-mono uppercase tracking-wider mb-1', ENCRE_FAIBLE)}>Sommaire</p>
        <div>
          {CHAPITRES.map((ch) => {
            const bloque = !ch.actif
            return (
              <div
                key={ch.num}
                role={bloque ? undefined : 'button'}
                tabIndex={bloque ? undefined : 0}
                onClick={() => { if (!bloque) navigate(ch.route) }}
                onKeyDown={(e) => { if (!bloque && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); navigate(ch.route) } }}
                onMouseEnter={() => { if (!bloque) prefetchRoute(ch.route) }}
                onTouchStart={() => { if (!bloque) prefetchRoute(ch.route) }}
                className={cn(
                  'relative grid grid-cols-[36px_1fr_auto] items-baseline gap-3 py-4 border-b',
                  LIGNE,
                  bloque ? 'cursor-not-allowed' : 'cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4A3D] rounded-sm'
                )}
              >
                <span className={cn('font-serif font-bold text-xl tabular-nums', bloque ? ENCRE_FAIBLE : VERT)}>
                  {String(ch.num).padStart(2, '0')}
                </span>
                <span className="min-w-0 relative z-10">
                  <span className={cn('block text-[15px] leading-snug pr-1 bg-background', bloque ? ENCRE_DOUX : ENCRE, !bloque && 'group-hover:underline')}>
                    {ch.titre}
                  </span>
                  <span className={cn('block text-[11px] font-mono pr-1 bg-background', ENCRE_FAIBLE)}>{ch.sousTitre}</span>
                </span>
                <span className={cn('text-xs font-mono whitespace-nowrap pl-1 bg-background flex items-center gap-1.5', bloque ? ENCRE_FAIBLE : VERT)}>
                  {ch.duree}
                  {bloque && <Lock className="h-3 w-3 opacity-60" />}
                </span>
                <span className={cn('absolute left-[54px] right-[70px] bottom-4 border-b border-dotted', LIGNE_FORTE)} />
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (30 janvier 2014) · SYSCOHADA révisé — Guide d'application (AUDCIF)
      </p>
    </div>
  )
}
