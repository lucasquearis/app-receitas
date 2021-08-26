import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { getDefaultData } from '../services/data';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {
  // Armazena os dados de comida e bebida recebidos da API;
  const [data, setData] = useState({
    food: [],
    drinks: [],
  });

  // Este estado será verdadeiro quando uma requisição estiver em andamento;
  const [loading, setLoading] = useState(false);

  // Seta o estado inicial "data";
  const setInitialData = useCallback(async () => {
    setLoading(true);
    const { meals } = await getDefaultData('food');
    const { drinks } = await getDefaultData('drinks');
    setLoading(false);
    setData((prevData) => ({ ...prevData, food: meals, drinks }));
  }, []);

  useEffect(() => { setInitialData(); }, [setInitialData]);

  const contextValue = {
    data,
    loading,
    setData,
    setLoading,
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
