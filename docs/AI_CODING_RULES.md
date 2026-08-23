# AI Coding Rules

> Status: Adopted. These rules govern AI-assisted development in this repository.

## Global Rules

1. Work only on the requested milestone.
2. Read the repository and the source-of-truth documents before changing anything.
3. Modify an existing project; do not create a disconnected replacement project.
4. Do not redesign the architecture without explicit approval.
5. Do not implement future features merely because they exist in the long-term PRD.
6. Reuse existing components, tokens, utilities, API contracts, and localization infrastructure.
7. Do not add dependencies unless necessary; explain every new dependency.
8. Never hardcode secrets, passwords, API keys, tokens, or production credentials.
9. Preserve existing working behavior.
10. Do not silently change database schema; document every migration.
11. Keep Indonesian and English support consistent.
12. Demo assessments must never be presented as official certification examinations.
13. Check responsive behavior and accessibility basics for affected UI.
14. Run relevant lint, type-check, test, and build checks.
15. Do not claim something passed unless it was actually tested.
16. Report files changed, dependencies added, commands run, tests, known limitations, and recommended next milestone.
17. Do not start the next milestone automatically.
18. Prefer the smallest safe change that satisfies the milestone.

## Localization Rules

- Every user-facing string must be localizable.
- Indonesian and English are the two supported languages.
- Never hardcode a single language string in components or API responses that are
  user-facing.

## Database Rules

- Every schema change must be delivered as a documented migration.
- Do not silently alter the schema.

## Reporting

Every completed milestone ends with the standard final report format defined in the
milestone instructions.
