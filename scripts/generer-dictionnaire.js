#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
//  ORBIT — Génération du dictionnaire depuis les sources officielles
//
//  Le dictionnaire n'est plus écrit à la main : chaque définition est
//  extraite d'un texte de référence et porte sa citation. Ce script est
//  la seule façon de régénérer client/src/data/dictionnaire-audcif.ts —
//  ne pas modifier ce fichier à la main, il serait écrasé.
//
//  Source : Acte uniforme OHADA relatif au droit comptable et à
//  l'information financière (AUDCIF), Titre VI — « Définitions des
//  termes », 593 termes. C'est le glossaire officiel de l'OHADA :
//  la référence qui fait foi pour tout le vocabulaire comptable.
//
//  Usage :
//    node scripts/generer-dictionnaire.js <chemin-du-titre-6>
//  où <chemin-du-titre-6> est le dossier references/titre-6-definitions-termes
//  du skill audcif-acte-uniforme.
// ═══════════════════════════════════════════════════════════════════
const fs = require('fs')
const path = require('path')

const src = process.argv[2]
if (!src || !fs.existsSync(src)) {
  console.error('Usage : node scripts/generer-dictionnaire.js <dossier titre-6-definitions-termes>')
  process.exit(1)
}

// Les lettres A à Z (05-a.md .. 27-z.md). On écarte index, préambule,
// présentation, note de transcription et le chapitre « écarts ».
const fichiers = fs.readdirSync(src)
  .filter(f => /^(0[5-9]|1\d|2[0-7])-[a-z]\.md$/.test(f))
  .sort()

const slug = s => s
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 60)

// Domaine déduit du LIBELLÉ du terme uniquement — jamais du corps de la
// définition. Chercher ces mots dans le corps donnait des faux positifs en
// masse : « ratio » est contenu dans « opé-ratio-ns », ce qui classait en
// finance des termes comme « Abandons de créances ». Par défaut
// « comptabilite » : c'est un glossaire comptable, le reste est l'exception.
function domaineDe(nom) {
  const t = nom.toLowerCase()
  if (/\bifrs\b|\bias\b|juste valeur|norme internationale/.test(t)) return 'normes-ifrs'
  if (/commissaire aux comptes|\baudit\b|contrôle interne|révision des comptes/.test(t)) return 'audit'
  if (/\bratios?\b|rentabilité|autofinancement|fonds de roulement|besoin de financement|besoin en fonds|trésorerie nette|effet de levier|capacité d'endettement|solvabilité|liquidité générale/.test(t)) return 'finance'
  return 'comptabilite'
}

// UE où le terme est enseigné (moduleKey de COURS_SYSTEME). Une liste vide
// signifie « socle commun », présent dans plusieurs cours sans appartenir
// à l'un d'eux en particulier.
function uesDe(nom, domaine) {
  const t = nom.toLowerCase()
  const ues = new Set()
  if (/consolid|combinaison|périmètre de|intégration globale|intégration proportionnelle|mise en équivalence|écart d'acquisition|écart de première consolidation/.test(t)) ues.add('ue8-consolidation')
  if (domaine === 'normes-ifrs') ues.add('ue13-ifrs-ias')
  if (domaine === 'finance') ues.add('analyse-financiere')
  if (domaine === 'audit') ues.add('ue12-audit')
  if (/fusion|scission|apport partiel|absorption|capital social|action|dividende|obligation convertible/.test(t)) ues.add('ue3-compta-societes')
  return [...ues]
}

const vus = new Map()
const termes = []

for (const f of fichiers) {
  const txt = fs.readFileSync(path.join(src, f), 'utf8')
  const blocs = txt.split(/^### /m).slice(1)
  for (const bloc of blocs) {
    const lignes = bloc.split('\n')
    const nom = lignes[0].trim()
    let corps = lignes.slice(1).join('\n').trim()
    if (!nom) continue

    // Les notes de transcription du skill signalent une coquille du texte
    // officiel. Elles n'ont pas leur place dans une définition affichée.
    corps = corps.replace(/`?\[texte officiel[^\]]*\]`?/g, '').trim()
    corps = corps.replace(/\n{3,}/g, '\n\n')
    if (!corps) continue

    // « Voir « X ». » : ce n'est pas une définition mais un renvoi.
    const renvoi = corps.match(/^Voir\s+«\s*([^»]+)\s*»\.?$/i)

    let id = slug(nom)
    if (vus.has(id)) { const n = vus.get(id) + 1; vus.set(id, n); id = `${id}-${n}` }
    else vus.set(id, 1)

    const domaine = domaineDe(nom)
    termes.push({
      id,
      terme: nom,
      domaine,
      ues: uesDe(nom, domaine),
      definition: corps,
      source: 'AUDCIF, Titre VI — Définitions des termes',
      voirAussi: renvoi ? [slug(renvoi[1])] : undefined,
      renvoiSeul: !!renvoi,
    })
  }
}

const esc = s => JSON.stringify(s)
const lignes = termes.map(t => {
  const champs = [
    `    id: ${esc(t.id)}`,
    `    terme: ${esc(t.terme)}`,
    `    domaine: ${esc(t.domaine)}`,
    `    ues: ${JSON.stringify(t.ues)}`,
    `    definition: ${esc(t.definition)}`,
    `    source: ${esc(t.source)}`,
  ]
  if (t.voirAussi) champs.push(`    voirAussi: ${JSON.stringify(t.voirAussi)}`)
  return `  {\n${champs.join(',\n')},\n  }`
}).join(',\n')

const sortie = `// ═══════════════════════════════════════════════════════════════════
//  FICHIER GÉNÉRÉ — NE PAS MODIFIER À LA MAIN
//
//  Régénérer avec :
//    node scripts/generer-dictionnaire.js <references/titre-6-definitions-termes>
//
//  Source : AUDCIF (Acte uniforme OHADA relatif au droit comptable et à
//  l'information financière), Titre VI — « Définitions des termes ».
//  Glossaire officiel de l'OHADA : ${termes.length} termes.
//
//  Les notes de transcription du texte source ont été retirées ; le
//  libellé et la définition restent ceux du texte officiel.
// ═══════════════════════════════════════════════════════════════════
import type { TermeDict } from './dictionnaire'

export const TERMES_AUDCIF: TermeDict[] = [
${lignes},
]
`

const dest = path.join(__dirname, '..', 'client', 'src', 'data', 'dictionnaire-audcif.ts')
fs.writeFileSync(dest, sortie)
console.log(`${termes.length} termes écrits dans ${path.relative(process.cwd(), dest)}`)
const parDomaine = {}
for (const t of termes) parDomaine[t.domaine] = (parDomaine[t.domaine] || 0) + 1
console.log('Répartition :', parDomaine)
