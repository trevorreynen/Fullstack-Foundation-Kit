// import { UserContext, UserProvider } from '@/contexts/UserContext'

// =========================< IMPORTS: REACT >=================================
import { createContext, useState, useEffect, ReactNode } from 'react'


interface User {
  id: number
  username: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logoutUser: () => void
}


// Create Context.
export const UserContext = createContext<UserContextType | undefined>(undefined)


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Optional: load user from localStorage or API
  }, [])

  const logoutUser = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}
