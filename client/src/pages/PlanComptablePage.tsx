import React, { useState, useMemo } from 'react'
import BackButton from '@/components/BackButton'
import { getComptes, CompteOHADA } from '@/lib/db'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronRight, ChevronDown, ListTree } from 'lucide-react'
import { cn } from '@/lib/utils'

const CLASS_NAMES: Record<number, string> = {
  1: 'Comptes de Ressources Durables',
  2: "Comptes d'Actif Immobilisé",
  3: 'Comptes de Stocks',
  4: 'Comptes de Tiers',
  5: 'Comptes de Trésorerie',
  6: 'Comptes de Charges des Activités Ordinaires',
  7: 'Comptes de Produits des Activités Ordinaires',
  8: 'Comptes des Autres Charges et Produits',
  9: 'Comptes des Engagements Hors Bilan et de la Comptabilité Analytique',
}

const TYPE_COLOR: Record<string, string> = {
  actif: 'bg-blue-100 text-blue-800',
  passif: 'bg-purple-100 text-purple-800',
  charge: 'bg-red-100 text-red-800',
  produit: 'bg-green-100 text-green-800',
  autre: 'bg-gray-100 text-gray-700',
}

export default function PlanComptablePage() {
  const comptes = getComptes()
  const [search, setSearch] = useState('')
  const [openClasses, setOpenClasses] = useState<Set<string>>(new Set(['1']))
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())
  const [openSubSections, setOpenSubSections] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search.trim()) return comptes
    const q = search.toLowerCase()
    return comptes.filter(c =>
      c.numero.includes(q) ||
      c.intitule.toLowerCase().includes(q)
    )
  }, [comptes, search])

  const isSearching = search.trim().length > 0

  // Group by class -> 2-digit -> 3-digit -> full
  const grouped = useMemo(() => {
    const map = new Map<number, Map<string, Map<string, CompteOHADA[]>>>()
    filtered.forEach(c => {
      if (!map.has(c.classe)) map.set(c.classe, new Map())
      const cl = map.get(c.classe)!
      const twoDigit = c.numero.substring(0, 2)
      if (!cl.has(twoDigit)) cl.set(twoDigit, new Map())
      const td = cl.get(twoDigit)!
      const threeDigit = c.numero.substring(0, 3)
      if (!td.has(threeDigit)) td.set(threeDigit, [])
      td.get(threeDigit)!.push(c)
    })
    return map
  }, [filtered])

  const toggle = (set: Set<string>, key: string): Set<string> => {
    const s = new Set(set)
    if (s.has(key)) s.delete(key)
    else s.add(key)
    return s
  }

  return (
    <div className="space-y-5 animate-fadeIn">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
              <ListTree className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground tracking-tight">Plan Comptable SYSCOHADA</h1>
              <p className="text-xs text-muted-foreground mt-0.5">SYSCOHADA Révisé : 9 classes de comptes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-slideUp relative" style={{ animationDelay: '80ms' }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Rechercher par numéro ou intitulé..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {isSearching ? (
        /* Flat list for search results */
        <Card className="border-border">
          <CardContent className="px-0 pt-0 pb-0">
            {filtered.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Aucun compte trouvé.</div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map(c => (
                  <div key={c.numero} className="flex items-center gap-3 px-4 py-2 hover:bg-muted/30">
                    <span className="font-mono font-semibold text-primary text-sm w-16 shrink-0">{c.numero}</span>
                    <span className="flex-1 text-sm">{c.intitule}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', TYPE_COLOR[c.type])}>{c.type}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Accordion tree */
        <div className="space-y-2">
          {[1,2,3,4,5,6,7,8,9].map(classe => {
            const classData = grouped.get(classe)
            if (!classData) return null
            const classOpen = openClasses.has(String(classe))
            const totalInClass = Array.from(classData.values()).reduce((s, m) => s + Array.from(m.values()).reduce((ss, arr) => ss + arr.length, 0), 0)

            return (
              <Card key={classe} className="border-border overflow-hidden">
                <button
                  className={cn(
                    'w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/30',
                    classOpen && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={() => setOpenClasses(toggle(openClasses, String(classe)))}
                >
                  {classOpen
                    ? <ChevronDown className="h-5 w-5 flex-shrink-0" />
                    : <ChevronRight className="h-5 w-5 flex-shrink-0" />
                  }
                  <span className="font-bold text-base">Classe {classe}</span>
                  <span className="flex-1 font-medium text-sm">{CLASS_NAMES[classe]}</span>

                </button>

                {classOpen && (
                  <CardContent className="pt-0 pb-2 px-0">
                    {Array.from(classData.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([twoDigit, threeMap]) => {
                      const sectionOpen = openSections.has(twoDigit)
                      const sectionCount = Array.from(threeMap.values()).reduce((s, arr) => s + arr.length, 0)
                      // Get label from first account
                      const firstCompte = Array.from(threeMap.values())[0]?.[0]

                      return (
                        <div key={twoDigit} className="border-t border-border/50">
                          <button
                            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 text-left hover:bg-muted/20 transition-colors"
                            onClick={() => setOpenSections(toggle(openSections, twoDigit))}
                          >
                            {sectionOpen
                              ? <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            }
                            <span className="font-mono font-semibold text-primary text-sm w-12 shrink-0">{twoDigit}</span>
                            <span className="flex-1 text-sm font-medium truncate">
                              {firstCompte?.intitule?.split('–')[0]?.split('-')[0]?.trim() || `Comptes ${twoDigit}`}
                            </span>

                          </button>

                          {sectionOpen && (
                            <div>
                              {Array.from(threeMap.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([threeDigit, accounts]) => {
                                const subOpen = openSubSections.has(threeDigit)
                                const firstAcc = accounts[0]
                                const subAccounts = accounts.filter(a => a.numero.length > 3)
                                const mainAccount = accounts.find(a => a.numero === threeDigit)

                                return (
                                  <div key={threeDigit} className="border-t border-border/30">
                                    <button
                                      className="w-full flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-2 text-left hover:bg-muted/10 transition-colors"
                                      onClick={() => setOpenSubSections(toggle(openSubSections, threeDigit))}
                                    >
                                      {subAccounts.length > 0
                                        ? (subOpen
                                          ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                          : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                        )
                                        : <span className="w-3.5 h-3.5 flex-shrink-0" />
                                      }
                                      <span className="font-mono font-medium text-primary text-xs w-12 shrink-0">{threeDigit}</span>
                                      <span className="flex-1 text-xs truncate">{firstAcc?.intitule || threeDigit}</span>
                                      <span className={cn('hidden sm:inline-flex text-xs px-1.5 py-0.5 rounded-full', TYPE_COLOR[firstAcc?.type || 'autre'])}>{firstAcc?.type}</span>
                                    </button>

                                    {subOpen && subAccounts.length > 0 && (
                                      <div className="bg-muted/10">
                                        {subAccounts.map(acc => (
                                          <div key={acc.numero} className="flex items-center gap-2 sm:gap-3 px-7 sm:px-14 py-1.5 border-t border-border/20">
                                            <span className="font-mono text-primary text-xs w-14 shrink-0">{acc.numero}</span>
                                            <span className="flex-1 text-xs text-muted-foreground">{acc.intitule}</span>
                                            <span className={cn('hidden sm:inline-flex text-xs px-1.5 py-0.5 rounded-full', TYPE_COLOR[acc.type])}>{acc.type}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
