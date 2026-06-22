import { createContext, useContext, useState, useEffect } from 'react'
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const PatrocinadoresContext = createContext(null)

export function PatrocinadoresProvider({ children }) {
  const [patrocinadores, setPatrocinadores] = useState([])
  const [loading, setLoading]               = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'patrocinadores'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || new Date(a.createdAt ?? 0) - new Date(b.createdAt ?? 0))
      setPatrocinadores(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const addPatrocinador = async (data) => {
    const id = doc(collection(db, 'patrocinadores')).id
    await setDoc(doc(db, 'patrocinadores', id), { ...data, createdAt: new Date().toISOString() })
    return id
  }

  const updatePatrocinador = async (id, data) => {
    await updateDoc(doc(db, 'patrocinadores', id), data)
  }

  const deletePatrocinador = async (id) => {
    await deleteDoc(doc(db, 'patrocinadores', id))
  }

  return (
    <PatrocinadoresContext.Provider value={{ patrocinadores, loading, addPatrocinador, updatePatrocinador, deletePatrocinador }}>
      {children}
    </PatrocinadoresContext.Provider>
  )
}

export const usePatrocinadores = () => useContext(PatrocinadoresContext)
