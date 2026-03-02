# Phase 1 Release Criteria

This release criteria list gates moving beyond QA scoping into implementation. All items must be satisfied with artifacts captured in the repo or GitHub evidence before Phase 1 is considered complete.

1. **Requirements locked in:** `qa/requirements.md` lists 10–12 functional and 5–6 non-functional requirements with acceptance details. Evidence: Markdown file versioned in repo.
2. **Traceability matrix published:** `qa/rtm.csv` maps every requirement to a risk entry, and each row lists placeholder manual and automation IDs to be filled later. Evidence: CSV file and initial commit.
3. **Risk register approved:** `qa/risk-register.md` captures key risks, owners, likelihood/impact, and linked requirements. Evidence: risk register file and risk sign-off (e.g., GitHub review). 
4. **Test plan drafted:** `qa/test-plan.md` outlines QA phases, tooling, test data guidance, and automation strategy that references the planned Playwright suites, manual suites, and CI pipeline. Evidence: Markdown file.
5. **Automation readiness:** GitHub Actions workflow draft (or plan) describes Playwright smoke/functional/regression projects covering Chromium, Firefox, WebKit, plus HTML report storage. Evidence can be repo action file or README note until pipeline is created.
6. **Defect process documented:** `defects/README.md` explains how to file GitHub Issues/Projects, link to RTM IDs, and store screenshots under `defects/screenshots/`. Evidence: README file committed.
7. **Synthetic data/config visibility:** Documented data sources for search results (`src/data/records.json`) and maintenance toggles (`src/config/maintenance.json`) exist or are referenced so QA understands stimuli. Evidence: file stubs or README references.
8. **CI coverage verification:** Playwright suites (at least smoke) are executed and reported via GitHub Actions on one push/PR; artifact or log exists even if scripted for later. Evidence: action run log or placeholder pipeline description.

## Phase 4 Release Criteria (Manual QA Pack)

This section formalizes the Phase 4 handoff once the manual QA pack is executed.

1. **Manual suites delivered:** `manual/smoke-suite.md`, `manual/functional-suite.md`, `manual/regression-suite.md`, `manual/uat-suite.md`, and `manual/defect-template.md` exist and the tests reference the `MAN-*` IDs recorded in `qa/rtm.csv`.
2. **Smoke suite:** 100% pass in every browser (Chromium, Firefox, WebKit). Log dates and tester names, then append screenshots or report links under `defects/screenshots/` when issues arise.
3. **Regression suite:** ≥95% pass rate across all entries; any failure must link to a documented defect.
4. **Cross-browser verification:** The smoke suite must be executed and recorded for Chromium, Firefox, and WebKit with their pass/fail results captured in both `manual/uat-suite.md` and this release criteria document.
5. **Defect policy:** No open Severity 1 (critical) defects; max one open Severity 2 with a documented workaround (per `manual/defect-template.md` and `defects/README.md`).
6. **RTM & release artifacts:** All `MAN-*` IDs are referenced in `qa/rtm.csv`, and the manual suites link back to release criteria via this document.
7. **Final recommendation:** Use the table below to summarize the Go/No-Go decision before the release candidate is signed off.

| Item | Status / Notes |
| --- | --- |
| Smoke suite pass rate | |
| Regression suite pass rate | |
| Chromium smoke status | |
| Firefox smoke status | |
| WebKit smoke status | |
| Open defects (Sev 2 or higher) | |
| Release date | |
| Reviewer | |
| Final recommendation | Go if every gating item above is satisfied; otherwise select No-Go and document remediation steps. |

> Update the Final recommendation row after manual regression/UAT execution completes so the decision is traceable. If anything changes (e.g., a new defect appears), revisit this table before declaring Go.

Meeting each criterion ensures Phase 1 delivers a QA-ready foundation before engineering work accelerates.
