import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ ingredient: { strIngredient, strIngredient1 }, index, type }) {
  const ingredient = strIngredient1 || strIngredient;
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <h2 data-testid={ `${index}-card-name` }>{ ingredient }</h2>
      <img
        src={ `https://www.the${type}db.com/images/ingredients/${ingredient}-Small.png` }
        data-testid={ `${index}-card-img` }
        alt={ ingredient }
      />
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
};

export default IngredientCard;
