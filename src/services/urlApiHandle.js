const urlApiHandle = (id, receita) => {
  const URLCOMIDA = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLBEBIDA = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLComidaRec = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const URLBebidaRec = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlRecipe = receita === 'comidas' ? URLCOMIDA : URLBEBIDA;
  const urlRecomend = receita === 'comidas' ? URLBebidaRec : URLComidaRec;
  const objreturn = [urlRecipe, urlRecomend];
  return objreturn;
};

/*
solução da lógica para achar palavras iguais
https://pt.stackoverflow.com/questions/3021/como-posso-checar-se-uma-string-cont%C3%A9m-outra-em-javascript
 */

export const DataManeger = (data, receita) => {
  if (receita === 'comidas' && data) {
    const { meals } = data;
    const indexofsamestring = -1;
    const ingredients = Object.entries(meals[0])
      .filter((n) => n[0].indexOf('strIngredient') !== indexofsamestring);
    const measures = Object.entries(meals[0])
      .filter((n) => n[0].indexOf('strMeasure') !== indexofsamestring);
    const obj = {
      tittle: meals[0].strMeal,
      img: meals[0].strMealThumb,
      area: meals[0].strArea,
      youlink: meals[0].strYoutube,
      category: meals[0].strCategory,
      Instructions: meals[0].strInstructions,
      tag: meals[0].strTags,
      ingredients: [ingredients],
      measures: [measures],
    };
    return obj;
  }
  const { drinks } = data;
  const indexofsamestring = -1;
  const ingredients = Object.entries(drinks[0])
    .filter((n) => n[0].indexOf('strIngredient') !== indexofsamestring);
  const measures = Object.entries(drinks[0])
    .filter((n) => n[0].indexOf('strMeasure') !== indexofsamestring);
  const objdrink = {
    tittle: drinks[0].strDrink,
    img: drinks[0].strDrinkThumb,
    type: drinks[0].strAlcoholic,
    category: drinks[0].strCategory,
    Instructions: drinks[0].strInstructions,
    tag: drinks[0].strTags,
    ingredients: [ingredients],
    measures: [measures],
  };
  return objdrink;
};

export default urlApiHandle;
