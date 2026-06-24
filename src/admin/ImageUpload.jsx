import { useRef, useState } from 'react'
import styles from './ImageUpload.module.css'

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

function autoFormat(url) {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.includes('/upload/f_auto') ? url : url.replace('/upload/', '/upload/f_auto,q_auto/')
}
const UPLOAD_PRESET = 'sporttime'
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

const MAX_PX        = 1400
const QUALITY       = 0.82
const SKIP_IF_UNDER = 400 * 1024 // no comprimir si ya pesa menos de 400 KB

function compressImage(file) {
  // Si el archivo ya es pequeño, lo subimos directamente sin pasar por canvas
  if (file.size <= SKIP_IF_UNDER) return Promise.resolve(file)

  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    // Si algo falla (HEIC, formato raro, canvas demasiado grande…) usamos el archivo original
    const fallback = () => { URL.revokeObjectURL(url); resolve(file) }

    // Timeout de seguridad: si en 15 segundos no termina, usamos el original
    const timer = setTimeout(fallback, 15_000)

    img.onerror = () => { clearTimeout(timer); fallback() }

    img.onload = () => {
      clearTimeout(timer)
      URL.revokeObjectURL(url)
      try {
        let { width, height } = img
        if (width > MAX_PX || height > MAX_PX) {
          if (width > height) { height = Math.round(height * MAX_PX / width); width = MAX_PX }
          else                { width = Math.round(width * MAX_PX / height); height = MAX_PX }
        }
        const canvas = document.createElement('canvas')
        canvas.width  = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        canvas.toBlob(blob => resolve(blob ?? file), 'image/jpeg', QUALITY)
      } catch {
        resolve(file)
      }
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
      if (storagePath) form.append('public_id', `${storagePath.replace(/\//g, '_')}_${Date.now()}`)

      const res  = await fetch(UPLOAD_URL, { method: 'POST', body: form })
      const data = await res.json()
      if (data.secure_url) {
        // Añadir f_auto,q_auto para que Cloudinary convierta cualquier formato
        // (HEIC, AVIF, etc.) al formato más compatible con el navegador
        onChange(autoFormat(data.secure_url))
      } else throw new Error(data.error?.message ?? 'Upload failed')
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
          <img src={autoFormat(value)} className={styles.img} alt="preview" />
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
