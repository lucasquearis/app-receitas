const getDrinkByIngredient = async (term) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${term}`);
  const { drinks } = await response.json();
  return drinks;
  // } catch (error) {
  //   return `Algo deu errado na busca por ingredientes: ${error}`;
  // }
};

const getDrinkByName = async (term) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
  const { drinks } = await response.json();
  return drinks;
  // } catch (error) {
  //   return `Algo deu errado na busca por nome: ${error}`;
  // }
};

const getDrinkByFirstLetter = async (term) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${term}`);
  const { drinks } = await response.json();
  return drinks;
  // } catch (error) {
  //   return `Algo deu errado na busca pela primeira letra: ${error}`;
  // }
};

const getDrinkById = async (term) => {
  // try {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${term}`);
  const { drinks } = await response.json();
  return drinks;
  // } catch (error) {
  //   return `Algo deu errado na busca pelo id: ${error}`;
  // }
};

export const getDrinkTypesList = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  const drinkTypes = drinks.map(({ strCategory }) => strCategory);
  return drinkTypes;
};

export const getDrinkByFilter = async (term) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${term}`);
  const { drinks } = await response.json();
  return drinks;
};

export const getDrink = (term, type) => {
  switch (type) {
  case 'Primeira Letra':
    return getDrinkByFirstLetter(term);
  case 'Nome':
    return getDrinkByName(term);
  case 'id':
    return getDrinkById(term);
  default:
    return getDrinkByIngredient(term);
  }
};

export const getDrinksForRecommendation = async () => {
  // try {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  const maxIndex = 5;
  const getDrinks = drinks.filter((_drink, index) => index <= maxIndex)
    .map((drink) => drink.strDrink);
  return getDrinks;
  // } catch (error) {
  //   return `Algo deu errado na busca: ${error}`;
  // }
};
