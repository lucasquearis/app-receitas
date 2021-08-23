const getFoodByIngredient = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por ingredientes: ${error}`;
  // }
};

const getFoodByName = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca por nome: ${error}`;
  // }
};

const getFoodByFirstLetter = async (term) => {
  // try {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  const { meals } = await response.json();
  return meals;
  // } catch (error) {
  //   return `Algo deu errado na busca pela Primeira Letra: ${error}`;
  // }
};

export const getFood = (term, type) => {
  switch (type) {
  case 'Primeira Letra':
    return getFoodByFirstLetter(term);
  case 'Nome':
    return getFoodByName(term);
  default:
    return getFoodByIngredient(term);
  }
};

export const a = 1;
