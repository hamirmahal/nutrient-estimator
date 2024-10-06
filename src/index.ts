import { marinara, vegetables } from "./parse";
import { type NutritionFacts, nutrients } from "./types";

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const theLCMOf = (a: number, b: number) => (a * b) / gcd(a, b);
const theCommonServingSizeFor = (foods: NutritionFacts[]) =>
  foods.reduce(
    (acc, food) => theLCMOf(acc, food["Serving Size (g)"]),
    foods[0]["Serving Size (g)"]
  );

const scaled = (food: NutritionFacts, scalingFactor: number) => {
  const scaledFood = { ...food };
  for (const nutrient of nutrients) {
    scaledFood[nutrient] = Number((food[nutrient] * scalingFactor).toFixed(1));
  }
  return scaledFood;
};

const getCombinedNutritionFactsFor = (foodsToCombine: NutritionFacts[]) => {
  const commonServingSize = theCommonServingSizeFor(foodsToCombine);
  const nutrientsToGetMoreOf = new Set([
    "Dietary Fiber (g)",
    "Protein (g)",
    "Vitamin D (mcg)",
    "Calcium (mg)",
    "Potassium (mg)",
  ]);

  const scaledFoods = foodsToCombine.map((food) => {
    const scalingFactor = commonServingSize / food["Serving Size (g)"];
    return scaled(food, scalingFactor);
  });

  return nutrients.reduce((obj, nutrient) => {
    const nutrientAmount = nutrientsToGetMoreOf.has(nutrient)
      ? Math.min(...scaledFoods.map((food) => food[nutrient]))
      : Math.max(...scaledFoods.map((food) => food[nutrient]));
    obj[nutrient] = nutrientAmount;
    return obj;
  }, {} as NutritionFacts);
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("correctly estimates nutrition facts for a dates and nut mix", () => {
    const DATES: NutritionFacts = {
      "Serving Size (g)": 40,
      Calories: 110,
      "Total Fat (g)": 0,
      "Saturated Fat (g)": 0,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 0,
      "Total Carbohydrates (g)": 30,
      "Dietary Fiber (g)": 3,
      "Total Sugars (g)": 25,
      "Added Sugars (g)": 0,
      "Protein (g)": 1,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 19,
      "Iron (mg)": 0.4,
      "Potassium (mg)": 260,
      "Copper (mg)": 0.1,
    };
    const NUTS: NutritionFacts = {
      "Serving Size (g)": 28,
      Calories: 170,
      "Total Fat (g)": 15,
      "Saturated Fat (g)": 2,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 0,
      "Total Carbohydrates (g)": 7,
      "Dietary Fiber (g)": 2,
      "Total Sugars (g)": 2,
      "Added Sugars (g)": 0,
      "Protein (g)": 5,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 40,
      "Iron (mg)": 1.3,
      "Potassium (mg)": 190,
      "Copper (mg)": 0,
    };
    const combinedNutritionFacts = getCombinedNutritionFactsFor([DATES, NUTS]);
    const commonServingSize = theCommonServingSizeFor([DATES, NUTS]);
    const datesFactor = commonServingSize / DATES["Serving Size (g)"];
    const mixedNutsFactor = commonServingSize / NUTS["Serving Size (g)"];
    expect(datesFactor).toBe(7);
    expect(mixedNutsFactor).toBe(10);
    expect(commonServingSize).toBe(280);
    expect(scaled(DATES, datesFactor)).toEqual({
      "Serving Size (g)": 280,
      Calories: 770,
      "Total Fat (g)": 0,
      "Saturated Fat (g)": 0,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 0,
      "Total Carbohydrates (g)": 210,
      "Dietary Fiber (g)": 21,
      "Total Sugars (g)": 175,
      "Added Sugars (g)": 0,
      "Protein (g)": 7,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 133,
      "Iron (mg)": 2.8,
      "Potassium (mg)": 1820,
      "Copper (mg)": 0.7,
    });
    expect(scaled(NUTS, mixedNutsFactor)).toEqual({
      "Serving Size (g)": 280,
      Calories: 1700,
      "Total Fat (g)": 150,
      "Saturated Fat (g)": 20,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 0,
      "Total Carbohydrates (g)": 70,
      "Dietary Fiber (g)": 20,
      "Total Sugars (g)": 20,
      "Added Sugars (g)": 0,
      "Protein (g)": 50,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 400,
      "Iron (mg)": 13,
      "Potassium (mg)": 1900,
      "Copper (mg)": 0,
    });
    expect(combinedNutritionFacts).toEqual({
      "Serving Size (g)": 280,
      Calories: 1700,
      "Total Fat (g)": 150,
      "Saturated Fat (g)": 20,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 0,
      "Total Carbohydrates (g)": 210,
      "Dietary Fiber (g)": 20,
      "Total Sugars (g)": 175,
      "Added Sugars (g)": 0,
      "Protein (g)": 7,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 133,
      "Iron (mg)": 13,
      "Potassium (mg)": 1820,
      "Copper (mg)": 0.7,
    });
  });

  it("correctly estimates nutrition facts for a marinara and vegetables mix", () => {
    const commonServingSize = theCommonServingSizeFor([marinara, vegetables]);
    const marinaraFactor = commonServingSize / marinara["Serving Size (g)"];
    const vegetablesFactor = commonServingSize / vegetables["Serving Size (g)"];
    const combinedNutritionFacts = getCombinedNutritionFactsFor([
      marinara,
      vegetables,
    ]);
    expect(theCommonServingSizeFor([marinara, vegetables])).toBe(10875);
    expect(marinaraFactor).toBe(87);
    expect(vegetablesFactor).toBe(125);
    expect(combinedNutritionFacts).toEqual({
      "Serving Size (g)": 10875,
      Calories: 8700,
      "Total Fat (g)": 609,
      "Saturated Fat (g)": 87,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 36540,
      "Total Carbohydrates (g)": 1500,
      "Dietary Fiber (g)": 87,
      "Total Sugars (g)": 375,
      "Added Sugars (g)": 0,
      "Protein (g)": 174,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 1740,
      "Iron (mg)": 125,
      "Potassium (mg)": 24500,
      "Copper (mg)": 0,
    });
  });
}
