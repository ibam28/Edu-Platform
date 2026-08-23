# Security

> Status: Syncs with the implemented prototype (M00–M23).

## Baseline Principles

1. Never commit secrets, passwords, API keys, tokens, or production credentials.
2. Use `.env` for local secrets and `.env.example` for documented placeholders.
3. Container images must not bake secrets into layers.
4. Assume the deployment must be network-hardened before production.

## Current Controls (implemented)

### Authentication

- Registration, login, logout, and `/api/auth/me` with role-based access
  (GUEST / STUDENT / ADMIN).
- Passwords stored as PBKDF2-HMAC-SHA256 hashes (600k iterations, random
  16-byte salt); never stored in plaintext; never logged.
- Minimum password length: 10 characters (client and server enforced, SEC-006).
- Session tokens: stateless HMAC-SHA256-signed payloads
  (`payload_b64.signature_b64`) with `sub`/`role`/`iat`/`exp` claims. No
  server-side session store.
- Token revocation (SEC-005): logout sets a per-user `tokens_valid_after`
  timestamp; tokens issued before it are rejected. Known limitation: a token
  minted in the exact same second as the logout call remains valid (iat has
  1-second granularity).
- `AUTH_SECRET_KEY` validated at startup: minimum 32 characters, fail-fast on
  missing/short secrets (SEC-001).

### Brute-Force Protection

- In-memory rate limiting (SEC-003): register max 5 requests / 15 min / IP;
  login max 10 / 15 min / IP plus 5 / 15 min / email. Excess requests return
  429 with no internal details. Limitation: per-process state (no distributed
  limiter).
- **Known limitation (SEC-003):** the limiter is IP-based, so a request that
  arrives from a different source IP gets a fresh bucket. VPNs, proxies, or IP
  rotation can reduce effectiveness for per-IP buckets. This is acceptable for
  the single-instance prototype; production and multi-instance deployments
  require a shared/distributed strategy and possibly account/device-aware
  controls. Rate limiting reduces brute-force exposure; it does not and cannot
  claim to prevent all brute-force attempts.
- **Per-IP vs per-email keying (login):** login uses **two independent
  buckets** — one keyed by the source IP (`ip:{request.client.host}`) and one
  keyed by the submitted email (`email:{payload.email}`), after lower-casing
  and trimming. The per-email bucket continues to throttle attempts against
  the **same account** even when the attacker rotates source IPs. An attacker
  who rotates IP for a single account still hits the 5-per-15-minutes
  email-keyed limit. The per-email bucket does **not** throttle attempts
  against **different accounts** from the same IP; the per-IP bucket does.
  A determined attacker with many accounts AND IP rotation could still evade
  the combined throttling by distributing attempts across both axes — that
  scenario is outside the prototype's threat model.
- **Source-IP extraction does not trust proxy headers.** `_client_ip()`
  reads `request.client.host` only (the direct TCP peer). The prototype is
  configured for direct HTTP; deploying behind a reverse proxy that sets
  `X-Forwarded-For` would require explicit configuration to honor that
  header (not currently implemented). Misconfiguration in either direction
  would either reduce throttling (if proxy headers are silently ignored) or
  let an attacker set their own apparent IP (if blindly trusted).
- **Scope of protection.** Rate limiting reduces brute-force risk; it does
  not constitute authentication. Combined with strong password hashing
  (PBKDF2-HMAC-SHA256, 600k iterations) and the stateless token design,
  it raises the cost of credential-stuffing attacks against a small set of
  accounts but does not eliminate them. The prototype accepts this trade-off;
  production deployments should consider WAF / bot-detection / account-aware
  controls in addition to this in-process limiter.

### Transport & Headers

- Security headers on every response via `frontend/next.config.ts` (SEC-004):
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and a baseline
  Content-Security-Policy (self-hosted scripts/styles, same-origin API, no
  external domains, `frame-ancestors 'none'`).
- Local development uses plain HTTP; HSTS is intentionally not set.
  Production REQUIRES TLS termination (SEC-009 section below).

### Infrastructure

- PostgreSQL is not published to the host (SEC-008); reachable only inside the
  Docker network at `postgres:5432`. Temporary host inspection:
  `docker compose exec postgres psql -U postgres -d bilingual_edu`.

### Secret Hygiene (SEC-016)

Verified control (no code change required): `.env` is git-ignored (`.env.*`
ignored, `.env.example` kept); both `backend/.dockerignore` and
`frontend/.dockerignore` exclude `.env`; no real secrets are tracked; all
committed `.env.example` files contain placeholders only; no secrets appear in
application logs.

### Logging

- Structured security events (SEC-007) via the standard library `logging`
  (`app.security`): register/login success & failure, token rejection,
  authorization denial, logout/revocation, admin writes. Sensitive values
  (passwords, hashes, tokens, secrets) are never logged; only safe context
  such as user id, normalized email, route, and result.

## Transport Security / TLS (SEC-009)

- **Local development uses plain HTTP** by design: the Docker stack runs on
  `http://localhost:3000` and `http://localhost:8000`. No application
  configuration claims that HTTP is secure for production.
- **Production/public deployment REQUIRES TLS termination** (reverse proxy or
  load balancer terminating HTTPS in front of the Next.js frontend). The
  application must not be served over plain HTTP in production.
- **HSTS is intentionally NOT enabled for local HTTP.** When HTTPS is deployed,
  enable `Strict-Transport-Security` (the frontend already carries
  `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and a baseline
  CSP from `frontend/next.config.ts`).
- All security recommendations (cookies, tokens, headers) assume HTTPS in
  production. Session tokens are bearer tokens; over plain HTTP they could be
  read by an on-path attacker, which is another reason TLS is mandatory in
  production.
- M24 (deployment) is expected to add the reverse proxy/TLS layer cleanly; the
  current configuration was kept proxy-friendly (frontend `headers()` config,
  no hardcoded proxy assumptions).

## Known Limitations / Production Gaps

This section is the prototype's authoritative list of **documented limitations**
(accepted for the prototype stage) and **tracked future hardening** items
(must be closed before public production). Items are categorized so that
"open" is never confused with "broken".

### Documented prototype limitations (accepted; not current failures)

- Bearer tokens stored in localStorage (XSS-exposed). SEC-002: tracked for
  future migration to HttpOnly cookies — not a current application defect.
- Rate limiting is per-process. SEC-003: per-process state is intentional
  for single-instance deployment; documented in the rate-limit module.
- Same-second token revocation edge (SEC-005): tokens minted in the exact
  same second as logout remain valid (1-second `iat` granularity). Documented
  in source code; acceptable for normal user flows.

### Tracked future production hardening (must be fixed before public deployment)

- SEC-002: HttpOnly cookie session migration (currently deferred).
- SEC-009: TLS reverse proxy + HSTS (currently local HTTP only).
- SEC-012: Production reverse-proxy fingerprint hardening.
- SEC-016: Production secret manager (current `.env` is local-dev only).
- SEC-015: Dependency vulnerability remediation (deferred until deployment plan
  is in place — see SEC-015 section below for current state).
- SEC-003: Distributed rate limiter (Redis) for multi-instance scale.

### Out-of-scope for the prototype (never implemented, by design)

- Contact form is a simulation (no backend persistence).
- Privacy/Terms pages are prototype drafts requiring legal review before any
  public production use.

### Status of M23 findings

Every M23 finding has been audited at least once. Their statuses are recorded
in the per-finding security scorecard:

| Status | Count |
|---|---|
| PASS | 11 |
| PASS WITH LIMITATION | 5 |
| NOT APPLICABLE | 1 |
| PARTIAL | 0 |
| FAIL | 0 |

None of the M23 findings are "still open" as in "unaddressed failure". The
five "PASS WITH LIMITATION" entries (SEC-002, -005, -009, -015, -017) are
either documented prototype limitations or deferred hardening items, never
unknown or unimplemented security controls.

## Dependency Audits (SEC-015)

A **manual** dependency audit process exists and is CI-ready. An **automated**
CI scan (e.g. Dependabot, scheduled `make security-audit` on every PR) is
**not yet wired** — that step is a tracked M24 hardening item.

The audit commands run today:

```bash
make security-audit
```

- Backend: `pip-audit -r requirements.txt` (tool installed transiently in a
  throwaway container; never baked into the image).
- Frontend: `npm audit --omit=dev` (production dependencies only).
- No automatic package upgrades are performed by this process; review findings
  and upgrade deliberately.

**Known vulnerabilities** (as of the last audit run): starlette (via fastapi) has
several CVEs; sharp (via next/image) has 3 high. These are not patched
automatically — upgrade deliberately when the next dependency version is
vetted. The audit commands above produce the current list.

## Future Controls

- HttpOnly cookie sessions / refresh tokens.
- Dependency scanning and CI security checks.
- Secrets management for production deployments.
- Distributed rate limiting if the platform is horizontally scaled.

## Reporting

Security issues must be reported rather than silently fixed.
