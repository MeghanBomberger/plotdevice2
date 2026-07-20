# panels

A custom UI screen the author builds to view or organize some aspect of their story. Can represent an in-world interactive interface (e.g. a cyberdeck UI, a greenhouse control panel) or an author-side reference view (e.g. a custom calendar, a data summary). The `in_game_ui` flag distinguishes the two.

A panel's structure is defined by its `panel_components`. Authored data records are stored as `panel_entries`.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | |
| description | TEXT | YES | Author's notes on what this panel is for. |
| item_id | INTEGER | YES | FK → items.id. Optional item required to access this panel. |
| location_id | INTEGER | YES | FK → locations.id. Optional location required to access this panel. |
| access_operator | TEXT | YES | 'AND' or 'OR'. Only relevant when both item_id and location_id are set. Null otherwise. |
| condition_group_id | INTEGER | YES | FK → condition_groups.id. Documents the story conditions under which this panel is accessible. |
| in_game_ui | INTEGER | NO | Boolean (0/1). When 1, this panel models an in-world UI screen. When 0, it is an author-side reference view. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- `access_operator` should only be set when both `item_id` and `location_id` are non-null. App logic should enforce this.
- `condition_group_id`, `item_id`, and `location_id` are all documenting story design intent — they are not enforced at runtime by this app.
- See `panel_components.md` for how the panel's structure is defined.
- See `panel_entries.md` for how data records are stored against a panel.
