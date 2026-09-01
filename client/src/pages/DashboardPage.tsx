import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DashboardEtudiant from './DashboardEtudiant'
import DashboardStaff from './DashboardStaff'

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD - POINT D'ENTRÉE
//
// Ce fichier ne fait plus que choisir entre les deux tableaux de bord réels :
// DashboardEtudiant (cours, devoirs, cotes) et DashboardStaff (identité,
// compteurs, accès aux modules). Avant cette séparation, les deux
// expériences vivaient dans un seul composant de 1283 lignes, ramifié par
// `isStudent` à plus de quinze endroits différents.
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useUser()
  return isStudentRole(user) ? <DashboardEtudiant /> : <DashboardStaff />
}
