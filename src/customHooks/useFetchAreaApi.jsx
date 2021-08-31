import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

function useFetchAreaApi() {
  const { setDataArea } = useContext(Context);

  // faz requisicao para receber as areas da mealsApi
  const getAreaApi = async () => {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    setDataArea(meals);
  };
  return [getAreaApi];
}

export default useFetchAreaApi;
