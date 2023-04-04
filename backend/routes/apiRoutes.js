// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const pizzaData = require('../pizzas.json');
const allergensData = require('../allergens.json');

router.get('/pizzas', (req, res) => {
  res.json(pizzaData);
});

router.get('/allergens', (req, res) => {
  res.json(allergensData);
});

module.exports = router;
