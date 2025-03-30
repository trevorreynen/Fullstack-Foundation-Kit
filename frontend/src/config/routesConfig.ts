// import { routesConfig } from '@/config/routesConfig'


export const routesConfig = [
  { path: '/', component: () => import('@/pages/LandingPage/LandingPage') },
  { path: '/home', component: () => import('@/pages/Homepage/Homepage') },

  { path: '/page-1', component: () => import('@/pages/Page1/Page1') },
  { path: '/page-2', component: () => import('@/pages/Page2/Page2') },

  { path: '/example-page-1', component: () => import('@/pages/ExamplePage1/ExamplePage1') },
  { path: '/example-page-2', component: () => import('@/pages/ExamplePage2/ExamplePage2') },

]

