import { Link } from 'react-router-dom'
import { useNoticias } from '../context/NoticiasContext'
import styles from './Actualidad.module.css'

export default function Actualidad() {
  const { noticias } = useNoticias()
  const published = noticias.filter(n => n.status === 'published').slice(0, 5)

  return (
    <section id="actualidad" className="section section-light" data-header-theme="light">
      <div className="container">
        <h2>Actualidad</h2>
        <div className={styles.grid}>
          {published.map(n => (
            <article key={n.id} className={styles.card}>
              <div className={styles.img} style={{ background: '#f3f4f6', overflow: 'hidden' }}>
                {n.image
                  ? <img src={n.image} alt={n.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="img-label">Foto noticia</span>
                }
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
