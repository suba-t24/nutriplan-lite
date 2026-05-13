const {
  calculateDailyCalories,
  getCalorieCategory,
  generateMealPlan
} = require('../src/mealService');

describe('NutriPlan Lite meal service', () => {
  test('calculates daily calories for a valid female profile', () => {
    const calories = calculateDailyCalories(25, 65, 165, 'female', 'moderate');
    expect(calories).toBeGreaterThan(1800);
  });

  test('categorises calories below 1800 as light', () => {
    expect(getCalorieCategory(1600)).toBe('light');
  });

  test('categorises calories between 1800 and 2400 as balanced', () => {
    expect(getCalorieCategory(2100)).toBe('balanced');
  });

  test('categorises calories above 2400 as high-energy', () => {
    expect(getCalorieCategory(2600)).toBe('high-energy');
  });

  test('generates a meal plan with calories and meals', () => {
    const plan = generateMealPlan({
      age: 25,
      weightKg: 65,
      heightCm: 165,
      gender: 'female',
      activityLevel: 'moderate'
    });

    expect(plan).toHaveProperty('calories');
    expect(plan).toHaveProperty('category');
    expect(plan.meals).toHaveProperty('breakfast');
    expect(plan.meals).toHaveProperty('lunch');
    expect(plan.meals).toHaveProperty('dinner');
  });

  test('throws error for invalid profile values', () => {
    expect(() => calculateDailyCalories(0, 65, 165, 'female', 'moderate')).toThrow('Invalid profile values');
  });
});
