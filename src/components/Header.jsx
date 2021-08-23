import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showBar = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
    }
    setShowSearchBar(true);
  };
  return (
    <header>
      <Link to="/perfil">
        <img
          datatestid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de perfil"
        />
      </Link>
      <button onClick={ showBar } type="button">
        <img
          datatestid="search-top-btn"
          src={ searchIcon }
          alt="Icone de busca"
        />
      </button>
      <h1 datatestid="page-title">Titulo</h1>
      <div>
        { showSearchBar ? SearchBar : null }
      </div>
    </header>
  );
}

export default Header;
