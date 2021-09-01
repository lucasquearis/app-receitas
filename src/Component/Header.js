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
          <img src={ iconProfile } width="35px" height="35px" alt="icone do perfil" />
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
                src={ iconSearch }
                alt="Icone de pesquisa"
                width="35px"
                height="35px"
              />
            </button>) }
          {show && <SearchBar />}
        </div>

      </div>
    </header>
  );
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
  btSearch: PropTypes.bool.isRequired,
};
export default Header;
