import { useState } from 'react'
import { useHistoriaPage } from '../context/HistoriaPageContext'
import styles from './AdminHistoriaPage.module.css'

/* ── helpers ── */
const emptyCapitulo  = { titulo: '', fecha: '', texto: '', order: 0 }
const emptyCronologia = { year: '', mes: '', evento: '', order: 0 }
const emptyPalmares   = { temporada: '', titulo: '', equipo: '', order: 0 }

function Section({ title, items, empty, fields, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState(empty)
  const [editId, setEditId]     = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, order: Number(form.order) }
    if (editId) { await onUpdate(editId, data); setEditId(null) }
    else        { await onAdd(data) }
    setForm(empty)
    setShowForm(false)
  }

  const startEdit = (item) => {
    setEditId(item.id)
    const f = { ...empty }
    Object.keys(empty).forEach(k => { f[k] = item[k] ?? empty[k] })
    setForm(f)
    setShowForm(true)
  }

  const cancel = () => { setShowForm(false); setEditId(null); setForm(empty) }

  return (
    <div className={styles.section}>
      <div className={styles.secHeader}>
        <h3 className={styles.secTitle}>{title}</h3>
        {!showForm && (
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>+ Añadir</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.form}>
          {fields.map(f => (
            <label key={f.key} className={styles.label}>
              {f.label}
              {f.type === 'textarea'
                ? <textarea className={styles.textarea} rows={4} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder ?? ''} />
                : <input className={styles.input} type={f.type ?? 'text'} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder ?? ''} />
              }
            </label>
          ))}
          <div className={styles.formBtns}>
            <button type="submit" className={styles.btnPink}>{editId ? 'Guardar' : 'Añadir'}</button>
            <button type="button" className={styles.btnGhost} onClick={cancel}>Cancelar</button>
          </div>
        </form>
      )}

      <div className={styles.list}>
        {items.length === 0 && !showForm && (
          <p className={styles.empty}>No hay entradas aún.</p>
        )}
        {items.map(item => (
          <div key={item.id} className={styles.row}>
            <div className={styles.rowInfo}>
              {fields.filter(f => f.preview).map(f => (
                <span key={f.key} className={f.main ? styles.rowMain : styles.rowMeta}>
                  {item[f.key]}
                </span>
              ))}
            </div>
            <div className={styles.rowActions}>
              <button className={styles.btnEdit} onClick={() => startEdit(item)}>Editar</button>
              <button className={styles.btnDel} onClick={() => {
                if (window.confirm('¿Eliminar esta entrada?')) onDelete(item.id)
              }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminHistoriaPage() {
  const [tab, setTab] = useState('capitulos')
  const {
    capitulos,  addCapitulo,  updateCapitulo,  deleteCapitulo,
    cronologia, addCronologia, updateCronologia, deleteCronologia,
    palmares,   addPalmares,   updatePalmares,   deletePalmares,
  } = useHistoriaPage()

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>Historia del club</h1>
          <p className={styles.sub}>Gestiona el contenido de la página Historia.</p>
        </div>
      </div>

      <div className={styles.tabs}>
        {[
          { key: 'capitulos',  label: 'Capítulos' },
          { key: 'cronologia', label: 'Cronología' },
          { key: 'palmares',   label: 'Palmarés' },
        ].map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'capitulos' && (
        <Section
          title="Capítulos del slider principal"
          items={capitulos}
          empty={emptyCapitulo}
          fields={[
            { key: 'titulo', label: 'Título *', placeholder: 'Fundación', main: true, preview: true },
            { key: 'fecha',  label: 'Fecha',    placeholder: '8 mar 2023', preview: true },
            { key: 'texto',  label: 'Texto (separa párrafos con una línea en blanco)', type: 'textarea', placeholder: 'Escribe el contenido del capítulo...' },
            { key: 'order',  label: 'Orden', type: 'number' },
          ]}
          onAdd={addCapitulo}
          onUpdate={updateCapitulo}
          onDelete={deleteCapitulo}
        />
      )}

      {tab === 'cronologia' && (
        <Section
          title="Eventos de la cronología"
          items={cronologia}
          empty={emptyCronologia}
          fields={[
            { key: 'year',   label: 'Año *',  placeholder: '2023', main: true, preview: true },
            { key: 'mes',    label: 'Mes',    placeholder: 'Mar', preview: true },
            { key: 'evento', label: 'Descripción del evento *', type: 'textarea', placeholder: 'El 8 de marzo de 2023 nace el club...' },
            { key: 'order',  label: 'Orden', type: 'number' },
          ]}
          onAdd={addCronologia}
          onUpdate={updateCronologia}
          onDelete={deleteCronologia}
        />
      )}

      {tab === 'palmares' && (
        <Section
          title="Palmarés"
          items={palmares}
          empty={emptyPalmares}
          fields={[
            { key: 'titulo',    label: 'Título del logro *', placeholder: 'Campeón LaLiga 2A Infantil', main: true, preview: true },
            { key: 'equipo',    label: 'Equipo',    placeholder: 'Infantil A', preview: true },
            { key: 'temporada', label: 'Temporada', placeholder: '2024/25' },
            { key: 'order',     label: 'Orden', type: 'number' },
          ]}
          onAdd={addPalmares}
          onUpdate={updatePalmares}
          onDelete={deletePalmares}
        />
      )}
    </div>
  )
}
