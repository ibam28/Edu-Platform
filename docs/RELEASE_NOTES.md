# Release Notes — Prototype v0.0.1

> LearnCode — Prototype v0.0.1 (private staging / prototype scope).
> This is NOT a public production, certified, or accredited release.

## What This Release Is

A programming learning platform prototype that validates the foundational
architecture: guided lessons, learning progress, demo assessments, learner
and admin dashboards, and content management — built on a
security-hardened stack (M00–M25). The platform is available in
Indonesian and English.

## Features (implemented)

- **Language support (ID/EN)** — locale routing, typed dictionaries, language
  switcher, home, learning path, lessons, assessments, contact, legal pages.
- **Homepage** — professional landing page with original illustration system
  (hero, stages, journey, capabilities, decorative patterns).
- **Learning path** — Stage 0–4 preview with honest status labels; Stage 0
  contains 8 Python lessons (3 with full seed content).
- **Demo assessments** — bilingual multiple-choice quizzes per stage, always
  marked "Demo Assessment — Not a Certification Examination".
- **Authentication** — register/login/logout/me; PBKDF2 password hashing;
  HMAC-signed session tokens; per-user token revocation; rate limiting;
  password policy (min 10 chars).
- **Student dashboard** — current course, progress summary (local + server),
  continue-learning CTA, guest/unauthorized states.
- **Progress system** — Stage 0 lesson completion persisted per user
  (localStorage + `/api/progress`).
- **Admin area** — dashboard statistics, user list with search, course/lesson
  bilingual CMS, demo assessment/question management (ADMIN role only).
- **Security controls** — secret validation (SEC-001), rate limiting
  (SEC-003), security headers + CSP (SEC-004), token revocation (SEC-005),
  security logging (SEC-007), PostgreSQL internal-only (SEC-008), dependency
  audit commands (SEC-015), secret hygiene (SEC-016).
- **Deployment preparation** — Docker Compose stack, documented staging
  deployment, backups, and rollback (M24).

## Known Limitations (explicit)

- SEC-002: session tokens stored in localStorage (HttpOnly cookie migration is
  a separate architectural decision).
- SEC-005: a token minted in the exact same second as logout remains valid
  (1-second `iat` granularity).
- SEC-009: runs on local HTTP; TLS termination is required before any public
  deployment.
- SEC-003: rate limiting is in-memory and per-IP (single instance; VPN/proxy/IP
  rotation can create fresh buckets).
- SEC-015: dependency advisories exist (starlette via fastapi, sharp via
  next/image); tracked and auditable via `make security-audit`, not
  auto-patched.
- Contact form is a simulation (no server-side persistence).
- Privacy and Terms pages are prototype drafts requiring legal review.
- Public lesson pages are dictionary-driven (SSG); the admin CMS edits
  database content not yet consumed by those pages.
- No automated backups, monitoring, or metrics infrastructure.

## Intentionally Not Implemented

- Payments, official certification issuance, recruitment/talent marketplace,
  AI-assisted learning, code sandbox, microservices, Kubernetes.
- Public production deployment (not performed; private staging scope only).

## Next Phase

**Validation, not automatic feature expansion.** The next phase focuses on
concept validation with real users using this prototype, collecting feedback,
and then deciding which features to fund/build in a commercial MVP. No
feature expansion is scheduled automatically.
