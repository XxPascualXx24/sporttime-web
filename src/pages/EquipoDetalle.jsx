import { useParams, Link } from 'react-router-dom'
import { useEquipos } from '../context/EquiposContext'
import styles from './EquipoDetalle.module.css'

const sublinks = [
  { label: 'estadísticas',        href: '#' },
  { label: 'calendario completo', href: '#' },
  { label: 'noticias',            href: '#' },
  { label: 'fotogalería',         href: '#' },
]

function splitName(fullName) {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return { first: '', last: parts[0] }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export default function EquipoDetalle() {
  const { id } = useParams()
  const { equipos, jugadoras } = useEquipos()

  const equipo = equipos.find(e => e.id === id)
  const players = jugadoras[id] ?? []

  if (!equipo) {
    return (
      <main className={styles.page}>
        <div className="container">
          <p className={styles.notFound}>Equipo no encontrado. <Link to="/equipos">Volver</Link></p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{equipo.name}</h1>

        <nav className={styles.subnav}>
          {sublinks.map(l => (
            <a key={l.label} href={l.href} className={styles.sublink}>{l.label}</a>
          ))}
        </nav>

        {players.length === 0 ? (
          <p className={styles.empty}>Plantilla en construcción.</p>
        ) : (
          <div className={styles.grid}>
            {players.map(p => {
              const { first, last } = splitName(p.name)
              const isPortera = p.position?.toLowerCase().includes('portera')
              return p.photo ? (
                <div key={p.id} className={`${styles.card} ${styles.cardWithPhoto}`}>
                  {/* Photo */}
                  <div className={styles.photoArea}>
                    <img src={p.photo} className={styles.playerPhoto} alt={p.name} />
                  </div>
                  {/* Gradient overlay */}
                  <div className={styles.photoGradient} />
                  {/* Dorsal — large, semi-transparent, centered */}
                  {p.number && <span className={styles.dorsalOverlay}>{p.number}</span>}
                  {/* Name + position */}
                  <div className={styles.nameArea}>
                    <span className={styles.nameFull}>{p.name}</span>
                    <span className={styles.posBadge}>{p.position}</span>
                  </div>
                  {/* Stats hover panel — 2 cols */}
                  <div className={styles.statsPanel}>
                    <div className={styles.statCol}>
                      <span className={styles.statLabel}>Partidos</span>
                      <span className={styles.statBig}>{p.partidos ?? 0}</span>
                    </div>
                    <div className={styles.statCol}>
                      <span className={styles.statLabel}>{isPortera ? 'Portería a cero' : 'Goles'}</span>
                      <span className={styles.statBig}>{isPortera ? (p.porteriasACero ?? 0) : (p.goles ?? 0)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* No photo: classic pink card */
                <div key={p.id} className={styles.card}>
                  <span className={styles.playerName}>{p.name}</span>
                  <span className={styles.number}>{p.number}</span>
                  <span className={styles.position}>{p.position}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
