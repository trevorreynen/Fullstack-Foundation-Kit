// import { useGlobalUI, useUser } from '@/hooks/common-context'

// =========================< IMPORTS: REACT >=================================
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'


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

// Default values for the Global UI States
const defaultGlobalUIState: GlobalUIState = {
  sidebarState: SidebarState.Expanded,
  setSidebarState: () => {},
}


interface User {
  id: number
  username: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logoutUser: () => void
}


// Create Contexts.
const GlobalUIContext = createContext<GlobalUIState>(defaultGlobalUIState)
const UserContext = createContext<UserContextType | undefined>(undefined)


// Global UI State Provider
export function GlobalUIProvider({ children }: { children: ReactNode }) {
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


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const logoutUser = () => {
    setUser(null)
    // Optional: localStorage.clear() or cookie removal. Possibly soon after I work on this proj a bit more.
  }

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}


// Hook to use the Global UI.
export const useGlobalUI = (): GlobalUIState => {
  const context = useContext(GlobalUIContext)

  if (!context) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider')
  }

  return context
}


export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext)

  if (!ctx) {
    throw new Error('useUser must be used within UserProvider')
  }

  return ctx
}

