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

export const getDrink = (term, type) => {
  switch (type) {
  case 'Primeira Letra':
    return getDrinkByFirstLetter(term);
  case 'Nome':
    return getDrinkByName(term);
  default:
    return getDrinkByIngredient(term);
  }
};

export const a = 1;
