import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowDownCircle, ArrowUpCircle, Check, AlertCircle } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import {
  useArticlesStock, useMouvementsStock,
  calculerFicheCUMP, calculerFichePEPS,
  ajouterMouvement, genererEcritures,
  TypeMouvement, MouvementStock
} from '@/lib/useStock'

export default function StockMouvementPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  // Récupérer l'articleId depuis l'URL #/stock/mouvement/:id
  const hash = window.location.hash
  const articleId = hash.split('/stock/mouvement/')[1]?.split('?')[0] ?? ''

  const { articles } = useArticlesStock(user?.id)
  const article = articles.find(a => a.id === articleId)
  const { mouvements } = useMouvementsStock(user?.id, articleId)

  const [type, setType] = useState<'entree' | 'sortie'>('entree')
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    numeroBon: '',
    quantite: '',
    cuSaisi: '',
  })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  const set = (k: string, v: any) => { setForm(f => ({ ...f, [k]: v })); setErreur('') }

  // Calculer le CU de sortie selon la méthode
  const getCuSortie = (): number => {
    if (!article) return 0
    if (article.methode === 'CUMP') {
      const lignes = calculerFicheCUMP(article, mouvements)
      return lignes.length > 0 ? lignes[lignes.length - 1].stockCU : article.cuInitial
    } else {
      const lignes = calculerFichePEPS(article, mouvements)
      return lignes.length > 0 ? lignes[lignes.length - 1].stockCU : article.cuInitial
    }
  }

  // Stock disponible actuel
  const getStockActuel = (): number => {
    if (!article) return 0
    if (article.methode === 'CUMP') {
      const lignes = calculerFicheCUMP(article, mouvements)
      return lignes.length > 0 ? lignes[lignes.length - 1].stockQ : article.qteInitiale
    } else {
      const lignes = calculerFichePEPS(article, mouvements)
      return lignes.length > 0 ? lignes[lignes.length - 1].stockQ : article.qteInitiale
    }
  }

  const stockActuel = getStockActuel()
  const cuSortie = getCuSortie()
  const qte = Number(form.quantite) || 0
  const cuEntree = Number(form.cuSaisi) || 0

  const montantPreview = type === 'entree'
    ? qte * cuEntree
    : qte * cuSortie

  const valider = async () => {
    if (!article || !user) return
    if (!form.numeroBon.trim()) { setErreur('Le numéro de bon est obligatoire.'); return }
    if (!form.quantite || qte <= 0) { setErreur('La quantité doit être supérieure à 0.'); return }
    if (type === 'entree' && cuEntree <= 0) { setErreur('Le coût unitaire est obligatoire pour une entrée.'); return }
    if (type === 'sortie' && qte > stockActuel) {
      setErreur(`Stock insuffisant. Disponible : ${stockActuel} unité(s).`); return
    }

    const libelle = type === 'entree'
      ? `Entrée ${form.numeroBon}`
      : `Sortie ${form.numeroBon}`

    const mvData: Omit<MouvementStock, 'id'> = {
      userId: user.id,
      articleId,
      type,
      date: form.date,
      libelle,
      numeroBon: form.numeroBon.trim(),
      quantite: qte,
      ...(type === 'entree' ? { cuSaisi: cuEntree } : {}),
    }

    const ecritures = genererEcritures(user.id, articleId, article, mvData, cuSortie)

    setSaving(true)
    try {
      await ajouterMouvement(mvData, ecritures)
      setSucces(true)
      setForm({ date: form.date, numeroBon: '', quantite: '', cuSaisi: '' })
      setTimeout(() => setSucces(false), 2500)
    } catch (e) {
      setErreur('Erreur lors de l\'enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50'
  const labelCls = 'block text-xs font-semibold text-muted-foreground mb-1'

  if (!article) {
    return (
      <div className="space-y-4 pb-4">
        <BackButton />
        <div className="text-center py-12 text-muted-foreground text-sm">Article introuvable…</div>
      </div>
    )
  }

  return (
    <div className="space-y-5 pb-4 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3 animate-slideDown" style={{ animationDelay: '0ms' }}>
        <BackButton />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-display font-bold text-foreground truncate">
            {article.reference} : {article.designation}
          </h1>
          <p className="text-xs text-muted-foreground">
            Méthode : {article.methode === 'PEPS' ? 'PEPS / FIFO' : 'CUMP'} : {mouvements.length} mouvement(s) enregistré(s)
          </p>
        </div>
      </div>

      {/* Stock actuel */}
      <div className="grid grid-cols-2 gap-3 animate-slideUp" style={{ animationDelay: '60ms' }}>
        <div className="rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/30">
          <p className="text-xs text-muted-foreground">Stock disponible</p>
          <p className="text-xl font-bold text-foreground">{stockActuel} <span className="text-sm font-normal text-muted-foreground">unités</span></p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/30">
          <p className="text-xs text-muted-foreground">
            {article.methode === 'CUMP' ? 'CUMP actuel' : 'CU moyen PEPS'}
          </p>
          <p className="text-xl font-bold text-foreground">
            {cuSortie.toLocaleString('fr-CD', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}
            <span className="text-sm font-normal text-muted-foreground"> CDF</span>
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4 animate-slideUp" style={{ animationDelay: '120ms' }}>

        {/* Type de mouvement */}
        <div>
          <label className={labelCls}>Type de mouvement</label>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setType('entree')}
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all',
                type === 'entree'
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              )}>
              <ArrowDownCircle className="h-4 w-4" />
              Entrée
            </button>
            <button onClick={() => setType('sortie')}
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all',
                type === 'sortie'
                  ? 'border-orange-400 bg-orange-50 text-orange-700'
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
              )}>
              <ArrowUpCircle className="h-4 w-4" />
              Sortie
            </button>
          </div>
        </div>

        {/* Date + Numéro bon */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Date</label>
            <input type="date" className={inputCls} value={form.date}
              onChange={e => set('date', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>N° de bon</label>
            <input className={inputCls} placeholder="ex : 0705" value={form.numeroBon}
              onChange={e => set('numeroBon', e.target.value)} />
          </div>
        </div>

        {/* Quantité + CU (entrée uniquement) */}
        <div className={cn('grid gap-3', type === 'entree' ? 'grid-cols-2' : 'grid-cols-1')}>
          <div>
            <label className={labelCls}>Quantité</label>
            <input type="number" min="1" className={inputCls} placeholder="0"
              value={form.quantite} onChange={e => set('quantite', e.target.value)} />
          </div>
          {type === 'entree' && (
            <div>
              <label className={labelCls}>Coût unitaire (CDF)</label>
              <input type="number" min="0" step="0.01" className={inputCls} placeholder="0,00"
                value={form.cuSaisi} onChange={e => set('cuSaisi', e.target.value)} />
            </div>
          )}
        </div>

        {/* Pour les sorties : CU calculé automatiquement */}
        {type === 'sortie' && (
          <div className="rounded-lg bg-orange-50 border border-orange-200/50 px-3 py-2">
            <p className="text-xs text-orange-700">
              CU de sortie calculé automatiquement ({article.methode === 'PEPS' ? 'PEPS / FIFO' : 'CUMP'}) :
              <span className="font-bold ml-1">
                {cuSortie.toLocaleString('fr-CD', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} CDF/u
              </span>
            </p>
          </div>
        )}

        {/* Aperçu montant */}
        {qte > 0 && (type === 'sortie' || cuEntree > 0) && (
          <div className="rounded-lg bg-muted/40 px-3 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Montant {type === 'entree' ? 'entrée' : 'sortie'} :
            </span>
            <span className="text-sm font-bold text-foreground">
              {qte} × {(type === 'entree' ? cuEntree : cuSortie).toLocaleString('fr-CD', { minimumFractionDigits: 2, maximumFractionDigits: 3 })} = {montantPreview.toLocaleString('fr-CD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CDF
            </span>
          </div>
        )}

        {/* Erreur */}
        {erreur && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200/50 px-3 py-3">
            <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
            <p className="text-xs text-red-600">{erreur}</p>
          </div>
        )}

        {/* Succès */}
        {succes && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200/50 px-3 py-3">
            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-700">
              Mouvement et écritures enregistrés avec succès.
            </p>
          </div>
        )}

        {/* Bouton */}
        <button onClick={valider} disabled={saving}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50',
            type === 'entree' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-500 hover:bg-orange-600'
          )}>
          <Check className="h-4 w-4" />
          {saving ? 'Enregistrement…' : `Enregistrer la ${type === 'entree' ? 'entrée' : 'sortie'}`}
        </button>
      </div>

      {/* Lien vers la fiche */}
      <button onClick={() => navigate(`/stock/fiche/${articleId}`)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-purple-300/50 hover:bg-purple-50/30 transition-all group">
        <span className="text-sm font-semibold text-foreground group-hover:text-purple-600 transition-colors">
          Voir la fiche de stock calculée
        </span>
        <ArrowUpCircle className="h-4 w-4 text-muted-foreground/40 group-hover:text-purple-500 transition-colors" />
      </button>
    </div>
  )
}
