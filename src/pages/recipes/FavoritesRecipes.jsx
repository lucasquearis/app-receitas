import React, { useState, useEffect } from 'react';
import FavoriteRecipesCard from './FavoriteRecipesCard';
import Header from '../../components/Header';
import './favoriteRecipes.css';

export default function FavoritesRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  function getFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(recipes);
    setFilteredRecipes(recipes);
    setIsMounted(true);
    setFilter('');
  }

  function getFavoriteRecipesFoods() {
    const favoriteFoods = favoriteRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(favoriteFoods);
    setFilter('comida');
  }

  function getFavoriteRecipesDrinks() {
    const favoriteDrinks = favoriteRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(favoriteDrinks);
    setFilter('bebida');
  }

  function removeFavorite() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFilteredRecipes(recipes);
  }

  useEffect(() => {
    if (!isMounted) getFavoriteRecipes();
  });
  return (
    <>
      <Header title="Receitas Favoritas" />
      <div className="container-filters">
        <button
          className="filter-favorite-btn"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getFavoriteRecipes }
          style={ { backgroundColor: `${filter === '' ? '#350' : '#673'}` } }
        >
          All
        </button>
        <button
          className="filter-favorite-btn"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ getFavoriteRecipesFoods }
          style={ { backgroundColor: `${filter === 'comida' ? '#350' : '#673'}` } }
        >
          Food
        </button>
        <button
          className="filter-favorite-btn"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ getFavoriteRecipesDrinks }
          style={ { backgroundColor: `${filter === 'bebida' ? '#350' : '#673'}` } }
        >
          Drink
        </button>
      </div>
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <FavoriteRecipesCard
          key={ index }
          index={ index }
          recipe={ recipe }
          isFood={ recipe.type === 'comida' }
          removeFavorite={ removeFavorite }
        />
      ))}
    </>
  );
}
