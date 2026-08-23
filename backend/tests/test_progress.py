"""Tests for the M13 lesson progress system."""

from itertools import count
from uuid import uuid4

from sqlalchemy import select

from tests.conftest import TestingSessionLocal
from app.models import LessonProgress

VALID_PASSWORD = "secret-pass-1234"

_email_counter = count(1)


def unique_email():
    return f"progress-{uuid4().hex[:8]}@{next(_email_counter)}.test"


def register_and_login(client):
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "display_name": "Test Learner", "password": VALID_PASSWORD})
    response = client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": VALID_PASSWORD}
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# --- Authorization ---


def test_progress_requires_authentication(client):
    response = client.get("/api/progress")
    assert response.status_code == 401
    response = client.post(
        "/api/progress", json={"lesson_id": "01"}
    )
    assert response.status_code == 401


# --- Mark complete ---


def test_mark_lesson_complete(client):
    token = register_and_login(client)
    response = client.post(
        "/api/progress", json={"lesson_id": "01"}, headers=auth_headers(token)
    )
    assert response.status_code == 201
    assert response.json() == {"lesson_id": "01", "status": "completed"}


def test_mark_lesson_complete_is_idempotent(client):
    token = register_and_login(client)
    client.post("/api/progress", json={"lesson_id": "02"}, headers=auth_headers(token))
    response = client.post(
        "/api/progress", json={"lesson_id": "02"}, headers=auth_headers(token)
    )
    assert response.status_code == 201
    with TestingSessionLocal() as db:
        rows = db.scalars(
            select(LessonProgress).where(LessonProgress.lesson_id == "02")
        ).all()
        assert len(rows) == 1


def test_mark_lesson_complete_validates_lesson_id(client):
    token = register_and_login(client)
    response = client.post(
        "/api/progress", json={"lesson_id": "abc"}, headers=auth_headers(token)
    )
    assert response.status_code == 422


# --- Read progress ---


def test_get_progress_empty(client):
    token = register_and_login(client)
    response = client.get("/api/progress", headers=auth_headers(token))
    assert response.status_code == 200
    assert response.json() == {"lesson_ids": []}


def test_get_progress_returns_sorted_lesson_ids(client):
    token = register_and_login(client)
    client.post("/api/progress", json={"lesson_id": "03"}, headers=auth_headers(token))
    client.post("/api/progress", json={"lesson_id": "01"}, headers=auth_headers(token))
    response = client.get("/api/progress", headers=auth_headers(token))
    assert response.status_code == 200
    assert response.json() == {"lesson_ids": ["01", "03"]}


def test_progress_is_isolated_per_user(client):
    token_a = register_and_login(client)
    token_b = register_and_login(client)
    client.post("/api/progress", json={"lesson_id": "01"}, headers=auth_headers(token_a))
    response_b = client.get("/api/progress", headers=auth_headers(token_b))
    assert response_b.json() == {"lesson_ids": []}


# --- Undo completion ---


def test_unmark_lesson_complete(client):
    token = register_and_login(client)
    client.post("/api/progress", json={"lesson_id": "01"}, headers=auth_headers(token))
    response = client.delete(
        "/api/progress/01", headers=auth_headers(token)
    )
    assert response.status_code == 200
    assert response.json() == {"lesson_id": "01", "status": "removed"}
    progress = client.get("/api/progress", headers=auth_headers(token))
    assert progress.json() == {"lesson_ids": []}


def test_unmark_missing_lesson_is_idempotent(client):
    token = register_and_login(client)
    response = client.delete(
        "/api/progress/05", headers=auth_headers(token)
    )
    assert response.status_code == 200
    assert response.json() == {"lesson_id": "05", "status": "removed"}


def test_unmark_validates_lesson_id(client):
    token = register_and_login(client)
    response = client.delete(
        "/api/progress/not-a-lesson", headers=auth_headers(token)
    )
    assert response.status_code == 422
