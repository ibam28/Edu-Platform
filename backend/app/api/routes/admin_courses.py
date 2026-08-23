"""Admin course and lesson management endpoints (M16)."""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, field_validator
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import require_roles
from app.core.security_log import log_security
from app.db.session import get_db
from app.models import Course, Lesson, User, UserRole

router = APIRouter(prefix="/admin", tags=["admin"])


# --- Courses ---


class CourseCreateRequest(BaseModel):
    slug: str
    stage: str
    title_id: str
    title_en: str
    description_id: str
    description_en: str

    @field_validator("slug")
    @classmethod
    def validate_slug(cls, value: str) -> str:
        import re
        if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", value):
            raise ValueError("invalid slug format")
        return value


class CourseUpdateRequest(BaseModel):
    title_id: str | None = None
    title_en: str | None = None
    description_id: str | None = None
    description_en: str | None = None


@router.get("/courses")
def admin_list_courses(
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    courses = db.scalars(select(Course).order_by(Course.id)).all()
    return {
        "courses": [
            {
                "id": course.id,
                "slug": course.slug,
                "stage": course.stage,
                "title_id": course.title_id,
                "title_en": course.title_en,
                "description_id": course.description_id,
                "description_en": course.description_en,
                "created_at": course.created_at.isoformat(),
                "updated_at": course.updated_at.isoformat(),
            }
            for course in courses
        ]
    }


@router.post("/courses", status_code=status.HTTP_201_CREATED)
def admin_create_course(
    payload: CourseCreateRequest,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    existing = db.scalar(select(Course).where(Course.slug == payload.slug))
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="slug already exists"
        )
    course = Course(**payload.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    log_security(
        "admin.write",
        user_id=user.id,
        route="/api/admin/courses",
        result="created",
        detail=f"course_id={course.id}",
    )
    return {
        "id": course.id,
        "slug": course.slug,
        "stage": course.stage,
        "title_id": course.title_id,
        "title_en": course.title_en,
    }


@router.get("/courses/{course_id}")
def admin_get_course(
    course_id: int,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    course = db.get(Course, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    lessons = db.scalars(
        select(Lesson).where(Lesson.course_id == course_id).order_by(Lesson.position)
    ).all()
    return {
        "course": {
            "id": course.id,
            "slug": course.slug,
            "stage": course.stage,
            "title_id": course.title_id,
            "title_en": course.title_en,
            "description_id": course.description_id,
            "description_en": course.description_en,
            "created_at": course.created_at.isoformat(),
            "updated_at": course.updated_at.isoformat(),
        },
        "lessons": [
            {
                "id": lesson.id,
                "position": lesson.position,
                "lesson_id": lesson.lesson_id,
                "title_id": lesson.title_id,
                "title_en": lesson.title_en,
                "optionality": lesson.optionality,
                "updated_at": lesson.updated_at.isoformat(),
            }
            for lesson in lessons
        ],
    }


@router.patch("/courses/{course_id}")
def admin_update_course(
    course_id: int,
    payload: CourseUpdateRequest,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    course = db.get(Course, course_id)
    if course is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(course, key, value)
    db.commit()
    db.refresh(course)
    log_security(
        "admin.write",
        user_id=user.id,
        route="/api/admin/courses/{id}",
        result="updated",
        detail=f"course_id={course.id}",
    )
    return {
        "id": course.id,
        "slug": course.slug,
        "title_id": course.title_id,
        "title_en": course.title_en,
    }


# --- Lessons ---


class LessonUpdateRequest(BaseModel):
    title_id: str | None = None
    title_en: str | None = None
    objective_id: str | None = None
    objective_en: str | None = None
    explanation_id: str | None = None
    explanation_en: str | None = None
    example_title_id: str | None = None
    example_title_en: str | None = None
    example_code: str | None = None
    example_explanation_id: str | None = None
    example_explanation_en: str | None = None
    mistakes_id: str | None = None
    mistakes_en: str | None = None
    exercise_title_id: str | None = None
    exercise_title_en: str | None = None
    exercise_description_id: str | None = None
    exercise_description_en: str | None = None
    exercise_hint_id: str | None = None
    exercise_hint_en: str | None = None


@router.get("/lessons/{lesson_id}")
def admin_get_lesson(
    lesson_id: int,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    lesson = db.get(Lesson, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return {
        "id": lesson.id,
        "course_id": lesson.course_id,
        "position": lesson.position,
        "lesson_id": lesson.lesson_id,
        "optionality": lesson.optionality,
        "title_id": lesson.title_id,
        "title_en": lesson.title_en,
        "objective_id": lesson.objective_id,
        "objective_en": lesson.objective_en,
        "explanation_id": lesson.explanation_id,
        "explanation_en": lesson.explanation_en,
        "example_title_id": lesson.example_title_id,
        "example_title_en": lesson.example_title_en,
        "example_code": lesson.example_code,
        "example_explanation_id": lesson.example_explanation_id,
        "example_explanation_en": lesson.example_explanation_en,
        "mistakes_id": lesson.mistakes_id,
        "mistakes_en": lesson.mistakes_en,
        "exercise_title_id": lesson.exercise_title_id,
        "exercise_title_en": lesson.exercise_title_en,
        "exercise_description_id": lesson.exercise_description_id,
        "exercise_description_en": lesson.exercise_description_en,
        "exercise_hint_id": lesson.exercise_hint_id,
        "exercise_hint_en": lesson.exercise_hint_en,
        "updated_at": lesson.updated_at.isoformat(),
    }


@router.patch("/lessons/{lesson_id}")
def admin_update_lesson(
    lesson_id: int,
    payload: LessonUpdateRequest,
    user: User = Depends(require_roles(UserRole.ADMIN)),
    db: Session = Depends(get_db),
) -> dict:
    lesson = db.get(Lesson, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(lesson, key, value)
    db.commit()
    db.refresh(lesson)
    log_security(
        "admin.write",
        user_id=user.id,
        route="/api/admin/lessons/{id}",
        result="updated",
        detail=f"lesson_id={lesson.id}",
    )
    return {"id": lesson.id, "lesson_id": lesson.lesson_id, "status": "updated"}