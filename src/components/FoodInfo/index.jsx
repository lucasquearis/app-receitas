import React from 'react';
import PropTypes from 'prop-types';

function FoodInfo({ foodDetails }) {
  return (
    <section>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
        className="img-detail"
      />
      <h2 className="drink-name" data-testid="recipe-title">{ foodDetails.strMeal }</h2>
    </section>
  );
}

FoodInfo.propTypes = {
  foodDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodInfo;
