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
        { path: '/', element: withSuspense(lazy(() => import('@/pages/LandingPage/LandingPage'))) },
        { path: '/home', element: (<ProtectedRoute>{withSuspense(lazy(() => import('@/pages/Homepage/Homepage')))}</ProtectedRoute>) },
        { path: '/settings', element: (<ProtectedRoute>{withSuspense(lazy(() => import('@/pages/SettingsPage/SettingsPage')))}</ProtectedRoute>) },
        { path: '/:username', element: withSuspense(lazy(() => import('@/pages/ProfilePage/ProfilePage'))) },

        { path: '/test-page-1', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage01/TestPage01'))) },
        { path: '/test-page-2', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage02/TestPage02'))) },
        { path: '/test-page-3', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage03/TestPage03'))) },
        { path: '/test-page-4', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage04/TestPage04'))) },
        { path: '/test-page-5', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage05/TestPage05'))) },
        { path: '/test-page-6', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage06/TestPage06'))) },
        { path: '/test-page-7', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage07/TestPage07'))) },
        { path: '/test-page-8', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage08/TestPage08'))) },
        { path: '/test-page-9', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage09/TestPage09'))) },
        { path: '/test-page-10', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage10/TestPage10'))) },
        { path: '/test-page-11', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage11/TestPage11'))) },
        { path: '/test-page-12', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage12/TestPage12'))) },
        { path: '/test-page-13', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage13/TestPage13'))) },
        { path: '/test-page-14', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage14/TestPage14'))) },
        { path: '/test-page-15', element: withSuspense(lazy(() => import('@/pages/TestPages/TestPage15/TestPage15'))) }
      ]
    }

    const emptyLayoutRoutes: RouteObject = {
      element: <EmptyLayout />,
      children: [
        { path: '/login', element: withSuspense(lazy(() => import('@/pages/LoginPage/LoginPage'))) },
        { path: '/register', element: withSuspense(lazy(() => import('@/pages/RegisterPage/RegisterPage'))) },
      ]
    }

    return [mainLayoutRoutes, emptyLayoutRoutes]
  }, [])
}

