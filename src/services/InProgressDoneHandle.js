export const InProgressObj = (ID, INGREDIENTS) => {
  const obj = {
    [ID]: INGREDIENTS,
  };
  return obj;
};

export const CreateLocalStorage = () => {
  const obj = { cocktails: { }, meals: { } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

const newobjObj = (array, ID, INGREDIENTS, thetype) => {
  const type = thetype === 'meals' ? 'meals' : 'cocktails';
  const antitype = thetype === 'meals' ? 'cocktails' : 'meals';
  const objmealsEntries = Object.entries(array[type]);
  if (objmealsEntries.find((n) => n[0] === ID)) {
    return console.log('tem a pagina já');
  }
  const newid = (INGREDIENTS.ingredients[0].map((n) => (
    n[1] !== '' && n[1] !== null
      ? n[1]
      : null
  )).filter((n) => (n !== null)));
  const addReciToInProg = Object.entries({ [ID]: newid });
  objmealsEntries.push(addReciToInProg[0]);
  const ObjectForming = Object.fromEntries(objmealsEntries);
  const objreturn = {
    [antitype]: array[antitype],
    [type]: ObjectForming,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(objreturn));
};

const SetInProgress = (ID, TYPE, INGREDIENTS) => {
  const obj = localStorage.getItem('inProgressRecipes');
  const objjson = JSON.parse(obj);
  if (objjson === null) {
    CreateLocalStorage();
    return SetInProgress(ID, TYPE, INGREDIENTS);
  }
  if (TYPE === 'comidas' && INGREDIENTS) {
    newobjObj(objjson, ID, INGREDIENTS, 'meals');
  }
  if (TYPE === 'bebidas' && INGREDIENTS) {
    newobjObj(objjson, ID, INGREDIENTS, 'cocktails');
  }
};

export default SetInProgress;
