import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const HistoriasContext = createContext(null)

export function HistoriasProvider({ children }) {
  const [historias, setHistorias] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'historias'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0))
      setHistorias(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const addHistoria = useCallback(async (data) => {
    const id = doc(collection(db, 'historias')).id
    await setDoc(doc(db, 'historias', id), { ...data, createdAt: new Date().toISOString() })
    return id
  }, [])

  const updateHistoria = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'historias', id), data)
  }, [])

  const deleteHistoria = useCallback(async (id) => {
    await deleteDoc(doc(db, 'historias', id))
  }, [])

  const value = useMemo(
    () => ({ historias, loading, addHistoria, updateHistoria, deleteHistoria }),
    [historias, loading, addHistoria, updateHistoria, deleteHistoria]
  )

  return (
    <HistoriasContext.Provider value={value}>
      {children}
    </HistoriasContext.Provider>
  )
}

export const useHistorias = () => useContext(HistoriasContext)
