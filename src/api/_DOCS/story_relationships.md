# story_relationships

Defines narrative relationships between projects and/or series. A single row represents one relationship, with flags describing what kind it is. Multiple flags can be true simultaneously (e.g. a story can be both a midquel and a sidequel).

## Constraints

- Exactly one of `source_project_id` / `source_series_id` must be set.
- Exactly one of `related_project_id` / `related_series_id` must be set.
- `is_omake` can only be `true` when `is_companion` is also `true`.
- At least one flag must be `true`.

## Relationship Flag Definitions

### is_prequel
The source story takes place entirely before the related story begins — before the first scene of the first book in the related series, or before the opening of the related project.

> *Example:* Rogue One is a prequel to the original Star Wars trilogy. It ends the moment A New Hope begins.

**Not a prequel if:** the story overlaps in time with any part of the related story (that's a midquel or sidequel).

---

### is_midquel
The source story fills a time gap that exists *inside* the related project — a "three months later" jump between chapters, an unexplained period the main story skips over, etc. The gap already exists in the related story; the midquel just populates it.

> *Example:* A short story set during the six-month training montage that happened between chapters 4 and 5 of Book 2.

**Not a midquel if:** it runs parallel to events already shown in the related story (that's a sidequel), or it takes place in a gap between two separate books (that's handled by read order).

---

### is_sidequel
The source story runs parallel in time to the related story — the clocks overlap — but follows entirely different characters in a different location. The events of the related story are happening right now, just off-screen.

> *Example:* The Loki TV series runs parallel to events across the MCU timeline. A novel following the city guard while the heroes fight the main villain in the same city on the same day.

**Can combine with is_midquel:** if the source story runs parallel to a gap *inside* the related project, both flags apply.

---

### is_companion
The source story is optional reading. It expands the world, adds lore, or deepens a character — but a reader who skips it will still fully understand the main plot. Companion stories are additive, never load-bearing.

> *Example:* A short story collection exploring the backstories of side characters. A world-building novella about the history of a kingdom that features in the main series.

**is_omake is a subtype of companion** — if is_omake is true, is_companion must also be true.

---

### is_omake
The source is non-narrative bonus material — it doesn't tell a story in the traditional sense. Author notes, in-universe documents, character stat sheets, short comedy skits, interview transcripts, glossaries packaged as a standalone.

> *Example:* A "Book 3.5" that is entirely the in-universe royal census records referenced in Book 3. A collection of comedic "what if" skits where characters break the fourth wall.

**Always requires is_companion = true.** An omake is by definition optional and non-load-bearing.

---

### is_spinoff
The source story uses the same world or characters as the related story but permanently breaks away to become its own independent narrative. It is not returning to the related story's main conflict — it has its own primary conflict and cast going forward.

> *Example:* Better Call Saul spun off from Breaking Bad — same world, overlapping characters, but its own protagonist and story arc that never rejoins the Breaking Bad plot. The Fantastic Beasts series spinning off from Harry Potter.

**Not a spinoff if:** the story returns to or rejoins the related story's main cast and conflict. A spinoff is a permanent departure, not a detour.

---

### is_crossover
Characters from the source story and the related story meet and directly interact within the same narrative. Both casts are present in the same story at the same time.

> *Example:* Avengers: Infinity War — characters from across the MCU's separate film series all appear together. A novel where the cast of Series A travels to Series B's world and works alongside Series B's cast.

**Not a crossover if:** the stories merely share a world or universe without the casts meeting (that's just the same universe). The interaction must be direct and in-story.

---

## Combinations

Some flags describe different dimensions of the same relationship and can apply simultaneously:

| Combination | When it applies |
|---|---|
| `is_midquel` + `is_sidequel` | Source fills a gap inside the related story AND follows different characters in a different location during that same gap |
| `is_companion` + `is_prequel` | Source is set before the related story but is optional reading — skipping it won't break the main plot |
| `is_spinoff` + `is_crossover` | Source permanently branches away but the branching-point story involves both casts meeting |
| `is_companion` + `is_omake` | Non-narrative bonus material (omake always implies companion) |

## Exclusions

Some flags are mutually exclusive and cannot be true at the same time:

| Flag | Conflicts with | Reason |
|---|---|---|
| `is_prequel` | `is_midquel` | Can't be entirely before the story AND fill an internal gap |
| `is_prequel` | `is_sidequel` | Can't be entirely before the story AND run parallel to it |
| `is_midquel` | `is_spinoff` | Filling an internal gap means remaining within the story's context, not permanently departing |
| `is_omake` | `is_prequel` | A prequel is a narrative — omake is non-narrative |
| `is_omake` | `is_midquel` | A midquel is a narrative — omake is non-narrative |
| `is_omake` | `is_sidequel` | A sidequel is a narrative — omake is non-narrative |
| `is_omake` | `is_spinoff` | Non-narrative material cannot have its own independent narrative conflict |
| `is_omake` | `is_crossover` | Non-narrative material cannot contain an in-story meeting between casts |

When a flag is set that conflicts with an already-selected flag, the conflicting flag must be cleared.

---

## Schema

| Column | Type | Nullable | Notes |
|---|---|---|---|
| id | uuid | NO | Primary key |
| source_project_id | uuid | YES | FK → projects.id — the project this relationship belongs to. |
| source_series_id | uuid | YES | FK → series.id — the series this relationship belongs to. |
| related_project_id | uuid | YES | FK → projects.id — the project being related to. |
| related_series_id | uuid | YES | FK → series.id — the series being related to. |
| is_prequel | bool | NO | |
| is_midquel | bool | NO | |
| is_sidequel | bool | NO | |
| is_companion | bool | NO | |
| is_omake | bool | NO | Requires is_companion = true. |
| is_spinoff | bool | NO | |
| is_crossover | bool | NO | |
| created_at | timestamptz | NO | |
| updated_at | timestamptz | NO | |

## API

| Function | Description |
|---|---|
| `createStoryRelationship(input)` | Insert a new relationship. Returns the created row. |
| `getRelationshipsForProject(projectId)` | Fetch all relationships where source is a project. |
| `getRelationshipsForSeries(seriesId)` | Fetch all relationships where source is a series. |
| `getStoryRelationshipById(id)` | Fetch a single relationship by id. |
| `updateStoryRelationship(id, input)` | Update a relationship by id. Returns the updated row. |
| `deleteStoryRelationship(id)` | Delete a single relationship by id. |
| `deleteStoryRelationshipsForProject(projectId)` | Delete all relationships for a project (use on project delete). |
| `deleteStoryRelationshipsForSeries(seriesId)` | Delete all relationships for a series (use on series delete). |

### Input types

**CreateStoryRelationshipInput**

| Field | Type | Required |
|---|---|---|
| source_project_id | string \| null | NO — one of source_project_id or source_series_id required |
| source_series_id | string \| null | NO — one of source_project_id or source_series_id required |
| related_project_id | string \| null | NO — one of related_project_id or related_series_id required |
| related_series_id | string \| null | NO — one of related_project_id or related_series_id required |
| is_prequel | boolean | NO |
| is_midquel | boolean | NO |
| is_sidequel | boolean | NO |
| is_companion | boolean | NO |
| is_omake | boolean | NO |
| is_spinoff | boolean | NO |
| is_crossover | boolean | NO |

**UpdateStoryRelationshipInput**

| Field | Type | Required |
|---|---|---|
| related_project_id | string \| null | NO |
| related_series_id | string \| null | NO |
| is_prequel | boolean | NO |
| is_midquel | boolean | NO |
| is_sidequel | boolean | NO |
| is_companion | boolean | NO |
| is_omake | boolean | NO |
| is_spinoff | boolean | NO |
| is_crossover | boolean | NO |
