import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header(props) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { titulo, showSearch } = props;

  const showBar = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  };
  return (
    <header className="headerPags">
      <div className="divButtonsHeader">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Icone de perfil"
            width="33"
          />
        </Link>
        {
          showSearch ? (
            <button
              onClick={ showBar }
              className="buttonShowSearch"
              type="button"
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Icone de busca"
                width="33"
              />
            </button>) : null
        }
        { showSearchBar ? <SearchBar /> : null }
      </div>
      <h1
        data-testid="page-title"
        className="h1Header"
      >
        { titulo }
      </h1>
    </header>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
