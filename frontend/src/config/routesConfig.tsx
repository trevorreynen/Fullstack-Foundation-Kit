// import { routesConfig } from '@/config/routesConfig'

// =========================< IMPORTS: REACT >=================================
import { lazy, useMemo, Suspense, JSX } from 'react'
import { RouteObject } from 'react-router-dom'

// =========================< IMPORTS: LAYOUT >================================
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

// =========================< IMPORTS: COMPONENTS >============================
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import DelayedFallback from '@/components/Loading/DelayedFallback'


const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element | null>) => (
  <Suspense fallback={<DelayedFallback delay={200} />}>
    <Component />
  </Suspense>
)


export const useRoutesConfig = (): RouteObject[] => {
  return useMemo(() => {

    const mainLayoutRoutes: RouteObject = {
      element: <MainLayout />,
      children: [
        { path: '/', element: withSuspense(lazy(() => import('@/pages/Landing/Landing'))) },
        { path: '/home', element: (<ProtectedRoute>{withSuspense(lazy(() => import('@/pages/Home/Home')))}</ProtectedRoute>) },
        { path: '/settings', element: (<ProtectedRoute>{withSuspense(lazy(() => import('@/pages/Settings/Settings')))}</ProtectedRoute>) },
        { path: '/:username', element: withSuspense(lazy(() => import('@/pages/Profile/Profile'))) },
      ]
    }

    const emptyLayoutRoutes: RouteObject = {
      element: <EmptyLayout />,
      children: [
        { path: '/login', element: withSuspense(lazy(() => import('@/pages/Login/Login'))) },
        { path: '/register', element: withSuspense(lazy(() => import('@/pages/Register/Register'))) },
      ]
    }

    return [mainLayoutRoutes, emptyLayoutRoutes]
  }, [])
}

