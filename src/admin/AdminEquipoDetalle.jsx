import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useEquipos } from '../context/EquiposContext'
import ImageUpload from './ImageUpload'
import styles from './AdminEquipoDetalle.module.css'

const POSITIONS = ['Portera', 'Defensa', 'Centrocampista', 'Delantera', 'Entrenadora']

const emptyPlayer = {
  name: '', number: '', position: 'Defensa', photo: null,
  partidos: 0, goles: 0, asistencias: 0,
  partidosTemp: 0, golesTemp: 0, asistenciasTemp: 0,
  temporada: '2025/2026',
}

export default function AdminEquipoDetalle() {
  const { id } = useParams()
  const { equipos, jugadoras, addJugadora, updateJugadora, deleteJugadora, updateEquipo } = useEquipos()

  const equipo = equipos.find(e => e.id === id)
  const players = jugadoras[id] ?? []

  const [form, setForm] = useState(emptyPlayer)
  const [editingId, setEditingId] = useState(null)
  const [editFields, setEditFields] = useState(emptyPlayer)
  const [editName, setEditName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [newPlayerId, setNewPlayerId] = useState(() => doc(collection(db, 'jugadoras')).id)

  if (!equipo) {
    return (
      <div className={styles.page}>
        <Link to="/admin/equipos" className={styles.back}>← Volver</Link>
        <p style={{ color: 'var(--muted)' }}>Equipo no encontrado.</p>
      </div>
    )
  }

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setEditField = (k, v) => setEditFields(f => ({ ...f, [k]: v }))

  const handleAddPlayer = async (e) => {
    e.preventDefault()
    await addJugadora(id, {
      ...form,
      number: Number(form.number),
      partidos: Number(form.partidos),
      goles: Number(form.goles),
      asistencias: Number(form.asistencias),
      partidosTemp: Number(form.partidosTemp),
      golesTemp: Number(form.golesTemp),
      asistenciasTemp: Number(form.asistenciasTemp),
    }, newPlayerId)
    setForm(emptyPlayer)
    setShowForm(false)
    setNewPlayerId(doc(collection(db, 'jugadoras')).id)
  }

  const startEditName = () => setEditName(equipo.name)
  const saveEditName = () => {
    if (editName.trim()) updateEquipo(id, { name: editName.trim() })
    setEditName('')
  }

  const handleDeletePlayer = (jid, name) => {
    if (window.confirm(`¿Dar de baja a "${name}"?`)) deleteJugadora(id, jid)
  }

  const startEditPlayer = (j) => {
    setEditingId(j.id)
    setEditFields({
      name: j.name, number: j.number, position: j.position, photo: j.photo ?? null,
      partidos: j.partidos ?? 0, goles: j.goles ?? 0, asistencias: j.asistencias ?? 0,
      partidosTemp: j.partidosTemp ?? 0, golesTemp: j.golesTemp ?? 0, asistenciasTemp: j.asistenciasTemp ?? 0,
      temporada: j.temporada ?? '2025/2026',
    })
  }

  const saveEditPlayer = async () => {
    await updateJugadora(id, editingId, {
      ...editFields,
      number: Number(editFields.number),
      partidos: Number(editFields.partidos),
      goles: Number(editFields.goles),
      asistencias: Number(editFields.asistencias),
      partidosTemp: Number(editFields.partidosTemp),
      golesTemp: Number(editFields.golesTemp),
      asistenciasTemp: Number(editFields.asistenciasTemp),
    })
    setEditingId(null)
    setEditFields(emptyPlayer)
  }

  const cancelEdit = () => { setEditingId(null); setEditFields(emptyPlayer) }

  return (
    <div className={styles.page}>
      <Link to="/admin/equipos" className={styles.back}>← Equipos</Link>

      {/* Team header */}
      <div className={styles.teamHeader}>
        <div className={styles.teamPhoto}>
          <ImageUpload
            label="Foto del equipo"
            value={equipo.photo ?? null}
            onChange={val => updateEquipo(id, { photo: val })}
            storagePath={`equipos/${id}/team`}
            aspect="16/9"
          />
        </div>
        <div className={styles.head}>
          {editName !== '' ? (
            <div className={styles.nameEdit}>
              <input className={styles.nameInput} value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
              <button className={styles.btnSave} onClick={saveEditName}>Guardar</button>
              <button className={styles.btnCancel} onClick={() => setEditName('')}>Cancelar</button>
            </div>
          ) : (
            <div className={styles.nameRow}>
              <h1 className={styles.title}>{equipo.name}</h1>
              <button className={styles.editNameBtn} onClick={startEditName}>Editar nombre</button>
            </div>
          )}
          <p className={styles.sub}>{players.length} jugadora{players.length !== 1 ? 's' : ''} en plantilla</p>
        </div>
      </div>

      {/* Player list */}
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>Foto</span>
          <span>#</span>
          <span>Nombre</span>
          <span>Posición</span>
          <span>Acciones</span>
        </div>

        {players.length === 0 && <p className={styles.empty}>No hay jugadoras. Añade la primera.</p>}

        {players.map(j => (
          <div key={j.id}>
            <div className={styles.row}>
              <div className={styles.thumb}>
                {j.photo
                  ? <img src={j.photo} className={styles.thumbImg} alt={j.name} />
                  : <div className={styles.thumbEmpty}>{j.name.charAt(0)}</div>
                }
              </div>
              <span className={styles.num}>{j.number}</span>
              <span className={styles.name}>{j.name}</span>
              <span className={styles.pos}>{j.position}</span>
              <div className={styles.actions}>
                <button className={styles.edit} onClick={() => editingId === j.id ? cancelEdit() : startEditPlayer(j)}>
                  {editingId === j.id ? 'Cerrar' : 'Editar'}
                </button>
                <button className={styles.del} onClick={() => handleDeletePlayer(j.id, j.name)}>Baja</button>
              </div>
            </div>

            {/* Expanded edit panel */}
            {editingId === j.id && (
              <div className={styles.editPanel}>
                <div className={styles.editGrid}>
                  <div className={styles.editPhotoCol}>
                    <ImageUpload label="Foto" value={editFields.photo} onChange={v => setEditField('photo', v)} storagePath={`jugadoras/${id}/${editingId}`} aspect="3/4" />
                  </div>
                  <div className={styles.editFields}>
                    <div className={styles.editRow}>
                      <label className={styles.label}>
                        Dorsal
                        <input className={styles.input} type="number" min="1" max="99"
                          value={editFields.number} onChange={e => setEditField('number', e.target.value)} />
                      </label>
                      <label className={`${styles.label} ${styles.labelGrow}`}>
                        Nombre
                        <input className={styles.input} type="text"
                          value={editFields.name} onChange={e => setEditField('name', e.target.value)} />
                      </label>
                      <label className={styles.label}>
                        Posición
                        <select className={styles.input} value={editFields.position} onChange={e => setEditField('position', e.target.value)}>
                          {POSITIONS.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </label>
                    </div>

                    <div className={styles.statsSection}>
                      <p className={styles.statsTitle}>Estadísticas</p>
                      <label className={styles.label} style={{ maxWidth: 160 }}>
                        Temporada
                        <input className={styles.input} type="text" placeholder="2025/2026"
                          value={editFields.temporada} onChange={e => setEditField('temporada', e.target.value)} />
                      </label>
                      <div className={styles.statsGrid}>
                        <div className={styles.statsCol}>
                          <span className={styles.statsColHead}>Totales</span>
                          <label className={styles.label}>Partidos<input className={styles.input} type="number" min="0" value={editFields.partidos} onChange={e => setEditField('partidos', e.target.value)} /></label>
                          <label className={styles.label}>Goles<input className={styles.input} type="number" min="0" value={editFields.goles} onChange={e => setEditField('goles', e.target.value)} /></label>
                          <label className={styles.label}>Asistencias<input className={styles.input} type="number" min="0" value={editFields.asistencias} onChange={e => setEditField('asistencias', e.target.value)} /></label>
                        </div>
                        <div className={styles.statsCol}>
                          <span className={styles.statsColHead}>Esta temporada</span>
                          <label className={styles.label}>Partidos<input className={styles.input} type="number" min="0" value={editFields.partidosTemp} onChange={e => setEditField('partidosTemp', e.target.value)} /></label>
                          <label className={styles.label}>Goles<input className={styles.input} type="number" min="0" value={editFields.golesTemp} onChange={e => setEditField('golesTemp', e.target.value)} /></label>
                          <label className={styles.label}>Asistencias<input className={styles.input} type="number" min="0" value={editFields.asistenciasTemp} onChange={e => setEditField('asistenciasTemp', e.target.value)} /></label>
                        </div>
                      </div>
                    </div>

                    <div className={styles.addBtns}>
                      <button type="button" className={styles.btnPink} onClick={saveEditPlayer}>Guardar cambios</button>
                      <button type="button" className={styles.btnGhost} onClick={cancelEdit}>Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add player form */}
      {showForm ? (
        <form onSubmit={handleAddPlayer} className={styles.addForm}>
          <h3 className={styles.addTitle}>Añadir jugadora</h3>
          <div className={styles.addGrid}>
            <div className={styles.addPhotoCol}>
              <ImageUpload label="Foto" value={form.photo} onChange={v => setField('photo', v)} storagePath={`jugadoras/${id}/${newPlayerId}`} aspect="3/4" />
            </div>
            <div className={styles.addFields}>
              <div className={styles.addRow}>
                <label className={styles.label}>
                  Dorsal
                  <input className={styles.input} type="number" min="1" max="99"
                    value={form.number} onChange={e => setField('number', e.target.value)} required />
                </label>
                <label className={`${styles.label} ${styles.labelGrow}`}>
                  Nombre
                  <input className={styles.input} type="text" placeholder="Nombre de la jugadora"
                    value={form.name} onChange={e => setField('name', e.target.value)} required />
                </label>
                <label className={styles.label}>
                  Posición
                  <select className={styles.input} value={form.position} onChange={e => setField('position', e.target.value)}>
                    {POSITIONS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </label>
              </div>

              <div className={styles.statsSection}>
                <p className={styles.statsTitle}>Estadísticas</p>
                <label className={styles.label} style={{ maxWidth: 160 }}>
                  Temporada
                  <input className={styles.input} type="text" placeholder="2025/2026"
                    value={form.temporada} onChange={e => setField('temporada', e.target.value)} />
                </label>
                <div className={styles.statsGrid}>
                  <div className={styles.statsCol}>
                    <span className={styles.statsColHead}>Totales</span>
                    <label className={styles.label}>Partidos<input className={styles.input} type="number" min="0" value={form.partidos} onChange={e => setField('partidos', e.target.value)} /></label>
                    <label className={styles.label}>Goles<input className={styles.input} type="number" min="0" value={form.goles} onChange={e => setField('goles', e.target.value)} /></label>
                    <label className={styles.label}>Asistencias<input className={styles.input} type="number" min="0" value={form.asistencias} onChange={e => setField('asistencias', e.target.value)} /></label>
                  </div>
                  <div className={styles.statsCol}>
                    <span className={styles.statsColHead}>Esta temporada</span>
                    <label className={styles.label}>Partidos<input className={styles.input} type="number" min="0" value={form.partidosTemp} onChange={e => setField('partidosTemp', e.target.value)} /></label>
                    <label className={styles.label}>Goles<input className={styles.input} type="number" min="0" value={form.golesTemp} onChange={e => setField('golesTemp', e.target.value)} /></label>
                    <label className={styles.label}>Asistencias<input className={styles.input} type="number" min="0" value={form.asistenciasTemp} onChange={e => setField('asistenciasTemp', e.target.value)} /></label>
                  </div>
                </div>
              </div>

              <div className={styles.addBtns}>
                <button type="submit" className={styles.btnPink}>Añadir jugadora</button>
                <button type="button" className={styles.btnGhost} onClick={() => { setShowForm(false); setForm(emptyPlayer) }}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>+ Añadir jugadora</button>
      )}
    </div>
  )
}
