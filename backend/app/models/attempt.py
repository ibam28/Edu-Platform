"""Demo assessment attempt model (M14)."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class DemoAssessmentAttempt(Base):
    """One submitted demo assessment attempt. User is optional (guests allowed).

    Demo results are practice feedback only and never a certification record.
    """

    __tablename__ = "demo_assessment_attempts"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True
    )
    stage: Mapped[str] = mapped_column(String(16), nullable=False)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    total: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
