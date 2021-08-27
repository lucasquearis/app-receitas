const InitialDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const InicialDrinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DrinkByCategorie = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
// const DrinkByDetails = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export async function fetchInicialDrinks() {
  const fetchURL = await fetch(InitialDrink);
  return fetchURL.json();
}

export async function fetchDrinkCategories() {
  const fetchURL = await fetch(InicialDrinkCategories);
  return fetchURL.json();
}

export async function fetchDrinkByCategorie(categorie) {
  const fetchURL = await fetch(`${DrinkByCategorie}${categorie}`);
  return fetchURL.json();
}

// export async function fetchDrinkDetails(id) {
//   const fetchURL = await fetch(`${DrinkByDetails}${id}`);
//   return fetchURL.json();
// }
