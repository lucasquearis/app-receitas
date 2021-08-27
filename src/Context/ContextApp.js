import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';

import recipesHooks from '../Hooks/recipesHooks';

import BtnFilterCategory from '../Hooks/BtnFilterCategory';

import FoodHook from '../Hooks/FoodHook';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();
  const { categoryMeal, categoryDrinks, filterIngredient, filter } = BtnFilterCategory();
  const { getRecipes } = FoodHook();

  const ContProps = {
    recipes,
    searchRecipes,
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
    categoryMeal,
    categoryDrinks,
    filterIngredient,
    filter,
    getRecipes,
  };

  return (
    <ContextApp.Provider value={ { ...ContProps } }>
      {children}
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
