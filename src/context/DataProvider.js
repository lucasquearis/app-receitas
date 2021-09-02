import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { getDefaultData } from '../services/data';
import { getCategories, getAreas, getIngredients } from '../services';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {
  // Armazena os dados de comida e bebida recebidos da API;
  const [data, setData] = useState({
    food: [],
    drinks: [],
  });
  const [locationData, setLocationData] = useState([]);

  // Categorias e áreas;
  const [categories, setCategories] = useState({
    food: [],
    drinks: [],
  });

  const [ingredients, setIngredients] = useState({
    food: [],
    drinks: [],
  });

  const [areas, setAreas] = useState([]);

  // Este estado será verdadeiro quando uma requisição estiver em andamento;
  const [loading, setLoading] = useState(false);

  // Seta o estado inicial "data";
  const setInitialData = useCallback(async () => {
    setLoading(true);
    const { meals } = await getDefaultData('food');
    const { drinks } = await getDefaultData('drinks');
    setLoading(false);
    setData((prevData) => ({ ...prevData, food: meals, drinks }));
    setLocationData(meals);
  }, []);

  useEffect(() => { setInitialData(); }, [setInitialData]);

  // Quando o componente for montado, salva as categorias no estado
  const sendCategories = useCallback(async () => {
    const { meals } = await getCategories('food');
    const { drinks } = await getCategories('drinks');
    setCategories((prevCategories) => ({
      ...prevCategories,
      food: meals,
      drinks,
    }));
  }, []);

  useEffect(() => { sendCategories(); }, [sendCategories]);

  // Quando o componente for montado, salva os ingredientes no estado
  const sendIngredients = useCallback(async () => {
    const { meals } = await getIngredients('food');
    const { drinks } = await getIngredients('drinks');

    // Só mudei o nome do parâmetro;
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      food: meals,
      drinks,
    }));
  }, []);

  useEffect(() => { sendIngredients(); }, [sendIngredients]);

  // Quando o componente for montado, salva as áreas no estado
  const sendAreas = useCallback(async () => {
    const { meals } = await getAreas();
    setAreas(meals);
  }, []);

  useEffect(() => { sendAreas(); }, [sendAreas]);

  const contextValue = {
    data,
    areas,
    categories,
    ingredients,
    loading,
    locationData,
    setData,
    setLoading,
    setLocationData,
  };

  return (
    <DataContext.Provider value={ contextValue }>
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
