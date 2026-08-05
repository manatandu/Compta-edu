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
import type {
  Session, Ecriture, Universite, Faculte, Cours, Devoir, Soumission,
  Exercice, Tentative, ExerciceLibre, TentativeExerciceLibre, Presence, NoteCours
} from './db'

function fromDoc<T>(snap: any): T {
  const data = snap.data()
  if (!data) return { id: snap.id } as T
  return { ...data, id: snap.id } as T
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

export function useAllDevoirs() {
  const [devoirs, setDevoirs] = useState<Devoir[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'devoirs'), (snap) => {
      setDevoirs(snap.docs.map(d => fromDoc<Devoir>(d)))
    })
    return () => unsub()
  }, [])

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
export function useExercices(coursIds?: string[], faculteId?: string, promotion?: string, coursList?: { id: string; promotion?: string }[]) {
  const [exercices, setExercices] = useState<Exercice[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const q = collection(db, 'exercices')
    const unsub = onSnapshot(q, snap => {
      let data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Exercice))
      // Filtre par cours de l'étudiant
      if (coursIds && coursIds.length > 0) data = data.filter(e => coursIds.includes(e.coursId || ''))
      // Filtre strict par faculté (si fourni)
      if (faculteId) data = data.filter(e => !e.faculteId || e.faculteId === faculteId)
      // Filtre strict par promotion : via le cours lié
      if (promotion && coursList && coursList.length > 0) {
        data = data.filter(e => {
          const cours = coursList.find(c => c.id === e.coursId)
          // Cours sans promotion = visible toutes promotions
          if (!cours || !cours.promotion) return true
          return cours.promotion === promotion
        })
      }
      setExercices(data)
      setLoading(false)
    })
    return () => unsub()
  }, [JSON.stringify(coursIds), faculteId, promotion, JSON.stringify(coursList?.map(c => c.id + (c.promotion || '')))])
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
export function useExercicesLibres(createdBy?: string, coursIds?: string[], faculteId?: string, promotion?: string, coursList?: { id: string; promotion?: string }[]) {
  const [exercices, setExercices] = useState<ExerciceLibre[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const q = createdBy
      ? query(collection(db, 'exercices_libres'), where('createdBy', '==', createdBy))
      : collection(db, 'exercices_libres')
    const unsub = onSnapshot(q, snap => {
      let data = snap.docs.map(d => ({ id: d.id, ...d.data() } as ExerciceLibre))
      if (coursIds && coursIds.length > 0) data = data.filter(e => coursIds.includes(e.coursId || ''))
      // Filtre strict par faculté (si fourni) — les exercices sans faculteId sont globaux
      if (faculteId) data = data.filter(e => !e.faculteId || e.faculteId === faculteId)
      // Filtre strict par promotion : via le cours lié
      if (promotion && coursList && coursList.length > 0) {
        data = data.filter(e => {
          const cours = coursList.find(c => c.id === e.coursId)
          if (!cours || !cours.promotion) return true
          return cours.promotion === promotion
        })
      }
      setExercices(data)
      setLoading(false)
    })
    return () => unsub()
  }, [createdBy, JSON.stringify(coursIds), faculteId, promotion, JSON.stringify(coursList?.map(c => c.id + (c.promotion || '')))])
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
export function useNotesCours(coursIds?: string[], promotionId?: string) {
  const [notes, setNotes] = useState<NoteCours[]>([])
  useEffect(() => {
    const q = collection(db, 'notes_cours')
    const unsub = onSnapshot(q, snap => {
      let data = snap.docs.map(d => ({ id: d.id, ...d.data() } as NoteCours))
      // Filtre cours
      if (coursIds && coursIds.length > 0)
        data = data.filter(n => coursIds.includes(n.coursId || ''))
      // Filtre promotion OBLIGATOIRE si fourni
      if (promotionId)
        data = data.filter(n => n.promotionId === promotionId)
      setNotes(data)
    })
    return () => unsub()
  }, [JSON.stringify(coursIds), promotionId])
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
