// =========================< IMPORTS: REACT >=================================
import { Suspense, lazy, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================
import { routesConfig } from '@/config/routesConfig'
import { useCommonStore } from '@/hooks/common-context'

// =========================< IMPORTS: PAGES >=================================


// =========================< IMPORTS: COMPONENTS >============================
import DelayedFallback from '@/components/Loading/DelayedFallback'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'


// =========================< IMPORTS: CSS >===================================
import '@/styles/global.scss'


export default function App() {
  const { sidebarState } = useCommonStore()

  const RouteTree = useMemo(() => (
    <Suspense fallback={<DelayedFallback delay={200} />}>
      <Routes>
        {routesConfig.map(({ path, component }, index) => {
          const Component = lazy(component)
          return <Route key={index} path={path} element={<Component />} />
        })}
      </Routes>
    </Suspense>
  ), []) // no deps = never re-render


  return (
    <Router>
      <div className='App'>

        <Header />


        <div className={`App-Wrapper ${sidebarState}`}>
          <Sidebar />

          <div className='Router-Wrapper'>
            {RouteTree}
          </div>
        </div>

      </div>
    </Router>
  )
}

