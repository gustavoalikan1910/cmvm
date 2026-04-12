---
description: Conectar via SSH no servidor Oracle Cloud CVMC
---

## Conexão SSH no Servidor de Produção

Use este workflow para abrir uma sessão SSH interativa no servidor Oracle Cloud da CVMC.

### Opção 1: Terminal Interativo Completo (recomendado)
Abre uma janela nova do PowerShell com sessão SSH ativa:

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "& 'C:\Program Files\PuTTY\plink.exe' -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' ubuntu@163.176.241.242 -t 'bash -l'"
```

### Opção 2: Executar um comando pontual no servidor
Substitua `<COMANDO>` pelo que deseja executar:

```powershell
& "C:\Program Files\PuTTY\plink.exe" -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' ubuntu@163.176.241.242 "<COMANDO>"
```

### Exemplos de comandos prontos:

**Ver containers rodando:**
```powershell
& "C:\Program Files\PuTTY\plink.exe" -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' ubuntu@163.176.241.242 "docker ps"
```

**Ver logs do website:**
```powershell
& "C:\Program Files\PuTTY\plink.exe" -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' ubuntu@163.176.241.242 "cd CVMC-data && docker compose logs --tail 20 website"
```

**Consultar banco de dados:**
```powershell
& "C:\Program Files\PuTTY\plink.exe" -i 'C:\Users\GustavoAlikanFeverei\Downloads\private_key_oracle.ppk' ubuntu@163.176.241.242 "docker exec -i cvmc-postgres psql -U airflow -d cvmc_data -c 'SELECT schemaname, tablename FROM pg_tables WHERE schemaname IN (''silver'',''gold'');'"
```

### Credenciais (guardadas no registro do PuTTY)
- **Host:** `163.176.241.242`
- **Usuário:** `ubuntu`
- **Chave:** `C:\Users\gufev\Downloads\private_key_oracle.ppk`
- **Projeto:** `~/CVMC-data`
