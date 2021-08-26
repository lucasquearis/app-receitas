import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => (
    !showInput ? setShowInput(true) : setShowInput(false));

  const renderButton = () => (
    <>
      <button type="button" onClick={ handleClick }>
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="iconProfile"
        />
      </button>
      { showInput ? <input type="text" data-testid="search-input" /> : '' }
    </>
  );

  return (
    <div>
      <header>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="iconProfile"
            />
          </button>
        </Link>
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
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
