# wind_tiers

A project-scoped ordered list of wind speed bands used by the weather generation system. Each tier defines a labeled range of speeds; the generator picks randomly within the range of whichever tiers a season/direction config allows.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| sort_order | INTEGER | NO | Determines tier ordering (lowest to highest speed). Used to display and reference tiers consistently. |
| label | TEXT | NO | Human-readable name for this tier. e.g. "calm", "light breeze", "gale". |
| speed_min | REAL | NO | Minimum speed for this tier. Unit from projects.wind_unit. |
| speed_max | REAL | NO | Maximum speed for this tier. Unit from projects.wind_unit. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- Wind tiers are project-scoped because wind scales differ across settings (a planet with different atmospheric density may have entirely different speed ranges and labels).
- `sort_order` should be unique per project. App logic should enforce no gaps or duplicates.
- `speed_min` and `speed_max` are inclusive. The generator rolls a random value in `[speed_min, speed_max]`.
- Tier IDs are referenced by `season_wind_configs` rows to define which tiers are eligible for a given season/direction combination.

## Earth-Normal Defaults

A hardcoded earth-normal defaults object in app code provides a standard starting set to seed new projects quickly. Based on the Beaufort scale:

| sort_order | label | speed_min | speed_max |
|---|---|---|---|
| 0 | calm | 0 | 2 |
| 1 | light breeze | 3 | 12 |
| 2 | moderate breeze | 12 | 24 |
| 3 | strong breeze | 25 | 31 |
| 4 | gale | 32 | 46 |
| 5 | strong gale | 47 | 54 |
| 6 | wind storm | 55 | 63 |
