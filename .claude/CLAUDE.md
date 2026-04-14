# CVMC Project - Claude Code Instructions

## Project Overview
CVMC (Como Vai o Meu Corinthians) - Full-stack data platform and web portfolio for Data Engineering interviews.

## Tech Stack
- **Data:** Apache Airflow, Jupyter, PostgreSQL, MinIO
- **Web:** Next.js 14, Tailwind CSS, Framer Motion
- **AI:** Google Gemini AI

## Key Guidelines
- Use **raw SQL** for Postgres (portfolio requirement)
- Follow Medallion Architecture: Landing → Raw → Silver → Gold
- Work on feature branches, base is `main`

## Server
- `ubuntu@163.176.241.242` at `~/CVMC-data`
- Deploy: `git fetch && git reset --hard && docker compose up -d --build website`
- URL: https://soccerdataplatform.duckdns.org/
