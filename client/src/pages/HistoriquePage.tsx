import React, { useState, useMemo } from 'react'
import { useUser } from '@/lib/userContext'
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import { getUsersAsync } from '@/lib/db-firebase'
import { useEcritures, useSessions } from '@/lib/useFirestore'
import { formatMontant } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, History, Clock4 } from 'lucide-react'

export default function HistoriquePage() {
  const user = useUser()
  const { sessions, loading: loadingSessions } = useSessions((user as any)?.id)
  const [users, setUsers] = React.useState<any[]>([])
  React.useEffect(() => { getUsersAsync().then(setUsers).catch(() => {}) }, [])
  const [selectedSessionId, setSelectedSessionId] = useState('all')
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures((user as any)?.id)

  const filtered = useMemo(() => {
    return allEcritures.filter(e => {
      if (selectedSessionId !== 'all' && e.sessionId !== selectedSessionId) return false
      if (search && !e.numeroCompte.includes(search) && !e.intituleCompte.toLowerCase().includes(search.toLowerCase()) && !e.libelle.toLowerCase().includes(search.toLowerCase())) return false
      if (dateFrom && e.date < dateFrom) return false
      if (dateTo && e.date > dateTo) return false
      return true
    }).sort((a, b) => b.date.localeCompare(a.date))
  }, [allEcritures, selectedSessionId, search, dateFrom, dateTo])

  const getSessionName = (id: string) => sessions.find(s => s.id === id)?.nom || id
  const getUserName = (id: string) => {
    const u = users.find(u => u.id === id)
    return u ? `${u.nom} ${u.prenom || ''}`.trim() : '—'
  }

  const totalDebit = filtered.reduce((s, e) => s + e.debit, 0)
  const totalCredit = filtered.reduce((s, e) => s + e.credit, 0)

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement de l'historique..." />

  return (
    <div className="space-y-5 animate-fadeIn">

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
                <Clock4 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">Historique des écritures</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Journal chronologique complet</p>
              </div>
            </div>
            <Badge variant="outline" className="animate-slideDown" style={{ animationDelay: '200ms' }}>{filtered.length} écriture(s)</Badge>
          </div>
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs mb-1 block">Session</Label>
              <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sessions</SelectItem>
                  {sessions.map(s => <SelectItem key={s.id} value={s.id}>{s.nom}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Compte, libellé..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Date de début</Label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Date de fin</Label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <History className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Aucune écriture trouvée.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border">
          <CardContent className="px-0 pt-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="py-2 px-3 text-left">Date</th>
                    <th className="py-2 px-3 text-left">Session</th>
                    <th className="py-2 px-3 text-left">Libellé</th>
                    <th className="py-2 px-3 text-left">Compte</th>
                    <th className="py-2 px-3 text-left">Intitulé</th>
                    <th className="py-2 px-3 text-right">Débit</th>
                    <th className="py-2 px-3 text-right">Crédit</th>
                    <th className="py-2 px-3 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => {
                    const isOuverture = e.ligneGroupe.startsWith('ouverture-')
                    return (
                      <tr key={e.id} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                        <td className="py-1.5 px-3 font-mono">{e.date}</td>
                        <td className="py-1.5 px-3 max-w-[120px] truncate text-muted-foreground">{getSessionName(e.sessionId)}</td>
                        <td className="py-1.5 px-3 max-w-[150px] truncate">{e.libelle}</td>
                        <td className="py-1.5 px-3 font-mono text-primary font-medium">{e.numeroCompte}</td>
                        <td className="py-1.5 px-3 max-w-[150px] truncate">{e.intituleCompte}</td>
                        <td className="py-1.5 px-3 text-right text-green-700 dark:text-green-400">{e.debit > 0 ? formatMontant(e.debit) : ''}</td>
                        <td className="py-1.5 px-3 text-right text-red-700 dark:text-red-400">{e.credit > 0 ? formatMontant(e.credit) : ''}</td>
                        <td className="py-1.5 px-3">
                          {isOuverture && <Badge variant="secondary" className="text-xs">Ouv.</Badge>}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-primary text-primary-foreground font-bold border-t-2 border-primary">
                    <td colSpan={5} className="py-2 px-3 text-right">TOTAUX</td>
                    <td className="py-2 px-3 text-right">{formatMontant(totalDebit)}</td>
                    <td className="py-2 px-3 text-right">{formatMontant(totalCredit)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
