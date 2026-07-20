import type { Project } from "./projects.types"

export type Series = {
  id: string
  universe_id: string | null
  name: string
  description: string | null
  chronological_order: number | null
  read_order: number | null
  level: string
  created_at: string
  updated_at: string
  archived_at: string | null
}

export type SeriesWithProjects = Series & {
  projects?: Project[]
}
