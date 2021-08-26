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
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              className="icon"
              src={ profile }
              alt="profile-icon"
            />
          </Link>
        </Nav>
        <p className="title" data-testid="page-title">{title}</p>
        { renderSearchIcon && (
          <Nav onClick={ () => setShowSearch(!showSearch) }>
            <img
              data-testid="search-top-btn"
              className="icon"
              src={ search }
              alt="search-icon"
            />
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
