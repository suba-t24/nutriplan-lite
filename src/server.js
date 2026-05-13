const express = require('express');
const path = require('path');
const { generateMealPlan } = require('./mealService');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'NutriPlan Lite' });
});

app.post('/api/meal-plan', (req, res) => {
  try {
    const plan = generateMealPlan(req.body);
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`NutriPlan Lite running on port ${port}`);
  });
}

module.exports = app;
