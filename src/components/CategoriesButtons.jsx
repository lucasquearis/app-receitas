import React from 'react';

function CategoriesButtons({ categories }) {
  const categoriesLimit = 5;

  return (
    categories.map((name, index) => (
      index < categoriesLimit ? (
        <label htmlFor={ `${name.strCategory}` } key={ index }>
          <input
            type="checkbox"
            id={ `${name.strCategory}` }
            key={ index }
            name={ `${name.strCategory} category` }
            data-testid={ `${name.strCategory}-category-filter` }
            value={ name.strCategory }
          />
          { name.strCategory }
        </label>) : null
    ))
  );
}

export default CategoriesButtons;
