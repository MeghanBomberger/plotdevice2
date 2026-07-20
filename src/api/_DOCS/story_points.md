# story_points

A named narrative milestone. Records that a significant event, discovery, or decision has occurred in the story. Can be checked against by conditions via story_point_reached condition type.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | |
| description | TEXT | YES | |
| reached | BOOLEAN | NO | Default false |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
