import { endPoints, getResponse } from './data';

const getIngredients = (type) => {
  const apiURL = `${endPoints[type]}list.php?i=list`;
  return getResponse(apiURL);
};

export default getIngredients;
