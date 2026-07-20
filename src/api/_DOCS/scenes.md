# scenes

A discrete interaction or moment in the story. Tied to a location. Scene text is the prose the player sees; description is the writer's internal notes.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| location_id | INTEGER | NO | FK → locations.id |
| name | TEXT | NO | |
| description | TEXT | YES | Internal writer notes |
| scene_text | TEXT | YES | Prose the player sees |
| use_count | INTEGER | YES | Max number of times this scene can be triggered. Null = unlimited. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
