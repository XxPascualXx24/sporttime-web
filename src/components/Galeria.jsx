import { useGaleria } from '../context/GaleriaContext'
import styles from './Galeria.module.css'

export default function Galeria() {
  const { fotos } = useGaleria()
  if (fotos.length === 0) return null

  return (
    <section className="section section-light" data-header-theme="light">
      <div className="container">
        <div className={styles.header}>
          <h2>Galería de fotos</h2>
          <p className={styles.sub}>Momentos del club, partidos y entrenamientos</p>
        </div>
        <div className={styles.grid}>
          {fotos.map(f => (
            <div key={f.id} className={styles.item}>
              <img src={f.image} alt={f.caption ?? 'Foto del club'} className={styles.img} />
              {f.caption && <p className={styles.caption}>{f.caption}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
