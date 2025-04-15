// import { useGlobalUI } from '@/hooks/useGlobalUI'

// =========================< IMPORTS: REACT >=================================
import { useContext } from 'react'

// =========================< IMPORTS: CONTEXT >===============================
import { GlobalUIContext } from '@/contexts/GlobalUIContext'


// Hook to use the Global UI.
export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext)

  if (!context) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider')
  }

  return context
}

