import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';

const HeaderWithoutSearch = ({ children }) => (
  <div>
    <header>
      <Link to="/perfil">
        <button type="button">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
      </Link>
      <h1 data-testid="page-title">{children}</h1>
    </header>
  </div>
);

HeaderWithoutSearch.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HeaderWithoutSearch;
