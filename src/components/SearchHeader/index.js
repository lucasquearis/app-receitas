import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import FormFilter from './FormFilter';

export default function SearchHeader({ children }) {
  const history = useHistory();
  // Função do context que recebe filtros do usuário de acordo com a página;

  const [visibleSearch, setVisibleSearch] = useState(false);

  // Estado dos inputs;
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const handleToggleInput = () => setVisibleSearch((currState) => !currState);

  const handleSetText = ({ target: { value } }) => setText(value);

  const handleSetFilter = ({ target: { value } }) => setFilter(value);

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
      { visibleSearch
      && (
        <FormFilter
          text={ text }
          filter={ filter }
          handleSetFilter={ handleSetFilter }
          handleSetText={ handleSetText }
        />
      ) }
    </div>
  );
}

SearchHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
