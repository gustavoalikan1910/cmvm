# CVMC Project - Agent Instructions

## Project Overview
CVMC (Como Vai o Meu Corinthians) - A full-stack data platform and web portfolio for Data Engineering interviews.

## Tech Stack
- **Data Platform:** Apache Airflow, Jupyter Notebooks, PostgreSQL, MinIO (S3)
- **Web:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **AI:** Google Gemini AI
- **Database:** PostgreSQL with raw SQL
- **Auth:** JWT authentication

## Data Architecture
Medallion Architecture: `Landing (MinIO) → Raw (Delta) → Silver (Delta) → Gold (Postgres)`

## Session Start
At the beginning of every new session, run `powershell -ExecutionPolicy Bypass -File sync-skills.ps1` to sync skills before doing anything else.

## Development Guidelines
- Use **raw SQL** for all Postgres queries (portfolio requirement)
- Follow the data layer architecture strictly
- Write clean code with error handling and detailed logs
- Work on feature branches, base is always `main`

## Skills & References
- Project skills are available in `.qwen/skills/`, `.gemini/skills/`, and `.claude/skills/`
- Data architecture: see `references/architecture.md` in each skill directory
- All three tools (Qwen, Gemini, Claude) use the same `SKILL.md` format

## Deployment
- Server: `ubuntu@163.176.241.242` at `~/CVMC-data`
- Deploy command: `git fetch && git reset --hard && docker compose up -d --build website`
- URL: https://soccerdataplatform.duckdns.org/
