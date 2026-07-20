# PlotDevice Writer — Schema Docs

Reference documentation for all database tables.

## Project Structure

- [universes](universes.md) — A shared fictional world containing multiple series and/or standalone projects
- [series](series.md) — A grouping of related projects, typically with a shared narrative thread but not necessarily the same setting or characters
- [projects](projects.md) — A single game or story
- [story_relationships](story_relationships.md) — Narrative relationships between projects and/or series (prequel, spinoff, crossover, etc.)

## World Building

- [locations](locations.md) — Places in the story world
- [characters](characters.md) — People, creatures, and entities
- [character_relations](character_relations.md) — Relationships between characters
- [items](items.md) — Objects in the story world

## Attributes & Statuses

- [attribute_definitions](attribute_definitions.md) — Custom attribute types per project
- [entity_attributes](entity_attributes.md) — Attribute values assigned to characters, locations, or items
- [statuses](statuses.md) — Named statuses with values tracked per project

## Story

- [scenes](scenes.md) — Discrete story moments tied to a location
- [scene_options](scene_options.md) — Choices available to the player within a scene
- [story_points](story_points.md) — Named milestones in the story
- [condition_groups](condition_groups.md) — Logical groupings of conditions (AND/OR/NAND/NOR)
- [conditions](conditions.md) — Individual conditions within a group

## Notes

- [notes](notes.md) — Freeform author notes
- [note_links](note_links.md) — Links between notes and any entity

## Images

- [images](images.md) — Stored image files
- [image_links](image_links.md) — Links between images and any entity

## Weather

- [seasons](seasons.md) — Named seasonal periods with temperature and precipitation ranges
- [wind_tiers](wind_tiers.md) — Project-scoped wind speed bands
- [season_wind_configs](season_wind_configs.md) — Wind tier pools per season and direction
- [weather](weather.md) — Weather records per day/location

## Panels

- [panels](panels.md) — Custom UI screens for author reference or in-world interfaces
- [panel_components](panel_components.md) — Grid components defining a panel's structure
- [panel_entries](panel_entries.md) — Data records stored against a panel

## Junctions

- [scene_characters](junctions.md#scene_characters) — Characters present in a scene
- [scene_items](junctions.md#scene_items) — Items present in a scene
- [scene_story_points](junctions.md#scene_story_points) — Story points associated with a scene
- [location_characters](junctions.md#location_characters) — Characters associated with a location
- [location_items](junctions.md#location_items) — Items associated with a location
- [character_items](junctions.md#character_items) — Items associated with a character
