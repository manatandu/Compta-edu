import { useUser } from '@/lib/userContext'
import { useState, useEffect, useMemo } from 'react'
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import type { Ecriture } from '@/lib/db'
import { useModule } from '@/lib/moduleContext'
import { formatMontant, cn } from '@/lib/utils'
import { exportGrandLivrePDF } from '@/lib/exportPDF'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Download, ChevronRight, ChevronDown, Search, BookMarked } from 'lucide-react'
import { useSessions, useEcritures } from '@/lib/useFirestore'

interface CompteData {
  numero: string
  intitule: string
  lignes: Ecriture[]
  totalDebit: number
  totalCredit: number
  soldeDebiteur: number
  soldeCrediteur: number
}

export default function GrandLivrePage({ embedded = false }: { embedded?: boolean } = {}) {
  const user = useUser()
  const module = useModule()
  const { sessions, loading: loadingSessions } = useSessions(user?.id, module)
  const [selectedSessionId, setSelectedSessionId] = useState(() => {
    const all = sessions
    if (all.length === 0) return ''
    const currentYear = new Date().getFullYear()
    const matchYear = all.find(s => s.exercice === currentYear)
    if (matchYear) return matchYear.id
    return [...all].sort((a, b) => b.exercice - a.exercice)[0].id
  })

  // Sync : si la session sélectionnée n'existe plus (supprimée), revenir à la première
  useEffect(() => {
    if (!sessions.find(s => s.id === selectedSessionId)) {
      const yr = new Date().getFullYear()
      const best = sessions.find(s => s.exercice === yr) || [...sessions].sort((a,b) => b.exercice - a.exercice)[0]
      setSelectedSessionId(best?.id || '')
    }
  }, [sessions])
  const [search, setSearch] = useState('')
  const [openComptes, setOpenComptes] = useState<Set<string>>(new Set())

  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures(user?.id, module)
  const ecritures = allEcritures.filter(e => e.sessionId === selectedSessionId)

  const comptesData = useMemo((): CompteData[] => {
    const map = new Map<string, { intitule: string; lignes: Ecriture[] }>()
    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) {
        map.set(e.numeroCompte, { intitule: e.intituleCompte, lignes: [] })
      }
      map.get(e.numeroCompte)!.lignes.push(e)
    })
    return Array.from(map.entries())
      .map(([numero, data]) => {
        const totalDebit = data.lignes.reduce((s, l) => s + l.debit, 0)
        const totalCredit = data.lignes.reduce((s, l) => s + l.credit, 0)
        const diff = totalDebit - totalCredit
        return {
          numero,
          intitule: data.intitule,
          lignes: data.lignes.sort((a, b) => a.date.localeCompare(b.date)),
          totalDebit,
          totalCredit,
          soldeDebiteur: diff > 0 ? diff : 0,
          soldeCrediteur: diff < 0 ? -diff : 0,
        }
      })
      .sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  const filtered = comptesData.filter(c =>
    c.numero.toLowerCase().includes(search.toLowerCase()) ||
    c.intitule.toLowerCase().includes(search.toLowerCase())
  )

  const toggleOpen = (num: string) => {
    setOpenComptes(prev => {
      const s = new Set(prev)
      if (s.has(num)) s.delete(num)
      else s.add(num)
      return s
    })
  }

  const selectedSession = sessions.find(s => s.id === selectedSessionId)

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement du grand-livre..." />

  return (
    <div className={cn('space-y-5', !embedded && 'animate-fadeIn')}>

      {!embedded && (
        <>
          {/* ── Bouton retour ── */}
          <BackButton />

          {/* ── Header Banner Animé ── */}
          <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
              <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <BookMarked className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">Grand Livre</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">Suivi détaillé par compte SYSCOHADA</p>
                  </div>
                </div>
                {comptesData.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => exportGrandLivrePDF(selectedSession?.nom || '', comptesData)} className="animate-slideDown" style={{ animationDelay: '100ms' }}>
                    <Download className="h-4 w-4 mr-1" /> PDF
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {embedded && comptesData.length > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => exportGrandLivrePDF(selectedSession?.nom || '', comptesData)}>
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
        </div>
      )}

      <div className={embedded ? undefined : 'animate-slideUp'} style={embedded ? undefined : { animationDelay: '80ms' }}>
      <Card className="border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label className="text-xs mb-1 block">Session :</Label>
              <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
                <SelectTrigger className="sm:w-80">
                  <SelectValue placeholder="Sélectionner une session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.nom} ({s.exercice})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-xs mb-1 block">Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Numéro ou intitulé..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <BookMarked className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Aucune donnée à afficher.</p>
            <p className="text-sm mt-1">Saisissez des écritures dans le Livre Journal pour les voir apparaître ici.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(compte => {
            const isOpen = openComptes.has(compte.numero)
            const solde = compte.soldeDebiteur > 0 ? compte.soldeDebiteur : compte.soldeCrediteur
            const isDebiteur = compte.soldeDebiteur > 0

            // For display: the total line equals on both sides
            const displayTotalDebit = compte.totalDebit + compte.soldeCrediteur
            const displayTotalCredit = compte.totalCredit + compte.soldeDebiteur

            return (
              <Card key={compte.numero} className="border-border hover:border-primary/30 transition-colors">
                {/* Header - always visible */}
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30 rounded-lg transition-colors"
                  onClick={() => toggleOpen(compte.numero)}
                >
                  {isOpen
                    ? <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  }
                  <span className="font-mono font-semibold text-primary text-sm">{compte.numero}</span>
                  <span className="flex-1 text-sm font-medium text-foreground truncate">{compte.intitule}</span>
                  <Badge
                    variant={isDebiteur ? "default" : "destructive"}
                    className={`text-xs ml-2 shrink-0 ${isDebiteur ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
                  >
                    {isDebiteur ? 'SD' : 'SC'} {formatMontant(solde)}
                  </Badge>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <CardContent className="pt-0 pb-3">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs min-w-[320px] mt-1">
                        <thead>
                          <tr className="text-muted-foreground border-b border-border">
                            <th className="text-left py-1.5 px-2">Date</th>
                            <th className="text-left py-1.5 px-2">Libellé</th>
                            <th className="text-right py-1.5 px-2">Débit</th>
                            <th className="text-right py-1.5 px-2">Crédit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compte.lignes.map(l => (
                            <tr key={l.id} className="border-b border-border/30 last:border-0">
                              <td className="py-1 px-2 font-mono">{l.date}</td>
                              <td className="py-1 px-2">{l.libelle}</td>
                              <td className="py-1 px-2 text-right text-green-700">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                              <td className="py-1 px-2 text-right text-red-700">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                            </tr>
                          ))}
                          {/* Solde line */}
                          <tr className={`font-medium border-t border-border ${isDebiteur ? 'text-green-700' : 'text-red-700'}`}>
                            <td className="py-1.5 px-2 font-mono italic text-muted-foreground">-</td>
                            <td className="py-1.5 px-2 italic">
                              {isDebiteur ? 'Solde débiteur' : 'Solde créditeur'}
                            </td>
                            {/* Solde va dans la colonne du cumul INFÉRIEUR pour équilibrer */}
                            <td className="py-1.5 px-2 text-right">
                              {!isDebiteur ? formatMontant(compte.soldeCrediteur) : ''}
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              {isDebiteur ? formatMontant(compte.soldeDebiteur) : ''}
                            </td>
                          </tr>
                          {/* Total line */}
                          <tr className="font-bold bg-muted/30 border-t-2 border-border">
                            <td colSpan={2} className="py-1.5 px-2 text-right text-muted-foreground text-xs">TOTAL</td>
                            <td className="py-1.5 px-2 text-right text-green-700">{formatMontant(displayTotalDebit)}</td>
                            <td className="py-1.5 px-2 text-right text-red-700">{formatMontant(displayTotalCredit)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
