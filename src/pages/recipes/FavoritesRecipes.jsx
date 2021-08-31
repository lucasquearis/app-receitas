import React, { useState, useEffect } from 'react';
import FavoriteRecipesCard from './FavoriteRecipesCard';
import Header from '../../components/Header';

export default function FavoritesRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  function getFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
    setFilteredRecipes(recipes);
    setIsMounted(true);
  }

  function getFavoriteRecipesFoods() {
    const favoriteFoods = favoriteRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(favoriteFoods);
  }

  function getFavoriteRecipesDrinks() {
    const favoriteDrinks = favoriteRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(favoriteDrinks);
  }

  function removeFavorite() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFilteredRecipes(recipes);
  }

  useEffect(() => {
    if (!isMounted) getFavoriteRecipes();
  });
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getFavoriteRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ getFavoriteRecipesFoods }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ getFavoriteRecipesDrinks }
      >
        Drink
      </button>
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <FavoriteRecipesCard
          key={ index }
          index={ index }
          recipe={ recipe }
          isFood={ recipe.type === 'comida' }
          removeFavorite={ removeFavorite }
        />
      ))}
    </div>
  );
}
