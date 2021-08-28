import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function BarraCategorias({ categoriesList }) {
  const {
    selectedCategory,
    setSelectedCategory,
    setSelectedIngredient,
  } = useContext(AppContext);

  return (
    <>
      <button
        data-testid="All-category-filter"
        key="category-filter-all"
        onClick={ () => {
          setSelectedCategory('');
          setSelectedIngredient('');
        } }
        type="button"
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
              onClick={ () => {
                const checkedCate = (selectedCategory === strCategory) ? '' : strCategory;
                setSelectedCategory(checkedCate);
              } }
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
};

export default BarraCategorias;
