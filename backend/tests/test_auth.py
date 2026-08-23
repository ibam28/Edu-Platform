"""Tests for the M11 authentication system."""

import pytest
from sqlalchemy import select

from tests.conftest import TestingSessionLocal
from app.models import User

VALID_EMAIL = "learner@example.com"
VALID_PASSWORD = "secret-pass-1234"


def register_user(client, email=VALID_EMAIL, password=VALID_PASSWORD):
    return client.post(
        "/api/auth/register", json={"email": email, "password": password}
    )


# --- Registration ---


def test_register_success(client):
    response = register_user(client)
    assert response.status_code == 201
    body = response.json()
    assert body["email"] == VALID_EMAIL
    assert body["role"] == "student"


def test_register_normalizes_email(client):
    response = register_user(client, email="MixedCase@Example.com")
    assert response.status_code == 201
    assert response.json()["email"] == "mixedcase@example.com"


def test_register_duplicate_email_returns_409(client):
    register_user(client)
    response = register_user(client)
    assert response.status_code == 409


def test_register_invalid_email_returns_422(client):
    response = register_user(client, email="not-an-email")
    assert response.status_code == 422


def test_register_short_password_returns_422(client):
    response = register_user(client, password="12345")
    assert response.status_code == 422


def test_password_not_stored_in_plaintext(client):
    register_user(client)
    with TestingSessionLocal() as db:
        user = db.scalar(select(User).where(User.email == VALID_EMAIL))
        assert user is not None
        assert user.password_hash != VALID_PASSWORD
        assert user.password_hash.startswith("pbkdf2_sha256$")
        assert VALID_PASSWORD not in user.password_hash


# --- Login / logout ---


def test_login_success_returns_token(client):
    register_user(client)
    response = client.post(
        "/api/auth/login",
        json={"email": VALID_EMAIL, "password": VALID_PASSWORD},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["token_type"] == "bearer"
    assert body["email"] == VALID_EMAIL
    assert body["role"] == "student"
    assert len(body["access_token"]) > 20


def test_login_wrong_password_returns_401(client):
    register_user(client)
    response = client.post(
        "/api/auth/login",
        json={"email": VALID_EMAIL, "password": "wrong-password"},
    )
    assert response.status_code == 401


def test_login_unknown_user_returns_401(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "nobody@example.com", "password": VALID_PASSWORD},
    )
    assert response.status_code == 401


def test_logout_returns_ok(client):
    response = client.post("/api/auth/logout")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


# --- Protected routes ---


def login_token(client):
    register_user(client)
    response = client.post(
        "/api/auth/login",
        json={"email": VALID_EMAIL, "password": VALID_PASSWORD},
    )
    return response.json()["access_token"]


def test_me_requires_authentication(client):
    response = client.get("/api/auth/me")
    assert response.status_code == 401


def test_me_with_valid_token(client):
    token = login_token(client)
    response = client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == VALID_EMAIL
    assert response.json()["role"] == "student"


def test_me_rejects_tampered_token(client):
    token = login_token(client)
    response = client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}x"}
    )
    assert response.status_code == 401


def test_admin_overview_requires_admin(client):
    token = login_token(client)
    response = client.get(
        "/api/admin/overview", headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 403


def test_admin_overview_allows_admin(client, admin_token):
    response = client.get(
        "/api/admin/overview",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 200
    assert response.json()["role"] == "admin"


@pytest.mark.parametrize("bad_token", ["", "not-a-token", "aaa.bbb"])
def test_me_rejects_malformed_tokens(client, bad_token):
    headers = {"Authorization": f"Bearer {bad_token}"} if bad_token else {}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 401
