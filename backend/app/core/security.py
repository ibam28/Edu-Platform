"""Password hashing and stateless session tokens (M11).

Password storage: PBKDF2-HMAC-SHA256 with a per-user random salt
(no plaintext passwords ever stored). Session tokens: HMAC-SHA256 signed
payloads with an expiry claim (no server-side session store).
"""

import base64
import hashlib
import hmac
import json
import re
import secrets
import time

PBKDF2_ITERATIONS = 600_000
SALT_BYTES = 16
PASSWORD_HASH_PREFIX = "pbkdf2_sha256"


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii")


def _unb64(value: str) -> bytes:
    """Strict base64url decode.

    Python 3.11's decoder silently ignores invalid characters, so the input is
    validated against the base64url alphabet first. Rejects tampered tokens.
    """
    if not re.match(r"^[A-Za-z0-9_-]+=*$", value):
        raise ValueError("invalid base64url characters")
    padded = value + "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(padded.encode("ascii"))


def hash_password(password: str) -> str:
    """Hash a password with PBKDF2-HMAC-SHA256 and a random salt."""
    salt = secrets.token_bytes(SALT_BYTES)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS
    )
    return (
        f"{PASSWORD_HASH_PREFIX}${PBKDF2_ITERATIONS}${_b64(salt)}${_b64(digest)}"
    )


def verify_password(password: str, stored: str) -> bool:
    """Verify a password against a stored hash; returns False on any malformed input."""
    try:
        prefix, iterations_str, salt_b64, hash_b64 = stored.split("$")
        if prefix != PASSWORD_HASH_PREFIX:
            return False
        iterations = int(iterations_str)
        salt = _unb64(salt_b64)
        expected = _unb64(hash_b64)
    except (ValueError, TypeError):
        return False
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, iterations
    )
    return hmac.compare_digest(digest, expected)


def create_session_token(
    user_id: int, secret: str, expires_in_minutes: int
) -> str:
    """Create a signed session token with an expiry claim.

    The token carries only sub/iat/exp (SEC-011): the role claim was removed
    because authorization always uses the database role, never the token.
    """
    now = int(time.time())
    payload = {
        "sub": user_id,
        "iat": now,
        "exp": now + expires_in_minutes * 60,
    }
    payload_b64 = _b64(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signature = hmac.new(
        secret.encode("utf-8"), payload_b64.encode("ascii"), hashlib.sha256
    ).digest()
    return f"{payload_b64}.{_b64(signature)}"


def verify_session_token(token: str, secret: str) -> dict | None:
    """Verify a session token; returns the payload or None when invalid/expired."""
    try:
        payload_b64, signature_b64 = token.split(".")
        expected = hmac.new(
            secret.encode("utf-8"), payload_b64.encode("ascii"), hashlib.sha256
        ).digest()
        if not hmac.compare_digest(_unb64(signature_b64), expected):
            return None
        payload = json.loads(_unb64(payload_b64))
    except (ValueError, TypeError, json.JSONDecodeError):
        return None
    if not isinstance(payload, dict):
        return None
    if not isinstance(payload.get("sub"), int):
        return None
    if payload.get("exp", 0) < time.time():
        return None
    return payload
