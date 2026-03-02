# Defect Management Guide

CertiTrace uses GitHub Issues for defect tracking and Projects for triage, following the QA artifact guidance from Phase 1.

## Filing a Defect
1. Create a new GitHub Issue titled `[Defect] <requirement ID> - short summary` (e.g., `[Defect] CVT-STAT-01 - status card stale`).
2. Tag it with the relevant label(s) (e.g., `bug`, `regression`, `accessibility`).
3. Reference the requirement ID from `qa/requirements.md` and include the RTM row number for traceability.
4. Attach reproducer steps, expected vs. actual behavior, environment, and, if available, a Playwright test or manual checklist entry.
5. If a screenshot helps, place it under `defects/screenshots/` and link the file path in the issue (e.g., `defects/screenshots/cvt-stat-issue-01.png`).

## Triage Process
- Use GitHub Projects to review active defects weekly. Track severity, status, assigned owner, and linked automation from the RTM. Generate a board view that groups defects by requirement ID or test phase (smoke/functional/regression).
- Prioritize high-impact defects tied to active release criteria (especially CVT-VER-01, CVT-MNT-01, and CVT-AUD-01).
- For regression defects, update the RTM row’s Defect IDs column with the issue number (e.g., `GH-123`).

## Severity & Status Conventions
- **Severity levels:** `Critical` (blocks verification or compliance), `Major` (interferes with core flows), `Minor` (ui polish or messaging). Document severity in the issue body.
- **Status:** Use GitHub issue states (`Open`, `In Progress`, `Blocked`, `Closed`). Use `Draft` or `Triaged` labels for early findings.

## Release Criteria Linkage
Defects tied to release criteria (RTM coverage, automation readiness, release document sign-offs) must cite the release criteria document and include any blocking evidence, such as failed Playwright suites or missing audit logs.

## Maintenance & Evidence
- After fixing a defect, update the RTM row to include the defect ID and automation plan (if relevant).
- Store reproduction artifacts (screenshots, logs) under `defects/screenshots/`. Label files clearly (e.g., `CVT-VER-01-modal-error.png`).
