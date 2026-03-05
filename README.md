# VersaDocs

VersaDocs is a Next.js App Router project for building resumes and biodata documents with live PDF preview and PDF export.

Members:
Dheyn Michael Orlanda
Jaypee Javier
Matthew Dee
Victor De Mesa Jr.

## Overview

- Live editor for structured resume/biodata data with immediate visual preview.
- Multiple templates with a single shared schema (`formal`, `biodata`).
- Client-side PDF generation using React PDF.
- Authenticated workspace with a dashboard (mocked data until persistence is wired).

## Current Functionality

- Landing page at `/` with product messaging and navigation.
- Auth via Clerk (`/sign-in`, `/sign-up`) with protected routes enforced in middleware.
- Resume editor at `/editor`:
  - Live form editing (React Hook Form + Zod).
  - Dynamic sections: personal info, experience, skills, education, projects, biodata fields, character references.
  - Template switcher (`formal` and `biodata`).
  - Live PDF preview using `@react-pdf/renderer`.
  - PDF download with dynamic filename.
  - Local autosave to `localStorage` (`versadocs-resume-data`) with debounced writes.
- Dashboard at `/dashboard` for authenticated users (currently uses mock resume cards).
- Clerk webhook endpoint at `/api/webhooks/clerk` with Svix signature verification and event handling for `user.created` and `user.deleted` (currently logs/simulates persistence).

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Clerk authentication
- React Hook Form + Zod validation
- Zustand state management
- React PDF renderer
- Tailwind CSS v4 + Radix UI primitives

## Project Structure

- `src/app`: Route entry points and API routes.
- `src/features/resume-editor`: Resume domain schema, state, PDF template registry, editor workspace.
- `src/features/auth`: Public-route matcher and webhook verification/handlers.
- `src/components`: Form sections, preview/download UI, layout UI components.
- `src/templates`: PDF templates (`formal-template.tsx`, `biodata-template.tsx`).
- `docs/architecture`: Project conventions and refactor guardrails.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` and set Clerk environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editor
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/editor
CLERK_WEBHOOK_SECRET=... # required for validating /api/webhooks/clerk
```

3. Run the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Development Commands

- `npm run dev`: Start local dev server.
- `npm run build`: Production build.
- `npm run start`: Run production server.
- `npm run lint`: Run ESLint.

## Route Map

- Public:
  - `/`
  - `/sign-in`
  - `/sign-up`
  - `/api/webhooks/clerk`
- Protected (requires Clerk session):
  - `/editor`
  - `/dashboard`

## Documentation

- Architecture conventions and guardrails: `docs/architecture/conventions.md`
- Planned refactors and stability contracts: `docs/architecture/refactor-plan.md`

### Resume Domain Model

- Source of truth: `src/features/resume-editor/schema/resume.ts`
- Defaults must come from `createEmptyResume()`.
- Template IDs are stable and currently limited to `formal` and `biodata`.
- Persisted local storage key is `versadocs-resume-data`.

### Template Rendering

- PDF templates live in `src/templates`.
- HTML preview templates live in `src/templates/html`.
- Template resolution is centralized:
  - PDF: `src/features/resume-editor/pdf/template-registry.tsx`
  - HTML: `src/features/resume-editor/html/template-registry.tsx`

### Editor Flow

- Form state is driven by React Hook Form + Zod (`useResumeForm`).
- Preview is rendered from the current in-memory resume state.
- PDF generation uses `ResumeDownloadButton` and the PDF registry.
- Autosave uses a debounced local storage write keyed by `RESUME_STORAGE_KEY`.

### Auth and Webhooks

- Clerk auth routes: `/sign-in`, `/sign-up`.
- Webhook endpoint: `/api/webhooks/clerk`.
- Current webhook handlers validate signatures and log actions; they do not persist to a database yet.

## Current Gaps / In Progress

- Dashboard data is mock data; no persistent resume storage is wired yet.
- Webhook handlers verify and parse events but only log actions (no DB write).
- Landing page links to `/examples`, and navbar links to `/templates` and `/Pricing`; these routes are not present in `src/app` yet.

## Contribution Notes

- Keep template IDs stable and avoid behavioral branching in route pages.
- Add all new resume defaults via `createEmptyResume()` only.
- Resolve template components only through the template registries.
