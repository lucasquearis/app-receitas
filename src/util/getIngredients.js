function getIngredients(drinkDetails, setIngredients) {
  const ingredientsArr = drinkDetails.map((item) => Object.entries(item)
    .filter((i) => i[0].includes('Ingredient') && i[1] !== null && i[1] !== ''));
  const ingredientsOnly = ingredientsArr.map((item) => item
    .map((i) => i.pop())).map((item) => item);
  setIngredients(ingredientsOnly);
}

export default getIngredients;
