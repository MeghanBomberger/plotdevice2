# weather

A single weather record for a day (or sub-day span) within a project. Can apply globally to the whole project or be scoped to a specific location.

Raw numeric values are stored; derived text conditions (precipitation, cloud cover) are stored as authored strings rather than computed at read time.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| season_id | INTEGER | YES | FK → seasons.id. Nullable in case project has no defined seasons. |
| location_id | INTEGER | YES | FK → locations.id. Null when is_global = 1. |
| is_global | INTEGER | NO | Boolean (0/1). When 1, weather applies to the whole project regardless of location. |
| date | TEXT | NO | YYYY-MM-DD format. |
| time_start | TEXT | NO | HH:MM (24h). Start of this weather window. Use 00:00 for full-day records. |
| time_end | TEXT | NO | HH:MM (24h). End of this weather window. Use 23:59 for full-day records. |
| temp_low | REAL | NO | Low temperature. Unit defined on projects.temp_unit. |
| temp_high | REAL | NO | High temperature. Unit defined on projects.temp_unit. |
| precipitation | TEXT | NO | e.g. "none", "light rain", "heavy snow", "thunderstorm". |
| wind_speed | REAL | NO | Wind speed. Unit defined on projects.wind_unit. |
| wind_direction | TEXT | YES | Cardinal/intercardinal: N, NE, E, SE, S, SW, W, NW. |
| cloud_cover | TEXT | YES | e.g. "clear", "partly cloudy", "cloudy", "overcast". |
| is_seasonal_override | INTEGER | NO | Boolean (0/1). When 1, the author has manually set values outside what the season config would normally generate (e.g. for story purposes). |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- `is_global = 1` and `location_id IS NOT NULL` is a conflict — enforce in app logic: if is_global is set, location_id must be null.
- `temp_unit` and `wind_unit` are stored on the `projects` table, not per weather row.
- Precipitation values are free-text authored strings. Recommended values (matching the weather generation tool): `none`, `light rain`, `moderate rain`, `heavy rain`, `severe rain`, `light snow`, `moderate snow`, `heavy snow`, `severe snow`, `thunderstorm`.
- Cloud cover values are free-text authored strings. Recommended values: `clear`, `partly cloudy`, `cloudy`, `overcast`.
- Multiple weather rows can exist for the same date if time windows differ (e.g. morning fog, afternoon clear).
- See `seasons.md` for season date range format notes.

## Weather Generation Tool

A weather generation helper exists in `the-grandma-project/tools/src/helpers/weather-generation.ts`. It produces `lowTemp`, `highTemp`, `precipitation`, `windSpeed`, and `windDirection` based on a pagan-calendar season model. Cloud cover is derived via `generateOvercastForDay()` which looks ahead to the next day's precipitation to determine today's sky condition.

This tool is a candidate for porting into PlotDevice Writer as an in-app weather generation utility.
