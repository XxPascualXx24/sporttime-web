import { useParams, Link } from 'react-router-dom'
import { useEquipos } from '../context/EquiposContext'
import styles from './EquipoDetalle.module.css'

const sublinks = [
  { label: 'estadísticas',        href: '#' },
  { label: 'calendario completo', href: '#' },
  { label: 'noticias',            href: '#' },
  { label: 'fotogalería',         href: '#' },
]

const POSITION_ORDER = ['Portera', 'Defensa', 'Centrocampista', 'Delantera', 'Entrenadora']
const POSITION_LABEL = {
  'Entrenadora':     'Cuerpo técnico',
  'Portera':         'Porteras',
  'Defensa':         'Defensas',
  'Centrocampista':  'Centrocampistas',
  'Delantera':       'Delanteras',
}

export default function EquipoDetalle() {
  const { id } = useParams()
  const { equipos, jugadoras } = useEquipos()

  const equipo  = equipos.find(e => e.id === id)
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

  // Group by position preserving order
  const groups = POSITION_ORDER.reduce((acc, pos) => {
    const group = players.filter(p => p.position === pos)
    if (group.length > 0) acc.push({ pos, players: group })
    return acc
  }, [])

  // Players with unknown position go last
  const knownPositions = new Set(POSITION_ORDER)
  const others = players.filter(p => !knownPositions.has(p.position))
  if (others.length > 0) groups.push({ pos: 'Otras', players: others })

  const renderCard = (p) => {
    const isPortera = p.position?.toLowerCase().includes('portera')
    return p.photo ? (
      <div key={p.id} className={`${styles.card} ${styles.cardWithPhoto}`}>
        <div className={styles.photoArea}>
          <img src={p.photo} className={styles.playerPhoto} alt={p.name} />
        </div>
        <div className={styles.photoGradient} />
        {p.number && <span className={styles.dorsalOverlay}>{p.number}</span>}
        <div className={styles.nameArea}>
          <span className={styles.nameFull}>{p.name}</span>
          <span className={styles.posBadge}>{p.position}</span>
        </div>
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
      <div key={p.id} className={styles.card}>
        <span className={styles.playerName}>{p.name}</span>
        <span className={styles.number}>{p.number}</span>
        <span className={styles.position}>{p.position}</span>
      </div>
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
          groups.map(({ pos, players: group }) => (
            <section key={pos} className={styles.posSection}>
              <h2 className={styles.posTitle}>
                {POSITION_LABEL[pos] ?? pos}
              </h2>
              <div className={styles.grid}>
                {group.map(renderCard)}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  )
}
