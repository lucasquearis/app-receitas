import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import PerfilIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { title, searchIcon } = props;
  return (
    <header className="header">
      <img data-testid="profile-top-btn" src={ PerfilIcon } alt="perfil" />
      <h3 data-testid="page-title">{ title }</h3>
      { searchIcon ? <img src={ SearchIcon } alt="procurar" /> : <div /> }
    </header>
  );
}

Header.defaultProps = {
  searchIcon: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool,
};
