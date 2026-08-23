"""Tests for SEC-005 token revocation."""

import time
from uuid import uuid4

from app.core.security import create_session_token

VALID_PASSWORD = "secret-pass-1234"


def unique_email():
    return f"rev-{uuid4().hex[:10]}@test.test"


def register_and_login(client):
    email = unique_email()
    response = client.post(
        "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
    )
    assert response.status_code == 201
    response = client.post(
        "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
    )
    return response.json()["access_token"], email


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


def test_valid_token_works(client):
    token, _ = register_and_login(client)
    response = client.get("/api/auth/me", headers=auth_headers(token))
    assert response.status_code == 200


def test_revoked_token_fails(client):
    token, _ = register_and_login(client)
    time.sleep(1.05)
    response = client.post("/api/auth/logout", headers=auth_headers(token))
    assert response.status_code == 200
    response = client.get("/api/auth/me", headers=auth_headers(token))
    assert response.status_code == 401


def test_newly_issued_token_works_after_revocation(client):
    token, _ = register_and_login(client)
    time.sleep(1.05)
    client.post("/api/auth/logout", headers=auth_headers(token))
    time.sleep(1.05)
    new_token, _ = register_and_login(client)
    response = client.get("/api/auth/me", headers=auth_headers(new_token))
    assert response.status_code == 200


def test_revoked_token_rejected_on_protected_route(client):
    token, _ = register_and_login(client)
    time.sleep(1.05)
    client.post("/api/auth/logout", headers=auth_headers(token))
    response = client.get("/api/progress", headers=auth_headers(token))
    assert response.status_code == 401


def test_expired_token_fails(client):
    from app.core.config import get_settings

    expired = create_session_token(
        999999, get_settings().auth_secret_key, -1
    )
    response = client.get("/api/auth/me", headers=auth_headers(expired))
    assert response.status_code == 401


def test_logout_without_token_is_noop(client):
    response = client.post("/api/auth/logout")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_admin_authorization_still_works(client):
    from sqlalchemy import update

    from tests.conftest import TestingSessionLocal
    from app.models import User, UserRole

    email = unique_email()
    client.post(
        "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
    )
    with TestingSessionLocal() as db:
        db.execute(
            update(User).where(User.email == email).values(role=UserRole.ADMIN)
        )
        db.commit()
    token = client.post(
        "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
    ).json()["access_token"]
    response = client.get("/api/admin/overview", headers=auth_headers(token))
    assert response.status_code == 200
    time.sleep(1.05)
    client.post("/api/auth/logout", headers=auth_headers(token))
    response = client.get("/api/admin/overview", headers=auth_headers(token))
    assert response.status_code == 401
    time.sleep(1.05)
    fresh_token = client.post(
        "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
    ).json()["access_token"]
    response = client.get("/api/admin/overview", headers=auth_headers(fresh_token))
    assert response.status_code == 200
