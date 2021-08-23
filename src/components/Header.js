import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <img
        className="profileIcon"
        src={ profileIcon }
        alt="Avatar do usuário"
        testId="testid" // inserir testid
      />
      <p className="header-title" data-testid="">Comidas</p>
      <img
        className="searchIcon"
        src={ searchIcon }
        alt="Ícone de pesquisa"
        testId="testid" // inserir testid
      />
    </header>
  );
}

export default Header;
