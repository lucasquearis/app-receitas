import { URL_RADIO_BUTTON } from './data';

export default async function getMeals({ textValue, radioValue, pathname }) {
  if (pathname === '/bebidas') textValue = '';
  const mealOrDrink = textValue.split(' ').join('+');
  const typeOfSearch = URL_RADIO_BUTTON[radioValue];
  const URL = `https://www.themealdb.com/api/json/v1/1/${typeOfSearch}=${mealOrDrink}`;
  const result = await fetch(URL).then((resp) => resp.json());
  return result;
}
