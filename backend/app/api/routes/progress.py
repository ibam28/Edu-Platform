"""Lesson progress endpoints (M13)."""

import re

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, field_validator
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.session import get_db
from app.models import LessonProgress, User

router = APIRouter(prefix="/progress", tags=["progress"])

LESSON_ID_PATTERN = r"^\d{2}$"


class LessonCompleteRequest(BaseModel):
    lesson_id: str

    @field_validator("lesson_id")
    @classmethod
    def validate_lesson_id(cls, value: str) -> str:
        lesson_id = value.strip()
        if not re.match(LESSON_ID_PATTERN, lesson_id):
            raise ValueError("invalid lesson id")
        return lesson_id


@router.get("")
def get_progress(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Return the authenticated user's completed Stage 0 lesson ids."""
    lesson_ids = db.scalars(
        select(LessonProgress.lesson_id).where(
            LessonProgress.user_id == user.id
        )
    ).all()
    return {"lesson_ids": sorted(lesson_ids)}


@router.post("", status_code=status.HTTP_201_CREATED)
def mark_lesson_complete(
    payload: LessonCompleteRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Mark a lesson complete. Idempotent: duplicate marks are ignored."""
    existing = db.scalar(
        select(LessonProgress).where(
            LessonProgress.user_id == user.id,
            LessonProgress.lesson_id == payload.lesson_id,
        )
    )
    if existing is None:
        db.add(LessonProgress(user_id=user.id, lesson_id=payload.lesson_id))
        db.commit()
    return {"lesson_id": payload.lesson_id, "status": "completed"}


@router.delete("/{lesson_id}")
def unmark_lesson_complete(
    lesson_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    """Remove a completed lesson. Idempotent: missing entries are ignored."""
    if not re.match(LESSON_ID_PATTERN, lesson_id):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="invalid lesson id",
        )
    existing = db.scalar(
        select(LessonProgress).where(
            LessonProgress.user_id == user.id,
            LessonProgress.lesson_id == lesson_id,
        )
    )
    if existing is not None:
        db.delete(existing)
        db.commit()
    return {"lesson_id": lesson_id, "status": "removed"}
