const limitAmountCocktailsRecommended = 6;
const limitAmountCocktails = 12;
const limitDrinksCategory = 5;

export const fetchCocktailsByIngredient = (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchCocktailsByName = (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchCocktailsByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchCocktailById = (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchCocktailsRecommended = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      return dataDrinks.slice(0, limitAmountCocktailsRecommended);
    })
    .catch((error) => error);
};

export const fetchCocktails = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.drinks;
      return dataMeals.slice(0, limitAmountCocktails);
    })
    .catch((error) => error);
};

export const fetchCocktailsCategory = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitDrinksCategory);
    })
    .catch((error) => error);
};

export const fetchMealsByCategories = (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitAmountCocktails);
    })
    .catch((error) => error);
};

export const fetchRandomCocktail = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchCocktailsIngredients = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};
