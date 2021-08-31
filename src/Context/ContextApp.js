import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LoginHook from '../Hooks/LoginHook';
import foodHook from '../Hooks/FoodHook';
import BtnFilterCategory from '../Hooks/BtnFilterCategory';
import recipesHooks from '../Hooks/recipesHooks';
import SingleRecipeHook from '../Hooks/SingleRecipeHook';
import DoneRecipeHook from '../Hooks/DoneRecipeHook';
import ModalHook from '../Hooks/ModalHook';

export const ContextApp = createContext();
export const AppProvider = ({ children }) => {
  const { singleRecipe, handleRecipe, handleFav, fav } = SingleRecipeHook();
  const { handleStart, doneRecipe, inProgress, handleBtnType } = DoneRecipeHook();
  const { handleModal } = ModalHook();
  const { searchRecipes, recipes, setRecipes } = recipesHooks();
  const { categoryMeal, categoryDrinks, filterIngredient,
    filter } = BtnFilterCategory();
  const {
    handleInput,
    Login,
    disabled,
    handleClick,
    redirect,
    setRedirect } = LoginHook();
  const { drinks, meal, getRecipes } = FoodHook();
  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  const urlRender = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  const fetchApi = async (url, type, searchInput = '') => {
    const request = await fetch(`${url}${type}${searchInput}`);
    const response = await request.json();
    return setRecipes(response.meals || response.drinks);
  };
  if (recipes.length === 0) {
    fetchApi(urlRender, 'search.php?s=');
  }

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
    setRecipes,
    setRedirect,
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
