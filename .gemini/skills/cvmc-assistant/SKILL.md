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
- **Estética:** Dark Mode Premium (`#050505`), Bento Grid, Glassmorphism (backdrop-blur), e Ambient Glows.
- **Layout Global:** O fundo de grid e luzes deve ser mantido no `layout.jsx` para herança global.
- **Imagens:** Utilize ativos oficiais em `website/public/assets/` (ex: `simbolo_CP.png`).

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
