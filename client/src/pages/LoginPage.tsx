import React, { useState, useEffect } from 'react'
import { User } from '@/lib/db'
import { loginAsync, createUserAsync } from '@/lib/db-firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Moon, Sun, AlertCircle, BookOpen, GraduationCap, BarChart2, Sparkles, Eye, EyeOff, KeyRound, UserPlus } from 'lucide-react'
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore'
import { getApp } from 'firebase/app'

interface LoginPageProps {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('dwac_theme') === 'dark')
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

  const genererIdentifiants = async (nom: string, postnom: string) => {
    const n = normaliser(nom)
    const p = normaliser(postnom)
    if (!n || !p) return
    const username = `${n}.${p}`
    // Compter tous les étudiants dans Firestore pour le numéro d'ordre
    try {
      const db2 = getFirestore(getApp())
      const snap = await getDocs(collection(db2, 'users'))
      const nbTotal = snap.docs.filter(d => d.data().role === 'etudiant').length
      const ordre = nbTotal + 1
      const mdp = `${n.charAt(0)}${p}${ordre}`
      setJoinUsername(username)
      setJoinPassword(mdp)
    } catch {
      // fallback sans numéro d'ordre
      setJoinUsername(username)
      setJoinPassword(`${n.charAt(0)}${p}1`)
    }
  }

  useEffect(() => {
    // Déclenche les animations après le montage
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('dwac_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('dwac_theme', 'light')
    }
  }, [isDark])

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
    try {
      const user = await loginAsync(username.trim(), password)
      if (user) {
        onLogin(user)
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect.")
        setLoading(false)
      }
    } catch (err: any) {
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
    <div className="min-h-screen bg-background flex overflow-hidden relative">

      {/* ── Panneau gauche décoratif (desktop) ────────────────────────────── */}
      <div className={`hidden lg:flex flex-col justify-between w-[420px] shrink-0 relative overflow-hidden
        bg-gradient-to-br from-[#1a3272] via-[#1e3d8f] to-[#0f2456]
        ${base} ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
        style={{ transitionDuration: '600ms' }}
      >
        {/* Orbes décoratifs */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#c88b0a]/25 animate-heroOrb" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-blue-400/10 animate-heroOrb" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 right-8 h-20 w-20 rounded-full bg-white/8 animate-float" style={{ animationDelay: '1s' }} />

        {/* Grille subtile */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Header panneau */}
        <div className="relative z-10 p-10">
          <div className={`flex items-center gap-3 mb-12 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '200ms' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#c88b0a]/30 animate-pulseGlow" />
              <div className="relative h-14 w-14 rounded-2xl bg-white/10 ring-2 ring-white/20 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                <img
                  src="./assets/campus-ohada-logo.svg"
                  alt="CAMPUS OHADA"
                  className="w-12 h-12 animate-float"
                  style={{ animationDelay: '0.5s' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-tight">CAMPUS OHADA</p>
              <p className="text-blue-300 text-xs">SYSCOHADA Révisé</p>
            </div>
          </div>

          <div className={`${base} ${mounted ? show : hide}`} style={{ transitionDelay: '350ms' }}>
            <h2 className="text-3xl font-bold text-white leading-snug">
              La comptabilité <br />
              <span className="text-[#c88b0a]">OHADA</span> simplifiée
            </h2>
            <p className="text-blue-200 mt-3 text-sm leading-relaxed">
              Pratiquez, apprenez et maîtrisez la comptabilité générale selon le référentiel SYSCOHADA Révisé.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="relative z-10 p-10 space-y-3">
          {[
            { icon: BookOpen,      label: 'Journal comptable & Grand Livre',   delay: '450ms' },
            { icon: BarChart2,     label: 'Balance, Bilan & États financiers', delay: '550ms' },
            { icon: GraduationCap, label: 'Exercices pédagogiques corrigés',   delay: '650ms' },
          ].map(f => {
            const Icon = f.icon
            return (
              <div
                key={f.label}
                className={`flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 border border-white/10 backdrop-blur-sm ${base} ${mounted ? show : hide}`}
                style={{ transitionDelay: f.delay }}
              >
                <div className="h-8 w-8 rounded-lg bg-[#c88b0a]/20 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-[#c88b0a]" />
                </div>
                <span className="text-sm text-blue-100 font-medium">{f.label}</span>
              </div>
            )
          })}
          <p className="text-blue-400 text-xs pt-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#c88b0a]" />
            CAMPUS OHADA © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* ── Panneau droit : formulaire ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark
            ? <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
            : <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
          }
        </Button>

        {/* Logo mobile uniquement */}
        <div className={`lg:hidden flex flex-col items-center mb-8 ${base} ${mounted ? show : hide}`} style={{ transitionDelay: '100ms' }}>
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulseGlow" />
            <div className="relative h-16 w-16 rounded-2xl bg-primary flex items-center justify-center overflow-hidden ring-2 ring-primary/30">
              <img
                src="./assets/campus-ohada-logo.svg"
                alt="CAMPUS OHADA"
                className="w-14 h-14"
                onError={e => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                  const p = el.parentElement
                  if (p) p.innerHTML = '<span class="text-white font-bold text-2xl">CO</span>'
                }}
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">CAMPUS OHADA</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Comptabilité SYSCOHADA Révisé</p>
        </div>

        {/* Card formulaire */}
        <div
          className={`w-full max-w-sm ${base} ${mounted ? show : hide}`}
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
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center space-y-3">
                  <div className="text-4xl">⏳</div>
                  <p className="font-semibold text-amber-800 dark:text-amber-300">Demande envoyée !</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Votre inscription a bien été reçue. Votre professeur doit valider votre compte avant que vous puissiez accéder au logiciel.
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">
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
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                    <p className="text-xs text-green-700 dark:text-green-400">✓ Code validé. Complétez vos informations.</p>
                    {joinCodeData?.classe && <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">Classe : {joinCodeData.classe}</p>}
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
                      {joinUsername && <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Généré automatiquement</span>}
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
                      {joinPassword && <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Généré automatiquement</span>}
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
            <p className="text-xs text-muted-foreground">CAMPUS OHADA © {new Date().getFullYear()} : SYSCOHADA Révisé</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">Propriété de Manassé TANDU</p>
          </div>
        </div>
      </div>
    </div>
  )
}
