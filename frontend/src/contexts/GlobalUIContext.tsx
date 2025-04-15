// import { SidebarState, GlobalUIContext, GlobalUIProvider } from '@/contexts/GlobalUIContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, ReactNode, useEffect } from 'react'


export enum SidebarState {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  Hidden = 'hidden',
  Minimal = 'minimal',
}

// Define the Global UI States Interface
interface GlobalUIState {
  sidebarState: SidebarState
  setSidebarState: (state: SidebarState) => void
}


// Create Context.
export const GlobalUIContext = createContext<GlobalUIState>({
  sidebarState: SidebarState.Expanded,
  setSidebarState: () => {},
})


// Global UI State Provider
export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
  // Load sidebar state from localStorage (default to Expanded if not set)
    const storedState = localStorage.getItem('sidebarState') as SidebarState | null
    const initialState = storedState || SidebarState.Expanded

    const [sidebarState, setSidebarState] = useState<SidebarState>(initialState)

    // Save sidebar state to sessionStorage whenever it changes.
    useEffect(() => {
      localStorage.setItem('sidebarState', sidebarState);
    }, [sidebarState])

  return (
    <GlobalUIContext.Provider value={{ sidebarState, setSidebarState }}>
      {children}
    </GlobalUIContext.Provider>
  )
}

