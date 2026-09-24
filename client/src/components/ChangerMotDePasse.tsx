import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import PasswordInput from '@/components/PasswordInput'
import { useToast } from '@/components/ui/use-toast'
import { changerMonMotDePasseAsync } from '@/lib/db-firebase'
import { cn } from '@/lib/utils'

const LONGUEUR_MIN = 8

// Bouton + fenêtre « Changer mon mot de passe ». Le mot de passe vit uniquement
// dans Firebase Authentication : c'est le seul endroit où le changer, et seul
// le titulaire du compte peut le faire depuis l'application (ré-authentification
// par l'ancien mot de passe exigée par Firebase).
export function ChangerMotDePasse({ className }: { className?: string }) {
  const { toast } = useToast()
  const [ouvert, setOuvert] = useState(false)
  const [ancien, setAncien] = useState('')
  const [nouveau, setNouveau] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [erreur, setErreur] = useState('')
  const [enCours, setEnCours] = useState(false)

  const fermer = (o: boolean) => {
    setOuvert(o)
    if (!o) { setAncien(''); setNouveau(''); setConfirmation(''); setErreur('') }
  }

  const valider = async () => {
    setErreur('')
    if (nouveau.length < LONGUEUR_MIN) { setErreur(`Le nouveau mot de passe doit contenir au moins ${LONGUEUR_MIN} caractères.`); return }
    if (nouveau !== confirmation) { setErreur('La confirmation ne correspond pas au nouveau mot de passe.'); return }
    if (nouveau === ancien) { setErreur("Le nouveau mot de passe doit être différent de l'ancien."); return }
    setEnCours(true)
    try {
      await changerMonMotDePasseAsync(ancien, nouveau)
      toast({ title: 'Mot de passe modifié' })
      fermer(false)
    } catch (e: any) {
      const code = e?.code || ''
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials') {
        setErreur('Mot de passe actuel incorrect.')
      } else if (code === 'auth/weak-password') {
        setErreur('Mot de passe trop faible.')
      } else if (code === 'auth/too-many-requests') {
        setErreur('Trop de tentatives. Réessayez dans quelques minutes.')
      } else {
        setErreur('Modification impossible pour le moment. Réessayez.')
      }
    } finally {
      setEnCours(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost" size="icon"
        className={cn('h-8 w-8', className)}
        onClick={() => setOuvert(true)}
        title="Changer mon mot de passe" aria-label="Changer mon mot de passe"
      >
        <KeyRound className="h-4 w-4" />
      </Button>
      <Dialog open={ouvert} onOpenChange={fermer}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Changer mon mot de passe</DialogTitle>
            <DialogDescription>Au moins {LONGUEUR_MIN} caractères.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Mot de passe actuel</Label>
              <PasswordInput value={ancien} onChange={e => setAncien(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Nouveau mot de passe</Label>
              <PasswordInput value={nouveau} onChange={e => setNouveau(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Confirmer le nouveau mot de passe</Label>
              <PasswordInput value={confirmation} onChange={e => setConfirmation(e.target.value)} className="mt-1" />
            </div>
            {erreur && <p className="text-sm text-destructive">{erreur}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => fermer(false)} disabled={enCours}>Annuler</Button>
            <Button onClick={valider} disabled={enCours || !ancien || !nouveau || !confirmation}>
              {enCours ? 'Modification…' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
