const getFoodCategories = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const response = fetch(endpoint);
  if (!response.ok) return ('Não foi possível acessar as categorias');
  const results = response.json();
  return results;
};

export default getFoodCategories;
