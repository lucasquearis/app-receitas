import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../styles/header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { useFoodAndDrinksContext } from '../../context/FoodAndDrinksProvider';

export default function SearchHeader({ children }) {
  const history = useHistory();
  // Função do context que recebe filtros do usuário de acordo com a página;
  const { handleSetParameters } = useFoodAndDrinksContext();

  const [visibleSearch, setVisibleSearch] = useState(false);

  // Estado dos inputs;
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('');

  // Objeto com todos os filtros, que sempre será atualizado conforme o estado;
  const filters = useMemo(() => ({ filter, text }), [text, filter]);

  const handleToggleInput = () => setVisibleSearch((currState) => !currState);

  const handleSetFilter = ({ target: { value } }) => setFilter(value);

  const handleSetText = ({ target: { value } }) => setText(value);

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
      { visibleSearch && (
        <form onSubmit={ (e) => e.preventDefault() }>
          <input
            type="text"
            placeholder="Escreva aqui"
            data-testid="search-input"
            value={ text }
            onChange={ handleSetText }
          />
          <label htmlFor="ingredient-search-radio">
            Ingredientes
            <input
              id="ingredient-search-radio"
              data-testid="ingredient-search-radio"
              name="filter"
              value="ingredient"
              type="radio"
              onChange={ handleSetFilter }
            />
          </label>
          <label htmlFor="name-search-radio">
            Nome
            <input
              data-testid="name-search-radio"
              id="name-search-radio"
              name="filter"
              value="name"
              type="radio"
              onChange={ handleSetFilter }
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            Primeira letra
            <input
              data-testid="first-letter-search-radio"
              id="first-letter-search-radio"
              name="filter"
              value="firstLetter"
              type="radio"
              onChange={ handleSetFilter }
            />
          </label>
          <button
            type="submit"
            data-testid="exec-search-btn"
            onClick={ () => handleSetParameters(filters, history.location.pathname) }
          >
            Buscar
          </button>
        </form>
      ) }
    </div>
  );
}

SearchHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
