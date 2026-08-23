"""Registration, login, and logout endpoints (M11; SEC-003/SEC-005/SEC-006)."""

import re
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, field_validator
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_optional_user
from app.core.config import get_settings
from app.core.ratelimit import (
    LOGIN_EMAIL_LIMITER,
    LOGIN_IP_LIMITER,
    REGISTER_IP_LIMITER,
)
from app.core.security import (
    create_session_token,
    hash_password,
    verify_password,
)
from app.core.security_log import log_security
from app.db.session import get_db
from app.models import User, UserRole

router = APIRouter(prefix="/auth", tags=["auth"])

EMAIL_PATTERN = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
# SEC-006: minimum password length raised from 6 to 10 (prototype policy).
MIN_PASSWORD_LENGTH = 10


def _client_ip(request: Request) -> str:
    """Best-effort client address. Prototype does not trust proxy headers."""
    return request.client.host if request.client is not None else "unknown"


def _reject_if_throttled(*allowed: bool) -> None:
    """Raise 429 if any of the rate-limit checks was denied."""
    if not all(allowed):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="too many requests",
        )


class RegisterRequest(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip().lower()
        if not re.match(EMAIL_PATTERN, email):
            raise ValueError("invalid email format")
        return email

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) < MIN_PASSWORD_LENGTH:
            raise ValueError("password must be at least 10 characters")
        return value


class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        return value.strip().lower()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(
    payload: RegisterRequest,
    request: Request,
    db: Session = Depends(get_db),
) -> dict:
    """Create a new student account. Passwords are stored hashed only."""
    _reject_if_throttled(REGISTER_IP_LIMITER.allow(f"ip:{_client_ip(request)}"))
    existing = db.scalar(select(User).where(User.email == payload.email))
    if existing is not None:
        log_security(
            "register.duplicate",
            email=payload.email,
            route="/api/auth/register",
            result="conflict",
        )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="email already registered",
        )
    user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=UserRole.STUDENT,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    log_security(
        "register.success",
        user_id=user.id,
        email=user.email,
        route="/api/auth/register",
        result="created",
    )
    return {"email": user.email, "role": user.role.value}


@router.post("/login")
def login(
    payload: LoginRequest,
    request: Request,
    db: Session = Depends(get_db),
) -> dict:
    """Authenticate and return a session token. Errors are deliberately generic."""
    ip = _client_ip(request)
    _reject_if_throttled(
        LOGIN_IP_LIMITER.allow(f"ip:{ip}"),
        LOGIN_EMAIL_LIMITER.allow(f"email:{payload.email}"),
    )
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or not user.is_active or not verify_password(
        payload.password, user.password_hash
    ):
        log_security(
            "login.failed",
            email=payload.email,
            route="/api/auth/login",
            result="unauthorized",
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid credentials",
        )
    settings = get_settings()
    token = create_session_token(
        user.id,
        settings.auth_secret_key,
        settings.auth_token_expiry_minutes,
    )
    log_security(
        "login.success",
        user_id=user.id,
        email=user.email,
        route="/api/auth/login",
        result="ok",
    )
    return {
        "access_token": token,
        "token_type": "bearer",
        "email": user.email,
        "role": user.role.value,
    }


@router.post("/logout")
def logout(
    user: User | None = Depends(get_optional_user),
    db: Session = Depends(get_db),
) -> dict:
    """Invalidate the presented token (SEC-005).

    When a Bearer token is supplied, the user's revocation point is moved to
    now, so every token issued before this moment is rejected. Clients that
    call logout without a token simply discard it locally.
    """
    if user is not None:
        # Token iat claims are Unix seconds: tokens issued strictly before the
        # revocation point are rejected. A token minted in the very same second
        # as the logout call remains valid (documented prototype limitation).
        user.tokens_valid_after = datetime.now(timezone.utc)
        db.commit()
        log_security(
            "logout",
            user_id=user.id,
            route="/api/auth/logout",
            result="revoked",
        )
    return {"status": "ok"}


@router.get("/me")
def get_me(user: User = Depends(get_current_user)) -> dict:
    """Return the current authenticated user's profile."""
    return {"email": user.email, "role": user.role.value}
