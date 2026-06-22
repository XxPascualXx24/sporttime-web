import { Link } from 'react-router-dom'
import styles from './Legal.module.css'

export default function AvisoLegal() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        <div className={styles.breadcrumb}>
          <Link to="/">Inicio</Link>
          <span>›</span>
          Aviso Legal
        </div>

        <div className={styles.header}>
          <h1>Aviso Legal</h1>
          <p className={styles.lastUpdate}>Última actualización: junio de 2026</p>
        </div>

        <div className={styles.section}>
          <h2>1. Datos identificativos del titular</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y de Comercio Electrónico
            (LSSI-CE), se informa de los datos identificativos del titular del
            presente sitio web:
          </p>
          <ul>
            <li><strong>Denominación social:</strong> Sporttime Femení Vila-real C.F.</li>
            <li><strong>CIF/NIF:</strong> G13797931</li>
            <li><strong>Domicilio social:</strong> C/Peñíscola 28, Vila-real, Castellón</li>
            <li><strong>Correo electrónico:</strong> sporttimefemeni@gmail.com</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>2. Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el acceso y el uso del sitio web
            <strong> sporttimefemeni.es</strong> (en adelante, "el Sitio Web"),
            titularidad de Sporttime Femení Vila-real C.F. (en adelante, "el Club").
          </p>
          <p>
            El acceso al Sitio Web implica la aceptación plena y sin reservas de
            las presentes condiciones. Si no estás de acuerdo con ellas, te rogamos
            que no accedas ni utilices el Sitio Web.
          </p>
        </div>

        <div className={styles.section}>
          <h2>3. Condiciones de uso</h2>
          <p>
            El usuario se compromete a hacer un uso correcto del Sitio Web
            conforme a la ley, a la buena fe, al orden público, a los usos del
            tráfico y al presente Aviso Legal. El usuario responderá frente al
            Club de los daños y perjuicios que pudieran causarse como consecuencia
            del incumplimiento de estas condiciones.
          </p>
          <p>Queda expresamente prohibido:</p>
          <ul>
            <li>Utilizar el Sitio Web con fines ilícitos o contrarios a las presentes condiciones.</li>
            <li>Reproducir, copiar, distribuir o modificar los contenidos sin autorización previa y por escrito del Club.</li>
            <li>Introducir o difundir contenidos falsos, difamatorios, ofensivos o que vulneren derechos de terceros.</li>
            <li>Utilizar el Sitio Web para enviar comunicaciones publicitarias no solicitadas.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>4. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del Sitio Web (textos, fotografías, gráficos,
            logotipos, marcas, nombres comerciales, diseño gráfico, código fuente
            y demás elementos) son titularidad del Club o de terceros que han
            autorizado su uso, y están protegidos por la legislación vigente en
            materia de propiedad intelectual e industrial.
          </p>
          <p>
            Queda prohibida la reproducción total o parcial de los contenidos
            del Sitio Web sin la autorización expresa y por escrito de Sporttime
            Femení Vila-real C.F.
          </p>
        </div>

        <div className={styles.section}>
          <h2>5. Exclusión de responsabilidad</h2>
          <p>
            El Club no garantiza la disponibilidad, continuidad ni infalibilidad
            del funcionamiento del Sitio Web, y no se responsabiliza de los
            daños y perjuicios causados por interrupciones del servicio o
            fallos de seguridad ajenos a su control.
          </p>
          <p>
            El Club no se hace responsable del contenido de los sitios web a los
            que enlaza el Sitio Web, dado que no tiene control sobre dichos sitios.
          </p>
        </div>

        <div className={styles.section}>
          <h2>6. Legislación aplicable y jurisdicción</h2>
          <p>
            Las presentes condiciones se rigen e interpretan conforme a la
            legislación española. Para la resolución de cualquier controversia
            derivada del acceso o uso del Sitio Web, el Club y el usuario se
            someten expresamente a los Juzgados y Tribunales de
            <strong> Castellón de la Plana</strong>, con renuncia a cualquier
            otro fuero que pudiera corresponderles.
          </p>
        </div>

        <Link to="/" className={styles.backBtn}>
          ← Volver al inicio
        </Link>

      </div>
    </div>
  )
}
