import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import './header.css';

// A prop renderSearchIcon define se vai ter o ícone de Search ou não.
function Header({ title, renderSearchIcon }) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header>
      <Navbar className="header-navbar">
        <Nav>
          <Link data-testid="profile-top-btn" to="/perfil">
            <img className="icon" src={ profile } alt="profile-icon" />
          </Link>
        </Nav>
        <p className="title" data-testid="search-top-btn">{title}</p>
        { renderSearchIcon && (
          <Nav data-testid="search-top-btn" onClick={ () => setShowSearch(!showSearch) }>
            <img className="icon" src={ search } alt="search-icon" />
          </Nav>
        )}
      </Navbar>
      { showSearch && <SearchBar />}
    </header>
  );
}

Header.defaultProps = {
  renderSearchIcon: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearchIcon: PropTypes.bool,
};

export default Header;
