import PropTypes from 'prop-types';

function DoneButton({ recipe, typeRecipe }) {
  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strMealThumb,
    strMeal,
    strArea,
    idMeal,
    idDrink,
    strTags,
    dateModifield,
  } = recipe;

  const defaultDoneDrinks = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    tags: strTags,
    doneDate: dateModifield,
  };

  const defaultDoneFoods = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    tags: strTags,
    doneDate: dateModifield,
  };

  let recipeStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (recipeStorage === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  recipeStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (typeRecipe === 'bebida') {
    recipeStorage = [...recipeStorage, defaultDoneDrinks];
    localStorage.setItem('doneRecipes', JSON.stringify(recipeStorage));
  } else {
    recipeStorage = [...recipeStorage, defaultDoneFoods];
    localStorage.setItem('doneRecipes', JSON.stringify(recipeStorage));
  }
}

DoneButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default DoneButton;
