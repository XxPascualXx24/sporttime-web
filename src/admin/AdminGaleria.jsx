import { useState } from 'react'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useGaleria } from '../context/GaleriaContext'
import ImageUpload from './ImageUpload'
import styles from './AdminGaleria.module.css'

const empty = { image: null, caption: '', order: 0 }

export default function AdminGaleria() {
  const { fotos, addFoto, updateFoto, deleteFota } = useGaleria()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState(empty)
  const [editId, setEditId]     = useState(null)
  const [newId]                 = useState(() => doc(collection(db, 'galeria')).id)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = async (e) => {
    e.preventDefault()
    await addFoto({ ...form, order: Number(form.order) })
    setForm(empty); setShowForm(false)
  }

  const startEdit = (f) => {
    setEditId(f.id)
    setForm({ image: f.image ?? null, caption: f.caption ?? '', order: f.order ?? 0 })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateFoto(editId, { ...form, order: Number(form.order) })
    setEditId(null); setForm(empty)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta foto?')) await deleteFota(id)
  }

  const cancel = () => { setShowForm(false); setEditId(null); setForm(empty) }

  const FormPanel = ({ onSubmit, isEdit }) => (
    <form onSubmit={onSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>{isEdit ? 'Editar foto' : 'Añadir foto'}</h3>
      <div className={styles.formGrid}>
        <ImageUpload
          label="Foto"
          value={form.image}
          onChange={v => set('image', v)}
          storagePath={`galeria/${isEdit ? editId : newId}/foto`}
          aspect="4/3"
        />
        <div className={styles.fields}>
          <label className={styles.label}>
            Pie de foto <span className={styles.optional}>(opcional)</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Partido vs. Villarreal · Jun 2025"
              value={form.caption}
              onChange={e => set('caption', e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Orden <span className={styles.optional}>(número menor = antes)</span>
            <input
              className={styles.input}
              type="number"
              min="0"
              value={form.order}
              onChange={e => set('order', e.target.value)}
            />
          </label>
          <div className={styles.btns}>
            <button type="submit" className={styles.btnPink} disabled={!form.image}>
              {isEdit ? 'Guardar cambios' : 'Añadir foto'}
            </button>
            <button type="button" className={styles.btnGhost} onClick={cancel}>Cancelar</button>
          </div>
        </div>
      </div>
    </form>
  )

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>Galería de fotos</h1>
          <p className={styles.sub}>Las fotos aparecen en la sección "Galería de fotos" de la página de inicio.</p>
        </div>
        {!showForm && !editId && (
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>+ Añadir foto</button>
        )}
      </div>

      {showForm && <FormPanel onSubmit={handleAdd} isEdit={false} />}

      <div className={styles.grid}>
        {fotos.length === 0 && !showForm && (
          <p className={styles.empty}>No hay fotos aún. Añade la primera.</p>
        )}
        {fotos.map(f => (
          <div key={f.id}>
            {editId === f.id ? (
              <FormPanel onSubmit={handleUpdate} isEdit={true} />
            ) : (
              <div className={styles.card}>
                <img src={f.image} alt={f.caption ?? 'Foto'} className={styles.cardImg} />
                {f.caption && <p className={styles.cardCaption}>{f.caption}</p>}
                <div className={styles.cardActions}>
                  <button className={styles.btnEdit} onClick={() => startEdit(f)}>Editar</button>
                  <button className={styles.btnDel} onClick={() => handleDelete(f.id)}>Eliminar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
