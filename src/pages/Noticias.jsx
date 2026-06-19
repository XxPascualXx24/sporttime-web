import { useState } from 'react'
import { useNoticias } from '../context/NoticiasContext'
import styles from './Noticias.module.css'

function Tag({ label }) {
  if (!label) return null
  return <span className={styles.tag}>{label}</span>
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
}

function groupByDate(noticias) {
  const map = {}
  noticias.forEach(n => {
    const key = n.date
    if (!map[key]) map[key] = []
    map[key].push(n)
  })
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, articles]) => ({ date, articles }))
}

const imgStyle = (photo) => photo
  ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  : undefined

export default function Noticias() {
  const { noticias } = useNoticias()
  const [query, setQuery] = useState('')

  const published = noticias.filter(n => n.status === 'published')
  const filtered = published.filter(n =>
    n.title.toLowerCase().includes(query.toLowerCase()) ||
    n.content.toLowerCase().includes(query.toLowerCase())
  )

  const groups = groupByDate(filtered)

  return (
    <main className={styles.page}>
      <div className={styles.searchWrap}>
        <input
          type="text"
          placeholder="Buscar noticias..."
          className={styles.search}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="container">
        <h1 className={styles.title}>Noticias</h1>

        {groups.length === 0 && (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0' }}>
            {query ? 'No se encontraron noticias.' : 'No hay noticias publicadas aún.'}
          </p>
        )}

        {groups.map((group, gi) => (
          <section key={group.date} className={styles.group}>
            <p className={styles.dateLabel}>{formatDate(group.date)}</p>

            {gi === 0 && group.articles[0] && (
              <div className={styles.featured}>
                <div className={styles.featuredImg} style={imgStyle(group.articles[0].image)} />
                <Tag label={group.articles[0].tag} />
                <span className={styles.time}>{group.articles[0].date}</span>
                <div className={styles.featuredTitle}>{group.articles[0].title}</div>
                <p className={styles.featuredContent}>{group.articles[0].content}</p>
              </div>
            )}

            {(gi === 0 ? group.articles.slice(1) : group.articles).length > 0 && (
              <div className={styles.grid}>
                {(gi === 0 ? group.articles.slice(1) : group.articles).map(a => (
                  <div key={a.id} className={styles.card}>
                    <div className={styles.cardImg} style={imgStyle(a.image)} />
                    <Tag label={a.tag} />
                    <span className={styles.time}>{a.date}</span>
                    <div className={styles.cardTitle}>{a.title}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}
