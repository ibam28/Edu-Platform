# Bilingual Programming Education, Certification & Talent Platform

Prototype v0.0.1 — bilingual (Indonesian / English) programming education
platform. M00–M24 implemented: content, auth, progress, admin, and deployment
preparation.

## Repository Structure

```
frontend/   Next.js + React + TypeScript + Tailwind CSS (ID/EN locales)
backend/    Python + FastAPI + SQLAlchemy + Alembic
docs/       Source-of-truth documentation (architecture, security, deployment)
```

## Currently Implemented

- Bilingual frontend (`/id`, `/en`) with language switcher: home, vision,
  learning path (Stage 0–4), Stage 0 lessons, demo assessments (Stage 1–4),
  contact, privacy, terms.
- Authentication: register/login/logout/me — PBKDF2 password hashing, HMAC
  session tokens, per-user token revocation, rate limiting, security logging.
- Student dashboard with progress summary.
- Admin area (ADMIN role): dashboard statistics, user list, course/lesson
  management, demo assessment management.
- Backend: `/api/health`, auth, progress, assessment attempts, admin APIs
  (migrated via Alembic, PostgreSQL).
- Docker Compose for `frontend`, `backend`, `postgres` (postgres internal-only).
- Security: secret validation, security headers/CSP, structured security logs,
  dependency audit commands (`make security-audit`).

## Quick Start (development)

```bash
cp .env.example .env          # fill AUTH_SECRET_KEY (min 32 chars)
docker compose up -d --build
docker compose run --rm backend alembic upgrade head
# frontend: http://localhost:3000  backend: http://localhost:8000
```

## Deployment

> **Deployment scope: private staging only.**
> This repository is a private staging deployment, not public production.
> It runs on plain HTTP, uses bearer tokens in `localStorage`, and stores
> secrets in a local `.env`. Do not expose this stack to the public internet.

For staging deployment, environment variables, backups, rollback, and the
full list of production blockers, see
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Production blockers — TLS,
HttpOnly cookie sessions, production secret manager, dependency
remediation, reverse proxy hardening — are enumerated there.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Security](docs/SECURITY.md)
- [API Specification](docs/API_SPECIFICATION.md)
- [Database Design](docs/DATABASE_DESIGN.md)
- [Roadmap](docs/ROADMAP.md)

## Requirements

- Docker with Docker Compose plugin (recommended)
- Node.js 20+ and npm (for running the frontend without Docker)
