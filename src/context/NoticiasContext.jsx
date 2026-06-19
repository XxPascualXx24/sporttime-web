import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

const NoticiasContext = createContext(null)

export function NoticiasProvider({ children }) {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'noticias'), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      list.sort((a, b) => new Date(b.date) - new Date(a.date))
      setNoticias(list)
      setLoading(false)
    })
    return unsub
  }, [])

  const addNoticia = async (noticia, customId) => {
    const id = customId ?? doc(collection(db, 'noticias')).id
    await setDoc(doc(db, 'noticias', id), noticia)
    return { ...noticia, id }
  }

  const updateNoticia = async (id, data) => {
    await updateDoc(doc(db, 'noticias', id), data)
  }

  const deleteNoticia = async (id) => {
    await deleteDoc(doc(db, 'noticias', id))
  }

  const toggleStatus = async (id) => {
    const noticia = noticias.find(n => n.id === id)
    if (!noticia) return
    await updateDoc(doc(db, 'noticias', id), {
      status: noticia.status === 'published' ? 'draft' : 'published',
    })
  }

  return (
    <NoticiasContext.Provider value={{ noticias, addNoticia, updateNoticia, deleteNoticia, toggleStatus, loading }}>
      {children}
    </NoticiasContext.Provider>
  )
}

export const useNoticias = () => useContext(NoticiasContext)
