import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue à sélection unique, groupé par section légale, sans champ de
// recherche : les catalogues sont courts (quelques dizaines de postes au plus)
// et un étudiant qui découvre l'article gagne à parcourir la liste plutôt qu'à
// filtrer un texte qu'il ne connaît pas encore. Un poste déjà ajouté à la
// liste de saisie est grisé et non cliquable - impossible de l'ajouter deux
// fois - au même titre qu'un poste hors champ (`excluded`).
//
// Source unique, partagée entre FiscalitePage.tsx (Cat1Salaires et les autres
// catégories IRPP/IS) et ChargesPersonnelIPRPage.tsx (UE9 Module 6) : les deux
// pages calculent et présentent le même IRPP Cat. 1, elles doivent avoir la
// même interface de saisie par catalogue.
// ─────────────────────────────────────────────────────────────────────────────

// Un poste de catalogue est soit un simple libellé (Cat. 2/3/4 : la loi ne lui
// attache pas de code), soit un couple { code, label } (comptes SYSCOHADA du
// plan - Cat. 1, réintégrations/déductions IS) : dans ce second cas le code
// s'affiche en préfixe, mais la sélection et l'anti-doublon se font toujours
// sur le libellé.
export type ItemCatalogue = string | { code: string; label: string }
export interface SectionCatalogue { cat: string; color: string; excluded?: boolean; items: ItemCatalogue[] }

export function libelleItem(item: ItemCatalogue): string {
  return typeof item === 'string' ? item : item.label
}

export function CatalogueGroupe({ sections, onSelect, selected = [] }: {
  sections: SectionCatalogue[]
  onSelect: (item: ItemCatalogue) => void
  /** Libellés déjà présents dans la liste de saisie : ces postes sont grisés. */
  selected?: string[]
}) {
  return (
    <details className="group">
      <summary className="cursor-pointer text-xs text-primary font-medium hover:underline flex items-center gap-1 select-none list-none mt-1">
        <span className="group-open:rotate-90 transition-transform inline-block text-xs">▶</span>
        Catalogue : cliquer pour ajouter
      </summary>
      <div className="mt-2 rounded-lg border border-border bg-muted/20 p-2.5 space-y-2 animate-slideUp">
        <p className="text-xs text-muted-foreground italic">Cliquez sur un élément pour l'ajouter à la liste ci-dessus, puis saisissez le montant.</p>
        {sections.map((section, si) => (
          <div key={si}>
            {section.cat && <p className={`text-xs font-semibold mb-1 ${section.color}`}>{section.cat}</p>}
            <div className="flex flex-wrap gap-1">
              {section.items.map((item, ii) => {
                const label = libelleItem(item)
                const dejaAjoute = !section.excluded && selected.includes(label)
                const bloque = section.excluded || dejaAjoute
                return (
                  <button key={ii}
                    disabled={bloque}
                    onClick={() => { if (!bloque) onSelect(item) }}
                    className={cn(
                      'text-xs px-2 py-1 rounded-lg border transition-all duration-200 ease-out',
                      section.excluded
                        ? 'border-red-200 text-red-400 bg-red-50 cursor-not-allowed opacity-60'
                        : dejaAjoute
                          ? 'border-border text-muted-foreground bg-muted/50 cursor-not-allowed opacity-60'
                          : section.color.includes('amber')
                            ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:scale-105 cursor-pointer'
                            : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:scale-105 cursor-pointer'
                    )}>
                    {section.excluded ? '✕ ' : dejaAjoute ? '✓ ' : '+ '}
                    {typeof item === 'object' && <span className="font-mono opacity-70">{item.code} </span>}
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </details>
  )
}
