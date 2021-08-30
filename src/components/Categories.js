import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function Categories() {
  const { API } = useContext(RecipesContext);
  const { pathname, categories, listCategories, searchByCategory } = API;

  const [selected, setSelected] = useState('');
  const [start, setStart] = useState(true);

  const min = 0;
  const max = 5;

  let list = (pathname === '/comidas')
    ? categories.meals
    : categories.drinks;

  list = list.slice(min, max);

  function select({ target: { innerText: value } }) {
    if (selected && selected === value) {
      setStart(true);
      return setSelected('');
    }
    setStart(true);
    setSelected(value);
  }

  function didMountUpdate() {
    if (list.length === 0) {
      return listCategories();
    }

    if (start) {
      const category = selected === 'All' ? '' : selected;
      searchByCategory(category);
      setStart(false);
    }
  }

  useEffect(didMountUpdate);

  return (
    <div>
      <button
        type="button"
        onClick={ (e) => select(e) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {list.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          onClick={ (e) => select(e) }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}

export default Categories;
