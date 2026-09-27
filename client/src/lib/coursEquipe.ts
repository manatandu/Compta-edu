// ─────────────────────────────────────────────────────────────────────────────
// COURS ENSEIGNÉS PAR L'ÉQUIPE
//
// Liste des cours proposés à l'enseignant quand il rattache un contenu
// (document, exercice) à un cours : le document exact de chaque faculté
// (une UE existe en un exemplaire par faculté), avec la faculté dans le
// libellé. Pour un professeur ou un assistant, les cours auxquels sont
// inscrits les étudiants de son équipe ; pour l'administrateur, tous.
//
// Ces formulaires proposaient une liste dédupliquée par UE, qui retenait le
// cours d'une faculté prise au hasard : le contenu restait invisible pour les
// étudiants de l'enseignant inscrits au cours de leur propre faculté.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import type { Cours } from './db'
import { useUser } from './userContext'
import { useEquipe } from './equipe'
import { isAdminRole, isStaffRole } from './permissions'
import { useAllCours, useAllFacultes } from './useFirestore'
import { getCoursTries, getEtudiantsCreesParAsync } from './db-firebase'

export function useCoursEnseignes(): { cours: Cours[]; libelle: (c: Pick<Cours, 'nom' | 'faculteId' | 'promotion'>) => string } {
  const user = useUser()
  const equipe = useEquipe()
  const { cours: tousCours } = useAllCours()
  const { facultes } = useAllFacultes()
  const admin = isAdminRole(user)
  const personnel = isStaffRole(user)
  const [idsEquipe, setIdsEquipe] = useState<Set<string>>(new Set())
  const cleEquipe = equipe?.refs.join(',') || ''

  useEffect(() => {
    if (!user?.id || !personnel || admin) return
    let actif = true
    getEtudiantsCreesParAsync({ id: user.id, username: (user as any).username }, undefined, equipe?.refs || [])
      .then(etus => { if (actif) setIdsEquipe(new Set(etus.flatMap(e => (e as any).coursIds || []))) })
      .catch(() => {})
    return () => { actif = false }
  }, [user?.id, personnel, admin, cleEquipe])

  const cours = getCoursTries(admin ? tousCours : tousCours.filter(c => idsEquipe.has(c.id)))
  const libelle = (c: Pick<Cours, 'nom' | 'faculteId' | 'promotion'>) =>
    [c.nom, facultes.find(f => f.id === c.faculteId)?.nom, c.promotion].filter(Boolean).join(' · ')
  return { cours, libelle }
}
