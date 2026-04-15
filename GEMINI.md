# CVMC Project - Gemini CLI Instructions

## Project Overview
CVMC (Como Vai o Meu Corinthians) - Full-stack data platform and web portfolio for Data Engineering interviews.

## Tech Stack
- **Data Platform:** Apache Airflow, Jupyter Notebooks, PostgreSQL, MinIO (S3)
- **Web:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **AI:** Google Gemini AI
- **Auth:** JWT manual (Web Crypto API, Edge Runtime compatible)

## Session Start
At the beginning of every new session, run `powershell -ExecutionPolicy Bypass -File sync-skills.ps1` to sync skills before doing anything else.

## Development Guidelines
- Use **raw SQL** for all Postgres queries (portfolio requirement)
- Follow Medallion Architecture: `Landing (MinIO) → Raw → Silver → Gold`
- Work on feature branches, base is always `main`
- After completing changes, push branch for PR and manual review

## Deployment
- Server: `ubuntu@163.176.241.242` at `~/CVMC-data`
- Deploy: `git fetch && git reset --hard && docker compose up -d --build website`
- URL: https://soccerdataplatform.duckdns.org/

## Skills System
Skills are located in `.gemini/skills/`. Each skill is a directory containing a `SKILL.md` file.

To use a skill, call the `activate_skill` tool with the skill name. The tool loads the full skill content, which provides specialized behavior and context.

### Available Skills
- **cvmc-assistant** — Full-Stack Data Engineer assistant specialized for CVMC. Covers Airflow DAGs, Jupyter notebooks, raw SQL, Next.js 14 web development, and Tailwind CSS. Activate before any CVMC task.

### Skill Discovery
At session start, scan `.gemini/skills/` and register available skill names. When the user requests a task that matches a skill's description, activate it automatically before responding.

### Tool Mapping (Gemini CLI equivalents)
| Claude Code Tool | Gemini CLI Equivalent |
|------------------|-----------------------|
| `Read`           | `read_file`           |
| `Write`          | `write_file`          |
| `Edit`           | `replace_in_file`     |
| `Bash`           | `run_shell_command`   |
| `Glob`           | `glob`                |
| `Grep`           | `grep`                |
| `activate_skill` | `activate_skill`      |
