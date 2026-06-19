import { Link } from 'react-router-dom'
import { useNoticias } from '../context/NoticiasContext'
import styles from './AdminNoticias.module.css'

export default function AdminNoticias() {
  const { noticias, deleteNoticia, toggleStatus } = useNoticias()

  const handleDelete = (id, title) => {
    if (window.confirm(`¿Eliminar la noticia "${title}"?`)) {
      deleteNoticia(id)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Noticias</h1>
          <p className={styles.sub}>{noticias.length} artículos en total</p>
        </div>
        <Link to="/admin/noticias/nueva" className={styles.btn}>+ Nueva noticia</Link>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Título</span>
          <span>Tag</span>
          <span>Fecha</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {noticias.length === 0 && (
          <p className={styles.empty}>No hay noticias. Crea la primera.</p>
        )}

        {noticias.map(n => (
          <div key={n.id} className={styles.row}>
            <span className={styles.rowTitle}>{n.title}</span>
            <span className={styles.tag}>{n.tag}</span>
            <span className={styles.date}>{n.date}</span>
            <button
              className={`${styles.badge} ${n.status === 'published' ? styles.pub : styles.draft}`}
              onClick={() => toggleStatus(n.id)}
              title="Haz clic para cambiar estado"
            >
              {n.status === 'published' ? 'Publicada' : 'Borrador'}
            </button>
            <div className={styles.actions}>
              <Link to={`/admin/noticias/${n.id}`} className={styles.edit}>Editar</Link>
              <button className={styles.del} onClick={() => handleDelete(n.id, n.title)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
