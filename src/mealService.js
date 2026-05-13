function calculateDailyCalories(age, weightKg, heightCm, gender, activityLevel) {
  if (!age || !weightKg || !heightCm || age <= 0 || weightKg <= 0 || heightCm <= 0) {
    throw new Error('Invalid profile values');
  }

  const normalizedGender = String(gender || '').toLowerCase();
  const normalizedActivity = String(activityLevel || 'moderate').toLowerCase();

  let bmr;
  if (normalizedGender === 'female') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }

  const activityMultipliers = {
    low: 1.2,
    moderate: 1.55,
    high: 1.725
  };

  const multiplier = activityMultipliers[normalizedActivity] || activityMultipliers.moderate;
  return Math.round(bmr * multiplier);
}

function getCalorieCategory(calories) {
  if (calories < 1800) return 'light';
  if (calories <= 2400) return 'balanced';
  return 'high-energy';
}

function generateMealPlan(profile) {
  const calories = calculateDailyCalories(
    Number(profile.age),
    Number(profile.weightKg),
    Number(profile.heightCm),
    profile.gender,
    profile.activityLevel
  );

  const category = getCalorieCategory(calories);

  const plans = {
    light: {
      breakfast: 'Oats with banana and low-fat milk',
      lunch: 'Grilled vegetable wrap with yoghurt',
      dinner: 'Lentil soup with salad',
      snack: 'Apple slices with peanut butter'
    },
    balanced: {
      breakfast: 'Scrambled eggs with wholegrain toast',
      lunch: 'Chicken rice bowl with vegetables',
      dinner: 'Paneer curry with chapathi and salad',
      snack: 'Greek yoghurt with berries'
    },
    'high-energy': {
      breakfast: 'Peanut butter toast with smoothie',
      lunch: 'Brown rice with chickpea curry',
      dinner: 'Salmon or tofu bowl with quinoa',
      snack: 'Trail mix and fruit'
    }
  };

  return {
    calories,
    category,
    meals: plans[category]
  };
}

module.exports = {
  calculateDailyCalories,
  getCalorieCategory,
  generateMealPlan
};
