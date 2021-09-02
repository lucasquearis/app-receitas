const isChecked = (idIngr, ingredientsDone) => {
  if (ingredientsDone) {
    const checkID = ingredientsDone.some((ingr) => ingr === idIngr.toString());
    return checkID;
  }
};

export default isChecked;
