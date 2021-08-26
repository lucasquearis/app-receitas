import { URL_RADIO_BUTTON } from './data';

export default async function getDrinks({ textValue, radioValue, pathname }) {
  if (pathname === '/comidas') textValue = 'water';
  const mealOrDrink = textValue.split(' ').join('+');
  const typeOfSearch = URL_RADIO_BUTTON[radioValue];
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${typeOfSearch}=${mealOrDrink}`;
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    return { drinks: null };
  }
}
