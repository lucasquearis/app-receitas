import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const SearchByOrigin = () => (
  <div>
    <button type="button">
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
    </button>
    <p data-testid="page-title">Explorar Origem</p>
    <button type="button">
      <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
    </button>
  </div>
);

export default SearchByOrigin;
