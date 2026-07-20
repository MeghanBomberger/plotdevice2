# scene_options

A choice available to the player within a scene. Supports sub-options via parent_option_id. Optionally gated by a condition group. Optionally leads to another scene.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| scene_id | INTEGER | NO | FK → scenes.id |
| parent_option_id | INTEGER | YES | FK → scene_options.id (self-referential) |
| next_scene_id | INTEGER | YES | FK → scenes.id |
| label | TEXT | NO | The option text shown to the player |
| go_back | INTEGER | NO | Boolean (0/1). When 1, selecting this option returns to the previous scene. Default 0. |
| use_count | INTEGER | YES | Max number of times this option can be selected. Null = unlimited. |
| condition_group_id | INTEGER | YES | FK → condition_groups.id |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
