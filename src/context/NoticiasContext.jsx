import { createContext, useContext, useState, useEffect } from 'react'

const NoticiasContext = createContext(null)

const STORAGE_KEY = 'sportime_noticias'

const defaultNoticias = [
  { id: '1', title: 'Torneo en Barcelona', tag: 'Club', content: 'El equipo participó en el torneo de Barcelona con grandes resultados.', date: '2026-06-10', status: 'published' },
  { id: '2', title: 'Nuevas equipaciones 26-27', tag: 'Club', content: 'Ya están disponibles las nuevas equipaciones para la temporada 2026-27.', date: '2026-06-05', status: 'published' },
  { id: '3', title: 'Infantil A Campeón', tag: 'Cantera', content: 'El equipo Infantil A se proclama campeón de su categoría.', date: '2026-06-01', status: 'published' },
  { id: '4', title: 'Ascenso a Liga Preferente', tag: 'Club', content: 'El primer equipo asciende a Liga Preferente tras una gran temporada.', date: '2026-05-28', status: 'published' },
]

export function NoticiasProvider({ children }) {
  const [noticias, setNoticias] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultNoticias
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias))
  }, [noticias])

  const addNoticia = (noticia) => {
    const nueva = { ...noticia, id: Date.now().toString() }
    setNoticias(prev => [nueva, ...prev])
    return nueva
  }

  const updateNoticia = (id, data) => {
    setNoticias(prev => prev.map(n => n.id === id ? { ...n, ...data } : n))
  }

  const deleteNoticia = (id) => {
    setNoticias(prev => prev.filter(n => n.id !== id))
  }

  const toggleStatus = (id) => {
    setNoticias(prev => prev.map(n =>
      n.id === id ? { ...n, status: n.status === 'published' ? 'draft' : 'published' } : n
    ))
  }

  return (
    <NoticiasContext.Provider value={{ noticias, addNoticia, updateNoticia, deleteNoticia, toggleStatus }}>
      {children}
    </NoticiasContext.Provider>
  )
}

export const useNoticias = () => useContext(NoticiasContext)
