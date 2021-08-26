const fetchFoods = async (type, action, value = '') => {
  const actions = {
    procuraComida: 'search.php?s=',
    random: 'random.php',
    ingredients: 'list.php?i=list',
    area: 'list.php?a=list',
    filterByArea: 'filter.php?a=',
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
