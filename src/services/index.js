export const emailRegex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:.[a-z]{2})?$/;

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export const titleGenerator = (routeParams) => {
  if (routeParams[1] === 'area') return (capitalizeFirstLetter('origem'));
  if (routeParams[1] !== undefined) return (capitalizeFirstLetter(routeParams[1]));
  if (routeParams[0] !== undefined) return (capitalizeFirstLetter(routeParams[0]));
  return '';
};

export const endpoints = {
  comidas: {
    ingrediente: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`),
    firstLetter: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`),
    name: (search) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`),
    random: () => fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
  },
  bebidas: {
    ingrediente: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`),
    firstLetter: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`),
    name: (search) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`),
    random: () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
  },
};

export const categoryEndpoints = {
  comidas: (category) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`),
  bebidas: (category) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`),
};
