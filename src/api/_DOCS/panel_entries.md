# panel_entries

A single data record for a panel. The `data` JSON contains key-value pairs where each key corresponds to the `key` field of an input component (is_input = 1) on the panel. Display-only components do not contribute to entry data.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| panel_id | INTEGER | NO | FK → panels.id |
| data | TEXT | NO | JSON object. Keys match panel_components.key for all is_input = 1 components on this panel. |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Notes

- The shape of `data` is defined by the panel's input components. Query `panel_components` where `panel_id` matches and `is_input = 1` to get the expected keys and types.
- App logic is responsible for validating that `data` conforms to the panel's component definitions on write.
- Multiple entries can exist per panel — a panel is a template, entries are records against it.

## Example

Given a panel with two input components:
- `key: "app_name"`, type: `text_input`
- `key: "is_accessible"`, type: `boolean`

A valid entry's `data` would be:
```json
{ "app_name": "NetRunner v2.1", "is_accessible": true }
```
