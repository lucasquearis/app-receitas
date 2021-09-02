import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

export default function Header({ title, showSearchIcon }) {
  const { location: { pathname } } = useHistory();

  const [redirectToPerfil, setRedirectToPerfil] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleClickPerfil = () => {
    if (pathname !== '/perfil') {
      setRedirectToPerfil(true);
    }
  };

  const handleClickSearch = () => {
    setShowSearchBar((prevShow) => !prevShow);
  };

  if (redirectToPerfil) return <Redirect to="/perfil" />;

  return (
    <header className="header-container">
      <div className="header">
        <input
          src={ profileIcon }
          alt="Profile Icon"
          type="image"
          data-testid="profile-top-btn"
          onClick={ handleClickPerfil }
        />
        <h1 data-testid="page-title">{ title }</h1>
        { showSearchIcon
          && (
            <input
              src={ searchIcon }
              alt="Search Icon"
              type="image"
              data-testid="search-top-btn"
              onClick={ handleClickSearch }
            />
          )}
      </div>
      { showSearchBar && <SearchBar type={ title } /> }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};
