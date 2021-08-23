import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header style={ { display: 'flex', justifyContent: 'space-around' } }>
      <nav data-testid="profile-top-btn">
        <img src={ profileIcon } alt="Profile" />
      </nav>
      <nav>
        <h2 data-testid="page-title">Comidas</h2>
      </nav>
      <nav data-testid="search-top-btn">
        <img src={ searchIcon } alt="Profile" />
      </nav>
    </header>
  );
}
