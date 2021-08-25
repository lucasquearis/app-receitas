import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderWithSearch({ children }) {
  const history = useHistory();

  const [visibleSearch, setVisibleSearch] = useState(false);

  const handleToggleClass = () => setVisibleSearch((currState) => !currState);

  return (
    <div>
      <header className="header-search">
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="ícone de perfil"
          />
        </button>
        <h2 data-testid="page-title">{ children }</h2>
        <button type="button" onClick={ handleToggleClass }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="ícone de busca"
          />
        </button>
      </header>
      { visibleSearch
        && (
          <div>
            <input
              data-testid="search-input"
              type="text"
            />
          </div>) }
    </div>
  );
}

HeaderWithSearch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderWithSearch;
