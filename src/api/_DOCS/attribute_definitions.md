# attribute_definitions

Defines a named attribute type that can be applied to characters, locations, or items (e.g. "occupation", "faction", "deceased", "interior/exterior").

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | |
| description | TEXT | YES | |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
