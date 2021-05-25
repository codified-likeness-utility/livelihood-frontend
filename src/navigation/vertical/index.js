import { Mail, Home } from 'react-feather'

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
    icon: <Mail size={20} />,
    navLink: '/statistics'
  }
]
