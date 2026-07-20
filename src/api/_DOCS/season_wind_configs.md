# season_wind_configs

Defines which wind tiers are eligible to be rolled for a given season and wind direction. Each row represents one tier being in the pool for a particular season/direction combination. The generator picks randomly from all tiers in the pool for the matched season and direction.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| season_id | INTEGER | NO | FK → seasons.id |
| wind_tier_id | INTEGER | NO | FK → wind_tiers.id |
| direction | TEXT | YES | Cardinal/intercardinal direction this config applies to: N, NE, E, SE, S, SW, W, NW. NULL = default fallback (applies when no direction-specific rows exist for this season). |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- A season may have multiple rows per direction — one row per tier in the eligible pool.
  - Example: Imbolc from the East allows tiers 3, 4, 5, 6 → four rows with direction = "E".
- `direction = NULL` rows define the fallback pool used when the rolled wind direction has no specific config rows for this season.
- App logic for generation: query all `season_wind_configs` rows for the season + direction; if none found, fall back to rows where direction IS NULL; pick a random tier from the result set; roll a speed in `[wind_tier.speed_min, wind_tier.speed_max]`.
- `wind_tier_id` must belong to the same project as the season. App logic must enforce this — SQLite has no cross-table constraint for this check.

## Earth-Normal Defaults

The earth-normal defaults object in app code includes a standard `season_wind_configs` seed matching the behavior of the reference weather generation tool (`weather-generation.ts`). Seeding a new earth-setting project creates all wind tier rows and season wind config rows in one operation.
