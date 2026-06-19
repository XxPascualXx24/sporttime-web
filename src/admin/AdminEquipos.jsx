import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEquipos } from '../context/EquiposContext'
import styles from './AdminEquipos.module.css'

export default function AdminEquipos() {
  const { equipos, jugadoras, addEquipo, deleteEquipo } = useEquipos()
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    addEquipo(newName.trim())
    setNewName('')
    setAdding(false)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`¿Eliminar el equipo "${name}" y toda su plantilla?`)) {
      deleteEquipo(id)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Equipos</h1>
          <p className={styles.sub}>{equipos.length} equipos registrados</p>
        </div>
        <button className={styles.btn} onClick={() => setAdding(a => !a)}>
          {adding ? 'Cancelar' : '+ Nuevo equipo'}
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className={styles.addForm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nombre del equipo (ej. Cadete A)"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            autoFocus
            required
          />
          <button className={styles.btnSave} type="submit">Crear equipo</button>
        </form>
      )}

      <div className={styles.list}>
        {equipos.map(eq => {
          const count = (jugadoras[eq.id] ?? []).length
          return (
            <div key={eq.id} className={styles.row}>
              <div className={styles.rowLeft}>
                <div className={styles.avatar}>{eq.name.charAt(0)}</div>
                <div>
                  <p className={styles.rowName}>{eq.name}</p>
                  <p className={styles.rowCount}>{count} jugadora{count !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className={styles.actions}>
                <Link to={`/admin/equipos/${eq.id}`} className={styles.edit}>
                  Gestionar plantilla →
                </Link>
                <button className={styles.del} onClick={() => handleDelete(eq.id, eq.name)}>
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
