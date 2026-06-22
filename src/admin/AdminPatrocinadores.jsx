import { useState } from 'react'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { usePatrocinadores } from '../context/PatrocinadoresContext'
import ImageUpload from './ImageUpload'
import styles from './AdminPatrocinadores.module.css'

const empty = { name: '', logo: null, link: '', order: 0 }

export default function AdminPatrocinadores() {
  const { patrocinadores, addPatrocinador, updatePatrocinador, deletePatrocinador } = usePatrocinadores()
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [newId]                   = useState(() => doc(collection(db, 'patrocinadores')).id)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleAdd = async (e) => {
    e.preventDefault()
    await addPatrocinador({ ...form, order: Number(form.order) })
    setForm(empty)
    setShowForm(false)
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({ name: p.name, logo: p.logo ?? null, link: p.link ?? '', order: p.order ?? 0 })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updatePatrocinador(editingId, { ...form, order: Number(form.order) })
    setEditingId(null)
    setForm(empty)
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Eliminar "${name}"?`)) await deletePatrocinador(id)
  }

  const cancelEdit = () => { setEditingId(null); setForm(empty) }

  const FormPanel = ({ onSubmit, isEdit }) => (
    <form onSubmit={onSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>{isEdit ? 'Editar patrocinador' : 'Nuevo patrocinador'}</h3>
      <div className={styles.formGrid}>
        <div className={styles.logoCol}>
          <ImageUpload
            label="Logo"
            value={form.logo}
            onChange={v => set('logo', v)}
            storagePath={`patrocinadores/${isEdit ? editingId : newId}/logo`}
            aspect="16/9"
          />
          <p className={styles.hint}>Recomendado: fondo blanco o transparente, formato PNG o SVG guardado como PNG.</p>
        </div>
        <div className={styles.fields}>
          <label className={styles.label}>
            Nombre del patrocinador *
            <input
              className={styles.input}
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              required
              placeholder="Empresa S.L."
            />
          </label>
          <label className={styles.label}>
            Web <span className={styles.optional}>(opcional)</span>
            <input
              className={styles.input}
              type="url"
              placeholder="https://..."
              value={form.link}
              onChange={e => set('link', e.target.value)}
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
            <button type="submit" className={styles.btnPink}>
              {isEdit ? 'Guardar cambios' : 'Añadir patrocinador'}
            </button>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={isEdit ? cancelEdit : () => { setShowForm(false); setForm(empty) }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  )

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>Patrocinadores</h1>
          <p className={styles.sub}>Los logos aparecen en el carrusel de la página de inicio.</p>
        </div>
        {!showForm && !editingId && (
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>+ Añadir patrocinador</button>
        )}
      </div>

      {showForm && <FormPanel onSubmit={handleAdd} isEdit={false} />}

      <div className={styles.list}>
        {patrocinadores.length === 0 && !showForm && (
          <p className={styles.empty}>No hay patrocinadores aún. Añade el primero.</p>
        )}
        {patrocinadores.map(p => (
          <div key={p.id}>
            {editingId === p.id ? (
              <FormPanel onSubmit={handleUpdate} isEdit={true} />
            ) : (
              <div className={styles.row}>
                <div className={styles.thumb}>
                  {p.logo
                    ? <img src={p.logo} className={styles.thumbImg} alt={p.name} />
                    : <div className={styles.thumbEmpty}>🏢</div>
                  }
                </div>
                <div className={styles.info}>
                  <p className={styles.rowName}>{p.name}</p>
                  {p.link && <a href={p.link} className={styles.rowLink} target="_blank" rel="noopener noreferrer">{p.link}</a>}
                  <p className={styles.rowOrder}>Orden: {p.order ?? 0}</p>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => startEdit(p)}>Editar</button>
                  <button className={styles.btnDel} onClick={() => handleDelete(p.id, p.name)}>Eliminar</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
