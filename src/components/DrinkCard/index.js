import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const DrinkCard = ({ drink, index }) => {
  const { strDrinkThumb, strDrink } = drink;
  return (
    <div className="drink-card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ strDrinkThumb }
        alt="Imagem da Bebida"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
    </div>
  );
};

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
