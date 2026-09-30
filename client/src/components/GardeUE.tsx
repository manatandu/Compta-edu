import { useSearch } from 'wouter'
import CoursVerrouille from '@/components/CoursVerrouille'
import { useAccesCours } from '@/lib/accesCours'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'
import { isStudentRole } from '@/lib/permissions'

// Pages rattachées à une UE hors du sommaire des modules rédigés :
// Fiscalité (UE 4), Comptabilité générale (UE 9) et ses outils (journal,
// documents et états financiers, immobilisations, stock, factures, IRPP,
// emprunts, plan comptable). Elles étaient ouvertes à tout étudiant connecté,
// alors que Mes cours les montrait sous cadenas ; même règle que les chapitres.
export default function GardeUE({ moduleKey, children }: { moduleKey: string; children: React.ReactNode }) {
  return <CoursVerrouille acces={useAccesCours(moduleKey)}>{children}</CoursVerrouille>
}

// Journal : un devoir pratique ou un exercice libre pratique ouvre sa propre
// session (/journal?session=…), quel que soit son cours. Cette session reste
// accessible à l'étudiant qui l'a créée, même sans inscription à l'UE 9.
export function GardeJournal({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const sessionId = new URLSearchParams(useSearch()).get('session')
  const { sessions, loading } = useSessions(sessionId ? user?.id : undefined, 'syscohada')
  const acces = useAccesCours('comptabilite-generale')
  const sessionDeDevoir = !!sessionId && sessions.some(s => s.id === sessionId && (s.devoirId || s.exerciceLibreId))
  if (acces === 'autorise' || sessionDeDevoir) return <>{children}</>
  return <CoursVerrouille acces={sessionId && loading ? 'chargement' : acces}>{children}</CoursVerrouille>
}

// Documents comptables et états financiers (balance, grand livre, bilan,
// compte de résultat) : l'étudiant qui fait un devoir pratique ou un exercice
// libre pratique sans être inscrit à l'UE 9 y contrôle ses propres écritures.
// Ces pages ne montrent que ses sessions.
export function GardeDocumentsSession({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const acces = useAccesCours('comptabilite-generale')
  const { sessions, loading } = useSessions(isStudentRole(user) ? user?.id : undefined, 'syscohada')
  const aUneSessionDeTravail = sessions.some(s => s.devoirId || s.exerciceLibreId)
  if (acces === 'autorise' || aUneSessionDeTravail) return <>{children}</>
  return <CoursVerrouille acces={acces === 'refuse' && loading ? 'chargement' : acces}>{children}</CoursVerrouille>
}
