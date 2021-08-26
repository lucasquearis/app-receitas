import React from 'react';
import PropTypes from 'prop-types';

function BarraCategorias({ categoriesList, setSelectedCategory }) {
  return (
    <>
      <button
        key="category-filter-all"
        type="button"
        onClick={ () => setSelectedCategory('') }
      >
        All
      </button>
      {categoriesList.map(({ strCategory }, index) => {
        const categoriesListLimit = 5;

        if (index < categoriesListLimit) {
          return (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ `category-filter-${index}` }
              onClick={ () => setSelectedCategory(strCategory) }
              type="button"
            >
              { strCategory }
            </button>
          );
        }
        return null;
      })}
    </>
  );
}

BarraCategorias.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedCategory: PropTypes.string.isRequired,
};

export default BarraCategorias;
