# Database Design

> Status: Syncs with the implemented prototype (M00–M23).

## Current State

- Engine: PostgreSQL (Docker, not exposed to the host).
- ORM: SQLAlchemy 2.x.
- Migrations: Alembic (head: `5a7b9c1d3e5f`).

## Implemented Tables

- `users` — id, email (unique), display_name (2–50 chars, required), password_hash (PBKDF2), role
  (guest/student/admin), is_active, `tokens_valid_after` (token revocation,
  SEC-005), created_at.
- `lesson_progress` — per-user Stage 0 lesson completion
  (unique user_id + lesson_id).
- `demo_assessments` — one demo assessment per stage (Stage 1–4), always
  marked demo/non-certification.
- `demo_assessment_questions` — bilingual multiple-choice questions with four
  bilingual options and a correct-option index.
- `demo_assessment_attempts` — submitted demo attempts (optional user link,
  score, total).
- `courses` — bilingual course metadata (slug unique, stage).
- `lessons` — bilingual lesson content (title, objective, explanation, example,
  mistakes, exercise; content fields as newline-separated text, not rich text).

## Connectivity

The backend opens a database session and performs a connectivity check against the
configured PostgreSQL instance on startup and via the health endpoint. The health
endpoint returns `{"status":"ok"}` when the service and database connection succeed.

## Migration Policy

- Every schema change must be introduced through an Alembic migration.
- Each migration must be committed with a clear, descriptive message.
- Migrations must be reversible where practical.

## Planned Entities (future)

The long-term product will require entities such as certificates and talent
profiles. These are **not** part of the prototype and must not be created yet.

## Running Migrations

```bash
docker compose run --rm backend alembic upgrade head
```
