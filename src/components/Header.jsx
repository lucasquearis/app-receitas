import React from 'react';
import { string, bool } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './header.css';

function Header({ title, showButton }) {
  return (
    <header className="container-header">
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Profile user"
      />
      {
        title
          ? (
            <h2
              data-testid="page-title"
            >
              {title}
            </h2>
          )
          : ''
      }
      {
        showButton
          ? (
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Profile user"
            />
          )
          : ''
      }
    </header>
  );
}

Header.propTypes = {
  title: string,
  showButton: bool,
};

Header.defaultProps = {
  title: '',
  showButton: false,
};

export default Header;
