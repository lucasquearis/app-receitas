import { URL_RADIO_BUTTON, URL_PAGE, BODY_URL } from './data';

export default async function getFoodByIngredient({ textValue, radioValue, pathname }) {
  const mealOrDrink = textValue.split(' ').join('+');
  const mealOrDrinkUrl = URL_PAGE.get(pathname);
  const typeOfSearch = URL_RADIO_BUTTON[radioValue];
  const URL = `https://www.${mealOrDrinkUrl}${BODY_URL}${typeOfSearch}=${mealOrDrink}`;
  const result = await fetch(URL).then((resp) => resp.json());
  return result;
}
