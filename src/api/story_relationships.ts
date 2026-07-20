import { supabase } from "./supabase"
import type { StoryRelationship, CreateStoryRelationshipInput, UpdateStoryRelationshipInput } from "../types"

// ── Create ────────────────────────────────────────────────────────────────────

export async function createStoryRelationship(input: CreateStoryRelationshipInput) {
  const { data, error } = await supabase.from("story_relationships").insert(input).select().single()

  if (error) throw error
  return data as StoryRelationship
}

// ── Read ──────────────────────────────────────────────────────────────────────

export async function getRelationshipsForProject(projectId: string) {
  const { data, error } = await supabase.from("story_relationships").select("*").eq("source_project_id", projectId)

  if (error) throw error
  return data as StoryRelationship[]
}

export async function getRelationshipsForProjectAllSides(projectId: string) {
  const { data, error } = await supabase
    .from("story_relationships")
    .select("*")
    .or(`source_project_id.eq.${projectId},related_project_id.eq.${projectId}`)

  if (error) throw error
  return data as StoryRelationship[]
}

export async function getRelationshipsForSeries(seriesId: string) {
  const { data, error } = await supabase.from("story_relationships").select("*").eq("source_series_id", seriesId)

  if (error) throw error
  return data as StoryRelationship[]
}

export async function getRelationshipsForSeriesAllSides(seriesId: string) {
  const { data, error } = await supabase
    .from("story_relationships")
    .select("*")
    .or(`source_series_id.eq.${seriesId},related_series_id.eq.${seriesId}`)

  if (error) throw error
  return data as StoryRelationship[]
}

export async function getStoryRelationshipById(id: string) {
  const { data, error } = await supabase.from("story_relationships").select("*").eq("id", id).single()

  if (error) throw error
  return data as StoryRelationship
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateStoryRelationship(id: string, input: UpdateStoryRelationshipInput) {
  const { data, error } = await supabase.from("story_relationships").update(input).eq("id", id).select().single()

  if (error) throw error
  return data as StoryRelationship
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteStoryRelationship(id: string) {
  const { error } = await supabase.from("story_relationships").delete().eq("id", id)

  if (error) throw error
}

export async function deleteManyStoryRelationships(ids: string[]) {
  const { error } = await supabase.from("story_relationships").delete().in("id", ids)

  if (error) throw error
}

export async function deleteStoryRelationshipsForProject(projectId: string) {
  const { error } = await supabase.from("story_relationships").delete().eq("source_project_id", projectId)

  if (error) throw error
}

export async function deleteStoryRelationshipsForSeries(seriesId: string) {
  const { error } = await supabase.from("story_relationships").delete().eq("source_series_id", seriesId)

  if (error) throw error
}
