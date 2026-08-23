"""Course and lesson models (M16, admin CMS)."""

from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base


class Course(Base):
    """A course with bilingual title and description metadata (prototype CMS)."""

    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    stage: Mapped[str] = mapped_column(String(16), nullable=False)
    title_id: Mapped[str] = mapped_column(String(200), nullable=False)
    title_en: Mapped[str] = mapped_column(String(200), nullable=False)
    description_id: Mapped[str] = mapped_column(Text, nullable=False)
    description_en: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class Lesson(Base):
    """A lesson with bilingual content fields. Paragraph and list fields are
    stored as newline-separated text (prototype CMS, no rich text)."""

    __tablename__ = "lessons"
    __table_args__ = (
        UniqueConstraint("course_id", "position", name="uq_lesson_course_position"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[int] = mapped_column(
        ForeignKey("courses.id", ondelete="CASCADE"), index=True, nullable=False
    )
    position: Mapped[int] = mapped_column(Integer, nullable=False)
    lesson_id: Mapped[str] = mapped_column(String(16), nullable=False)
    optionality: Mapped[str] = mapped_column(String(16), nullable=False)

    title_id: Mapped[str] = mapped_column(String(200), nullable=False)
    title_en: Mapped[str] = mapped_column(String(200), nullable=False)
    objective_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    objective_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    explanation_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    explanation_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_title_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_title_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_code: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_explanation_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_explanation_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    mistakes_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    mistakes_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_title_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_title_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_description_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_description_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_hint_id: Mapped[str | None] = mapped_column(Text, nullable=True)
    exercise_hint_en: Mapped[str | None] = mapped_column(Text, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
