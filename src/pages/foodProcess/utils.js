export const updateLocalStorage = (id, ing, array) => {
  const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (key.meals[id] && key.meals[id].includes(ing)) {
    key.meals[id] = key.meals[id].filter((ingredient) => ingredient !== ing);
  } else {
    key.meals[id] = [...array, ing];
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(key));
};

export const ingredientsMeasuresFunc = (obj) => {
  const objKey = Object.keys(obj);
  const objEntries = Object.entries(obj[objKey][0]);

  const objEntriesIngredient = objEntries.filter((entry) => (
    entry[0].includes('strIngredient') && entry[1]))
    .map((entryI) => entryI[1]);

  const objEntriesMeasure = objEntries.filter((entry) => (
    entry[0].includes('strMeasure') && entry[1]))
    .map((entryI) => entryI[1]);

  const entriesIngredientArrays = objEntriesIngredient.map((ingredient, index) => (
    `${ingredient} - ${objEntriesMeasure[index]}`
  ));

  return entriesIngredientArrays;
};

export default ingredientsMeasuresFunc;
