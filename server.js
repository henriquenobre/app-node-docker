const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'API Node.js funcionando com Docker! 🐳',
    status: 'online',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/info',
      '/api/users',
      '/api/health'
    ]
  });
});

// Rota de informações
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Node.js Docker App',
    version: '1.0.0',
    description: 'Projeto de aprendizado Docker',
    hostname: process.env.HOSTNAME || 'localhost',
    nodeVersion: process.version,
    platform: process.platform
  });
});

// Rota de exemplo com dados
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@exemplo.com' }
  ];
  res.json(users);
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Rota de erro de exemplo
app.get('/api/error', (req, res) => {
  res.status(500).json({
    error: 'Erro simulado para testes',
    code: 'SIMULATED_ERROR'
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Acesse: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});