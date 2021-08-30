import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

function Header({ title, hideSearch }) {
  const [isHidden, setIsHidden] = useState(true);
  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  return (
    <header>
      <div className="header-wrapper">
        <div data-testid="page-title">
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </Link>
          { title }
          { !hideSearch && (
            <button id="search-btn" type="button" onClick={ handleToggle }>
              <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
            </button>) }
          <div>
            { !isHidden ? <HeaderSearchBar /> : null }
          </div>
        </div>
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
