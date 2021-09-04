const fetchDrinks = async () => {
  const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL_API);
  const drinks = result.json();
  return drinks;
};

export default fetchDrinks;
