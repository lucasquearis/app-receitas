import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header className="header-food">
      <button
        className="profile-btn"
        data-testid="profile-top-btn"
        type="button"
      >
        <img alt="button-icon" src={ profileIcon } />
      </button>
      <h1 data-testid="page-title">Comida</h1>
      <button
        className="search-btn"
        data-testid="search-top-btn"
        type="button"
      >
        <img alt="button-icon" src={ searchIcon } />
      </button>
    </header>
  );
}
