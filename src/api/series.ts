import { supabase } from "./supabase"
import type { Series, SeriesWithProjects } from "../types"

export type CreateSeriesInput = {
  name: string
  description?: string | null
  universe_id?: string | null
  chronological_order?: number | null
  read_order?: number | null
}

export type UpdateSeriesInput = {
  name?: string
  description?: string | null
  universe_id?: string | null
  chronological_order?: number | null
  read_order?: number | null
  archived_at?: string | null
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function createSeries(input: CreateSeriesInput) {
  const { data, error } = await supabase.from("series").insert(input).select().single()

  if (error) throw error
  return data as Series
}

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getSeries() {
  const { data, error } = await supabase
    .from("series")
    .select("*, projects!projects_series_id_fkey(*)")
    .order("name", { ascending: true })

  if (error) throw error
  return data as SeriesWithProjects[]
}

export async function getSeriesById(id: string) {
  const { data, error } = await supabase
    .from("series")
    .select("*, projects!projects_series_id_fkey(*)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Series
}

export async function getSeriesByUniverseId(universeId: string) {
  const { data, error } = await supabase
    .from("series")
    .select("*, projects!projects_series_id_fkey(*)")
    .eq("universe_id", universeId)
    .order("read_order", { ascending: true })

  if (error) throw error
  return data as SeriesWithProjects[]
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateSeries(id: string, input: UpdateSeriesInput) {
  const { data, error } = await supabase.from("series").update(input).eq("id", id).select().single()

  if (error) throw error
  return data as Series
}

export async function updateManySeries(ids: string[], input: UpdateSeriesInput) {
  const { data, error } = await supabase.from("series").update(input).in("id", ids).select()

  if (error) throw error
  return data as Series[]
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteSeries(id: string) {
  const { error } = await supabase.from("series").delete().eq("id", id)

  if (error) throw error
}

export async function deleteManySeries(ids: string[]) {
  const { error } = await supabase.from("series").delete().in("id", ids)

  if (error) throw error
}
