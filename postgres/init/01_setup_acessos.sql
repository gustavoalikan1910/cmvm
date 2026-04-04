CREATE SCHEMA IF NOT EXISTS acessos;
CREATE SCHEMA IF NOT EXISTS silver;
CREATE SCHEMA IF NOT EXISTS gold;

CREATE TABLE IF NOT EXISTS acessos.usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),          -- agora pode ser null inicialmente
    db_user VARCHAR(100),             -- armazena o nome da role no postgres
    token_seguranca VARCHAR(255),     -- para ativar conta ou recuperar senha
    token_expiracao TIMESTAMP,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo um usuário administrador padrão (senha: admin123)
-- Hash bcrypt gerado para "admin123": $2a$10$OHjjpmvB0OE10qdILmTrH.Vpt6iapFSAyvib/NCAcsgy7Lqjl4q7K
INSERT INTO acessos.usuarios (nome, email, senha_hash, db_user)
VALUES ('Admin Portfólio', 'admin@cvmc.com', '$2a$10$OHjjpmvB0OE10qdILmTrH.Vpt6iapFSAyvib/NCAcsgy7Lqjl4q7K', 'admin_portfolio')
ON CONFLICT (email) DO UPDATE SET senha_hash = EXCLUDED.senha_hash;
