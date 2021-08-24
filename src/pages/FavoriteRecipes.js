import React from 'react';
import profileIcon from '../images/profileIcon.svg';

const FavoriteRecipes = () => (
  <div>
    <button type="button">
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Receitas Favoritas</p>
  </div>
);

export default FavoriteRecipes;
