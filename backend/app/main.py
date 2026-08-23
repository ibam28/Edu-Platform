"""FastAPI application entrypoint."""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api import api_router
from app.core.config import get_settings
from app.db.session import check_database_connection

# Minimal logging: ensures security events (app.security) reach stdout even
# when uvicorn is started with its default logging config (SEC-007).
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    """Log database connectivity status on startup."""
    connected = check_database_connection()
    print(f"[startup] database connectivity: {'ok' if connected else 'unavailable'}")
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="LearnCode — Learn programming. Build skills. Become career-ready.",
    lifespan=lifespan,
)

app.include_router(api_router, prefix=settings.api_v1_prefix)
