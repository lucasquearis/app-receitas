import { URL_SETUP_BY_RADIO_BUTTON, URL_SETUP_BY_PAGE, BODY_URL } from './data';

export default async function getFoodByIngredient({ textValue, radioValue, pathName }) {
  const mealOrDrink = textValue.split(' ').join('+');
  const mealOrDrinkUrl = URL_SETUP_BY_PAGE.get(pathName);
  const typeOfSearch = URL_SETUP_BY_RADIO_BUTTON[radioValue];
  const URL = `https://www.${mealOrDrinkUrl}${BODY_URL}${typeOfSearch}=${mealOrDrink}`;
  const result = await fetch(URL).then((resp) => resp.json());
  return result;
}
