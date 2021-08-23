import React from 'react';
import profileIcon from '../images/profileIcon.svg';

const SearchDrinksByIngredients = () => (
  <div>
    <button type="button">
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Explorar Ingredientes</p>
  </div>
);

export default SearchDrinksByIngredients;
