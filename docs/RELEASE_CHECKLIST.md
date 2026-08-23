# Release Checklist — Prototype v0.0.1

> Status: Release gate checklist for Bilingual Edu Platform **Prototype v0.0.1**
> (private staging / prototype scope). This is NOT a public production release.

## 1. Prototype Purpose

- [x] Visitor understands the product vision (home hero, vision page, journey).
- [x] Learning path Stage 0–4 is visible with honest status labels
      (Free / Demo / Coming Soon).
- [x] Demo assessments are clearly marked "Demo Assessment — Not a
      Certification Examination"; no certificate is ever issued.
- [x] Bilingual requirement: all learner-facing copy exists in ID and EN.

## 2. In-Scope Pages

- [x] Home (`/id`, `/en`) — redesigned landing page, original illustrations.
- [x] Learning Path (`/learning-path`)
- [x] Stage 0 lessons (`/learning-path/stage-0`, `/…/01`–`/…/08`)
- [x] Demo assessments (`/learning-path/assessment/1`–`/…/4`)
- [x] Vision (`/vision`)
- [x] Register (`/register`), Login (`/login`), Student Dashboard (`/dashboard`)
- [x] Admin: overview (`/admin`), users (`/admin/users`), courses
      (`/admin/courses`), assessments (`/admin/assessments`)
- [x] Contact (`/contact`), Privacy (`/privacy`), Terms (`/terms`)

## 3. Major User Flows

- [x] Register → login → dashboard shows authenticated user.
- [x] Mark lesson complete → progress persists (localStorage + API) and
      survives logout/login.
- [x] Logout revokes tokens server-side (SEC-005).
- [x] Demo assessment: answer → score → attempt recorded (demo only).
- [x] Admin: statistics, user list + search, course/lesson edit, question
      edit/create (ADMIN-only; student 403).
- [x] Language switch ID/EN preserves the current route.
- [x] Prototype notice and demo labels remain visible on every relevant page.

## 4. Authentication & Security

- [x] Password min 10 chars (client + server, SEC-006).
- [x] AUTH_SECRET_KEY min 32 chars, fail-fast startup (SEC-001).
- [x] Rate limiting on register/login (SEC-003) with documented IP-rotation
      limitation.
- [x] Security headers + CSP on all responses (SEC-004).
- [x] Token revocation (SEC-005); role claim removed (SEC-011).
- [x] Security event logging, no secrets in logs (SEC-007).
- [x] PostgreSQL not exposed to host (SEC-008).
- [x] `.env` ignored; placeholders only in examples (SEC-016).

## 5. Deployment / Staging

- [x] `docker compose config` valid.
- [x] Backend health `{"status":"ok"}`; database connectivity OK.
- [x] Migrations at head (`5a7b9c1d3e5f`), reproducible via alembic.
- [x] Deployment, backups, rollback documented (`docs/DEPLOYMENT.md`).

## 6. Excluded Features (must remain excluded)

- [ ] Payments — NOT implemented.
- [ ] Official certification issuance — NOT implemented (demo only).
- [ ] Recruitment / talent marketplace — NOT implemented.
- [ ] AI-assisted learning — NOT implemented.
- [ ] Code sandbox — NOT implemented.
- [ ] Microservices / Kubernetes / autoscaling — NOT implemented.
- [ ] Public production deployment — NOT performed; local HTTP only (SEC-009).

## 7. Known Limitations (explicit, not hidden)

- SEC-002: bearer tokens in localStorage (HttpOnly cookie migration deferred).
- SEC-005: same-second token revocation edge (iat granularity).
- SEC-009: local HTTP; TLS required before any public deployment.
- SEC-015: dependency advisories (starlette, sharp) tracked, not auto-patched.
- SEC-003: in-memory, per-IP rate limiting (single instance).
- Contact form is simulated (no backend persistence).
- Privacy/Terms are prototype drafts requiring legal review.
- Admin CMS edits DB content not yet consumed by public SSG lesson pages.

## 8. Release Decision

Release **Prototype v0.0.1** as a private staging/prototype artifact when all
acceptance criteria above pass. This is NOT a production, certified, or
accredited release.
