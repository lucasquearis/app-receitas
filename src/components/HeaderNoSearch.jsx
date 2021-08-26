import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './componentCSS/HeaderFood.css';
import profileIcon from '../images/profileIcon.svg';

export default function HeaderNoSearch({ title }) {
  return (
    <header className="header-no-search">
      <Link
        to="/perfil"
        className="profile-btn"
      >
        <img
          alt="button-icon"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </header>
  );
}

HeaderNoSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
