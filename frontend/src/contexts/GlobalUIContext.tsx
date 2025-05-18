// import { SidebarState, GlobalUIContext, GlobalUIProvider } from '@/contexts/GlobalUIContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { api } from '@/utils/api'
import { useUser } from '@/hooks/useUser'


export type ThemePreference = 'dark' | 'light' | 'system'

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
  // Global authenticated user context.
  const { user } = useUser()

  const getStoredTheme = (): ThemePreference => {
    return (localStorage.getItem('theme-preference') as ThemePreference) || 'system'
  }

  const [theme, setThemeState] = useState<ThemePreference>(getStoredTheme())
  const applyThemeToDOM = (value: ThemePreference) => {
    const resolved = value === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : value

    document.body.setAttribute('data-theme', resolved)
  }

  const setTheme = useCallback(async (value: ThemePreference) => {
    setThemeState(value)
    localStorage.setItem('theme-preference', value)
    applyThemeToDOM(value)

    if (user?.id) {
      try {
        await api('/settings', {
          method: 'PATCH',
          body: { theme: value }
        })
      } catch (err) {
        console.error('Failed to update theme in backend', err)
      }
    }
  }, [user])

  useEffect(() => {
    const stored = getStoredTheme()
    applyThemeToDOM(stored)
    setThemeState(stored)
  }, [])


  // Mobile menu state.
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850)
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 850)
    window.addEventListener('resize', updateIsMobile)

    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  return (
    <GlobalUIContext.Provider value={{ theme, setTheme, isMobile }}>
      {children}
    </GlobalUIContext.Provider>
  )
}
