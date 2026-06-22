import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const clubLinks = [
  'Nuestro equipo', 'Equipos femeninos', 'Quiénes somos',
  'Instalaciones', 'Estadísticas', 'Filosofía', 'Entrenadores',
]

const sociosLinks = [
  'Renovaciones', 'Gestión abono', 'Pagos / Tasas',
  'Foros', 'Apóyanos', 'Tienda',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          <div className={styles.brand}>
            <img src="/logo.png" alt="Sporttime Femení" className={styles.logo} />
            <p className={styles.tagline}>
              Sporttime Femení Vila-real C.F.<br />
              El club de todas.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Facebook">FB</a>
            </div>
          </div>

          <div className={styles.col}>
            <h5>Club</h5>
            <ul>
              {clubLinks.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>

          <div className={styles.col}>
            <h5>Área de socios</h5>
            <ul>
              {sociosLinks.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>

          <div className={styles.col}>
            <h5>Contacto</h5>
            <p>Camp Municipal de Futbol<br />Vila-real, Castellón</p>
            <p style={{ marginTop: 10 }}>+34 964 000 000</p>
            <p>sporttimefemeni@gmail.com</p>
            <p style={{ marginTop: 10 }}>
              <a href="#" className={styles.contactLink}>Formulario de contacto</a>
            </p>
          </div>

        </div>
      </div>

      {/* Big wordmark */}
      <div className={styles.wordmark}>
        <span>Sporttime</span>
      </div>

      <div className={styles.bar}>
        © 2026 Sporttime Femení Vila-real C.F. · Todos los derechos reservados.
        <span className={styles.barLinks}>
          <Link to="/aviso-legal">Aviso Legal</Link>
          <span>·</span>
          <Link to="/politica-privacidad">Política de Privacidad</Link>
        </span>
      </div>
    </footer>
  )
}
