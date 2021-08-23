import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './style.css';

const renderSearchButton = (searchBar, setSearchBar) => (
  <button type="button" onClick={ () => setSearchBar(!searchBar) }>
    <img src={ searchIcon } alt="Procurar" data-testid="search-top-btn" />
  </button>
);

const Header = ({ page, search }) => {
  const history = useHistory();
  const [searchBar, setSearchBar] = useState(false);

  return (
    <>
      <header>
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
        </button>
        <p data-testid="page-title">{ page }</p>
        {
          search && renderSearchButton(searchBar, setSearchBar)
        }
      </header>
      {
        searchBar && <SearchBar />
      }
    </>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: false,
};

export default Header;
