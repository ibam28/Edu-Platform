"""Tests for M17 admin assessment management."""

from uuid import uuid4

import pytest

from tests.conftest import TestingSessionLocal
from app.models import (
    DEMO_ASSESSMENT_LABEL,
    STAGES,
    DemoAssessment,
    DemoAssessmentQuestion,
)


@pytest.fixture()
def demo_assessments():
    """Seed four demo assessments with questions via the ORM (idempotent)."""
    from sqlalchemy import select

    with TestingSessionLocal() as db:
        existing = db.scalar(select(DemoAssessment).limit(1))
        if existing is not None:
            return
        for stage_index, stage in enumerate(STAGES, start=1):
            assessment = DemoAssessment(
                stage=stage,
                is_demo=True,
                demo_label=DEMO_ASSESSMENT_LABEL,
            )
            db.add(assessment)
            db.flush()
            db.add_all(
                [
                    DemoAssessmentQuestion(
                        assessment_id=assessment.id,
                        position=position,
                        question_id=f"Q{position}",
                        question_en=f"Q{position} EN",
                        option_1_id="A",
                        option_1_en="A EN",
                        option_2_id="B",
                        option_2_en="B EN",
                        option_3_id="C",
                        option_3_en="C EN",
                        option_4_id="D",
                        option_4_en="D EN",
                        correct_option=0,
                    )
                    for position in range(1, 11)
                ],
            )
        db.commit()


def unique_email():
    return f"aa-{uuid4().hex[:8]}@test.test"


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


def test_list_assessments_requires_admin(client):
    token, _ = register_and_login(client)
    response = client.get("/api/admin/assessments", headers=auth_headers(token))
    assert response.status_code == 403


def test_list_assessments_returns_seeded_data(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get("/api/admin/assessments", headers=auth_headers(token))
    assert response.status_code == 200
    assessments = response.json()["assessments"]
    assert len(assessments) == 4
    assert assessments[0]["is_demo"] is True
    assert "Certification" in assessments[0]["demo_label"]


def test_get_assessment_returns_questions(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    assessments = client.get(
        "/api/admin/assessments", headers=auth_headers(token)
    ).json()["assessments"]
    aid = assessments[0]["id"]
    response = client.get(
        f"/api/admin/assessments/{aid}", headers=auth_headers(token)
    )
    assert response.status_code == 200
    data = response.json()
    assert data["assessment"]["is_demo"] is True
    assert len(data["questions"]) == 10  # stage 1 has 10 questions


def test_get_assessment_404(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get(
        "/api/admin/assessments/99999", headers=auth_headers(token)
    )
    assert response.status_code == 404


def test_question_basic_question_payload():
    p = {
        "question_id": "Q1",
        "question_en": "Q1 EN",
        "option_1_id": "A",
        "option_1_en": "A EN",
        "option_2_id": "B",
        "option_2_en": "B EN",
        "option_3_id": "C",
        "option_3_en": "C EN",
        "option_4_id": "D",
        "option_4_en": "D EN",
        "correct_option": 0,
    }
    from app.api.routes.admin_assessments import QuestionCreateRequest
    obj = QuestionCreateRequest(**p)
    assert obj.correct_option == 0
    assert obj.question_id == "Q1"


def test_create_question(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    aid = client.get(
        "/api/admin/assessments", headers=auth_headers(token)
    ).json()["assessments"][0]["id"]
    response = client.post(
        f"/api/admin/assessments/{aid}/questions",
        json={
            "question_id": "New Q",
            "question_en": "New Q EN",
            "option_1_id": "A",
            "option_1_en": "A EN",
            "option_2_id": "B",
            "option_2_en": "B EN",
            "option_3_id": "C",
            "option_3_en": "C EN",
            "option_4_id": "D",
            "option_4_en": "D EN",
            "correct_option": 2,
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 201
    data = response.json()
    assert data["question_id"] == "New Q"
    assert data["correct_option"] == 2


def test_create_question_requires_non_empty_fields(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    aid = client.get(
        "/api/admin/assessments", headers=auth_headers(token)
    ).json()["assessments"][0]["id"]
    response = client.post(
        f"/api/admin/assessments/{aid}/questions",
        json={
            "question_id": "",
            "question_en": "EN",
            "option_1_id": "A",
            "option_1_en": "A EN",
            "option_2_id": "B",
            "option_2_en": "B EN",
            "option_3_id": "C",
            "option_3_en": "C EN",
            "option_4_id": "D",
            "option_4_en": "D EN",
            "correct_option": 0,
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 422


def test_update_question(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    aid = client.get(
        "/api/admin/assessments", headers=auth_headers(token)
    ).json()["assessments"][0]["id"]
    detail = client.get(
        f"/api/admin/assessments/{aid}", headers=auth_headers(token)
    ).json()
    qid = detail["questions"][0]["id"]
    response = client.patch(
        f"/api/admin/questions/{qid}",
        json={
            "question_id": "Updated Q",
            "question_en": "Updated Q EN",
            "option_1_id": "A1",
            "option_1_en": "A1 EN",
            "option_2_id": "B1",
            "option_2_en": "B1 EN",
            "option_3_id": "C1",
            "option_3_en": "C1 EN",
            "option_4_id": "D1",
            "option_4_en": "D1 EN",
            "correct_option": 1,
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["question_id"] == "Updated Q"
    assert response.json()["correct_option"] == 1


def test_update_question_404(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.patch(
        "/api/admin/questions/99999",
        json={
            "question_id": "X",
            "question_en": "X",
            "option_1_id": "A",
            "option_1_en": "A",
            "option_2_id": "B",
            "option_2_en": "B",
            "option_3_id": "C",
            "option_3_en": "C",
            "option_4_id": "D",
            "option_4_en": "D",
            "correct_option": 0,
        },
        headers=auth_headers(token),
    )
    assert response.status_code == 404


def test_demo_label_visible_in_list(client, demo_assessments):
    token, email = register_and_login(client)
    make_admin(client, email)
    data = client.get(
        "/api/admin/assessments", headers=auth_headers(token)
    ).json()
    for assessment in data["assessments"]:
        assert assessment["is_demo"] is True
        assert "Demo Assessment" in assessment["demo_label"] or "Not a Certification" in assessment["demo_label"]