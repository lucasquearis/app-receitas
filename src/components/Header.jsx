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
      <header style={ { display: 'flex', justifyContent: 'space-around' } }>
        <nav>
          {!showProfileIcon
            ? (
              <Link to="/perfil">
                <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
              </Link>
            )
            : null}
        </nav>
        <nav>
          <h2 data-testid="page-title">{pageTitle}</h2>
        </nav>
        <nav>
          {!showExploreIcon
            ? (
              <button
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
