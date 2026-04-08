import { useEffect, useState } from 'react'

import {
  getCurrentSession,
  isSupabaseConfigured,
  onAuthStateChange,
} from '@/services/supabase'

export function useSupabaseAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    let active = true

    async function bootstrap() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }

      const currentSession = await getCurrentSession()

      if (active) {
        setSession(currentSession)
        setLoading(false)
      }
    }

    bootstrap()

    const unsubscribe = onAuthStateChange((nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return {
    session,
    user: session?.user || null,
    isAuthenticated: Boolean(session),
    isConfigured: isSupabaseConfigured,
    loading,
  }
}
