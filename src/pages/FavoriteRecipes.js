import React from 'react';
import profileIcon from '../images/profileIcon.svg';

const FavoriteRecipes = () => {
  const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(actualStorage);
  return (
    <div>
      <div>
        <button type="button">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">Receitas Favoritas</h2>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
