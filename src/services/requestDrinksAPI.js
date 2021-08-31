const amountRecommended = 6;
const amountCategory = 5;
const amount = 12;

export const fetchDrinksByIngredient = (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksByName = (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksByFirstLetter = (firstLetter) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinkById = (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksRecommended = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      return dataDrinks.slice(0, amountRecommended);
    })
    .catch((error) => error);
};

export const fetchDrinks = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      return dataDrinks.slice(0, amount);
    })
    .catch((error) => error);
};

export const fetchDrinksCategory = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      return dataDrinks.slice(0, amountCategory);
    });
};

export const fetchDrinksByCategories = (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      return dataDrinks.slice(0, amount);
    })
    .catch((error) => error);
};

export const fetchRandomDrink = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};

export const fetchDrinksIngredients = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.drinks)
    .catch((error) => error);
};
