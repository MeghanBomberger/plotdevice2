import { supabase } from "./supabase"
import type { Session } from "@supabase/supabase-js"

// ── Session ───────────────────────────────────────────────────────────────────

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error) throw error
  return data.session
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

// ── Sign in / out ─────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  console.log("signIn called - paused for animation designing")
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  // if (error) throw error
  // return data.session
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}
