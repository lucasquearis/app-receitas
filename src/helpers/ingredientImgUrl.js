function ingredientImageUrl(name, path) {
  if (path === '/explorar/comidas/ingredientes') {
    return (`https://www.themealdb.com/images/ingredients/${name}-Small.png`);
  }
  return (`https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);
}

export default ingredientImageUrl;
