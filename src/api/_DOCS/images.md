# images

A stored image file. Can be attached to any entity via image_links, or exist standalone.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | UUID | NO | Primary key |
| project_id | UUID | NO | FK → projects.id |
| storage_path | TEXT | NO | Path in Supabase Storage bucket. |
| local_cache_path | TEXT | YES | Device-local cached file path. Managed by the app sync layer. |
| width | INTEGER | YES | Image width in pixels. |
| height | INTEGER | YES | Image height in pixels. |
| alt_text | TEXT | YES | Optional description of the image. |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

## Notes

- Images are project-scoped.
- An image with no `image_links` rows is a standalone image not attached to any entity.
- `local_cache_path` is managed by the app and should not be synced to Supabase — it is a device-local value only.
- File storage is handled by Supabase Storage. `storage_path` is the path within the bucket.
