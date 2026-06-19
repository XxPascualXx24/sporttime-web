import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/variables.css'
import { AuthProvider } from './context/AuthContext'
import { NoticiasProvider } from './context/NoticiasContext'
import { EquiposProvider } from './context/EquiposContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import Equipos from './pages/Equipos'
import EquipoDetalle from './pages/EquipoDetalle'
import Noticias from './pages/Noticias'
import CalendarioPage from './pages/CalendarioPage'
import Inscripciones from './pages/Inscripciones'
import Historia from './pages/Historia'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminNoticias from './admin/AdminNoticias'
import AdminNoticiaForm from './admin/AdminNoticiaForm'
import AdminEquipos from './admin/AdminEquipos'
import AdminEquipoDetalle from './admin/AdminEquipoDetalle'

export default function App() {
  return (
    <AuthProvider>
      <NoticiasProvider>
        <EquiposProvider>
          <BrowserRouter>
            <Routes>
              {/* Public site */}
              <Route path="/" element={<><Header /><Home /><Footer /></>} />
              <Route path="/tienda" element={<><Header /><Tienda /><Footer /></>} />
              <Route path="/equipos" element={<><Header /><Equipos /><Footer /></>} />
              <Route path="/equipos/:id" element={<><Header /><EquipoDetalle /><Footer /></>} />
              <Route path="/noticias" element={<><Header /><Noticias /><Footer /></>} />
              <Route path="/calendario" element={<><Header /><CalendarioPage /><Footer /></>} />
              <Route path="/inscripciones" element={<><Header /><Inscripciones /><Footer /></>} />
              <Route path="/historia" element={<><Header /><Historia /><Footer /></>} />

              {/* Admin */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="equipos" element={<AdminEquipos />} />
                <Route path="equipos/:id" element={<AdminEquipoDetalle />} />
                <Route path="noticias" element={<AdminNoticias />} />
                <Route path="noticias/:id" element={<AdminNoticiaForm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </EquiposProvider>
      </NoticiasProvider>
    </AuthProvider>
  )
}
