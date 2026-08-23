# Frontend (Next.js)

The frontend for the Bilingual Programming Education, Certification & Talent Platform.

- Framework: Next.js (React + TypeScript)
- Styling: Tailwind CSS
- Port: 3000 (default)

## Currently Implemented

- Global application shell: responsive header, footer, and main layout (M02).
- Placeholder route structure for public pages: home, learning path, vision,
  login, register, contact, privacy, terms.
- ID/EN locale foundation using a `/id` and `/en` URL strategy with a language
  switcher (default locale: Indonesian).
- Minimal placeholder page confirming the frontend starts and builds.
- No page-specific business content yet (home page, auth, dashboards, etc. are
  planned in later milestones).

## Commands

```bash
npm install     # install dependencies
npm run dev     # development server on http://localhost:3000
npm run lint    # ESLint
npm run build   # type-check + production build
npm run start   # serve production build
```

## Environment

Copy `.env.example` to `.env` and adjust values.

## Architecture Notes

The frontend will call the backend through `/api/*` (via reverse proxy) once API
integration is implemented. No API integration exists in M00.
