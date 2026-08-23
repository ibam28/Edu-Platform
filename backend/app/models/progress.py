"""Lesson progress model (M13)."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class LessonProgress(Base):
    """Tracks Stage 0 lesson completion per user (minimal model, no analytics)."""

    __tablename__ = "lesson_progress"
    __table_args__ = (
        UniqueConstraint(
            "user_id", "lesson_id", name="uq_lesson_progress_user_lesson"
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    lesson_id: Mapped[str] = mapped_column(String(16), nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
