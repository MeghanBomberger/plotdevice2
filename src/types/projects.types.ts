export type Project = {
  id: string
  universe_id: string | null
  series_id: string | null
  name: string
  description: string | null
  version: string | null
  temp_unit: string
  wind_unit: string
  chronological_order: number | null
  read_order: number | null
  level: string
  created_at: string
  updated_at: string
  archived_at: string | null
}
