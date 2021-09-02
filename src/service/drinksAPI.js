async function drinkAPI(drinkData, category, request = '') {
  const numberCategory = 5;
  const endNumber = 12;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${request}`;
  await fetch(url).then((packJason) => packJason.json())
    .then(({ drinks }) => {
      if (request === 'search.php?s=') {
        drinkData(drinks.slice(0, endNumber));
      } else {
        category(drinks.slice(0, numberCategory));
      }
    });
}

export default drinkAPI;
