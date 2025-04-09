// =========================< IMPORTS: REACT >=================================
import { useRoutes } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { useRoutesConfig } from '@/config/routesConfig'

// =========================< IMPORTS: CSS >===================================
import '@/styles/global.scss'


export default function App() {
  const routes = useRoutesConfig()
  const routeElements = useRoutes(routes)


  return (
    <>
      {routeElements}
    </>
  )
}

