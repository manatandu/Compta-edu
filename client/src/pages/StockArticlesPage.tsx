import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  Plus, Package, ChevronRight, Trash2, X, Check,
  ArrowLeft, BookOpen, BarChart2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import {
  useArticlesStock, creerArticle, supprimerArticle,
  TypeStock, MethodeEvaluation, libelleCompte, useMouvementsStock
} from '@/lib/useStock'
import { Badge } from '@/components/ui/badge'

// ─── Couleurs par type de compte ─────────────────────────────────────────────
function couleurCompte(type: TypeStock) {
  return type === '31'
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : type === '32'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-orange-50 text-orange-700 border-orange-200'
}

// ─── Formulaire de création ───────────────────────────────────────────────────
function FormulaireArticle({ onClose, userId }: { onClose: () => void; userId: string }) {
  const [form, setForm] = useState({
    reference: '',
    designation: '',
    fournisseur: '',
    typeCompte: '31' as TypeStock,
    methode: 'CUMP' as MethodeEvaluation,
    qteInitiale: '',
    cuInitial: '',
    dateInitiale: new Date().toISOString().split('T')[0],
  })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const valider = async () => {
    if (!form.reference.trim()) { setErreur('La référence est obligatoire.'); return }
    if (!form.designation.trim()) { setErreur('La désignation est obligatoire.'); return }
    if (!form.qteInitiale || isNaN(Number(form.qteInitiale)) || Number(form.qteInitiale) < 0) {
      setErreur('Quantité initiale invalide.'); return
    }
    if (!form.cuInitial || isNaN(Number(form.cuInitial)) || Number(form.cuInitial) <= 0) {
      setErreur('Coût unitaire initial invalide.'); return
    }
    setSaving(true)
    try {
      await creerArticle({
        userId,
        reference: form.reference.trim().toUpperCase(),
        designation: form.designation.trim(),
        fournisseur: form.fournisseur.trim(),
        typeCompte: form.typeCompte,
        methode: form.methode,
        qteInitiale: Number(form.qteInitiale),
        cuInitial: Number(form.cuInitial),
        dateInitiale: form.dateInitiale,
      })
      onClose()
    } catch (e) {
      setErreur('Erreur lors de la sauvegarde.')
      setSaving(false)
    }
  }

  const inputCls = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50'
  const labelCls = 'block text-xs font-semibold text-muted-foreground mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-card rounded-t-2xl sm:rounded-2xl border border-border shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="h-4 w-4 text-purple-600" />
            </div>
            <h2 className="font-display font-bold text-base text-foreground">Nouvel article</h2>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Champs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Référence *</label>
            <input className={inputCls} placeholder="ex : ABX25" value={form.reference}
              onChange={e => set('reference', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Fournisseur</label>
            <input className={inputCls} placeholder="ex : MBIKAYI" value={form.fournisseur}
              onChange={e => set('fournisseur', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Désignation *</label>
          <input className={inputCls} placeholder="ex : Cartouches d'encre couleur" value={form.designation}
            onChange={e => set('designation', e.target.value)} />
        </div>

        {/* Type de compte */}
        <div>
          <label className={labelCls}>Type de stock</label>
          <div className="grid grid-cols-3 gap-3">
            {(['31', '32', '36'] as TypeStock[]).map(t => (
              <button key={t}
                onClick={() => set('typeCompte', t)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-semibold transition-all',
                  form.typeCompte === t
                    ? couleurCompte(t) + ' ring-2 ring-offset-1 ring-purple-400/40'
                    : 'border-border bg-muted/30 text-muted-foreground hover:border-border/80'
                )}
              >
                {t} : {t === '31' ? 'Marchandises' : t === '32' ? 'Mat. Premières' : 'Produits Finis'}
              </button>
            ))}
          </div>
        </div>

        {/* Méthode */}
        <div>
          <label className={labelCls}>Méthode d'évaluation</label>
          <div className="grid grid-cols-2 gap-3">
            {(['CUMP', 'PEPS'] as MethodeEvaluation[]).map(m => (
              <button key={m}
                onClick={() => set('methode', m)}
                className={cn(
                  'rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all text-left',
                  form.methode === m
                    ? 'border-purple-400 bg-purple-50 text-purple-700 ring-2 ring-offset-1 ring-purple-400/30'
                    : 'border-border bg-muted/30 text-muted-foreground hover:border-border/80'
                )}
              >
                <span className="block font-bold">{m}</span>
                <span className="text-xs font-normal">
                  {m === 'CUMP' ? 'Coût Unitaire Moyen Pondéré' : 'Premier entré : Premier sorti (FIFO)'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stock initial */}
        <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock initial</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" className={inputCls} value={form.dateInitiale}
                onChange={e => set('dateInitiale', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Quantité *</label>
              <input type="number" min="0" className={inputCls} placeholder="0"
                value={form.qteInitiale} onChange={e => set('qteInitiale', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Coût unitaire *</label>
              <input type="number" min="0" step="0.01" className={inputCls} placeholder="0,00"
                value={form.cuInitial} onChange={e => set('cuInitial', e.target.value)} />
            </div>
          </div>
          {form.qteInitiale && form.cuInitial && (
            <div className="text-xs text-muted-foreground">
              Valeur initiale : <span className="font-bold text-foreground">
                {(Number(form.qteInitiale) * Number(form.cuInitial)).toLocaleString('fr-CD')} CDF
              </span>
            </div>
          )}
        </div>

        {/* Erreur */}
        {erreur && (
          <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{erreur}</p>
        )}

        {/* Boutons */}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 rounded-xl border border-border bg-muted/30 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/50 transition-colors">
            Annuler
          </button>
          <button onClick={valider} disabled={saving}
            className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 py-2.5 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            <Check className="h-4 w-4" />
            {saving ? 'Enregistrement…' : "Créer l'article"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Carte article ────────────────────────────────────────────────────────────
function CarteArticle({
  article, onVoirFiche, onAjouterMouvement, onSupprimer, userId
}: {
  article: any; onVoirFiche: () => void; onAjouterMouvement: () => void
  onSupprimer: () => void; userId: string
}) {
  const { mouvements } = useMouvementsStock(userId, article.id)
  const nbMouvements = mouvements.length

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 animate-slideUp">
      {/* Ligne 1 : référence + type + méthode */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-foreground">{article.reference}</span>
            <Badge variant="outline" className={cn('text-xs px-1.5 py-0 border', couleurCompte(article.typeCompte))}>
              {article.typeCompte} : {libelleCompte(article.typeCompte)}
            </Badge>
            <Badge variant="outline" className="text-xs px-1.5 py-0 border border-purple-200 text-purple-700 bg-purple-50">
              {article.methode === 'PEPS' ? 'PEPS / FIFO' : 'CUMP'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">{article.designation}</p>
          {article.fournisseur && (
            <p className="text-xs text-muted-foreground/70">Fournisseur : {article.fournisseur}</p>
          )}
        </div>
        <button onClick={onSupprimer}
          className="h-7 w-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors shrink-0">
          <Trash2 className="h-3.5 w-3.5 text-red-400" />
        </button>
      </div>

      {/* Ligne 2 : stock initial + nb mouvements */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-muted/40 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Stock initial</p>
          <p className="text-sm font-bold text-foreground">{article.qteInitiale} u.</p>
          <p className="text-xs text-muted-foreground">{article.cuInitial} CDF/u</p>
        </div>
        <div className="rounded-lg bg-muted/40 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Valeur initiale</p>
          <p className="text-sm font-bold text-foreground">
            {(article.qteInitiale * article.cuInitial).toLocaleString('fr-CD')}
          </p>
          <p className="text-xs text-muted-foreground">CDF</p>
        </div>
        <div className="rounded-lg bg-muted/40 px-2 py-1.5">
          <p className="text-xs text-muted-foreground">Mouvements</p>
          <p className="text-sm font-bold text-foreground">{nbMouvements}</p>
          <p className="text-xs text-muted-foreground">enregistrés</p>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-2">
        <button onClick={onAjouterMouvement}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-muted/30 py-2 text-xs font-semibold text-foreground hover:bg-muted/50 hover:border-primary/20 transition-all">
          <Plus className="h-3.5 w-3.5" />
          Mouvement
        </button>
        <button onClick={onVoirFiche}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 py-2 text-xs font-semibold text-white transition-colors">
          <BarChart2 className="h-3.5 w-3.5" />
          Voir la fiche
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function StockArticlesPage({ embedded = false }: { embedded?: boolean } = {}) {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const { articles, loading } = useArticlesStock(user?.id)
  const [showForm, setShowForm] = useState(false)
  const [confirmSuppr, setConfirmSuppr] = useState<string | null>(null)

  const handleSupprimer = async (id: string) => {
    await supprimerArticle(id)
    setConfirmSuppr(null)
  }

  return (
    <div className="space-y-5 pb-4">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        {!embedded && (
          <button onClick={() => navigate('/stock')}
            className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted/50 transition-colors">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-display font-bold text-foreground">Fiches de stock</h1>
          <p className="text-xs text-muted-foreground">Articles enregistrés : Comptes 31, 32, 36</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-3 py-2 text-xs font-semibold text-white transition-colors">
          <Plus className="h-3.5 w-3.5" />
          Nouvel article
        </button>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Chargement…</div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center space-y-3">
          <Package className="h-10 w-10 text-muted-foreground/40 mx-auto" />
          <p className="text-sm text-muted-foreground">Aucun article créé.</p>
          <button onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition-colors">
            <Plus className="h-4 w-4" />
            Créer le premier article
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map(a => (
            <CarteArticle
              key={a.id}
              article={a}
              userId={user?.id ?? ''}
              onVoirFiche={() => navigate(`/stock/fiche/${a.id}`)}
              onAjouterMouvement={() => navigate(`/stock/mouvement/${a.id}`)}
              onSupprimer={() => setConfirmSuppr(a.id)}
            />
          ))}
        </div>
      )}

      {/* Confirmation suppression */}
      {confirmSuppr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-foreground">Supprimer cet article ?</h3>
            <p className="text-sm text-muted-foreground">
              Tous les mouvements et écritures associés seront également supprimés. Cette action est irréversible.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmSuppr(null)}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors">
                Annuler
              </button>
              <button onClick={() => handleSupprimer(confirmSuppr)}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire */}
      {showForm && user && (
        <FormulaireArticle userId={user.id} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
