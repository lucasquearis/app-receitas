const limitAmountMealRecommended = 6;
const limitAmountMeals = 12;
const limitMealsCategory = 5;

export const fetchMealsByIngredient = (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByName = (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealById = (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsRecommended = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitAmountMealRecommended);
    })
    .catch((error) => error);
};

export const fetchMeals = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitAmountMeals);
    })
    .catch((error) => error);
};

export const fetchMealsCategory = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitMealsCategory);
    })
    .catch((error) => error);
};

export const fetchMealsByCategories = (category) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitAmountMeals);
    })
    .catch((error) => error);
};

export const fetchRandomMeal = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsIngredients = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
};
