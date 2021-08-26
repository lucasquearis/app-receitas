// endPoints das diferentes APIs;
const endPoints = {
  food: 'https://www.themealdb.com/api/json/v1/1/',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
};

// Função que auxilia uma requisição;
const getResponse = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Receber lista de categorias;
const fetchCategories = (type) => {
  const apiURL = `${endPoints[type]}list.php?c=list`;
  return getResponse(apiURL);
};

export const getCategories = (type) => fetchCategories(type);

// Requisição padrão;
const defaultFetch = (type) => {
  const apiURL = `${endPoints[type]}search.php?s=`;
  return getResponse(apiURL);
};

export const getDefaultData = (type) => () => defaultFetch(type);

// Hook para receber os dados da API de acordo com os filtros do usuário;
// Primeiro parâmetro será 'food' ou 'drinks';
// Segundo parâmetro será um objeto com os filtros do usuário;
export const useFilters = (type, parameters) => {
  // Cada método deste objeto é uma requisição específica;
  const requestAPI = {
    fetchIngredient: () => {
      const apiURL = `${endPoints[type]}filter.php?i=${parameters[type].text}`;
      return getResponse(apiURL);
    },
    fetchName: () => {
      const apiURL = `${endPoints[type]}search.php?s=${parameters[type].text}`;
      return getResponse(apiURL);
    },
    fetchFirstLetter: () => {
      const apiURL = `${endPoints[type]}search.php?f=${parameters[type].text}`;
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
      return defaultFetch(type);
    }
  };
};
