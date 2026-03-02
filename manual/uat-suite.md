# UAT Suite

## Overview
User acceptance testing focuses on stakeholder-ready narratives: disciplinary announcements, maintenance-induced gating, keyboard reliability, and the cross-browser smoke validation that decides Go vs No-Go. Each test below also indicates who to inform when the behavior is accepted.

## Execution Notes
- UAT runs should include a short debrief that feeds into `qa/release-criteria.md`’s final recommendation matrix.
- Record the actual browser statuses for Chromium, Firefox, and WebKit during the cross-browser smoke run.

## Standard Table Format (applies to every suite)
| ID | Title | Requirement | Suite | Preconditions | Steps | Expected Result | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MAN-DISC-05 | Disciplinary banner announcement | CVT-DISC-01 | UAT | Maya Patel card visible | Trigger disciplinary banner | Banner text references statement of reason, `aria-live` announces it | Suitable for stakeholder story |
| MAN-VER-05 | Maintenance disables requests | CVT-MNT-01; CVT-VER-01 | UAT | `maintenanceMode` enabled | Open modal for Active record | Submit button disabled, maintenance message shown | Communicates fail-safe to stakeholders |
| MAN-VER-07 | Modal focus discipline | NFR-ACC-01 | UAT | Modal open | Tab and Shift+Tab through recipient fields and buttons, then press Enter on Submit | Focus order logical, Enter triggers validation or success, logarithms recorded | Demonstrates refined keyboard UX |
| MAN-ACC-03 | Cross-browser smoke verification | NFR-REL-01 | UAT | Smoke suite steps defined | Run canonical smoke cases in Chromium, Firefox, WebKit | Document pass/fail for each browser and link to their logs | Signals readiness for multi-browser Go/No-Go |

## Final Recommendation Summary
| Item | Details |
| --- | --- |
| Run date | |
| Chromium smoke status | |
| Firefox smoke status | |
| WebKit smoke status | |
| Open defects (Sev 2 or higher) | |
| Final recommendation | Go if all Phase 4 exit criteria (smoke 100%, regression ≥95%, cross-browser smoke, no open Sev 1, ≤1 Sev 2 with workaround) are satisfied; otherwise mark No-Go. |
| Reviewer | |
| Notes | |

> Include this summary in the final release criteria document so the Go/No-Go decision is traceable.
