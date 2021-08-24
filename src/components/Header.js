import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';
import './Header.css';

function Header({ nomeDaPagina }) { //
  const [redirect, setRedirect] = useState(false); // esse estado local começa como false.
  const { showBar, setShowBar } = useContext(AppContext);

  if (redirect) {
    return <Redirect to="/Perfil" />;
  }
  return (
    <header>
      <input
        type="image"
        data-testid="profile-top-btn"
        alt="icone-perfil"
        src={ profileIcon }
        onClick={ () => setRedirect(true) }
      />
      <h1
        data-testid="page-title"
      >
        { nomeDaPagina }
      </h1>
      <input
        type="image"
        data-testid="search-top-btn"
        alt="icone-busca"
        src={ searchIcon }
        onClick={ () => setShowBar(!showBar) }
      />
    </header> // ao clicar no ícone de busca, vai mudar o estado Global.
  );
}
Header.propTypes = {
  nomeDaPagina: PropTypes.string.isRequired,
};
export default Header;
