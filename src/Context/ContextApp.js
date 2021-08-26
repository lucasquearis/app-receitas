import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';
import recipesHooks from '../Hooks/recipesHooks';
import IngredientHooks from '../Hooks/IngredientsHooks';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();
  const { ingredients, getIngredients } = IngredientHooks();

  const ContProps = {
    recipes,
    searchRecipes,
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
    ingredients,
    getIngredients,
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
