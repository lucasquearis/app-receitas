import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBar, SetSearchBar] = useState(false);
  const { title, icon } = props;

  function showSearchBar() {
    if (searchBar === false) {
      SetSearchBar(true);
    } else {
      SetSearchBar(false);
    }
  }

  const icons = () => (
    <button type="button" onClick={ showSearchBar }>
      <img src={ searchIcon } alt="icone-de-pesquisar" data-testid="search-top-btn" />
    </button>
  );

  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="icone-perfil" data-testid="profile-top-btn" />
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      {
        icon === 'true' ? icons() : null
      }
      {
        searchBar ? <SearchBar /> : null
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Header;
