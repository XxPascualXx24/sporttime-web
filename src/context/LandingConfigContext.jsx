import { createContext, useContext, useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const LandingConfigContext = createContext(null)

const DOC_REF = doc(db, 'config', 'landing')

export function LandingConfigProvider({ children }) {
  const [config, setConfig]   = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(DOC_REF, snap => {
      setConfig(snap.exists() ? snap.data() : {})
      setLoading(false)
    })
    return unsub
  }, [])

  const updateConfig = async (fields) => {
    await setDoc(DOC_REF, fields, { merge: true })
  }

  return (
    <LandingConfigContext.Provider value={{ config, loading, updateConfig }}>
      {children}
    </LandingConfigContext.Provider>
  )
}

export const useLandingConfig = () => useContext(LandingConfigContext)
