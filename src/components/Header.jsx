import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(
  { pageTitle, iconProfile, iconSearch, showProfileIcon, showExploreIcon },
) {
  const [showInput, setShowInput] = useState(false);
  return (
    <header>
      <nav>
        {!showProfileIcon
          ? (
            <Link to="/perfil">
              <img data-testid="profile-top-btn" src={ iconProfile } alt="Profile" />
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
              onClick={ () => setShowInput((prevCheck) => !prevCheck) }
            >
              <img data-testid="search-top-btn" src={ iconSearch } alt="Search" />
            </button>
          )
          : null}
      </nav>
      {showInput ? <input data-testid="search-input" type="text" /> : null}
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  iconProfile: PropTypes.string,
  iconSearch: PropTypes.string,
  showProfileIcon: PropTypes.bool,
  showExploreIcon: PropTypes.bool,
};

Header.defaultProps = {
  iconProfile: profileIcon,
  iconSearch: searchIcon,
  showProfileIcon: false,
  showExploreIcon: false,
};
