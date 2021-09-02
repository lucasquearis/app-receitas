import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../App.css';

export default function Header({ title, search = true }) {
  const [showSearch, setShowSearch] = useState(false);
  const renderSearch = () => (
    <button
      type="button"
      className="header-brn"
      onClick={ () => setShowSearch(!showSearch) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search icon"
        style={ { width: '9vw', height: '7vh' } }
      />
    </button>
  );
  return (
    <>
      <header className="div-header">
        <Link to="/perfil">
          <button
            type="button"
            className="profile-top-btn header-brn"
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
              style={ { width: '6vh' } }
            />
          </button>
        </Link>
        <h1
          data-testid="page-title"
          className="header-title"
        >
          {title}
        </h1>
        {search && renderSearch()}
      </header>
      { showSearch && <SearchBar /> }
    </>

  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: PropTypes.bool,
};
