// https://github.com/tryber/sd-011-project-recipes-app/pull/1280/files

function ingredientsDetails(details) {
  const currentPage = window.location.pathname;
  let num1;
  let num2;
  let num3;

  const nine = 9;
  const four = 4;
  const fifteen = 15;
  const seventeen = 17;
  const twenty = 20;
  const fourtySix = 46;
  const fourtyEigth = 48;
  if (currentPage.includes('comidas')) {
    num1 = nine;
    num2 = twenty;
    num3 = fourtyEigth;
  } else if (currentPage.includes('bebidas')) {
    num1 = seventeen;
    num2 = fifteen;
    num3 = fourtySix;
  }

  const ingredientsList = (Object.entries(details).filter((entrie, index) => {
    if (index >= num1 && index <= num3) {
      return entrie;
    }
    return null;
  }).map((ingredient, index, array) => {
    if (index < num2) {
      return `${ingredient[1]} - ${array[index + num2][1]}`;
    }
    return null;
  }).filter((ingredient) => (
    ingredient && ingredient.length > four && !ingredient.includes('null'))));
  return ingredientsList;
}

export default ingredientsDetails;
