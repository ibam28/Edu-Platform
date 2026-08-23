"""Structured security event logging (SEC-007).

Lightweight prototype logging through the Python standard logging facility.
Events are emitted as key=value lines with a stable event name. Sensitive
values (passwords, hashes, tokens, secrets) are NEVER logged here; only safe
context such as user id, normalized email, route, and result.
"""

import logging

logger = logging.getLogger("app.security")


def log_security(
    event: str,
    *,
    user_id: int | None = None,
    email: str | None = None,
    route: str | None = None,
    result: str | None = None,
    detail: str | None = None,
) -> None:
    """Emit one structured security event."""
    fields = [f"event={event}"]
    if user_id is not None:
        fields.append(f"user_id={user_id}")
    if email is not None:
        fields.append(f"email={email}")
    if route is not None:
        fields.append(f"route={route}")
    if result is not None:
        fields.append(f"result={result}")
    if detail is not None:
        fields.append(f"detail={detail}")
    logger.info(" ".join(fields))
