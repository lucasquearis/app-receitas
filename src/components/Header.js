import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Header.css';
import profileIcon from '../images/profileIcon.svg';

const Header = ({ title }) => (
  <div
    className="header-container"
  >
    <Link to="/perfil">
      <button
        type="button"
        className="profile-icon-container"
      >
        <img
          data-testid="profile-top-btn"
          className="profile-icon"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </button>
    </Link>
    <div
      className="title-container"
    >
      <h1
        className="title-content"
        data-testid="page-title"
      >
        { title }
      </h1>
    </div>
  </div>
);
Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
