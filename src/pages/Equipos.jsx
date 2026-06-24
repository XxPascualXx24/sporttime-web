import { Link } from 'react-router-dom'
import { useEquipos } from '../context/EquiposContext'
import styles from './Equipos.module.css'

export default function Equipos() {
  const { equipos } = useEquipos()

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Equipos</h1>
        <div className={styles.grid}>
          {equipos.map(eq => (
            <Link key={eq.id} to={`/equipos/${eq.id}`} className={styles.card}>
              <div
                className={styles.img}
                style={eq.photo ? {
                  backgroundImage: `url(${eq.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
              >
                {!eq.photo && <span className={styles.imgLabel}>Foto del equipo</span>}
              </div>
              <span className={`${styles.name} ${!eq.photo ? styles.nameBelow : ''}`}>{eq.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
