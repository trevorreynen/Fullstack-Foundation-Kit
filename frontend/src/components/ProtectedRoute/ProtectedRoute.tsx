// import ProtectedRoute from '@components/ProtectedRoute/ProtectedRoute'

// =========================< IMPORTS: REACT >=================================
import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { useUser } from '@/hooks/common-context'


interface ProtectedRouteProps {
  children: JSX.Element
}


export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUser()

  // If user is not logged in, they cannot view the element wrapped by this component. Send to login page.
  if (!user) {
    return <Navigate to='/login' />
  }

  return children
}
