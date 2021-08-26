export const validateEmailPassword = (email, password) => {
  const re = /\w+@\w+.com/.test(email);
  const minimumPasswordLength = 7;
  const validPassword = password.length >= minimumPasswordLength;
  const logicValidation = re && validPassword;
  return logicValidation;
};

export const saveLoginInfoLocalStorage = (userEmail) => {
  const user = {
    email: userEmail,
  };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const filterIngredientsDetails = (recipe) => {
  const ingredientsMeaseure = [];
  const ingredients = Object.entries(recipe)
    .filter((value) => value[0].includes('strIngredient') && value[1]);
  const measures = Object.entries(recipe)
    .filter((value) => value[0].includes('strMeasure') && value[1]);
  for (let index = 0; index < ingredients.length; index += 1) {
    ingredientsMeaseure.push([ingredients[index][1], measures[index][1]]);
  }
  return ingredientsMeaseure;
};
