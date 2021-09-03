function getNewIng(getData, databaseKey, max) {
  const newIng = [];
  for (let index = 1; index <= max; index += 1) {
    const ing = getData[databaseKey][0][`strIngredient${index}`];
    const mea = getData[databaseKey][0][`strMeasure${index}`];
    if (ing === '' || ing === null || ing === undefined) break;
    newIng.push(`${ing} - ${mea}`);
  }
  return newIng;
}

export default getNewIng;
