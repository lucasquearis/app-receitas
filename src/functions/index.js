export const validateEmailPassword = (email, password) => {
  const re = /\w+@\w+.com/.test(email);
  const minimumPasswordLength = 7;
  const validPassword = password.length >= minimumPasswordLength;
  const logicValidation = re && validPassword;
  return logicValidation;
};

export const saveLoginInfoLocalStorage = (userEmail) => {
  const user = {
    email: userEmail,
  };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const filterIngredientsDetails = (recipe) => {
  const ingredientsMeaseure = [];
  const ingredients = Object.entries(recipe)
    .filter((value) => value[0].includes('strIngredient') && value[1]);
  const measures = Object.entries(recipe)
    .filter((value) => value[0].includes('strMeasure') && value[1]);
  for (let index = 0; index < ingredients.length; index += 1) {
    ingredientsMeaseure.push([ingredients[index][1], measures[index][1]]);
  }
  return ingredientsMeaseure;
};

export const foodAndDrinksInProcessLocalStorage = () => {
  const mealsAndDrinksInProgress = {
    cocktails: {
    },
    meals: {
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(mealsAndDrinksInProgress));
};

export const filterFoodLocalStorage = (id) => {
  const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const keyFiltered = key.meals[id];
  console.log(keyFiltered);
  return keyFiltered;
};

export const ingredientsMeasuresFunc = (obj) => {
  const objKey = Object.keys(obj);
  const objEntries = Object.entries(obj[objKey][0]);

  const objEntriesIngredient = objEntries.filter((entry) => (
    entry[0].includes('strIngredient') && entry[1]))
    .map((array) => array[1]);

  const objEntriesMeasure = objEntries.filter((entry) => (
    entry[0].includes('strMeasure') && entry[1]))
    .map((array) => array[1]);

  const entriesIngredientArrays = objEntriesIngredient.map((ingredient, index) => (
    `${ingredient} - ${objEntriesMeasure[index]}`));

  return entriesIngredientArrays;
};

export const updateLocalStorage = (id, ing, array, type) => {
  const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (key[type][id] && key[type][id].includes(ing)) {
    key[type][id] = key[type][id].filter((ingredient) => ingredient !== ing);
  } else {
    key[type][id] = [...array, ing];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(key));
};

export const disableFinishRecipeBtn = (array, id, type) => {
  const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const localStorageRecipeIngredients = localStorageRecipes[type][id];
  const recipeIngredients = array[id];

  if (localStorageRecipeIngredients && recipeIngredients) {
    const bool = localStorageRecipeIngredients.length === recipeIngredients.length;
    return bool;
  }
  return false;
};
