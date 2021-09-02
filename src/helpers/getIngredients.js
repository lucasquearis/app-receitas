const getIngredients = (recipe) => {
  const ingredientsKeys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  const ingredientsList = ingredientsKeys.map((key) => recipe[key]);
  return (ingredientsList.filter((item) => item));
};

export default getIngredients;
