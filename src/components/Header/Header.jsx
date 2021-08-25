import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import profileIconImg from '../../images/profileIcon.svg';
import searchIconImg from '../../images/searchIcon.svg';

function Header({ title, searchIcon }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <header>
      <Link to="/perfil" data-testid="profile-top-btn" src={ profileIconImg }>
        <img src={ profileIconImg } alt="profile-button" width="50px" height="50px" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {searchIcon && (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setDisplaySearchBar(!displaySearchBar) }
          src={ searchIconImg }
        >
          <img src={ searchIconImg } alt="search-button" width="50px" height="50px" />
        </button>)}
      {displaySearchBar && <SearchBar />}
      <CategoryFilter />
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchIcon: propTypes.bool,
};
Header.defaultProps = {
  searchIcon: false,
};

export default Header;
