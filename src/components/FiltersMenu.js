import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import { fetchAPI, fetchAPIByCategory } from '../services';
import '../styles/filtersMenu.css';

export default function FiltersMenu({ type }) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { categoriesList, setRecipeList } = useContext(AppContext);

  const handleClickFilter = async ({ target: { textContent } }) => {
    const category = textContent === categoryFilter ? 'All' : textContent;

    if (category === 'All') {
      setCategoryFilter('All');
      setRecipeList(await fetchAPI(type));
      return;
    }
    setCategoryFilter(category);
    setRecipeList(await fetchAPIByCategory(type, category));
  };

  return (
    <section className="filter-buttons">
      <button
        type="button"
        onClick={ handleClickFilter }
        data-testid="All-category-filter"
      >
        All
      </button>
      { categoriesList.map((filter) => (
        <button
          key={ filter }
          type="button"
          onClick={ handleClickFilter }
          data-testid={ `${filter}-category-filter` }
        >
          { filter }
        </button>
      )) }
    </section>
  );
}

FiltersMenu.propTypes = {
  type: PropTypes.string.isRequired,
};
