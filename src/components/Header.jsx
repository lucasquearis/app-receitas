import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './componentCSS/HeaderFood.css';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title }) {
  const [search, setSearch] = useState(false);
  const showSearch = () => setSearch(true);

  return (
    <header className="header-food">
      <Link
        to="/perfil"
        className="profile-btn"
      >
        <img
          alt="button-icon"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Link>
      {search ? <SearchBar /> : <h1 data-testid="page-title">{ title }</h1>}
      <button
        type="button"
        className="search-btn"
        onClick={ showSearch }
      >
        <img
          alt="button-icon"
          src={ searchIcon }
          data-testid="search-top-btn"
        />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
