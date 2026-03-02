# Phase 7 & 8 Packaging

## Phase 7 deliverables
1. **Automated pipeline** – `deploy-pages.yml` runs on every push/PR to `main`, installs dependencies, builds the Vite app, runs `npm run test:e2e`, uploads `playwright-report/` as an artifact, and assembles a `site/` payload containing the built app plus the latest HTML report.
2. **Site artifact layout** – Each workflow output contains these directories that get published to GitHub Pages:
   - `site/index.html` (live CertiTrace web app)
   - `site/reports/latest/` (Playwright-generated HTML report with screenshots/traces)
   - `site/bug-safari/index.html` (seeded defect story + reproduction guidance)
   - `site/release/index.html` (release summary + go/no-go verdict) 
3. **Pages flow** – The deploy job downloads the `site` artifact, configures Pages, uploads the artifact via `actions/upload-pages-artifact`, and calls `actions/deploy-pages` with `wait-for-deployment: true` so reviewers always land on the freshest bundle.

## Phase 8 portfolio guidance
- **Screenshot checklist (store files under `defects/screenshots/` for traceability)**
  1. Search experience showing the search form beside a status card (captures CVT-SRCH-01/02/03 behavior).
  2. Failing regression capture (Playwright failure or manual evidence with reason).
  3. Passing regression capture (success screen or Playwright “pass” badge in the report).
  4. Defect board or GitHub Project view with seeded bugs/screen.
  5. Release summary / go/no-go page (the HTML under `/release/index.html`).
- **Portfolio card description**
  > Designed a healthcare certification-verification QA lab with manual test planning, requirements traceability, Playwright smoke/regression automation, defect triage, and CI-published release evidence.
- **Resume bullet**
  > Built CertiTrace, a healthcare certification-verification QA lab using synthetic records, manual test planning, RTM coverage, Playwright cross-browser regression automation, GitHub defect triage, and CI-published test reports.
- **Artifact hygiene** – Pair each screenshot with the corresponding RTM ID in `qa/rtm.csv` and add defect links from `defects/README.md` when reference is required.

## Link ordering directive
Recruiters should click links in the following order so the experience builds quickly:
1. Live demo (`site/index.html`)
2. Latest test report (`/reports/latest/index.html`)
3. Bug safari (`/bug-safari/index.html`)
4. Code repository (this repo)

## Notes
- Replace `<username>` with your GitHub handle when sharing the Pages URLs.
- When new deploys happen, refresh the `reports/latest/` path before capturing screenshots so the portfolio evidence always links to the latest artifact.
