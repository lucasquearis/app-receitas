import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './headerFood.css';
import './searchBar.css';

const Header = () => {
  const [showBar, setShowBar] = useState(false);
  const location = useLocation();

  return (
    <div className="header-container">
      <div className="header">
        <button type="button">
          <Link to="/perfil">
            <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
          </Link>
        </button>
        <p data-testid="page-title">Comidas</p>
        <button type="button" onClick={ () => setShowBar(!showBar) }>
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>
      </div>
      <div>
        {showBar && <SearchBar location={ location } />}
      </div>
    </div>
  );
};

export default Header;
