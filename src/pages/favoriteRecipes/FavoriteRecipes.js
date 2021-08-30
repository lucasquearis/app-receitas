import React from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import FavoriteRecipe from '../../components/FavoriteRecipe/FavoriteRecipe';

const FavoriteRecipes = () => (
  <div>
    <HeaderWithoutSearch>Receitas Favoritas</HeaderWithoutSearch>
    <button type="button" data-testid="filter-by-all-btn">All</button>
    <button type="button" data-testid="filter-by-food-btn">Food</button>
    <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    <FavoriteRecipe />
  </div>
);

export default FavoriteRecipes;
