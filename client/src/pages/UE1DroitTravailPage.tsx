import React from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronRight, Lock, BookOpen, CheckCircle2 } from 'lucide-react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// IDENTITÉ VISUELLE — « manuel de cours », propre à ce module (voir maquette
// validée). Rupture volontaire avec les couleurs génériques module-* utilisées
// ailleurs dans l'app : encre livre / papier parchemin / vert faculté / ambre.
// Tailwind ne peut pas construire ces teintes dynamiquement (JIT), donc elles
// sont posées en valeurs arbitraires directement dans les classes ci-dessous.
// ─────────────────────────────────────────────────────────────────────────────
const ENCRE = 'text-[#262019]'
const PAPIER = 'bg-[#EDE6D3]'
const PAPIER_CARD = 'bg-[#F8F4E8]'
const LIGNE = 'border-[#D6CCAE]'
const VERT = 'text-[#1E4A3D]'
const VERT_BG = 'bg-[#1E4A3D]'
const VERT_BORDER = 'border-[#1E4A3D]'
const VERT_SOFT = 'bg-[#1E4A3D]/10'
const MUTED = 'text-[#7A6E5C]'

const CHAPITRES = [
  { num: 1, titre: 'Notions fondamentales et sources du droit du travail', sousTitre: 'Définitions, sources, champ d\'application, capacité — Titre I, art. 1–7', duree: '4h', actif: true, route: '/ue1/chapitre-1' },
  { num: 2, titre: 'Formation professionnelle, apprentissage et INPP', sousTitre: 'Contrat d\'apprentissage, rôle de l\'INPP — Titres II–III, art. 8–35', duree: '3h', actif: false, route: '/ue1/chapitre-2' },
  { num: 3, titre: 'Le contrat de travail : formation, exécution, suspension', sousTitre: 'CDD, CDI, période d\'essai, obligations, suspension — Titre IV (1/2), art. 36–60', duree: '6h', actif: false, route: '/ue1/chapitre-3' },
  { num: 4, titre: 'La rupture du contrat de travail', sousTitre: 'Résiliation, licenciement, préavis, certificat de fin de service — Titre IV (2/2), art. 61–85', duree: '5h', actif: false, route: '/ue1/chapitre-4' },
  { num: 5, titre: 'La rémunération : salaire, SMIG et sa protection', sousTitre: 'Égalité salariale, paiement, saisies, actualité SMIG 2025-2026 — Titre V, art. 86–118', duree: '4h', actif: false, route: '/ue1/chapitre-5' },
  { num: 6, titre: 'Durée du travail, repos et congés', sousTitre: 'Durée légale, heures supplémentaires, repos, congés — Titre VI, art. 119–158', duree: '4h', actif: false, route: '/ue1/chapitre-6' },
  { num: 7, titre: 'Santé, sécurité et protection sociale', sousTitre: 'Sécurité au travail, médecine du travail, CNSS — Titres VII–VIII + Décret n°18/041', duree: '5h', actif: false, route: '/ue1/chapitre-7' },
  { num: 8, titre: 'Administration du travail et relations collectives', sousTitre: 'Inspection, ONEM, CNT, syndicats, conventions collectives — Titres IX–XII, art. 185–296', duree: '6h', actif: false, route: '/ue1/chapitre-8' },
  { num: 9, titre: 'Contentieux du travail, sanctions et actualités', sousTitre: 'Conciliation, tribunaux, prescriptions, réformes en cours — Titres XIII–XVI', duree: '4h', actif: false, route: '/ue1/chapitre-9' },
  { num: 10, titre: 'Pratique professionnelle : le décompte final', sousTitre: 'Préavis, congé, gratification, retenues CNSS/IPR, écritures SYSCOHADA', duree: '4h', actif: false, route: '/ue1/chapitre-10' },
]

export default function UE1DroitTravailPage() {
  const [, navigate] = useHashLocation()
  const totalHeures = CHAPITRES.reduce((s, c) => s + parseInt(c.duree), 0)

  return (
    <div className={cn('space-y-4 pb-10 animate-fadeIn')}>
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <Breadcrumb
            items={[
              { label: 'Mes cours', route: '/mes-cours' },
              { label: 'UE 1 — Droit du travail' },
            ]}
            color="emerald"
          />
          <h1 className={cn('font-display text-lg font-bold leading-tight truncate mt-1', ENCRE)}>Droit du travail</h1>
          <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Loi n°015/2002 du 16/10/2002, mod. Loi n°16/010 du 15/07/2016</p>
        </div>
      </div>

      {/* Couverture du manuel */}
      <div className={cn('rounded-2xl border overflow-hidden', LIGNE, PAPIER_CARD)}>
        <div className="p-5 sm:p-6">
          <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border', VERT, VERT_BORDER)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', VERT_BG)} />
            Unité d'enseignement 1
          </span>
          <p className={cn('text-sm italic mt-3', MUTED)}>Manuel de cours — le Code du travail congolais et son environnement social</p>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Volume horaire', value: `${totalHeures}h` },
              { label: 'Chapitres', value: String(CHAPITRES.length) },
              { label: 'Édition à jour', value: '2026' },
            ].map(s => (
              <div key={s.label} className={cn('rounded-xl border p-3 text-center', LIGNE, PAPIER)}>
                <p className={cn('text-xl font-bold', VERT)}>{s.value}</p>
                <p className={cn('text-[11px] mt-0.5', MUTED)}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className={cn('mt-4 pt-4 border-t text-xs leading-relaxed', LIGNE, MUTED)}>
            <b className={ENCRE}>Sources :</b> Loi n°015/2002 du 16/10/2002 portant Code du travail, mod. Loi n°16/010 du 15/07/2016 · Décret n°18/041 du 24/11/2018 (cotisations CNSS) · Décret n°25/22 du 30/05/2025 (SMIG) — références complètes en pied de chaque chapitre.
          </div>
        </div>
      </div>

      {/* Objectifs du cours */}
      <div className={cn('rounded-xl border p-4', VERT_BORDER, VERT_SOFT)}>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className={cn('h-4 w-4', VERT)} />
          <span className={cn('text-sm font-semibold', VERT)}>Objectifs du cours</span>
        </div>
        <ul className="space-y-1.5">
          {[
            'Maîtriser les notions fondamentales et les sources du droit du travail congolais',
            'Comprendre le cycle de vie complet de la relation de travail : formation, exécution, rupture du contrat',
            'Appliquer les règles de rémunération, de durée du travail et de protection sociale (CNSS)',
            'Calculer un décompte final (solde de tout compte) dans les principales situations de rupture',
            'Situer l\'actualité législative et réglementaire récente (SMIG 2025-2026, réformes en gestation)',
          ].map((obj, i) => (
            <li key={i} className={cn('flex items-start gap-2 text-xs', ENCRE)}>
              <CheckCircle2 className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', VERT)} />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sommaire */}
      <div>
        <h2 className={cn('text-sm font-display font-semibold mb-2 px-1', ENCRE)}>Sommaire — {CHAPITRES.length} chapitres, {totalHeures}h</h2>
        <div className={cn('rounded-2xl border overflow-hidden divide-y', LIGNE, PAPIER_CARD)} style={{ ['--tw-divide-opacity' as any]: 1 }}>
          {CHAPITRES.map((ch) => {
            const bloque = !ch.actif
            return bloque ? (
              <div key={ch.num} className={cn('flex items-center gap-3 px-4 py-4 opacity-50 cursor-not-allowed border-b last:border-b-0', LIGNE)}>
                <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold font-mono border', VERT, VERT_BORDER)}>
                  {ch.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('font-semibold text-sm leading-tight', ENCRE)}>{ch.titre}</p>
                  <p className={cn('text-xs mt-0.5 truncate', MUTED)}>{ch.sousTitre}</p>
                  <span className={cn('text-[11px] mt-1 inline-block', MUTED)}>{ch.duree}</span>
                </div>
                <Lock className={cn('h-3.5 w-3.5 shrink-0', MUTED)} />
              </div>
            ) : (
              <button
                key={ch.num}
                onClick={() => navigate(ch.route)}
                className={cn('group w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-black/[.02] transition-colors duration-150 border-l-4 border-b last:border-b-0', VERT_BORDER, LIGNE)}
              >
                <div className={cn('h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold font-mono transition-transform duration-200 group-hover:scale-110 text-white', VERT_BG)}>
                  {ch.num}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('font-semibold text-sm leading-tight transition-colors', ENCRE)}>{ch.titre}</p>
                  <p className={cn('text-xs mt-0.5 truncate', MUTED)}>{ch.sousTitre}</p>
                  <span className={cn('text-[11px] mt-1 inline-block', MUTED)}>{ch.duree}</span>
                </div>
                <ChevronRight className={cn('h-4 w-4 group-hover:translate-x-0.5 transition-all duration-200 shrink-0', VERT)} />
              </button>
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
