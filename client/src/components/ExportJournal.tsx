import { useState } from 'react'
import { Upload, Check, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'
import { exporterEcrituresAsync, ErreurExercice, type EcritureAExporter } from '@/lib/db-firebase'

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT VERS LE JOURNAL (simulateurs sans données enregistrées)
//
// Les simulateurs d'immobilisations et de paie calculaient des écritures sans
// pouvoir les passer au journal. La fenêtre choisit la session, puis écrit
// d'un bloc et sans doublon (exporterEcrituresAsync), datée dans l'exercice
// de la session : les écritures sont construites à partir de cet exercice.
// Les réglages propres au simulateur (année du plan, mois de paie) passent
// par `children` et sont lus par `construire`.
// ─────────────────────────────────────────────────────────────────────────────

const formatFC = (n: number) => `${n.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} FC`

export function ExportJournalDialog({ ouvert, onClose, description, construire, children }: {
  ouvert: boolean
  onClose: () => void
  description: string
  construire: (exercice: number) => EcritureAExporter[]
  children?: React.ReactNode
}) {
  const user = useUser()
  const { sessions } = useSessions(user?.id, 'syscohada')
  const [sessionId, setSessionId] = useState('')
  const [enCours, setEnCours] = useState(false)
  const [resultat, setResultat] = useState<{ exportees: number; dejaPresentes: number } | null>(null)
  const [erreur, setErreur] = useState('')

  const session = sessions.find(s => s.id === sessionId)
  const ecritures = session ? construire(Number(session.exercice)) : []

  const fermer = () => { setResultat(null); setErreur(''); setSessionId(''); onClose() }

  const exporter = async () => {
    if (!user?.id || !session) { setErreur('Choisissez une session.'); return }
    if (ecritures.length === 0) { setErreur('Aucune écriture à exporter.'); return }
    setEnCours(true); setErreur('')
    try {
      setResultat(await exporterEcrituresAsync(user.id, session, ecritures))
    } catch (e) {
      setErreur(e instanceof ErreurExercice
        ? `Une écriture est datée de ${e.annee} : choisissez une session de l'exercice ${e.annee}.`
        : "L'export a échoué. Vérifiez votre connexion, puis réessayez.")
    } finally {
      setEnCours(false)
    }
  }

  return (
    <Dialog open={ouvert} onOpenChange={o => { if (!o) fermer() }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Upload className="h-4 w-4" />Exporter vers le journal</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {resultat ? (
          <div className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
            <Check className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              {resultat.exportees > 0 && `${resultat.exportees} écriture${resultat.exportees > 1 ? 's' : ''} ajoutée${resultat.exportees > 1 ? 's' : ''} au journal. `}
              {resultat.dejaPresentes > 0 && `${resultat.dejaPresentes} figurai${resultat.dejaPresentes > 1 ? 'ent' : 't'} déjà dans la session : rien n'a été ajouté en double.`}
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Session cible</Label>
              <select value={sessionId} onChange={e => { setSessionId(e.target.value); setErreur('') }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">-- Choisir une session --</option>
                {sessions.map(s => <option key={s.id} value={s.id}>{s.nom} : exercice {s.exercice}</option>)}
              </select>
              {sessions.length === 0 && <p className="text-xs text-muted-foreground">Aucune session : créez-en une dans le journal.</p>}
            </div>
            {children}
            {ecritures.length > 0 && (
              <div className="rounded-lg border border-border bg-muted/30 p-2 space-y-1 max-h-48 overflow-y-auto">
                {ecritures.map((e, i) => (
                  <div key={i} className="text-xs flex justify-between gap-2">
                    <span className="truncate">{e.date.split('-').reverse().join('/')} · {e.libelle}</span>
                    <span className="font-mono shrink-0">{formatFC(e.lignes.reduce((s, l) => s + l.debit, 0))}</span>
                  </div>
                ))}
              </div>
            )}
            {erreur && (
              <p role="alert" className="flex items-center gap-2 text-xs text-destructive"><AlertCircle className="h-3.5 w-3.5 shrink-0" />{erreur}</p>
            )}
          </div>
        )}

        <DialogFooter>
          {resultat ? (
            <Button onClick={fermer}>Fermer</Button>
          ) : (
            <>
              <Button variant="outline" onClick={fermer} disabled={enCours}>Annuler</Button>
              <Button onClick={exporter} disabled={enCours || !session || ecritures.length === 0}>
                {enCours && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}Exporter
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
