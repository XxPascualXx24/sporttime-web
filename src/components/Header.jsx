import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const leftLinks = [
  { label: 'Tienda',        to: '/tienda' },
  { label: 'Noticias',      to: '/noticias' },
  { label: 'Historia',      to: '/historia' },
  { label: 'Clasificación', to: '/clasificacion' },
]

const rightLinks = [
  { label: 'Equipos',    to: '/equipos' },
  { label: 'Calendario', to: '/calendario' },
]

const allLinks = [...leftLinks, ...rightLinks]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const close = () => setOpen(false)

  useEffect(() => { setOpen(false) }, [location.pathname])

  const headerClass = isHome ? styles.headerHome : styles.headerSolid
  const isOnDarkBg = isHome

  const renderLink = (l) => (
    <NavLink
      key={l.to}
      to={l.to}
      className={({ isActive }) => `${styles.link} ${isOnDarkBg ? styles.linkLight : ''} ${isActive ? styles.active : ''}`}
      onClick={close}
    >
      {l.label}
    </NavLink>
  )

  return (
    <header className={`${styles.header} ${headerClass}`}>
      <div className={`container ${styles.inner}`}>

        {/* Left nav */}
        <nav className={styles.navLeft}>
          {leftLinks.map(renderLink)}
        </nav>

        {/* Logo — centered */}
        <Link to="/" className={styles.logo} onClick={close}>
          <img src="/logo.png" alt="Sporttime Femení Vila-real" className={styles.logoImg} />
        </Link>

        {/* Right nav + buttons */}
        <div className={styles.navRight}>
          {rightLinks.map(renderLink)}
          <a
            href="/inscripciones?tab=renovacion"
            className={`${styles.btnRenueva} ${isOnDarkBg ? styles.btnRenuevaLight : ''}`}
            onClick={close}
          >
            Renueva
          </a>
          <a href="/inscripciones" className={styles.btnInscribete} onClick={close}>
            Inscríbete
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerActive : ''} ${isOnDarkBg ? styles.hamburgerLight : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className={styles.mobileNav}>
          {allLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
              onClick={close}
            >
              {l.label}
            </NavLink>
          ))}
          <div className={styles.mobileBtns}>
            <a href="/inscripciones?tab=renovacion" className={styles.mobileBtnRenueva} onClick={close}>Renueva</a>
            <a href="/inscripciones" className={styles.mobileBtnInscribete} onClick={close}>Inscríbete</a>
          </div>
        </div>
      )}
    </header>
  )
}
