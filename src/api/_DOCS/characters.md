# characters

A person, creature, or entity in the story.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | |
| description | TEXT | YES | |
| birthdate | TEXT | YES | |
| pronouns | TEXT | YES | |
| home_location_id | INTEGER | YES | FK → locations.id |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
