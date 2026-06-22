import { useHistorias } from '../context/HistoriasContext'
import styles from './HistoriasClub.module.css'

export default function HistoriasClub() {
  const { historias } = useHistorias()

  if (historias.length === 0) return null

  return (
    <section className="section section-muted" data-header-theme="light">
      <div className="container">
        <h2>Historias del club</h2>
        <div className={styles.grid}>
          {historias.map(h => (
            <article key={h.id} className={styles.card}>
              <div className={styles.img} style={{ background: '#e5e7eb', overflow: 'hidden' }}>
                {h.image
                  ? <img src={h.image} alt={h.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="img-label">Foto</span>
                }
              </div>
              <div className={styles.body}>
                {h.tag && <span className={styles.tag}>{h.tag}</span>}
                <h5>{h.title}</h5>
                {h.date && <p className={styles.date}>{h.date}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
