# Regression Suite

## Overview
These regression guards protect the behaviors already exercised by the smoke and functional suites. Each test below reuses the standard columns, with extra fields for tracking execution status and any linked defects so regressions are traceable.

## Execution Notes
- Schedule regression runs after any feature or platform updates that touch search, banners, or auditing.
- Capture any deviations in the `Defect (if any)` column; reference `manual/defect-template.md` when filing issues.

## Standard Table Format (applies to every suite)
| ID | Title | Requirement | Suite | Preconditions | Steps | Expected Result | Notes | Execution Status (Pass/Fail/Blocked) | Defect (if any) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MAN-SRCH-10 | Enter key triggers search | CVT-SRCH-01; NFR-ACC-01 | Regression | First-name field focused | Type `Al`, press Enter | Search executes identically to clicking the button | Tests keyboard parity | |
| MAN-SRCH-11 | Partial last-name matches | CVT-SRCH-02 | Regression | Last-name field clear | Enter `Jor`, submit | Cards for `Jordan Lee` + `Alex Jordan` display | Validates partial filtering | |
| MAN-SRCH-12 | Initial state messaging | CVT-RES-01 | Regression | App freshly loaded | Click Search w/ blanks or rely on default | Summary says "Showing all records" with counts 3 | Confirms default messaging | |
| MAN-STAT-06 | Status card accessibility | CVT-STAT-01 | Regression | Status grid visible | Inspect DOM for `role`, `aria-live`, `id` references | Screen reader text would announce status w/ record ID | Keeps accessible semantics | |
| MAN-DISC-03 | Discipline metadata narration | CVT-DISC-01; NFR-ACC-02 | Regression | Maya Patel card active | Inspect banner | Date listed, `role="status"`, `aria-live="polite"` exist | Ensures assistive cues | |
| MAN-DISC-04 | Incident link focus | CVT-DISC-01 | Regression | Banner in focus order | Tab to "View incident details" and activate | Focus remains contained; link reachable even though `href="#"` | Verifies keyboard interactability | |
| MAN-MNT-03 | Maintenance disables controls | CVT-MNT-01 | Regression | `maintenanceMode` on | Open Search and modal | Buttons/submit disabled with tooltip describing message | Prevents false submissions | |
| MAN-AUD-03 | Audit filters respect inputs | CVT-AUD-02 | Regression | Audit log populated | Apply Action: "search returned record", Type: "search", date range that includes today | Table only shows matching rows; `staff filter applied` event logged | Ensures filters work | |
| MAN-AUD-04 | Audit reset flow | CVT-AUD-02 | Regression | Filters applied | Click `Reset` | Filters clear and entire audit log returns | Guarantees filter reset | |
| MAN-ACC-02 | Responsive layout check | NFR-ACC-02; NFR-REL-01 | Regression | Browser width set to mobile | Shrink viewport (e.g., 375px) | Search form stacks, cards reflow, banner text wraps without overflow | Prevents layout breakage | |

## Regression Log Template
| Date | Tester | Scope | Status | Notes |
| ---- | ------ | ----- | ------ | ----- |
| | | | | |

> Populate the log each regression run; the summary should feed into the Phase 4 release recommendation.
