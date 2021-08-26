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

  const favoritingRecipe = (isFav, setIsFav, id, food) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFav) {
      setIsFav(false);
      const newFavoriteRecipes = favoriteRecipes
        .filter((rcp) => (rcp.idMeal ? rcp.idMeal !== id : rcp.idDrink !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      setIsFav(true);
      const newFavoriteRecipes = favoriteRecipes
        ? [...favoriteRecipes, food] : [food];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
  };

  const renderingIngredients = (food) => {
    const ingredients = [];
    const measures = [];
    const TWENTY = 20;
    for (let index = 1; index <= TWENTY; index += 1) {
      if (food[`strIngredient${index}`]) {
        ingredients.push(food[`strIngredient${index}`]);
        measures.push(food[`strMeasure${index}`]);
      }
    }
    return { ingredients, measures };
  };
  const verifyingRecipe = (id, type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favorite = favoriteRecipes
      && favoriteRecipes.find((recipe) => recipe.id === id);
    const done = doneRecipes
      && doneRecipes.find((recipe) => recipe.id === id);
    const inProgress = inProgressRecipes
      && Object.keys(inProgressRecipes[type]).find((recipeId) => recipeId === id);
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
