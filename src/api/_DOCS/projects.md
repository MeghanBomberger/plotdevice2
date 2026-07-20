# projects

A single game or story. Belongs to an optional series and/or universe.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | uuid | NO | Primary key |
| series_id | uuid | YES | FK → series.id |
| universe_id | uuid | YES | FK → universes.id |
| name | text | NO | |
| description | text | YES | |
| version | text | YES | Author-defined version string. e.g. "1.0", "draft 3". |
| temp_unit | text | NO | Temperature unit for weather. e.g. "F", "C". |
| wind_unit | text | NO | Wind speed unit for weather. e.g. "mph", "km/h". |
| chronological_order | int4 | YES | In-universe chronological position. |
| read_order | float8 | YES | Suggested reading order. Decimal sub-values (e.g. 1.01) indicate point books. || is_interquel | bool | NO | Relationship flags live in story_relationships — see story_relationships.md. |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

## API

| Function | Description |
|---|---|
| `createProject(input)` | Insert a new project. Returns the created row. |
| `getProjects()` | Fetch all projects, ordered by name ascending. |
| `getProjectById(id)` | Fetch a single project by id. |
| `updateProject(id, input)` | Update a single project by id. Returns the updated row. |
| `updateManyProjects(ids, input)` | Apply the same update to multiple projects by id array. Returns updated rows. |
| `deleteProject(id)` | Delete a single project by id. |
| `deleteManyProjects(ids)` | Delete multiple projects by id array. |

### Input types

**CreateProjectInput**

| Field | Type | Required |
|---|---|---|
| name | string | YES |
| temp_unit | string | YES |
| wind_unit | string | YES |
| series_id | string \| null | NO |
| universe_id | string \| null | NO |
| description | string \| null | NO |
| version | string \| null | NO |
| chronological_order | number \| null | NO |
| read_order | number \| null | NO |


**UpdateProjectInput**

| Field | Type | Required |
|---|---|---|
| name | string | NO |
| temp_unit | string | NO |
| wind_unit | string | NO |
| series_id | string \| null | NO |
| universe_id | string \| null | NO |
| description | string \| null | NO |
| version | string \| null | NO |
| chronological_order | number \| null | NO |
| read_order | number \| null | NO |

