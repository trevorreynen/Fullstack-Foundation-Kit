// @/pages/Entry.tsx

// ====================< IMPORTS: REACT >=================================
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================
import App from '@/pages/App'

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { GlobalUIProvider } from '@/contexts/GlobalUIContext'
import { UserProvider } from '@/contexts/UserContext'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <GlobalUIProvider>
            <App />
          </GlobalUIProvider>
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
