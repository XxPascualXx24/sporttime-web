import { createContext, useContext, useState, useEffect } from 'react'
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const GaleriaContext = createContext(null)

export function GaleriaProvider({ children }) {
  const [fotos, setFotos]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'galeria'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || new Date(a.createdAt ?? 0) - new Date(b.createdAt ?? 0))
      setFotos(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const addFoto = async (data) => {
    const id = doc(collection(db, 'galeria')).id
    await setDoc(doc(db, 'galeria', id), { ...data, createdAt: new Date().toISOString() })
    return id
  }
  const updateFoto = async (id, data) => updateDoc(doc(db, 'galeria', id), data)
  const deleteFota = async (id) => deleteDoc(doc(db, 'galeria', id))

  return (
    <GaleriaContext.Provider value={{ fotos, loading, addFoto, updateFoto, deleteFota }}>
      {children}
    </GaleriaContext.Provider>
  )
}

export const useGaleria = () => useContext(GaleriaContext)
