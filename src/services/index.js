/* eslint-disable no-alert */
const useFilters = (type, parameters) => {
  const data = {
    food: 'https://www.themealdb.com/api/json/v1/1/',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
  };

  const getResponse = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const requestAPI = {
    fetchIngredient: () => {
      const apiURL = `${data[type]}filter.php?i=${parameters[type].text}`;
      return getResponse(apiURL);
    },
    fetchName: () => {
      const apiURL = `${data[type]}search.php?s=${parameters[type].text}`;
      return getResponse(apiURL);
    },
    fetchFirstLetter: () => {
      const apiURL = `${data[type]}search.php?f=${parameters[type].text}`;
      return getResponse(apiURL);
    },
  };

  return () => {
    switch (parameters[type].filter) {
    case 'ingredient':
      return requestAPI.fetchIngredient();
    case 'name':
      return requestAPI.fetchName();
    case 'firstLetter':
      if (parameters[type].text.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return requestAPI.fetchFirstLetter();
    default:
      return [];
    }
  };
};

export default useFilters;
