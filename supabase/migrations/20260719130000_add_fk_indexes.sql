-- Indexes on the columns the app searches by (child-by-parent lookups).
-- Safe to run anytime; queries themselves never change.

-- core hierarchy
create index if not exists series_universe_id_idx on public.series (universe_id);
create index if not exists projects_series_id_idx on public.projects (series_id);
create index if not exists projects_universe_id_idx on public.projects (universe_id);

-- entities by project
create index if not exists locations_project_id_idx on public.locations (project_id);
create index if not exists characters_project_id_idx on public.characters (project_id);
create index if not exists items_project_id_idx on public.items (project_id);
create index if not exists scenes_project_id_idx on public.scenes (project_id);
create index if not exists statuses_project_id_idx on public.statuses (project_id);
create index if not exists story_points_project_id_idx on public.story_points (project_id);
create index if not exists panels_project_id_idx on public.panels (project_id);
create index if not exists images_project_id_idx on public.images (project_id);
create index if not exists attribute_definitions_project_id_idx on public.attribute_definitions (project_id);

-- tree parents
create index if not exists locations_parent_id_idx on public.locations (parent_id);
create index if not exists items_parent_id_idx on public.items (parent_id);
create index if not exists notes_parent_note_id_idx on public.notes (parent_note_id);
create index if not exists condition_groups_parent_group_id_idx on public.condition_groups (parent_group_id);

-- branching structure
create index if not exists scene_options_scene_id_idx on public.scene_options (scene_id);
create index if not exists scene_options_next_scene_id_idx on public.scene_options (next_scene_id);
create index if not exists scenes_location_id_idx on public.scenes (location_id);
create index if not exists conditions_group_id_idx on public.conditions (group_id);

-- polymorphic links: lookups are "everything attached to this entity"
create index if not exists note_links_entity_idx on public.note_links (entity_type, entity_id);
create index if not exists note_links_note_id_idx on public.note_links (note_id);
create index if not exists image_links_entity_idx on public.image_links (entity_type, entity_id);
create index if not exists image_links_image_id_idx on public.image_links (image_id);
create index if not exists entity_attributes_entity_idx on public.entity_attributes (entity_type, entity_id);

-- weather system
create index if not exists seasons_project_id_idx on public.seasons (project_id);
create index if not exists wind_tiers_project_id_idx on public.wind_tiers (project_id);
create index if not exists weather_project_id_idx on public.weather (project_id);
create index if not exists weather_location_id_idx on public.weather (location_id);
create index if not exists season_wind_configs_season_id_idx on public.season_wind_configs (season_id);

-- panels
create index if not exists panel_components_panel_id_idx on public.panel_components (panel_id);
create index if not exists panel_entries_panel_id_idx on public.panel_entries (panel_id);
