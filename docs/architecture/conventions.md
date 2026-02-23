# Project Conventions

## Folder Structure
- `src/features/<feature>/...`: feature-specific components, state, schema, and adapters.
- `src/shared/...`: reusable non-feature-specific primitives/utilities.
- `src/app/...`: route composition only.

## Import Rules
- Prefer importing resume-editor internals from `src/features/resume-editor/*`.
- Use compatibility paths only when touching legacy modules:
  - `@/lib/schemas/resume`
  - `@/store/useResumeStore`

## Form/Schema Rules
- Use `ResumeValues` from the centralized resume schema module.
- Use `createEmptyResume()` for all reset/default scenarios.
- Keep local storage key references centralized via `RESUME_STORAGE_KEY`.

## PDF Rules
- Resolve template components only through the template registry.
- Keep template IDs stable and do not introduce behavioral branching in route pages.
