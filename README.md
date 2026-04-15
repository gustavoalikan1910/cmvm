# CVMC — Como Vai o Meu Corinthians?

Plataforma de engenharia de dados + portfólio web de Data Engineering.

**Produção:** https://soccerdataplatform.duckdns.org/

## Arquitetura de Dados

```
Scraper (Jupyter) → Landing (MinIO) → Raw (Delta) → Silver (Delta) → Gold (Postgres) → Website (Next.js)
```

## Serviços

| Serviço  | Descrição                              | Porta |
|----------|----------------------------------------|-------|
| Website  | Portfólio Next.js 14 com métricas live | 3000  |
| Airflow  | Orquestração de pipelines              | 8080  |
| Jupyter  | Notebooks de scraping e transformação  | 8888  |
| MinIO    | Data Lake (Landing, Raw, Silver)       | 9001  |
| Postgres | Camada Gold + banco da aplicação       | 5432  |

## Camadas de Dados

- **Landing** — dados brutos do scraper salvos no MinIO
- **Raw** — Delta Table com autoloader e schema evolution
- **Silver** — Delta Table com deduplicação e limpeza
- **Gold** — tabelas relacionais no Postgres para consumo

## Stack Web

- **Framework:** Next.js 14 (App Router, Server Components)
- **Estilo:** Tailwind CSS + Framer Motion
- **Banco:** PostgreSQL via `pg` com raw SQL
- **Auth:** JWT com Web Crypto API (Edge Runtime compatible)
- **AI:** Google Gemini AI

## Como subir o ambiente

```bash
cp .env.example .env
# edite o .env com suas credenciais
docker compose up -d
```

## Deploy em produção

```bash
# No servidor ubuntu@163.176.241.242 em ~/CVMC-data
git fetch && git reset --hard && docker compose up -d --build website
```

## Estrutura

```
cmvm/
├── airflow/
│   └── dags/
├── jupyter/
│   └── notebooks/
│       ├── scraper/
│       ├── transform/
│       └── analysis/
├── postgres/
│   └── init/
├── website/                  # Next.js 14
│   ├── app/
│   ├── components/
│   └── lib/
├── AGENTS.md                 # Config Qwen Code
├── GEMINI.md                 # Config Gemini CLI
└── .claude/CLAUDE.md         # Config Claude Code
```

## Agentes de IA

O projeto suporta 3 agentes com skills compartilhadas:

| Agente      | Config          | Skills              |
|-------------|-----------------|---------------------|
| Claude Code | `.claude/CLAUDE.md` | `.claude/skills/`  |
| Gemini CLI  | `GEMINI.md`     | `.gemini/skills/`   |
| Qwen Code   | `AGENTS.md`     | `.qwen/skills/`     |

A fonte central das skills fica em `.agents/skills/`. Para sincronizar:

```powershell
.\sync-skills.ps1
```
