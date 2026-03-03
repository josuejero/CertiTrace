# CertiTrace QA Lab

Synthetic healthcare certification-validation experience designed to demonstrate manual testing rigor, Playwright automation, defect triage, and CI-published evidence side-by-side.

## Table of contents
- Product story and impact
- Highlights & behaviors
- Architecture & data flows
- Getting started
- Automated testing
- QA documentation & manual suites
- Defect management & packaging
- Release, deployment, and artifacts
- Supporting resources

## Product story and impact
CertiTrace simulates the NCCPA-style workflow for searching practitioner records, evaluating credential status, surfacing disciplinary history, requesting verification letters, and auditing every interaction. The goal is to give recruiters, hiring managers, or QA leads a single artifact that proves: requirements coverage was defined (`qa/requirements.md`), tests were executed (`tests/` + PlaywrightReports), defects were triaged (`defects/README.md`), and every sprint-to-release checkpoint is documented (`qa/release-criteria.md`).

## Highlights & behaviors
- **Search-first UI:** filters for first name, last name, state, and certification ID update the status-card grid and summary chips in real time (see `src/pages/SearchPage.tsx`).
- **Status cards:** color-coded pills/authentic icons (`StatusCard.tsx`) show Active, Expired, Suspended states; disciplinary banners only render when `disciplinaryAction` is `true` and include incident summaries.
- **Verification workflow:** clicking `Request verification` opens a modal that validates recipient name/email, destination state, and previews a synthetic letter; submissions write to the audit log via `AuditContext` with `localStorage` persistence (`src/context/AuditContext.tsx`).
- **Maintenance & observability:** `src/config/maintenance.json` + overrides handle banner display, disable verification controls, and surface reasons (also controllable via `VITE_MAINTENANCE_MODE`, query params, or runtime overrides).
- **Audit log page:** filters by action, record type, and date range while sorting events in reverse chronological order to support compliance demos (`src/pages/StaffAuditPage.tsx`).

## Architecture & data flows
- **Stack:** Vite + React 18 + TypeScript + React Router for SPA navigation. `main.tsx` wires `BrowserRouter`, global styles, and `App`.
- **Data:** synthetic records live in `src/data/records.json` and include mixed statuses plus disciplinary metadata. Summary chips recompute counts from the current result set.
- **Context:** audit events are stored in `localStorage` via `useLocalStorageState` (`src/utils/storage.ts`) and indexed with CLI-friendly IDs (`src/utils/id.ts`). The context logs actions such as `search submitted`, `search returned record`, `verification request submitted`, and `staff filter applied`.
- **Utility functions:** `src/utils/date.ts` formats relative/verbatim timestamps and generates fake request numbers for the verification preview; this keeps the UI polished while staying deterministic for automation.

## Getting started
1. **Prerequisites:** Node.js 20.x (workflow uses `actions/setup-node@v5`), npm 10+, and a browser to preview the UI.
2. **Install dependencies:** `npm ci` (preferred for CI parity) or `npm install` for local experimentation.
3. **Run locally:** `npm run dev -- --host 0.0.0.0 --port 4173` then open http://localhost:4173.
4. **Build for production:** `npm run build` (outputs to `dist/`).
5. **Preview build:** `npm run preview` serves the production bundle on a temporary server.

### Environment & maintenance overrides
- Change `src/config/maintenance.json` to toggle maintenance and update the `message` shown at the top of every page.
- Set `VITE_MAINTENANCE_MODE=true` or append `?maintenance=true&maintenanceMessage=Your+Message` to the URL to supply ad-hoc overrides during demos.
- Global overrides can also be injected at runtime via `window.__CERTITRACE_MAINTENANCE_MODE` and `window.__CERTITRACE_MAINTENANCE_MESSAGE` (see `src/config/maintenance.ts`).

## Automated testing
- **Playwright suites:** smoke (`tests/smoke`), regression (`tests/regression/bugs.spec.ts`), and supporting page objects under `tests/pages/` keep automation maintainable.
- **Commands:** `npm run test:e2e` runs the full matrix (Chromium/Firefox/WebKit) via `playwright.config.ts`; `npm run test:smoke` and `npm run test:regression` run tagged subsets.
- **Report output:** HTML reports land in `playwright-report/` and are refreshed through CI into `site/reports/latest/` for portfolio evidence.
- **Fixture data:** `tests/fixtures/records.ts` mirrors `src/data/records.json` so automation targets stable records (Alex/Maya/Jordan). Page objects focus on accessibility by using `getByRole` and `getByLabel` selectors.

## QA documentation & manual suites
- **Requirements & traceability:** `qa/requirements.md` defines CVT and NFR IDs; `qa/rtm.csv` maps each ID to manual (`MAN-*`) and automation (`AUTO-*`) coverage plus linked risks.
- **Test plan:** `qa/test-plan.md` explains scope, tooling, phases, and ties every requirement to manual+automation expectations.
- **Risk register:** `qa/risk-register.md` documents risks (search accuracy, status freshness, maintenance misconfiguration, etc.) and links them to owners/requirements.
- **Release gating:** `qa/release-criteria.md` lists Phase 1 and Phase 4 release gates (smoke/regression pass rates, defect policy, cross-browser verification, final recommendation matrix).
- **Manual suites:** The `manual/` folder contains templated suites for smoke, functional, regression, and UAT plus `manual/defect-template.md`. Each suite uses a standard table format that references requirement IDs and includes manual test IDs (e.g., `MAN-SRCH-04`).

## Defect management & packaging
- **Defect process:** `defects/README.md` requires GH Issues titled `[Defect] <Requirement ID> - summary`, uses labels, and links screenshots from `defects/screenshots/` for traceability.
- **Packaging guidance:** `qa/phase-7-8-packaging.md` explains how the Phase 7 deliverables flow through the `deploy-pages` workflow, the artifact layout (`site/index.html`, `site/reports/latest/`, `site/bug-safari/`, `site/release/`), and where to store screenshots.
- **Evidence assets:** Keep replay screenshots/videos under `defects/screenshots/` and pair them with RTM rows when referencing automated/manual coverage.

## Release, deployment, and artifacts
- **CI workflow:** `.github/workflows/deploy-pages.yml` checks out code, installs Node.js 20, installs Playwright browsers, builds the app, runs `npm run test:e2e`, uploads the HTML report, assembles the `site/` payload, and triggers GitHub Pages deployment via `actions/deploy-pages@v4`.
- **Artifact layout:** The workflow places the app into `site/index.html`, copies the latest Playwright output to `site/reports/latest/`, and is expected to publish additional static story pages under `site/bug-safari/` and `site/release/` (see packaging guide).
- **Playwright report:** The report is uploaded as a GitHub Actions artifact (name: `playwright-report`) so new evidence is always attached to the run.
- **Local audit evidence:** Audit logs (search + verification events) persist across sessions via `localStorage`, and the staff audit page renders them in a table with filter + reset controls for verification.

## Supporting resources
- `src/data/records.json`: synthetic data set with Active/Expired/Suspended records plus disciplinary meta.
- `src/config/maintenance.json`: defaults for maintenance mode + message (`lastUpdated` timestamp included for release notes).
- `qa/phase-6-story.md` and `qa/final-test-summary.md`: narrative artifacts describing the QA journey and final test outcomes.
- `playwright-report/`: HTML+media evidence from the last local run (refreshed in CI to `site/reports/latest/`).

## Live experience
1. Live app: `https://josuejero.github.io/certitrace/`
2. Latest test report: `https://josuejero.github.io/certitrace/reports/latest/`
3. Bug safari: `https://josuejero.github.io/certitrace/bug-safari/`
4. Code repo: `https://github.com/josuejero/certitrace`
