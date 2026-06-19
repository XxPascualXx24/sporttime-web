import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, getDocs, query, where,
} from 'firebase/firestore'
import { db } from '../firebase'

const EquiposContext = createContext(null)

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function EquiposProvider({ children }) {
  const [equipos, setEquipos]     = useState([])
  const [jugadoras, setJugadoras] = useState({})
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const unsubEquipos = onSnapshot(collection(db, 'equipos'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      setEquipos(list)
    })

    const unsubJugadoras = onSnapshot(collection(db, 'jugadoras'), snap => {
      const byEquipo = {}
      snap.docs.forEach(d => {
        const data = { id: d.id, ...d.data() }
        const eId = data.equipoId
        if (!byEquipo[eId]) byEquipo[eId] = []
        byEquipo[eId].push(data)
      })
      Object.keys(byEquipo).forEach(k => {
        byEquipo[k].sort((a, b) => (a.number ?? 99) - (b.number ?? 99))
      })
      setJugadoras(byEquipo)
      setLoading(false)
    })

    return () => { unsubEquipos(); unsubJugadoras() }
  }, [])

  const addEquipo = async (name) => {
    const id = slugify(name) + '-' + Date.now().toString(36)
    await setDoc(doc(db, 'equipos', id), { name, photo: null, order: Date.now() })
  }

  const updateEquipo = async (id, fields) => {
    await updateDoc(doc(db, 'equipos', id), fields)
  }

  const deleteEquipo = async (id) => {
    await deleteDoc(doc(db, 'equipos', id))
    const snap = await getDocs(query(collection(db, 'jugadoras'), where('equipoId', '==', id)))
    snap.docs.forEach(d => deleteDoc(d.ref))
  }

  const addJugadora = async (equipoId, jugadora, customId) => {
    const id = customId ?? doc(collection(db, 'jugadoras')).id
    await setDoc(doc(db, 'jugadoras', id), { ...jugadora, equipoId })
    return id
  }

  const updateJugadora = async (_equipoId, jugadoraId, fields) => {
    await updateDoc(doc(db, 'jugadoras', jugadoraId), fields)
  }

  const deleteJugadora = async (_equipoId, jugadoraId) => {
    await deleteDoc(doc(db, 'jugadoras', jugadoraId))
  }

  return (
    <EquiposContext.Provider value={{
      equipos, jugadoras, loading,
      addEquipo, updateEquipo, deleteEquipo,
      addJugadora, updateJugadora, deleteJugadora,
    }}>
      {children}
    </EquiposContext.Provider>
  )
}

export const useEquipos = () => useContext(EquiposContext)
