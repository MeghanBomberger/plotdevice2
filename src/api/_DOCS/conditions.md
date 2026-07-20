# conditions

A single condition within a condition group. The type determines which entity FK is relevant. The operator and value define how the condition is evaluated.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| group_id | INTEGER | NO | FK → condition_groups.id |
| type | TEXT | NO | See condition types below |
| item_id | INTEGER | YES | FK → items.id |
| character_id | INTEGER | YES | FK → characters.id |
| location_id | INTEGER | YES | FK → locations.id |
| scene_id | INTEGER | YES | FK → scenes.id |
| option_id | INTEGER | YES | FK → scene_options.id |
| status_id | INTEGER | YES | FK → statuses.id |
| story_point_id | INTEGER | YES | FK → story_points.id |
| operator | TEXT | NO | '=', '!=', '>', '<', '>=', '<=' |
| value | TEXT | YES | The value to evaluate against. Can be boolean ('true'/'false'), number, or enum string. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Condition Types

| Type | Relevant FK | Notes |
|---|---|---|
| has_item | item_id | Player has/does not have the item |
| met_character | character_id | Player has/has not met the character |
| visited_location | location_id | Player has/has not visited the location |
| scene_completed | scene_id | A specific scene has/has not been completed |
| option_chosen | option_id | A specific scene option has/has not been chosen |
| status_active | status_id | Evaluates status.value against operator + value |
| story_point_reached | story_point_id | The story point has/has not been reached |
| date_after | — | Current date is after value |
| date_before | — | Current date is before value |
