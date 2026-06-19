import { useRef, useState } from 'react'
import styles from './ImageUpload.module.css'

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = 'sporttime'
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

const MAX_PX  = 1200
const QUALITY = 0.82

function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > MAX_PX || height > MAX_PX) {
        if (width > height) { height = Math.round(height * MAX_PX / width); width = MAX_PX }
        else                { width = Math.round(width * MAX_PX / height); height = MAX_PX }
      }
      const canvas = document.createElement('canvas')
      canvas.width  = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      canvas.toBlob(resolve, 'image/jpeg', QUALITY)
    }
    img.src = url
  })
}

export default function ImageUpload({ value, onChange, label = 'Imagen', aspect = '16/9', storagePath }) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress]   = useState('')

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    e.target.value = ''

    setUploading(true)
    setProgress('Comprimiendo...')
    try {
      const blob = await compressImage(file)
      setProgress('Subiendo...')
      const form = new FormData()
      form.append('file', blob, 'image.jpg')
      form.append('upload_preset', UPLOAD_PRESET)
      if (storagePath) form.append('public_id', storagePath.replace(/\//g, '_'))

      const res  = await fetch(UPLOAD_URL, { method: 'POST', body: form })
      const data = await res.json()
      if (data.secure_url) onChange(data.secure_url)
      else throw new Error(data.error?.message ?? 'Upload failed')
    } catch (err) {
      console.error('Error subiendo imagen:', err)
    } finally {
      setUploading(false)
      setProgress('')
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
            <span className={styles.hint}>{uploading ? progress : 'Haz clic para subir imagen'}</span>
            {!uploading && <span className={styles.formats}>JPG, PNG, WEBP</span>}
          </div>
        )}
        <div className={styles.overlay}>
          <span>{uploading ? progress : value ? 'Cambiar imagen' : 'Subir imagen'}</span>
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
