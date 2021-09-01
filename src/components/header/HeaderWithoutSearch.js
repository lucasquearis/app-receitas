import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import './HeaderWithoutSearch.css';

const HeaderWithoutSearch = ({ children }) => (
  <div>
    <header className="header-noSearch">
      <Link
        to="/perfil"
      >
        <button type="button" className="header-noSearchButton">
          <img
            className="header-noSearchImagem"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
      </Link>
      <h1
        className="header-noSearchText"
        data-testid="page-title"
      >
        {children}
      </h1>
    </header>
  </div>
);

HeaderWithoutSearch.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HeaderWithoutSearch;
