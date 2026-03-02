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

Meeting each criterion ensures Phase 1 delivers a QA-ready foundation before engineering work accelerates.
