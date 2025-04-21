// import { SidebarState, GlobalUIContext, GlobalUIProvider } from '@/contexts/GlobalUIContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, ReactNode, useEffect } from 'react'


export enum SidebarState {
  Expanded = 'expanded',
  Collapsed = 'collapsed',
  Hidden = 'hidden',
  Minimal = 'minimal',
}

export type ThemePreference = 'dark' | 'light'

// Define the Global UI States Interface
interface GlobalUIState {
  sidebarState: SidebarState
  setSidebarState: (state: SidebarState) => void
  theme:  ThemePreference
  setTheme: (theme: ThemePreference) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (val: boolean) => void
  isMobile: boolean
}


// Create Context.
export const GlobalUIContext = createContext<GlobalUIState>({
  sidebarState: SidebarState.Expanded,
  setSidebarState: () => {},
  theme: 'dark',
  setTheme: () => {},
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
  isMobile: false,
})


// Global UI State Provider
export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
  // Load sidebar state from localStorage (default to Expanded if not set)
    const storedState = localStorage.getItem('sidebarState') as SidebarState | null
    const [sidebarState, setSidebarState] = useState<SidebarState>(storedState || SidebarState.Expanded)

    // Save sidebar state to sessionStorage whenever it changes.
    useEffect(() => {
      localStorage.setItem('sidebarState', sidebarState);
    }, [sidebarState])


    const storedTheme = localStorage.getItem('theme-preference') as ThemePreference || null
    const [theme, setThemeState] = useState<ThemePreference>(storedTheme || 'dark')

    useEffect(() => {
      if (theme) {
        document.body.setAttribute('data-theme', theme)
      }
    }, [theme])

    const setTheme = (value: ThemePreference) => {
      setThemeState(value)
      localStorage.setItem('theme-preference', value)
      window.location.reload()
    }

    // Mobile menu state.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850)

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 850)
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)

    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  return (
    <GlobalUIContext.Provider value={{ sidebarState, setSidebarState, theme, setTheme, isMobileMenuOpen, setIsMobileMenuOpen, isMobile }}>
      {children}
    </GlobalUIContext.Provider>
  )
}

