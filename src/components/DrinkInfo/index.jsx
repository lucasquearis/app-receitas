import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function DrinkInfo({ drinkDetails }) {
  return (
    <section>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt={ drinkDetails.strDrink }
        data-testid="recipe-photo"
        className="img-detail"
      />
      <h2 className="drink-name" data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
      <p className="strAlcoholic">{ drinkDetails.strAlcoholic }</p>
    </section>
  );
}

DrinkInfo.propTypes = {
  drinkDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinkInfo;
