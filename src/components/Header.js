import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBarHeader';

function Header() {
  const [searchBar, SetSearchBar] = useState(false);

  function showSearchBar() {
    if (searchBar === false) {
      SetSearchBar(true);
    } else {
      SetSearchBar(false);
    }
  }

  return (
    <header>
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="icone-perfil" />
      </Link>
      <h3 data-testid="page-title">Header</h3>
      <button type="button" onClick={ showSearchBar } data-testid="search-top-btn">
        <img src={ searchIcon } alt="icone-de-pesquisar" />
      </button>
      {
        searchBar ? <SearchBar /> : null
      }
    </header>
  );
}

export default Header;
