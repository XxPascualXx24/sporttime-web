import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} data-header-theme="pink">
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
        <a className={styles.saber} href="/#quienes-somos">¿Quieres patrocinarnos? ›</a>
      </div>
    </section>
  )
}
