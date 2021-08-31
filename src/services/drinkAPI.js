import { URL_RADIO_BUTTON } from './data';

export default async function getDrinks({ textValue, radioValue, pathname }) {
  if (pathname === '/comidas') textValue = '';
  const mealOrDrink = radioValue === 'category' ? textValue : textValue.split(' ').join('+');
  const typeOfSearch = URL_RADIO_BUTTON[radioValue];
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${typeOfSearch}=${mealOrDrink}`;
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    return { drinks: null };
  }
}

async function getDrinksById(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getDrinksCategories() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    console.log(e);
  }
}

export { getDrinks, getDrinksById, getDrinksCategories };
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente};
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome};
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra};
