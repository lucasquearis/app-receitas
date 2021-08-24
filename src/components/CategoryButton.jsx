import React from 'react';

function CategoryButton(name, key, onClick) {
  return (
    <button
      type="button"
      data-testid={ `${name}-category-filter` }
      key={ key }
      onClick={ () => onClick(name.replace(' ', '_')) }
    >
      { name }
    </button>
  );
}

export default CategoryButton;
