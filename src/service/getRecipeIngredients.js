export default function getRecipeIngredients(foodResult) {
  const ingredientsKeys = Object.entries(foodResult[0]).filter((ingredient) => (
    ingredient[0].includes('strIngredient')
  ));

  const ingredientsMeasure = Object.entries(foodResult[0]).filter((measureAll) => (
    measureAll[0].includes('strMeasure')
  ));

  const ingredients = ingredientsKeys.filter((key) => (
    key[1] !== '' && key[1] !== null
  ));

  const measure = ingredientsMeasure.filter((currMeasure) => (
    currMeasure[1] !== '' && currMeasure[1] !== null
  ));

  const readyIngredients = ingredients.map((ingredient, index) => {
    if (index <= measure.length - 1) {
      const currMeasure = measure[index][1];
      return `- ${ingredient[1]} - ${currMeasure}`;
    }
    return `- ${ingredient[1]}`;
  });

  return readyIngredients;
}
