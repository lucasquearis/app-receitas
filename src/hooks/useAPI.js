import { useState } from 'react';

function useAPI() {
  const apis = {
    protocol: 'https',
    drink: 'www.thecocktaildb.com',
    food: 'www.themealdb.com',
    path: 'api/json/v1/1',
  };

  const drinkAPI = `${apis.protocol}://${apis.drink}/${apis.path}`;
  const foodAPI = `${apis.protocol}://${apis.food}/${apis.path}`;

  const [drinks, setDrinks] = useState({ drinks: [] });
  const [foods, setFoods] = useState({ meals: [] });

  function request(url, setter) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setter(data))
      .catch(console.error);
  }

  function searchDrinks(category, query) {
    // Category
    // 's' pesquisar por nome
    // 'i' pesquisar por ingrediente
    // 'f' pesquisar por pela primeira letra - precisa de uma letra
    request(`${drinkAPI}/search.php?${category}=${query}`, setDrinks);
  }

  function searchFoods(category, query) {
    // Category
    // 's' pesquisar por nome
    // 'f' pesquisar por pela primeira letra - precisa de uma letra
    request(`${foodAPI}/search.php?${category}=${query}`, setFoods);
  }

  const data = {
    drinks: drinks.drinks,
    foods: foods.meals,
  };

  const functions = {
    searchDrinks,
    searchFoods,
  };

  return [data, functions];
}

export default useAPI;
