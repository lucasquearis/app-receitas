export const getDrinkCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  if (!response.ok) {
    console.log('Não foi possível acessar as categorias');
  }
  const results = await response.json();
  return results;
};

export const getDrinksByCategory = async (selectedCategory) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  const response = await fetch(endpoint);
  if (!response.ok) { console.log('Não foi possível fazer a requisição por categoria'); }
  const results = await response.json();
  return results;
};

export const getAllDrinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint);
  if (!response.ok) { console.log('Não foi possível fazer a requisição'); }
  const results = await response.json();
  return results;
};
