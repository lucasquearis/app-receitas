import React from 'react';

function CategoryButton(name, key) {
  return (
    <button
      type="button"
      data-testid={ `${name}-category-filter` }
      key={ key }
    >
      { name }
    </button>
  );
}

export default CategoryButton;
