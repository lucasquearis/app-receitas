import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './style.css';
import { Person as profileIcon, Search as searchIcon } from '@material-ui/icons';
import SearchBar from '../SearchBar';
import IconBtn from '../IconBtn';

function Header({ title, searchButton = true }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const profile = {
    name: 'profile',
    'data-testid': 'profile-top-btn',
    icon: profileIcon,
    alt: 'profileIcon',
    type: 'button',
    onClick: () => history.push('/perfil'),
  };

  const search = {
    name: 'search',
    'data-testid': 'search-top-btn',
    icon: searchIcon,
    alt: 'searchIcon',
    type: 'button',
    onClick: () => setShowSearchBar(!showSearchBar),
  };

  return (
    <div>
      <header className={ `header-top ${searchButton ? 'withSearch' : 'withoutSearch'}` }>
        <IconBtn { ...profile } />
        <h1 data-testid="page-title">
          {title}
        </h1>
        { searchButton && <IconBtn { ...search } /> }
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
