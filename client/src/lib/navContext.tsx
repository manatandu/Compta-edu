import React, { createContext, useContext, useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'

// Contexte de navigation : paramètres entre pages

interface NavState {
  cours: string   // 'fiscalite' | 'comptabilite-generale' | ''
}

interface NavContextType {
  nav: NavState
  setNav: (n: Partial<NavState>) => void
}

const NavContext = createContext<NavContextType>({
  nav: { cours: '' },
  setNav: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [nav, setNavState] = useState<NavState>({ cours: '' })

  const setNav = (n: Partial<NavState>) => {
    setNavState(prev => ({ ...prev, ...n }))
  }

  return (
    <NavContext.Provider value={{ nav, setNav }}>
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}

/**
 * useGoBack — retourne une fonction qui navigue vers la route parent (fallback).
 *
 * Architecture V : chaque page navigue toujours directement vers sa route parent
 * définie, sans dépendre de l'historique du navigateur. window.history.back()
 * est imprévisible dans les SPA (hashrouter, iframe, accès direct par URL).
 */
export function useGoBack(fallback: string = '/') {
  const [, navigate] = useHashLocation()
  return () => {
    navigate(fallback)
  }
}
