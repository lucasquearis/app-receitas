import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(
  {
    pageTitle,
    showProfileIcon,
    showExploreIcon,
    onClickShowInput,
  },
) {
  return (
    <div>
      <header className="d-flex navbar fixed-top justify-content-between bg-color">
        <nav
          style={ { width: '30px' } }
        >
          {!showProfileIcon
            ? (
              <Link to="/perfil">
                <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
              </Link>
            )
            : null}
        </nav>
        <nav>
          <h3
            data-testid="page-title"
            style={ { 'font-weight': '700' } }
          >
            {pageTitle}
          </h3>
        </nav>
        <nav
          style={ { width: '30px' } }
        >
          {!showExploreIcon
            ? (
              <button
                className="border-0 bg-transparent"
                type="button"
                onClick={ () => onClickShowInput((prevCheck) => !prevCheck) }
              >
                <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
              </button>
            )
            : null}
        </nav>
      </header>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.bool,
  showExploreIcon: PropTypes.bool,
  onClickShowInput: PropTypes.func.isRequired,
};

Header.defaultProps = {
  showProfileIcon: false,
  showExploreIcon: false,
};
