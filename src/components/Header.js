import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBar, SetSearchBar] = useState(false);
  const { title } = props;

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
      <h3 data-testid="page-title">{ title }</h3>
      <button type="button" onClick={ showSearchBar } data-testid="search-top-btn">
        <img src={ searchIcon } alt="icone-de-pesquisar" />
      </button>
      {
        searchBar ? <SearchBar /> : null
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.func.isRequired,
};

export default Header;
