import PropTypes from 'prop-types';
import React from 'react';

function DrinkInfo({ drinkDetails }) {
  return (
    <section>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
      <p>{ drinkDetails.strAlcoholic }</p>
    </section>
  );
}

DrinkInfo.propTypes = {
  drinkDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkInfo;
