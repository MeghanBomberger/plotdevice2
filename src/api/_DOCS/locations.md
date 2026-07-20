# locations

A place in the world. Supports sub-locations via parent_id. Walkable and non-walkable locations are both valid (e.g. a kitchen is walkable, a cabinet inside it is not).

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| parent_id | INTEGER | YES | FK → locations.id (self-referential) |
| name | TEXT | NO | |
| description | TEXT | YES | |
| x | REAL | YES | Isometric x coordinate |
| y | REAL | YES | Isometric y coordinate |
| z | REAL | YES | Isometric z coordinate |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
