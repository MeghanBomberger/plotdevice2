-- Lock every table behind authentication.
-- With RLS enabled and no anon policy, the publishable key alone can no longer
-- read or write anything; any signed-in user has full access (single-writer app:
-- Meghan + a seeded test user).

do $$
declare
  t text;
begin
  foreach t in array array[
    'universes', 'series', 'projects', 'story_relationships',
    'notes', 'note_links',
    'locations', 'characters', 'items',
    'attribute_definitions', 'entity_attributes', 'statuses',
    'scenes', 'scene_options', 'story_points',
    'condition_groups', 'conditions',
    'scene_characters', 'scene_items', 'scene_story_points',
    'location_characters', 'location_items', 'character_items',
    'wind_tiers', 'seasons', 'season_wind_configs', 'weather',
    'panels', 'panel_components', 'panel_entries',
    'images', 'image_links'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists authenticated_full_access on public.%I', t);
    execute format(
      'create policy authenticated_full_access on public.%I for all to authenticated using (true) with check (true)',
      t
    );
  end loop;
end $$;
