const FetchFood = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const meals = await fetch(endpoint).then((data) => data.json());
  return meals.meals;
};

export default FetchFood;
