import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import myContext from './MyContext';
import {
  byFoodIngredient,
  byFoodName,
  byFoodFirstLetter,
  byDrinkIngredient,
  byDrinkName,
  byDrinkFirstLetter,
} from '../services/SearchResults';

function MyProvider({ children }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const [localStorageItems, setLocalStorageItems] = useState([]);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setSearchFilter({
      [name]: value,
    });
  };

  const handleRadio = ({ target }) => {
    const { name, value } = target;
    setSelectedOption({ [name]: value });
  };

  function nullAlert() {
    return global.alert(
      'Sinto muito, não encontramos nenhuma receita para esses filtros.',
    );
  }

  async function handleFoodResults() {
    const { searchValue } = searchFilter;
    if (selectedOption.filter === 'ingredient') {
      const meals = await byFoodIngredient(searchValue);
      if (!meals) {
        nullAlert();
        return setSearchedRecipe([]);
      }
      return setSearchedRecipe(meals);
    }
    if (selectedOption.filter === 'nameSearch') {
      const meals = await byFoodName(searchValue);
      if (!meals) {
        nullAlert();
        return setSearchedRecipe([]);
      }
      return setSearchedRecipe(meals);
    }
    if (selectedOption.filter === 'first-letter') {
      if (searchValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      setSearchedRecipe(await byFoodFirstLetter(searchValue));
    }
  }

  async function handleDrinkResults() {
    const { searchValue } = searchFilter;
    if (selectedOption.filter === 'ingredient') {
      const drinks = await byDrinkIngredient(searchValue);
      if (!drinks) {
        nullAlert();
        return setSearchedRecipe([]);
      }
      return setSearchedRecipe(drinks);
    }
    if (selectedOption.filter === 'nameSearch') {
      const drinks = await byDrinkName(searchValue);
      if (!drinks) {
        nullAlert();
        return setSearchedRecipe([]);
      }
      return setSearchedRecipe(drinks);
    }
    if (selectedOption.filter === 'first-letter') {
      if (searchValue.length > 1) {
        return global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      setSearchedRecipe(await byDrinkFirstLetter(searchValue));
    }
  }

  const filterByPage = async () => {
    if (window.location.pathname === '/comidas') {
      await handleFoodResults();
    }
    if (window.location.pathname === '/bebidas') {
      await handleDrinkResults();
      setSearchFilter([]);
    }
  };

  function redirectFood() {
    if (searchedRecipe.length === 1) {
      const id = searchedRecipe[0].idMeal;
      const redirect = history.push(`/comidas/${id}`);
      setSearchedRecipe([]);
      return redirect;
    }
  }

  function redirectDrink() {
    if (searchedRecipe.length === 1) {
      const id = searchedRecipe[0].idDrink;
      const redirect = history.push(`/bebidas/${id}`);
      setSearchedRecipe([]);
      return redirect;
    }
  }

  const context = {
    searchedRecipe,
    handleChange,
    handleRadio,
    filterByPage,
    redirectFood,
    redirectDrink,
    localStorageItems,
    setLocalStorageItems,
  };

  return (
    <myContext.Provider value={ context }>
      { children }
    </myContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default MyProvider;
