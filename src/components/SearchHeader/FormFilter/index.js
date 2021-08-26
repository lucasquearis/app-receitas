import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useFoodAndDrinksContext } from '../../../context/FoodAndDrinksProvider';

export default function FormFilter() {
  const history = useHistory();
  const { handleSetParameters } = useFoodAndDrinksContext();

  // Estado dos inputs;
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('ingredient');

  const handleSetText = ({ target: { value } }) => setText(value);

  const handleSetFilter = ({ target: { value } }) => setFilter(value);

  // Objeto com todos os filtros, que sempre será atualizado conforme o estado;
  const filters = useMemo(() => ({ filter, text }), [text, filter]);

  return (
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
          checked={ filter === 'ingredient' }
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
  );
}
