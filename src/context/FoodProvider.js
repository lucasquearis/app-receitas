import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import MainContext from './MainContext';

function FoodProvider({ children }) {
  const [filter, setFilter] = useState('Nome');
  const [search, setSearch] = useState('');
  const [mealList, setMealList] = useState([]);

  const history = useHistory();

  const fetchIngredientFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const data = await response.json();
    if (data.meals.length === 1) {
      history.push(`/comidas/${data.meals[0].idMeal}`);
    }
    setMealList([...data.meals]);
  };
  const fetchNameFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await response.json();
    if (data.meals.length === 1) {
      history.push(`/comidas/${data.meals[0].idMeal}`);
    }
    setMealList([...data.meals]);
  };
  const fetchFirstLetterFood = async () => {
    if (search.length <= 1) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      const data = await response.json();
      if (data.meals.length === 1) {
        history.push(`/comidas/${data.meals[0].idMeal}`);
      }
      setMealList([...data.meals]);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };
  const fetchDefaultFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    console.log(data);
  };

  function handleClickFood() {
    switch (filter) {
    case 'Ingrediente':
      return fetchIngredientFood();
    case 'Nome':
      return fetchNameFood();
    case 'PrimeiraLetra':
      return fetchFirstLetterFood();
    default:
      return fetchDefaultFood();
    }
  }

  const value = {
    setFilter,
    setSearch,
    mealList,
    handleClickFood,
  };

  return (
    <MainContext.Provider value={ value }>
      { children }
    </MainContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
