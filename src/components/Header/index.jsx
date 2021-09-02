import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import './style.css';
import IconBtn from '../IconBtn';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, renderSearchBar }) {
  const [searchInputs, setSearchInputs] = useState(false);

  const handleClick = () => {
    if (searchInputs) {
      setSearchInputs(false);
    } else {
      setSearchInputs(true);
    }
  };

  const profileBtnProps = {
    dataId: 'profile-top-btn',
    src: profileIcon,
    alt: 'Botão Perfil',
  };

  const searchBtnProps = {
    onClick: handleClick,
    dataId: 'search-top-btn',
    src: searchIcon,
    alt: 'search-button',
  };

  return (
    <header className="user-header-footer">
      <nav>
        <Link to="/perfil">
          <IconBtn { ...profileBtnProps } />
        </Link>
        <h1 data-testid="page-title" className="title">{title}</h1>
        {renderSearchBar && <IconBtn { ...searchBtnProps } />}
      </nav>
      {renderSearchBar
          && (
            <SearchBar title={ title } searchInputs={ searchInputs } />
          )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  renderSearchBar: PropTypes.bool,
}.isRequired;

export default Header;
