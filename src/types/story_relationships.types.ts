export type StoryRelationship = {
  id: string
  source_project_id: string | null
  source_series_id: string | null
  related_project_id: string | null
  related_series_id: string | null
  is_prequel: boolean
  is_midquel: boolean
  is_sidequel: boolean
  is_companion: boolean
  is_omake: boolean
  is_spinoff: boolean
  is_crossover: boolean
  created_at: string
  updated_at: string
}

export type CreateStoryRelationshipInput = {
  source_project_id?: string | null
  source_series_id?: string | null
  related_project_id?: string | null
  related_series_id?: string | null
  is_prequel?: boolean
  is_midquel?: boolean
  is_sidequel?: boolean
  is_companion?: boolean
  is_omake?: boolean
  is_spinoff?: boolean
  is_crossover?: boolean
}

export type UpdateStoryRelationshipInput = {
  related_project_id?: string | null
  related_series_id?: string | null
  is_prequel?: boolean
  is_midquel?: boolean
  is_sidequel?: boolean
  is_companion?: boolean
  is_omake?: boolean
  is_spinoff?: boolean
  is_crossover?: boolean
}
