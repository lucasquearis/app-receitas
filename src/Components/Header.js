import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfilIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const [showSearch, setShowSearch] = useState(false);

  const { title, searchIcon } = props;

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const showSearchIcon = () => {
    if (searchIcon) {
      return (
        <button
          type="button"
          onClick={ handleSearchClick }
        >
          <img src={ SearchIcon } alt="procurar" />
        </button>
      );
    }

    return (
      <div />
    );
  };

  return (
    <header className="header">
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ PerfilIcon } alt="perfil" />
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      { showSearchIcon() }
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
