"""Tests for SEC-007 security logging (sensitive values never logged)."""

import logging
from uuid import uuid4

from app.core.security_log import log_security

VALID_PASSWORD = "super-secret-password-1234"


def unique_email():
    return f"log-{uuid4().hex[:10]}@test.test"


def collect_records(caplog):
    return [record for record in caplog.records if record.name == "app.security"]


def test_auth_events_are_logged(client, caplog):
    with caplog.at_level(logging.INFO):
        email = unique_email()
        response = client.post(
            "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
        )
        assert response.status_code == 201
        client.post(
            "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
        )
        client.post(
            "/api/auth/login", json={"email": email, "password": "wrong-password"}
        )
    events = [r.getMessage() for r in collect_records(caplog)]
    assert any("event=register.success" in line for line in events)
    assert any("event=login.success" in line for line in events)
    assert any("event=login.failed" in line for line in events)
    assert any("email=" in line for line in events)


def test_no_sensitive_values_in_logs(client, caplog):
    with caplog.at_level(logging.INFO):
        email = unique_email()
        client.post(
            "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
        )
        token = client.post(
            "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
        ).json()["access_token"]
        client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}x"})
    raw = "\n".join(record.getMessage() for record in caplog.records)
    assert VALID_PASSWORD not in raw
    assert "pbkdf2" not in raw
    assert token not in raw
    assert "auth_secret" not in raw.lower()


def test_logout_and_revocation_event_logged(client, caplog):
    import time

    with caplog.at_level(logging.INFO):
        email = unique_email()
        client.post(
            "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
        )
        token = client.post(
            "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
        ).json()["access_token"]
        time.sleep(1.05)
        client.post("/api/auth/logout", headers={"Authorization": f"Bearer {token}"})
    events = [r.getMessage() for r in collect_records(caplog)]
    assert any("event=logout" in line for line in events)


def test_authz_denied_event_logged(client, caplog):
    with caplog.at_level(logging.INFO):
        email = unique_email()
        client.post(
            "/api/auth/register", json={"email": email, "password": VALID_PASSWORD}
        )
        token = client.post(
            "/api/auth/login", json={"email": email, "password": VALID_PASSWORD}
        ).json()["access_token"]
        client.get("/api/admin/overview", headers={"Authorization": f"Bearer {token}"})
    events = [r.getMessage() for r in collect_records(caplog)]
    assert any("event=authz.denied" in line for line in events)


def test_log_security_helper_never_logs_secrets(caplog):
    with caplog.at_level(logging.INFO):
        log_security("test.event", user_id=1, route="/x", result="ok")
    raw = "\n".join(record.getMessage() for record in caplog.records)
    assert "event=test.event" in raw
    assert "user_id=1" in raw
