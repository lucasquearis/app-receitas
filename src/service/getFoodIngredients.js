export default function getFoodIngredients(foodResult) {
  const ingredientsKeys = Object.entries(foodResult).filter((ingredient) => (
    ingredient[0].includes('strIngredient')
  ));

  const ingredientsMeasure = Object.entries(foodResult).filter((measureAll) => (
    measureAll[0].includes('strMeasure')
  ));

  const ingredients = ingredientsKeys.filter((key) => (
    key[1] !== '' && key[1] !== null
  ));

  const measure = ingredientsMeasure.filter((currMeasure) => (
    currMeasure[1] !== '' && currMeasure[1] !== null
  ));

  const readyIngredients = ingredients.map((ingredient, index) => (
    `- ${ingredient[1]} - ${measure[index][1]}`
  ));

  return readyIngredients;
}
