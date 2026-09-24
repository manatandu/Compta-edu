import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// RENDU DE TEXTE EN LIGNE
//
// Les chapitres sont écrits en données : leurs paragraphes sont des chaînes de
// caractères, pas du JSX. Deux marqueurs légers suffisent à couvrir les besoins
// de mise en relief relevés dans les chapitres existants :
//   *italique*  → mise en relief discrète
//   **fort**    → valeur saillante (gras, couleur d'accent)
//
// Aucun HTML n'est interprété : le texte est découpé puis rendu en nœuds React,
// donc échappé par React. dangerouslySetInnerHTML n'est volontairement pas
// utilisé ici, le contenu des chapitres n'ayant aucune raison d'injecter du
// balisage arbitraire dans la page.
// ─────────────────────────────────────────────────────────────────────────────

// Le motif capture d'abord **fort** puis *italique* : l'ordre est significatif,
// une alternance inversée ferait consommer les doubles astérisques par le
// premier motif simple.
const MOTIF = /(\*\*[^*]+\*\*|\*[^*]+\*)/g

// Les montants sont saisis avec une espace ordinaire comme séparateur des
// milliers (« 666 667 »). Dans une cellule étroite, le navigateur peut couper
// le nombre à cet endroit ; l'espace fine insécable (U+202F), séparateur de la
// typographie française, garde chaque montant sur une seule ligne.
const SEPARATEUR_MILLIERS = /(\d) (?=\d{3}(?!\d))/g

function insecable(texte: string) {
  return texte.replace(SEPARATEUR_MILLIERS, '$1\u202F')
}

export function TexteEnrichi({ texte, classeFort }: { texte: string; classeFort?: string }) {
  const morceaux = insecable(texte).split(MOTIF).filter(m => m !== '')
  return (
    <>
      {morceaux.map((morceau, i) => {
        if (morceau.startsWith('**') && morceau.endsWith('**')) {
          return <strong key={i} className={classeFort}>{morceau.slice(2, -2)}</strong>
        }
        if (morceau.startsWith('*') && morceau.endsWith('*')) {
          return <em key={i}>{morceau.slice(1, -1)}</em>
        }
        return <React.Fragment key={i}>{morceau}</React.Fragment>
      })}
    </>
  )
}
