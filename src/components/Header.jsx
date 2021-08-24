import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import './header.css';

function Header({ title, searchIcon = '' }) {
  const renderSearchIcon = () => {
    if (searchIcon) {
      return <img data-testid="search-top-btn" src={ searchIcon } alt="icone da busca" />;
    }
  };

  return (
    <header>
      <div className="header-div">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="icone do perfil" />
        <h3 data-testid="page-title">{ title }</h3>
        { renderSearchIcon() }
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default Header;
