import React from 'react';
import './css/Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div
      className="header-container"
    >
      <button
        type="button"
        data-testid="profile-top-btn"
        className="profile-icon-container"
      >
        <img
          className="profile-icon"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
      <div
        className="title-container"
      >
        <h1
          data-testid="page-title"
          className="title-content"
        >
          TITULO HEADER
        </h1>
      </div>

      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="Profile Icon"
          className="search-element"
        />
      </button>

    </div>
  );
}

export default Header;
