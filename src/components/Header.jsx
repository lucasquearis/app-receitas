import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../cssPages/Header.css';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const styles = {
    0: 'neutralStyle',
    1: 'drinkStyle',
    2: 'foodStyle',
    3: 'favoriteAndDone',
  };
  const numero3 = 3;
  const { titulo, pesquisa, className } = props;
  const path = Number((useLocation().pathname).includes('bebidas'))
    + 2 * Number((useLocation().pathname).includes('comidas'))
    + numero3 * Number((useLocation().pathname).includes('perfil'));

  const [showBar, setShowBar] = useState(false);
  const rederizaBarra = () => (showBar ? setShowBar(false) : setShowBar(true));

  const iconePesquisa = () => (
    <button className="btnSearch" type="button" onClick={ rederizaBarra }>
      <img
        src={ searchIcon }
        alt="icone de busca"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <div>
      <header className={ `header ${styles[path]}` }>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="imagem de pefil"
          />
        </Link>
        <h3 data-testid="page-title" className={ className }>{ titulo }</h3>
        { pesquisa === 'true' ? iconePesquisa() : null }
      </header>
      <div className="filtros">
        { showBar ? <SearchBar /> : null }
      </div>
    </div>
  );
}

Header.propTypes = {
  pesquisa: PropTypes.string,
  titulo: PropTypes.any,
  className: PropTypes.string,
}.isRequired;

export default Header;
