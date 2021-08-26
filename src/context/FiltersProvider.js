import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { getFilters } from '../services';
import { useDataContext } from './DataProvider';

const FiltersContext = createContext();

export const useFiltersContext = () => useContext(FiltersContext);

export default function FiltersProvider({ children }) {
  const { setData, setLoading } = useDataContext();

  // Caso a API retorne apenas um resultado este estado será verdadeiro para redirecionar;
  const [redirect, setRedirect] = useState(false);

  // Alert do Requisito 18;
  const notFoundAlert = () => (
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
  );

  // Função que salva no estado os filtros do usuário;
  const handleFilterAPI = async (filters, url) => {
    // É executada quando o usuário clica em "buscar";
    const foodURL = '/comidas';
    const types = url.includes(foodURL)
      ? { type: 'food', response: 'meals' }
      : { type: 'drinks', response: 'drinks' };

    setLoading(true);
    const recipes = await getFilters(types.type, filters);
    setLoading(false);

    if (recipes[types.response]) {
      setData((prevData) => ({
        ...prevData,
        [types.type]: recipes[types.response] }));
      // Se houver somente uma comida, mudará o estado para redirecionar o usuário (Requisito 16);
      if (recipes[types.response].length === 1) {
        setRedirect(true);
      }
      setRedirect(false);
    } else {
      notFoundAlert();
    }
  };

  const contextValue = {
    handleFilterAPI,
    redirect,
  };

  return (
    <FiltersContext.Provider value={ contextValue }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
