import React, { useState, useEffect, useRef } from 'react'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CheckCircle2, XCircle, ChevronRight, ArrowLeft, ArrowUp, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'
import { TexteEnrichi } from './TexteEnrichi'
import type { Bloc, CasPratique, Chapitre, Reference, Tableau } from '@/lib/chapitre-types'

// ─────────────────────────────────────────────────────────────────────────────
// MOTEUR DE RENDU D'UN CHAPITRE, FORME « MANUSCRIT DE COURS »
//
// Ce composant est l'unique endroit où vit la mise en forme d'un chapitre.
// Chaque chapitre du logiciel se réduit désormais à un objet de données
// (voir lib/chapitre-types.ts) que ce moteur affiche.
//
// Avant cette refonte, chaque chapitre était un fichier React d'environ
// 750 lignes qui recopiait cette structure : la palette y était redéclarée,
// la logique de défilement réécrite, et le composant de cas pratique dupliqué
// à l'identique dans 29 fichiers. Toute amélioration de forme devait donc être
// répercutée manuellement, fichier par fichier.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Identité visuelle, désormais déclarée une seule fois ────────────────────
const ENCRE = 'text-[#262019]'
const ENCRE_DOUX = 'text-[#6B6047]'
const ENCRE_FAIBLE = 'text-[#948868]'
const PAPIER = 'bg-[#EDE6D3]'
const PAPIER_CARD = 'bg-[#F8F4E8]'
const LIGNE = 'border-[#D9CFA9]'
const LIGNE_FORTE = 'border-[#C6B788]'
const VERT = 'text-[#1E4A3D]'
const VERT_BG = 'bg-[#1E4A3D]'
const VERT_BORDER = 'border-[#1E4A3D]'
const VERT_SOFT = 'bg-[#1E4A3D]/8'
const AMBRE = 'text-[#8A6416]'
const LETTRINE = 'first-letter:font-serif first-letter:font-bold first-letter:text-5xl first-letter:float-left first-letter:leading-[0.8] first-letter:pr-2 first-letter:pt-1 first-letter:text-[#1E4A3D]'

// ─── Question à choix multiple, autonome ─────────────────────────────────────
function QuestionQCM({ q }: { q: QCMChapitre }) {
  const [choisi, setChoisi] = useState<string | null>(null)
  const [corrige, setCorrige] = useState(false)
  return (
    <div className={cn('rounded-sm border p-4 space-y-3', LIGNE_FORTE, PAPIER_CARD)}>
      <p className={cn('text-sm', ENCRE)}>{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-sm border transition-colors '
          if (!corrige) cls += choisi === opt.id ? cn(VERT_BORDER, 'bg-[#1E4A3D]/10', ENCRE) : cn(LIGNE, 'hover:bg-black/[.02]')
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-600 bg-green-50 text-green-800'
          else if (opt.id === choisi) cls += 'border-red-400 bg-red-50 text-red-600'
          else cls += cn(LIGNE, 'opacity-50')
          return (
            <button key={opt.id} className={cls} onClick={() => { if (!corrige) setChoisi(opt.id) }} disabled={corrige}>
              <span className="font-mono font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}
            </button>
          )
        })}
      </div>
      {!corrige && (
        <button
          onClick={() => { if (choisi) setCorrige(true) }}
          disabled={!choisi}
          className={cn('text-xs text-white rounded-sm px-4 py-1.5 disabled:opacity-40 transition-colors font-mono', VERT_BG)}
        >
          Vérifier
        </button>
      )}
      {corrige && (
        <div className={cn('rounded-sm p-3 text-xs', choisi === q.reponseCorrecte ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700')}>
          <div className="flex items-center gap-1 font-semibold mb-1">
            {choisi === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {choisi === q.reponseCorrecte ? 'Correct' : 'Incorrect'}
            <span className="ml-auto font-mono opacity-60">{q.articleRef}</span>
          </div>
          <p>{q.explication}</p>
          <button onClick={() => { setChoisi(null); setCorrige(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

// ─── Cas pratique dépliable ──────────────────────────────────────────────────
function BlocCasPratique({ cp, index }: { cp: CasPratique; index: number }) {
  const [ouvert, setOuvert] = useState(false)
  const [corrections, setCorrections] = useState<Set<number>>(new Set())
  return (
    <div className={cn('rounded-sm border overflow-hidden', LIGNE_FORTE, PAPIER_CARD)}>
      <button onClick={() => setOuvert(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-black/[.02] transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className={cn('font-serif font-bold text-lg shrink-0', VERT)}>{String(index + 1).padStart(2, '0')}</span>
          <p className={cn('text-sm font-semibold', ENCRE)}>{cp.titre}</p>
        </div>
        <ChevronRight className={cn('h-4 w-4 shrink-0 transition-transform', VERT, ouvert && 'rotate-90')} />
      </button>
      {ouvert && (
        <div className={cn('px-4 pb-4 space-y-4 border-t pt-4', LIGNE)}>
          <div className={cn('rounded-sm p-3 border', LIGNE_FORTE, PAPIER)}>
            <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', AMBRE)}>Contexte</p>
            <p className={cn('text-xs leading-relaxed', ENCRE_DOUX)}>{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className={cn('text-xs font-semibold', ENCRE)}>Question {q.num} : {q.enonce}</p>
                {corrections.has(q.num) ? (
                  <div className="rounded-sm bg-green-50 border border-green-200 p-3">
                    <p className="text-xs font-semibold text-green-800 mb-1">Correction</p>
                    <p className="text-xs text-green-900 leading-relaxed">{q.correction}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrections(s => new Set([...s, q.num]))} className={cn('text-xs hover:underline font-medium', VERT)}>Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tableau ─────────────────────────────────────────────────────────────────
function BlocTableau({ t }: { t: Tableau }) {
  return (
    <table className="w-full text-xs border-collapse mt-2">
      <thead>
        <tr className={VERT_SOFT}>
          {t.entetes.map((e, i) => (
            <th key={i} className={cn('text-left p-2 border font-semibold', LIGNE)}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {t.lignes.map((ligne, i) => (
          <tr key={i} className="even:bg-black/[.02]">
            {ligne.map((cellule, j) => (
              <td key={j} className={cn('p-2 border', LIGNE)}>
                <TexteEnrichi texte={cellule} classeFort={cn('font-semibold', VERT)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ─── Un bloc de corps de section ─────────────────────────────────────────────
function BlocSection({ bloc, lettrine }: { bloc: Bloc; lettrine: boolean }) {
  switch (bloc.type) {
    case 'paragraphe':
      return (
        <p className={lettrine ? LETTRINE : undefined}>
          <TexteEnrichi texte={bloc.texte} classeFort={cn('font-semibold', VERT)} />
        </p>
      )

    case 'filet':
      return (
        <div className={cn('rounded-sm border-l-[3px] pl-4 py-1 my-2', VERT_BORDER)}>
          <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', VERT)}>{bloc.titre}</p>
          <p className={cn('text-xs italic', ENCRE_DOUX)}>
            <TexteEnrichi texte={bloc.texte} classeFort="font-semibold" />
          </p>
        </div>
      )

    case 'carte':
      return (
        <div className={cn('rounded-sm p-4 border', LIGNE_FORTE, PAPIER_CARD)}>
          <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', ENCRE_FAIBLE)}>{bloc.titre}</p>
          {bloc.texte && (
            <p className={cn('text-xs leading-relaxed', ENCRE_DOUX)}>
              <TexteEnrichi texte={bloc.texte} classeFort={cn('font-semibold', VERT)} />
            </p>
          )}
          {bloc.tableau && <BlocTableau t={bloc.tableau} />}
          {bloc.liste && (
            <ul className={cn('text-xs space-y-1.5 list-disc list-inside', ENCRE_DOUX)}>
              {bloc.liste.map((item, i) => (
                <li key={i}><TexteEnrichi texte={item} classeFort="font-semibold" /></li>
              ))}
            </ul>
          )}
          {bloc.note && (
            <p className={cn('text-xs mt-2', ENCRE_DOUX)}>
              <TexteEnrichi texte={bloc.note} classeFort={cn('font-semibold', VERT)} />
            </p>
          )}
        </div>
      )

    case 'tableau':
      return <div className="overflow-x-auto"><BlocTableau t={bloc.tableau} /></div>

    case 'controle':
      return (
        <div className="my-4">
          <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', AMBRE)}>Vérification de lecture</p>
          <QuestionQCM q={bloc.question} />
        </div>
      )
  }
}

// ─── Référence bibliographique ───────────────────────────────────────────────
function LigneReference({ r }: { r: Reference }) {
  switch (r.genre) {
    case 'ouvrage':
      return <>{r.auteur}, <i>{r.titre}</i>, {r.editeur}, {r.lieu}, {r.annee}.</>
    case 'article':
      return <>{r.auteur}, « {r.titre} », <i>{r.support}</i>{r.precision ? `, ${r.precision}` : ''}.</>
    case 'texte':
      return <>{r.intitule}{r.precision ? `, ${r.precision}` : ''}.</>
  }
}

type Vue = 'lecture' | 'qcm' | 'cas' | 'devoir'

// ─────────────────────────────────────────────────────────────────────────────
export default function ChapitreManuscrit({ chapitre }: { chapitre: Chapitre }) {
  const goBack = useGoBack(chapitre.retourRoute)
  const utilisateur = useUser()
  const estEtudiant = isStudentRole(utilisateur)
  const [vue, setVue] = useState<Vue>('lecture')
  const [afficherRemonter, setAfficherRemonter] = useState(false)
  const sommetRef = useRef<HTMLDivElement>(null)

  // Le changement de vue ramène en haut : le conteneur défilant réel est le
  // <main> du Layout (overflow-auto), pas la fenêtre, d'où la double remise à
  // zéro.
  useEffect(() => {
    sommetRef.current?.scrollIntoView({ block: 'start' })
    document.querySelector('main')?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }, [vue])

  // Le chapitre affiché peut changer sans démontage du composant (route
  // dynamique) : on revient alors à la lecture, en haut de page.
  useEffect(() => {
    setVue('lecture')
  }, [chapitre.id])

  // L'écoute est posée en phase de capture : un événement de défilement ne
  // remonte pas depuis un conteneur imbriqué jusqu'à window.
  useEffect(() => {
    const verifier = () => {
      const main = document.querySelector('main')
      setAfficherRemonter((main?.scrollTop ?? 0) > 400 || window.scrollY > 400)
    }
    window.addEventListener('scroll', verifier, true)
    verifier()
    return () => window.removeEventListener('scroll', verifier, true)
  }, [])

  const remonterEnHaut = () => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const casPratiquesExistants: CasPratiqueExistant[] = chapitre.casPratiques.map(cp => ({
    id: cp.id,
    titre: cp.titre,
    enonce: cp.contexte + '\n' + cp.questions.map(q => `Question ${q.num} : ${q.enonce}`).join('\n'),
    corrigeType: cp.questions.map(q => `Question ${q.num} : ${q.correction}`).join('\n'),
  }))

  return (
    <div ref={sommetRef} className="space-y-4 pb-10 animate-fadeIn">
      {afficherRemonter && (
        <button
          onClick={remonterEnHaut}
          aria-label="Remonter en haut de la page"
          className={cn('fixed bottom-20 md:bottom-6 right-4 z-40 h-10 w-10 rounded-full text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105', VERT_BG)}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: chapitre.moduleLabel, route: chapitre.retourRoute },
            { label: `Chapitre ${chapitre.numero}` },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className={cn('font-display text-lg font-bold leading-tight', ENCRE)}>{chapitre.titre}</h1>
          <InfoTooltip texte={chapitre.infoBulle} loi={chapitre.loiRef} />
        </div>
        <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">{chapitre.sousTitre}</p>
      </div>

      {vue === 'lecture' && (
        <>
          <div className={cn('rounded-sm border p-4 space-y-1', PAPIER_CARD, LIGNE)}>
            {chapitre.objectifs.map((o, i) => (
              <p key={i} className={cn('flex items-start gap-2 text-xs', ENCRE_DOUX)}>
                <span className={cn('font-mono shrink-0', VERT)}>{i + 1}.</span>
                <span>{o}</span>
              </p>
            ))}
          </div>

          <div className="grid gap-0 lg:grid-cols-[180px_1fr] lg:gap-10">
            <nav className="hidden lg:block">
              <div className="sticky top-4 space-y-1 pt-2">
                <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-3', ENCRE_FAIBLE)}>Dans ce chapitre</p>
                {chapitre.sections.map((s, i) => (
                  <a
                    key={i}
                    href={`#s${i + 1}`}
                    className={cn('block text-xs leading-snug py-1.5 pl-3 border-l-2', LIGNE, ENCRE_FAIBLE, 'hover:text-[#1E4A3D] hover:border-[#1E4A3D] transition-colors')}
                  >
                    {s.navLabel}
                  </a>
                ))}
              </div>
            </nav>

            <div className="min-w-0 space-y-14">
              {chapitre.sections.map((section, i) => {
                // La lettrine revient au premier paragraphe de la section, et à
                // lui seul : c'est une règle de rendu, jamais une décision du
                // rédacteur.
                const premierParagraphe = section.blocs.findIndex(b => b.type === 'paragraphe')
                return (
                  <section key={i} id={`s${i + 1}`} className="scroll-mt-16">
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className={cn('font-serif font-bold text-sm', VERT)}>{section.numero}</span>
                      <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>{section.titre}</h2>
                    </div>
                    <div className={cn('space-y-4 text-[15px] leading-[1.75]', ENCRE)}>
                      {section.blocs.map((bloc, j) => (
                        <BlocSection key={j} bloc={bloc} lettrine={j === premierParagraphe} />
                      ))}
                    </div>
                  </section>
                )
              })}

              <div className={cn('pt-8 border-t-2', 'border-[#262019]')}>
                <p className={cn('font-serif font-bold text-base mb-4', ENCRE)}>À retenir</p>
                <ul className="space-y-0">
                  {chapitre.aRetenir.map((l, i) => (
                    <li key={i} className={cn('flex items-start gap-3 text-sm py-2.5 border-b', LIGNE, ENCRE_DOUX)}>
                      <span className={VERT}>▪</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#D9CFA9]">
                <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-3', ENCRE_FAIBLE)}>Références citées</p>
                <ul className="space-y-0">
                  {chapitre.references.map((r, i) => (
                    <li key={i} className={cn('text-xs py-2 border-b', LIGNE, ENCRE_FAIBLE)}><LigneReference r={r} /></li>
                  ))}
                </ul>
              </div>

              <div className={cn('pt-10 border-t-2', 'border-[#262019]')}>
                <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-2', AMBRE)}>Le chapitre est terminé : passez à l'épreuve</p>
                <h2 className={cn('font-serif font-bold text-2xl mb-3', ENCRE)}>S'exercer</h2>
                <p className={cn('text-sm leading-relaxed mb-6 max-w-xl', ENCRE_DOUX)}>
                  La lecture seule ne suffit pas à maîtriser une notion de droit. Les deux parcours ci-dessous couvrent l'ensemble du chapitre, pas seulement les points soulevés en cours de lecture.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => setVue('qcm')} className={cn('text-left rounded-sm border p-5 hover:border-[#1E4A3D] transition-colors', LIGNE_FORTE, PAPIER_CARD)}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={cn('font-serif font-bold text-2xl', VERT)}>{String(chapitre.qcm.length).padStart(2, '0')}</span>
                      <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>Questionnaire</span>
                    </div>
                    <p className={cn('font-serif font-bold text-base mb-2', ENCRE)}>QCM du chapitre</p>
                    <p className={cn('text-xs leading-relaxed mb-4', ENCRE_DOUX)}>Vingt questions couvrant les six sections, du rappel de cours à l'articulation de plusieurs notions.</p>
                    <span className={cn('text-xs font-mono font-semibold', VERT)}>Commencer le questionnaire →</span>
                  </button>
                  <button onClick={() => setVue('cas')} className={cn('text-left rounded-sm border p-5 hover:border-[#1E4A3D] transition-colors', LIGNE_FORTE, PAPIER_CARD)}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={cn('font-serif font-bold text-2xl', VERT)}>{String(chapitre.casPratiques.length).padStart(2, '0')}</span>
                      <span className={cn('text-[10px] font-mono uppercase tracking-wider', ENCRE_FAIBLE)}>Mise en situation</span>
                    </div>
                    <p className={cn('font-serif font-bold text-base mb-2', ENCRE)}>Cas pratiques</p>
                    <p className={cn('text-xs leading-relaxed mb-4', ENCRE_DOUX)}>Cinq situations à plusieurs strates, exigeant de croiser plusieurs notions du chapitre.</p>
                    <span className={cn('text-xs font-mono font-semibold', VERT)}>Ouvrir les cas pratiques →</span>
                  </button>
                </div>
              </div>

              {!estEtudiant && (
                <div className={cn('rounded-sm border border-dashed p-5 flex items-center justify-between gap-4 flex-wrap', LIGNE_FORTE, PAPIER_CARD)}>
                  <div>
                    <p className={cn('text-[10px] font-mono uppercase tracking-wider mb-1', ENCRE_FAIBLE)}>Espace professeur</p>
                    <p className={cn('text-xs', ENCRE_DOUX)}>{chapitre.qcm.length} questions QCM et {chapitre.casPratiques.length} cas pratiques disponibles pour ce chapitre.</p>
                  </div>
                  <button onClick={() => setVue('devoir')} className={cn('text-xs font-mono px-4 py-2.5 rounded-sm text-white', VERT_BG)}>Créer un devoir à partir de ce chapitre →</button>
                </div>
              )}

              <button onClick={goBack} className={cn('w-full flex items-center justify-center gap-2 py-3 rounded-sm text-white text-sm font-semibold transition-colors', VERT_BG)}>
                <GraduationCap className="h-4 w-4" /> Terminer le chapitre {chapitre.numero}
              </button>

              <p className="text-xs text-center text-muted-foreground/60 pb-2">{chapitre.sources}</p>
            </div>
          </div>
        </>
      )}

      {vue === 'qcm' && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>QCM du chapitre : {chapitre.qcm.length} questions</h2>
          <div className="grid gap-3">
            {chapitre.qcm.map(q => <QuestionQCM key={q.id} q={q} />)}
          </div>
        </div>
      )}

      {vue === 'cas' && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <h2 className={cn('font-serif font-bold text-xl', ENCRE)}>Cas pratiques : {chapitre.casPratiques.length} mises en situation</h2>
          <div className="space-y-3">
            {chapitre.casPratiques.map((cp, i) => <BlocCasPratique key={cp.id} cp={cp} index={i} />)}
          </div>
        </div>
      )}

      {vue === 'devoir' && !estEtudiant && (
        <div className="space-y-4">
          <button onClick={() => setVue('lecture')} className={cn('flex items-center gap-1.5 text-xs font-mono', VERT)}>
            <ArrowLeft className="h-3.5 w-3.5" /> Retour à la lecture
          </button>
          <DevoirChapitreCreateur
            chapitreId={chapitre.id}
            chapitreNom={`Chapitre ${chapitre.numero} : ${chapitre.titre}`}
            questions={chapitre.qcm}
            coursId={chapitre.coursId}
            casPratiquesExistants={casPratiquesExistants}
          />
        </div>
      )}
    </div>
  )
}
