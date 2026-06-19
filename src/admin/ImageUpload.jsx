import { useRef } from 'react'
import styles from './ImageUpload.module.css'

export default function ImageUpload({ value, onChange, label = 'Imagen', aspect = '16/9' }) {
  const inputRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div className={styles.wrap}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        className={styles.preview}
        style={{ aspectRatio: aspect }}
        onClick={() => inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && inputRef.current.click()}
      >
        {value ? (
          <img src={value} className={styles.img} alt="preview" />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.icon}>↑</span>
            <span className={styles.hint}>Haz clic para subir imagen</span>
            <span className={styles.formats}>JPG, PNG, WEBP</span>
          </div>
        )}
        <div className={styles.overlay}>
          <span>{value ? 'Cambiar imagen' : 'Subir imagen'}</span>
        </div>
      </div>
      {value && (
        <button
          type="button"
          className={styles.remove}
          onClick={() => onChange(null)}
        >
          × Eliminar imagen
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
      />
    </div>
  )
}
