// ─────────────────────────────────────────────────────────────────────────────
// NOUVEAU DEVOIR, DEPUIS L'ESPACE PÉDAGOGIQUE
//
// Un devoir se construit sur le contenu d'un chapitre (QCM, cas pratiques).
// Pour en créer un, il fallait ouvrir Mes cours, l'UE, le chapitre, puis
// descendre jusqu'au bas d'un long texte. Ici, on choisit l'UE et le chapitre
// dans une liste, et le chapitre s'ouvre directement sur le formulaire.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'
import { ClipboardPlus, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { MODULES } from '@/content/modules'
import { navigate } from '@/lib/hashLocation'
import { cn } from '@/lib/utils'

export default function NouveauDevoir() {
  const [ouvert, setOuvert] = useState(false)
  const [ue, setUe] = useState(MODULES[0]?.ue ?? '')
  const module = MODULES.find(m => m.ue === ue)

  return (
    <>
      <Button size="sm" className="gap-1.5" onClick={() => setOuvert(true)}>
        <ClipboardPlus className="h-4 w-4" /> Nouveau devoir
      </Button>
      <Dialog open={ouvert} onOpenChange={setOuvert}>
        <DialogContent className="max-w-lg flex flex-col max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Nouveau devoir</DialogTitle>
            <DialogDescription>Choisissez le cours puis le chapitre : ses QCM et ses cas pratiques servent de base au devoir.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-1.5">
            {MODULES.map(m => (
              <button
                key={m.ue}
                onClick={() => setUe(m.ue)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full border transition-colors',
                  m.ue === ue ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted',
                )}
              >
                UE {m.numeroUE} · {m.titre}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto -mx-1 px-1 space-y-1">
            {module?.chapitres.map((c, i) => (
              <button
                key={i}
                onClick={() => { setOuvert(false); navigate(`/${module.ue}/chapitre-${i + 1}?vue=devoir`) }}
                className="w-full text-left flex items-center gap-3 rounded-md border border-border px-3 py-2.5 hover:bg-muted/50 transition-colors"
              >
                <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-foreground">{c.titre}</span>
                  <span className="block text-xs text-muted-foreground truncate">{c.reperes}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
