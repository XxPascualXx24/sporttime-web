import { useLandingConfig } from '../context/LandingConfigContext'
import styles from './CTAHero.module.css'

export default function CTAHero() {
  const { config } = useLandingConfig()
  const bgStyle = config.fondoCTA
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${config.fondoCTA})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
  return (
    <section id="inscribete" className={styles.cta} data-header-theme="dark" style={bgStyle}>
      <div className={styles.inner}>
        <span className={styles.badge}>Cantera</span>
        <h2>Apúntate y vive el fútbol desde dentro</h2>
        <p className={styles.lead}>
          Jugamos para ser mejores juntas, aprendemos dentro y fuera del campo. Los mejores profes están a nuestra disposición.
        </p>
        <a className="btn btn-primary" href="/inscripciones">Inscríbete</a>
      </div>
    </section>
  )
}
