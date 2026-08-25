import React, { useState, useEffect } from 'react'
import { User } from '@/lib/db'
import { loginAsync, createUserAsync } from '@/lib/db-firebase'
import { setFirestoreErrorSuppressed } from '@/lib/firestoreErrorHandler'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Eye, EyeOff, KeyRound, UserPlus } from 'lucide-react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getApp } from 'firebase/app'

interface LoginPageProps {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'rejoindre'>('login')

  // Formulaire rejoindre une classe
  const [joinCode, setJoinCode] = useState('')
  const [joinNom, setJoinNom] = useState('')
  const [joinPostnom, setJoinPostnom] = useState('')
  const [joinUsername, setJoinUsername] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinShowPwd, setJoinShowPwd] = useState(false)
  const [joinStep, setJoinStep] = useState<'code' | 'form'>('code')
  const [joinCodeData, setJoinCodeData] = useState<any>(null)
  const [joinLoading, setJoinLoading] = useState(false)
  const [joinError, setJoinError] = useState('')
  const [joinSuccess, setJoinSuccess] = useState(false)

  // Génération automatique identifiant + MDP
  const normaliser = (s: string) =>
    s.trim().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]/g, '')

  const genererIdentifiants = (nom: string, postnom: string) => {
    const n = normaliser(nom)
    const p = normaliser(postnom)
    if (!n || !p) return
    // Simple suggestion - pas de numéro d'ordre fiable calculable ici : cette page
    // n'est pas encore authentifiée, et firestore.rules exige isAuth() pour lire
    // `users` (un ancien essai de comptage échouait donc systématiquement et
    // silencieusement). L'identifiant est explicitement présenté comme modifiable
    // ci-dessous, et handleJoinSubmit rejette désormais toute collision avec un
    // compte existant (voir createUserAsync) au lieu de l'écraser silencieusement -
    // l'utilisateur devra alors ajuster ce champ, comme déjà indiqué à l'écran.
    setJoinUsername(`${n}.${p}`)
    setJoinPassword(`${n.charAt(0)}${p}1`)
  }

  useEffect(() => {
    // Déclenche les animations après le montage
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleVerifyCode = async () => {
    setJoinError('')
    const code = joinCode.trim().toUpperCase()
    if (code.length < 6) { setJoinError('Code invalide. Vérifiez et réessayez.'); return }
    setJoinLoading(true)
    try {
      const db2 = getFirestore(getApp())
      const snap = await getDoc(doc(db2, 'codesAcces', code))
      if (!snap.exists()) { setJoinError('Code introuvable. Vérifiez le code fourni par votre professeur.'); setJoinLoading(false); return }
      const data = snap.data()
      if (!data.actif) { setJoinError('Ce code n’est plus actif. Contactez votre professeur.'); setJoinLoading(false); return }
      setJoinCodeData(data)
      setJoinStep('form')
    } catch {
      setJoinError('Erreur réseau. Réessayez.')
    }
    setJoinLoading(false)
  }

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setJoinError('')
    if (!joinNom.trim() || !joinPostnom.trim() || !joinUsername.trim() || !joinPassword.trim()) {
      setJoinError('Nom, post-nom, identifiant et mot de passe sont obligatoires.')
      return
    }
    setJoinLoading(true)
    try {
      const codeData = joinCodeData
      await createUserAsync({
        username: joinUsername.trim().toLowerCase(),
        password: joinPassword.trim(),
        nom: joinNom.trim(),
        prenom: joinPostnom.trim(),
        role: 'etudiant',
        actif: false,
        statutInscription: 'en_attente',
        universiteId: codeData.universiteId || undefined,
        faculteId: codeData.faculteId || undefined,
        classe: codeData.classe || undefined,
        coursIds: codeData.coursIds?.length > 0 ? codeData.coursIds : codeData.coursId ? [codeData.coursId] : undefined,
        createdBy: codeData.createdBy || '',
      } as any)
      setJoinSuccess(true)
    } catch (err: any) {
      const msg = err?.message || ''
      if (msg.includes('déjà') || msg.includes('already')) {
        setJoinError('Cet identifiant est déjà utilisé. Choisissez-en un autre.')
      } else {
        setJoinError('Erreur lors de la création : ' + (msg || 'inconnue'))
      }
    }
    setJoinLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Une connexion réussie fait basculer instantanément le contexte d'authentification
    // Firestore : les onSnapshot() montés par le tableau de bord juste après peuvent
    // essuyer un refus transitoire le temps que le nouveau jeton d'auth se propage -
    // ce n'est pas une coupure réseau. Même fenêtre de suppression que pour le logout
    // (App.tsx), refermée par onAuthStateChanged une fois la session confirmée.
    setFirestoreErrorSuppressed(true)
    try {
      const user = await loginAsync(username.trim(), password)
      if (user) {
        onLogin(user)
      } else {
        setFirestoreErrorSuppressed(false)
        setError("Nom d'utilisateur ou mot de passe incorrect.")
        setLoading(false)
      }
    } catch (err: any) {
      setFirestoreErrorSuppressed(false)
      const msg = err?.message || ''
      if (msg === 'COMPTE_EN_ATTENTE') {
        setError("Votre inscription est en attente de validation par votre professeur. Réessayez une fois votre compte validé.")
      } else if (msg === 'COMPTE_REFUSE') {
        setError("Votre inscription a été refusée. Contactez votre professeur pour plus d'informations.")
      } else if (msg === 'COMPTE_INACTIF') {
        setError("Ce compte est suspendu. Contactez votre professeur.")
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect.")
      }
      setLoading(false)
    }
  }

  // Classes communes pour les transitions d'entrée
  const base = 'transition-all duration-700 ease-out'
  const show = 'opacity-100 translate-y-0'
  const hide = 'opacity-0 translate-y-6'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">

      {/* ── Motif de fond décoratif ──────────────────────────────────────────
          Thème blanc conservé, rien à gauche (desktop et mobile) : deux aplats
          doux + arcs elliptiques fins, à peine perceptibles.
          Chaque coin est un bloc indépendant ancré en CSS (top-right /
          bottom-left), plutôt qu'un seul SVG à viewBox large en "slice" : ce
          dernier, pensé pour un écran large, ne montrait presque rien sur un
          écran mobile étroit et haut - le "slice" ne conservait que la bande
          centrale du viewBox et coupait les deux coins où vivait le motif. */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Aplats doux, en dérive très lente */}
        <div className="absolute -top-16 -right-16 h-64 w-64 sm:h-96 sm:w-96 rounded-full opacity-80 animate-driftBlob motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #DCE8FC, #EAF1FC)' }} />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full opacity-80 animate-driftBlob motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, #DCE8FC, #EAF1FC)', animationDelay: '5s' }} />

        {/* Anneaux en rotation - les ellipses sont centrées dans leur viewBox,
            la rotation CSS du <svg> pivote donc autour de leur propre centre.
            Le point posé sur l'anneau extérieur décrit une orbite : d'où le nom
            du produit. Mouvement volontairement très lent (60 et 90 s/tour),
            et coupé net si l'utilisateur a demandé moins d'animations. */}
        <svg className="absolute -top-28 -right-28 h-72 w-72 sm:h-[26rem] sm:w-[26rem] animate-orbitRotate motion-reduce:animate-none"
          viewBox="0 0 300 300">
          <defs>
            <linearGradient id="orbitArcGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E4FAE" />
              <stop offset="100%" stopColor="#5B9BF5" />
            </linearGradient>
          </defs>
          <g stroke="url(#orbitArcGrad1)" fill="none">
            <ellipse cx="150" cy="150" rx="130" ry="80" opacity=".5" strokeWidth="2" />
            <ellipse cx="150" cy="150" rx="95" ry="58" opacity=".34" strokeWidth="1.6" />
          </g>
          <circle cx="280" cy="150" r="5" fill="#1E4FAE" opacity=".55" />
        </svg>

        <svg className="absolute -bottom-24 -left-24 h-64 w-64 sm:h-80 sm:w-80 animate-orbitRotateReverse motion-reduce:animate-none"
          viewBox="0 0 300 300">
          <defs>
            <linearGradient id="orbitArcGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E4FAE" />
              <stop offset="100%" stopColor="#5B9BF5" />
            </linearGradient>
          </defs>
          <g stroke="url(#orbitArcGrad2)" fill="none">
            <ellipse cx="150" cy="150" rx="110" ry="68" opacity=".4" strokeWidth="1.8" />
          </g>
          <circle cx="260" cy="150" r="4" fill="#1E4FAE" opacity=".45" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">

        {/* Logo + wordmark : au-dessus de la carte, toujours visible (desktop et mobile) */}
        <div className={`flex flex-col items-center mb-8 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '100ms' }}>
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-primary flex items-center justify-center overflow-hidden ring-2 ring-primary/30">
              <img
                src="./assets/orbit-mark.svg"
                alt="Orbit"
                className="w-12 h-12"
                onError={e => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  const p = el.parentElement
                  if (p) p.innerHTML = '<span class="text-white font-bold text-2xl">O</span>'
                }}
              />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-primary">Orbit</h1>
        </div>

        {/* Card formulaire */}
        <div
          className={`w-full ${base} ${mounted ? show : hide}`}
          style={{ transitionDelay: '250ms' }}
        >
          {/* Onglets Connexion / Rejoindre */}
          <div className={`flex gap-1 p-1 bg-muted rounded-lg mb-6 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '280ms' }}>
            <button
              type="button"
              onClick={() => setLoginMode('login')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm rounded-md font-medium transition-colors ${ loginMode === 'login' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground' }`}
            >
              <KeyRound className="h-3.5 w-3.5" /> Connexion
            </button>
            <button
              type="button"
              onClick={() => setLoginMode('rejoindre')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm rounded-md font-medium transition-colors ${ loginMode === 'rejoindre' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground' }`}
            >
              <UserPlus className="h-3.5 w-3.5" /> Rejoindre
            </button>
          </div>

          {/* ══ MODE CONNEXION ══ */}
          {loginMode === 'login' && <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className={`space-y-2 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '400ms' }}>
              <Label htmlFor="username" className="text-sm font-medium">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                placeholder=""
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                className="h-11 transition-shadow duration-200 focus:shadow-md"
              />
            </div>

            {/* Password */}
            <div className={`space-y-2 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '460ms' }}>
              <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10 transition-shadow duration-200 focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Voir le mot de passe'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20 animate-slideDown">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Bouton */}
            <div className={`${base} ${mounted ? show : hide}`} style={{ transitionDelay: '520ms' }}>
              <Button
                type="submit"
                className="w-full h-11 font-semibold text-base relative overflow-hidden group transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                disabled={loading}
              >
                {/* Effet shimmer au hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="relative">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Connexion en cours...
                    </span>
                  ) : 'Se connecter'}
                </span>
              </Button>
            </div>

            {/* Message pas de compte */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Pas encore de compte ? Contactez votre professeur pour obtenir vos identifiants ou utilisez l'onglet <strong>Rejoindre</strong>.
            </p>
          </form>}

          {/* ══ MODE REJOINDRE ══ */}
          {loginMode === 'rejoindre' && (
            <div className="space-y-4">
              {joinSuccess ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-3">
                  <div className="text-4xl">⏳</div>
                  <p className="font-semibold text-amber-800">Demande envoyée !</p>
                  <p className="text-sm text-amber-700">
                    Votre inscription a bien été reçue. Votre professeur doit valider votre compte avant que vous puissiez accéder au logiciel.
                  </p>
                  <p className="text-xs text-amber-600">
                    Une fois validé, connectez-vous avec l'identifiant et le mot de passe que vous venez de choisir.
                  </p>
                  <Button variant="outline" onClick={() => { setLoginMode('login'); setJoinSuccess(false); setJoinStep('code'); setJoinCode(''); setJoinNom(''); setJoinPostnom(''); setJoinUsername(''); setJoinPassword('') }} className="w-full">
                    Retour à la connexion
                  </Button>
                </div>
              ) : joinStep === 'code' ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rejoindre une classe</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Entrez le code fourni par votre professeur pour créer votre compte.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Code d'accès</Label>
                    <Input
                      value={joinCode}
                      onChange={e => setJoinCode(e.target.value.toUpperCase())}
                      placeholder=""
                      className="text-center text-lg font-mono tracking-widest h-12"
                      maxLength={10}
                      onKeyDown={e => e.key === 'Enter' && handleVerifyCode()}
                    />
                  </div>
                  {joinError && (
                    <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />{joinError}
                    </div>
                  )}
                  <Button onClick={handleVerifyCode} disabled={joinLoading || joinCode.trim().length < 6} className="w-full h-11">
                    {joinLoading ? 'Vérification...' : 'Vérifier le code'}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Déjà un compte ? <button type="button" className="text-primary underline" onClick={() => setLoginMode('login')}>Se connecter</button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <p className="text-xs text-green-700">✓ Code validé. Complétez vos informations.</p>
                    {joinCodeData?.classe && <p className="text-xs text-green-600 mt-0.5">Classe : {joinCodeData.classe}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Nom *</Label>
                      <Input
                        value={joinNom}
                        onChange={e => {
                          setJoinNom(e.target.value)
                          if (joinPostnom.trim()) genererIdentifiants(e.target.value, joinPostnom)
                        }}
                        onBlur={() => { if (joinNom.trim() && joinPostnom.trim()) genererIdentifiants(joinNom, joinPostnom) }}
                        placeholder=""
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label>Post-nom *</Label>
                      <Input
                        value={joinPostnom}
                        onChange={e => {
                          setJoinPostnom(e.target.value)
                          if (joinNom.trim()) genererIdentifiants(joinNom, e.target.value)
                        }}
                        onBlur={() => { if (joinNom.trim() && joinPostnom.trim()) genererIdentifiants(joinNom, joinPostnom) }}
                        placeholder=""
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  {/* Identifiant auto-généré : modifiable */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Identifiant *</Label>
                      {joinUsername && <span className="text-xs text-green-600 font-medium">✓ Généré automatiquement</span>}
                    </div>
                    <Input
                      value={joinUsername}
                      onChange={e => setJoinUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      placeholder=""
                      className="mt-1 font-mono"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-0.5">Format : nom.post-nom : modifiable si déjà pris.</p>
                  </div>
                  {/* Mot de passe auto-généré : visible, modifiable */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>Mot de passe *</Label>
                      {joinPassword && <span className="text-xs text-green-600 font-medium">✓ Généré automatiquement</span>}
                    </div>
                    <div className="relative mt-1">
                      <Input
                        type={joinShowPwd ? 'text' : 'password'}
                        value={joinPassword}
                        onChange={e => setJoinPassword(e.target.value)}
                        placeholder=""
                        className="pr-10 font-mono"
                        required
                      />
                      <button type="button" onClick={() => setJoinShowPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                        {joinShowPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Format : initiale + post-nom + numéro d'ordre. Notez-le bien !</p>
                  </div>
                  {joinError && (
                    <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />{joinError}
                    </div>
                  )}
                  <Button type="submit" disabled={joinLoading} className="w-full h-11">
                    {joinLoading ? 'Création en cours...' : 'Créer mon compte'}
                  </Button>
                  <button type="button" className="text-xs text-muted-foreground underline w-full text-center" onClick={() => { setJoinStep('code'); setJoinError(''); setJoinCodeData(null) }}>
                    ← Changer de code
                  </button>
                </form>
              )}
            </div>
          )}

          <div className={`text-center mt-8 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '600ms' }}>
            <p className="text-xs text-muted-foreground">Orbit © {new Date().getFullYear()}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Propriété de Manassé TANDU</p>
          </div>
        </div>
      </div>
    </div>
  )
}
