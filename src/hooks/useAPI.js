import { useState } from 'react';

function useAPI() {
  const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1';
  const foodAPI = 'https://www.themealdb.com/api/json/v1/1';

  const [drinks, setDrinks] = useState({ drinks: [] });
  const [foods, setFoods] = useState({ meals: [] });

  function request(url, setter) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const key = Object.keys(data)[0];
        const value = data[key];
        if (value === null) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
          setter({ [key]: [] });
          return;
        }
        setter(data);
      })
      .catch(console.error);
  }

  function searchDrinks(category = 's', query = '') {
    // Category
    // 's' pesquisar por nome
    // 'i' filtra por ingrediente
    // 'f' pesquisar por pela primeira letra - precisa de uma letra
    if (category === 'i') {
      request(`${drinkAPI}/filter.php?${category}=${query}`, setFoods);
      return;
    }
    request(`${drinkAPI}/search.php?${category}=${query}`, setDrinks);
  }

  function searchFoods(category = 's', query = '') {
    // Category
    // 's' pesquisar por nome
    // 'i' filtra por ingrediente
    // 'f' pesquisar por pela primeira letra - precisa de uma letra
    if (category === 'i') {
      request(`${foodAPI}/filter.php?${category}=${query}`, setFoods);
      return;
    }
    request(`${foodAPI}/search.php?${category}=${query}`, setFoods);
  }

  return { drinks, foods, searchDrinks, searchFoods };
}

export default useAPI;
