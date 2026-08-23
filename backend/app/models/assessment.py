"""Demo assessment data model (M08)."""

from sqlalchemy import ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base

DEMO_ASSESSMENT_LABEL = "Demo Assessment - Not a Certification Examination"

STAGES = ("stage_1", "stage_2", "stage_3", "stage_4")


class DemoAssessment(Base):
    """One demo assessment per learning stage (Stage 1-4)."""

    __tablename__ = "demo_assessments"

    id: Mapped[int] = mapped_column(primary_key=True)
    stage: Mapped[str] = mapped_column(String(16), unique=True, nullable=False)
    is_demo: Mapped[bool] = mapped_column(default=True, nullable=False)
    demo_label: Mapped[str] = mapped_column(String(120), nullable=False)

    questions: Mapped[list["DemoAssessmentQuestion"]] = relationship(
        back_populates="assessment",
        cascade="all, delete-orphan",
        order_by="DemoAssessmentQuestion.position",
    )


class DemoAssessmentQuestion(Base):
    """A multiple-choice question with bilingual text and four options."""

    __tablename__ = "demo_assessment_questions"
    __table_args__ = (
        UniqueConstraint(
            "assessment_id", "position", name="uq_demo_question_assessment_position"
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("demo_assessments.id", ondelete="CASCADE"), index=True
    )
    position: Mapped[int] = mapped_column(Integer, nullable=False)
    question_id: Mapped[str] = mapped_column(Text, nullable=False)
    question_en: Mapped[str] = mapped_column(Text, nullable=False)
    option_1_id: Mapped[str] = mapped_column(Text, nullable=False)
    option_1_en: Mapped[str] = mapped_column(Text, nullable=False)
    option_2_id: Mapped[str] = mapped_column(Text, nullable=False)
    option_2_en: Mapped[str] = mapped_column(Text, nullable=False)
    option_3_id: Mapped[str] = mapped_column(Text, nullable=False)
    option_3_en: Mapped[str] = mapped_column(Text, nullable=False)
    option_4_id: Mapped[str] = mapped_column(Text, nullable=False)
    option_4_en: Mapped[str] = mapped_column(Text, nullable=False)
    correct_option: Mapped[int] = mapped_column(Integer, nullable=False)

    assessment: Mapped["DemoAssessment"] = relationship(back_populates="questions")
