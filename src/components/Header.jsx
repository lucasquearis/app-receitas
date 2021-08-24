import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';

function Header({ title }) {
  return (
    <header className="container-header">
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile user"
      />
      <h2
        data-testid="page-title"
      >
        {title}
      </h2>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Profile user"
      />
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
