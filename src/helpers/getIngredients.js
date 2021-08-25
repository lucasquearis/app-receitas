function ingredientsMealDetails(details) {
  const four = 4;
  const nine = 9;
  const fourtyEigth = 48;
  const twenty = 20;

  const ingredientsList = (Object.entries(details).filter((entrie, index) => {
    if (index >= nine && index <= fourtyEigth) {
      return entrie;
    }
    return null;
  }).map((ingredient, index, array) => {
    if (index < twenty) {
      return `${ingredient[1]} - ${array[index + twenty][1]}`;
    }
    return null;
  }).filter((ingredient) => (
    ingredient && ingredient.length > four && !ingredient.includes('null'))));
  return ingredientsList;
}

export default ingredientsMealDetails;
