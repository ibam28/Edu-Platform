"""Tests for the health endpoint."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_ok_when_database_connected(monkeypatch) -> None:
    """Health returns 200 with status ok when the database responds."""

    def fake_check() -> bool:
        return True

    from app.api.routes import health as health_module

    monkeypatch.setattr(health_module, "check_database_connection", fake_check)

    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_unavailable_when_database_down(monkeypatch) -> None:
    """Health returns 503 when the database is unreachable."""

    def fake_check() -> bool:
        return False

    from app.api.routes import health as health_module

    monkeypatch.setattr(health_module, "check_database_connection", fake_check)

    response = client.get("/api/health")
    assert response.status_code == 503
    assert response.json() == {"status": "unavailable"}
