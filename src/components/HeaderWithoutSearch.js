import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function HeaderWithoutSearch({ children }) {
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

HeaderWithoutSearch.propTypes = {
  children: PropTypes.node.isRequired,
};

// dsdsa
export default HeaderWithoutSearch;
