const URL_F_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const URL_F_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const URL_F_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const URL_D_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const URL_D_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const URL_D_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

async function FetchSearch(pathname, typeSearch, contentSearch) {
  // console.log(`quem ${pathname} tipo ${typeSearch} o que ${contentSearch}`);
  if (pathname === '/comidas') {
    if (typeSearch === 'ingredient') {
      const { meals } = await fetch(URL_F_INGREDIENT + contentSearch)
        .then((response) => response.json());
      return meals;
    }
    if (typeSearch === 'name') {
      const { meals } = await fetch(URL_F_NAME + contentSearch)
        .then((response) => response.json());
      return meals;
    }
    if (typeSearch === 'firstLetter') {
      const { meals } = await fetch(URL_F_LETTER + contentSearch)
        .then((response) => response.json());
      return meals;
    }
  }

  if (pathname === '/bebidas') {
    if (typeSearch === 'ingredient') {
      const { drinks } = await fetch(URL_D_INGREDIENT + contentSearch)
        .then((response) => response.json());
      return drinks;
    }
    if (typeSearch === 'name') {
      const { drinks } = await fetch(URL_D_NAME + contentSearch)
        .then((response) => response.json());
      return drinks;
    }
    if (typeSearch === 'firstLetter') {
      const { drinks } = await fetch(URL_D_LETTER + contentSearch)
        .then((response) => response.json());
      return drinks;
    }
  }
}

export default FetchSearch;
