// =========================< IMPORTS: REACT >=================================
import React from 'react'
import { createRoot } from 'react-dom/client'

// =========================< IMPORTS: OTHER >=================================
import { CommonStoreProvider } from '@/hooks/common-context'


// =========================< IMPORTS: PAGES >=================================
import App from './App'


const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <CommonStoreProvider>
        <App />
      </CommonStoreProvider>
    </React.StrictMode>,
  )
}

