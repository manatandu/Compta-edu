import React, { useState, useEffect, useRef } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useSearch } from 'wouter'
import { BookMarked, Search, X, ChevronRight, ArrowUp, ArrowLeft } from 'lucide-react'
import { DICTIONNAIRE, DOMAINES_DICT, UES_DICT, TermeDict, DomaineDict } from '@/data/dictionnaire'
import { cn } from '@/lib/utils'

const DOMAINE_COLORS: Record<DomaineDict, string> = {
  comptabilite:         'bg-blue-100 text-blue-700',
  'normes-ifrs':        'bg-sky-100 text-sky-700',
  fiscalite:            'bg-orange-100 text-orange-700',
  droit:                'bg-purple-100 text-purple-700',
  finance:              'bg-green-100 text-green-700',
  'finances-publiques': 'bg-amber-100 text-amber-700',
  audit:                'bg-teal-100 text-teal-700',
  management:           'bg-rose-100 text-rose-700',
}

const PAGE_SIZE = 20

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function DictionnairePage() {
  const [, navigate] = useHashLocation()
  const [search, setSearch] = useState('')
  const [domaineFiltre, setDomaineFiltre] = useState<DomaineDict | 'tous'>('tous')
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

  // Lire le terme dans l'URL (ex: /dictionnaire?terme=actif).
  // useSearch() (wouter), pas window.location.hash : en routage hash, le
  // navigate('/dictionnaire?terme=xxx') de useHashLocation pose la query
  // dans la vraie search de l'URL (avant le #), jamais dans le hash - une
  // lecture regex sur window.location.hash ne trouve donc jamais rien, et le
  // lien profond retombe systématiquement sur l'accueil du dictionnaire.
  const urlSearch = useSearch()
  useEffect(() => {
    const params = new URLSearchParams(urlSearch)
    const id = params.get('terme')
    if (id) {
      setTermeActif(id)
      // Scroll vers ce terme après le rendu
      setTimeout(() => {
        const el = termeRefs.current[id]
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 150)
    }
  }, [urlSearch])

  // Filtrer et trier les termes : priorité aux mots qui commencent par la saisie
  const termesFiltres = (() => {
    const q = normalize(search.trim())
    const filtered = DICTIONNAIRE.filter(t => {
      const matchDomaine = domaineFiltre === 'tous' || t.domaine === domaineFiltre
      const matchSearch = !q || normalize(t.terme).includes(q) || normalize(t.definition).includes(q)
      return matchDomaine && matchSearch
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
    setDomaineFiltre('tous')
    setPage(1)
    setTimeout(() => {
      const el = termeRefs.current[id]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 animate-fadeIn">

      {/* Boutons flottants : retour page + scroll top */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2">
        {/* Bouton rond plutôt que le lien texte standard : il forme une paire
            visuelle avec le bouton "retour en haut" juste en dessous, de
            même forme et même position flottante. La destination reste
            toutefois alignée sur le reste de l'application (tableau de
            bord) plutôt que sur l'historique du navigateur, imprévisible
            en SPA (voir navContext.tsx). */}
        <button
          onClick={() => navigate('/')}
          title="Retour au tableau de bord"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-105 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Retour en haut"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-md hover:opacity-90 hover:scale-105 transition-all animate-fadeIn"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Header Banner Animé (cohérent avec Journal/Balance/Bilan/Fiscalité) ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
              <BookMarked className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">Dictionnaire</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{DICTIONNAIRE.length} termes, chacun avec sa source</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative animate-slideUp" style={{ animationDelay: '80ms' }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setTermeActif(null); setPage(1) }}
          placeholder="Rechercher un terme…"
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => { setSearch(''); setPage(1) }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtres par domaine - un domaine sans terme n'est pas affiché. */}
      <div className="flex flex-wrap gap-2 animate-slideUp" style={{ animationDelay: '120ms' }}>
        <button
          onClick={() => { setDomaineFiltre('tous'); setPage(1) }}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
            domaineFiltre === 'tous'
              ? 'bg-primary text-primary-foreground shadow-sm scale-[1.03]'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-[1.02]'
          )}
        >
          Tous ({DICTIONNAIRE.length})
        </button>
        {(Object.keys(DOMAINES_DICT) as DomaineDict[]).map(dom => {
          const count = DICTIONNAIRE.filter(t => t.domaine === dom).length
          if (count === 0) return null
          return (
            <button
              key={dom}
              onClick={() => { setDomaineFiltre(dom); setPage(1) }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                domaineFiltre === dom
                  ? 'bg-primary text-primary-foreground shadow-sm scale-[1.03]'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-[1.02]'
              )}
            >
              {DOMAINES_DICT[dom]} ({count})
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

          {termesPage.map((t, i) => {
            const isActif = termeActif === t.id
            return (
              <div
                key={t.id}
                ref={el => { termeRefs.current[t.id] = el }}
                className={cn(
                  'rounded-xl border bg-card transition-all duration-200 overflow-hidden animate-slideUp hover:shadow-sm',
                  isActif
                    ? 'border-primary shadow-md ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/40'
                )}
                style={{ animationDelay: `${Math.min(i, 12) * 25}ms` }}
              >
                {/* En-tête du terme */}
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() => setTermeActif(isActif ? null : t.id)}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="font-semibold text-sm">{t.terme}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium shrink-0', DOMAINE_COLORS[t.domaine])}>
                      {DOMAINES_DICT[t.domaine]}
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

                    {/* Cours où le terme est enseigné */}
                    {t.ues.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs text-muted-foreground font-medium">Enseigné en :</span>
                        {t.ues.map(ue => (
                          <span key={ue} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                            {UES_DICT[ue] || ue}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Source - le champ existait déjà en base mais n'était
                        affiché nulle part : les citations écrites restaient
                        invisibles. Il est désormais obligatoire et montré. */}
                    <div className="flex items-start gap-1.5 border-t border-border/50 pt-2.5">
                      <BookMarked className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground italic">{t.source}</p>
                    </div>

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
