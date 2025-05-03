// import { UserContext, UserProvider } from '@/contexts/UserContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, useEffect, ReactNode } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'


export interface User {
  id: number
  username: string
  email: string
  profileIconUrl: string | null
}


export interface UserContextType {
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
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user')

    // 1️⃣ If we have both token & stored user, hydrate immediately
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        // invalid JSON? clear it
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
      }
      setLoading(false)
      return
    }

    // 2️⃣ No token? nothing to fetch
    if (!token) {
      setLoading(false)
      return
    }

    // 3️⃣ We have a token but no stored user: validate it
    api('/auth/me', { method: 'GET' })
      .then((me: User) => {
        setUser(me)
        localStorage.setItem('user', JSON.stringify(me))
      })
      .catch((err) => {
        console.error('Invalid token:', err)
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const logoutUser = () => {
    setIsLoggingOut(true)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser, loading, isLoggingOut }}>
      {children}
    </UserContext.Provider>
  )
}
