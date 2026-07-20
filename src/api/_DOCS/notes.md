# notes

A freeform text note. Supports threaded conversations via parent_note_id. Attachable to any entity via note_links.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| parent_note_id | INTEGER | YES | FK → notes.id (self-referential, for conversation threading) |
| note_type | TEXT | NO | e.g. 'comment', 'question', 'reminder', 'lore' |
| content | TEXT | NO | |
| is_deprecated | INTEGER | NO | Boolean (0/1). When 1, this note is outdated and no longer current. Default 0. |
| superseded_by | INTEGER | YES | FK → notes.id. Points to the note that replaces this one. Only set when is_deprecated = 1. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- `superseded_by` should only be set when `is_deprecated = 1`. App logic should enforce this.
- A chain of superseded notes can be followed to trace the full revision history of a concept.
