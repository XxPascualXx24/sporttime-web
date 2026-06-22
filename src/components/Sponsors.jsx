import { usePatrocinadores } from '../context/PatrocinadoresContext'
import styles from './Sponsors.module.css'

const FALLBACKS = [
  { id: 'f1', name: 'Patrocinador' },
  { id: 'f2', name: 'Patrocinador' },
  { id: 'f3', name: 'Patrocinador' },
  { id: 'f4', name: 'Patrocinador' },
  { id: 'f5', name: 'Patrocinador' },
]

export default function Sponsors() {
  const { patrocinadores, loading } = usePatrocinadores()
  const items = patrocinadores.length > 0 ? patrocinadores : FALLBACKS

  // Duplicate to create seamless loop — need at least enough items to fill 2× the track
  const track = items.length < 5 ? [...items, ...items, ...items, ...items] : [...items, ...items]

  return (
    <section className={styles.sponsors} data-header-theme="pink">
      <div className={styles.header}>
        <h4 className={styles.title}>Patrocinadores que confían en nosotros</h4>
      </div>

      <div className={styles.carouselWrap}>
        <div className={styles.fade} data-side="left" />
        <div className={styles.fade} data-side="right" />
        <div className={styles.track} style={{ '--count': items.length }}>
          {track.map((s, i) => {
            const inner = (
              <div key={`${s.id}-${i}`} className={styles.card}>
                {s.logo
                  ? <img src={s.logo} alt={s.name} className={styles.logo} />
                  : <span className={styles.name}>{s.name}</span>
                }
              </div>
            )
            return s.link
              ? <a key={`${s.id}-${i}`} href={s.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>{inner}</a>
              : inner
          })}
        </div>
      </div>

      <div className={styles.foot}>
        <a href="mailto:sporttimefemeni@gmail.com" className={styles.link}>¿Quieres patrocinarnos? →</a>
      </div>
    </section>
  )
}
