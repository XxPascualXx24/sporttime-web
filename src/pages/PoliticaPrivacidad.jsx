import { Link } from 'react-router-dom'
import styles from './Legal.module.css'

export default function PoliticaPrivacidad() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.breadcrumb}>
          <Link to="/">Inicio</Link>
          <span>›</span>
          Política de Privacidad
        </div>

        <div className={styles.header}>
          <h1>Política de Privacidad</h1>
          <p className={styles.lastUpdate}>Última actualización: junio de 2026</p>
        </div>

        <div className={styles.section}>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            De conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo
            y del Consejo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre,
            de Protección de Datos Personales y garantía de los derechos digitales
            (LOPDGDD), se informa que el responsable del tratamiento de los datos
            personales es:
          </p>
          <ul>
            <li><strong>Identidad:</strong> Sporttime Femení Vila-real C.F.</li>
            <li><strong>CIF/NIF:</strong> G13797931</li>
            <li><strong>Responsable:</strong> Ana Cheza Salvá</li>
            <li><strong>Dirección:</strong> C/Peñíscola 28, Vila-real, Castellón</li>
            <li><strong>Correo electrónico:</strong> sporttimefemeni@gmail.com</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>2. Datos personales que tratamos</h2>
          <p>Según la finalidad del tratamiento, podemos recoger los siguientes datos:</p>
          <ul>
            <li><strong>Formulario de contacto / inscripción:</strong> nombre, apellidos, correo electrónico, teléfono, fecha de nacimiento y cualquier información que el usuario facilite voluntariamente.</li>
            <li><strong>Renovación de abono:</strong> datos de identificación del socio y datos necesarios para gestionar la renovación.</li>
            <li><strong>Navegación:</strong> datos técnicos recogidos de forma automática (dirección IP, navegador, páginas visitadas) a través de cookies técnicas y analíticas. Consulta nuestra <Link to="/politica-cookies" style={{ color: 'var(--pink)' }}>Política de Cookies</Link>.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>3. Finalidades y base jurídica del tratamiento</h2>
          <ul>
            <li>
              <strong>Gestión de inscripciones y socios:</strong> tramitar altas, bajas y renovaciones de socias/os.
              Base jurídica: ejecución de un contrato (art. 6.1.b RGPD).
            </li>
            <li>
              <strong>Atención a consultas:</strong> responder a los mensajes enviados a través del formulario de contacto.
              Base jurídica: interés legítimo del Club (art. 6.1.f RGPD).
            </li>
            <li>
              <strong>Comunicaciones del club:</strong> envío de noticias, convocatorias y actividades del club, previa aceptación del usuario.
              Base jurídica: consentimiento del interesado (art. 6.1.a RGPD).
            </li>
            <li>
              <strong>Cumplimiento de obligaciones legales:</strong> cuando sea necesario por requerimiento legal.
              Base jurídica: obligación legal (art. 6.1.c RGPD).
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>4. Plazo de conservación de los datos</h2>
          <p>
            Los datos se conservarán durante el tiempo necesario para cumplir
            la finalidad para la que fueron recogidos y, en todo caso, durante
            los plazos legalmente establecidos. Una vez cumplida la finalidad,
            los datos serán bloqueados y, transcurridos los plazos de prescripción
            aplicables, suprimidos definitivamente.
          </p>
        </div>

        <div className={styles.section}>
          <h2>5. Destinatarios de los datos</h2>
          <p>
            Los datos personales no serán cedidos a terceros salvo obligación
            legal o cuando sea necesario para la prestación del servicio
            (por ejemplo, plataformas de pago o comunicaciones). En estos casos,
            el Club exigirá las garantías adecuadas conforme al RGPD.
          </p>
          <p>
            Los datos pueden ser tratados por proveedores de servicios tecnológicos
            como Google (Firebase, Google Analytics) bajo acuerdos de encargado
            del tratamiento que garantizan el cumplimiento del RGPD.
          </p>
        </div>

        <div className={styles.section}>
          <h2>6. Derechos del interesado</h2>
          <p>
            El usuario puede ejercer en cualquier momento los siguientes derechos
            enviando un escrito a <strong>sporttimefemeni@gmail.com</strong> con
            copia de su documento de identidad:
          </p>
          <ul>
            <li><strong>Acceso:</strong> obtener confirmación de si tratamos sus datos y acceder a ellos.</li>
            <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de sus datos ("derecho al olvido").</li>
            <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
            <li><strong>Limitación:</strong> solicitar la limitación del tratamiento de sus datos.</li>
            <li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</li>
          </ul>
          <p>
            Asimismo, tiene derecho a presentar una reclamación ante la Agencia
            Española de Protección de Datos (AEPD) — <strong>www.aepd.es</strong> —
            si considera que el tratamiento no es conforme al RGPD.
          </p>
        </div>

        <div className={styles.section}>
          <h2>7. Seguridad de los datos</h2>
          <p>
            El Club adopta las medidas técnicas y organizativas necesarias para
            garantizar la seguridad de los datos personales y evitar su
            alteración, pérdida, tratamiento o acceso no autorizado, habida
            cuenta del estado de la tecnología, la naturaleza de los datos
            almacenados y los riesgos a los que están expuestos.
          </p>
        </div>

        <div className={styles.section}>
          <h2>8. Cambios en la política de privacidad</h2>
          <p>
            El Club se reserva el derecho a modificar la presente Política de
            Privacidad para adaptarla a novedades legislativas o jurisprudenciales.
            Cualquier modificación será publicada en este Sitio Web con indicación
            de la fecha de actualización.
          </p>
        </div>

        <Link to="/" className={styles.backBtn}>
          ← Volver al inicio
        </Link>

      </div>
    </div>
  )
}
