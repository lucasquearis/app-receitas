const fetchIngredients = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(endPoint);
  return response.json();
};

export default fetchIngredients;
