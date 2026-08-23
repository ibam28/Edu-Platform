"""Authentication and role dependencies for protected routes (M11; SEC-005/SEC-007)."""

from datetime import datetime, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import verify_session_token
from app.core.security_log import log_security
from app.db.session import get_db
from app.models import User, UserRole

bearer_scheme = HTTPBearer(auto_error=False)


def _token_revoked(payload: dict, user: User | None) -> bool:
    """True when the user has a revocation point newer than the token iat."""
    if user is None or user.tokens_valid_after is None:
        return False
    issued_at = float(payload.get("iat", 0))
    valid_after = user.tokens_valid_after
    if valid_after.tzinfo is None:
        valid_after = valid_after.replace(tzinfo=timezone.utc)
    return issued_at < valid_after.timestamp()


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve the authenticated user from the Bearer token."""
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    settings = get_settings()
    payload = verify_session_token(credentials.credentials, settings.auth_secret_key)
    if payload is None:
        log_security("token.rejected", route="auth", result="invalid")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = db.get(User, payload["sub"])
    if user is None or not user.is_active or _token_revoked(payload, user):
        log_security(
            "token.rejected",
            user_id=payload.get("sub"),
            route="auth",
            result="revoked-or-inactive",
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User | None:
    """Resolve the user from the Bearer token if present; return None otherwise."""
    if credentials is None:
        return None
    settings = get_settings()
    payload = verify_session_token(credentials.credentials, settings.auth_secret_key)
    if payload is None:
        return None
    user = db.get(User, payload["sub"])
    if user is None or not user.is_active or _token_revoked(payload, user):
        return None
    return user


def require_roles(*roles: UserRole):
    """Dependency factory enforcing that the current user has one of the roles."""

    def checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            log_security(
                "authz.denied",
                user_id=user.id,
                route="admin",
                result="forbidden",
                detail=f"requires={','.join(role.value for role in roles)}",
            )
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="insufficient permissions",
            )
        return user

    return checker
