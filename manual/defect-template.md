# Manual Defect Template
Use this template consistently when filing issues uncovered during manual execution. Place any supporting screenshots or GIFs under `defects/screenshots/` and link the relative path.

| Field | Description |
| --- | --- |
| **Defect ID** | Assign a unique identifier (e.g., `MAN-DEF-001`). Match the naming scheme in the RTM if applicable. |
| **Title** | `[Defect] <requirement ID> - short summary` (per `defects/README.md`). |
| **Environment** | Browser, viewport, OS, app build (`npm run dev` or built artifact), and whether maintenance mode was toggled. |
| **Steps to reproduce** | Step-by-step actions taken in the manual suite; include data values and focus order when relevant. |
| **Expected result** | What should happen according to the requirement, manual test step, or accessibility standard. |
| **Actual result** | What was observed instead; capture timing, error text, disabled controls, etc. |
| **Severity** | `Critical`, `Major`, or `Minor`. No open `Critical`/`Sev 1` by policy. |
| **Priority** | How soon the issue should be addressed (e.g., `High`, `Medium`, `Low`). |
| **Requirement ID** | Reference from `qa/requirements.md` (e.g., `CVT-DISC-01`). |
| **Screenshot/GIF** | Provide a relative path under `defects/screenshots/` (e.g., `defects/screenshots/man-disc-01.png`). |
| **Fix PR** | Link to the pull request that resolves the defect once available. |
| **Retest status** | `Not run`, `Pass`, `Fail`, or `Blocked` (update after verification). |
| **Release criteria** | Cite the relevant exit condition (e.g., "Phase 4 release criteria: smoke 100% pass"). |

> Keep this template near the front of your defect description so reviewers and stakeholders see the coverage and gating context immediately.
