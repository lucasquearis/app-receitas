import React from 'react';
import { useHistory } from 'react-router';
import { useCategoriesContext } from '../../../context/CategoriesProvider';

export default function CategoryContainer() {
  const { location: { pathname } } = useHistory();
  const { categories } = useCategoriesContext();
  const list = pathname.includes('/comidas') ? 'food' : 'drinks';

  const createButtons = () => categories[list]
    .reduce((acc, { strCategory }, index) => {
      const maxLength = 5;
      if (index < maxLength) {
        acc = [
          ...acc,
          <button
            key={ strCategory }
            type="button"
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
