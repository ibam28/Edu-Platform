"""Tests for SEC-001: AUTH_SECRET_KEY validation."""

import pytest
from pydantic import ValidationError

from app.core.config import AUTH_SECRET_MIN_LENGTH, Settings


def test_valid_strong_secret_passes():
    secret = "x" * AUTH_SECRET_MIN_LENGTH
    settings = Settings(auth_secret_key=secret)
    assert len(settings.auth_secret_key) == AUTH_SECRET_MIN_LENGTH


def test_long_secret_passes():
    secret = "y" * 64
    settings = Settings(auth_secret_key=secret)
    assert len(settings.auth_secret_key) == 64


def test_empty_secret_fails():
    with pytest.raises(ValidationError):
        Settings(auth_secret_key="")


def test_short_secret_fails():
    with pytest.raises(ValidationError):
        Settings(auth_secret_key="short-secret")


def test_boundary_below_minimum_fails():
    with pytest.raises(ValidationError):
        Settings(auth_secret_key="x" * (AUTH_SECRET_MIN_LENGTH - 1))
