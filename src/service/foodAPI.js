async function FoodAPI(foodData, category, request = '') {
  if (request !== '') {
    const numberCategory = 5;
    const endNumber = 12;
    const url = `https://www.themealdb.com/api/json/v1/1/${request}`;
    await fetch(url).then((packJason) => packJason.json())
      .then(({ meals }) => {
        if (request === 'search.php?s=') {
          foodData(meals.slice(0, endNumber));
        } else {
          category(meals.slice(0, numberCategory));
        }
      });
  }
}

export default FoodAPI;
