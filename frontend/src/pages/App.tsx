// import App from '@/pages/App'

// ====================< IMPORTS: REACT >=================================
import { useRoutes } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import FullPageLoader from '@/components/Loading/FullPageLoader'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { useRoutesConfig } from '@/config/routesConfig'

// ====================< IMPORTS: STYLES >================================
import '@/styles/global.scss'


export default function App() {
  const routes = useRoutesConfig()
  const routeElements = useRoutes(routes)

  const { loading } = useUser()

  if (loading) {
    return <FullPageLoader />
  }


  return (
    <>
      {routeElements}
    </>
  )
}
