"""Demo assessment attempt recording (M14)."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, field_validator, model_validator
from sqlalchemy.orm import Session

from app.api.dependencies import get_optional_user
from app.db.session import get_db
from app.models import DemoAssessmentAttempt, STAGES, User

router = APIRouter(prefix="/assessments", tags=["assessments"])


class AttemptRequest(BaseModel):
    stage: str
    score: int
    total: int

    @field_validator("stage")
    @classmethod
    def validate_stage(cls, value: str) -> str:
        if value not in STAGES:
            raise ValueError("invalid stage")
        return value

    @field_validator("score")
    @classmethod
    def validate_score(cls, value: int) -> int:
        if value < 0:
            raise ValueError("score cannot be negative")
        return value

    @field_validator("total")
    @classmethod
    def validate_total(cls, value: int) -> int:
        if value <= 0:
            raise ValueError("total must be positive")
        return value

    @model_validator(mode="after")
    def validate_score_within_total(self):
        if self.score > self.total:
            raise ValueError("score cannot exceed total")
        return self


@router.post("/attempts", status_code=201)
def record_attempt(
    payload: AttemptRequest,
    db: Session = Depends(get_db),
    user: User | None = Depends(get_optional_user),
) -> dict:
    """Record a submitted demo assessment attempt. Guests are allowed; the
    attempt is never presented as a certification record."""
    db.add(
        DemoAssessmentAttempt(
            user_id=user.id if user is not None else None,
            stage=payload.stage,
            score=payload.score,
            total=payload.total,
        )
    )
    db.commit()
    return {"status": "recorded"}
