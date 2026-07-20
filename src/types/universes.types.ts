import type { SeriesWithProjects } from "./series.types"
import type { Project } from "./projects.types"

export type Universe = {
  id: string
  name: string
  description: string | null
  level: string
  created_at: string
  updated_at: string
  archived_at: string | null
}

export type UniverseWithSeries = Universe & {
  series: SeriesWithProjects[]
  projects?: Project[]
}
