import { useState } from 'react'
import { useHistoriaPage } from '../context/HistoriaPageContext'
import styles from './Historia.module.css'

/* Datos por defecto — se muestran si Firestore aún no tiene contenido */
const CAP_DEFAULT = [
  {
    id: 'd1', titulo: 'Fundación', fecha: '8 mar 2023',
    texto: [
      'En Vila-real, una familia profundamente vinculada al fútbol femenino decidió que ninguna niña debía quedarse sin jugar por falta de experiencia, recursos o confianza.',
      'Así nació el Sporttime Femení Vila-real C.F., un proyecto creado para abrir puertas, formar personas y hacer crecer el fútbol femenino desde la pasión, el esfuerzo y la igualdad de oportunidades.',
      'Con ambición, trabajo y una pasión que nos define, seguimos creciendo cada día con el objetivo de convertirnos en un referente del fútbol femenino y representar con orgullo a Vila-real.',
    ],
  },
  {
    id: 'd2', titulo: 'Primer partido', fecha: '15 jun 2023',
    texto: [
      'El jueves 15 de junio tuvo lugar el primer partido de la historia del Sporttime Femení de Vila-real.',
      'Un momento histórico para el club, para las jugadoras y para todas las familias que creyeron en este proyecto desde el primer día.',
      'Ese partido marcó el inicio de un camino que seguimos construyendo juntas con esfuerzo, ilusión y mucho corazón.',
    ],
  },
  {
    id: 'd3', titulo: 'Crecimiento', fecha: '2025',
    texto: [
      'El Sporttime Femení Infantil levanta una liga, LaLiga 2A, convirtiéndose en las campeonas de la 24/25.',
      'Un logro que refleja el trabajo diario de jugadoras, cuerpo técnico y familias que han apostado por este proyecto.',
      'El club crece temporada a temporada, sumando equipos, jugadoras y títulos que consolidan nuestra identidad en el fútbol femenino valenciano.',
    ],
  },
]

const CRON_DEFAULT = [
  { id: 'c1', year: '2023', mes: 'Mar', evento: 'El 8 de marzo de 2023 nace el Sporttime Femení Vila-real. Fruto de la pasión por el fútbol de una familia, que quiere extender este sentimiento.' },
  { id: 'c2', year: '2023', mes: 'Jun', evento: 'El jueves 15 de junio tuvo lugar el primer partido de la historia del Sporttime Femení de Vila-real.' },
  { id: 'c3', year: '2025', mes: '',    evento: 'El Sporttime Femení Infantil levanta una liga, LaLiga 2A, convirtiéndose en las campeonas de la 24/25.' },
  { id: 'c4', year: '2026', mes: '',    evento: 'El club continúa creciendo con nuevos equipos y jugadoras comprometidas con el proyecto.' },
]

const PALM_DEFAULT = [
  { id: 'p1', temporada: '2024/25', titulo: 'Campeón LaLiga 2A Infantil',        equipo: 'Infantil A' },
  { id: 'p2', temporada: '2024/25', titulo: 'Subcampeón Liga Provincial Alevín', equipo: 'Alevín A' },
  { id: 'p3', temporada: '2023/24', titulo: 'Campeón Torneo Presentación',       equipo: 'Primer Equipo' },
]

const GOLEADORAS = [
  { pos: 1, nombre: 'Sara López',    equipo: 'Infantil A',    goles: 24, temporada: '2024/25' },
  { pos: 2, nombre: 'Carla Martínez', equipo: 'Alevín A',     goles: 18, temporada: '2024/25' },
  { pos: 3, nombre: 'Marina Pérez',  equipo: 'Primer Equipo', goles: 15, temporada: '2024/25' },
  { pos: 4, nombre: 'Lucía García',  equipo: 'Cadete A',      goles: 12, temporada: '2024/25' },
  { pos: 5, nombre: 'Alba Torres',   equipo: 'Infantil A',    goles: 11, temporada: '2024/25' },
]

function parseTexto(raw) {
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'string') return raw.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
  return []
}

const CRON_PAGE_SIZE = 4

export default function Historia() {
  const { capitulos, cronologia, palmares } = useHistoriaPage()
  const [capIdx, setCapIdx]     = useState(0)
  const [tab, setTab]           = useState('cronologia')
  const [cronPage, setCronPage] = useState(0)

  const caps  = capitulos.length  > 0 ? capitulos  : CAP_DEFAULT
  const crons = cronologia.length > 0 ? cronologia : CRON_DEFAULT
  const palms = palmares.length   > 0 ? palmares   : PALM_DEFAULT

  const cap   = caps[Math.min(capIdx, caps.length - 1)]
  const texto = parseTexto(cap?.texto)

  const totalCronPages = Math.ceil(crons.length / CRON_PAGE_SIZE)
  const visibleCrons   = crons.slice(cronPage * CRON_PAGE_SIZE, (cronPage + 1) * CRON_PAGE_SIZE)

  return (
    <main className={styles.page}>

      {/* Hero slider */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroImg}>
            {cap?.imagen
              ? <img src={cap.imagen} alt={cap?.titulo} className={styles.heroImgEl} />
              : <div className={styles.imgPlaceholder} />
            }
          </div>
          <div className={styles.heroContent}>
            <span className={styles.heroDate}>{cap?.fecha}</span>
            <h2 className={styles.heroTitle}>{cap?.titulo}</h2>
            {texto.map((p, i) => <p key={i} className={styles.heroPara}>{p}</p>)}
            <div className={styles.heroNav}>
              <button className={styles.navBtn} onClick={() => setCapIdx(c => Math.max(0, c - 1))} disabled={capIdx === 0}>‹</button>
              <div className={styles.navDots}>
                {caps.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === capIdx ? styles.dotActive : ''}`}
                    onClick={() => setCapIdx(i)}
                  />
                ))}
              </div>
              <button className={styles.navBtn} onClick={() => setCapIdx(c => Math.min(caps.length - 1, c + 1))} disabled={capIdx === caps.length - 1}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.tabsSection}>
        <div className="container">
          <div className={styles.tabsRow}>
            {[
              { key: 'cronologia', label: 'Cronología' },
              { key: 'palmares',   label: 'Palmarés' },
              { key: 'goleadoras', label: 'Máximas goleadoras' },
            ].map(t => (
              <button
                key={t.key}
                className={`${styles.tabBtn} ${tab === t.key ? styles.tabBtnActive : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'cronologia' && (
            <div>
              <div className={styles.timeline}>
                <div className={styles.timelineLine} />
                {visibleCrons.map((e, i) => {
                  const globalIdx = cronPage * CRON_PAGE_SIZE + i
                  return (
                    <div key={e.id ?? globalIdx} className={styles.timelineItem}>
                      <div className={styles.timelineTop}>
                        <span className={styles.timelineYear}>{e.year}</span>
                        {e.mes && <span className={styles.timelineMes}>{e.mes}</span>}
                      </div>
                      <div className={`${styles.timelineDot} ${globalIdx === 0 ? styles.timelineDotActive : ''}`} />
                      <p className={styles.timelineText}>{e.evento}</p>
                    </div>
                  )
                })}
              </div>
              {totalCronPages > 1 && (
                <div className={styles.cronNav}>
                  <button
                    className={styles.cronNavBtn}
                    onClick={() => setCronPage(p => Math.max(0, p - 1))}
                    disabled={cronPage === 0}
                  >‹</button>
                  <span className={styles.cronNavInfo}>{cronPage + 1} / {totalCronPages}</span>
                  <button
                    className={styles.cronNavBtn}
                    onClick={() => setCronPage(p => Math.min(totalCronPages - 1, p + 1))}
                    disabled={cronPage === totalCronPages - 1}
                  >›</button>
                </div>
              )}
            </div>
          )}

          {tab === 'palmares' && (
            <div className={styles.palmares}>
              {palms.map((p, i) => (
                <div key={p.id ?? i} className={styles.palmaresItem}>
                  <span className={styles.palmaresIcon}>🏆</span>
                  <div>
                    <p className={styles.palmaresTitle}>{p.titulo}</p>
                    <p className={styles.palmaresMeta}>{p.equipo} · {p.temporada}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'goleadoras' && (
            <div className={styles.goleadoras}>
              <table className={styles.table}>
                <thead>
                  <tr><th>#</th><th>Jugadora</th><th>Equipo</th><th>Goles</th><th>Temporada</th></tr>
                </thead>
                <tbody>
                  {GOLEADORAS.map(g => (
                    <tr key={g.pos}>
                      <td className={styles.pos}>{g.pos}</td>
                      <td className={styles.nombre}>{g.nombre}</td>
                      <td>{g.equipo}</td>
                      <td className={styles.goles}>{g.goles}</td>
                      <td>{g.temporada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
