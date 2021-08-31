const fetchCategories = async (pathname) => {
  if (pathname === '/comidas') {
    const URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(URL_API_MEALS);
    const { meals } = await result.json();
    return meals;
  }
  if (pathname === '/bebidas') {
    const URL_API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const result = await fetch(URL_API_DRINKS);
    const { drinks } = await result.json();
    return drinks;
  }
};

export default fetchCategories;
