// import { SidebarState, GlobalUIContext, GlobalUIProvider } from '@/contexts/GlobalUIContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, ReactNode, useEffect } from 'react'


export type ThemePreference = 'dark' | 'light'

// Define the Global UI States Interface
interface GlobalUIState {
  theme:  ThemePreference
  setTheme: (theme: ThemePreference) => void
  isMobile: boolean
}

// Create Context.
export const GlobalUIContext = createContext<GlobalUIState>({
  theme: 'dark',
  setTheme: () => {},
  isMobile: false,
})


// Global UI State Provider
export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
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
    <GlobalUIContext.Provider value={{ theme, setTheme, isMobile }}>
      {children}
    </GlobalUIContext.Provider>
  )
}
