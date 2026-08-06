import React, { useState, useEffect, useRef } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { BookMarked, Search, X, ChevronRight, ArrowUp, ArrowLeft } from 'lucide-react'
import { DICTIONNAIRE, CATEGORIES_DICT, TermeDict } from '@/data/dictionnaire'
import { cn } from '@/lib/utils'

const CAT_COLORS: Record<TermeDict['categorie'], string> = {
  comptabilite: 'bg-blue-100 text-blue-700',
  fiscalite:    'bg-orange-100 text-orange-700',
  droit:        'bg-purple-100 text-purple-700',
  finance:      'bg-green-100 text-green-700',
  gestion:      'bg-rose-100 text-rose-700',
}

const PAGE_SIZE = 20

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function DictionnairePage() {
  const [location, navigate] = useHashLocation()
  const [search, setSearch] = useState('')
  const [catFiltre, setCatFiltre] = useState<TermeDict['categorie'] | 'tous'>('tous')
  const [termeActif, setTermeActif] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [page, setPage] = useState(1)
  const termeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Afficher le bouton "retour en haut" après 300px de scroll
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lire le terme dans l'URL (ex: /dictionnaire?terme=actif)
  useEffect(() => {
    const hash = window.location.hash // ex: #/dictionnaire?terme=actif
    const match = hash.match(/[?&]terme=([^&]+)/)
    if (match) {
      const id = decodeURIComponent(match[1])
      setTermeActif(id)
      // Scroll vers ce terme après le rendu
      setTimeout(() => {
        const el = termeRefs.current[id]
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 150)
    }
  }, [location])

  // Filtrer et trier les termes : priorité aux mots qui commencent par la saisie
  const termesFiltres = (() => {
    const q = normalize(search.trim())
    const filtered = DICTIONNAIRE.filter(t => {
      const matchCat = catFiltre === 'tous' || t.categorie === catFiltre
      const matchSearch = !q || normalize(t.terme).includes(q) || normalize(t.definition).includes(q)
      return matchCat && matchSearch
    })
    if (!q) return filtered.sort((a, b) => a.terme.localeCompare(b.terme, 'fr'))
    // Trier : d'abord ceux dont le terme commence par q, ensuite les autres
    return filtered.sort((a, b) => {
      const aStarts = normalize(a.terme).startsWith(q)
      const bStarts = normalize(b.terme).startsWith(q)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
      return a.terme.localeCompare(b.terme, 'fr')
    })
  })()

  const totalPages = Math.max(1, Math.ceil(termesFiltres.length / PAGE_SIZE))
  const termesPage = termesFiltres.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleVoirAussi = (id: string) => {
    setTermeActif(id)
    setSearch('')
    setCatFiltre('tous')
    setPage(1)
    setTimeout(() => {
      const el = termeRefs.current[id]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

      {/* Boutons flottants : retour page + scroll top */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => window.history.back()}
          title="Retour"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Retour en haut"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-all"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* En-tête */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5">
          <BookMarked className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold">Dictionnaire</h1>
          <p className="text-sm text-muted-foreground">
            {DICTIONNAIRE.length} termes : Comptabilité, Fiscalité, Droit, Finance, Gestion
          </p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setTermeActif(null); setPage(1) }}
          placeholder="Rechercher un terme…"
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => { setSearch(''); setPage(1) }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setCatFiltre('tous'); setPage(1) }}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium transition-colors',
            catFiltre === 'tous'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          Tous ({DICTIONNAIRE.length})
        </button>
        {(Object.keys(CATEGORIES_DICT) as TermeDict['categorie'][]).map(cat => {
          const count = DICTIONNAIRE.filter(t => t.categorie === cat).length
          return (
            <button
              key={cat}
              onClick={() => { setCatFiltre(cat); setPage(1) }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                catFiltre === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {CATEGORIES_DICT[cat]} ({count})
            </button>
          )
        })}
      </div>

      {/* Résultats */}
      {termesFiltres.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <BookMarked className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>Aucun terme trouvé pour «{search}»</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Compteur résultats */}
          <p className="text-xs text-muted-foreground">
            {termesFiltres.length} terme{termesFiltres.length > 1 ? 's' : ''} : page {page} / {totalPages}
          </p>

          {termesPage.map(t => {
            const isActif = termeActif === t.id
            return (
              <div
                key={t.id}
                ref={el => { termeRefs.current[t.id] = el }}
                className={cn(
                  'rounded-xl border bg-card transition-all duration-200 overflow-hidden',
                  isActif
                    ? 'border-primary shadow-md ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/40'
                )}
              >
                {/* En-tête du terme */}
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() => setTermeActif(isActif ? null : t.id)}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="font-semibold text-sm">{t.terme}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium shrink-0', CAT_COLORS[t.categorie])}>
                      {CATEGORIES_DICT[t.categorie]}
                    </span>
                  </div>
                  <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', isActif && 'rotate-90')} />
                </button>

                {/* Contenu déroulant */}
                {isActif && (
                  <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
                    {/* Définition */}
                    <p className="text-sm leading-relaxed text-foreground">{t.definition}</p>

                    {/* Exemple */}
                    {t.exemple && (
                      <div className="rounded-lg bg-muted/50 px-3 py-2.5">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Exemple</p>
                        <p className="text-sm text-foreground">{t.exemple}</p>
                      </div>
                    )}

                    {/* Voir aussi */}
                    {t.voirAussi && t.voirAussi.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-muted-foreground font-medium">Voir aussi :</span>
                        {t.voirAussi.map(id => {
                          const lien = DICTIONNAIRE.find(x => x.id === id)
                          if (!lien) return null
                          return (
                            <button
                              key={id}
                              onClick={() => handleVoirAussi(id)}
                              className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                            >
                              {lien.terme}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-sm border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ‹ Précédent
              </button>
              <span className="text-sm text-muted-foreground font-medium">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-sm border border-border bg-card hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Suivant ›
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
