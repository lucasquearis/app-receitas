import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, search = true }) {
  const [showSearch, setShowSearch] = useState(false);
  const renderSearch = () => (
    <button
      type="button"
      className="search-btn"
      onClick={ () => setShowSearch(!showSearch) }
    >
      <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
    </button>
  );
  return (
    <>
      <header>
        <Link to="/perfil">
          <button
            type="button"
            className="profile-top-btn"
          >
            <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
          </button>
        </Link>
        <h1 data-testid="page-title">
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
