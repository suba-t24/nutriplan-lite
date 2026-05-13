const request = require('supertest');
const app = require('../src/server');

describe('NutriPlan Lite API', () => {
  test('GET /health returns service status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('POST /api/meal-plan returns meal plan for valid profile', async () => {
    const response = await request(app)
      .post('/api/meal-plan')
      .send({
        age: 25,
        weightKg: 65,
        heightCm: 165,
        gender: 'female',
        activityLevel: 'moderate'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('calories');
    expect(response.body).toHaveProperty('meals');
  });

  test('POST /api/meal-plan returns 400 for invalid profile', async () => {
    const response = await request(app)
      .post('/api/meal-plan')
      .send({ age: 0, weightKg: 65, heightCm: 165 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
