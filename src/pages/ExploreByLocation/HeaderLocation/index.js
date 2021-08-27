import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import '../../../styles/header.css';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import DropDown from './DropDown';

export default function HeaderLocation({ children }) {
  const history = useHistory();

  return (
    <div>
      <header className="header-search">
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img
            type="text"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="ícone de perfil"
          />
        </button>
        <h2 data-testid="page-title">{ children }</h2>
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="ícone de busca"
        />
      </header>
      <DropDown />
    </div>
  );
}

HeaderLocation.propTypes = {
  children: PropTypes.node.isRequired,
};
