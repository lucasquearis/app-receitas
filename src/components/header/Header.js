import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

const Header = ({ children }) => {
  const [withSearchBar, setWithSearchBar] = useState(false);

  const onOffSearchBar = () => {
    setWithSearchBar(!withSearchBar);
  };

  return (
    <div>
      <header className="header-Search">
        <Link to="/perfil">
          <button type="button" className="header-SearchButton">
            <img
              className="header-SearchImagem"
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile icon"
            />
          </button>
        </Link>
        <h1
          className="header-SearchText"
          data-testid="page-title"
        >
          { children }
        </h1>
        <button
          className="header-SearchButton"
          type="button"
          onClick={ onOffSearchBar }
        >
          <img
            className="header-SearchImagem"
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
          />
        </button>
        <div>
          <SearchBar bool={ withSearchBar } />
        </div>
      </header>
    </div>
  );
};
Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
