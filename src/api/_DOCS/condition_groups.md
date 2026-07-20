# condition_groups

A named group of conditions combined with AND/OR/NAND/NOR logic. Supports arbitrary nesting via parent_group_id.

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | INTEGER | NO | Primary key |
| parent_group_id | INTEGER | YES | FK → condition_groups.id (self-referential) |
| name | TEXT | NO | For UI navigation |
| operator | TEXT | NO | 'AND', 'OR', 'NAND', 'NOR' |
| created_at | DATETIME | NO | |
| updated_at | DATETIME | NO | |
