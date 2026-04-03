CREATE SCHEMA IF NOT EXISTS acessos;

CREATE TABLE IF NOT EXISTS acessos.usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo um usuário administrador padrão (senha: admin123)
-- Hash bcrypt gerado para "admin123": $2y$10$tZ2E7oK1wzN0T.5iWb/sNuG.s/N1G.6M/n6I2t958u/C.eR/A3KcC
INSERT INTO acessos.usuarios (nome, email, senha_hash)
VALUES ('Admin Portfólio', 'admin@cvmc.com', '$2b$10$tZ2E7oK1wzN0T.5iWb/sNuG.s/N1G.6M/n6I2t958u/C.eR/A3KcC')
ON CONFLICT (email) DO NOTHING;
