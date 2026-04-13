---
name: cvmc-assistant
description: Assistente Full-Stack Data Engineer para o projeto CVMC. Especialista em pipelines de dados de futebol (Corinthians) e desenvolvimento web premium com Next.js.
---

# CVMC Assistant (Data Engineer & Web Portfolio)

Esta skill transforma o Gemini CLI em um Assistente especializado para o projeto CVMC (Como vai o meu Corinthians?). Ela foca em Engenharia de Dados de alto nível e um Website portfólio moderno.

## Princípios de Operação

### 1. Fluxo de Git & Produção
- **Trabalho em Branches:** Sempre use branches de funcionalidade (e.g., `feature/update-prod-env`). Base: `main`.
- **Credenciais Locais:** Se ocorrer erro 403 no push, verifique se o usuário local (ex: `gustavoalikanwm`) é colaborador no repo `gustavoalikan1910/cmvm`.
- **Conexão SSH:** Use `plink.exe` com a chave em `C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk`.
- **Servidor:** `ubuntu@163.176.241.242` no diretório `~/CVMC-data`.

### 2. Engenharia de Dados (Timão Stack)
- **Tecnologias:** Python, **Spark**, Jupyter Notebooks, Airflow e MinIO. (Nota: Selenium não é utilizado).
- **SQL Puro:** Consultas e transformações no Postgres para transparência e performance.
- **Camadas:** Landing (MinIO) -> Silver (Postgres/Delta) -> Gold (Postgres Analítico).
- **Terminologia de Banco:** Utilize sempre `HOSTNAME`, `PORT`, `USERNAME`, `DATABASE`, `PASSWORD`.

### 3. Website V2 (Bento Grid Design)
- **Framework:** Next.js 14 (App Router) + Tailwind CSS + PostCSS.
- **Estética:** Dark Mode Premium (`#050505`), Bento Grid, Glassmorphism (backdrop-blur), e Ambient Glows (agora utilizando tons de cinza escuro/zinco ao invés de roxo/azul para um ar mais profissional e limpo).
- **Layout Global:** O fundo de grid e luzes deve ser mantido no `layout.jsx` para herança global.
- **Imagens:** Utilize ativos oficiais em `website/public/assets/` (ex: `simbolo_CP.png`).
- **Páginas Principais & Funcionalidades:**
  - **Página Inicial (`/`):** 
    - Atua como a vitrine do pipeline "Production Ready".
    - **Integração Dinâmica (Postgres):** Possui um componente de Servidor Next.js (`page.jsx`) que busca estatísticas em tempo real:
      - O *Status* (Selo Active/Inactive) e o *Uptime Pipelines* consultam a tabela `dag_run` do Airflow para a DAG `cvmc_pipeline__brasileirao-serie-a__2026`.
      - Os *Eventos Processados* somam o total de tuplas (`n_live_tup`) do schema `gold` usando a visão de sistema `pg_stat_user_tables`.
      - A *Latência Queries* calcula a velocidade real de resposta dessas consultas com `performance.now()`.
    - Exibe um resumo em formato Bento Grid das camadas de dados (Ingestão, Silver, Gold).
  - **Arquitetura (`/arquitetura`):**
    - Rota exclusiva que documenta de forma visual o ciclo de vida do dado na CVMC (Timeline).
    - Ordem exata: 1. Orquestração (Airflow), 2. Ingestão (Scrapers), 3. Raw (Data Lake/Autoloader), 4. Silver (Cleansing), 5. Gold (Analytics), 6. Acesso & Visualização.
    - Estilo limpo e técnico (bolinhas cinza/prata).
  - **Autenticação (`/login` e `/cadastro`):**
    - Interface imersiva "Cyber-Glass" no estilo de terminal seguro.
    - Textos todos localizados em Português (PT-BR) de forma técnica (Ex: "Acesso Restrito", "Criar Conta", "Operador").

### 4. Deploy & Docker (Produção)
- **Modo Produção:** No servidor, o website deve rodar com `npm start` (configurado no `docker-compose.yml`).
- **Volumes:** **NUNCA** monte o volume `./website:/app` em produção, pois ele sobrescreve o build otimizado.
- **Rebuild Obrigatório:** Após qualquer mudança de CSS ou configuração, use: 
  `docker compose up -d --build website`

## Quando usar esta Skill
Use sempre que estiver operando no diretório `C:\repos\cmvm` para:
- Manutenção de pipelines de dados do Corinthians.
- Deploy e ajustes finos no ambiente Oracle Cloud.
- Evolução do design "Cyber-Glass" do website.
- Sincronização entre ambiente local e produção.

## Referências Úteis
- Arquitetura de Dados: [architecture.md](references/architecture.md)
