import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './Inscripciones.module.css'

// Web3Forms — una clave por destinatario
const W3F_INSCRIPCION = 'a4c294fe-c193-4e3e-95f1-c6bfafa15b1b' // pgallardocheza@gmail.com
const W3F_RENOVACION  = '8672f1d3-9fcb-4b2e-960d-6578cddef385' // sporttimefemeni@gmail.com

const CATEGORIAS = [
  'Escoleta',
  'Alevín',
  'Infantil',
  'Cadete',
  'Juvenil',
  'Primer Equipo',
]

const INCLUYE = [
  { icon: '🏅', text: 'Equipación del equipo' },
  { icon: '📋', text: 'Partidos en ligas federadas' },
  { icon: '👤', text: 'Entrenamientos con staff' },
  { icon: '🎉', text: 'Eventos del club' },
  { icon: '💬', text: 'Charlas informativas' },
]

const PRECIO = { inscripcion: 390, renovacion: 300 }

const emptyStep1 = { nombre: '', apellidos: '', fechaNacimiento: '', dni: '', categoria: '' }
const emptyStep2 = {
  email: '', telefono: '', direccion: '',
  emailTutor: '', telefonoTutor: '',
  lopd: false, lopivi: false,
}
const emptyRenovacion = { nombre: '', fechaNacimiento: '', licencia: '', email: '' }

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null
  const hoy = new Date()
  const nac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nac.getFullYear()
  const m = hoy.getMonth() - nac.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--
  return edad
}

export default function Inscripciones() {
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') === 'renovacion' ? 'renovacion' : 'inscripcion')
  const [step, setStep] = useState(1)
  const [step1, setStep1] = useState(emptyStep1)
  const [step2, setStep2] = useState(emptyStep2)
  const [renov, setRenov] = useState(emptyRenovacion)
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [errors, setErrors] = useState({})

  const edad = calcularEdad(step1.fechaNacimiento)
  const isMinor = edad !== null && edad < 18

  const set1 = (k, v) => setStep1(p => ({ ...p, [k]: v }))
  const set2 = (k, v) => setStep2(p => ({ ...p, [k]: v }))

  const validateStep1 = () => {
    const e = {}
    if (!step1.nombre.trim()) e.nombre = true
    if (!step1.apellidos.trim()) e.apellidos = true
    if (!step1.fechaNacimiento) e.fechaNacimiento = true
    if (!step1.dni.trim()) e.dni = true
    if (!step1.categoria) e.categoria = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (!step2.email.trim()) e.email = true
    if (!step2.telefono.trim()) e.telefono = true
    if (isMinor && !step2.emailTutor.trim()) e.emailTutor = true
    if (isMinor && !step2.telefonoTutor.trim()) e.telefonoTutor = true
    if (!step2.lopd) e.lopd = true
    if (!step2.lopivi) e.lopivi = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinuar = () => {
    if (validateStep1()) { setStep(2); setErrors({}) }
  }

  const handleEnviar = async () => {
    if (!validateStep2()) return
    setSending(true)
    setSendError(false)
    try {
      const tipo = tab === 'inscripcion' ? 'Inscripción' : 'Renovación'
      const key  = tab === 'inscripcion' ? W3F_INSCRIPCION : W3F_RENOVACION

      const payload = {
        access_key:       key,
        subject:          `[Sporttime] Nueva ${tipo} — ${step1.nombre} ${step1.apellidos}`,
        from_name:        'Web Sporttime Femení',
        tipo,
        nombre:           `${step1.nombre} ${step1.apellidos}`,
        edad:             edad !== null ? `${edad} años` : '—',
        fecha_nacimiento: step1.fechaNacimiento,
        dni:              step1.dni,
        categoria:        step1.categoria,
        email:            step2.email,
        telefono:         step2.telefono,
        direccion:        step2.direccion || '—',
      }

      if (isMinor) {
        payload.menor_de_edad    = 'Sí'
        payload.email_tutor      = step2.emailTutor
        payload.telefono_tutor   = step2.telefonoTutor
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setDone(true)
      } else {
        setSendError(true)
      }
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const validateRenovacion = () => {
    const e = {}
    if (!renov.nombre.trim()) e.nombre = true
    if (!renov.fechaNacimiento) e.fechaNacimiento = true
    if (!renov.licencia.trim()) e.licencia = true
    if (!renov.email.trim()) e.email = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleEnviarRenovacion = async () => {
    if (!validateRenovacion()) return
    setSending(true)
    setSendError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key:       W3F_RENOVACION,
          subject:          `[Sporttime] Solicitud de renovación — ${renov.nombre}`,
          from_name:        'Web Sporttime Femení',
          tipo:             'Renovación',
          nombre:           renov.nombre,
          fecha_nacimiento: renov.fechaNacimiento,
          licencia_dni:     renov.licencia,
          email:            renov.email,
        }),
      })
      const data = await res.json()
      if (data.success) setDone(true)
      else setSendError(true)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const handleTabChange = (t) => {
    setTab(t); setStep(1); setStep1(emptyStep1); setStep2(emptyStep2)
    setRenov(emptyRenovacion); setErrors({}); setDone(false); setSendError(false)
  }

  if (done) {
    return (
      <main className={styles.page}>
        <div className={`container ${styles.wrap}`}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h2>¡Solicitud enviada!</h2>
            <p>Nos pondremos en contacto contigo en las próximas 48 horas para confirmar tu {tab === 'inscripcion' ? 'inscripción' : 'renovación'}.</p>
            <button className={styles.btnPrimary} onClick={() => { setDone(false); setStep(1); setStep1(emptyStep1); setStep2(emptyStep2) }}>
              Nueva solicitud
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1>Inscripciones y renovaciones</h1>
          <p className={styles.subtitle}>Proceso rápido online y seguro. Únete a nosotros sin esperas</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'renovacion' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('renovacion')}
          >
            Renovación
          </button>
          <button
            className={`${styles.tab} ${tab === 'inscripcion' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('inscripcion')}
          >
            Inscripción
          </button>
        </div>

        <div className={styles.layout}>
          {/* Form column */}
          <div className={styles.formCol}>
            {/* Progress — solo en inscripción */}
            {tab === 'inscripcion' && (
              <div className={styles.progress}>
                <span className={styles.stepLabel}>Paso {step}/2</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} />
                  <div className={`${styles.progressFill2} ${step === 2 ? styles.progressFill2Full : ''}`} />
                </div>
              </div>
            )}

            {tab === 'renovacion' ? (
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Renueva y continúa el camino con nosotros</h3>
                <p className={styles.formSubtitle}>Si ya eres jugadora del club, puedes renovar tu ficha para la temporada 2026-2027 de forma rápida.</p>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre completo*</label>
                    <input
                      className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                      placeholder="Nombre y apellidos"
                      value={renov.nombre}
                      onChange={e => setRenov(p => ({ ...p, nombre: e.target.value }))}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Fecha de nacimiento*</label>
                    <input
                      type="date"
                      className={`${styles.input} ${errors.fechaNacimiento ? styles.inputError : ''}`}
                      value={renov.fechaNacimiento}
                      onChange={e => setRenov(p => ({ ...p, fechaNacimiento: e.target.value }))}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Número de licencia o DNI*</label>
                  <input
                    className={`${styles.input} ${errors.licencia ? styles.inputError : ''}`}
                    placeholder="Introduce tu número de licencia o DNI"
                    value={renov.licencia}
                    onChange={e => setRenov(p => ({ ...p, licencia: e.target.value }))}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Email de contacto*</label>
                  <input
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="email@ejemplo.com"
                    value={renov.email}
                    onChange={e => setRenov(p => ({ ...p, email: e.target.value }))}
                  />
                </div>

                {sendError && (
                  <p className={styles.sendError}>Error al enviar. Inténtalo de nuevo o contacta con el club.</p>
                )}
                <button className={styles.btnPrimary} onClick={handleEnviarRenovacion} disabled={sending}>
                  {sending ? 'Enviando...' : 'Solicitar renovación'}
                </button>
              </div>
            ) : step === 1 ? (
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Datos de la jugadora</h3>
                <p className={styles.formSubtitle}>Quieres crecer con nosotros, inscríbete y sé parte del camino.</p>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre de la jugadora*</label>
                    <input
                      className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                      placeholder="Nombre"
                      value={step1.nombre}
                      onChange={e => set1('nombre', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Apellidos de la jugadora*</label>
                    <input
                      className={`${styles.input} ${errors.apellidos ? styles.inputError : ''}`}
                      placeholder="Apellidos"
                      value={step1.apellidos}
                      onChange={e => set1('apellidos', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Fecha de nacimiento*</label>
                    <input
                      type="date"
                      className={`${styles.input} ${errors.fechaNacimiento ? styles.inputError : ''}`}
                      value={step1.fechaNacimiento}
                      onChange={e => set1('fechaNacimiento', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>DNI / NIE*</label>
                    <input
                      className={`${styles.input} ${errors.dni ? styles.inputError : ''}`}
                      placeholder="00000000X"
                      value={step1.dni}
                      onChange={e => set1('dni', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Categoría solicitada*</label>
                  <div className={styles.selectWrap}>
                    <select
                      className={`${styles.input} ${styles.select} ${errors.categoria ? styles.inputError : ''}`}
                      value={step1.categoria}
                      onChange={e => set1('categoria', e.target.value)}
                    >
                      <option value="">Selecciona una categoría</option>
                      {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className={styles.selectArrow}>▾</span>
                  </div>
                </div>

                <button className={styles.btnPrimary} onClick={handleContinuar}>
                  Continuar
                </button>
              </div>
            ) : (
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Datos de contacto y legales</h3>
                <p className={styles.formSubtitle}>Quieres crecer con nosotros, inscríbete y sé parte del camino.</p>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email{isMinor ? ' de la jugadora' : ''}*</label>
                    <input
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="email@ejemplo.com"
                      value={step2.email}
                      onChange={e => set2('email', e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Teléfono{isMinor ? ' de la jugadora' : ''}*</label>
                    <input
                      type="tel"
                      className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
                      placeholder="XXX XXX XXX"
                      value={step2.telefono}
                      onChange={e => set2('telefono', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Dirección</label>
                  <input
                    className={styles.input}
                    placeholder="Calle, número, ciudad"
                    value={step2.direccion}
                    onChange={e => set2('direccion', e.target.value)}
                  />
                </div>

                {/* Tutor fields — solo si es menor */}
                {isMinor && (
                  <div className={styles.tutorBox}>
                    <div className={styles.tutorHeader}>
                      <span className={styles.tutorBadge}>Menor de edad — {edad} años</span>
                      <p className={styles.tutorDesc}>Es necesario el contacto del tutor legal.</p>
                    </div>
                    <div className={styles.row2}>
                      <div className={styles.field}>
                        <label className={styles.label}>Email del tutor legal*</label>
                        <input
                          type="email"
                          className={`${styles.input} ${errors.emailTutor ? styles.inputError : ''}`}
                          placeholder="email@ejemplo.com"
                          value={step2.emailTutor}
                          onChange={e => set2('emailTutor', e.target.value)}
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>Teléfono del tutor legal*</label>
                        <input
                          type="tel"
                          className={`${styles.input} ${errors.telefonoTutor ? styles.inputError : ''}`}
                          placeholder="XXX XXX XXX"
                          value={step2.telefonoTutor}
                          onChange={e => set2('telefonoTutor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.legalBox}>
                  <p className={styles.legalNotice}>
                    <strong>Aviso legal:</strong> Los datos facilitados serán tratados conforme a la normativa vigente.
                    Es obligatorio aceptar ambas políticas para completar la inscripción.
                  </p>
                  <label className={`${styles.checkRow} ${errors.lopd ? styles.checkError : ''}`}>
                    <input
                      type="checkbox"
                      checked={step2.lopd}
                      onChange={e => set2('lopd', e.target.checked)}
                    />
                    <span>He leído y acepto la <a href="#" className={styles.legalLink}>Política de Protección de Datos (LOPD/RGPD)</a></span>
                  </label>
                  <label className={`${styles.checkRow} ${errors.lopivi ? styles.checkError : ''}`}>
                    <input
                      type="checkbox"
                      checked={step2.lopivi}
                      onChange={e => set2('lopivi', e.target.checked)}
                    />
                    <span>Declaro conocer y aceptar la <a href="#" className={styles.legalLink}>Ley Orgánica de Protección Integral a la Infancia y la Adolescencia (LOPIVI)</a></span>
                  </label>
                </div>

                {sendError && (
                  <p className={styles.sendError}>
                    Error al enviar. Inténtalo de nuevo o contacta con el club.
                  </p>
                )}
                <div className={styles.rowActions}>
                  <button className={styles.btnBack} onClick={() => { setStep(1); setErrors({}) }} disabled={sending}>
                    ← Volver
                  </button>
                  <button className={styles.btnPrimary} onClick={handleEnviar} disabled={sending}>
                    {sending ? 'Enviando...' : `Enviar ${tab === 'inscripcion' ? 'inscripción' : 'renovación'}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Que incluye la cuota 2026-2027:</h4>
              <ul className={styles.includeList}>
                {INCLUYE.map(i => (
                  <li key={i.text} className={styles.includeItem}>
                    <span className={styles.includeIcon}>{i.icon}</span>
                    {i.text}
                  </li>
                ))}
              </ul>
              <div className={styles.price}>
                <span className={styles.priceAmount}>{PRECIO[tab]}€</span>
                <span className={styles.pricePer}>/al año</span>
              </div>
            </div>

            <div className={styles.cardPayment}>
              <div className={styles.cardPaymentHeader}>
                <h4 className={styles.cardTitle}>Pagos online</h4>
                <span className={styles.cardIcon}>💳</span>
              </div>
              <p className={styles.cardText}>
                Paga de forma segura con tarjeta, transferencia o domiciliación bancaria.
                Plataforma certificada SSL.
              </p>
              <a href="#" className={styles.btnPayment}>Ir al portal de pagos</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
