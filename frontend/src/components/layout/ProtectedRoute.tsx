// import ProtectedRoute from '@/components/layout/ProtectedRoute'

// ====================< IMPORTS: REACT >=================================
import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import FullPageLoader from '@/components/loading/FullPageLoader'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


interface ProtectedRouteProps {
  children: JSX.Element
}


export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Global authenticated user context.
  const { user, loading, isLoggingOut } = useUser()

  // Block route access while auth state is loading or logout is in progress.
  if (loading || isLoggingOut) {
    return <FullPageLoader />
  }

  // Redirect to login if user is not authenticated.
  if (!user) {
    return <Navigate to='/login' />
  }

  // Allow access to protected content.
  return children
}
