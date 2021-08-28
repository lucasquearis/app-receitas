import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import './style.css';
import IconBtn from '../IconBtn';

function Header({ title, renderSearchBar }) {
  const profileBtnProps = {
    dataId: 'profile-top-btn',
    src: '/images/profileIcon.svg',
    alt: 'Botão Perfil',
  };

  return (
    <header>
      <nav>
        <Link to="/perfil">
          <IconBtn { ...profileBtnProps } />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {renderSearchBar
          && (
            <SearchBar />
          )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  renderSearchBar: PropTypes.bool,
}.isRequired;

export default Header;
