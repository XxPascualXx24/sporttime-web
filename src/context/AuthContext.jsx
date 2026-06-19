import { createContext, useContext, useState, useEffect } from 'react'

// Credenciales de acceso — cámbialas cuando quieras
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'sportime2026'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [logged, setLogged] = useState(() => localStorage.getItem('admin_session') === 'true')

  const login = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('admin_session', 'true')
      setLogged(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('admin_session')
    setLogged(false)
  }

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
