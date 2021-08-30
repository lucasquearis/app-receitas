import React from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';
import FavoriteRecipe from '../../components/FavoriteRecipe/FavoriteRecipe';

const FavoriteRecipes = () => (
  <div>
    <HeaderWithoutSearch>Receitas Favoritas</HeaderWithoutSearch>
    <FavoriteRecipe />
  </div>
);

export default FavoriteRecipes;
