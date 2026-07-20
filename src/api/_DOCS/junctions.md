# junctions

Junction tables linking entities in many-to-many relationships. All include created_at and updated_at.

## scene_characters

Characters present in or associated with a scene.

| Column | Type | Notes |
|---|---|---|
| scene_id | INTEGER | FK → scenes.id |
| character_id | INTEGER | FK → characters.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## scene_items

Items present in or associated with a scene.

| Column | Type | Notes |
|---|---|---|
| scene_id | INTEGER | FK → scenes.id |
| item_id | INTEGER | FK → items.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## scene_story_points

Story points that are triggered or associated with a scene.

| Column | Type | Notes |
|---|---|---|
| scene_id | INTEGER | FK → scenes.id |
| story_point_id | INTEGER | FK → story_points.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## location_characters

Characters associated with or found at a location.

| Column | Type | Notes |
|---|---|---|
| location_id | INTEGER | FK → locations.id |
| character_id | INTEGER | FK → characters.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## location_items

Items found at or associated with a location.

| Column | Type | Notes |
|---|---|---|
| location_id | INTEGER | FK → locations.id |
| item_id | INTEGER | FK → items.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |

## character_items

Items associated with or carried by a character.

| Column | Type | Notes |
|---|---|---|
| character_id | INTEGER | FK → characters.id |
| item_id | INTEGER | FK → items.id |
| created_at | DATETIME | |
| updated_at | DATETIME | |
