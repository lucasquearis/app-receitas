import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

function BarraCategorias({ whatIsTheType }) {
  const { mealsCategories, drinksCategories } = useContext(AppContext);

  const categories = (whatIsTheType === '/comidas') ? mealsCategories : drinksCategories;
  return (
    <>
      <button
        key="category-filter-all"
        type="button"
      >
        All
      </button>
      {categories.map((category, index) => (
        <button
          key={ `category-filter-${index}` }
          type="button"
        >
          { category.strCategory }
        </button>
      ))}
    </>
  );
}

BarraCategorias.propTypes = {
  whatIsTheType: PropTypes.string.isRequired,
};

export default BarraCategorias;
