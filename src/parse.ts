import type { NutritionFacts } from "./types";

const rawDataForMarinara = `HOMEMADE MARINARA NET WT 28 OZ (1.75 LB) 790G "All Natural, Premium" about 6 servings per container Serving Size 1/2 cup (125g)	1	1	125	100	7	1	0	0	0	0	0	0	0	420	6	1	0	0	4	0	2	0	20	0.2	370	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0		Packaging		125	100	7	1							0	420	6	1			4	0	2	0	20	0.2	370`;
const rawDataForVegetables =
  "MIXED VEGETABLES (87g) INGREDIENTS: CARROTS, CORN, PEAS, GREEN BEANS, LIMA BEANS	87	1	87	60	0	0	0	0	0	0	0	0	0	20	12	3	0	0	3	0	3	0	23	1	196	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0		Packaging		87	60	0	0	0						0	20	12	3			3	0	3	0	23	1	196";
const marinara = parseNutritionFactsFrom(rawDataForMarinara);
const vegetables = parseNutritionFactsFrom(rawDataForVegetables);
function parseNutritionFactsFrom(rawData: string): NutritionFacts {
  const [
    _nameOfFood,
    _unit,
    _servings,
    servingSize,
    calories,
    totalFat,
    saturatedFat,
    _transFat,
    _polyunsaturatedFat,
    _monounsaturatedFat,
    _pufa205n3,
    _pufa226n3,
    _epaAndDHA,
    cholesterol,
    sodium,
    totalCarbohydrates,
    dietaryFiber,
    _solubleFiber,
    _insolubleFiber,
    totalSugars,
    addedSugars,
    protein,
    vitaminD,
    calcium,
    iron,
    potassium,
  ] = rawData.split("\t").map(Number);
  return {
    "Serving Size (g)": servingSize,
    Calories: calories,
    "Total Fat (g)": totalFat,
    "Saturated Fat (g)": saturatedFat,
    "Cholesterol (mg)": cholesterol,
    "Sodium (mg)": sodium,
    "Total Carbohydrates (g)": totalCarbohydrates,
    "Dietary Fiber (g)": dietaryFiber,
    "Total Sugars (g)": totalSugars,
    "Added Sugars (g)": addedSugars,
    "Protein (g)": protein,
    "Vitamin D (mcg)": vitaminD,
    "Calcium (mg)": calcium,
    "Iron (mg)": iron,
    "Potassium (mg)": potassium,
    "Copper (mg)": 0,
  };
}

export { marinara, vegetables };

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it("extracts nutrition facts for food without copper", () => {
    expect(marinara).toEqual({
      "Serving Size (g)": 125,
      Calories: 100,
      "Total Fat (g)": 7,
      "Saturated Fat (g)": 1,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 420,
      "Total Carbohydrates (g)": 6,
      "Dietary Fiber (g)": 1,
      "Total Sugars (g)": 4,
      "Added Sugars (g)": 0,
      "Protein (g)": 2,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 20,
      "Iron (mg)": 0.2,
      "Potassium (mg)": 370,
      "Copper (mg)": 0,
    });
    expect(vegetables).toEqual({
      "Serving Size (g)": 87,
      Calories: 60,
      "Total Fat (g)": 0,
      "Saturated Fat (g)": 0,
      "Cholesterol (mg)": 0,
      "Sodium (mg)": 20,
      "Total Carbohydrates (g)": 12,
      "Dietary Fiber (g)": 3,
      "Total Sugars (g)": 3,
      "Added Sugars (g)": 0,
      "Protein (g)": 3,
      "Vitamin D (mcg)": 0,
      "Calcium (mg)": 23,
      "Iron (mg)": 1,
      "Potassium (mg)": 196,
      "Copper (mg)": 0,
    });
  });
}
