import { useLandingConfig } from '../context/LandingConfigContext'
import ImageUpload from './ImageUpload'
import styles from './AdminLandingImages.module.css'

const SLOTS = [
  {
    key: 'fondoHero',
    label: 'Fondo principal (Hero)',
    desc: 'Imagen de fondo de la sección principal "Una identitat, un equip". Se superpone sobre el degradado rosa.',
    storagePath: 'landing/fondoHero',
    aspect: '16/9',
  },
  {
    key: 'fotoEquipo',
    label: 'Foto del equipo',
    desc: 'Aparece en la sección "Quiénes somos" de la página de inicio.',
    storagePath: 'landing/fotoEquipo',
    aspect: '4/3',
  },
  {
    key: 'fotoPartido',
    label: 'Foto de partido',
    desc: 'Aparece en la tarjeta "Próximos partidos" de la sección Calendario.',
    storagePath: 'landing/fotoPartido',
    aspect: '16/9',
  },
  {
    key: 'fondoCTA',
    label: 'Fondo "Apúntate"',
    desc: 'Imagen de fondo de la sección oscura con el botón de inscripción.',
    storagePath: 'landing/fondoCTA',
    aspect: '16/9',
  },
]

export default function AdminLandingImages() {
  const { config, loading, updateConfig } = useLandingConfig()

  if (loading) return <div className={styles.loading}>Cargando...</div>

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Imágenes de la landing</h1>
        <p className={styles.sub}>
          Aquí puedes cambiar las fotos que aparecen en la página de inicio.
          Los cambios se ven en directo para todos los usuarios.
        </p>
      </div>

      <div className={styles.slots}>
        {SLOTS.map(slot => (
          <div key={slot.key} className={styles.slot}>
            <div className={styles.slotInfo}>
              <h3 className={styles.slotTitle}>{slot.label}</h3>
              <p className={styles.slotDesc}>{slot.desc}</p>
            </div>
            <div className={styles.slotUpload}>
              <ImageUpload
                label=""
                value={config[slot.key] ?? null}
                onChange={url => updateConfig({ [slot.key]: url })}
                storagePath={slot.storagePath}
                aspect={slot.aspect}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
