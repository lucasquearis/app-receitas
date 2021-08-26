import { endPoints, getDefaultData, getResponse } from './data';

const fetchCategories = (type, selected) => {
  if (!selected[type]) return getDefaultData(type);
  const apiURL = `${endPoints[type]}filter.php?c=${selected[type]}`;
  return getResponse(apiURL);
};

export default fetchCategories;
