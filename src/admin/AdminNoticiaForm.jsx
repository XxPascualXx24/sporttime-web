import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useNoticias } from '../context/NoticiasContext'
import ImageUpload from './ImageUpload'
import styles from './AdminNoticiaForm.module.css'

const TAGS = ['Club', 'Cantera', 'Primer equipo', 'Torneo', 'Acuerdo', 'Otro']

const empty = { title: '', tag: 'Club', content: '', date: new Date().toISOString().split('T')[0], status: 'draft', image: null }

export default function AdminNoticiaForm() {
  const { id } = useParams()
  const { noticias, addNoticia, updateNoticia } = useNoticias()
  const navigate = useNavigate()
  const isNew = id === 'nueva'

  const [form, setForm] = useState(empty)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isNew) {
      const found = noticias.find(n => n.id === id)
      if (found) setForm(found)
    }
  }, [id, isNew, noticias])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e, status) => {
    e.preventDefault()
    const data = { ...form, status: status ?? form.status }
    if (isNew) {
      addNoticia(data)
    } else {
      updateNoticia(id, data)
    }
    setSaved(true)
    setTimeout(() => navigate('/admin/noticias'), 800)
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/admin/noticias" className={styles.back}>← Volver</Link>
        <h1 className={styles.title}>{isNew ? 'Nueva noticia' : 'Editar noticia'}</h1>
      </div>

      {saved && <div className={styles.toast}>¡Guardado correctamente!</div>}

      <form onSubmit={e => handleSubmit(e, null)} className={styles.form}>
        <div className={styles.main}>
          <label className={styles.label}>
            Título
            <input
              className={styles.input}
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Título de la noticia"
              required
            />
          </label>

          <ImageUpload
            label="Imagen de portada"
            value={form.image}
            onChange={val => set('image', val)}
            aspect="16/9"
          />

          <label className={styles.label}>
            Contenido
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="Escribe aquí el contenido de la noticia..."
              rows={10}
              required
            />
          </label>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sideCard}>
            <p className={styles.sideTitle}>Publicar</p>
            <label className={styles.label}>
              Estado
              <select className={styles.select} value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="draft">Borrador</option>
                <option value="published">Publicada</option>
              </select>
            </label>
            <label className={styles.label}>
              Fecha
              <input
                className={styles.input}
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                required
              />
            </label>
            <div className={styles.btns}>
              <button type="submit" className={styles.btnSave}>
                {form.status === 'published' ? 'Actualizar' : 'Guardar borrador'}
              </button>
              {form.status !== 'published' && (
                <button type="button" className={styles.btnPublish} onClick={e => handleSubmit(e, 'published')}>
                  Publicar
                </button>
              )}
            </div>
          </div>

          <div className={styles.sideCard}>
            <p className={styles.sideTitle}>Categoría</p>
            <label className={styles.label}>
              Tag
              <select className={styles.select} value={form.tag} onChange={e => set('tag', e.target.value)}>
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}
