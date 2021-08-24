import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearcBar';
import profileIcon from '../images/profileIcon.svg';

function Header(props) {
  const { titulo, showProfileIcon } = props;
  const [showSearchBar, setShowSearchBar] = useState(false);

  const revealSearchBar = () => {
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  const searchBar = () => {
    if (showSearchBar) {
      return <SearchBar />;
    }
  };

  const revealIconSearch = () => {
    if (showProfileIcon === 'sim') {
      return (
        <button type="button" onClick={ revealSearchBar }>
          <img
            src={ searchIcon }
            alt="Ícone de pesquisa"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
    return (null);
  };

  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Avatar do usuário"
          data-testid="profile-top-btn"
        />
      </Link>

      <h1 data-testid="page-title">{titulo}</h1>

      {revealIconSearch()}
      {searchBar()}
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.bool,
};

Header.defaultProps = {
  showProfileIcon: <p>Sem valor</p>,
};

export default Header;
