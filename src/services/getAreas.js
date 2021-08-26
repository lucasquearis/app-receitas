import { endPoints, getResponse } from './data';

// Receber lista de categorias;
const getAreas = () => {
  const apiURL = `${endPoints.food}list.php?a=list`;
  return getResponse(apiURL);
};

export default getAreas;
