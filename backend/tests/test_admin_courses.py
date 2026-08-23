"""Tests for M16 admin course and lesson management."""

from uuid import uuid4

import pytest

from tests.conftest import TestingSessionLocal
from app.models import Course, Lesson


@pytest.fixture()
def stage0_course():
    """Seed a minimal Stage 0 course with lessons via the ORM (idempotent)."""
    from sqlalchemy import select

    with TestingSessionLocal() as db:
        existing = db.scalar(
            select(Course).where(Course.slug == "python-stage-0")
        )
        if existing is not None:
            return existing.id
        course = Course(
            slug="python-stage-0",
            stage="stage_0",
            title_id="Python Stage 0 — Dasar Pemrograman",
            title_en="Python Stage 0 — Programming Fundamentals",
            description_id="Mulai dari nol.",
            description_en="Start from zero.",
        )
        db.add(course)
        db.flush()
        db.add_all(
            [
                Lesson(
                    course_id=course.id,
                    position=index,
                    lesson_id=f"{index:02d}",
                    optionality="core",
                    title_id=lesson["title_id"],
                    title_en=lesson["title_en"],
                    objective_id=lesson.get("objective_id"),
                    objective_en=lesson.get("objective_en"),
                )
                for index, lesson in enumerate(
                    [
                        {
                            "title_id": "Apa itu Pemrograman?",
                            "title_en": "What is Programming?",
                            "objective_id": "Tujuan ID",
                            "objective_en": "Objective EN",
                        },
                        {
                            "title_id": "Apa itu Python?",
                            "title_en": "What is Python?",
                        },
                        {
                            "title_id": "Hello World",
                            "title_en": "Hello World",
                        },
                        {
                            "title_id": "Variabel",
                            "title_en": "Variables",
                        },
                        {
                            "title_id": "Tipe Data",
                            "title_en": "Data Types",
                        },
                        {
                            "title_id": "Kondisi",
                            "title_en": "Conditions",
                        },
                        {
                            "title_id": "Perulangan",
                            "title_en": "Loops",
                        },
                        {
                            "title_id": "Memasang & Menjalankan Python",
                            "title_en": "Installing & Running Python",
                        },
                    ],
                    start=1,
                )
            ],
        )
        db.commit()
        return course.id


def unique_email():
    return f"cr-{uuid4().hex[:8]}@test.test"


def register_and_login(client):
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "display_name": "Test Learner", "password": "secret-pass-1234"})
    response = client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "secret-pass-1234"}
    )
    return response.json()["access_token"], email


def make_admin(client, email):
    from sqlalchemy import update

    from tests.conftest import TestingSessionLocal
    from app.models import User, UserRole

    with TestingSessionLocal() as db:
        db.execute(
            update(User).where(User.email == email).values(role=UserRole.ADMIN)
        )
        db.commit()


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# --- Course list ---


def test_list_courses_requires_admin(client):
    token, _ = register_and_login(client)
    response = client.get("/api/admin/courses", headers=auth_headers(token))
    assert response.status_code == 403


def test_list_courses_returns_seeded_course(client, stage0_course):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get("/api/admin/courses", headers=auth_headers(token))
    assert response.status_code == 200
    courses = response.json()["courses"]
    assert any(c["slug"] == "python-stage-0" for c in courses)


# --- Course create ---


def test_create_course(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.post(
        "/api/admin/courses",
        json={
            "slug": "test-course",
            "stage": "stage_1",
            "title_id": "Kursus Test",
            "title_en": "Test Course",
            "description_id": "Deskripsi",
            "description_en": "Description",
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 201
    assert response.json()["slug"] == "test-course"


def test_create_course_duplicate_slug(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    client.post(
        "/api/admin/courses",
        json={
            "slug": "dup",
            "stage": "stage_0",
            "title_id": "A",
            "title_en": "A",
            "description_id": "B",
            "description_en": "B",
        },
        headers=auth_headers(token),
    )
    response = client.post(
        "/api/admin/courses",
        json={
            "slug": "dup",
            "stage": "stage_0",
            "title_id": "A",
            "title_en": "A",
            "description_id": "B",
            "description_en": "B",
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 409


def test_create_course_invalid_slug(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.post(
        "/api/admin/courses",
        json={
            "slug": "Bad Slug!",
            "stage": "stage_0",
            "title_id": "A",
            "title_en": "A",
            "description_id": "B",
            "description_en": "B",
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 422


# --- Course detail ---


def test_get_course_includes_lessons(client, stage0_course):
    token, email = register_and_login(client)
    make_admin(client, email)
    courses = client.get("/api/admin/courses", headers=auth_headers(token)).json()[
        "courses"
    ]
    stage0 = [c for c in courses if c["slug"] == "python-stage-0"][0]
    response = client.get(
        f"/api/admin/courses/{stage0['id']}", headers=auth_headers(token)
    )
    assert response.status_code == 200
    assert len(response.json()["lessons"]) == 8


# --- Course update ---


def test_update_course(client, stage0_course):
    token, email = register_and_login(client)
    make_admin(client, email)
    courses = client.get("/api/admin/courses", headers=auth_headers(token)).json()[
        "courses"
    ]
    stage0 = [c for c in courses if c["slug"] == "python-stage-0"][0]
    response = client.patch(
        f"/api/admin/courses/{stage0['id']}",
        json={"title_id": "Baru", "title_en": "New"},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["title_id"] == "Baru"
    assert response.json()["title_en"] == "New"


# --- Lesson detail ---


def test_get_lesson(client, stage0_course):
    token, email = register_and_login(client)
    make_admin(client, email)
    courses = client.get("/api/admin/courses", headers=auth_headers(token)).json()[
        "courses"
    ]
    stage0 = [c for c in courses if c["slug"] == "python-stage-0"][0]
    detail = client.get(
        f"/api/admin/courses/{stage0['id']}", headers=auth_headers(token)
    ).json()
    lesson_id = detail["lessons"][0]["id"]
    response = client.get(
        f"/api/admin/lessons/{lesson_id}", headers=auth_headers(token)
    )
    assert response.status_code == 200
    assert response.json()["title_id"] == "Apa itu Pemrograman?"
    assert response.json()["title_en"] == "What is Programming?"
    assert response.json()["objective_id"] is not None


# --- Lesson update ---


def test_update_lesson(client, stage0_course):
    token, email = register_and_login(client)
    make_admin(client, email)
    courses = client.get("/api/admin/courses", headers=auth_headers(token)).json()[
        "courses"
    ]
    stage0 = [c for c in courses if c["slug"] == "python-stage-0"][0]
    detail = client.get(
        f"/api/admin/courses/{stage0['id']}", headers=auth_headers(token)
    ).json()
    lesson_id = detail["lessons"][0]["id"]
    response = client.patch(
        f"/api/admin/lessons/{lesson_id}",
        json={"title_id": "Program?", "title_en": "Program?"},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["status"] == "updated"


def test_update_lesson_unknown_path(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.patch(
        "/api/admin/lessons/99999",
        json={"title_id": "X"},
        headers=auth_headers(token),
    )
    assert response.status_code == 404