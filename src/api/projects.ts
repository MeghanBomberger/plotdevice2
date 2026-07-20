import { supabase } from "./supabase"
import type { Project } from "../types"

export type CreateProjectInput = {
  name: string
  temp_unit: string
  wind_unit: string
  series_id?: string | null
  universe_id?: string | null
  description?: string | null
  version?: string | null
  chronological_order?: number | null
  read_order?: number | null
}

export type UpdateProjectInput = {
  name?: string
  temp_unit?: string
  wind_unit?: string
  series_id?: string | null
  universe_id?: string | null
  description?: string | null
  version?: string | null
  chronological_order?: number | null
  read_order?: number | null
  archived_at?: string | null
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function createProject(input: CreateProjectInput) {
  const { data, error } = await supabase.from("projects").insert(input).select().single()

  if (error) throw error
  return data as Project
}

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("name", { ascending: true })

  if (error) throw error
  return data as Project[]
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) throw error
  return data as Project
}

export async function getProjectsByUniverseId(universeId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("universe_id", universeId)
    .order("read_order", { ascending: true })

  if (error) throw error
  return data as Project[]
}

export async function getProjectsBySeriesId(seriesId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("series_id", seriesId)
    .order("read_order", { ascending: true })

  if (error) throw error
  return data as Project[]
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateProject(id: string, input: UpdateProjectInput) {
  const { data, error } = await supabase.from("projects").update(input).eq("id", id).select().single()

  if (error) throw error
  return data as Project
}

export async function updateManyProjects(ids: string[], input: UpdateProjectInput) {
  const { data, error } = await supabase.from("projects").update(input).in("id", ids).select()

  if (error) throw error
  return data as Project[]
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) throw error
}

export async function deleteManyProjects(ids: string[]) {
  const { error } = await supabase.from("projects").delete().in("id", ids)

  if (error) throw error
}
