import React from 'react';
import PropTypes from 'prop-types';

function CategorySubTitle({ recipe }) {
  return (
    <p
      data-testid="recipe-category"
    >
      { (recipe.strAlcoholic) ? recipe.strAlcoholic : recipe.strCategory}
    </p>
  );
}

CategorySubTitle.propTypes = {
  recipe: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default CategorySubTitle;
