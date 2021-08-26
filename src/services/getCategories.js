import { endPoints, getResponse } from './data';

// Receber lista de categorias;
const getCategories = (type) => {
  const apiURL = `${endPoints[type]}list.php?c=list`;
  return getResponse(apiURL);
};

export default getCategories;
