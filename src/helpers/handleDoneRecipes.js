const splitString = (recipe) => (
  recipe.strTags ? recipe.strTags.split(', ') : []
);

const dateGenerator = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default function handleDoneRecipes(recipe, isFood) {
  const doneRecipe = {
    id: recipe[isFood ? 'idMeal' : 'idDrink'],
    type: isFood ? 'comida' : 'bebida',
    area: isFood ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: !isFood ? recipe.strAlcoholic : '',
    name: isFood ? recipe.strMeal : recipe.strDrink,
    image: isFood ? recipe.strMealThumb : recipe.strDrinkThumb,
    doneDate: dateGenerator(),
    tags: splitString(recipe),
  };

  const recipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const handleDoneRecipe = recipes.concat(doneRecipe);

  localStorage.setItem('doneRecipes', JSON.stringify(handleDoneRecipe));
}
