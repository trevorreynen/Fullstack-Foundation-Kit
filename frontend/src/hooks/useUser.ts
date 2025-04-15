// import { useUser } from '@/hooks/useUser'

// =========================< IMPORTS: REACT >=================================
import { useContext } from 'react'

// =========================< IMPORTS: CONTEXT >===============================
import { UserContext } from '@/contexts/UserContext'


export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

