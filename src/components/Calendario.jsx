import { useLandingConfig } from '../context/LandingConfigContext'
import styles from './Calendario.module.css'

const matches = [
  { day: '21', month: 'JUN', home: 'Sporttime Femení', away: 'Villarreal CF B', venue: 'Camp Municipal', time: '18:00 h' },
  { day: '28', month: 'JUN', home: 'Levante UD', away: 'Sporttime Femení', venue: 'Estadio Levante', time: '17:00 h' },
]

export default function Calendario() {
  const { config } = useLandingConfig()
  return (
    <section id="calendario" className="section section-light" data-header-theme="light">
      <div className="container">
        <h2>Calendario</h2>
        <div className={styles.grid}>
          {matches.map(m => (
            <div key={`${m.day}-${m.month}`} className={styles.card}>
              <div className={styles.date}>
                <span className={styles.day}>{m.day}</span>
                <span className={styles.month}>{m.month}</span>
              </div>
              <div className={styles.info}>
                <p className={styles.teams}>
                  {m.home} <span className={styles.vs}>vs</span> {m.away}
                </p>
                <p className={styles.meta}>{m.venue} · {m.time}</p>
              </div>
            </div>
          ))}

          <div className={styles.featuredCard}>
            <div className={styles.featuredImg}>
              {config.fotoPartido
                ? <img src={config.fotoPartido} alt="Foto partido" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span className={styles.imgLabel}>Foto partido</span>
              }
            </div>
            <span className={styles.featuredLabel}>Próximos partidos</span>
          </div>
        </div>

        <p className={styles.note}>
          Consulta el calendario completo de todos los equipos <a href="/calendario">aquí</a>.
        </p>
      </div>
    </section>
  )
}
