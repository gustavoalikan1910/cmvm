# CVMC Server — Conexão e Operações

Servidor Oracle Cloud onde roda o ambiente de produção do CVMC.

## Dados de Conexão

| Campo  | Valor                                        |
|--------|----------------------------------------------|
| Host   | `ubuntu@163.176.241.242`                     |
| Chave  | `C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk` |
| Tool   | `C:\Program Files\PuTTY\plink.exe`           |
| Dir    | `~/CVMC-data`                                |
| URL    | https://soccerdataplatform.duckdns.org/      |

## Como Executar Comandos Remotos

Use `plink` via PowerShell para rodar comandos no servidor sem abrir sessão interativa:

```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 '<comando>'"
```

**Importante:** Use `-batch` para evitar prompts interativos. Aspas simples dentro do comando remoto funcionam normalmente.

## Comandos Comuns

### Deploy do website
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'cd ~/CVMC-data && git fetch && git reset --hard && docker compose up -d --build website'"
```

### Verificar status dos containers
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'cd ~/CVMC-data && docker compose ps'"
```

### Ver logs do website
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'cd ~/CVMC-data && docker compose logs --tail=50 website'"
```

### Git — atualizar main e limpar branches
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'cd ~/CVMC-data && git fetch --prune && git checkout main && git pull'"
```

## Conexão ao PostgreSQL via Python

O psql dentro do container `cvmc-postgres` não tem o binário acessível diretamente. A forma correta é usar o container `cvmc-airflow-scheduler`, que tem psycopg2 e psql instalados, usando o hostname interno `postgres`.

### Credenciais
| Campo | Valor |
|-------|-------|
| Host (interno) | `postgres` |
| Usuário | `airflow` |
| Senha | `airflow` |
| Banco | `cvmc_data` |

### Método — Upload de script Python + docker cp + exec

1. Escrever o script Python localmente (`c:/tmp/meu_script.py`)
2. Fazer upload com pscp:
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\pscp.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch 'c:/tmp/meu_script.py' 'ubuntu@163.176.241.242:/tmp/meu_script.py'"
```
3. Copiar pro container e executar:
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'docker cp /tmp/meu_script.py cvmc-airflow-scheduler:/tmp/meu_script.py && docker exec cvmc-airflow-scheduler python3 /tmp/meu_script.py'"
```

### Template do script Python
```python
import psycopg2

conn = psycopg2.connect(host="postgres", user="airflow", password="airflow", dbname="cvmc_data")
cur = conn.cursor()

cur.execute("SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast') ORDER BY schema_name")
schemas = [r[0] for r in cur.fetchall()]

cur.execute("""
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_schema = 'gold'
    ORDER BY table_name
""")
tables = cur.fetchall()

cur.close()
conn.close()
```

### Alternativa — pipe via stdin (para comandos simples sem aspas complexas)
```powershell
powershell -Command "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' -batch ubuntu@163.176.241.242 'echo PGPASSWORD=airflow psql -h postgres -U airflow -d cvmc_data -l | docker exec -i cvmc-airflow-scheduler bash'"
```

> **Importante:** Não usar `docker exec cvmc-postgres psql` diretamente — o usuário `postgres` não existe no container. Sempre usar o `cvmc-airflow-scheduler` com host `postgres`.
