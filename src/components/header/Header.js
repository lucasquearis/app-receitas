import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ children }) => {
  const [withSearchBar, setWithSearchBar] = useState(false);

  const onOffSearchBar = () => {
    setWithSearchBar(!withSearchBar);
  };
  return (
    <div>
      <header>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">{ children }</h1>
        <button type="button" onClick={ onOffSearchBar }>
          <div>
            <img
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
            { withSearchBar && <SearchBar /> }
          </div>
        </button>
      </header>
    </div>
  );
};
Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
