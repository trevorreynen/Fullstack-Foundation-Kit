// @/pages/Entry.tsx

// ====================< IMPORTS: REACT >=================================
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================
import MuiThemeWrapper from '@/layouts/MuiThemeWrapper'

// ====================< IMPORTS: PAGES >=================================
import App from '@/pages/App'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { GlobalUIProvider } from '@/contexts/GlobalUIContext'
import { UserProvider } from '@/contexts/UserContext'


const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <UserProvider>
        <GlobalUIProvider>
          <MuiThemeWrapper>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MuiThemeWrapper>
        </GlobalUIProvider>
      </UserProvider>
    </React.StrictMode>
  )
}
