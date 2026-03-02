# Functional Suite

## Overview
Functional tests cover the bulk of the behavioral requirements—search/filter combinations, status cards, disciplinary cues, verification modal validation, maintenance persistence, audit logging, and keyboard accessibility. Each row below references a requirement ID so traceability is maintained.

## Preconditions & Tools
- Use the same synthetic fixtures (`src/data/records.json`) and the audit log context (`AuditProvider`).
- Toggle maintenance via `src/config/maintenance.json` only when a test explicitly states it.
- Capture screenshots or short videos when anomalies appear and store them under `defects/screenshots/` for ease of linking.

## Standard Table Format (applies to every suite)
| ID | Title | Requirement | Suite | Preconditions | Steps | Expected Result | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MAN-SRCH-04 | State filter narrows list | CVT-SRCH-03; CVT-RES-01 | Functional | App running, filters empty | Select `TX` from State dropdown, submit | Only Maya Patel (TX) shows; expired chip increments | Validates state-specific filtering |
| MAN-SRCH-05 | Combined filters intersection | CVT-SRCH-02; CVT-SRCH-03 | Functional | At least one `NY` record | Select State `NY`, enter Last name `Lee`, submit | Only `CT-1088` appears | Checks multi-filter precision |
| MAN-SRCH-06 | ID search exact match | CVT-SRCH-04 | Functional | Search pane open | Enter `CT-1024`, submit | Maya Patel card appears; summary text says 1 record | Confirms ID lookups yield single result |
| MAN-SRCH-07 | No result messaging | CVT-SRCH-04; CVT-AUD-01 | Functional | Filters reset | Enter `CT-9999`, submit | Empty-state message appears; audit records `no-result search` | Ensures zero-hit behavior |
| MAN-SRCH-08 | Reset/blank search | CVT-RES-01 | Functional | After a filtered search | Clear all inputs, submit | All records shown; summary text reverts to "Showing all records" | Verifies default state restoration |
| MAN-SRCH-09 | First-name chips update | CVT-RES-01 | Functional | Filters empty | Enter `Alex`, submit | Only Alex card visible; chips reflect active count 1 | Connects chips with results |
| MAN-STAT-02 | Expired styling check | CVT-STAT-01 | Functional | `Maya Patel` visible | Observe status pill | Amber background, ⚠️ icon, text `Expired` | Keeps visual cue consistent |
| MAN-STAT-03 | Suspended styling check | CVT-STAT-01 | Functional | `Jordan Lee` visible | Observe card | Red pill, ⛔ icon, label `Suspended` | Displays penalty state clearly |
| MAN-STAT-04 | Last-verified tooltip | CVT-HIST-01 | Functional | Card list present | Hover over timestamp | Tooltip shows raw ISO date, inline text shows relative age | Stabilizes history context |
| MAN-STAT-05 | Source attribution | CVT-HIST-01 | Functional | Cards visible | Inspect source text next to timestamp | Each card lists `source` (e.g., "NCCPA sync") | Communicates provenance |
| MAN-DISC-01 | Banner appears when flagged | CVT-DISC-01 | Functional | Maya Patel has discipline | Expand Maya card | Banner text includes "Disciplinary action", summary, date, link | Ensures incident visibility |
| MAN-DISC-02 | Banner hidden when clear | CVT-DISC-01 | Functional | Alex Jordan card present | Check for banner | No disciplinary banner rendered | Avoids false positives |
| MAN-VER-02 | Required fields enforced | CVT-VER-01 | Functional | Modal open, fields empty | Submit without input | Error "Recipient name and email are required." shown | Protects data entry integrity |
| MAN-VER-03 | Email format validation | CVT-VER-01 | Functional | Modal open | Enter `qa-team` email, submit | Error "Enter a valid email address." and validation event logged | Guards email format |
| MAN-VER-04 | Preview info accuracy | CVT-VER-01 | Functional | Modal open | Observe preview before submit | Preview shows request number, timestamp, record name/ID/status | Keeps QA context complete |
| MAN-VER-06 | Cancel flow | CVT-VER-01 | Functional | Modal open after previous test | Click `Cancel`, reopen modal | Modal closes without new audit entry; reopened modal is fresh | Avoids stale states |
| MAN-MNT-02 | Maintenance banner persistence | CVT-MNT-01 | Functional | Set `maintenanceMode` true | Navigate between Search and Audit | Banner stays and message reiterates verification disablement | Confirms global state |
| MAN-AUD-01 | Search audit entries | CVT-AUD-01 | Functional | Perform search, then visit audit page | Open audit log | Entries for `search submitted` and `search returned record` exist with filter details | Validates logging pipeline |
| MAN-AUD-02 | Verification audit entry | CVT-AUD-01 | Functional | Non-maintenance submission done | Visit audit log | `verification request submitted` row shows the record ID | Shows verification traceability |
| MAN-ACC-01 | Keyboard tab order | NFR-ACC-01 | Functional | App loaded | Use Tab and Enter through search, cards, modal controls | Focus order is logical; Enter triggers Search/Submit | Ensures keyboard reliability |
