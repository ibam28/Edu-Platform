"""Tests for display_name as primary user identity."""

from uuid import uuid4

VALID_PASSWORD = "secret-pass-1234"


def unique_email():
    return f"dn-{uuid4().hex[:10]}@test.test"


def register_user(client, email=None, display_name="Test Learner"):
    payload = {
        "email": email or unique_email(),
        "display_name": display_name,
        "password": VALID_PASSWORD,
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    return response


def login_token(client, email):
    response = client.post(
        "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
    )
    assert response.status_code == 200
    return response.json()["access_token"]


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


def test_register_with_display_name(client):
    response = register_user(client, display_name="Rifav47551")
    assert response.json()["display_name"] == "Rifav47551"
    assert response.json()["email"]


def test_register_requires_display_name(client):
    response = client.post(
        "/api/auth/register",
        json={"email": unique_email(), "password": VALID_PASSWORD},
    )
    assert response.status_code == 422


def test_register_rejects_empty_display_name(client):
    response = client.post(
        "/api/auth/register",
        json={"email": unique_email(), "display_name": "   ", "password": VALID_PASSWORD},
    )
    assert response.status_code == 422


def test_register_rejects_short_display_name(client):
    response = client.post(
        "/api/auth/register",
        json={"email": unique_email(), "display_name": "A", "password": VALID_PASSWORD},
    )
    assert response.status_code == 422


def test_register_rejects_oversized_display_name(client):
    response = client.post(
        "/api/auth/register",
        json={
            "email": unique_email(),
            "display_name": "x" * 51,
            "password": VALID_PASSWORD,
        },
    )
    assert response.status_code == 422


def test_me_returns_display_name(client):
    email = unique_email()
    register_user(client, email=email, display_name="Rifav47551")
    token = login_token(client, email)
    response = client.get("/api/auth/me", headers=auth_headers(token))
    assert response.status_code == 200
    assert response.json()["display_name"] == "Rifav47551"
    assert "password" not in response.json()
    assert "password_hash" not in response.json()


def test_patch_me_updates_display_name(client):
    email = unique_email()
    register_user(client, email=email, display_name="Rifav47551")
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me",
        json={"display_name": "Rifav"},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    body = response.json()
    assert body["display_name"] == "Rifav"
    assert body["email"] == email
    assert body["role"] == "student"
    assert body["is_active"] is True
    assert "id" in body
    # Persisted server-side
    me = client.get("/api/auth/me", headers=auth_headers(token))
    assert me.json()["display_name"] == "Rifav"


def test_patch_me_requires_authentication(client):
    response = client.patch("/api/auth/me", json={"display_name": "X"})
    assert response.status_code == 401


def test_patch_me_rejects_empty_display_name(client):
    email = unique_email()
    register_user(client, email=email)
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me", json={"display_name": "  "}, headers=auth_headers(token)
    )
    assert response.status_code == 422


def test_patch_me_rejects_oversized_display_name(client):
    email = unique_email()
    register_user(client, email=email)
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me",
        json={"display_name": "x" * 51},
        headers=auth_headers(token),
    )
    assert response.status_code == 422


def test_patch_me_cannot_change_role(client):
    email = unique_email()
    register_user(client, email=email)
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me",
        json={"display_name": "Rifav", "role": "admin"},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["role"] == "student"
    # RBAC still enforced: the user cannot access admin endpoints
    assert client.get(
        "/api/admin/overview", headers=auth_headers(token)
    ).status_code == 403


def test_patch_me_cannot_change_email(client):
    email = unique_email()
    register_user(client, email=email)
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me",
        json={"display_name": "Rifav", "email": "hacked@test.test"},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["email"] == email


def test_patch_me_trims_whitespace(client):
    email = unique_email()
    register_user(client, email=email)
    token = login_token(client, email)
    response = client.patch(
        "/api/auth/me",
        json={"display_name": "  Rifav  "},
        headers=auth_headers(token),
    )
    assert response.status_code == 200
    assert response.json()["display_name"] == "Rifav"
