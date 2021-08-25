import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFilters from '../services';

const FoodAndDrinksContext = createContext();

export const useFoodAndDrinksContext = () => useContext(FoodAndDrinksContext);

export default function FoodAndDrinksProvider({ children }) {
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

  // Armazena os dados de comida e bebida recebidos da API;
  const [data, setData] = useState({
    food: [],
    drinks: [],
  });

  // Caso a API retorne apenas um resultado este estado será verdadeiro para redirecionar;
  const [redirect, setRedirect] = useState({
    food: false,
    drinks: false,
  });

  // Este estado será verdadeiro quando uma requisição estiver em andamento;
  const [loading, setLoading] = useState(false);

  // Funções que retornam os resultados da API de acordo com os filtros;
  const filtredFood = useFilters('food', parameters);
  const filtredDrinks = useFilters('drinks', parameters);

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

  useEffect(() => {
    /// Se o usuário clicou em "buscar" na tela de comida executará a função "getFood";
    if (applyFilters.food) {
      const getFood = async () => {
        setLoading(true);
        // Recebendo o array com as comidas da API;
        const { meals } = await filtredFood();
        setLoading(false);
        // Caso a resposta da API exista, salva no estado "data" as comidas;
        if (meals) {
          setData((prevData) => ({ ...prevData, food: meals }));
          // Se houver somente uma comida, mudará o estado para redirecionar o usuário (Requisito 16);
          if (meals.length === 1) {
            setRedirect((prevRedirect) => ({ ...prevRedirect, food: true }));
          } else {
            setRedirect((prevRedirect) => ({ ...prevRedirect, food: false }));
          }
        } else {
          notFoundAlert();
        }
        setApplyFilters((prevApplies) => ({ ...prevApplies, food: false }));
      };
      getFood();
    }
  }, [applyFilters.food, filtredFood]);

  // "useEffect" para bebidas, mas é a mesma funcionalidade que o "useEffect" da linha 89;
  useEffect(() => {
    if (applyFilters.drinks) {
      const getDrinks = async () => {
        setLoading(true);
        const { drinks } = await filtredDrinks();
        setLoading(false);
        if (drinks) {
          setData((prevData) => ({ ...prevData, drinks }));
          if (drinks.length === 1) {
            setRedirect((prevRedirect) => ({ ...prevRedirect, drinks: true }));
          } else {
            setRedirect((prevRedirect) => ({ ...prevRedirect, drinks: false }));
          }
        } else {
          notFoundAlert();
        }
        setApplyFilters((prevApplies) => ({ ...prevApplies, drinks: false }));
      };
      getDrinks();
    }
  }, [applyFilters.drinks, filtredDrinks]);

  const contextValue = {
    data,
    redirect,
    loading,
    handleSetParameters,
  };

  return (
    <FoodAndDrinksContext.Provider value={ contextValue }>
      { children }
    </FoodAndDrinksContext.Provider>
  );
}

FoodAndDrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
