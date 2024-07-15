const nutrients = [
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
type NutritionFacts = Record<(typeof nutrients)[number], number>;
const nutrientsToGetMoreOf = new Set([
  "Dietary Fiber (g)",
  "Protein (g)",
  "Vitamin D (mcg)",
  "Calcium (mg)",
  "Potassium (mg)",
]);
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
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const theLCMOf = (a: number, b: number) => (a * b) / gcd(a, b);
const commonServingSize = theLCMOf(
  DATES["Serving Size (g)"],
  NUTS["Serving Size (g)"]
);
const datesFactor = commonServingSize / DATES["Serving Size (g)"];
const mixedNutsFactor = commonServingSize / NUTS["Serving Size (g)"];
const scaledDates: NutritionFacts = {
  "Serving Size (g)": commonServingSize,
  Calories: DATES.Calories * datesFactor,
  "Total Fat (g)": DATES["Total Fat (g)"] * datesFactor,
  "Saturated Fat (g)": DATES["Saturated Fat (g)"] * datesFactor,
  "Cholesterol (mg)": DATES["Cholesterol (mg)"] * datesFactor,
  "Sodium (mg)": DATES["Sodium (mg)"] * datesFactor,
  "Total Carbohydrates (g)": DATES["Total Carbohydrates (g)"] * datesFactor,
  "Dietary Fiber (g)": DATES["Dietary Fiber (g)"] * datesFactor,
  "Total Sugars (g)": DATES["Total Sugars (g)"] * datesFactor,
  "Added Sugars (g)": DATES["Added Sugars (g)"] * datesFactor,
  "Protein (g)": DATES["Protein (g)"] * datesFactor,
  "Vitamin D (mcg)": DATES["Vitamin D (mcg)"] * datesFactor,
  "Calcium (mg)": DATES["Calcium (mg)"] * datesFactor,
  "Iron (mg)": Number((DATES["Iron (mg)"] * datesFactor).toFixed(1)),
  "Potassium (mg)": DATES["Potassium (mg)"] * datesFactor,
  "Copper (mg)": Number((DATES["Copper (mg)"] * datesFactor).toFixed(2)),
};
const scaledUnsaltedMixedNuts: NutritionFacts = {
  "Serving Size (g)": commonServingSize,
  Calories: NUTS.Calories * mixedNutsFactor,
  "Total Fat (g)": NUTS["Total Fat (g)"] * mixedNutsFactor,
  "Saturated Fat (g)": NUTS["Saturated Fat (g)"] * mixedNutsFactor,
  "Cholesterol (mg)": NUTS["Cholesterol (mg)"] * mixedNutsFactor,
  "Sodium (mg)": NUTS["Sodium (mg)"] * mixedNutsFactor,
  "Total Carbohydrates (g)": NUTS["Total Carbohydrates (g)"] * mixedNutsFactor,
  "Dietary Fiber (g)": NUTS["Dietary Fiber (g)"] * mixedNutsFactor,
  "Total Sugars (g)": NUTS["Total Sugars (g)"] * mixedNutsFactor,
  "Added Sugars (g)": NUTS["Added Sugars (g)"] * mixedNutsFactor,
  "Protein (g)": NUTS["Protein (g)"] * mixedNutsFactor,
  "Vitamin D (mcg)": NUTS["Vitamin D (mcg)"] * mixedNutsFactor,
  "Calcium (mg)": NUTS["Calcium (mg)"] * mixedNutsFactor,
  "Iron (mg)": NUTS["Iron (mg)"] * mixedNutsFactor,
  "Potassium (mg)": NUTS["Potassium (mg)"] * mixedNutsFactor,
  "Copper (mg)": NUTS["Copper (mg)"] * mixedNutsFactor,
};
const foodsToCombine = [scaledDates, scaledUnsaltedMixedNuts];
const combinedNutritionFacts: NutritionFacts = nutrients.reduce(
  (obj, nutrient) => {
    const nutrientAmount = nutrientsToGetMoreOf.has(nutrient)
      ? Math.min(...foodsToCombine.map((food) => food[nutrient]))
      : Math.max(...foodsToCombine.map((food) => food[nutrient]));
    obj[nutrient] = nutrientAmount;
    return obj;
  },
  {} as NutritionFacts
);

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("estimates nutrition facts of combined foods", () => {
    expect(datesFactor).toBe(7);
    expect(commonServingSize).toBe(280);
    expect(mixedNutsFactor).toBe(10);
    expect(scaledDates).toEqual({
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
    expect(scaledUnsaltedMixedNuts).toEqual({
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
    for (const nutrient of nutrients) {
      expect(
        combinedNutritionFacts[nutrient] === scaledDates[nutrient] ||
          combinedNutritionFacts[nutrient] === scaledUnsaltedMixedNuts[nutrient]
      ).toBe(true);
    }
    for (const nutrient of nutrients) {
      expect(
        combinedNutritionFacts[nutrient] ===
          (nutrientsToGetMoreOf.has(nutrient)
            ? Math.min(scaledDates[nutrient], scaledUnsaltedMixedNuts[nutrient])
            : Math.max(
                scaledDates[nutrient],
                scaledUnsaltedMixedNuts[nutrient]
              ))
      ).toBe(true);
    }
  });
}
