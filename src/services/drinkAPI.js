const getDrinkByIngredient = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

const getDrinkByName = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

const getDrinkByFirstLetter = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

const getDrinkById = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

export const getDrinkTypesList = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  const drinkTypes = drinks.map(({ strCategory }) => strCategory);
  return drinkTypes;
};

export const getDrinkByFilter = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

export const getDrink = (term, type) => {
  switch (type) {
  case 'Primeira Letra':
    return getDrinkByFirstLetter(term);
  case 'Nome':
    return getDrinkByName(term);
  case 'id':
    return getDrinkById(term);
  default:
    return getDrinkByIngredient(term);
  }
};

export const getDrinksForRecommendation = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  const maxIndex = 5;
  const getDrinks = drinks.filter((_drink, index) => index <= maxIndex)
    .map((drink) => drink.strDrink);
  return getDrinks;
};

export const getDrinkIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const { drinks } = await response.json();
  return drinks;
};
