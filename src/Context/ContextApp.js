import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';
import foodHook from '../Hooks/FoodHook';
import recipesHooks from '../Hooks/recipesHooks';
import SingleRecipeHook from '../Hooks/SingleRecipeHook';
import DoneRecipeHook from '../Hooks/DoneRecipeHook';
import ModalHook from '../Hooks/ModalHook';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const { handleInput, Login, disabled, handleClick, redirect } = LoginHook();
  const { drinks, meal } = foodHook();
  const { singleRecipe, handleRecipe, handleFav, fav } = SingleRecipeHook();
  const { handleStart, doneRecipe, inProgress, handleBtnType } = DoneRecipeHook();
  const { handleModal } = ModalHook();

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
    handleStart,
    doneRecipe,
    inProgress,
    handleBtnType,
    handleModal,
    handleFav,
    fav,
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
