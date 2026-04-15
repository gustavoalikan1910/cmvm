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
