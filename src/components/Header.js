import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import './header.css';

function Header({ title, renderSearch }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="header-container">
        <Nav>
          <Link data-testid="profile-top-btn" to="/perfil">
            <img className="icon" src={ profile } alt="profile-icon" />
          </Link>
        </Nav>
        <Navbar.Brand className="title" data-testid="search-top-btn">Home</Navbar.Brand>
        { renderSearch && (
          <Nav>
            <img className="icon" src={ search } alt="search-icon" />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

Header.defaultProps = {
  renderSearch: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool,
};

export default Header;
