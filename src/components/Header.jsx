import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import SearchBar from './SearchBar';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import '../styles/Header.css';

function Header({ brand }) {
  const [showInput, setShowInput] = useState(false);

  const showInputClick = () => {
    setShowInput((prevCheck) => !prevCheck);
  };

  return (
    <div>
      <header>
        <Link to="/perfil">
          <button
            className="profile-btn"
            type="button"
          >
            <img
              data-testid="profile-top-btn"
              className="img-profile"
              src={ profile }
              alt="profile"
            />
          </button>
        </Link>
        <h3 data-testid="page-title">
          {brand}
        </h3>
        <button
          type="button"
          className="search-btn"
          onClick={ showInputClick }
        >
          <img
            data-testid="search-top-btn"
            className="img-search"
            src={ search }
            alt="search"
          />
        </button>
      </header>
      {showInput
        ? <SearchBar />
        : null}
    </div>
  );
}

Header.propTypes = {
  brand: string.isRequired,
};

export default Header;
