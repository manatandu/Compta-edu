import { useUser } from '@/lib/userContext'
import { isStaffRole } from '@/lib/permissions'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useParams } from 'wouter'
import {
  getCompteByNumero, getComptes, BAREME_DEFAUT
} from '@/lib/db'
import { saveTentativeAsync } from '@/lib/db-firebase'
import { useExercices, useTentatives } from '@/lib/useFirestore'
import { formatMontant, generateId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, Trash2, CheckCircle, XCircle, AlertCircle, BookOpen, Lock, Timer, Save, Dumbbell } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface LigneSaisie {
  id: string
  numeroCompte: string
  intituleCompte: string
  debit: string
  credit: string
}

const emptyLigne = (): LigneSaisie => ({
  id: generateId(), numeroCompte: '', intituleCompte: '', debit: '', credit: ''
})

// ─── Logique famille comptable ────────────────────────────────────────────────

type MatchType = 'exact' | 'sous-compte' | 'compte-parent' | 'incorrect'
function typeCorrespondance(attendu: string, saisi: string): MatchType {
  const a = attendu.trim()
  const s = saisi.trim()
  if (a === s) return 'exact'
  if (s.length <= 2) return 'incorrect'
  if (s.startsWith(a)) return 'sous-compte'
  if (a.startsWith(s)) return 'compte-parent'
  return 'incorrect'
}

// ─── Moteur de correction pédagogique ────────────────────────────────────────
interface ResultatLigne {
  attendu: { numeroCompte: string; intitule: string; sens: string; montant: number } | null
  saisi:   LigneSaisie
  matchCompte: MatchType
  matchSens: boolean
  matchMontant: boolean
  pointsCompte: number
  pointsSens: number
  pointsMontant: number
  messageCompte: string
  messageSens: string
  messageMontant: string
  conseil: string
}

function corrigerExercice(
  userLines: LigneSaisie[],
  solution: any[],
  bareme: { compte: number; sens: number; montant: number; equilibre: number }
): { score: number; resultats: ResultatLigne[]; balanced: boolean; bilanPoints: string[]; bilanErreurs: string[]; conseilsRevision: string[] } {

  const valid = userLines.filter(l => l.numeroCompte.trim())
  const totalD = valid.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0)
  const totalC = valid.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0)
  const balanced = Math.abs(totalD - totalC) < 0.01

  if (!solution || solution.length === 0) {
    const score = balanced ? 100 : 40
    return {
      score, resultats: [], balanced,
      bilanPoints: balanced ? ['Écriture équilibrée (Débit = Crédit)'] : [],
      bilanErreurs: balanced ? [] : [`Déséquilibre : Débit ${formatMontant(totalD)} ≠ Crédit ${formatMontant(totalC)}`],
      conseilsRevision: balanced ? [] : ['Vérifiez que la somme des débits est égale à la somme des crédits.'],
    }
  }

  const resultats: ResultatLigne[] = []
  const bilanPoints: string[] = []
  const bilanErreurs: string[] = []
  const conseilsRevision: string[] = []
  const conseilsSet = new Set<string>()

  let totalPoints = 0
  let maxPoints = solution.length * (bareme.compte + bareme.sens + bareme.montant)
  if (maxPoints === 0) maxPoints = solution.length * 100

  const usedIdx = new Set<number>()

  for (const exp of solution) {
    const expNum = String(exp.numeroCompte || '').trim()
    const expSens = String(exp.sens || '').toUpperCase()
    const expMontant = parseFloat(exp.montant) || 0

    let bestIdx = -1
    let bestPriority = 999
    valid.forEach((l, i) => {
      if (usedIdx.has(i)) return
      const match = typeCorrespondance(expNum, l.numeroCompte)
      const priority = match === 'exact' ? 0 : match === 'sous-compte' ? 1 : match === 'compte-parent' ? 2 : 10
      if (priority < bestPriority) { bestPriority = priority; bestIdx = i }
    })

    const saisie = bestIdx >= 0 ? valid[bestIdx] : null
    if (bestIdx >= 0) usedIdx.add(bestIdx)

    const matchCompte = saisie ? typeCorrespondance(expNum, saisie.numeroCompte) : 'incorrect'
    const compteOk = matchCompte !== 'incorrect'

    const saisieDebit  = saisie ? (parseFloat(saisie.debit) || 0) : 0
    const saisieCredit = saisie ? (parseFloat(saisie.credit) || 0) : 0
    const saisieSens   = saisieDebit > 0 ? 'D' : saisieCredit > 0 ? 'C' : ''
    const saisieMontant = Math.max(saisieDebit, saisieCredit)

    const matchSens    = compteOk && saisieSens === expSens
    const matchMontant = compteOk && Math.abs(saisieMontant - expMontant) < 0.01 * Math.max(expMontant, 1)

    const pCompte  = compteOk ? 1 : 0
    const pSens    = matchSens ? 1 : 0
    const pMontant = matchMontant ? 1 : 0
    totalPoints += pCompte * bareme.compte + pSens * bareme.sens + pMontant * bareme.montant

    let msgCompte = ''
    if (matchCompte === 'exact') {
      msgCompte = `Compte ${expNum} ✓`
      bilanPoints.push(`Compte ${expNum} correctement identifié`)
    } else if (matchCompte === 'sous-compte') {
      msgCompte = `Vous avez utilisé le sous-compte ${saisie!.numeroCompte} (sous-compte de ${expNum}). Réponse acceptée.`
      bilanPoints.push(`Compte ${saisie!.numeroCompte} accepté (sous-compte de ${expNum})`)
    } else if (matchCompte === 'compte-parent') {
      msgCompte = `Vous avez utilisé ${saisie!.numeroCompte}, compte parent de ${expNum}. Réponse acceptée : pensez à utiliser le compte plus précis.`
      bilanPoints.push(`Compte ${saisie!.numeroCompte} accepté (compte parent de ${expNum})`)
    } else {
      const attenduIntitule = getCompteByNumero(expNum)?.intitule || expNum
      msgCompte = saisie
        ? `Compte incorrect : vous avez saisi ${saisie.numeroCompte}, attendu ${expNum} (${attenduIntitule})`
        : `Compte manquant : ${expNum} (${attenduIntitule}) n'a pas été enregistré`
      bilanErreurs.push(msgCompte)
      const conseil = `Le compte ${expNum} appartient à la classe ${expNum[0]} du plan SYSCOHADA. Révisez les comptes de cette classe.`
      if (!conseilsSet.has(expNum[0])) { conseilsSet.add(expNum[0]); conseilsRevision.push(conseil) }
    }

    let msgSens = ''
    if (!compteOk) {
      msgSens = ''
    } else if (matchSens) {
      msgSens = `Sens ${expSens === 'D' ? 'Débit' : 'Crédit'} correct ✓`
    } else {
      const attenduLabel = expSens === 'D' ? 'Débit' : 'Crédit'
      const saisieLabel  = saisieSens === 'D' ? 'Débit' : saisieSens === 'C' ? 'Crédit' : 'non renseigné'
      msgSens = `Sens incorrect : vous avez mis en ${saisieLabel}, le compte ${expNum} doit être en ${attenduLabel}.`
      bilanErreurs.push(`Sens du compte ${expNum} : ${saisieLabel} au lieu de ${attenduLabel}`)
      const conseilKey = `sens_${expNum[0]}`
      if (!conseilsSet.has(conseilKey)) {
        conseilsSet.add(conseilKey)
        conseilsRevision.push(`Révisez les règles de débit/crédit pour les comptes de classe ${expNum[0]} (${expSens === 'D' ? 'actif/charge → Débit' : 'passif/produit → Crédit'}).`)
      }
    }

    let msgMontant = ''
    if (!compteOk) {
      msgMontant = ''
    } else if (matchMontant) {
      msgMontant = `Montant ${formatMontant(expMontant)} correct ✓`
    } else {
      msgMontant = `Montant incorrect : vous avez saisi ${formatMontant(saisieMontant)}, attendu ${formatMontant(expMontant)}.`
      bilanErreurs.push(`Montant du compte ${expNum} : ${formatMontant(saisieMontant)} au lieu de ${formatMontant(expMontant)}`)
      if (!conseilsSet.has('montant')) {
        conseilsSet.add('montant')
        conseilsRevision.push('Vérifiez les montants à partir du contexte/énoncé de l\'exercice.')
      }
    }

    let conseil = ''
    if (matchCompte === 'incorrect') {
      conseil = `Révisez la classification des comptes de classe ${expNum[0]} du plan SYSCOHADA.`
    } else if (!matchSens) {
      conseil = `En SYSCOHADA : les actifs et charges s'enregistrent au Débit ; les passifs et produits au Crédit.`
    } else if (!matchMontant) {
      conseil = `Relisez l'énoncé pour déterminer le montant exact de l'opération.`
    } else if (matchCompte === 'sous-compte') {
      conseil = `Votre sous-compte est accepté. En SYSCOHADA, les subdivisions font partie de la comptabilité générale lorsqu'elles sont prévues par le plan comptable.`
    } else if (matchCompte === 'compte-parent') {
      conseil = `Vous avez utilisé un compte parent (${saisie!.numeroCompte}). En pratique, préférez le sous-compte plus précis (${expNum}).`
    }

    resultats.push({
      attendu: { numeroCompte: expNum, intitule: getCompteByNumero(expNum)?.intitule || '', sens: expSens, montant: expMontant },
      saisi: saisie || emptyLigne(),
      matchCompte, matchSens, matchMontant,
      pointsCompte: pCompte, pointsSens: pSens, pointsMontant: pMontant,
      messageCompte: msgCompte, messageSens: msgSens, messageMontant: msgMontant,
      conseil,
    })
  }

  let scoreEquilibre = 0
  if (balanced) {
    scoreEquilibre = bareme.equilibre
    bilanPoints.push('Écriture équilibrée (Débit = Crédit) ✓')
  } else {
    bilanErreurs.push(`Écriture déséquilibrée : Débit ${formatMontant(totalD)} ≠ Crédit ${formatMontant(totalC)}`)
    if (!conseilsSet.has('equilibre')) {
      conseilsSet.add('equilibre')
      conseilsRevision.push('Principe de la partie double : chaque opération doit avoir un montant égal au Débit et au Crédit.')
    }
  }

  const score = Math.min(100, Math.round((totalPoints / maxPoints) * (100 - bareme.equilibre) + scoreEquilibre))
  return { score, resultats, balanced, bilanPoints, bilanErreurs, conseilsRevision }
}

// ─── Autocomplete comptes ─────────────────────────────────────────────────────
function CompteAutocomplete({ value, onChange, placeholder, className }: {
  value: string; onChange: (num: string, intitule: string) => void
  placeholder?: string; className?: string
}) {
  const allComptes = getComptes()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const suggestions = value.length >= 2
    ? allComptes.filter(c => c.numero.startsWith(value)).slice(0, 8)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <Input
        value={value}
        onChange={e => { onChange(e.target.value, ''); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder || 'N° compte'}
        className={cn('font-mono text-sm', className)}
      />
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 left-0 top-full mt-1 w-72 bg-popover border border-border rounded-md shadow-lg max-h-52 overflow-y-auto">
          {suggestions.map(c => (
            <button
              key={c.numero}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex gap-2"
              onMouseDown={e => { e.preventDefault(); onChange(c.numero, c.intitule); setOpen(false) }}
            >
              <span className="font-mono text-primary w-14 shrink-0">{c.numero}</span>
              <span className="text-muted-foreground truncate">{c.intitule}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Formateur durée ──────────────────────────────────────────────────────────
function formatDuree(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function ExerciceDetailPage() {
  const { toast } = useToast()
  const [, navigate] = useHashLocation()
  const params = useParams()
  const exerciceId = params.id || ''
  const user = useUser()

  const { exercices } = useExercices()
  const { tentatives } = useTentatives(user?.id, exerciceId)
  const exercice = exercices.find(e => e.id === exerciceId)
  const bestScore = tentatives.length > 0 ? Math.max(...tentatives.map(t => t.score)) : null

  // Statistiques de classe (prof/admin) : toutes les tentatives de tous les
  // étudiants sur cet exercice, `enabled` pour ne jamais tirer cette requête
  // large côté étudiant (firestore.rules la refuserait de toute façon).
  const isStaff = isStaffRole(user)
  const { tentatives: tentativesClasse } = useTentatives(undefined, exerciceId, isStaff)

  // ── State de base ──
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [libelle, setLibelle] = useState('')
  const [lignes, setLignes] = useState<LigneSaisie[]>([emptyLigne(), emptyLigne()])
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReturnType<typeof corrigerExercice> | null>(null)
  const [showCorrige, setShowCorrige] = useState(false)

  // ── Mode Entraînement ──
  const [modeEntrainement, setModeEntrainement] = useState(false)

  // ── Chronométrage ──
  const startTimeRef = useRef<number>(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Démarrer le chrono dès le montage
  useEffect(() => {
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  // Stopper le chrono quand le résultat est affiché
  useEffect(() => {
    if (result && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [result])

  // ── Auto-save brouillon ──
  const DRAFT_KEY = `campus_exercice_draft_${exerciceId}`

  const saveDraft = useCallback((ls: LigneSaisie[], d: string, lib: string) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ lignes: ls, date: d, libelle: lib, savedAt: Date.now() }))
    } catch {}
  }, [DRAFT_KEY])

  // Restaurer brouillon au montage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw)
        if (draft.lignes && draft.lignes.length >= 2) {
          setLignes(draft.lignes)
          if (draft.date) setDate(draft.date)
          if (draft.libelle) setLibelle(draft.libelle)
          toast({ title: 'Brouillon restauré', description: 'Vos réponses précédentes ont été rechargées.' })
        }
      }
    } catch {}
  }, []) // eslint-disable-line

  // Auto-save à chaque modification
  useEffect(() => {
    if (!result) saveDraft(lignes, date, libelle)
  }, [lignes, date, libelle, result, saveDraft])

  if (!exercice) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Exercice introuvable.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/exercices')}>Retour</Button>
      </div>
    )
  }

  const solution: any[] = (exercice as any).solution || []
  const difficulte = (exercice as any).difficulte
  const categorie  = (exercice as any).categorie
  const contexte   = (exercice as any).contexte || exercice.instructions
  const questions: string[] = (exercice as any).questions || []
  const explicationCorrige = (exercice as any).explicationCorrige || ''
  const bareme = exercice.bareme || BAREME_DEFAUT

  // Statistiques de classe : sur quelles lignes de la solution la classe
  // trébuche le plus, pour que l'enseignant sache quoi reprendre en cours -
  // plutôt qu'une simple moyenne qui ne dit rien du "où".
  const statsClasse = (() => {
    if (!isStaff || tentativesClasse.length === 0) return null
    const nbEtudiants = new Set(tentativesClasse.map(t => t.userId)).size
    const moyenne = tentativesClasse.reduce((s, t) => s + t.score, 0) / tentativesClasse.length
    const parLigne = solution.map((_, i) => {
      let vues = 0, correctes = 0
      for (const t of tentativesClasse) {
        const r = (t.corrections || [])[i]
        if (!r) continue
        vues++
        if (r.matchCompte === 'exact' && r.matchSens && r.matchMontant) correctes++
      }
      return { vues, correctes, taux: vues > 0 ? Math.round((correctes / vues) * 100) : null }
    })
    return { nbEtudiants, nbTentatives: tentativesClasse.length, moyenne: Math.round(moyenne), parLigne }
  })()

  const updateLigne = (id: string, field: keyof LigneSaisie, value: string) => {
    setLignes(prev => prev.map(l => {
      if (l.id !== id) return l
      const updated = { ...l, [field]: value }
      if (field === 'numeroCompte') {
        const compte = getCompteByNumero(value)
        updated.intituleCompte = compte ? compte.intitule : ''
      }
      return updated
    }))
  }

  const updateCompteAutocomplete = (id: string, num: string, intitule: string) => {
    setLignes(prev => prev.map(l => l.id === id ? { ...l, numeroCompte: num, intituleCompte: intitule || (getCompteByNumero(num)?.intitule || l.intituleCompte) } : l))
  }

  const addLigne = () => setLignes(prev => [...prev, emptyLigne()])
  const removeLigne = (id: string) => { if (lignes.length > 2) setLignes(prev => prev.filter(l => l.id !== id)) }

  const handleSubmit = () => {
    setError('')
    const valid = lignes.filter(l => l.numeroCompte.trim())

    // 1. Minimum 2 lignes
    if (valid.length < 2) { setError('Au moins 2 comptes sont requis.'); return }

    // 2. Pas de doublon de compte
    const nums = valid.map(l => l.numeroCompte.trim())
    if (new Set(nums).size !== nums.length) {
      setError('Le même compte ne peut pas apparaître plusieurs fois.')
      return
    }

    // 3. Pas de débit ET crédit sur la même ligne
    const mixedLine = valid.find(l => (parseFloat(l.debit) > 0) && (parseFloat(l.credit) > 0))
    if (mixedLine) {
      setError(`Le compte ${mixedLine.numeroCompte} ne peut pas avoir à la fois un débit et un crédit sur la même ligne.`)
      return
    }

    // 4. Calculer durée
    const duree = Math.floor((Date.now() - startTimeRef.current) / 1000)

    // 5. Trier : débits d'abord, ensuite crédits
    const sorted = [
      ...valid.filter(l => parseFloat(l.debit) > 0),
      ...valid.filter(l => parseFloat(l.credit) > 0),
    ]

    const res = corrigerExercice(sorted, solution, bareme)

    // 6. Sauvegarder tentative (sauf en mode Entraînement)
    if (!modeEntrainement) {
      saveTentativeAsync({
        exerciceId: exercice.id,
        userId: user?.id || '',
        ecritures: sorted,
        score: res.score,
        corrections: res.resultats,
        duree,
        modeEntrainement: false,
        // Isolation par promotion et cours
        promotionId: (user as any)?.classe || undefined,
        coursId: exercice.coursId || undefined,
      }).catch(console.error)
      // Supprimer brouillon après soumission réelle
      try { localStorage.removeItem(DRAFT_KEY) } catch {}
    }

    setResult(res)
    if (modeEntrainement) {
      setShowCorrige(true)
    }
    toast({ title: modeEntrainement ? `Entraînement : Score : ${res.score}/100` : `Score : ${res.score}/100` })
  }

  const handleRecommencer = () => {
    setResult(null)
    setShowCorrige(false)
    setLignes([emptyLigne(), emptyLigne()])
    setLibelle('')
    setDate(new Date().toISOString().split('T')[0])
    // Relancer chrono
    startTimeRef.current = Date.now()
    setElapsed(0)
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }

  // Reprendre seulement les lignes fausses : les lignes déjà correctes
  // (compte, sens et montant tous exacts) sont reconduites telles quelles,
  // les autres reviennent vierges. L'étudiant n'a donc à corriger que ce
  // qu'il a raté, au lieu de tout ressaisir depuis zéro.
  const handleReessayerErreurs = () => {
    if (!result) return
    const nouvellesLignes = result.resultats.map(r =>
      (r.matchCompte === 'exact' && r.matchSens && r.matchMontant) ? r.saisi : emptyLigne()
    )
    while (nouvellesLignes.length < 2) nouvellesLignes.push(emptyLigne())
    setLignes(nouvellesLignes)
    setResult(null)
    setShowCorrige(false)
    startTimeRef.current = Date.now()
    setElapsed(0)
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)
  }

  const nbLignesIncorrectes = result?.resultats.filter(r => !(r.matchCompte === 'exact' && r.matchSens && r.matchMontant)).length || 0

  return (
    <div className="space-y-4 animate-fadeIn max-w-3xl">

      {/* En-tête */}
      <BackButton />
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-display font-bold text-foreground">{exercice.titre}</h1>
            {difficulte && (
              <Badge variant="outline" className={cn('text-xs',
                difficulte === 'Facile' ? 'border-green-400 text-green-600' :
                difficulte === 'Moyen'  ? 'border-yellow-400 text-yellow-600' :
                'border-red-400 text-red-600'
              )}>{difficulte}</Badge>
            )}
            {categorie && <Badge variant="secondary" className="text-xs">{categorie}</Badge>}
          </div>
          {bestScore !== null && (
            <p className="text-sm text-muted-foreground">Meilleur score : <strong className="text-primary">{bestScore}/100</strong></p>
          )}
        </div>

        {/* Mode Entraînement toggle */}
        <Button
          variant={modeEntrainement ? 'default' : 'outline'}
          size="sm"
          onClick={() => setModeEntrainement(v => !v)}
          className="shrink-0"
          title="En mode Entraînement, la tentative n'est pas comptabilisée et le corrigé est accessible librement."
        >
          <Dumbbell className="h-3.5 w-3.5 mr-1.5" />
          {modeEntrainement ? 'Entraînement ON' : 'Entraînement'}
        </Button>
      </div>

      {/* Statistiques de classe (prof/admin uniquement) */}
      {isStaff && statsClasse && (
        <Card className="border-border bg-muted/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1.5">Statistiques de la classe</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <span>{statsClasse.nbEtudiants} étudiant{statsClasse.nbEtudiants > 1 ? 's' : ''}</span>
              <span>{statsClasse.nbTentatives} tentative{statsClasse.nbTentatives > 1 ? 's' : ''}</span>
              <span>Moyenne : <strong className="text-primary">{statsClasse.moyenne}/100</strong></span>
            </div>
            {statsClasse.parLigne.some(l => l.vues > 0) && (
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Taux de réussite par ligne attendue</p>
                {statsClasse.parLigne.map((l, i) => l.vues === 0 ? null : (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-20 shrink-0 text-muted-foreground">Ligne {i + 1}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', (l.taux || 0) >= 70 ? 'bg-green-500' : (l.taux || 0) >= 40 ? 'bg-yellow-500' : 'bg-red-500')}
                        style={{ width: `${l.taux}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-medium">{l.taux}%</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Chrono (affiché seulement avant soumission) */}
      {!result && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Timer className="h-4 w-4 text-primary" />
          <span className="font-mono">{formatDuree(elapsed)}</span>
          {modeEntrainement && (
            <Badge variant="secondary" className="text-xs ml-2">Mode Entraînement : score non comptabilisé</Badge>
          )}
        </div>
      )}

      {/* Description */}
      {exercice.description && (
        <Card className="border-border">
          <CardContent className="pt-3 pb-3">
            <p className="text-sm text-muted-foreground">{exercice.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Contexte / Énoncé */}
      {contexte && (
        <Card className="border-border bg-muted/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Contexte / Énoncé</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm whitespace-pre-wrap">{contexte}</p>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      {questions.filter(q => q.trim()).length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Questions</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-1">
            {questions.filter(q => q.trim()).map((q, i) => (
              <p key={i} className="text-sm"><span className="font-semibold text-primary">{i + 1}.</span> {q}</p>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ══ RÉSULTAT ══ */}
      {result ? (
        <div className="space-y-4">

          {/* Score + durée */}
          <Card className={cn('border-2', result.score >= 80 ? 'border-green-500' : result.score >= 50 ? 'border-yellow-500' : 'border-red-500')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                {result.score >= 80
                  ? <CheckCircle className="h-5 w-5 text-green-500" />
                  : result.score >= 50
                  ? <AlertCircle className="h-5 w-5 text-yellow-500" />
                  : <XCircle className="h-5 w-5 text-red-500" />
                }
                Score : {result.score}/100
                {modeEntrainement && <Badge variant="secondary" className="text-xs ml-2">Entraînement</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={result.score} className="mb-2" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {result.score === 100 ? 'Parfait ! Toutes les écritures sont correctes.' :
                   result.score >= 80 ? 'Très bien ! Quelques petits ajustements à apporter.' :
                   result.score >= 50 ? 'Assez bien. Révisez les points signalés ci-dessous.' :
                   'Des erreurs importantes ont été détectées. Consultez le bilan pédagogique.'}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  <span className="font-mono">{formatDuree(elapsed)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparaison ligne par ligne */}
          {result.resultats.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Comparaison détaillée</CardTitle></CardHeader>
              <CardContent className="pt-0 space-y-4">
                {result.resultats.map((r, i) => (
                  <div key={i} className="border border-border rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Ligne {i + 1}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-muted/30 rounded p-2">
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Solution attendue</p>
                        <p className="font-mono font-semibold text-primary">{r.attendu?.numeroCompte}</p>
                        <p className="text-xs text-muted-foreground">{r.attendu?.intitule}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className={cn('text-xs', r.attendu?.sens === 'D' ? 'border-blue-400 text-blue-600' : 'border-green-400 text-green-600')}>
                            {r.attendu?.sens === 'D' ? 'Débit' : 'Crédit'}
                          </Badge>
                          <span className="text-xs">{formatMontant(r.attendu?.montant || 0)}</span>
                        </div>
                      </div>
                      <div className={cn('rounded p-2', r.matchCompte === 'incorrect' ? 'bg-red-50' : 'bg-green-50')}>
                        <p className="text-xs text-muted-foreground mb-1 font-medium">Votre réponse</p>
                        <p className={cn('font-mono font-semibold', r.matchCompte === 'incorrect' ? 'text-red-600' : 'text-green-600')}>{r.saisi.numeroCompte || '-'}</p>
                        <p className="text-xs text-muted-foreground">{r.saisi.intituleCompte || '-'}</p>
                        <div className="flex gap-2 mt-1">
                          {(parseFloat(r.saisi.debit) > 0 || parseFloat(r.saisi.credit) > 0) && (
                            <Badge variant="outline" className={cn('text-xs',
                              parseFloat(r.saisi.debit) > 0 ? (r.matchSens ? 'border-blue-400 text-blue-600' : 'border-red-400 text-red-600') :
                              (r.matchSens ? 'border-green-400 text-green-600' : 'border-red-400 text-red-600')
                            )}>
                              {parseFloat(r.saisi.debit) > 0 ? 'Débit' : 'Crédit'}
                              {r.matchSens ? ' ✓' : ' ✗'}
                            </Badge>
                          )}
                          <span className={cn('text-xs', r.matchMontant ? '' : 'text-red-600')}>
                            {formatMontant(Math.max(parseFloat(r.saisi.debit) || 0, parseFloat(r.saisi.credit) || 0))}
                            {r.matchMontant ? '' : ' ✗'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      {r.messageCompte && (
                        <p className={cn('flex items-start gap-1.5', r.matchCompte === 'incorrect' ? 'text-red-600' : 'text-green-700')}>
                          {r.matchCompte === 'incorrect' ? <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> : <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                          {r.messageCompte}
                        </p>
                      )}
                      {r.messageSens && (
                        <p className={cn('flex items-start gap-1.5', r.matchSens ? 'text-green-700' : 'text-red-600')}>
                          {r.matchSens ? <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> : <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                          {r.messageSens}
                        </p>
                      )}
                      {r.messageMontant && (
                        <p className={cn('flex items-start gap-1.5', r.matchMontant ? 'text-green-700' : 'text-red-600')}>
                          {r.matchMontant ? <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> : <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />}
                          {r.messageMontant}
                        </p>
                      )}
                      {r.conseil && (
                        <p className="flex items-start gap-1.5 text-muted-foreground bg-muted/30 rounded px-2 py-1">
                          <BookOpen className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                          {r.conseil}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className={cn('flex items-center gap-2 text-sm px-3 py-2 rounded-lg',
                  result.balanced ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                )}>
                  {result.balanced ? <CheckCircle className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
                  {result.balanced ? 'Écriture équilibrée (Débit = Crédit) ✓' : 'Écriture déséquilibrée ✗'}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bilan pédagogique */}
          <Card className="border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Bilan pédagogique</CardTitle></CardHeader>
            <CardContent className="pt-0 space-y-3">
              {result.bilanPoints.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-green-600 mb-1">Points réussis ✅</p>
                  {result.bilanPoints.map((p, i) => <p key={i} className="text-xs text-green-700 flex items-start gap-1.5"><CheckCircle className="h-3 w-3 shrink-0 mt-0.5" />{p}</p>)}
                </div>
              )}
              {result.bilanErreurs.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-1">Erreurs à corriger ❌</p>
                  {result.bilanErreurs.map((e, i) => <p key={i} className="text-xs text-red-600 flex items-start gap-1.5"><XCircle className="h-3 w-3 shrink-0 mt-0.5" />{e}</p>)}
                </div>
              )}
              {result.conseilsRevision.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-primary mb-1">Conseils de révision 📚</p>
                  {result.conseilsRevision.map((c, i) => <p key={i} className="text-xs text-muted-foreground flex items-start gap-1.5"><BookOpen className="h-3 w-3 shrink-0 mt-0.5 text-primary" />{c}</p>)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Corrigé */}
          {solution.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Corrigé officiel</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setShowCorrige(v => !v)}>
                    {showCorrige ? 'Masquer' : 'Afficher le corrigé'}
                  </Button>
                </div>
              </CardHeader>
              {showCorrige && (
                <CardContent className="pt-0 space-y-2">
                  <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left py-1 px-2">N° Compte</th>
                        <th className="text-left py-1 px-2">Intitulé</th>
                        <th className="text-center py-1 px-2">Sens</th>
                        <th className="text-right py-1 px-2">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Débits d'abord, ensuite crédits */}
                      {[...solution.filter((l: any) => l.sens === 'D'), ...solution.filter((l: any) => l.sens !== 'D')].map((l: any, i: number) => (
                        <tr key={i} className="border-b border-border/30">
                          <td className="py-1.5 px-2 font-mono text-primary">{l.numeroCompte}</td>
                          <td className="py-1.5 px-2 text-muted-foreground">{l.intitule || getCompteByNumero(l.numeroCompte)?.intitule || ''}</td>
                          <td className="py-1.5 px-2 text-center">
                            <Badge variant="outline" className={cn('text-xs', l.sens === 'D' ? 'border-blue-400 text-blue-600' : 'border-green-400 text-green-600')}>
                              {l.sens === 'D' ? 'Débit' : 'Crédit'}
                            </Badge>
                          </td>
                          <td className="py-1.5 px-2 text-right">{formatMontant(parseFloat(l.montant) || 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  {explicationCorrige && (
                    <div className="bg-muted/30 rounded p-3 mt-2">
                      <p className="text-xs font-semibold mb-1">Explication</p>
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">{explicationCorrige}</p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {nbLignesIncorrectes > 0 && nbLignesIncorrectes < result.resultats.length && (
              <Button onClick={handleReessayerErreurs} className="flex-1">
                Réessayer les {nbLignesIncorrectes} ligne{nbLignesIncorrectes > 1 ? 's' : ''} fausse{nbLignesIncorrectes > 1 ? 's' : ''}
              </Button>
            )}
            <Button variant="outline" onClick={handleRecommencer} className="flex-1">
              Recommencer
            </Button>
            <Button variant="outline" onClick={() => navigate('/exercices')}>
              Retour aux exercices
            </Button>
          </div>
        </div>

      ) : (

        /* ══ FORMULAIRE RÉPONSE ══ */
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Votre réponse</CardTitle>
              <div className="flex items-center gap-2">
                {/* Indicateur auto-save */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Save className="h-3 w-3" />
                  <span>Sauvegarde auto</span>
                </div>
                {solution.length > 0 && !modeEntrainement && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Corrigé après soumission
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Libellé</p>
                <Input value={libelle} onChange={e => setLibelle(e.target.value)} placeholder="Description de l'opération" />
              </div>
            </div>

            {/* Règles de saisie */}
            <div className="text-xs text-muted-foreground bg-muted/20 rounded px-3 py-2 mb-3 space-y-0.5">
              <p>• Commencez toujours par les comptes au <strong>Débit</strong>, ensuite les comptes au <strong>Crédit</strong></p>
              <p>• Chaque compte ne peut apparaître qu'une seule fois</p>
              <p>• Un compte ne peut pas avoir à la fois un débit et un crédit</p>
            </div>

            <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm mb-2">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left py-1 px-1">N° Compte / Intitulé</th>
                  <th className="text-right py-1 px-1 w-24">Débit</th>
                  <th className="text-right py-1 px-1 w-24">Crédit</th>
                  <th className="w-7"></th>
                </tr>
              </thead>
              <tbody>
                {lignes.map(l => (
                  <tr key={l.id} className="border-b border-border/30">
                    <td className="py-1 px-1">
                      <div className="flex gap-1">
                        <CompteAutocomplete
                          value={l.numeroCompte}
                          onChange={(num, intitule) => updateCompteAutocomplete(l.id, num, intitule)}
                          placeholder="N°"
                          className="w-20"
                        />
                        <Input
                          className="flex-1 text-xs"
                          placeholder="Intitulé"
                          value={l.intituleCompte}
                          onChange={e => updateLigne(l.id, 'intituleCompte', e.target.value)}
                        />
                      </div>
                    </td>
                    <td className="py-1 px-1">
                      <Input type="number" className="text-right text-xs" placeholder="0" value={l.debit} onChange={e => updateLigne(l.id, 'debit', e.target.value)} min="0" />
                    </td>
                    <td className="py-1 px-1">
                      <Input type="number" className="text-right text-xs" placeholder="0" value={l.credit} onChange={e => updateLigne(l.id, 'credit', e.target.value)} min="0" />
                    </td>
                    <td className="py-1 px-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeLigne(l.id)} aria-label="Supprimer cette ligne">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <Button variant="outline" size="sm" onClick={addLigne} className="mb-4">
              <Plus className="h-3 w-3 mr-1" /> Ajouter une ligne
            </Button>

            {error && <p className="text-sm text-destructive mb-3 flex items-center gap-1.5"><AlertCircle className="h-4 w-4 shrink-0" />{error}</p>}

            <Button onClick={handleSubmit} className={cn('w-full', modeEntrainement && 'bg-amber-500 hover:bg-amber-600 text-white')}>
              {modeEntrainement ? 'Vérifier (Entraînement)' : 'Soumettre ma réponse'}
            </Button>

            {/* Corrigé en mode Entraînement : accessible avant soumission */}
            {modeEntrainement && solution.length > 0 && (
              <div className="mt-3">
                <Button size="sm" variant="outline" className="w-full" onClick={() => setShowCorrige(v => !v)}>
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  {showCorrige ? 'Masquer le corrigé' : 'Voir le corrigé (Entraînement)'}
                </Button>
                {showCorrige && (
                  <div className="mt-2 border border-amber-300 rounded-lg p-3 bg-amber-50">
                    <p className="text-xs font-semibold text-amber-700 mb-2">Corrigé officiel</p>
                    <div className="overflow-x-auto -mx-1">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr className="text-xs text-muted-foreground border-b border-border">
                          <th className="text-left py-1 px-2">N° Compte</th>
                          <th className="text-left py-1 px-2">Intitulé</th>
                          <th className="text-center py-1 px-2">Sens</th>
                          <th className="text-right py-1 px-2">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...solution.filter((l: any) => l.sens === 'D'), ...solution.filter((l: any) => l.sens !== 'D')].map((l: any, i: number) => (
                          <tr key={i} className="border-b border-border/30">
                            <td className="py-1.5 px-2 font-mono text-primary">{l.numeroCompte}</td>
                            <td className="py-1.5 px-2 text-muted-foreground">{l.intitule || getCompteByNumero(l.numeroCompte)?.intitule || ''}</td>
                            <td className="py-1.5 px-2 text-center">
                              <Badge variant="outline" className={cn('text-xs', l.sens === 'D' ? 'border-blue-400 text-blue-600' : 'border-green-400 text-green-600')}>
                                {l.sens === 'D' ? 'Débit' : 'Crédit'}
                              </Badge>
                            </td>
                            <td className="py-1.5 px-2 text-right">{formatMontant(parseFloat(l.montant) || 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Historique tentatives */}
      {tentatives.filter(t => !t.modeEntrainement).length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Mes tentatives</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              {tentatives.filter(t => !t.modeEntrainement).slice().reverse().map((t, i) => {
                const real = tentatives.filter(tt => !tt.modeEntrainement)
                return (
                  <div key={t.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Tentative {real.length - i}</span>
                      {t.duree !== undefined && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Timer className="h-3 w-3" />{formatDuree(t.duree)}
                        </span>
                      )}
                    </div>
                    <Badge variant={t.score >= 80 ? 'default' : t.score >= 50 ? 'secondary' : 'destructive'}>
                      {t.score}/100
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
