import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssPages/Header.css';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { titulo, pesquisa } = props;
  const [showBar, setShowBar] = useState(false);
  const rederizaBarra = () => (showBar ? setShowBar(false) : setShowBar(true));

  const iconePesquisa = () => (
    <button type="button" onClick={ rederizaBarra }>
      <img
        src={ searchIcon }
        alt="icone de busca"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <header className="header">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="imagem de pefil"
        />
      </Link>
      <h3 data-testid="page-title">{ titulo }</h3>
      { pesquisa === 'true' ? iconePesquisa() : null }
      { showBar ? <SearchBar /> : null}
    </header>
  );
}

Header.propTypes = {
  pesquisa: PropTypes.string,
  titulo: PropTypes.any,
}.isRequired;

export default Header;
