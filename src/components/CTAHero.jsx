import styles from './CTAHero.module.css'

export default function CTAHero() {
  return (
    <section id="inscribete" className={styles.cta} data-header-theme="dark">
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
