import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header>
      <Link data-testid="profile-top-btn" to="/perfil">
        <img src={ profileIcon } alt="profile" />
      </Link>
      <h2 data-testid="page-title">Aqui sera dinamico</h2>
      <Link to="/">
        <button
          type="button"
          data-test-id="search-top-btn"
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      </Link>
    </header>
  );
}

export default Header;
