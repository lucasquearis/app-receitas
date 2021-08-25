const fetchFoodAPI = async (value, type) => {
  if (type === 'ingredient') {
    console.log(value, type);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
    const data = await response.json();
    return data;
  }
  if (type === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    const data = await response.json();
    return data;
  }
  if (type === 'letter') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
    const data = await response.json();
    return data;
  }
};

export default fetchFoodAPI;
