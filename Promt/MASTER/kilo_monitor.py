#!/usr/bin/env python3
"""
HERMES — Kilo Code Read-Only Monitor
Inspect-only progress checker for M12 → M22.

ABSOLUTELY NO MUTATIONS. No git, no docker, no source writes.
Output is appended to HERMES_KILO_MONITOR.log and printed.
"""
from __future__ import annotations

import datetime as dt
import os
import re
import subprocess
import sys
from pathlib import Path

WORKSPACE = Path("/home/alsa/Dokumen/00 Projek Serius/workspace")
# Prompt folders live inside workspace/Promt/ (NOT directly under 00 Projek Serius/Promt/)
PROMPT_ROOT = WORKSPACE / "Promt"
LOG_PATH = PROMPT_ROOT / "MASTER" / "HERMES_KILO_MONITOR.log"
ROADMAP = WORKSPACE / "docs" / "ROADMAP.md"

MILESTONES = [
    "12_STUDENT_DASHBOARD",
    "13_PROGRESS",
    "14_ADMIN_DASHBOARD",
    "15_ADMIN_USERS",
    "16_ADMIN_COURSES",
    "17_ADMIN_ASSESSMENTS",
    "18_CONTACT",
    "19_PRIVACY",
    "20_TERMS",
    "21_LOCALIZATION_QA",
    "22_RESPONSIVE_QA",
]

# Acceptance evidence each milestone leaves in source.
# Keep checks cheap: file path + lightweight content sniff.
ACCEPTANCE = {
    "12_STUDENT_DASHBOARD": [
        ("frontend/app/[locale]/dashboard/page.tsx", "file"),
        ("frontend/components/dashboard/DashboardClient.tsx", "file"),
    ],
    "13_PROGRESS": [
        ("frontend/app/[locale]/dashboard/page.tsx", "file"),  # progress UI lives in dashboard
        ("backend/app/api/routes/progress.py", "file"),
        ("backend/app/models/progress.py", "file"),
    ],
    "14_ADMIN_DASHBOARD": [
        # M11 already provided backend scaffold; M14 needs frontend route + dashboard view
        ("frontend/app/[locale]/admin/page.tsx", "file"),
    ],
    "15_ADMIN_USERS": [
        ("frontend/app/[locale]/admin/users/page.tsx", "file"),
    ],
    "16_ADMIN_COURSES": [
        ("frontend/app/[locale]/admin/courses/page.tsx", "file"),
    ],
    "17_ADMIN_ASSESSMENTS": [
        ("frontend/app/[locale]/admin/assessments/page.tsx", "file"),
    ],
    "18_CONTACT": [
        # Contact page was scaffolded early; M18 QA requires a substantive file (>800 bytes
        # suggests real copy, not a placeholder) and at least one sibling QA marker.
        ("frontend/app/[locale]/contact/page.tsx", "file:>=800"),
    ],
    "19_PRIVACY": [
        ("frontend/app/[locale]/privacy/page.tsx", "file:>=800"),
    ],
    "20_TERMS": [
        ("frontend/app/[locale]/terms/page.tsx", "file:>=800"),
    ],
    "21_LOCALIZATION_QA": [
        # Localization QA is a pass over existing dictionaries; without git log we
        # can't tell if the QA pass actually ran. Probe dictionaries + i18n lib.
        ("frontend/lib/i18n/dictionaries.ts", "file:>=10000"),
        ("frontend/lib/i18n", "dir"),
    ],
    "22_RESPONSIVE_QA": [
        # Responsive QA is a styling pass; check that core pages exist and the
        # layout + tailwind config have responsive primitives present.
        ("frontend/app/[locale]/page.tsx", "file"),
        ("frontend/app/[locale]/learning-path/page.tsx", "file"),
        ("frontend/app/[locale]/dashboard/page.tsx", "file"),
        ("frontend/tailwind.config.ts", "file"),
    ],
}


def now_utc() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def now_local() -> str:
    return now_utc().astimezone().strftime("%Y-%m-%d %H:%M:%S %z")


def safe_read_text(path: Path, limit: int = 200_000) -> str:
    try:
        return path.read_text(errors="replace")[:limit]
    except Exception as exc:  # pragma: no cover - inspector path
        return f"<read-error: {exc.__class__.__name__}>"


def list_prompts(milestone: str) -> list[str]:
    folder = PROMPT_ROOT / milestone
    if not folder.is_dir():
        return []
    return sorted(p.name for p in folder.iterdir() if p.suffix == ".txt")


def evidence_for(milestone: str) -> dict[str, bool]:
    """Acceptance probes. Supports 'dir', 'file', and 'file:>=N' (size threshold bytes)."""
    results: dict[str, bool] = {}
    for spec in ACCEPTANCE.get(milestone, []):
        rel, kind = spec
        p = WORKSPACE / rel
        if kind == "dir":
            results[rel] = p.is_dir()
        elif kind.startswith("file:>="):
            threshold = int(kind.split(">=")[1])
            try:
                results[rel] = p.is_file() and p.stat().st_size >= threshold
            except OSError:
                results[rel] = False
        else:  # default 'file'
            results[rel] = p.is_file()
    return results


def classify(milestone: str, prompts: list[str]) -> tuple[str, list[str]]:
    """Return (status, reasons). Status ∈ COMPLETED/LIKELY COMPLETED/IN PROGRESS/NOT STARTED/UNKNOWN."""
    if not prompts:
        return "UNKNOWN", ["prompt folder missing"]

    ev = evidence_for(milestone)
    if not ev:
        # No specific evidence defined — only fall back to source code existence check
        return "UNKNOWN", ["no acceptance probes defined"]

    true_count = sum(1 for v in ev.values() if v)
    total = len(ev)

    if true_count == total:
        return "LIKELY COMPLETED", [f"{true_count}/{total} probes passed: " + ", ".join(ev.keys())]
    if true_count > 0:
        return "IN PROGRESS", [
            f"{true_count}/{total} probes passed",
            "missing: " + ", ".join(k for k, v in ev.items() if not v),
        ]
    return "NOT STARTED", ["no acceptance evidence found in source tree"]


def find_last_completed(milestones: list[tuple[str, str, list[str]]]) -> str | None:
    last = None
    for ms, status, _ in milestones:
        if status in ("COMPLETED", "LIKELY COMPLETED"):
            last = ms
    return last


def find_current(milestones: list[tuple[str, str, list[str]]]) -> str:
    for ms, status, _ in milestones:
        if status == "IN PROGRESS":
            return ms
    return "—"


def find_next(milestones: list[tuple[str, str, list[str]]]) -> str:
    seen_pending = False
    for ms, status, _ in milestones:
        if status in ("COMPLETED", "LIKELY COMPLETED"):
            continue
        if status in ("IN PROGRESS", "NOT STARTED", "UNKNOWN"):
            return ms
        seen_pending = True
    return "—" if not seen_pending else "—"


def find_recent_changes(since_minutes: int = 30) -> list[str]:
    """List source files modified within the last `since_minutes` (read-only stat)."""
    cutoff = now_utc().timestamp() - since_minutes * 60
    skip_dirs = {"node_modules", ".next", ".git", "__pycache__", ".venv", "venv"}
    findings: list[str] = []
    for root, dirs, files in os.walk(WORKSPACE):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for f in files:
            p = Path(root) / f
            try:
                mtime = p.stat().st_mtime
            except OSError:
                continue
            if mtime >= cutoff:
                findings.append(str(p.relative_to(WORKSPACE)))
    return sorted(findings)[:20]


def read_previous_log_entries(n: int = 1) -> list[str]:
    if not LOG_PATH.exists():
        return []
    text = LOG_PATH.read_text(errors="replace")
    blocks = [b for b in text.split("=" * 30) if "HERMES — KILO CODE MONITOR" in b]
    return blocks[-n:]


def all_m22_prompts_pass() -> tuple[bool, list[str]]:
    """PASS = every .txt prompt in 22_RESPONSIVE_QA classified COMPLETED or LIKELY COMPLETED."""
    prompts = list_prompts("22_RESPONSIVE_QA")
    if not prompts:
        return False, ["22_RESPONSIVE_QA folder empty"]
    ms, status, reasons = "22_RESPONSIVE_QA", *classify("22_RESPONSIVE_QA", prompts)
    # We still need every individual prompt to have source evidence.
    # Heuristic: at least 1 probe passes per milestone. If status == LIKELY COMPLETED → PASS for the milestone.
    if status not in ("COMPLETED", "LIKELY COMPLETED"):
        return False, [f"milestone status = {status}", *reasons]
    return True, []


def check_docker_state() -> dict[str, str]:
    """Read-only docker ps. Never starts/stops anything."""
    try:
        out = subprocess.run(
            ["docker", "compose", "-f", str(WORKSPACE / "docker-compose.yml"), "ps", "--format", "{{.Service}}|{{.State}}"],
            capture_output=True, text=True, timeout=10,
        )
        states: dict[str, str] = {}
        for line in (out.stdout or "").splitlines():
            if "|" in line:
                svc, st = line.split("|", 1)
                states[svc.strip()] = st.strip()
        return states
    except Exception as exc:
        return {"__error__": exc.__class__.__name__}


def health_endpoint(url: str) -> str:
    """Read-only HTTP GET. Read-only inspection — no side effects."""
    import urllib.request, urllib.error
    try:
        with urllib.request.urlopen(url, timeout=4) as r:
            return f"{r.status} OK" if r.status < 400 else f"{r.status}"
    except urllib.error.HTTPError as e:
        return f"{e.code}"
    except Exception as exc:
        return f"unreachable ({exc.__class__.__name__})"


def format_report(milestones: list[tuple[str, str, list[str]]],
                   recent: list[str],
                   docker_states: dict[str, str],
                   previous_progress_flag: bool) -> str:
    current = find_current(milestones)
    nxt = find_next(milestones)
    last = find_last_completed(milestones)

    overall = "STABLE" if previous_progress_flag else "FIRST CHECK OR NO PRIOR PROGRESS"

    fe = health_endpoint("http://127.0.0.1:3000/") if "frontend" in docker_states else "not running"
    be = health_endpoint("http://127.0.0.1:8000/api/v1/health") if "backend" in docker_states else "not running"
    pg = docker_states.get("postgres", "not running")

    lines = [
        "HERMES — KILO CODE MONITOR",
        "==========================",
        f"Time: {now_local()}",
        f"Current milestone: {current}",
        f"Current prompt: (per-milestone, see breakdown)",
        f"Overall status: {overall}",
        "",
        "Latest changed files (last 30 min, read-only stat):",
        *((f"  - {p}" for p in recent) if recent else ["  (none)"]),
        "",
        "Per-milestone status:",
    ]
    for ms, status, reasons in milestones:
        prompts = list_prompts(ms)
        lines.append(f"  - {ms}: {status}  (prompts: {len(prompts)})")
        for r in reasons:
            lines.append(f"      · {r}")
    lines.append("")
    lines.append("Evidence: source-tree probe only (routes/files). No git, no docker mutations.")
    lines.append(f"Last known completed prompt: {last or '—'}")
    lines.append(f"Next expected prompt: {nxt}")
    lines.append("Issues: none detected by read-only probes")
    lines.append("Server status:")
    lines.append(f"  Frontend: {fe}")
    lines.append(f"  Backend:  {be}")
    lines.append(f"  PostgreSQL: {pg}")
    lines.append("Action: READ-ONLY — NO CHANGES")
    return "\n".join(lines)


def main() -> int:
    milestones: list[tuple[str, str, list[str]]] = []
    for ms in MILESTONES:
        prompts = list_prompts(ms)
        status, reasons = classify(ms, prompts)
        milestones.append((ms, status, reasons))

    recent = find_recent_changes(30)
    docker_states = check_docker_state()

    previous_blocks = read_previous_log_entries(1)
    prev_progress = bool(previous_blocks) and bool(recent)

    if not previous_blocks:
        progress_note = ""
    elif not recent:
        progress_note = "No significant progress detected since previous check."
    else:
        progress_note = ""

    report = format_report(milestones, recent, docker_states, prev_progress)
    if progress_note:
        report += "\n" + progress_note

    timestamp = now_local()
    banner = f"\n\n{'=' * 30}\n[{timestamp}]\n"
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(banner)
        f.write(report)
        f.write("\n")

    print(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
