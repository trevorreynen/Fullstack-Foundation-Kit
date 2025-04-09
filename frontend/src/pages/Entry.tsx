// =========================< IMPORTS: REACT >=================================
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { GlobalUIProvider, UserProvider } from '@/hooks/common-context'


// =========================< IMPORTS: PAGES >=================================
import App from './App'


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

