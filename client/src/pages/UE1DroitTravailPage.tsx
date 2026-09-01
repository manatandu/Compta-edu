import { useHashLocation } from 'wouter/use-hash-location'
import { Lock } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'

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
  { num: 1, titre: 'Notions fondamentales et sources du droit du travail', sousTitre: 'Titre I, art. 1–7', duree: '4h', actif: true, route: '/ue1/chapitre-1' },
  { num: 2, titre: 'Formation professionnelle, apprentissage et INPP', sousTitre: 'Titres II–III, art. 8–35', duree: '3h', actif: true, route: '/ue1/chapitre-2' },
  { num: 3, titre: 'Le contrat de travail : formation, exécution, suspension', sousTitre: 'Titre IV (1/2), art. 36–60', duree: '6h', actif: true, route: '/ue1/chapitre-3' },
  { num: 4, titre: 'La rupture du contrat de travail', sousTitre: 'Titre IV (2/2), art. 61–85', duree: '5h', actif: true, route: '/ue1/chapitre-4' },
  { num: 5, titre: 'La rémunération : salaire, SMIG et sa protection', sousTitre: 'Titre V, art. 86–118', duree: '4h', actif: true, route: '/ue1/chapitre-5' },
  { num: 6, titre: 'Durée du travail, repos et congés', sousTitre: 'Titre VI, art. 119–158', duree: '4h', actif: true, route: '/ue1/chapitre-6' },
  { num: 7, titre: 'Santé, sécurité et protection sociale', sousTitre: 'Titres VII–VIII, Décret n°18/041', duree: '5h', actif: true, route: '/ue1/chapitre-7' },
  { num: 8, titre: 'Administration du travail et relations collectives', sousTitre: 'Titres IX–XII, art. 185–296', duree: '6h', actif: true, route: '/ue1/chapitre-8' },
  { num: 9, titre: 'Contentieux du travail, sanctions et actualités', sousTitre: 'Titres XIII–XV, art. 297–329', duree: '4h', actif: true, route: '/ue1/chapitre-9' },
  { num: 10, titre: 'Pratique professionnelle : le décompte final', sousTitre: 'Préavis, congé, gratification, retenues', duree: '4h', actif: true, route: '/ue1/chapitre-10' },
]

export default function UE1DroitTravailPage() {
  const [, navigate] = useHashLocation()
  const totalHeures = CHAPITRES.reduce((s, c) => s + parseInt(c.duree), 0)

  return (
    <div className="space-y-8 pb-10 animate-fadeIn">
      <div className="space-y-1">
        <BackButton />
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 1 · Droit du travail' },
          ]}
          color="emerald"
        />
      </div>

      <div className="max-w-2xl">
        <div className={cn('flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-widest mb-4', AMBRE)}>
          <span className="w-5 h-px bg-current" />
          Unité d'enseignement 1
        </div>

        <h1 className={cn('font-serif font-bold text-3xl sm:text-4xl leading-tight mb-1.5', ENCRE)}>Droit du travail</h1>
        <p className="text-xs font-mono text-muted-foreground mb-5">Loi n°015/2002 du 16 octobre 2002, modifiée par la loi n°16/010 du 15 juillet 2016</p>

        <p className={cn('text-[17px] leading-relaxed max-w-md mb-6', ENCRE_DOUX)}>
          Manuel de cours : le Code du travail congolais et son environnement social, de la formation du contrat au décompte final.
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
        Sources : Loi n°015/2002 du 16 octobre 2002 · Loi n°16/010 du 15 juillet 2016 · Décret n°18/041 du 24 novembre 2018 · Décret n°25/22 du 30 mai 2025
      </p>
    </div>
  )
}
