import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(
  { pageTitle, iconProfile, iconSearch, isProfile, isExplore },
) {
  return (
    <header style={ { display: 'flex', justifyContent: 'space-around' } }>
      <nav>
        {!isProfile
          ? <img data-testid="profile-top-btn" src={ iconProfile } alt="Profile" />
          : null}
      </nav>
      <nav>
        <h2 data-testid="page-title">{pageTitle}</h2>
      </nav>
      <nav>
        {!isExplore
          ? <img data-testid="search-top-btn" src={ iconSearch } alt="Search" />
          : null}
      </nav>
    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  iconProfile: PropTypes.string,
  iconSearch: PropTypes.string,
  isProfile: PropTypes.bool,
  isExplore: PropTypes.bool,
};

Header.defaultProps = {
  iconProfile: profileIcon,
  iconSearch: searchIcon,
  isProfile: false,
  isExplore: false,
};
