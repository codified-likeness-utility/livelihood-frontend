import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - livelihood'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/automations',
    component: lazy(() => import('../../views/Automation'))
  },
  {
    path: '/portfolio',
    component: lazy(() => import('../../views/Portfolio'))
  },
  {
    path: '/statistics',
    component: lazy(() => import('../../views/Statistics'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout',
  },
  {
    path: '/form',
    component: lazy(() => import('../../views/forms/VerticalForm')),
    layout: 'BlankLayout',
    // meta: {
    //   authRoute: true
    // }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
