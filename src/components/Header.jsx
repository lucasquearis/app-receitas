import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import folha from '../images/folha.svg';
import './header.css';

function Header({ title, showButton, foodPage }) {
  const [showAndHideSearchBar, setShowAndHideSearchBar] = useState(false);
  return (
    <>
      <header className="container-header">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile user"
          />
        </Link>
        {
          title
            ? (
              <h2
                className="header-title"
                data-testid="page-title"
              >
                {title}
                <img className="logo-folha" src={ folha } alt="logo folha" />
              </h2>
            )
            : ''
        }
        {
          showButton
            ? (
              <button
                type="button"
                className="btn-search"
                onClick={ () => setShowAndHideSearchBar(!showAndHideSearchBar) }
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="Profile user"
                />
              </button>
            )
            : ''
        }
      </header>
      {showAndHideSearchBar && <SearchBar foodPage={ foodPage } /> }
    </>
  );
}

Header.propTypes = {
  title: string,
  showButton: bool,
  foodPage: bool,
};

Header.defaultProps = {
  title: '',
  showButton: false,
  foodPage: false,
};

export default Header;
