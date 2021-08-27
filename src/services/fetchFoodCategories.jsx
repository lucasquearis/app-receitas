const getFoodCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  console.log(response);
  if (!response.ok) {
    console.log('Não foi possível acessar as categorias');
    return {};
  }
  const results = await response.json();
  return results;
};

export default getFoodCategories;
