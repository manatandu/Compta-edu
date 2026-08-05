import React, { createContext, useContext } from 'react'

// Contexte de module : détermine si on travaille en SYSCOHADA ou SYCEBNL
// Les pages Journal, Grand Livre, Balance, Bilan lisent ce contexte pour savoir
// quel stockage localStorage utiliser. Aucun mélange de données possible.

export type ModuleComptable = 'syscohada' | 'sycebnl'

const ModuleContext = createContext<ModuleComptable>('syscohada')

export function ModuleProvider({ module, children }: { module: ModuleComptable; children: React.ReactNode }) {
  return <ModuleContext.Provider value={module}>{children}</ModuleContext.Provider>
}

export function useModule(): ModuleComptable {
  return useContext(ModuleContext)
}
