import { endPoints, getDefaultData, getResponse } from './data';

const fetchCategories = (type, category = '') => {
  if (!category) return getDefaultData(type);
  const apiURL = `${endPoints[type]}filter.php?c=${category}`;
  return getResponse(apiURL);
};

export default fetchCategories;
