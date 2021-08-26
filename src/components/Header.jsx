import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { titulo } = props;

  const showBar = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };
  return (
    <header>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Icone de perfil"
        />
      </Link>
      <button onClick={ showBar } type="button">
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Icone de busca"
        />
      </button>
      <h1 data-testid="page-title">{ titulo }</h1>
      <div>
        { showSearchBar ? <SearchBar /> : null }
      </div>
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;
