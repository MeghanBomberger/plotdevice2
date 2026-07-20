# entity_attributes

Applies an attribute definition to a character, location, or item with an optional value.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| attribute_definition_id | INTEGER | NO | FK → attribute_definitions.id |
| entity_type | TEXT | NO | 'character', 'location', or 'item' |
| entity_id | INTEGER | NO | FK to the corresponding entity table |
| value | TEXT | YES | Optional value for the attribute |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
