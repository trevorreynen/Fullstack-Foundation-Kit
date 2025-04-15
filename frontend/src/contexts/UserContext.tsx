// import { UserContext, UserProvider } from '@/contexts/UserContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, useEffect, ReactNode } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'


interface User {
  id: number
  username: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logoutUser: () => void
  loading: boolean
  isLoggingOut: boolean
}


// Create Context.
export const UserContext = createContext<UserContextType | undefined>(undefined)


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const res = await api('/auth/me')
        setUser(res)
      } catch (err) {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logoutUser = () => {
    setIsLoggingOut(true)
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setUser(null)
    window.location.href = '/' // hard redirect to public route
  }

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, loading, isLoggingOut }}>
      {children}
    </UserContext.Provider>
  )
}
