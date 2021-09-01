export const ingredientsMeasuresFunc = (obj) => {
  const objKey = Object.keys(obj);
  const objEntries = Object.entries(obj[objKey][0]);
  console.log(obj);

  const objEntriesIngredient = objEntries.filter((entry) => (
    entry[0].includes('strIngredient') && entry[1]))
    .map((array) => array[1]);

  const objEntriesMeasure = objEntries.filter((entry) => (
    entry[0].includes('strMeasure') && entry[1]))
    .map((array) => array[1]);

  const entriesIngredientArrays = objEntriesIngredient.map((ingredient, index) => (
    `${ingredient} - ${objEntriesMeasure[index]}`));

  return entriesIngredientArrays;
};

export default ingredientsMeasuresFunc;
