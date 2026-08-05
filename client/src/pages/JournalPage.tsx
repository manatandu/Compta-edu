import { useUser } from '@/lib/userContext'
import React, { useState, useMemo, useEffect as useEffHash } from 'react'
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import {
  getCompteByNumero, getComptes, Ecriture
} from '@/lib/db'
import {
  createSessionAsync, deleteSessionAsync,
  addEcritureAsync, deleteEcrituresByGroupeAsync, clearSessionEcrituresAsync
} from '@/lib/db-firebase'
import { useSessions, useEcritures } from '@/lib/useFirestore'
import { useModule } from '@/lib/moduleContext'
import { formatMontant, generateId } from '@/lib/utils'
import { exportJournalPDF } from '@/lib/exportPDF'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Pencil, Trash2, Download, PlusCircle, AlertCircle, RefreshCw, Settings2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface LigneSaisie {
  id: string
  numeroCompte: string
  intituleCompte: string
  debit: string
  credit: string
}

const emptyLigne = (): LigneSaisie => ({
  id: generateId(),
  numeroCompte: '',
  intituleCompte: '',
  debit: '',
  credit: ''
})

export default function JournalPage() {
  const { toast } = useToast()
  const module = useModule()
  const user = useUser()
  const allComptes = getComptes()
  const { sessions, loading: loadingSessions } = useSessions(user?.id, module)
  const { ecritures, loading: loadingEcritures } = useEcritures(user?.id, module)
  // Lire l'ID de session demandée depuis l'URL (ex: #/journal?session=xxx)
  // On écoute hashchange pour capturer les navigations post-montage
  const [currentHash, setCurrentHash] = React.useState(window.location.hash)
  useEffHash(() => {
    const handler = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    // Màj immédiate au montage
    setCurrentHash(window.location.hash)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  const urlSessionId = React.useMemo(() => {
    const match = currentHash.match(/[?&]session=([^&]+)/)
    return match ? match[1] : null
  }, [currentHash])

  const [selectedSessionId, setSelectedSessionId] = useState('')

  // Sélection auto de la session courante quand les sessions chargent
  React.useEffect(() => {
    if (sessions.length === 0) { setSelectedSessionId(''); return }
    // Priorité 1 : session demandée via URL (devoir) : toujours prioritaire
    if (urlSessionId) {
      const target = sessions.find(s => s.id === urlSessionId)
      if (target) { setSelectedSessionId(target.id); return }
      // Session pas encore arrivée depuis Firestore, on attend le prochain update
      return
    }
    // Ne pas changer si une session valide est déjà sélectionnée
    if (selectedSessionId && sessions.find(s => s.id === selectedSessionId)) return
    // Priorité 2 : année courante
    const currentYear = new Date().getFullYear()
    const matchYear = sessions.find(s => s.exercice === currentYear)
    if (matchYear) { setSelectedSessionId(matchYear.id); return }
    const sorted = [...sessions].sort((a, b) => b.exercice - a.exercice)
    setSelectedSessionId(sorted[0].id)
  }, [sessions, urlSessionId])
  const [showNewSession, setShowNewSession] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [deleteGroupe, setDeleteGroupe] = useState<string | null>(null)
  const [isBilanOuverture, setIsBilanOuverture] = useState(false)
  const [confirmDeleteSession, setConfirmDeleteSession] = useState(false)
  const [confirmClearSession, setConfirmClearSession] = useState(false)

  // New session form
  const [newSessionNom, setNewSessionNom] = useState('')
  const [newSessionExercice, setNewSessionExercice] = useState(new Date().getFullYear().toString())
  const [newSessionDesc, setNewSessionDesc] = useState('')

  // Entry form
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [libelle, setLibelle] = useState('')
  const [numeroPiece, setNumeroPiece] = useState('')
  const [editGroupe, setEditGroupe] = useState<string | null>(null) // groupe en cours d'édition
  const [lignes, setLignes] = useState<LigneSaisie[]>([emptyLigne(), emptyLigne()])
  const [formError, setFormError] = useState('')
  const [compteSearch, setCompteSearch] = useState<Record<string, string>>({})

  const selectedSession = sessions.find(s => s.id === selectedSessionId)
  const sessionVerrouillee = !!(selectedSession?.verrouille)
  const sessionEcritures = ecritures.filter(e => e.sessionId === selectedSessionId)

  // Group by ligneGroupe
  const grouped = useMemo(() => {
    const map = new Map<string, Ecriture[]>()
    sessionEcritures.forEach(e => {
      if (!map.has(e.ligneGroupe)) map.set(e.ligneGroupe, [])
      map.get(e.ligneGroupe)!.push(e)
    })
    return Array.from(map.entries()).sort((a, b) => {
      const da = a[1][0]?.date || ''
      const db = b[1][0]?.date || ''
      return da.localeCompare(db)
    })
  }, [sessionEcritures])

  const createNewSession = async () => {
    if (!newSessionNom.trim()) return
    const s = await createSessionAsync({
      nom: newSessionNom.trim(),
      exercice: parseInt(newSessionExercice) || new Date().getFullYear(),
      description: newSessionDesc,
      userId: user?.id || '',
      faculteId: (user as any)?.faculteId || undefined,
      universiteId: (user as any)?.universiteId || undefined,
    }, module)
    setSelectedSessionId(s.id)
    setShowNewSession(false)
    setNewSessionNom(''); setNewSessionExercice(new Date().getFullYear().toString()); setNewSessionDesc('')
    toast({ title: 'Session créée', description: s.nom })
  }

  const updateLigne = (id: string, field: keyof LigneSaisie, value: string) => {
    setLignes(prev => prev.map(l => {
      if (l.id !== id) return l
      const updated = { ...l, [field]: value }
      if (field === 'numeroCompte') {
        const compte = getCompteByNumero(value)
        if (compte) {
          updated.intituleCompte = compte.intitule
        } else {
          // Search by prefix
          const suggestions = allComptes.filter(c => c.numero.startsWith(value))
          if (suggestions.length === 1) updated.intituleCompte = suggestions[0].intitule
          else updated.intituleCompte = ''
        }
      }
      return updated
    }))
  }

  const addLigne = () => setLignes(prev => [...prev, emptyLigne()])
  const removeLigne = (id: string) => {
    if (lignes.length <= 2) return
    setLignes(prev => prev.filter(l => l.id !== id))
  }

  const validateAndSave = async () => {
    setFormError('')
    if (!selectedSessionId) { setFormError('Sélectionnez une session.'); return }
    if (!date) { setFormError('Date requise.'); return }
    if (!libelle.trim()) { setFormError('Libellé requis.'); return }

    const validLines = lignes.filter(l => l.numeroCompte.trim())
    if (validLines.length < 2) { setFormError('Au moins 2 lignes de compte requises.'); return }

    // Check compte restrictions for bilan ouverture (no classes 6,7,8)
    if (isBilanOuverture) {
      const hasForbidden = validLines.some(l => ['6', '7', '8'].includes(l.numeroCompte[0]))
      if (hasForbidden) { setFormError('En mode Bilan d\'ouverture, les comptes des classes 6, 7 et 8 sont interdits.'); return }
    }

    const debits = validLines.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0)
    const credits = validLines.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0)
    if (Math.abs(debits - credits) > 0.01) {
      setFormError(`Déséquilibre: Débit=${formatMontant(debits)} ≠ Crédit=${formatMontant(credits)}`)
      return
    }

    const hasDebit = validLines.some(l => parseFloat(l.debit) > 0)
    const hasCredit = validLines.some(l => parseFloat(l.credit) > 0)
    if (!hasDebit || !hasCredit) { setFormError('Au moins un débit et un crédit sont requis.'); return }

    // Check for no duplicate accounts
    const nums = validLines.map(l => l.numeroCompte.trim())
    if (new Set(nums).size !== nums.length) { setFormError('Le m\u00eame compte ne peut pas appara\u00eetre plusieurs fois dans une m\u00eame \u00e9criture.'); return }

    // Check no debit AND credit on same line
    const mixedLine = validLines.find(l => (parseFloat(l.debit) > 0) && (parseFloat(l.credit) > 0))
    if (mixedLine) { setFormError(`Le compte ${mixedLine.numeroCompte} ne peut pas avoir \u00e0 la fois un d\u00e9bit et un cr\u00e9dit sur la m\u00eame ligne.`); return }

    // Vérifier cohérence : la première ligne saisie doit être au débit
    const premiereValide = validLines[0]
    if (premiereValide && parseFloat(premiereValide.credit) > 0 && parseFloat(premiereValide.debit) === 0) {
      setFormError('La première ligne d\'une écriture doit être au débit. En comptabilité, on inscrit toujours le débit avant le crédit.')
      return
    }

    // Validate year
    const year = parseInt(String(selectedSession?.exercice))
    const entryYear = new Date(date).getFullYear()
    if (entryYear !== year) {
      setFormError(`La date doit correspondre à l'exercice ${year}.`)
      return
    }

    const ligneGroupe = isBilanOuverture ? `ouverture-${generateId()}` : generateId()

    // Ordre de saisie préservé : pas de tri automatique débit/crédit
    const sorted = validLines

    // Si édition : supprimer l'ancien groupe d'abord
    if (editGroupe) {
      await deleteEcrituresByGroupeAsync(editGroupe, user?.id || '')
    }

    await Promise.all(sorted.map(l =>
      addEcritureAsync({
        sessionId: selectedSessionId,
        ligneGroupe,
        date,
        libelle: libelle.trim(),
        numeroPiece: numeroPiece.trim() || undefined,
        numeroCompte: l.numeroCompte.trim(),
        intituleCompte: l.intituleCompte || getCompteByNumero(l.numeroCompte.trim())?.intitule || l.numeroCompte.trim(),
        debit: parseFloat(l.debit) || 0,
        credit: parseFloat(l.credit) || 0,
        userId: user?.id || '',
        faculteId: (user as any)?.faculteId || undefined,
        universiteId: (user as any)?.universiteId || undefined,
      }, module)
    ))

    setShowForm(false)
    setLignes([emptyLigne(), emptyLigne()])
    setLibelle('')
    setNumeroPiece('')
    setEditGroupe(null)
    setIsBilanOuverture(false)
    setDate(new Date().toISOString().split('T')[0])
    toast({ title: editGroupe ? 'Écriture modifiée' : 'Écriture enregistrée', description: `${sorted.length} lignes` })
  }

  const openEditEcriture = (groupe: string, lines: Ecriture[]) => {
    // Charger les données existantes dans le formulaire
    setEditGroupe(groupe)
    setDate(lines[0].date)
    setLibelle(lines[0].libelle)
    setNumeroPiece((lines[0] as any).numeroPiece || '')
    setLignes(lines.map(l => ({
      id: l.id,
      numeroCompte: l.numeroCompte,
      intituleCompte: l.intituleCompte,
      debit: l.debit > 0 ? String(l.debit) : '',
      credit: l.credit > 0 ? String(l.credit) : '',
    })))
    setShowForm(true)
    setFormError('')
    setIsBilanOuverture(groupe.startsWith('ouverture-'))
  }

  const handleDelete = async () => {
    if (!deleteGroupe) return
    await deleteEcrituresByGroupeAsync(deleteGroupe, user?.id || '')
    setDeleteGroupe(null)
    toast({ title: 'Écriture supprimée', variant: 'destructive' })
  }

  const handleDeleteSession = async () => {
    if (!selectedSessionId) return
    await clearSessionEcrituresAsync(selectedSessionId, user?.id || '')
    await deleteSessionAsync(selectedSessionId)
    setSelectedSessionId(sessions.filter(s => s.id !== selectedSessionId)[0]?.id || '')
    setConfirmDeleteSession(false)
    toast({ title: 'Session supprimée', variant: 'destructive' })
  }

  const handleClearSession = async () => {
    if (!selectedSessionId) return
    await clearSessionEcrituresAsync(selectedSessionId, user?.id || '')
    setConfirmClearSession(false)
    toast({ title: 'Session réinitialisée : toutes les écritures ont été effacées', variant: 'destructive' })
  }

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement du journal..." />

  return (
    <div className="space-y-5 animate-fadeIn">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
                <Settings2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Journal Comptable</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Saisie des écritures SYSCOHADA : Partie double</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button variant="outline" size="sm" onClick={() => setShowNewSession(true)} className="flex-1 sm:flex-none justify-center">
                <PlusCircle className="h-4 w-4 mr-1" /> Nouvelle session
              </Button>
              {sessionEcritures.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => exportJournalPDF(selectedSession?.nom || '', sessionEcritures)} className="flex-1 sm:flex-none justify-center">
                  <Download className="h-4 w-4 mr-1" /> PDF
                </Button>
              )}
              <Button size="sm" onClick={() => setShowForm(true)} disabled={!selectedSessionId || sessionVerrouillee} className="flex-1 sm:flex-none justify-center">
                <Plus className="h-4 w-4 mr-1" /> Nouvelle écriture
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Session selector */}
      <Card className="border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Label className="text-sm font-medium shrink-0">Session active :</Label>
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
            {selectedSession && (
              <span className="text-sm text-muted-foreground">
                {sessionEcritures.length} écriture(s) · Exercice {selectedSession.exercice}
              </span>
            )}
            {sessionVerrouillee && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-300 dark:border-amber-700">
                🔒 Session verrouillée (devoir soumis)
              </span>
            )}
            {selectedSessionId && (
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  onClick={() => setConfirmClearSession(true)}
                  disabled={sessionEcritures.length === 0 || sessionVerrouillee}
                  title={sessionVerrouillee ? 'Session verrouillée' : 'Effacer toutes les écritures de cette session'}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Réinitialiser
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => setConfirmDeleteSession(true)}
                  title="Supprimer cette session et toutes ses écritures"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ecritures list */}
      {grouped.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <BookmarkedIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Aucune écriture dans cette session.</p>
            <p className="text-sm mt-1">Cliquez sur "Nouvelle écriture" pour commencer.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {grouped.map(([groupe, lines]) => {
            const isOuverture = groupe.startsWith('ouverture-')
            const totalDebit = lines.reduce((s, l) => s + l.debit, 0)
            const totalCredit = lines.reduce((s, l) => s + l.credit, 0)
            return (
              <Card key={groupe} className="border-border">
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-muted-foreground">{lines[0]?.date}</span>
                      <span className="font-medium text-sm">{lines[0]?.libelle}</span>
                      {isOuverture && <Badge variant="secondary" className="text-xs">Ouverture</Badge>}
                      {(lines[0] as any).numeroPiece && (
                        <Badge variant="outline" className="text-xs font-mono">{(lines[0] as any).numeroPiece}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        onClick={() => openEditEcriture(groupe, lines)}
                        disabled={sessionVerrouillee}
                        title={sessionVerrouillee ? 'Session verrouillée' : 'Modifier'}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => setDeleteGroupe(groupe)}
                        disabled={sessionVerrouillee}
                        title={sessionVerrouillee ? 'Session verrouillée' : 'Supprimer'}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs min-w-[320px]">
                      <thead>
                        <tr className="text-muted-foreground border-b border-border">
                          <th className="text-left py-1 px-2 w-[4.5rem]">Compte</th>
                          <th className="text-left py-1 px-2">Intitulé</th>
                          <th className="text-right py-1 px-2 w-[5.5rem] whitespace-nowrap">Débit</th>
                          <th className="text-right py-1 px-2 w-[5.5rem] whitespace-nowrap">Crédit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lines.map(l => (
                          <tr key={l.id} className="border-b border-border/50 last:border-0">
                            <td className="py-1 px-2 font-mono w-[4.5rem] shrink-0">{l.numeroCompte}</td>
                            <td className="py-1 px-2 text-foreground max-w-0 truncate">{l.intituleCompte}</td>
                            <td className="py-1 px-2 text-right text-green-700 dark:text-green-400 whitespace-nowrap w-[5.5rem]">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                            <td className="py-1 px-2 text-right text-red-700 dark:text-red-400 whitespace-nowrap w-[5.5rem]">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                          </tr>
                        ))}
                        <tr className="font-semibold text-xs bg-muted/30">
                          <td colSpan={2} className="py-1 px-2 text-right text-muted-foreground">Total</td>
                          <td className="py-1 px-2 text-right text-green-700 dark:text-green-400">{formatMontant(totalDebit)}</td>
                          <td className="py-1 px-2 text-right text-red-700 dark:text-red-400">{formatMontant(totalCredit)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* New session dialog */}
      <Dialog open={showNewSession} onOpenChange={setShowNewSession}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nouvelle session</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nom de la session *</Label>
              <Input value={newSessionNom} onChange={e => setNewSessionNom(e.target.value)} placeholder="Ex: Exercice 2024 - Société X" className="mt-1" />
            </div>
            <div>
              <Label>Exercice (année) *</Label>
              <Input type="number" value={newSessionExercice} onChange={e => setNewSessionExercice(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={newSessionDesc} onChange={e => setNewSessionDesc(e.target.value)} placeholder="Optionnel" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSession(false)}>Annuler</Button>
            <Button onClick={createNewSession} disabled={!newSessionNom.trim()}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Entry form dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editGroupe ? "Modifier l'écriture" : 'Nouvelle écriture comptable'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Bilan ouverture checkbox */}
            <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-md">
              <Checkbox
                id="bilanOuverture"
                checked={isBilanOuverture}
                onCheckedChange={v => setIsBilanOuverture(!!v)}
              />
              <Label htmlFor="bilanOuverture" className="cursor-pointer text-sm font-medium">
                Bilan d'ouverture <span className="text-muted-foreground font-normal">(classes 6, 7, 8 interdites)</span>
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Date *</Label>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Libellé *</Label>
                <Input value={libelle} onChange={e => setLibelle(e.target.value)} placeholder="Description de l'opération" className="mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-sm">N° Pièce <span className="text-muted-foreground font-normal">(optionnel : facture, reçu, chèque…)</span></Label>
              <Input value={numeroPiece} onChange={e => setNumeroPiece(e.target.value)} placeholder="ex: FAC-2026-001" className="mt-1" />
            </div>

            {/* Lines */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Lignes d'écriture</Label>
              <div className="text-xs text-muted-foreground bg-muted/20 rounded px-3 py-2 mb-2 space-y-0.5">
                <p>• Commencez toujours par les comptes au <strong>Débit</strong>, ensuite les comptes au <strong>Crédit</strong></p>
                <p>• Chaque compte ne peut apparaître qu'une seule fois</p>
                <p>• Un compte ne peut pas avoir à la fois un débit et un crédit</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr className="text-muted-foreground text-xs border-b border-border">
                      <th className="text-left py-2 px-1">N° Compte / Intitulé</th>
                      <th className="text-right py-2 px-1 w-28">Débit</th>
                      <th className="text-right py-2 px-1 w-28">Crédit</th>
                      <th className="w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignes.map(l => {
                      const suggestions = l.numeroCompte.length >= 2
                        ? getComptes().filter(c => c.numero.startsWith(l.numeroCompte) && c.numero !== l.numeroCompte).slice(0, 5)
                        : []
                      return (
                        <tr key={l.id} className="border-b border-border/30">
                          <td className="py-1 px-1">
                            <div className="flex gap-1">
                              <Input
                                className="w-24 text-xs font-mono"
                                placeholder="N°"
                                value={l.numeroCompte}
                                onChange={e => updateLigne(l.id, 'numeroCompte', e.target.value)}
                              />
                              <Input
                                className="flex-1 text-xs"
                                placeholder="Intitulé du compte"
                                value={l.intituleCompte}
                                onChange={e => updateLigne(l.id, 'intituleCompte', e.target.value)}
                              />
                            </div>
                            {suggestions.length > 0 && l.intituleCompte === '' && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {suggestions.map(s => (
                                  <button
                                    key={s.numero}
                                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded hover:bg-primary/20"
                                    onClick={() => updateLigne(l.id, 'numeroCompte', s.numero)}
                                  >
                                    {s.numero} - {s.intitule.substring(0, 30)}
                                  </button>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="py-1 px-1">
                            <Input
                              type="number"
                              className="text-right text-xs w-full"
                              placeholder="0"
                              value={l.debit}
                              onChange={e => updateLigne(l.id, 'debit', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="py-1 px-1">
                            <Input
                              type="number"
                              className="text-right text-xs w-full"
                              placeholder="0"
                              value={l.credit}
                              onChange={e => updateLigne(l.id, 'credit', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="py-1 px-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeLigne(l.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="text-xs font-semibold bg-muted/30">
                      <td className="py-2 px-1 text-right text-muted-foreground">Totaux</td>
                      <td className="py-2 px-1 text-right text-green-700 dark:text-green-400">
                        {formatMontant(lignes.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0))}
                      </td>
                      <td className="py-2 px-1 text-right text-red-700 dark:text-red-400">
                        {formatMontant(lignes.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0))}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <Button variant="outline" size="sm" className="mt-2" onClick={addLigne}>
                <Plus className="h-3 w-3 mr-1" /> Ajouter une ligne
              </Button>
            </div>

            {formError && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {formError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowForm(false); setLignes([emptyLigne(), emptyLigne()]); setLibelle(''); setNumeroPiece(''); setEditGroupe(null); setFormError(''); setDate(new Date().toISOString().split('T')[0]) }}>Annuler</Button>
            <Button onClick={validateAndSave}>{editGroupe ? 'Modifier' : 'Enregistrer'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteGroupe} onOpenChange={o => !o && setDeleteGroupe(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'écriture ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les lignes de cette écriture seront supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Confirm réinitialiser session */}
      <AlertDialog open={confirmClearSession} onOpenChange={setConfirmClearSession}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Réinitialiser la session ?</AlertDialogTitle>
            <AlertDialogDescription>
              Toutes les écritures de <strong>{selectedSession?.nom}</strong> seront effacées de façon irréversible. La session elle-même sera conservée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearSession} className="bg-amber-600 text-white hover:bg-amber-700">
              <RefreshCw className="h-4 w-4 mr-1.5" /> Réinitialiser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm supprimer session */}
      <AlertDialog open={confirmDeleteSession} onOpenChange={setConfirmDeleteSession}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la session ?</AlertDialogTitle>
            <AlertDialogDescription>
              La session <strong>{selectedSession?.nom}</strong> et <strong>toutes ses écritures</strong> seront supprimées définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSession} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <Trash2 className="h-4 w-4 mr-1.5" /> Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function BookmarkedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}
