const fetchFoods = async (type, action, value = '') => {
  const actions = {
    procuraComida: 'search.php?s=',
    procuraId: 'lookup.php?i=',
    random: 'random.php',
  };
  const endPoints = {
    drink: 'https://www.thecocktaildb.com/api/json/v1/1/',
    food: 'https://www.themealdb.com/api/json/v1/1/',
  };
  const endPoint = `${endPoints[type]}${actions[action]}${value}`;
  console.log(endPoint);
  const response = await fetch(endPoint);
  const resolve = await response.json();
  const result = await resolve;
  return result;
};

export default fetchFoods;
