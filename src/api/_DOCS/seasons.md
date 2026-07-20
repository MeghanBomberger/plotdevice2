# seasons

A named period of the year within a project. Used to group and contextualize weather entries. Season date ranges are stored as MM-DD strings to allow reuse across multiple in-game years.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| project_id | INTEGER | NO | FK → projects.id |
| name | TEXT | NO | e.g. "Yule", "Summer", "Monsoon Season" |
| date_start | TEXT | NO | MM-DD format. Inclusive start of season. |
| date_end | TEXT | NO | MM-DD format. Inclusive end of season. |
| temp_low_min | REAL | NO | Minimum value the day's low temp can be rolled from. Unit from projects.temp_unit. |
| temp_low_max | REAL | NO | Maximum value the day's low temp can be rolled from. Unit from projects.temp_unit. |
| temp_high_min | REAL | NO | Minimum value the day's high temp can be rolled from. Unit from projects.temp_unit. |
| temp_high_max | REAL | NO | Maximum value the day's high temp can be rolled from. Unit from projects.temp_unit. |
| precip_chance | REAL | NO | Probability of precipitation occurring (0.0–1.0). |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- Seasons are project-scoped. Multiple projects can define their own season sets independently.
- Date ranges spanning the year boundary (e.g. Dec 21 – Jan 31) should have `date_start` > `date_end`; consumers must handle this case.
- `temp_high_min` must be validated in app logic to ensure rolled high temp always exceeds the rolled low temp.
- Wind tier pools per direction are stored in the related `season_wind_configs` table, not here.
- See `wind_tiers.md` and `season_wind_configs.md` for the wind generation system.
