# CertiTrace Risk Register (Phase 1)

Risks focus on information accuracy, compliance, and observability tied to the functional requirements documented in `qa/requirements.md`. Ownership rests with the QA lead or product owner until engineering delivers stable behavior.

| Risk ID | Summary | Likelihood | Impact | Mitigation | Owner | Linked Requirements |
| --- | --- | --- | --- | --- | --- | --- |
| RISK-SEARCH-01 | Search filters return incorrect or partial results, reducing trust. | Medium | High | Lock down synthetic data fixture coverage, cover combos in Playwright, document expected behavior in manual suites. | QA Lead | CVT-SRCH-01, CVT-SRCH-02, CVT-SRCH-03, CVT-SRCH-04, CVT-RES-01 |
| RISK-STATUS-01 | Status card or last-verified labels show stale state or missing data. | Medium | Medium | Implement mock refresh hooks, assert last-updated fields, and review changelog for any status mapping. | Product Owner | CVT-STAT-01, CVT-HIST-01 |
| RISK-DISC-01 | Disciplinary banner appears when it shouldn't or hides needed warnings. | Low | Medium | Guard banners with explicit flag checks, review fixture data, and assert banner text in Playwright. | QA Lead | CVT-DISC-01 |
| RISK-VER-01 | Verification letter workflow cannot be submitted or audited. | Medium | High | Validate modal controls, require mandatory fields, and ensure audit log entries capture the request. | Release Manager | CVT-VER-01 |
| RISK-MNT-01 | Maintenance banner misconfigures, leaving requests enabled or banner hidden. | Medium | High | Drive banner from `src/config/maintenance.json`, include observability logging, and smoke-test toggle on CI. | Ops Lead | CVT-MNT-01, NFR-MNT-01 |
| RISK-AUDIT-01 | Audit logs drop entries or filter controls misbehave, injuring compliance. | Low | High | Exercise logging on every search/verification action and script filter permutations. | QA Lead | CVT-AUD-01, CVT-AUD-02 |
| RISK-RES-01 | Summary metrics diverge from actual results, confusing staff decisions. | Low | Medium | Surface explicit counts for each status and reconcile against result set size during automation. | QA Lead | CVT-RES-01 |

Each risk is tracked in the RTM column to keep manual/automated scope aligned with mitigation status.
