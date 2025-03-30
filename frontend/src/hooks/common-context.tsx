// =========================< IMPORTS: REACT >=================================
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'


export enum SidebarState {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  Hidden = 'hidden',
  Minimal = 'minimal',
}

// Define the shape of the Common State
export type CommonState = {
  sidebarState: SidebarState
  setSidebarState: (state: SidebarState) => void
}

// Default values for the Common State
const defaultCommonState: CommonState = {
  sidebarState: SidebarState.Expanded,
  setSidebarState: () => {},
}

// Create the Common Store Context
export const CommonStoreContext = createContext<CommonState>(defaultCommonState)

// Provider Component
export function CommonStoreProvider({ children }: { children: ReactNode }) {
  // Load sidebar state from localStorage (default to Expanded if not set)
  const storedState = localStorage.getItem('sidebarState') as SidebarState | null
  const initialState = storedState || SidebarState.Expanded

  const [sidebarState, setSidebarState] = useState<SidebarState>(initialState)

  // Save sidebar state to sessionStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarState', sidebarState);
  }, [sidebarState])

  return (
    <CommonStoreContext.Provider value={{ sidebarState, setSidebarState }}>
      {children}
    </CommonStoreContext.Provider>
  )
}

// Hook to use the Common Store
export function useCommonStore() {
  const context = useContext(CommonStoreContext)

  if (!context) {
    throw new Error('useCommonStore must be used within a CommonStoreProvider')
  }

  return context
}

