.PHONY: up down logs health backend-dev frontend-dev backend-test backend-lint security-audit

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

health:
	curl -s http://localhost:8000/api/health

backend-dev:
	cd backend && .venv/bin/uvicorn app.main:app --reload --port 8000

frontend-dev:
	cd frontend && npm run dev

backend-test:
	cd backend && .venv/bin/pytest

backend-lint:
	cd backend && .venv/bin/ruff check .

# SEC-015: dependency security audit (manual; CI-ready).
# pip-audit is installed transiently inside a throwaway container — it is NOT
# added to the application image or requirements. No automatic upgrades.
security-audit:
	@echo "== Backend (pip-audit) =="
	docker compose run --rm backend sh -c "pip install -q --break-system-packages pip-audit 2>/dev/null; pip-audit -r requirements.txt"
	@echo "== Frontend (npm audit, production deps only) =="
	cd frontend && npm audit --omit=dev
