# items

An object in the world. Supports sub-items via parent_id (e.g. a bag containing items).

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| parent_id | INTEGER | YES | FK → items.id (self-referential) |
| name | TEXT | NO | |
| description | TEXT | YES | |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
