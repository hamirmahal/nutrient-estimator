export type NutritionFacts = Record<(typeof nutrients)[number], number>;
export const nutrients = [
  "Serving Size (g)",
  "Calories",
  "Total Fat (g)",
  "Saturated Fat (g)",
  "Cholesterol (mg)",
  "Sodium (mg)",
  "Total Carbohydrates (g)",
  "Dietary Fiber (g)",
  "Total Sugars (g)",
  "Added Sugars (g)",
  "Protein (g)",
  "Vitamin D (mcg)",
  "Calcium (mg)",
  "Iron (mg)",
  "Potassium (mg)",
  "Copper (mg)",
] as const;
