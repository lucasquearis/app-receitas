async function foodFilterAPI(setFoodData, filter, search) {
  const endNumber = 12;
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  if (search === 'nome') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filter}`;
  } else if (search === 'ingrediente') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter}`;
  } else if (search === 'primeira letra') {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filter}`;
  }
  await fetch(url).then((packJason) => packJason.json())
    .then(({ meals }) => {
      if (meals !== null) {
        setFoodData(meals.slice(0, endNumber));
      } else setFoodData(null);
    });
}

export default foodFilterAPI;
