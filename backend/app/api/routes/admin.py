"""Protected admin endpoints (M11 scaffold; stats M14, users M15)."""

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.db.session import get_db
from app.models import (
    DemoAssessmentAttempt,
    LessonProgress,
    User,
    UserRole,
)

router = APIRouter(prefix="/admin", tags=["admin"])


def _role_value(item: User) -> str:
    """Return a serializable role string without ever raising.

    Guards against legacy/corrupted rows whose stored role does not match any
    UserRole member (SQLAlchemy enum validation raises LookupError on access);
    the endpoint must return a valid list instead of a 500.
    """
    try:
        return item.role.value
    except Exception:
        raw = item.__dict__.get("role")
        return raw if isinstance(raw, str) else "guest"


@router.get("/overview")
def admin_overview(
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    """ADMIN-only basic platform statistics (prototype, no advanced analytics)."""
    users = db.scalar(select(func.count()).select_from(User)) or 0
    stage0_participants = (
        db.scalar(select(func.count(func.distinct(LessonProgress.user_id)))) or 0
    )
    assessment_attempts = (
        db.scalar(select(func.count()).select_from(DemoAssessmentAttempt)) or 0
    )
    return {
        "status": "ok",
        "role": user.role.value,
        "users": users,
        "stage0_participants": stage0_participants,
        "assessment_attempts": assessment_attempts,
    }


@router.get("/users")
def admin_list_users(
    q: str | None = None,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    """ADMIN-only user list with optional email search (M15)."""
    statement = select(User).order_by(User.id)
    if q:
        query = q.strip().lower()
        statement = statement.where(User.email.contains(query))
    users = db.scalars(statement).all()
    return {
        "users": [
            {
                "id": item.id,
                "email": item.email,
                "role": _role_value(item),
                "is_active": item.is_active,
                "created_at": item.created_at.isoformat(),
            }
            for item in users
        ]
    }
