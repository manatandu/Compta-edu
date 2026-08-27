import React, { useState, useRef, useEffect } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { Search, X, BookOpen, Building2, ClipboardList, GraduationCap, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'
import { User } from '@/lib/db'
import { isStaffRole, isStudentRole } from '@/lib/permissions'
import { useUniversites, useAllCours, useAllDevoirs } from '@/lib/useFirestore'
import { onUsersSnapshot } from '@/lib/db-firebase'
import { DICTIONNAIRE, DOMAINES_DICT } from '@/data/dictionnaire'

interface SearchResult {
  id: string
  label: string
  sublabel?: string
  type: 'etudiant' | 'cours' | 'universite' | 'devoir' | 'dictionnaire'
  path: string
  adminOnly?: boolean
}

interface GlobalSearchProps {
  user: User | null
}

export default function GlobalSearch({ user }: GlobalSearchProps) {
  // Faille sécurité corrigée : si rôle pas encore chargé, ne pas afficher
  const role = user?.role || null
  if (!role) return null

  const [, navigate] = useHashLocation()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { universites } = useUniversites()
  const { cours } = useAllCours()
  // useAllDevoirs() (et non useDevoirs(user.id)) : la règle Firestore sur
  // `devoirs` exige resource.data.coursId in studentCoursIds() pour un
  // étudiant, pas un filtre sur createdBy - une requête filtrée sur un autre
  // champ que celui vérifié par la règle est rejetée en bloc
  // (permission-denied), même vide en pratique côté étudiant.
  // useAllDevoirs() applique déjà la bonne contrainte selon le rôle connecté.
  const { devoirs } = useAllDevoirs()
  const [allUsers, setAllUsers] = useState<any[]>([])

  const canAdmin = isStaffRole(user)
  const isStudent = isStudentRole(user)

  useEffect(() => {
    // Faille sécurité corrigée : dépend de role (stable) et non de canAdmin (dérivé)
    if (!canAdmin) {
      setAllUsers([]) // Vider les données si le rôle change
      return
    }
    const unsub = onUsersSnapshot((users: any[]) => setAllUsers(users))
    return () => unsub()
  }, [role, canAdmin])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) { setResults([]); return }

    const res: SearchResult[] = []

    // Étudiants : admins/profs seulement
    if (canAdmin) {
      allUsers
        .filter(u => u.role === 'etudiant')
        .filter(u => {
          const name = `${u.nom || ''} ${u.prenom || ''} ${u.username || ''}`.toLowerCase()
          return name.includes(q)
        })
        .slice(0, 4)
        .forEach(u => {
          res.push({
            id: u.id,
            label: `${u.nom || ''} ${u.prenom || ''}`.trim() || u.username,
            sublabel: `@${u.username}`,
            type: 'etudiant',
            path: '/professeurs',
            adminOnly: true,
          })
        })
    }

    // Cours : Faille sécurité corrigée : étudiants voient uniquement leurs cours inscrits
    const userCoursIds: string[] = (user as any)?.coursIds || []
    cours
      .filter(c => {
        // Si étudiant, filtrer par coursIds inscrits
        if (isStudent && userCoursIds.length > 0 && !userCoursIds.includes(c.id)) return false
        const name = `${c.nom || ''} ${c.moduleKey || ''}`.toLowerCase()
        return name.includes(q)
      })
      .slice(0, 3)
      .forEach(c => {
        res.push({
          id: c.id,
          label: c.nom,
          sublabel: c.moduleKey || undefined,
          type: 'cours',
          // Étudiant va vers son dashboard, admin vers gestion
          path: isStudent ? '/' : '/professeurs',
        })
      })

    // Universités : admins/profs seulement
    if (canAdmin) {
      universites
        .filter(u => (u.nom || '').toLowerCase().includes(q))
        .slice(0, 2)
        .forEach(u => {
          res.push({
            id: u.id,
            label: u.nom,
            sublabel: u.ville || undefined,
            type: 'universite',
            path: '/professeurs',
            adminOnly: true,
          })
        })
    }

    // Devoirs : chacun voit les siens seulement
    devoirs
      .filter(d => (d.titre || '').toLowerCase().includes(q))
      .slice(0, 3)
      .forEach(d => {
        res.push({
          id: d.id,
          label: d.titre,
          sublabel: d.dateLimit ? `Limite : ${new Date(d.dateLimit).toLocaleDateString('fr-FR')}` : undefined,
          type: 'devoir',
          path: isStudent ? '/' : '/professeurs',
        })
      })

    // Dictionnaire : accessible à tous, aucune donnée personnelle.
    // Le type 'dictionnaire' existait déjà (icône et libellé prévus plus bas),
    // mais aucun résultat de ce type n'était jamais produit : chercher un
    // terme depuis la barre du haut ne renvoyait rien. La recherche porte sur
    // le libellé du terme, priorité à ceux qui commencent par la saisie, et
    // mène directement à la définition via le lien profond ?terme=<id>.
    const normDict = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const qDict = normDict(q)
    DICTIONNAIRE
      .filter(t => normDict(t.terme).includes(qDict))
      .sort((a, b) => {
        const aDebut = normDict(a.terme).startsWith(qDict)
        const bDebut = normDict(b.terme).startsWith(qDict)
        if (aDebut !== bDebut) return aDebut ? -1 : 1
        return a.terme.localeCompare(b.terme, 'fr')
      })
      .slice(0, 4)
      .forEach(t => {
        res.push({
          id: t.id,
          label: t.terme,
          sublabel: DOMAINES_DICT[t.domaine],
          type: 'dictionnaire',
          path: `/dictionnaire?terme=${encodeURIComponent(t.id)}`,
        })
      })

    setResults(res)
  // Faille sécurité corrigée : inclure user dans les dépendances pour filtrage coursIds
  }, [query, allUsers, cours, universites, devoirs, canAdmin, isStudent, user])

  const typeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'etudiant':    return <GraduationCap className="h-3.5 w-3.5 text-green-600" />
      case 'cours':       return <BookOpen className="h-3.5 w-3.5 text-blue-600" />
      case 'universite':  return <Building2 className="h-3.5 w-3.5 text-purple-600" />
      case 'devoir':      return <ClipboardList className="h-3.5 w-3.5 text-orange-600" />
      case 'dictionnaire':return <BookMarked className="h-3.5 w-3.5 text-teal-600" />
    }
  }

  const typeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'etudiant':    return 'Étudiant'
      case 'cours':       return 'Cours'
      case 'universite':  return 'Université'
      case 'devoir':      return 'Devoir'
      case 'dictionnaire':return 'Dictionnaire'
    }
  }

  const handleSelect = (r: SearchResult) => {
    // Faille sécurité corrigée : bloquer navigation admin pour étudiants
    if (r.adminOnly && isStudent) return
    navigate(r.path)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-faint pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Rechercher..."
          className={cn(
            'w-full pl-8 pr-7 py-1.5 text-sm rounded-md border border-white/15 bg-white/5 text-white',
            'focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50',
            'placeholder:text-ink-faint transition-colors'
          )}
        />
        {query && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-faint hover:text-white transition-all hover:scale-110"
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto animate-slideDown">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {query} »
            </div>
          ) : (
            <ul>
              {results.map(r => (
                <li key={`${r.type}-${r.id}`}>
                  <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => handleSelect(r)}
                  >
                    <div className="flex-shrink-0">{typeIcon(r.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.label}</p>
                      {r.sublabel && (
                        <p className="text-xs text-muted-foreground truncate">{r.sublabel}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
                      {typeLabel(r.type)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
