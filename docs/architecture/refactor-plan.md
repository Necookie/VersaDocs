# VersaDocs Refactor Guardrails

## Goals
- Improve maintainability and scalability with feature-first modules.
- Preserve external behavior (routes, UI copy, interactions, and output contracts).

## Invariants
- Keep local storage key as `versadocs-resume-data`.
- Keep route shape unchanged, including Clerk webhook endpoint path.
- Keep template IDs and switching behavior unchanged (`formal`, `biodata`).
- Keep top-level resume payload shape consumed by preview/download unchanged.

## Active Architecture Decisions
- Resume domain model is centralized in `src/features/resume-editor/schema/resume.ts`.
- Resume defaults must come from `createEmptyResume()` only.
- Template resolution must happen through `src/features/resume-editor/pdf/template-registry.tsx`.
- Page files under `src/app` should be composition roots, not orchestration-heavy modules.

## Migration Notes
- Legacy compatibility re-exports are retained in:
  - `src/lib/schemas/resume.ts`
  - `src/store/useResumeStore.ts`
- New code should import from feature modules directly where possible.

## Deferred Work
- Add runtime contract tests for webhook response/status combinations.
- Add integration tests for editor hydration, debounce persistence, and template switching.
- Replace deprecated Next.js `middleware` convention with `proxy` when project upgrades policy.
