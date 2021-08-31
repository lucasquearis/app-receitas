const fetchFoods = async (type, action, value = '') => {
  const actions = {
    procuraComida: 'search.php?s=',
    procuraId: 'lookup.php?i=',
    procuraBebida: 'search.php?s=',
    random: 'random.php',
    ingredients: 'list.php?i=list',
    ingredientes: 'filter.php?i=',
    area: 'list.php?a=list',
    filterByArea: 'filter.php?a=',
    categories: 'list.php?c=list',
    filterIngredient: 'filter.php?i=',
    filterCategory: 'filter.php?c=',
    primeiraLetra: 'search.php?f=',
  };
  const endPoints = {
    drink: 'https://www.thecocktaildb.com/api/json/v1/1/',
    food: 'https://www.themealdb.com/api/json/v1/1/',
  };
  const endPoint = `${endPoints[type]}${actions[action]}${value}`;
  const response = await fetch(endPoint);
  const resolve = await response.json();
  const result = await resolve;
  return result;
};

export default fetchFoods;
