import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';

import foodHook from '../Hooks/FoodHook';

import recipesHooks from '../Hooks/recipesHooks';

import BtnFilterCategory from '../Hooks/BtnFilterCategory';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();
  const { drinks, meal } = foodHook();
  const { categoryMeal, categoryDrinks } = BtnFilterCategory();

  const ContProps = {
    recipes,
    searchRecipes,
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
    drinks,
    meal,
    categoryMeal,
    categoryDrinks,
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
