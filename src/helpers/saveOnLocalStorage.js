export const saveOnLocalStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getDataFromLocalStorage = (key, value = []) => (
  JSON.parse(localStorage.getItem(key)) || value);

export const todayDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const saveNewDoneRecipe = (recipe, typeRecipe) => {
  const {
    idMeal,
    idDrink,
    strArea,
    strCategory,
    strAlcoholic,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strTags,
  } = recipe;

  const maxLength = 2;
  const newDoneRecipe = {
    id: idMeal || idDrink,
    type: typeRecipe,
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
    doneDate: todayDate(),
    tags: strTags ? strTags.split(',').slice(0, maxLength) : [],
  };
  return newDoneRecipe;
};

export const saveNewFavorite = (recipe, typeRecipe) => {
  const {
    idMeal,
    idDrink,
    strArea,
    strCategory,
    strAlcoholic,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
  } = recipe;

  const newFavRecipe = {
    id: idMeal || idDrink,
    type: typeRecipe,
    area: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  };
  return newFavRecipe;
};

export const saveInProgressRecipes = (recipe, item) => {
  const currentPage = window.location.href;
  if (currentPage.includes('comidas')) {
    const { idMeal } = item;

    const newProgressRecipe = {
      meals: {
        [idMeal]: [recipe],
      },
    };
    return newProgressRecipe;
  } if (currentPage.includes('bebidas')) {
    const { idDrink } = item;

    const newProgressRecipe = {
      cocktails: {
        [idDrink]: [recipe],
      },
    };
    return newProgressRecipe;
  }
};
