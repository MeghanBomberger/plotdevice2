import { supabase } from "./supabase"
import type { Universe, UniverseWithSeries } from "../types"

export type CreateUniverseInput = {
  name: string
  description?: string | null
}

export type UpdateUniverseInput = {
  name?: string
  description?: string | null
  archived_at?: string | null
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function createUniverse(input: CreateUniverseInput) {
  const { data, error } = await supabase.from("universes").insert(input).select().single()

  if (error) throw error
  return data as Universe
}

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getUniverses() {
  const { data, error } = await supabase
    .from("universes")
    .select("*, series!series_universe_id_fkey(*, projects!projects_series_id_fkey(*)), projects!projects_universe_id_fkey(*)")
    .order("name", { ascending: true })

  if (error) throw error
  return data as UniverseWithSeries[]
}

export async function getUniverseById(id: string) {
  const { data, error } = await supabase
    .from("universes")
    .select("*, series!series_universe_id_fkey(*, projects!projects_series_id_fkey(*)), projects!projects_universe_id_fkey(*)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data as UniverseWithSeries
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateUniverse(id: string, input: UpdateUniverseInput) {
  const { data, error } = await supabase.from("universes").update(input).eq("id", id).select().single()

  if (error) throw error
  return data as Universe
}

export async function updateManyUniverses(ids: string[], input: UpdateUniverseInput) {
  const { data, error } = await supabase.from("universes").update(input).in("id", ids).select()

  if (error) throw error
  return data as Universe[]
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteUniverse(id: string) {
  const { error } = await supabase.from("universes").delete().eq("id", id)

  if (error) throw error
}

export async function deleteManyUniverses(ids: string[]) {
  const { error } = await supabase.from("universes").delete().in("id", ids)

  if (error) throw error
}
