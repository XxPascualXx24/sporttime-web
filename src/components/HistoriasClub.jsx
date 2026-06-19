import styles from './HistoriasClub.module.css'

const historias = [
  { tag: 'Nuevo', title: 'Charla con la capitana',       date: '8 jun 2026' },
  { tag: null,    title: 'Ayuda al fútbol femenino más', date: '3 jun 2026' },
  { tag: null,    title: 'Loco fútbol base',             date: '28 may 2026' },
  { tag: null,    title: 'Guía clubs',                   date: '20 may 2026' },
  { tag: null,    title: 'Sporttime en Radio',            date: '15 may 2026' },
  { tag: null,    title: '¡Volvemos al campo!',          date: '10 may 2026' },
]

export default function HistoriasClub() {
  return (
    <section className="section section-muted" data-header-theme="light">
      <div className="container">
        <h2>Historias del club</h2>
        <div className={styles.grid}>
          {historias.map(h => (
            <article key={h.title} className={styles.card}>
              <div className={`placeholder ${styles.img}`}>
                <span className="img-label">Foto</span>
              </div>
              <div className={styles.body}>
                {h.tag && <span className={styles.tag}>{h.tag}</span>}
                <h5>{h.title}</h5>
                <p className={styles.date}>{h.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
