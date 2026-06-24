import { useState } from 'react'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useHistorias } from '../context/HistoriasContext'
import ImageUpload from './ImageUpload'
import styles from './AdminHistorias.module.css'

const empty = { title: '', tag: '', date: '', image: null, link: '' }

export default function AdminHistorias() {
  const { historias, addHistoria, updateHistoria, deleteHistoria } = useHistorias()
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [newId]                   = useState(() => doc(collection(db, 'historias')).id)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = async (e) => {
    e.preventDefault()
    await addHistoria(form)
    setForm(empty)
    setShowForm(false)
  }

  const startEdit = (h) => {
    setEditingId(h.id)
    setForm({ title: h.title, tag: h.tag ?? '', date: h.date ?? '', image: h.image ?? null, link: h.link ?? '' })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateHistoria(editingId, form)
    setEditingId(null)
    setForm(empty)
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`¿Eliminar "${title}"?`)) await deleteHistoria(id)
  }

  const cancelEdit = () => { setEditingId(null); setForm(empty) }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Historias del club</h1>
        {!showForm && !editingId && (
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>+ Nueva historia</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className={styles.form}>
          <h3 className={styles.formTitle}>Nueva historia</h3>
          <div className={styles.formGrid}>
            <div className={styles.photoCol}>
              <ImageUpload
                label="Imagen"
                value={form.image}
                onChange={v => set('image', v)}
                storagePath={`historias/${newId}/cover`}
                aspect="16/9"
              />
            </div>
            <div className={styles.fields}>
              <label className={styles.label}>
                Título *
                <input className={styles.input} type="text" value={form.title} onChange={e => set('title', e.target.value)} required />
              </label>
              <label className={styles.label}>
                Tag <span className={styles.optional}>(opcional)</span>
                <input className={styles.input} type="text" placeholder="Nuevo, Especial..." value={form.tag} onChange={e => set('tag', e.target.value)} />
              </label>
              <label className={styles.label}>
                Fecha <span className={styles.optional}>(ej: 8 jun 2026)</span>
                <input className={styles.input} type="text" placeholder="8 jun 2026" value={form.date} onChange={e => set('date', e.target.value)} />
              </label>
              <label className={styles.label}>
                Enlace <span className={styles.optional}>(opcional)</span>
                <input className={styles.input} type="url" placeholder="https://..." value={form.link} onChange={e => set('link', e.target.value)} />
              </label>
              <div className={styles.btns}>
                <button type="submit" className={styles.btnPink}>Añadir historia</button>
                <button type="button" className={styles.btnGhost} onClick={() => { setShowForm(false); setForm(empty) }}>Cancelar</button>
              </div>
            </div>
          </div>
        </form>
      )}

      <div className={styles.list}>
        {historias.length === 0 && !showForm && (
          <p className={styles.empty}>No hay historias aún. Añade la primera.</p>
        )}
        {historias.map(h => (
          <div key={h.id}>
            {editingId === h.id ? (
              <form onSubmit={handleUpdate} className={styles.form}>
                <h3 className={styles.formTitle}>Editar historia</h3>
                <div className={styles.formGrid}>
                  <div className={styles.photoCol}>
                    <ImageUpload
                      label="Imagen"
                      value={form.image}
                      onChange={v => set('image', v)}
                      storagePath={`historias/${editingId}/cover`}
                      aspect="16/9"
                    />
                  </div>
                  <div className={styles.fields}>
                    <label className={styles.label}>
                      Título *
                      <input className={styles.input} type="text" value={form.title} onChange={e => set('title', e.target.value)} required />
                    </label>
                    <label className={styles.label}>
                      Tag <span className={styles.optional}>(opcional)</span>
                      <input className={styles.input} type="text" placeholder="Nuevo, Especial..." value={form.tag} onChange={e => set('tag', e.target.value)} />
                    </label>
                    <label className={styles.label}>
                      Fecha <span className={styles.optional}>(ej: 8 jun 2026)</span>
                      <input className={styles.input} type="text" placeholder="8 jun 2026" value={form.date} onChange={e => set('date', e.target.value)} />
                    </label>
                    <label className={styles.label}>
                      Enlace <span className={styles.optional}>(opcional)</span>
                      <input className={styles.input} type="url" placeholder="https://..." value={form.link} onChange={e => set('link', e.target.value)} />
                    </label>
                    <div className={styles.btns}>
                      <button type="submit" className={styles.btnPink}>Guardar cambios</button>
                      <button type="button" className={styles.btnGhost} onClick={cancelEdit}>Cancelar</button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className={styles.row}>
                <div className={styles.thumb}>
                  {h.image
                    ? <img src={h.image} className={styles.thumbImg} alt={h.title} />
                    : <div className={styles.thumbEmpty}>📷</div>
                  }
                </div>
                <div className={styles.info}>
                  {h.tag && <span className={styles.tag}>{h.tag}</span>}
                  <p className={styles.rowTitle}>{h.title}</p>
                  {h.date && <p className={styles.rowDate}>{h.date}</p>}
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => startEdit(h)}>Editar</button>
                  <button className={styles.btnDel} onClick={() => handleDelete(h.id, h.title)}>Eliminar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
