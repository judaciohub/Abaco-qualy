const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Porta configurável via env PORT, padrão 3034
const PORT = parseInt(process.env.PORT, 10) || 3034;

// Servir arquivos estáticos do diretório atual (onde está index.html)
const publicDir = path.resolve(__dirname);
app.use(express.static(publicDir));

// Permitir JSON no body
app.use(express.json());

// Local de armazenamento simples em arquivo
const dataDir = path.resolve(__dirname, 'data');
const reportsFile = path.join(dataDir, 'reports.json');

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(reportsFile)) fs.writeFileSync(reportsFile, '[]', 'utf8');
}

function readReports() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(reportsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Erro lendo reports.json:', err);
    return [];
  }
}

function writeReports(arr) {
  ensureDataFile();
  fs.writeFileSync(reportsFile, JSON.stringify(arr, null, 2), 'utf8');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// API: listar relatórios
app.get('/api/reports', (req, res) => {
  const reports = readReports();
  res.json(reports);
});

// API: obter relatório por id
app.get('/api/reports/:id', (req, res) => {
  const reports = readReports();
  const id = req.params.id;
  const report = reports.find(r => String(r.id) === String(id));
  if (!report) return res.status(404).json({ error: 'Relatório não encontrado' });
  res.json(report);
});

// API: criar novo relatório
app.post('/api/reports', (req, res) => {
  const { title, datetime, counts } = req.body;
  if (!counts || typeof counts !== 'object') return res.status(400).json({ error: 'Payload inválido: counts esperado' });

  const reports = readReports();
  const id = Date.now();
  const report = {
    id,
    title: title || `Contagem ${new Date().toLocaleString('pt-BR')}`,
    datetime: datetime || new Date().toISOString(),
    counts,
  };
  reports.push(report);
  writeReports(reports);
  res.status(201).json(report);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado em http://0.0.0.0:${PORT} (acessível por qualquer IP)`);
  console.log('Pressione CTRL+C para parar');
});
