# API Specification

> Status: Health, authentication, progress, assessment attempts, and admin
> endpoints are implemented (M11–M17).

## Conventions

- Base path for versioned API: `/api`.
- Response format: JSON.
- Errors follow standard HTTP status codes.
- Authentication: stateless HMAC-signed session token sent as
  `Authorization: Bearer <token>`.

## Implemented Endpoints

### GET `/api/health`

Health / liveness check for the backend service.

**Success response** (HTTP 200):

```json
{
  "status": "ok"
}
```

### POST `/api/auth/register`

Creates a new learner account. Implemented in M11. Passwords are hashed
(PBKDF2-HMAC-SHA256) and never stored or logged in plaintext.

**Request body:**

```json
{
  "display_name": "Rifav47551",
  "email": "learner@example.com",
  "password": "secret1"
}
```

`display_name` is required: 2–50 characters after trimming whitespace.

**Success response** (HTTP 201):

```json
{
  "email": "learner@example.com",
  "display_name": "Rifav47551",
  "role": "student"
}
```

**Error responses:**

- `422` — validation failure (invalid email format, password shorter than 10 chars (SEC-006), missing/short/oversized display name).
- `409` — email already registered.
- `429` — too many registration attempts from this IP (rate limited, SEC-003).
- `5xx` — server error.

### POST `/api/auth/login`

Authenticates an existing learner account. Implemented in M11. Error responses are
deliberately generic to avoid user enumeration. Rate limited (SEC-003): max 10
attempts per 15 minutes per IP and 5 attempts per 15 minutes per email; excess
requests return `429`.

**Request body:**

```json
{
  "email": "learner@example.com",
  "password": "secret1"
}
```

**Success response** (HTTP 200):

```json
{
  "access_token": "<signed-session-token>",
  "token_type": "bearer",
  "email": "learner@example.com",
  "role": "student"
}
```

**Error responses:**

- `401` — invalid credentials (generic; same response for unknown email and wrong password).
- `422` — validation failure.
- `429` — too many login attempts from this IP (rate limited, SEC-003).

### POST `/api/auth/logout`

Revokes the presented token (SEC-005): when a Bearer token is supplied, the
user's `tokens_valid_after` is moved to now, so every token issued before that
moment is rejected (HTTP 401 on subsequent use). Clients that call logout
without a token simply discard it locally.

**Success response** (HTTP 200):

```json
{
  "status": "ok"
}
```

### GET `/api/auth/me`

Returns the current authenticated user (Bearer token required).

**Success response** (HTTP 200):

```json
{
  "email": "learner@example.com",
  "display_name": "Rifav47551",
  "role": "student",
  "created_at": "2026-01-15T10:30:00+00:00"
}
```

`created_at` (ISO-8601) is the account creation timestamp, used for
"member since" display.

**Errors:** `401` when missing, malformed, tampered, or expired token.

### PATCH `/api/auth/me`

Updates the current user's profile. Only `display_name` is editable; role,
`is_active`, `created_at`, email, and user id can never be modified through
this endpoint.

**Request body:**

```json
{
  "display_name": "Rifav"
}
```

**Success response** (HTTP 200):

```json
{
  "id": 42,
  "email": "learner@example.com",
  "display_name": "Rifav",
  "role": "student",
  "is_active": true,
  "created_at": "2026-01-15T10:30:00+00:00"
}
```

**Errors:** `401` unauthenticated; `422` empty/too short/oversized display name.

### GET `/api/admin/overview`

ADMIN-only endpoint with basic prototype statistics (M14).

**Success response** (HTTP 200):

```json
{
  "status": "ok",
  "role": "admin",
  "users": 12,
  "stage0_participants": 4,
  "assessment_attempts": 7
}
```

**Errors:** `401` unauthenticated, `403` authenticated but not ADMIN.

### POST `/api/assessments/attempts`

Records a submitted demo assessment attempt (M14). Authentication is optional:
guests may submit attempts too. Attempts are practice records only — never
certification results.

**Request body:**

```json
{
  "stage": "stage_1",
  "score": 4,
  "total": 5
}
```

**Success response** (HTTP 201):

```json
{
  "status": "recorded"
}
```

> Demo integrity (SEC-013): the score is **client-submitted** and is only valid
> for DEMO practice purposes. Attempts never become certification records, no
> certificate is ever issued from demo endpoints, and every assessment stays
> `is_demo: true` with the demo label. Admin metrics count "assessment
> attempts" — never certifications.

**Errors:** `422` when `stage` is not one of `stage_1`..`stage_4`, `score` is
negative, `total` is not positive, or `score` exceeds `total`.

### GET `/api/progress` · POST `/api/progress` · DELETE `/api/progress/{lesson_id}`

Learner Stage 0 lesson completion (M13). Requires Bearer token. GET returns
`{"lesson_ids": ["01", "03"]}`; POST marks a lesson complete (idempotent, 201);
DELETE removes it (idempotent, 200). `lesson_id` must match `\d{2}`.

### GET `/api/admin/users`

ADMIN-only user list (M15). Optional `?q=` email search.
Returns `{"users": [{"id", "email", "role", "is_active", "created_at"}]}`.
Errors: `401` unauthenticated, `403` non-admin.

### GET/POST `/api/admin/courses` · GET/PATCH `/api/admin/courses/{id}`

ADMIN-only course management (M16). POST creates a course (slug unique, 409 on
duplicate); PATCH updates bilingual title/description.

### GET `/api/admin/lessons/{id}` · PATCH `/api/admin/lessons/{id}`

ADMIN-only lesson read/edit (M16). PATCH accepts any subset of the bilingual
content fields (`title_id`, `title_en`, `objective_id`, ..., `exercise_hint_en`).

### GET `/api/admin/assessments` · GET `/api/admin/assessments/{id}` · POST `/api/admin/assessments/{id}/questions` · PATCH `/api/admin/questions/{id}`

ADMIN-only demo assessment management (M17). All assessments remain marked
`is_demo: true` with the demo label; no certification workflow exists.

## Future Endpoints

Courses, lessons, assessments, certification, and recruitment endpoints are planned
but **not** implemented.

## Authentication notes (M11)

- Token format: `payload.signature` (base64url JSON payload + HMAC-SHA256 over the
  secret in `AUTH_SECRET_KEY`, with `iat`/`exp` claims).
- Token payload carries only `sub`/`iat`/`exp` (SEC-011): the role claim was
  removed; authorization always uses the database role, never the token.
- Token lifetime: `AUTH_TOKEN_EXPIRY_MINUTES` (default 10080 = 7 days).
- Logout revokes tokens server-side via per-user `tokens_valid_after` (SEC-005).
- Roles: `guest` (unauthenticated), `student` (default on registration), `admin`.
