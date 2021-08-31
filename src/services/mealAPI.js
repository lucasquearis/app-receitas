import { URL_RADIO_BUTTON } from './data';

async function getMeals({ textValue, radioValue, pathname }) {
  if (pathname === '/bebidas') textValue = '';
  const mealOrDrink = textValue.split(' ').join('+');
  const typeOfSearch = URL_RADIO_BUTTON[radioValue];
  const URL = `https://www.themealdb.com/api/json/v1/1/${typeOfSearch}=${mealOrDrink}`;
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getMealsById(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getMealsCategories() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const result = await fetch(URL).then((resp) => resp.json());
    return result;
  } catch (e) {
    console.log(e);
  }
}

export { getMeals, getMealsById, getMealsCategories };
