import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import './header.css';

const showSearchBar = {
  show: false,
};

function Header({ titlePage, btSearch = false }) {
  // titlePage => será to titulo a ser mostrado no Header
  // btSearch => booleano, se true, mostrará o icone de pesquisa
  const [state, setState] = useState({ showSearchBar });
  const { show } = state;
  return (
    <header>
      <div className="header">
        <Link to="/perfil" data-testid="profile-top-btn" src={ iconProfile }>
          <img
            className="header-icon"
            src={ iconProfile }
            alt="icone do perfil"
          />
        </Link>
        <h3 data-testid="page-title">{titlePage}</h3>
        <div className="header-buttons">
          { btSearch && (
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setState({ show: (!show) }) }
              src={ iconSearch }
            >
              <img
                className="header-icon"
                src={ iconSearch }
                alt="Icone de pesquisa"
              />
            </button>) }
        </div>
      </div>
      {show && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
  btSearch: PropTypes.bool.isRequired,
};
export default Header;
