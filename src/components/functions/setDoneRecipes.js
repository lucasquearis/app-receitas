const setDoneRecipes = (recipeDetails, recipeKey) => {
  const data = new Date();
  const m = 10;
  const mes = data.getMonth() + 1 < m ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
  const currentData = `${data.getDate()}/${mes}/${data.getFullYear()}`;
  const obj = {
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '' };
  obj.type = recipeKey === 'Meal' ? 'comida' : 'bebida';
  obj.doneDate = currentData;
  const rd = recipeDetails;
  if (recipeKey === 'Meal') {
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = rd;
    obj.id = idMeal;
    obj.area = strArea;
    obj.category = strCategory;
    obj.name = strMeal;
    obj.image = strMealThumb;
    obj.tags = strTags;
  } else {
    const { idDrink, strArea, strCategory, strDrink, strDrinkThumb } = rd;
    const { strAlcoholic, strTags } = rd;
    obj.id = idDrink;
    obj.area = strArea;
    obj.category = strCategory;
    obj.name = strDrink;
    obj.image = strDrinkThumb;
    obj.tags = strTags;
    obj.alcoholicOrNot = strAlcoholic;
  }
  const donaRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  let newStorage = [];
  if (donaRecipes) {
    newStorage = [...donaRecipes, { ...obj }];
  } else newStorage = [{ ...obj }];
  localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
};

export default setDoneRecipes;
