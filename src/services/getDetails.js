import { endPoints, getResponse } from './data';

const getDetails = (type, id) => {
  const URL = endPoints[type];

  return getResponse(`${URL}lookup.php?i=${id}`);
};

export default getDetails;
