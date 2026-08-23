"""ORM models. Importing the module registers tables on Base.metadata."""

from app.models.assessment import (
    DEMO_ASSESSMENT_LABEL,
    STAGES,
    DemoAssessment,
    DemoAssessmentQuestion,
)
from app.models.attempt import DemoAssessmentAttempt
from app.models.course import Course, Lesson
from app.models.progress import LessonProgress
from app.models.user import User, UserRole

__all__ = [
    "DEMO_ASSESSMENT_LABEL",
    "STAGES",
    "Course",
    "DemoAssessment",
    "DemoAssessmentAttempt",
    "DemoAssessmentQuestion",
    "Lesson",
    "LessonProgress",
    "User",
    "UserRole",
]
