# Agent Skills - CVMC Project

Este diretório contém as instruções e skills para AI coding assistants.

## Estrutura

```
cmvm/
├── AGENTS.md                    # Instruções globais (Claude Code, Codex, etc.)
├── .claude/
│   └── CLAUDE.md               # Instruções específicas para Claude Code
├── .qwen/
│   ├── settings.json           # Configurações do Qwen Code
│   └── skills/
│       └── cvmc-assistant/     # Skill do Qwen Code
│           ├── SKILL.md
│           └── references/
├── .gemini/
│   └── skills/
│       └── cvmc-assistant/     # Skill do Gemini CLI
│           ├── SKILL.md
│           └── references/
└── .agents/                    # Legacy/Backup
    └── cvmc-assistant.skill
```

## Ferramentas Suportadas

| Ferramenta | Arquivo Principal | Formato |
|------------|-------------------|---------|
| **Qwen Code** | `.qwen/skills/<name>/SKILL.md` | SKILL.md com frontmatter YAML |
| **Gemini CLI** | `.gemini/skills/<name>/SKILL.md` | SKILL.md com frontmatter YAML |
| **Claude Code** | `AGENTS.md` ou `.claude/CLAUDE.md` | Markdown simples |
| **Codex** | `AGENTS.md` | Markdown simples |

## Como Adicionar Nova Skill

1. Crie a pasta em `.qwen/skills/<skill-name>/` e `.gemini/skills/<skill-name>/`
2. Adicione `SKILL.md` com frontmatter YAML (name + description)
3. Adicione arquivos de referência em `references/` se necessário
4. Commit e push - colegas recebem automaticamente via `git pull`

## SKILL.md Format

```yaml
---
name: nome-do-skill
description: O que faz e quando usar. Inclua palavras-chave.
---

# Nome do Skill

## Instructions
...

## Examples
- "Exemplo de comando do usuário"
```

## Sincronização

Para manter skills sincronizados entre Qwen e Gemini:
- Use o mesmo conteúdo de `SKILL.md` em ambos os diretórios
- Commit em ambos os diretórios (`.qwen/skills/` e `.gemini/skills/`)
- Ou use um script para sincronizar automaticamente
