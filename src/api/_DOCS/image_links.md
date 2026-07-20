# image_links

Links an image to any entity using a polymorphic entity_type + entity_id pattern. Supports optional sort ordering for entities with multiple images.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | UUID | NO | Primary key |
| image_id | UUID | NO | FK → images.id |
| entity_type | TEXT | NO | 'character', 'location', 'item', 'scene', 'note', 'panel', 'universe', 'series', 'project' — **TODO:** 'universe', 'series', 'project' not yet in ImageLinkEntityType in types/images.types.ts or enforced in the UI. Add when building image attachment for the organization layer. |
| entity_id | UUID | NO | FK to the corresponding entity table |
| sort_order | INTEGER | YES | Optional display order for multiple images on the same entity. |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

## Notes

- `entity_id` has no database-level FK since the target table varies by `entity_type`. App logic must enforce referential integrity.
- `sort_order` is nullable. When null, display order is undefined and the app may use `created_at` as a fallback.
- Multiple image_links rows with the same `entity_type` + `entity_id` are valid — they represent multiple images attached to the same entity.
