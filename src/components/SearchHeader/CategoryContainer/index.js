import React from 'react';
import { useHistory } from 'react-router';
import { useCategoriesContext } from '../../../context/CategoriesProvider';

export default function CategoryContainer() {
  const { location: { pathname } } = useHistory();
  const { categories, handleSetSelected } = useCategoriesContext();
  const type = pathname.includes('/comidas') ? 'food' : 'drinks';

  const createButtons = () => categories[type]
    .reduce((acc, { strCategory }, index) => {
      const maxLength = 5;
      if (index < maxLength) {
        acc = [
          ...acc,
          <button
            key={ strCategory }
            type="button"
            onClick={ () => handleSetSelected(type, strCategory) }
            data-testid={ `${strCategory}-category-filter` }
          >
            {strCategory}
          </button>,
        ];
      }
      return acc;
    }, []);

  return (
    <div>
      { createButtons() }
    </div>
  );
}
