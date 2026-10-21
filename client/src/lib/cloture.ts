// Date de clôture proposée par défaut pour les écritures d'inventaire (écarts
// de conversion, intérêts courus, disponibilités en devises) : le 31 décembre
// de l'exercice, et non la date du jour. AUDCIF, Titre VI (glossaire) : « la
// date de clôture des exercices comptables est fixée au 31 décembre de chaque
// année ». dateIso : une date de l'exercice visé (date de la facture...) ;
// à défaut, l'exercice en cours.
export function dateClotureExercice(dateIso?: string): string {
  const annee = dateIso && /^\d{4}/.test(dateIso) ? dateIso.slice(0, 4) : String(new Date().getFullYear())
  return `${annee}-12-31`
}
