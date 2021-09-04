import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import headerBg from '../images/header_bg.png';
import profileIcon from '../images/profileIcon.svg';

export default function HeaderNoSearch({ title }) {
  return (
    <header className="header__header-no-search">
      <img className="header__background_img" src={ headerBg } alt="Header Bg" />
      <Link
        to="/perfil"
        className="header__profile-btn"
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
