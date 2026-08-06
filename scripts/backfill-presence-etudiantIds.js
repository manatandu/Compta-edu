#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
//  CAMPUS OHADA — Backfill ponctuel : etudiantIds sur les présences
//  existantes (voir firestore.rules, bloc PRÉSENCES, et le correctif
//  PR #21 pour le contexte complet du bug corrigé).
//
//  Avant PR #21, les présences n'ont jamais pu être lues par un
//  étudiant (la règle vérifiait un champ 'etudiantId' plat qui n'a
//  jamais existé sur les documents réels — voir firestore.rules).
//  PR #21 corrige la lecture pour s'appuyer sur un nouveau champ
//  dérivé 'etudiantIds' (tableau plat), désormais maintenu par
//  createPresenceAsync()/updatePresenceAsync() à chaque écriture.
//
//  Les présences créées AVANT le déploiement de PR #21 n'ont pas ce
//  champ : ce script le calcule une fois pour toutes à partir du
//  champ 'etudiants' existant (etudiantIds = etudiants.map(e => e.etudiantId)).
//  Idempotent : peut être relancé sans risque, un document déjà à jour
//  est ignoré.
//
//  Usage :
//    1. S'authentifier avec un compte ayant accès au projet Firebase :
//         gcloud auth application-default login
//       (ou définir GOOGLE_APPLICATION_CREDENTIALS vers un fichier de
//       clé de compte de service ayant le rôle Cloud Datastore User)
//    2. npm install --no-save firebase-admin   (pas une dépendance
//       permanente du projet — installée à la demande pour ce script)
//    3. Aperçu sans écriture :
//         node scripts/backfill-presence-etudiantIds.js --dry-run
//    4. Exécution réelle :
//         node scripts/backfill-presence-etudiantIds.js
//    5. Optionnel : --project <id> pour cibler un projet Firebase
//       différent du défaut (.firebaserc → "campus-ohada")
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

  const snap = await db.collection('presences').get()
  console.log(`→ ${snap.size} présence(s) trouvée(s).`)

  let toUpdate = 0
  let alreadyOk = 0
  let skippedNoEtudiants = 0
  const batchSize = 400 // marge sous la limite de 500 écritures/batch Firestore
  let batch = db.batch()
  let opsInBatch = 0

  for (const doc of snap.docs) {
    const data = doc.data()
    const etudiants = Array.isArray(data.etudiants) ? data.etudiants : null
    if (!etudiants) {
      skippedNoEtudiants++
      console.warn(`  ⚠ ${doc.id} : pas de champ 'etudiants' exploitable, ignoré.`)
      continue
    }

    const computed = etudiants.map(e => e.etudiantId).filter(Boolean)
    const existing = Array.isArray(data.etudiantIds) ? data.etudiantIds : []
    const same = existing.length === computed.length && existing.every(id => computed.includes(id))
    if (same) {
      alreadyOk++
      continue
    }

    toUpdate++
    if (!DRY_RUN) {
      batch.update(doc.ref, { etudiantIds: computed })
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
  if (skippedNoEtudiants > 0) console.log(`⚠ Ignorés (sans 'etudiants') : ${skippedNoEtudiants}`)
  if (DRY_RUN) console.log('\nRelancer sans --dry-run pour appliquer.')
}

main().catch(err => {
  console.error('✗ Échec du backfill :', err)
  process.exit(1)
})
