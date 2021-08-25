import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileicon from '../../images/profileIcon.svg';

function HeaderSemSearchBar({ children }) {
  return (
    <header>
      <Link to="/perfil">
        <button type="button">
          <input
            type="image"
            data-testid="profile-top-btn"
            src={ profileicon }
            alt="profile"
          />
        </button>
      </Link>
      <div>
        <h4 data-testid="page-title">
          {children}
        </h4>
      </div>
    </header>
  );
}

HeaderSemSearchBar.propTypes = {
  children: PropTypes.string.isRequired,
};

export default HeaderSemSearchBar;
