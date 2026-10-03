/**
 * DevoirChapitreCreateur.tsx
 * Composant utilisé côté PROFESSEUR dans chaque page chapitre (tout module -
 * UE1 via ChapitreManuscrit, UE2/UE5/UE13 directement) pour réutiliser le
 * contenu du chapitre (QCM, cas pratiques) plutôt que de le ressaisir.
 *
 * Deux destinations :
 *  - Devoir noté   : ciblé Université -> Faculté -> Promotion, date limite,
 *    corrigé (QCM auto-noté, cas pratiques évalués par IA).
 *      - QCM seul  (qcm_chapitre) : sélection libre de questions, 1 pt/question -> /20
 *      - QCM + Cas (qcm_cas)      : QCM (10 pts) + cas pratiques existants (10 pts) = /20
 *      - Questions rédigées (redaction) : cas du chapitre et/ou questions
 *        écrites par l'enseignant, 20 pts répartis. Les réponses attendues
 *        sont rangées à part (devoirs_corriges), hors de portée des étudiants,
 *        et servent de référence à la proposition de note de l'IA.
 *  - Exercice libre : entraînement sans note ni date limite, publié dans le
 *    module Exercices (ExercicesPage) plutôt que dans les devoirs. Le type
 *    (qcm / theorique / mixte) est dérivé de ce qui est sélectionné : QCM
 *    seul, cas pratique(s) seul(s), ou les deux.
 */
import { useState, useEffect } from 'react'
import {
  CheckCircle2, XCircle, Send, ChevronDown, ChevronUp,
  BookOpen, FileText, CheckSquare, Square, CalendarClock, Dumbbell, PenLine, Plus, Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { repartirPoints } from '@/lib/correctionQCM'
import { QCMChapitre, CasPratique, PROMOTIONS } from '@/lib/db'
import { createDevoirAvecCorrigeAsync, createExerciceLibreAsync, coursDeFaculte, separerCorrigeQCM } from '@/lib/db-firebase'
import { useAllCours } from '@/lib/useFirestore'
import { codePromotion } from '@/lib/promotion'
import { db } from '@/lib/firebase'
import { useUser } from '@/lib/userContext'
import { notifyFirestoreError } from '@/lib/firestoreErrorHandler'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// ─── Types locaux ──────────────────────────────────────────────────────────────

interface Universite { id: string; nom: string }
interface Faculte    { id: string; nom: string; universiteId: string }

type TypeDevoir = 'qcm_chapitre' | 'qcm_cas' | 'redaction'

// Forme réellement attendue par ExercicesPage.tsx (QCMBuilder, ModalCorrige,
// session d'exercice libre) pour ExerciceLibre.questions - distincte de
// l'interface QuestionQCM exportée par lib/db.ts (texte/choix/bonneReponse),
// non utilisée par ce module malgré le typage. Reproduire ce nom local plutôt
// que le type "canonique" pour que les QCM importés d'un chapitre s'affichent
// correctement une fois soumis comme exercice libre.
interface QuestionQCMExerciceLibre {
  enonce: string
  options: string[]
  reponseCorrecte: number
}

// Cas pratique existant dans le chapitre (passé depuis la page)
export interface CasPratiqueExistant {
  id: string
  titre: string
  enonce: string       // texte complet (contexte + questions)
  corrigeType: string  // correction type complète
}

// Format "brut" utilisé par les pages de chapitre pour leurs études de cas :
// un contexte global suivi de plusieurs questions numérotées, chacune avec sa correction.
export interface EtudeDeCasRaw {
  id?: string
  titre: string
  contexte: string
  questions: { num: number | string; enonce: string; correction: string }[]
}

// Convertit une étude de cas "page" (contexte + questions numérotées) vers le format
// CasPratiqueExistant attendu par ce composant (énoncé et corrigé regroupés en un seul texte).
export function versCasPratiqueExistant(cas: EtudeDeCasRaw, index = 0): CasPratiqueExistant {
  return {
    id: cas.id ?? `cas-${index + 1}`,
    titre: cas.titre,
    enonce: [
      cas.contexte,
      ...cas.questions.map(q => `Question ${q.num} : ${q.enonce}`),
    ].join('\n\n'),
    corrigeType: cas.questions.map(q => `Question ${q.num} : ${q.correction}`).join('\n\n'),
  }
}

// Devoir à questions rédigées : au plus 5 questions (cas du chapitre et
// questions de l'enseignant réunis), 20 points répartis également, le reste
// de la division sur la dernière.
const MAX_QUESTIONS_REDIGEES = 5

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  chapitreId: string
  chapitreNom: string
  questions: QCMChapitre[]
  coursId: string
  casPratiquesExistants?: CasPratiqueExistant[]
  universiteId?: string
  faculteId?: string
  // Formulaire déplié d'emblée (vue « devoir » du chapitre, où il est seul).
  ouvertParDefaut?: boolean
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function DevoirChapitreCreateur({
  chapitreId, chapitreNom, questions, coursId,
  casPratiquesExistants = [],
  universiteId: uniIdProp, faculteId: facIdProp, ouvertParDefaut = false,
}: Props) {

  // Profil de la session Firebase. L'ancien getCurrentUser() lisait une liste
  // de comptes en localStorage qui n'est plus alimentée : il renvoyait null,
  // et le bouton de création restait désactivé en permanence.
  const user = useUser()

  // Ouverture/fermeture
  const [ouvert, setOuvert] = useState(ouvertParDefaut)

  // Devoir noté (envoyé, corrigé/évalué, avec date limite) ou exercice libre
  // (entraînement sans note ni date limite, disponible dans le module
  // Exercices) : même contenu du chapitre (QCM, cas pratiques), deux
  // destinations possibles plutôt que de ressaisir le contenu une seconde
  // fois pour l'entraînement.
  const [destinataire, setDestinataire] = useState<'devoir' | 'exercice'>('devoir')

  // Type de devoir
  const [typeDevoir, setTypeDevoir] = useState<TypeDevoir>('qcm_chapitre')

  // Données Firestore (universités / facultés)
  const [universites, setUniversites] = useState<Universite[]>([])
  const [facultes,    setFacultes]    = useState<Faculte[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'universites'), snap => {
      setUniversites(snap.docs.map(d => ({ id: d.id, ...d.data() } as Universite)))
    }, err => notifyFirestoreError('DevoirChapitreCreateur.universites', err))
    return () => unsub()
  }, [])

  // Sélects en cascade
  const [uniId,  setUniId]  = useState<string>(uniIdProp || '')
  const [facId,  setFacId]  = useState<string>(facIdProp || '')
  const [promoId, setPromoId] = useState<string>(PROMOTIONS[0])

  useEffect(() => {
    if (!uniId) { setFacultes([]); return }
    const q = query(collection(db, 'facultes'), where('universiteId', '==', uniId))
    const unsub = onSnapshot(q, snap => {
      setFacultes(snap.docs.map(d => ({ id: d.id, ...d.data() } as Faculte)))
    }, err => notifyFirestoreError('DevoirChapitreCreateur.facultes', err))
    return () => unsub()
  }, [uniId])

  useEffect(() => {
    if (!facultes.find(f => f.id === facId)) setFacId(facultes.length === 1 ? facultes[0].id : '')
  }, [facultes])

  // Une seule université, ou celle du compte : choisie d'office.
  useEffect(() => {
    if (uniId || universites.length === 0) return
    const duCompte = (user as any)?.universiteId
    if (duCompte && universites.some(u => u.id === duCompte)) setUniId(duCompte)
    else if (universites.length === 1) setUniId(universites[0].id)
  }, [universites])

  // Cours réel de la faculté choisie pour l'UE de ce chapitre. Le devoir
  // recevait jusqu'ici l'identifiant du module (« ue1-droit-travail »), qui ne
  // désigne aucun cours : aucun étudiant, inscrit au cours de sa faculté, ne
  // pouvait le lire.
  const { cours: coursDocs } = useAllCours()
  const coursCible = facId ? coursDeFaculte(coursDocs, facId, coursId) : undefined
  // Un cours réservé à une promotion impose cette promotion au devoir.
  useEffect(() => {
    const promo = codePromotion(coursCible?.promotion)
    if (promo) setPromoId(promo)
  }, [coursCible?.id])

  // Formulaire
  const [titre, setTitre] = useState(`Devoir : ${chapitreNom}`)
  // Titre proposé selon la destination, tant qu'il n'a pas été retouché : un
  // exercice libre s'intitulait « Devoir : … ».
  useEffect(() => {
    setTitre(t => (t === `Devoir : ${chapitreNom}` || t === `Exercice : ${chapitreNom}`)
      ? `${destinataire === 'devoir' ? 'Devoir' : 'Exercice'} : ${chapitreNom}`
      : t)
  }, [destinataire, chapitreNom])
  // Par défaut : dans sept jours à 23 h 59, heure locale (le champ
  // datetime-local attend l'heure locale ; toISOString donnait l'heure UTC).
  const [dateLimit, setDateLimit] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 7); d.setHours(23, 59, 0, 0)
    const p2 = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}T${p2(d.getHours())}:${p2(d.getMinutes())}`
  })

  // Sélection QCM - libre, pas de limite max
  const [selection, setSelection] = useState<Set<string>>(new Set())

  const toggleQuestion = (id: string) => {
    setSelection(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  // Reset sélection si type ou destinataire change
  useEffect(() => { setSelection(new Set()); setSelectionCas(new Set()) }, [typeDevoir, destinataire])

  // Sélection des cas pratiques existants. Limite à 2 uniquement pour un
  // devoir noté (barème /20 conçu pour au plus 2 cas) - un exercice libre
  // n'a pas de barème fixe, la limite ne s'applique donc pas.
  const [selectionCas, setSelectionCas] = useState<Set<string>>(new Set())
  const maxCasDevoir = typeDevoir === 'redaction' ? MAX_QUESTIONS_REDIGEES : 2

  // Questions écrites par l'enseignant (devoir à questions rédigées), avec
  // leur réponse attendue.
  const [questionsPerso, setQuestionsPerso] = useState<{ question: string; reponse: string }[]>([])
  const questionsPersoValides = questionsPerso.filter(q => q.question.trim() && q.reponse.trim())

  const toggleCas = (id: string) => {
    setSelectionCas(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (destinataire === 'devoir' && next.size >= maxCasDevoir) return prev // barème du devoir noté
        next.add(id)
      }
      return next
    })
  }

  // Calcul barème
  const nbQCMSelectionnes = selection.size
  const nbCasSelectionnes = selectionCas.size

  const getBaremeLabel = () => {
    if (typeDevoir === 'redaction') {
      const n = nbCasSelectionnes + questionsPersoValides.length
      if (n === 0) return 'Choisissez des cas du chapitre ou écrivez vos questions'
      return `${n} question${n > 1 ? 's' : ''} rédigée${n > 1 ? 's' : ''} : ${repartirPoints(n).join(' + ')} = 20 pts`
    }
    if (typeDevoir === 'qcm_chapitre') {
      if (nbQCMSelectionnes === 0) return 'Sélectionnez des questions QCM'
      return `${nbQCMSelectionnes} question${nbQCMSelectionnes > 1 ? 's' : ''} × 1 pt = ${nbQCMSelectionnes} pts → note /20`
    } else {
      const ptsCas = nbCasSelectionnes > 0 ? Math.floor(10 / nbCasSelectionnes) : 0
      return `QCM : 10 pts + ${nbCasSelectionnes} cas (${ptsCas} pts chacun) = /20`
    }
  }

  // Formulaire en trois étapes : 1. type et titre · 2. pour qui et quand ·
  // 3. questions. Tout s'affichait d'un bloc, sur un écran très long.
  const [etape, setEtape] = useState<1 | 2 | 3>(1)
  const etape1Ok = !!titre.trim()
  const etape2Ok = !!uniId && !!facId && !!coursCible && (destinataire === 'exercice' || (!!promoId && !!dateLimit))
  const messageEtape2 = !uniId ? 'Sélectionnez une université.'
    : !facId ? 'Sélectionnez une faculté.'
    : !coursCible ? "Cette UE n'est pas encore ouverte dans la faculté choisie : l'administrateur l'ouvre en visitant l'Espace pédagogique."
    : 'Indiquez la promotion et la date limite.'

  // État soumission
  const [loading, setLoading] = useState(false)
  const [succes,  setSucces]  = useState(false)
  const [erreur,  setErreur]  = useState('')

  // Validation
  const peutCreer = (() => {
    if (!titre.trim() || !user) return false
    if (!uniId || !facId || !coursCible) return false
    if (destinataire === 'devoir') {
      if (!dateLimit || !promoId) return false
      if (typeDevoir === 'redaction') {
        const n = nbCasSelectionnes + questionsPersoValides.length
        return n > 0 && n <= MAX_QUESTIONS_REDIGEES && questionsPerso.every(q => !q.question.trim() === !q.reponse.trim())
      }
      if (nbQCMSelectionnes === 0) return false
      if (typeDevoir === 'qcm_cas' && nbCasSelectionnes === 0) return false
      return true
    }
    // Exercice libre : au moins une question QCM OU un cas pratique sélectionné.
    return nbQCMSelectionnes > 0 || nbCasSelectionnes > 0
  })()

  // Création
  const handleCreer = async () => {
    if (!peutCreer) {
      setErreur(buildErreurMessage())
      return
    }
    setLoading(true); setErreur('')
    try {
      const questionsSelectionnees = questions.filter(q => selection.has(q.id))
      const casSel = casPratiquesExistants.filter(c => selectionCas.has(c.id))

      if (destinataire === 'exercice') {
        // Type dérivé de la sélection, pas d'un choix explicite : QCM seul,
        // cas seul (texte libre corrigé par le prof, pas d'IA ici), ou les deux.
        const aQCM = questionsSelectionnees.length > 0
        const aCas = casSel.length > 0
        const type = aQCM && aCas ? 'mixte' : aQCM ? 'qcm' : 'theorique'

        const questionsEx: QuestionQCMExerciceLibre[] = questionsSelectionnees.map(q => ({
          enonce: q.question,
          options: q.options.map(o => o.texte),
          reponseCorrecte: Math.max(0, q.options.findIndex(o => o.id === q.reponseCorrecte)),
        }))

        const consignesParts: string[] = []
        if (aQCM) consignesParts.push(`${questionsEx.length} question${questionsEx.length > 1 ? 's' : ''} QCM.`)
        if (aCas) consignesParts.push(casSel.map(c => `${c.titre} :\n${c.enonce}`).join('\n\n'))

        const payload: any = {
          titre: titre.trim(),
          consignes: consignesParts.join('\n\n'),
          coursId: coursCible!.id,
          universiteId: uniId,
          faculteId: facId,
          createdBy: user!.id,
          actif: true,
          type,
        }
        if (aQCM) payload.questions = questionsEx
        if (aCas) payload.corrigeTexte = casSel.map(c => `${c.titre} :\n${c.corrigeType}`).join('\n\n')

        await createExerciceLibreAsync(payload)
      } else if (typeDevoir === 'redaction') {
        // Questions : cas du chapitre puis questions de l'enseignant. Les
        // réponses attendues ne sont pas écrites dans le devoir.
        const items = [
          ...casSel.map(c => ({ id: c.id, titre: c.titre, enonce: c.enonce, corrige: c.corrigeType })),
          ...questionsPersoValides.map((q, i) => ({
            id: `q${i + 1}`, titre: `Question ${casSel.length + i + 1}`, enonce: q.question.trim(), corrige: q.reponse.trim(),
          })),
        ]
        const points = repartirPoints(items.length)
        const casPratiques: CasPratique[] = items.map((it, i) => ({
          id: it.id, titre: it.titre, enonce: it.enonce, corrigeType: '', pointsMax: points[i],
        }))
        await createDevoirAvecCorrigeAsync({
          titre: titre.trim(),
          consignes: `Répondez par écrit aux ${items.length} question${items.length > 1 ? 's' : ''}. Note sur 20.`,
          coursId: coursCible!.id,
          universiteId: uniId,
          faculteId: facId,
          promotionId: promoId,
          dateLimit: new Date(dateLimit).toISOString(),
          createdBy: user!.id,
          actif: true,
          type: 'redaction',
          chapitreId,
          chapitreNom,
          casPratiques,
        } as any, Object.fromEntries(items.map(it => [it.id, it.corrige])))
        setQuestionsPerso([])
      } else {
        // Construire les cas pratiques sélectionnés
        const pointsParCas = nbCasSelectionnes > 0 ? Math.floor(10 / nbCasSelectionnes) : 0
        const casPratiques: CasPratique[] = casSel.map((c, i) => ({
          id: c.id,
          titre: c.titre,
          enonce: c.enonce,
          corrigeType: c.corrigeType,
          pointsMax: i < nbCasSelectionnes - 1 ? pointsParCas : 10 - pointsParCas * (nbCasSelectionnes - 1),
        }))

        const consignesQCM = typeDevoir === 'qcm_chapitre'
          ? `Répondez aux ${nbQCMSelectionnes} questions QCM. Chaque bonne réponse vaut 1 point. La note finale est ramenée sur 20.`
          : `Devoir mixte : ${nbQCMSelectionnes} questions QCM (10 pts) + cas pratique(s) (10 pts) = 20 pts.`

        const payload: any = {
          titre: titre.trim(),
          consignes: consignesQCM,
          coursId: coursCible!.id,
          universiteId: uniId,
          faculteId: facId,
          promotionId: promoId,
          dateLimit: new Date(dateLimit).toISOString(),
          createdBy: user!.id,
          actif: true,
          type: typeDevoir,
          chapitreId,
          chapitreNom,
          nbQCMTotal: nbQCMSelectionnes,
        }
        // Bonnes réponses et explications rangées hors du devoir, que tout
        // étudiant du cours lit : publiées à la date limite seulement, la note
        // apparaissant alors (firestore.rules, devoirs_corriges).
        const { publiques, qcm } = separerCorrigeQCM(questionsSelectionnees)
        payload.questionsChapitre = publiques
        payload.corrigeQCMSepare = true
        payload.dateLimitMs = new Date(dateLimit).getTime()
        if (typeDevoir === 'qcm_cas') {
          // Corrigés types rangés à part (devoirs_corriges), comme pour les
          // questions rédigées : écrits dans le devoir, que tout étudiant du
          // cours lit, ils étaient lisibles avant l'envoi de la copie (cache
          // du navigateur, outils de développement).
          payload.casPratiques = casPratiques.map(c => ({ ...c, corrigeType: '' }))
          await createDevoirAvecCorrigeAsync(payload, Object.fromEntries(casPratiques.map(c => [c.id, c.corrigeType])), qcm)
        } else {
          await createDevoirAvecCorrigeAsync(payload, {}, qcm)
        }
      }
      setSucces(true)
      setEtape(1)
      setSelection(new Set())
      setSelectionCas(new Set())
      // Formulaire replié après l'envoi, sauf s'il est seul à l'écran (vue
      // « devoir » du chapitre) : il n'y resterait qu'un bandeau.
      setTimeout(() => { setSucces(false); if (!ouvertParDefaut) setOuvert(false) }, 3000)
    } catch (e: any) {
      setErreur(e.message || `Erreur lors de la création ${destinataire === 'devoir' ? 'du devoir' : "de l'exercice"}.`)
    } finally {
      setLoading(false)
    }
  }

  const buildErreurMessage = (): string => {
    if (!uniId) return 'Sélectionnez une université.'
    if (!facId) return 'Sélectionnez une faculté.'
    if (!coursCible) return "Cette UE n'est pas encore ouverte dans la faculté choisie : l'administrateur l'ouvre en visitant l'Espace pédagogique."
    if (destinataire === 'devoir' && !promoId) return 'Sélectionnez une promotion.'
    if (destinataire === 'devoir' && typeDevoir === 'redaction') {
      if (questionsPerso.some(q => !q.question.trim() !== !q.reponse.trim())) return 'Chaque question écrite doit avoir sa réponse attendue.'
      const n = nbCasSelectionnes + questionsPersoValides.length
      if (n === 0) return 'Choisissez au moins un cas du chapitre ou écrivez une question.'
      if (n > MAX_QUESTIONS_REDIGEES) return `${MAX_QUESTIONS_REDIGEES} questions au plus.`
    }
    if (destinataire === 'devoir' && typeDevoir !== 'redaction' && nbQCMSelectionnes === 0) return 'Sélectionnez au moins 1 question QCM.'
    if (destinataire === 'devoir' && typeDevoir === 'qcm_cas' && nbCasSelectionnes === 0) return 'Sélectionnez au moins 1 cas pratique.'
    if (destinataire === 'exercice' && nbQCMSelectionnes === 0 && nbCasSelectionnes === 0) return 'Sélectionnez au moins une question QCM ou un cas pratique.'
    return 'Formulaire incomplet.'
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 overflow-hidden">

      {/* En-tête */}
      <button
        onClick={() => setOuvert(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-700">
            Créer un devoir ou un exercice depuis ce chapitre
          </span>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
            {questions.length} questions disponibles
          </span>
        </div>
        {ouvert
          ? <ChevronUp className="h-4 w-4 text-indigo-500 shrink-0 transition-transform duration-200" />
          : <ChevronDown className="h-4 w-4 text-indigo-500 shrink-0 transition-transform duration-200" />
        }
      </button>

      {ouvert && (
        <div className="px-4 pb-5 space-y-4 border-t border-indigo-200 pt-4 animate-slideDown">

          {/* Étapes */}
          <ol className="grid grid-cols-3 gap-1.5 text-[11px]">
            {(['Type et titre', 'Pour qui, quand', 'Questions'] as const).map((libelle, i) => {
              const n = (i + 1) as 1 | 2 | 3
              const accessible = n === 1 || (n === 2 && etape1Ok) || (n === 3 && etape1Ok && etape2Ok)
              return (
                <li key={n}>
                  <button
                    onClick={() => accessible && setEtape(n)}
                    disabled={!accessible}
                    className={cn(
                      'w-full rounded-lg px-2 py-1.5 font-medium border transition-colors',
                      etape === n ? 'bg-indigo-600 text-white border-indigo-600'
                        : accessible ? 'bg-card text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                        : 'bg-muted/40 text-muted-foreground border-border cursor-not-allowed'
                    )}
                  >
                    {n}. {libelle}
                  </button>
                </li>
              )
            })}
          </ol>

          {etape === 1 && (<>
          {/* Destination */}
          <div>
            <label className="text-xs font-semibold text-foreground block mb-2">Destination</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { val: 'devoir',   label: 'Devoir noté', sub: 'Date limite, ciblé par promotion, corrigé', Icon: CalendarClock },
                { val: 'exercice', label: 'Exercice libre', sub: 'Entraînement sans note, dispo dans "Exercices"', Icon: Dumbbell },
              ] as const).map(opt => (
                <button
                  key={opt.val}
                  onClick={() => setDestinataire(opt.val)}
                  className={cn(
                    'text-left rounded-xl border px-3 py-2.5 transition-colors',
                    destinataire === opt.val
                      ? 'border-indigo-500 bg-indigo-100'
                      : 'border-border bg-card hover:bg-muted/40'
                  )}
                >
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><opt.Icon className="h-3.5 w-3.5 text-indigo-600" /> {opt.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Type de devoir (devoir noté uniquement - un exercice libre dérive
              son type de ce qui est sélectionné plus bas : QCM, cas, ou les deux) */}
          {destinataire === 'devoir' && (
            <div>
              <label className="text-xs font-semibold text-foreground block mb-2">Type de devoir</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {([
                  { val: 'qcm_chapitre', label: 'QCM seul', sub: '1 pt/question → /20', Icon: CheckSquare },
                  { val: 'qcm_cas',      label: 'QCM + Cas pratique', sub: 'QCM (10 pts) + cas (10 pts) = /20', Icon: FileText },
                  { val: 'redaction',    label: 'Questions rédigées', sub: 'Réponses écrites, /20, IA en appui', Icon: PenLine },
                ] as const).map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setTypeDevoir(opt.val)}
                    className={cn(
                      'text-left rounded-xl border px-3 py-2.5 transition-colors',
                      typeDevoir === opt.val
                        ? 'border-indigo-500 bg-indigo-100'
                        : 'border-border bg-card hover:bg-muted/40'
                    )}
                  >
                    <p className="text-xs font-semibold text-foreground flex items-center gap-1.5"><opt.Icon className="h-3.5 w-3.5 text-indigo-600" /> {opt.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Titre */}
          <div>
            <label className="text-xs font-semibold text-foreground block mb-1">
              {destinataire === 'devoir' ? 'Titre du devoir' : "Titre de l'exercice"}
            </label>
            <input
              type="text"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          </>)}

          {etape === 2 && (<>
          {/* Ciblage : Université -> Faculté (-> Promotion pour un devoir noté) */}
          <div className="space-y-3 rounded-xl border border-border bg-card/60 p-3">
            <p className="text-xs font-semibold text-foreground">
              {destinataire === 'devoir' ? 'Ciblage du devoir' : "Cours de rattachement de l'exercice"}
            </p>

            {/* Université */}
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Université</label>
              <select
                value={uniId}
                onChange={e => { setUniId(e.target.value); setFacId('') }}
                className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="">: Sélectionner une université :</option>
                {universites.map(u => (
                  <option key={u.id} value={u.id}>{u.nom}</option>
                ))}
              </select>
            </div>

            {/* Faculté */}
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Faculté</label>
              <select
                value={facId}
                onChange={e => setFacId(e.target.value)}
                disabled={!uniId}
                className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              >
                <option value="">: Sélectionner une faculté :</option>
                {facultes.map(f => (
                  <option key={f.id} value={f.id}>{f.nom}</option>
                ))}
              </select>
              {uniId && facultes.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1">Aucune faculté dans cette université.</p>
              )}
              {facId && !coursCible && (
                <p className="text-xs text-amber-600 mt-1">Cette UE n'est pas encore ouverte dans cette faculté.</p>
              )}
            </div>

            {/* Promotion (devoir noté uniquement - un exercice libre n'est
                pas ciblé par promotion, seulement par cours) */}
            {destinataire === 'devoir' && (
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Promotion</label>
                <select
                  value={promoId}
                  onChange={e => setPromoId(e.target.value)}
                  disabled={!facId || !!codePromotion(coursCible?.promotion)}
                  className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                >
                  {PROMOTIONS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Résumé ciblage */}
            {destinataire === 'devoir' && uniId && facId && promoId && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                <p className="text-xs text-emerald-700 font-medium">
                  Ce devoir sera envoyé à : <span className="font-bold">{promoId}</span>
                  {' : '}{facultes.find(f => f.id === facId)?.nom || ''}
                  {' : '}{universites.find(u => u.id === uniId)?.nom || ''}
                </p>
              </div>
            )}
            {destinataire === 'exercice' && uniId && facId && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
                <p className="text-xs text-emerald-700 font-medium">
                  Cet exercice sera disponible pour tous les étudiants inscrits à ce cours,
                  {' '}{facultes.find(f => f.id === facId)?.nom || ''}
                  {' : '}{universites.find(u => u.id === uniId)?.nom || ''}
                </p>
              </div>
            )}
          </div>

          {/* Date limite (devoir noté uniquement) */}
          {destinataire === 'devoir' && (
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Date limite de soumission</label>
              <input
                type="datetime-local"
                value={dateLimit}
                onChange={e => setDateLimit(e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          </>)}

          {etape === 3 && (<>
          {/* Sélection QCM - libre (pas de QCM dans un devoir à questions rédigées) */}
          {!(destinataire === 'devoir' && typeDevoir === 'redaction') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-foreground">
                Questions QCM
                {typeDevoir === 'qcm_cas' && (
                  <span className="ml-1 text-muted-foreground font-normal">(= 10 pts total)</span>
                )}
              </label>
              <span className={cn(
                'text-xs font-bold px-2 py-0.5 rounded-full',
                nbQCMSelectionnes > 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              )}>
                {nbQCMSelectionnes} sélectionnée{nbQCMSelectionnes > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {questions.map((q, i) => {
                const sel = selection.has(q.id)
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleQuestion(q.id)}
                    className={cn(
                      'w-full text-left rounded-lg border px-3 py-2.5 transition-colors text-xs',
                      sel
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-border bg-card hover:bg-muted/40'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span className={cn(
                        'h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5',
                        sel ? 'bg-indigo-600 text-white' : 'bg-muted text-muted-foreground'
                      )}>
                        {sel ? '✓' : i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground leading-snug">{q.question}</p>
                        <p className="text-muted-foreground mt-0.5">{q.articleRef}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          )}

          {/* Cas pratiques existants : pour un devoir noté uniquement en
              qcm_cas (barème /20 dédié) ; pour un exercice libre, toujours
              proposés (pas de barème fixe, l'exercice n'a pas besoin de QCM
              pour exister - un cas seul devient un exercice théorique). */}
          {(destinataire === 'exercice' || typeDevoir === 'qcm_cas' || typeDevoir === 'redaction') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-600" />
                <p className="text-xs font-semibold text-foreground">
                  {destinataire === 'exercice' ? 'Cas pratique(s)' : typeDevoir === 'redaction' ? 'Cas du chapitre (facultatif)' : 'Cas pratique(s) : 10 pts total'}
                </p>
                {destinataire === 'devoir' && <span className="text-xs text-muted-foreground">(max {maxCasDevoir} {typeDevoir === 'redaction' ? 'questions en tout' : 'cas'})</span>}
              </div>

              <div className="rounded-lg bg-violet-50 border border-violet-200 px-3 py-2">
                <p className="text-xs text-violet-700">
                  {destinataire === 'devoir'
                    ? "Le corrigé type sert de référence à la proposition de note de l'IA, que vous validez ou modifiez lors de la correction. Il n'est pas montré aux étudiants."
                    : "Le corrigé type est affiché tel quel à l'étudiant après soumission (pas d'évaluation automatique sur un exercice libre)."}
                </p>
              </div>

              {casPratiquesExistants.length === 0 ? (
                <div className="rounded-lg border border-border bg-muted/20 px-3 py-3 text-xs text-muted-foreground text-center">
                  Aucun cas pratique disponible dans ce chapitre.
                </div>
              ) : (
                <div className="space-y-2">
                  {casPratiquesExistants.map(cas => {
                    const sel = selectionCas.has(cas.id)
                    const disabled = destinataire === 'devoir' && !sel && (typeDevoir === 'redaction'
                      ? selectionCas.size + questionsPersoValides.length >= MAX_QUESTIONS_REDIGEES
                      : selectionCas.size >= maxCasDevoir)
                    return (
                      <button
                        key={cas.id}
                        onClick={() => toggleCas(cas.id)}
                        disabled={disabled}
                        className={cn(
                          'w-full text-left rounded-xl border px-3 py-3 transition-colors text-xs',
                          sel
                            ? 'border-violet-500 bg-violet-50'
                            : disabled
                              ? 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                              : 'border-border bg-card hover:bg-muted/40'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {sel
                            ? <CheckSquare className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
                            : <Square className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          }
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground">{cas.titre}</p>
                            <p className="text-muted-foreground mt-0.5 line-clamp-2">{cas.enonce}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Répartition des points (devoir noté uniquement) */}
              {destinataire === 'devoir' && typeDevoir === 'qcm_cas' && nbCasSelectionnes > 0 && (
                <div className="rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  Répartition : QCM 10 pts + Cas {nbCasSelectionnes === 1 ? '10 pts' : '5 pts chacun'}
                  {' = '}
                  <span className="font-semibold text-foreground">20 pts / 20</span>
                </div>
              )}
            </div>
          )}

          {/* Questions écrites par l'enseignant (devoir à questions rédigées) */}
          {destinataire === 'devoir' && typeDevoir === 'redaction' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PenLine className="h-4 w-4 text-sky-600" />
                <p className="text-xs font-semibold text-foreground">Vos questions</p>
              </div>
              <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2">
                <p className="text-xs text-sky-800">
                  Écrivez la question et la réponse attendue. La réponse attendue n'est jamais montrée aux étudiants : elle sert de référence à la proposition de note de l'IA.
                </p>
              </div>
              {questionsPerso.map((q, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">Question {nbCasSelectionnes + i + 1}</p>
                    <button
                      onClick={() => setQuestionsPerso(l => l.filter((_, j) => j !== i))}
                      className="text-muted-foreground hover:text-red-600"
                      aria-label={`Retirer la question ${nbCasSelectionnes + i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={q.question}
                    onChange={e => setQuestionsPerso(l => l.map((x, j) => j === i ? { ...x, question: e.target.value } : x))}
                    placeholder="Question posée à l'étudiant"
                    aria-label={`Énoncé de la question ${nbCasSelectionnes + i + 1}`}
                    className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:border-indigo-500"
                  />
                  <textarea
                    rows={3}
                    value={q.reponse}
                    onChange={e => setQuestionsPerso(l => l.map((x, j) => j === i ? { ...x, reponse: e.target.value } : x))}
                    placeholder="Réponse attendue (référence de correction)"
                    aria-label={`Réponse attendue à la question ${nbCasSelectionnes + i + 1}`}
                    className="w-full text-xs rounded-lg border border-border bg-background px-3 py-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <button
                onClick={() => setQuestionsPerso(l => [...l, { question: '', reponse: '' }])}
                disabled={nbCasSelectionnes + questionsPerso.length >= MAX_QUESTIONS_REDIGEES}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-medium rounded-lg border border-dashed border-sky-300 text-sky-700 py-2 hover:bg-sky-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-3.5 w-3.5" /> Ajouter une question
              </button>
            </div>
          )}

          {/* Barème récapitulatif (devoir noté uniquement) */}
          {destinataire === 'devoir' && (nbQCMSelectionnes > 0 || typeDevoir === 'redaction') && (
            <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-2">
              <p className="text-xs text-indigo-700 font-medium">{getBaremeLabel()}</p>
            </div>
          )}

          </>)}

          {/* Erreur / Succès */}
          {erreur && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <XCircle className="h-4 w-4 shrink-0" />
              {erreur}
            </div>
          )}
          {succes && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {destinataire === 'devoir'
                ? `Devoir créé et envoyé à ${promoId} : ${facultes.find(f => f.id === facId)?.nom || ''} !`
                : 'Exercice créé, disponible dans le module Exercices !'}
            </div>
          )}

          {/* Navigation entre étapes */}
          {etape === 2 && !etape2Ok && (
            <p className="text-xs text-amber-700">{messageEtape2}</p>
          )}
          {etape < 3 && (
            <div className="flex gap-2">
              {etape > 1 && (
                <button onClick={() => setEtape(e => (e - 1) as 1 | 2 | 3)} className="flex-1 text-xs font-semibold rounded-xl px-4 py-2.5 border border-border bg-card hover:bg-muted/50">
                  ← Précédent
                </button>
              )}
              <button
                onClick={() => setEtape(e => (e + 1) as 1 | 2 | 3)}
                disabled={etape === 1 ? !etape1Ok : !etape2Ok}
                className={cn(
                  'flex-1 text-xs font-semibold rounded-xl px-4 py-2.5 transition-colors',
                  (etape === 1 ? etape1Ok : etape2Ok) ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                Suivant →
              </button>
            </div>
          )}

          {/* Bouton créer */}
          {etape === 3 && (
          <div className="flex gap-2">
          <button onClick={() => setEtape(2)} className="text-xs font-semibold rounded-xl px-4 py-2.5 border border-border bg-card hover:bg-muted/50">
            ← Précédent
          </button>
          <button
            onClick={handleCreer}
            disabled={loading || !peutCreer}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl px-4 py-2.5 transition-colors',
              peutCreer && !loading
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            <Send className="h-3.5 w-3.5" />
            {loading
              ? 'Création en cours...'
              : destinataire === 'devoir'
                ? `Envoyer le devoir à ${promoId || '...'}`
                : "Créer l'exercice"
            }
          </button>
          </div>
          )}

          {/* Info notation */}
          <p className="text-xs text-muted-foreground text-center">
            {destinataire === 'exercice'
              ? "Entraînement libre : pas de note, corrigé consultable après soumission."
              : typeDevoir === 'qcm_chapitre'
                ? 'Score QCM ramené sur 20 points'
                : typeDevoir === 'redaction'
                  ? 'Réponses corrigées par vous, avec une proposition de note de l\'IA = /20'
                  : 'QCM (10 pts) + cas pratiques corrigés par vous, avec une proposition de note de l\'IA (10 pts) = /20'
            }
          </p>
        </div>
      )}
    </div>
  )
}
