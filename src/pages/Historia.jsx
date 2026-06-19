import { useState } from 'react'
import styles from './Historia.module.css'

const CAPITULOS = [
  {
    titulo: 'Fundación',
    fecha: '8 oct 2023',
    texto: [
      'En Vila-real, una familia profundamente vinculada al fútbol femenino decidió que ninguna niña debía quedarse sin jugar por falta de experiencia, recursos o confianza.',
      'Así nació el Sporttime Femení Vila-real C.F., un proyecto creado para abrir puertas, formar personas y hacer crecer el fútbol femenino desde la pasión, el esfuerzo y la igualdad de oportunidades.',
      'Con ambición, trabajo y una pasión que nos define, seguimos creciendo cada día con el objetivo de convertirnos en un referente del fútbol femenino y representar con orgullo a Vila-real. Porque no solo queremos competir, queremos inspirar a las futuras generaciones de futbolistas.',
    ],
  },
  {
    titulo: 'Primer partido',
    fecha: '15 jun 2023',
    texto: [
      'El jueves 15 de junio tuvo lugar el primer partido de la historia del Sporttime Femení de Vila-real.',
      'Un momento histórico para el club, para las jugadoras y para todas las familias que creyeron en este proyecto desde el primer día.',
      'Ese partido marcó el inicio de un camino que seguimos construyendo juntas con esfuerzo, ilusión y mucho corazón.',
    ],
  },
  {
    titulo: 'Crecimiento',
    fecha: '2025',
    texto: [
      'El Sporttime Femení Infantil levanta una liga, LaLiga 2A, convirtiéndose en las campeonas de la 24/25.',
      'Un logro que refleja el trabajo diario de jugadoras, cuerpo técnico y familias que han apostado por este proyecto.',
      'El club crece temporada a temporada, sumando equipos, jugadoras y títulos que consolidan nuestra identidad en el fútbol femenino valenciano.',
    ],
  },
]

const CRONOLOGIA = [
  { year: '2023', mes: 'Oct', evento: 'El 8 de octubre de 2023 nace el Sporttime Femení Vila-real. Fruto de la pasión por el fútbol de una familia, que quiere extender este sentimiento.' },
  { year: '2023', mes: 'Jun', evento: 'El jueves 15 de junio tuvo lugar el primer partido de la historia del Sporttime Femení de Vila-real.' },
  { year: '2025', mes: '', evento: 'El Sporttime Femení Infantil levanta una liga, LaLiga 2A, convirtiéndose en las campeonas de la 24/25.' },
  { year: '2026', mes: '', evento: 'El club continúa creciendo con nuevos equipos y jugadoras comprometidas con el proyecto.' },
]

const PALMARES = [
  { temporada: '2024/25', titulo: 'Campeón LaLiga 2A Infantil', equipo: 'Infantil A' },
  { temporada: '2024/25', titulo: 'Subcampeón Liga Provincial Alevín', equipo: 'Alevín A' },
  { temporada: '2023/24', titulo: 'Campeón Torneo Presentación', equipo: 'Primer Equipo' },
]

const GOLEADORAS = [
  { pos: 1, nombre: 'Sara López', equipo: 'Infantil A', goles: 24, temporada: '2024/25' },
  { pos: 2, nombre: 'Carla Martínez', equipo: 'Alevín A', goles: 18, temporada: '2024/25' },
  { pos: 3, nombre: 'Marina Pérez', equipo: 'Primer Equipo', goles: 15, temporada: '2024/25' },
  { pos: 4, nombre: 'Lucía García', equipo: 'Cadete A', goles: 12, temporada: '2024/25' },
  { pos: 5, nombre: 'Alba Torres', equipo: 'Infantil A', goles: 11, temporada: '2024/25' },
]

export default function Historia() {
  const [capitulo, setCapitulo] = useState(0)
  const [tab, setTab] = useState('cronologia')

  const prev = () => setCapitulo(c => Math.max(0, c - 1))
  const next = () => setCapitulo(c => Math.min(CAPITULOS.length - 1, c + 1))
  const cap = CAPITULOS[capitulo]

  return (
    <main className={styles.page}>

      {/* Hero slider */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroImg}>
            <div className={styles.imgPlaceholder} />
          </div>
          <div className={styles.heroContent}>
            <span className={styles.heroDate}>{cap.fecha}</span>
            <h2 className={styles.heroTitle}>{cap.titulo}</h2>
            {cap.texto.map((p, i) => <p key={i} className={styles.heroPara}>{p}</p>)}
            <div className={styles.heroNav}>
              <button className={styles.navBtn} onClick={prev} disabled={capitulo === 0}>‹</button>
              <div className={styles.navDots}>
                {CAPITULOS.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === capitulo ? styles.dotActive : ''}`}
                    onClick={() => setCapitulo(i)}
                  />
                ))}
              </div>
              <button className={styles.navBtn} onClick={next} disabled={capitulo === CAPITULOS.length - 1}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
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

          {/* Cronología */}
          {tab === 'cronologia' && (
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {CRONOLOGIA.map((e, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineTop}>
                    <span className={styles.timelineYear}>{e.year}</span>
                    {e.mes && <span className={styles.timelineMes}>{e.mes}</span>}
                  </div>
                  <div className={`${styles.timelineDot} ${i === 0 ? styles.timelineDotActive : ''}`} />
                  <p className={styles.timelineText}>{e.evento}</p>
                </div>
              ))}
            </div>
          )}

          {/* Palmarés */}
          {tab === 'palmares' && (
            <div className={styles.palmares}>
              {PALMARES.map((p, i) => (
                <div key={i} className={styles.palmaresItem}>
                  <span className={styles.palmaresIcon}>🏆</span>
                  <div>
                    <p className={styles.palmaresTitle}>{p.titulo}</p>
                    <p className={styles.palmaresMeta}>{p.equipo} · {p.temporada}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Máximas goleadoras */}
          {tab === 'goleadoras' && (
            <div className={styles.goleadoras}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Jugadora</th>
                    <th>Equipo</th>
                    <th>Goles</th>
                    <th>Temporada</th>
                  </tr>
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
