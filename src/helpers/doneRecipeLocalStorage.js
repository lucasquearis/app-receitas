function saveDoneMeal(rcp) {
  const doneRecipes = JSON.parse(localStorage.doneRecipes);
  if (!doneRecipes.some(({ id }) => id === rcp.idMeal)) {
    localStorage.setItem('doneRecipes', JSON.stringify([
      ...doneRecipes,
      {
        id: rcp.idMeal,
        type: 'comida',
        area: rcp.strArea ? rcp.strArea : '',
        category: rcp.strCategory ? rcp.strCategory : '',
        alcoholicOrNot: rcp.strAlcoholic ? rcp.strAlcoholic : '',
        name: rcp.strMeal,
        image: rcp.strMealThumb,
        doneDate: new Date().toLocaleDateString('pt-BR'),
        tags: rcp.strTags ? rcp.strTags.split(',') : [],
      },
    ]));
  }
}

function saveDoneDrink(rcp) {
  const doneRecipes = JSON.parse(localStorage.doneRecipes);
  if (!doneRecipes.some(({ id }) => id === rcp.idDrink)) {
    localStorage.setItem('doneRecipes', JSON.stringify([
      ...doneRecipes,
      {
        id: rcp.idDrink,
        type: 'bebida',
        area: rcp.strArea ? rcp.strArea : '',
        category: rcp.strCategory ? rcp.strCategory : '',
        alcoholicOrNot: rcp.strAlcoholic ? rcp.strAlcoholic : '',
        name: rcp.strDrink,
        image: rcp.strDrinkThumb,
        doneDate: new Date().toLocaleDateString('pt-BR'),
        tags: rcp.strTags ? rcp.strTags : '',
      },
    ]));
  }
}

export default function saveDoneRecipe(rcp, type) {
  if (type === 'meal') return saveDoneMeal(rcp);
  if (type === 'drink') return saveDoneDrink(rcp);
}
