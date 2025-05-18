// import MuiThemeWrapper from '@/layouts/MuiThemeWrapper'

// ====================< IMPORTS: REACT >=================================
import { ReactNode, useMemo } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useGlobalUI } from '@/hooks/useGlobalUI'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import { CssBaseline } from '@mui/material'


export default function MuiThemeWrapper({ children }: { children: ReactNode }) {
  // Grab theme selection from contexts/hooks.
  const { theme } = useGlobalUI()

  const muiTheme = useMemo(() => createTheme({
    palette: { mode: theme }
  }), [theme])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
