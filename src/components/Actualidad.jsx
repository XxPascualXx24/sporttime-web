import styles from './Actualidad.module.css'

const news = [
  { tag: 'Club',    title: 'Torneo en Barcelona',          date: '10 jun 2026' },
  { tag: 'Club',    title: 'Nuevas equipaciones 26-27',    date: '5 jun 2026' },
  { tag: 'Cantera', title: 'Infantil A Campeón',           date: '1 jun 2026' },
  { tag: 'Club',    title: 'Ascenso a Liga Preferente',    date: '28 may 2026' },
  { tag: 'Club',    title: 'Jornada de puertas abiertas',  date: '20 may 2026' },
]

export default function Actualidad() {
  return (
    <section id="actualidad" className="section section-light" data-header-theme="light">
      <div className="container">
        <h2>Actualidad</h2>
        <div className={styles.grid}>
          {news.map(n => (
            <article key={n.title} className={styles.card}>
              <div className={`placeholder ${styles.img}`}>
                <span className="img-label">Foto noticia</span>
              </div>
              <div className={styles.body}>
                <span className={styles.tag}>{n.tag}</span>
                <h5>{n.title}</h5>
                <p className={styles.date}>{n.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
