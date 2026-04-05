FROM ubuntu:22.04

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza e instala dependências básicas
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    git \
 && rm -rf /var/lib/apt/lists/*

# Diretório de trabalho
WORKDIR /app

# Expor a porta da Web UI (ajuste se necessário)
EXPOSE 18789

# Mantém o container rodando
CMD ["bash"]
