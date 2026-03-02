# Phase 6 story: seeded bugs & flaky test stabilization

This narrative captures Phase 6’s guardrails: deliberately seed three defects, triage them through GitHub Issues and Projects, confirm fixes with regression automation, and document an intentionally flaky maintenance banner test before and after stabilization.

## Exit criteria (met)
- **3 defects filed:** Issues `GH-210`, `GH-211`, `GH-212` track the seeded bugs, each linked to the `CertiTrace Phase 6 QA` Project with Severity, Priority, Status, Component, and Fix Version fields populated per the GitHub Docs guidance.
- **3 fixes merged:** Status card gating, verification modal validation, and audit logging guards were merged together with this change set.
- **3 regression tests added:** Automation IDs `REG-DISC-01`, `REG-VER-01`, and `REG-AUD-01` now guard the seeded scenarios.
- **Flaky test story documented:** The maintenance banner story below highlights the before/after stability work and the Playwright retry guidance.

## Seeded defects (tracked in GH)
| Title | Issue | Severity | Priority | Status | Component | Fix version | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Disciplinary banner false positive (banner shown when `disciplinaryAction` is `false`) | GH-210 | Major | Medium | Closed | Status cards | v0.1.1 | Added an explicit `disciplinaryAction` flag and only render the banner when it is `true`, aligning with the field that records the actual action state. |
| Verification form validation gap (malformed email or missing destination state) | GH-211 | Major | High | Closed | Verification modal | v0.1.1 | Introduced the `Destination state` dropdown, tightened validation, surfaced the errors via `role="alert"`, and guarded against double submissions. |
| Audit log duplication (submit handler firing twice) | GH-212 | Major | Medium | Closed | Audit logging | v0.1.1 | Added a submission guard to the verification flow, ensuring the `verification request submitted` entry is logged exactly once per request. |

Each issue was added to the `CertiTrace Phase 6 QA` GitHub Project board with the prescribed custom fields (Severity, Priority, Status, Component, Fix Version) so stakeholders can review triage history and verify deployment readiness.

## Regression coverage (automation)
- `REG-DISC-01` (`tests/regression/bugs.spec.ts`): Confirms the disciplinary banner only appears when `disciplinaryAction` is `true`, protecting against the false-positive scenario seeded for Alex Jordan even though the legacy summary string remains present.
- `REG-VER-01` (`tests/regression/bugs.spec.ts`): Exercises the verification modal’s validation logic, first asserting malformed email rejection with a valid state and then verifying the `Select a destination state.` error when the dropdown is left empty.
- `REG-AUD-01` (`tests/regression/bugs.spec.ts`): Submits a verification request and then validates the audit log contains exactly one `verification request submitted` entry for the targeted record, preventing duplicate audit rows.

Each automation ID now appears in `qa/rtm.csv`, linking the regression guardrails back to `CVT-DISC-01`, `CVT-VER-01`, and `CVT-AUD-01`.

## Flaky maintenance banner story

### Before (flaky tracer)
The maintenance banner load was simulated by an async config fetch that resolved after a randomized delay. The original test (the “flaky version”) yawed open Playwright’s `page.waitForTimeout(300)` before checking for the banner. Because the delay could exceed 300 ms, the assertion occasionally ran before the banner rendered, producing intermittent failures. These flakes were hard to reproduce, and retries masked the root cause rather than fixing it.

### After (stabilized guardrail)
We stabilized the story by mocking the maintenance configuration (via the query string override) and by letting Playwright’s `expect(locator).toBeVisible()` auto-retry until the DOM actually reflects the warning. The simplification matches Playwright’s recommended pattern for async pages (see `expect(...).toBeVisible()` auto-retries in the Playwright docs) and eliminates brittle `waitForTimeout` sleeps. The smoke test now asserts the banner and the disabled request buttons deterministically.

## Takeaways
- The seeded bugs exercise the QA team’s ability to triage (issue + project), confirm (regression tests), and prevent regressions (automation + doc) while still telling the debugging story.
- The maintenance banner note captures how flaky behavior can be tamed by explicit waits, deterministic mocks, and Playwright’s built-in retries, which is a micro-case study for future async UI tests.
