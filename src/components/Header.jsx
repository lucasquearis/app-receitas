import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header(
  {
    pageTitle,
    showProfileIcon,
    showExploreIcon,
  },
) {
  const [showInput, setShowInput] = useState(false);

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
                onClick={ () => setShowInput((prevCheck) => !prevCheck) }
              >
                <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
              </button>
            )
            : null}
        </nav>
      </header>
      <div style={ { display: 'flex', flexDirection: 'row' } }>
        {showInput && <SearchBar />}
      </div>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.bool,
  showExploreIcon: PropTypes.bool,
};

Header.defaultProps = {
  showProfileIcon: false,
  showExploreIcon: false,
};
