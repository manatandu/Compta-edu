// Compte administrateur fictif sur les émulateurs (base vide au départ).
// Firestore est écrit avec le jeton « owner », qui ne vaut que sur l'émulateur.
const AUTH = 'http://127.0.0.1:9099'
const FS = 'http://127.0.0.1:8080/v1/projects/campus-ohada/databases/(default)/documents'

const res = await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=emulateur`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin.test@campus-ohada.app', password: 'Admin-Test-2026', returnSecureToken: true }),
})
const compte = await res.json()
if (!compte.localId) { console.error('Création du compte refusée :', compte); process.exit(1) }

const champs = {
  username: { stringValue: 'admin.test' }, nom: { stringValue: 'ADMIN' }, prenom: { stringValue: 'Test' },
  role: { stringValue: 'admin' }, actif: { booleanValue: true }, dateCreation: { stringValue: new Date().toISOString() },
}
const r = await fetch(`${FS}/users/${compte.localId}`, {
  method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
  body: JSON.stringify({ fields: champs }),
})
if (!r.ok) { console.error('Profil refusé :', await r.text()); process.exit(1) }
console.log('Administrateur fictif créé :', compte.localId)
