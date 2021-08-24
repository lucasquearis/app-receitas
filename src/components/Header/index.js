import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/header.css';
import profileIcon from '../../images/profileIcon.svg';

export default function Header({ children }) {
  const history = useHistory();

  return (
    <header className="header">
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="ícone de perfil"
        />
      </button>
      <h2 data-testid="page-title">{ children }</h2>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
