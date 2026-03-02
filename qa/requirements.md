# CertiTrace QA Requirements

## Project Context
CertiTrace is a synthetic QA lab inspired by the NCCPA certification portal. The experience mimics a board-certification verification workflow, allowing staff to search synthetic practitioner data, observe current certification status, respond to disciplinary conditions, request verification letters, and verify that audit and maintenance controls trigger at the right times. All data displayed is fabricated; the goal is to rehearse a realistic QA cycle without ever touching sensitive records.

## Functional Requirements
Each functional requirement maps directly to a behavior the product must deliver before automation or staff testing begins.

| ID | Title | Description | Success Criteria | Notes |
| --- | --- | --- | --- | --- |
| CVT-SRCH-01 | Search by first name | Search form accepts a first name and filters credential records. | Results list shows matches when the first name has at least 2 characters; errors when only whitespace entered. | Synthetic fixture set contains duplicate first names to exercise specificity. |
| CVT-SRCH-02 | Search by last name | Search form accepts a last name filter. | Results filtered to records whose last name matches the input string; handles case-insensitive input. | Adds confidence for surname-based lookups. |
| CVT-SRCH-03 | Search by state | Search form includes a state dropdown that filters results by license state. | Selecting a state updates the result set immediately when search executed. | Dropdown is populated from `src/data/records.json`. |
| CVT-SRCH-04 | Search by ID | Search form allows exact certification ID entry. | ID search returns a single precise match when ID exists, or a helpful zero-result state when not. | Supports certificate lookup workflows. |
| CVT-STAT-01 | Status card display | Each matched record surfaces a status card showing Active / Expired / Suspended. | Status card changes color and icon based on status; includes last verified timestamp. | Cards are accessible (text + icon). |
| CVT-DISC-01 | Disciplinary banner | If a record has reportable discipline, a banner appears near the status card describing the action. | Banner only renders when discipline flag true, and links to incident details. | Banner includes reference to statement of reason. |
| CVT-VER-01 | Request verification letter | Staff can request a verification letter from a record detail view. | Clicking "Request verification" opens a modal summarizing document type and recipient; submission saves to audit log. | Modal enforces required contact fields. |
| CVT-MNT-01 | Maintenance banner | When maintenance mode is configured via `src/config/maintenance.json`, a persistent banner warns users and disables new verification requests. | Banner appears on all pages during maintenance; request controls become disabled with explanatory tooltip. | Maintenance status toggles automatically from config file. |
| CVT-AUD-01 | Audit logging | Search and verification actions emit audit entries that capture user, action, timestamp, and record ID. | Logs persist in local store and are visible on the staff audit page within seconds. | Logging includes synthetic staff identifier. |
| CVT-AUD-02 | Staff audit filters | Audit page filters logs by action (search, request), date range, and record type (search vs. verification). | Applying filters narrows visible entries; a "reset" control clears filters. | Filter controls have accessible labels. |
| CVT-RES-01 | Search summary metrics | Search results header summarizes counts by status (Active / Expired / Suspended) for the current query. | Summary updates with each query and handles empty result sets gracefully. | Helps staff evaluate certification mix. |
| CVT-HIST-01 | Last verified context | Each result includes a last verified timestamp and source (e.g., "NCCPA sync" or "Manual override"). | Timestamp shows relative time (e.g., "Verified 3 days ago") with tooltip for exact datetime. | Source dropdown is limited to pre-approved values. |

## Non-Functional Requirements
These requirements shape quality expectations beyond behavior.

| ID | Title | Description | Validation Metric |
| --- | --- | --- | --- |
| NFR-ACC-01 | Keyboard accessible form | Search form supports full keyboard navigation (tab order, Enter to submit, Escape to clear). | Manual accessibility check / Playwright test uses `press('Tab')` and `press('Enter')`. |
| NFR-ACC-02 | Semantic labels & roles | Inputs, buttons, and banners include descriptive ARIA labels or semantic tags. | Static audit (axe?/DevTools) + query selectors use `getByRole` in Playwright. |
| NFR-REL-01 | Clear empty/invalid states | Empty result displays and invalid input errors include helpful guidance. | Visual verification + Playwright assertions for `getByText`. |
| NFR-REL-02 | CI automation on every push | Playwright suites execute on GitHub Actions for every push/PR. | GH Actions workflow run status and Playwright report artifact. |
| NFR-TRC-01 | Traceability coverage | Every requirement links to manual and/or automated coverage and tracked defects. | RTM columns filled, spot-check of references. |
| NFR-MNT-01 | Observability for maintenance mode | Maintenance banner/config anomalies fire logging events and surface in CI checks. | Playwright smoke checks confirm banner, plus CI log entries when maintenance config toggles. |

All requirements (functional and non-functional) are referenced by ID in subsequent QA artifacts so Phase 1 exit criteria are satisfied.
