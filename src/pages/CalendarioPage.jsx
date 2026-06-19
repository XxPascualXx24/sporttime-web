import { useState } from 'react'
import styles from './CalendarioPage.module.css'

const months = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']

const matches = [
  {
    id: 1,
    played: true,
    homeTeam: 'Juvenil B',
    awayTeam: 'Zamora',
    homeScore: 2,
    awayScore: 2,
    category: 'Cantera',
    subcategory: 'Juvenil B',
    competition: 'División de Honor Juvenil',
    matchday: 'Jornada 36',
    date: 'Domingo, 3 de mayo, 12:00h',
    venue: 'Ciudad Deportiva Miralcamp',
  },
  { id: 2,  played: false },
  { id: 3,  played: false },
  { id: 4,  played: false },
  { id: 5,  played: false },
  { id: 6,  played: false },
  { id: 7,  played: false },
  { id: 8,  played: false },
  { id: 9,  played: false },
  { id: 10, played: false },
  { id: 11, played: false },
  { id: 12, played: false },
]

function MatchCard({ match }) {
  if (!match.played) {
    return <div className={styles.placeholder} />
  }

  return (
    <div className={styles.card}>
      <div className={styles.result}>
        <div className={styles.teamSide}>
          <div className={styles.teamLogo} />
          <span className={styles.teamName}>{match.homeTeam}</span>
        </div>
        <span className={styles.score}>
          {match.homeScore}-{match.awayScore}
        </span>
        <div className={styles.teamSide}>
          <div className={styles.teamLogo} />
          <span className={styles.teamName}>{match.awayTeam}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.info}>
        <p className={styles.cats}>{match.category} · {match.subcategory}</p>
        <p className={styles.competition}>{match.competition}</p>
        <p className={styles.matchday}>{match.matchday}</p>
        <p className={styles.detail}>
          <span className={styles.dot} /> {match.date}
        </p>
        <p className={styles.detail}>
          <span className={styles.dot} /> {match.venue}
        </p>
      </div>
    </div>
  )
}

export default function CalendarioPage() {
  const [activeMonth, setActiveMonth] = useState('Jun')

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Calendario</h1>

        {/* Month selector */}
        <div className={styles.monthScroll}>
          <div className={styles.months}>
            {months.map(m => (
              <button
                key={m}
                className={`${styles.month} ${activeMonth === m ? styles.monthActive : ''}`}
                onClick={() => setActiveMonth(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.todayWrap}>
          <button className={styles.todayBtn} onClick={() => setActiveMonth('Jun')}>
            Ir a la fecha actual
          </button>
        </div>

        {/* Match grid */}
        <div className={styles.grid}>
          {matches.map(m => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    </main>
  )
}
