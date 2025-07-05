const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Configuração CORS para liberar todas as origens (só para desenvolvimento)
app.use(cors());

// Permitir leitura do corpo da requisição como JSON
app.use(express.json());

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/', (req, res) => {
  res.send('API To Do List rodando 🚀');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

  const newItem = { id: Date.now(), name };
  items.push(newItem);

  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item não encontrado' });

  item.name = name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item não encontrado' });

  items.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
