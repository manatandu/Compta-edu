import { useUser } from '@/lib/userContext'
import React, { useState, useEffect, useMemo } from 'react'
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import type { Ecriture } from '@/lib/db'
import { useModule } from '@/lib/moduleContext'
import { formatMontant } from '@/lib/utils'
import { exportBalancePDF } from '@/lib/exportPDF'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Scale } from 'lucide-react'
import { useSessions, useEcritures } from '@/lib/useFirestore'

interface LigneBalance {
  numero: string
  intitule: string
  ouvertureD: number
  ouvertureC: number
  mouvementD: number
  mouvementC: number
  clotureD: number
  clotureC: number
}

export default function BalancePage() {
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

  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures(user?.id, module)
  const ecritures = allEcritures.filter(e => e.sessionId === selectedSessionId)
  const selectedSession = sessions.find(s => s.id === selectedSessionId)

  const lignes = useMemo((): LigneBalance[] => {
    const map = new Map<string, LigneBalance>()

    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) {
        map.set(e.numeroCompte, {
          numero: e.numeroCompte,
          intitule: e.intituleCompte,
          ouvertureD: 0, ouvertureC: 0,
          mouvementD: 0, mouvementC: 0,
          clotureD: 0, clotureC: 0,
        })
      }
      const l = map.get(e.numeroCompte)!
      const isOuverture = e.ligneGroupe.startsWith('ouverture-')
      if (isOuverture) {
        l.ouvertureD += e.debit
        l.ouvertureC += e.credit
      } else {
        l.mouvementD += e.debit
        l.mouvementC += e.credit
      }
    })

    // Compute clôture
    const result: LigneBalance[] = []
    map.forEach(l => {
      const clotureD = l.ouvertureD + l.mouvementD
      const clotureC = l.ouvertureC + l.mouvementC
      const diff = clotureD - clotureC
      result.push({
        ...l,
        clotureD: diff >= 0 ? diff : 0,
        clotureC: diff < 0 ? -diff : 0,
      })
    })

    return result.sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  const totals = useMemo(() => ({
    ouvertureD: lignes.reduce((s, l) => s + l.ouvertureD, 0),
    ouvertureC: lignes.reduce((s, l) => s + l.ouvertureC, 0),
    mouvementD: lignes.reduce((s, l) => s + l.mouvementD, 0),
    mouvementC: lignes.reduce((s, l) => s + l.mouvementC, 0),
    clotureD: lignes.reduce((s, l) => s + l.clotureD, 0),
    clotureC: lignes.reduce((s, l) => s + l.clotureC, 0),
  }), [lignes])

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement de la balance..." />

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
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">Balance Générale</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Balance à 6 colonnes SYSCOHADA révisé</p>
              </div>
            </div>
            {lignes.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => exportBalancePDF(selectedSession?.nom || '', lignes)} className="animate-slideDown" style={{ animationDelay: '200ms' }}>
                <Download className="h-4 w-4 mr-1" /> PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Label className="text-sm font-medium shrink-0">Session :</Label>
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
        </CardContent>
      </Card>

      {lignes.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <p>Aucune donnée à afficher.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border">
          <CardContent className="pt-4 pb-4 px-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[360px]">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th rowSpan={2} className="py-2 px-1.5 sm:px-3 text-left font-medium border-b border-primary/50">Compte</th>
                    <th rowSpan={2} className="py-2 px-1.5 sm:px-3 text-left font-medium border-b border-primary/50">Intitulé</th>
                    <th colSpan={2} className="py-2 px-3 text-center font-medium border-b border-primary/50 border-l border-primary/30">OUVERTURE</th>
                    <th colSpan={2} className="py-2 px-3 text-center font-medium border-b border-primary/50 border-l border-primary/30">MOUVEMENT</th>
                    <th colSpan={2} className="py-2 px-3 text-center font-medium border-b border-primary/50 border-l border-primary/30">CLÔTURE</th>
                  </tr>
                  <tr className="bg-primary/80 text-primary-foreground">
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium border-l border-primary/30 whitespace-nowrap">Débit</th>
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium whitespace-nowrap">Crédit</th>
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium border-l border-primary/30 whitespace-nowrap">Débit</th>
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium whitespace-nowrap">Crédit</th>
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium border-l border-primary/30 whitespace-nowrap">Débit</th>
                    <th className="py-1.5 px-1.5 sm:px-3 text-right font-medium whitespace-nowrap">Crédit</th>
                  </tr>
                </thead>
                <tbody>
                  {lignes.map((l, i) => (
                    <tr key={l.numero} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                      <td className="py-1.5 px-1.5 sm:px-3 font-mono font-medium text-primary whitespace-nowrap">{l.numero}</td>
                      <td className="py-1.5 px-1.5 sm:px-3 text-foreground max-w-[100px] sm:max-w-[200px] truncate">{l.intitule}</td>
                      <td className="py-1.5 px-3 text-right border-l border-border/50">{l.ouvertureD > 0 ? formatMontant(l.ouvertureD) : ''}</td>
                      <td className="py-1.5 px-3 text-right">{l.ouvertureC > 0 ? formatMontant(l.ouvertureC) : ''}</td>
                      <td className="py-1.5 px-3 text-right border-l border-border/50">{l.mouvementD > 0 ? formatMontant(l.mouvementD) : ''}</td>
                      <td className="py-1.5 px-3 text-right">{l.mouvementC > 0 ? formatMontant(l.mouvementC) : ''}</td>
                      <td className="py-1.5 px-3 text-right border-l border-border/50 text-green-700 font-medium">{l.clotureD > 0 ? formatMontant(l.clotureD) : ''}</td>
                      <td className="py-1.5 px-3 text-right text-red-700 font-medium">{l.clotureC > 0 ? formatMontant(l.clotureC) : ''}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-primary text-primary-foreground font-bold border-t-2 border-primary">
                    <td colSpan={2} className="py-2 px-3 text-right">TOTAUX</td>
                    <td className="py-2 px-3 text-right border-l border-primary/30">{formatMontant(totals.ouvertureD)}</td>
                    <td className="py-2 px-3 text-right">{formatMontant(totals.ouvertureC)}</td>
                    <td className="py-2 px-3 text-right border-l border-primary/30">{formatMontant(totals.mouvementD)}</td>
                    <td className="py-2 px-3 text-right">{formatMontant(totals.mouvementC)}</td>
                    <td className="py-2 px-3 text-right border-l border-primary/30">{formatMontant(totals.clotureD)}</td>
                    <td className="py-2 px-3 text-right">{formatMontant(totals.clotureC)}</td>
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
