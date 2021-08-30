import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function DrinkProvider({ children }) {
  const [filter, setFilter] = useState('Nome');
  const [search, setSearch] = useState('');
  const [drinkList, setDrinkList] = useState([]);

  const history = useHistory();

  const fetchIngredientDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    const data = await response.json();
    if (data.drinks.length === 1) {
      history.push(`/bebidas/${data.drinks[0].idDrink}`);
    }
    setDrinkList([...data.drinks]);
  };
  const fetchNameDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await response.json();
    if (data.drinks.length === 1) {
      history.push(`/bebidas/${data.drinks[0].idDrink}`);
    }
    setDrinkList([...data.drinks]);
  };
  const fetchFirstLetterDrink = async () => {
    if (search.length === 1) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
      const data = await response.json();
      if (data.drinks.length === 1) {
        history.push(`/bebidas/${data.drinks[0].idDrink}`);
      }
      setDrinkList([...data.drinks]);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };
  const fetchDefaultDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    console.log(data);
  };

  function handleClickDrink() {
    switch (filter) {
    case 'Ingrediente':
      return fetchIngredientDrink();
    case 'Nome':
      return fetchNameDrink();
    case 'PrimeiraLetra':
      return fetchFirstLetterDrink();
    default:
      return fetchDefaultDrink();
    }
  }

  const value = {
    setFilter,
    setSearch,
    drinkList,
    handleClickDrink,
  };

  return (
    <MainContext.Provider value={ value }>
      { children }
    </MainContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkProvider;
