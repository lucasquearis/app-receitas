import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ name, search }) {
  const [searchBar, setSearchBar] = useState(false);
  const searchButton = (bool) => {
    if (bool === true) {
      return (
        <button
          type="button"
          onClick={ () => setSearchBar(!searchBar) }
        >
          <img
            src={ SearchIcon }
            alt="search button"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
  };
  return (
    <header>
      <Link to="/perfil">
        <Button type="button">
          <img src={ ProfileIcon } alt="profile button" data-testid="profile-top-btn" />
        </Button>
      </Link>
      <h1 data-testid="page-title">{name}</h1>
      {searchButton(search)}
      <SearchBar display={ searchBar } />
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
