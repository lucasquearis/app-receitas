import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileicon from '../../images/profileIcon.svg';
import searchicon from '../../images/searchIcon.svg';

function Header({ children }) {
  return (
    <header>
      <Link to="/perfil">
        <button type="button">
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileicon }
            alt="profile"
          />
        </button>
      </Link>
      <h4 data-testid="page-title">
        {children}
      </h4>
      <button type="button">
        <input
          type="image"
          data-testid="search-top-btn"
          src={ searchicon }
          alt="Search"
        />
      </button>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
