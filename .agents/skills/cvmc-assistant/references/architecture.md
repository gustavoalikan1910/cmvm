# Arquitetura de Dados CVMC

A plataforma CVMC utiliza uma arquitetura Medalhão (Medallion Architecture) adaptada para ingestão e processamento de dados de futebol.

## Fluxo de Ingestão
1.  **Landing (MinIO/S3):** Dados brutos extraídos via Scrapers (Jupyter Notebooks).
2.  **Raw (Delta Table):** Landing convertida para formato Delta, com suporte a schema evolution.
3.  **Silver (Delta Table):** Dados limpos, deduplicados e normalizados.
4.  **Gold (Postgres):** Tabelas relacionais otimizadas para consumo pelo Website.

## Componentes Técnicos
- **Orquestração:** Apache Airflow (`airflow/dags/`).
- **Ingestão/Transformação:** Jupyter Notebooks (`jupyter/notebooks/`).
- **Banco de Dados:** PostgreSQL (Camada Gold).
- **Armazenamento:** MinIO (Camada Landing/Raw/Silver).

## Padrões de Nomenclatura
- Dags: `cvmc_pipeline__[nome-do-campeonato]__[ano].py`
- Tabelas Gold (Postgres): `gold_[nome-da-tabela]`
