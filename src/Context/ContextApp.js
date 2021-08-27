import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';
import foodHook from '../Hooks/FoodHook';
import recipesHooks from '../Hooks/recipesHooks';
import SingleRecipeHook from '../Hooks/SingleRecipeHook';
import DoneRecipeHook from '../Hooks/DoneRecipeHook';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();
  const { drinks, meal } = foodHook();
  const { singleRecipe, handleRecipe } = SingleRecipeHook();
  const { handleDone, doneRecipe } = DoneRecipeHook();

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
    singleRecipe,
    handleRecipe,
    handleDone,
    doneRecipe,
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
