import { endPoints, getDefaultData, getResponse } from './data';

// Primeiro parâmetro será 'food' ou 'drinks';
// Segundo parâmetro será um objeto com os filtros do usuário;
export const getFilters = (type, filters) => {
  // Cada método deste objeto é uma requisição específica;
  const requestAPI = {
    fetchIngredient: () => {
      const apiURL = `${endPoints[type]}filter.php?i=${filters.text}`;
      return getResponse(apiURL);
    },
    fetchName: () => {
      const apiURL = `${endPoints[type]}search.php?s=${filters.text}`;
      return getResponse(apiURL);
    },
    fetchFirstLetter: () => {
      const apiURL = `${endPoints[type]}search.php?f=${filters.text}`;
      return getResponse(apiURL);
    },
  };

  switch (filters.filter) {
  case 'ingredient':
    return requestAPI.fetchIngredient();
  case 'name':
    return requestAPI.fetchName();
  case 'firstLetter':
    // Caso o usuário escreva mais que uma letra no filtro de "Primeira letra" fará um alert();
    // (Requisito 15)
    if (filters.text.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    return requestAPI.fetchFirstLetter();
  default:
    return getDefaultData(type);
  }
};

export default getFilters;
