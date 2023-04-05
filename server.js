import config from './app/config.js';
import express from 'express';
import rootRoute from './routes/root.route.js';
import fs from 'node:fs/promises';

const server = express();

server.use(express.static('public'));
server.use('/', rootRoute);

async function readJSONFile(filePath) {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

server.get('/api/pizza', async (req, res) => {
  const pizzas = await readJSONFile('./data/pizzas.json');
  res.json(pizzas);
});

server.get('/api/allergen', async (req, res) => {
  const allergens = await readJSONFile('./data/allergens.json');
  res.json(allergens);
});

server.listen(config.api.port, () => console.log(`Server listening on http://localhost:${config.api.port}`));
