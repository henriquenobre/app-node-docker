# Dockerfile corrigido
FROM node:18-alpine

WORKDIR /app

# Copiar apenas package primeiro (melhor cache)
COPY package*.json ./
RUN npm install --only=production  # MUDADO: de 'ci' para 'install'

# Copiar o resto
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]