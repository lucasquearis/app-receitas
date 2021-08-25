import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import './style.css';

function Header({ title, renderSearchBar }) {
  const imgProps = {
    src: '/images/profileIcon.svg',
    name: 'profile-icon',
    'data-testid': 'profile-top-btn',
  };

  return (
    <header>
      <nav>
        <Link to="/perfil">
          <img { ...imgProps } alt="profile-icon" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {renderSearchBar
          && (
            <SearchBar />
          )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  renderSearchBar: PropTypes.bool,
}.isRequired;

export default Header;
