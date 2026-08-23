"""Tests for M14 admin overview stats and assessment attempt recording."""

from uuid import uuid4

from app.models import STAGES


def unique_email():
    return f"admin-{uuid4().hex[:8]}@test.test"


def register_and_login(client):
    """Register a user and return (token, email)."""
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "password": "secret-pass-1234"})
    response = client.post(
        "/api/auth/login", json={"email": email, "password": "secret-pass-1234"}
    )
    return response.json()["access_token"], email


def make_admin(client, email):
    """Promote a user to admin via SQL."""
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


# --- Admin overview ---


def test_admin_overview_requires_admin_role(client):
    token, _ = register_and_login(client)
    response = client.get("/api/admin/overview", headers=auth_headers(token))
    assert response.status_code == 403


def test_admin_overview_returns_stats(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get("/api/admin/overview", headers=auth_headers(token))
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "admin"
    assert data["users"] >= 1
    assert data["stage0_participants"] >= 0
    assert data["assessment_attempts"] >= 0


def test_admin_overview_counts_users(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    data = client.get("/api/admin/overview", headers=auth_headers(token)).json()
    assert data["users"] >= 1
    # Register a second user
    client.post(
        "/api/auth/register",
        json={"email": unique_email(), "password": "secret-pass-1234"},
    )
    data = client.get("/api/admin/overview", headers=auth_headers(token)).json()
    assert data["users"] >= 2


# --- Attempt recording ---


def test_record_attempt_requires_valid_stage(client):
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "invalid", "score": 3, "total": 5},
    )
    assert response.status_code == 422


def test_record_attempt_requires_valid_score(client):
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "stage_1", "score": -1, "total": 5},
    )
    assert response.status_code == 422


def test_record_attempt_requires_positive_total(client):
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "stage_1", "score": 0, "total": 0},
    )
    assert response.status_code == 422


def test_record_attempt_requires_score_within_total(client):
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "stage_1", "score": 6, "total": 5},
    )
    assert response.status_code == 422


def test_record_attempt_anonymous(client):
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "stage_1", "score": 3, "total": 5},
    )
    assert response.status_code == 201
    assert response.json() == {"status": "recorded"}


def test_record_attempt_authenticated(client):
    token, _ = register_and_login(client)
    response = client.post(
        "/api/assessments/attempts",
        json={"stage": "stage_2", "score": 4, "total": 5},
        headers=auth_headers(token),
    )
    assert response.status_code == 201


def test_record_attempt_all_stages(client):
    for stage in STAGES:
        response = client.post(
            "/api/assessments/attempts",
            json={"stage": stage, "score": 0, "total": 1},
        )
        assert response.status_code == 201


def test_attempts_count_in_admin_overview(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    for stage in STAGES:
        client.post(
            "/api/assessments/attempts",
            json={"stage": stage, "score": 2, "total": 5},
        )
    data = client.get("/api/admin/overview", headers=auth_headers(token)).json()
    assert data["assessment_attempts"] >= len(STAGES)


# --- User list ---


def test_admin_users_requires_admin_role(client):
    token, _ = register_and_login(client)
    response = client.get("/api/admin/users", headers=auth_headers(token))
    assert response.status_code == 403


def test_admin_users_lists_users(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get("/api/admin/users", headers=auth_headers(token))
    assert response.status_code == 200
    users = response.json()["users"]
    assert any(user["email"] == email for user in users)
    assert all(
        {"id", "email", "role", "is_active", "created_at"} <= set(user.keys())
        for user in users
    )


def test_admin_users_search_by_email(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    # Another user that should not match the search
    client.post(
        "/api/auth/register",
        json={"email": unique_email(), "password": "secret-pass-1234"},
    )
    response = client.get(
        f"/api/admin/users?q={email}", headers=auth_headers(token)
    )
    assert response.status_code == 200
    users = response.json()["users"]
    assert len(users) == 1
    assert users[0]["email"] == email


def test_admin_users_search_no_match(client):
    token, email = register_and_login(client)
    make_admin(client, email)
    response = client.get(
        "/api/admin/users?q=no-such-user", headers=auth_headers(token)
    )
    assert response.status_code == 200
    assert response.json()["users"] == []