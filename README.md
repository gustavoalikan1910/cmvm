# CVMC Data Platform

Plataforma de engenharia de dados para coleta e processamento de dados de futebol.

## Arquitetura
```
Scraper (Jupyter) → Landing (MinIO) → Raw (Delta) → Silver (Delta) → Gold (Postgres)
```

## Serviços

| Serviço | Descrição | Porta |
|---|---|---|
| Airflow | Orquestração e agendamento | 8080 |
| Jupyter | Notebooks de scraping e transformação | 8888 |
| MinIO | Data Lake (Landing, Raw, Silver) | 9001 |
| Postgres | Camada Gold | 5432 |

## Camadas

- **Landing** — dados brutos do scraper salvos no MinIO
- **Raw** — Delta Table com autoloader e schema evolution
- **Silver** — Delta Table com deduplicação e limpeza
- **Gold** — tabelas relacionais no Postgres para consumo

## Como subir o ambiente
```bash
cp .env.example .env
# edite o .env com suas credenciais
docker compose up -d
```

## Estrutura
```
CVMC-data/
├── docker-compose.yml
├── .env.example
├── airflow/
│   └── dags/
├── jupyter/
│   ├── Dockerfile
│   └── notebooks/
│       ├── scraper/
│       ├── transform/
│       └── analysis/
├── minio/
└── postgres/
    └── init/
```


