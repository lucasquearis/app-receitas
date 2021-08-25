import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ name }) {
  const [hide, setHide] = useState(false);
  const handleClick = () => {
    setHide((prevState) => !prevState);
  };
  const renderSearchButton = () => {
    if (name === 'Comidas' || name === 'Bebidas' || name === 'Explorar Origem') {
      return (
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={ handleClick }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </Button>
      );
    }
  };
  return (
    <header>
      <Link to="/perfil">
        <Button
          variant="contained"
          color="primary"
          type="button"
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
        </Button>
      </Link>
      <h2 data-testid="page-title">{name}</h2>
      { renderSearchButton() }
      { hide && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
