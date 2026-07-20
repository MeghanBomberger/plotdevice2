# statuses

A named world-state flag with a current value (e.g. time of day, whether a door is locked, visibility conditions).

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | |
| description | TEXT | YES | |
| value | TEXT | NO | Current value of the status. Can hold stringified JSON if needed. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
