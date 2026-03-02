# CertiTrace QA Test Plan (Phase 1)

## Scope
This plan covers QA work required to satisfy Phase 1 scoping: requirements documentation, traceability, risk mitigation, and readiness for automation. The scope mirrors the NCCPA-style verification workflow described in `qa/requirements.md` and concentrates on user-visible behavior (search, status, banners, verification, audit logging, maintenance controls) without touching production data.

## Strategy & Principles
- **User-visible behavior:** Tests drive the experience from the user's perspective (search, banners, modals) following Playwright best practices (`getByRole`, `getByLabel`, `getByText`).
- **Accessibility-first:** Keyboard flows and semantic markup are validated early as part of manual checks and automated scripts.
- **Isolated tests:** Every Playwright test is designed so it can run independently in Chromium/Firefox/WebKit projects.
- **Observability:** Maintenance-mode toggles and audit log writes are surfaced both in UI assertions and CI logs.

## Tooling & Environment
- **Frontend:** React + Vite + TypeScript (per the recommended zero-cost stack).
- **Automation:** Playwright suites stored under `tests/` with a focus on smoke, functional, and regression coverage.
- **CI:** GitHub Actions runs Playwright on every push/PR with multi-browser (Chromium, Firefox, WebKit) projects and publishes the HTML reporter as an artifact.
- **Defects/Triage:** GitHub Issues and Projects capture defects and their RTM links; `defects/README.md` describes the process.
- **Manual suites:** Documented under `manual/` (smoke/functional/regression/UAT) for Phase 2, ensuring every requirement has a manual test plan.

## Testing Phases
1. **Smoke (manual + automated):** Validate search entry points, status card rendering, and maintenance banner using Playwright fast checks before deeper exploration. Automation references `tests/smoke/` and manual checks reference `manual/smoke-suite.md` once crafted.
2. **Functional (manual + automated):** Cover each functional requirement, verifying search filters, banners, verification modal, and audit workflows. Split responsibilities:
   - Automated tests exercise repeatable flows (e.g., search combos, modals).
   - Manual tests cover accessibility verification, persona-based scenarios, and edge cases like invalid input.
3. **Regression:** After functional flows stabilize, regression suites guard against unintended banner or audit regressions and confirm new automation passes.

## Entry / Exit Criteria
- **Entry:** Requirements doc published, RTM skeleton live, automated test templates present, and synthetic data/mock config ready.
- **Exit:** All 10–12 functional requirements mapped to test cases, RTM references manual/automation IDs, release criteria checklist complete, Playwright suites run successfully on GitHub Actions, and release evidence stored under `public/release/` or Action artifacts.

## Manual vs. Automated Coverage
- Manual testers will validate keyboard navigation, semantic labels, and interpretive guidance for empty or invalid states.
- Automation focuses on consistent result rendering (e.g., CVT-SRCH-01 through CVT-HIST-01), verifying audit logging, maintenance toggles, and verification-modal behaviors.
- Every requirement includes placeholder IDs in the RTM for manual (`TBD-MAN-##`) and automated (`TBD-AUTO-##`) coverage.
- Manual IDs are now defined (`MAN-SRCH-01`, `MAN-STAT-01`, etc.) and mapped directly in `qa/rtm.csv`, letting testers link covered requirements back to each manual suite entry.

## Manual QA Pack (Phase 4)
The manual suites stored under `manual/` provide the Phase 4 artifacts for smoke, functional, regression, and UAT coverage. Each suite reuses the standard table format (`ID | Title | Requirement | Suite | Preconditions | Steps | Expected Result | Notes`) so testers can quickly scan, link to requirements, and capture results.

- **Smoke suite (`manual/smoke-suite.md`):** six critical sanity checks (first/last-name searches, status card styling, verification request flow, and maintenance banner presence) that must pass 100% on Chromium, Firefox, and WebKit.
- **Functional suite (`manual/functional-suite.md`):** 20 deep-dive scenarios covering search/filter combinations, status/history validation, disciplinary banner logic, verification modal validation, maintenance persistence, audit log creation, and keyboard navigation behavior.
- **Regression suite (`manual/regression-suite.md`):** ten regression guards with extra columns for execution status (Pass/Fail/Blocked) and defect references to capture subtle regressions in search behavior, banner accessibility, maintenance gating, audit filters, and responsive layout.
- **UAT suite (`manual/uat-suite.md`):** four stakeholder-ready checks (disciplinary announcements, maintenance-induced disablement, modal focus order, and cross-browser smoke verification) plus a final recommendation matrix.

Testers should note which `MAN-*` ID they executed, attach any evidence under `defects/screenshots/`, and file defects using `manual/defect-template.md`.

### Phase 4 Release Gates
- **Smoke suite:** 100% pass across Chromium, Firefox, and WebKit executions.
- **Regression suite:** ≥95% pass, with failures tied to documented, triaged defects.
- **Cross-browser smoke:** Document the smoke suite status for each browser in the UAT summary and in `qa/release-criteria.md`.
- **Defect policy:** No open Severity 1 (Sev 1) defects; at most one open Severity 2 with a documented workaround.
- **RTM and manual documentation:** Every `MAN-*` ID referenced in the suites is listed under the Manual TC IDs column in `qa/rtm.csv`, and the release criteria document retains the final Go/No-Go recommendation tied to these suites.

## Test Data and Environment Guidelines
- Use synthetic records defined under `src/data/records.json` (e.g., mix of active, expired, suspended statuses and disciplinary flags).
- `src/config/maintenance.json` toggles maintenance mode for `CVT-MNT-01` and observability tests.
- No production or real-world data is permitted; maintenance toggles must be documented in release notes.

## Auditing & Logging Validation
- Playwright suites include checks for audit entry creation whenever a search or verification action occurs (CVT-AUD-01).
- Audit page filters (CVT-AUD-02) are scripted to filter by action/date/type and confirm reset behavior.

## Test Evidence
- Use Playwright HTML reports to document automated runs; store these in GitHub Actions artifacts and publish via GitHub Pages when ready.
- Manual checklists (to be created under `manual/`) should reference requirement IDs and record tester sign-off.

## Risk Mitigation
Key risks (detail in `qa/risk-register.md`) include stale data, automation flakiness, and maintenance-mode misconfigurations; mitigation is tracked via RTM and defect IDs.
