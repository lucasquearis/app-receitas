import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title, hideSearch }) {
  return (
    <header>
      <div data-testid="page-title">
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
        </Link>
        { title }
        { !hideSearch && (
          <button id="search-btn" type="button">
            <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
          </button>) }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hideSearch: PropTypes.bool,
};

Header.defaultProps = {
  hideSearch: false,
};

export default Header;
