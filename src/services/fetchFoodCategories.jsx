export const getFoodCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  if (!response.ok) {
    console.log('Não foi possível acessar as categorias');
    return {};
  }
  const results = await response.json();
  return results;
};

export const getMealsByCategory = async (button) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${button}`;
  const response = await fetch(endpoint);
  if (!response.ok) { console.log('Não foi possível fazer a requisição por categoria'); }
  const results = await response.json();
  return results;
};

export const getAllMealsCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  if (!response.ok) { console.log('Não foi possível fazer a requisição'); }
  const results = await response.json();
  return results;
};
