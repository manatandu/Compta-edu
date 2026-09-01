import { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, Upload, Check, AlertCircle, ChevronRight
} from 'lucide-react'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import {
  useArticlesStock, useEcrituresStock, marquerExporte, EcritureStock
} from '@/lib/useStock'
import { useSessions } from '@/lib/useFirestore'
import { addEcritureAsync } from '@/lib/db-firebase'
import { generateId } from '@/lib/utils'

// ─── Formatage ────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  return n.toLocaleString('fr-CD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Modal export ─────────────────────────────────────────────────────────────
function ModalExport({
  ecritures, userId, onClose
}: {
  ecritures: EcritureStock[]
  userId: string
  onClose: () => void
}) {
  const { sessions } = useSessions(userId, 'syscohada')
  const [sessionId, setSessionId] = useState('')
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)
  const [erreur, setErreur] = useState('')

  const nonExportes = ecritures.filter(e => !e.exporte)

  const exporter = async () => {
    if (!sessionId) { setErreur('Sélectionnez une session.'); return }
    setExporting(true)
    try {
      for (const ec of nonExportes) {
        const ligneGroupe = generateId()
        // Écriture débit
        await addEcritureAsync({
          sessionId,
          ligneGroupe,
          date: ec.date,
          libelle: ec.libelle,
          numeroPiece: ec.mouvementId,
          numeroCompte: ec.debit,
          intituleCompte: ec.libDebit,
          debit: ec.montant,
          credit: 0,
          userId,
        }, 'syscohada')
        // Écriture crédit
        await addEcritureAsync({
          sessionId,
          ligneGroupe,
          date: ec.date,
          libelle: ec.libelle,
          numeroPiece: ec.mouvementId,
          numeroCompte: ec.credit,
          intituleCompte: ec.libCredit,
          debit: 0,
          credit: ec.montant,
          userId,
        }, 'syscohada')
        // Marquer comme exporté
        await marquerExporte(ec.id)
      }
      setDone(true)
    } catch (e) {
      setErreur("Erreur lors de l'export.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Upload className="h-4 w-4 text-orange-600" />
          </div>
          <h2 className="font-display font-bold text-base text-foreground">Exporter vers le Journal</h2>
        </div>

        {done ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-3">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700 font-semibold">
                {nonExportes.length} écriture(s) exportée(s) avec succès.
              </p>
            </div>
            <button onClick={onClose}
              className="w-full rounded-xl bg-primary hover:bg-primary/90 py-2.5 text-sm font-semibold text-primary-foreground transition-colors">
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="rounded-lg bg-orange-50 border border-orange-200/50 px-3 py-2">
              <p className="text-xs text-orange-700">
                <strong>{nonExportes.length}</strong> écriture(s) non encore exportée(s) seront envoyées dans le Journal général de la session choisie.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Session cible</label>
              <select
                value={sessionId}
                onChange={e => { setSessionId(e.target.value); setErreur('') }}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">-- Choisir une session --</option>
                {sessions.map(s => (
                  <option key={s.id} value={s.id}>{s.nom} : Exercice {s.exercice}</option>
                ))}
              </select>
            </div>

            {erreur && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <p className="text-xs text-red-600">{erreur}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={onClose}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors">
                Annuler
              </button>
              <button onClick={exporter} disabled={exporting || nonExportes.length === 0}
                className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-600 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                {exporting ? 'Export en cours…' : 'Exporter'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Ligne d'écriture ─────────────────────────────────────────────────────────
function LigneEcriture({ ec }: { ec: EcritureStock }) {
  return (
    <div className={cn(
      'rounded-xl border p-3 space-y-2 transition-all',
      ec.exporte
        ? 'border-emerald-200/50 bg-emerald-50/30'
        : 'border-border bg-card'
    )}>
      {/* Date + libellé + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground">{ec.date}</span>
            {ec.exporte && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                <Check className="h-2.5 w-2.5" /> Exporté
              </span>
            )}
          </div>
          <p className="text-xs text-foreground font-medium mt-0.5 truncate">{ec.libelle}</p>
        </div>
        <span className="text-sm font-bold text-foreground shrink-0">{fmt(ec.montant)} CDF</span>
      </div>
      {/* Débit / Crédit */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5">
          <p className="text-xs text-emerald-600 font-semibold">DÉBIT</p>
          <p className="text-xs font-bold text-foreground">{ec.debit}</p>
          <p className="text-xs text-muted-foreground leading-tight">{ec.libDebit}</p>
        </div>
        <div className="rounded-lg bg-orange-50 border border-orange-100 px-2.5 py-1.5">
          <p className="text-xs text-orange-600 font-semibold">CRÉDIT</p>
          <p className="text-xs font-bold text-foreground">{ec.credit}</p>
          <p className="text-xs text-muted-foreground leading-tight">{ec.libCredit}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function StockJournalPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const hash = window.location.hash
  // Supporte /stock/journal et /stock/journal/:articleId
  const articleId = hash.split('/stock/journal/')[1]?.split('?')[0] ?? ''

  const { articles } = useArticlesStock(user?.id)
  const article = articleId ? articles.find(a => a.id === articleId) : null
  const { ecritures, loading } = useEcrituresStock(user?.id, articleId || undefined)

  const [filtre, setFiltre] = useState<'tous' | 'non-exportes' | 'exportes'>('tous')
  const [showExport, setShowExport] = useState(false)

  const ecrituresFiltrees = ecritures.filter(e => {
    if (filtre === 'non-exportes') return !e.exporte
    if (filtre === 'exportes') return e.exporte
    return true
  })

  const nonExportesCount = ecritures.filter(e => !e.exporte).length

  return (
    <div className="space-y-5 pb-4 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3 animate-slideDown">
        {!embedded && (
          <BackButton
            to={articleId ? `/stock/fiche/${articleId}` : '/stock'}
            label={articleId ? 'Fiche de stock' : 'Gestion de Stock'}
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-display font-bold text-foreground">Journal interne : Stock</h1>
          <p className="text-xs text-muted-foreground truncate">
            {article ? `${article.reference} : ${article.designation}` : 'Tous les articles'}
          </p>
        </div>
        {nonExportesCount > 0 && (
          <button onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 px-3 py-2 text-xs font-semibold text-white transition-colors">
            <Upload className="h-3.5 w-3.5" />
            Exporter ({nonExportesCount})
          </button>
        )}
      </div>

      {/* Compteurs */}
      <div className="grid grid-cols-3 gap-3 animate-slideUp" style={{ animationDelay: '60ms' }}>
        <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-lg font-bold text-foreground">{ecritures.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">A exporter</p>
          <p className="text-lg font-bold text-orange-600">{nonExportesCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-3 py-2 text-center">
          <p className="text-xs text-muted-foreground">Exportées</p>
          <p className="text-lg font-bold text-emerald-600">
            {ecritures.filter(e => e.exporte).length}
          </p>
        </div>
      </div>

      {/* Filtre */}
      {ecritures.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-1 flex gap-1 animate-slideUp" style={{ animationDelay: '100ms' }}>
          {([
            { val: 'tous', label: 'Toutes' },
            { val: 'non-exportes', label: 'A exporter' },
            { val: 'exportes', label: 'Exportées' },
          ] as const).map(f => (
            <button key={f.val}
              onClick={() => setFiltre(f.val)}
              className={cn(
                'flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all',
                filtre === f.val
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              )}>
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Chargement…</div>
      ) : ecrituresFiltrees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 py-10 text-center space-y-2">
          <BookOpen className="h-8 w-8 text-muted-foreground/40 mx-auto" />
          <p className="text-sm text-muted-foreground">
            {ecritures.length === 0
              ? 'Aucune écriture générée. Enregistrez des mouvements.'
              : 'Aucune écriture dans ce filtre.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2 animate-slideUp" style={{ animationDelay: '140ms' }}>
          {ecrituresFiltrees.map(ec => (
            <LigneEcriture key={ec.id} ec={ec} />
          ))}
        </div>
      )}

      {/* Lien vers le journal général */}
      <button onClick={() => navigate('/journal')}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/20 hover:bg-primary/5 hover:scale-[1.01] transition-all group">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            Ouvrir le Journal général
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary" />
      </button>

      {/* Modal export */}
      {showExport && user && (
        <ModalExport
          ecritures={ecritures}
          userId={user.id}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}
