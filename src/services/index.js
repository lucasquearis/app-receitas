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

// Requisição padrão;
export const getDefaultData = (type) => {
  const apiURL = `${endPoints[type]}search.php?s=`;
  return getResponse(apiURL);
};

// Receber lista de categorias;
export const getCategories = (type) => {
  const apiURL = `${endPoints[type]}list.php?c=list`;
  return getResponse(apiURL);
};

// Primeiro parâmetro será 'food' ou 'drinks';
// Segundo parâmetro será um objeto com os filtros do usuário;
export const getFilters = (type, parameters) => {
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

  // o Retorno é uma função que verificará o filtro e retornará a requisição correta;
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
      return getDefaultData(type);
    }
  };
};

export const fetchCategories = (type, selected) => {
  if (!selected[type]) return getDefaultData(type);
  const apiURL = `${endPoints[type]}filter.php?c=${selected[type]}`;
  return getResponse(apiURL);
};
