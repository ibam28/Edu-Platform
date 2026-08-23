"""In-memory rate limiting (SEC-003).

Prototype-safe, single-process throttling for the auth endpoints. No external
dependency and no distributed state: limits are tracked per process in memory.
This is intentionally NOT a production-grade distributed rate limiter.
"""

import time
from collections import defaultdict, deque
from threading import Lock


class InMemoryRateLimiter:
    """Sliding-window limiter keyed by an arbitrary string (IP, email, ...)."""

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key: str) -> bool:
        """Record a hit and return whether the request is allowed."""
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > self.window_seconds:
                hits.popleft()
            if len(hits) >= self.max_requests:
                return False
            hits.append(now)
            return True

    def reset(self) -> None:
        """Clear all recorded hits (used by tests between cases)."""
        with self._lock:
            self._hits.clear()


# Sensible prototype policy:
# - register: 5 requests per 15 minutes per IP
# - login: 10 requests per 15 minutes per IP, plus 5 per 15 minutes per email
REGISTER_IP_LIMITER = InMemoryRateLimiter(max_requests=5, window_seconds=900)
LOGIN_IP_LIMITER = InMemoryRateLimiter(max_requests=10, window_seconds=900)
LOGIN_EMAIL_LIMITER = InMemoryRateLimiter(max_requests=5, window_seconds=900)


def reset_rate_limiters() -> None:
    """Reset all limiters (test helper; never exposes internal state)."""
    REGISTER_IP_LIMITER.reset()
    LOGIN_IP_LIMITER.reset()
    LOGIN_EMAIL_LIMITER.reset()
