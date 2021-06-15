import { Activity, Home } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'statistics',
    title: 'Statistics',
    icon: <Activity size={20} />,
    navLink: '/statistics'
  }
]
