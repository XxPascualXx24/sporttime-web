import { createContext, useContext, useState, useEffect } from 'react'

const EquiposContext = createContext(null)

const STORAGE_KEY = 'sportime_equipos'

const defaultData = {
  equipos: [
    { id: 'alevin-a',   name: 'Alevín A',    photo: null },
    { id: 'alevin-b',   name: 'Alevín B',    photo: null },
    { id: 'juvenil-b',  name: 'Juvenil B',   photo: null },
    { id: 'benjamin-a', name: 'Benjamín A',  photo: null },
    { id: 'benjamin-b', name: 'Benjamín B',  photo: null },
    { id: 'juvenil-a',  name: 'Juvenil A',   photo: null },
  ],
  jugadoras: {
    'alevin-a': [
      { id: '1', name: 'Carla',  number: 1,  position: 'Portera',        photo: null },
      { id: '2', name: 'Sara',   number: 13, position: 'Portera',        photo: null },
      { id: '3', name: 'Marta',  number: 8,  position: 'Defensa',        photo: null },
      { id: '4', name: 'Noelia', number: 7,  position: 'Delantera',      photo: null },
      { id: '5', name: 'Bea',    number: 10, position: 'Centrocampista', photo: null },
      { id: '6', name: 'Lorena', number: 5,  position: 'Defensa',        photo: null },
    ],
    'alevin-b':   [],
    'juvenil-b':  [],
    'benjamin-a': [],
    'benjamin-b': [],
    'juvenil-a':  [],
  },
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function EquiposProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultData
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const { equipos, jugadoras } = data

  // Teams
  const addEquipo = (name) => {
    const id = slugify(name) + '-' + Date.now().toString(36)
    setData(d => ({
      equipos: [...d.equipos, { id, name, photo: null }],
      jugadoras: { ...d.jugadoras, [id]: [] },
    }))
  }

  const updateEquipo = (id, fields) => {
    const update = typeof fields === 'string' ? { name: fields } : fields
    setData(d => ({
      ...d,
      equipos: d.equipos.map(e => e.id === id ? { ...e, ...update } : e),
    }))
  }

  const deleteEquipo = (id) => {
    setData(d => {
      const { [id]: _, ...rest } = d.jugadoras
      return { equipos: d.equipos.filter(e => e.id !== id), jugadoras: rest }
    })
  }

  // Players
  const addJugadora = (equipoId, jugadora) => {
    const nueva = { ...jugadora, id: Date.now().toString(), photo: jugadora.photo ?? null }
    setData(d => ({
      ...d,
      jugadoras: {
        ...d.jugadoras,
        [equipoId]: [...(d.jugadoras[equipoId] ?? []), nueva],
      },
    }))
  }

  const updateJugadora = (equipoId, jugadoraId, fields) => {
    setData(d => ({
      ...d,
      jugadoras: {
        ...d.jugadoras,
        [equipoId]: d.jugadoras[equipoId].map(j => j.id === jugadoraId ? { ...j, ...fields } : j),
      },
    }))
  }

  const deleteJugadora = (equipoId, jugadoraId) => {
    setData(d => ({
      ...d,
      jugadoras: {
        ...d.jugadoras,
        [equipoId]: d.jugadoras[equipoId].filter(j => j.id !== jugadoraId),
      },
    }))
  }

  return (
    <EquiposContext.Provider value={{
      equipos, jugadoras,
      addEquipo, updateEquipo, deleteEquipo,
      addJugadora, updateJugadora, deleteJugadora,
    }}>
      {children}
    </EquiposContext.Provider>
  )
}

export const useEquipos = () => useContext(EquiposContext)
