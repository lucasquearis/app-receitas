import React from 'react';
import { useHistory } from 'react-router';
import { useCategoriesContext } from '../../../context/CategoriesProvider';
import { useDataContext } from '../../../context/DataProvider';

export default function CategoryContainer() {
  const { location: { pathname } } = useHistory();
  const { categories } = useDataContext();
  const { handleSetSelected, handleReset } = useCategoriesContext();
  const type = pathname.includes('/comidas') ? 'food' : 'drinks';

  const maxLength = 5;
  const createButtons = () => categories[type].slice(0, maxLength)
    .map(({ strCategory }) => (
      <button
        key={ strCategory }
        type="button"
        onClick={ () => handleSetSelected(type, strCategory) }
        data-testid={ `${strCategory}-category-filter` }
      >
        {strCategory}
      </button>
    ));

  return (
    <div>
      { createButtons() }
      <button
        type="button"
        onClick={ () => handleReset(type) }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}
