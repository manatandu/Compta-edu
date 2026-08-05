import { useState, useEffect } from 'react'
import {
  collection, query, where, onSnapshot, orderBy,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TypeStock = '31' | '32' | '36'
export type MethodeEvaluation = 'CUMP' | 'PEPS'
export type TypeMouvement = 'entree' | 'sortie' | 'stock_initial'

export interface ArticleStock {
  id: string
  userId: string
  reference: string          // ex : ABX25
  designation: string        // ex : Cartouches d'encre couleur
  fournisseur: string
  typeCompte: TypeStock       // 31 | 32 | 36
  methode: MethodeEvaluation  // CUMP | PEPS
  // Stock initial
  qteInitiale: number
  cuInitial: number           // coût unitaire initial
  dateInitiale: string        // ISO date
  createdAt?: Timestamp
}

export interface MouvementStock {
  id: string
  userId: string
  articleId: string
  type: TypeMouvement
  date: string               // ISO date
  libelle: string            // ex : Entrée 0705 / Sortie 1205
  numeroBon: string          // ex : 0705
  quantite: number
  // Pour les entrées : prix unitaire saisi
  // Pour les sorties : calculé automatiquement (CUMP ou PEPS)
  cuSaisi?: number           // entrée uniquement
  createdAt?: Timestamp
}

// Ligne calculée de la fiche de stock (résultat du calcul)
export interface LigneFiche {
  date: string
  libelle: string
  numeroBon: string
  // Entrée
  entreeQ?: number
  entreeCU?: number
  entreeMontant?: number
  // Sortie
  sortieQ?: number
  sortieCU?: number
  sortieMontant?: number
  // Stock
  stockQ: number
  stockCU: number
  stockMontant: number
  // Pour PEPS : le stock peut avoir plusieurs couches
  couchesPEPS?: CouchePEPS[]
}

export interface CouchePEPS {
  cu: number
  quantite: number
}

// Écriture du journal interne stock
export interface EcritureStock {
  id: string
  userId: string
  articleId: string
  mouvementId: string
  date: string
  libelle: string
  debit: string    // numéro de compte
  libDebit: string
  credit: string
  libCredit: string
  montant: number
  exporte: boolean // exporté vers le journal général ?
  createdAt?: Timestamp
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))
}

export function libelleCompte(type: TypeStock): string {
  return type === '31' ? 'Marchandises'
    : type === '32' ? 'Matières Premières et Fournitures liées'
    : 'Produits Finis'
}

export function compteAchat(type: TypeStock): { num: string; lib: string } {
  // Compte 36 (Produits Finis) : pas d'achat externe — stock alimenté par production propre
  // L'écriture d'entrée est : Débit 36 / Crédit 736 (une seule écriture via compteVariation)
  return type === '31' ? { num: '6011', lib: 'Achats de marchandises' }
    : type === '32' ? { num: '6021', lib: 'Achats de MP et fournitures liées' }
    : { num: '736', lib: 'Variations des stocks de produits finis' }  // 36 : production propre
}

export function compteVariation(type: TypeStock): { num: string; lib: string } {
  // SYSCOHADA Plan 2017 :
  // Comptes 31/32 → 603x (classe 6, charge) : Variations des stocks de biens achetés
  // Compte 36    → 736  (classe 7, produit) : Variations des stocks de produits finis
  return type === '31' ? { num: '6031', lib: 'Variation des stocks de marchandises' }
    : type === '32' ? { num: '6032', lib: 'Variation des stocks de MP et fournitures' }
    : { num: '736', lib: 'Variations des stocks de produits finis' }
}

// ─── Calcul CUMP après chaque entrée ──────────────────────────────────────────

export function calculerFicheCUMP(article: ArticleStock, mouvements: MouvementStock[]): LigneFiche[] {
  const lignes: LigneFiche[] = []

  // Stock initial
  let stockQ = article.qteInitiale
  let stockMontant = article.qteInitiale * article.cuInitial
  let stockCU = article.cuInitial

  lignes.push({
    date: article.dateInitiale,
    libelle: 'Stock initial',
    numeroBon: '',
    stockQ,
    stockCU: stockCU,
    stockMontant,
  })

  // Trier les mouvements par date
  const sorted = [...mouvements].sort((a, b) => a.date.localeCompare(b.date))

  for (const mv of sorted) {
    if (mv.type === 'stock_initial') continue

    if (mv.type === 'entree') {
      const cu = mv.cuSaisi ?? 0
      const montant = mv.quantite * cu
      // Nouveau CUMP = (stock en valeur + entrée en valeur) / (stock en qté + entrée en qté)
      const newQ = stockQ + mv.quantite
      const newMontant = stockMontant + montant
      const newCU = newQ > 0 ? newMontant / newQ : 0

      lignes.push({
        date: mv.date,
        libelle: mv.libelle,
        numeroBon: mv.numeroBon,
        entreeQ: mv.quantite,
        entreeCU: cu,
        entreeMontant: montant,
        stockQ: newQ,
        stockCU: newCU,
        stockMontant: newMontant,
      })

      stockQ = newQ
      stockMontant = newMontant
      stockCU = newCU

    } else if (mv.type === 'sortie') {
      // Sortie au CUMP courant
      const cu = stockCU
      const montant = mv.quantite * cu
      const newQ = stockQ - mv.quantite
      const newMontant = stockMontant - montant

      lignes.push({
        date: mv.date,
        libelle: mv.libelle,
        numeroBon: mv.numeroBon,
        sortieQ: mv.quantite,
        sortieCU: cu,
        sortieMontant: montant,
        stockQ: newQ,
        stockCU: cu,
        stockMontant: newMontant,
      })

      stockQ = newQ
      stockMontant = newMontant
    }
  }

  return lignes
}

// ─── Calcul PEPS / FIFO ───────────────────────────────────────────────────────

export function calculerFichePEPS(article: ArticleStock, mouvements: MouvementStock[]): LigneFiche[] {
  const lignes: LigneFiche[] = []

  // File FIFO : tableau de couches { cu, quantite }
  let file: CouchePEPS[] = [{ cu: article.cuInitial, quantite: article.qteInitiale }]

  const totalQ = () => file.reduce((s, c) => s + c.quantite, 0)
  const totalMontant = () => file.reduce((s, c) => s + c.cu * c.quantite, 0)
  const cuMoyen = () => totalQ() > 0 ? totalMontant() / totalQ() : 0

  lignes.push({
    date: article.dateInitiale,
    libelle: 'Stock initial',
    numeroBon: '',
    stockQ: totalQ(),
    stockCU: cuMoyen(),
    stockMontant: totalMontant(),
    couchesPEPS: [...file],
  })

  const sorted = [...mouvements].sort((a, b) => a.date.localeCompare(b.date))

  for (const mv of sorted) {
    if (mv.type === 'stock_initial') continue

    if (mv.type === 'entree') {
      const cu = mv.cuSaisi ?? 0
      const montant = mv.quantite * cu
      // Ajouter une nouvelle couche en fin de file
      file.push({ cu, quantite: mv.quantite })

      lignes.push({
        date: mv.date,
        libelle: mv.libelle,
        numeroBon: mv.numeroBon,
        entreeQ: mv.quantite,
        entreeCU: cu,
        entreeMontant: montant,
        stockQ: totalQ(),
        stockCU: cuMoyen(),
        stockMontant: totalMontant(),
        couchesPEPS: [...file],
      })

    } else if (mv.type === 'sortie') {
      // Consommer les couches les plus anciennes en premier
      let reste = mv.quantite
      let montantSortie = 0
      const detailsSortie: { cu: number; q: number }[] = []

      while (reste > 0 && file.length > 0) {
        const couche = file[0]
        if (couche.quantite <= reste) {
          montantSortie += couche.quantite * couche.cu
          detailsSortie.push({ cu: couche.cu, q: couche.quantite })
          reste -= couche.quantite
          file.shift()
        } else {
          montantSortie += reste * couche.cu
          detailsSortie.push({ cu: couche.cu, q: reste })
          couche.quantite -= reste
          reste = 0
        }
      }

      const cuSortie = mv.quantite > 0 ? montantSortie / mv.quantite : 0

      lignes.push({
        date: mv.date,
        libelle: mv.libelle,
        numeroBon: mv.numeroBon,
        sortieQ: mv.quantite,
        sortieCU: cuSortie,
        sortieMontant: montantSortie,
        stockQ: totalQ(),
        stockCU: cuMoyen(),
        stockMontant: totalMontant(),
        couchesPEPS: [...file],
      })
    }
  }

  return lignes
}

// ─── Hooks Firebase ───────────────────────────────────────────────────────────

export function useArticlesStock(userId: string | undefined) {
  const [articles, setArticles] = useState<ArticleStock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const q = query(
      collection(db, 'stock_articles'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, snap => {
      setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() } as ArticleStock)))
      setLoading(false)
    })
    return () => unsub()
  }, [userId])

  return { articles, loading }
}

export function useMouvementsStock(userId: string | undefined, articleId?: string) {
  const [mouvements, setMouvements] = useState<MouvementStock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const conditions: any[] = [where('userId', '==', userId)]
    if (articleId) conditions.push(where('articleId', '==', articleId))
    conditions.push(orderBy('date', 'asc'))
    const q = query(collection(db, 'stock_mouvements'), ...conditions)
    const unsub = onSnapshot(q, snap => {
      setMouvements(snap.docs.map(d => ({ id: d.id, ...d.data() } as MouvementStock)))
      setLoading(false)
    })
    return () => unsub()
  }, [userId, articleId])

  return { mouvements, loading }
}

export function useEcrituresStock(userId: string | undefined, articleId?: string) {
  const [ecritures, setEcritures] = useState<EcritureStock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const conditions: any[] = [where('userId', '==', userId)]
    if (articleId) conditions.push(where('articleId', '==', articleId))
    conditions.push(orderBy('date', 'asc'))
    const q = query(collection(db, 'stock_ecritures'), ...conditions)
    const unsub = onSnapshot(q, snap => {
      setEcritures(snap.docs.map(d => ({ id: d.id, ...d.data() } as EcritureStock)))
      setLoading(false)
    })
    return () => unsub()
  }, [userId, articleId])

  return { ecritures, loading }
}

// ─── Actions Firebase ─────────────────────────────────────────────────────────

export async function creerArticle(data: Omit<ArticleStock, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'stock_articles'), cleanUndefined({
    ...data,
    createdAt: serverTimestamp(),
  }))
  return ref.id
}

export async function supprimerArticle(id: string) {
  await deleteDoc(doc(db, 'stock_articles', id))
}

export async function ajouterMouvement(
  data: Omit<MouvementStock, 'id'>,
  ecritures: Omit<EcritureStock, 'id'>[]
): Promise<string> {
  // Créer le mouvement
  const ref = await addDoc(collection(db, 'stock_mouvements'), cleanUndefined({
    ...data,
    createdAt: serverTimestamp(),
  }))
  // Créer les écritures associées
  for (const ec of ecritures) {
    await addDoc(collection(db, 'stock_ecritures'), cleanUndefined({
      ...ec,
      mouvementId: ref.id,
      exporte: false,
      createdAt: serverTimestamp(),
    }))
  }
  return ref.id
}

export async function supprimerMouvement(id: string) {
  await deleteDoc(doc(db, 'stock_mouvements', id))
}

export async function marquerExporte(ecritureId: string) {
  await updateDoc(doc(db, 'stock_ecritures', ecritureId), { exporte: true })
}

// ─── Générateur d'écritures pour un mouvement ────────────────────────────────

export function genererEcritures(
  userId: string,
  articleId: string,
  article: ArticleStock,
  mv: Omit<MouvementStock, 'id'>,
  cuCalcule: number   // CU de sortie calculé (CUMP ou PEPS)
): Omit<EcritureStock, 'id'>[] {
  const montant = mv.quantite * (mv.type === 'entree' ? (mv.cuSaisi ?? 0) : cuCalcule)
  const cptStock = article.typeCompte          // 31 | 32 | 36
  const libStock = libelleCompte(article.typeCompte)
  const cptVar = compteVariation(article.typeCompte)
  const cptAchat = compteAchat(article.typeCompte)

  if (mv.type === 'entree') {
    // Compte 36 (Produits Finis) : production propre — UNE seule écriture
    // SYSCOHADA 2017 : Débit 36 / Crédit 736 (pas d'écriture fournisseur 401)
    if (cptStock === '36') {
      return [
        {
          userId, articleId,
          mouvementId: '',
          date: mv.date,
          libelle: `Entrée produits finis : ${mv.libelle} : Bon n° ${mv.numeroBon}`,
          debit: cptStock, libDebit: libStock,
          credit: cptVar.num, libCredit: cptVar.lib,
          montant,
          exporte: false,
        },
      ]
    }
    // Comptes 31/32 (Marchandises, MP) : DEUX écritures
    // Écriture 1 : Achat (facture fournisseur)
    // Écriture 2 : Entrée en stock (bon de réception)
    return [
      {
        userId, articleId,
        mouvementId: '',
        date: mv.date,
        libelle: `Achat : ${mv.libelle} : Bon n° ${mv.numeroBon}`,
        debit: cptAchat.num, libDebit: cptAchat.lib,
        credit: '401', libCredit: 'Fournisseurs',
        montant,
        exporte: false,
      },
      {
        userId, articleId,
        mouvementId: '',
        date: mv.date,
        libelle: `Entrée en stock : ${mv.libelle} : Bon n° ${mv.numeroBon}`,
        debit: cptStock, libDebit: libStock,
        credit: cptVar.num, libCredit: cptVar.lib,
        montant,
        exporte: false,
      },
    ]
  } else {
    return [
      // Sortie de stock
      {
        userId, articleId,
        mouvementId: '',
        date: mv.date,
        libelle: `Sortie de stock : ${mv.libelle} : Bon n° ${mv.numeroBon}`,
        debit: cptVar.num, libDebit: cptVar.lib,
        credit: cptStock, libCredit: libStock,
        montant,
        exporte: false,
      },
    ]
  }
}
