// import { routesConfig } from '@/config/routesConfig'

// ====================< IMPORTS: REACT >=================================
import { lazy, Suspense, JSX } from 'react'
import { RouteObject } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================
import MainLayout from '@/layouts/MainLayout'

// ====================< IMPORTS: PAGES >=================================
const About = lazy(() => import('@/pages/About/About'))
const CreatePost = lazy(() => import('@/pages/CreatePost/CreatePost'))
const Error404 = lazy(() => import('@/pages/Error404/Error404'))
const Explore = lazy(() => import('@/pages/Explore/Explore'))
const Landing = lazy(() => import('@/pages/Landing/Landing'))
const Login = lazy(() => import('@/pages/Login/Login'))
const Profile = lazy(() => import('@/pages/Profile/Profile'))
const Register = lazy(() => import('@/pages/Register/Register'))
const Settings = lazy(() => import('@/pages/Settings/Settings'))
const ViewPost = lazy(() => import('@/pages/ViewPost/ViewPost'))

// ====================< IMPORTS: COMPONENTS >============================
import FullPageLoader from '@/components/loading/FullPageLoader'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================


const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element | null>) => (
  <Suspense fallback={<FullPageLoader />}>
    <Component />
  </Suspense>
)


const mainLayoutRoutes: RouteObject = {
  element: <MainLayout />,
  children: [
    { path: '', element: withSuspense(Landing) },
    { path: 'login', element: withSuspense(Login) },
    { path: 'register', element: withSuspense(Register) },
    { path: 'about', element: withSuspense(About) },
    { path: 'settings', element: <ProtectedRoute>{withSuspense(Settings)}</ProtectedRoute> },
    { path: 'create', element: <ProtectedRoute>{withSuspense(CreatePost)}</ProtectedRoute> },
    { path: 'explore', element: <ProtectedRoute>{withSuspense(Explore)}</ProtectedRoute> },
    { path: 'post/:postId', element: <ProtectedRoute>{withSuspense(ViewPost)}</ProtectedRoute> },
    { path: 'user/:username', element: <ProtectedRoute>{withSuspense(Profile)}</ProtectedRoute> },
    { path: '*', element: <ProtectedRoute>{withSuspense(Error404)}</ProtectedRoute> },
  ]
}


export const useRoutesConfig = (): RouteObject[] => {
  return [mainLayoutRoutes]
}
