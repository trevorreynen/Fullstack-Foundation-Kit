// import App from '@/pages/App'

// ====================< IMPORTS: REACT >=================================
import { useRoutes, useLocation } from 'react-router-dom'

// ====================< IMPORTS: PAGES >=================================
import CreatePost from '@/pages/CreatePost/CreatePost'

// ====================< IMPORTS: COMPONENTS >============================
import FullPageLoader from '@/components/loading/FullPageLoader'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: OTHER >=================================
import { useRoutesConfig } from '@/config/routesConfig'

// ====================< IMPORTS: STYLES >================================
import '@/styles/global.scss'


export default function App() {
  const routes = useRoutesConfig()
  const location = useLocation()

  const { loading } = useUser()

  // Capture background location if we’re opening a modal
  const state = location.state as { backgroundLocation?: Location }
  const routeElements = useRoutes(routes, state?.backgroundLocation || location)


  if (loading) {
    return <FullPageLoader />
  }


  // Render app.
  return (
    <>
      {routeElements}

      {/* Modal route */}
      {state?.backgroundLocation && location.pathname === '/create' && (
        <CreatePost />
      )}
    </>
  )
}
