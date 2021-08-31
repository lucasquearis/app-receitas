export async function fetchRecipesAPI(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fetchDrinksAPI(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function fetchRecipeById(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function fetchDrinkById(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function fetchRecipeByCategory(category) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function fetchDrinkByCategory(category) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function fetchDrinkSuggestions() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
}

export async function fetchRecipeSuggestions() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
}

export async function fetchRadomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export async function fetchRadomRecipe() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return data;
}

export async function fetchRecipeByIngredient() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data;
}

export async function fetchDrinkByIngredient() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data;
}

export async function fetchAreaList() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();
  return data;
}

export async function fetchByArea(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const data = await response.json();
  return data;
}

export async function filteredRecipes(type, search) {
  const ingredientURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
  const nameURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const firstLetterURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;

  try {
    switch (type) {
    case 'ingredient':
      return fetchRecipesAPI(ingredientURL);
    case 'name':
      return fetchRecipesAPI(nameURL);
    case 'firstLetter':
      return fetchRecipesAPI(firstLetterURL);
    default:
      return null;
    }
  } catch (err) {
    alert(err);
  }
}

export async function filteredDrinks(type, search) {
  const ingredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
  const nameURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const firstLetterURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;

  try {
    switch (type) {
    case 'ingredient':
      return fetchDrinksAPI(ingredientURL);
    case 'name':
      return fetchDrinksAPI(nameURL);
    case 'firstLetter':
      return fetchDrinksAPI(firstLetterURL);
    default:
      return null;
    }
  } catch (err) {
    alert(err);
  }
}
