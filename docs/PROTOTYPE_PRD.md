# Prototype PRD (v0.0.1)

> Status: Syncs with the implemented prototype (M00–M23).

## Scope of the Prototype

The prototype (v0.0.1) validates the foundational platform architecture:
bilingual learning content, authentication, learning progress, demo
assessments, and basic administration. It is **not** a feature-complete
product.

Out of scope for the prototype: payments, official certification issuance,
recruitment/talent marketplace, AI services, code sandbox, microservices,
Kubernetes.

## What the Prototype Provides (implemented)

- Repository structure: `frontend/`, `backend/`, `docs/`.
- Next.js + React + TypeScript + Tailwind CSS frontend, bilingual ID/EN with
  locale routes (`/id`, `/en`).
- Python + FastAPI backend with SQLAlchemy + Alembic migrations.
- PostgreSQL + Docker Compose (postgres not exposed to the host).
- Home, Vision, Learning Path (Stage 0–4 with locked stages), lesson pages
  (Stage 0, 8 lessons), demo assessments (Stage 1–4), Contact, Privacy,
  Terms pages.
- Authentication: register/login/logout with PBKDF2 password hashing, HMAC
  session tokens, per-user token revocation, rate limiting, security logging.
- Student dashboard with current course and progress summary.
- Admin dashboard with statistics; admin management for users, courses,
  lessons, and demo assessments (ADMIN role only).
- `.env.example`, `.gitignore`, and documentation skeletons kept in sync with
  the implementation.

## Target Users (future)

- Indonesian and English speaking learners.
- Employers seeking certified, verified talent.

## Bilingual Requirement

All learner-facing content must be available in both Indonesian and English. The
foundation must not bake in a single language assumption. See
[CONTENT_GUIDE.md](./CONTENT_GUIDE.md). Localization is enforced via typed
dictionaries and a locale-aware language switcher.

## Demo vs Official Certification

Demo assessments in the prototype must never be presented as official certification
examinations. All assessments carry a visible demo label, and demo results do not
issue certificates.

## Production Gaps (prototype limitations)

- HTTP locally; TLS required for production (SEC-009).
- Bearer tokens in localStorage; HttpOnly cookies recommended for production.
- In-memory rate limiting (single process).
- Legal pages (Privacy, Terms) are drafts requiring legal review.
- Security review findings tracked in docs/SECURITY.md; remaining M23 items
  are still open.
