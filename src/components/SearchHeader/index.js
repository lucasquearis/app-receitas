import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import FormFilter from './FormFilter';
import CategoryContainer from './CategoryContainer';

export default function SearchHeader({ children }) {
  const history = useHistory();
  const [visibleSearch, setVisibleSearch] = useState(false);
  const handleToggleInput = () => setVisibleSearch((currState) => !currState);

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
        <button type="button" onClick={ handleToggleInput }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="ícone de busca"
          />
        </button>
      </header>
      <CategoryContainer />
      { visibleSearch && <FormFilter /> }
    </div>
  );
}

SearchHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
