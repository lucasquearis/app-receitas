import React from 'react';
import profileIcon from '../images/profileIcon.svg';

const FinishedRecipes = () => (
  <div>
    <button type="button">
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Receitas Feitas</p>
  </div>
);

export default FinishedRecipes;
