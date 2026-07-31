// server.js
const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');

const app = express();
const db = new Database('./devmonitor.db');
app.use(express.json());
app.use(cors());
app.use(express.json());
// Listar todos os serviços com status mais recente
app.get('/api/services', (req, res) => {
  const query = `
    SELECT s.id, s.name, s.url,
           c.is_up, c.response_time_ms, c.checked_at
    FROM services s
    LEFT JOIN checks c ON c.id = (
      SELECT id FROM checks WHERE service_id = s.id ORDER BY checked_at DESC LIMIT 1
    )
  `;
  try {
    const rows = db.prepare(query).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar novo serviço para monitorar
app.post('/api/services', (req, res) => {
  const { name, url } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO services (name, url) VALUES (?, ?)');
    const info = stmt.run(name, url);
    res.status(201).json({ id: info.lastInsertRowid, name, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Histórico de checagens de um serviço
app.get('/api/services/:id/history', (req, res) => {
  try {
    const rows = db.prepare(
      'SELECT * FROM checks WHERE service_id = ? ORDER BY checked_at DESC LIMIT 50'
    ).all(req.params.id);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('API rodando na porta 3001'));