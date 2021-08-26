import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { getFilters } from '../services';
import { useDataContext } from './DataProvider';

const FiltersContext = createContext();

export const useFiltersContext = () => useContext(FiltersContext);

export default function FiltersProvider({ children }) {
  const { setData, setLoading } = useDataContext();
  // Estado que será atualizado quando o usuário clicar em "buscar"
  const [applyFilters, setApplyFilters] = useState({
    food: false,
    drinks: false,
  });

  // Armazena os filtros que o usuário escolheu;
  const [parameters, setParameters] = useState({
    food: {
      text: '',
      filter: '',
    },
    drinks: {
      text: '',
      filter: '',
    },
  });

  // Caso a API retorne apenas um resultado este estado será verdadeiro para redirecionar;
  const [redirect, setRedirect] = useState({
    food: false,
    drinks: false,
  });

  // Alert do Requisito 18;
  const notFoundAlert = () => (
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
  );

  // Função que salva no estado os filtros do usuário;
  const handleSetParameters = (filters, url) => {
    // É executada quando o usuário clica em "buscar";
    const foodURL = '/comidas';
    const drinksURL = '/bebidas';

    const isFood = url.includes(foodURL);
    const isDrink = url.includes(drinksURL);

    setParameters((prevParams) => {
      if (isFood) {
        return {
          ...prevParams,
          food: { ...prevParams.food, ...filters },
        };
      }
      if (isDrink) {
        return {
          ...prevParams,
          drinks: { ...prevParams.drinks, ...filters },
        };
      }
      return prevParams;
    });

    setApplyFilters((prevApplies) => {
      if (isFood) {
        return { ...prevApplies, food: true };
      }
      if (isDrink) {
        return { ...prevApplies, drinks: true };
      }
      return prevApplies;
    });
  };

  const getFiltredData = useCallback(async () => {
    // Funções que retornam os resultados da API de acordo com os filtros;
    const filtredFood = getFilters('food', parameters);
    const filtredDrinks = getFilters('drinks', parameters);

    // Recebendo o array com as comidas da API;
    if (applyFilters.food) {
      setLoading(true);
      const { meals } = await filtredFood();
      setLoading(false);
      // Caso a resposta da API exista, salva no estado "data" as comidas;
      if (meals) {
        setData((prevData) => ({ ...prevData, food: meals }));
        // Se houver somente uma comida, mudará o estado para redirecionar o usuário (Requisito 16);
        if (meals.length === 1) {
          setRedirect((prevRedirect) => ({ ...prevRedirect, food: true }));
        }
        setRedirect((prevRedirect) => ({ ...prevRedirect, food: false }));
      } else {
        notFoundAlert();
      }
      setApplyFilters((prevApplies) => ({ ...prevApplies, food: false }));
    }
    if (applyFilters.drinks) {
      setLoading(true);
      const { drinks } = await filtredDrinks();
      setLoading(false);
      if (drinks) {
        setData((prevData) => ({ ...prevData, drinks }));
        if (drinks.length === 1) {
          setRedirect((prevRedirect) => ({ ...prevRedirect, drinks: true }));
        }
        setRedirect((prevRedirect) => ({ ...prevRedirect, drinks: false }));
      } else {
        notFoundAlert();
      }
      setApplyFilters((prevApplies) => ({ ...prevApplies, drinks: false }));
    }
  }, [applyFilters.drinks, applyFilters.food, parameters, setData, setLoading]);

  useEffect(() => { getFiltredData(); }, [getFiltredData]);

  const contextValue = {
    handleSetParameters,
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
