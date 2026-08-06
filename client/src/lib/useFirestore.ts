// ═══════════════════════════════════════════════════════════════════════
//  CAMPUS OHADA : Hooks Firestore temps réel
//  Remplace complètement les lectures localStorage.
//  Chaque hook s'abonne aux changements Firestore en temps réel via onSnapshot.
// ═══════════════════════════════════════════════════════════════════════

import { useEffect, useState, useRef } from 'react'
import {
  collection, query, where, onSnapshot, orderBy,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from './firebase'
import { useUser } from './userContext'
import type {
  Session, Ecriture, Universite, Faculte, Cours, Devoir, Soumission,
  Exercice, Tentative, ExerciceLibre, TentativeExerciceLibre, Presence, NoteCours
} from './db'

function fromDoc<T>(snap: any): T {
  const data = snap.data()
  if (!data) return { id: snap.id } as T
  return { ...data, id: snap.id } as T
}

// L'opérateur Firestore "in" accepte au maximum 30 valeurs : au-delà, il faut
// découper en plusieurs requêtes et fusionner les résultats côté client.
const FIRESTORE_IN_LIMIT = 30
function chunk<T>(arr: T[], size = FIRESTORE_IN_LIMIT): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

// S'abonne à une collection filtrée par un champ "in" (coursId, ...), en
// répartissant sur plusieurs requêtes si la liste dépasse 30 valeurs.
// Nécessaire depuis que firestore.rules exige une requête contrainte pour
// certaines collections (une lecture non filtrée de toute la collection est
// refusée avec permission-denied dès que la règle dépend de resource.data).
function subscribeByFieldIn<T>(
  collectionName: string,
  field: string,
  values: string[],
  transform: (snap: any) => T,
  onData: (items: T[]) => void
): Unsubscribe {
  const groups = chunk(values)
  const perChunk: T[][] = groups.map(() => [])
  const unsubs = groups.map((group, i) =>
    onSnapshot(query(collection(db, collectionName), where(field, 'in', group)), snap => {
      perChunk[i] = snap.docs.map(transform)
      onData(perChunk.flat())
    })
  )
  return () => unsubs.forEach(u => u())
}

// ─── Sessions temps réel ──────────────────────────────────────────────────────

export function useSessions(userId: string | undefined, module?: 'syscohada' | 'sycebnl') {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setSessions([]); setLoading(false); return }

    const conditions: any[] = [where('userId', '==', userId)]
    if (module) conditions.push(where('module', '==', module))
    const q = query(collection(db, 'sessions'), ...conditions)

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => fromDoc<Session>(d))
      // Trier par dateCreation décroissante
      data.sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
      setSessions(data)
      setLoading(false)
    }, (err) => {
      console.error('useSessions error:', err)
      setLoading(false)
    })

    return () => unsub()
  }, [userId, module])

  return { sessions, loading }
}

// ─── Écritures temps réel ─────────────────────────────────────────────────────

export function useEcritures(userId: string | undefined, module?: 'syscohada' | 'sycebnl') {
  const [ecritures, setEcritures] = useState<Ecriture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setEcritures([]); setLoading(false); return }

    const conditions: any[] = [where('userId', '==', userId)]
    if (module) conditions.push(where('module', '==', module))
    const q = query(collection(db, 'ecritures'), ...conditions)

    const unsub = onSnapshot(q, (snap) => {
      setEcritures(snap.docs.map(d => fromDoc<Ecriture>(d)))
      setLoading(false)
    }, (err) => {
      console.error('useEcritures error:', err)
      setLoading(false)
    })

    return () => unsub()
  }, [userId, module])

  return { ecritures, loading }
}

// ─── Universités temps réel ───────────────────────────────────────────────────

export function useUniversites() {
  const [universites, setUniversites] = useState<Universite[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'universites'), (snap) => {
      setUniversites(snap.docs.map(d => fromDoc<Universite>(d)))
    })
    return () => unsub()
  }, [])

  return { universites }
}

// ─── Facultés temps réel ──────────────────────────────────────────────────────

export function useFacultes(universiteId?: string) {
  const [facultes, setFacultes] = useState<Faculte[]>([])

  useEffect(() => {
    const q = universiteId
      ? query(collection(db, 'facultes'), where('universiteId', '==', universiteId))
      : query(collection(db, 'facultes'))

    const unsub = onSnapshot(q, (snap) => {
      setFacultes(snap.docs.map(d => fromDoc<Faculte>(d)))
    })
    return () => unsub()
  }, [universiteId])

  return { facultes }
}

// ─── Cours temps réel ─────────────────────────────────────────────────────────

export function useCours(faculteId?: string, universiteId?: string) {
  const [cours, setCours] = useState<Cours[]>([])

  useEffect(() => {
    const conditions: any[] = []
    if (faculteId)    conditions.push(where('faculteId', '==', faculteId))
    if (universiteId) conditions.push(where('universiteId', '==', universiteId))

    const q = query(collection(db, 'cours'), ...conditions)
    const unsub = onSnapshot(q, (snap) => {
      setCours(snap.docs.map(d => fromDoc<Cours>(d)))
    })
    return () => unsub()
  }, [faculteId, universiteId])

  return { cours }
}

// ─── Tous les cours (sans filtre) ─────────────────────────────────────────────

export function useAllCours() {
  const [cours, setCours] = useState<Cours[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'cours'), (snap) => {
      setCours(snap.docs.map(d => fromDoc<Cours>(d)))
    })
    return () => unsub()
  }, [])

  return { cours }
}

// ─── Toutes les facultés (sans filtre) ────────────────────────────────────────

export function useAllFacultes() {
  const [facultes, setFacultes] = useState<Faculte[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'facultes'), (snap) => {
      setFacultes(snap.docs.map(d => fromDoc<Faculte>(d)))
    })
    return () => unsub()
  }, [])

  return { facultes }
}

// ─── Devoirs temps réel ───────────────────────────────────────────────────────

export function useDevoirs(createdBy?: string) {
  const [devoirs, setDevoirs] = useState<Devoir[]>([])

  useEffect(() => {
    const q = createdBy
      ? query(collection(db, 'devoirs'), where('createdBy', '==', createdBy))
      : query(collection(db, 'devoirs'))

    const unsub = onSnapshot(q, (snap) => {
      setDevoirs(snap.docs.map(d => fromDoc<Devoir>(d)))
    })
    return () => unsub()
  }, [createdBy])

  return { devoirs }
}

// ─── Tous les devoirs (pour les étudiants : filtrés par coursIds) ─────────────
// La contrainte de requête est dérivée du rôle réel de l'utilisateur CONNECTÉ
// (via useUser), pas d'un paramètre — c'est la même source que
// studentCoursIds() dans firestore.rules. Un étudiant doit interroger avec
// where('coursId','in', ...) : firestore.rules refuse toute lecture de
// collection non contrainte dès que la règle dépend de resource.data
// (permission-denied), même si le client compte filtrer après coup.
export function useAllDevoirs() {
  const [devoirs, setDevoirs] = useState<Devoir[]>([])
  const currentUser = useUser()
  const queryCoursIds = currentUser?.role === 'etudiant' ? ((currentUser as any).coursIds || []) : null

  useEffect(() => {
    if (queryCoursIds === null) {
      const unsub = onSnapshot(collection(db, 'devoirs'), (snap) => {
        setDevoirs(snap.docs.map(d => fromDoc<Devoir>(d)))
      })
      return () => unsub()
    }
    if (queryCoursIds.length === 0) { setDevoirs([]); return }
    return subscribeByFieldIn(
      'devoirs', 'coursId', queryCoursIds, d => fromDoc<Devoir>(d), setDevoirs
    )
  }, [JSON.stringify(queryCoursIds)])

  return { devoirs }
}

// ─── Soumissions temps réel ───────────────────────────────────────────────────

export function useSoumissions(devoirId?: string, etudiantId?: string) {
  const [soumissions, setSoumissions] = useState<Soumission[]>([])

  useEffect(() => {
    const conditions: any[] = []
    if (devoirId)   conditions.push(where('devoirId', '==', devoirId))
    if (etudiantId) conditions.push(where('etudiantId', '==', etudiantId))

    const q = query(collection(db, 'soumissions'), ...conditions)
    const unsub = onSnapshot(q, (snap) => {
      setSoumissions(snap.docs.map(d => fromDoc<Soumission>(d)))
    })
    return () => unsub()
  }, [devoirId, etudiantId])

  return { soumissions }
}

// ─── Toutes les soumissions d'un étudiant ────────────────────────────────────

export function useSoumissionsEtudiant(etudiantId: string | undefined) {
  const [soumissions, setSoumissions] = useState<Soumission[]>([])

  useEffect(() => {
    if (!etudiantId) { setSoumissions([]); return }
    const q = query(collection(db, 'soumissions'), where('etudiantId', '==', etudiantId))
    const unsub = onSnapshot(q, (snap) => {
      setSoumissions(snap.docs.map(d => fromDoc<Soumission>(d)))
    })
    return () => unsub()
  }, [etudiantId])

  return { soumissions }
}

// ─── Statuts de cours d'un étudiant ────────────────────────────────────────

export interface CoursStatut {
  coursId: string
  statut: 'en_cours' | 'complete' | 'non_commence' | null
}

export function useCoursStatuts(etudiantId: string | undefined) {
  const [statuts, setStatuts] = useState<CoursStatut[]>([])

  useEffect(() => {
    if (!etudiantId) { setStatuts([]); return }
    const q = query(collection(db, 'cours_statuts'), where('etudiantId', '==', etudiantId))
    const unsub = onSnapshot(q, (snap) => {
      setStatuts(snap.docs.map(d => ({ coursId: d.data().coursId, statut: d.data().statut || null })))
    })
    return () => unsub()
  }, [etudiantId])

  return { statuts }
}

// ─── Toutes les sessions (admin) ─────────────────────────────────────────────

// useAllSessions : admin voit toutes les sessions OU filtré par faculteId si fourni
export function useAllSessions(faculteId?: string) {
  const [sessions, setSessions] = useState<any[]>([])
  useEffect(() => {
    const q = faculteId
      ? query(collection(db, 'sessions'), where('faculteId', '==', faculteId))
      : collection(db, 'sessions')
    const unsub = onSnapshot(q, snap => setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return () => unsub()
  }, [faculteId])
  return { sessions }
}

// useAllEcritures : admin voit toutes les écritures OU filtré par faculteId si fourni
export function useAllEcritures(faculteId?: string) {
  const [ecritures, setEcritures] = useState<any[]>([])
  useEffect(() => {
    const q = faculteId
      ? query(collection(db, 'ecritures'), where('faculteId', '==', faculteId))
      : collection(db, 'ecritures')
    const unsub = onSnapshot(q, snap => setEcritures(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return () => unsub()
  }, [faculteId])
  return { ecritures }
}

// ─── Exercices ────────────────────────────────────────────────────────────────

// useExercices : filtre par coursIds (pour étudiant) + faculteId + promotion via cours
// coursList : liste des cours chargés, pour récupérer la promotion du cours
// NOTE isolation : la requête est contrainte par les coursIds RÉELS de
// l'utilisateur connecté (rôle étudiant détecté via useUser), pas par les
// paramètres — firestore.rules refuse une lecture non contrainte de toute la
// collection pour un étudiant. Conséquence assumée : un exercice sans coursId
// (contenu « global », en théorie visible de tous) n'apparaît plus dans cette
// liste pour un étudiant, seulement pour un prof/admin (requête non contrainte,
// déjà autorisée par isProf()) — cas marginal en pratique.
export function useExercices(coursIds?: string[], faculteId?: string, promotion?: string, coursList?: { id: string; promotion?: string }[]) {
  const [exercices, setExercices] = useState<Exercice[]>([])
  const [loading, setLoading] = useState(true)
  const currentUser = useUser()
  const queryCoursIds = currentUser?.role === 'etudiant' ? ((currentUser as any).coursIds || []) : null

  useEffect(() => {
    const applyFilters = (raw: Exercice[]) => {
      let data = raw
      if (coursIds && coursIds.length > 0) data = data.filter(e => coursIds.includes(e.coursId || ''))
      if (faculteId) data = data.filter(e => !e.faculteId || e.faculteId === faculteId)
      if (promotion && coursList && coursList.length > 0) {
        data = data.filter(e => {
          const cours = coursList.find(c => c.id === e.coursId)
          if (!cours || !cours.promotion) return true
          return cours.promotion === promotion
        })
      }
      return data
    }

    if (queryCoursIds === null) {
      const unsub = onSnapshot(collection(db, 'exercices'), snap => {
        setExercices(applyFilters(snap.docs.map(d => ({ id: d.id, ...d.data() } as Exercice))))
        setLoading(false)
      })
      return () => unsub()
    }
    if (queryCoursIds.length === 0) { setExercices([]); setLoading(false); return }
    return subscribeByFieldIn(
      'exercices', 'coursId', queryCoursIds,
      d => ({ id: d.id, ...d.data() } as Exercice),
      data => { setExercices(applyFilters(data)); setLoading(false) }
    )
  }, [JSON.stringify(queryCoursIds), JSON.stringify(coursIds), faculteId, promotion, JSON.stringify(coursList?.map(c => c.id + (c.promotion || '')))])
  return { exercices, loading }
}

// ─── Tentatives ───────────────────────────────────────────────────────────────

export function useTentatives(etudiantId?: string, exerciceId?: string) {
  const [tentatives, setTentatives] = useState<Tentative[]>([])
  useEffect(() => {
    const conditions: any[] = []
    if (etudiantId) conditions.push(where('etudiantId', '==', etudiantId))
    if (exerciceId) conditions.push(where('exerciceId', '==', exerciceId))
    const q = conditions.length > 0 ? query(collection(db, 'tentatives'), ...conditions) : collection(db, 'tentatives')
    const unsub = onSnapshot(q, snap => setTentatives(snap.docs.map(d => ({ id: d.id, ...d.data() } as Tentative))))
    return () => unsub()
  }, [etudiantId, exerciceId])
  return { tentatives }
}

// ─── Exercices libres ─────────────────────────────────────────────────────────

// useExercicesLibres : filtre par createdBy (prof) OU par coursIds+faculteId+promotion via cours
// NOTE isolation : coursId est obligatoire à la création sur ce modèle, donc
// contraindre la requête par les coursIds réels de l'étudiant connecté
// (au lieu d'une lecture non filtrée) ne perd aucun contenu légitime.
export function useExercicesLibres(createdBy?: string, coursIds?: string[], faculteId?: string, promotion?: string, coursList?: { id: string; promotion?: string }[]) {
  const [exercices, setExercices] = useState<ExerciceLibre[]>([])
  const [loading, setLoading] = useState(true)
  const currentUser = useUser()
  const queryCoursIds = currentUser?.role === 'etudiant' ? ((currentUser as any).coursIds || []) : null

  useEffect(() => {
    const applyFilters = (raw: ExerciceLibre[]) => {
      let data = raw
      if (coursIds && coursIds.length > 0) data = data.filter(e => coursIds.includes(e.coursId || ''))
      if (faculteId) data = data.filter(e => !e.faculteId || e.faculteId === faculteId)
      if (promotion && coursList && coursList.length > 0) {
        data = data.filter(e => {
          const cours = coursList.find(c => c.id === e.coursId)
          if (!cours || !cours.promotion) return true
          return cours.promotion === promotion
        })
      }
      return data
    }

    if (createdBy) {
      const q = query(collection(db, 'exercices_libres'), where('createdBy', '==', createdBy))
      const unsub = onSnapshot(q, snap => {
        setExercices(applyFilters(snap.docs.map(d => ({ id: d.id, ...d.data() } as ExerciceLibre))))
        setLoading(false)
      })
      return () => unsub()
    }
    if (queryCoursIds === null) {
      const unsub = onSnapshot(collection(db, 'exercices_libres'), snap => {
        setExercices(applyFilters(snap.docs.map(d => ({ id: d.id, ...d.data() } as ExerciceLibre))))
        setLoading(false)
      })
      return () => unsub()
    }
    if (queryCoursIds.length === 0) { setExercices([]); setLoading(false); return }
    return subscribeByFieldIn(
      'exercices_libres', 'coursId', queryCoursIds,
      d => ({ id: d.id, ...d.data() } as ExerciceLibre),
      data => { setExercices(applyFilters(data)); setLoading(false) }
    )
  }, [createdBy, JSON.stringify(queryCoursIds), JSON.stringify(coursIds), faculteId, promotion, JSON.stringify(coursList?.map(c => c.id + (c.promotion || '')))])
  return { exercices, loading }
}

// ─── Tentatives exercices libres ──────────────────────────────────────────────

export function useTentativesEL(etudiantId?: string) {
  const [tentatives, setTentatives] = useState<TentativeExerciceLibre[]>([])
  useEffect(() => {
    if (!etudiantId) { setTentatives([]); return }
    const q = query(collection(db, 'tentatives_el'), where('etudiantId', '==', etudiantId))
    const unsub = onSnapshot(q, snap => setTentatives(snap.docs.map(d => ({ id: d.id, ...d.data() } as TentativeExerciceLibre))))
    return () => unsub()
  }, [etudiantId])
  return { tentatives }
}

// ─── Présences ────────────────────────────────────────────────────────────────

// usePresences : prof voit ses séances (par createdBy) filtrées par faculteId
export function usePresences(createdBy?: string, faculteId?: string) {
  const [presences, setPresences] = useState<Presence[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const conditions: any[] = []
    if (createdBy) conditions.push(where('createdBy', '==', createdBy))
    if (faculteId) conditions.push(where('faculteId', '==', faculteId))
    const q = conditions.length > 0
      ? query(collection(db, 'presences'), ...conditions)
      : collection(db, 'presences')
    const unsub = onSnapshot(q, snap => {
      setPresences(snap.docs.map(d => ({ id: d.id, ...d.data() } as Presence)))
      setLoading(false)
    })
    return () => unsub()
  }, [createdBy, faculteId])
  return { presences, loading }
}

export function usePresencesEtudiant(etudiantId?: string) {
  const [presences, setPresences] = useState<Presence[]>([])
  useEffect(() => {
    if (!etudiantId) { setPresences([]); return }
    // Firestore ne supporte pas le filtre sur un champ dans un tableau d'objets
    // On récupère toutes les séances et on filtre côté client
    const unsub = onSnapshot(collection(db, 'presences'), snap => {
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as Presence))
      setPresences(all.filter(p => p.etudiants?.some(e => e.etudiantId === etudiantId)))
    })
    return () => unsub()
  }, [etudiantId])
  return { presences }
}

// ─── Notes de cours ───────────────────────────────────────────────────────────

// ISOLATION STRICTE : filtre par coursId ET promotionId
// NOTE isolation : coursId est obligatoire à la création sur ce modèle, donc
// contraindre la requête par les coursIds réels de l'étudiant connecté
// (au lieu d'une lecture non filtrée) ne perd aucun contenu légitime.
export function useNotesCours(coursIds?: string[], promotionId?: string) {
  const [notes, setNotes] = useState<NoteCours[]>([])
  const currentUser = useUser()
  const queryCoursIds = currentUser?.role === 'etudiant' ? ((currentUser as any).coursIds || []) : null

  useEffect(() => {
    const applyFilters = (raw: NoteCours[]) => {
      let data = raw
      if (coursIds && coursIds.length > 0) data = data.filter(n => coursIds.includes(n.coursId || ''))
      if (promotionId) data = data.filter(n => n.promotionId === promotionId)
      return data
    }

    if (queryCoursIds === null) {
      const unsub = onSnapshot(collection(db, 'notes_cours'), snap => {
        setNotes(applyFilters(snap.docs.map(d => ({ id: d.id, ...d.data() } as NoteCours))))
      })
      return () => unsub()
    }
    if (queryCoursIds.length === 0) { setNotes([]); return }
    return subscribeByFieldIn(
      'notes_cours', 'coursId', queryCoursIds,
      d => ({ id: d.id, ...d.data() } as NoteCours),
      data => setNotes(applyFilters(data))
    )
  }, [JSON.stringify(queryCoursIds), JSON.stringify(coursIds), promotionId])
  return { notes }
}

export function useAllNotesCours() {
  const [notes, setNotes] = useState<NoteCours[]>([])
  useEffect(() => {
    const q = collection(db, 'notes_cours')
    const unsub = onSnapshot(q, snap => setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() } as NoteCours))))
    return () => unsub()
  }, [])
  return { notes }
}

// ─── Toutes les soumissions (admin) ──────────────────────────────────────────

export function useAllSoumissions() {
  const [soumissions, setSoumissions] = useState<any[]>([])
  useEffect(() => {
    const q = collection(db, 'soumissions')
    const unsub = onSnapshot(q, snap => setSoumissions(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
    return () => unsub()
  }, [])
  return { soumissions }
}
