import styles from './Diferencias.module.css'

const items = [
  {
    icon: '🎯',
    title: 'Transcendentes',
    desc: 'Más que ganar partidos, formamos personas. El fútbol es una herramienta para crecer con disciplina, trabajo en equipo, actitud y valores que trascienden el campo.',
  },
  {
    icon: '♡',
    title: 'Comunidad',
    desc: 'Somos una familia diversa, acogedora y una plataforma digital que mantiene a todo el mundo conectado: jugadoras, familias y cuerpo técnico.',
  },
  {
    icon: '⚙️',
    title: 'Metodología',
    desc: 'Aplicamos las últimas metodologías del fútbol femenino adaptadas a cada categoría.',
  },
]

export default function Diferencias() {
  return (
    <section className="section section-muted" data-header-theme="light">
      <div className="container">
        <h2>Por qué somos diferentes</h2>
        <div className="grid grid-3">
          {items.map(item => (
            <div key={item.title} className={styles.card}>
              <h4>{item.title} <span className={styles.icon}>{item.icon}</span></h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
