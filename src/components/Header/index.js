import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './style.css';

import IconButton from '../IconButton';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

function Header({ title }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <div className="header-top">
        <IconButton
          image={ profileIcon }
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
        />
        <h1 data-testid="page-title">
          {title}
        </h1>
        <IconButton
          image={ searchIcon }
          data-testid="search-top-btn"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        />
      </div>
      <div>
        { showSearchBar && <SearchBar /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
