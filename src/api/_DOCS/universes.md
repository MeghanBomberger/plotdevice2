# universes

A shared fictional world that can contain multiple series.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | uuid | NO | Primary key |
| name | text | NO | |
| description | text | YES | |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

## API

| Function | Description |
|---|---|
| `createUniverse(input)` | Insert a new universe. Returns the created row. |
| `getUniverses()` | Fetch all universes with their series, ordered by name ascending. |
| `getUniverseById(id)` | Fetch a single universe with its series by id. |
| `updateUniverse(id, input)` | Update a single universe by id. Returns the updated row. |
| `updateManyUniverses(ids, input)` | Apply the same update to multiple universes by id array. Returns updated rows. |
| `deleteUniverse(id)` | Delete a single universe by id. |
| `deleteManyUniverses(ids)` | Delete multiple universes by id array. |

### Input types

**CreateUniverseInput**

| Field | Type | Required |
|---|---|---|
| name | string | YES |
| description | string \| null | NO |

**UpdateUniverseInput**

| Field | Type | Required |
|---|---|---|
| name | string | NO |
| description | string \| null | NO |
