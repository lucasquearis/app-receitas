import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const renderSearchButton = () => {
    if (name === 'Comidas' || name === 'Bebidas' || name === 'Explorar Origem') {
      return (
        <Button
          type="button"
          variant="contained"
          color="primary"
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </Button>
      );
    }
  };
  return (
    <header>
      <Button
        variant="contained"
        color="primary"
        type="button"
      >
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
      </Button>
      <h2 data-testid="page-title">{name}</h2>
      { renderSearchButton() }
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
