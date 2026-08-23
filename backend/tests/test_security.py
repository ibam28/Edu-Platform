"""Tests for SEC-003 rate limiting and SEC-006 password policy."""

from uuid import uuid4

from app.core.ratelimit import (
    LOGIN_EMAIL_LIMITER,
    LOGIN_IP_LIMITER,
    REGISTER_IP_LIMITER,
)

VALID_PASSWORD = "secret-pass-1234"
SHORT_PASSWORD = "12345"
NINE_CHAR_PASSWORD = "123456789"


def unique_email():
    return f"sec-{uuid4().hex[:10]}@test.test"


def register_payload(email=None, password=VALID_PASSWORD):
    return {"email": email or unique_email(), "display_name": "Test Learner", "password": password}


# --- SEC-006: password policy boundaries ---


def test_register_rejects_nine_char_password(client):
    response = client.post("/api/auth/register", json=register_payload(password=NINE_CHAR_PASSWORD))
    assert response.status_code == 422


def test_register_accepts_ten_char_password(client):
    response = client.post("/api/auth/register", json=register_payload(password="1234567890"))
    assert response.status_code == 201


def test_register_rejects_short_password(client):
    response = client.post("/api/auth/register", json=register_payload(password=SHORT_PASSWORD))
    assert response.status_code == 422


def test_login_accepts_ten_char_password(client):
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "display_name": "Test Learner", "password": "1234567890"})
    response = client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "1234567890"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()


# --- SEC-003: register throttling (5 per 15 min per IP) ---


def test_register_normal_requests_allowed(client):
    for _ in range(5):
        response = client.post("/api/auth/register", json=register_payload())
        assert response.status_code == 201


def test_register_throttled_after_limit(client):
    for _ in range(5):
        client.post("/api/auth/register", json=register_payload())
    response = client.post("/api/auth/register", json=register_payload())
    assert response.status_code == 429


# --- SEC-003: login throttling (10 per 15 min per IP) ---


def test_login_normal_requests_allowed(client):
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "display_name": "Test Learner", "password": VALID_PASSWORD})
    for _ in range(5):
        response = client.post(
            "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "wrong-password"}
        )
        assert response.status_code == 401


def test_login_throttled_by_ip(client):
    for _ in range(10):
        client.post(
            "/api/auth/login",
            json={"email": unique_email(), "display_name": "Test Learner", "password": "wrong-password"},
        )
    response = client.post(
        "/api/auth/login",
        json={"email": unique_email(), "display_name": "Test Learner", "password": "wrong-password"},
    )
    assert response.status_code == 429


# --- SEC-003: login email-aware throttling (5 per 15 min per email) ---


def test_login_throttled_per_email(client):
    email = unique_email()
    for _ in range(5):
        client.post(
            "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "wrong-password"}
        )
    response = client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "wrong-password"}
    )
    assert response.status_code == 429


def test_login_success_after_reset(client):
    """After the limiter is reset, a normal login is allowed again."""
    email = unique_email()
    client.post("/api/auth/register", json={"email": email, "display_name": "Test Learner", "password": VALID_PASSWORD})
    for _ in range(5):
        client.post(
            "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "wrong-password"}
        )
    assert client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": "wrong-password"}
    ).status_code == 429
    LOGIN_EMAIL_LIMITER.reset()
    LOGIN_IP_LIMITER.reset()
    REGISTER_IP_LIMITER.reset()
    response = client.post(
        "/api/auth/login", json={"email": email, "display_name": "Test Learner", "password": VALID_PASSWORD}
    )
    assert response.status_code == 200
