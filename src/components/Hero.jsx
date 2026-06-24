import { useLandingConfig } from '../context/LandingConfigContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { config } = useLandingConfig()
  const bgStyle = config.fondoHero
    ? { backgroundImage: `linear-gradient(180deg, rgba(224,0,77,0.82) 0%, rgba(192,19,74,0.88) 35%, rgba(90,0,32,0.92) 65%, rgba(10,0,8,0.97) 100%), url(${config.fondoHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {}
  return (
    <section id="inicio" className={styles.hero} data-header-theme="pink" style={bgStyle}>
      <div className={`container ${styles.inner}`}>
        <h1>Una identitat, un equip</h1>
        <p className={styles.lead}>
          Más que un club, somos un proyecto deportivo y humano comprometido con el
          desarrollo de nuestras jugadoras dentro y fuera del campo.
        </p>
        <div className={styles.actions}>
          <a className={styles.btnRenueva} href="/inscripciones?tab=renovacion">← Renueva</a>
          <a className={styles.btnInscribete} href="/inscripciones">Inscríbete →</a>
        </div>
        <a className={styles.saber} href="/#quienes-somos">¿Quieres saber más? ›</a>
      </div>
    </section>
  )
}
