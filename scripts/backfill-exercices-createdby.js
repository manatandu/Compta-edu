#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
//  CAMPUS OHADA — Backfill ponctuel : createdBy sur les exercices
//  existants (voir firestore.rules, bloc EXERCICES, et le correctif
//  PR #31 pour le contexte complet du bug corrigé).
//
//  Avant PR #31, ExercicesPage.tsx créait un exercice sans jamais
//  renseigner 'createdBy'. La règle allow create: if isProf() ne
//  l'exigeait pas, donc la création réussissait — mais allow update,
//  delete: if isProf() && createdBy() échouait ensuite pour toujours
//  (resource.data.createdBy toujours undefined). Contrairement aux
//  bugs de création (cours/devoirs/documents, PR #28-30), il existe
//  donc probablement de VRAIS exercices en production dans cet état :
//  créés avec succès, mais définitivement verrouillés en modification
//  et suppression pour leur auteur.
//
//  Ce script calcule createdBy = userId (l'auteur de l'exercice, seul
//  champ fiable déjà présent sur tout document réel) une fois pour
//  toutes sur les documents qui n'ont pas encore createdBy. Idempotent :
//  peut être relancé sans risque, un document déjà à jour est ignoré.
//
//  Usage : identique à scripts/backfill-presence-etudiantIds.js
//    1. gcloud auth application-default login
//       (ou GOOGLE_APPLICATION_CREDENTIALS vers une clé de service)
//    2. npm install --no-save firebase-admin
//    3. node scripts/backfill-exercices-createdby.js --dry-run
//    4. node scripts/backfill-exercices-createdby.js
//    5. Optionnel : --project <id>
// ═══════════════════════════════════════════════════════════════════

const DRY_RUN = process.argv.includes('--dry-run')
const projectArgIndex = process.argv.indexOf('--project')
const projectId = projectArgIndex !== -1 ? process.argv[projectArgIndex + 1] : undefined

async function main() {
  const admin = require('firebase-admin')
  admin.initializeApp(projectId ? { projectId } : undefined)
  const db = admin.firestore()

  console.log(`→ Projet Firebase : ${projectId || '(défaut des identifiants ambiants)'}`)
  console.log(DRY_RUN ? '→ Mode aperçu (--dry-run) : aucune écriture ne sera faite.\n' : '→ Mode réel : les documents seront mis à jour.\n')

  const snap = await db.collection('exercices').get()
  console.log(`→ ${snap.size} exercice(s) trouvé(s).`)

  let toUpdate = 0
  let alreadyOk = 0
  let skippedNoUserId = 0
  const batchSize = 400
  let batch = db.batch()
  let opsInBatch = 0

  for (const doc of snap.docs) {
    const data = doc.data()
    if (data.createdBy) {
      alreadyOk++
      continue
    }
    if (!data.userId) {
      skippedNoUserId++
      console.warn(`  ⚠ ${doc.id} : ni createdBy ni userId exploitable, ignoré.`)
      continue
    }

    toUpdate++
    if (!DRY_RUN) {
      batch.update(doc.ref, { createdBy: data.userId })
      opsInBatch++
      if (opsInBatch >= batchSize) {
        await batch.commit()
        batch = db.batch()
        opsInBatch = 0
      }
    }
  }

  if (!DRY_RUN && opsInBatch > 0) {
    await batch.commit()
  }

  console.log('')
  console.log(`✓ Déjà à jour     : ${alreadyOk}`)
  console.log(`✓ ${DRY_RUN ? 'À mettre à jour' : 'Mis à jour'} : ${toUpdate}`)
  if (skippedNoUserId > 0) console.log(`⚠ Ignorés (sans 'userId') : ${skippedNoUserId}`)
  if (DRY_RUN) console.log('\nRelancer sans --dry-run pour appliquer.')
}

main().catch(err => {
  console.error('✗ Échec du backfill :', err)
  process.exit(1)
})
