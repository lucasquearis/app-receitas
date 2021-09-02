import { objectOf, string } from 'prop-types';
import React from 'react';

function Category({ recipeDetails }) {
  return (
    <section className="category-container">
      <h6 data-testid="recipe-category">{ recipeDetails.strCategory }</h6>
    </section>
  );
}

Category.propTypes = {
  recipeDetails: objectOf(string).isRequired,
};

export default Category;
