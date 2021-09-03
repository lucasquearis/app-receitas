import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useDataContext } from '../../../../context/DataProvider';
import { getFilters } from '../../../../services';

import './styles.css';

export default function FormFilter() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setData, setLoading } = useDataContext();

  // Estado dos inputs;
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('ingredient');

  // Objeto com todos os filtros, que sempre será atualizado conforme o estado;
  const filters = useMemo(() => ({ filter, text }), [text, filter]);

  const handleSetText = ({ target: { value } }) => setText(value);

  const handleSetFilter = ({ target: { value } }) => setFilter(value);

  // Função que salva no estado os filtros do usuário;
  const handleFilterAPI = async () => {
    // É executada quando o usuário clica em "buscar";
    const foodURL = '/comidas';
    const types = pathname.includes(foodURL)
      ? { type: 'food', response: 'meals', url: '/comidas/' }
      : { type: 'drinks', response: 'drinks', url: '/bebidas/' };

    setLoading(true);
    const recipes = await getFilters(types.type, filters);
    setLoading(false);

    if (recipes[types.response]) {
      const [firstRecipe] = recipes[types.response];
      // Se houver somente uma comida, mudará o estado para redirecionar o usuário (Requisito 16);
      if (recipes[types.response].length === 1) {
        history.push(`${types.url}${firstRecipe.idMeal || firstRecipe.idDrink}`);
      }
      setData((prevData) => ({ ...prevData, [types.type]: recipes[types.response] }));
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  return (
    <form onSubmit={ (e) => e.preventDefault() } className="search-form">
      <input
        type="text"
        placeholder="Escreva aqui"
        data-testid="search-input"
        value={ text }
        onChange={ handleSetText }
        className="input-search"
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            name="filter"
            value="ingredient"
            type="radio"
            checked={ filter === 'ingredient' }
            onChange={ handleSetFilter }
          />
          {' Ingredientes'}
        </label>
        <label htmlFor="name-search-radio">
          <input
            data-testid="name-search-radio"
            id="name-search-radio"
            name="filter"
            value="name"
            type="radio"
            onChange={ handleSetFilter }
          />
          { ' Nome' }
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            name="filter"
            value="firstLetter"
            type="radio"
            onChange={ handleSetFilter }
          />
          { ' Primeira letra' }
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleFilterAPI }
      >
        Buscar
      </button>
    </form>
  );
}
