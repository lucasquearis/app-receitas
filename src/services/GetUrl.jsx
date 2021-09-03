const mealApi = (type, entry) => {
  switch (type) {
  case 'name':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${entry}`;

  case 'ingredient':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${entry}`;

  case 'first-letter':
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${entry}`;

  default:
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
};

export default mealApi;
