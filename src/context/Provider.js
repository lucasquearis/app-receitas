import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [filter, setFilter] = useState('');

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  const favoritingRecipe = (isFav, setIsFav, id, meal) => {
    if (isFav) {
      setIsFav(false);
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipe) => recipe.idMeal !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      setIsFav(true);
      const newFavoriteRecipes = favoriteRecipes
        ? [...favoriteRecipes, meal] : [meal];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  const renderingIngredients = (meal) => {
    const ingredients = [];
    const measures = [];
    const TWENTY = 20;
    for (let index = 1; index <= TWENTY; index += 1) {
      if (meal[`strIngredient${index}`]) {
        ingredients.push(meal[`strIngredient${index}`]);
        measures.push(meal[`strMeasure${index}`]);
      }
    }
    return { ingredients, measures };
  };
  const verifyingRecipe = (id, type) => {
    const favorite = favoriteRecipes
      && favoriteRecipes.find((recipe) => recipe.idMeal === id);
    const done = doneRecipes
      && doneRecipes.find((recipe) => recipe.idMeal === id);
    const inProgress = inProgressRecipes
      && inProgressRecipes[type].find((recipe) => recipe.idMeal === id);
    return { favorite, done, inProgress };
  };

  const contextValue = {
    email,
    setEmail,
    foodData,
    setFoodData,
    drinkData,
    setDrinkData,
    drinkCategory,
    setDrinkCategory,
    foodCategory,
    setFoodCategory,
    filter,
    setFilter,
    favoritingRecipe,
    renderingIngredients,
    verifyingRecipe,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
