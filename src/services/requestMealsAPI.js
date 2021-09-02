const amountRecommended = 6;
const limitMealsArea = 27;
const amountCategory = 5;
const amount = 12;

export const fetchMealsByIngredient = (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByName = (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsByFirstLetter = (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealById = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsRecommended = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, amountRecommended);
    })
    .catch((error) => error);
};

export const fetchMeals = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, amount);
    })
    .catch((error) => error);
};

export const fetchMealsCategory = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, amountCategory);
    });
};

export const fetchMealsByCategories = (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, amount);
    })
    .catch((error) => error);
};

export const fetchRandomMeal = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsIngredients = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.meals)
    .catch((error) => error);
};

export const fetchMealsArea = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(0, limitMealsArea);
    });
};

export const filterMealsArea = (origem) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${origem}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dataMeals = data.meals;
      return dataMeals.slice(dataMeals, amount);
    });
};
