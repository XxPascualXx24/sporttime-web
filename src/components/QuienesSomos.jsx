import styles from './QuienesSomos.module.css'

const stats = [
  { value: '10', label: 'Equipos' },
  { value: '+138', label: 'Jugadoras' },
]

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className={`section section-light`} data-header-theme="light">
      <div className="container">
        <h2>Quiénes somos</h2>
        <div className={styles.grid}>
          <div className={styles.imgWrap}>
            <div className={`placeholder ${styles.img}`}>
              <span className="img-label">Foto del equipo</span>
            </div>
            <p className={styles.founded}>Fundado el 8.03.2023</p>
          </div>

          <div className={styles.content}>
            <h3 className={styles.clubName}>Sporttime Femení Vila-real C.F.</h3>
            <p>En Vila-real, una familia profundamente vinculada al fútbol femenino decidió que ninguna niña debía quedarse sin jugar por falta de experiencia, recursos o confianza.</p>
            <p>Así nació el Sporttime Femení Vila-real C.F., un proyecto creado para abrir puertas, formar personas y hacer crecer el fútbol femenino desde la pasión, el esfuerzo y la igualdad de oportunidades.</p>

            <div className={styles.stats}>
              {stats.map(s => (
                <div key={s.label} className={styles.stat}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <a className={`btn btn-outline ${styles.cta}`} href="#">
              Más sobre nuestra historia <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
