import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title, searchIcon = '' }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const clickSearch = () => {
    if (showSearchBar === false) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  const renderSearchIcon = () => {
    if (searchIcon) {
      return (
        <button type="button" className="search-button" onClick={ clickSearch }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      );
    }
    return <div />;
  };

  return (
    <header>
      <div className="header-div">
        <Link to="/perfil" className="profile-link">
          <img
            className="profile-icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </Link>
        <h3 data-testid="page-title">{ title }</h3>
        { renderSearchIcon() }
      </div>
      { showSearchBar && <SearchBar title={ title } /> }
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
