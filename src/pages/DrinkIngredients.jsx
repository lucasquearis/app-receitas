import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function DrinksIngredients() {
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
      </button>
      <h2 data-testid="page-title">Explorar Ingredientes</h2>
    </header>
  );
}

export default DrinksIngredients;
