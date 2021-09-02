import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

import { getFromLocalStorage, setInLocalStorage } from '../helpers';

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [recipes, setRecipes] = useState([]);

  const [
    mealsToken,
    setMealsToken,
  ] = useState(getFromLocalStorage('mealsToken', 0));
  const [
    cocktailsToken,
    setCocktailsToken,
  ] = useState(getFromLocalStorage('cocktailsToken', 0));
  const [
    doneRecipes,
    setDoneRecipes,
  ] = useState(getFromLocalStorage('doneRecipes', []));
  const [
    inProgressRecipes,
    setInProgressRecipes,
  ] = useState(getFromLocalStorage('inProgressRecipes', {
    cocktails: [],
    meals: [],
  }));
  const [
    favoriteRecipes,
    setFavoriteRecipes,
  ] = useState(getFromLocalStorage('favoriteRecipes', []));

  useEffect(
    () => setInLocalStorage('mealsToken', mealsToken),
    [mealsToken],
  );

  useEffect(
    () => setInLocalStorage('cocktailsToken', cocktailsToken),
    [cocktailsToken],
  );

  useEffect(
    () => setInLocalStorage('doneRecipes', doneRecipes),
    [doneRecipes],
  );

  useEffect(
    () => setInLocalStorage('inProgressRecipes', inProgressRecipes),
    [inProgressRecipes],
  );

  useEffect(
    () => setInLocalStorage('favoriteRecipes', favoriteRecipes),
    [favoriteRecipes],
  );

  const contextValue = {
    cocktailsToken,
    doneRecipes,
    favoriteRecipes,
    inProgressRecipes,
    isLoading,
    mealsToken,
    recipes,
    selectedArea,
    selectedCategory,
    selectedIngredient,
    setCocktailsToken,
    setDoneRecipes,
    setFavoriteRecipes,
    setInProgressRecipes,
    setIsLoading,
    setMealsToken,
    setRecipes,
    setSelectedArea,
    setSelectedCategory,
    setSelectedIngredient,
    setShowBar,
    showBar,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
