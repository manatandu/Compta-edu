import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  ArrowLeft, BookOpen, Play, Check, ChevronRight, AlertCircle,
  RotateCcw, Sparkles, Trophy
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { creerArticle, ajouterMouvement, genererEcritures, calculerFicheCUMP, calculerFichePEPS } from '@/lib/useStock'

// ─── Données de l'exercice pédagogique ───────────────────────────────────────
// Article : Rames de papier A4 : Fournisseur IMPRIMAX : Compte 31 Marchandises
const EXERCICE = {
  titre: "Exercice : Gestion des stocks de papier A4",
  article: {
    reference: "PA4-80G",
    designation: "Rames de papier A4 : 80g/m²",
    fournisseur: "IMPRIMAX",
    typeCompte: "31" as const,
    qteInitiale: 12,
    cuInitial: 4500,
    dateInitiale: "2025-01-01",
  },
  enonce: [
    { date: "2025-01-01", type: "stock_initial" as const, libelle: "Stock initial", numeroBon: "", quantite: 12, cuSaisi: 4500 },
    { date: "2025-01-08", type: "entree" as const,        libelle: "Entrée 0108",   numeroBon: "0108", quantite: 20, cuSaisi: 4700 },
    { date: "2025-01-14", type: "sortie" as const,        libelle: "Sortie 1401",   numeroBon: "1401", quantite: 8 },
    { date: "2025-01-20", type: "entree" as const,        libelle: "Entrée 2001",   numeroBon: "2001", quantite: 15, cuSaisi: 4800 },
    { date: "2025-01-25", type: "sortie" as const,        libelle: "Sortie 2501",   numeroBon: "2501", quantite: 10 },
    { date: "2025-02-03", type: "sortie" as const,        libelle: "Sortie 0302",   numeroBon: "0302", quantite: 6 },
    { date: "2025-02-10", type: "entree" as const,        libelle: "Entrée 1002",   numeroBon: "1002", quantite: 18, cuSaisi: 4900 },
    { date: "2025-02-18", type: "sortie" as const,        libelle: "Sortie 1802",   numeroBon: "1802", quantite: 14 },
    { date: "2025-02-28", type: "sortie" as const,        libelle: "Sortie 2802",   numeroBon: "2802", quantite: 7 },
  ],
  consigne: "Procéder à l'évaluation des stocks de rames de papier A4 selon les deux méthodes préconisées par le Système Comptable OHADA (CUMP après chaque entrée et PEPS/FIFO) pour la période du 01/01 au 28/02.",
}

// ─── Formatage ────────────────────────────────────────────────────────────────
function fmt(n?: number, dec = 2): string {
  if (n === undefined || n === null) return ''
  return n.toLocaleString('fr-CD', { minimumFractionDigits: dec, maximumFractionDigits: dec === 2 ? 3 : dec })
}

// ─── Tableau de correction ────────────────────────────────────────────────────
function TableauCorrection({ lignes, methode }: { lignes: any[]; methode: 'CUMP' | 'PEPS' }) {
  const totalEntreeQ = lignes.slice(1).reduce((s: number, l: any) => s + (l.entreeQ ?? 0), 0)
  const totalEntreeMontant = lignes.slice(1).reduce((s: number, l: any) => s + (l.entreeMontant ?? 0), 0)
  const totalSortieQ = lignes.slice(1).reduce((s: number, l: any) => s + (l.sortieQ ?? 0), 0)
  const totalSortieMontant = lignes.slice(1).reduce((s: number, l: any) => s + (l.sortieMontant ?? 0), 0)
  const sf = lignes[lignes.length - 1]

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <span className={cn(
          'px-2 py-0.5 rounded-full text-xs font-bold',
          methode === 'CUMP'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-blue-100 text-blue-700'
        )}>
          {methode === 'PEPS' ? 'PEPS / FIFO' : 'CUMP : après chaque entrée'}
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse min-w-[680px] text-xs">
          <thead>
            <tr>
              <th className="border border-border px-2 py-1.5 text-left bg-muted/60 text-xs font-bold uppercase">Date</th>
              <th className="border border-border px-2 py-1.5 text-left bg-muted/60 text-xs font-bold uppercase min-w-[100px]">Libellé</th>
              <th colSpan={3} className="border border-border px-2 py-1 text-center bg-emerald-50 text-xs font-bold text-emerald-800 uppercase">Entrée</th>
              <th colSpan={3} className="border border-border px-2 py-1 text-center bg-orange-50 text-xs font-bold text-orange-800 uppercase">Sortie</th>
              <th colSpan={3} className="border border-border px-2 py-1 text-center bg-blue-50 text-xs font-bold text-blue-800 uppercase">Stock</th>
            </tr>
            <tr>
              <th className="border border-border px-2 py-1 bg-muted/40" />
              <th className="border border-border px-2 py-1 bg-muted/40" />
              {['Q', 'CU', 'Montant', 'Q', 'CU', 'Montant', 'Q', 'CU', 'Montant'].map((h, i) => (
                <th key={i} className={cn(
                  'border border-border px-2 py-1 text-center text-xs font-bold uppercase w-14',
                  i < 3 ? 'bg-emerald-50/60 text-emerald-700'
                  : i < 6 ? 'bg-orange-50/60 text-orange-700'
                  : 'bg-blue-50/60 text-blue-700'
                )}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((l: any, i: number) => (
              <tr key={i} className={cn(
                i === 0 ? 'bg-muted/30 font-semibold' : 'hover:bg-muted/10 transition-colors'
              )}>
                <td className="border border-border px-2 py-1.5 font-mono text-xs text-muted-foreground whitespace-nowrap">{l.date}</td>
                <td className="border border-border px-2 py-1.5 text-foreground">{l.libelle}</td>
                <td className="border border-border px-2 py-1.5 text-right text-emerald-700">{l.entreeQ ?? ''}</td>
                <td className="border border-border px-2 py-1.5 text-right text-emerald-700">{l.entreeCU !== undefined ? fmt(l.entreeCU, 3) : ''}</td>
                <td className="border border-border px-2 py-1.5 text-right text-emerald-700">{l.entreeMontant !== undefined ? fmt(l.entreeMontant) : ''}</td>
                <td className="border border-border px-2 py-1.5 text-right text-orange-700">{l.sortieQ ?? ''}</td>
                <td className="border border-border px-2 py-1.5 text-right text-orange-700">{l.sortieCU !== undefined ? fmt(l.sortieCU, 3) : ''}</td>
                <td className="border border-border px-2 py-1.5 text-right text-orange-700">{l.sortieMontant !== undefined ? fmt(l.sortieMontant) : ''}</td>
                <td className="border border-border px-2 py-1.5 text-right font-semibold text-blue-700">{l.stockQ}</td>
                <td className="border border-border px-2 py-1.5 text-right text-blue-700">{fmt(l.stockCU, 3)}</td>
                <td className="border border-border px-2 py-1.5 text-right font-semibold text-blue-700">{fmt(l.stockMontant)}</td>
              </tr>
            ))}
            {/* TOTAUX */}
            <tr className="bg-muted/50 font-bold border-t-2 border-border">
              <td colSpan={2} className="border border-border px-2 py-1.5 text-xs font-bold text-foreground">TOTAUX</td>
              <td className="border border-border px-2 py-1.5 text-right text-emerald-700">{totalEntreeQ}</td>
              <td className="border border-border px-2 py-1.5" />
              <td className="border border-border px-2 py-1.5 text-right text-emerald-700">{fmt(totalEntreeMontant)}</td>
              <td className="border border-border px-2 py-1.5 text-right text-orange-700">{totalSortieQ}</td>
              <td className="border border-border px-2 py-1.5" />
              <td className="border border-border px-2 py-1.5 text-right text-orange-700">{fmt(totalSortieMontant)}</td>
              <td className="border border-border px-2 py-1.5 text-right text-blue-700">{sf?.stockQ}</td>
              <td className="border border-border px-2 py-1.5" />
              <td className="border border-border px-2 py-1.5 text-right text-blue-700">{fmt(sf?.stockMontant)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Vérification */}
      <div className="rounded-lg bg-muted/20 border border-border px-3 py-2">
        <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Vérification : S.I + Entrées − Sorties = S.F</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-foreground">
          <div><span className="text-muted-foreground">Quantité : </span>
            {lignes[0]?.stockQ} + {totalEntreeQ} − {totalSortieQ} = <strong>{sf?.stockQ}</strong>
          </div>
          <div><span className="text-muted-foreground">Valeur : </span>
            {fmt(lignes[0]?.stockMontant)} + {fmt(totalEntreeMontant)} − {fmt(totalSortieMontant)} = <strong>{fmt(sf?.stockMontant)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function StockExercicePage() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const [etape, setEtape] = useState<'enonce' | 'correction'>('enonce')
  const [chargement, setChargement] = useState(false)
  const [charge, setCharge] = useState(false)
  const [erreur, setErreur] = useState('')

  // Calcul de la correction à partir des données statiques
  const articleFactice = {
    id: 'exercice',
    userId: '',
    reference: EXERCICE.article.reference,
    designation: EXERCICE.article.designation,
    fournisseur: EXERCICE.article.fournisseur,
    typeCompte: EXERCICE.article.typeCompte,
    methode: 'CUMP' as const,
    qteInitiale: EXERCICE.article.qteInitiale,
    cuInitial: EXERCICE.article.cuInitial,
    dateInitiale: EXERCICE.article.dateInitiale,
  }

  const mouvementsFactices = EXERCICE.enonce
    .filter(e => e.type !== 'stock_initial')
    .map((e, i) => ({
      id: `mv_${i}`,
      userId: '',
      articleId: 'exercice',
      type: e.type as any,
      date: e.date,
      libelle: e.libelle,
      numeroBon: e.numeroBon,
      quantite: e.quantite,
      cuSaisi: e.cuSaisi,
    }))

  const lignesCUMP = calculerFicheCUMP(articleFactice, mouvementsFactices)
  const lignesPEPS = calculerFichePEPS(articleFactice, mouvementsFactices)

  // Charger l'exercice dans Firebase
  const chargerExercice = async () => {
    if (!user || charge) return
    setChargement(true)
    setErreur('')
    try {
      const articleId = await creerArticle({
        userId: user.id,
        ...EXERCICE.article,
        methode: 'CUMP',
      })
      const mouvements = EXERCICE.enonce.filter(e => e.type !== 'stock_initial')
      // Calcul du CUMP progressif pour chaque mouvement (évite CU = 0 sur les sorties)
      let stockQ = EXERCICE.article.qteInitiale
      let stockMontant = EXERCICE.article.qteInitiale * EXERCICE.article.cuInitial
      for (const mv of mouvements) {
        const mvData = {
          userId: user.id,
          articleId,
          type: mv.type as any,
          date: mv.date,
          libelle: mv.libelle,
          numeroBon: mv.numeroBon,
          quantite: mv.quantite,
          cuSaisi: mv.cuSaisi,
        }
        // CU courant CUMP : recalculé après chaque entrée
        const cuCourant = stockQ > 0 ? stockMontant / stockQ : 0
        if (mv.type === 'entree') {
          stockQ += mv.quantite
          stockMontant += mv.quantite * (mv.cuSaisi ?? 0)
        } else {
          stockQ -= mv.quantite
          stockMontant -= mv.quantite * cuCourant
        }
        const ecritures = genererEcritures(user.id, articleId, { ...articleFactice, id: articleId }, mvData, cuCourant)
        await ajouterMouvement(mvData, ecritures)
      }
      setCharge(true)
      setTimeout(() => navigate(`/stock/fiche/${articleId}`), 1000)
    } catch (e) {
      setErreur("Erreur lors du chargement de l'exercice.")
    } finally {
      setChargement(false)
    }
  }

  return (
    <div className="space-y-5 pb-4">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/stock')}
          className="h-8 w-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted/50 transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-display font-bold text-foreground">Exercice pédagogique</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-purple-500" />
            Gestion de stock : SYSCOHADA
          </p>
        </div>
      </div>

      {/* Titre exercice */}
      <div className="rounded-xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-200/30 px-5 py-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-4 w-4 text-purple-600" />
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Application</span>
        </div>
        <h2 className="font-display font-bold text-foreground text-sm">{EXERCICE.titre}</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Article : <strong>{EXERCICE.article.designation}</strong> : Fournisseur : {EXERCICE.article.fournisseur}
        </p>
      </div>

      {/* Onglets Énoncé / Correction */}
      <div className="rounded-xl border border-border bg-card p-1 flex gap-1">
        {([
          { val: 'enonce', label: 'Énoncé' },
          { val: 'correction', label: 'Correction' },
        ] as const).map(o => (
          <button key={o.val} onClick={() => setEtape(o.val)}
            className={cn(
              'flex-1 rounded-lg py-2 text-xs font-semibold transition-all',
              etape === o.val
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            )}>
            {o.val === 'correction' && <Trophy className="h-3 w-3 inline mr-1" />}
            {o.label}
          </button>
        ))}
      </div>

      {etape === 'enonce' ? (
        <div className="space-y-4">
          {/* Consigne */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Travail à faire</p>
            <p className="text-sm text-foreground leading-relaxed">{EXERCICE.consigne}</p>
          </div>

          {/* Données */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Données</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted/30 px-3 py-2">
                <p className="text-muted-foreground">Référence</p>
                <p className="font-bold text-foreground">{EXERCICE.article.reference}</p>
              </div>
              <div className="rounded-lg bg-muted/30 px-3 py-2">
                <p className="text-muted-foreground">Compte</p>
                <p className="font-bold text-foreground">31 : Marchandises</p>
              </div>
              <div className="rounded-lg bg-muted/30 px-3 py-2">
                <p className="text-muted-foreground">Stock initial</p>
                <p className="font-bold text-foreground">{EXERCICE.article.qteInitiale} u. à {EXERCICE.article.cuInitial.toLocaleString('fr-CD')} CDF</p>
              </div>
              <div className="rounded-lg bg-muted/30 px-3 py-2">
                <p className="text-muted-foreground">Période</p>
                <p className="font-bold text-foreground">01/01 au 28/02/2025</p>
              </div>
            </div>

            {/* Tableau des mouvements */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-xs min-w-[420px]">
                <thead>
                  <tr>
                    <th className="border border-border px-3 py-2 text-left bg-muted/60 font-bold uppercase text-xs">Date</th>
                    <th className="border border-border px-3 py-2 text-left bg-muted/60 font-bold uppercase text-xs">Opération</th>
                    <th className="border border-border px-3 py-2 text-center bg-muted/60 font-bold uppercase text-xs">Qté</th>
                    <th className="border border-border px-3 py-2 text-right bg-muted/60 font-bold uppercase text-xs">PU (CDF)</th>
                    <th className="border border-border px-3 py-2 text-center bg-muted/60 font-bold uppercase text-xs">N° Bon</th>
                  </tr>
                </thead>
                <tbody>
                  {EXERCICE.enonce.map((e, i) => (
                    <tr key={i} className={cn('hover:bg-muted/10', i === 0 ? 'bg-muted/20 font-semibold' : '')}>
                      <td className="border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground whitespace-nowrap">{e.date}</td>
                      <td className="border border-border px-3 py-1.5 text-foreground">
                        <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold mr-1.5',
                          e.type === 'stock_initial' ? 'bg-muted/50 text-muted-foreground'
                          : e.type === 'entree' ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-orange-100 text-orange-700'
                        )}>
                          {e.type === 'stock_initial' ? 'S.I.' : e.type === 'entree' ? 'Entrée' : 'Sortie'}
                        </span>
                        {e.libelle}
                      </td>
                      <td className="border border-border px-3 py-1.5 text-center font-semibold">{e.quantite}</td>
                      <td className="border border-border px-3 py-1.5 text-right">
                        {e.cuSaisi ? e.cuSaisi.toLocaleString('fr-CD') : <span className="text-muted-foreground italic text-xs">à calculer</span>}
                      </td>
                      <td className="border border-border px-3 py-1.5 text-center text-muted-foreground">{e.numeroBon || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bouton charger */}
          <div className="rounded-xl border border-dashed border-purple-300 bg-purple-50/30 p-4 space-y-3">
            <p className="text-xs text-muted-foreground">
              Charge cet exercice dans tes fiches de stock pour pratiquer et voir la fiche calculée automatiquement.
            </p>
            {erreur && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <p className="text-xs text-red-600">{erreur}</p>
              </div>
            )}
            {charge ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-700 font-semibold">Chargé. Redirection vers la fiche…</p>
              </div>
            ) : (
              <button onClick={chargerExercice} disabled={chargement}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50">
                <Play className="h-4 w-4" />
                {chargement ? 'Chargement…' : 'Charger cet exercice dans mes fiches'}
              </button>
            )}
          </div>
        </div>

      ) : (
        /* CORRECTION */
        <div className="space-y-6">
          <div className="rounded-lg bg-amber-50 border border-amber-200/50 px-3 py-2">
            <p className="text-xs text-amber-700 font-semibold">
              Essaie d'abord de résoudre l'exercice avant de consulter la correction.
            </p>
          </div>

          <TableauCorrection lignes={lignesCUMP} methode="CUMP" />
          <TableauCorrection lignes={lignesPEPS} methode="PEPS" />

          {/* Comparaison stocks finals */}
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Comparaison des stocks finals</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-purple-50 border border-purple-200/40 px-3 py-3 text-center">
                <p className="text-xs font-bold text-purple-700 mb-1">CUMP</p>
                <p className="text-lg font-bold text-foreground">{fmt(lignesCUMP[lignesCUMP.length - 1]?.stockMontant)}</p>
                <p className="text-xs text-muted-foreground">CDF : {lignesCUMP[lignesCUMP.length - 1]?.stockQ} u.</p>
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-200/40 px-3 py-3 text-center">
                <p className="text-xs font-bold text-blue-700 mb-1">PEPS / FIFO</p>
                <p className="text-lg font-bold text-foreground">{fmt(lignesPEPS[lignesPEPS.length - 1]?.stockMontant)}</p>
                <p className="text-xs text-muted-foreground">CDF : {lignesPEPS[lignesPEPS.length - 1]?.stockQ} u.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Les deux méthodes donnent le même stock en quantité mais des valeurs différentes car le PEPS valorise les sorties aux prix les plus anciens, tandis que le CUMP utilise un prix moyen recalculé à chaque entrée.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
