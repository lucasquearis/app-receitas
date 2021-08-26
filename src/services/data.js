// endPoints das diferentes APIs;
export const endPoints = {
  food: 'https://www.themealdb.com/api/json/v1/1/',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
};

// Função que auxilia uma requisição;
export const getResponse = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Requisição padrão;
export const getDefaultData = (type) => {
  const apiURL = `${endPoints[type]}search.php?s=`;
  return getResponse(apiURL);
};
