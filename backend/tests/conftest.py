"""Test configuration: SQLite in-memory database + test auth secret.

Environment variables must be set before importing the application so the
cached settings pick them up.
"""

import os

os.environ.setdefault("AUTH_SECRET_KEY", "test-secret-key-not-for-production")
os.environ.setdefault("AUTH_TOKEN_EXPIRY_MINUTES", "60")
os.environ.setdefault("DATABASE_URL", "sqlite://")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.session import Base, get_db
from app.main import app

test_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(
    bind=test_engine, autocommit=False, autoflush=False, expire_on_commit=False
)

Base.metadata.create_all(bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def _reset_rate_limiters():
    """Reset in-memory rate limiters before every test (SEC-003)."""
    from app.core.ratelimit import reset_rate_limiters

    reset_rate_limiters()
    yield


@pytest.fixture()
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture()
def admin_token(client):
    """Register an admin user directly in the test database."""
    from sqlalchemy import update

    from app.models import User, UserRole

    response = client.post(
        "/api/auth/register",
        json={"email": "admin@example.com", "display_name": "Test Learner", "password": "secret-pass-1234"},
    )
    assert response.status_code == 201
    with TestingSessionLocal() as db:
        db.execute(
            update(User)
            .where(User.email == "admin@example.com")
            .values(role=UserRole.ADMIN)
        )
        db.commit()
    response = client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "display_name": "Test Learner", "password": "secret-pass-1234"},
    )
    assert response.status_code == 200
    return response.json()["access_token"]
