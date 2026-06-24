import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
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

  const addPatrocinador = useCallback(async (data) => {
    const id = doc(collection(db, 'patrocinadores')).id
    await setDoc(doc(db, 'patrocinadores', id), { ...data, createdAt: new Date().toISOString() })
    return id
  }, [])

  const updatePatrocinador = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'patrocinadores', id), data)
  }, [])

  const deletePatrocinador = useCallback(async (id) => {
    await deleteDoc(doc(db, 'patrocinadores', id))
  }, [])

  const value = useMemo(
    () => ({ patrocinadores, loading, addPatrocinador, updatePatrocinador, deletePatrocinador }),
    [patrocinadores, loading, addPatrocinador, updatePatrocinador, deletePatrocinador]
  )

  return (
    <PatrocinadoresContext.Provider value={value}>
      {children}
    </PatrocinadoresContext.Provider>
  )
}

export const usePatrocinadores = () => useContext(PatrocinadoresContext)
