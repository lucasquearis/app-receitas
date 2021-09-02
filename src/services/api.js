export const getMeals = async (url, length, setInfo) => {
  const mealsResult = await fetch(url).then((response) => response.json());
  if (typeof length === 'number') {
    mealsResult.meals.slice(0, length);
    setInfo(mealsResult.meals.slice(0, length));
  } else setInfo(mealsResult.meals);
};

export const getDrinks = async (url, length, setInfo) => {
  const drinksResult = await fetch(url).then((response) => response.json());
  setInfo(drinksResult.drinks.slice(0, length));
};
