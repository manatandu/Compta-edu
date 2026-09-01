import { useHashLocation } from 'wouter/use-hash-location'
import { Lock } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE - « manuscrit de cours », même gabarit que UE1
// (UE1DroitTravailPage) : encre, papier, filet, accent indigo propre à
// l'UE2, ambre pour la marginalia. Aucune classe Tailwind dynamique.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const INDIGO = 'text-[#3B3A82]'
const AMBRE = 'text-[#8A6416]'

const CHAPITRES = [
  { num: 1,  titre: 'Notions générales : la société commerciale', sousTitre: 'Définition, classification, réformes RDC, GUCE', duree: '3h', actif: true, route: '/ue2/chapitre-1' },
  { num: 2,  titre: 'Constitution et formalités', sousTitre: 'Art. 7–14, 19–103, 256-1–263 AUSCGIE', duree: '4h', actif: true, route: '/ue2/chapitre-2' },
  { num: 3,  titre: 'Sociétés de personnes : SNC et SCS', sousTitre: 'Art. 270–308 AUSCGIE — intuitu personae', duree: '3h', actif: true, route: '/ue2/chapitre-3' },
  { num: 4,  titre: 'Sociétés de capitaux : SA et SAS', sousTitre: 'Art. 385–561, 853-1–853-26 AUSCGIE', duree: '4h', actif: true, route: '/ue2/chapitre-4' },
  { num: 5,  titre: 'Société mixte : la SARL', sousTitre: 'Art. 309–384 AUSCGIE — capital libre RDC', duree: '3h', actif: true, route: '/ue2/chapitre-5' },
  { num: 6,  titre: 'Le groupement d’intérêt économique', sousTitre: 'Art. 869–919 AUSCGIE — catégorie distincte', duree: '2h', actif: true, route: '/ue2/chapitre-6' },
  { num: 7,  titre: 'Les dirigeants sociaux', sousTitre: 'Art. 101–135, 330–445 AUSCGIE', duree: '3h', actif: true, route: '/ue2/chapitre-7' },
  { num: 8,  titre: 'Les associés et les assemblées', sousTitre: 'Art. 51–60, 133–163, 519–695 AUSCGIE', duree: '3h', actif: true, route: '/ue2/chapitre-8' },
  { num: 9,  titre: 'Difficultés et transformation', sousTitre: 'Art. 150–164, 180–200 AUSCGIE', duree: '2h', actif: true, route: '/ue2/chapitre-9' },
  { num: 10, titre: 'Dissolution, liquidation et infractions', sousTitre: 'Art. 200–256, 886–920 AUSCGIE', duree: '3h', actif: true, route: '/ue2/chapitre-10' },
  { num: 11, titre: 'Société en participation et société de fait', sousTitre: 'Art. 854–868 AUSCGIE', duree: '2h', actif: true, route: '/ue2/chapitre-11' },
]

export default function UE2DroitSocietesPage() {
  const [, navigate] = useHashLocation()
  const totalHeures = CHAPITRES.reduce((s, c) => s + parseInt(c.duree), 0)

  return (
    <div className="space-y-8 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <BackButton />
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 · Droit des sociétés' },
          ]}
          color="indigo"
        />
      </div>

      <div className="max-w-2xl">
        <div className={cn('flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest mb-4', AMBRE)}>
          <span className="w-5 h-px bg-current" />
          Unité d'enseignement 2
        </div>

        <h1 className={cn('font-serif font-bold text-3xl sm:text-4xl leading-tight mb-1.5', ENCRE)}>Droit des sociétés</h1>
        <p className="text-xs font-mono text-muted-foreground mb-5">Acte uniforme OHADA révisé relatif au droit des sociétés commerciales et du GIE (30 janvier 2014)</p>

        <p className={cn('text-[17px] leading-relaxed max-w-md mb-6', ENCRE_DOUX)}>
          Manuel de cours : le droit OHADA des sociétés commerciales, de la constitution à la dissolution, forme par forme.
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
                  bloque ? 'cursor-not-allowed' : 'cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B3A82] rounded-sm'
                )}
              >
                <span className={cn('font-serif font-bold text-xl tabular-nums', bloque ? ENCRE_FAIBLE : INDIGO)}>
                  {String(ch.num).padStart(2, '0')}
                </span>
                <span className="min-w-0 relative z-10">
                  <span className={cn('block text-[15px] leading-snug pr-1 bg-background', bloque ? ENCRE_DOUX : ENCRE, !bloque && 'group-hover:underline')}>
                    {ch.titre}
                  </span>
                  <span className={cn('block text-[11px] font-mono pr-1 bg-background', ENCRE_FAIBLE)}>{ch.sousTitre}</span>
                </span>
                <span className={cn('text-xs font-mono whitespace-nowrap pl-1 bg-background flex items-center gap-1.5', bloque ? ENCRE_FAIBLE : INDIGO)}>
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
        Sources : Acte uniforme OHADA révisé du 30 janvier 2014 relatif au droit des sociétés commerciales et du GIE · Textes d'application RDC (GUCE)
      </p>
    </div>
  )
}
