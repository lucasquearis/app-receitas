import React from 'react';
import FooterMenu from '../components/FooterMenu';
import profileIcon from '../images/profileIcon.svg';

const SearchFoodByIngredients = () => (
  <div>
    <button type="button">
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Explorar Ingredientes</p>
    <FooterMenu />
  </div>
);

export default SearchFoodByIngredients;
