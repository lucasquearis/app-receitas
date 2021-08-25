import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');

  const favoritingRecipe = (...params) => {
    if (params.isFav) {
      params.setIsFav(false);
      const newFavoriteRecipes = params.favoriteRecipes
        .filter((recipe) => recipe.idMeal !== params.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      params.setIsFav(true);
      const newFavoriteRecipes = params.favoriteRecipes
        ? [...params.favoriteRecipes, params.meal] : [params.meal];
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

  const contextValue = { email, setEmail, favoritingRecipe, renderingIngredients };

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
