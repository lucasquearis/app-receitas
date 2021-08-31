import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ name }) {
  const [hide, setHide] = useState(false);
  const handleClick = () => {
    setHide((prevState) => !prevState);
  };
  const renderSearchButton = () => {
    if (name === 'Comidas' || name === 'Bebidas' || name === 'Explorar Origem') {
      return (
        <Button
          className="header-btn"
          type="button"
          onClick={ handleClick }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </Button>
      );
    } else {
      return (
        <Button
          className="header-btn"
          type="button" />
      );
    }
  };
  return (
    <header className="header-container">
      <Link to="/perfil">
        <Button
          className="header-btn"
          type="button"
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
        </Button>
      </Link>
      <h2 data-testid="page-title">{name}</h2>
      { renderSearchButton() }
      { hide && <SearchBar pageName={ name } />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
