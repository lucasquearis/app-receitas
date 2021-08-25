import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFilters from '../services';

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export default function MyProvider({ children }) {
  const [applyFilters, setApplyFilters] = useState({
    food: false,
    drinks: false,
  });

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

  const [data, setData] = useState({
    food: [],
    drinks: [],
  });

  const [redirect, setRedirect] = useState({
    food: false,
    drinks: false,
  });

  const [loading, setLoading] = useState(false);

  const filtredFood = useFilters('food', parameters);
  const filtredDrinks = useFilters('drinks', parameters);

  const notFoundAlert = () => (
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
  );

  const handleSetParameters = (filters, url) => {
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
    if (applyFilters.food) {
      const getFood = async () => {
        setLoading(true);
        const { meals } = await filtredFood();
        setLoading(false);
        setApplyFilters((prevApplies) => ({ ...prevApplies, food: false }));
        if (meals) {
          setData((prevData) => ({ ...prevData, food: meals }));
          if (meals.length === 1) {
            setRedirect((prevRedirect) => ({ ...prevRedirect, food: true }));
          } else {
            setRedirect((prevRedirect) => ({ ...prevRedirect, food: false }));
          }
        } else {
          notFoundAlert();
        }
      };
      getFood();
    }
  }, [applyFilters.food, filtredFood]);

  useEffect(() => {
    if (applyFilters.drinks) {
      const getDrinks = async () => {
        setLoading(true);
        const { drinks } = await filtredDrinks();
        setLoading(false);
        setApplyFilters((prevApplies) => ({ ...prevApplies, drinks: false }));
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
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
