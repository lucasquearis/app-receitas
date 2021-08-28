export const ingredientsMeasuresFunc = (obj) => {
  const objKey = Object.keys(obj)
  const objEntries = Object.entries(obj[objKey][0]);

  const objEntriesIngredient = objEntries.filter((entry) => 
    entry[0].includes('strIngredient'))
      .filter((array) => array[1] !== "")
        .filter((array) => array[1] !== null)
          .map((array) => array[1])

  const objEntriesMeasure = objEntries.filter((entry) => 
    entry[0].includes('strMeasure'))
    .filter((array) => array[1] !== "")
      .filter((array) => array[1] !== null)
        .map((array) => array[1])
      

  const entriesIngredientArrays = objEntriesIngredient.map((ingredient, index) => `${ingredient} - ${objEntriesMeasure[index]} `)

  return entriesIngredientArrays;
}