import React from 'react';
import { string } from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ title }) => {
  const renderButton = () => (
    <button type="button">
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="iconProfile"
      />
    </button>
  );
  return (
    <div>
      <header>
        <button type="button">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="iconProfile"
          />
        </button>
        <h1 data-testid="page-title">{ title }</h1>
        {
          title !== 'Explorar'
          && title !== 'Explorar Comidas'
          && title !== 'Explorar Bebidas'
          && title !== 'Explorar Ingredientes'
          && title !== 'Perfil'
          && title !== 'Receitas Feitas'
          && title !== 'Receitas Favoritas'
            ? renderButton() : ''
        }
      </header>
    </div>
  );
};

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
