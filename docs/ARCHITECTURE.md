# Architecture

> Status: Syncs with the implemented prototype (M00–M23).

## Current Architecture

Monorepo-style repository with three top-level directories:

```
frontend/   Next.js + React + TypeScript + Tailwind CSS
backend/    Python + FastAPI + SQLAlchemy + Alembic
docs/       Source-of-truth documentation
```

### Frontend

- Framework: Next.js (App Router), React 19, TypeScript, Tailwind CSS.
- Output: `standalone` (Docker); pages are statically generated (SSG) with
  `generateStaticParams` for the two locales.
- Routing: `app/[locale]/…` with `id` (default) and `en`. Localization lives in
  `lib/i18n/dictionaries.ts` (typed bilingual `Dictionary` per page feature) and
  `lib/i18n/index.ts` (`isLocale`, `getDictionary`).
- UI primitives: `components/ui/` (Container, Heading, Text, Alert, Badge, Card,
  Button, Input, Textarea, Spinner, EmptyState, CodeBlock, cn).
- Client-side data: auth forms (`components/auth/`), student dashboard
  (`components/dashboard/`), admin pages (`components/admin/`), lesson progress
  (`components/lesson/`), demo assessments (`components/assessment/`), contact
  form (`components/contact/`).
- Auth session: bearer token kept in localStorage (`lib/auth/session.ts`).
  Known prototype limitation: not an HttpOnly cookie (SEC-002 remains open).

### Backend

- Framework: FastAPI, prefix `/api`.
- ORM: SQLAlchemy 2.x; migrations: Alembic; database: PostgreSQL.
- Routers:
  - `/api/health` — connectivity check.
  - `/api/auth` — register, login, logout, me (PBKDF2 hashing, HMAC-SHA256
    signed tokens with `sub`/`role`/`iat`/`exp`, per-user `tokens_valid_after`
    revocation, rate limiting, security logging).
  - `/api/progress` — Stage 0 lesson completion per user.
  - `/api/assessments/attempts` — demo assessment attempt recording (optional auth).
  - `/api/admin/*` — ADMIN-only: overview stats, user list, course CRUD, lesson
    read/edit, demo assessment/question management.
- Security layer: `app/core/security.py` (hashing/tokens), `ratelimit.py`
  (in-memory throttling), `security_log.py` (structured events), config
  validation for `AUTH_SECRET_KEY` (min 32 chars, fail-fast).

### Data Flow

```
Browser -> Next.js -> /api/* (rewrite) -> FastAPI -> PostgreSQL
```

The Next.js rewrite (`frontend/next.config.ts`) proxies `/api/:path*` to the
backend using `BACKEND_URL` (Docker: `http://backend:8000`). There is no
server-side session store; tokens are stateless and verified by the backend.

CORS (SEC-014): none is configured — by design. The browser only ever talks to
the frontend origin (same-origin `/api/*` fetches proxied by Next.js); there is
no direct browser-to-backend cross-origin dependency.

## Deployment / Runtime

- Docker Compose orchestrates `frontend`, `backend`, and `postgres` services.
- PostgreSQL is NOT published to the host (SEC-008); it is reachable only on
  the internal Docker network at `postgres:5432`. Temporary host inspection:
  `docker compose exec postgres psql -U postgres -d bilingual_edu`.
- Local development uses HTTP; production requires TLS termination (see
  SECURITY.md, SEC-009).

## Future Architecture (NOT implemented)

Microservices, Kubernetes, code sandbox, AI services, payments, and recruitment
infrastructure are explicitly out of scope for the prototype and are not described
in detail here.

## Diagrams

Architecture diagrams will be added here as components are implemented.
