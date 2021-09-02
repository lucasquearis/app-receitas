const createIngredientsAndMesure = (recipe, value) => {
  let count = 1;
  const arrValue = [];

  if (value === 'ingredients') {
    while (recipe[`strIngredient${count}`]) {
      arrValue.push(recipe[`strIngredient${count}`]);
      count += 1;
    }
  } else if (value === 'mesure') {
    while (recipe[`strIngredient${count}`]) {
      arrValue.push(recipe[`strMeasure${count}`]);
      count += 1;
    }
  }

  return arrValue;
};

export default createIngredientsAndMesure;
