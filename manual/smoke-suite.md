# Smoke Suite

## Overview
The smoke suite confirms that the high-level experiences—search, status cards, verification requests, and maintenance warnings—are instantly usable in every browser before deeper work begins. These tests must pass at 100% for Chromium, Firefox, and WebKit releases marked as a Go.

## Environment & Data
- **App build:** current dev server (e.g., `npm run dev`).
- **Data fixture:** `src/data/records.json` (Alex Jordan, Maya Patel, Jordan Lee).
- **Maintenance toggle:** `src/config/maintenance.json` (flip `maintenanceMode` to `true` for maintenance checks).
- **Browsers:** run in Chromium, Firefox, WebKit projects.

## Standard Table Format (applies to every suite)
| ID | Title | Requirement | Suite | Preconditions | Steps | Expected Result | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| MAN-SRCH-01 | Two-letter first-name search | CVT-SRCH-01 | Smoke | App loaded with fixtures | Type `Ma` into First name and submit | Only `Maya Patel` and any other matches appear; summary chips update | Confirms case-insensitive partial first-name filtering |
| MAN-SRCH-02 | Minimal first-name validation | CVT-SRCH-01 | Smoke | Same as above | Enter whitespace or single character in First name, submit | Validation message "First name requires at least 2 characters." appears | Ensures guard rails for narrow queries |
| MAN-SRCH-03 | Case-insensitive last-name search | CVT-SRCH-02 | Smoke | Same state | Type `jordan` in Last name, submit | Both `Alex Jordan` and `Jordan Lee` display; summary text says 2 records | Verifies last-name matching tolerates casing |
| MAN-STAT-01 | Active status pill checks | CVT-STAT-01 | Smoke | At least one Active record visible | Inspect Alex Jordan card (Active) | Pill shows green styling, ✅ icon, text "Active" | Confirms visual semantics |
| MAN-VER-01 | Happy-path verification request | CVT-VER-01; CVT-AUD-01 | Smoke | Search result present, maintenance off | Open modal for Active record, fill valid name/email, submit | Modal closes, audit table records `verification request submitted` | Makes sure request flow works |
| MAN-MNT-01 | Maintenance banner presence | CVT-MNT-01 | Smoke | Set `maintenanceMode` to true | Reload app and visit Search + Audit navigation | Banner appears with maintenance message and disables request buttons | Verifies banner global visibility |

## Execution Log Template
| Date | Browser | Tester | Pass/Fail | Notes |
| ---- | ------- | ------ | --------- | ----- |
| | | | | |

> Record the results for each browser iteration to satisfy the cross-browser smoke requirement.
