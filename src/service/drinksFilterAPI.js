async function drinksFilterAPI(search, filter, setDrinkData) {
  const endNumber = 12;
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  if (search === 'nome') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;
  } else if (search === 'ingrediente') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filter}`;
  } else if (search === 'primeira letra') {
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filter}`;
  }
  await fetch(url).then((response) => response.json())
    .then(({ drinks }) => {
      if (drinks !== null) {
        setDrinkData(drinks.slice(0, endNumber));
      } else setDrinkData(null);
    });
}

export default drinksFilterAPI;
