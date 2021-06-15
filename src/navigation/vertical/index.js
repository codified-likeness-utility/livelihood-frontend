import { Home, Zap, Terminal, Activity } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'automations',
    title: 'Automations',
    icon: <Zap size={20} />,
    navLink: '/automations'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: <Terminal size={20} />,
    navLink: '/portfolio'
  },
  {
    id: 'statistics',
    title: 'Statistics',
    icon: <Activity size={20} />,
    navLink: '/statistics'
  }
]
