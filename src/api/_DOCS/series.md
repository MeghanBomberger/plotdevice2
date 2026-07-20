# series

A grouping of related projects within an optional universe (e.g. a trilogy, a saga).

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | uuid | NO | Primary key |
| universe_id | uuid | YES | FK → universes.id |
| name | text | NO | |
| description | text | YES | |
| read_order | float8 | YES | Suggested reading order. Decimal sub-values (e.g. 2.01) indicate point books. |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

Relationship flags (spinoff, crossover, prequel, etc.) live in story_relationships — see story_relationships.md.

## API

| Function | Description |
|---|---|
| `createSeries(input)` | Insert a new series. Returns the created row. |
| `getSeries()` | Fetch all series with their projects, ordered by name ascending. |
| `getSeriesById(id)` | Fetch a single series with its projects by id. |
| `updateSeries(id, input)` | Update a single series by id. Returns the updated row. |
| `updateManySeries(ids, input)` | Apply the same update to multiple series by id array. Returns updated rows. |
| `deleteSeries(id)` | Delete a single series by id. |
| `deleteManySeries(ids)` | Delete multiple series by id array. |

### Input types

**CreateSeriesInput**

| Field | Type | Required |
|---|---|---|
| name | string | YES |
| description | string \| null | NO |
| universe_id | string \| null | NO |
| read_order | number \| null | NO |

**UpdateSeriesInput**

| Field | Type | Required |
|---|---|---|
| name | string | NO |
| description | string \| null | NO |
| universe_id | string \| null | NO |
| read_order | number \| null | NO |
