"""Health check endpoints."""
from fastapi import APIRouter, Response, status

from app.db.session import check_database_connection

router = APIRouter(tags=["health"])


@router.get("/health")
def health(response: Response) -> dict[str, str]:
    """Liveness and database connectivity check."""
    if check_database_connection():
        return {"status": "ok"}

    response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    return {"status": "unavailable"}
