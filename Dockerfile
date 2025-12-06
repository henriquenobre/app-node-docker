# Use imagem menor
FROM node:18-alpine

WORKDIR /app

# Copiar apenas package primeiro (melhor cache)
COPY package*.json ./
RUN npm ci --only=production

# Copiar o resto
COPY . .

# Saúde check para Kubernetes
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if(r.statusCode!==200)throw new Error()})"

EXPOSE 3000

# Usar node diretamente (melhor que npm start)
USER node
CMD ["node", "server.js"]