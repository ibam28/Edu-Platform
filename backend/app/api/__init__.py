"""API router aggregation."""
from fastapi import APIRouter

from app.api.routes import (
    admin,
    admin_assessments,
    admin_courses,
    assessments,
    auth,
    health,
    progress,
)

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(admin.router)
api_router.include_router(admin_courses.router)
api_router.include_router(admin_assessments.router)
api_router.include_router(progress.router)
api_router.include_router(assessments.router)
