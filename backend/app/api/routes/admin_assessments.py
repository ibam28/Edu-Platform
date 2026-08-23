"""Admin demo assessment and question management endpoints (M17)."""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field, field_validator, model_validator
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.core.security_log import log_security
from app.db.session import get_db
from app.models import DemoAssessment, DemoAssessmentQuestion, User, UserRole

router = APIRouter(prefix="/admin", tags=["admin"])


def question_to_dict(question: DemoAssessmentQuestion) -> dict:
    return {
        "id": question.id,
        "assessment_id": question.assessment_id,
        "position": question.position,
        "question_id": question.question_id,
        "question_en": question.question_en,
        "options": [
            {
                "position": index,
                "id": getattr(question, f"option_{index}_id"),
                "en": getattr(question, f"option_{index}_en"),
            }
            for index in range(1, 5)
        ],
        "correct_option": question.correct_option,
    }


class QuestionCreateRequest(BaseModel):
    question_id: str
    question_en: str
    option_1_id: str
    option_1_en: str
    option_2_id: str
    option_2_en: str
    option_3_id: str
    option_3_en: str
    option_4_id: str
    option_4_en: str
    correct_option: int = Field(ge=0, le=3)

    @model_validator(mode="after")
    def validate_fields(self):
        fields = [
            self.question_id,
            self.question_en,
            self.option_1_id,
            self.option_1_en,
            self.option_2_id,
            self.option_2_en,
            self.option_3_id,
            self.option_3_en,
            self.option_4_id,
            self.option_4_en,
        ]
        if any(not field or not field.strip() for field in fields):
            raise ValueError("question and option texts must not be empty")
        return self


class QuestionUpdateRequest(QuestionCreateRequest):
    pass


@router.get("/assessments")
def admin_list_assessments(
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    """List demo assessments with question counts (demo label always present)."""
    assessments = db.execute(
        select(DemoAssessment, func.count(DemoAssessmentQuestion.id))
        .outerjoin(DemoAssessmentQuestion)
        .group_by(DemoAssessment.id)
        .order_by(DemoAssessment.id)
    ).all()
    return {
        "assessments": [
            {
                "id": assessment.id,
                "stage": assessment.stage,
                "is_demo": assessment.is_demo,
                "demo_label": assessment.demo_label,
                "question_count": count,
            }
            for assessment, count in assessments
        ]
    }


@router.get("/assessments/{assessment_id}")
def admin_get_assessment(
    assessment_id: int,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    assessment = db.get(DemoAssessment, assessment_id)
    if assessment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    questions = db.scalars(
        select(DemoAssessmentQuestion)
        .where(DemoAssessmentQuestion.assessment_id == assessment_id)
        .order_by(DemoAssessmentQuestion.position)
    ).all()
    return {
        "assessment": {
            "id": assessment.id,
            "stage": assessment.stage,
            "is_demo": assessment.is_demo,
            "demo_label": assessment.demo_label,
        },
        "questions": [question_to_dict(question) for question in questions],
    }


@router.post(
    "/assessments/{assessment_id}/questions", status_code=status.HTTP_201_CREATED
)
def admin_create_question(
    assessment_id: int,
    payload: QuestionCreateRequest,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    assessment = db.get(DemoAssessment, assessment_id)
    if assessment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    max_position = db.scalar(
        select(func.max(DemoAssessmentQuestion.position)).where(
            DemoAssessmentQuestion.assessment_id == assessment_id
        )
    )
    question = DemoAssessmentQuestion(
        assessment_id=assessment_id,
        position=(max_position or 0) + 1,
        **payload.model_dump(),
    )
    db.add(question)
    db.commit()
    db.refresh(question)
    log_security(
        "admin.write",
        user_id=user.id,
        route="/api/admin/assessments/{id}/questions",
        result="created",
        detail=f"question_id={question.id}",
    )
    return question_to_dict(question)


@router.patch("/questions/{question_id}")
def admin_update_question(
    question_id: int,
    payload: QuestionUpdateRequest,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    question = db.get(DemoAssessmentQuestion, question_id)
    if question is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    for key, value in payload.model_dump().items():
        setattr(question, key, value)
    db.commit()
    db.refresh(question)
    log_security(
        "admin.write",
        user_id=user.id,
        route="/api/admin/questions/{id}",
        result="updated",
        detail=f"question_id={question.id}",
    )
    return question_to_dict(question)
