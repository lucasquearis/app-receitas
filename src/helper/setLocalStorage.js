const favoriteRecipes = (recipe, type) => {
  if (type === 'comida') {
    return (
      [{
        id: recipe.idMeal,
        type,
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      }]
    );
  }
  return (
    [{
      id: recipe.idDrink,
      type,
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }]
  );
};

export default favoriteRecipes;
