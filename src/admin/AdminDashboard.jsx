import { Link } from 'react-router-dom'
import { useNoticias } from '../context/NoticiasContext'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const { noticias } = useNoticias()
  const published = noticias.filter(n => n.status === 'published').length
  const drafts = noticias.filter(n => n.status === 'draft').length
  const recent = [...noticias].slice(0, 4)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Panel de control</h1>
      <p className={styles.sub}>Bienvenido al área de administración de Sporttime Femení Vila-real C.F.</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{noticias.length}</span>
          <span className={styles.statLabel}>Noticias totales</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{published}</span>
          <span className={styles.statLabel}>Publicadas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{drafts}</span>
          <span className={styles.statLabel}>Borradores</span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Últimas noticias</h2>
          <Link to="/admin/noticias" className={styles.sectionLink}>Ver todas →</Link>
        </div>
        <div className={styles.list}>
          {recent.map(n => (
            <div key={n.id} className={styles.row}>
              <div>
                <p className={styles.rowTitle}>{n.title}</p>
                <p className={styles.rowDate}>{n.date}</p>
              </div>
              <span className={`${styles.badge} ${n.status === 'published' ? styles.pub : styles.draft}`}>
                {n.status === 'published' ? 'Publicada' : 'Borrador'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quick}>
        <Link to="/admin/noticias/nueva" className={styles.quickBtn}>
          + Nueva noticia
        </Link>
        <Link to="/noticias" target="_blank" className={styles.quickOutline}>
          Ver web pública ↗
        </Link>
      </div>
    </div>
  )
}
