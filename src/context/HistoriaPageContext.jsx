import { createContext, useContext, useState, useEffect } from 'react'
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const HistoriaPageContext = createContext(null)

function useCollection(name, sortFn) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, name), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setItems(sortFn ? list.sort(sortFn) : list)
      setLoading(false)
    })
    return unsub
  }, [name])
  return [items, loading]
}

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0) || new Date(a.createdAt ?? 0) - new Date(b.createdAt ?? 0)

function makeCRUD(colName) {
  return {
    add: async (data) => {
      const id = doc(collection(db, colName)).id
      await setDoc(doc(db, colName, id), { ...data, createdAt: new Date().toISOString() })
      return id
    },
    update: async (id, data) => updateDoc(doc(db, colName, id), data),
    remove: async (id) => deleteDoc(doc(db, colName, id)),
  }
}

export function HistoriaPageProvider({ children }) {
  const [capitulos, loadingCap]   = useCollection('historiaCapitulos', byOrder)
  const [cronologia, loadingCron] = useCollection('historiaCronologia', byOrder)
  const [palmares, loadingPalm]   = useCollection('historiaPalmares', byOrder)

  const loading = loadingCap || loadingCron || loadingPalm

  const capCRUD  = makeCRUD('historiaCapitulos')
  const cronCRUD = makeCRUD('historiaCronologia')
  const palmCRUD = makeCRUD('historiaPalmares')

  return (
    <HistoriaPageContext.Provider value={{
      loading,
      capitulos,  addCapitulo:  capCRUD.add,  updateCapitulo:  capCRUD.update,  deleteCapitulo:  capCRUD.remove,
      cronologia, addCronologia: cronCRUD.add, updateCronologia: cronCRUD.update, deleteCronologia: cronCRUD.remove,
      palmares,   addPalmares:   palmCRUD.add, updatePalmares:   palmCRUD.update, deletePalmares:   palmCRUD.remove,
    }}>
      {children}
    </HistoriaPageContext.Provider>
  )
}

export const useHistoriaPage = () => useContext(HistoriaPageContext)
