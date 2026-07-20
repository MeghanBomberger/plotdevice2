# character_relations

Defines a relationship between two characters.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| character_id | INTEGER | NO | FK → characters.id |
| related_character_id | INTEGER | NO | FK → characters.id |
| relation_type | TEXT | NO | e.g. ally, enemy, family, romantic |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
