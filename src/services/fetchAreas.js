import { endPoints, getDefaultData, getResponse } from './data';

const fetchAreas = (text) => {
  if (!text) return getDefaultData('food');
  const apiURL = `${endPoints.food}filter.php?a=${text}`;
  return getResponse(apiURL);
};

export default fetchAreas;
