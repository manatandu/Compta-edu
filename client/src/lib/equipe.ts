// ─────────────────────────────────────────────────────────────────────────────
// ÉQUIPE PÉDAGOGIQUE : un professeur titulaire et ses assistants
//
// Un assistant est rattaché à un professeur par le champ titulaireId de son
// profil (posé par l'admin, page Professeurs). Le titulaire et ses assistants
// gèrent ensemble la même classe : mêmes étudiants, devoirs, présences,
// statuts de cours. Miroir de memeEquipe() dans firestore.rules, qui autorise
// chaque membre à modifier ce qu'un autre membre a créé.
//
// ids  : uids des membres (pour les requêtes where('createdBy', 'in', ids))
// refs : ids + identifiants (le createdBy des étudiants les plus anciens
//        contient parfois l'identifiant du créateur plutôt que son uid)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase'
import { useUser } from './userContext'
import { isStaffRole } from './permissions'
import type { User } from './db'

export interface Equipe {
  titulaireId: string
  membres: User[]
  ids: string[]
  refs: string[]
}

const cache = new Map<string, Promise<User[]>>()

// Membres de l'équipe dont `titulaireId` est le titulaire (lui compris).
export function getMembresEquipeAsync(titulaireId: string): Promise<User[]> {
  let p = cache.get(titulaireId)
  if (!p) {
    p = Promise.all([
      getDoc(doc(db, 'users', titulaireId)),
      getDocs(query(collection(db, 'users'), where('titulaireId', '==', titulaireId))),
    ]).then(([titulaire, assistants]) => {
      const membres: User[] = []
      if (titulaire.exists()) membres.push({ ...(titulaire.data() as any), id: titulaire.id })
      assistants.docs.forEach(d => membres.push({ ...(d.data() as any), id: d.id }))
      return membres
    }).catch(err => { cache.delete(titulaireId); throw err })
    cache.set(titulaireId, p)
  }
  return p
}

export function invaliderCacheEquipe(): void { cache.clear() }

function construire(user: User, membres: User[]): Equipe {
  const titulaireId = (user as any).titulaireId || user.id
  const tous = membres.some(m => m.id === user.id) ? membres : [user, ...membres]
  const ids = Array.from(new Set(tous.map(m => m.id)))
  const refs = Array.from(new Set([...ids, ...tous.map(m => m.username).filter(Boolean)]))
  return { titulaireId, membres: tous, ids, refs }
}

// Équipe de l'utilisateur connecté. Hors personnel, ou tant que la lecture
// n'est pas faite : équipe réduite à l'utilisateur lui-même.
export function useEquipe(): Equipe | null {
  const user = useUser()
  const [membres, setMembres] = useState<User[]>([])
  const titulaireId = user ? ((user as any).titulaireId || user.id) : ''
  const personnel = isStaffRole(user)

  useEffect(() => {
    if (!user || !personnel) { setMembres([]); return }
    let actif = true
    getMembresEquipeAsync(titulaireId).then(m => { if (actif) setMembres(m) }).catch(() => {})
    return () => { actif = false }
  }, [user?.id, titulaireId, personnel])

  return useMemo(() => (user ? construire(user, membres) : null), [user, membres])
}

// Le createdBy (uid ou identifiant) d'un document désigne-t-il un membre de l'équipe ?
export function creeParEquipe(createdBy: string | undefined, equipe: Equipe | null): boolean {
  return !!createdBy && !!equipe && equipe.refs.includes(createdBy)
}
