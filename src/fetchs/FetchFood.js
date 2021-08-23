const fetchFoods = async (action, food = '') => {
  const actions = {
    procuraComida: 'search.php?s=',
    random: 'random.php',
  };
  const endPoint = `https://www.themealdb.com/api/json/v1/1/${actions[action]}${food}`;
  const response = await fetch(endPoint);
  const resolve = await response.json();
  const result = await resolve;
  return result;
};

export default fetchFoods;
