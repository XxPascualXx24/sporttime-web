import { useRef, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import styles from './ImageUpload.module.css'

export default function ImageUpload({ value, onChange, label = 'Imagen', aspect = '16/9', storagePath }) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    e.target.value = ''

    if (storagePath) {
      setUploading(true)
      try {
        const storageRef = ref(storage, storagePath)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        onChange(url)
      } catch (err) {
        console.error('Error subiendo imagen:', err)
      } finally {
        setUploading(false)
      }
    } else {
      const reader = new FileReader()
      reader.onload = (ev) => onChange(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.wrap}>
      {label && <p className={styles.label}>{label}</p>}
      <div
        className={styles.preview}
        style={{ aspectRatio: aspect }}
        onClick={() => !uploading && inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && !uploading && inputRef.current.click()}
      >
        {value ? (
          <img src={value} className={styles.img} alt="preview" />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.icon}>{uploading ? '⏳' : '↑'}</span>
            <span className={styles.hint}>{uploading ? 'Subiendo...' : 'Haz clic para subir imagen'}</span>
            {!uploading && <span className={styles.formats}>JPG, PNG, WEBP</span>}
          </div>
        )}
        <div className={styles.overlay}>
          <span>{uploading ? 'Subiendo...' : value ? 'Cambiar imagen' : 'Subir imagen'}</span>
        </div>
      </div>
      {value && !uploading && (
        <button type="button" className={styles.remove} onClick={() => onChange(null)}>
          × Eliminar imagen
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: 'none' }}
        disabled={uploading}
      />
    </div>
  )
}
