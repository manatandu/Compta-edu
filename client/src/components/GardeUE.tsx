import { useSearch } from 'wouter'
import CoursVerrouille from '@/components/CoursVerrouille'
import { useAccesCours } from '@/lib/accesCours'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'

// Pages rattachées à une UE hors du sommaire des modules rédigés :
// Fiscalité (UE 4), Comptabilité générale (UE 9) et ses outils (journal,
// documents et états financiers, immobilisations, stock, factures, IRPP,
// emprunts, plan comptable). Elles étaient ouvertes à tout étudiant connecté,
// alors que Mes cours les montrait sous cadenas ; même règle que les chapitres.
export default function GardeUE({ moduleKey, children }: { moduleKey: string; children: React.ReactNode }) {
  return <CoursVerrouille acces={useAccesCours(moduleKey)}>{children}</CoursVerrouille>
}

// Journal : un devoir pratique ouvre sa propre session (/journal?session=…),
// quel que soit le cours du devoir. Cette session reste accessible à
// l'étudiant qui l'a créée, même sans inscription à l'UE 9.
export function GardeJournal({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const sessionId = new URLSearchParams(useSearch()).get('session')
  const { sessions, loading } = useSessions(sessionId ? user?.id : undefined, 'syscohada')
  const acces = useAccesCours('comptabilite-generale')
  const sessionDeDevoir = !!sessionId && sessions.some(s => s.id === sessionId && (s as any).devoirId)
  if (acces === 'autorise' || sessionDeDevoir) return <>{children}</>
  return <CoursVerrouille acces={sessionId && loading ? 'chargement' : acces}>{children}</CoursVerrouille>
}
