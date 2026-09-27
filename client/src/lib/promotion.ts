// ─────────────────────────────────────────────────────────────────────────────
// PROMOTION : UNE SEULE FAÇON DE LA COMPARER
//
// La promotion d'un étudiant (champ `classe` de son profil) était saisie de
// deux manières : une liste L1…M2 à l'inscription par code ou par lot, un
// champ libre dans l'Espace pédagogique (« ex: L1 Comptabilité ») et dans
// l'import CSV. Les devoirs, notes de cours et documents, eux, ciblent un
// code de la liste. La comparaison stricte « L1 » === « L1 Comptabilité »
// échouait : le devoir restait invisible pour l'étudiant, la note de cours
// aussi.
//
// Toute comparaison de promotion passe désormais par ce module, qui ramène
// une valeur saisie à son code (L1, L2, L3, M1, M2).
// ─────────────────────────────────────────────────────────────────────────────
import { PROMOTIONS, type Promotion } from './db'

// Code de promotion contenu au début d'une valeur saisie : « L1 Comptabilité »,
// « l1 », « L1-Compta » donnent L1. Chaîne vide si la valeur n'en contient pas.
export function codePromotion(valeur?: string | null): Promotion | '' {
  const m = (valeur || '').trim().toUpperCase().match(/^([LM]\d)(?!\d)/)
  const code = m?.[1] as Promotion | undefined
  return code && (PROMOTIONS as readonly string[]).includes(code) ? code : ''
}

// Forme comparable d'une valeur : son code s'il en a un, sinon la valeur
// elle-même (majuscules, sans espaces autour) pour ne rien confondre.
function forme(valeur?: string | null): string {
  return codePromotion(valeur) || (valeur || '').trim().toUpperCase()
}

// Un contenu destiné à la promotion `cible` concerne-t-il un étudiant de la
// promotion `promotionEtudiant` ?
// - pas de cible : destiné à toutes les promotions du cours ;
// - étudiant dont la promotion n'est pas renseignée : pas de filtre, faute de
//   pouvoir trancher (comportement déjà retenu par les devoirs et les notes) ;
// - sinon les deux codes doivent être identiques.
export function promotionCorrespond(cible?: string | null, promotionEtudiant?: string | null): boolean {
  const c = forme(cible)
  const e = forme(promotionEtudiant)
  return !c || !e || c === e
}

// Libellé de regroupement pour les filtres « Promotion » des écrans enseignant :
// les variantes d'une même promotion (« L1 », « L1 Comptabilité ») forment un
// seul groupe.
export function libellePromotion(valeur?: string | null): string {
  return codePromotion(valeur) || (valeur || '').trim()
}
