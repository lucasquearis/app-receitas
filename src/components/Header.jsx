import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title }) {
  return (
    <header>
      <Link to="/profile">
        <button
          type="button"
          className="profile-top-btn"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
        </button>
      </Link>
      <h1 data-testid="page-title">
        {title}
      </h1>
      <button
        type="button"
        className="search-btn"
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
