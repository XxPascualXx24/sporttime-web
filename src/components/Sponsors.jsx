import styles from './Sponsors.module.css'

const sponsors = [
  { name: 'MAVIC' },
  { name: 'CAP' },
  { name: 'sanvcces' },
  { name: 'La Masia' },
  { name: 'TORRES' },
]

export default function Sponsors() {
  return (
    <section className={styles.sponsors} data-header-theme="pink">
      <div className="container">
        <h4 className={styles.title}>Patrocinadores que confían en nosotros</h4>
        <div className={styles.row}>
          {sponsors.map(s => (
            <div key={s.name} className={styles.item}>
              <span className={styles.itemName}>{s.name}</span>
            </div>
          ))}
        </div>
        <a href="#" className={styles.link}>¿Quieres patrocinarnos? →</a>
      </div>
    </section>
  )
}
