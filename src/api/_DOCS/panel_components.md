# panel_components

Defines the structure and layout of a panel. Each component occupies a position on a grid and has a type that determines how it renders. Input components (where `is_input = 1`) contribute fields to `panel_entries`; display components (text blocks, images, buttons) do not.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| panel_id | INTEGER | NO | FK → panels.id |
| type | TEXT | NO | Component type. See types below. |
| label | TEXT | YES | Display label for this component. |
| key | TEXT | YES | Author-defined key used as the JSON key in panel_entries.data. Required for input components (is_input = 1). Should be unique within the panel. |
| is_input | INTEGER | NO | Boolean (0/1). When 1, this component collects data that is stored in panel_entries. |
| col | INTEGER | NO | Grid column position (0-indexed). |
| row | INTEGER | NO | Grid row position (0-indexed). |
| col_span | INTEGER | NO | Number of columns this component spans. Default 1. |
| row_span | INTEGER | NO | Number of rows this component spans. Default 1. |
| config | TEXT | YES | JSON. Type-specific configuration (e.g. static content for text_block, min/max for number_input, image source for image). |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |

## Component Types

| Type | is_input | Notes |
|---|---|---|
| text_input | 1 | Single-line text field |
| textarea | 1 | Multi-line text field |
| number_input | 1 | Numeric field. config may include min, max. |
| date | 1 | Date value field |
| boolean | 1 | True/false toggle |
| text_block | 0 | Static text display. Content stored in config. |
| image | 0 | Image display. Source reference stored in config. |
| button | 0 | Button element. Label and action hint stored in config. |

## Notes

- `key` must be unique within a panel for all input components. App logic should enforce this.
- `key` is nullable to allow display-only components (is_input = 0) to omit it.
- The grid is the source of truth for layout. `col`, `row`, `col_span`, `row_span` are all required.
- `config` is flexible JSON — its shape depends on the component type. App logic interprets it per type.
- The set of component types above is a starting list. Additional types can be added as needed.
