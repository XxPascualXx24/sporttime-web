import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AdminLayout.module.css'

const navItems = [
  { label: 'Panel',    to: '/admin/dashboard', icon: '⊞' },
  { label: 'Equipos',  to: '/admin/equipos',   icon: '👥' },
  { label: 'Noticias', to: '/admin/noticias',  icon: '📰' },
  { label: 'Historias', to: '/admin/historias', icon: '📖' },
]

export default function AdminLayout() {
  const { logged, logout } = useAuth()
  if (!logged) return <Navigate to="/admin" replace />

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>SF</div>
          <span className={styles.brandName}>Sporttime Admin</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className={styles.logout} onClick={logout}>
          <span className={styles.icon}>↩</span>
          Cerrar sesión
        </button>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
