const fetchDrinkSurprise = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const drinks = await fetch(endpoint).then((data) => data.json());
  return drinks.drinks;
};

export default fetchDrinkSurprise;
