import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(user, pass)
    if (ok) navigate('/admin/dashboard')
    else setError('Usuario o contraseña incorrectos')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>SF</div>
        <h1 className={styles.title}>Panel de administración</h1>
        <p className={styles.sub}>Sporttime Femení Vila-real C.F.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Usuario
            <input
              className={styles.input}
              type="text"
              value={user}
              onChange={e => { setUser(e.target.value); setError('') }}
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.label}>
            Contraseña
            <input
              className={styles.input}
              type="password"
              value={pass}
              onChange={e => { setPass(e.target.value); setError('') }}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit">Acceder</button>
        </form>
      </div>
    </div>
  )
}
