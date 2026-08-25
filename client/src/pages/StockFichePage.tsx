import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { ArrowLeft, BookOpen, Check, ChevronRight, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import {
  useArticlesStock, useMouvementsStock,
  calculerFicheCUMP, calculerFichePEPS,
  libelleCompte, LigneFiche
} from '@/lib/useStock'

// ─── Formatage ────────────────────────────────────────────────────────────────
function fmt(n?: number, dec = 2): string {
  if (n === undefined || n === null) return ''
  return n.toLocaleString('fr-CD', { minimumFractionDigits: dec, maximumFractionDigits: dec === 2 ? 3 : dec })
}

// ─── Cellule de tableau ───────────────────────────────────────────────────────
function Td({ children, className, colSpan }: { children?: React.ReactNode; className?: string; colSpan?: number }) {
  return (
    <td colSpan={colSpan} className={cn('border border-border px-2 py-1.5 text-xs text-right', className)}>
      {children}
    </td>
  )
}
function Th({ children, className, colSpan }: { children?: React.ReactNode; className?: string; colSpan?: number }) {
  return (
    <th colSpan={colSpan} className={cn('border border-border px-2 py-1.5 text-xs font-bold text-center bg-muted/60 text-foreground uppercase tracking-wide', className)}>
      {children}
    </th>
  )
}

// ─── Tableau fiche ────────────────────────────────────────────────────────────
function TableauFiche({ lignes, methode }: { lignes: LigneFiche[]; methode: 'CUMP' | 'PEPS' }) {
  // Calcul totaux
  const totalEntreeQ = lignes.slice(1).reduce((s, l) => s + (l.entreeQ ?? 0), 0)
  const totalEntreeMontant = lignes.slice(1).reduce((s, l) => s + (l.entreeMontant ?? 0), 0)
  const totalSortieQ = lignes.slice(1).reduce((s, l) => s + (l.sortieQ ?? 0), 0)
  const totalSortieMontant = lignes.slice(1).reduce((s, l) => s + (l.sortieMontant ?? 0), 0)
  const derniereLigne = lignes[lignes.length - 1]

  // Vérification SI + Entrées − Sorties = SF
  const siQ = lignes[0]?.stockQ ?? 0
  const siMontant = lignes[0]?.stockMontant ?? 0
  const sfQ = derniereLigne?.stockQ ?? 0
  const sfMontant = derniereLigne?.stockMontant ?? 0
  const checkQ = Math.abs((siQ + totalEntreeQ - totalSortieQ) - sfQ) < 0.001
  const checkM = Math.abs((siMontant + totalEntreeMontant - totalSortieMontant) - sfMontant) < 1

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr>
              <Th className="w-16 text-left">Date</Th>
              <Th className="text-left min-w-[120px]">Libellé</Th>
              <Th colSpan={3} className="bg-emerald-50 text-emerald-800">ENTRÉE</Th>
              <Th colSpan={3} className="bg-orange-50 text-orange-800">SORTIE</Th>
              <Th colSpan={3} className="bg-blue-50 text-blue-800">STOCK</Th>
            </tr>
            <tr>
              <Th />
              <Th />
              <Th className="bg-emerald-50/60 text-emerald-700 w-10">Q</Th>
              <Th className="bg-emerald-50/60 text-emerald-700 w-16">CU</Th>
              <Th className="bg-emerald-50/60 text-emerald-700 w-20">Montant</Th>
              <Th className="bg-orange-50/60 text-orange-700 w-10">Q</Th>
              <Th className="bg-orange-50/60 text-orange-700 w-16">CU</Th>
              <Th className="bg-orange-50/60 text-orange-700 w-20">Montant</Th>
              <Th className="bg-blue-50/60 text-blue-700 w-10">Q</Th>
              <Th className="bg-blue-50/60 text-blue-700 w-16">CU</Th>
              <Th className="bg-blue-50/60 text-blue-700 w-20">Montant</Th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l, i) => {
              const isInitial = i === 0
              const isDerniere = i === lignes.length - 1
              return (
                <tr key={i} className={cn(
                  isInitial ? 'bg-muted/30 font-semibold' : 'hover:bg-muted/10 transition-colors',
                  isDerniere && !isInitial ? 'border-t-2 border-t-primary/20' : ''
                )}>
                  <Td className="text-left font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {l.date}
                  </Td>
                  <Td className="text-left text-foreground">
                    {l.libelle}
                    {l.numeroBon ? <span className="text-muted-foreground ml-1 text-xs">n° {l.numeroBon}</span> : null}
                  </Td>
                  {/* Entrée */}
                  <Td className="text-emerald-700">{l.entreeQ ?? ''}</Td>
                  <Td className="text-emerald-700">{l.entreeCU !== undefined ? fmt(l.entreeCU, 3) : ''}</Td>
                  <Td className="text-emerald-700">{l.entreeMontant !== undefined ? fmt(l.entreeMontant) : ''}</Td>
                  {/* Sortie */}
                  <Td className="text-orange-700">{l.sortieQ ?? ''}</Td>
                  <Td className="text-orange-700">{l.sortieCU !== undefined ? fmt(l.sortieCU, 3) : ''}</Td>
                  <Td className="text-orange-700">{l.sortieMontant !== undefined ? fmt(l.sortieMontant) : ''}</Td>
                  {/* Stock */}
                  <Td className="font-semibold text-blue-700">{l.stockQ}</Td>
                  <Td className="text-blue-700">{fmt(l.stockCU, 3)}</Td>
                  <Td className="font-semibold text-blue-700">{fmt(l.stockMontant)}</Td>
                </tr>
              )
            })}
            {/* Ligne TOTAUX */}
            {lignes.length > 1 && (
              <tr className="bg-muted/50 font-bold border-t-2 border-t-border">
                <Td colSpan={2} className="text-left text-foreground text-xs font-bold">TOTAUX</Td>
                <Td className="text-emerald-700">{totalEntreeQ}</Td>
                <Td />
                <Td className="text-emerald-700">{fmt(totalEntreeMontant)}</Td>
                <Td className="text-orange-700">{totalSortieQ}</Td>
                <Td />
                <Td className="text-orange-700">{fmt(totalSortieMontant)}</Td>
                <Td className="text-blue-700">{sfQ}</Td>
                <Td />
                <Td className="text-blue-700">{fmt(sfMontant)}</Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vérification */}
      {lignes.length > 1 && (
        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Vérification</p>
          <p className="text-xs text-muted-foreground font-mono">
            S.I + Entrées − Sorties = Stock Final
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className={cn(
              'rounded-lg px-3 py-3 flex items-center gap-2',
              checkQ ? 'bg-emerald-50' : 'bg-red-50'
            )}>
              {checkQ
                ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                : <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />}
              <span className="text-xs text-foreground">
                Quantité : {siQ} + {totalEntreeQ} − {totalSortieQ} = <strong>{sfQ}</strong>
              </span>
            </div>
            <div className={cn(
              'rounded-lg px-3 py-3 flex items-center gap-2',
              checkM ? 'bg-emerald-50' : 'bg-red-50'
            )}>
              {checkM
                ? <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                : <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />}
              <span className="text-xs text-foreground">
                Valeur : {fmt(siMontant)} + {fmt(totalEntreeMontant)} − {fmt(totalSortieMontant)} = <strong>{fmt(sfMontant)}</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function StockFichePage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const hash = window.location.hash
  const articleId = hash.split('/stock/fiche/')[1]?.split('?')[0] ?? ''

  const { articles } = useArticlesStock(user?.id)
  const article = articles.find(a => a.id === articleId)
  const { mouvements, loading } = useMouvementsStock(user?.id, articleId)

  const [methodeAffichee, setMethodeAffichee] = useState<'CUMP' | 'PEPS'>('CUMP')

  if (!article) {
    return (
      <div className="space-y-4 pb-4">
        <button onClick={() => navigate('/stock/articles')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        <div className="text-center py-12 text-muted-foreground text-sm">Article introuvable…</div>
      </div>
    )
  }

  const lignesCUMP = calculerFicheCUMP(article, mouvements)
  const lignesPEPS = calculerFichePEPS(article, mouvements)
  const lignesAffichees = methodeAffichee === 'CUMP' ? lignesCUMP : lignesPEPS

  return (
    <div className="space-y-5 pb-4 animate-fadeIn">
      {/* En-tête */}
      <div className="flex items-center gap-3 animate-slideDown" style={{ animationDelay: '0ms' }}>
        <button onClick={() => navigate('/stock/articles')}
          className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted/50 transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-display font-bold text-foreground">Fiche de stock</h1>
          <p className="text-xs text-muted-foreground truncate">
            {article.reference} : {article.designation} : {libelleCompte(article.typeCompte)} (cpt {article.typeCompte})
          </p>
        </div>
        <button onClick={() => navigate(`/stock/mouvement/${articleId}`)}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all">
          + Mouvement
        </button>
      </div>

      {/* Sélecteur méthode */}
      <div className="rounded-xl border border-border bg-card p-1 flex gap-1 animate-slideUp" style={{ animationDelay: '60ms' }}>
        {(['CUMP', 'PEPS'] as const).map(m => (
          <button key={m}
            onClick={() => setMethodeAffichee(m)}
            className={cn(
              'flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200',
              methodeAffichee === m
                ? 'bg-purple-600 text-white shadow-sm scale-[1.02]'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            )}>
            {m === 'PEPS' ? 'PEPS / FIFO' : 'CUMP : après chaque entrée'}
          </button>
        ))}
      </div>

      {/* Rappel méthode */}
      <div className="rounded-lg bg-muted/30 border border-border px-3 py-2 animate-slideUp" style={{ animationDelay: '100ms' }}>
        <p className="text-xs text-muted-foreground">
          {methodeAffichee === 'CUMP'
            ? 'CUMP : Coût Unitaire Moyen Pondéré recalculé après chaque entrée. Stock initial + entrée valorisés ensemble.'
            : 'PEPS / FIFO : les articles les plus anciens sortent en premier (First In First Out). Chaque sortie consomme les couches dans l\'ordre d\'arrivée.'}
        </p>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Calcul en cours…</div>
      ) : mouvements.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 py-10 text-center space-y-2 animate-slideUp" style={{ animationDelay: '140ms' }}>
          <p className="text-sm text-muted-foreground">Aucun mouvement enregistré.</p>
          <button onClick={() => navigate(`/stock/mouvement/${articleId}`)}
            className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:underline">
            Ajouter le premier mouvement <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="animate-slideUp" style={{ animationDelay: '140ms' }}>
          <TableauFiche lignes={lignesAffichees} methode={methodeAffichee} />
        </div>
      )}

      {/* Lien journal */}
      <button onClick={() => navigate(`/stock/journal/${articleId}`)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-orange-300/50 hover:bg-orange-50/30 transition-all group">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors">
            Voir les écritures générées
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-orange-500 transition-colors" />
      </button>
    </div>
  )
}
