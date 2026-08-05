import { useUser } from '@/lib/userContext'
import React, { useState, useRef } from 'react'
import BackButton from '@/components/BackButton'
import { useHashLocation } from 'wouter/use-hash-location'
import { BAREME_DEFAUT } from '@/lib/db'
import type { ExerciceLibreType } from '@/lib/db'

// Type QCM local pour les exercices libres (format historique — différent de QCMChapitre)
interface QuestionQCM {
  enonce: string
  options: string[]
  reponseCorrecte: number
}
import {
  createExerciceAsync, updateExerciceAsync, deleteExerciceAsync,
  createExerciceLibreAsync, updateExerciceLibreAsync, deleteExerciceLibreAsync,
  uploadExercicePDF, uploadExerciceCorrigePDF,
  createTentativeELAsync, updateTentativeELAsync,
  COURS_SYSTEME,
} from '@/lib/db-firebase'
import { useSessions, useExercices, useTentatives, useExercicesLibres, useTentativesEL, useCours } from '@/lib/useFirestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Pencil, Trash2, Play, GraduationCap, BookOpen, Trophy, Loader2, Dumbbell, FileText, CheckSquare, Layers, Eye, X, Check, Upload } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// ─── Icône par type ────────────────────────────────────────────────────────────
function TypeIcon({ type }: { type: ExerciceLibreType }) {
  if (type === 'pratique') return <Dumbbell className="h-4 w-4 text-blue-500" />
  if (type === 'theorique') return <FileText className="h-4 w-4 text-purple-500" />
  if (type === 'qcm') return <CheckSquare className="h-4 w-4 text-green-500" />
  return <Layers className="h-4 w-4 text-orange-500" />
}

function TypeLabel({ type }: { type: ExerciceLibreType }) {
  const labels: Record<ExerciceLibreType, string> = {
    pratique: 'Pratique', theorique: 'Théorique', qcm: 'QCM', mixte: 'Mixte',
  }
  const colors: Record<ExerciceLibreType, string> = {
    pratique: 'bg-blue-100 text-blue-700',
    theorique: 'bg-purple-100 text-purple-700',
    qcm: 'bg-green-100 text-green-700',
    mixte: 'bg-orange-100 text-orange-700',
  }
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[type]}`}>{labels[type]}</span>
}

// ─── Composant QCM Builder (prof) ─────────────────────────────────────────────
function QCMBuilder({ questions, onChange }: { questions: QuestionQCM[], onChange: (q: QuestionQCM[]) => void }) {
  const addQuestion = () => {
    onChange([...questions, { enonce: '', options: ['', '', '', ''], reponseCorrecte: 0 }])
  }
  const removeQuestion = (i: number) => onChange(questions.filter((_, idx) => idx !== i))
  const updateQuestion = (i: number, field: string, value: any) => {
    const updated = questions.map((q, idx) => idx === i ? { ...q, [field]: value } : q)
    onChange(updated)
  }
  const updateOption = (qi: number, oi: number, value: string) => {
    const updated = questions.map((q, idx) => {
      if (idx !== qi) return q
      const opts = [...q.options]
      opts[oi] = value
      return { ...q, options: opts }
    })
    onChange(updated)
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qi) => (
        <div key={qi} className="border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Question {qi + 1}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeQuestion(qi)}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Textarea
            placeholder="Énoncé de la question"
            value={q.enonce}
            onChange={e => updateQuestion(qi, 'enonce', e.target.value)}
            rows={2}
            className="text-sm"
          />
          <div className="space-y-1">
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuestion(qi, 'reponseCorrecte', oi)}
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${q.reponseCorrecte === oi ? 'border-green-500 bg-green-500' : 'border-border'}`}
                >
                  {q.reponseCorrecte === oi && <Check className="h-3 w-3 text-white" />}
                </button>
                <Input
                  placeholder={`Option ${oi + 1}`}
                  value={opt}
                  onChange={e => updateOption(qi, oi, e.target.value)}
                  className="text-sm h-8"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Cliquez sur le cercle vert pour marquer la bonne réponse.</p>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addQuestion} className="w-full">
        <Plus className="h-3.5 w-3.5 mr-1" /> Ajouter une question
      </Button>
    </div>
  )
}

// ─── Modal Corrigé Exercice Libre ─────────────────────────────────────────────
function ModalCorrige({
  exercice, tentative, open, onClose
}: {
  exercice: any, tentative: any, open: boolean, onClose: () => void
}) {
  if (!open || !exercice) return null

  const scoreQCM = tentative?.reponsesQCM && exercice.questions
    ? exercice.questions.reduce((acc: number, q: QuestionQCM, i: number) => acc + (tentative.reponsesQCM[i] === q.reponseCorrecte ? 1 : 0), 0)
    : null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Corrigé : {exercice.titre}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">

          {/* Score QCM */}
          {scoreQCM !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-semibold text-green-700">
                Score QCM : {scoreQCM}/{exercice.questions.length} bonnes réponses
              </p>
              {exercice.questions.map((q: QuestionQCM, i: number) => (
                <div key={i} className="mt-3">
                  <p className="text-sm font-medium">{i + 1}. {q.enonce}</p>
                  {q.options.map((opt: string, oi: number) => (
                    <div key={oi} className={`text-sm flex items-center gap-2 mt-1 ${oi === q.reponseCorrecte ? 'text-green-600 font-medium' : tentative?.reponsesQCM?.[i] === oi && oi !== q.reponseCorrecte ? 'text-red-500 line-through' : 'text-muted-foreground'}`}>
                      <span>{oi === q.reponseCorrecte ? '✓' : tentative?.reponsesQCM?.[i] === oi ? '✗' : '•'}</span>
                      {opt}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Corrigé texte (théorique / mixte) */}
          {exercice.corrigeTexte && (
            <div>
              <p className="text-sm font-semibold mb-2">Corrigé théorique</p>
              <div className="bg-muted/40 rounded-lg p-4 text-sm whitespace-pre-wrap">{exercice.corrigeTexte}</div>
            </div>
          )}

          {/* Écritures corrigées (pratique / mixte) */}
          {exercice.ecrituresCorrigees && exercice.ecrituresCorrigees.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">Écritures comptables corrigées</p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-left">Libellé</th>
                      <th className="px-3 py-2 text-left">Cpt Débit</th>
                      <th className="px-3 py-2 text-left">Cpt Crédit</th>
                      <th className="px-3 py-2 text-right">Débit</th>
                      <th className="px-3 py-2 text-right">Crédit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercice.ecrituresCorrigees.map((e: any, i: number) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-3 py-2">{e.date}</td>
                        <td className="px-3 py-2">{e.libelle}</td>
                        <td className="px-3 py-2 font-mono">{e.compteDebit}</td>
                        <td className="px-3 py-2 font-mono">{e.compteCredit}</td>
                        <td className="px-3 py-2 text-right font-mono">{e.debit ? e.debit.toLocaleString('fr-FR') : ''}</td>
                        <td className="px-3 py-2 text-right font-mono">{e.credit ? e.credit.toLocaleString('fr-FR') : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PDF corrigé */}
          {exercice.corrigePdfUrl && (
            <div>
              <p className="text-sm font-semibold mb-2">Corrigé PDF</p>
              <a
                href={exercice.corrigePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <FileText className="h-4 w-4" />
                Télécharger le corrigé PDF
              </a>
            </div>
          )}

          {!exercice.corrigeTexte && !exercice.corrigePdfUrl && (!exercice.ecrituresCorrigees || exercice.ecrituresCorrigees.length === 0) && scoreQCM === null && (
            <p className="text-muted-foreground text-sm text-center py-4">Aucun corrigé disponible pour cet exercice.</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Formulaire Exercice Libre (prof) ─────────────────────────────────────────
function FormExerciceLibre({ onClose, editData, coursList }: { onClose: () => void, editData?: any, coursList: { id: string, nom: string, faculteId?: string, universiteId?: string }[] }) {
  const { toast } = useToast()
  const user = useUser()
  const [saving, setSaving] = useState(false)
  const [type, setType] = useState<ExerciceLibreType>(editData?.type || 'pratique')
  const [titre, setTitre] = useState(editData?.titre || '')
  const [consignes, setConsignes] = useState(editData?.consignes || '')
  const [corrigeTexte, setCorrigeTexte] = useState(editData?.corrigeTexte || '')
  const [questions, setQuestions] = useState<QuestionQCM[]>(editData?.questions || [])
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [corrigePdfFile, setCorrigePdfFile] = useState<File | null>(null)
  const [actif, setActif] = useState(editData?.actif ?? true)
  const [coursId, setCoursId] = useState(editData?.coursId || (coursList[0]?.id || ''))
  const pdfRef = useRef<HTMLInputElement>(null)
  const corrigePdfRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    if (!titre.trim()) { toast({ title: 'Titre obligatoire', variant: 'destructive' }); return }
    if (!coursId) { toast({ title: 'Cours obligatoire', variant: 'destructive' }); return }
    setSaving(true)
    try {
      const tempId = editData?.id || `el_${Date.now()}`
      let pdfUrl = editData?.pdfUrl
      let pdfNom = editData?.pdfNom
      let corrigePdfUrl = editData?.corrigePdfUrl
      let corrigePdfNom = editData?.corrigePdfNom

      if (pdfFile) {
        pdfUrl = await uploadExercicePDF(tempId, pdfFile)
        pdfNom = pdfFile.name
      }
      if (corrigePdfFile) {
        corrigePdfUrl = await uploadExerciceCorrigePDF(tempId, corrigePdfFile)
        corrigePdfNom = corrigePdfFile.name
      }

      // Résoudre faculteId/universiteId depuis le cours sélectionné
      const coursObj = (coursList as any[]).find((c: any) => c.id === coursId)
      const data = {
        titre, consignes, type, actif,
        coursId,
        faculteId: coursObj?.faculteId || undefined,
        universiteId: coursObj?.universiteId || undefined,
        createdBy: user?.id || '',
        pdfUrl, pdfNom, corrigePdfUrl, corrigePdfNom,
        corrigeTexte: (type === 'theorique' || type === 'mixte') ? corrigeTexte : undefined,
        questions: (type === 'qcm' || type === 'mixte') ? (questions as any) : undefined,
        ecrituresCorrigees: (type === 'pratique' || type === 'mixte') ? [] : undefined,
      }

      if (editData?.id) {
        await updateExerciceLibreAsync(editData.id, data)
        toast({ title: 'Exercice modifié' })
      } else {
        await createExerciceLibreAsync(data as any)
        toast({ title: 'Exercice créé' })
      }
      onClose()
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{editData ? "Modifier l'exercice libre" : 'Nouvel exercice libre'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">

        {/* Cours */}
        <div>
          <Label>Cours *</Label>
          <Select value={coursId} onValueChange={setCoursId}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir un cours" /></SelectTrigger>
            <SelectContent>
              {coursList.map(c => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Type */}
        <div>
          <Label>Type d'exercice *</Label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {(['pratique', 'theorique', 'qcm', 'mixte'] as ExerciceLibreType[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${type === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
              >
                <TypeIcon type={t} />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Titre */}
        <div>
          <Label>Titre *</Label>
          <Input value={titre} onChange={e => setTitre(e.target.value)} className="mt-1" placeholder="Ex : Exercice sur les charges de personnel" />
        </div>

        {/* Consignes */}
        <div>
          <Label>Consignes</Label>
          <Textarea value={consignes} onChange={e => setConsignes(e.target.value)} className="mt-1" rows={3} placeholder="Instructions pour l'étudiant..." />
        </div>

        {/* PDF énoncé */}
        <div>
          <Label>Énoncé PDF (optionnel)</Label>
          <div className="mt-1 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => pdfRef.current?.click()} type="button">
              <Upload className="h-3.5 w-3.5 mr-1" /> {pdfFile ? pdfFile.name : (editData?.pdfNom || 'Choisir un fichier')}
            </Button>
            <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={e => setPdfFile(e.target.files?.[0] || null)} />
          </div>
        </div>

        {/* QCM */}
        {(type === 'qcm' || type === 'mixte') && (
          <div>
            <Label>Questions QCM</Label>
            <div className="mt-2">
              <QCMBuilder questions={questions} onChange={setQuestions} />
            </div>
          </div>
        )}

        {/* Corrigé théorique */}
        {(type === 'theorique' || type === 'mixte') && (
          <div>
            <Label>Corrigé théorique</Label>
            <Textarea value={corrigeTexte} onChange={e => setCorrigeTexte(e.target.value)} className="mt-1" rows={4} placeholder="Réponse attendue pour le corrigé..." />
          </div>
        )}

        {/* Corrigé PDF */}
        <div>
          <Label>Corrigé PDF (optionnel)</Label>
          <div className="mt-1 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => corrigePdfRef.current?.click()} type="button">
              <Upload className="h-3.5 w-3.5 mr-1" /> {corrigePdfFile ? corrigePdfFile.name : (editData?.corrigePdfNom || 'Choisir un fichier')}
            </Button>
            <input ref={corrigePdfRef} type="file" accept=".pdf" className="hidden" onChange={e => setCorrigePdfFile(e.target.files?.[0] || null)} />
          </div>
        </div>

        {/* Actif */}
        <div className="flex items-center gap-2">
          <Switch checked={actif} onCheckedChange={setActif} />
          <Label>Exercice visible aux étudiants</Label>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={saving}>Annuler</Button>
        <Button onClick={handleSave} disabled={!titre.trim() || saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
          Enregistrer
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

// ─── Onglet Exercices Libres ───────────────────────────────────────────────────
function OngletExercicesLibres({ coursIds, coursList, faculteId, promotion }: { coursIds?: string[], coursList: { id: string, nom: string, faculteId?: string, universiteId?: string, promotion?: string }[], faculteId?: string, promotion?: string }) {
  const { toast } = useToast()
  const user = useUser()
  const canManage = user?.role === 'admin' || user?.role === 'professeur' || user?.role === 'assistant'
  // Étudiants : filtré par leurs cours + faculteId + promotion via cours ; prof/admin : tous
  const { exercices, loading } = useExercicesLibres(undefined, !canManage ? coursIds : undefined, !canManage ? faculteId : undefined, !canManage ? promotion : undefined, !canManage ? coursList : undefined)
  const { tentatives } = useTentativesEL(user?.role === 'etudiant' ? user?.id : undefined)

  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [corrigeExercice, setCorrigeExercice] = useState<any>(null)
  const [corrigeTentative, setCorrigeTentative] = useState<any>(null)
  const [sessionActive, setSessionActive] = useState<{ exerciceId: string, ecritures: any[], reponseTexte: string, reponsesQCM: number[] } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const visibleExercices = exercices.filter(ex => canManage || ex.actif)

  const openCreate = () => { setEditData(null); setShowForm(true) }
  const openEdit = (ex: any) => { setEditData(ex); setShowForm(true) }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteExerciceLibreAsync(deleteId)
      toast({ title: 'Exercice supprimé', variant: 'destructive' })
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    }
    setDeleteId(null)
  }

  const demarrerExercice = (ex: any) => {
    setSessionActive({ exerciceId: ex.id, ecritures: [], reponseTexte: '', reponsesQCM: ex.questions?.map(() => 0) || [] })
  }

  const voirCorrige = (ex: any) => {
    const tent = tentatives.find(t => t.exerciceId === ex.id)
    setCorrigeExercice(ex)
    setCorrigeTentative(tent || null)
  }

  const handleSubmitSession = async () => {
    if (!sessionActive || !user) return
    setSubmitting(true)
    try {
      await createTentativeELAsync({
        exerciceId: sessionActive.exerciceId,
        etudiantId: user.id,
        reponseTexte: sessionActive.reponseTexte,
        reponsesQCM: sessionActive.reponsesQCM,
        corrigeVu: false,
      })
      toast({ title: 'Exercice soumis', description: 'Vous pouvez maintenant voir le corrigé.' })
      const ex = exercices.find(e => e.id === sessionActive.exerciceId)
      setSessionActive(null)
      if (ex) voirCorrige(ex)
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Session active (étudiant en train de faire l'exercice) ──
  if (sessionActive) {
    const ex = exercices.find(e => e.id === sessionActive.exerciceId)
    if (!ex) return null
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">{ex.titre}</h2>
            <TypeLabel type={ex.type} />
          </div>
          <Button variant="outline" size="sm" onClick={() => setSessionActive(null)}>
            <X className="h-4 w-4 mr-1" /> Quitter
          </Button>
        </div>

        {ex.consignes && (
          <div className="bg-muted/40 rounded-lg p-4 text-sm">
            <p className="font-medium mb-1">Consignes</p>
            <p className="text-muted-foreground whitespace-pre-wrap">{ex.consignes}</p>
          </div>
        )}

        {ex.pdfUrl && (
          <a href={ex.pdfUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <FileText className="h-4 w-4" /> Télécharger l'énoncé PDF
          </a>
        )}

        {/* QCM */}
        {(ex.type === 'qcm' || ex.type === 'mixte') && ex.questions && (
          <div className="space-y-4">
            <p className="text-sm font-semibold">Questions à choix multiples</p>
            {(ex.questions as unknown as QuestionQCM[]).map((q, qi) => (
              <div key={qi} className="border border-border rounded-lg p-4">
                <p className="text-sm font-medium mb-3">{qi + 1}. {q.enonce}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => {
                        const newRep = [...sessionActive.reponsesQCM]
                        newRep[qi] = oi
                        setSessionActive(s => s ? { ...s, reponsesQCM: newRep } : s)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${sessionActive.reponsesQCM[qi] === oi ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border hover:border-primary/50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Zone texte (théorique / mixte) */}
        {(ex.type === 'theorique' || ex.type === 'mixte') && (
          <div>
            <Label>Votre réponse</Label>
            <Textarea
              value={sessionActive.reponseTexte}
              onChange={e => setSessionActive(s => s ? { ...s, reponseTexte: e.target.value } : s)}
              rows={6}
              className="mt-1"
              placeholder="Rédigez votre réponse ici..."
            />
          </div>
        )}

        {/* Info pratique */}
        {ex.type === 'pratique' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-blue-700">Exercice pratique</p>
            <p className="text-blue-600 mt-1">Passez dans la section <strong>Comptabilité</strong> pour saisir vos écritures dans une session dédiée, puis revenez ici pour soumettre.</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSubmitSession} disabled={submitting} className="flex-1">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
            Soumettre et voir le corrigé
          </Button>
        </div>
      </div>
    )
  }

  // ── Liste exercices libres ──
  return (
    <div className="space-y-4">
      {canManage && (
        <div className="flex justify-end">
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-1" /> Créer un exercice libre
          </Button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : visibleExercices.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <Dumbbell className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Aucun exercice libre disponible.</p>
            {canManage && <p className="text-sm mt-1">Créez des exercices pour que vos étudiants puissent s'entraîner.</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-animate">
          {visibleExercices.map((ex, i) => {
            const dejaFait = tentatives.some(t => t.exerciceId === ex.id)
            return (
              <div key={ex.id} className="animate-slideUp group" style={{ animationDelay: `${i * 60}ms` }}>
                <Card className={`relative overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/20 ${!ex.actif ? 'opacity-60' : ''}`}>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-full" />
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/15 shrink-0">
                          <TypeIcon type={ex.type} />
                        </div>
                        <CardTitle className="text-base truncate">{ex.titre}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <TypeLabel type={ex.type} />
                        {canManage && (
                          <>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(ex)}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteId(ex.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {ex.consignes && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{ex.consignes}</p>}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {dejaFait && <Badge variant="outline" className="text-xs text-green-600 border-green-300">Fait</Badge>}
                        {!ex.actif && <Badge variant="outline" className="text-xs">Inactif</Badge>}
                      </div>
                      <div className="flex gap-2">
                        {dejaFait && (
                          <Button size="sm" variant="outline" onClick={() => voirCorrige(ex)} className="text-xs">
                            <Eye className="h-3.5 w-3.5 mr-1" /> Corrigé
                          </Button>
                        )}
                        {!canManage && (
                          <Button
                            size="sm"
                            onClick={() => demarrerExercice(ex)}
                            disabled={!ex.actif}
                            className="transition-all duration-200 hover:scale-105"
                          >
                            <Play className="h-3.5 w-3.5 mr-1" />
                            {dejaFait ? 'Refaire' : 'Commencer'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      )}

      {/* Form dialog */}
      <Dialog open={showForm} onOpenChange={o => { if (!o) setShowForm(false) }}>
        {showForm && <FormExerciceLibre onClose={() => setShowForm(false)} editData={editData} coursList={coursList} />}
      </Dialog>

      {/* Modal corrigé */}
      <ModalCorrige
        exercice={corrigeExercice}
        tentative={corrigeTentative}
        open={!!corrigeExercice}
        onClose={() => setCorrigeExercice(null)}
      />

      <AlertDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'exercice libre ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// ─── Page principale ───────────────────────────────────────────────────────────
export default function ExercicesPage() {
  const { toast } = useToast()
  const [, navigate] = useHashLocation()
  const user = useUser()
  const { sessions } = useSessions(user?.id)
  const { cours: allCours } = useCours()
  const canManage = user?.role === 'admin' || user?.role === 'professeur' || user?.role === 'assistant'
  // Pour les étudiants, filtrer par leurs cours inscrits
  const studentCoursIds = !canManage && user?.coursIds && user.coursIds.length > 0 ? user.coursIds : undefined
  const studentFaculteId = !canManage ? (user as any)?.faculteId || undefined : undefined
  const studentPromotion = !canManage ? (user as any)?.classe || undefined : undefined
  const { exercices, loading: loadingEx } = useExercices(studentCoursIds, studentFaculteId, studentPromotion, allCours)
  const { tentatives } = useTentatives(user?.id)
  // Liste des cours pour les formulaires (prof/admin)
  // Dédupliquer : un seul cours par coursSystemeId, exclure cours système inactifs
  const _coursInactifIds = new Set(COURS_SYSTEME.filter(c => !c.actif).map(c => c.id))
  const _coursSeen = new Set<string>()
  const coursList = allCours
    .filter(c => {
      if (!c.actif) return false
      if (_coursInactifIds.has(c.id)) return false
      if ((c as any).coursSystemeId && _coursInactifIds.has((c as any).coursSystemeId)) return false
      const key = (c as any).coursSystemeId || c.id
      if (_coursSeen.has(key)) return false
      _coursSeen.add(key)
      return true
    })
    .map(c => ({ id: c.id, nom: c.nom, faculteId: (c as any).faculteId, universiteId: (c as any).universiteId, promotion: c.promotion }))

  const [onglet, setOnglet] = useState<'guides' | 'libres'>('guides')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    titre: '', description: '', instructions: '', sessionId: sessions[0]?.id || '', actif: true, coursId: '',
  })

  const openCreate = () => {
    setEditId(null)
    setForm({ titre: '', description: '', instructions: '', sessionId: sessions[0]?.id || '', actif: true, coursId: allCours[0]?.id || '' })
    setShowForm(true)
  }

  const openEdit = (id: string) => {
    const ex = exercices.find(e => e.id === id)
    if (!ex) return
    setEditId(id)
    setForm({ titre: ex.titre, description: ex.description, instructions: ex.instructions, sessionId: ex.sessionId, actif: ex.actif, coursId: ex.coursId || '' })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.titre.trim()) { toast({ title: 'Titre obligatoire', variant: 'destructive' }); return }
    if (!form.coursId) { toast({ title: 'Cours obligatoire', variant: 'destructive' }); return }
    setSaving(true)
    try {
      // Résoudre faculteId/universiteId depuis le cours sélectionné
      const coursObj = coursList.find(c => c.id === form.coursId)
      if (editId) {
        await updateExerciceAsync(editId, {
          ...form,
          faculteId: coursObj?.faculteId || undefined,
          universiteId: coursObj?.universiteId || undefined,
        })
      } else {
        await createExerciceAsync({
          ...form,
          ecrituresAttendues: [],
          bareme: BAREME_DEFAUT,
          userId: user?.id || '',
          actif: form.actif,
          coursId: form.coursId,
          faculteId: coursObj?.faculteId || undefined,
          universiteId: coursObj?.universiteId || undefined,
        })
      }
      setShowForm(false)
      toast({ title: editId ? 'Exercice modifié' : 'Exercice créé' })
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteExerciceAsync(deleteId)
      toast({ title: 'Exercice supprimé', variant: 'destructive' })
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    }
    setDeleteId(null)
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      <BackButton />

      {/* Header */}
      <div className="animate-slideDown">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Exercices</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Pratiquez la comptabilité SYSCOHADA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1 w-fit">
        <button
          onClick={() => setOnglet('guides')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${onglet === 'guides' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" /> Exercices guidés
          </span>
        </button>
        <button
          onClick={() => setOnglet('libres')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${onglet === 'libres' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <span className="flex items-center gap-1.5">
            <Dumbbell className="h-4 w-4" /> Exercices libres
          </span>
        </button>
      </div>

      {/* Contenu onglet Exercices guidés */}
      {onglet === 'guides' && (
        <div className="space-y-4">
          {canManage && (
            <div className="flex justify-end">
              <Button size="sm" onClick={openCreate}>
                <Plus className="h-4 w-4 mr-1" /> Créer un exercice
              </Button>
            </div>
          )}

          {loadingEx ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : exercices.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
                <GraduationCap className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucun exercice disponible.</p>
                {canManage && <p className="text-sm mt-1">Créez un exercice pour commencer.</p>}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercices.map((ex, i) => {
                const session = sessions.find(s => s.id === ex.sessionId)
                const myTentatives = tentatives.filter(t => t.exerciceId === ex.id)
                const bestScore = myTentatives.length > 0 ? Math.max(...myTentatives.map(t => t.score)) : null
                return (
                  <div key={ex.id} className="animate-slideUp group" style={{ animationDelay: `${80 + i * 60}ms` }}>
                    <Card className={`relative overflow-hidden border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-primary/20 ${!ex.actif ? 'opacity-60' : ''}`}>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-full" />
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/15">
                              <GraduationCap className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-base">{ex.titre}</CardTitle>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            {!ex.actif && <Badge variant="outline" className="text-xs">Inactif</Badge>}
                            {canManage && (
                              <>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(ex.id)}>
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(ex.id)}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {ex.description && <p className="text-sm text-muted-foreground mb-3">{ex.description}</p>}
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {session && <span>Session : {session.nom}</span>}
                            {bestScore !== null && (
                              <span className="ml-2 text-primary font-medium flex items-center gap-1"><Trophy className="h-3 w-3" />{bestScore}/100</span>
                            )}
                          </div>
                          <Button size="sm" variant="outline" onClick={() => navigate(`/exercices/${ex.id}`)} disabled={!ex.actif && user?.role === 'etudiant'} className="transition-all duration-200 hover:scale-105">
                            <Play className="h-3.5 w-3.5 mr-1" />
                            {canManage ? 'Gérer' : 'Commencer'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          )}

          {/* Form guidé */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editId ? "Modifier l'exercice" : 'Nouvel exercice'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Cours *</Label>
                  <Select value={form.coursId} onValueChange={v => setForm(f => ({ ...f, coursId: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir un cours" /></SelectTrigger>
                    <SelectContent>
                      {coursList.map(c => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Titre *</Label>
                  <Input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1" rows={2} />
                </div>
                <div>
                  <Label>Instructions détaillées</Label>
                  <Textarea value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} className="mt-1" rows={4} />
                </div>
                <div>
                  <Label>Session</Label>
                  <Select value={form.sessionId} onValueChange={v => setForm(f => ({ ...f, sessionId: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {sessions.map(s => <SelectItem key={s.id} value={s.id}>{s.nom}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.actif} onCheckedChange={v => setForm(f => ({ ...f, actif: v }))} />
                  <Label>Exercice actif</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowForm(false)} disabled={saving}>Annuler</Button>
                <Button onClick={handleSave} disabled={!form.titre.trim() || saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer l'exercice ?</AlertDialogTitle>
                <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Contenu onglet Exercices libres */}
      {onglet === 'libres' && <OngletExercicesLibres coursIds={studentCoursIds} coursList={coursList} faculteId={studentFaculteId} promotion={studentPromotion} />}
    </div>
  )
}
