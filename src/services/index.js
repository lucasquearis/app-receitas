// Hook para receber os dados da API de acordo com os filtros do usuário;

// Primeiro parâmetro será 'food' ou 'drinks';
// Segundo parâmetro será um objeto com os filtros do usuário;
const useFilters = (type, parameters) => {
  // endPoints das diferentes APIs;
  const data = {
    food: 'https://www.themealdb.com/api/json/v1/1/',
    drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
  };

  // Função que auxilia uma requisição;
  const getResponse = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  // Cada método deste objeto é uma requisição específica;
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

  // O hook retorna uma função que verificará o filtro e retornará a requisição correta;
  return () => {
    switch (parameters[type].filter) {
    case 'ingredient':
      return requestAPI.fetchIngredient();
    case 'name':
      return requestAPI.fetchName();
    case 'firstLetter':
      // Caso o usuário escreva mais que uma letra no filtro de "Primeira letra" fará um alert();
      // (Requisito 15)
      if (parameters[type].text.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return requestAPI.fetchFirstLetter();
    default:
      break;
    }
  };
};

export default useFilters;
