# note_links

Links a note to any entity in the system using a polymorphic entity_type + entity_id pattern.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| note_id | INTEGER | NO | FK → notes.id |
| entity_type | TEXT | NO | e.g. 'scene', 'character', 'item', 'location', 'story_point', 'condition_group', 'note' |
| entity_id | INTEGER | NO | FK to the corresponding entity table |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
