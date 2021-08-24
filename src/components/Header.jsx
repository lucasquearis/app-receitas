import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';

function Header({ brand, dataId, className, src, alt }) {
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
              src={ profileIcon }
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
            data-testid={ dataId }
            className={ className }
            src={ src }
            alt={ alt }
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
  dataId: string.isRequired,
  className: string.isRequired,
  src: string.isRequired,
  alt: string.isRequired,
};

export default Header;
