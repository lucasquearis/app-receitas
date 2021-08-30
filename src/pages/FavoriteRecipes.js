import React from 'react';
import FavoriteFoodCard from '../components/FavoriteFoodCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
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
      { actualStorage.map((recipe, index) => (recipe.type === 'comida'
        ? <FavoriteFoodCard recipe={ recipe } index={ index } />
        : <FavoriteDrinkCard recipe={ recipe } index={ index } />))}
    </div>
  );
};

export default FavoriteRecipes;
