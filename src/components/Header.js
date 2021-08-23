import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img
        src={ profileIcon }
        alt="Avatar do usuário"
        testId="profile-top-btn"
      />
      <h1 data-testid="page-title">Comidas</h1>
      <img
        src={ searchIcon }
        alt="Ícone de pesquisa"
        testId="search-top-btn"
      />
    </header>
  );
}

export default Header;
