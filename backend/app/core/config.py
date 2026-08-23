"""Application configuration."""
from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Minimum length for AUTH_SECRET_KEY (SEC-001). Shorter secrets are refused
# at startup so deployments cannot run with an empty or weak signing key.
AUTH_SECRET_MIN_LENGTH = 32


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    app_name: str = "bilingual-edu-platform"
    app_version: str = "0.0.1"
    environment: str = "development"
    api_v1_prefix: str = "/api"

    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/bilingual_edu"

    # Required. Set via environment (see .env.example); never commit real secrets.
    auth_secret_key: str

    # Session token lifetime in minutes (prototype default: 7 days).
    auth_token_expiry_minutes: int = 10080

    @field_validator("auth_secret_key")
    @classmethod
    def validate_auth_secret_key(cls, value: str) -> str:
        if len(value) < AUTH_SECRET_MIN_LENGTH:
            raise ValueError(
                f"AUTH_SECRET_KEY must be at least {AUTH_SECRET_MIN_LENGTH} "
                "characters long"
            )
        return value

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return a cached instance of application settings."""
    return Settings()
