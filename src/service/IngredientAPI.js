async function IngredientesAPI(request, setData) {
  const endNumber = 12;
  const url = `https://www.the${request}db.com/api/json/v1/1/list.php?i=list`;
  await fetch(url).then((packJason) => packJason.json())
    .then((item) => {
      if (request === 'meal') {
        setData(item.meals.slice(0, endNumber));
      } else {
        setData(item.drinks.slice(0, endNumber));
      }
    });
}

export default IngredientesAPI;
