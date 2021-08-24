import { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function RequestAPI() {
  const [api, setApi] = useState('');
  const { filter: { type, search } } = useContext(Context);

  switch (type) {
  case 'ingredient':
    setApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    break;
  case 'name':
    setApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    break;
  case 'first-letter':
    setApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    break;
  default:
    break;
  }

  useEffect(() => {
    console.log(api);
  });

  return [api];
}

export default RequestAPI;
