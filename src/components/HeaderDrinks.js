import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './headerDrinks.css';

const Header = () => (
  <div className="header-container">
    <div className="header">
      <button type="button">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
      <p data-testid="page-title">Bebidas</p>
      <button type="button">
        <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
      </button>
    </div>
  </div>
);

export default Header;
