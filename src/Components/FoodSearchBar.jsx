import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFoodSearch, getFoodsApi } from '../Redux/actions/apiActions';
import mealApi from '../services/GetUrl';

function FoodSearchBar() {
  const [search, setSearch] = useState({ type: '', entry: '' });
  const { foodSearch: { type, entry } } = useSelector((state) => state.mainPage);
  const dispatch = useDispatch();

  return (
    <section className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        name="search"
        onChange={ ({ target }) => setSearch({ ...search, entry: target.value }) }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          id="ingredient"
          type="radio"
          value="ingredient"
          name="radio-search"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setSearch({ ...search, type: target.value }) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          value="name"
          name="radio-search"
          type="radio"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setSearch({ ...search, type: target.value }) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          id="first-letter"
          value="first-letter"
          name="radio-search"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setSearch({ ...search, type: target.value }) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={ () => {
          dispatch(changeFoodSearch(search));
          dispatch(getFoodsApi(mealApi(type, entry)));
        } }
      >
        Buscar
      </button>
    </section>
  );
}

export default FoodSearchBar;
