import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './style.css';

import IconButton from '../IconButton';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

function Header({ title, searchButton = true }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <header className="header-top">
        <IconButton
          image={ profileIcon }
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
        />
        <h1 data-testid="page-title">
          {title}
        </h1>
        { searchButton && <IconButton
          image={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        />}
      </header>
      { showSearchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.bool,
};

Header.defaultProps = {
  searchButton: true,
};

export default Header;
