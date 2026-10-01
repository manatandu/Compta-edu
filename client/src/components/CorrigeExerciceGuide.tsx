// ─────────────────────────────────────────────────────────────────────────────
// CORRIGÉ D'UN EXERCICE GUIDÉ (saisie par l'enseignant)
//
// Écritures attendues que le moteur de correction d'ExerciceDetailPage compare,
// ligne à ligne, à la saisie de l'étudiant (compte, sens, montant). Le
// formulaire de la page Exercices ne permettait pas de les saisir : sans
// elles, la correction se réduisait à « équilibré : 100, sinon 40 » et le
// corrigé n'était jamais affiché.
// ─────────────────────────────────────────────────────────────────────────────
import { Plus, Trash2 } from 'lucide-react'
import type { LigneSolution } from '@/lib/db'
import { getCompteByNumero } from '@/lib/comptes'
import { formatMontant, generateId, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const ligneCorrigeVide = (sens: 'D' | 'C' = 'D'): LigneSolution =>
  ({ id: generateId(), numeroCompte: '', intitule: '', sens, montant: '' })

// Lignes réellement renseignées (un numéro de compte), nettoyées pour l'enregistrement.
export function lignesCorrigeRemplies(lignes: LigneSolution[]): LigneSolution[] {
  return lignes
    .filter(l => l.numeroCompte.trim())
    .map(l => ({ ...l, numeroCompte: l.numeroCompte.trim(), intitule: l.intitule.trim() }))
}

// Message d'erreur si le corrigé ne peut pas servir de référence, null sinon.
// Un corrigé vide reste permis (exercice noté sur le seul équilibre).
export function erreurCorrige(lignes: LigneSolution[]): string | null {
  const remplies = lignesCorrigeRemplies(lignes)
  if (remplies.length === 0) return null
  const sansMontant = remplies.find(l => !(parseFloat(l.montant) > 0))
  if (sansMontant) return `Corrigé : montant manquant pour le compte ${sansMontant.numeroCompte}.`
  const nonNumerique = remplies.find(l => !/^\d+$/.test(l.numeroCompte))
  if (nonNumerique) return `Corrigé : « ${nonNumerique.numeroCompte} » n'est pas un numéro de compte.`
  const { debit, credit } = totauxCorrige(remplies)
  if (Math.abs(debit - credit) >= 0.01) {
    return `Corrigé déséquilibré : débit ${formatMontant(debit)} ≠ crédit ${formatMontant(credit)}.`
  }
  return null
}

function totauxCorrige(lignes: LigneSolution[]) {
  let debit = 0, credit = 0
  for (const l of lignes) {
    const m = parseFloat(l.montant) || 0
    if (l.sens === 'D') debit += m; else credit += m
  }
  return { debit, credit }
}

export function EditeurCorrige({ lignes, onChange }: { lignes: LigneSolution[]; onChange: (l: LigneSolution[]) => void }) {
  const modifier = (id: string, champs: Partial<LigneSolution>) =>
    onChange(lignes.map(l => (l.id === id ? { ...l, ...champs } : l)))
  // L'intitulé suit le plan comptable tant que l'enseignant ne l'a pas réécrit.
  const changerCompte = (l: LigneSolution, numero: string) => {
    const avant = getCompteByNumero(l.numeroCompte.trim())?.intitule || ''
    const apres = getCompteByNumero(numero.trim())?.intitule
    modifier(l.id, { numeroCompte: numero, intitule: (!l.intitule || l.intitule === avant) ? (apres || '') : l.intitule })
  }
  const { debit, credit } = totauxCorrige(lignesCorrigeRemplies(lignes))
  const equilibre = Math.abs(debit - credit) < 0.01

  return (
    <div className="space-y-2">
      {lignes.map((l, i) => {
        const inconnu = l.numeroCompte.trim().length >= 2 && !getCompteByNumero(l.numeroCompte.trim())
        return (
          <div key={l.id} className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <Input
                value={l.numeroCompte}
                onChange={e => changerCompte(l, e.target.value)}
                placeholder="N° compte"
                inputMode="numeric"
                aria-label={`Compte de la ligne ${i + 1} du corrigé`}
                className="w-24 font-mono text-sm"
              />
              <Input
                value={l.intitule}
                onChange={e => modifier(l.id, { intitule: e.target.value })}
                placeholder="Intitulé"
                aria-label={`Intitulé de la ligne ${i + 1} du corrigé`}
                className="flex-1 min-w-[8rem] text-sm"
              />
              <button
                type="button"
                onClick={() => modifier(l.id, { sens: l.sens === 'D' ? 'C' : 'D' })}
                title="Cliquer pour changer de sens"
                aria-label={`Sens de la ligne ${i + 1} : ${l.sens === 'D' ? 'débit' : 'crédit'}`}
                className={cn('h-9 w-20 rounded-md border text-sm font-semibold transition-colors',
                  l.sens === 'D' ? 'border-blue-600 bg-blue-600 text-white' : 'border-green-600 bg-green-600 text-white')}
              >
                {l.sens === 'D' ? 'Débit' : 'Crédit'}
              </button>
              <Input
                type="number"
                min="0"
                value={l.montant}
                onChange={e => modifier(l.id, { montant: e.target.value })}
                placeholder="Montant"
                aria-label={`Montant de la ligne ${i + 1} du corrigé`}
                className="w-32 text-right text-sm"
              />
              <Button
                type="button" variant="ghost" size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
                onClick={() => onChange(lignes.length > 1 ? lignes.filter(x => x.id !== l.id) : [ligneCorrigeVide()])}
                aria-label={`Supprimer la ligne ${i + 1} du corrigé`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
            {inconnu && <p className="text-xs text-amber-600">Compte absent du plan SYSCOHADA : vérifiez le numéro.</p>}
          </div>
        )
      })}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...lignes, ligneCorrigeVide(debit > credit ? 'C' : 'D')])}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Ajouter une ligne
        </Button>
        {(debit > 0 || credit > 0) && (
          <p className={cn('text-xs font-medium', equilibre ? 'text-green-600' : 'text-destructive')}>
            Débit {formatMontant(debit)} · Crédit {formatMontant(credit)}{equilibre ? ' : équilibré' : ' : déséquilibré'}
          </p>
        )}
      </div>
    </div>
  )
}
