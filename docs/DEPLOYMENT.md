# Deployment (M24 — Staging Preparation)

> Status: Prototype staging/deployment preparation. This is NOT public
> production readiness; see Production Blockers below.

## Deployment Target

This document covers a **private-server / staging deployment** of the existing
Docker Compose architecture. No public DNS, firewall, or internet exposure is
configured here. Public production requires the blockers below to be resolved.

## Architecture

```
Internet / Browser
        ↓
Reverse Proxy / TLS   ← REQUIRED for public production (not part of this setup)
        ↓
Next.js (frontend:3000)
        ↓  /api/* rewrite (BACKEND_URL)
FastAPI (backend:8000)
        ↓
PostgreSQL (internal only, postgres:5432)
```

PostgreSQL is **never** published to the host (SEC-008). The frontend proxies
`/api/*` to the backend via `BACKEND_URL`.

## Environment Variables

Create `.env` from `.env.example` on the server. NEVER copy the local
development `.env` blindly, and never commit secrets.

| Variable | Required | Purpose |
|---|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | yes | PostgreSQL credentials |
| `DATABASE_URL` | yes | SQLAlchemy/Alembic connection string |
| `AUTH_SECRET_KEY` | yes | HMAC token signing key; **min 32 chars** (SEC-001); generate with `openssl rand -hex 32` |
| `AUTH_TOKEN_EXPIRY_MINUTES` | no | Session token lifetime (default 10080) |
| `BACKEND_URL` | no | Frontend→backend address (default `http://backend:8000` in Docker) |
| `FRONTEND_PORT` / `BACKEND_PORT` | no | Host ports (defaults 3000/8000) |

A staging template is provided at `.env.staging.example` (placeholders only).

## Basic Deployment Steps

```bash
# 1. On the private server: clone the repository
git clone <repo-url> && cd workspace

# 2. Create and fill the environment file (placeholders only in examples)
cp .env.example .env
#    → set POSTGRES_*, DATABASE_URL, and a strong AUTH_SECRET_KEY

# 3. Validate the compose file
docker compose config --quiet

# 4. Build and start
docker compose up -d --build

# 5. Apply database migrations
docker compose run --rm backend alembic upgrade head

# 6. Verify
curl -s http://localhost:3000/api/health      # {"status":"ok"}
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/id  # 200
```

## Backups

- The PostgreSQL data lives in the `postgres_data` volume.
- Backup: `docker compose exec postgres pg_dump -U <user> -d <db> -Fc > backup_$(date +%F).dump`
- Restore: `docker compose exec -T postgres pg_restore -U <user> -d <db> < backup.dump`
- Keep backups off the server (or at least outside the project directory).
- There is no automated backup job; schedule one before any real staging data
  is considered valuable.

## Rollback

- **Stop the deployment:** `docker compose down` (data volume is preserved).
- **Restore the previous version:** rebuild from the previous git tag/commit:
  `git checkout <previous-tag> && docker compose up -d --build`
- **Roll back a migration:** `docker compose run --rm backend alembic downgrade -1`
  (only if the previous version expects the older schema; check the release notes).
- **Restore the database:** restore the pg_dump backup from above.
- Test rollback on staging before relying on it.

## Monitoring / Logging

- Backend security events are logged to stdout (`app.security`, SEC-007).
- Container logs: `docker compose logs -f backend frontend`.
- No metrics/monitoring infrastructure exists yet (prototype scope).

## Health Checks

- `GET /api/health` returns `{"status":"ok"}` when the backend and database
  are reachable.
- PostgreSQL has a compose healthcheck (`pg_isready`).

## Production Blockers (M23 findings — NOT resolved by this document)

1. **TLS** (SEC-009): public deployment requires a reverse proxy terminating
   HTTPS; HSTS must be enabled only then.
2. **Session architecture** (SEC-002): bearer tokens in localStorage must
   migrate to HttpOnly cookies before production.
3. **Secrets** (SEC-016): production secrets must move to a proper secret
   manager; never a committed `.env`.
4. **Dependency vulnerabilities** (SEC-015): `make security-audit` findings
   (starlette, sharp) must be remediated deliberately.
5. **Reverse proxy** (SEC-012): a proxy should hide backend fingerprinting and
   add transport protection.
6. **Distributed rate limiting** (SEC-003): the in-memory limiter is
   single-instance only.
7. **Backups**: no automated backup job exists.

## Security Checks Before Any Public Launch

- TLS termination verified (HTTPS only)
- No public PostgreSQL
- No secrets in logs or source control
- Security headers present (SEC-004)
- Dependency audit clean or accepted with review
- Rate limiting effective
- Rollback + backup exercised on staging
