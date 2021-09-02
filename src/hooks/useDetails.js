import { useCallback, useEffect, useState } from 'react';
import { capitalizeFirstLetter, endpoints } from '../services';

const um = -1;

const detailsEndpoints = {
  comidas: (id) => fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`),
  bebidas: (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`),
};

const useDetails = (type, id) => {
  const [details, setDetails] = useState('');
  const [recomendations, setRecomendations] = useState('');

  const getDetails = useCallback(async () => {
    let request = await detailsEndpoints[type](id);
    request = await request.json();
    const helper = { ...request[`${request.meals ? 'meals' : 'drinks'}`][0] };
    helper.prefix = capitalizeFirstLetter(
      `${request.meals ? 'meals' : 'drinks'}`,
    ).slice(0, um);
    setDetails(helper);
  }, [id, type]);

  const getRecomendations = useCallback(async () => {
    let request = await endpoints[type === 'comidas' ? 'bebidas' : 'comidas'].name('');
    request = await request.json();
    setRecomendations(request[request.meals ? 'meals' : 'drinks']);
  }, [type]);

  useEffect(() => {
    if (type && id) {
      getDetails();
      getRecomendations();
    }
  }, [getDetails, getRecomendations, type, id]);

  return {
    details,
    recomendations,
  };
};

export default useDetails;
