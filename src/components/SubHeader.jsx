import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

export default function SubHeader({ title }) {
  return (
    <div className="header__first-div">
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
    </div>
  );
}

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
