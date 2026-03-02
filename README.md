# CertiTrace QA Lab

CertiTrace is a synthetic healthcare certification-verification QA lab that showcases manual test planning, Playwright automation, defect triage, and CI-published evidence so recruiters can certify the experience in minutes.

## Recruiter quick links (must stay in this order)
1. [Live demo](https://<username>.github.io/certitrace/)
2. [Latest Playwright HTML report](https://<username>.github.io/certitrace/reports/latest/)
3. [Bug safari walkthrough](https://<username>.github.io/certitrace/bug-safari/)
4. [Code repository](https://github.com/<username>/certitrace)

## Phase 7 validation checklist
- **Public demo live:** The built app is published under `site/index.html` on GitHub Pages.
- **Latest report live:** Playwright’s HTML output is refreshed into `site/reports/latest/` every build and linked above.
- **Bug safari live:** Static bug documentation is available at `/bug-safari/` and includes seeded defect details plus triage guidance.
- **CI runs on every push/PR:** The `deploy-pages` workflow triggers on `push`/`pull_request` to `main`, runs `npm run test:e2e`, stores the HTML report, builds the `site/` artifact, and publishes it to Pages.

Confirm each bullet and note the GitHub Actions run in the workflow tab to satisfy Phase 7 exit criteria.

## Phase 8 packaging
For QA resume/portfolio impact, follow the instructions in `qa/phase-7-8-packaging.md`. That document explains where to place the five mandated screenshots, how to describe the experience on your portfolio card, and the exact resume bullet text.

## Share-time note
When you hand out URLs, replace every `<username>` placeholder with your actual GitHub handle so the Pages links resolve correctly.
